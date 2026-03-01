// =============================================================================
// Quotation View Analytics — POST /api/q/[token]/view
//
// PUBLIC endpoint — no authentication required.
// Records a customer view of a quotation:
//   - Inserts a row into quotation_views (user_agent, referrer, timestamp)
//   - Increments quotation.view_count
//   - Sets first_viewed_at if this is the first view
//   - Transitions status from 'sent' → 'viewed' on first customer open
//
// Called as fire-and-forget from the public quotation page client component.
// Returns 200 with no sensitive data regardless of outcome.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  try {
    const supabase = createServiceClient()

    // Look up the quotation by share_token — also grab tracking fields we need to update
    const { data: quotation, error } = await supabase
      .from('quotations')
      .select('id, status, first_viewed_at, view_count')
      .eq('share_token', token)
      .single()

    if (error || !quotation) {
      // Return 200 even on not-found to avoid leaking token validity to callers
      return NextResponse.json({ ok: false }, { status: 200 })
    }

    const now = new Date().toISOString()
    const userAgent = request.headers.get('user-agent') || null
    const referrer = request.headers.get('referer') || null

    // Insert analytics row (non-blocking — we await in parallel with the update below)
    const viewInsert = supabase.from('quotation_views').insert({
      quotation_id: quotation.id,
      user_agent: userAgent,
      referrer: referrer,
    })

    // Build quotation update payload
    const update: Record<string, unknown> = {
      last_viewed_at: now,
      view_count: (quotation.view_count ?? 0) + 1,
    }

    // Only set first_viewed_at once
    if (!quotation.first_viewed_at) {
      update.first_viewed_at = now
    }

    // Transition 'sent' → 'viewed' on first customer open
    if (quotation.status === 'sent') {
      update.status = 'viewed'
    }

    const quotationUpdate = supabase
      .from('quotations')
      .update(update)
      .eq('id', quotation.id)

    // Run both writes in parallel
    await Promise.all([viewInsert, quotationUpdate])

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[quotation-view] Error recording view:', err)
    // Always return 200 — analytics failures must not break the public page
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
