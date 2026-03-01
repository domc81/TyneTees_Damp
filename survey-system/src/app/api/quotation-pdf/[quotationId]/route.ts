// =============================================================================
// Authenticated Quotation PDF Route — GET /api/quotation-pdf/[quotationId]
//
// AUTHENTICATED endpoint — requires an active session cookie.
// Fetches quotation data by quotationId (not share_token) and returns a PDF.
// Exists so surveyors can download the PDF from the management page without
// needing the public share token.
//
// Parallel to /api/q/[token]/pdf — uses the same renderer, does not modify it.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { QuotationPDFDocument } from '@/lib/quotation-pdf-renderer'
import type { QuotationForPDF, QuotationSectionForPDF } from '@/lib/quotation-pdf-renderer'
import React from 'react'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { quotationId: string } }
) {
  const { quotationId } = params

  // ── Auth check ──────────────────────────────────────────────────────────────
  // Read the session from cookies using the SSR client (anon key + cookie store).
  // This is the standard pattern for authenticating Next.js API routes.
  const cookieStore = cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // ── Data fetch & PDF generation ─────────────────────────────────────────────
  try {
    const supabase = createServiceClient()

    // Fetch quotation by primary key
    const { data: quotation, error: qErr } = await supabase
      .from('quotations')
      .select('*')
      .eq('id', quotationId)
      .single()

    if (qErr || !quotation) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 })
    }

    // Verify the quotation is linked to a real survey in the system
    const { data: survey, error: surveyErr } = await supabase
      .from('surveys')
      .select('id')
      .eq('id', quotation.survey_id)
      .single()

    if (surveyErr || !survey) {
      return NextResponse.json({ error: 'Associated survey not found' }, { status: 404 })
    }

    // Fetch ordered sections
    const { data: sections, error: secErr } = await supabase
      .from('quotation_sections')
      .select('*')
      .eq('quotation_id', quotationId)
      .order('display_order', { ascending: true })

    if (secErr) {
      return NextResponse.json({ error: 'Failed to load quotation sections' }, { status: 500 })
    }

    const q = quotation as QuotationForPDF
    const secs = (sections || []) as QuotationSectionForPDF[]

    // Render PDF with a 30-second safety timeout
    const pdfPromise = renderToBuffer(
      React.createElement(QuotationPDFDocument, { quotation: q, sections: secs })
    )

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('PDF generation timeout')), 30000)
    )

    const pdfBuffer = await Promise.race([pdfPromise, timeoutPromise])

    const filename = `${quotation.quotation_number}.pdf`
      .replace(/[^a-zA-Z0-9._-]/g, '_')

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (err) {
    console.error('[quotation-pdf-auth] Error generating PDF:', err)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
