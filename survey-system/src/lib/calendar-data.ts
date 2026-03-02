// =============================================================================
// Calendar Data Layer — Supabase query functions for the booking & availability
// system. Follows the same patterns as supabase-data.ts and pricing-data.ts.
// =============================================================================

import { getSupabase } from './supabase-client'
import type {
  SurveyorAvailability,
  AvailabilityBlock,
  SurveyBooking,
  Notification,
  SurveyorWithAvailability,
  TimeSlot,
  BookingFormData,
  AvailabilitySlotInput,
  BlockType,
  BookingStatus,
  NotificationType,
} from './calendar-types'

// Re-export types for convenience
export type {
  SurveyorAvailability,
  AvailabilityBlock,
  SurveyBooking,
  Notification,
  SurveyorWithAvailability,
  TimeSlot,
  BookingFormData,
  AvailabilitySlotInput,
  BlockType,
  BookingStatus,
  NotificationType,
}

// =============================================================================
// Time Helpers (internal)
// =============================================================================

/** Convert "HH:MM" or "HH:MM:SS" to total minutes from midnight */
function timeToMinutes(time: string): number {
  const parts = time.split(':')
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

/** Convert total minutes from midnight to "HH:MM" */
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

/** Format a Date to "YYYY-MM-DD" without timezone ambiguity */
function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Create a Date at noon local time to avoid DST edge cases */
function noonDate(dateStr: string): Date {
  return new Date(dateStr + 'T12:00:00')
}

/**
 * Subtract booked ranges from an available window.
 * Returns the remaining free ranges after removing all overlapping bookings.
 */
function subtractRanges(
  available: { start: number; end: number },
  booked: Array<{ start: number; end: number }>
): Array<{ start: number; end: number }> {
  const result: Array<{ start: number; end: number }> = []
  let cursor = available.start

  for (const b of booked) {
    // Skip bookings entirely outside our window
    if (b.end <= available.start || b.start >= available.end) continue

    const bookStart = Math.max(b.start, available.start)
    const bookEnd = Math.min(b.end, available.end)

    if (bookStart > cursor) {
      result.push({ start: cursor, end: bookStart })
    }
    cursor = Math.max(cursor, bookEnd)
  }

  if (cursor < available.end) {
    result.push({ start: cursor, end: available.end })
  }

  return result
}

// =============================================================================
// Surveyor Availability
// =============================================================================

/**
 * Get all weekly availability rows for one surveyor.
 */
export async function getSurveyorAvailability(
  surveyorId: string
): Promise<SurveyorAvailability[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('surveyor_availability')
    .select('*')
    .eq('surveyor_id', surveyorId)
    .order('day_of_week')
    .order('start_time')

  if (error) {
    console.error('Error fetching surveyor availability:', error)
    return []
  }

  return data || []
}

/**
 * Get availability for all active surveyors, joined with profile names.
 */
export async function getAllSurveyorAvailability(): Promise<
  (SurveyorAvailability & { surveyor_name: string })[]
> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('surveyor_availability')
    .select('*, user_profiles!surveyor_availability_surveyor_id_fkey(display_name)')
    .order('day_of_week')
    .order('start_time')

  if (error) {
    console.error('Error fetching all surveyor availability:', error)
    return []
  }

  return (data || []).map((row: Record<string, unknown>) => {
    const profile = row.user_profiles as { display_name: string } | null
    return {
      ...(row as unknown as SurveyorAvailability),
      surveyor_name: profile?.display_name || 'Unknown',
    }
  })
}

/**
 * Replace all availability rows for a surveyor (delete existing + insert new).
 * Each slot: { dayOfWeek, startTime, endTime, isActive }
 */
