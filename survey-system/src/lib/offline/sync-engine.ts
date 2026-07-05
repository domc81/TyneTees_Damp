// =============================================================================
// Sync engine — drains the durable outbox to Supabase when online (plan §6).
//
// Reuses the EXISTING server-write functions (saveWizardData / saveAllRooms /
// updateSurveyTags / photo service / autoTransitionEnquiryStatus). Their
// read-modify-write merge semantics on surveys.survey_data are load-bearing —
// this engine never reimplements them. The UI writes locally (local-data);
// only this engine talks to the server, and only when online.
// =============================================================================

import { getDB, isOfflineDbAvailable, type OutboxOp, type OutboxType } from './db'
import {
  getPendingSurveyIds,
  getPendingOpsForSurvey,
  deleteOp,
  markOpRetryable,
  markOpFailed,
} from './outbox'
import { isOnline, probe, subscribe as subscribeConnectivity, timeoutSignal } from './connectivity'
import { getSupabase } from '@/lib/supabase-client'
import { saveWizardData, saveAllRooms, updateSurveyTags } from '@/lib/survey-wizard-data'
import { autoTransitionEnquiryStatus } from '@/lib/supabase-data'
import type { SurveyRoomRow, SurveyWizardData } from '@/types/survey-wizard.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'

// Deferred photo/audio executors are registered by their phase modules so the
// engine stays decoupled and this file doesn't grow phase-by-phase imports.
export type OpExecutor = (surveyId: string, op: OutboxOp) => Promise<void>
const executors = new Map<OutboxType, OpExecutor>()
export function registerOpExecutor(type: OutboxType, fn: OpExecutor) {
  executors.set(type, fn)
}

// ── id-mapping event bus (temp room- ids → DB uuids) ─────────────────────────
export type IdMapping = Record<string, string>
const idMapListeners = new Map<string, Set<(m: IdMapping) => void>>()

export function onRemoteIdsMapped(surveyId: string, cb: (m: IdMapping) => void): () => void {
  let set = idMapListeners.get(surveyId)
  if (!set) {
    set = new Set()
    idMapListeners.set(surveyId, set)
  }
  set.add(cb)
  return () => {
    set?.delete(cb)
  }
}

function emitIdsMapped(surveyId: string, mapping: IdMapping) {
  const set = idMapListeners.get(surveyId)
  if (!set) return
  set.forEach((cb) => {
    try {
      cb(mapping)
    } catch (err) {
      console.warn('[sync] id-map listener threw:', err)
    }
  })
}

// ── sync state (syncing spinner + last-synced) ───────────────────────────────
const syncStateListeners = new Set<() => void>()
let syncing = false
let lastSyncAt: number | null = null

function setSyncing(v: boolean) {
  if (v === syncing) return
  syncing = v
  syncStateListeners.forEach((cb) => cb())
}
export function isSyncing(): boolean {
  return syncing
}
export function getLastSyncAt(): number | null {
  return lastSyncAt
}
export function subscribeSyncState(cb: () => void): () => void {
  syncStateListeners.add(cb)
  return () => syncStateListeners.delete(cb)
}

// ── flush control ────────────────────────────────────────────────────────────
const BACKOFF = [0, 5_000, 15_000, 60_000, 300_000] // 5s → 15s → 60s → 5min cap
const MAX_RETRYABLE_ATTEMPTS = 10 // escalate to fatal to avoid infinite loops
const TIMEOUT_MS = 15_000

let isFlushing = false
let flushRequested = false
let backoffLevel = 0
let flushTimer: ReturnType<typeof setTimeout> | null = null
let periodicTimer: ReturnType<typeof setInterval> | null = null
let engineStarted = false

function scheduleFlush(delay: number) {
  if (typeof window === 'undefined') return
  if (flushTimer) return
  flushTimer = setTimeout(() => {
    flushTimer = null
    void flush()
  }, Math.max(0, delay))
}

/** Debounced flush request — no-ops when offline. Safe to spam. */
export function requestFlush() {
  scheduleFlush(300)
}

