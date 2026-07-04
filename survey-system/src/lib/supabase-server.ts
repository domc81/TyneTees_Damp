import { createServerClient } from '@supabase/ssr'
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
        getAll() {
          return store?.getAll() ?? []
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              store?.set(name, value, options)
            })
          } catch {
            // Handle server component context (read-only cookies)
          }
        },
      },
    }
  )
}