export async function setSurveyorAvailability(
  surveyorId: string,
  slots: AvailabilitySlotInput[]
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Delete all existing rows for this surveyor
  const { error: deleteError } = await supabase
    .from('surveyor_availability')
    .delete()
    .eq('surveyor_id', surveyorId)

  if (deleteError) {
    console.error('Error clearing surveyor availability:', deleteError)
    throw new Error(`Failed to clear availability: ${deleteError.message}`)
  }

  // Insert new rows (skip if empty — surveyor has no working hours)
  if (slots.length === 0) return true

  const rows = slots.map((slot) => ({
    surveyor_id: surveyorId,
    day_of_week: slot.dayOfWeek,
    start_time: slot.startTime,
    end_time: slot.endTime,
    is_active: slot.isActive,
  }))

  const { error: insertError } = await supabase
    .from('surveyor_availability')
    .insert(rows)

  if (insertError) {
    console.error('Error inserting surveyor availability:', insertError)
    throw new Error(`Failed to set availability: ${insertError.message}`)
  }

  return true
}

// =============================================================================
// Availability Blocks
// =============================================================================

/**
 * Get blocks for a surveyor, optionally filtered by date range.
 */
export async function getAvailabilityBlocks(
  surveyorId: string,
  startDate?: string,
  endDate?: string
): Promise<AvailabilityBlock[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('availability_blocks')
    .select('*')
    .eq('surveyor_id', surveyorId)
    .order('start_date')

  if (startDate) {
    query = query.gte('end_date', startDate)
  }
  if (endDate) {
    query = query.lte('start_date', endDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching availability blocks:', error)
    return []
  }

  return data || []
}

/**
 * Get blocks for all surveyors in a date range (for calendar hub view).
 */
export async function getAllAvailabilityBlocks(
  startDate?: string,
  endDate?: string
): Promise<(AvailabilityBlock & { surveyor_name: string })[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('availability_blocks')
    .select('*, user_profiles!availability_blocks_surveyor_id_fkey(display_name)')
    .order('start_date')

  if (startDate) {
    query = query.gte('end_date', startDate)
  }
  if (endDate) {
    query = query.lte('start_date', endDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching all availability blocks:', error)
    return []
  }

  return (data || []).map((row: Record<string, unknown>) => {
    const profile = row.user_profiles as { display_name: string } | null
    return {
      ...(row as unknown as AvailabilityBlock),
      surveyor_name: profile?.display_name || 'Unknown',
    }
  })
}

/**
 * Create a new availability block (annual leave, sickness, etc.).
 */
export async function createAvailabilityBlock(blockData: {
  surveyor_id: string
  start_date: string
  end_date: string
  block_type: BlockType
  reason?: string | null
  created_by: string
}): Promise<AvailabilityBlock> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('availability_blocks')
    .insert(blockData)
    .select()
    .single()

  if (error) {
    console.error('Error creating availability block:', error)
    throw new Error(`Failed to create availability block: ${error.message}`)
  }

  return data
}

/**
 * Update an existing availability block.
 */
export async function updateAvailabilityBlock(
  id: string,
  updates: Partial<{
    start_date: string
    end_date: string
    block_type: BlockType
    reason: string | null
  }>
): Promise<AvailabilityBlock> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('availability_blocks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating availability block:', error)
    throw new Error(`Failed to update availability block: ${error.message}`)
  }

  return data
}

/**
 * Delete an availability block.
 */
export async function deleteAvailabilityBlock(id: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { error } = await supabase
    .from('availability_blocks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting availability block:', error)
    return false
  }

  return true
}

// =============================================================================
// Bookings
// =============================================================================

/**
 * Get a single booking with surveyor name joined.
 */
export async function getBooking(id: string): Promise<SurveyBooking | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('survey_bookings')
    .select('*, user_profiles!survey_bookings_surveyor_id_fkey(display_name)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching booking:', error)
    return null
  }

  const profile = (data as Record<string, unknown>).user_profiles as { display_name: string } | null
  return {
    ...(data as unknown as SurveyBooking),
    surveyor_name: profile?.display_name || null,
  }
}

/**
 * Get bookings for one surveyor in a date range.
 */
