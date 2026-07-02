'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import type { UserRole } from '@/types/database.types'

interface ProtectedRouteProps {
  children: React.ReactNode
  /** If provided, only users with one of these roles can access the page. */
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { session, isLoading, mustChangePassword, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login')
    }
  }, [session, isLoading, router])

  useEffect(() => {
    if (!isLoading && session && mustChangePassword) {
      router.push('/change-password')
    }
  }, [session, isLoading, mustChangePassword, router])

  // Role-based access check — redirect to dashboard if role not allowed
  useEffect(() => {
    if (!isLoading && session && !mustChangePassword && allowedRoles) {
      if (!role || !allowedRoles.includes(role)) {
        router.push('/')
      }
    }
  }, [session, isLoading, mustChangePassword, allowedRoles, role, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || mustChangePassword) {
    return null
  }

  // Block rendering if role not allowed
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return null
  }

  return <>{children}</>
}
