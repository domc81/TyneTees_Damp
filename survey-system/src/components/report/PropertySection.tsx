// =============================================================================
// PropertySection — property details table + street view photo
// Photo is large, centred, rounded, with subtle shadow. Click to enlarge.
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { formatLabel } from './utils'

interface PropertySectionProps {
  section: ReportSection
  photoUrls: Record<string, string>
}

export function PropertySection({ section, photoUrls }: PropertySectionProps) {
  const data = section.data || {}
  const streetViewPhotoId = section.photos[0]
  const streetViewUrl = streetViewPhotoId ? photoUrls[streetViewPhotoId] : null

  const tableRows = [
    {
      label: 'Property Type',
      value: data.property_type ? formatLabel(data.property_type as string) : null,
    },
    {
      label: 'Construction',
      value: data.construction_type ? formatLabel(data.construction_type as string) : null,
    },
    {
      label: 'Approx. Build Year',
      value: data.approx_build_year as string | null,
    },
  ].filter((row) => !!row.value)

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="property"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        {section.title}
      </h2>

      {/* Property details table */}
      {tableRows.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-[#E5E7EB] mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F3F4F6]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#374151] uppercase tracking-wide w-40">
                  Attribute
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#374151] uppercase tracking-wide">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx < tableRows.length - 1 ? 'border-b border-[#E5E7EB]' : ''}
                >
                  <td className="px-4 py-3 text-xs text-[#6B7280]">{row.label}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1F2937]">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Street view photo — large, centred, clickable */}
      {streetViewUrl && (
        <div className="flex justify-center">
          <figure
            data-lightbox-src={streetViewUrl}
            data-lightbox-caption="Property exterior"
            className="cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="View property exterior photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={streetViewUrl}
              alt="Property exterior — street view"
              className="max-w-full w-full sm:max-w-[600px] rounded-xl shadow-md object-cover group-hover:opacity-95 transition-opacity duration-150"
              style={{ aspectRatio: '16/9' }}
              loading="lazy"
            />
            <figcaption className="text-center text-xs text-[#9CA3AF] mt-2">
              Property exterior
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
