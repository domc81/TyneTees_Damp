// =============================================================================
// Send Payment Link — POST /api/payments/send-link
//
// Authenticated — sends a payment link email to the customer.
// Body: { paymentId: string }
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { sendEmail } from '@/lib/email-service'
import { surveyFeePaymentEmail } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
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
  const { paymentId } = body as { paymentId: string }

  if (!paymentId) {
    return NextResponse.json({ error: 'paymentId required' }, { status: 400 })
  }

  // Fetch payment
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .single()

  if (paymentError || !payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  }

  // Resolve customer details from booking (survey fee) or quotation (deposit)
  let customerEmail: string | null = null
  let customerName = 'Customer'
  let bookingDate = ''
  let address = ''

  if (payment.booking_id) {
    const { data: booking } = await supabase
      .from('survey_bookings')
      .select('customer_name, customer_email, customer_address, booking_date, start_time')
      .eq('id', payment.booking_id)
      .single()

    if (booking) {
      customerEmail = booking.customer_email
      customerName = booking.customer_name || 'Customer'
      address = booking.customer_address || ''
      if (booking.booking_date) {
        bookingDate = new Date(booking.booking_date + 'T12:00:00').toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })
        if (booking.start_time) {
          bookingDate += ` at ${booking.start_time}`
        }
      }
    }
  }

  if (!customerEmail && payment.quotation_id) {
    const { data: quotation } = await supabase
      .from('quotations')
      .select('customer_name, customer_email, site_address')
      .eq('id', payment.quotation_id)
      .single()

    if (quotation) {
      customerEmail = quotation.customer_email
      customerName = quotation.customer_name || 'Customer'
      address = quotation.site_address || ''
    }
  }

  if (!customerEmail) {
    return NextResponse.json({ error: 'No customer email address found' }, { status: 400 })
  }

  // Fetch company profile for branding
  const { data: company } = await supabase
    .from('company_profile')
    .select('company_name, phone, email')
    .eq('is_singleton', true)
    .single()

  const companyName = company?.company_name || 'Tyne Tees Damp Proofing'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || ''
  const paymentUrl = `${appUrl}/pay/${payment.payment_token}`

  const isSurveyFee = payment.payment_type === 'survey_fee'

  const html = surveyFeePaymentEmail({
    customerName,
    amount: Number(payment.amount),
    bookingDate: isSurveyFee ? bookingDate : '',
    paymentUrl,
    companyName,
    companyPhone: company?.phone || '',
    companyEmail: company?.email || '',
  })

  const subject = isSurveyFee
    ? `Survey Fee Payment — ${companyName}`
    : `Deposit Payment — ${companyName}`

  const result = await sendEmail({
    to: customerEmail,
    subject,
    html,
    templateName: isSurveyFee ? 'survey_fee_payment' : 'deposit_payment',
    bookingId: payment.booking_id || undefined,
    sentBy: user.id,
    recipientName: customerName,
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true, messageId: result.messageId })
}
