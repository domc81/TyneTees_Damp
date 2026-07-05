'use client'

// =============================================================================
// OfflineBootstrap — single client-side entry point for the offline layer.
//
// Mounted once in the root layout. Renders nothing. Phase 1 wires connectivity
// monitoring + best-effort persistent storage. Later phases extend this to
// start the sync engine, register the service worker, and kick prefetch.
// =============================================================================

import { useEffect } from 'react'
import { startConnectivityMonitor } from '@/lib/offline/connectivity'
import { isOfflineDbAvailable } from '@/lib/offline/db'

export default function OfflineBootstrap() {
  useEffect(() => {
    if (typeof window === 'undefined' || !isOfflineDbAvailable()) return

    // Best-effort persistent storage — reduces IndexedDB eviction risk on
    // iOS/Android under storage pressure. Ignore the result.
    navigator.storage?.persist?.().catch(() => {})

    const stopConnectivity = startConnectivityMonitor()

    return () => {
      stopConnectivity()
    }
  }, [])

  return null
}
