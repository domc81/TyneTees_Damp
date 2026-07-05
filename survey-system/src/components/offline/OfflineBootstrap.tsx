'use client'

// =============================================================================
// OfflineBootstrap — single client-side entry point for the offline layer.
//
// Mounted once in the root layout. Renders nothing. Phase 1 wires connectivity
// monitoring + best-effort persistent storage. Later phases extend this to
// start the sync engine, register the service worker, and kick prefetch.
// =============================================================================

import { useEffect } from 'react'
import { startConnectivityMonitor, subscribe as subscribeConnectivity } from '@/lib/offline/connectivity'
import { startSyncEngine } from '@/lib/offline/sync-engine'
import { registerPhotoExecutors } from '@/lib/offline/photos-offline'
import { registerAudioExecutor } from '@/lib/offline/audio-offline'
import { prefetchSurveyorSurveys } from '@/lib/offline/prefetch'
import { isOfflineDbAvailable } from '@/lib/offline/db'
import { useAuth } from '@/context/AuthContext'

export default function OfflineBootstrap() {
  const { profile } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined' || !isOfflineDbAvailable()) return

    // Best-effort persistent storage — reduces IndexedDB eviction risk on
    // iOS/Android under storage pressure. Ignore the result.
    navigator.storage?.persist?.().catch(() => {})

    // Register op executors BEFORE the engine may try to flush them.
    registerPhotoExecutors()
    registerAudioExecutor()

    // Register the PWA service worker (offline shell). skipWaiting +
    // clientsClaim mean each deploy activates on next load.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => console.warn('[offline] SW registration failed:', err))
    }

    const stopConnectivity = startConnectivityMonitor()
    const stopSync = startSyncEngine()

    return () => {
      stopSync()
      stopConnectivity()
    }
  }, [])

  // Booking-driven prefetch: mirror today+tomorrow's surveys whenever online.
  useEffect(() => {
    if (typeof window === 'undefined' || !isOfflineDbAvailable()) return
    const pid = profile?.id
    if (!pid) return

    const run = () => {
      void prefetchSurveyorSurveys(pid)
    }
    run() // on mount / when profile resolves

    const onOnline = () => run()
    window.addEventListener('online', onOnline)
    const unsub = subscribeConnectivity((s) => {
      if (s === 'online') run()
    })
    const timer = setInterval(run, 15 * 60 * 1000) // every 15 min while open

    return () => {
      window.removeEventListener('online', onOnline)
      unsub()
      clearInterval(timer)
    }
  }, [profile?.id])

  return null
}
