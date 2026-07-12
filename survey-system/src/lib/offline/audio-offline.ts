// =============================================================================
// Offline voice notes with deferred transcription (plan §12).
//
// Recording + WAV conversion are already fully client-side. When offline (or a
// transcribe POST fails on the network), we store the WAV blob, enqueue an
// audio_transcribe op, and drop a visible placeholder into the field so the
// surveyor sees the note registered. On flush we POST the WAV to /api/transcribe
// and replace the placeholder with the transcript.
//
// Placement note (deviation from the plan's declarative target): the placeholder
// text is unique per note, so the flush REPLACES it wherever it appears in the
// survey mirror (handles both the visible field and its raw-transcript twin,
// e.g. notes + raw_notes / findings + surveyor_notes, without enumerating them).
// The `target` is retained only to (a) append the transcript if the placeholder
// was deleted meanwhile, and (b) pick which coalesced op to enqueue.
// =============================================================================

import { getDB, isOfflineDbAvailable, type OutboxOp } from './db'
import { enqueue } from './outbox'
import { registerOpExecutor, requestFlush } from './sync-engine'
import { timeoutSignal } from './connectivity'
import type { SurveyWizardData, SurveyRoomRow, CustomDefect } from '@/types/survey-wizard.types'

export type TranscriptionTarget =
  | { kind: 'room'; roomId: string; field: 'findings' }
  // field 'custom_defect_<id>' targets that custom defect's description
  | { kind: 'wizard_section'; section: 'external_inspection'; field: 'notes' | `custom_defect_${string}` }
  | { kind: 'wizard'; field: 'surveyor_additional_comments' }

interface AudioPayload {
  noteId: string
  blobKey: string
  placeholderText: string
  target: TranscriptionTarget
}

const TRANSCRIBE_TIMEOUT_MS = 30_000

// ── event bus so an open wizard can patch its in-memory state ─────────────────
export interface AudioTranscribedEvent {
  placeholderText: string
  transcript: string
  target: TranscriptionTarget
}
const listeners = new Map<string, Set<(e: AudioTranscribedEvent) => void>>()

export function onAudioTranscribed(surveyId: string, cb: (e: AudioTranscribedEvent) => void): () => void {
  let set = listeners.get(surveyId)
  if (!set) {
    set = new Set()
    listeners.set(surveyId, set)
  }
  set.add(cb)
  return () => {
    set?.delete(cb)
  }
}

function emitAudioTranscribed(surveyId: string, e: AudioTranscribedEvent) {
  const set = listeners.get(surveyId)
  if (!set) return
  set.forEach((cb) => {
    try {
      cb(e)
    } catch (err) {
      console.warn('[audio] transcribed listener threw:', err)
    }
  })
}

/** Build the visible placeholder for a queued voice note (exported so the
 *  wizard's replace logic can match it). */
export function buildPlaceholder(noteId: string, at: number): string {
  const hhmmss = new Date(at).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return `⏳ [Voice note ${hhmmss} — will transcribe when back in signal]`
}

/** Deep string replace (returns a new object only where something changed). */
export function deepReplaceString<T>(value: T, find: string, repl: string): T {
  if (typeof value === 'string') {
    return (value.includes(find) ? value.split(find).join(repl) : value) as unknown as T
  }
  if (Array.isArray(value)) {
    return value.map((v) => deepReplaceString(v, find, repl)) as unknown as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    let changed = false
    for (const k of Object.keys(value as Record<string, unknown>)) {
      const nv = deepReplaceString((value as Record<string, unknown>)[k], find, repl)
      out[k] = nv
      if (nv !== (value as Record<string, unknown>)[k]) changed = true
    }
    return (changed ? out : value) as T
  }
  return value
}

/** Queue a voice note for deferred transcription. Returns the placeholder to
 *  drop into the field immediately. */
export async function queueAudioNote(
  surveyId: string,
  wavBlob: Blob,
  target: TranscriptionTarget
): Promise<{ noteId: string; placeholderText: string }> {
  const db = getDB()
  const at = Date.now()
  const noteId = `vn_${at}_${Math.random().toString(36).slice(2, 8)}`
  const blobKey = `audio:${noteId}`
  const placeholderText = buildPlaceholder(noteId, at)

  await db.transaction('rw', db.blobs, db.outbox, async () => {
    await db.blobs.put({ key: blobKey, blob: wavBlob, mimeType: wavBlob.type || 'audio/wav', createdAt: at })
    await enqueue({
      surveyId,
      type: 'audio_transcribe',
      payload: { noteId, blobKey, placeholderText, target } as AudioPayload,
    })
  })

  requestFlush()
  return { noteId, placeholderText }
}

