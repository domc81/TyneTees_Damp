// =============================================================================
// Notification Settings API — GET & POST /api/settings/notifications
//
// GET  — Returns email config state (never exposes sensitive values) + all
//        notification preferences.
// POST — Admin-only. Updates email mode, optional credential fields, and
//        notification preference toggles. Sensitive values (API keys) are
//        written via service role and never echoed back.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient as createSSRClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Service-role client — bypasses RLS
// ---------------------------------------------------------------------------

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
  })
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

import { createClient as createServerClient } from '@/lib/supabase-server'

/** Returns { userId, isAdmin } or null if unauthenticated. */
async function verifyAuth(): Promise<{ userId: string; isAdmin: boolean } | null> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    return {
      userId: user.id,
      isAdmin: profile?.role === 'admin',
    }
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PlatformSettingRow {
  key: string
  value: string | null
  is_sensitive: boolean
  description: string | null
}

interface NotificationPreferenceRow {
  id: string
  event_type: string
  in_app_enabled: boolean
  email_enabled: boolean
  email_recipient_type: string
  description: string | null
}

// ---------------------------------------------------------------------------
// GET /api/settings/notifications
// ---------------------------------------------------------------------------

export async function GET(_request: NextRequest) {
  const auth = await verifyAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }
  if (!auth.isAdmin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  try {
    const supabase = createServiceRoleClient()

    // Fetch all platform settings
    const { data: settingsRows, error: settingsError } = await supabase
      .from('platform_settings')
      .select('key, value, is_sensitive, description')

    if (settingsError) throw new Error(`Failed to load platform settings: ${settingsError.message}`)

    // Fetch notification preferences
    const { data: prefsRows, error: prefsError } = await supabase
      .from('notification_preferences')
      .select('id, event_type, in_app_enabled, email_enabled, email_recipient_type, description')
      .order('event_type')

    if (prefsError) throw new Error(`Failed to load notification preferences: ${prefsError.message}`)

    // Build settings map — never return sensitive values, only whether they are set
    const settingsMap: Record<string, string | null> = {}
    const sensitiveConfigured: Record<string, boolean> = {}

    for (const row of (settingsRows as PlatformSettingRow[]) ?? []) {
      if (row.is_sensitive) {
        // Return a boolean indicator, not the value
        sensitiveConfigured[row.key] = !!(row.value && row.value.trim() !== '')
      } else {
        settingsMap[row.key] = row.value
      }
    }

    // Check if the RESEND_API_KEY env var is configured (platform mode fallback)
    const platformEnvKeyConfigured = !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '')

    return NextResponse.json({
      emailConfig: {
        mode: settingsMap['email_mode'] ?? 'platform',
        platformFromEmail: settingsMap['platform_from_email'] ?? '',
        customFromEmail: settingsMap['custom_from_email'] ?? '',
        customFromName: settingsMap['custom_from_name'] ?? '',
        // Sensitive — boolean only
        platformResendKeyConfigured: platformEnvKeyConfigured || (sensitiveConfigured['platform_resend_api_key'] ?? false),
        customResendKeyConfigured: sensitiveConfigured['custom_resend_api_key'] ?? false,
      },
      notificationPreferences: (prefsRows as NotificationPreferenceRow[]) ?? [],
    })
  } catch (err) {
    console.error('GET /api/settings/notifications error:', err)
    return NextResponse.json({ error: 'Failed to load notification settings' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// POST /api/settings/notifications
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const auth = await verifyAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }
  if (!auth.isAdmin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  try {
    const supabase = createServiceRoleClient()

    // -----------------------------------------------------------------------
    // 1. Email mode settings
    // -----------------------------------------------------------------------

    const settingUpdates: Array<{ key: string; value: string }> = []

    if (typeof body.email_mode === 'string' && ['platform', 'custom'].includes(body.email_mode)) {
      settingUpdates.push({ key: 'email_mode', value: body.email_mode })
    }
    if (typeof body.platform_from_email === 'string') {
      settingUpdates.push({ key: 'platform_from_email', value: body.platform_from_email })
    }
    if (typeof body.custom_from_email === 'string') {
      settingUpdates.push({ key: 'custom_from_email', value: body.custom_from_email })
    }
    if (typeof body.custom_from_name === 'string') {
      settingUpdates.push({ key: 'custom_from_name', value: body.custom_from_name })
    }
    // Sensitive fields — only update if a non-empty string is provided
    if (typeof body.platform_resend_api_key === 'string' && body.platform_resend_api_key.trim() !== '') {
      settingUpdates.push({ key: 'platform_resend_api_key', value: body.platform_resend_api_key.trim() })
    }
    if (typeof body.custom_resend_api_key === 'string' && body.custom_resend_api_key.trim() !== '') {
      settingUpdates.push({ key: 'custom_resend_api_key', value: body.custom_resend_api_key.trim() })
    }

    for (const update of settingUpdates) {
      const { error } = await supabase
        .from('platform_settings')
        .update({ value: update.value, updated_at: new Date().toISOString() })
        .eq('key', update.key)

      if (error) {
        throw new Error(`Failed to update setting "${update.key}": ${error.message}`)
      }
    }

    // -----------------------------------------------------------------------
    // 2. Notification preferences
    // -----------------------------------------------------------------------

    const prefs = body.notification_preferences
    if (Array.isArray(prefs)) {
      for (const pref of prefs) {
        if (typeof pref !== 'object' || pref === null) continue
        const p = pref as Record<string, unknown>

        const updatePayload: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        }

        if (typeof p.in_app_enabled === 'boolean') updatePayload.in_app_enabled = p.in_app_enabled
        if (typeof p.email_enabled === 'boolean') updatePayload.email_enabled = p.email_enabled

        if (Object.keys(updatePayload).length <= 1) continue // only timestamp — skip

        if (typeof p.id === 'string') {
          const { error } = await supabase
            .from('notification_preferences')
            .update(updatePayload)
            .eq('id', p.id)

          if (error) {
            console.error(`Failed to update preference ${p.id}:`, error.message)
            // Non-fatal — continue updating others
          }
        }
      }
    }

    // Return the updated state using the same GET logic
    return GET(request)
  } catch (err) {
    console.error('POST /api/settings/notifications error:', err)
    return NextResponse.json({ error: 'Failed to save notification settings' }, { status: 500 })
  }
}
