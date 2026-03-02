// =============================================================================
// Notification Trigger API — POST /api/notifications/trigger
//
// Lightweight server-side bridge for events that originate in client-side code
// (survey creation, wizard completion, report publishing, enquiry creation).
//
// The client calls this after the primary action succeeds. This route:
//   1. Verifies the caller is authenticated
//   2. Checks notification_preferences to see if the event is enabled
//   3. Fires the appropriate server-side notification helper (fire-and-forget)
//   4. Returns 200 immediately — notification failures never block the caller
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { isNotificationEnabled } from '@/lib/notification-preferences'
import {
  notifySurveyCreated,
  notifySurveyCompleted,
  notifySurveyAssigned,
  notifyReportPublished,
  notifyEnquiryCreated,
} from '@/lib/notifications-server'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Auth — verify the caller is a logged-in user
// ---------------------------------------------------------------------------

async function getAuthenticatedUser(): Promise<{
  userId: string
  displayName: string
  profileId: string
} | null> {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) return null

    // Get display_name from user_profiles
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id, display_name')
      .eq('user_id', user.id)
      .single()

    return {
      userId: user.id,
      displayName: profile?.display_name || user.email || 'System',
      profileId: profile?.id || user.id,
    }
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Service-role client for data lookups
// ---------------------------------------------------------------------------

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ---------------------------------------------------------------------------
// Supported event types and their required data shapes
// ---------------------------------------------------------------------------

type TriggerEventType =
  | 'survey_created'
  | 'survey_completed'
  | 'survey_assigned'
  | 'report_published'
  | 'enquiry_created'

interface TriggerPayload {
  event_type: TriggerEventType
  // Entity IDs — the route looks up whatever it needs from the DB
  survey_id?: string
  report_id?: string
  enquiry_id?: string
  surveyor_profile_id?: string
  // Fallback data for events where the entity may not be in the DB yet
  enquiry_name?: string
  enquiry_email?: string
}

// ---------------------------------------------------------------------------
// POST /api/notifications/trigger
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // 1. Auth check
  const authUser = await getAuthenticatedUser()
  if (!authUser) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  // 2. Parse body
  let body: TriggerPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { event_type } = body

  if (!event_type) {
    return NextResponse.json({ error: 'Missing event_type' }, { status: 400 })
  }

  // 3. Check if this event type has in-app notifications enabled
  const enabled = await isNotificationEnabled(event_type, 'in_app')
  if (!enabled) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  // 4. Dispatch — fire-and-forget (errors logged, never returned to caller)
  try {
    switch (event_type) {
      case 'survey_created': {
        if (!body.survey_id) break
        const db = getServiceClient()
        const { data: survey } = await db
          .from('surveys')
          .select('id, project_number, client_name')
          .eq('id', body.survey_id)
          .single()

        if (survey) {
          await notifySurveyCreated(survey, authUser.displayName)
        }
        break
      }

      case 'survey_completed': {
        if (!body.survey_id) break
        const db = getServiceClient()
        const { data: survey } = await db
          .from('surveys')
          .select('id, project_number, client_name')
          .eq('id', body.survey_id)
          .single()

        if (survey) {
          await notifySurveyCompleted(survey)
        }
        break
      }

      case 'survey_assigned': {
        if (!body.survey_id || !body.surveyor_profile_id) break
        const db = getServiceClient()
        const { data: survey } = await db
          .from('surveys')
          .select('id, project_number, client_name')
          .eq('id', body.survey_id)
          .single()

        if (survey) {
          await notifySurveyAssigned(survey, body.surveyor_profile_id)
        }
        break
      }

      case 'report_published': {
        if (!body.report_id || !body.survey_id) break
        const db = getServiceClient()
        const { data: survey } = await db
          .from('surveys')
          .select('id, project_number, client_name')
          .eq('id', body.survey_id)
          .single()

        if (survey) {
          await notifyReportPublished({ id: body.report_id }, survey)
        }
        break
      }

      case 'enquiry_created': {
        await notifyEnquiryCreated({
          id: body.enquiry_id || '',
          name: body.enquiry_name,
          email: body.enquiry_email,
        })
        break
      }
    }
  } catch (err) {
    // Log but never fail — notifications must not break the calling flow
    console.error(`[notifications/trigger] ${event_type} dispatch failed:`, err)
  }

  return NextResponse.json({ ok: true })
}
