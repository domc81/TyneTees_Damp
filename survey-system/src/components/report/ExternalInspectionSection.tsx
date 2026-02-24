// =============================================================================
// ExternalInspectionSection — top-level text + photos grid + sub-sections
// Sub-sections: Building Defects, Wall Ties, Cracking, Ground Levels
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { isSectionEmpty } from './utils'
import { TextContent } from './TextContent'
import { PhotoGrid } from './PhotoGrid'

interface ExternalInspectionSectionProps {
  section: ReportSection
  photoUrls: Record<string, string>
}

export function ExternalInspectionSection({
  section,
  photoUrls,
}: ExternalInspectionSectionProps) {
  const hasContent = section.content && !isSectionEmpty(section)
  const hasPhotos = section.photos.length > 0
  const hasSubSections =
    section.sub_sections && section.sub_sections.length > 0

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="external_inspection"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>

      {/* Top-level narrative */}
      {hasContent && (
        <div className="mb-5">
          <TextContent content={section.content} />
        </div>
      )}

      {/* External photos in 2-column grid */}
      {hasPhotos && (
        <div className="mb-6">
          <PhotoGrid photoIds={section.photos} photoUrls={photoUrls} />
        </div>
      )}

      {/* Sub-sections */}
      {hasSubSections && (
        <div className="space-y-5">
          {section.sub_sections!
            .filter((sub) => !isSectionEmpty(sub))
            .map((sub) => (
              <div key={sub.key} className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-4">
                <h3 className="text-sm font-semibold text-[#374151] mb-2">
                  {sub.title}
                </h3>
                <TextContent content={sub.content} />

                {/* Sub-section photos (if any) */}
                {sub.photos && sub.photos.length > 0 && (
                  <div className="mt-4">
                    <PhotoGrid photoIds={sub.photos} photoUrls={photoUrls} />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </section>
  )
}
