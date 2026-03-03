'use client'

import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react'
import Link from 'next/link'
import {
  Plus,
  AlertTriangle,
  RefreshCw,
  ClipboardList,
  User,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import EnquiryDrawer from '@/components/EnquiryDrawer'
import { useAuth } from '@/context/AuthContext'
import {
  getEnquiriesByStatus,
  updateEnquiryStatus,
  getOnHoldTemplates,
} from '@/lib/supabase-data'
import type {
  Enquiry,
  EnquiryStatus,
  SurveyType,
  OnHoldReason,
  OnHoldMessageTemplate,
} from '@/types/database.types'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'

// ---------------------------------------------------------------------------
// Column config
// ---------------------------------------------------------------------------

type ColumnDef = {
  status: EnquiryStatus
  label: string
  color: string // hex
}

const COLUMNS: ColumnDef[] = [
  { status: 'new',      label: 'New',      color: '#3B82F6' },
  { status: 'assigned', label: 'Assigned', color: '#8B5CF6' },
  { status: 'surveyed', label: 'Surveyed', color: '#14B8A6' },
  { status: 'quoted',   label: 'Quoted',   color: '#F59E0B' },
  { status: 'accepted', label: 'Accepted', color: '#22C55E' },
  { status: 'declined', label: 'Declined', color: '#EF4444' },
  { status: 'on_hold',  label: 'On Hold',  color: '#6B7280' },
]

const ACTIVE_STATUSES = new Set(['new', 'assigned', 'surveyed', 'quoted', 'accepted'])

// ---------------------------------------------------------------------------
// Survey type display
// ---------------------------------------------------------------------------

const SURVEY_TYPE_LABELS: Record<SurveyType, string> = {
  damp: 'Damp',
  timber: 'Timber',
  woodworm: 'Woodworm',
  condensation: 'Condensation',
  structural: 'Structural',
  comprehensive: 'Comprehensive',
}

const SURVEY_TYPE_COLORS: Record<SurveyType, string> = {
  damp: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  timber: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  woodworm: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
  condensation: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  structural: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  comprehensive: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeAge(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w`
  const months = Math.floor(days / 30)
  return `${months}mo`
}

function formatCurrency(value: number): string {
  return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function isFollowUpOverdue(date: string | null): boolean {
  if (!date) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(date) <= today
}

function truncateAddress(addr1: string, postcode: string): string {
  const full = postcode ? `${addr1}, ${postcode}` : addr1
  return full.length > 45 ? full.slice(0, 42) + '...' : full
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ---------------------------------------------------------------------------
// Loading Skeleton (Task B)
// ---------------------------------------------------------------------------

function BoardSkeleton() {
  return (
    <div className="flex-1 overflow-x-auto pb-2">
      <div className="flex gap-3 h-full min-w-max animate-pulse">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col min-w-[260px] max-w-[320px] flex-1">
            {/* Column header placeholder */}
            <div className="h-[58px] rounded-t-xl bg-white/[0.06] border border-white/10 border-b-0" />
            {/* Card area placeholder */}
            <div className="rounded-b-xl border border-white/10 border-t-0 bg-white/[0.02] p-2 space-y-2 min-h-[320px]">
              <div className="h-[86px] rounded-lg bg-white/[0.06]" />
              <div className="h-[86px] rounded-lg bg-white/[0.06]" />
              <div className="h-[70px] rounded-lg bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Droppable Column
// ---------------------------------------------------------------------------

function KanbanColumn({
  col,
  enquiries,
  isOver,
  children,
}: {
  col: ColumnDef
  enquiries: Enquiry[]
  isOver: boolean
  children: React.ReactNode
}) {
  const { setNodeRef } = useDroppable({ id: col.status })

  const totalValue = enquiries.reduce((sum, e) => sum + (e.estimated_value ?? 0), 0)

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col min-w-[260px] max-w-[320px] flex-1"
    >
      {/* Column header */}
      <div
        className="rounded-t-xl px-4 py-3 border border-white/10 border-b-0"
        style={{
          background: `linear-gradient(135deg, ${col.color}15 0%, ${col.color}08 100%)`,
          borderTop: `3px solid ${col.color}`,
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-white">{col.label}</h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${col.color}25`,
              color: col.color,
            }}
          >
            {enquiries.length}
          </span>
        </div>
        {totalValue > 0 && (
          <p className="text-xs text-white/40">{formatCurrency(totalValue)}</p>
        )}
      </div>

      {/* Card area */}
      <div
        className={`
          flex-1 rounded-b-xl border border-white/10 border-t-0
          overflow-y-auto p-2 space-y-2 min-h-[120px]
          transition-colors duration-200
          ${isOver ? 'border-dashed' : ''}
        `}
        style={{
          backgroundColor: isOver ? `${col.color}10` : 'rgba(255,255,255,0.02)',
          borderColor: isOver ? `${col.color}40` : undefined,
        }}
      >
        {enquiries.length === 0 && !isOver ? (
          <div className="flex items-center justify-center h-full min-h-[80px]">
            <div className="border border-dashed border-white/10 rounded-lg p-4 w-full text-center">
              <p className="text-xs text-white/25">No enquiries</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Draggable Card (desktop)
// ---------------------------------------------------------------------------

function EnquiryCard({
  enquiry,
  isDragging,
  isGhost,
  onCardClick,
}: {
  enquiry: Enquiry
  isDragging?: boolean
  isGhost?: boolean
  onCardClick?: (enquiry: Enquiry) => void
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: enquiry.id,
    data: { enquiry },
  })

  const style: React.CSSProperties = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : {}

  if (isGhost) {
    style.opacity = 0.3
    style.pointerEvents = 'none'
  }

  const handleClick = () => {
    if (!isDragging && !isGhost) {
      onCardClick?.(enquiry)
    }
  }

  const priorityBorder =
    enquiry.priority === 'urgent'
      ? 'border-l-red-500'
      : enquiry.priority === 'high'
        ? 'border-l-orange-500'
        : 'border-l-transparent'

  const followUpOverdue = isFollowUpOverdue(enquiry.follow_up_date)
  const typeClasses = SURVEY_TYPE_COLORS[enquiry.survey_type] ?? 'bg-white/10 text-white/60 border-white/20'

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      style={style}
      className={`
        relative rounded-lg p-3 cursor-grab active:cursor-grabbing
        border border-white/10 border-l-[3px] ${priorityBorder}
        transition-all duration-150
        hover:border-white/20 hover:bg-white/[0.06]
        ${isDragging ? 'scale-[1.03] shadow-2xl shadow-black/50 z-50' : ''}
        ${enquiry.priority === 'urgent' ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}
      `}
      role="button"
      tabIndex={0}
      aria-label={`Enquiry: ${enquiry.client_name}`}
    >
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        }}
      />

      {/* Client name */}
      <p className="text-sm font-semibold text-white relative z-10 mb-1">
        {enquiry.client_name}
      </p>

      {/* Address */}
      <p className="text-xs text-white/40 relative z-10 mb-2 leading-tight">
        {truncateAddress(enquiry.site_address_1, enquiry.site_postcode)}
      </p>

      {/* Survey type badge */}
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeClasses}`}>
          {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type}
        </span>
        {enquiry.estimated_value != null && enquiry.estimated_value > 0 && (
          <span className="text-[10px] text-white/30 font-medium">
            {formatCurrency(enquiry.estimated_value)}
          </span>
        )}
      </div>

      {/* Bottom row: assignee, age, follow-up warning */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5">
          {enquiry.assignee?.display_name ? (
            <div
              className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center"
              title={enquiry.assignee.display_name}
            >
              <span className="text-[9px] font-bold text-white/60">
                {getInitials(enquiry.assignee.display_name)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/20">
              <User className="w-3 h-3" />
              <span className="text-[10px]">Unassigned</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {followUpOverdue && (
            <span title="Follow-up overdue">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </span>
          )}
          <div className="flex items-center gap-0.5 text-white/25">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{relativeAge(enquiry.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Standalone card for DragOverlay (not attached to DOM position)
function EnquiryCardOverlay({ enquiry }: { enquiry: Enquiry }) {
  const priorityBorder =
    enquiry.priority === 'urgent'
      ? 'border-l-red-500'
      : enquiry.priority === 'high'
        ? 'border-l-orange-500'
        : 'border-l-transparent'

  const followUpOverdue = isFollowUpOverdue(enquiry.follow_up_date)
  const typeClasses = SURVEY_TYPE_COLORS[enquiry.survey_type] ?? 'bg-white/10 text-white/60 border-white/20'

  return (
    <div
      className={`
        relative rounded-lg p-3 cursor-grabbing w-[280px]
        border border-white/20 border-l-[3px] ${priorityBorder}
        scale-[1.04] shadow-2xl shadow-black/60 opacity-90
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p className="text-sm font-semibold text-white mb-1">{enquiry.client_name}</p>
      <p className="text-xs text-white/40 mb-2 leading-tight">
        {truncateAddress(enquiry.site_address_1, enquiry.site_postcode)}
      </p>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeClasses}`}>
          {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type}
        </span>
        {enquiry.estimated_value != null && enquiry.estimated_value > 0 && (
          <span className="text-[10px] text-white/30 font-medium">
            {formatCurrency(enquiry.estimated_value)}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {enquiry.assignee?.display_name ? (
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white/60">
                {getInitials(enquiry.assignee.display_name)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/20">
              <User className="w-3 h-3" />
              <span className="text-[10px]">Unassigned</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {followUpOverdue && (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          )}
          <div className="flex items-center gap-0.5 text-white/25">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{relativeAge(enquiry.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile Card (Task C) — no drag hooks, has "Move to..." dropdown
// ---------------------------------------------------------------------------

function MobileEnquiryCard({
  enquiry,
  onMove,
  onCardClick,
}: {
  enquiry: Enquiry
  onMove: (enquiry: Enquiry, toStatus: EnquiryStatus) => void
  onCardClick?: (enquiry: Enquiry) => void
}) {
  const priorityBorder =
    enquiry.priority === 'urgent'
      ? 'border-l-red-500'
      : enquiry.priority === 'high'
        ? 'border-l-orange-500'
        : 'border-l-transparent'

  const followUpOverdue = isFollowUpOverdue(enquiry.follow_up_date)
  const typeClasses = SURVEY_TYPE_COLORS[enquiry.survey_type] ?? 'bg-white/10 text-white/60 border-white/20'

  return (
    <div
      onClick={() => onCardClick?.(enquiry)}
      className={`
        relative rounded-lg p-3 cursor-pointer
        border border-white/10 border-l-[3px] ${priorityBorder}
        bg-white/[0.03]
        ${enquiry.priority === 'urgent' ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}
      `}
    >
      {/* Client name */}
      <p className="text-sm font-semibold text-white mb-1">{enquiry.client_name}</p>

      {/* Address */}
      <p className="text-xs text-white/40 mb-2 leading-tight">
        {truncateAddress(enquiry.site_address_1, enquiry.site_postcode)}
      </p>

      {/* Survey type badge + value */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeClasses}`}>
          {SURVEY_TYPE_LABELS[enquiry.survey_type] ?? enquiry.survey_type}
        </span>
        {enquiry.estimated_value != null && enquiry.estimated_value > 0 && (
          <span className="text-[10px] text-white/30 font-medium">
            {formatCurrency(enquiry.estimated_value)}
          </span>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {enquiry.assignee?.display_name ? (
            <div
              className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
              title={enquiry.assignee.display_name}
            >
              <span className="text-[9px] font-bold text-white/60">
                {getInitials(enquiry.assignee.display_name)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/20">
              <User className="w-3 h-3" />
              <span className="text-[10px]">Unassigned</span>
            </div>
          )}
          {followUpOverdue && (
            <span title="Follow-up overdue">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            </span>
          )}
          <div className="flex items-center gap-0.5 text-white/25">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{relativeAge(enquiry.created_at)}</span>
          </div>
        </div>

        {/* Status move dropdown */}
        <select
          defaultValue=""
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const val = e.target.value
            if (val) {
              onMove(enquiry, val as EnquiryStatus)
              e.currentTarget.value = ''
            }
          }}
          className="text-[11px] bg-white/5 border border-white/15 rounded-lg px-2 py-1.5 text-white/50 cursor-pointer hover:border-white/30 transition-colors flex-shrink-0"
        >
          <option value="" disabled>Move to…</option>
          {COLUMNS
            .filter((col) => col.status !== enquiry.status)
            .map((col) => (
              <option key={col.status} value={col.status}>
                {col.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile Status Section — collapsible accordion (Task C)
// ---------------------------------------------------------------------------

function MobileStatusSection({
  col,
  enquiries,
  isExpanded,
  onToggle,
  onMove,
  onCardClick,
}: {
  col: ColumnDef
  enquiries: Enquiry[]
  isExpanded: boolean
  onToggle: () => void
  onMove: (enquiry: Enquiry, toStatus: EnquiryStatus) => void
  onCardClick?: (enquiry: Enquiry) => void
}) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      {/* Section header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
        style={{
          background: `linear-gradient(135deg, ${col.color}12 0%, ${col.color}06 100%)`,
          borderTop: `2px solid ${col.color}`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: col.color }}
        />
        <span className="text-sm font-semibold text-white flex-1">{col.label}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: `${col.color}25`, color: col.color }}
        >
          {enquiries.length}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
        )}
      </button>

      {/* Cards */}
      {isExpanded && (
        <div className="p-2 space-y-2 bg-white/[0.01]">
          {enquiries.length === 0 ? (
            <p className="text-xs text-white/25 text-center py-4">No enquiries</p>
          ) : (
            enquiries.map((enq) => (
              <MobileEnquiryCard key={enq.id} enquiry={enq} onMove={onMove} onCardClick={onCardClick} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// On Hold Modal
// ---------------------------------------------------------------------------

function OnHoldModal({
  enquiry: _enquiry,
  templates,
  onConfirm,
  onCancel,
}: {
  enquiry: Enquiry
  templates: OnHoldMessageTemplate[]
  onConfirm: (reason: OnHoldReason, note: string) => void
  onCancel: () => void
}) {
  const [selectedReason, setSelectedReason] = useState<OnHoldReason | ''>('')
  const [note, setNote] = useState('')

  const selectedTemplate = templates.find((t) => t.reason_key === selectedReason)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/15 p-6 space-y-5"
        style={{
          background: 'linear-gradient(135deg, rgba(30,42,56,0.98) 0%, rgba(13,21,32,0.99) 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">Place Enquiry On Hold</h2>
          <p className="text-sm text-white/50 mt-1">
            The customer will be automatically notified with the reason you select.
          </p>
        </div>

        {/* Reason dropdown */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">
            Reason <span className="text-red-400">*</span>
          </label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value as OnHoldReason)}
            className="input-field w-full"
          >
            <option value="">Select a reason...</option>
            {templates.map((t) => (
              <option key={t.reason_key} value={t.reason_key}>
                {t.display_label}
              </option>
            ))}
          </select>
        </div>

        {/* Additional notes */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">
            Additional notes <span className="text-white/30">(optional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Any extra context..."
            className="input-field w-full resize-none"
          />
        </div>

        {/* Message preview */}
        {selectedTemplate && (
          <div>
            <p className="text-xs font-medium text-white/40 mb-1.5">Customer will receive:</p>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm text-white/70 italic leading-relaxed">
                &ldquo;{selectedTemplate.customer_message}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={onCancel} className="btn-secondary px-5 py-2.5 text-sm">
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedReason) onConfirm(selectedReason as OnHoldReason, note)
            }}
            disabled={!selectedReason}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Confirm &amp; Notify
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Declined Modal
// ---------------------------------------------------------------------------

function DeclinedModal({
  enquiry: _enquiry,
  onConfirm,
  onCancel,
}: {
  enquiry: Enquiry
  onConfirm: (lossReason: string) => void
  onCancel: () => void
}) {
  const [reason, setReason] = useState('')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/15 p-6 space-y-5"
        style={{
          background: 'linear-gradient(135deg, rgba(30,42,56,0.98) 0%, rgba(13,21,32,0.99) 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">Mark Enquiry as Declined</h2>
          <p className="text-sm text-white/50 mt-1">
            This will remove the enquiry from the active pipeline.
          </p>
        </div>

        {/* Reason textarea */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">
            Reason for decline <span className="text-white/30">(optional)</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="e.g. Customer found another provider, price too high..."
            className="input-field w-full resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={onCancel} className="btn-secondary px-5 py-2.5 text-sm">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="btn-primary px-5 py-2.5 text-sm"
            style={{
              background: 'linear-gradient(to right, #EF4444, #DC2626)',
              borderColor: 'rgba(239,68,68,0.3)',
              boxShadow: '0 4px 14px rgba(239,68,68,0.25)',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function EnquiriesPage() {
  const { user } = useAuth()

  // Board data: keyed by status string
  const [board, setBoard] = useState<Record<string, Enquiry[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // On-hold template cache
  const holdTemplatesRef = useRef<OnHoldMessageTemplate[] | null>(null)
  const [holdTemplates, setHoldTemplates] = useState<OnHoldMessageTemplate[]>([])

  // Drag state
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)

  // Modal state (shared by desktop drag and mobile move)
  const [pendingDrag, setPendingDrag] = useState<{
    enquiry: Enquiry
    fromStatus: EnquiryStatus
    toStatus: 'on_hold' | 'declined'
  } | null>(null)

  // Error toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filter state (Task A)
  const [searchQuery, setSearchQuery] = useState('')
  const [assignedToFilter, setAssignedToFilter] = useState<string>('all')
  const [surveyTypeFilter, setSurveyTypeFilter] = useState<string>('all')
  const [showArchivedColumns, setShowArchivedColumns] = useState(false)

  // Mobile accordion expand state (Task C)
  // Active pipeline sections start expanded; archived start collapsed
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['new', 'assigned', 'surveyed', 'quoted', 'accepted'])
  )

  // Drawer state
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null)

  // Sensors: 8px activation distance to separate click from drag
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  )

  // Load board data
  const loadBoard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getEnquiriesByStatus()
      setBoard(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load enquiries')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBoard()
  }, [loadBoard])

  // Preload on-hold templates
  useEffect(() => {
    if (holdTemplatesRef.current) return
    getOnHoldTemplates().then((templates) => {
      holdTemplatesRef.current = templates
      setHoldTemplates(templates)
    })
  }, [])

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 4000)
    return () => clearTimeout(timer)
  }, [toastMessage])

  // ---------------------------------------------------------------------------
  // Derived state for filtering (Task A)
  // ---------------------------------------------------------------------------

  // Unique assignees present in the loaded data
  const assignees = useMemo(() => {
    const map = new Map<string, string>() // id → display_name
    for (const enquiries of Object.values(board)) {
      for (const enq of enquiries) {
        if (enq.assignee && enq.assigned_to) {
          map.set(enq.assigned_to, enq.assignee.display_name)
        }
      }
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [board])

  // Distinct survey types present in the loaded data
  const presentSurveyTypes = useMemo(() => {
    const types = new Set<SurveyType>()
    for (const enquiries of Object.values(board)) {
      for (const enq of enquiries) {
        types.add(enq.survey_type)
      }
    }
    return Array.from(types).sort()
  }, [board])

  // Filtered view of the board — used for rendering (counts + cards)
  const filteredBoard = useMemo(() => {
    const result: Record<string, Enquiry[]> = {}
    for (const [status, enquiries] of Object.entries(board)) {
      result[status] = enquiries.filter((enq) => {
        // Search: client_name, site_address_1, site_postcode, enquiry_number
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          const matches =
            enq.client_name.toLowerCase().includes(q) ||
            enq.site_address_1.toLowerCase().includes(q) ||
            (enq.site_postcode ?? '').toLowerCase().includes(q) ||
            enq.enquiry_number.toLowerCase().includes(q)
          if (!matches) return false
        }
        // Assigned to
        if (assignedToFilter === 'unassigned') {
          if (enq.assigned_to !== null) return false
        } else if (assignedToFilter !== 'all') {
          if (enq.assigned_to !== assignedToFilter) return false
        }
        // Survey type
        if (surveyTypeFilter !== 'all') {
          if (enq.survey_type !== surveyTypeFilter) return false
        }
        return true
      })
    }
    return result
  }, [board, searchQuery, assignedToFilter, surveyTypeFilter])

  const isFilterActive =
    searchQuery !== '' || assignedToFilter !== 'all' || surveyTypeFilter !== 'all'

  // Columns to render based on archived toggle
  const visibleColumns = showArchivedColumns
    ? COLUMNS
    : COLUMNS.filter((col) => col.status !== 'declined' && col.status !== 'on_hold')

  const totalEnquiries = Object.values(board).reduce((sum, arr) => sum + arr.length, 0)

  // Drawer: resolve the selected enquiry from board state
  const drawerEnquiry = useMemo(() => {
    if (!selectedEnquiryId) return null
    for (const enquiries of Object.values(board)) {
      const found = enquiries.find(e => e.id === selectedEnquiryId)
      if (found) return found
    }
    return null
  }, [board, selectedEnquiryId])

  // ---------------------------------------------------------------------------
  // Drawer handlers
  // ---------------------------------------------------------------------------

  function handleCardClick(enquiry: Enquiry) {
    setSelectedEnquiryId(enquiry.id)
  }

  // Sync board state from drawer mutations
  const handleBoardSync = useCallback((
    updatedEnquiry: Enquiry,
    previousStatus?: EnquiryStatus
  ) => {
    setBoard(prev => {
      const next: Record<string, Enquiry[]> = {}
      for (const [status, enquiries] of Object.entries(prev)) {
        next[status] = [...enquiries]
      }
      if (previousStatus && previousStatus !== updatedEnquiry.status) {
        next[previousStatus] = (next[previousStatus] ?? []).filter(e => e.id !== updatedEnquiry.id)
        next[updatedEnquiry.status] = [...(next[updatedEnquiry.status] ?? []), updatedEnquiry]
      } else {
        for (const status of Object.keys(next)) {
          next[status] = next[status].map(e =>
            e.id === updatedEnquiry.id ? updatedEnquiry : e
          )
        }
      }
      return next
    })
  }, [])

  // Drawer requests on_hold or declined — triggers existing modals
  function handleDrawerStatusChange(enquiry: Enquiry, toStatus: 'on_hold' | 'declined') {
    setPendingDrag({ enquiry, fromStatus: enquiry.status, toStatus })
  }

  // ---------------------------------------------------------------------------
  // Drag handlers (unchanged from original)
  // ---------------------------------------------------------------------------

  function handleDragStart(event: DragStartEvent) {
    const enq = (event.active.data.current as { enquiry: Enquiry } | undefined)?.enquiry
    if (enq) setActiveEnquiry(enq)
  }

  function handleDragOver(event: DragEndEvent) {
    const overId = event.over?.id as string | undefined
    setOverColumnId(overId ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveEnquiry(null)
    setOverColumnId(null)

    const { active, over } = event
    if (!over) return

    const enquiry = (active.data.current as { enquiry: Enquiry } | undefined)?.enquiry
    if (!enquiry) return

    const targetStatus = over.id as EnquiryStatus
    const sourceStatus = enquiry.status

    if (sourceStatus === targetStatus) return

    if (targetStatus === 'on_hold' || targetStatus === 'declined') {
      setPendingDrag({ enquiry, fromStatus: sourceStatus, toStatus: targetStatus })
      return
    }

    moveCard(enquiry, sourceStatus, targetStatus)
  }

  // Move card in local state + fire DB update
  function moveCard(
    enquiry: Enquiry,
    from: EnquiryStatus,
    to: EnquiryStatus,
    options?: { holdReason?: OnHoldReason; holdReasonNote?: string; lossReason?: string }
  ) {
    const prevBoard = { ...board }
    for (const key of Object.keys(prevBoard)) {
      prevBoard[key] = [...prevBoard[key]]
    }

    setBoard((prev) => {
      const next = { ...prev }
      next[from] = (next[from] ?? []).filter((e) => e.id !== enquiry.id)
      const movedEnquiry = { ...enquiry, status: to }
      next[to] = [...(next[to] ?? []), movedEnquiry]
      return next
    })

    updateEnquiryStatus(enquiry.id, to, user?.id ?? null, options)
      .catch(() => {
        setBoard(prevBoard)
        setToastMessage(`Failed to move "${enquiry.client_name}" — reverted`)
      })
  }

  // ---------------------------------------------------------------------------
  // Modal handlers (unchanged)
  // ---------------------------------------------------------------------------

  function handleOnHoldConfirm(reason: OnHoldReason, note: string) {
    if (!pendingDrag) return
    const { enquiry, fromStatus } = pendingDrag
    moveCard(enquiry, fromStatus, 'on_hold', {
      holdReason: reason,
      holdReasonNote: note || undefined,
    })
    // Enrich the board state with hold fields (moveCard only sets status)
    setBoard(prev => {
      const next = { ...prev }
      next['on_hold'] = (next['on_hold'] ?? []).map(e =>
        e.id === enquiry.id
          ? { ...e, hold_reason: reason, hold_reason_note: note || null }
          : e
      )
      return next
    })
    setPendingDrag(null)
  }

  function handleDeclinedConfirm(lossReason: string) {
    if (!pendingDrag) return
    const { enquiry, fromStatus } = pendingDrag
    moveCard(enquiry, fromStatus, 'declined', {
      lossReason: lossReason || undefined,
    })
    // Enrich the board state with loss_reason (moveCard only sets status)
    if (lossReason) {
      setBoard(prev => {
        const next = { ...prev }
        next['declined'] = (next['declined'] ?? []).map(e =>
          e.id === enquiry.id ? { ...e, loss_reason: lossReason } : e
        )
        return next
      })
    }
    setPendingDrag(null)
  }

  function handleModalCancel() {
    setPendingDrag(null)
  }

  // ---------------------------------------------------------------------------
  // Mobile move handler (Task C) — mirrors drag logic without dnd-kit
  // ---------------------------------------------------------------------------

  function handleMobileMove(enquiry: Enquiry, toStatus: EnquiryStatus) {
    const fromStatus = enquiry.status
    if (toStatus === fromStatus) return
    if (toStatus === 'on_hold' || toStatus === 'declined') {
      setPendingDrag({ enquiry, fromStatus, toStatus })
      return
    }
    moveCard(enquiry, fromStatus, toStatus)
  }

  // Mobile accordion toggle
  function toggleMobileSection(status: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(status)) next.delete(status)
      else next.add(status)
      return next
    })
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex flex-col h-[calc(100vh-80px)]">

          {/* Page header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white">Enquiry Pipeline</h1>
              {!isLoading && !error && (
                <p className="text-sm text-white/40 mt-0.5">
                  {totalEnquiries} enquir{totalEnquiries === 1 ? 'y' : 'ies'}
                </p>
              )}
            </div>
            <Link href="/enquiries/new" className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              New Enquiry
            </Link>
          </div>

          {/* Loading skeleton (Task B) */}
          {isLoading && <BoardSkeleton />}

          {/* Error state */}
          {error && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <p className="text-white/70 font-medium mb-1">Failed to load enquiries</p>
                <p className="text-white/40 text-sm mb-4">{error}</p>
                <button onClick={loadBoard} className="btn-secondary flex items-center gap-2 mx-auto text-sm">
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty state: zero enquiries in database */}
          {!isLoading && !error && totalEnquiries === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/60 font-medium mb-1">No enquiries yet</p>
                <p className="text-white/30 text-sm mb-4">Create your first enquiry to get started</p>
                <Link href="/enquiries/new" className="btn-primary inline-flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  New Enquiry
                </Link>
              </div>
            </div>
          )}

          {/* Board + controls (only when there is data) */}
          {!isLoading && !error && totalEnquiries > 0 && (
            <>
              {/* ── Control Bar (Task A) ────────────────────────────────── */}
              <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-xl border border-white/10 bg-white/[0.03] flex-shrink-0">

                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, address or reference..."
                    className="input-field w-full pl-9 text-sm"
                  />
                </div>

                {/* Assigned To filter */}
                <select
                  value={assignedToFilter}
                  onChange={(e) => setAssignedToFilter(e.target.value)}
                  className="input-field text-sm min-w-[150px]"
                >
                  <option value="all">All assignees</option>
                  <option value="unassigned">Unassigned</option>
                  {assignees.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>

                {/* Survey Type filter */}
                <select
                  value={surveyTypeFilter}
                  onChange={(e) => setSurveyTypeFilter(e.target.value)}
                  className="input-field text-sm min-w-[130px]"
                >
                  <option value="all">All types</option>
                  {presentSurveyTypes.map((type) => (
                    <option key={type} value={type}>
                      {SURVEY_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>

                {/* Show declined & on hold toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showArchivedColumns}
                    onClick={() => setShowArchivedColumns((prev) => !prev)}
                    className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                      showArchivedColumns ? 'bg-blue-500' : 'bg-white/15'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                        showArchivedColumns ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-sm text-white/60 whitespace-nowrap">Show declined &amp; on hold</span>
                </label>

                {/* Clear filters — only visible when a filter is active */}
                {isFilterActive && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setAssignedToFilter('all')
                      setSurveyTypeFilter('all')
                    }}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* ── Desktop Kanban (lg+) ────────────────────────────────── */}
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
                  <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2">
                    <div className="flex gap-3 h-full min-w-max">
                      {visibleColumns.map((col, idx) => {
                        const isArchived = col.status === 'declined' || col.status === 'on_hold'
                        const prevCol = visibleColumns[idx - 1]
                        const showSeparator =
                          isArchived &&
                          prevCol !== undefined &&
                          !ACTIVE_STATUSES.has(prevCol.status) === false

                        const enquiries = filteredBoard[col.status] ?? []

                        return (
                          <Fragment key={col.status}>
                            {showSeparator && (
                              <div className="w-px self-stretch bg-white/10 mx-1 flex-shrink-0" />
                            )}
                            <KanbanColumn
                              col={col}
                              enquiries={enquiries}
                              isOver={overColumnId === col.status}
                            >
                              {enquiries.map((enq) => (
                                <EnquiryCard
                                  key={enq.id}
                                  enquiry={enq}
                                  isGhost={activeEnquiry?.id === enq.id}
                                  onCardClick={handleCardClick}
                                />
                              ))}
                            </KanbanColumn>
                          </Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Drag overlay */}
                <DragOverlay dropAnimation={null}>
                  {activeEnquiry ? (
                    <EnquiryCardOverlay enquiry={activeEnquiry} />
                  ) : null}
                </DragOverlay>
              </DndContext>

              {/* ── Mobile List View (below lg) (Task C) ───────────────── */}
              <div className="flex flex-col gap-2 overflow-y-auto pb-4 flex-1 lg:hidden">
                {visibleColumns.map((col) => (
                  <MobileStatusSection
                    key={col.status}
                    col={col}
                    enquiries={filteredBoard[col.status] ?? []}
                    isExpanded={expandedSections.has(col.status)}
                    onToggle={() => toggleMobileSection(col.status)}
                    onMove={handleMobileMove}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Enquiry Detail Drawer */}
        {selectedEnquiryId && drawerEnquiry && (
          <EnquiryDrawer
            enquiry={drawerEnquiry}
            onClose={() => setSelectedEnquiryId(null)}
            onBoardSync={handleBoardSync}
            onRequestStatusChange={handleDrawerStatusChange}
            holdTemplates={holdTemplates}
            currentUserId={user?.id ?? null}
          />
        )}

        {/* On Hold Modal */}
        {pendingDrag?.toStatus === 'on_hold' && (
          <OnHoldModal
            enquiry={pendingDrag.enquiry}
            templates={holdTemplates}
            onConfirm={handleOnHoldConfirm}
            onCancel={handleModalCancel}
          />
        )}

        {/* Declined Modal */}
        {pendingDrag?.toStatus === 'declined' && (
          <DeclinedModal
            enquiry={pendingDrag.enquiry}
            onConfirm={handleDeclinedConfirm}
            onCancel={handleModalCancel}
          />
        )}

        {/* Error toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
            <div className="rounded-xl border border-red-400/30 bg-red-500/15 backdrop-blur-lg px-5 py-3 shadow-lg">
              <p className="text-sm text-red-300">{toastMessage}</p>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  )
}
