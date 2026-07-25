'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { XCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console for debugging — don't expose to the user
    console.error('[Error Boundary]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="glass-card p-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-3">Something went wrong</h1>

        <p className="text-white/50 mb-8 text-sm leading-relaxed">
          An unexpected error occurred. You can try again or return to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary text-sm inline-flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-secondary text-sm inline-flex items-center gap-2 justify-center"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