/** Explicit user-driven sync (Sync button / completion). Probes first. */
export async function syncNow(): Promise<void> {
  await flush(true)
}

function msg(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

function classifyError(err: unknown): 'retryable' | 'fatal' {
  const m = msg(err).toLowerCase()
  // Network / transport → retryable
  if (
    m.includes('failed to fetch') ||
    m.includes('networkerror') ||
    m.includes('load failed') ||
    m.includes('timeout') ||
    m.includes('timed out') ||
    m.includes('aborted') ||
    m.includes('network') ||
    m.includes('econn') ||
    m.includes('fetch')
  ) {
    return 'retryable'
  }
  // Auth token expiry → retryable (refresh happens next cycle)
  if (m.includes('jwt') || m.includes('token is expired') || m.includes('401')) return 'retryable'
  // Clear server-side rejections → fatal
  if (
    m.includes('row-level security') ||
    m.includes('violates') ||
    m.includes('permission denied') ||
    m.includes('policy') ||
    m.includes(' 400') ||
    m.includes(' 403') ||
    m.includes(' 422') ||
    m.includes('duplicate key') ||
    m.includes('invalid input')
  ) {
    return 'fatal'
  }
  // Offline right now → retryable
  if (!isOnline()) return 'retryable'
  // Default retryable; attempts-cap escalation bounds it.
  return 'retryable'
}

async function refreshTokenIfNeeded(): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return
  try {
    await supabase.auth.getSession()
  } catch (err) {
    console.warn('[sync] token refresh check failed:', err)
  }
}

// ── main flush ───────────────────────────────────────────────────────────────
async function flush(force = false): Promise<void> {
  if (typeof window === 'undefined' || !isOfflineDbAvailable()) return

  if (isFlushing) {
    flushRequested = true
    return
  }

  if (force) {
    await probe()
  }
  if (!isOnline()) return

  const run = async () => {
    isFlushing = true
    setSyncing(true)
    let anyRetryable = false
    let anySuccess = false
    let anySuperseded = false
    try {
      await refreshTokenIfNeeded()
      const surveyIds = await getPendingSurveyIds()
      for (const sid of surveyIds) {
        const res = await flushSurvey(sid)
        anyRetryable = anyRetryable || res.retryable
        anySuccess = anySuccess || res.anySuccess
        anySuperseded = anySuperseded || res.superseded
      }
      if (anySuccess) {
        const remaining = await getPendingSurveyIds()
        if (remaining.length === 0) lastSyncAt = Date.now()
      }
    } finally {
      isFlushing = false
      setSyncing(false)
    }

    if (anySuccess || force) backoffLevel = 0
    else if (anyRetryable) backoffLevel = Math.min(backoffLevel + 1, BACKOFF.length - 1)

    if (flushRequested || anySuperseded) {
      flushRequested = false
      scheduleFlush(500)
    } else if (anyRetryable && backoffLevel > 0) {
      scheduleFlush(BACKOFF[backoffLevel])
    }
  }

  // Single-flight across tabs via Web Locks (iOS 15.4+ / all Chromium).
  const locks = (navigator as Navigator & { locks?: LockManager }).locks
  if (locks?.request) {
    await locks.request('ttdp-sync', { ifAvailable: true }, async (lock) => {
      if (!lock) return // another tab is syncing
      await run()
    })
  } else {
    await run()
  }
}

interface FlushSurveyResult {
  anySuccess: boolean
  retryable: boolean
  superseded: boolean
}