// ── flush executor ────────────────────────────────────────────────────────────
async function applyToMirror(
  surveyId: string,
  placeholderText: string,
  replacement: string,
  target: TranscriptionTarget
): Promise<void> {
  const db = getDB()
  await db.transaction('rw', db.surveys, db.outbox, async () => {
    const mirror = await db.surveys.get(surveyId)
    if (!mirror) return

    let wizardData = deepReplaceString(mirror.wizardData, placeholderText, replacement)
    let rooms = deepReplaceString(mirror.rooms, placeholderText, replacement)

    // If the placeholder is gone (user deleted it), append to the target field.
    const stillPresent =
      JSON.stringify(wizardData).includes(replacement) || JSON.stringify(rooms).includes(replacement)
    if (!stillPresent) {
      if (target.kind === 'room') {
        rooms = rooms.map((r) =>
          r.id === target.roomId
            ? { ...r, findings: appendText(r.findings, replacement) }
            : r
        )
      } else if (target.kind === 'wizard_section') {
        const section = (wizardData[target.section] as unknown as Record<string, unknown>) || {}
        if (target.field.startsWith('custom_defect_')) {
          // Append into that custom defect's description (stable-id match)
          const defectId = target.field.slice('custom_defect_'.length)
          const defects = (section.custom_defects as CustomDefect[] | undefined) ?? []
          wizardData = {
            ...wizardData,
            [target.section]: {
              ...section,
              custom_defects: defects.map((d) =>
                d.id === defectId
                  ? { ...d, description: appendText(d.description, replacement) }
                  : d
              ),
            },
          } as SurveyWizardData
        } else {
          wizardData = {
            ...wizardData,
            [target.section]: { ...section, notes: appendText(section.notes as string, replacement) },
          } as SurveyWizardData
        }
      } else {
        wizardData = {
          ...wizardData,
          surveyor_additional_comments: appendText(
            wizardData.surveyor_additional_comments,
            replacement
          ),
        }
      }
    }

    mirror.wizardData = wizardData
    mirror.rooms = rooms as SurveyRoomRow[]
    await db.surveys.put(mirror)

    // Enqueue the coalesced op(s) so the transcript reaches the server.
    if (target.kind === 'room') {
      await enqueue({ surveyId, type: 'rooms', payload: { rooms: mirror.rooms } })
    } else {
      await enqueue({ surveyId, type: 'wizard_data', payload: { wizardData: mirror.wizardData } })
    }
  })

  emitAudioTranscribed(surveyId, { placeholderText, transcript: replacement, target })
  requestFlush()
}

function appendText(existing: string | null | undefined, add: string): string {
  const cur = existing || ''
  return cur ? `${cur}\n${add}` : add
}

async function execAudioTranscribe(surveyId: string, op: OutboxOp): Promise<void> {
  const { blobKey, placeholderText, target } = op.payload as AudioPayload
  const db = getDB()
  const blobRow = await db.blobs.get(blobKey)
  if (!blobRow) return // already processed

  const fd = new FormData()
  const filename = blobRow.mimeType === 'audio/wav' ? 'recording.wav' : 'recording.webm'
  fd.append('audio', blobRow.blob, filename)

  const res = await fetch('/api/transcribe', {
    method: 'POST',
    body: fd,
    signal: timeoutSignal(TRANSCRIBE_TIMEOUT_MS),
  })

  if (!res.ok) {
    if (res.status === 401 || res.status === 429 || res.status >= 500) {
      throw new Error(`transcribe retryable HTTP ${res.status}`)
    }
    // Fatal transcription failure — mark the placeholder, keep the audio + a
    // failed op for manual retry.
    await applyToMirror(surveyId, placeholderText, '⚠️ [Voice note failed to transcribe — audio kept]', target)
    throw new Error(`transcribe failed HTTP ${res.status}`)
  }

  const result = await res.json().catch(() => ({ text: '' }))
  const transcript = ((result.text as string) || '').trim()
  const replacement = transcript || '[Voice note — no speech detected]'

  await applyToMirror(surveyId, placeholderText, replacement, target)
  await db.blobs.delete(blobKey)
}

let registered = false
export function registerAudioExecutor(): void {
  if (registered) return
  registered = true
  registerOpExecutor('audio_transcribe', execAudioTranscribe)
}