export async function getBookingsForSurveyor(
  surveyorId: string,
  startDate?: string,
  endDate?: string
): Promise<SurveyBooking[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('survey_bookings')
    .select('*')
    .eq('surveyor_id', surveyorId)
    .order('booking_date')
    .order('start_time')

  if (startDate) {
    query = query.gte('booking_date', startDate)
  }
  if (endDate) {
    query = query.lte('booking_date', endDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching surveyor bookings:', error)
    return []
  }

  return data || []
}

/**
 * Get all bookings in a date range with surveyor names joined (for calendar hub).
 */
export async function getAllBookings(
  startDate?: string,
  endDate?: string
): Promise<SurveyBooking[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('survey_bookings')
    .select('*, user_profiles!survey_bookings_surveyor_id_fkey(display_name)')
    .order('booking_date')
    .order('start_time')

  if (startDate) {
    query = query.gte('booking_date', startDate)
  }
  if (endDate) {
    query = query.lte('booking_date', endDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching all bookings:', error)
    return []
  }

  return (data || []).map((row: Record<string, unknown>) => {
    const profile = row.user_profiles as { display_name: string } | null
    return {
      ...(row as unknown as SurveyBooking),
      surveyor_name: profile?.display_name || null,
    }
  })
}

/**
 * Get the booking linked to a specific survey.
 */
export async function getBookingBySurveyId(
  surveyId: string
): Promise<SurveyBooking | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('survey_bookings')
    .select('*, user_profiles!survey_bookings_surveyor_id_fkey(display_name)')
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Error fetching booking by survey ID:', error)
    return null
  }

  if (!data) return null

  const profile = (data as Record<string, unknown>).user_profiles as { display_name: string } | null
  return {
    ...(data as unknown as SurveyBooking),
    surveyor_name: profile?.display_name || null,
  }
}

/**
 * Create a new booking. Automatically notifies the assigned surveyor.
 * Returns the created booking.
 */
export async function createBooking(
  formData: BookingFormData
): Promise<SurveyBooking> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_bookings')
    .insert({
      survey_id: formData.surveyId || null,
      surveyor_id: formData.surveyorId,
      customer_name: formData.customerName,
      customer_phone: formData.customerPhone || null,
      customer_email: formData.customerEmail || null,
      customer_address: formData.customerAddress || null,
      booking_date: formData.bookingDate,
      start_time: formData.startTime,
      end_time: formData.endTime,
      notes: formData.notes || null,
      created_by: formData.createdBy,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating booking:', error)
    throw new Error(`Failed to create booking: ${error.message}`)
  }

  // Auto-notify the surveyor (fire-and-forget — don't block the booking)
  notifyBookingCreated(data as SurveyBooking).catch((err) =>
    console.error('Failed to send booking notification:', err)
  )

  return data as SurveyBooking
}

/**
 * Partial update for a booking (status changes, reschedule, notes).
 * Automatically notifies the surveyor of changes.
 */
export async function updateBooking(
  id: string,
  updates: Partial<{
    survey_id: string | null
    surveyor_id: string
    customer_name: string
    customer_phone: string | null
    customer_email: string | null
    customer_address: string | null
    booking_date: string
    start_time: string
    end_time: string
    status: BookingStatus
    notes: string | null
  }>
): Promise<SurveyBooking> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating booking:', error)
    throw new Error(`Failed to update booking: ${error.message}`)
  }

  // Auto-notify the surveyor (fire-and-forget)
  notifyBookingUpdated(data as SurveyBooking, updates).catch((err) =>
    console.error('Failed to send booking update notification:', err)
  )

  return data as SurveyBooking
}

/**
 * Cancel a booking. Sets status to 'cancelled' and notifies the surveyor.
 */
export async function cancelBooking(id: string): Promise<SurveyBooking> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_bookings')
    .update({ status: 'cancelled' as BookingStatus })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error cancelling booking:', error)
    throw new Error(`Failed to cancel booking: ${error.message}`)
  }

  // Auto-notify the surveyor (fire-and-forget)
  notifyBookingCancelled(data as SurveyBooking).catch((err) =>
    console.error('Failed to send cancellation notification:', err)
  )

  return data as SurveyBooking
}

