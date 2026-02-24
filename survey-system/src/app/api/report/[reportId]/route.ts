// =============================================================================
// Public Report API — GET /api/report/[reportId]?token={publish_token}
//
// No authentication required. The token IS the credential.
// Used by the customer-facing web report page.
//
// Returns all data needed to render a full report:
// sections, customer, surveyor, resolved photo URLs, company info.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { ReportSection } from '@/types/survey-report.types'

// Company info — hardcoded until a settings table is added
const COMPANY = {
  name: 'Tyne Tees Damp Proofing Ltd',
  phone: '0191 XXX XXXX',
  email: 'info@tyneteesdampproofing.co.uk',
  website: 'www.tyneteesdampproofing.co.uk',
} as const

// =============================================================================
// Supabase client using service role key — bypasses RLS for public reads
// =============================================================================

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }

  return createServerClient(url, serviceKey, {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  })
}

// =============================================================================
// Photo URL resolution
// =============================================================================

/**
 * Walk all sections (and sub_sections recursively) to collect every photo ID.
 */
function collectPhotoIds(sections: ReportSection[]): string[] {
  const ids: string[] = []

  function walk(secs: ReportSection[]) {
    for (const sec of secs) {
      if (sec.photos && sec.photos.length > 0) {
        ids.push(...sec.photos)
      }
      if (sec.sub_sections && sec.sub_sections.length > 0) {
        walk(sec.sub_sections)
      }
    }
  }

  walk(sections)
  return [...new Set(ids)] // deduplicate
}

/**
 * Resolve photo IDs to public storage URLs.
 * Looks up each ID in the photos table to get its storage_path,
 * then generates the Supabase public URL.
 */
async function resolvePhotoUrls(
  supabase: ReturnType<typeof createServiceClient>,
  photoIds: string[]
): Promise<Record<string, string>> {
  if (photoIds.length === 0) return {}

  const { data, error } = await supabase
    .from('photos')
    .select('id, storage_path')
    .in('id', photoIds)

  if (error || !data) return {}

  const urls: Record<string, string> = {}

  for (const photo of data) {
    if (!photo.storage_path) continue
    const { data: urlData } = supabase.storage
      .from('survey-photos')
      .getPublicUrl(photo.storage_path)
    if (urlData?.publicUrl) {
      urls[photo.id] = urlData.publicUrl
    }
  }

  return urls
}

// =============================================================================
// GET handler
// =============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  const { reportId } = params
  const token = request.nextUrl.searchParams.get('token')

  // Token is required
  if (!token) {
    return NextResponse.json(
      { error: 'Invalid or expired report link' },
      { status: 403 }
    )
  }

  try {
    const supabase = createServiceClient()

    // Load the report and validate token in one query
    const { data: report, error: reportError } = await supabase
      .from('survey_reports')
      .select('id, survey_id, status, sections, generated_at, published_at, publish_token')
      .eq('id', reportId)
      .single()

    if (reportError || !report) {
      return NextResponse.json(
        { error: 'Invalid or expired report link' },
        { status: 403 }
      )
    }

    // Constant-time token comparison to prevent timing attacks
    if (!report.publish_token || report.publish_token !== token) {
      return NextResponse.json(
        { error: 'Invalid or expired report link' },
        { status: 403 }
      )
    }

    // Load the survey (for customer_id, surveyor_id, survey_type)
    const { data: survey, error: surveyError } = await supabase
      .from('surveys')
      .select('id, survey_type, customer_id, surveyor_id')
      .eq('id', report.survey_id)
      .single()

    if (surveyError || !survey) {
      return NextResponse.json(
        { error: 'Report data could not be loaded' },
        { status: 500 }
      )
    }

    // Load customer and surveyor in parallel
    const [customerResult, surveyorResult] = await Promise.all([
      survey.customer_id
        ? supabase
            .from('customers')
            .select('first_name, last_name, title, address_line1, address_line2, city, county, postcode')
            .eq('id', survey.customer_id)
            .single()
        : Promise.resolve({ data: null, error: null }),
      survey.surveyor_id
        ? supabase
            .from('surveyors')
            .select('full_name, qualifications')
            .eq('id', survey.surveyor_id)
            .single()
        : Promise.resolve({ data: null, error: null }),
    ])

    const customerData = customerResult.data
    const surveyorData = surveyorResult.data

    // Resolve photo URLs from sections
    const sections = (report.sections || []) as ReportSection[]
    const photoIds = collectPhotoIds(sections)
    const photos = await resolvePhotoUrls(supabase, photoIds)

    // Build customer display name
    const customerName = customerData
      ? [customerData.title, customerData.first_name, customerData.last_name]
          .filter(Boolean)
          .join(' ')
      : ''

    return NextResponse.json({
      report: {
        id: report.id,
        status: report.status,
        generated_at: report.generated_at ?? null,
        published_at: report.published_at ?? null,
        sections,
      },
      customer: {
        name: customerName,
        address_line1: customerData?.address_line1 ?? '',
        address_line2: customerData?.address_line2 ?? undefined,
        city: customerData?.city ?? '',
        county: customerData?.county ?? undefined,
        postcode: customerData?.postcode ?? '',
      },
      surveyor: {
        name: surveyorData?.full_name ?? '',
        credentials: surveyorData?.qualifications ?? undefined,
      },
      photos,
      company: COMPANY,
    })
  } catch (error) {
    console.error('Error in GET /api/report/[reportId]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
