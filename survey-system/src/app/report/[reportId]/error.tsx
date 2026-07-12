'use client'

// Error boundary for the public report page — review pt 2.

import { PublicErrorFallback } from '@/components/PublicErrorFallback'

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PublicErrorFallback error={error} reset={reset} documentNoun="survey report" />
  )
}
