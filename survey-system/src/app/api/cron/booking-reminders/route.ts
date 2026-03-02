// =============================================================================
// Booking Reminders Cron — POST /api/cron/booking-reminders
//
// Called daily by a Coolify scheduled task. Sends reminder emails to customers
// with bookings tomorrow and creates in-app notifications for their surveyors.
//
// Authentication: CRON_SECRET bearer token (not Supabase Auth).
// Timezone: all date logic uses Europe/London (handles GMT/BST automatically).
// Duplicate prevention: checks communication_log before each send.
// Fault isolation: one failed email does not block the rest.
//
// SECURITY: Server-side only. Uses service role key for all DB operations.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateCronSecret } from '@/lib/cron-auth'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import { sendEmail } from '@/lib/email-service'
import { bookingReminderEmail } from '@/lib/email-templates'
import type { NotificationCreateData } from '@/lib/calendar-types'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Service-role client — bypasses RLS for system-level queries
// ---------------------------------------------------------------------------

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ---------------------------------------------------------------------------
// Date helpers (UK timezone)
// ---------------------------------------------------------------------------

/** Get tomorrow's date in UK time as "YYYY-MM-DD" */
function getTomorrowUK(): string {
  const now = new Date()
  // Format today in UK timezone, then add one day
  const todayUK = now.toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
  const tomorrow = new Date(todayUK + 'T12:00:00')
  tomorrow.setDate(tomorrow.getDate() + 1)
  const y = tomorrow.getFullYear()
  const m = (tomorrow.getMonth() + 1).toString().padStart(2, '0')
  const d = tomorrow.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Get today's date in UK time as "YYYY-MM-DD" (for duplicate check bounds) */
function getTodayUK(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
}

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
// POST /api/cron/booking-reminders
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    if (!validateCronSecret(request)) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const db = getServiceClient()
    const tomorrowDate = getTomorrowUK()
    const todayDate = getTodayUK()

    // 2. Query tomorrow's bookings (not cancelled, has customer email)
    const { data: bookings, error: bookingsError } = await db
      .from('survey_bookings')
      .select('*, user_profiles!survey_bookings_surveyor_id_fkey(display_name)')
      .eq('booking_date', tomorrowDate)
      .neq('status', 'cancelled')
      .not('customer_email', 'is', null)
      .neq('customer_email', '')

    if (bookingsError) {
      console.error('[cron/booking-reminders] Failed to query bookings:', bookingsError)
      return NextResponse.json(
        { success: false, error: 'Failed to query bookings' },
        { status: 500 }
      )
    }

    const allBookings = bookings || []

    if (allBookings.length === 0) {
      return NextResponse.json({
        success: true,
        date: tomorrowDate,
        bookingsFound: 0,
        emailsSent: 0,
        emailsFailed: 0,
        surveyorNotifications: 0,
        errors: [],
      })
    }

    // 3. Check notification preferences (once — applies to all bookings)
    const emailEnabled = await isNotificationEnabled('booking_reminder', 'email')
    const inAppEnabled = await isNotificationEnabled('booking_reminder', 'in_app')

    // 4. Batch duplicate check — find all booking_reminder logs for these bookings today
    const bookingIds = allBookings.map((b: Record<string, unknown>) => b.id as string)

    const { data: existingLogs } = await db
      .from('communication_log')
      .select('booking_id')
      .eq('template_name', 'booking_reminder')
      .in('booking_id', bookingIds)
      .gte('created_at', todayDate)

    const alreadyRemindedSet = new Set(
      (existingLogs || []).map((row: { booking_id: string }) => row.booking_id)
    )

    // 5. Process each booking
    let emailsSent = 0
    let emailsFailed = 0
    let surveyorNotifications = 0
    const errors: string[] = []

    for (const row of allBookings) {
      const bookingRecord = row as Record<string, unknown>
      const bookingId = bookingRecord.id as string
      const surveyorId = bookingRecord.surveyor_id as string
      const surveyId = (bookingRecord.survey_id as string | null) ?? undefined
      const customerName = bookingRecord.customer_name as string
      const customerEmail = bookingRecord.customer_email as string
      const customerAddress = (bookingRecord.customer_address as string | null) || 'the property'
      const bookingDate = bookingRecord.booking_date as string
      const startTime = bookingRecord.start_time as string

      const surveyorProfile = bookingRecord.user_profiles as
        | { display_name: string }
        | null
      const surveyorName = surveyorProfile?.display_name ?? 'Your surveyor'

      // 5a. Send customer reminder email (if enabled and not already sent today)
      if (emailEnabled && !alreadyRemindedSet.has(bookingId)) {
        try {
          const template = await bookingReminderEmail({
            customerName,
            bookingDate: formatBookingDate(bookingDate),
            bookingTime: formatBookingTime(startTime),
            surveyorName,
            siteAddress: customerAddress,
          })

          const result = await sendEmail({
            to: customerEmail,
            subject: template.subject,
            html: template.html,
            templateName: 'booking_reminder',
            bookingId,
            surveyId,
            recipientName: customerName,
          })

          if (result.success) {
            emailsSent++
          } else {
            emailsFailed++
            errors.push(`booking ${bookingId}: ${result.error || 'send failed'}`)
          }
        } catch (err) {
          emailsFailed++
          const msg = err instanceof Error ? err.message : 'Unknown error'
          errors.push(`booking ${bookingId}: ${msg}`)
        }
      }

      // 5b. Create in-app notification for the surveyor
      if (inAppEnabled) {
        try {
          const notification: NotificationCreateData = {
            user_id: surveyorId,
            type: 'booking_reminder',
            title: `Survey tomorrow — ${customerName}`,
            message: `${formatBookingTime(startTime)} at ${customerAddress}`,
            link_url: '/calendar',
            booking_id: bookingId,
          }

          const { error: notifError } = await db
            .from('notifications')
            .insert(notification)

          if (notifError) {
            console.error(`[cron/booking-reminders] Notification insert failed for booking ${bookingId}:`, notifError)
          } else {
            surveyorNotifications++
          }
        } catch (err) {
          console.error(`[cron/booking-reminders] Notification error for booking ${bookingId}:`, err)
        }
      }
    }

    // 6. Return summary
    return NextResponse.json({
      success: true,
      date: tomorrowDate,
      bookingsFound: allBookings.length,
      emailsSent,
      emailsFailed,
      surveyorNotifications,
      errors,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[cron/booking-reminders] Unhandled error:', msg)
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    )
  }
}
