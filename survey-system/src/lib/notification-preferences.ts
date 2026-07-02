// =============================================================================
// Notification Preferences — server-side helper to check if a given event type
// has in-app or email notifications enabled before dispatching.
//
// Uses a simple in-memory cache with a 5-minute TTL so we're not querying the
// notification_preferences table on every single notification call.
// =============================================================================

import { createClient } from '@supabase/supabase-js'

// ---------------------------------------------------------------------------
// Service-role client (same pattern as notifications-server.ts)
// ---------------------------------------------------------------------------

let _client: ReturnType<typeof createClient> | null = null

function getServiceClient() {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase credentials for notification preferences')
  }

  _client = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _client
}

// ---------------------------------------------------------------------------
// In-memory cache — 5-minute TTL
// ---------------------------------------------------------------------------

interface CachedPreferences {
  data: Map<string, { in_app_enabled: boolean; email_enabled: boolean }>
  fetchedAt: number
}

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

let _cache: CachedPreferences | null = null

async function loadPreferences(): Promise<
  Map<string, { in_app_enabled: boolean; email_enabled: boolean }>
> {
  // Return from cache if still valid
  if (_cache && Date.now() - _cache.fetchedAt < CACHE_TTL_MS) {
    return _cache.data
  }

  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('notification_preferences')
    .select('event_type, in_app_enabled, email_enabled')

  if (error) {
    console.error('[notification-preferences] Failed to load:', error)
    // If we have stale cache, use it rather than failing
    if (_cache) return _cache.data
    // No cache at all — default to enabled so notifications aren't silently lost
    return new Map()
  }

  const map = new Map<string, { in_app_enabled: boolean; email_enabled: boolean }>()
  for (const row of data || []) {
    map.set(row.event_type, {
      in_app_enabled: row.in_app_enabled,
      email_enabled: row.email_enabled,
    })
  }

  _cache = { data: map, fetchedAt: Date.now() }
  return map
}

// ---------------------------------------------------------------------------
// Cache invalidation — call after writing notification preferences
// ---------------------------------------------------------------------------

export function invalidatePreferencesCache(): void {
  _cache = null
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check whether a notification event type is enabled for a given channel.
 *
 * Returns `true` if the event type either:
 *   - has the specified channel enabled in notification_preferences, OR
 *   - is not found in the table (defaults to enabled — fail-open)
 */
export async function isNotificationEnabled(
  eventType: string,
  channel: 'in_app' | 'email'
): Promise<boolean> {
  try {
    const prefs = await loadPreferences()
    const pref = prefs.get(eventType)

    // Unknown event type → default to enabled (fail-open)
    if (!pref) return true

    return channel === 'in_app' ? pref.in_app_enabled : pref.email_enabled
  } catch (err) {
    console.error('[notification-preferences] Check failed:', err)
    // Fail-open — don't silently suppress notifications on error
    return true
  }
}
