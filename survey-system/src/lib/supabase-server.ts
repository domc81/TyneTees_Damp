import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

let cookieStore: ReturnType<typeof cookies> | null = null

function getCookieStore() {
  if (cookieStore) return cookieStore
  try {
    cookieStore = cookies()
    return cookieStore
  } catch {
    // Return a no-op store for build-time contexts
    return null
  }
}

export function createClient() {
  const store = getCookieStore()

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

export const supabase = createClient()