async function flushSurvey(surveyId: string): Promise<FlushSurveyResult> {
  const ops = reorderOps(await getPendingOpsForSurvey(surveyId))
  let anySuccess = false
  let superseded = false

  for (const op of ops) {
    if (op.id == null) continue
    const versionAtStart = op.updatedAt
    try {
      await executeOp(surveyId, op)
      // Conditional delete: if the op was coalesced (superseded by a fresh
      // local save) DURING its own flush, leave it pending so we don't lose the
      // newer payload — re-flush will pick it up. (Photo/audio-path id rewrites
      // touch `payload` only, not `updatedAt`, so they don't false-trigger this.)
      const fresh = await getDB().outbox.get(op.id)
      if (fresh && fresh.updatedAt !== versionAtStart) {
        superseded = true
        anySuccess = true
        continue
      }
      await deleteOp(op.id)
      anySuccess = true
    } catch (err) {
      const kind = classifyError(err)
      if (kind === 'retryable') {
        if ((op.attempts ?? 0) + 1 >= MAX_RETRYABLE_ATTEMPTS) {
          await markOpFailed(op.id, `gave up after ${(op.attempts ?? 0) + 1} attempts: ${msg(err)}`)
          if (op.type === 'rooms' || op.type === 'wizard_data') {
            return { anySuccess, retryable: false, superseded }
          }
          continue // independent op — keep going
        }
        await markOpRetryable(op.id, msg(err))
        // Order within a survey must hold — abort the rest of this survey's flush.
        return { anySuccess, retryable: true, superseded }
      }
      // fatal
      await markOpFailed(op.id, msg(err))
      if (op.type === 'rooms' || op.type === 'wizard_data') {
        // later ops likely depend on these — abort this survey's flush
        return { anySuccess, retryable: false, superseded }
      }
      // independent op (photo_*, tags, notify, enquiry_transition) — continue
    }
  }

  return { anySuccess, retryable: false, superseded }
}

const OP_ORDER: OutboxType[] = [
  'rooms',
  'wizard_data',
  'photo_upload',
  'photo_delete',
  'photo_meta',
  'tags',
  'audio_transcribe',
  'enquiry_transition',
  'notify_complete',
]

function reorderOps(ops: OutboxOp[]): OutboxOp[] {
  return [...ops].sort((a, b) => {
    const oa = OP_ORDER.indexOf(a.type)
    const ob = OP_ORDER.indexOf(b.type)
    if (oa !== ob) return oa - ob
    return (a.id ?? 0) - (b.id ?? 0) // stable within a type by creation order
  })
}

// ── per-op execution ─────────────────────────────────────────────────────────
async function executeOp(surveyId: string, op: OutboxOp): Promise<void> {
  switch (op.type) {
    case 'rooms':
      return execRooms(surveyId, op)
    case 'wizard_data':
      return execWizardData(surveyId, op)
    case 'tags':
      return execTags(surveyId, op)
    case 'enquiry_transition':
      return execEnquiryTransition(op)
    case 'notify_complete':
      return execNotifyComplete(op)
    default: {
      // photo_upload / photo_delete / photo_meta / audio_transcribe are
      // registered by their phase modules.
      const fn = executors.get(op.type)
      if (!fn) throw new Error(`No executor registered for op type ${op.type}`)
      return fn(surveyId, op)
    }
  }
}

async function execRooms(surveyId: string, op: OutboxOp): Promise<void> {
  const { rooms } = op.payload as { rooms: SurveyRoomRow[] }
  const saved = await saveAllRooms(surveyId, rooms)

  // Build temp(room-) → DB id map by matching name + display_order, exactly as
  // wizard/page.tsx did online.
  const mapping: IdMapping = {}
  for (const room of rooms) {
    if (!room.id.startsWith('room-')) continue
    const match = saved.find((r) => r.name === room.name && r.display_order === room.display_order)
    if (match && match.id !== room.id) mapping[room.id] = match.id
  }

  if (Object.keys(mapping).length > 0) {
    await applyIdMapping(surveyId, mapping)
    emitIdsMapped(surveyId, mapping)
  }
}

