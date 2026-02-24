// =============================================================================
// PhotoGrid — renders photos in a 2-column grid with lightbox support
// Photos include data-lightbox-src for progressive enhancement lightbox.
// Server component — the lightbox JS is added by PhotoLightbox client component.
// =============================================================================

interface PhotoGridProps {
  photoIds: string[]
  photoUrls: Record<string, string>
  /** Optional map of photoId → caption text */
  captions?: Record<string, string>
  /** Override column count (default 2) */
  columns?: 1 | 2
}

export function PhotoGrid({
  photoIds,
  photoUrls,
  captions = {},
  columns = 2,
}: PhotoGridProps) {
  const validPhotos = photoIds.filter((id) => !!photoUrls[id])

  if (validPhotos.length === 0) return null

  const gridClass =
    columns === 1
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 gap-4'

  return (
    <div className={gridClass}>
      {validPhotos.map((photoId) => {
        const url = photoUrls[photoId]
        const caption = captions[photoId] || ''

        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <figure
            key={photoId}
            // data-* attributes let the PhotoLightbox client component
            // intercept clicks and open a fullscreen overlay
            data-lightbox-src={url}
            data-lightbox-caption={caption}
            className="overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label={caption ? `View photo: ${caption}` : 'View photo'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={caption || 'Survey photo'}
              className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-150"
              loading="lazy"
            />
            {caption && (
              <figcaption className="px-3 py-1.5 text-xs text-[#6B7280] bg-white border-t border-[#E5E7EB]">
                {caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
