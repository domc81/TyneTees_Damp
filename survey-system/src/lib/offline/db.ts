// =============================================================================
// Offline Dexie Database — local-first mirror for the survey wizard
//
// Scope: the surveyor field surface ONLY (wizard data, rooms, photos, audio
// queue). Costing/reports/quotations/Kanban/calendar/admin stay online-only and
// must never be routed through this layer.
//
// DB name: `ttdp-offline`, version 1. All timestamps are Date.now() (ms).
// See docs/plans/2026-07-05-offline-first-pwa-survey-wizard.md §4.
// =============================================================================

import Dexie, { type EntityTable } from 'dexie'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'

/** Mirror of one survey, locally authoritative while pending ops exist. */
export interface LocalSurvey {
  surveyId: string // pk — surveys.id
  projectNumber: string | null
  enquiryId: string | null // captured at mirror time; needed for offline completion
  wizardData: SurveyWizardData // NEVER contains the `photos` key (stripped on write)
  rooms: SurveyRoomRow[] // complete array; temp ids keep `room-` prefix until flushed
  surveyCompleted: boolean
  mirroredAt: number // last server fetch
  localUpdatedAt: number // last local edit; 0 if clean
}

export type OutboxType =
  | 'wizard_data' // coalesced: max one pending per survey
  | 'rooms' // coalesced: max one pending per survey
  | 'tags' // coalesced
  | 'photo_upload' // append; payload: { photo: SurveyPhoto, blobKey: string }
  | 'photo_delete' // append; payload: { photo: SurveyPhoto }
  | 'photo_meta' // append; payload: { photoId, changes }
  | 'audio_transcribe' // append; payload: { blobKey, target, ... }
  | 'enquiry_transition' // payload: { enquiryId, status: 'survey_complete' }
  | 'notify_complete' // payload: { surveyId } → POST /api/notifications/trigger

export interface OutboxOp {
  id?: number // pk autoincrement — creation order = flush order
  surveyId: string // index
  type: OutboxType
  payload: unknown
  createdAt: number
  updatedAt: number // bumped on coalesce
  attempts: number
  lastError: string | null
  status: 'pending' | 'failed' // 'failed' = fatal, needs user attention; never auto-retried
}

export interface LocalBlob {
  key: string // pk — `photo:${photoId}` / `audio:${noteId}`
  blob: Blob
  mimeType: string
  createdAt: number
}

/** Local photo registry — union of synced (server) and pending (local) photos. */
export interface LocalPhoto {
  photoId: string // pk — same id scheme as SurveyPhoto.id
  surveyId: string // index
  meta: SurveyPhoto
  syncState: 'pending' | 'synced'
  blobKey: string | null // set while pending; blob deleted after successful upload
}

export interface KV {
  key: string // pk
  value: unknown
}

export type OfflineDB = Dexie & {
  surveys: EntityTable<LocalSurvey, 'surveyId'>
  outbox: EntityTable<OutboxOp, 'id'>
  blobs: EntityTable<LocalBlob, 'key'>
  photos: EntityTable<LocalPhoto, 'photoId'>
  kv: EntityTable<KV, 'key'>
}

let dbInstance: OfflineDB | null = null

/**
 * Lazily construct/open the offline database. MUST only be called in the
 * browser (inside effects / handlers / async flows). IndexedDB is unavailable
 * during SSR/build; callers never invoke this at module top-level.
 */
export function getDB(): OfflineDB {
  if (dbInstance) return dbInstance

  const db = new Dexie('ttdp-offline') as OfflineDB
  db.version(1).stores({
    surveys: 'surveyId',
    outbox: '++id, surveyId, [surveyId+type], status',
    blobs: 'key',
    photos: 'photoId, surveyId',
    kv: 'key',
  })

  dbInstance = db
  return db
}

/** True when IndexedDB is usable (client-side, not a locked-down context). */
export function isOfflineDbAvailable(): boolean {
  return typeof indexedDB !== 'undefined'
}

/**
 * Wipe the entire offline database. Used on confirmed logout so a shared field
 * device carries no cross-user residue (see plan §14 logout edge case).
 */
export async function clearOfflineDB(): Promise<void> {
  try {
    const db = getDB()
    await db.transaction('rw', db.surveys, db.outbox, db.blobs, db.photos, db.kv, async () => {
      await Promise.all([
        db.surveys.clear(),
        db.outbox.clear(),
        db.blobs.clear(),
        db.photos.clear(),
        db.kv.clear(),
      ])
    })
  } catch (err) {
    console.warn('[offline] clearOfflineDB failed:', err)
  }
}
