'use client'

import { usePathname } from 'next/navigation'
import { RoleGuard } from '@/components/RoleGuard'

// Routes under /admin/ that surveyors can access (own availability + workload view)
const ALL_ROLES_ROUTES = ['/admin/availability', '/admin/workload']

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Availability and workload are accessible to all authenticated users
  if (ALL_ROLES_ROUTES.some(route => pathname.startsWith(route))) {
    return <>{children}</>
  }

  return <RoleGuard allowedRoles={['admin', 'office']}>{children}</RoleGuard>
}
