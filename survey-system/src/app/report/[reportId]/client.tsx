'use client'

// =============================================================================
// Public Report — Client Components
//
// ReportViewTracker: fires analytics beacon on page load (fire-and-forget)
// =============================================================================

import { useEffect } from 'react'

// ─── View Tracker ─────────────────────────────────────────────────────────────
// Fires a POST to the analytics endpoint on mount. Non-blocking — page renders
// immediately and this runs in the background. Errors are swallowed silently.

export function ReportViewTracker({
  reportId,
  token,
}: {
  reportId: string
  token: string
}) {
  useEffect(() => {
    fetch(`/api/report/${reportId}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      keepalive: true, // survives page navigation if user immediately scrolls away
    }).catch(() => {
      // Analytics are non-critical — never surface errors to the customer
    })
  }, [reportId, token])

  return null
}
