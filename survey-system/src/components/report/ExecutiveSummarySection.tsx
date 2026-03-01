// =============================================================================
// ExecutiveSummarySection — LLM summary with brand-blue left border accent
// The guarantee paragraph (last paragraph) is rendered with slightly different style
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'

const GUARANTEE_MARKER = 'All treatment works carried out by'

interface ExecutiveSummarySectionProps {
  section: ReportSection
}

export function ExecutiveSummarySection({ section }: ExecutiveSummarySectionProps) {
  if (!section.content) return null

  const paragraphs = section.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  // Split into main content and guarantee paragraph
  const guaranteeIdx = paragraphs.findLastIndex((p) =>
    p.startsWith(GUARANTEE_MARKER)
  )
  const mainParagraphs =
    guaranteeIdx >= 0 ? paragraphs.slice(0, guaranteeIdx) : paragraphs
  const guaranteeParagraph =
    guaranteeIdx >= 0 ? paragraphs[guaranteeIdx] : null

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="executive_summary"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>

      {/* Main LLM paragraphs — left blue accent border */}
      <div className="border-l-4 border-[#1E40AF] pl-5 space-y-4 mb-5">
        {mainParagraphs.map((para, idx) => (
          <p key={idx} className="text-sm text-[#1F2937] leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Guarantee paragraph — slightly muted, smaller, different background */}
      {guaranteeParagraph && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB] mb-2">
            Our Guarantee
          </p>
          <p className="text-xs text-[#374151] leading-relaxed">
            {guaranteeParagraph}
          </p>
        </div>
      )}
    </section>
  )
}
