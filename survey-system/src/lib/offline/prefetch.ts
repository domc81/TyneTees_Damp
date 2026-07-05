// =============================================================================
// Booking-driven prefetch (plan §11).
//
// Rural jobs lose signal before arrival, so we can't wait for the surveyor to
// open a survey. Whenever the app is online we mirror every survey booked for
// the signed-in surveyor (today + tomorrow) into IndexedDB, seed the wizard/
// surveys HTML into the SW page cache, and warm the photo image cache — so a
// cold offline launch can drive straight into a never-opened wizard.
// =============================================================================

import { format, addDays } from 'date-fns'
import { getBookingsForSurveyor } from '@/lib/calendar-data'
import { getPhotoUrl } from '@/lib/survey-photo-service'
import { prefetchMirror } from './local-data'
import { getDB, isOfflineDbAvailable } from './db'
import { isOnline } from './connectivity'
import type { SurveyPhoto } from '@/types/survey-photo.types'

const MAX_WARM_PHOTOS_PER_SURVEY = 50
let prefetching = false

function localDate(offsetDays = 0): string {
  return format(addDays(new Date(), offsetDays), 'yyyy-MM-dd')
}

/** Ask the service worker (once it exists) to cache these page URLs. No-op
 *  until the SW ships (Phase 5) / is controlling the page. */
function sendSeedUrls(urls: string[]): void {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return
  const controller = navigator.serviceWorker.controller
  if (!controller) return
  try {
    controller.postMessage({ type: 'SEED_URLS', urls })
  } catch (err) {
    console.warn('[prefetch] SEED_URLS post failed:', err)
  }
}

/** Warm the photo image cache so synced photos render offline (SW CacheFirst
 *  stores them once it ships; otherwise this just warms the HTTP cache). */
async function warmPhotoCache(photos: SurveyPhoto[]): Promise<void> {
  const capped = photos.slice(0, MAX_WARM_PHOTOS_PER_SURVEY)
  await Promise.allSettled(
    capped.map((p) => {
      const url = getPhotoUrl(p.storage_path)
      return url ? fetch(url).catch(() => undefined) : Promise.resolve()
    })
  )
}

/**
 * Mirror every scheduled/provisional survey booked for this surveyor across
 * today + tomorrow. Safe to call repeatedly; guarded to one run at a time.
 */
export async function prefetchSurveyorSurveys(profileId: string | null | undefined): Promise<void> {
  if (!profileId || !isOfflineDbAvailable() || !isOnline() || prefetching) return
  prefetching = true
  try {
    const bookings = await getBookingsForSurveyor(profileId, localDate(0), localDate(1))
    const surveyIds = Array.from(
      new Set(
        bookings
          .filter((b) => (b.status === 'scheduled' || b.status === 'provisional') && b.survey_id)
          .map((b) => b.survey_id as string)
      )
    )

    for (const sid of surveyIds) {
      try {
        const res = await prefetchMirror(sid)
        if (res?.photos?.length) await warmPhotoCache(res.photos)
      } catch (err) {
        console.warn('[prefetch] mirror failed for', sid, err)
      }
    }

    // Seed the surveys list + each wizard page so a cold offline launch can
    // navigate straight in (even to a wizard never opened in this browser).
    sendSeedUrls(['/surveys', ...surveyIds.map((sid) => `/survey/${sid}/wizard`)])

    await getDB().kv.put({ key: 'lastPrefetchAt', value: Date.now() })
  } catch (err) {
    console.warn('[prefetch] run failed:', err)
  } finally {
    prefetching = false
  }
}

export async function getLastPrefetchAt(): Promise<number | null> {
  if (!isOfflineDbAvailable()) return null
  try {
    const row = await getDB().kv.get('lastPrefetchAt')
    return (row?.value as number) ?? null
  } catch {
    return null
  }
}
