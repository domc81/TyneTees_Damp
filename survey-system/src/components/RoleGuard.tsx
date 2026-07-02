'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/types/database.types'

/**
 * Client-side role guard for route protection.
 * Use in layout.tsx files to restrict entire route groups by role.
 * During loading, passes through to let ProtectedRoute handle the spinner.
 * After loading, redirects unauthorised users to the dashboard.
 */
export function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: UserRole[]
}) {
  const { role, isLoading, session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && session && (!role || !allowedRoles.includes(role))) {
      router.push('/')
    }
  }, [isLoading, session, role, allowedRoles, router])

  // While loading or no session — pass through (ProtectedRoute handles auth UI)
  if (isLoading || !session) {
    return <>{children}</>
  }

  // Role loaded but not allowed — block rendering while redirect fires
  if (!role || !allowedRoles.includes(role)) {
    return null
  }

  return <>{children}</>
}
