'use client'
// =============================================================================
// PhotoLightbox — client-side lightbox for report photos
//
// Progressive enhancement: photos are rendered server-side as normal <img> tags
// inside <figure data-lightbox-src="URL" data-lightbox-caption="..."> elements.
// This component attaches a single delegated click listener to the document —
// no onClick props needed on server components.
//
// When a photo is clicked: overlay appears with full-size image.
// Dismiss: click overlay, press Escape, or press the × button.
// =============================================================================

import { useEffect, useRef, useState, useCallback } from 'react'

export function PhotoLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState('')
  const [caption, setCaption] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Walk up the DOM from the clicked element to find a lightbox trigger
      let target = e.target as HTMLElement | null
      while (target) {
        if (target.dataset.lightboxSrc) {
          e.preventDefault()
          setSrc(target.dataset.lightboxSrc)
          setCaption(target.dataset.lightboxCaption || '')
          setIsOpen(true)
          return
        }
        target = target.parentElement
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [close])

  // Focus the close button when lightbox opens (accessibility)
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Inner container — stops clicks on image/caption from closing */}
      <div
        className="relative flex flex-col items-center max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={close}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
          aria-label="Close photo viewer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close
        </button>

        {/* Full-size image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption || 'Survey photo'}
          className="max-w-full max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
        />

        {/* Caption */}
        {caption && (
          <p className="text-white/70 text-sm mt-3 text-center max-w-2xl leading-relaxed">
            {caption}
          </p>
        )}
      </div>

      {/* Click-outside hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
        Click outside or press Esc to close
      </p>
    </div>
  )
}
