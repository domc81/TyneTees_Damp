// =============================================================================
// Report View Analytics — POST /api/report/[reportId]/view
//
// PUBLIC endpoint — no authentication required.
// Records a customer view of a report (mirrors quotation view tracking):
//   - Validates report exists and token matches (prevents guessing report IDs)
//   - Inserts a row into report_views (user_agent, referrer, timestamp)
//   - Increments survey_reports.view_count
//   - Sets first_viewed_at if this is the first view
//   - Fires in-app notification on first view
//
// Called as fire-and-forget from the public report page client component.
// Returns 200 with no sensitive data regardless of outcome.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import { notifyReportViewed } from '@/lib/notifications-server'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  const { reportId } = params

  try {
    const supabase = createServiceClient()

    // Parse request body to get the token for verification
    let token: string | null = null
    try {
      const body = await request.json()
      token = body.token || null
    } catch {
      // No body or invalid JSON — still return 200
      return NextResponse.json({ ok: false }, { status: 200 })
    }

    if (!token) {
      return NextResponse.json({ ok: false }, { status: 200 })
    }

    // Look up the report by ID and validate the token
    const { data: report, error } = await supabase
      .from('survey_reports')
      .select('id, survey_id, publish_token, first_viewed_at, view_count')
      .eq('id', reportId)
      .single()

    if (error || !report) {
      return NextResponse.json({ ok: false }, { status: 200 })
    }

    // Verify the token matches — prevents enumeration of report IDs
    if (!report.publish_token || report.publish_token !== token) {
      return NextResponse.json({ ok: false }, { status: 200 })
    }

    const now = new Date().toISOString()
    const userAgent = request.headers.get('user-agent') || null
    const referrer = request.headers.get('referer') || null

    // Insert analytics row (non-blocking — we await in parallel with the update)
    const viewInsert = supabase.from('report_views').insert({
      report_id: report.id,
      user_agent: userAgent,
      referrer: referrer,
    })

    // Build report update payload
    const update: Record<string, unknown> = {
      last_viewed_at: now,
      view_count: (report.view_count ?? 0) + 1,
    }

    // Only set first_viewed_at once
    const isFirstView = !report.first_viewed_at
    if (isFirstView) {
      update.first_viewed_at = now
    }

    // Notify admin/office on first customer view only (fire-and-forget)
    if (isFirstView) {
      isNotificationEnabled('report_viewed', 'in_app')
        .then(async (enabled) => {
          if (!enabled) return
          await notifyReportViewed({
            id: report.id,
            survey_id: report.survey_id,
          })
        })
        .catch(err => console.error('Report viewed notification failed:', err))
    }

    const reportUpdate = supabase
      .from('survey_reports')
      .update(update)
      .eq('id', report.id)

    // Run both writes in parallel
    await Promise.all([viewInsert, reportUpdate])

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[report-view] Error recording view:', err)
    // Always return 200 — analytics failures must not break the public page
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
