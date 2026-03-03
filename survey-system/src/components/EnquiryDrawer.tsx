'use client'

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase-client'
import {
  getEnquiryActivities,
  updateEnquiry,
  updateEnquiryStatus,
  assignEnquiry,
  logEnquiryActivity,
  createSurveyFromEnquiry,
  updateSurvey,
} from '@/lib/supabase-data'
import { createBooking, getBookingBySurveyId } from '@/lib/calendar-data'
import type { SurveyBooking } from '@/lib/calendar-data'
import { SlotPicker } from '@/components/calendar/SlotPicker'
import type { SelectedSlot } from '@/components/calendar/SlotPicker'
import { SurveyorSelect } from '@/components/calendar/SurveyorSelect'
import type {
  Enquiry,
  EnquiryStatus,
  EnquiryActivity,
  EnquiryActivityType,
  EnquiryPriority,
  OnHoldReason,
  OnHoldMessageTemplate,
} from '@/types/database.types'
import {
  X,
  ArrowLeft,
  ArrowRightLeft,
  UserCheck,
  StickyNote,
  Phone,
  Mail,
  ClipboardCheck,
  FileText,
  Send,
  Bell,
  CalendarClock,
  Flag,
  PauseCircle,
  Plus,
  ChevronDown,
  ExternalLink,
  Loader2,
  Save,
  User as UserIcon,
  Info,
  Clock,
  Pencil,
  Check,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Calendar,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<EnquiryStatus, { label: string; color: string }> = {
  new:       { label: 'New',       color: '#3B82F6' },
  assigned:  { label: 'Assigned',  color: '#8B5CF6' },
  surveyed:  { label: 'Surveyed',  color: '#14B8A6' },
  quoted:    { label: 'Quoted',    color: '#F59E0B' },
  accepted:  { label: 'Accepted',  color: '#22C55E' },
  declined:  { label: 'Declined',  color: '#EF4444' },
  on_hold:   { label: 'On Hold',   color: '#6B7280' },
  completed: { label: 'Completed', color: '#10B981' },
}

const PRIORITY_CONFIG: Record<EnquiryPriority, { label: string; color: string; bgClass: string }> = {
  low:    { label: 'Low',    color: '#9CA3AF', bgClass: 'bg-gray-500/20 text-gray-300 border-gray-400/30' },
  medium: { label: 'Medium', color: '#3B82F6', bgClass: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
  high:   { label: 'High',   color: '#F97316', bgClass: 'bg-orange-500/20 text-orange-300 border-orange-400/30' },
  urgent: { label: 'Urgent', color: '#EF4444', bgClass: 'bg-red-500/20 text-red-300 border-red-400/30' },
}

const ACTIVITY_ICONS: Record<EnquiryActivityType, React.ComponentType<{ className?: string }>> = {
  status_change:        ArrowRightLeft,
  assignment_change:    UserCheck,
  note_added:           StickyNote,
  call_logged:          Phone,
  email_sent:           Mail,
  survey_created:       ClipboardCheck,
  quotation_generated:  FileText,
  quotation_sent:       Send,
  customer_notified:    Bell,
  follow_up_set:        CalendarClock,
  priority_changed:     Flag,
  on_hold_reason_set:   PauseCircle,
  created:              Plus,
}

const SURVEY_TYPE_LABELS: Record<string, string> = {
  damp: 'Damp',
  timber: 'Timber',
  woodworm: 'Woodworm',
  condensation: 'Condensation',
  structural: 'Structural',
  comprehensive: 'Comprehensive',
}

const SURVEY_TYPE_OPTIONS = [
  { value: 'damp',          label: 'Damp' },
  { value: 'condensation',  label: 'Condensation' },
  { value: 'timber',        label: 'Timber' },
  { value: 'woodworm',      label: 'Woodworm' },
  { value: 'structural',    label: 'Structural' },
  { value: 'comprehensive', label: 'Comprehensive' },
]

const SOURCE_OPTIONS = [
  { value: '',                label: '— Not set —' },
  { value: 'Website',         label: 'Website' },
  { value: 'Phone',           label: 'Phone' },
  { value: 'Email',           label: 'Email' },
  { value: 'Referral',        label: 'Referral' },
  { value: 'Repeat Customer', label: 'Repeat Customer' },
]

const ALL_STATUSES: EnquiryStatus[] = [
  'new', 'assigned', 'surveyed', 'quoted', 'accepted', 'declined', 'on_hold', 'completed',
]

const ALL_PRIORITIES: EnquiryPriority[] = ['low', 'medium', 'high', 'urgent']

// Convert & Book flow step labels
const FLOW_STEP_LABELS = ['Review', 'Surveyor', 'Schedule', 'Confirm'] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'Just now'
  if (mins === 1) return '1 minute ago'
  if (mins < 60) return `${mins} minutes ago`
  const hrs = Math.floor(mins / 60)
  if (hrs === 1) return '1 hour ago'
  if (hrs < 24) return `${hrs} hours ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return '1 week ago'
  if (weeks < 5) return `${weeks} weeks ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  return `${months} months ago`
}

// ---------------------------------------------------------------------------
// SLA helpers (drawer timing display — mirrors thresholds in enquiries/page.tsx)
// ---------------------------------------------------------------------------

const DRAWER_SLA_HOURS: Partial<Record<EnquiryStatus, { green: number; amber: number }>> = {
  new:      { green: 24,  amber: 48  },
  assigned: { green: 72,  amber: 120 },
  surveyed: { green: 24,  amber: 48  },
  quoted:   { green: 120, amber: 240 },
  on_hold:  { green: 168, amber: 336 },
}

function getDrawerSlaStatus(status: EnquiryStatus, statusChangedAt: string): 'green' | 'amber' | 'red' | null {
  const thresholds = DRAWER_SLA_HOURS[status]
  if (!thresholds) return null
  const hoursInStatus = (Date.now() - new Date(statusChangedAt).getTime()) / 3_600_000
  if (hoursInStatus < thresholds.green) return 'green'
  if (hoursInStatus < thresholds.amber) return 'amber'
  return 'red'
}

function formatDrawerDuration(ms: number): string {
  const totalMins = Math.floor(ms / 60_000)
  if (totalMins < 60) return `${totalMins}m`
  const hrs = Math.floor(totalMins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  const remHrs = hrs % 24
  return remHrs > 0 ? `${days}d ${remHrs}h` : `${days}d`
}

function getDrawerFollowUpState(date: string | null): { state: 'overdue' | 'today' | 'upcoming' | 'future' | 'none'; daysUntil: number } {
  if (!date) return { state: 'none', daysUntil: 0 }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const fu = new Date(date)
  fu.setHours(0, 0, 0, 0)
  const diffDays = Math.round((fu.getTime() - today.getTime()) / 86_400_000)
  if (diffDays < 0) return { state: 'overdue', daysUntil: diffDays }
  if (diffDays === 0) return { state: 'today', daysUntil: 0 }
  if (diffDays <= 3) return { state: 'upcoming', daysUntil: diffDays }
  return { state: 'future', daysUntil: diffDays }
}

// ---------------------------------------------------------------------------
// Inline-edit field components
// ---------------------------------------------------------------------------

/**
 * Short single-line field (text / email / tel).
 * Display mode: value as text (or clickable link for email/phone) + hover pencil.
 * Edit mode: input that saves on blur or Enter, cancels on Escape.
 */
function InlineField({
  label,
  value,
  onSave,
  type = 'text',
  linkHref,
  linkIcon,
  transform,
  placeholder = 'Not set',
}: {
  label: string
  value: string | null | undefined
  onSave: (v: string) => Promise<void>
  type?: 'text' | 'email' | 'tel'
  linkHref?: string
  linkIcon?: ReactNode
  transform?: (v: string) => string
  placeholder?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'ok' | 'err'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editing) setDraft(value ?? '')
  }, [value, editing])

  const startEdit = () => {
    setDraft(value ?? '')
    setEditing(true)
    setSaveState('idle')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const cancel = () => {
    setDraft(value ?? '')
    setEditing(false)
    setSaveState('idle')
  }

  const commit = async () => {
    const finalValue = transform ? transform(draft) : draft
    if (finalValue === (value ?? '')) { setEditing(false); return }
    setSaving(true)
    try {
      await onSave(finalValue)
      setSaveState('ok')
      setEditing(false)
      setTimeout(() => setSaveState('idle'), 1500)
    } catch {
      setSaveState('err')
      setDraft(value ?? '')
      setTimeout(() => setSaveState('idle'), 2000)
    } finally {
      setSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); commit() }
    if (e.key === 'Escape') cancel()
  }

  return (
    <div className="group">
      <span className="text-xs text-white/40 block mb-0.5">{label}</span>
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type={type}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={handleKeyDown}
            className="input-field flex-1 text-sm py-1 h-8"
            placeholder={placeholder}
          />
          {saving && <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin flex-shrink-0" />}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 min-h-[1.5rem]">
          <div className="flex items-center gap-1.5 min-w-0">
            {linkHref && value ? (
              <a href={linkHref} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1.5 truncate">
                {linkIcon}
                <span className="truncate">{value}</span>
              </a>
            ) : (
              <span className={`text-sm truncate ${value ? 'text-white/80' : 'text-white/20 italic'}`}>
                {value || placeholder}
              </span>
            )}
            {saveState === 'ok'  && <Check        className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
            {saveState === 'err' && <AlertCircle  className="w-3.5 h-3.5 text-red-400   flex-shrink-0" />}
          </div>
          <button
            type="button"
            onClick={startEdit}
            title={`Edit ${label}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-0.5 rounded text-white/30 hover:text-white/60"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Multi-line textarea field.
 * Save requires explicit button click — clicking away keeps edit mode open
 * so the user never loses in-progress text.
 */
function InlineTextareaField({
  label,
  value,
  onSave,
  placeholder = 'Not set',
  problemExpanded,
  onToggleExpand,
}: {
  label: string
  value: string | null | undefined
  onSave: (v: string) => Promise<void>
  placeholder?: string
  problemExpanded?: boolean
  onToggleExpand?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'ok' | 'err'>('idle')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!editing) setDraft(value ?? '')
  }, [value, editing])

  const startEdit = () => {
    setDraft(value ?? '')
    setEditing(true)
    setSaveState('idle')
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const cancel = () => {
    setDraft(value ?? '')
    setEditing(false)
    setSaveState('idle')
  }

  const commit = async () => {
    if (draft === (value ?? '')) { setEditing(false); return }
    setSaving(true)
    try {
      await onSave(draft)
      setSaveState('ok')
      setEditing(false)
      setTimeout(() => setSaveState('idle'), 1500)
    } catch {
      // Stay in edit mode on failure so work is not lost
      setSaveState('err')
      setTimeout(() => setSaveState('idle'), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-xs text-white/40">{label}</span>
        <div className="flex items-center gap-1.5">
          {saveState === 'ok'  && <Check       className="w-3.5 h-3.5 text-green-400" />}
          {saveState === 'err' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
          {!editing && (
            <button
              type="button"
              onClick={startEdit}
              title={`Edit ${label}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-white/30 hover:text-white/60"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      {editing ? (
        <div>
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
            className="input-field w-full resize-none text-sm"
            placeholder={placeholder}
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={commit}
              disabled={saving}
              className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className="text-xs text-white/40 hover:text-white/60 px-2 py-1.5"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {value ? (
            <>
              <div className="relative">
                <p className={`text-sm text-white/70 leading-relaxed ${
                  !problemExpanded && value.length > 200 ? 'max-h-[4.5em] overflow-hidden' : ''
                }`}>
                  {value}
                </p>
                {!problemExpanded && value.length > 200 && (
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[rgba(15,23,36,0.98)] to-transparent" />
                )}
              </div>
              {value.length > 200 && (
                <button
                  type="button"
                  onClick={onToggleExpand}
                  className="text-xs text-blue-400 hover:text-blue-300 mt-1"
                >
                  {problemExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </>
          ) : (
            <span className="text-sm text-white/20 italic">{placeholder}</span>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Dropdown select field — saves immediately on option change.
 */
function InlineSelectField({
  label,
  value,
  options,
  onSave,
}: {
  label: string
  value: string | null | undefined
  options: { value: string; label: string }[]
  onSave: (v: string) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'ok' | 'err'>('idle')

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    if (newValue === (value ?? '')) return
    setSaving(true)
    setSaveState('idle')
    try {
      await onSave(newValue)
      setSaveState('ok')
      setTimeout(() => setSaveState('idle'), 1500)
    } catch {
      setSaveState('err')
      setTimeout(() => setSaveState('idle'), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-xs text-white/40">{label}</span>
        <div className="flex items-center gap-1">
          {saving && <Loader2 className="w-3 h-3 animate-spin text-white/40" />}
          {saveState === 'ok'  && <Check       className="w-3.5 h-3.5 text-green-400" />}
          {saveState === 'err' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
        </div>
      </div>
      <select
        value={value ?? ''}
        onChange={handleChange}
        disabled={saving}
        className="input-field w-full text-sm"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

/**
 * Date input field — saves immediately on date selection.
 */
function InlineDateField({
  label,
  value,
  onSave,
}: {
  label: string
  value: string | null | undefined
  onSave: (v: string | null) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'ok' | 'err'>('idle')

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || null
    if (newValue === (value ?? null)) return
    setSaving(true)
    setSaveState('idle')
    try {
      await onSave(newValue)
      setSaveState('ok')
      setTimeout(() => setSaveState('idle'), 1500)
    } catch {
      setSaveState('err')
      setTimeout(() => setSaveState('idle'), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-xs text-white/40">{label}</span>
        <div className="flex items-center gap-1">
          {saving && <Loader2 className="w-3 h-3 animate-spin text-white/40" />}
          {saveState === 'ok'  && <Check       className="w-3.5 h-3.5 text-green-400" />}
          {saveState === 'err' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
        </div>
      </div>
      <input
        type="date"
        value={value ?? ''}
        onChange={handleChange}
        disabled={saving}
        className="input-field w-full text-sm"
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TeamMember = { id: string; user_id: string; display_name: string; role: string }

type LinkedSurvey = {
  id: string
  project_number: string
  survey_date: string | null
  status: string
  surveyor_id: string | null
}

type FlowStep = 1 | 2 | 3 | 4

type LinkedQuotation = {
  id: string
  quotation_number: string
  total_incl_vat: number
  status: string
  survey_id: string
}

type TabId = 'details' | 'activity' | 'linked'

export type EnquiryDrawerProps = {
  enquiry: Enquiry
  onClose: () => void
  onBoardSync: (updatedEnquiry: Enquiry, previousStatus?: EnquiryStatus) => void
  onRequestStatusChange: (enquiry: Enquiry, toStatus: 'on_hold' | 'declined') => void
  holdTemplates: OnHoldMessageTemplate[]
  currentUserId: string | null
  /** When true, the drawer opens directly into the Convert & Book flow */
  initialConvertFlow?: boolean
}

// ---------------------------------------------------------------------------
// EnquiryDrawer Component
// ---------------------------------------------------------------------------

export default function EnquiryDrawer({
  enquiry,
  onClose,
  onBoardSync,
  onRequestStatusChange,
  holdTemplates,
  currentUserId,
  initialConvertFlow = false,
}: EnquiryDrawerProps) {
  // Slide animation
  const [isVisible, setIsVisible] = useState(false)

  // Tab
  const [activeTab, setActiveTab] = useState<TabId>('details')

  // Activities (lazy loaded)
  const [activities, setActivities] = useState<EnquiryActivity[]>([])
  const [activitiesLoaded, setActivitiesLoaded] = useState(false)
  const [activitiesLoading, setActivitiesLoading] = useState(false)

  // Team members for assignment dropdown
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  // Linked records (lazy loaded)
  const [linkedSurveys, setLinkedSurveys] = useState<LinkedSurvey[]>([])
  const [linkedQuotations, setLinkedQuotations] = useState<LinkedQuotation[]>([])
  const [linkedLoaded, setLinkedLoaded] = useState(false)
  const [linkedLoading, setLinkedLoading] = useState(false)
  const [linkedBooking, setLinkedBooking] = useState<SurveyBooking | null>(null)

  // Dropdowns
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false)

  // Editable fields
  const [editingNotes, setEditingNotes] = useState(enquiry.notes ?? '')
  const [notesChanged, setNotesChanged] = useState(false)
  const [editingValue, setEditingValue] = useState(enquiry.estimated_value?.toString() ?? '')
  const [valueChanged, setValueChanged] = useState(false)

  // Saving states
  const [savingNotes, setSavingNotes] = useState(false)
  const [savingValue, setSavingValue] = useState(false)
  const [savingFollowUp, setSavingFollowUp] = useState(false)
  const [savingPriority, setSavingPriority] = useState(false)
  const [savingAssignment, setSavingAssignment] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)

  // Activity quick actions
  const [showAddNote, setShowAddNote] = useState(false)
  const [showLogCall, setShowLogCall] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [callSummary, setCallSummary] = useState('')
  const [callDetails, setCallDetails] = useState('')
  const [savingActivity, setSavingActivity] = useState(false)

  // Problem text expand
  const [problemExpanded, setProblemExpanded] = useState(false)

  // Convert & Book flow
  const [showConvertFlow, setShowConvertFlow] = useState(false)
  const [flowStep, setFlowStep] = useState<FlowStep>(1)
  const [flowSurveyorId, setFlowSurveyorId] = useState<string | null>(null)
  const [flowSurveyorName, setFlowSurveyorName] = useState('')
  const [flowSlot, setFlowSlot] = useState<SelectedSlot | null>(null)
  const [flowLoading, setFlowLoading] = useState(false)
  const [flowSuccess, setFlowSuccess] = useState(false)
  const [flowError, setFlowError] = useState<string | null>(null)
  const [flowPartialSuccess, setFlowPartialSuccess] = useState(false)
  const [flowCreatedSurvey, setFlowCreatedSurvey] = useState<{ id: string; project_number: string } | null>(null)
  const [flowExistingSurveyId, setFlowExistingSurveyId] = useState<string | null>(null)

  // Refs for click-outside
  const statusRef = useRef<HTMLDivElement>(null)
  const priorityRef = useRef<HTMLDivElement>(null)
  const assigneeRef = useRef<HTMLDivElement>(null)

  // Track enquiry changes (for content swaps)
  const prevEnquiryIdRef = useRef(enquiry.id)

  // ── Slide-in animation ────────────────────────────────────────
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  // ── Auto-trigger Convert & Book when opened via card quick action ──
  useEffect(() => {
    if (initialConvertFlow) {
      startConvertFlow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only on mount — initialConvertFlow won't change while drawer is open

  // ── Scroll lock ───────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── Escape key ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showStatusDropdown || showPriorityDropdown || showAssigneeDropdown) {
          setShowStatusDropdown(false)
          setShowPriorityDropdown(false)
          setShowAssigneeDropdown(false)
        } else {
          handleClose()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStatusDropdown, showPriorityDropdown, showAssigneeDropdown])

  // ── Click-outside for dropdowns ───────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setShowStatusDropdown(false)
      }
      if (priorityRef.current && !priorityRef.current.contains(e.target as Node)) {
        setShowPriorityDropdown(false)
      }
      if (assigneeRef.current && !assigneeRef.current.contains(e.target as Node)) {
        setShowAssigneeDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Reset on enquiry change (content swap) ────────────────────
  useEffect(() => {
    if (prevEnquiryIdRef.current !== enquiry.id) {
      prevEnquiryIdRef.current = enquiry.id
      setActiveTab('details')
      setActivities([])
      setActivitiesLoaded(false)
      setLinkedSurveys([])
      setLinkedQuotations([])
      setLinkedLoaded(false)
      setShowAddNote(false)
      setShowLogCall(false)
      setNoteText('')
      setCallSummary('')
      setCallDetails('')
      setProblemExpanded(false)
      setShowConvertFlow(false)
      setFlowStep(1)
      setFlowSurveyorId(null)
      setFlowSurveyorName('')
      setFlowSlot(null)
      setFlowSuccess(false)
      setFlowError(null)
      setFlowPartialSuccess(false)
      setFlowCreatedSurvey(null)
      setFlowExistingSurveyId(null)
      setLinkedBooking(null)
    }
    // Sync editable fields with current enquiry prop
    setEditingNotes(enquiry.notes ?? '')
    setNotesChanged(false)
    setEditingValue(enquiry.estimated_value?.toString() ?? '')
    setValueChanged(false)
  }, [enquiry])

  // ── Load team members once ────────────────────────────────────
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('user_profiles')
      .select('id, user_id, display_name, role')
      .eq('is_active', true)
      .order('display_name')
      .then(({ data }) => setTeamMembers((data as TeamMember[]) ?? []))
  }, [])

  // ── Load activities when Activity tab is first viewed ─────────
  const loadActivities = useCallback(async () => {
    if (activitiesLoaded || activitiesLoading) return
    setActivitiesLoading(true)
    const data = await getEnquiryActivities(enquiry.id)
    setActivities(data)
    setActivitiesLoaded(true)
    setActivitiesLoading(false)
  }, [enquiry.id, activitiesLoaded, activitiesLoading])

  useEffect(() => {
    if (activeTab === 'activity' && !activitiesLoaded) {
      loadActivities()
    }
  }, [activeTab, activitiesLoaded, loadActivities])

  // ── Load linked records when Linked tab is first viewed ───────
  const loadLinked = useCallback(async () => {
    if (linkedLoaded || linkedLoading) return
    setLinkedLoading(true)

    const supabase = createClient()

    const { data: surveys } = await supabase
      .from('surveys')
      .select('id, project_number, survey_date, status, surveyor_id')
      .eq('enquiry_id', enquiry.id)

    setLinkedSurveys((surveys as LinkedSurvey[]) ?? [])

    if (surveys && surveys.length > 0) {
      const surveyIds = surveys.map((s: LinkedSurvey) => s.id)
      const [quotationsResult, bookingResult] = await Promise.all([
        supabase
          .from('quotations')
          .select('id, quotation_number, total_incl_vat, status, survey_id')
          .in('survey_id', surveyIds),
        getBookingBySurveyId(surveys[0].id),
      ])
      setLinkedQuotations((quotationsResult.data as LinkedQuotation[]) ?? [])
      setLinkedBooking(bookingResult)
    }

    setLinkedLoaded(true)
    setLinkedLoading(false)
  }, [enquiry.id, linkedLoaded, linkedLoading])

  useEffect(() => {
    if (activeTab === 'linked' && !linkedLoaded) {
      loadLinked()
    }
  }, [activeTab, linkedLoaded, loadLinked])

  // ── Handlers ──────────────────────────────────────────────────

  function handleClose() {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  async function handleStatusChange(newStatus: EnquiryStatus) {
    setShowStatusDropdown(false)
    if (newStatus === enquiry.status) return

    if (newStatus === 'on_hold' || newStatus === 'declined') {
      onRequestStatusChange(enquiry, newStatus)
      return
    }

    setSavingStatus(true)
    try {
      await updateEnquiryStatus(enquiry.id, newStatus, currentUserId)
      const previousStatus = enquiry.status
      onBoardSync({ ...enquiry, status: newStatus }, previousStatus)
    } catch (err) {
      console.error('Status update failed:', err)
    } finally {
      setSavingStatus(false)
    }
  }

  async function handlePriorityChange(newPriority: EnquiryPriority) {
    setShowPriorityDropdown(false)
    if (newPriority === enquiry.priority) return

    setSavingPriority(true)
    try {
      await updateEnquiry(enquiry.id, { priority: newPriority })
      await logEnquiryActivity(
        enquiry.id,
        'priority_changed',
        `Priority changed from ${enquiry.priority} to ${newPriority}`,
        currentUserId,
        null,
        { old_priority: enquiry.priority, new_priority: newPriority }
      )
      onBoardSync({ ...enquiry, priority: newPriority })
      // Refresh activity timeline if visible
      if (activeTab === 'activity') {
        setActivitiesLoaded(false)
      }
    } catch (err) {
      console.error('Priority update failed:', err)
    } finally {
      setSavingPriority(false)
    }
  }

  async function handleAssignment(assigneeId: string) {
    setShowAssigneeDropdown(false)
    if (assigneeId === enquiry.assigned_to) return

    setSavingAssignment(true)
    try {
      const result = await assignEnquiry(enquiry.id, assigneeId, currentUserId)
      const member = teamMembers.find(m => m.id === assigneeId)
      const updatedEnquiry: Enquiry = {
        ...enquiry,
        assigned_to: assigneeId,
        assignee: member ? { id: member.id, display_name: member.display_name } : enquiry.assignee,
        status: result.status,
      }
      const previousStatus = result.status !== enquiry.status ? enquiry.status : undefined
      onBoardSync(updatedEnquiry, previousStatus)

      if (activeTab === 'activity') {
        setActivitiesLoaded(false)
      }
    } catch (err) {
      console.error('Assignment failed:', err)
    } finally {
      setSavingAssignment(false)
    }
  }

  async function handleSaveNotes() {
    setSavingNotes(true)
    try {
      await updateEnquiry(enquiry.id, { notes: editingNotes })
      onBoardSync({ ...enquiry, notes: editingNotes })
      setNotesChanged(false)
    } catch (err) {
      console.error('Notes save failed:', err)
    } finally {
      setSavingNotes(false)
    }
  }

  async function handleSaveValue() {
    setSavingValue(true)
    const numValue = editingValue ? parseFloat(editingValue) : null
    try {
      await updateEnquiry(enquiry.id, { estimated_value: numValue })
      onBoardSync({ ...enquiry, estimated_value: numValue })
      setValueChanged(false)
    } catch (err) {
      console.error('Value save failed:', err)
    } finally {
      setSavingValue(false)
    }
  }

  // ── Inline field save ─────────────────────────────────────────
  // Handles saving any editable Details-tab field. Fields covered by
  // updateEnquiry() go through it; site address + survey_type go via
  // the Supabase client directly (they aren't in updateEnquiry's Pick).

  const saveField = useCallback(async (field: string, newValue: string | null) => {
    if (field === 'client_name') {
      const u = await updateEnquiry(enquiry.id, { client_name: newValue ?? '' })
      onBoardSync({ ...enquiry, ...u }); return
    }
    if (field === 'client_email') {
      const u = await updateEnquiry(enquiry.id, { client_email: newValue })
      onBoardSync({ ...enquiry, ...u }); return
    }
    if (field === 'client_phone') {
      const u = await updateEnquiry(enquiry.id, { client_phone: newValue })
      onBoardSync({ ...enquiry, ...u }); return
    }
    if (field === 'source') {
      const u = await updateEnquiry(enquiry.id, { source: newValue })
      onBoardSync({ ...enquiry, ...u }); return
    }
    if (field === 'proposed_survey_date') {
      const u = await updateEnquiry(enquiry.id, { proposed_survey_date: newValue })
      onBoardSync({ ...enquiry, ...u }); return
    }
    if (field === 'reported_problem') {
      const u = await updateEnquiry(enquiry.id, { reported_problem: newValue })
      onBoardSync({ ...enquiry, ...u }); return
    }
    // Direct Supabase for site address fields and survey_type
    const supabase = createClient()
    const { error } = await supabase.from('enquiries').update({ [field]: newValue }).eq('id', enquiry.id)
    if (error) throw new Error(error.message)
    onBoardSync({ ...enquiry, [field]: newValue } as Enquiry)
  }, [enquiry, onBoardSync])

  async function handleFollowUpChange(dateValue: string) {
    setSavingFollowUp(true)
    const newDate = dateValue || null
    try {
      await updateEnquiry(enquiry.id, { follow_up_date: newDate })
      if (newDate) {
        await logEnquiryActivity(
          enquiry.id,
          'follow_up_set',
          `Follow-up date set to ${new Date(newDate).toLocaleDateString('en-GB')}`,
          currentUserId,
        )
      }
      onBoardSync({ ...enquiry, follow_up_date: newDate })
      if (activeTab === 'activity') {
        setActivitiesLoaded(false)
      }
    } catch (err) {
      console.error('Follow-up save failed:', err)
    } finally {
      setSavingFollowUp(false)
    }
  }

  async function handleAddNote() {
    if (!noteText.trim()) return
    setSavingActivity(true)
    try {
      const activity = await logEnquiryActivity(
        enquiry.id,
        'note_added',
        'Note added',
        currentUserId,
        noteText.trim()
      )
      if (activity) {
        const userProfile = teamMembers.find(m => m.user_id === currentUserId)
        const enriched: EnquiryActivity = {
          ...activity,
          user: userProfile ? { display_name: userProfile.display_name } : null,
        }
        setActivities(prev => [enriched, ...prev])
      }
      setNoteText('')
      setShowAddNote(false)
    } catch (err) {
      console.error('Add note failed:', err)
    } finally {
      setSavingActivity(false)
    }
  }

  async function handleLogCall() {
    if (!callSummary.trim()) return
    setSavingActivity(true)
    try {
      const activity = await logEnquiryActivity(
        enquiry.id,
        'call_logged',
        callSummary.trim(),
        currentUserId,
        callDetails.trim() || null
      )
      if (activity) {
        const userProfile = teamMembers.find(m => m.user_id === currentUserId)
        const enriched: EnquiryActivity = {
          ...activity,
          user: userProfile ? { display_name: userProfile.display_name } : null,
        }
        setActivities(prev => [enriched, ...prev])
      }
      setCallSummary('')
      setCallDetails('')
      setShowLogCall(false)
    } catch (err) {
      console.error('Log call failed:', err)
    } finally {
      setSavingActivity(false)
    }
  }

  // ── Convert & Book flow handlers ──────────────────────────────

  function startConvertFlow(existingSurveyId?: string | null) {
    setFlowStep(existingSurveyId ? 2 : 1)
    setFlowExistingSurveyId(existingSurveyId ?? null)
    setFlowSurveyorId(null)
    setFlowSurveyorName('')
    setFlowSlot(null)
    setFlowLoading(false)
    setFlowSuccess(false)
    setFlowError(null)
    setFlowPartialSuccess(false)
    setFlowCreatedSurvey(null)
    setShowConvertFlow(true)
  }

  function cancelConvertFlow() {
    setShowConvertFlow(false)
  }

  async function handleFlowConfirm() {
    if (!flowSlot) return
    setFlowLoading(true)
    setFlowError(null)

    let createdSurvey: { id: string; project_number: string } | null = null

    try {
      if (flowExistingSurveyId) {
        // Survey already exists — fetch its project_number for the success state
        const supabase = createClient()
        const { data } = await supabase
          .from('surveys')
          .select('id, project_number')
          .eq('id', flowExistingSurveyId)
          .single()
        createdSurvey = data as { id: string; project_number: string }
      } else {
        // Create customer + survey from enquiry
        const { survey } = await createSurveyFromEnquiry(enquiry.id, currentUserId)
        createdSurvey = { id: survey.id, project_number: survey.project_number }
        if (enquiry.status === 'new') {
          onBoardSync({ ...enquiry, status: 'assigned' }, enquiry.status)
        }
      }

      if (!createdSurvey) throw new Error('Failed to resolve survey')

      // Assign surveyor + survey date
      await updateSurvey(createdSurvey.id, {
        surveyor_id: flowSlot.surveyorId,
        survey_date: flowSlot.date,
      })

      // Build customer address for the booking record
      const fullAddress = [
        enquiry.site_address_1,
        enquiry.site_address_2,
        enquiry.site_city,
        enquiry.site_county,
        enquiry.site_postcode,
      ]
        .filter(Boolean)
        .join(', ')

      try {
        await createBooking({
          surveyId: createdSurvey.id,
          surveyorId: flowSlot.surveyorId,
          customerName: enquiry.client_name || '',
          customerPhone: enquiry.client_phone || null,
          customerEmail: enquiry.client_email || null,
          customerAddress: fullAddress || null,
          bookingDate: flowSlot.date,
          startTime: flowSlot.startTime,
          endTime: flowSlot.endTime,
          notes: null,
          createdBy: teamMembers.find(m => m.user_id === currentUserId)?.id || currentUserId || '',
        })
      } catch (bookingErr) {
        // Partial success: survey created but booking failed
        setFlowCreatedSurvey(createdSurvey)
        setFlowPartialSuccess(true)
        setFlowError(bookingErr instanceof Error ? bookingErr.message : 'Booking creation failed')
        setLinkedLoaded(false)
        return
      }

      setFlowCreatedSurvey(createdSurvey)
      setFlowSuccess(true)
      setLinkedLoaded(false)

    } catch (err) {
      console.error('Convert & Book failed:', err)
      setFlowError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setFlowLoading(false)
    }
  }

  // Hold template lookup
  const currentHoldTemplate = enquiry.hold_reason
    ? holdTemplates.find(t => t.reason_key === enquiry.hold_reason)
    : null

  const assigneeName = enquiry.assignee?.display_name ?? null

  // ── Render ────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div
        className={`
          absolute top-0 right-0 h-full
          w-full lg:w-[60vw] lg:max-w-[800px]
          flex flex-col
          border-l border-white/10
          transition-transform duration-300 ease-out
          ${isVisible ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,36,0.98) 0%, rgba(8,14,24,0.99) 100%)',
        }}
      >
        {/* ─────────────────── Header ─────────────────── */}
        <div className="flex-shrink-0 border-b border-white/10 p-4 lg:p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="text-xl font-bold text-white leading-tight">
              {enquiry.client_name}
            </h2>
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            >
              <span className="hidden lg:block"><X className="w-5 h-5" /></span>
              <span className="lg:hidden"><ArrowLeft className="w-5 h-5" /></span>
            </button>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Enquiry number */}
            <span className="text-xs text-white/40 font-mono">
              {enquiry.enquiry_number}
            </span>

            <span className="text-white/20">·</span>

            {/* Status badge */}
            <div ref={statusRef} className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown)
                  setShowPriorityDropdown(false)
                  setShowAssigneeDropdown(false)
                }}
                disabled={savingStatus}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-all hover:opacity-80 border"
                style={{
                  backgroundColor: `${STATUS_CONFIG[enquiry.status].color}20`,
                  color: STATUS_CONFIG[enquiry.status].color,
                  borderColor: `${STATUS_CONFIG[enquiry.status].color}40`,
                }}
              >
                {savingStatus && <Loader2 className="w-3 h-3 animate-spin" />}
                {STATUS_CONFIG[enquiry.status].label}
                <ChevronDown className="w-3 h-3" />
              </button>

              {showStatusDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-white/15 overflow-hidden shadow-xl z-10"
                  style={{ background: 'rgba(20,30,45,0.98)' }}
                >
                  {ALL_STATUSES
                    .filter(s => s !== enquiry.status)
                    .map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: STATUS_CONFIG[status].color }}
                        />
                        <span className="text-white/80">{STATUS_CONFIG[status].label}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <span className="text-white/20">·</span>

            {/* Priority badge */}
            <div ref={priorityRef} className="relative">
              <button
                onClick={() => {
                  setShowPriorityDropdown(!showPriorityDropdown)
                  setShowStatusDropdown(false)
                  setShowAssigneeDropdown(false)
                }}
                disabled={savingPriority}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-all hover:opacity-80 border ${PRIORITY_CONFIG[enquiry.priority].bgClass}`}
              >
                {savingPriority && <Loader2 className="w-3 h-3 animate-spin" />}
                {PRIORITY_CONFIG[enquiry.priority].label}
                <ChevronDown className="w-3 h-3" />
              </button>

              {showPriorityDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-36 rounded-lg border border-white/15 overflow-hidden shadow-xl z-10"
                  style={{ background: 'rgba(20,30,45,0.98)' }}
                >
                  {ALL_PRIORITIES
                    .filter(p => p !== enquiry.priority)
                    .map(priority => (
                      <button
                        key={priority}
                        onClick={() => handlePriorityChange(priority)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: PRIORITY_CONFIG[priority].color }}
                        />
                        <span className="text-white/80">{PRIORITY_CONFIG[priority].label}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <span className="text-white/20">·</span>

            {/* Assignee */}
            <div ref={assigneeRef} className="relative">
              <button
                onClick={() => {
                  setShowAssigneeDropdown(!showAssigneeDropdown)
                  setShowStatusDropdown(false)
                  setShowPriorityDropdown(false)
                }}
                disabled={savingAssignment}
                className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer"
              >
                {savingAssignment ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <UserIcon className="w-3 h-3" />
                )}
                {assigneeName ?? 'Unassigned'}
                <ChevronDown className="w-3 h-3" />
              </button>

              {showAssigneeDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-52 max-h-60 overflow-y-auto rounded-lg border border-white/15 shadow-xl z-10"
                  style={{ background: 'rgba(20,30,45,0.98)' }}
                >
                  {teamMembers.map(member => (
                    <button
                      key={member.id}
                      onClick={() => handleAssignment(member.id)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center justify-between ${
                        member.id === enquiry.assigned_to ? 'bg-white/5' : ''
                      }`}
                    >
                      <span className="text-white/80">{member.display_name}</span>
                      <span className="text-[10px] text-white/30 capitalize">{member.role}</span>
                    </button>
                  ))}
                  {teamMembers.length === 0 && (
                    <p className="px-3 py-2 text-sm text-white/30">No team members found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─────────────────── Convert & Book Step Indicator ─────────────────── */}
        {showConvertFlow && (
          <div className="flex-shrink-0 border-b border-white/10 px-4 lg:px-5 py-3">
            <div className="flex items-center justify-center gap-1">
              {FLOW_STEP_LABELS.map((label, i) => {
                const step = (i + 1) as FlowStep
                const isCurrent = !flowSuccess && !flowPartialSuccess && step === flowStep
                const isCompleted = flowSuccess || flowPartialSuccess || step < flowStep
                const isClickable = isCompleted && !flowSuccess && !flowPartialSuccess && !flowLoading
                return (
                  <div key={step} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => { if (isClickable) setFlowStep(step) }}
                      disabled={!isClickable}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
                        isCurrent
                          ? 'text-blue-400'
                          : isCompleted
                            ? 'text-white/60 hover:text-white/80 cursor-pointer'
                            : 'text-white/25 cursor-default'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                        isCurrent ? 'bg-blue-400' : isCompleted ? 'bg-white/40' : 'bg-white/15'
                      }`} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                    {i < FLOW_STEP_LABELS.length - 1 && (
                      <div className="w-4 h-px bg-white/10 mx-1" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ─────────────────── Tab Bar (sticky) ─────────────────── */}
        {!showConvertFlow && (
          <div className="flex-shrink-0 border-b border-white/10 px-4 lg:px-5">
            <div className="flex gap-0">
              {(['details', 'activity', 'linked'] as TabId[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'text-white border-blue-500'
                      : 'text-white/40 border-transparent hover:text-white/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────── Tab Content (scrollable) ─────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* ────── Convert & Book Flow ────── */}
          {showConvertFlow && (
            <div className="p-4 lg:p-5">

              {/* ── Success state ── */}
              {flowSuccess && flowCreatedSurvey && flowSlot && (
                <div className="space-y-5 text-center py-6">
                  <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Survey Booked</h3>
                    <p className="text-sm text-white/50">Everything has been set up successfully.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Survey</span>
                      <span className="text-sm text-white/80 font-medium">{flowCreatedSurvey.project_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Surveyor</span>
                      <span className="text-sm text-white/80">{flowSlot.surveyorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Date</span>
                      <span className="text-sm text-white/80">
                        {new Date(flowSlot.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Time</span>
                      <span className="text-sm text-white/80">{flowSlot.startTime} – {flowSlot.endTime}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={cancelConvertFlow} className="btn-secondary flex-1 text-sm py-2">
                      Close
                    </button>
                    <a
                      href={`/projects/${flowCreatedSurvey.id}`}
                      className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1.5"
                    >
                      View Survey <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* ── Partial success (survey created, booking failed) ── */}
              {flowPartialSuccess && flowCreatedSurvey && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-400/20 bg-amber-500/5">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-300 mb-1">Survey created, booking failed</p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Survey <span className="text-white/70 font-medium">{flowCreatedSurvey.project_number}</span> was created successfully,
                        but the booking could not be scheduled. You can schedule it from the survey page.
                      </p>
                      {flowError && (
                        <p className="text-xs text-amber-300/60 mt-2">Error: {flowError}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={cancelConvertFlow} className="btn-secondary flex-1 text-sm py-2">
                      Close
                    </button>
                    <a
                      href={`/projects/${flowCreatedSurvey.id}`}
                      className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1.5"
                    >
                      Go to Survey <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* ── Step 1: Review ── */}
              {!flowSuccess && !flowPartialSuccess && flowStep === 1 && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-blue-400/15 bg-blue-500/5 p-3">
                    <p className="text-xs text-blue-300/70">
                      Need to change something? Cancel and edit in the Details tab first.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Customer</h4>
                      <div className="flex justify-between">
                        <span className="text-xs text-white/40">Name</span>
                        <span className="text-sm text-white/80">{enquiry.client_name || '—'}</span>
                      </div>
                      {enquiry.client_email && (
                        <div className="flex justify-between">
                          <span className="text-xs text-white/40">Email</span>
                          <span className="text-sm text-white/70">{enquiry.client_email}</span>
                        </div>
                      )}
                      {enquiry.client_phone && (
                        <div className="flex justify-between">
                          <span className="text-xs text-white/40">Phone</span>
                          <span className="text-sm text-white/70">{enquiry.client_phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Site Address</h4>
                      <p className="text-sm text-white/80">
                        {[enquiry.site_address_1, enquiry.site_address_2, enquiry.site_city, enquiry.site_county, enquiry.site_postcode]
                          .filter(Boolean)
                          .join(', ') || '—'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Survey Details</h4>
                      <div className="flex justify-between">
                        <span className="text-xs text-white/40">Type</span>
                        <span className="text-sm text-white/80">{SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type} Survey</span>
                      </div>
                      {enquiry.proposed_survey_date && (
                        <div className="flex justify-between">
                          <span className="text-xs text-white/40">Proposed Date</span>
                          <span className="text-sm text-white/70">
                            {new Date(enquiry.proposed_survey_date + 'T12:00:00').toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      )}
                      {enquiry.reported_problem && (
                        <div className="space-y-1">
                          <span className="text-xs text-white/40">Problem</span>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {enquiry.reported_problem.length > 120
                              ? enquiry.reported_problem.slice(0, 120) + '…'
                              : enquiry.reported_problem}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={cancelConvertFlow} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
                    <button onClick={() => setFlowStep(2)} className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1.5">
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Select Surveyor ── */}
              {!flowSuccess && !flowPartialSuccess && flowStep === 2 && (
                <div className="space-y-5">
                  <SurveyorSelect
                    onSelect={(id, name) => { setFlowSurveyorId(id); setFlowSurveyorName(name) }}
                    selectedId={flowSurveyorId}
                    label="Assign Surveyor"
                  />
                  {flowSurveyorId && (
                    <p className="text-xs text-white/40">
                      Selected: <span className="text-white/70 font-medium">{flowSurveyorName}</span>
                    </p>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => flowExistingSurveyId ? cancelConvertFlow() : setFlowStep(1)}
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      {flowExistingSurveyId ? 'Cancel' : 'Back'}
                    </button>
                    <button
                      onClick={() => setFlowStep(3)}
                      disabled={!flowSurveyorId}
                      className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Schedule ── */}
              {!flowSuccess && !flowPartialSuccess && flowStep === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-white/40">
                    Showing availability for <span className="text-white/70 font-medium">{flowSurveyorName}</span>.
                    You can change the surveyor using the selector below.
                  </p>
                  <SlotPicker
                    onSlotSelected={setFlowSlot}
                    selectedSlot={flowSlot}
                    defaultSurveyorId={flowSurveyorId}
                  />
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setFlowStep(2)} className="btn-secondary flex-1 text-sm py-2">Back</button>
                    <button
                      onClick={() => setFlowStep(4)}
                      disabled={!flowSlot}
                      className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 4: Confirm ── */}
              {!flowSuccess && !flowPartialSuccess && flowStep === 4 && flowSlot && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                    {!flowExistingSurveyId && (
                      <div className="flex justify-between">
                        <span className="text-xs text-white/40">Survey</span>
                        <span className="text-sm text-white/80">
                          New {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type} Survey
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Customer</span>
                      <span className="text-sm text-white/80">{enquiry.client_name || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Site</span>
                      <span className="text-sm text-white/80 text-right max-w-[55%]">
                        {[enquiry.site_address_1, enquiry.site_postcode].filter(Boolean).join(', ') || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Surveyor</span>
                      <span className="text-sm text-white/80">{flowSlot.surveyorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Date</span>
                      <span className="text-sm text-white/80">
                        {new Date(flowSlot.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Time</span>
                      <span className="text-sm text-white/80">{flowSlot.startTime} – {flowSlot.endTime}</span>
                    </div>
                  </div>

                  {flowError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                      <p className="text-sm text-red-300">{flowError}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setFlowStep(3)} disabled={flowLoading} className="btn-secondary flex-1 text-sm py-2">
                      Back
                    </button>
                    <button
                      onClick={handleFlowConfirm}
                      disabled={flowLoading}
                      className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2"
                    >
                      {flowLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
                      ) : (
                        <><Check className="w-4 h-4" /> Confirm & Book</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ────── Details Tab ────── */}
          {!showConvertFlow && activeTab === 'details' && (
            <div className="p-4 lg:p-5 space-y-5">

              {/* Customer Information */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Customer Information
                </h3>
                {enquiry.customer_id && (
                  <div className="flex items-center gap-1.5 mb-2 px-1">
                    <Info className="w-3 h-3 text-white/30 flex-shrink-0" />
                    <span className="text-xs text-white/40">Linked to customer record —</span>
                    <a
                      href={`/customers/${enquiry.customer_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
                    >
                      View Customer <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                )}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                  <InlineField
                    label="Client Name"
                    value={enquiry.client_name}
                    onSave={v => saveField('client_name', v || null)}
                    placeholder="Enter client name"
                  />
                  <InlineField
                    label="Email"
                    value={enquiry.client_email}
                    onSave={v => saveField('client_email', v || null)}
                    type="email"
                    linkHref={enquiry.client_email ? `mailto:${enquiry.client_email}` : undefined}
                    linkIcon={<Mail className="w-3.5 h-3.5" />}
                    placeholder="Enter email address"
                  />
                  <InlineField
                    label="Phone"
                    value={enquiry.client_phone}
                    onSave={v => saveField('client_phone', v || null)}
                    type="tel"
                    linkHref={enquiry.client_phone ? `tel:${enquiry.client_phone}` : undefined}
                    linkIcon={<Phone className="w-3.5 h-3.5" />}
                    placeholder="Enter phone number"
                  />
                </div>
              </section>

              {/* Site Information */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Site Information
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                  <InlineField
                    label="Address Line 1"
                    value={enquiry.site_address_1}
                    onSave={v => saveField('site_address_1', v || null)}
                    placeholder="Enter address line 1"
                  />
                  <InlineField
                    label="Address Line 2"
                    value={enquiry.site_address_2}
                    onSave={v => saveField('site_address_2', v || null)}
                    placeholder="Enter address line 2"
                  />
                  <InlineField
                    label="City"
                    value={enquiry.site_city}
                    onSave={v => saveField('site_city', v || null)}
                    placeholder="Enter city"
                  />
                  <InlineField
                    label="County"
                    value={enquiry.site_county}
                    onSave={v => saveField('site_county', v || null)}
                    placeholder="Enter county"
                  />
                  <InlineField
                    label="Postcode"
                    value={enquiry.site_postcode}
                    onSave={v => saveField('site_postcode', v || null)}
                    transform={v => v.toUpperCase()}
                    placeholder="Enter postcode"
                  />
                </div>
              </section>

              {/* Enquiry Details */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Enquiry Details
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
                  <InlineSelectField
                    label="Survey Type"
                    value={enquiry.survey_type}
                    options={SURVEY_TYPE_OPTIONS}
                    onSave={v => saveField('survey_type', v)}
                  />
                  <InlineSelectField
                    label="Source"
                    value={enquiry.source ?? ''}
                    options={SOURCE_OPTIONS}
                    onSave={v => saveField('source', v || null)}
                  />
                  <InlineDateField
                    label="Proposed Survey Date"
                    value={enquiry.proposed_survey_date}
                    onSave={v => saveField('proposed_survey_date', v)}
                  />
                  <InlineTextareaField
                    label="Reported Problem"
                    value={enquiry.reported_problem}
                    onSave={v => saveField('reported_problem', v || null)}
                    placeholder="Describe the reported problem"
                    problemExpanded={problemExpanded}
                    onToggleExpand={() => setProblemExpanded(!problemExpanded)}
                  />
                </div>
              </section>

              {/* Timing */}
              {(() => {
                const sla = getDrawerSlaStatus(enquiry.status, enquiry.status_changed_at)
                const slaColor = sla === 'red' ? '#EF4444' : sla === 'amber' ? '#F59E0B' : sla === 'green' ? '#22C55E' : undefined
                const timeInStatus = formatDrawerDuration(Date.now() - new Date(enquiry.status_changed_at).getTime())
                const enquiryAge = formatDrawerDuration(Date.now() - new Date(enquiry.created_at).getTime())
                const fuData = enquiry.follow_up_date ? getDrawerFollowUpState(enquiry.follow_up_date) : null
                const fuColor = fuData?.state === 'overdue' ? '#EF4444' : fuData?.state === 'today' ? '#F59E0B' : 'rgba(255,255,255,0.6)'
                const fuText = fuData?.state === 'overdue'
                  ? `Overdue (${Math.abs(fuData.daysUntil)}d ago)`
                  : fuData?.state === 'today'
                    ? 'Due today'
                    : fuData?.state === 'upcoming'
                      ? `In ${fuData.daysUntil} day${fuData.daysUntil === 1 ? '' : 's'}`
                      : enquiry.follow_up_date
                        ? new Date(enquiry.follow_up_date).toLocaleDateString('en-GB')
                        : null
                return (
                  <section>
                    <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                      Timing
                    </h3>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Time in status
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: slaColor ?? 'rgba(255,255,255,0.7)' }}>
                          {sla && (
                            <span
                              className={`inline-block w-2 h-2 rounded-full flex-shrink-0${sla === 'red' ? ' animate-pulse' : ''}`}
                              style={{ backgroundColor: slaColor }}
                            />
                          )}
                          {timeInStatus}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Enquiry age
                        </span>
                        <span className="text-sm text-white/60">{enquiryAge}</span>
                      </div>
                      {fuData && fuData.state !== 'none' && fuText && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-white/40 flex items-center gap-1.5">
                            <CalendarClock className="w-3 h-3" />
                            Follow-up
                          </span>
                          <span className="text-sm font-medium" style={{ color: fuColor }}>
                            {fuText}
                          </span>
                        </div>
                      )}
                    </div>
                  </section>
                )
              })()}

              {/* Internal */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Internal
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
                  {/* Notes */}
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Notes</label>
                    <textarea
                      value={editingNotes}
                      onChange={(e) => {
                        setEditingNotes(e.target.value)
                        setNotesChanged(e.target.value !== (enquiry.notes ?? ''))
                      }}
                      rows={3}
                      placeholder="Add internal notes..."
                      className="input-field w-full resize-none text-sm"
                    />
                    {notesChanged && (
                      <button
                        onClick={handleSaveNotes}
                        disabled={savingNotes}
                        className="btn-primary text-xs px-3 py-1.5 mt-2 flex items-center gap-1.5"
                      >
                        {savingNotes ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        Save Notes
                      </button>
                    )}
                  </div>

                  {/* Estimated Value */}
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Estimated Value</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40">£</span>
                        <input
                          type="number"
                          value={editingValue}
                          onChange={(e) => {
                            setEditingValue(e.target.value)
                            const newVal = e.target.value ? parseFloat(e.target.value) : null
                            setValueChanged(newVal !== enquiry.estimated_value)
                          }}
                          placeholder="0"
                          className="input-field w-full pl-7 text-sm"
                        />
                      </div>
                      {valueChanged && (
                        <button
                          onClick={handleSaveValue}
                          disabled={savingValue}
                          className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5 flex-shrink-0"
                        >
                          {savingValue ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                          Save
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Follow-up Date */}
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Follow-up Date</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={enquiry.follow_up_date ?? ''}
                        onChange={(e) => handleFollowUpChange(e.target.value)}
                        className="input-field text-sm flex-1"
                      />
                      {savingFollowUp && <Loader2 className="w-4 h-4 text-white/40 animate-spin" />}
                    </div>
                  </div>
                </div>
              </section>

              {/* On Hold Info (conditional) */}
              {enquiry.status === 'on_hold' && (
                <section>
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                    On Hold Information
                  </h3>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
                    {currentHoldTemplate && (
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Reason</span>
                        <p className="text-sm text-white/80 font-medium">
                          {currentHoldTemplate.display_label}
                        </p>
                      </div>
                    )}
                    {enquiry.hold_reason_note && (
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Additional Notes</span>
                        <p className="text-sm text-white/60">{enquiry.hold_reason_note}</p>
                      </div>
                    )}
                    {currentHoldTemplate && (
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Customer Message</span>
                        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-sm text-white/60 italic leading-relaxed">
                            &ldquo;{currentHoldTemplate.customer_message}&rdquo;
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ────── Activity Tab ────── */}
          {!showConvertFlow && activeTab === 'activity' && (
            <div className="p-4 lg:p-5">

              {/* Quick action buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    setShowAddNote(!showAddNote)
                    setShowLogCall(false)
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                    showAddNote
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                      : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <StickyNote className="w-3 h-3" />
                  Add Note
                </button>
                <button
                  onClick={() => {
                    setShowLogCall(!showLogCall)
                    setShowAddNote(false)
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                    showLogCall
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                      : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <Phone className="w-3 h-3" />
                  Log Call
                </button>
              </div>

              {/* Add Note form */}
              {showAddNote && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 mb-4 space-y-2">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={3}
                    placeholder="Enter your note..."
                    className="input-field w-full resize-none text-sm"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setShowAddNote(false); setNoteText('') }}
                      className="text-xs text-white/40 hover:text-white/60 px-3 py-1.5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNote}
                      disabled={!noteText.trim() || savingActivity}
                      className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
                    >
                      {savingActivity ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Log Call form */}
              {showLogCall && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 mb-4 space-y-2">
                  <input
                    type="text"
                    value={callSummary}
                    onChange={(e) => setCallSummary(e.target.value)}
                    placeholder="Call summary (required)"
                    className="input-field w-full text-sm"
                    autoFocus
                  />
                  <textarea
                    value={callDetails}
                    onChange={(e) => setCallDetails(e.target.value)}
                    rows={2}
                    placeholder="Additional details (optional)"
                    className="input-field w-full resize-none text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setShowLogCall(false); setCallSummary(''); setCallDetails('') }}
                      className="text-xs text-white/40 hover:text-white/60 px-3 py-1.5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogCall}
                      disabled={!callSummary.trim() || savingActivity}
                      className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
                    >
                      {savingActivity ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Save Call
                    </button>
                  </div>
                </div>
              )}

              {/* Loading */}
              {activitiesLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
                </div>
              )}

              {/* Empty */}
              {!activitiesLoading && activities.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-white/30">No activity recorded yet</p>
                </div>
              )}

              {/* Timeline */}
              {!activitiesLoading && activities.length > 0 && (
                <div className="space-y-0">
                  {activities.map((activity, idx) => {
                    const Icon = ACTIVITY_ICONS[activity.activity_type] ?? Info
                    return (
                      <div key={activity.id} className="flex gap-3 relative">
                        {/* Vertical connector line */}
                        {idx < activities.length - 1 && (
                          <div className="absolute left-[13px] top-8 bottom-0 w-px bg-white/10" />
                        )}

                        {/* Icon circle */}
                        <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
                          <Icon className="w-3.5 h-3.5 text-white/40" />
                        </div>

                        {/* Content */}
                        <div className="pb-4 min-w-0 flex-1">
                          <p className="text-sm text-white/80 leading-snug">
                            {activity.title}
                          </p>
                          {activity.description && (
                            <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
                              {activity.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-white/25">
                              {activity.user?.display_name ?? 'System'}
                            </span>
                            <span className="text-[11px] text-white/15">·</span>
                            <span className="text-[11px] text-white/25">
                              {relativeTime(activity.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* ────── Linked Tab ────── */}
          {!showConvertFlow && activeTab === 'linked' && (
            <div className="p-4 lg:p-5 space-y-4">

              {linkedLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
                </div>
              )}

              {!linkedLoading && (
                <>
                  {/* Customer Card */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <UserIcon className="w-4 h-4 text-white/30" />
                      <h4 className="text-sm font-semibold text-white/60">Customer</h4>
                    </div>
                    {enquiry.customer_id ? (
                      <div className="space-y-1.5">
                        <p className="text-sm text-white/80">{enquiry.client_name}</p>
                        {enquiry.client_email && (
                          <p className="text-xs text-white/40">{enquiry.client_email}</p>
                        )}
                        {enquiry.client_phone && (
                          <p className="text-xs text-white/40">{enquiry.client_phone}</p>
                        )}
                        <a
                          href={`/customers/${enquiry.customer_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
                        >
                          View Customer <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ) : (
                      <p className="text-xs text-white/25">No linked customer record</p>
                    )}
                  </div>

                  {/* Survey Card */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ClipboardCheck className="w-4 h-4 text-white/30" />
                      <h4 className="text-sm font-semibold text-white/60">Survey</h4>
                    </div>
                    {linkedSurveys.length > 0 ? (
                      linkedSurveys.map(survey => (
                        <div key={survey.id} className="space-y-2">
                          <p className="text-sm text-white/80 font-medium">{survey.project_number}</p>
                          {survey.survey_date && (
                            <p className="text-xs text-white/40">
                              {new Date(survey.survey_date + 'T12:00:00').toLocaleDateString('en-GB')}
                            </p>
                          )}
                          <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/50 capitalize">
                            {survey.status.replace('_', ' ')}
                          </span>
                          <a
                            href={`/projects/${survey.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-1"
                          >
                            View Survey <ExternalLink className="w-3 h-3" />
                          </a>

                          {/* Booking info or schedule button */}
                          {linkedBooking ? (
                            <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Booking</p>
                              <p className="text-sm text-white/80">
                                {new Date(linkedBooking.booking_date + 'T12:00:00').toLocaleDateString('en-GB', {
                                  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
                                })}
                              </p>
                              <p className="text-xs text-white/50">{linkedBooking.start_time} – {linkedBooking.end_time}</p>
                              {linkedBooking.surveyor_name && (
                                <p className="text-xs text-white/50">Surveyor: {linkedBooking.surveyor_name}</p>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => startConvertFlow(survey.id)}
                              className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 w-full justify-center mt-2"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              Schedule Booking
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-white/25">No survey linked</p>
                        <button
                          onClick={() => startConvertFlow()}
                          className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5 w-full justify-center"
                        >
                          <ClipboardCheck className="w-3.5 h-3.5" />
                          Convert &amp; Book Survey
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Quotation Card */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-white/30" />
                      <h4 className="text-sm font-semibold text-white/60">Quotation</h4>
                    </div>
                    {linkedQuotations.length > 0 ? (
                      linkedQuotations.map(q => {
                        const linkedSurvey = linkedSurveys.find(s => s.id === q.survey_id)
                        return (
                          <div key={q.id} className="space-y-1.5">
                            <p className="text-sm text-white/80 font-medium">{q.quotation_number}</p>
                            <p className="text-sm text-white/60">
                              £{q.total_incl_vat.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                            </p>
                            <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/50 capitalize">
                              {q.status}
                            </span>
                            {linkedSurvey && (
                              <a
                                href={`/projects/${linkedSurvey.id}/costing`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
                              >
                                View Quotation <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-xs text-white/25">No quotation yet</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
