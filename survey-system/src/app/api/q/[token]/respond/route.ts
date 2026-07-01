// =============================================================================
// Quotation Response — POST /api/q/[token]/respond
//
// PUBLIC endpoint — no authentication required. The share_token UUID is the
// access credential (same pattern as /api/q/[token]/view).
//
// Handles both acceptance and decline of quotations:
//   - Creates an immutable record in quotation_acceptances
//   - Updates quotation status and timestamps
//   - Sends notifications to office/admin staff
//   - Sends confirmation email to the customer
//   - Logs email to communication_log
//
// UK legal compliance:
//   - Consumer Contracts Regulations 2013 (cooling-off, consent)
//   - Consumer Rights Act 2015 (special orders)
//   - Electronic Communications Act 2000 (typed e-signature)
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hashTermsContent } from '@/lib/terms-hash'
import { shouldAutoTransition } from '@/lib/supabase-data'
import type { EnquiryStatus } from '@/types/database.types'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import {
  notifyQuotationAccepted,
  notifyQuotationDeclined,
} from '@/lib/notifications-server'
import { sendEmail } from '@/lib/email-service'
import {
  quotationAcceptedEmail,
  quotationDeclinedEmail,
} from '@/lib/email-templates'

// ─── Service-role client ─────────────────────────────────────────────────────

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// ─── Request body types ──────────────────────────────────────────────────────

interface RespondBody {
  response: 'accepted' | 'declined'
  signatoryName?: string
  consentTermsAccepted?: boolean
  consentCoolingOffAcknowledged?: boolean
  waiveCoolingOff?: boolean
  consentSpecialOrders?: boolean
  customerNotes?: string
  termsContentHash?: string
  quotationSnapshot?: Record<string, unknown>
  screenResolution?: string
  signatoryTypedAt?: string
}

