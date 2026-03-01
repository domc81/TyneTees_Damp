// =============================================================================
// TreatmentMethodologySection — Professional step-by-step treatment sequences
// Rendered for damp and timber surveys after the Scope of Works section.
// Visual style: timeline-style numbered steps (distinct from scope_of_works
// blue badge numbers) to communicate a professional, sequential process.
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { TextContent } from './TextContent'

interface TreatmentMethodology {
  id: string
  title: string
  intro: string
  steps: string[]
}

interface TreatmentMethodologySectionProps {
  section: ReportSection
}

// Header colour per treatment type — gives visual differentiation between blocks
const METHODOLOGY_HEADER_COLOURS: Record<
  string,
  { bg: string; text: string }
> = {
  cavity_drain_membrane: { bg: 'bg-[#1E3A5F]', text: 'text-white' },
  cementitious_tanking:  { bg: 'bg-[#1E3A5F]', text: 'text-white' },
  dpc_injection:         { bg: 'bg-[#1E3A5F]', text: 'text-white' },
  wet_rot_treatment:     { bg: 'bg-[#2D4A1E]', text: 'text-white' },
  dry_rot_treatment:     { bg: 'bg-[#4A2D1E]', text: 'text-white' },
}

function MethodologyBlock({ methodology }: { methodology: TreatmentMethodology }) {
  const colours =
    METHODOLOGY_HEADER_COLOURS[methodology.id] ?? {
      bg: 'bg-[#374151]',
      text: 'text-white',
    }

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-6 last:mb-0">
      {/* Block header */}
      <div className={`${colours.bg} px-5 py-3`}>
        <h3 className={`text-sm font-semibold tracking-wide ${colours.text}`}>
          {methodology.title}
        </h3>
      </div>

      {/* Intro */}
      <div className="px-5 pt-4 pb-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <p className="text-sm text-[#4B5563] leading-relaxed italic">
          {methodology.intro}
        </p>
      </div>

      {/* Steps — timeline style */}
      <ol className="px-5 py-4">
        {methodology.steps.map((step, idx) => {
          const isLast = idx === methodology.steps.length - 1
          return (
            <li key={idx} className="flex gap-4">
              {/* Step indicator + vertical connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-[#4B5563] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-[#D1D5DB] my-1 min-h-[1rem]" />
                )}
              </div>

              {/* Step text */}
              <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'} pt-1`}>
                <p className="text-sm text-[#1F2937] leading-snug">{step}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function TreatmentMethodologySection({
  section,
}: TreatmentMethodologySectionProps) {
  const data = section.data || {}
  const methodologies = (data.methodologies as TreatmentMethodology[]) ?? []

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="treatment_methodology"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-1">
        {section.title}
      </h2>

      {methodologies.length > 0 ? (
        <div>
          <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
            The following sections describe the professional treatment processes
            that will be applied during the works. These sequences are based on
            best practice and current British Standard guidance.
          </p>
          {methodologies.map((m) => (
            <MethodologyBlock key={m.id} methodology={m} />
          ))}
        </div>
      ) : (
        <TextContent content={section.content} />
      )}
    </section>
  )
}
