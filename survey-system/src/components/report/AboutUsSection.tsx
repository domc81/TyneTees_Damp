// =============================================================================
// AboutUsSection — company credentials + qualifications + guarantees
// Sub-headings detected from the boilerplate text
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { TextContent } from './TextContent'

interface AboutUsSectionProps {
  section: ReportSection
}

const SUB_HEADINGS = ['Qualifications & Standards', 'Guarantees', 'Our Track Record']

export function AboutUsSection({ section }: AboutUsSectionProps) {
  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="about_us"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>
      <TextContent
        content={section.content}
        subHeadings={SUB_HEADINGS}
      />
    </section>
  )
}
