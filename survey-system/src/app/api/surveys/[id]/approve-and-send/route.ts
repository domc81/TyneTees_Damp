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
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email-service'
import { reportAndQuotationEmail } from '@/lib/email-templates'

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

    // 4. Build URLs
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
    const reportUrl = `${appUrl}/report/${report.id}?token=${report.publish_token}`
    const quotationUrl = `${appUrl}/q/${quotation.share_token}`

    // Format survey date
    const surveyDate = survey.survey_date
      ? new Date(survey.survey_date).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : undefined

    // 5. Send combined email
    const email = await reportAndQuotationEmail({
      customerName,
      reportUrl,
      quotationUrl,
      surveyDate,
    })

    const result = await sendEmail({
      to: customerEmail,
      subject: email.subject,
      html: email.html,
      templateName: 'report_and_quotation',
      surveyId: survey.id,
      customerId: customer?.id,
      sentBy: profileId,
      recipientName: customerName,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    const now = new Date().toISOString()

    // 6. Update report sent_at
    await db
      .from('survey_reports')
      .update({ sent_at: now, sent_to_email: customerEmail })
      .eq('id', report.id)

    // 7. Update quotation status to 'sent' (if still draft)
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
