'use client'

// =============================================================================
// Shared error boundary UI for the public customer pages (/q, /pay, /report).
//
// Review pt 2: a browser/JS failure must never leave the customer with a
// blank or unformatted page — always show a clear message, a way to get the
// document (PDF link where one exists), and a phone number, and report the
// failure to /api/client-error so support can see what happened.
//
// This component must render with ZERO data dependencies (the page around it
// has already failed), hence the literal office phone number.
// =============================================================================

import { useEffect, useState } from 'react'

const OFFICE_PHONE = '0191 814 1613'

export function PublicErrorFallback({
  error,
  reset,
  documentNoun,
  pdfFromPath,
}: {
  error: Error & { digest?: string }
  reset?: () => void
  /** e.g. "quotation", "payment page", "report" */
  documentNoun: string
  /** Build a PDF download href from the current pathname (return null for none) */
  pdfFromPath?: (pathname: string) => string | null
}) {
  const [pdfHref, setPdfHref] = useState<string | null>(null)

  useEffect(() => {
    const path = window.location.pathname
    if (pdfFromPath) setPdfHref(pdfFromPath(path))

    // Fire-and-forget error report — support can match it to a customer call
    fetch('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        message: `${error.name}: ${error.message}${error.digest ? ` (digest ${error.digest})` : ''}`,
        source: 'error-boundary',
      }),
      keepalive: true,
    }).catch(() => {
      // Reporting must never cause a second failure
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-[#1F2937] mb-3">
          We couldn&apos;t display this page in your browser
        </h1>
        <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
          Sorry — something went wrong showing your {documentNoun}.
          {pdfHref
            ? ' You can still download the full document as a PDF below, or call us and we will help straight away.'
            : ' Please try again, or call us and we will help straight away.'}
        </p>

        <div className="space-y-3">
          {pdfHref && (
            <a
              href={pdfHref}
              className="block w-full px-4 py-3 bg-[#1E3A5F] text-white text-sm font-semibold rounded-lg hover:bg-[#2A4F7F] transition-colors"
            >
              Download PDF
            </a>
          )}
          {reset && (
            <button
              onClick={reset}
              className="block w-full px-4 py-3 bg-white text-[#374151] text-sm font-semibold rounded-lg border border-[#D1D5DB] hover:bg-[#F9FAFB] transition-colors"
            >
              Try again
            </button>
          )}
          <a
            href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
            className="block w-full px-4 py-3 bg-white text-[#374151] text-sm font-semibold rounded-lg border border-[#D1D5DB] hover:bg-[#F9FAFB] transition-colors"
          >
            Call us on {OFFICE_PHONE}
          </a>
        </div>
      </div>
    </div>
  )
}
