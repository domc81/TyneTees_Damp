// =============================================================================
// ExecutiveSummarySection — LLM summary with brand-blue left border accent
// The guarantee paragraph (last paragraph) is rendered with slightly different style
// Includes traffic light overall urgency badge when urgency data is present
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'

const GUARANTEE_MARKER = 'All treatment works carried out by'

const URGENCY_STYLES = {
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'Urgent — Action Required' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Recommended — Action Advisable' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500', label: 'Advisory — Low Risk' },
}

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
  // Note: avoid Array.findLastIndex() — it is ES2023 and unsupported in Edge < 97
  let guaranteeIdx = -1
  for (let i = paragraphs.length - 1; i >= 0; i--) {
    if (paragraphs[i].startsWith(GUARANTEE_MARKER)) {
      guaranteeIdx = i
      break
    }
  }
  const mainParagraphs =
    guaranteeIdx >= 0 ? paragraphs.slice(0, guaranteeIdx) : paragraphs
  const guaranteeParagraph =
    guaranteeIdx >= 0 ? paragraphs[guaranteeIdx] : null

  // Traffic light data from report generator
  const overallUrgency = section.data?.overall_urgency as 'red' | 'amber' | 'green' | undefined
  const urgencyCounts = section.data?.urgency_counts as { red: number; amber: number; green: number } | undefined
  const style = overallUrgency ? URGENCY_STYLES[overallUrgency] : null

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="executive_summary"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>

      {/* Traffic Light Overall Status */}
      {style && (
        <div className={`rounded-lg ${style.bg} border ${style.border} px-5 py-4 mb-5`}>
          <div className="flex items-center gap-3">
            <span className={`inline-block w-4 h-4 rounded-full ${style.dot}`} />
            <span className={`text-sm font-semibold ${style.text}`}>
              {style.label}
            </span>
          </div>
          {urgencyCounts && (urgencyCounts.red > 0 || urgencyCounts.amber > 0) && (
            <div className="flex gap-4 mt-2 ml-7">
              {urgencyCounts.red > 0 && (
                <span className="text-xs text-red-600 font-medium">
                  {urgencyCounts.red} urgent finding{urgencyCounts.red !== 1 ? 's' : ''}
                </span>
              )}
              {urgencyCounts.amber > 0 && (
                <span className="text-xs text-amber-600 font-medium">
                  {urgencyCounts.amber} recommended finding{urgencyCounts.amber !== 1 ? 's' : ''}
                </span>
              )}
              {urgencyCounts.green > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  {urgencyCounts.green} advisory finding{urgencyCounts.green !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}
        </div>
      )}

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