// =============================================================================
// Notifications
// =============================================================================

/**
 * Get notifications for a user, ordered by newest first.
 */
export async function getNotificationsForUser(
  userId: string,
  limit?: number
): Promise<Notification[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching notifications:', error)
    return []
  }

  return data || []
}

/**
 * Count of unread notifications for a user (for the bell badge).
 */
export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = getSupabase()
  if (!supabase) return 0

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) {
    console.error('Error fetching unread count:', error)
    return 0
  }

  return count || 0
}

/**
 * Mark a single notification as read.
 */
export async function markAsRead(notificationId: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)

  if (error) {
    console.error('Error marking notification as read:', error)
    return false
  }

  return true
}

/**
 * Mark all notifications as read for a user.
 */
export async function markAllAsRead(userId: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }

  return true
}

/**
 * Create a notification.
 */
export async function createNotification(notificationData: {
  user_id: string
  type: NotificationType
  title: string
  message: string
  booking_id?: string | null
}): Promise<Notification | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('notifications')
    .insert(notificationData)
    .select()
    .single()

  if (error) {
    console.error('Error creating notification:', error)
    return null
  }

  return data
}

// =============================================================================
// Availability Resolution (Slot Picker)
// =============================================================================

/**
 * Core availability resolver for the slot picker.
 *
 * For each day in the date range:
 * 1. Get the surveyor's standard availability for that day of week
 * 2. Check if any availability_blocks cover that date — if so, skip the day
 * 3. Get existing non-cancelled bookings for that date
 * 4. Subtract booked time ranges from available time ranges
 * 5. Split remaining free time into chunks of slotDurationMinutes
 *
 * All three database queries are batched (one each for availability, blocks,
 * bookings) rather than querying per-day.
 */
export async function getAvailableSlots(
  surveyorId: string,
  startDate: string,
  endDate: string,
  slotDurationMinutes: number = 60
): Promise<TimeSlot[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  // Batch all 3 queries in parallel
  const [availabilityResult, blocksResult, bookingsResult] = await Promise.all([
    supabase
      .from('surveyor_availability')
      .select('*')
      .eq('surveyor_id', surveyorId)
      .eq('is_active', true),
    supabase
      .from('availability_blocks')
      .select('*')
      .eq('surveyor_id', surveyorId)
      .lte('start_date', endDate)
      .gte('end_date', startDate),
    supabase
      .from('survey_bookings')
      .select('*')
      .eq('surveyor_id', surveyorId)
      .neq('status', 'cancelled')
      .gte('booking_date', startDate)
      .lte('booking_date', endDate),
  ])

  if (availabilityResult.error) {
    console.error('Error loading availability:', availabilityResult.error)
    return []
  }
  if (blocksResult.error) {
    console.error('Error loading blocks:', blocksResult.error)
    return []
  }
  if (bookingsResult.error) {
    console.error('Error loading bookings:', bookingsResult.error)
    return []
  }

  const availability = availabilityResult.data || []
  const blocks = blocksResult.data || []
  const bookings = bookingsResult.data || []

  // Build day-of-week → availability windows map
  const availByDay = new Map<number, Array<{ start: number; end: number }>>()
  for (const slot of availability) {
    const daySlots = availByDay.get(slot.day_of_week) || []
    daySlots.push({
      start: timeToMinutes(slot.start_time),
      end: timeToMinutes(slot.end_time),
    })
    availByDay.set(slot.day_of_week, daySlots)
  }

  // Build set of blocked dates (expand each block's date range)
  const blockedDates = new Set<string>()
  for (const block of blocks) {
    const current = noonDate(block.start_date)
    const blockEnd = noonDate(block.end_date)
    while (current <= blockEnd) {
      blockedDates.add(formatDate(current))
      current.setDate(current.getDate() + 1)
    }
  }

  // Build date → booked time ranges map
  const bookingsByDate = new Map<
    string,
    Array<{ start: number; end: number }>
  >()
  for (const booking of bookings) {
    const dateBookings = bookingsByDate.get(booking.booking_date) || []
    dateBookings.push({
      start: timeToMinutes(booking.start_time),
      end: timeToMinutes(booking.end_time),
    })
    bookingsByDate.set(booking.booking_date, dateBookings)
  }

  // Iterate through each day in the requested range
  const slots: TimeSlot[] = []
  const current = noonDate(startDate)
  const rangeEnd = noonDate(endDate)

  while (current <= rangeEnd) {
    const dateStr = formatDate(current)
    const dayOfWeek = current.getDay() // 0 = Sunday

    // Skip if any block covers this date
    if (blockedDates.has(dateStr)) {
      current.setDate(current.getDate() + 1)
      continue
    }

    // Get standard availability windows for this weekday
    const windows = availByDay.get(dayOfWeek) || []
    if (windows.length === 0) {
      current.setDate(current.getDate() + 1)
      continue
    }

    // Get bookings for this date, sorted by start time
    const dayBookings = (bookingsByDate.get(dateStr) || []).sort(
      (a, b) => a.start - b.start
    )

    // For each availability window, subtract bookings and split into slots
    for (const window of windows) {
      const freeRanges = subtractRanges(window, dayBookings)

      for (const range of freeRanges) {
        let slotStart = range.start
        while (slotStart + slotDurationMinutes <= range.end) {
          slots.push({
            date: dateStr,
            startTime: minutesToTime(slotStart),
            endTime: minutesToTime(slotStart + slotDurationMinutes),
          })
          slotStart += slotDurationMinutes
        }
      }
    }

    current.setDate(current.getDate() + 1)
  }

  return slots
}

