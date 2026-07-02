'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface TrainingImageProps {
  src: string
  alt: string
  caption?: string
}

export function TrainingImage({ src, alt, caption }: TrainingImageProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <figure className="my-6">
        <div
          className="section-card overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
          onClick={() => setExpanded(true)}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-white/40 mt-2 text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpanded(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
            onClick={() => setExpanded(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  )
}
