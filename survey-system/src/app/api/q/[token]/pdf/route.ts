// =============================================================================
// Quotation PDF Download — GET /api/q/[token]/pdf
//
// PUBLIC endpoint — no authentication required.
// Fetches quotation data by share_token and returns a generated PDF.
// Uses @react-pdf/renderer to generate the PDF.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createClient } from '@supabase/supabase-js'
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
  { params }: { params: { token: string } }
) {
  const { token } = params

  try {
    const supabase = createServiceClient()

    // Fetch quotation by share_token
    const { data: quotation, error: qErr } = await supabase
      .from('quotations')
      .select('*')
      .eq('share_token', token)
      .single()

    if (qErr || !quotation) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 })
    }

    // Fetch sections
    const { data: sections, error: secErr } = await supabase
      .from('quotation_sections')
      .select('*')
      .eq('quotation_id', quotation.id)
      .order('display_order', { ascending: true })

    if (secErr) {
      return NextResponse.json({ error: 'Failed to load quotation sections' }, { status: 500 })
    }

    const q = quotation as QuotationForPDF
    const secs = (sections || []) as QuotationSectionForPDF[]

    // Generate PDF with a 30-second timeout
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
    console.error('[quotation-pdf] Error generating PDF:', err)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