/** Rewrite temp room ids everywhere they persist locally after a rooms flush. */
async function applyIdMapping(surveyId: string, mapping: IdMapping): Promise<void> {
  const db = getDB()
  await db.transaction('rw', db.surveys, db.outbox, db.photos, async () => {
    const mirror = await db.surveys.get(surveyId)
    if (mirror) {
      mirror.rooms = mirror.rooms.map((r) =>
        mapping[r.id] ? { ...r, id: mapping[r.id], survey_id: surveyId } : r
      )
      await db.surveys.put(mirror)
    }

    const surveyOps = await db.outbox.where('surveyId').equals(surveyId).toArray()
    for (const o of surveyOps) {
      if (o.id == null) continue
      if (o.type === 'rooms') {
        const p = o.payload as { rooms: SurveyRoomRow[] }
        const rewritten = p.rooms.map((r) =>
          mapping[r.id] ? { ...r, id: mapping[r.id], survey_id: surveyId } : r
        )
        await db.outbox.update(o.id, { payload: { rooms: rewritten } })
      } else if (o.type === 'photo_upload') {
        const p = o.payload as { photo: SurveyPhoto; blobKey: string }
        if (p.photo?.room_id && mapping[p.photo.room_id]) {
          await db.outbox.update(o.id, {
            payload: { ...p, photo: { ...p.photo, room_id: mapping[p.photo.room_id] } },
          })
        }
      } else if (o.type === 'audio_transcribe') {
        const p = o.payload as { target?: { kind?: string; roomId?: string } }
        if (p.target?.kind === 'room' && p.target.roomId && mapping[p.target.roomId]) {
          await db.outbox.update(o.id, {
            payload: { ...p, target: { ...p.target, roomId: mapping[p.target.roomId] } },
          })
        }
      }
    }

    const photos = await db.photos.where('surveyId').equals(surveyId).toArray()
    for (const ph of photos) {
      if (ph.meta.room_id && mapping[ph.meta.room_id]) {
        await db.photos.update(ph.photoId, {
          meta: { ...ph.meta, room_id: mapping[ph.meta.room_id] },
        })
      }
    }
  })
}

async function execWizardData(surveyId: string, op: OutboxOp): Promise<void> {
  const { wizardData } = op.payload as { wizardData: SurveyWizardData }
  const stripped = { ...wizardData } as SurveyWizardData & { photos?: unknown }
  delete stripped.photos // defensive — never write photos through the wizard_data op
  await saveWizardData(surveyId, stripped)
}

async function execTags(surveyId: string, op: OutboxOp): Promise<void> {
  const { tags } = op.payload as { tags: string[] }
  await updateSurveyTags(surveyId, tags)
}

async function execEnquiryTransition(op: OutboxOp): Promise<void> {
  const { enquiryId, status } = op.payload as { enquiryId: string; status: 'survey_complete' }
  await autoTransitionEnquiryStatus(enquiryId, status, null)
}

async function execNotifyComplete(op: OutboxOp): Promise<void> {
  const { surveyId } = op.payload as { surveyId: string }
  const res = await fetch('/api/notifications/trigger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type: 'survey_completed', survey_id: surveyId }),
    signal: timeoutSignal(TIMEOUT_MS),
  })
  if (!res.ok) {
    if (res.status === 401 || res.status === 429 || res.status >= 500) {
      throw new Error(`notify_complete retryable HTTP ${res.status}`)
    }
    // Non-critical: don't hard-fail the queue for a 4xx notification error.
    console.warn('[sync] notify_complete non-retryable status', res.status)
  }
}

// ── engine lifecycle ─────────────────────────────────────────────────────────
export function startSyncEngine(): () => void {
  if (engineStarted || typeof window === 'undefined' || !isOfflineDbAvailable()) return () => {}
  engineStarted = true

  const onOnline = () => {
    backoffLevel = 0
    void flush(true)
  }
  const onVisible = () => {
    if (document.visibilityState === 'visible') void flush()
  }

  window.addEventListener('online', onOnline)
  document.addEventListener('visibilitychange', onVisible)

  const unsubConnectivity = subscribeConnectivity((s) => {
    if (s === 'online') {
      backoffLevel = 0
      void flush()
    }
  })

  // Periodic: every 60s while pending ops exist and online.
  periodicTimer = setInterval(async () => {
    if (!isOnline()) return
    const ids = await getPendingSurveyIds()
    if (ids.length > 0) void flush()
  }, 60_000)

  void flush() // initial attempt on boot

  return () => {
    window.removeEventListener('online', onOnline)
    document.removeEventListener('visibilitychange', onVisible)
    unsubConnectivity()
    if (periodicTimer) clearInterval(periodicTimer)
    periodicTimer = null
    engineStarted = false
  }
}
