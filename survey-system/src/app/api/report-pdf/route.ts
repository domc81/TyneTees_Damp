// =============================================================================
// Report PDF API Route — Server-side PDF generation and download
// Renders a SurveyReport to PDF and returns it as a downloadable file
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createClient } from '@supabase/supabase-js'
import { ReportPDFDocument } from '@/lib/report-pdf-renderer'
import type { ReportSettings, SurveyReport } from '@/types/survey-report.types'

/**
 * GET /api/report-pdf?reportId=xxx
 * Generates and returns a PDF for the specified report
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reportId = searchParams.get('reportId')

  if (!reportId) {
    return NextResponse.json({ error: 'Missing reportId parameter' }, { status: 400 })
  }

  try {
    // Set timeout for the entire operation (30 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('PDF generation timeout')), 30000)
    )

    const pdfPromise = generatePDF(reportId)

    const pdfBuffer = await Promise.race([pdfPromise, timeoutPromise]) as Buffer

    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const filename = `SURVEY-REPORT-${timestamp}.pdf`

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Main PDF generation logic
 */
async function generatePDF(reportId: string): Promise<Buffer> {
  // Create server-side Supabase client with service role key (bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  // Step 1: Load the report
  const { data: report, error: reportError } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    throw new Error(`Report not found: ${reportId}`)
  }

  // Step 2: Load the template to get settings

  const { data: template, error: templateError } = await supabase
    .from('report_templates')
    .select('settings')
    .eq('id', report.template_id)
    .single()

  if (templateError || !template) {
    throw new Error(`Template not found: ${report.template_id}`)
  }

  const settings = template.settings as ReportSettings

  // Step 3: Load survey data for additional context
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('survey_data, client_name, site_address, site_city, site_county, site_postcode')
    .eq('id', report.survey_id)
    .single()

  if (surveyError) {
    console.warn('Failed to load survey data:', surveyError)
  }

  const surveyData = survey || {}

  // Step 4: Collect all photo IDs from sections
  const photoIds = new Set<string>()
  for (const section of report.sections) {
    for (const photoId of section.photos) {
      photoIds.add(photoId)
    }
    // Also check sub-sections
    if (section.sub_sections) {
      for (const subSection of section.sub_sections) {
        for (const photoId of subSection.photos) {
          photoIds.add(photoId)
        }
      }
    }
  }

  // Step 5: Load photos from survey_data and resolve URLs
  const photoUrls: Record<string, string> = {}

  if (photoIds.size > 0 && survey?.survey_data?.photos) {
    const photos = survey.survey_data.photos as Array<{
      id: string
      storage_path: string
    }>

    // Convert each photo to a base64 data URI for embedding in PDF
    for (const photoId of photoIds) {
      const photo = photos.find((p) => p.id === photoId)
      if (!photo) continue

      try {
        // Get signed URL from Supabase storage
        const { data: signedUrlData } = await supabase.storage
          .from('survey-photos')
          .createSignedUrl(photo.storage_path, 3600) // 1 hour expiry

        if (signedUrlData?.signedUrl) {
          // Fetch the image and convert to base64 data URI
          const imageResponse = await fetch(signedUrlData.signedUrl, {
            signal: AbortSignal.timeout(5000), // 5 second timeout per image
          })

          if (imageResponse.ok) {
            const imageBuffer = await imageResponse.arrayBuffer()
            const base64 = Buffer.from(imageBuffer).toString('base64')
            const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
            photoUrls[photoId] = `data:${contentType};base64,${base64}`
          }
        }
      } catch (err) {
        console.warn(`Failed to load photo ${photoId}:`, err)
        // Skip this photo rather than failing the whole PDF
      }
    }
  }

  // Step 6: Render the PDF using react-pdf
  const pdfDocument = ReportPDFDocument({
    report,
    settings,
    photoUrls,
    surveyData,
  })

  const pdfBuffer = await renderToBuffer(pdfDocument)

  return pdfBuffer
}
