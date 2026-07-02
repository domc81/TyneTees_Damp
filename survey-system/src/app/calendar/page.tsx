'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Link from 'next/link'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput, DatesSetArg, EventClickArg } from '@fullcalendar/core'
import {
  Calendar as CalendarIcon,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Settings,
  Loader2,
  Navigation,
  List,
  CreditCard,
  RefreshCw,
  DollarSign,
} from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import {
  getAllBookings,
  getAllAvailabilityBlocks,
  updateBooking,
  cancelBooking,
} from '@/lib/calendar-data'
import {
  type SurveyBooking,
  type AvailabilityBlock,
  type BookingStatus,
  type BlockType,
  BOOKING_STATUS_TRANSITIONS,
} from '@/lib/calendar-types'
import { getPaymentByBookingId } from '@/lib/payment-data'
import type { Payment, PaymentMethod } from '@/types/database.types'
import { SlotPicker, type SelectedSlot } from '@/components/calendar/SlotPicker'
import type { UserProfile } from '@/types/database.types'

// =============================================================================
// Constants
// =============================================================================

/** Surveyor colour palette — works on dark backgrounds */
const SURVEYOR_COLOURS = [
  { bg: '#3b82f6', border: '#2563eb', text: '#ffffff' }, // blue
  { bg: '#10b981', border: '#059669', text: '#ffffff' }, // emerald
  { bg: '#f59e0b', border: '#d97706', text: '#1a1a1a' }, // amber
  { bg: '#8b5cf6', border: '#7c3aed', text: '#ffffff' }, // violet
  { bg: '#ec4899', border: '#db2777', text: '#ffffff' }, // pink
  { bg: '#06b6d4', border: '#0891b2', text: '#ffffff' }, // cyan
  { bg: '#f97316', border: '#ea580c', text: '#ffffff' }, // orange
  { bg: '#14b8a6', border: '#0d9488', text: '#ffffff' }, // teal
]

const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  annual_leave: 'Annual Leave',
  sickness: 'Sickness',
  training: 'Training',
  other: 'Absence',
}

const STATUS_CONFIG: Record<BookingStatus, { label: string; colour: string; icon: typeof CheckCircle }> = {
  provisional: { label: 'Awaiting Payment', colour: 'bg-amber-500/20 text-amber-300', icon: Clock },
  scheduled: { label: 'Scheduled', colour: 'bg-blue-500/20 text-blue-300', icon: Clock },
  completed: { label: 'Completed', colour: 'bg-green-500/20 text-green-300', icon: CheckCircle },
  cancelled: { label: 'Cancelled', colour: 'bg-red-500/20 text-red-300', icon: XCircle },
  no_show: { label: 'No Show', colour: 'bg-amber-500/20 text-amber-300', icon: AlertTriangle },
}

// =============================================================================
// Helpers
// =============================================================================

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(timeStr: string): string {
  return timeStr.slice(0, 5) // "HH:MM:SS" → "HH:MM"
}

function getSurveyorColour(surveyorId: string, colourMap: Map<string, number>): typeof SURVEYOR_COLOURS[0] {
  const idx = colourMap.get(surveyorId) ?? 0
  return SURVEYOR_COLOURS[idx % SURVEYOR_COLOURS.length]
}

function getDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
}

