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
import { sendEmail } from '@/lib/email-service'
import { bookingConfirmedAfterPaymentEmail } from '@/lib/email-templates'

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

    // Send booking confirmation email to customer
    const { data: booking } = await supabase
      .from('survey_bookings')
      .select('customer_name, customer_email, customer_address, booking_date, start_time, end_time, surveyor_name')
      .eq('id', payment.booking_id)
      .single()

    if (booking?.customer_email) {
      const bookingDate = booking.booking_date
        ? new Date(booking.booking_date + 'T12:00:00').toLocaleDateString('en-GB', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          })
        : ''
      const bookingTime = [booking.start_time?.slice(0, 5), booking.end_time?.slice(0, 5)]
        .filter(Boolean).join(' – ')

      bookingConfirmedAfterPaymentEmail({
        customerName: booking.customer_name || 'Customer',
        bookingDate,
        bookingTime,
        surveyorName: booking.surveyor_name || 'Our surveyor',
        siteAddress: booking.customer_address || '',
      })
        .then(email => sendEmail({
          to: booking.customer_email!,
          subject: email.subject,
          html: email.html,
          templateName: 'booking_confirmed_after_payment',
          bookingId: payment.booking_id!,
          sentBy: user.id,
          recipientName: booking.customer_name || 'Customer',
        }))
        .catch(err => console.error('[mark-paid] Booking confirmation email failed:', err))
    }
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
