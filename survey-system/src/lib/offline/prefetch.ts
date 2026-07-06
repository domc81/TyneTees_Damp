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
import { getSurveys } from '@/lib/supabase-data'
import { getPhotoUrl } from '@/lib/survey-photo-service'
import { cacheSurveysList, prefetchMirror } from './local-data'
import { getDB, isOfflineDbAvailable } from './db'
import { isOnline } from './connectivity'
import type { SurveyPhoto } from '@/types/survey-photo.types'

const MAX_WARM_PHOTOS_PER_SURVEY = 50
let prefetching = false

function localDate(offsetDays = 0): string {
  return format(addDays(new Date(), offsetDays), 'yyyy-MM-dd')
}

/** The pages a survey needs offline: the hub (redirects to the wizard when its
 *  online-only data load fails) and the wizard itself. */
function surveyPageUrls(surveyId: string): string[] {
  return [`/surveys/${surveyId}`, `/survey/${surveyId}/wizard`]
}

/** Ask the service worker to cache these page URLs. Posts to the registration's
 *  ACTIVE worker via serviceWorker.ready — `controller` is null for the entire
 *  first session after install (the page loaded before the SW claimed it),
 *  which used to silently skip seeding on a freshly installed iOS app. */
async function sendSeedUrls(urls: string[]): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return
  try {
    const reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 10_000)),
    ])
    const worker = reg?.active ?? navigator.serviceWorker.controller
    worker?.postMessage({ type: 'SEED_URLS', urls })
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

    // Keep the /surveys list browsable offline — cache the last known list so
    // a cold offline launch shows projects even if /surveys was never opened
    // online in this browser (the page also write-through caches on load).
    try {
      await cacheSurveysList(await getSurveys())
    } catch (err) {
      console.warn('[prefetch] surveys list cache failed:', err)
    }

    // Seed the shell (start_url + login + surveys list) and each survey's
    // hub + wizard pages so a cold offline launch can navigate straight in
    // (even to a wizard never opened in this browser). The SW also seeds the
    // shell on activate; this keeps it fresh between deploys.
    await sendSeedUrls(['/', '/login', '/surveys', ...surveyIds.flatMap(surveyPageUrls)])

    await getDB().kv.put({ key: 'lastPrefetchAt', value: Date.now() })
  } catch (err) {
    console.warn('[prefetch] run failed:', err)
  } finally {
    prefetching = false
  }
}

/**
 * Manually download ONE survey for offline use (the Download button on the
 * /surveys list) — mirror it, warm its photo cache, seed its pages. Booking-
 * driven prefetch only covers today+tomorrow's bookings; this covers the rest.
 * Returns false when the download could not complete (offline / fetch failed).
 */
export async function downloadSurveyOffline(surveyId: string): Promise<boolean> {
  if (!isOfflineDbAvailable() || !isOnline()) return false
  try {
    // null = skipped because local state is ahead (pending ops) — the survey
    // is already fully available offline, so still seed pages and succeed.
    const res = await prefetchMirror(surveyId)
    if (res?.photos?.length) await warmPhotoCache(res.photos)
    await sendSeedUrls(surveyPageUrls(surveyId))
    return true
  } catch (err) {
    console.warn('[prefetch] manual download failed for', surveyId, err)
    return false
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
