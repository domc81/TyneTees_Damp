'use client'

// Error boundary for the public quotation page — review pt 2.
// The PDF is generated server-side, so it stays available even when the
// page itself cannot render in the customer's browser.

import { PublicErrorFallback } from '@/components/PublicErrorFallback'

export default function QuotationError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PublicErrorFallback
      error={error}
      reset={reset}
      documentNoun="quotation"
      pdfFromPath={(pathname) => {
        const match = pathname.match(/^\/q\/([^/]+)/)
        return match ? `/api/q/${match[1]}/pdf` : null
      }}
    />
  )
}
