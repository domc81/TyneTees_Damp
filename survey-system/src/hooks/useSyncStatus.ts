'use client'

import { useSyncExternalStore } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { pendingCounts, oldestPendingAt } from '@/lib/offline/outbox'
import { isSyncing, subscribeSyncState, getLastSyncAt } from '@/lib/offline/sync-engine'
import { isOfflineDbAvailable } from '@/lib/offline/db'
import { useConnectivity } from './useConnectivity'
import type { ConnState } from '@/lib/offline/connectivity'

export interface SyncStatus {
  connectivity: ConnState
  pendingData: number
  pendingPhotos: number
  pendingAudio: number
  failed: number
  oldestPendingAt: number | null
  syncing: boolean
  lastSyncAt: number | null
}

/**
 * Live sync status for the UI. Pass a surveyId to scope pending counts to one
 * survey (wizard header); omit for global counts (surveys page / stale banner).
 */
export function useSyncStatus(surveyId?: string): SyncStatus {
  const connectivity = useConnectivity()
  const available = isOfflineDbAvailable()

  const syncing = useSyncExternalStore(
    subscribeSyncState,
    () => isSyncing(),
    () => false
  )

  const counts = useLiveQuery(
    () => (available ? pendingCounts(surveyId) : Promise.resolve(null)),
    [surveyId, available]
  )
  const oldest = useLiveQuery(
    () => (available ? oldestPendingAt() : Promise.resolve(null)),
    [available]
  )

  return {
    connectivity,
    pendingData: counts?.data ?? 0,
    pendingPhotos: counts?.photos ?? 0,
    pendingAudio: counts?.audio ?? 0,
    failed: counts?.failed ?? 0,
    oldestPendingAt: oldest ?? null,
    syncing,
    lastSyncAt: getLastSyncAt(),
  }
}
