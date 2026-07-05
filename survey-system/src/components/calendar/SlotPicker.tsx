'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarOff,
  AlertTriangle,
  Loader2,
  Palmtree,
  Stethoscope,
  GraduationCap,
  HelpCircle,
} from 'lucide-react'
import {
  getAvailableSlots,
  getAvailabilityBlocks,
  getSurveyorAvailability,
} from '@/lib/calendar-data'
import { createClient } from '@/lib/supabase-client'
import type {
  TimeSlot,
  AvailabilityBlock,
  SurveyorAvailability,
  BlockType,
} from '@/lib/calendar-types'
import { SurveyorSelect } from './SurveyorSelect'

// =============================================================================
// SlotPicker — Reusable slot picker for booking a surveyor's available time.
//
// Three-step flow: select surveyor → browse week → click a slot.
// Consumes getAvailableSlots() which handles the three-layer availability
// resolution (standard hours - blocks - existing bookings).
// =============================================================================

// --- Types ---

export interface SelectedSlot {
  surveyorId: string
  surveyorName: string
  date: string      // "YYYY-MM-DD"
  startTime: string // "HH:MM"
  endTime: string   // "HH:MM"
}

export interface SlotPickerProps {
  onSlotSelected: (slot: SelectedSlot) => void
  selectedSlot?: SelectedSlot | null
  defaultSurveyorId?: string | null
  slotDurationMinutes?: number
  /** When rescheduling, exclude this booking so its current slot appears as available */
  excludeBookingId?: string | null
}

// --- Constants ---

const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  annual_leave: 'Annual Leave',
  sickness: 'Sickness',
  training: 'Training',
  other: 'Other',
}

const BLOCK_TYPE_ICONS: Record<BlockType, typeof Palmtree> = {
  annual_leave: Palmtree,
  sickness: Stethoscope,
  training: GraduationCap,
  other: HelpCircle,
}

/** UK weekday ordering: Monday first */
const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// --- Date helpers ---

/** Format "YYYY-MM-DD" to midnight local Date */
function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T12:00:00')
}

/** Format Date to "YYYY-MM-DD" */
function formatDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Get the Monday of the week containing the given date */
function getWeekStart(d: Date): Date {
  const clone = new Date(d)
  clone.setHours(12, 0, 0, 0)
  const dayOfWeek = clone.getDay() // 0=Sun
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Mon=0
  clone.setDate(clone.getDate() - diff)
  return clone
}

/** Build an array of 7 dates (Mon–Sun) from a Monday start */
function buildWeekDates(monday: Date): Date[] {
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(d)
  }
  return dates
}

/** Format a date for display: "Mon 3 Mar" */
function formatDayLabel(d: Date): string {
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' })
  const day = d.getDate()
  const month = d.toLocaleDateString('en-GB', { month: 'short' })
  return `${weekday} ${day} ${month}`
}

/** Get today's date string */
function todayStr(): string {
  return formatDateStr(new Date())
}

/** Is a date in the past? (before today) */
function isPastDate(dateStr: string): boolean {
  return dateStr < todayStr()
}

// --- Day status resolution ---

interface DayInfo {
  dateStr: string
  label: string
  isToday: boolean
  isPast: boolean
  slots: TimeSlot[]
  blockType: BlockType | null
  hasStandardHours: boolean
}

// =============================================================================
// Component
// =============================================================================

