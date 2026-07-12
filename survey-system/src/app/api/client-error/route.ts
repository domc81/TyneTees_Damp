// =============================================================================
// POST /api/client-error — browser error reporting from public pages
//
// Fired by the error boundaries on /q, /pay and /report so support can see
// what actually failed in the customer's browser (review pt 2). No auth —
// these pages are public — so the route is deliberately paranoid:
//   - tokens/UUIDs in the reported path are replaced by a sha256 prefix
//   - payload fields are length-capped
//   - a small in-memory rate limit stops abuse from a single source
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

// ─── Rate limiting — in-memory, per source IP (single-container deploy) ──────

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const buckets = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now })
    // Opportunistic cleanup so the map cannot grow unbounded
    if (buckets.size > 1000) {
      for (const [k, b] of buckets) {
        if (now - b.windowStart > WINDOW_MS) buckets.delete(k)
      }
    }
    return false
  }
  bucket.count += 1
  return bucket.count > MAX_PER_WINDOW
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Replace token/UUID path segments with a short hash so logs never carry a live credential. */
function sanitisePath(rawPath: string): string {
  return rawPath
    .split('/')
    .map(segment => {
      // UUIDs (share/publish tokens, payment tokens) and other long opaque ids
      if (/^[0-9a-f-]{20,}$/i.test(segment) || segment.length > 24) {
        const digest = createHash('sha256').update(segment).digest('hex').slice(0, 8)
        return `#${digest}`
      }
      return segment
    })
    .join('/')
    .slice(0, 200)
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  let body: { path?: string; message?: string; source?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const path = sanitisePath(typeof body.path === 'string' ? body.path : '')
  const message = typeof body.message === 'string' ? body.message.slice(0, 500) : null
  const source =
    typeof body.source === 'string' ? body.source.slice(0, 40) : 'error-boundary'
  const userAgent = (request.headers.get('user-agent') ?? '').slice(0, 300)

  // Always land in the container log too — survives even if the insert fails
  console.error(`[client-error] ${path} | ${userAgent} | ${message}`)

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (url && serviceKey) {
      const supabase = createServerClient(url, serviceKey, {
        cookies: { get: () => undefined, set: () => {}, remove: () => {} },
        global: {
          fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
        },
      })
      await supabase
        .from('client_errors')
        .insert({ path, message, source, user_agent: userAgent })
    }
  } catch {
    // Logging must never throw back at the customer's browser
  }

  return NextResponse.json({ ok: true })
}
