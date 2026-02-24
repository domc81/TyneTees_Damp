// =============================================================================
// TextSection — generic section: title + text content + optional photos
// Used for dpc_findings, sub_floor_ventilation, and any unrecognised section
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { TextContent } from './TextContent'
import { PhotoGrid } from './PhotoGrid'

interface TextSectionProps {
  section: ReportSection
  photoUrls: Record<string, string>
}

export function TextSection({ section, photoUrls }: TextSectionProps) {
  if (!section.content && section.photos.length === 0) return null

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section={section.key}
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-4">
        {section.title}
      </h2>

      {section.content && (
        <TextContent content={section.content} />
      )}

      {section.photos.length > 0 && (
        <div className="mt-6">
          <PhotoGrid photoIds={section.photos} photoUrls={photoUrls} />
        </div>
      )}
    </section>
  )
}
