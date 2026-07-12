'use client'

// =============================================================================
// SurveyContextHeader — read-only job context at the top of the wizard
// (review pt 10). Shows job ID, client, site + correspondence addresses,
// booking date/time, attending surveyor, and admin notes — offline included
// (the data rides the survey mirror, outside survey_data).
//
// Admin/booking notes are INTERNAL: they live outside survey_data and
// report-generator reads only survey_data, so they are structurally excluded
// from customer reports — do not add any pathway from here into the report.
// =============================================================================

import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, User, CalendarDays, StickyNote, AlertCircle } from 'lucide-react'
import type { SurveyContext } from '@/lib/offline/local-data'

function formatBookingDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export function SurveyContextHeader({
  projectNumber,
  context,
  defaultCollapsed = false,
}: {
  projectNumber: string | null
  context: SurveyContext | null
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  if (!context) return null

  const bookingLine = context.bookingDate
    ? `${formatBookingDate(context.bookingDate)}${context.bookingStart ? ` · ${context.bookingStart}` : ''}${context.bookingEnd ? `–${context.bookingEnd}` : ''}`
    : null

  const adminNotes = [context.bookingNotes, context.surveyNotes]
    .map((n) => (n ?? '').trim())
    .filter(Boolean)
    // Booking + survey notes are often duplicates of each other — dedupe
    .filter((n, i, arr) => arr.indexOf(n) === i)

  return (
    <div className="rounded-xl border border-brand-400/25 bg-brand-500/10 overflow-hidden">
      {/* Slim always-visible strip */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left"
      >
        <div className="min-w-0 flex items-center gap-2.5 text-sm">
          <span className="font-mono font-semibold text-brand-300 flex-shrink-0">
            {projectNumber ?? 'Job'}
          </span>
          {context.clientName && (
            <span className="text-white/90 font-medium truncate">{context.clientName}</span>
          )}
          {context.siteAddress && (
            <span className="text-white/50 truncate hidden sm:inline">
              {context.siteAddress.split('\n')[0]}
            </span>
          )}
        </div>
        {collapsed ? (
          <ChevronDown className="w-4 h-4 text-white/50 flex-shrink-0" />
        ) : (
          <ChevronUp className="w-4 h-4 text-white/50 flex-shrink-0" />
        )}
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Site address */}
          <div className="flex gap-2.5">
            <MapPin className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Site address</p>
              <p className="text-white/90 whitespace-pre-line leading-snug">
                {context.siteAddress ?? '—'}
              </p>
            </div>
          </div>

          {/* Correspondence address — only when different from the site */}
          {context.correspondenceAddress && (
            <div className="flex gap-2.5">
              <User className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-300/80 uppercase tracking-wider mb-1">
                  Correspondence address (differs from site)
                </p>
                <p className="text-white/90 whitespace-pre-line leading-snug">
                  {context.correspondenceAddress}
                </p>
              </div>
            </div>
          )}

          {/* Booking + surveyor */}
          {(bookingLine || context.surveyorName) && (
            <div className="flex gap-2.5">
              <CalendarDays className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Booking</p>
                {bookingLine && <p className="text-white/90">{bookingLine}</p>}
                {context.surveyorName && (
                  <p className="text-white/60">Surveyor: {context.surveyorName}</p>
                )}
              </div>
            </div>
          )}

          {/* Reported problem */}
          {context.reportedProblem && (
            <div className="flex gap-2.5">
              <AlertCircle className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Reported problem</p>
                <p className="text-white/80 leading-snug">{context.reportedProblem}</p>
              </div>
            </div>
          )}

          {/* Admin notes — internal only, never reaches the customer report */}
          {adminNotes.length > 0 && (
            <div className="flex gap-2.5 sm:col-span-2">
              <StickyNote className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-300/80 uppercase tracking-wider mb-1">
                  Admin notes (internal)
                </p>
                {adminNotes.map((note, i) => (
                  <p key={i} className="text-white/80 leading-snug whitespace-pre-line">{note}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
