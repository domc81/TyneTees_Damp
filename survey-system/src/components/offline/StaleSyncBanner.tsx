'use client'

// =============================================================================
// StaleSyncBanner — persistent nudge when unsynced work is old (plan §9).
// Mounted in the shared Layout. Fires a one-time sonner toast on app open and
// shows a banner while the oldest pending op is > 12h old.
// =============================================================================

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { CloudOff } from 'lucide-react'
import { useSyncStatus } from '@/hooks/useSyncStatus'

const STALE_MS = 12 * 60 * 60 * 1000

export function StaleSyncBanner() {
  const { oldestPendingAt } = useSyncStatus()
  const toastedRef = useRef(false)

  const ageMs = oldestPendingAt ? Date.now() - oldestPendingAt : 0
  const stale = oldestPendingAt !== null && ageMs > STALE_MS

  useEffect(() => {
    if (stale && !toastedRef.current) {
      toastedRef.current = true
      toast.warning(
        'Unsynced survey data is over 12 hours old — connect to WiFi and open the app so it can send.'
      )
    }
    if (!stale) toastedRef.current = false
  }, [stale])

  if (!stale) return null

  const hours = Math.floor(ageMs / (60 * 60 * 1000))
  return (
    <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3">
      <CloudOff className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-300" />
      <p className="text-sm text-amber-300">
        Survey data from about {hours} hour{hours === 1 ? '' : 's'} ago hasn&apos;t reached the
        office yet. Connect to WiFi and keep the app open so it can sync.
      </p>
    </div>
  )
}
