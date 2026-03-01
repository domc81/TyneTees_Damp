'use client'

// =============================================================================
// Public Quotation — Client Components
//
// QuotationViewTracker: fires analytics beacon on page load (fire-and-forget)
// QuotationActions:     Download PDF + Print buttons
//
// These are the only interactive parts of the otherwise server-rendered page.
// =============================================================================

import { useEffect, useState } from 'react'
import { Download, Printer, Loader2 } from 'lucide-react'

// ─── View Tracker ─────────────────────────────────────────────────────────────
// Fires a POST to the analytics endpoint on mount. Non-blocking — page renders
// immediately and this runs in the background. Errors are swallowed silently.

export function QuotationViewTracker({ token }: { token: string }) {
  useEffect(() => {
    fetch(`/api/q/${token}/view`, {
      method: 'POST',
      keepalive: true, // survives page navigation if user immediately scrolls away
    }).catch(() => {
      // Analytics are non-critical — never surface errors to the customer
    })
  }, [token])

  return null
}

// ─── Action Buttons ───────────────────────────────────────────────────────────
// Download PDF triggers the /api/q/[token]/pdf route.
// Print uses window.print() — CSS @media print in quotation-public.css handles layout.

export function QuotationActions({
  token,
  quotationNumber,
  className,
}: {
  token: string
  quotationNumber: string
  className?: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    try {
      const res = await fetch(`/api/q/${token}/pdf`)
      if (!res.ok) throw new Error(`PDF generation failed (${res.status})`)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${quotationNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Could not generate the PDF. Please use the Print option, or contact us directly.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-lg hover:bg-[#2A4F7F] active:bg-[#163050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating…</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </>
        )}
      </button>

      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#374151] text-sm font-semibold rounded-lg border border-[#D1D5DB] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors select-none"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
    </div>
  )
}
