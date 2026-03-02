'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
} from 'lucide-react'
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
import type {
  SurveyBooking,
  AvailabilityBlock,
  BookingStatus,
  BlockType,
} from '@/lib/calendar-types'
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

// =============================================================================
// Main Page
// =============================================================================

export default function CalendarPage() {
  const { isAdmin, isOffice, isSurveyor, isLoading: authLoading, profile } = useAuth()
  const calendarRef = useRef<FullCalendar>(null)

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
      surveyorList.forEach((s, i) => cMap.set(s.user_id, i))
      setSurveyorColourMap(cMap)

      // Default filter: surveyor sees only themselves
      if (isSurveyorOnly && profile) {
        setSelectedSurveyorIds(new Set([profile.user_id]))
        setShowAllSurveyors(false)
      } else {
        setSelectedSurveyorIds(new Set(surveyorList.map(s => s.user_id)))
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
      setSelectedSurveyorIds(new Set(surveyors.map(s => s.user_id)))
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

    // Build title
    let title = booking.customer_name
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
      // Green tint blended with surveyor colour
      bgColour = '#16a34a'
      borderColour = '#15803d'
      textColour = '#ffffff'
    }

    const classNames: string[] = []
    if (isCancelled) classNames.push('fc-event-cancelled')
    if (isCompleted) classNames.push('fc-event-completed')

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
                Calendar
              </h2>
              <p className="text-sm text-white/60 mt-1">
                {isSurveyorOnly
                  ? 'Your survey schedule'
                  : 'All surveyors\u2019 schedules at a glance'}
              </p>
            </div>

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

          {/* ── Surveyor Filter ──────────────────────────────────── */}
          {surveyors.length > 0 && (
            <div className="section-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white/60 mr-1">Surveyors:</span>

                {!isSurveyorOnly && (
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
                )}

                {surveyors.map(s => {
                  const colour = getSurveyorColour(s.user_id, surveyorColourMap)
                  const isSelected = selectedSurveyorIds.has(s.user_id)
                  const isLocked = isSurveyorOnly

                  return (
                    <button
                      key={s.user_id}
                      onClick={() => handleSurveyorToggle(s.user_id)}
                      disabled={isLocked}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border text-white'
                          : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                      } ${isLocked ? 'cursor-not-allowed' : ''}`}
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
                  {surveyors.filter(s => selectedSurveyorIds.has(s.user_id)).map(s => {
                    const colour = getSurveyorColour(s.user_id, surveyorColourMap)
                    return (
                      <div key={s.user_id} className="flex items-center gap-1.5">
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
              initialView="timeGridWeek"
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
            isAdminOrOffice={isAdminOrOffice}
          />
        )}
      </Layout>
    </ProtectedRoute>
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
}: {
  booking: SurveyBooking
  surveyorColourMap: Map<string, number>
  actionLoading: boolean
  actionMessage: { type: 'success' | 'error'; text: string } | null
  onClose: () => void
  onStatusChange: (id: string, status: BookingStatus) => void
  onNotesUpdate: (id: string, notes: string) => void
  isAdminOrOffice: boolean
}) {
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState(booking.notes || '')
  const statusInfo = STATUS_CONFIG[booking.status]
  const StatusIcon = statusInfo.icon
  const colour = getSurveyorColour(booking.surveyor_id, surveyorColourMap)

  // Sync notes when booking changes
  useEffect(() => {
    setNotesValue(booking.notes || '')
    setEditingNotes(false)
  }, [booking.id, booking.notes])

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
                    href={`/projects/${booking.survey_id}`}
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

          {/* Action buttons */}
          {isAdminOrOffice && booking.status !== 'cancelled' && (
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-white/40 mb-2">Actions</p>
              <div className="flex flex-wrap gap-2">
                {booking.status !== 'completed' && (
                  <button
                    onClick={() => onStatusChange(booking.id, 'completed')}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    Mark Completed
                  </button>
                )}
                {booking.status !== 'no_show' && (
                  <button
                    onClick={() => onStatusChange(booking.id, 'no_show')}
                    disabled={actionLoading}
                    className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    No Show
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel this booking?')) {
                      onStatusChange(booking.id, 'cancelled')
                    }
                  }}
                  disabled={actionLoading}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 hover:!bg-red-500/10 hover:!border-red-500/30"
                >
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                  Cancel Booking
                </button>
              </div>
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
