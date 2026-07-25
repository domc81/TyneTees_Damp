'use client'

// =============================================================================
// ConfirmDialog — styled replacement for native window.confirm().
// Native dialogs are invisible under automation, blockable by browser
// settings, and off-brand; every destructive/locking action should use this.
// =============================================================================

import { useEffect, useState } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  /** Style the confirm button as destructive */
  danger?: boolean
  /** Disable the confirm button while the action runs */
  busy?: boolean
  /**
   * Require the user to type this exact word before Confirm enables —
   * for actions with customer-visible consequences (e.g. resending email).
   */
  requireText?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  busy = false,
  requireText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!open) return
    setTyped('')
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onCancel])

  if (!open) return null

  const confirmBlocked =
    busy || (requireText !== undefined && typed.trim().toUpperCase() !== requireText.toUpperCase())

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/15 p-6 space-y-5"
        style={{
          background: 'var(--tt-modal-bg)',
          boxShadow: 'var(--tt-modal-shadow)',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">{message}</p>
        </div>
        {requireText !== undefined && (
          <div>
            <label className="block text-xs text-white/50 mb-1.5">
              Type <span className="font-mono font-semibold text-white/80">{requireText}</span> to confirm
            </label>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoFocus
              autoComplete="off"
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              placeholder={requireText}
            />
          </div>
        )}
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary flex-1 text-sm py-2">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmBlocked}
            className={
              danger
                ? 'flex-1 text-sm py-2 rounded-xl font-medium bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition-colors disabled:opacity-50'
                : 'btn-primary flex-1 text-sm py-2 disabled:opacity-50'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
