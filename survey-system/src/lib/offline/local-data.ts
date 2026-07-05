// =============================================================================
// Offline-aware wizard data API (plan §7).
//
// The wizard reads and writes THROUGH this module instead of calling the
// Supabase data layer directly. Reads are local-first with an online refresh;
// writes go to IndexedDB synchronously (from the user's perspective) and enqueue
// durable ops that the sync engine flushes to the server when online.
// =============================================================================

import { getDB, isOfflineDbAvailable, type LocalSurvey, type LocalPhoto } from './db'
import { enqueue } from './outbox'
import { isOnline, timeoutSignal } from './connectivity'
import { requestFlush } from './sync-engine'
import { getSupabase } from '@/lib/supabase-client'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { loadSurveyPhotos } from '@/lib/survey-photo-service'
import { deriveSurveyTags } from '@/lib/survey-tags'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'

/** Thrown when a survey has no local mirror AND the device is offline. */
export class NotAvailableOfflineError extends Error {
  constructor(public surveyId: string) {
    super('This survey is not available offline')
    this.name = 'NotAvailableOfflineError'
  }
}

export interface WizardLoadResult {
  wizardData: SurveyWizardData
  rooms: SurveyRoomRow[]
  photos: SurveyPhoto[]
  projectNumber: string | null
  enquiryId: string | null
}

const LOAD_TIMEOUT_MS = 8_000

function stripPhotos(data: SurveyWizardData): SurveyWizardData {
  const clone = { ...data } as SurveyWizardData & { photos?: unknown }
  delete clone.photos
  return clone
}

function sortPhotos(photos: SurveyPhoto[]): SurveyPhoto[] {
  return [...photos].sort(
    (a, b) => new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime()
  )
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('load timed out')), ms)),
  ])
}

export async function hasPendingOps(surveyId: string): Promise<boolean> {
  if (!isOfflineDbAvailable()) return false
  const db = getDB()
  const n = await db.outbox
    .where('surveyId')
    .equals(surveyId)
    .and((o) => o.status === 'pending')
    .count()
  return n > 0
}

/** Photo registry rows for a survey → SurveyPhoto[] (pending + synced). */
async function readLocalPhotos(surveyId: string): Promise<SurveyPhoto[]> {
  const db = getDB()
  const rows = await db.photos.where('surveyId').equals(surveyId).toArray()
  return sortPhotos(rows.map((r) => r.meta))
}

/** Replace the survey's SYNCED photo registry rows; pending rows always win. */
async function writeSyncedPhotos(surveyId: string, photos: SurveyPhoto[]): Promise<void> {
  const db = getDB()
  const existing = await db.photos.where('surveyId').equals(surveyId).toArray()
  const pendingIds = new Set(existing.filter((p) => p.syncState === 'pending').map((p) => p.photoId))
  const syncedToDelete = existing
    .filter((p) => p.syncState === 'synced')
    .map((p) => p.photoId)
  await db.photos.bulkDelete(syncedToDelete)
  const rows: LocalPhoto[] = photos
    .filter((p) => !pendingIds.has(p.id))
    .map((p) => ({ photoId: p.id, surveyId, meta: p, syncState: 'synced', blobKey: null }))
  if (rows.length) await db.photos.bulkPut(rows)
}

async function fromMirror(mirror: LocalSurvey): Promise<WizardLoadResult> {
  return {
    wizardData: mirror.wizardData,
    rooms: mirror.rooms,
    photos: await readLocalPhotos(mirror.surveyId),
    projectNumber: mirror.projectNumber,
    enquiryId: mirror.enquiryId,
  }
}

/** Strict server fetch — throws (never returns blank defaults) so the caller
 *  can fall back to the mirror on any failure. */
async function fetchFromServer(surveyId: string): Promise<{
  wizardData: SurveyWizardData
  rooms: SurveyRoomRow[]
  photos: SurveyPhoto[]
  projectNumber: string | null
  enquiryId: string | null
  surveyCompleted: boolean
}> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // Canary query: confirms reachability + fetches the meta the mirror needs.
  const { data: row, error } = await supabase
    .from('surveys')
    .select('project_number, enquiry_id, survey_completed')
    .eq('id', surveyId)
    .abortSignal(timeoutSignal(LOAD_TIMEOUT_MS))
    .single()
  if (error) throw new Error(`survey meta fetch failed: ${error.message}`)

  const { wizardData, rooms } = await loadWizardData(surveyId)
  const photos = await loadSurveyPhotos(surveyId)

  return {
    wizardData,
    rooms,
    photos,
    projectNumber: (row as { project_number: string | null }).project_number ?? null,
    enquiryId: (row as { enquiry_id: string | null }).enquiry_id ?? null,
    surveyCompleted: !!(row as { survey_completed: boolean }).survey_completed,
  }
}

