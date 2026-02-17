'use client'

import Link from 'next/link'
import { ArrowLeft, Users, ClipboardList } from 'lucide-react'

export default function TeamIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-white/40" />
              Team Management
            </h2>
            <p className="text-sm text-white/60">Manage your team members</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Surveyors Card */}
          <Link
            href="/team/surveyors"
            className="glass-card p-6 hover:bg-white/5 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-brand-400" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-500/20 text-brand-300">
                Active
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
              Surveyors
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Manage your surveyors, their qualifications, and availability.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/50">
                View and manage surveyors
              </span>
              <span className="text-brand-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>

          {/* Placeholder Cards for Future Development */}
          <div className="glass-card p-6 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <Users className="w-6 h-6 text-white/30" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-white/40">
                Coming Soon
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Admins
            </h3>
            <p className="text-sm text-white/60">
              Manage system administrators and their access levels.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/50">
                Administrative management
              </span>
              <span className="text-white/30">
                →
              </span>
            </div>
          </div>

          <div className="glass-card p-6 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <Users className="w-6 h-6 text-white/30" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-white/40">
                Coming Soon
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Contractors
            </h3>
            <p className="text-sm text-white/60">
              Manage subcontractors and contractors.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/50">
                External team members
              </span>
              <span className="text-white/30">
                →
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
