import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Supabase Configuration:', { url, key: key ? '***REDACTED***' : undefined })

  if (!url || !key) {
    console.warn('Supabase URL or key not configured')
    console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('SUPABASE')))
    return null as unknown as ReturnType<typeof createBrowserClient>
  }

  console.log('Creating Supabase client with URL:', url)

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
