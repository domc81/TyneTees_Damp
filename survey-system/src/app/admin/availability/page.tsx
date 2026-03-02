'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  Palmtree,
  Stethoscope,
  GraduationCap,
  HelpCircle,
  UserCheck,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import {
  getSurveyorAvailability,
  setSurveyorAvailability,
  getAvailabilityBlocks,
  createAvailabilityBlock,
  updateAvailabilityBlock,
  deleteAvailabilityBlock,
} from '@/lib/calendar-data'
import type {
  SurveyorAvailability,
  AvailabilityBlock,
  AvailabilitySlotInput,
  BlockType,
} from '@/lib/calendar-types'
import type { UserProfile } from '@/types/database.types'

// =============================================================================
// Constants
// =============================================================================

/** UK ordering: Monday first, Sunday last */
const WEEKDAYS = [
  { dow: 1, label: 'Monday', short: 'Mon' },
  { dow: 2, label: 'Tuesday', short: 'Tue' },
  { dow: 3, label: 'Wednesday', short: 'Wed' },
  { dow: 4, label: 'Thursday', short: 'Thu' },
  { dow: 5, label: 'Friday', short: 'Fri' },
  { dow: 6, label: 'Saturday', short: 'Sat' },
  { dow: 0, label: 'Sunday', short: 'Sun' },
]

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

const BLOCK_TYPE_COLORS: Record<BlockType, string> = {
  annual_leave: 'bg-teal-500/20 text-teal-300',
  sickness: 'bg-red-500/20 text-red-300',
  training: 'bg-blue-500/20 text-blue-300',
  other: 'bg-white/10 text-white/70',
}

type DayState = {
  isActive: boolean
  startTime: string
  endTime: string
}

/** Build initial 7-day state from DB rows */
function buildWeekState(rows: SurveyorAvailability[]): Record<number, DayState> {
  const state: Record<number, DayState> = {}
  for (const day of WEEKDAYS) {
    state[day.dow] = { isActive: false, startTime: '08:00', endTime: '17:00' }
  }
  for (const row of rows) {
    state[row.day_of_week] = {
      isActive: row.is_active,
      startTime: row.start_time.slice(0, 5), // "HH:MM:SS" → "HH:MM"
      endTime: row.end_time.slice(0, 5),
    }
  }
  return state
}

/** Convert week state to API input */
function weekStateToSlots(state: Record<number, DayState>): AvailabilitySlotInput[] {
  const slots: AvailabilitySlotInput[] = []
  for (const [dowStr, day] of Object.entries(state)) {
    // Only include days that have been explicitly configured (active or not)
    slots.push({
      dayOfWeek: parseInt(dowStr, 10),
      startTime: day.startTime,
      endTime: day.endTime,
      isActive: day.isActive,
    })
  }
  return slots
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateRange(start: string, end: string): string {
  if (start === end) return formatDate(start)
  return `${formatDate(start)} — ${formatDate(end)}`
}

/** Is a block currently active or in the future? */
function isUpcomingOrCurrent(block: AvailabilityBlock): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return block.end_date >= today
}

// =============================================================================
// Main Page
// =============================================================================

export default function AvailabilityPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="spinner mx-auto mb-4" />
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      </Layout>
    }>
      <AvailabilityPageInner />
    </Suspense>
  )
}

