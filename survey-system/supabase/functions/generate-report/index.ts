// Edge Function: Generate Survey Report PDF
// Generates PDF reports for surveys using stored data

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  projectId: string
  reportType: 'survey' | 'quotation' | 'combined'
  template?: string
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { projectId, reportType = 'survey', template = 'standard' }: RequestBody = await req.json()

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch project data
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*, photos(*), sections(*, line_items(*))')
      .eq('id', projectId)
      .single()

    if (projectError) throw projectError

    // Generate PDF using HTML-to-PDF service
    const pdfBuffer = await generatePDF({
      project,
      reportType,
      template,
    })

    // Upload to Supabase Storage
    const fileName = `reports/${project.project_number}-${reportType}-${Date.now()}.pdf`
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('reports')
      .upload(fileName, pdfBuffer, { contentType: 'application/pdf' })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('reports')
      .getPublicUrl(fileName)

    // Save report record
    const { error: reportError } = await supabase
      .from('reports')
      .insert({
        project_id: projectId,
        report_type: reportType,
        template_name: template,
        pdf_path: publicUrl,
        generated_at: new Date().toISOString(),
      })

    if (reportError) throw reportError

    return new Response(
      JSON.stringify({ success: true, url: publicUrl }),
      {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    )
  }
})

// Generate PDF (placeholder - integrate with PDF service)
async function generatePDF({
  project,
  reportType,
  template,
}: {
  project: any
  reportType: string
  template: string
}): Promise<Uint8Array> {
  // In production, use:
  // 1. Puppeteer/Playwright to render HTML
  // 2. @sparticuz/chromium or a PDF API
  // 3. Direct PDF generation libraries

  // For now, return empty buffer - real implementation would generate actual PDF
  return new Uint8Array()
}