function getTodayStr(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = (now.getMonth() + 1).toString().padStart(2, '0')
  const d = now.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Simple mobile detection hook — ≤768px viewport width */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

// =============================================================================
// Main Page
// =============================================================================

export default function CalendarPage() {
  const { isAdmin, isOffice, isSurveyor, isLoading: authLoading, profile } = useAuth()
  const calendarRef = useRef<FullCalendar>(null)
  const isMobile = useIsMobile()

  // Surveyors list
  const [surveyors, setSurveyors] = useState<UserProfile[]>([])
  const [surveyorColourMap, setSurveyorColourMap] = useState<Map<string, number>>(new Map())
  const [selectedSurveyorIds, setSelectedSurveyorIds] = useState<Set<string>>(new Set())
  const [showAllSurveyors, setShowAllSurveyors] = useState(true)

  // Calendar data
  const [bookings, setBookings] = useState<SurveyBooking[]>([])
  const [blocks, setBlocks] = useState<(AvailabilityBlock & { surveyor_name: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)

  // Current visible date range
  const [visibleRange, setVisibleRange] = useState<{ start: string; end: string } | null>(null)

  // Detail modal
  const [selectedBooking, setSelectedBooking] = useState<SurveyBooking | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Agenda toggle for surveyors
  const [showAgenda, setShowAgenda] = useState(true)

  const supabase = createClient()

  const isAdminOrOffice = isAdmin || isOffice
  const isSurveyorOnly = isSurveyor && !isAdminOrOffice

  // ─── Load surveyors ────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return

    const load = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('is_surveyor', true)
        .eq('is_active', true)
        .order('display_name')

      if (error) {
        console.error('Failed to load surveyors:', error)
        setLoading(false)
        return
      }

      const surveyorList = data || []
      setSurveyors(surveyorList)

      // Build colour map
      const cMap = new Map<string, number>()
      surveyorList.forEach((s, i) => cMap.set(s.id, i))
      setSurveyorColourMap(cMap)

      // Default filter: surveyor sees only themselves
      if (isSurveyorOnly && profile) {
        setSelectedSurveyorIds(new Set([profile.id]))
        setShowAllSurveyors(false)
      } else {
        setSelectedSurveyorIds(new Set(surveyorList.map(s => s.id)))
        setShowAllSurveyors(true)
      }

      setLoading(false)
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading])

  // ─── Fetch calendar data for visible range ─────────────────────────
  const fetchCalendarData = useCallback(async (start: string, end: string) => {
    setDataLoading(true)
    const [bookingData, blockData] = await Promise.all([
      getAllBookings(start, end),
      getAllAvailabilityBlocks(start, end),
    ])
    setBookings(bookingData)
    setBlocks(blockData)
    setDataLoading(false)
  }, [])

  // Refetch when visible range changes
  useEffect(() => {
    if (visibleRange) {
      fetchCalendarData(visibleRange.start, visibleRange.end)
    }
  }, [visibleRange, fetchCalendarData])

  const handleDatesSet = useCallback((arg: DatesSetArg) => {
    const start = arg.startStr.slice(0, 10)
    const end = arg.endStr.slice(0, 10)
    setVisibleRange({ start, end })
  }, [])

  // ─── Filter logic ──────────────────────────────────────────────────
  const handleSurveyorToggle = (surveyorId: string) => {
    if (isSurveyorOnly) return // locked filter
    setSelectedSurveyorIds(prev => {
      const next = new Set(prev)
      if (next.has(surveyorId)) {
        next.delete(surveyorId)
      } else {
        next.add(surveyorId)
      }
      setShowAllSurveyors(next.size === surveyors.length)
      return next
    })
  }

  const handleToggleAll = () => {
    if (isSurveyorOnly) return
    if (showAllSurveyors) {
      setSelectedSurveyorIds(new Set())
      setShowAllSurveyors(false)
    } else {
      setSelectedSurveyorIds(new Set(surveyors.map(s => s.id)))
      setShowAllSurveyors(true)
    }
  }

  // ─── Build FullCalendar events ─────────────────────────────────────
  const filteredBookings = bookings.filter(b => selectedSurveyorIds.has(b.surveyor_id))
  const filteredBlocks = blocks.filter(b => selectedSurveyorIds.has(b.surveyor_id))

  const showMultipleSurveyors = selectedSurveyorIds.size > 1

  const bookingEvents: EventInput[] = filteredBookings.map(booking => {
    const colour = getSurveyorColour(booking.surveyor_id, surveyorColourMap)
    const isCancelled = booking.status === 'cancelled'
    const isCompleted = booking.status === 'completed'
    const isProvisional = booking.status === 'provisional'

    // Build title
    let title = booking.customer_name
    if (isProvisional) title = `⏳ ${title}`
    if (showMultipleSurveyors && booking.surveyor_name) {
      title += ` — ${booking.surveyor_name}`
    }

    // Colour overrides for status
    let bgColour = colour.bg
    let borderColour = colour.border
    let textColour = colour.text
    if (isCancelled) {
      bgColour = 'rgba(100, 100, 100, 0.5)'
      borderColour = 'rgba(100, 100, 100, 0.6)'
      textColour = 'rgba(255, 255, 255, 0.6)'
    } else if (isCompleted) {
      bgColour = '#16a34a'
      borderColour = '#15803d'
      textColour = '#ffffff'
    } else if (isProvisional) {
      bgColour = 'rgba(245, 158, 11, 0.3)'
      borderColour = 'rgba(245, 158, 11, 0.6)'
      textColour = '#fbbf24'
    }

    const classNames: string[] = []
    if (isCancelled) classNames.push('fc-event-cancelled')
    if (isCompleted) classNames.push('fc-event-completed')
    if (isProvisional) classNames.push('fc-event-provisional')

    return {
      id: `booking-${booking.id}`,
      title,
      start: `${booking.booking_date}T${booking.start_time}`,
      end: `${booking.booking_date}T${booking.end_time}`,
      backgroundColor: bgColour,
      borderColor: borderColour,
      textColor: textColour,
      classNames,
      extendedProps: {
        type: 'booking',
        booking,
      },
    }
  })

  const blockEvents: EventInput[] = filteredBlocks.flatMap(block => {
    const colour = getSurveyorColour(block.surveyor_id, surveyorColourMap)
    const label = `${BLOCK_TYPE_LABELS[block.block_type]} — ${block.surveyor_name}`

    // Expand multi-day blocks into individual background events
    const events: EventInput[] = []
    const startDate = new Date(block.start_date + 'T12:00:00')
    const endDate = new Date(block.end_date + 'T12:00:00')
    const current = new Date(startDate)

    while (current <= endDate) {
      const dateStr = current.toISOString().slice(0, 10)
      events.push({
        id: `block-${block.id}-${dateStr}`,
        title: label,
        start: dateStr,
        end: dateStr,
        display: 'background',
        backgroundColor: colour.bg,
        extendedProps: {
          type: 'block',
          block,
        },
      })
      current.setDate(current.getDate() + 1)
    }

    return events
  })

  const allEvents = [...bookingEvents, ...blockEvents]

  // ─── Today's bookings for surveyor agenda ────────────────────────
  const todayBookings = useMemo(() => {
    if (!isSurveyorOnly) return []
    const today = getTodayStr()
    return filteredBookings
      .filter(b => b.booking_date === today && b.status !== 'cancelled')
      .sort((a, b) => a.start_time.localeCompare(b.start_time))
  }, [filteredBookings, isSurveyorOnly])

  // ─── Event click handler ───────────────────────────────────────────
  const handleEventClick = (info: EventClickArg) => {
    const props = info.event.extendedProps
    if (props.type === 'booking') {
      setSelectedBooking(props.booking as SurveyBooking)
      setActionMessage(null)
    }
    // Ignore clicks on background events (blocks)
  }

  // ─── Status change actions ─────────────────────────────────────────
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    setActionLoading(true)
    setActionMessage(null)
    try {
      if (newStatus === 'cancelled') {
        await cancelBooking(bookingId)
        // Await cancellation email and surface errors (#30)
        try {
          const emailRes = await fetch('/api/bookings/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, eventType: 'booking_cancelled' }),
          })
          if (!emailRes.ok) {
            toast.warning('Booking cancelled but notification email failed — contact customer manually')
          }
        } catch {
          toast.warning('Booking cancelled but notification email failed — contact customer manually')
        }
      } else {
        await updateBooking(bookingId, { status: newStatus })
      }
      setActionMessage({ type: 'success', text: `Booking marked as ${STATUS_CONFIG[newStatus].label.toLowerCase()}` })

      // Refresh calendar data
      if (visibleRange) {
        await fetchCalendarData(visibleRange.start, visibleRange.end)
      }

      // Update the selected booking in-place so the modal reflects the change
      setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update booking'
      setActionMessage({ type: 'error', text: msg })
    } finally {
      setActionLoading(false)
    }
  }

  // ─── Reschedule handler ───────────────────────────────────────────
  const handleReschedule = async (bookingId: string, slot: SelectedSlot) => {
    setActionLoading(true)
    setActionMessage(null)
    try {
      await updateBooking(bookingId, {
        booking_date: slot.date,
        start_time: slot.startTime,
        end_time: slot.endTime,
        surveyor_id: slot.surveyorId,
      })
      setActionMessage({ type: 'success', text: 'Booking rescheduled successfully' })

      if (visibleRange) {
        await fetchCalendarData(visibleRange.start, visibleRange.end)
      }

      setSelectedBooking(prev => prev ? {
        ...prev,
        booking_date: slot.date,
        start_time: slot.startTime,
        end_time: slot.endTime,
        surveyor_id: slot.surveyorId,
        surveyor_name: slot.surveyorName,
      } : null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reschedule booking'
      setActionMessage({ type: 'error', text: msg })
    } finally {
      setActionLoading(false)
    }
  }

  const handleNotesUpdate = async (bookingId: string, notes: string) => {
    setActionLoading(true)
    setActionMessage(null)
    try {
      await updateBooking(bookingId, { notes: notes || null })
      setActionMessage({ type: 'success', text: 'Notes updated' })

      if (visibleRange) {
        await fetchCalendarData(visibleRange.start, visibleRange.end)
      }

      setSelectedBooking(prev => prev ? { ...prev, notes: notes || null } : null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update notes'
      setActionMessage({ type: 'error', text: msg })
    } finally {
      setActionLoading(false)
    }
  }

  // ─── Mark payment as paid handler ──────────────────────────────────
  const handleMarkPaid = async (paymentId: string, method: PaymentMethod) => {
    setActionLoading(true)
    setActionMessage(null)
    try {
      const res = await fetch(`/api/payments/${paymentId}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      })
      if (!res.ok) throw new Error('Failed to mark payment')
      setActionMessage({ type: 'success', text: 'Payment recorded and booking confirmed' })
      if (visibleRange) await fetchCalendarData(visibleRange.start, visibleRange.end)
      setSelectedBooking(prev => prev ? { ...prev, status: 'scheduled' } : null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to record payment'
      setActionMessage({ type: 'error', text: msg })
    } finally {
      setActionLoading(false)
    }
  }

  // Surveyor default view: day view on mobile, week on desktop
  const surveyorInitialView = isSurveyorOnly
    ? (isMobile ? 'timeGridDay' : 'timeGridDay')
    : 'timeGridWeek'

  // ─── Render ────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading calendar...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-4">
          {/* ── Header ──────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-brand-400" />
                {isSurveyorOnly ? 'My Schedule' : 'Calendar'}
              </h2>
              <p className="text-sm text-white/60 mt-1">
                {isSurveyorOnly
                  ? 'Your survey schedule and daily agenda'
                  : 'All surveyors\u2019 schedules at a glance'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isSurveyorOnly && (
                <button
                  onClick={() => setShowAgenda(prev => !prev)}
                  className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all ${
                    showAgenda
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
                      : 'btn-secondary'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Today&apos;s Agenda
                </button>
              )}

              {isAdminOrOffice && (
                <Link
                  href="/admin/availability"
                  className="btn-secondary flex items-center gap-2 text-sm w-fit"
                >
                  <Settings className="w-4 h-4" />
                  Manage Availability
                </Link>
              )}
            </div>
          </div>

          {/* ── Surveyor Agenda (surveyor role only) ──────────────── */}
          {isSurveyorOnly && showAgenda && (
            <SurveyorAgenda
              bookings={todayBookings}
              actionLoading={actionLoading}
              onBookingClick={(booking) => {
                setSelectedBooking(booking)
                setActionMessage(null)
              }}
              onQuickComplete={(bookingId) => handleStatusChange(bookingId, 'completed')}
            />
          )}

          {/* ── Surveyor Filter ──────────────────────────────────── */}
          {surveyors.length > 0 && !isSurveyorOnly && (
            <div className="section-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white/60 mr-1">Surveyors:</span>

                <button
                  onClick={handleToggleAll}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    showAllSurveyors
                      ? 'bg-brand-500/30 text-brand-300 border border-brand-400/30'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  All
                </button>

                {surveyors.map(s => {
                  const colour = getSurveyorColour(s.id, surveyorColourMap)
                  const isSelected = selectedSurveyorIds.has(s.id)

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSurveyorToggle(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border text-white'
                          : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                      }`}
                      style={isSelected ? {
                        backgroundColor: `${colour.bg}25`,
                        borderColor: `${colour.bg}60`,
                      } : undefined}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: isSelected ? colour.bg : 'rgba(255,255,255,0.2)' }}
                      />
                      {s.display_name}
                    </button>
                  )
                })}
              </div>

              {/* Colour legend when showing multiple surveyors */}
              {showMultipleSurveyors && (
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/5">
                  <span className="text-xs text-white/40">Legend:</span>
                  {surveyors.filter(s => selectedSurveyorIds.has(s.id)).map(s => {
                    const colour = getSurveyorColour(s.id, surveyorColourMap)
                    return (
                      <div key={s.id} className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: colour.bg }}
                        />
                        <span className="text-xs text-white/60">{s.display_name}</span>
                      </div>
                    )
                  })}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-gray-500/50" />
                    <span className="text-xs text-white/40">Cancelled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-green-600" />
                    <span className="text-xs text-white/40">Completed</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Loading overlay ──────────────────────────────────── */}
          {dataLoading && (
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading bookings...
            </div>
          )}

          {/* ── Calendar ──────────────────────────────────────────── */}
          <div className="section-card p-4">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={surveyorInitialView}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay,dayGridMonth',
              }}
              locale="en-gb"
              firstDay={1} // Monday
              slotDuration="00:30:00"
              slotMinTime="06:00:00"
              slotMaxTime="20:00:00"
              scrollTime="08:00:00"
              nowIndicator={true}
              allDaySlot={true}
              allDayText="All Day"
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
              dayHeaderFormat={{
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              }}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '17:00',
              }}
              height="auto"
              contentHeight="auto"
              expandRows={true}
              events={allEvents}
              datesSet={handleDatesSet}
              eventClick={handleEventClick}
              eventDisplay="block"
              displayEventEnd={true}
            />
          </div>
        </div>

        {/* ── Booking Detail Modal ──────────────────────────────── */}
        {selectedBooking && (
          <BookingDetailModal
            booking={selectedBooking}
            surveyorColourMap={surveyorColourMap}
            actionLoading={actionLoading}
            actionMessage={actionMessage}
            onClose={() => {
              setSelectedBooking(null)
              setActionMessage(null)
            }}
            onStatusChange={handleStatusChange}
            onNotesUpdate={handleNotesUpdate}
            onReschedule={handleReschedule}
            onMarkPaid={handleMarkPaid}
            isAdminOrOffice={isAdminOrOffice}
            isSurveyorOnly={isSurveyorOnly}
            isMobile={isMobile}
          />
        )}
      </Layout>
    </ProtectedRoute>
  )
}

