// =============================================================================
// Booking Email Notify API — POST /api/bookings/notify
//
// Server-side bridge for sending customer-facing booking emails.
// Called fire-and-forget from client-side code after createBooking(),
// updateBooking(), or cancelBooking() succeeds.
//
// The route:
//   1. Verifies the caller is authenticated
//   2. For booking_updated: skips if no schedule-relevant fields changed
//   3. Checks notification_preferences — if email disabled for this event, skips
//   4. Fetches the full booking record (with surveyor name)
//   5. Guards against missing customer_email — skips silently
//   6. Generates the appropriate email template
//   7. Calls sendEmail() with full logging context
//
// Never throws back to the caller — all failures are logged and a 200 is
// returned so the client fire-and-forget call never surfaces an error to users.
//
// SECURITY: Server-side only. Uses service role key for DB reads and logging.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import { sendEmail } from '@/lib/email-service'
import {
  bookingConfirmationEmail,
  bookingCancellationEmail,
  bookingUpdatedEmail,
} from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Only send a booking_updated email when these fields change — not for status
// or notes edits which are internal actions the customer doesn't need to know about
const SCHEDULE_FIELDS = new Set(['booking_date', 'start_time', 'end_time', 'surveyor_id'])

// ---------------------------------------------------------------------------
// Auth helper — same pattern as /api/notifications/trigger
// ---------------------------------------------------------------------------

async function getAuthenticatedUser(): Promise<{ profileId: string } | null> {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) return null

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    return { profileId: profile?.id || user.id }
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Service-role client for privileged DB reads
// ---------------------------------------------------------------------------

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ---------------------------------------------------------------------------
// Date/time formatting helpers
// ---------------------------------------------------------------------------

/** "YYYY-MM-DD" → "Monday 3 March 2026" */
function formatBookingDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** "HH:MM:SS" or "HH:MM" → "HH:MM" */
function formatBookingTime(timeStr: string): string {
  return timeStr.slice(0, 5)
}

// ---------------------------------------------------------------------------
// Request body type
// ---------------------------------------------------------------------------

type BookingEventType = 'booking_created' | 'booking_updated' | 'booking_cancelled'

interface NotifyPayload {
  bookingId?: string
  eventType?: BookingEventType
  // For booking_updated: array of field names that actually changed.
  // Email is only sent if this includes a schedule-relevant field.
  changedFields?: string[]
}

// ---------------------------------------------------------------------------
// POST /api/bookings/notify
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // 1. Auth check
  const authUser = await getAuthenticatedUser()
  if (!authUser) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  // 2. Parse body
  let body: NotifyPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { bookingId, eventType, changedFields = [] } = body

  if (!bookingId || !eventType) {
    return NextResponse.json({ error: 'Missing bookingId or eventType' }, { status: 400 })
  }

  // 3. For booking_updated: only proceed if a schedule-relevant field changed
  if (eventType === 'booking_updated') {
    const hasScheduleChange = changedFields.some((f) => SCHEDULE_FIELDS.has(f))
    if (!hasScheduleChange) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'no_schedule_change' })
    }
  }

  // 4. Check notification preferences — fail-open if preference not found
  const emailEnabled = await isNotificationEnabled(eventType, 'email')
  if (!emailEnabled) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'email_disabled' })
  }

  // 5. Fetch booking with surveyor name joined
  const db = getServiceClient()
  const { data: bookingRow, error: bookingError } = await db
    .from('survey_bookings')
    .select('*, user_profiles!survey_bookings_surveyor_id_fkey(display_name)')
    .eq('id', bookingId)
    .single()

  if (bookingError || !bookingRow) {
    console.error('[bookings/notify] Booking not found:', bookingId, bookingError?.message)
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const surveyorProfile = (bookingRow as Record<string, unknown>).user_profiles as
    | { display_name: string }
    | null

  const booking = {
    ...(bookingRow as {
      id: string
      survey_id?: string | null
      customer_name: string
      customer_email?: string | null
      customer_address?: string | null
      booking_date: string
      start_time: string
      end_time: string
    }),
    surveyor_name: surveyorProfile?.display_name ?? 'Your surveyor',
  }

  // 6. Guard: skip silently if customer email is missing
  if (!booking.customer_email) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'no_customer_email' })
  }

  // 7. Build template data
  const bookingDate = formatBookingDate(booking.booking_date)
  const bookingTime = formatBookingTime(booking.start_time)
  const siteAddress = booking.customer_address || 'the property'

  // 8. Generate template and send
  try {
    let template
    let templateName: string

    if (eventType === 'booking_created') {
      templateName = 'booking_confirmation'
      template = await bookingConfirmationEmail({
        customerName: booking.customer_name,
        bookingDate,
        bookingTime,
        surveyorName: booking.surveyor_name,
        siteAddress,
      })
    } else if (eventType === 'booking_cancelled') {
      templateName = 'booking_cancellation'
      template = await bookingCancellationEmail({
        customerName: booking.customer_name,
        bookingDate,
        bookingTime,
        siteAddress,
      })
    } else {
      templateName = 'booking_updated'
      template = await bookingUpdatedEmail({
        customerName: booking.customer_name,
        bookingDate,
        bookingTime,
        surveyorName: booking.surveyor_name,
        siteAddress,
      })
    }

    // sendEmail handles replyTo automatically from email config (company email)
    const result = await sendEmail({
      to: booking.customer_email,
      subject: template.subject,
      html: template.html,
      templateName,
      bookingId: booking.id,
      surveyId: booking.survey_id ?? undefined,
      sentBy: authUser.profileId,
      recipientName: booking.customer_name,
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[bookings/notify] Failed to generate or send email:', msg)
    // Still return 200 — caller fire-and-forget should not surface this to users
    return NextResponse.json({ ok: false, error: msg })
  }
}
