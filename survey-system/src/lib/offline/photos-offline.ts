'use client'

// =============================================================================
// Offline photos (plan §11).
//
// Capture is now local-first ALWAYS (instant, even on full signal): compress +
// meta locally, store the blob + a pending registry row, enqueue a photo_upload
// op, return immediately. The sync engine uploads to a DETERMINISTIC storage
// path (`${surveyId}/${step}/${photo.id}.jpg`, upsert:true) so retries are
// idempotent, then appends metadata via the shared RMW helper.
// =============================================================================

import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { getDB, isOfflineDbAvailable, type OutboxOp, type LocalBlob } from './db'
import { enqueue, cancelPendingPhotoUpload } from './outbox'
import { registerOpExecutor, requestFlush } from './sync-engine'
import { isOnline } from './connectivity'
import { writeSyncedPhotos } from './local-data'
import {
  compressImage,
  getImageDimensions,
  getGeolocation,
  appendPhotoMetadata,
  deleteSurveyPhoto,
  updateSurveyPhotoMeta,
  getPhotoUrl,
  loadSurveyPhotos,
} from '@/lib/survey-photo-service'
import { getSupabase } from '@/lib/supabase-client'
import type { SurveyPhoto, PhotoCapture, PhotoVisibility } from '@/types/survey-photo.types'

/** Thrown when the device is out of storage while saving a photo blob. */
export class PhotoQuotaError extends Error {
  constructor() {
    super('Phone storage full — free space before taking more photos')
    this.name = 'PhotoQuotaError'
  }
}

function blobKeyFor(photoId: string): string {
  return `photo:${photoId}`
}

function sortByTakenAtDesc(photos: SurveyPhoto[]): SurveyPhoto[] {
  return [...photos].sort(
    (a, b) => new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime()
  )
}

function raceTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('upload timed out')), ms)),
  ])
}

function isQuotaError(err: unknown): boolean {
  const name = (err as { name?: string })?.name || ''
  const m = (err instanceof Error ? err.message : String(err)).toLowerCase()
  return name === 'QuotaExceededError' || m.includes('quota') || name === 'NS_ERROR_DOM_QUOTA_REACHED'
}

// ── capture ──────────────────────────────────────────────────────────────────
export async function capturePhotoLocal(surveyId: string, capture: PhotoCapture): Promise<SurveyPhoto> {
  // All local: compress, read dimensions, non-blocking geolocation.
  const compressed = await compressImage(capture.file)
  const dims = await getImageDimensions(compressed)
  const geo = await getGeolocation(surveyId)

  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 9)
  const photoId = `photo_${timestamp}_${randomId}`
  const now = new Date(timestamp).toISOString()

  const photo: SurveyPhoto = {
    id: photoId,
    survey_id: surveyId,
    room_id: capture.room_id,
    step: capture.step,
    category: capture.category,
    description: capture.description,
    // Deterministic future path — same on every retry (idempotent upload).
    storage_path: `${surveyId}/${capture.step}/${photoId}.jpg`,
    file_name: `${photoId}.jpg`,
    file_size: compressed.size,
    mime_type: 'image/jpeg',
    width: dims.width,
    height: dims.height,
    taken_at: now,
    latitude: geo?.latitude,
    longitude: geo?.longitude,
    visibility: capture.visibility || 'customer',
    created_at: now,
  }

  const blobKey = blobKeyFor(photoId)
  const db = getDB()
  try {
    await db.transaction('rw', db.blobs, db.photos, db.outbox, async () => {
      await db.blobs.put({ key: blobKey, blob: compressed, mimeType: 'image/jpeg', createdAt: timestamp })
      await db.photos.put({ photoId, surveyId, meta: photo, syncState: 'pending', blobKey })
      await enqueue({ surveyId, type: 'photo_upload', payload: { photo, blobKey } })
    })
  } catch (err) {
    if (isQuotaError(err)) throw new PhotoQuotaError()
    throw err
  }

  requestFlush()
  return photo
}

// ── listing / rendering ──────────────────────────────────────────────────────
export async function loadSurveyPhotosLocalFirst(surveyId: string): Promise<SurveyPhoto[]> {
  if (!isOfflineDbAvailable()) return sortByTakenAtDesc(await loadSurveyPhotos(surveyId))
  const db = getDB()
  if (isOnline()) {
    try {
      const server = await loadSurveyPhotos(surveyId)
      await writeSyncedPhotos(surveyId, server) // preserves pending rows
    } catch {
      // ignore — fall back to whatever is in the registry
    }
  }
  const rows = await db.photos.where('surveyId').equals(surveyId).toArray()
  return sortByTakenAtDesc(rows.map((r) => r.meta))
}