// =============================================================================
// Surveyor Agenda — Today's daily briefing
// =============================================================================

function SurveyorAgenda({
  bookings,
  actionLoading,
  onBookingClick,
  onQuickComplete,
}: {
  bookings: SurveyBooking[]
  actionLoading: boolean
  onBookingClick: (booking: SurveyBooking) => void
  onQuickComplete: (bookingId: string) => void
}) {
  const today = getTodayStr()
  const todayFormatted = formatDate(today)

  if (bookings.length === 0) {
    return (
      <div className="section-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <List className="w-5 h-5 text-brand-400" />
          <h3 className="text-lg font-semibold text-white">Today&apos;s Agenda</h3>
          <span className="text-xs text-white/40 ml-auto">{todayFormatted}</span>
        </div>
        <p className="text-sm text-white/50 text-center py-6">
          No surveys scheduled for today
        </p>
      </div>
    )
  }

  return (
    <div className="section-card p-5">
      <div className="flex items-center gap-3 mb-4">
        <List className="w-5 h-5 text-brand-400" />
        <h3 className="text-lg font-semibold text-white">Today&apos;s Agenda</h3>
        <span className="text-xs bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full">
          {bookings.length} {bookings.length === 1 ? 'survey' : 'surveys'}
        </span>
        <span className="text-xs text-white/40 ml-auto">{todayFormatted}</span>
      </div>

      <div className="space-y-2">
        {bookings.map(booking => {
          const statusInfo = STATUS_CONFIG[booking.status]
          const StatusIcon = statusInfo.icon
          const isScheduled = booking.status === 'scheduled'

          return (
            <div
              key={booking.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => onBookingClick(booking)}
            >
              {/* Time */}
              <div className="shrink-0 text-center min-w-[60px]">
                <p className="text-sm font-semibold text-white">{formatTime(booking.start_time)}</p>
                <p className="text-[10px] text-white/40">{formatTime(booking.end_time)}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-white/10 shrink-0" />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{booking.customer_name}</p>
                {booking.customer_address && (
                  <p className="text-xs text-white/40 truncate mt-0.5">{booking.customer_address}</p>
                )}
              </div>

              {/* Phone shortcut — large tap target */}
              {booking.customer_phone && (
                <a
                  href={`tel:${booking.customer_phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 hover:bg-brand-500/20 transition-all"
                  title={`Call ${booking.customer_phone}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}

              {/* Status / Quick complete */}
              {isScheduled ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Mark this survey as completed?')) {
                      onQuickComplete(booking.id)
                    }
                  }}
                  disabled={actionLoading}
                  className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all disabled:opacity-50"
                  title="Mark completed"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              ) : (
                <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${statusInfo.colour}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// Booking Detail Modal
// =============================================================================

function BookingDetailModal({
  booking,
  surveyorColourMap,
  actionLoading,
  actionMessage,
  onClose,
  onStatusChange,
  onNotesUpdate,
  isAdminOrOffice,
  isSurveyorOnly,
  isMobile,
}: {
  booking: SurveyBooking
  surveyorColourMap: Map<string, number>
  actionLoading: boolean
  actionMessage: { type: 'success' | 'error'; text: string } | null
  onClose: () => void
  onStatusChange: (id: string, status: BookingStatus) => void
  onNotesUpdate: (id: string, notes: string) => void
  onReschedule: (id: string, slot: SelectedSlot) => void
  onMarkPaid: (paymentId: string, method: PaymentMethod) => Promise<void>
  isAdminOrOffice: boolean
  isSurveyorOnly: boolean
  isMobile: boolean
}) {
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState(booking.notes || '')
  const [rescheduleMode, setRescheduleMode] = useState(false)
  const [rescheduleSlot, setRescheduleSlot] = useState<SelectedSlot | null>(null)
  const [linkedPayment, setLinkedPayment] = useState<Payment | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [markPaidMode, setMarkPaidMode] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer')

  // Fetch linked payment for provisional bookings
  useEffect(() => {
    if (booking.status === 'provisional' && isAdminOrOffice) {
      setPaymentLoading(true)
      getPaymentByBookingId(booking.id)
        .then(p => setLinkedPayment(p))
        .finally(() => setPaymentLoading(false))
    }
    return () => {
      setLinkedPayment(null)
      setMarkPaidMode(false)
    }
  }, [booking.id, booking.status, isAdminOrOffice])

  // Reset reschedule mode on booking change
  useEffect(() => {
    setRescheduleMode(false)
    setRescheduleSlot(null)
  }, [booking.id])

  // Which status transitions are valid from the current status?
  const allowedTransitions = BOOKING_STATUS_TRANSITIONS[booking.status] || []
  const isTerminal = allowedTransitions.length === 0
  const statusInfo = STATUS_CONFIG[booking.status]
  const StatusIcon = statusInfo.icon
  const colour = getSurveyorColour(booking.surveyor_id, surveyorColourMap)

  // Sync notes when booking changes
  useEffect(() => {
    setNotesValue(booking.notes || '')
    setEditingNotes(false)
  }, [booking.id, booking.notes])

  // ─── Surveyor-focused detail panel ─────────────────────────────────
  if (isSurveyorOnly) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
        <div
          className={`glass-card w-full overflow-y-auto ${
            isMobile
              ? 'max-h-[95vh] rounded-t-2xl rounded-b-none'
              : 'max-w-lg max-h-[90vh] rounded-2xl'
          }`}
        >
          {/* Header — customer name prominent */}
          <div
            className="p-5 border-b border-white/10"
            style={{ borderTop: `3px solid ${colour.bg}` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{booking.customer_name}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${statusInfo.colour}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </span>
                  <span className="text-xs text-white/40">
                    {formatDate(booking.booking_date)}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-white/50 transition-colors -mt-1 -mr-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body — field-optimised layout */}
          <div className="p-5 space-y-4">
            {/* Time slot */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <Clock className="w-5 h-5 text-brand-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">
                  {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                </p>
                <p className="text-xs text-white/40">{formatDate(booking.booking_date)}</p>
              </div>
            </div>

            {/* Phone — large CTA button */}
            {booking.customer_phone && (
              <a
                href={`tel:${booking.customer_phone}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/20 transition-all min-h-[52px]"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/20 shrink-0">
                  <Phone className="w-5 h-5 text-brand-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brand-300/70">Call Customer</p>
                  <p className="text-base font-semibold text-brand-200">{booking.customer_phone}</p>
                </div>
              </a>
            )}

            {/* Email */}
            {booking.customer_email && (
              <a
                href={`mailto:${booking.customer_email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all min-h-[44px]"
              >
                <Mail className="w-5 h-5 text-white/40 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-brand-300 truncate">{booking.customer_email}</p>
                </div>
              </a>
            )}

            {/* Address + Get Directions */}
            {booking.customer_address && (
              <div className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
                <div className="flex items-start gap-3 p-3">
                  <MapPin className="w-5 h-5 text-white/40 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-white/40">Address</p>
                    <p className="text-sm text-white mt-0.5">{booking.customer_address}</p>
                  </div>
                </div>
                <a
                  href={getDirectionsUrl(booking.customer_address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border-t border-white/5 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all min-h-[48px]"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Get Directions</span>
                </a>
              </div>
            )}

            {/* Notes (read-only for surveyors) */}
            {booking.notes && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <FileText className="w-5 h-5 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Notes</p>
                  <p className="text-sm text-white/70 mt-0.5">{booking.notes}</p>
                </div>
              </div>
            )}

            {/* Survey link */}
            {booking.survey_id && (
              <Link
                href={`/surveys/${booking.survey_id}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-brand-300" />
                <span className="text-sm font-medium text-brand-300">View Survey</span>
                <ExternalLink className="w-3 h-3 text-brand-300/60" />
              </Link>
            )}

            {/* Action message */}
            {actionMessage && (
              <div
                className={`p-3 rounded-xl flex items-center gap-2 text-sm ${
                  actionMessage.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                    : 'bg-red-500/10 border border-red-500/20 text-red-300'
                }`}
              >
                {actionMessage.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                {actionMessage.text}
              </div>
            )}

            {/* Surveyor actions: Completed + No Show (no Cancel) */}
            {booking.status === 'scheduled' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    if (confirm('Mark this survey as completed? This cannot be undone.')) {
                      onStatusChange(booking.id, 'completed')
                    }
                  }}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 hover:bg-green-500/20 transition-all min-h-[48px] disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Mark this booking as a no-show? This cannot be undone.')) {
                      onStatusChange(booking.id, 'no_show')
                    }
                  }}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all min-h-[48px] disabled:opacity-50"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-medium">No Show</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/10 flex justify-end">
            <button onClick={onClose} className="btn-secondary text-sm min-h-[44px] px-6">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Admin/Office detail panel (unchanged) ─────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className="p-5 border-b border-white/10 flex items-center justify-between"
          style={{ borderTop: `3px solid ${colour.bg}` }}
        >
          <div>
            <h2 className="text-xl font-semibold text-white">{booking.customer_name}</h2>
            <p className="text-sm text-white/50 mt-0.5">
              {formatDate(booking.booking_date)} &middot; {formatTime(booking.start_time)}–{formatTime(booking.end_time)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${statusInfo.colour}`}>
              <StatusIcon className="w-4 h-4" />
              {statusInfo.label}
            </span>
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {booking.surveyor_name && (
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Surveyor</p>
                  <p className="text-sm text-white">{booking.surveyor_name}</p>
                </div>
              </div>
            )}

            {booking.customer_phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <a href={`tel:${booking.customer_phone}`} className="text-sm text-brand-300 hover:text-brand-200">
                    {booking.customer_phone}
                  </a>
                </div>
              </div>
            )}

            {booking.customer_email && (
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <a href={`mailto:${booking.customer_email}`} className="text-sm text-brand-300 hover:text-brand-200">
                    {booking.customer_email}
                  </a>
                </div>
              </div>
            )}

            {booking.customer_address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Address</p>
                  <p className="text-sm text-white">{booking.customer_address}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-white/40">Date &amp; Time</p>
                <p className="text-sm text-white">
                  {formatDate(booking.booking_date)}, {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                </p>
              </div>
            </div>

            {/* Survey link */}
            {booking.survey_id && (
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">Linked Survey</p>
                  <Link
                    href={`/surveys/${booking.survey_id}`}
                    className="text-sm text-brand-300 hover:text-brand-200 inline-flex items-center gap-1"
                  >
                    View Survey <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-white/40 mb-1">Notes</p>
                {editingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      className="input-field min-h-[80px] resize-y text-sm"
                      placeholder="Add notes..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNotesUpdate(booking.id, notesValue)}
                        disabled={actionLoading}
                        className="btn-primary text-xs px-3 py-1.5"
                      >
                        {actionLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingNotes(false)
                          setNotesValue(booking.notes || '')
                        }}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => isAdminOrOffice && setEditingNotes(true)}
                    className={`text-sm text-white/70 ${
                      isAdminOrOffice ? 'cursor-pointer hover:text-white transition-colors' : ''
                    }`}
                  >
                    {booking.notes || (
                      <span className="text-white/30 italic">
                        {isAdminOrOffice ? 'Click to add notes...' : 'No notes'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action message */}
          {actionMessage && (
            <div
              className={`p-3 rounded-xl flex items-center gap-2 text-sm ${
                actionMessage.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                  : 'bg-red-500/10 border border-red-500/20 text-red-300'
              }`}
            >
              {actionMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              {actionMessage.text}
            </div>
          )}

          {/* Action buttons — admin/office only */}
          {isAdminOrOffice && !isTerminal && (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <p className="text-xs text-white/40 mb-2">Actions</p>

              {/* Provisional booking actions: Confirm + Mark as Paid */}
              {booking.status === 'provisional' && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (confirm('Confirm this booking? This will set the status to scheduled.')) {
                        onStatusChange(booking.id, 'scheduled')
                      }
                    }}
                    disabled={actionLoading}
                    className="w-full btn-primary text-xs px-3 py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Confirm Booking
                  </button>

                  {paymentLoading ? (
                    <div className="flex items-center justify-center gap-2 py-2 text-xs text-white/40">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Checking payment...
                    </div>
                  ) : linkedPayment && linkedPayment.status === 'pending' ? (
                    markPaidMode ? (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <p className="text-xs font-medium text-white/70">Mark Payment as Paid</p>
                        <div>
                          <label className="text-xs text-white/40 block mb-1">Payment Method</label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            className="input-field text-sm w-full"
                          >
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="card_phone">Card (Phone)</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              if (!confirm(`Mark £${linkedPayment.amount.toFixed(2)} survey fee as paid via ${paymentMethod.replace('_', ' ')}?`)) return
                              setPaymentLoading(true)
                              try {
                                await onMarkPaid(linkedPayment.id, paymentMethod)
                                setMarkPaidMode(false)
                                setLinkedPayment(null)
                              } finally {
                                setPaymentLoading(false)
                              }
                            }}
                            disabled={paymentLoading || actionLoading}
                            className="btn-primary text-xs px-3 py-1.5 flex-1"
                          >
                            {paymentLoading ? 'Processing...' : 'Confirm Payment'}
                          </button>
                          <button
                            onClick={() => setMarkPaidMode(false)}
                            className="btn-secondary text-xs px-3 py-1.5"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setMarkPaidMode(true)}
                        disabled={actionLoading}
                        className="w-full btn-secondary text-xs px-3 py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                        Mark as Paid (£{linkedPayment.amount.toFixed(2)})
                      </button>
                    )
                  ) : null}
                </div>
              )}

              {/* Status change buttons — gated by state machine */}
              <div className="flex flex-wrap gap-2">
                {allowedTransitions.includes('completed') && (
                  <button
                    onClick={() => {
                      if (confirm('Mark this booking as completed? This cannot be undone.')) {
                        onStatusChange(booking.id, 'completed')
                      }
                    }}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    Mark Completed
                  </button>
                )}
                {allowedTransitions.includes('no_show') && (
                  <button
                    onClick={() => {
                      if (confirm('Mark this booking as a no-show? This cannot be undone.')) {
                        onStatusChange(booking.id, 'no_show')
                      }
                    }}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    No Show
                  </button>
                )}
                {allowedTransitions.includes('cancelled') && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this booking? This cannot be undone.')) {
                        onStatusChange(booking.id, 'cancelled')
                      }
                    }}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 hover:!bg-red-500/10 hover:!border-red-500/30"
                  >
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                    Cancel Booking
                  </button>
                )}
              </div>

              {/* Reschedule */}
              {(booking.status === 'provisional' || booking.status === 'scheduled') && (
                rescheduleMode ? (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-white/70">Select new date and time</p>
                      <button
                        onClick={() => { setRescheduleMode(false); setRescheduleSlot(null) }}
                        className="text-xs text-white/40 hover:text-white/60"
                      >
                        Cancel
                      </button>
                    </div>
                    <SlotPicker
                      onSlotSelected={setRescheduleSlot}
                      selectedSlot={rescheduleSlot}
                      defaultSurveyorId={booking.surveyor_id}
                      excludeBookingId={booking.id}
                    />
                    {rescheduleSlot && (
                      <button
                        onClick={() => {
                          const newDate = new Date(rescheduleSlot.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
                          if (confirm(`Reschedule to ${newDate} at ${rescheduleSlot.startTime}–${rescheduleSlot.endTime}?`)) {
                            onReschedule(booking.id, rescheduleSlot)
                            setRescheduleMode(false)
                            setRescheduleSlot(null)
                          }
                        }}
                        disabled={actionLoading}
                        className="w-full btn-primary text-xs px-3 py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Confirm Reschedule
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setRescheduleMode(true)}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-brand-400" />
                    Reschedule
                  </button>
                )
              )}
            </div>
          )}

          {/* Terminal status indicator */}
          {isAdminOrOffice && isTerminal && (
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-white/40 italic">
                This booking is {booking.status === 'completed' ? 'completed' : booking.status === 'no_show' ? 'marked as no-show' : 'cancelled'} — no further actions available.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
