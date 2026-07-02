// =============================================================================
// Per-Survey Write Queue — Serializes Concurrent Writes to survey_data JSONB
//
// Both the photo service and wizard auto-save modify surveys.survey_data via
// read-modify-write. Without serialization, concurrent writes race and the
// loser's changes are silently overwritten.
//
// All code paths that write to survey_data MUST use this shared queue.
// =============================================================================

const writeQueues = new Map<string, Promise<unknown>>()

/**
 * Serialize an async write operation for a given survey.
 * Concurrent calls for the same surveyId are queued and run sequentially.
 * Calls for different surveyIds run independently.
 */
export function serializeWrite<T>(surveyId: string, fn: () => Promise<T>): Promise<T> {
  const prev = writeQueues.get(surveyId) ?? Promise.resolve()
  const next: Promise<T> = prev.then(fn, fn)
  writeQueues.set(surveyId, next)
  next.finally(() => {
    if (writeQueues.get(surveyId) === next) {
      writeQueues.delete(surveyId)
    }
  })
  return next
}
