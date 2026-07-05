// =============================================================================
// Service worker (Serwist) — the PWA offline shell (plan §8).
//
// - Precaches the build (hashed) so each Coolify deploy invalidates cleanly.
// - Navigations: NetworkFirst (3s timeout) → offline-revisitable pages, no stall
//   on flaky signal. NetworkFirst is per-URL so it never serves a DIFFERENT
//   route's cached HTML (App Router embeds route-specific RSC).
// - Survey photos: CacheFirst → synced photos render offline.
// - Never caches PostgREST/auth/API/non-GET or the public tokenized customer
//   pages (/q, /pay, /report) — those must always hit the network and fail fast;
//   the outbox is the offline mechanism, not HTTP caching.
// - SEED_URLS message → cache a fresh fetch of each URL so a cold offline launch
//   can navigate straight into a never-visited wizard (prefetch posts these).
// =============================================================================

import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { CacheFirst, ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist } from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const PAGES_CACHE = 'ttdp-pages'
const PHOTOS_CACHE = 'ttdp-photos'

const runtimeCaching = [
  // 1. Never cache: PostgREST / auth / API / non-GET, and the public tokenized
  //    customer pages (they're force-dynamic and must stay fresh).
  {
    matcher: ({ url, request }: { url: URL; request: Request }) =>
      request.method !== 'GET' ||
      url.pathname.startsWith('/api/') ||
      url.pathname.includes('/auth/v1/') ||
      url.pathname.includes('/rest/v1/') ||
      url.pathname.startsWith('/q/') ||
      url.pathname.startsWith('/pay/') ||
      url.pathname.startsWith('/report/'),
    handler: new NetworkOnly(),
  },
  // 2. Survey photos — CacheFirst (30 days) so synced photos render offline.
  {
    matcher: ({ url }: { url: URL }) =>
      url.pathname.includes('/storage/v1/object/public/survey-photos/'),
    handler: new CacheFirst({
      cacheName: PHOTOS_CACHE,
      plugins: [new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 30 * 24 * 60 * 60 })],
    }),
  },
  // 3. Page navigations — NetworkFirst (3s) into ttdp-pages.
  {
    matcher: ({ request }: { request: Request }) => request.mode === 'navigate',
    handler: new NetworkFirst({ cacheName: PAGES_CACHE, networkTimeoutSeconds: 3 }),
  },
  // 4. Everything else (static assets, RSC) — Next's defaults.
  ...defaultCache,
]

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
})

// Page seeding — prefetch posts { type: 'SEED_URLS', urls } so a cold offline
// launch can reach a wizard never visited in this browser.
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const data = event.data
  if (data && data.type === 'SEED_URLS' && Array.isArray(data.urls)) {
    event.waitUntil(seedUrls(data.urls as string[]))
  }
})

async function seedUrls(urls: string[]): Promise<void> {
  const cache = await caches.open(PAGES_CACHE)
  await Promise.allSettled(
    urls.map(async (u) => {
      try {
        const res = await fetch(u, { credentials: 'same-origin' })
        if (res.ok) await cache.put(u, res.clone())
      } catch {
        // best-effort — offline or transient
      }
    })
  )
}

serwist.addEventListeners()