// ─── POST handler ────────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  try {
    const body = (await request.json()) as RespondBody

    // Basic validation
    if (!body.response || !['accepted', 'declined'].includes(body.response)) {
      return NextResponse.json(
        { error: 'Invalid response. Must be "accepted" or "declined".' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // ── Fetch quotation by share_token ───────────────────────────────────────

    const { data: quotation, error: qErr } = await supabase
      .from('quotations')
      .select('id, quotation_number, survey_id, status, valid_until, total_incl_vat, vat_amount, deposit_amount, deposit_percentage, customer_name, accepted_at, declined_at, responded_at')
      .eq('share_token', token)
      .single()

    if (qErr || !quotation) {
      return NextResponse.json(
        { error: 'Quotation not found.' },
        { status: 404 }
      )
    }

    // ── Guard: already responded ─────────────────────────────────────────────

    if (quotation.accepted_at) {
      const respondedDate = formatDate(quotation.accepted_at)
      return NextResponse.json(
        { error: `You have already responded to this quotation on ${respondedDate}.` },
        { status: 409 }
      )
    }

    if (quotation.declined_at) {
      const respondedDate = formatDate(quotation.declined_at)
      return NextResponse.json(
        { error: `You have already responded to this quotation on ${respondedDate}.` },
        { status: 409 }
      )
    }

    // ── Guard: expired ───────────────────────────────────────────────────────

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const validUntil = new Date(quotation.valid_until)
    validUntil.setHours(0, 0, 0, 0)

    if (validUntil < today) {
      // Look up company phone for the message
      const { data: profile } = await supabase
        .from('company_profile')
        .select('phone_primary')
        .single()
      const phone = (profile as { phone_primary?: string } | null)?.phone_primary || 'our office'

      return NextResponse.json(
        { error: `This quotation expired on ${formatDate(quotation.valid_until)}. Please contact us on ${phone} for an updated quote.` },
        { status: 410 }
      )
    }

    // ── Guard: draft status ──────────────────────────────────────────────────

    if (quotation.status === 'draft') {
      return NextResponse.json(
        { error: 'This quotation is not available for review yet.' },
        { status: 403 }
      )
    }

    // ── Guard: only 'sent' or 'viewed' can be responded to ──────────────────

    if (!['sent', 'viewed'].includes(quotation.status)) {
      return NextResponse.json(
        { error: 'This quotation can no longer be responded to.' },
        { status: 409 }
      )
    }

    // ── Acceptance-specific validation ───────────────────────────────────────

    if (body.response === 'accepted') {
      if (!body.signatoryName || body.signatoryName.trim().length < 2) {
        return NextResponse.json(
          { error: 'Please type your full name to sign the acceptance.' },
          { status: 400 }
        )
      }

      if (!body.consentTermsAccepted) {
        return NextResponse.json(
          { error: 'You must agree to the terms and conditions.' },
          { status: 400 }
        )
      }

      if (!body.consentCoolingOffAcknowledged) {
        return NextResponse.json(
          { error: 'You must acknowledge the cooling-off period.' },
          { status: 400 }
        )
      }

      if (!body.consentSpecialOrders) {
        return NextResponse.json(
          { error: 'You must acknowledge the special orders clause.' },
          { status: 400 }
        )
      }

      if (!body.termsContentHash) {
        return NextResponse.json(
          { error: 'Terms content hash is required.' },
          { status: 400 }
        )
      }

      if (!body.quotationSnapshot) {
        return NextResponse.json(
          { error: 'Quotation snapshot is required.' },
          { status: 400 }
        )
      }

      // ── Verify terms hash matches current T&Cs ─────────────────────────────

      const { data: profile } = await supabase
        .from('company_profile')
        .select('terms_and_conditions')
        .single()

      const currentTerms = (profile as { terms_and_conditions?: string } | null)?.terms_and_conditions || ''
      const currentHash = await hashTermsContent(currentTerms)

      if (body.termsContentHash !== currentHash) {
        return NextResponse.json(
          { error: 'The terms and conditions have been updated since you loaded this page. Please review the updated terms and try again.' },
          { status: 409 }
        )
      }

      // ── Insert immutable acceptance record ─────────────────────────────────

      const now = new Date().toISOString()
      const ipAddress = getClientIp(request)
      const userAgent = request.headers.get('user-agent') || 'unknown'

      const { data: acceptance, error: insertErr } = await supabase
        .from('quotation_acceptances')
        .insert({
          quotation_id: quotation.id,
          response: 'accepted',
          signatory_name: body.signatoryName.trim(),
          signatory_typed_at: body.signatoryTypedAt || now,
          consent_terms_accepted: true,
          consent_cooling_off_acknowledged: true,
          waive_cooling_off: body.waiveCoolingOff || false,
          consent_special_orders: true,
          terms_content_hash: body.termsContentHash,
          terms_content_snapshot: currentTerms,
          quotation_snapshot: body.quotationSnapshot,
          customer_notes: body.customerNotes?.trim() || null,
          ip_address: ipAddress,
          user_agent: userAgent,
          screen_resolution: body.screenResolution || null,
          responded_at: now,
        })
        .select('id')
        .single()

      if (insertErr || !acceptance) {
        console.error('[quotation-respond] Failed to insert acceptance:', insertErr)
        return NextResponse.json(
          { error: 'Failed to record your acceptance. Please try again.' },
          { status: 500 }
        )
      }

      // ── Update quotation status ────────────────────────────────────────────

      await supabase
        .from('quotations')
        .update({
          status: 'accepted',
          accepted_at: now,
          responded_at: now,
          customer_response_notes: body.customerNotes?.trim() || null,
          acceptance_id: acceptance.id,
        })
        .eq('id', quotation.id)

      // ── Auto-transition linked enquiry (fire-and-forget) ──────────────────

      autoTransitionLinkedEnquiry(supabase, quotation.survey_id, 'accepted')
        .catch(err => console.error('[quotation-respond] Enquiry auto-transition failed:', err))

      // ── Create deposit payment record (fire-and-forget) ───────────────────

      if (quotation.deposit_amount && quotation.deposit_amount > 0) {
        supabase
          .from('payments')
          .insert({
            quotation_id: quotation.id,
            payment_type: 'deposit',
            amount: quotation.deposit_amount,
            status: 'pending',
          })
          .then(({ error: payErr }) => {
            if (payErr) console.error('[quotation-respond] Deposit payment creation failed:', payErr)
          })
      }

      // ── Notify office (fire-and-forget) ────────────────────────────────────

      const customerName = quotation.customer_name || 'A customer'

      isNotificationEnabled('quotation_accepted', 'in_app')
        .then(async (enabled) => {
          if (!enabled) return
          await notifyQuotationAccepted(
            { id: quotation.id, quotation_number: quotation.quotation_number, survey_id: quotation.survey_id },
            customerName,
            body.customerNotes
          )
        })
        .catch(err => console.error('[quotation-respond] Notification failed:', err))

      // ── Send confirmation email (fire-and-forget) ──────────────────────────

      sendCustomerAcceptanceEmail(supabase, quotation, token)
        .catch(err => console.error('[quotation-respond] Email failed:', err))

      return NextResponse.json({
        ok: true,
        response: 'accepted',
        signatoryName: body.signatoryName.trim(),
        respondedAt: now,
      })
    }

    // ── DECLINE flow ─────────────────────────────────────────────────────────

    const now = new Date().toISOString()
    const ipAddress = getClientIp(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get current terms for the snapshot (even for decline)
    const { data: profileForDecline } = await supabase
      .from('company_profile')
      .select('terms_and_conditions')
      .single()
    const termsForDecline = (profileForDecline as { terms_and_conditions?: string } | null)?.terms_and_conditions || ''
    const hashForDecline = await hashTermsContent(termsForDecline)

    // Insert decline record
    const { data: declineRecord, error: declineErr } = await supabase
      .from('quotation_acceptances')
      .insert({
        quotation_id: quotation.id,
        response: 'declined',
        signatory_name: null,
        signatory_typed_at: null,
        consent_terms_accepted: false,
        consent_cooling_off_acknowledged: false,
        waive_cooling_off: false,
        consent_special_orders: false,
        terms_content_hash: hashForDecline,
        terms_content_snapshot: termsForDecline,
        quotation_snapshot: {
          quotation_number: quotation.quotation_number,
          total_incl_vat: quotation.total_incl_vat,
          deposit_amount: quotation.deposit_amount,
          vat_amount: quotation.vat_amount,
          valid_until: quotation.valid_until,
        },
        customer_notes: body.customerNotes?.trim() || null,
        ip_address: ipAddress,
        user_agent: userAgent,
        screen_resolution: body.screenResolution || null,
        responded_at: now,
      })
      .select('id')
      .single()

    if (declineErr || !declineRecord) {
      console.error('[quotation-respond] Failed to insert decline:', declineErr)
      return NextResponse.json(
        { error: 'Failed to record your response. Please try again.' },
        { status: 500 }
      )
    }

    // Update quotation status
    await supabase
      .from('quotations')
      .update({
        status: 'declined',
        declined_at: now,
        responded_at: now,
        customer_response_notes: body.customerNotes?.trim() || null,
        acceptance_id: declineRecord.id,
      })
      .eq('id', quotation.id)

    // Auto-transition linked enquiry (fire-and-forget)
    autoTransitionLinkedEnquiry(supabase, quotation.survey_id, 'declined')
      .catch(err => console.error('[quotation-respond] Enquiry auto-transition failed:', err))

    // Notify office (fire-and-forget)
    const customerNameDecline = quotation.customer_name || 'A customer'

    isNotificationEnabled('quotation_declined', 'in_app')
      .then(async (enabled) => {
        if (!enabled) return
        await notifyQuotationDeclined(
          { id: quotation.id, quotation_number: quotation.quotation_number, survey_id: quotation.survey_id },
          customerNameDecline,
          body.customerNotes
        )
      })
      .catch(err => console.error('[quotation-respond] Notification failed:', err))

    // Send decline acknowledgement email (fire-and-forget)
    sendCustomerDeclineEmail(supabase, quotation)
      .catch(err => console.error('[quotation-respond] Email failed:', err))

    return NextResponse.json({
      ok: true,
      response: 'declined',
      respondedAt: now,
    })
  } catch (err) {
    console.error('[quotation-respond] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// ─── Enquiry auto-transition (server-side, uses service-role client) ─────────

async function autoTransitionLinkedEnquiry(
  supabase: ReturnType<typeof createClient>,
  surveyId: string,
  targetStatus: 'accepted' | 'declined'
): Promise<void> {
  // Look up the survey to find the linked enquiry
  const { data: survey } = await supabase
    .from('surveys')
    .select('enquiry_id')
    .eq('id', surveyId)
    .single()

  if (!survey?.enquiry_id) return // No linked enquiry — silently skip

  // Fetch current enquiry status
  const { data: enquiry } = await supabase
    .from('enquiries')
    .select('status')
    .eq('id', survey.enquiry_id)
    .single()

  if (!enquiry) return

  // Check forward-only guard (reuses the same pure function as client-side)
  if (!shouldAutoTransition(enquiry.status as EnquiryStatus, targetStatus)) {
    return
  }

  const oldStatus = enquiry.status

  // Update enquiry status
  await supabase
    .from('enquiries')
    .update({ status: targetStatus })
    .eq('id', survey.enquiry_id)

  // Log activity (matches logEnquiryActivity pattern from supabase-data.ts)
  await supabase
    .from('enquiry_activity')
    .insert({
      enquiry_id: survey.enquiry_id,
      user_id: null, // System-generated (public endpoint, no auth user)
      activity_type: 'status_change',
      title: `Status changed from ${oldStatus} to ${targetStatus}`,
      description: `Customer ${targetStatus} quotation via online link`,
      metadata: { old_status: oldStatus, new_status: targetStatus, source: 'quotation_response' },
    })
}

// ─── Email helpers (run asynchronously, never throw to caller) ───────────────

async function sendCustomerAcceptanceEmail(
  supabase: ReturnType<typeof createClient>,
  quotation: {
    id: string
    quotation_number: string
    survey_id: string
    total_incl_vat: number
    deposit_amount: number
    customer_name: string | null
  },
  token: string
): Promise<void> {
  // Check email preferences
  const emailEnabled = await isNotificationEnabled('quotation_accepted', 'email')
  if (!emailEnabled) return

  // Resolve customer email via survey → customer
  const { data: survey } = await supabase
    .from('surveys')
    .select('customer_id')
    .eq('id', quotation.survey_id)
    .single()

  if (!survey?.customer_id) return

  const { data: customer } = await supabase
    .from('customers')
    .select('email, first_name, last_name')
    .eq('id', survey.customer_id)
    .single()

  if (!customer?.email) return

  const customerName = quotation.customer_name || [customer.first_name, customer.last_name].filter(Boolean).join(' ') || 'Customer'

  // Calculate cooling-off end date (14 days from now)
  const coolingOffEnd = new Date()
  coolingOffEnd.setDate(coolingOffEnd.getDate() + 14)
  const coolingOffEndDate = coolingOffEnd.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
  const quotationUrl = `${appUrl}/q/${token}`

  const template = await quotationAcceptedEmail({
    customerName,
    quotationNumber: quotation.quotation_number,
    totalInclVat: formatCurrency(quotation.total_incl_vat),
    depositAmount: formatCurrency(quotation.deposit_amount),
    coolingOffEndDate,
    quotationUrl,
  })

  await sendEmail({
    to: customer.email,
    subject: template.subject,
    html: template.html,
    templateName: 'quotation_accepted',
    customerId: survey.customer_id,
    surveyId: quotation.survey_id,
    quotationId: quotation.id,
    recipientName: customerName,
  })
}

async function sendCustomerDeclineEmail(
  supabase: ReturnType<typeof createClient>,
  quotation: {
    id: string
    quotation_number: string
    survey_id: string
    customer_name: string | null
  }
): Promise<void> {
  const emailEnabled = await isNotificationEnabled('quotation_declined', 'email')
  if (!emailEnabled) return

  const { data: survey } = await supabase
    .from('surveys')
    .select('customer_id')
    .eq('id', quotation.survey_id)
    .single()

  if (!survey?.customer_id) return

  const { data: customer } = await supabase
    .from('customers')
    .select('email, first_name, last_name')
    .eq('id', survey.customer_id)
    .single()

  if (!customer?.email) return

  const customerName = quotation.customer_name || [customer.first_name, customer.last_name].filter(Boolean).join(' ') || 'Customer'

  const template = await quotationDeclinedEmail({
    customerName,
    quotationNumber: quotation.quotation_number,
  })

  await sendEmail({
    to: customer.email,
    subject: template.subject,
    html: template.html,
    templateName: 'quotation_declined',
    customerId: survey.customer_id,
    surveyId: quotation.survey_id,
    quotationId: quotation.id,
    recipientName: customerName,
  })
}