export function SlotPicker({
  onSlotSelected,
  selectedSlot,
  defaultSurveyorId,
  slotDurationMinutes = 90,
  excludeBookingId,
}: SlotPickerProps) {
  // --- Surveyor state ---
  const [surveyorId, setSurveyorId] = useState<string | null>(defaultSurveyorId || null)
  const [surveyorName, setSurveyorName] = useState<string>('')

  // --- Week navigation ---
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()))

  // --- Data ---
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([])
  const [availability, setAvailability] = useState<SurveyorAvailability[]>([])
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [findingFirstWeek, setFindingFirstWeek] = useState(false)

  // Week dates derived from weekStart
  const weekDates = useMemo(() => buildWeekDates(weekStart), [weekStart])
  const weekEndDate = weekDates[6]
  const weekStartStr = formatDateStr(weekDates[0])
  const weekEndStr = formatDateStr(weekEndDate)

  // Can't navigate to a week entirely in the past
  const currentWeekStart = getWeekStart(new Date())
  const canGoPrev = weekStart > currentWeekStart

  // --- Fetch slots when surveyor or week changes ---
  const fetchSlots = useCallback(async () => {
    if (!surveyorId) return

    setLoading(true)
    const [slotsData, blocksData, availData] = await Promise.all([
      getAvailableSlots(surveyorId, weekStartStr, weekEndStr, slotDurationMinutes, excludeBookingId || undefined),
      getAvailabilityBlocks(surveyorId, weekStartStr, weekEndStr),
      getSurveyorAvailability(surveyorId),
    ])

    setSlots(slotsData)
    setBlocks(blocksData)
    setAvailability(availData)
    setLoading(false)
    setHasLoaded(true)
  }, [surveyorId, weekStartStr, weekEndStr, slotDurationMinutes, excludeBookingId])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  // Backfill the surveyor name when opened with defaultSurveyorId — the
  // select doesn't fire onSelect for a preselected value, which left
  // SelectedSlot.surveyorName empty on Confirm/success screens
  useEffect(() => {
    if (!surveyorId || surveyorName) return
    let cancelled = false
    const supabase = createClient()
    supabase
      .from('user_profiles')
      .select('display_name')
      .eq('id', surveyorId)
      .single()
      .then(({ data }) => {
        if (!cancelled && data?.display_name) setSurveyorName(data.display_name)
      })
    return () => { cancelled = true }
  }, [surveyorId, surveyorName])

  // On surveyor selection, open the first week containing a bookable slot
  // (by late week the current week is mostly "Past"/"No hours"). An existing
  // selection wins — navigating back shows the week of the chosen slot.
  useEffect(() => {
    if (!surveyorId) return
    if (selectedSlot && selectedSlot.surveyorId === surveyorId) {
      setWeekStart(getWeekStart(parseDate(selectedSlot.date)))
      return
    }
    let cancelled = false
    setFindingFirstWeek(true)
    const scan = async () => {
      const horizon = new Date()
      horizon.setDate(horizon.getDate() + 56)
      const upcoming = await getAvailableSlots(
        surveyorId,
        todayStr(),
        formatDateStr(horizon),
        slotDurationMinutes,
        excludeBookingId || undefined
      )
      if (cancelled) return
      // Slots come back in date order; fall back to the current week if none
      setWeekStart(upcoming.length > 0 ? getWeekStart(parseDate(upcoming[0].date)) : getWeekStart(new Date()))
      setFindingFirstWeek(false)
    }
    scan()
    return () => { cancelled = true }
  // Only re-scan when the surveyor changes — selectedSlot is read once on entry
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyorId])

  // --- Build per-day info ---
  const days: DayInfo[] = useMemo(() => {
    const today = todayStr()

    // Build set of active weekdays from availability
    const activeWeekdays = new Set<number>()
    for (const row of availability) {
      if (row.is_active) {
        activeWeekdays.add(row.day_of_week)
      }
    }

    // Build map of blocked dates → block type
    const blockedDateMap = new Map<string, BlockType>()
    for (const block of blocks) {
      const start = parseDate(block.start_date)
      const end = parseDate(block.end_date)
      const cursor = new Date(start)
      while (cursor <= end) {
        blockedDateMap.set(formatDateStr(cursor), block.block_type)
        cursor.setDate(cursor.getDate() + 1)
      }
    }

    // Group slots by date
    const slotsByDate = new Map<string, TimeSlot[]>()
    for (const slot of slots) {
      const existing = slotsByDate.get(slot.date) || []
      existing.push(slot)
      slotsByDate.set(slot.date, existing)
    }

    return weekDates.map((d) => {
      const dateStr = formatDateStr(d)
      const dow = d.getDay() // 0=Sun
      return {
        dateStr,
        label: formatDayLabel(d),
        isToday: dateStr === today,
        isPast: dateStr < today,
        slots: slotsByDate.get(dateStr) || [],
        blockType: blockedDateMap.get(dateStr) || null,
        hasStandardHours: activeWeekdays.has(dow),
      }
    })
  }, [weekDates, availability, blocks, slots])

  // --- Has any availability configured at all? ---
  const hasAnyAvailability = availability.some((a) => a.is_active)

  // --- Handlers ---
  const handleSurveyorSelect = (id: string, name: string) => {
    setSurveyorId(id)
    setSurveyorName(name)
    setHasLoaded(false)
  }

  const handlePrevWeek = () => {
    if (!canGoPrev) return
    setWeekStart((prev) => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 7)
      // Don't go before current week
      if (d < currentWeekStart) return currentWeekStart
      return d
    })
  }

  const handleNextWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 7)
      return d
    })
  }

  const handleSlotClick = (slot: TimeSlot) => {
    if (!surveyorId) return
    onSlotSelected({
      surveyorId,
      surveyorName,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })
  }

  const isSlotSelected = (slot: TimeSlot): boolean => {
    if (!selectedSlot) return false
    return (
      selectedSlot.surveyorId === surveyorId &&
      selectedSlot.date === slot.date &&
      selectedSlot.startTime === slot.startTime &&
      selectedSlot.endTime === slot.endTime
    )
  }

  // --- Week range label ---
  const weekLabel = `${weekDates[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${weekEndDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  // Any day in the visible week has available slots?
  const weekHasSlots = days.some((d) => d.slots.length > 0)

  return (
    <div className="space-y-4">
      {/* Step 1: Surveyor Selection */}
      <SurveyorSelect
        onSelect={handleSurveyorSelect}
        selectedId={surveyorId}
        label="Select Surveyor"
      />

      {/* Step 2: Week View */}
      {surveyorId && (
        <div className="section-card overflow-visible">
          {/* Week Navigation Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevWeek}
              disabled={!canGoPrev}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h4 className="text-sm font-semibold text-white">{weekLabel}</h4>
            </div>

            <button
              type="button"
              onClick={handleNextWeek}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slot Grid */}
          <div className="p-4">
            {loading || findingFirstWeek ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
                <span className="ml-2 text-sm text-white/50">Loading availability...</span>
              </div>
            ) : !hasAnyAvailability && hasLoaded ? (
              /* No working hours configured at all */
              <div className="py-10 text-center">
                <AlertTriangle className="w-10 h-10 text-amber-400/50 mx-auto mb-3" />
                <p className="text-sm text-white/60 mb-1">
                  No working hours configured for this surveyor
                </p>
                <Link
                  href={surveyorId ? `/admin/availability?surveyor=${surveyorId}` : '/admin/availability'}
                  target="_blank"
                  rel="noopener"
                  className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Set up availability (opens in a new tab)
                </Link>
              </div>
            ) : !weekHasSlots && hasLoaded ? (
              /* All days blocked/booked this week */
              <div className="py-10 text-center">
                <CalendarOff className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/60 mb-1">
                  No available slots this week
                </p>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Try next week &rarr;
                </button>
              </div>
            ) : (
              /* Day columns — vertical stack on mobile, horizontal on desktop */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {days.map((day) => (
                  <DayColumn
                    key={day.dateStr}
                    day={day}
                    isSlotSelected={isSlotSelected}
                    onSlotClick={handleSlotClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// DayColumn — A single day in the week view
// =============================================================================

function DayColumn({
  day,
  isSlotSelected,
  onSlotClick,
}: {
  day: DayInfo
  isSlotSelected: (slot: TimeSlot) => boolean
  onSlotClick: (slot: TimeSlot) => void
}) {
  const { dateStr, label, isToday, isPast, slots, blockType, hasStandardHours } = day

  // Determine day status
  const isBlocked = blockType !== null
  const isUnavailable = !hasStandardHours && !isBlocked
  const isFullyBooked = hasStandardHours && !isBlocked && slots.length === 0 && !isPast
  const hasSlots = slots.length > 0

  const BlockIcon = blockType ? BLOCK_TYPE_ICONS[blockType] : null

  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${
        isToday
          ? 'border-brand-400/30 bg-brand-500/5'
          : isPast || isBlocked || isUnavailable
            ? 'border-white/5 bg-white/[0.02]'
            : 'border-white/8 bg-white/[0.03]'
      }`}
    >
      {/* Day header */}
      <div className="mb-2">
        <p
          className={`text-xs font-semibold ${
            isToday
              ? 'text-brand-300'
              : isPast
                ? 'text-white/30'
                : 'text-white/70'
          }`}
        >
          {label}
        </p>
        {isToday && (
          <span className="text-[10px] text-brand-400 font-medium uppercase tracking-wider">
            Today
          </span>
        )}
      </div>

      {/* Day content */}
      {isPast ? (
        <p className="text-xs text-white/20 italic">Past</p>
      ) : isBlocked ? (
        <div className="flex items-center gap-1.5">
          {BlockIcon && <BlockIcon className="w-3.5 h-3.5 text-amber-400/60" />}
          <span className="text-xs text-amber-300/60">
            {BLOCK_TYPE_LABELS[blockType!]}
          </span>
        </div>
      ) : isUnavailable ? (
        <p className="text-xs text-white/25 italic">No hours</p>
      ) : isFullyBooked ? (
        <p className="text-xs text-white/30 italic">Fully booked</p>
      ) : hasSlots ? (
        <div className="space-y-1.5">
          {slots.map((slot) => {
            const selected = isSlotSelected(slot)
            return (
              <button
                type="button"
                key={`${slot.date}-${slot.startTime}`}
                onClick={() => onSlotClick(slot)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  selected
                    ? 'bg-brand-500 text-white border border-brand-400 shadow-lg shadow-brand-500/25'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-brand-500/10 hover:border-brand-400/30 hover:text-white'
                }`}
              >
                <Clock className={`inline w-3 h-3 mr-1 ${selected ? 'text-white/80' : 'text-white/40'}`} />
                {slot.startTime} – {slot.endTime}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
