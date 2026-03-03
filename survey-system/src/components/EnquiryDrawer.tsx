'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import {
  getEnquiryActivities,
  updateEnquiry,
  updateEnquiryStatus,
  assignEnquiry,
  logEnquiryActivity,
  createSurveyFromEnquiry,
} from '@/lib/supabase-data'
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
  MapPin,
  User as UserIcon,
  Info,
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

const ALL_STATUSES: EnquiryStatus[] = [
  'new', 'assigned', 'surveyed', 'quoted', 'accepted', 'declined', 'on_hold', 'completed',
]

const ALL_PRIORITIES: EnquiryPriority[] = ['low', 'medium', 'high', 'urgent']

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

function formatAddress(enquiry: Enquiry): string {
  return [
    enquiry.site_address_1,
    enquiry.site_address_2,
    enquiry.site_city,
    enquiry.site_county,
    enquiry.site_postcode,
  ].filter(Boolean).join(', ')
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
}

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

  // Convert to Survey
  const [showConvertDialog, setShowConvertDialog] = useState(false)
  const [converting, setConverting] = useState(false)
  const [convertError, setConvertError] = useState<string | null>(null)
  const router = useRouter()

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
      .select('id, project_number, survey_date, status')
      .eq('enquiry_id', enquiry.id)

    setLinkedSurveys((surveys as LinkedSurvey[]) ?? [])

    if (surveys && surveys.length > 0) {
      const surveyIds = surveys.map((s: LinkedSurvey) => s.id)
      const { data: quotations } = await supabase
        .from('quotations')
        .select('id, quotation_number, total_incl_vat, status, survey_id')
        .in('survey_id', surveyIds)

      setLinkedQuotations((quotations as LinkedQuotation[]) ?? [])
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

  async function handleConvertToSurvey() {
    setConverting(true)
    setConvertError(null)
    try {
      const { survey } = await createSurveyFromEnquiry(enquiry.id, currentUserId)
      // Update the board: enquiry may have moved to 'assigned'
      if (enquiry.status === 'new') {
        onBoardSync({ ...enquiry, status: 'assigned' }, enquiry.status)
      }
      router.push(`/surveys/${survey.id}`)
    } catch (err) {
      console.error('Convert to survey failed:', err)
      setConvertError(err instanceof Error ? err.message : 'Failed to create survey')
      setConverting(false)
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

        {/* ─────────────────── Tab Bar (sticky) ─────────────────── */}
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

        {/* ─────────────────── Tab Content (scrollable) ─────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* ────── Details Tab ────── */}
          {activeTab === 'details' && (
            <div className="p-4 lg:p-5 space-y-5">

              {/* Customer Information */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Customer Information
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-sm text-white font-medium">{enquiry.client_name}</p>
                  {enquiry.client_email && (
                    <a
                      href={`mailto:${enquiry.client_email}`}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {enquiry.client_email}
                    </a>
                  )}
                  {enquiry.client_phone && (
                    <a
                      href={`tel:${enquiry.client_phone}`}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {enquiry.client_phone}
                    </a>
                  )}
                  {enquiry.customer_id && (
                    <a
                      href={`/customers/${enquiry.customer_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors mt-1"
                    >
                      View Customer <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </section>

              {/* Site Information */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Site Information
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/70">{formatAddress(enquiry)}</p>
                  </div>
                  <p className="text-lg font-bold text-white tracking-wide pl-6">
                    {enquiry.site_postcode}
                  </p>
                </div>
              </section>

              {/* Enquiry Details */}
              <section>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Enquiry Details
                </h3>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-white/40">Survey Type</span>
                    <span className="text-sm text-white/80">
                      {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type}
                    </span>
                  </div>
                  {enquiry.source && (
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Source</span>
                      <span className="text-sm text-white/80 capitalize">{enquiry.source}</span>
                    </div>
                  )}
                  {enquiry.reported_problem && (
                    <div>
                      <span className="text-xs text-white/40 block mb-1">Reported Problem</span>
                      <div className="relative">
                        <p
                          className={`text-sm text-white/70 leading-relaxed ${
                            !problemExpanded && enquiry.reported_problem.length > 200
                              ? 'max-h-[4.5em] overflow-hidden'
                              : ''
                          }`}
                        >
                          {enquiry.reported_problem}
                        </p>
                        {!problemExpanded && enquiry.reported_problem.length > 200 && (
                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[rgba(15,23,36,0.98)] to-transparent" />
                        )}
                      </div>
                      {enquiry.reported_problem.length > 200 && (
                        <button
                          onClick={() => setProblemExpanded(!problemExpanded)}
                          className="text-xs text-blue-400 hover:text-blue-300 mt-1"
                        >
                          {problemExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  )}
                  {enquiry.proposed_survey_date && (
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Proposed Survey Date</span>
                      <span className="text-sm text-white/80">
                        {new Date(enquiry.proposed_survey_date).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  )}
                </div>
              </section>

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
          {activeTab === 'activity' && (
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
          {activeTab === 'linked' && (
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
                        <div key={survey.id} className="space-y-1.5">
                          <p className="text-sm text-white/80 font-medium">{survey.project_number}</p>
                          {survey.survey_date && (
                            <p className="text-xs text-white/40">
                              {new Date(survey.survey_date).toLocaleDateString('en-GB')}
                            </p>
                          )}
                          <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/50 capitalize">
                            {survey.status.replace('_', ' ')}
                          </span>
                          <a
                            href={`/projects/${survey.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
                          >
                            View Survey <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-white/25">No survey linked</p>
                        <button
                          onClick={() => { setConvertError(null); setShowConvertDialog(true) }}
                          className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5 w-full justify-center"
                        >
                          <ClipboardCheck className="w-3.5 h-3.5" />
                          Convert to {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? ''} Survey
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

      {/* ─────────────────── Convert to Survey Confirmation Dialog ─────────────────── */}
      {showConvertDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="max-w-md w-full mx-4 rounded-2xl border border-white/15 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,36,0.99) 0%, rgba(8,14,24,1) 100%)' }}
          >
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Convert to Survey</h3>

              <div className="text-sm text-white/60 space-y-2">
                <p>This will:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Create a customer record (if needed)</li>
                  <li>Create a new survey from this enquiry</li>
                  <li>Link them together</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Customer</span>
                  <span className="text-sm text-white/80">{enquiry.client_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Site</span>
                  <span className="text-sm text-white/80 text-right max-w-[250px]">
                    {enquiry.site_address_1}{enquiry.site_postcode ? `, ${enquiry.site_postcode}` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Type</span>
                  <span className="text-sm text-white/80">
                    {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type} Survey
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/40">
                You will be redirected to the new survey to assign a surveyor and schedule it.
              </p>

              {convertError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                  <p className="text-sm text-red-300">{convertError}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowConvertDialog(false)}
                  disabled={converting}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConvertToSurvey}
                  disabled={converting}
                  className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                >
                  {converting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                  ) : (
                    <><ClipboardCheck className="w-4 h-4" /> Create Survey</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
