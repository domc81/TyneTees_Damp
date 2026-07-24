/**
 * Fire-and-forget usage-event emitter → DC81 central cost tracking
 * (app-dc81 docs/specs/usage-cost-tracking.md, POST /usage/events on vp-api).
 *
 * Never throws and is never awaited in a blocking path — a tracking failure
 * must not affect the paid call it records. Silently no-ops when the
 * DC81_USAGE_* env vars are absent (e.g. staging).
 */

export interface UsageEvent {
  category: 'llm' | 'ad_spend' | 'comms' | 'data_api' | 'email' | 'media' | 'subscription' | 'other'
  provider: string
  service?: string
  feature?: string
  quantity?: number
  unit?: string
  input_tokens?: number
  output_tokens?: number
  amount?: number
  currency?: string
  occurred_at?: string
  source?: string
  source_ref?: string
  metadata?: Record<string, unknown>
}

export function recordUsage(event: UsageEvent): void {
  const url = process.env.DC81_USAGE_INGEST_URL
  const key = process.env.DC81_USAGE_INGEST_KEY
  const project = process.env.DC81_USAGE_PROJECT
  if (!url || !key || !project) return

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-DC81-Usage-Key': key },
    body: JSON.stringify({ project, ...event }),
    signal: AbortSignal.timeout(5000),
  })
    .then((res) => {
      if (!res.ok) console.error(`[usage] drop: ingest returned ${res.status}`)
    })
    .catch((err) => {
      console.error(`[usage] drop: ${err instanceof Error ? err.message : String(err)}`)
    })
}
