// =============================================================================
// Mark Payment as Paid — POST /api/payments/[paymentId]/mark-paid
//
// Authenticated — office staff marks a payment as received.
// Updates payment status, confirms booking (for survey fees), and
// marks enquiry as won (for deposits).
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  // Verify authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { method, referenceNote } = body as { method: string; referenceNote?: string }

  const validMethods = ['bank_transfer', 'card_phone', 'cash', 'cheque', 'online']
  if (!method || !validMethods.includes(method)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }

  const paymentId = params.paymentId
  const now = new Date().toISOString()

  // Fetch payment
  const { data: payment, error: fetchError } = await supabase
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .single()

  if (fetchError || !payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  }

  if (payment.status !== 'pending') {
    return NextResponse.json({ error: `Payment is already ${payment.status}` }, { status: 400 })
  }

  // Update payment
  const { data: updated, error: updateError } = await supabase
    .from('payments')
    .update({
      status: 'paid',
      payment_method: method,
      recorded_by: user.id,
      recorded_at: now,
      paid_at: now,
      reference_note: referenceNote || null,
    })
    .eq('id', paymentId)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }

  // Post-payment actions
  if (payment.payment_type === 'survey_fee' && payment.booking_id) {
    // Confirm the provisional booking
    await supabase
      .from('survey_bookings')
      .update({ status: 'scheduled' })
      .eq('id', payment.booking_id)
      .eq('status', 'provisional')
  }

  if (payment.payment_type === 'deposit' && payment.quotation_id) {
    // Find the enquiry linked to this quotation's survey and mark as won
    const { data: quotation } = await supabase
      .from('quotations')
      .select('survey_id')
      .eq('id', payment.quotation_id)
      .single()

    if (quotation?.survey_id) {
      const { data: survey } = await supabase
        .from('surveys')
        .select('enquiry_id')
        .eq('id', quotation.survey_id)
        .single()

      if (survey?.enquiry_id) {
        await supabase
          .from('enquiries')
          .update({ won_at: now })
          .eq('id', survey.enquiry_id)
      }
    }
  }

  return NextResponse.json({ payment: updated })
}
