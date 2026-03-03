import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Start with a plain next() response that carries the incoming request headers
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        // setAll is called by the Supabase client when the access token is
        // refreshed. We must write the updated cookies to both the request
        // (so subsequent server code in this request sees them) and the
        // response (so the browser receives them).
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not add logic between createServerClient and getUser().
  // getUser() re-validates the JWT with Supabase's servers and triggers
  // setAll() above if a token rotation occurred, keeping sessions alive.
  // Route protection is intentionally NOT handled here — ProtectedRoute
  // (client-side) handles that without needing a middleware refactor.
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Run middleware on all paths EXCEPT:
     *   _next/static  — compiled JS/CSS assets
     *   _next/image   — image optimisation responses
     *   favicon.ico   — browser icon request
     *   api/q/        — public quotation API (no auth required)
     *   api/report/   — public report view API (no auth required)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|api/q/|api/report/).*)',
  ],
}
