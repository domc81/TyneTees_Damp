// =============================================================================
// Connectivity — reliable online/offline state for the offline layer.
//
// `navigator.onLine` lies on flaky signal (reports "online" with 1 bar and a
// 30s hang). We treat the browser online/offline events as *hints* and confirm
// real reachability with an active probe against the Supabase health endpoint.
// See plan §6 (Connectivity).
// =============================================================================

export type ConnState = 'online' | 'offline'

let state: ConnState = typeof navigator !== 'undefined' && navigator.onLine === false ? 'offline' : 'online'
let started = false
let probeInFlight: Promise<boolean> | null = null
let periodicTimer: ReturnType<typeof setInterval> | null = null
const listeners = new Set<(s: ConnState) => void>()

const PROBE_TIMEOUT_MS = 4000
const PERIODIC_MS = 30_000

/** AbortSignal.timeout with a fallback for older Safari (< iOS 16). */
export function timeoutSignal(ms: number): AbortSignal {
  const AnySignal = AbortSignal as unknown as { timeout?: (ms: number) => AbortSignal }
  if (typeof AnySignal.timeout === 'function') return AnySignal.timeout(ms)
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), ms)
  return ctrl.signal
}

function setState(next: ConnState) {
  if (next === state) return
  state = next
  listeners.forEach((cb) => {
    try {
      cb(state)
    } catch (err) {
      console.warn('[offline] connectivity listener threw:', err)
    }
  })
}

/**
 * Active reachability probe. Any resolved HTTP response (even 4xx) means the
 * server was reached → online. Only a network error / timeout means offline.
 */
export async function probe(): Promise<boolean> {
  if (probeInFlight) return probeInFlight

  probeInFlight = (async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url) {
      // Can't probe — trust the browser hint rather than force offline.
      const online = typeof navigator === 'undefined' || navigator.onLine !== false
      setState(online ? 'online' : 'offline')
      return online
    }
    try {
      await fetch(`${url}/auth/v1/health`, {
        method: 'GET',
        cache: 'no-store',
        signal: timeoutSignal(PROBE_TIMEOUT_MS),
        headers: key ? { apikey: key } : undefined,
      })
      setState('online')
      return true
    } catch {
      setState('offline')
      return false
    } finally {
      probeInFlight = null
    }
  })()

  return probeInFlight
}

export function getState(): ConnState {
  return state
}

export function isOnline(): boolean {
  return state === 'online'
}

export function subscribe(cb: (s: ConnState) => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/**
 * Start the connectivity monitor. Idempotent. Returns a stop function.
 * Wires browser online/offline hints + a visibility-aware periodic probe.
 */
export function startConnectivityMonitor(): () => void {
  if (started || typeof window === 'undefined') return () => {}
  started = true

  const onOnlineHint = () => {
    void probe()
  }
  const onOfflineHint = () => {
    // A browser offline hint is reliable in the "definitely off" direction.
    setState('offline')
  }
  const onVisible = () => {
    if (document.visibilityState === 'visible') void probe()
  }

  window.addEventListener('online', onOnlineHint)
  window.addEventListener('offline', onOfflineHint)
  document.addEventListener('visibilitychange', onVisible)

  // Initial probe + periodic refresh while the tab is visible.
  void probe()
  periodicTimer = setInterval(() => {
    if (typeof document === 'undefined' || document.visibilityState === 'visible') {
      void probe()
    }
  }, PERIODIC_MS)

  return () => {
    window.removeEventListener('online', onOnlineHint)
    window.removeEventListener('offline', onOfflineHint)
    document.removeEventListener('visibilitychange', onVisible)
    if (periodicTimer) clearInterval(periodicTimer)
    periodicTimer = null
    started = false
  }
}
