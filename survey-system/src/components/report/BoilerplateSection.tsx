// =============================================================================
// BoilerplateSection — legal/admin sections (ancillary, extent, payment)
// Slightly muted styling to signal these are supporting/legal text
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { TextContent } from './TextContent'

interface BoilerplateSectionProps {
  section: ReportSection
}

export function BoilerplateSection({ section }: BoilerplateSectionProps) {
  if (!section.content) return null

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section={section.key}
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-4">
        {section.title}
      </h2>
      <div className="bg-[#F9FAFB] rounded-lg px-5 py-4 border border-[#E5E7EB]">
        <TextContent content={section.content} paragraphClassName="text-[#6B7280]" />
      </div>
    </section>
  )
}
