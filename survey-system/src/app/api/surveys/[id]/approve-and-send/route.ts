// =============================================================================
// Approve & Send — POST /api/surveys/[id]/approve-and-send
//
// Combined action: finalise the report, generate quotation if needed, send a
// single branded email to the customer containing links to both the report and
// quotation, and transition the enquiry to 'sent'.
//
// Authenticated — admin/office only.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { renderToBuffer } from '@react-pdf/renderer'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email-service'
import { reportAndQuotationEmail } from '@/lib/email-templates'
import { QuotationPDFDocument } from '@/lib/quotation-pdf-renderer'
import type { QuotationForPDF, QuotationSectionForPDF } from '@/lib/quotation-pdf-renderer'
import { findPriorCustomerSend, alreadySentPayload } from '@/lib/customer-send-guard'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function verifyAdminOrOffice(): Promise<{
  authorized: boolean
  userId?: string
  profileId?: string
  error?: string
}> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return { authorized: false, error: 'Not authenticated' }

    const db = getServiceClient()
    const { data: profile } = await db
      .from('user_profiles')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    if (!profile || !['admin', 'office'].includes(profile.role)) {
      return { authorized: false, error: 'Forbidden — admin or office role required' }
    }

    return { authorized: true, userId: user.id, profileId: profile.id }
  } catch {
    return { authorized: false, error: 'Authentication check failed' }
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized, profileId, error: authError } = await verifyAdminOrOffice()
    if (!authorized || !profileId) {
      return NextResponse.json(
        { error: authError || 'Unauthorized' },
        { status: authorized === false && authError?.includes('Forbidden') ? 403 : 401 }
      )
    }

    const surveyId = params.id
    if (!surveyId) {
      return NextResponse.json({ error: 'Missing survey ID' }, { status: 400 })
    }

    // Optional body — resend confirmation flag from the UI's typed confirm
    let confirmResend = false
    try {
      const body = await request.json()
      confirmResend = body?.confirmResend === true
    } catch {
      // No/invalid body — normal first send
    }

    const db = getServiceClient()

    // 1. Load survey + customer
    const { data: survey, error: sErr } = await db
      .from('surveys')
      .select('id, project_number, client_name, customer_id, enquiry_id, survey_date, customers ( id, first_name, last_name, email )')
      .eq('id', surveyId)
      .single()

    if (sErr || !survey) {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 })
    }

    const customer = survey.customers as unknown as {
      id: string; first_name: string; last_name: string; email: string | null
    } | null

    const customerEmail = customer?.email
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'No customer email found. Update the customer record first.' },
        { status: 400 }
      )
    }

    const customerName = [customer?.first_name, customer?.last_name].filter(Boolean).join(' ')
      || survey.client_name || 'Customer'

    // 2. Check report exists and is published
    const { data: report } = await db
      .from('survey_reports')
      .select('id, status, publish_token')
      .eq('survey_id', surveyId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!report || report.status !== 'published' || !report.publish_token) {
      return NextResponse.json(
        { error: 'Report must be published before sending. Generate and publish the report first.' },
        { status: 400 }
      )
    }

    // 3. Check quotation exists
    const { data: quotation } = await db
      .from('quotations')
      .select('id, quotation_number, share_token, status, total_incl_vat')
      .eq('survey_id', surveyId)
      .order('version', { ascending: false })
      .limit(1)
      .single()

    if (!quotation || !quotation.share_token) {
      return NextResponse.json(
        { error: 'Quotation must be generated before sending. Create a quotation first.' },
        { status: 400 }
      )
    }

    // 4. Duplicate-send guard (review pt 3): any prior successful customer
    //    document email for this survey/quotation requires an explicit,
    //    typed resend confirmation from the UI.
    const prior = await findPriorCustomerSend(db, {
      surveyId,
      quotationId: quotation.id,
      templates: ['report_and_quotation', 'quotation', 'report'],
    })
    if (prior && !confirmResend) {
      return NextResponse.json(alreadySentPayload(prior), { status: 409 })
    }

    // Race-safe idempotency claim for first sends: only one concurrent
    // request can flip sent_at from NULL — a double-click cannot fire twice.
    if (!confirmResend) {
      const { data: claimed } = await db
        .from('survey_reports')
        .update({ sent_at: new Date().toISOString() })
        .eq('id', report.id)
        .is('sent_at', null)
        .select('id')
      if (!claimed || claimed.length === 0) {
        return NextResponse.json(
          {
            error: 'Customer documents have already been sent',
            alreadySent: true,
          },
          { status: 409 }
        )
      }
    }

    // 4b. Build URLs
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
    const reportUrl = `${appUrl}/report/${report.id}?token=${report.publish_token}`
    const quotationUrl = `${appUrl}/q/${quotation.share_token}`

    // Format survey date
    const surveyDate = survey.survey_date
      ? new Date(survey.survey_date).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : undefined

    // 5. Render the quotation PDF attachment. A render failure must not block
    //    the send — the email still carries both links (decision D2: report
    //    stays online-link until a report-PDF pipeline exists).
    let attachments: { filename: string; content: Buffer }[] | undefined
    try {
      const [{ data: fullQuotation }, { data: sections }] = await Promise.all([
        db.from('quotations').select('*').eq('id', quotation.id).single(),
        db
          .from('quotation_sections')
          .select('*')
          .eq('quotation_id', quotation.id)
          .order('display_order', { ascending: true }),
      ])
      if (fullQuotation) {
        const pdfBuffer = await Promise.race([
          renderToBuffer(
            React.createElement(QuotationPDFDocument, {
              quotation: fullQuotation as QuotationForPDF,
              sections: (sections || []) as QuotationSectionForPDF[],
            })
          ),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('PDF generation timeout')), 30000)
          ),
        ])
        const companyName =
          (fullQuotation as QuotationForPDF).company_name ?? 'Tyne Tees Damp Proofing'
        attachments = [
          {
            filename: `Quotation ${quotation.quotation_number} - ${companyName}.pdf`
              .replace(/[^a-zA-Z0-9 ._-]/g, '_'),
            content: pdfBuffer,
          },
        ]
      }
    } catch (pdfErr) {
      console.error(
        '[approve-and-send] Quotation PDF attachment failed — sending with links only:',
        pdfErr
      )
    }

    // 6. Send combined email
    const email = await reportAndQuotationEmail({
      customerName,
      reportUrl,
      quotationUrl,
      surveyDate,
    })

    const result = await sendEmail({
      to: customerEmail,
      subject: confirmResend ? `${email.subject} (resent)` : email.subject,
      html: email.html,
      attachments,
      templateName: 'report_and_quotation',
      surveyId: survey.id,
      quotationId: quotation.id,
      customerId: customer?.id,
      sentBy: profileId,
      recipientName: customerName,
    })

    if (!result.success) {
      // Release the idempotency claim so a retry after a transient failure works
      if (!confirmResend) {
        await db
          .from('survey_reports')
          .update({ sent_at: null })
          .eq('id', report.id)
      }
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    const now = new Date().toISOString()

    // 7. Update report sent_at (the claim already stamped it on first sends;
    //    this refreshes the timestamp and records the recipient)
    await db
      .from('survey_reports')
      .update({ sent_at: now, sent_to_email: customerEmail })
      .eq('id', report.id)

    // 8. Update quotation status to 'sent' (if still draft)
    if (quotation.status === 'draft') {
      await db
        .from('quotations')
        .update({ status: 'sent', sent_at: now })
        .eq('id', quotation.id)
    }

    // 8. Transition enquiry to 'sent'
    if (survey.enquiry_id) {
      const { data: enquiry } = await db
        .from('enquiries')
        .select('status')
        .eq('id', survey.enquiry_id)
        .single()

      if (enquiry) {
        const TERMINAL = new Set(['lost', 'closed'])
        const STATUS_ORDER: Record<string, number> = {
          new: 0, awaiting_payment: 1, booked: 2, survey_complete: 3, sent: 4, won: 5, closed: 6, lost: 4,
        }
        const current = enquiry.status as string
        const canTransition =
          !TERMINAL.has(current) &&
          (current === 'on_hold' || (STATUS_ORDER['sent'] ?? 0) > (STATUS_ORDER[current] ?? -1))

        if (canTransition) {
          await db
            .from('enquiries')
            .update({ status: 'sent' })
            .eq('id', survey.enquiry_id)

          await db
            .from('enquiry_activity')
            .insert({
              enquiry_id: survey.enquiry_id,
              user_id: profileId,
              activity_type: 'status_change',
              title: `Status changed from ${current} to sent`,
              description: 'Report and quotation approved and sent to customer',
              metadata: { old_status: current, new_status: 'sent' },
            })
        }
      }
    }

    return NextResponse.json({
      success: true,
      sentTo: customerEmail,
      reportId: report.id,
      quotationId: quotation.id,
    })
  } catch (err) {
    console.error('Approve & Send error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
