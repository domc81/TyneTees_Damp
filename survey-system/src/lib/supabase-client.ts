import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase URL or key not configured')
    return null as unknown as ReturnType<typeof createBrowserClient>
  }

  supabaseInstance = createBrowserClient(url, key, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true
    }
  })
  return supabaseInstance
}

// Export a lazy accessor instead of auto-initializing
export const getSupabase = () => createClient()

// Allow temporary override of the singleton for server-side admin operations
// (e.g. regenerating reports with a service-role client)
export function setSupabaseOverride(client: ReturnType<typeof createBrowserClient> | null) {
  supabaseInstance = client
}
