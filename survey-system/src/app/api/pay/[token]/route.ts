// =============================================================================
// Public Payment Info API — GET /api/pay/[token]
//
// PUBLIC — no authentication. The payment_token UUID is the access credential.
// Returns payment details + linked booking/company info for the customer page.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  // Fetch payment by token
  const { data: payment, error } = await supabase
    .from('payments')
    .select('*')
    .eq('payment_token', token)
    .single()

  if (error || !payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  }

  // Fetch linked booking info (for survey fee payments)
  let booking = null
  if (payment.booking_id) {
    const { data } = await supabase
      .from('survey_bookings')
      .select('id, booking_date, start_time, end_time, customer_name, customer_address, status')
      .eq('id', payment.booking_id)
      .single()
    booking = data
  }

  // Fetch company profile for bank details / branding
  const { data: company } = await supabase
    .from('company_profile')
    .select('company_name, phone, email, address_line_1, address_line_2, city, county, postcode')
    .eq('is_singleton', true)
    .single()

  return NextResponse.json({
    payment: {
      id: payment.id,
      payment_type: payment.payment_type,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      expires_at: payment.expires_at,
      paid_at: payment.paid_at,
      created_at: payment.created_at,
    },
    booking,
    company,
  })
}
