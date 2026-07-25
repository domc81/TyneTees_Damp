'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="glass-card p-10 max-w-md w-full text-center">
        {/* 404 numeral — large, faint, behind content */}
        <p className="text-8xl font-bold text-white/8 mb-0 font-mono leading-none select-none">
          404
        </p>

        {/* Icon */}
        <div className="flex justify-center -mt-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-3">Page not found</h1>

        <p className="text-white/50 mb-3 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Show the attempted URL */}
        {pathname && (
          <p className="text-xs text-white/30 font-mono mb-8 bg-white/5 rounded-lg px-4 py-2 break-all border border-white/5">
            {pathname}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary text-sm inline-flex items-center gap-2 justify-center"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => router.back()}
            className="btn-secondary text-sm inline-flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
