// =============================================================================
// Profile cache — keeps `role` / `profile.id` working offline.
//
// AuthContext's session hydrates offline (INITIAL_SESSION from persisted
// cookies) but its user_profiles fetch is a network call that fails offline,
// leaving `role`/`profile.id` null. We cache the last good profile per auth
// user id so the surveyor confirmation screen, RoleGuards, and FK writes keep
// working with no signal. See plan §10.
// =============================================================================

import { getDB, isOfflineDbAvailable } from './db'
import type { UserProfile } from '@/types/database.types'

const KEY_PREFIX = 'profile:'

export async function cacheProfile(authUserId: string, profile: UserProfile): Promise<void> {
  if (!isOfflineDbAvailable()) return
  try {
    await getDB().kv.put({ key: `${KEY_PREFIX}${authUserId}`, value: profile })
  } catch (err) {
    console.warn('[offline] cacheProfile failed:', err)
  }
}

export async function getCachedProfile(authUserId: string): Promise<UserProfile | null> {
  if (!isOfflineDbAvailable()) return null
  try {
    const row = await getDB().kv.get(`${KEY_PREFIX}${authUserId}`)
    return (row?.value as UserProfile) ?? null
  } catch (err) {
    console.warn('[offline] getCachedProfile failed:', err)
    return null
  }
}

/** Clear all cached profiles (called on SIGNED_OUT). */
export async function clearCachedProfiles(): Promise<void> {
  if (!isOfflineDbAvailable()) return
  try {
    const db = getDB()
    const keys = await db.kv.where('key').startsWith(KEY_PREFIX).primaryKeys()
    await db.kv.bulkDelete(keys)
  } catch (err) {
    console.warn('[offline] clearCachedProfiles failed:', err)
  }
}
