// =============================================================================
// Send Report Email API
// POST /api/reports/[id]/send
//
// Emails the customer their published report link, updates sent_at and
// sent_to_email on the report record, logs the communication, and notifies
// office/admin.
//
// Mirrors the quotation send flow (POST /api/quotations/[id]/send).
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import { reportEmail } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email-service'
import { notifyReportSent } from '@/lib/notifications-server'
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

    const reportId = params.id
    if (!reportId) {
      return NextResponse.json({ error: 'Missing report ID' }, { status: 400 })
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

    // 2. Load the report — verify it exists and is published
    const { data: report, error: rErr } = await db
      .from('survey_reports')
      .select('id, survey_id, status, publish_token, published_at')
      .eq('id', reportId)
      .single()

    if (rErr || !report) {
      return NextResponse.json(
        { error: `Report not found: ${rErr?.message || 'no data'}` },
        { status: 404 }
      )
    }

    if (report.status !== 'published' || !report.publish_token) {
      return NextResponse.json(
        { error: 'Report must be published before sending' },
        { status: 400 }
      )
    }

    // 3. Load the customer email via survey → customer
    const { data: survey, error: sErr } = await db
      .from('surveys')
      .select('id, customer_id, project_number, client_name, survey_date, customers ( id, first_name, last_name, email )')
      .eq('id', report.survey_id)
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
    const customerName =
      [customer?.first_name, customer?.last_name].filter(Boolean).join(' ')
      || survey.client_name
      || 'Customer'

    // 4. Duplicate-send guard (review pt 3) — this route is the office
    //    fallback; the routine path is the pipeline's Approve & Send.
    const prior = await findPriorCustomerSend(db, {
      surveyId: report.survey_id,
      templates: ['report', 'report_and_quotation'],
    })
    if (prior && !confirmResend) {
      return NextResponse.json(alreadySentPayload(prior), { status: 409 })
    }

    // 5. Check notification preferences
    // Use 'report_published' (customer-facing) not 'report_sent' (internal-only)
    const emailEnabled = await isNotificationEnabled('report_published', 'email')
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
        .from('survey_reports')
        .update({ sent_at: new Date().toISOString() })
        .eq('id', reportId)
        .is('sent_at', null)
        .select('id')
      if (!claimed || claimed.length === 0) {
        return NextResponse.json(
          { error: 'This report has already been sent', alreadySent: true },
          { status: 409 }
        )
      }
    }

    // 5. Build the public report URL
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
    const reportUrl = `${appUrl}/report/${reportId}?token=${report.publish_token}`

    // Format survey date if available
    const surveyDate = survey.survey_date
      ? new Date(survey.survey_date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : undefined

    // 6. Generate the email
    const email = await reportEmail({
      customerName,
      reportUrl,
      surveyDate,
    })

    // 7. Send the email with full logging context
    const result = await sendEmail({
      to: customerEmail,
      subject: confirmResend ? `${email.subject} (resent)` : email.subject,
      html: email.html,
      templateName: 'report',
      surveyId: survey.id,
      customerId: customerId ?? undefined,
      sentBy: profileId,
      recipientName: customerName,
    })

    if (!result.success) {
      // Release the idempotency claim so a retry after a transient failure works
      if (!confirmResend) {
        await db.from('survey_reports').update({ sent_at: null }).eq('id', reportId)
      }
      return NextResponse.json(
        { error: result.error || 'Failed to send report email' },
        { status: 500 }
      )
    }

    // 8. Update report sent_at and sent_to_email
    const now = new Date().toISOString()
    await db
      .from('survey_reports')
      .update({ sent_at: now, sent_to_email: customerEmail })
      .eq('id', reportId)

    // 9. Fire in-app notification for office/admin (fire-and-forget)
    isNotificationEnabled('report_sent', 'in_app')
      .then(async (enabled) => {
        if (!enabled) return
        await notifyReportSent(
          { id: report.id },
          { id: survey.id, project_number: survey.project_number, client_name: survey.client_name },
          customerName
        )
      })
      .catch(err => console.error('Report sent notification failed:', err))

    return NextResponse.json({
      success: true,
      sent: true,
      sentTo: customerEmail,
    })
  } catch (err) {
    console.error('Send report error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