async function upsertMirrorFromServer(
  surveyId: string,
  fresh: Awaited<ReturnType<typeof fetchFromServer>>
): Promise<void> {
  const db = getDB()
  await db.transaction('rw', db.surveys, db.photos, async () => {
    const existing = await db.surveys.get(surveyId)
    // Never clobber local-ahead state (belt-and-braces; read path guards too).
    if (existing && existing.localUpdatedAt > existing.mirroredAt) return
    const mirror: LocalSurvey = {
      surveyId,
      projectNumber: fresh.projectNumber,
      enquiryId: fresh.enquiryId,
      wizardData: stripPhotos(fresh.wizardData),
      rooms: fresh.rooms,
      surveyCompleted: fresh.surveyCompleted,
      mirroredAt: Date.now(),
      localUpdatedAt: 0,
    }
    await db.surveys.put(mirror)
    await writeSyncedPhotos(surveyId, fresh.photos)
  })
}

/**
 * Load wizard state local-first:
 *  1. mirror + (pending ops OR local-ahead) → return mirror (server would resurrect stale data)
 *  2. else online → fetch fresh, refresh mirror, return fresh
 *  3. else mirror → return mirror
 *  4. no mirror + offline → throw NotAvailableOfflineError
 */
export async function loadWizardDataLocalFirst(surveyId: string): Promise<WizardLoadResult> {
  if (!isOfflineDbAvailable()) {
    // No IndexedDB (should not happen client-side) — behave like the old path.
    const fresh = await fetchFromServer(surveyId)
    return {
      wizardData: fresh.wizardData,
      rooms: fresh.rooms,
      photos: fresh.photos,
      projectNumber: fresh.projectNumber,
      enquiryId: fresh.enquiryId,
    }
  }

  const db = getDB()
  const mirror = await db.surveys.get(surveyId)
  const pending = await hasPendingOps(surveyId)

  if (mirror && (pending || mirror.localUpdatedAt > mirror.mirroredAt)) {
    return fromMirror(mirror)
  }

  if (isOnline()) {
    try {
      const fresh = await withTimeout(fetchFromServer(surveyId), LOAD_TIMEOUT_MS)
      await upsertMirrorFromServer(surveyId, fresh)
      return {
        wizardData: stripPhotos(fresh.wizardData),
        rooms: fresh.rooms,
        photos: sortPhotos(fresh.photos),
        projectNumber: fresh.projectNumber,
        enquiryId: fresh.enquiryId,
      }
    } catch (err) {
      if (mirror) return fromMirror(mirror)
      throw err // genuine online load failure, no mirror to fall back to
    }
  }

  if (mirror) return fromMirror(mirror)
  throw new NotAvailableOfflineError(surveyId)
}

/**
 * Local write: update mirror + coalesce-enqueue wizard_data / rooms / tags in a
 * single Dexie transaction, then poke the sync engine (no-op when offline).
 */
export async function saveWizardLocal(
  surveyId: string,
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[]
): Promise<void> {
  const db = getDB()
  const now = Date.now()
  const strippedWizard = stripPhotos(wizardData)
  const tags = deriveSurveyTags(wizardData, rooms)

  await db.transaction('rw', db.surveys, db.outbox, async () => {
    const existing = await db.surveys.get(surveyId)
    const mirror: LocalSurvey = {
      surveyId,
      projectNumber: existing?.projectNumber ?? null,
      enquiryId: existing?.enquiryId ?? null,
      wizardData: strippedWizard,
      rooms,
      surveyCompleted: !!wizardData.wizard_completed || existing?.surveyCompleted || false,
      mirroredAt: existing?.mirroredAt ?? 0,
      localUpdatedAt: now,
    }
    await db.surveys.put(mirror)
    await enqueue({ surveyId, type: 'wizard_data', payload: { wizardData: strippedWizard } })
    await enqueue({ surveyId, type: 'rooms', payload: { rooms } })
    await enqueue({ surveyId, type: 'tags', payload: { tags } })
  })

  requestFlush()
}

/**
 * Enqueue the survey-completion side effects (offline-capable). Deduped so
 * completing twice doesn't double-notify. Uses the mirror's captured enquiryId.
 */
export async function enqueueCompletionOps(surveyId: string, enquiryId: string | null): Promise<void> {
  const db = getDB()
  await db.transaction('rw', db.outbox, async () => {
    const existing = await db.outbox.where('surveyId').equals(surveyId).toArray()
    const hasNotify = existing.some((o) => o.type === 'notify_complete' && o.status === 'pending')
    const hasTransition = existing.some(
      (o) => o.type === 'enquiry_transition' && o.status === 'pending'
    )
    if (enquiryId && !hasTransition) {
      await enqueue({
        surveyId,
        type: 'enquiry_transition',
        payload: { enquiryId, status: 'survey_complete' },
      })
    }
    if (!hasNotify) {
      await enqueue({ surveyId, type: 'notify_complete', payload: { surveyId } })
    }
  })
  requestFlush()
}
