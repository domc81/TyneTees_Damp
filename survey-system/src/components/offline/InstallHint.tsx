'use client'

// =============================================================================
// InstallHint — unobtrusive "Install app" button for Android (plan §8).
// Fires only when the browser offers install (beforeinstallprompt — Chromium
// only). iOS needs Share → Add to Home Screen, covered in the surveyor training
// doc rather than an in-app modal.
// =============================================================================

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallHint({ className = '' }: { className?: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    if (window.matchMedia?.('(display-mode: standalone)').matches) setInstalled(true)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || !deferred) return null

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await deferred.prompt()
        } finally {
          setDeferred(null)
        }
      }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/15 border border-brand-400/40 text-brand-200 text-xs font-medium hover:bg-brand-500/25 transition-colors ${className}`}
      title="Install TTDP Surveys to your home screen for offline use"
    >
      <Download className="w-3.5 h-3.5" />
      Install app
    </button>
  )
}
