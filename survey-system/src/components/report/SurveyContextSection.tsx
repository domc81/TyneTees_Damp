// =============================================================================
// SurveyContextSection — scope, orientation, abbreviations, reported defect callout
// The "Reported defect:" line is highlighted in a subtle callout box
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'

interface SurveyContextSectionProps {
  section: ReportSection
}

const SUB_HEADINGS = ['Orientation', 'Scope of Inspection', 'Abbreviations']

export function SurveyContextSection({ section }: SurveyContextSectionProps) {
  const { content } = section
  if (!content) return null

  // Extract the "Reported defect:" line for callout box
  const lines = content.split('\n')
  const reportedDefectLine = lines.find((l) => l.startsWith('Reported defect:'))
  const defectText = reportedDefectLine?.replace('Reported defect:', '').trim()

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="survey_context"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>

      <div className="space-y-3">
        {paragraphs.map((para, idx) => {
          const trimmed = para.trim()

          // Sub-heading
          if (SUB_HEADINGS.some((kw) => trimmed.startsWith(kw))) {
            return (
              <h4
                key={idx}
                className="font-semibold text-[#1F2937] text-sm mt-5 mb-1"
              >
                {trimmed}
              </h4>
            )
          }

          // Abbreviation line
          if (trimmed.includes('·')) {
            return (
              <p key={idx} className="text-xs text-[#6B7280] leading-relaxed">
                {trimmed}
              </p>
            )
          }

          // The "Reported defect:" paragraph — render as callout
          if (trimmed.startsWith('Reported defect:')) {
            return (
              <div
                key={idx}
                className="my-4 rounded-lg bg-blue-50 border border-blue-200 px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB] mb-1">
                  Reported Defect
                </p>
                <p className="text-sm font-medium text-[#1E40AF]">
                  {defectText || 'As instructed by client.'}
                </p>
              </div>
            )
          }

          return (
            <p key={idx} className="text-sm text-[#1F2937] leading-relaxed">
              {trimmed}
            </p>
          )
        })}
      </div>
    </section>
  )
}
