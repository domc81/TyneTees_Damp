'use client'

// Error boundary for the public payment page — review pt 2.

import { PublicErrorFallback } from '@/components/PublicErrorFallback'

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PublicErrorFallback error={error} reset={reset} documentNoun="payment page" />
  )
}
