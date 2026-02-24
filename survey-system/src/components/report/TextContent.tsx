// =============================================================================
// TextContent — reusable paragraph/text renderer for report sections
// Handles: plain paragraphs, bullet lists (- or •), and sub-heading detection
// Server component — no 'use client'
// =============================================================================

interface TextContentProps {
  content: string
  subHeadings?: string[]
  /** If true, the abbreviations line (containing ·) gets smaller text */
  hasAbbreviations?: boolean
  /** Extra className on each paragraph */
  paragraphClassName?: string
}

export function TextContent({
  content,
  subHeadings = [],
  hasAbbreviations = false,
  paragraphClassName = '',
}: TextContentProps) {
  if (!content) return null

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <div className="space-y-3">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim()

        // Sub-heading detection
        if (
          subHeadings.length > 0 &&
          subHeadings.some((kw) => trimmed.startsWith(kw))
        ) {
          return (
            <h4
              key={idx}
              className="font-semibold text-[#1F2937] text-sm mt-5 mb-1"
            >
              {trimmed}
            </h4>
          )
        }

        // Abbreviation line (contains ·)
        if (hasAbbreviations && trimmed.includes('·')) {
          return (
            <p
              key={idx}
              className={`text-xs text-[#6B7280] leading-relaxed ${paragraphClassName}`}
            >
              {trimmed}
            </p>
          )
        }

        // Bullet list paragraph
        if (
          trimmed.startsWith('- ') ||
          trimmed.startsWith('• ') ||
          (trimmed.includes('\n') &&
            trimmed.split('\n').every((l) => l.startsWith('- ') || l.startsWith('• ') || l === ''))
        ) {
          const items = trimmed
            .split('\n')
            .filter(Boolean)
            .map((item) => item.replace(/^[•\-]\s*/, ''))

          return (
            <ul key={idx} className="space-y-1 pl-4">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="relative text-sm text-[#1F2937] leading-relaxed before:absolute before:-left-3 before:content-['•'] before:text-[#6B7280]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p
            key={idx}
            className={`text-sm text-[#1F2937] leading-relaxed ${paragraphClassName}`}
          >
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}