/** Resolve a renderable URL: blob URL while pending, public URL once synced. */
export function usePhotoUrl(photo: SurveyPhoto): string {
  const blobRow = useLiveQuery<LocalBlob | undefined>(
    async () => (isOfflineDbAvailable() ? await getDB().blobs.get(blobKeyFor(photo.id)) : undefined),
    [photo.id]
  )
  const [objUrl, setObjUrl] = useState<string | null>(null)

  useEffect(() => {
    if (blobRow?.blob) {
      const u = URL.createObjectURL(blobRow.blob)
      setObjUrl(u)
      return () => URL.revokeObjectURL(u)
    }
    setObjUrl(null)
    return undefined
  }, [blobRow])

  return objUrl || getPhotoUrl(photo.storage_path)
}

// ── delete / edit ────────────────────────────────────────────────────────────
export async function deletePhotoLocal(surveyId: string, photo: SurveyPhoto): Promise<void> {
  const db = getDB()
  const row = await db.photos.get(photo.id)
  if (row?.syncState === 'pending') {
    // Never uploaded — cancel the queued upload + blob locally, no server op.
    await cancelPendingPhotoUpload(surveyId, photo.id)
    await db.photos.delete(photo.id)
    return
  }
  await db.transaction('rw', db.photos, db.outbox, async () => {
    await db.photos.delete(photo.id)
    await enqueue({ surveyId, type: 'photo_delete', payload: { photo } })
  })
  requestFlush()
}

export async function updatePhotoMetaLocal(
  surveyId: string,
  photoId: string,
  changes: { description?: string; visibility?: PhotoVisibility }
): Promise<SurveyPhoto> {
  const db = getDB()
  const row = await db.photos.get(photoId)
  if (!row) throw new Error('Photo not found on device')

  const updatedMeta: SurveyPhoto = {
    ...row.meta,
    ...(changes.description !== undefined ? { description: changes.description } : {}),
    ...(changes.visibility !== undefined ? { visibility: changes.visibility } : {}),
  }

  if (row.syncState === 'pending') {
    // Rewrite the registry meta + the queued photo_upload payload so the eventual
    // upload records the edited meta (no separate server op needed).
    await db.transaction('rw', db.photos, db.outbox, async () => {
      await db.photos.update(photoId, { meta: updatedMeta })
      const ops = await db.outbox.where('surveyId').equals(surveyId).toArray()
      for (const o of ops) {
        if (o.id == null || o.type !== 'photo_upload') continue
        const p = o.payload as { photo: SurveyPhoto; blobKey: string }
        if (p.photo.id === photoId) {
          await db.outbox.update(o.id, { payload: { ...p, photo: updatedMeta } })
        }
      }
    })
    return updatedMeta
  }

  await db.transaction('rw', db.photos, db.outbox, async () => {
    await db.photos.update(photoId, { meta: updatedMeta })
    await enqueue({ surveyId, type: 'photo_meta', payload: { photoId, changes } })
  })
  requestFlush()
  return updatedMeta
}

// ── sync-engine executors ────────────────────────────────────────────────────
async function execPhotoUpload(surveyId: string, op: OutboxOp): Promise<void> {
  const { photo, blobKey } = op.payload as { photo: SurveyPhoto; blobKey: string }
  const db = getDB()
  const blobRow = await db.blobs.get(blobKey)

  if (!blobRow) {
    // Blob already cleaned (e.g. replay after a prior partial success). Ensure
    // metadata is present (idempotent) and mark synced.
    await appendPhotoMetadata(surveyId, photo)
    await db.photos.update(photo.id, { syncState: 'synced', blobKey: null })
    return
  }

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const uploadResult = await raceTimeout(
    supabase.storage.from('survey-photos').upload(photo.storage_path, blobRow.blob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: true, // deterministic path + upsert → idempotent retries
    }),
    60_000
  )
  const uploadError = (uploadResult as { error?: { message: string } }).error
  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

  await appendPhotoMetadata(surveyId, photo) // dedupe-by-id inside

  await db.transaction('rw', db.photos, db.blobs, async () => {
    await db.photos.update(photo.id, { syncState: 'synced', blobKey: null })
    await db.blobs.delete(blobKey)
  })
}

async function execPhotoDelete(surveyId: string, op: OutboxOp): Promise<void> {
  const { photo } = op.payload as { photo: SurveyPhoto }
  await deleteSurveyPhoto(surveyId, photo)
}

async function execPhotoMeta(surveyId: string, op: OutboxOp): Promise<void> {
  const { photoId, changes } = op.payload as {
    photoId: string
    changes: { description?: string; visibility?: PhotoVisibility }
  }
  await updateSurveyPhotoMeta(surveyId, photoId, changes)
}

let registered = false
/** Register photo op executors with the sync engine (idempotent). */
export function registerPhotoExecutors(): void {
  if (registered) return
  registered = true
  registerOpExecutor('photo_upload', execPhotoUpload)
  registerOpExecutor('photo_delete', execPhotoDelete)
  registerOpExecutor('photo_meta', execPhotoMeta)
}
