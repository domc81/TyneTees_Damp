// =============================================================================
// Outbox — durable, op-based queue for wizard writes (plan §5).
//
// Coalesced types (wizard_data / rooms / tags) keep at most one op per survey:
// a re-enqueue replaces the existing op's payload and keeps its id so queue
// position (and flush ordering) is preserved. Append types (photos, audio,
// completion) always insert a new op.
// =============================================================================

import Dexie from 'dexie'
import { getDB, type OutboxOp, type OutboxType } from './db'

const COALESCED: OutboxType[] = ['wizard_data', 'rooms', 'tags']

function isCoalesced(type: OutboxType): boolean {
  return COALESCED.includes(type)
}

/**
 * Enqueue an op. Safe to call inside an outer Dexie rw-transaction that already
 * scopes `outbox` (used by local-data to write mirror + op atomically).
 */
export async function enqueue(op: {
  surveyId: string
  type: OutboxType
  payload: unknown
}): Promise<void> {
  const db = getDB()
  const now = Date.now()

  const run = async () => {
    if (isCoalesced(op.type)) {
      // Match ANY existing op of this (surveyId, type) — including a `failed`
      // one: a fresh edit supersedes it, so reset it to pending with new data.
      const existing = await db.outbox
        .where('[surveyId+type]')
        .equals([op.surveyId, op.type])
        .first()
      if (existing?.id != null) {
        await db.outbox.update(existing.id, {
          payload: op.payload,
          updatedAt: now,
          status: 'pending',
          lastError: null,
        })
        return
      }
    }
    await db.outbox.add({
      surveyId: op.surveyId,
      type: op.type,
      payload: op.payload,
      createdAt: now,
      updatedAt: now,
      attempts: 0,
      lastError: null,
      status: 'pending',
    })
  }

  // Reuse the ambient transaction if we're already inside one (local-data
  // wraps mirror-write + enqueue in a single rw-transaction); otherwise open a
  // scoped rw-transaction.
  if (Dexie.currentTransaction) {
    await run()
  } else {
    await db.transaction('rw', db.outbox, run)
  }
}

export interface PendingCounts {
  data: number
  photos: number
  audio: number
  failed: number
}

/** Counts for the sync UI. `failed` counts fatal ops across all statuses. */
export async function pendingCounts(surveyId?: string): Promise<PendingCounts> {
  const db = getDB()
  const ops = surveyId
    ? await db.outbox.where('surveyId').equals(surveyId).toArray()
    : await db.outbox.toArray()

  const counts: PendingCounts = { data: 0, photos: 0, audio: 0, failed: 0 }
  for (const op of ops) {
    if (op.status === 'failed') {
      counts.failed++
      continue
    }
    switch (op.type) {
      case 'wizard_data':
      case 'rooms':
      case 'tags':
      case 'enquiry_transition':
      case 'notify_complete':
        counts.data++
        break
      case 'photo_upload':
      case 'photo_delete':
      case 'photo_meta':
        counts.photos++
        break
      case 'audio_transcribe':
        counts.audio++
        break
    }
  }
  return counts
}

/** Distinct survey ids that have pending ops, oldest-op-first. */
export async function getPendingSurveyIds(): Promise<string[]> {
  const db = getDB()
  const ops = await db.outbox.where('status').equals('pending').toArray()
  const minId = new Map<string, number>()
  for (const op of ops) {
    if (op.id == null) continue
    const cur = minId.get(op.surveyId)
    if (cur === undefined || op.id < cur) minId.set(op.surveyId, op.id)
  }
  return Array.from(minId.entries())
    .sort((a, b) => a[1] - b[1])
    .map((e) => e[0])
}

/** Pending ops for one survey, ordered by id (== creation order). */
export async function getPendingOpsForSurvey(surveyId: string): Promise<OutboxOp[]> {
  const db = getDB()
  const ops = await db.outbox
    .where('surveyId')
    .equals(surveyId)
    .and((o) => o.status === 'pending')
    .toArray()
  return ops.sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
}

export async function deleteOp(id: number): Promise<void> {
  await getDB().outbox.delete(id)
}

/** Retryable failure: bump attempts + record error, op stays pending. */
export async function markOpRetryable(id: number, error: string): Promise<void> {
  const db = getDB()
  const op = await db.outbox.get(id)
  await db.outbox.update(id, { attempts: (op?.attempts ?? 0) + 1, lastError: error })
}

/** Fatal failure: mark failed (never auto-retried) + record error. */
export async function markOpFailed(id: number, error: string): Promise<void> {
  const db = getDB()
  const op = await db.outbox.get(id)
  await db.outbox.update(id, {
    status: 'failed',
    attempts: (op?.attempts ?? 0) + 1,
    lastError: error,
  })
}

/** Reset failed ops back to pending (user tapped "retry"). */
export async function retryFailed(surveyId?: string): Promise<void> {
  const db = getDB()
  const ops = surveyId
    ? await db.outbox.where('surveyId').equals(surveyId).and((o) => o.status === 'failed').toArray()
    : await db.outbox.where('status').equals('failed').toArray()
  await Promise.all(
    ops.map((o) => (o.id != null ? db.outbox.update(o.id, { status: 'pending', lastError: null }) : undefined))
  )
}

/** Timestamp of the oldest pending op, for the stale-sync banner. */
export async function oldestPendingAt(): Promise<number | null> {
  const db = getDB()
  const ops = await db.outbox.where('status').equals('pending').toArray()
  if (!ops.length) return null
  return ops.reduce((min, o) => Math.min(min, o.createdAt), Infinity)
}

/**
 * Cancel a still-pending photo upload op + its blob (used when a photo that was
 * never uploaded is deleted locally — no server delete is needed). Returns true
 * if a pending upload op was found and removed.
 */
export async function cancelPendingPhotoUpload(surveyId: string, photoId: string): Promise<boolean> {
  const db = getDB()
  let cancelled = false
  await db.transaction('rw', db.outbox, db.blobs, async () => {
    const ops = await db.outbox.where('surveyId').equals(surveyId).toArray()
    for (const op of ops) {
      if (op.id == null) continue
      const payload = op.payload as { photo?: { id?: string }; blobKey?: string }
      if (op.type === 'photo_upload' && payload?.photo?.id === photoId) {
        await db.outbox.delete(op.id)
        if (payload.blobKey) await db.blobs.delete(payload.blobKey)
        cancelled = true
      }
      // Drop any queued meta edits for a photo that never reached the server.
      if (op.type === 'photo_meta' && (payload as { photoId?: string }).photoId === photoId) {
        await db.outbox.delete(op.id)
      }
    }
  })
  return cancelled
}
