import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  let store: ReturnType<typeof cookies> | null = null
  try {
    store = cookies()
  } catch {
    // Build-time context — no request available
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return store?.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            if (store) {
              store.set({ name, value, ...options })
            }
          } catch {
            // Handle server component context
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            if (store) {
              store.set({ name, value: '', ...options })
            }
          } catch {
            // Handle server component context
          }
        },
      },
    }
  )
}
