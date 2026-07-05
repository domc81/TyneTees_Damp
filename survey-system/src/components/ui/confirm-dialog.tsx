'use client'

// =============================================================================
// ConfirmDialog — styled replacement for native window.confirm().
// Native dialogs are invisible under automation, blockable by browser
// settings, and off-brand; every destructive/locking action should use this.
// =============================================================================

import { useEffect } from 'react'

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
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onCancel])

  if (!open) return null

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
          background: 'linear-gradient(135deg, rgba(30,42,56,0.98) 0%, rgba(13,21,32,0.99) 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary flex-1 text-sm py-2">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
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
