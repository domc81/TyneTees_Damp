'use client'

// =============================================================================
// OfflineReadyBadge — per-survey download state on the /surveys list (plan §9).
// "Downloaded ✓" (mirrored, clean) / "Unsynced changes" (pending ops) /
// "Download" button (canDownload + online) / nothing.
// =============================================================================

import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { CheckCircle2, CloudOff, Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getDB, isOfflineDbAvailable } from '@/lib/offline/db'
import { downloadSurveyOffline } from '@/lib/offline/prefetch'
import { useConnectivity } from '@/hooks/useConnectivity'

type BadgeState = 'none' | 'downloaded' | 'unsynced'

interface BadgeInfo {
  state: BadgeState
  mirroredAt: number | null
}

export function OfflineReadyBadge({
  surveyId,
  canDownload = false,
  className = '',
}: {
  surveyId: string
  canDownload?: boolean
  className?: string
}) {
  const connectivity = useConnectivity()
  const [downloading, setDownloading] = useState(false)

  const info = useLiveQuery<BadgeInfo>(async () => {
    if (!isOfflineDbAvailable()) return { state: 'none', mirroredAt: null }
    const db = getDB()
    const mirror = await db.surveys.get(surveyId)
    if (!mirror) return { state: 'none', mirroredAt: null }
    const pending = await db.outbox
      .where('surveyId')
      .equals(surveyId)
      .and((o) => o.status === 'pending')
      .count()
    return {
      state: pending > 0 ? 'unsynced' : 'downloaded',
      mirroredAt: mirror.mirroredAt || null,
    }
  }, [surveyId])

  async function handleDownload(e: React.MouseEvent) {
    // The badge sits inside the card's <Link> — don't navigate.
    e.preventDefault()
    e.stopPropagation()
    if (downloading) return
    setDownloading(true)
    try {
      const ok = await downloadSurveyOffline(surveyId)
      if (ok) {
        toast.success('Survey downloaded for offline use')
      } else {
        toast.error('Could not download — check your connection and try again')
      }
    } finally {
      setDownloading(false)
    }
  }

  // Same pill language as SyncStatusPill — these need to be legible at a
  // glance in the field ("green pill = safe to lose signal").
  const pill =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border'

  if (downloading) {
    return (
      <span className={`${pill} bg-brand-500/15 border-brand-400/40 text-brand-200 ${className}`}>
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Downloading…
      </span>
    )
  }

  if (!info || info.state === 'none') {
    if (!canDownload || connectivity !== 'online' || !info) return null
    return (
      <button
        type="button"
        onClick={handleDownload}
        className={`${pill} bg-brand-500/20 border-brand-400/50 text-brand-200 hover:bg-brand-500/35 hover:border-brand-300/60 transition-colors ${className}`}
        title="Download this survey to work on it without signal"
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
    )
  }

  if (info.state === 'unsynced') {
    return (
      <span
        className={`${pill} bg-amber-500/15 border-amber-400/40 text-amber-300 ${className}`}
        title="Changes saved on this device are waiting to sync"
      >
        <CloudOff className="w-3.5 h-3.5" />
        Unsynced changes
      </span>
    )
  }

  const time = info.mirroredAt
    ? new Date(info.mirroredAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : ''
  return (
    <span
      className={`${pill} bg-emerald-500/15 border-emerald-400/40 text-emerald-300 ${className}`}
      title="Downloaded for offline use"
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      Downloaded{time ? ` ${time}` : ''}
    </span>
  )
}
