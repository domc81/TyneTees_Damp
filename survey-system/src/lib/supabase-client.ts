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

  supabaseInstance = createBrowserClient(url, key)
  return supabaseInstance
}

// Export a lazy accessor instead of auto-initializing
export const getSupabase = () => createClient()
