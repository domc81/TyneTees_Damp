'use client'

// =============================================================================
// PricingSaveConfirm — old→new diff confirmation before any pricing save.
//
// Every price-affecting save on the admin pages goes through this modal so a
// change is seen before it goes live. Rows flagged `warn` (move > ±50%) get
// an amber highlight; rows flagged `danger` (zeroing a price, deactivating a
// template, breaking a catalogue link) get a red one and an explicit note.
// =============================================================================

import { AlertTriangle, ArrowRight, Loader2, Save } from 'lucide-react'

export interface DiffRow {
  label: string
  sublabel?: string
  oldValue: string
  newValue: string
  /** percentage move where meaningful; null/undefined hides the badge */
  deltaPct?: number | null
  /** big move (> ±50%) — amber */
  warn?: boolean
  /** hazardous change — red, with note explaining why */
  danger?: boolean
  note?: string
}

interface PricingSaveConfirmProps {
  open: boolean
  title: string
  intro?: string
  rows: DiffRow[]
  busy?: boolean
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function PricingSaveConfirm({
  open,
  title,
  intro,
  rows,
  busy = false,
  confirmLabel = 'Confirm & Save',
  onConfirm,
  onCancel,
}: PricingSaveConfirmProps) {
  if (!open) return null

  const dangerCount = rows.filter(r => r.danger).length
  const warnCount = rows.filter(r => r.warn && !r.danger).length

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/15"
        style={{
          background: 'var(--tt-modal-bg)',
          boxShadow: 'var(--tt-modal-shadow)',
        }}
      >
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm text-white/60 mt-1">
            {intro ??
              'These changes go live for every costing calculated after saving. Check each one.'}
          </p>
          {(dangerCount > 0 || warnCount > 0) && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {dangerCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {dangerCount} hazardous change{dangerCount !== 1 ? 's' : ''} — read the notes
                </span>
              )}
              {warnCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {warnCount} large change{warnCount !== 1 ? 's' : ''} (&gt; ±50%)
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-2">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border ${
                row.danger
                  ? 'bg-red-500/10 border-red-500/30'
                  : row.warn
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-sm text-white/90 truncate">{row.label}</p>
                  {row.sublabel && (
                    <p className="text-xs text-white/40 truncate">{row.sublabel}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm shrink-0">
                  <span className="text-white/50 line-through">{row.oldValue}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                  <span
                    className={
                      row.danger
                        ? 'text-red-300 font-semibold'
                        : row.warn
                          ? 'text-amber-300 font-semibold'
                          : 'text-white font-semibold'
                    }
                  >
                    {row.newValue}
                  </span>
                  {row.deltaPct != null && Number.isFinite(row.deltaPct) && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        Math.abs(row.deltaPct) > 50
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {row.deltaPct > 0 ? '+' : ''}
                      {row.deltaPct.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              {row.note && (
                <p
                  className={`text-xs mt-1.5 ${row.danger ? 'text-red-300/80' : 'text-amber-300/80'}`}
                >
                  {row.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 pt-4 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="btn-secondary flex-1 text-sm py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`flex-1 text-sm py-2 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
              dangerCount > 0
                ? 'bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30'
                : 'btn-primary'
            }`}
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
