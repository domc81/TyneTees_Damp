'use client'

// =============================================================================
// SyncStatusPill — at-a-glance sync state for the surveyor (plan §9).
// Priority order: failed > syncing > offline-pending > online-pending > clean.
// =============================================================================

import { CloudOff, CheckCircle2, Loader2, AlertTriangle, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { useSyncStatus } from '@/hooks/useSyncStatus'
import { retryFailed } from '@/lib/offline/outbox'
import { syncNow } from '@/lib/offline/sync-engine'

function formatTime(ms: number | null): string {
  if (!ms) return ''
  try {
    return new Date(ms).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

interface SyncStatusPillProps {
  surveyId?: string
  className?: string
}

export function SyncStatusPill({ surveyId, className = '' }: SyncStatusPillProps) {
  const status = useSyncStatus(surveyId)

  const pending = status.pendingData + status.pendingPhotos + status.pendingAudio
  const base =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors'

  // 1. Failed — needs attention
  if (status.failed > 0) {
    return (
      <button
        type="button"
        onClick={async () => {
          await retryFailed(surveyId)
          toast.info('Retrying sync…')
          await syncNow()
        }}
        className={`${base} bg-red-500/15 border-red-400/40 text-red-300 hover:bg-red-500/25 ${className}`}
        title="Some changes could not be sent. Tap to retry."
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        Sync problem — tap to retry
      </button>
    )
  }

  // 2. Syncing
  if (status.syncing) {
    return (
      <span className={`${base} bg-brand-500/15 border-brand-400/40 text-brand-200 ${className}`}>
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Syncing{pending > 0 ? `… (${pending} left)` : '…'}
      </span>
    )
  }

  // 3. Pending + offline
  if (pending > 0 && status.connectivity === 'offline') {
    return (
      <span
        className={`${base} bg-amber-500/15 border-amber-400/40 text-amber-300 ${className}`}
        title="Your work is saved on this phone and will sync automatically when signal returns."
      >
        <CloudOff className="w-3.5 h-3.5" />
        Saved on phone — {status.pendingData} changes
        {status.pendingPhotos > 0 ? `, ${status.pendingPhotos} photos` : ''} waiting for signal
      </span>
    )
  }

  // 4. Pending + online
  if (pending > 0) {
    return (
      <button
        type="button"
        onClick={() => {
          void syncNow()
        }}
        className={`${base} bg-amber-500/15 border-amber-400/40 text-amber-300 hover:bg-amber-500/25 ${className}`}
        title="Tap to sync now"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Syncing shortly…
      </button>
    )
  }

  // 5. Clean
  return (
    <span
      className={`${base} bg-emerald-500/15 border-emerald-400/40 text-emerald-300 ${className}`}
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      {status.lastSyncAt ? `All synced ${formatTime(status.lastSyncAt)}` : 'All synced'}
    </span>
  )
}
