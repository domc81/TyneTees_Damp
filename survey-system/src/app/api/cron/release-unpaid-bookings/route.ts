// =============================================================================
// Release Unpaid Bookings Cron — POST /api/cron/release-unpaid-bookings
//
// Called daily by a Coolify scheduled task. Finds expired pending survey fee
// payments and cancels the payment + provisional booking.
//
// Authentication: CRON_SECRET bearer token (not Supabase Auth).
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateCronSecret } from '@/lib/cron-auth'

export const dynamic = 'force-dynamic'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(request: NextRequest) {
  if (!validateCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()
  const now = new Date().toISOString()

  // Find pending payments past their expiry
  const { data: expiredPayments, error } = await supabase
    .from('payments')
    .select('id, booking_id')
    .eq('status', 'pending')
    .eq('payment_type', 'survey_fee')
    .lt('expires_at', now)

  if (error) {
    console.error('Error fetching expired payments:', error)
    return NextResponse.json({ error: 'Failed to query expired payments' }, { status: 500 })
  }

  if (!expiredPayments || expiredPayments.length === 0) {
    return NextResponse.json({ released: 0 })
  }

  let released = 0

  for (const payment of expiredPayments) {
    // Cancel the payment
    const { error: cancelError } = await supabase
      .from('payments')
      .update({ status: 'cancelled' })
      .eq('id', payment.id)

    if (cancelError) {
      console.error(`Failed to cancel payment ${payment.id}:`, cancelError)
      continue
    }

    // Cancel the linked provisional booking
    if (payment.booking_id) {
      const { error: bookingError } = await supabase
        .from('survey_bookings')
        .update({ status: 'cancelled' })
        .eq('id', payment.booking_id)
        .eq('status', 'provisional')

      if (bookingError) {
        console.error(`Failed to cancel booking ${payment.booking_id}:`, bookingError)
      }
    }

    released++
  }

  console.log(`Released ${released} unpaid provisional bookings`)
  return NextResponse.json({ released })
}
