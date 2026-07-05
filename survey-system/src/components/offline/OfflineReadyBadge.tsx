'use client'

// =============================================================================
// OfflineReadyBadge — per-survey download state on the /surveys list (plan §9).
// "Downloaded ✓" (mirrored, clean) / "Unsynced changes" (pending ops) / nothing.
// =============================================================================

import { useLiveQuery } from 'dexie-react-hooks'
import { CheckCircle2, CloudOff } from 'lucide-react'
import { getDB, isOfflineDbAvailable } from '@/lib/offline/db'

type BadgeState = 'none' | 'downloaded' | 'unsynced'

export function OfflineReadyBadge({ surveyId, className = '' }: { surveyId: string; className?: string }) {
  const state = useLiveQuery<BadgeState>(async () => {
    if (!isOfflineDbAvailable()) return 'none'
    const db = getDB()
    const mirror = await db.surveys.get(surveyId)
    if (!mirror) return 'none'
    const pending = await db.outbox
      .where('surveyId')
      .equals(surveyId)
      .and((o) => o.status === 'pending')
      .count()
    return pending > 0 ? 'unsynced' : 'downloaded'
  }, [surveyId])

  const lastPrefetchAt = useLiveQuery<number | null>(async () => {
    if (!isOfflineDbAvailable()) return null
    const row = await getDB().kv.get('lastPrefetchAt')
    return (row?.value as number) ?? null
  }, [])

  if (!state || state === 'none') return null

  if (state === 'unsynced') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 ${className}`}
        title="Changes saved on this device are waiting to sync"
      >
        <CloudOff className="w-3 h-3" />
        Unsynced changes
      </span>
    )
  }

  const time = lastPrefetchAt
    ? new Date(lastPrefetchAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : ''
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 ${className}`}
      title="Downloaded for offline use"
    >
      <CheckCircle2 className="w-3 h-3" />
      Downloaded{time ? ` ${time}` : ''}
    </span>
  )
}
