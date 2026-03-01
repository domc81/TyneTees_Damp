// =============================================================================
// CondensationCausesSection — Explains the underlying causes of condensation
// Renders: introduction paragraph, per-factor cards with visual distinction,
// and a closing paragraph linking to the scope of works.
// Only included for surveys with condensation findings.
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { isSectionEmpty } from './utils'

interface CondensationFactor {
  icon_key: string
  title: string
  description: string
}

// Per icon_key: left border colour + header background + label colour
const FACTOR_STYLES: Record<
  string,
  { borderColour: string; bgColour: string; labelText: string; labelBg: string }
> = {
  ventilation: {
    borderColour: 'border-[#2563EB]',
    bgColour: 'bg-[#EFF6FF]',
    labelText: 'text-[#1D4ED8]',
    labelBg: 'bg-[#DBEAFE]',
  },
  moisture: {
    borderColour: 'border-[#0891B2]',
    bgColour: 'bg-[#ECFEFF]',
    labelText: 'text-[#0E7490]',
    labelBg: 'bg-[#CFFAFE]',
  },
  insulation: {
    borderColour: 'border-[#D97706]',
    bgColour: 'bg-[#FFFBEB]',
    labelText: 'text-[#B45309]',
    labelBg: 'bg-[#FEF3C7]',
  },
  heating: {
    borderColour: 'border-[#DC2626]',
    bgColour: 'bg-[#FEF2F2]',
    labelText: 'text-[#B91C1C]',
    labelBg: 'bg-[#FEE2E2]',
  },
  mould: {
    borderColour: 'border-[#6B7280]',
    bgColour: 'bg-[#F9FAFB]',
    labelText: 'text-[#374151]',
    labelBg: 'bg-[#E5E7EB]',
  },
}

const DEFAULT_FACTOR_STYLE = FACTOR_STYLES.ventilation

const FACTOR_LABELS: Record<string, string> = {
  ventilation: 'Ventilation',
  moisture: 'Moisture',
  insulation: 'Thermal',
  heating: 'Heating',
  mould: 'Mould',
}

interface CondensationCausesSectionProps {
  section: ReportSection
}

export function CondensationCausesSection({ section }: CondensationCausesSectionProps) {
  if (isSectionEmpty(section)) return null

  const factors = (section.data?.factors as CondensationFactor[] | undefined) ?? []

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="condensation_causes"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-4">
        {section.title}
      </h2>

      {/* Introduction */}
      <p className="text-sm text-[#374151] leading-relaxed mb-6">
        Condensation occurs when moisture-laden air comes into contact with cold surfaces,
        causing water vapour to condense. The following factors have been identified as
        contributing to the condensation problems observed at this property:
      </p>

      {/* Contributing Factors */}
      {factors.length > 0 && (
        <div className="space-y-3 mb-6">
          {factors.map((factor, idx) => {
            const style = FACTOR_STYLES[factor.icon_key] ?? DEFAULT_FACTOR_STYLE
            const label = FACTOR_LABELS[factor.icon_key] ?? 'Contributing Factor'
            return (
              <div
                key={idx}
                className={`rounded-lg border border-[#E5E7EB] border-l-4 ${style.borderColour} ${style.bgColour} overflow-hidden`}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${style.labelBg} ${style.labelText}`}
                    >
                      {label}
                    </span>
                    <h3 className="text-sm font-semibold text-[#1F2937]">{factor.title}</h3>
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed">{factor.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Closing */}
      <p className="text-sm text-[#374151] leading-relaxed italic border-t border-[#E5E7EB] pt-4 mt-4">
        The recommended works detailed in the Scope of Works section below are designed to
        address these underlying causes and provide long-term resolution of the condensation
        issues identified.
      </p>
    </section>
  )
}
