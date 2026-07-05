import type { Metadata } from 'next'
import { RoleGuard } from '@/components/RoleGuard'

export const metadata: Metadata = {
  title: 'Lead Pipeline — Tyne Tees Damp Proofing',
}

export default function EnquiriesLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['admin', 'office']}>{children}</RoleGuard>
}