// =============================================================================
// Auto-Notification Helpers
// =============================================================================

/**
 * Notify the assigned surveyor when a booking is created.
 * Called automatically by createBooking().
 */
async function notifyBookingCreated(booking: SurveyBooking): Promise<void> {
  await createNotification({
    user_id: booking.surveyor_id,
    type: 'booking_created',
    title: 'New Survey Booking',
    message: `Survey booked for ${booking.customer_name} on ${booking.booking_date} at ${booking.start_time}.`,
    booking_id: booking.id,
  })
}

/**
 * Notify the surveyor when their booking is cancelled.
 * Called automatically by cancelBooking().
 */
async function notifyBookingCancelled(booking: SurveyBooking): Promise<void> {
  await createNotification({
    user_id: booking.surveyor_id,
    type: 'booking_cancelled',
    title: 'Booking Cancelled',
    message: `Survey for ${booking.customer_name} on ${booking.booking_date} at ${booking.start_time} has been cancelled.`,
    booking_id: booking.id,
  })
}

/**
 * Notify the surveyor when their booking is rescheduled or modified.
 * Called automatically by updateBooking().
 */
async function notifyBookingUpdated(
  booking: SurveyBooking,
  changes: Record<string, unknown>
): Promise<void> {
  // Build a human-readable summary of what changed
  const descriptions: string[] = []

  if (changes.booking_date || changes.start_time || changes.end_time) {
    descriptions.push(
      `rescheduled to ${booking.booking_date} at ${booking.start_time}`
    )
  }
  if (changes.status && changes.status !== 'cancelled') {
    descriptions.push(`status changed to ${changes.status}`)
  }
  if (changes.notes !== undefined) {
    descriptions.push('notes updated')
  }

  // Skip notification if nothing meaningful changed (e.g. only updated_at)
  if (descriptions.length === 0) return

  const detail = descriptions.join(', ')

  await createNotification({
    user_id: booking.surveyor_id,
    type: 'booking_updated',
    title: 'Booking Updated',
    message: `Survey for ${booking.customer_name}: ${detail}.`,
    booking_id: booking.id,
  })
}