function AvailabilityPageInner() {
  const { isAdmin, isOffice, isLoading: authLoading, profile } = useAuth()
  const searchParams = useSearchParams()
  const preselectedSurveyor = searchParams.get('surveyor')
  const [surveyors, setSurveyors] = useState<UserProfile[]>([])
  const [selectedSurveyorId, setSelectedSurveyorId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Load surveyors list
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
      } else {
        setSurveyors(data || [])
        if (data && data.length > 0 && !selectedSurveyorId) {
          // Pre-select from URL param if provided, otherwise first surveyor
          // selectedSurveyorId must be user_profiles.id (the PK), not user_id (auth UUID),
          // because surveyor_availability.surveyor_id references user_profiles(id).
          const preselect = preselectedSurveyor && data.some((s) => s.id === preselectedSurveyor)
            ? preselectedSurveyor
            : data[0].id
          setSelectedSurveyorId(preselect)
        }
      }
      setLoading(false)
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading])

  // Access guard — must be admin or office
  if (!authLoading && !isAdmin && !isOffice) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Shield className="w-16 h-16 text-amber-400/50 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
              <p className="text-white/50">Admin or office access required to manage availability.</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2 mt-6">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  const selectedSurveyor = surveyors.find((s) => s.id === selectedSurveyorId) || null

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-5xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>

          {/* Page Header */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-teal-400" />
              Surveyor Availability
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Manage weekly working hours and absence blocks for each surveyor
            </p>
          </div>

          {/* Surveyor Selector */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading surveyors...</p>
              </div>
            </div>
          ) : surveyors.length === 0 ? (
            <div className="section-card p-12 text-center">
              <UserCheck className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No active surveyors found.</p>
              <Link href="/admin/team" className="btn-primary inline-flex items-center gap-2 mt-4">
                Manage Team
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white/70">Surveyor:</label>
                <select
                  value={selectedSurveyorId || ''}
                  onChange={(e) => setSelectedSurveyorId(e.target.value)}
                  className="input-field w-auto min-w-[250px]"
                >
                  {surveyors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.display_name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSurveyorId && selectedSurveyor && (
                <>
                  {/* Section A: Weekly Hours */}
                  <WeeklyHoursSection
                    surveyorId={selectedSurveyorId}
                    surveyorName={selectedSurveyor.display_name}
                    canEdit={isAdmin}
                    allSurveyors={surveyors}
                  />

                  {/* Section B: Absence Blocks */}
                  <AbsenceBlocksSection
                    surveyorId={selectedSurveyorId}
                    surveyorName={selectedSurveyor.display_name}
                    currentUserId={profile?.id || ''}
                  />
                </>
              )}
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

// =============================================================================
// Section A: Weekly Hours
// =============================================================================

function WeeklyHoursSection({
  surveyorId,
  surveyorName,
  canEdit,
  allSurveyors,
}: {
  surveyorId: string
  surveyorName: string
  canEdit: boolean
  allSurveyors: UserProfile[]
}) {
  const [weekState, setWeekState] = useState<Record<number, DayState>>({})
  const [initialWeekState, setInitialWeekState] = useState<Record<number, DayState>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [copyFromId, setCopyFromId] = useState<string>('')

  const loadAvailability = useCallback(async () => {
    setLoading(true)
    setEditing(false)
    setHasChanges(false)
    setMessage(null)
    const rows = await getSurveyorAvailability(surveyorId)
    const state = buildWeekState(rows)
    setWeekState(state)
    setInitialWeekState(state)
    setLoading(false)
  }, [surveyorId])

  useEffect(() => {
    loadAvailability()
  }, [loadAvailability])

  // Auto-dismiss success messages
  useEffect(() => {
    if (message?.type === 'success') {
      const t = setTimeout(() => setMessage(null), 4000)
      return () => clearTimeout(t)
    }
  }, [message])

  const updateDay = (dow: number, updates: Partial<DayState>) => {
    setWeekState((prev) => ({
      ...prev,
      [dow]: { ...prev[dow], ...updates },
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const slots = weekStateToSlots(weekState)
      await setSurveyorAvailability(surveyorId, slots)
      setInitialWeekState({ ...weekState })
      setHasChanges(false)
      setEditing(false)
      setMessage({ type: 'success', text: 'Weekly hours saved successfully' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save'
      setMessage({ type: 'error', text: msg })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setWeekState({ ...initialWeekState })
    setHasChanges(false)
    setEditing(false)
    setMessage(null)
  }

  const handleCopyFrom = async () => {
    if (!copyFromId) return
    setLoading(true)
    const rows = await getSurveyorAvailability(copyFromId)
    const state = buildWeekState(rows)
    setWeekState(state)
    setHasChanges(true)
    setEditing(true)
    setLoading(false)
    setCopyFromId('')
  }

  const otherSurveyors = allSurveyors.filter((s) => s.user_id !== surveyorId)
  const hasAnyHoursSet = Object.values(initialWeekState).some((d) => d.isActive)

  return (
    <div className="section-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10">
            <Clock className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Standard Weekly Hours</h3>
            <p className="text-sm text-white/50">
              {canEdit ? 'Set the regular working schedule' : 'View-only — admin access required to edit'}
            </p>
          </div>
        </div>
        {canEdit && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Hours
          </button>
        )}
        {canEdit && editing && (
          <div className="flex items-center gap-3">
            <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Hours'}
            </button>
          </div>
        )}
      </div>

      {/* Feedback */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <p className={`text-sm ${message.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
            {message.text}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      ) : (
        <>
          {/* Copy from another surveyor */}
          {canEdit && editing && otherSurveyors.length > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Copy className="w-4 h-4" />
                <span>Copy hours from:</span>
              </div>
              <select
                value={copyFromId}
                onChange={(e) => setCopyFromId(e.target.value)}
                className="input-field w-auto text-sm"
              >
                <option value="">Select surveyor...</option>
                {otherSurveyors.map((s) => (
                  <option key={s.user_id} value={s.user_id}>
                    {s.display_name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleCopyFrom}
                disabled={!copyFromId}
                className="btn-secondary text-sm px-3 py-1.5"
              >
                Copy
              </button>
            </div>
          )}

          {/* Weekly Grid */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm font-medium text-white/60 py-3 pr-4 w-28">Day</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Status</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Start</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">End</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 pl-4">Hours</th>
                </tr>
              </thead>
              <tbody>
                {WEEKDAYS.map((day) => {
                  const d = weekState[day.dow]
                  if (!d) return null

                  // Calculate hours
                  const startMins =
                    parseInt(d.startTime.split(':')[0], 10) * 60 +
                    parseInt(d.startTime.split(':')[1], 10)
                  const endMins =
                    parseInt(d.endTime.split(':')[0], 10) * 60 +
                    parseInt(d.endTime.split(':')[1], 10)
                  const diffHours = d.isActive && endMins > startMins ? ((endMins - startMins) / 60).toFixed(1) : '—'

                  return (
                    <tr key={day.dow} className="border-b border-white/5">
                      <td className="py-3 pr-4">
                        <span className="font-medium text-white">{day.label}</span>
                      </td>
                      <td className="py-3 px-4">
                        {editing ? (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={d.isActive}
                              onChange={(e) => updateDay(day.dow, { isActive: e.target.checked })}
                              className="w-4 h-4 rounded border-white/30 bg-white/10 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                            />
                            <span className={`text-sm ${d.isActive ? 'text-teal-300' : 'text-white/40'}`}>
                              {d.isActive ? 'Working' : 'Day Off'}
                            </span>
                          </label>
                        ) : (
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${
                              d.isActive
                                ? 'bg-teal-500/20 text-teal-300'
                                : 'bg-white/5 text-white/40'
                            }`}
                          >
                            {d.isActive ? 'Working' : 'Day Off'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editing && d.isActive ? (
                          <input
                            type="time"
                            value={d.startTime}
                            onChange={(e) => updateDay(day.dow, { startTime: e.target.value })}
                            className="input-field w-auto text-sm"
                          />
                        ) : (
                          <span className={d.isActive ? 'text-white' : 'text-white/30'}>
                            {d.isActive ? d.startTime : '—'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editing && d.isActive ? (
                          <input
                            type="time"
                            value={d.endTime}
                            onChange={(e) => updateDay(day.dow, { endTime: e.target.value })}
                            className="input-field w-auto text-sm"
                          />
                        ) : (
                          <span className={d.isActive ? 'text-white' : 'text-white/30'}>
                            {d.isActive ? d.endTime : '—'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 pl-4">
                        <span className={d.isActive ? 'text-white/70' : 'text-white/30'}>
                          {diffHours === '—' ? diffHours : `${diffHours}h`}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty state hint */}
          {!hasAnyHoursSet && !editing && (
            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-sm text-amber-300">
                No working hours set for {surveyorName}.
                {canEdit
                  ? ' Click "Edit Hours" to configure their weekly schedule.'
                  : ' An admin needs to configure their schedule.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// =============================================================================
// Section B: Absence Blocks
// =============================================================================

function AbsenceBlocksSection({
  surveyorId,
  surveyorName,
  currentUserId,
}: {
  surveyorId: string
  surveyorName: string
  currentUserId: string
}) {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBlock, setEditingBlock] = useState<AvailabilityBlock | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const loadBlocks = useCallback(async () => {
    setLoading(true)
    const data = await getAvailabilityBlocks(surveyorId)
    setBlocks(data)
    setLoading(false)
  }, [surveyorId])

  useEffect(() => {
    loadBlocks()
  }, [loadBlocks])

  // Auto-dismiss success messages
  useEffect(() => {
    if (message?.type === 'success') {
      const t = setTimeout(() => setMessage(null), 4000)
      return () => clearTimeout(t)
    }
  }, [message])

  const handleDelete = async (block: AvailabilityBlock) => {
    if (!confirm(`Delete ${BLOCK_TYPE_LABELS[block.block_type]} block for ${formatDateRange(block.start_date, block.end_date)}?`))
      return

    const success = await deleteAvailabilityBlock(block.id)
    if (success) {
      setMessage({ type: 'success', text: 'Absence block deleted' })
      loadBlocks()
    } else {
      setMessage({ type: 'error', text: 'Failed to delete absence block' })
    }
  }

  // Sort: upcoming/current first, then past
  const sortedBlocks = [...blocks].sort((a, b) => {
    const aUpcoming = isUpcomingOrCurrent(a)
    const bUpcoming = isUpcomingOrCurrent(b)
    if (aUpcoming && !bUpcoming) return -1
    if (!aUpcoming && bUpcoming) return 1
    return a.start_date.localeCompare(b.start_date)
  })

  const upcomingBlocks = sortedBlocks.filter(isUpcomingOrCurrent)
  const pastBlocks = sortedBlocks.filter((b) => !isUpcomingOrCurrent(b))

  return (
    <div className="section-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Palmtree className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Absence Blocks</h3>
            <p className="text-sm text-white/50">
              Annual leave, sickness, training, and other absences
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Absence
        </button>
      </div>

      {/* Feedback */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <p className={`text-sm ${message.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
            {message.text}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      ) : blocks.length === 0 ? (
        <div className="p-12 text-center">
          <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No absence blocks recorded for {surveyorName}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Upcoming / Current */}
          {upcomingBlocks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                Upcoming &amp; Current
              </h4>
              <div className="space-y-2">
                {upcomingBlocks.map((block) => (
                  <BlockRow
                    key={block.id}
                    block={block}
                    onEdit={() => setEditingBlock(block)}
                    onDelete={() => handleDelete(block)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {pastBlocks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                Past
              </h4>
              <div className="space-y-2 opacity-60">
                {pastBlocks.map((block) => (
                  <BlockRow
                    key={block.id}
                    block={block}
                    onEdit={() => setEditingBlock(block)}
                    onDelete={() => handleDelete(block)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <BlockModal
          surveyorId={surveyorId}
          currentUserId={currentUserId}
          onClose={() => setShowAddModal(false)}
          onSaved={() => {
            setShowAddModal(false)
            setMessage({ type: 'success', text: 'Absence block added' })
            loadBlocks()
          }}
        />
      )}

      {/* Edit Modal */}
      {editingBlock && (
        <BlockModal
          surveyorId={surveyorId}
          currentUserId={currentUserId}
          existingBlock={editingBlock}
          onClose={() => setEditingBlock(null)}
          onSaved={() => {
            setEditingBlock(null)
            setMessage({ type: 'success', text: 'Absence block updated' })
            loadBlocks()
          }}
        />
      )}
    </div>
  )
}

// =============================================================================
// Block Row
// =============================================================================

function BlockRow({
  block,
  onEdit,
  onDelete,
}: {
  block: AvailabilityBlock
  onEdit: () => void
  onDelete: () => void
}) {
  const Icon = BLOCK_TYPE_ICONS[block.block_type]

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium shrink-0 ${BLOCK_TYPE_COLORS[block.block_type]}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {BLOCK_TYPE_LABELS[block.block_type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium">
          {formatDateRange(block.start_date, block.end_date)}
        </p>
        {block.reason && (
          <p className="text-xs text-white/50 truncate mt-0.5">{block.reason}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onEdit}
          className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-brand-400 transition-colors"
          title="Edit"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// Add/Edit Block Modal
// =============================================================================

function BlockModal({
  surveyorId,
  currentUserId,
  existingBlock,
  onClose,
  onSaved,
}: {
  surveyorId: string
  currentUserId: string
  existingBlock?: AvailabilityBlock
  onClose: () => void
  onSaved: () => void
}) {
  const isEdit = !!existingBlock
  const today = new Date().toISOString().slice(0, 10)

  const [formData, setFormData] = useState({
    startDate: existingBlock?.start_date || today,
    endDate: existingBlock?.end_date || today,
    blockType: (existingBlock?.block_type || 'annual_leave') as BlockType,
    reason: existingBlock?.reason || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Validate date range
    if (formData.endDate < formData.startDate) {
      setError('End date must be on or after start date')
      setSubmitting(false)
      return
    }

    try {
      if (isEdit && existingBlock) {
        await updateAvailabilityBlock(existingBlock.id, {
          start_date: formData.startDate,
          end_date: formData.endDate,
          block_type: formData.blockType,
          reason: formData.reason || null,
        })
      } else {
        await createAvailabilityBlock({
          surveyor_id: surveyorId,
          start_date: formData.startDate,
          end_date: formData.endDate,
          block_type: formData.blockType,
          reason: formData.reason || null,
          created_by: currentUserId,
        })
      }
      onSaved()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {isEdit ? 'Edit Absence Block' : 'Add Absence Block'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value,
                    // Auto-adjust end date if start moves past it
                    endDate: e.target.value > formData.endDate ? e.target.value : formData.endDate,
                  })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                min={formData.startDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Absence Type *
            </label>
            <select
              value={formData.blockType}
              onChange={(e) => setFormData({ ...formData, blockType: e.target.value as BlockType })}
              className="input-field"
              required
            >
              {(Object.keys(BLOCK_TYPE_LABELS) as BlockType[]).map((type) => (
                <option key={type} value={type}>
                  {BLOCK_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Reason <span className="text-white/40">(optional)</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="input-field min-h-[80px] resize-y"
              placeholder="e.g. Family holiday, doctor's appointment..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="spinner w-4 h-4" />
                  {isEdit ? 'Saving...' : 'Adding...'}
                </>
              ) : (
                <>
                  {isEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isEdit ? 'Save Changes' : 'Add Absence'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
