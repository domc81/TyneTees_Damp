// =============================================================================
// WoodwormTreatmentSection — Woodworm treatment methodology with reference images
// Renders methodology steps, species identification with beetle photo,
// treatment equipment images, safety information, and loft insulation note.
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { MethodologyBlock } from './TreatmentMethodologySection'
import { TextContent } from './TextContent'

interface TreatmentMethodology {
  id: string
  title: string
  intro: string
  steps: string[]
}

interface BeetleImage {
  src: string
  alt: string
  attribution: string
}

interface EquipmentImage {
  src: string
  alt: string
  caption: string
}

interface WoodwormTreatmentSectionProps {
  section: ReportSection
}

export function WoodwormTreatmentSection({
  section,
}: WoodwormTreatmentSectionProps) {
  const data = section.data || {}
  const methodology = data.methodology as TreatmentMethodology | undefined
  const safetyPoints = (data.safetyPoints as string[]) ?? []
  const speciesNote = data.speciesNote as
    | { name: string; statusLabel: string }
    | null
    | undefined
  const anobiumDescription = data.anobiumDescription as string | null | undefined
  const beetleImage = data.beetleImage as BeetleImage | null | undefined
  const equipmentImages = (data.equipmentImages as EquipmentImage[]) ?? []
  const loftInsulationNote = data.loftInsulationNote as string | null | undefined

  // Fallback to plain text for reports generated before this component existed
  if (!methodology) {
    return (
      <section
        className="py-8 border-t border-[#E5E7EB] report-section"
        data-section="woodworm_treatment_methodology"
      >
        <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-3">
          {section.title}
        </h2>
        <TextContent content={section.content} />
      </section>
    )
  }

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="woodworm_treatment_methodology"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-1">
        {section.title}
      </h2>

      <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
        The following sections describe the professional treatment process for
        wood-boring insect infestation, including methodology, safety
        requirements, and species identification.
      </p>

      {/* Methodology timeline */}
      <MethodologyBlock methodology={methodology} />

      {/* Species identification + beetle reference image */}
      {(anobiumDescription || speciesNote) && (
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
          <div className="bg-[#2D4A1E] px-5 py-3">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Species Identification
            </h3>
          </div>
          <div className="px-5 py-4">
            {speciesNote && (
              <div className="mb-3">
                <p className="text-sm text-[#1F2937]">
                  <span className="font-semibold">Species: </span>
                  {speciesNote.name}
                </p>
                <p className="text-sm text-[#4B5563] mt-1">
                  {speciesNote.statusLabel}
                </p>
              </div>
            )}
            {anobiumDescription && (
              <div className="flex gap-5 items-start">
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    {anobiumDescription}
                  </p>
                </div>
                {beetleImage && (
                  <figure className="flex-shrink-0 w-48">
                    <img
                      src={beetleImage.src}
                      alt={beetleImage.alt}
                      className="w-full rounded-lg border border-[#E5E7EB]"
                      loading="lazy"
                    />
                    <figcaption className="text-[10px] text-[#9CA3AF] mt-1 text-center">
                      {beetleImage.alt}
                      <br />
                      {beetleImage.attribution}
                    </figcaption>
                  </figure>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Treatment equipment reference images */}
      {equipmentImages.length > 0 && (
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
          <div className="bg-[#374151] px-5 py-3">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Treatment Equipment
            </h3>
          </div>
          <div className="px-5 py-4">
            <div className="grid grid-cols-3 gap-4">
              {equipmentImages.map((img, idx) => (
                <figure key={idx} className="text-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 object-cover rounded-lg border border-[#E5E7EB]"
                    loading="lazy"
                  />
                  <figcaption className="text-xs text-[#6B7280] mt-2 font-medium">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safety information */}
      {safetyPoints.length > 0 && (
        <div className="border border-amber-200 bg-amber-50 rounded-xl overflow-hidden mb-6">
          <div className="bg-amber-600 px-5 py-3">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Important Safety Information — Exclusion Zone
            </h3>
          </div>
          <ul className="px-5 py-4 space-y-2.5">
            {safetyPoints.map((point, idx) => (
              <li key={idx} className="flex gap-2.5 text-sm text-[#374151]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loft insulation note */}
      {loftInsulationNote && (
        <div className="flex gap-3 bg-[#F0F9FF] border border-blue-200 rounded-lg px-4 py-3">
          <p className="text-sm text-[#374151] leading-relaxed">
            <span className="font-semibold">Loft Insulation: </span>
            {loftInsulationNote}
          </p>
        </div>
      )}
    </section>
  )
}
