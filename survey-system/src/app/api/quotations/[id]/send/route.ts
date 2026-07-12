// =============================================================================
// Send Quotation Email API
// POST /api/quotations/[id]/send
//
// Emails the customer their quotation link, updates status to 'sent' (from
// draft only), stamps sent_at, logs the communication, and notifies office/admin.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import { quotationEmail } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email-service'
import { notifyQuotationSent } from '@/lib/notifications-server'
import { findPriorCustomerSend, alreadySentPayload } from '@/lib/customer-send-guard'

// Service-role client for privileged reads/writes (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase service-role credentials')
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Verify the requesting user is authenticated and has admin or office role
async function verifyAdminOrOffice(): Promise<{
  authorized: boolean
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
      return { authorized: false, error: 'Insufficient permissions — admin or office role required' }
    }

    return { authorized: true, profileId: profile.id }
  } catch {
    return { authorized: false, error: 'Authentication check failed' }
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Auth check — must be admin or office
    const { authorized, profileId, error: authError } = await verifyAdminOrOffice()
    if (!authorized || !profileId) {
      return NextResponse.json({ error: authError || 'Unauthorized' }, { status: 401 })
    }

    const quotationId = params.id
    if (!quotationId) {
      return NextResponse.json({ error: 'Missing quotation ID' }, { status: 400 })
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

    // 2. Load the quotation
    const { data: quotation, error: qErr } = await db
      .from('quotations')
      .select('id, survey_id, share_token, quotation_number, status, valid_until, customer_name')
      .eq('id', quotationId)
      .single()

    if (qErr || !quotation) {
      return NextResponse.json(
        { error: `Quotation not found: ${qErr?.message || 'no data'}` },
        { status: 404 }
      )
    }

    // 3. Load the customer email via survey → customer
    const { data: survey, error: sErr } = await db
      .from('surveys')
      .select('id, customer_id, project_number, client_name, customers ( id, first_name, last_name, email )')
      .eq('id', quotation.survey_id)
      .single()

    if (sErr || !survey) {
      return NextResponse.json(
        { error: `Survey not found: ${sErr?.message || 'no data'}` },
        { status: 404 }
      )
    }

    const customer = survey.customers as unknown as {
      id: string
      first_name: string
      last_name: string
      email: string | null
    } | null

    const customerEmail = customer?.email
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'No customer email address found. Please update the customer record before sending.' },
        { status: 400 }
      )
    }

    const customerId = customer?.id || null
    const customerName = quotation.customer_name
      || [customer?.first_name, customer?.last_name].filter(Boolean).join(' ')
      || 'Customer'

    // 4. Duplicate-send guard (review pt 3) — this route is the office
    //    fallback; the routine path is the pipeline's Approve & Send.
    const prior = await findPriorCustomerSend(db, {
      surveyId: quotation.survey_id,
      quotationId: quotation.id,
      templates: ['quotation', 'report_and_quotation'],
    })
    if (prior && !confirmResend) {
      return NextResponse.json(alreadySentPayload(prior), { status: 409 })
    }

    // 5. Check notification preferences
    const emailEnabled = await isNotificationEnabled('quotation_sent', 'email')
    if (!emailEnabled) {
      return NextResponse.json({
        success: true,
        sent: false,
        reason: 'Email notifications disabled for this event type',
      })
    }

    // Race-safe idempotency claim for first sends (double-click protection)
    if (!confirmResend) {
      const { data: claimed } = await db
        .from('quotations')
        .update({ sent_at: new Date().toISOString() })
        .eq('id', quotationId)
        .is('sent_at', null)
        .select('id')
      if (!claimed || claimed.length === 0) {
        return NextResponse.json(
          { error: 'This quotation has already been sent', alreadySent: true },
          { status: 409 }
        )
      }
    }

    // 5. Build the public quotation URL and format the valid_until date
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
    const quotationUrl = `${appUrl}/q/${quotation.share_token}`

    const validUntilDate = new Date(quotation.valid_until).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    // 6. Generate the email
    const email = await quotationEmail({
      customerName,
      quotationNumber: quotation.quotation_number,
      quotationUrl,
      validUntilDate,
    })

    // 7. Send the email with full logging context
    const result = await sendEmail({
      to: customerEmail,
      subject: confirmResend ? `${email.subject} (resent)` : email.subject,
      html: email.html,
      templateName: 'quotation',
      quotationId: quotation.id,
      surveyId: survey.id,
      customerId: customerId ?? undefined,
      sentBy: profileId,
      recipientName: customerName,
    })

    if (!result.success) {
      // Release the idempotency claim so a retry after a transient failure works
      if (!confirmResend) {
        await db.from('quotations').update({ sent_at: null }).eq('id', quotationId)
      }
      return NextResponse.json(
        { error: result.error || 'Failed to send quotation email' },
        { status: 500 }
      )
    }

    // 8. Update quotation status and sent_at
    //    Only advance to 'sent' from 'draft' — don't downgrade from 'viewed'/later statuses
    const now = new Date().toISOString()
    const statusUpdate: Record<string, unknown> = { sent_at: now }
    if (quotation.status === 'draft') {
      statusUpdate.status = 'sent'
    }

    await db
      .from('quotations')
      .update(statusUpdate)
      .eq('id', quotationId)

    // 9. Fire in-app notification for office/admin (fire-and-forget)
    isNotificationEnabled('quotation_sent', 'in_app')
      .then(async (enabled) => {
        if (!enabled) return
        await notifyQuotationSent(
          { id: quotation.id, quotation_number: quotation.quotation_number },
          { id: survey.id, project_number: survey.project_number, client_name: survey.client_name },
          customerName
        )
      })
      .catch(err => console.error('Quotation sent notification failed:', err))

    return NextResponse.json({
      success: true,
      sent: true,
      sentTo: customerEmail,
      status: quotation.status === 'draft' ? 'sent' : quotation.status,
    })
  } catch (err) {
    console.error('Send quotation error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
