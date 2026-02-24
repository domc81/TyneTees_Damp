// =============================================================================
// CoverSection — hero area with report title, client details, survey details
// Clean and formal — no background image, clear visual hierarchy
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { formatDate } from './utils'

const SURVEY_TYPE_TITLES: Record<string, string> = {
  damp: 'Specific Defects Inspection — Rising Damp',
  condensation: 'Specific Defects Inspection — Condensation',
  timber: 'Timbers Inspection',
  woodworm: 'Specific Defects Inspection — Woodworm',
}

interface CoverSectionProps {
  section: ReportSection
  surveyType: string
  company: {
    name: string
    phone: string
    email: string
    website: string
  }
}

export function CoverSection({ section, surveyType, company }: CoverSectionProps) {
  const data = section.data || {}
  const reportTitle =
    SURVEY_TYPE_TITLES[surveyType] || 'Specific Defects Inspection'

  const inspectionDate = data.inspection_date as string | undefined
  const weather = data.weather_conditions as string | undefined
  const temp = data.temperature_c as string | number | undefined

  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      {/* Blue accent stripe */}
      <div className="h-1.5 w-full bg-[#1E40AF]" />

      <div className="mx-auto max-w-[800px] px-6 py-12">
        {/* Report title block */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2">
            Survey Report
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] leading-tight">
            {reportTitle}
          </h1>
        </div>

        {/* Two-column detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Client & site details */}
          <div className="bg-[#F3F4F6] rounded-xl p-5 border border-[#E5E7EB]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
              Client Name &amp; Site Details
            </p>
            {data.client_name && (
              <p className="text-sm font-semibold text-[#1F2937] mb-1">
                {data.client_name as string}
              </p>
            )}
            {data.site_address && (
              <p className="text-sm text-[#374151]">{data.site_address as string}</p>
            )}
            {data.site_address_line2 && (
              <p className="text-sm text-[#374151]">{data.site_address_line2 as string}</p>
            )}
            {data.site_city && (
              <p className="text-sm text-[#374151]">
                {data.site_city as string}
                {data.site_county ? `, ${data.site_county as string}` : ''}
              </p>
            )}
            {data.site_postcode && (
              <p className="text-sm font-medium text-[#374151]">{data.site_postcode as string}</p>
            )}
          </div>

          {/* Survey details */}
          <div className="bg-[#F3F4F6] rounded-xl p-5 border border-[#E5E7EB]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
              Survey Details
            </p>
            <dl className="space-y-2">
              {inspectionDate && (
                <div>
                  <dt className="text-xs text-[#9CA3AF] mb-0.5">Inspection Date</dt>
                  <dd className="text-sm font-medium text-[#1F2937]">
                    {formatDate(inspectionDate)}
                  </dd>
                </div>
              )}
              {weather && (
                <div>
                  <dt className="text-xs text-[#9CA3AF] mb-0.5">Weather Conditions</dt>
                  <dd className="text-sm text-[#374151]">
                    {weather.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    {temp ? `, ${temp}°C` : ''}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[#9CA3AF] mb-0.5">Prepared By</dt>
                <dd className="text-sm text-[#374151]">{company.name}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
