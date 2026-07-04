// =============================================================================
// CoverSection — Hero area with navy gradient, Tyne Bridge watermark,
// report title, client details card overlay
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

function TyneBridgeSVG() {
  return (
    <svg viewBox="0 0 700 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <path d="M50 190H650" stroke="white" strokeWidth="18" strokeLinecap="round"/>
      <path d="M95 182C160 76 250 36 350 36C450 36 540 76 605 182" stroke="white" strokeWidth="18" strokeLinecap="round"/>
      <path d="M155 185V128M220 185V88M285 185V61M350 185V50M415 185V61M480 185V88M545 185V128" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      <path d="M85 207H615" stroke="white" strokeWidth="9" strokeLinecap="round"/>
      <path d="M120 212L72 246M580 212L628 246" stroke="white" strokeWidth="10" strokeLinecap="round"/>
    </svg>
  )
}

export function CoverSection({ section, surveyType, company }: CoverSectionProps) {
  const data = section.data || {}
  const reportTitle =
    SURVEY_TYPE_TITLES[surveyType] || 'Specific Defects Inspection'

  const inspectionDate = data.inspection_date as string | undefined
  const weather = data.weather_conditions as string | undefined
  const temp = data.temperature_c as string | number | undefined

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#09283f] via-[#103a58] to-[#125a71]">
      {/* Tyne Bridge watermark */}
      <div className="absolute right-[-60px] bottom-[-18px] w-[56%] max-w-[560px] opacity-[0.12] pointer-events-none">
        <TyneBridgeSVG />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          {/* Left — branding + title */}
          <div>
            {/* Company brand */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 120 76" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <path d="M10 55H110" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M18 52C29 25 44 13 60 13C76 13 91 25 102 52" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M25 53V40M37 53V29M49 53V22M60 53V19M71 53V22M83 53V29M95 53V40" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                  <path d="M20 62H100" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{company.name}</p>
                <p className="text-white/60 text-xs mt-0.5">Specialist damp, timber &amp; condensation surveys</p>
              </div>
            </div>

            {/* Report type badge */}
            <span className="inline-flex px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 mb-4">
              Survey Report
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {reportTitle}
            </h1>
          </div>

          {/* Right — client & survey details card */}
          <div className="bg-white/[0.97] rounded-2xl p-5 shadow-lg border border-white/20">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
              Client &amp; Survey Details
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {data.client_name && (
                <div className="border-t border-[#E5E7EB] pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Client</span>
                  <p className="text-xs font-semibold text-[#1F2937] mt-0.5">{data.client_name as string}</p>
                </div>
              )}
              {inspectionDate && (
                <div className="border-t border-[#E5E7EB] pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Inspection Date</span>
                  <p className="text-xs font-medium text-[#1F2937] mt-0.5">{formatDate(inspectionDate)}</p>
                </div>
              )}
              {data.site_address && (
                <div className="border-t border-[#E5E7EB] pt-2 col-span-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Property</span>
                  <p className="text-xs text-[#374151] mt-0.5">
                    {data.site_address as string}
                    {data.site_city ? `, ${data.site_city as string}` : ''}
                    {data.site_postcode ? ` ${data.site_postcode as string}` : ''}
                  </p>
                </div>
              )}
              {weather && (
                <div className="border-t border-[#E5E7EB] pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Weather</span>
                  <p className="text-xs text-[#374151] mt-0.5">
                    {weather.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    {temp ? `, ${temp}°C` : ''}
                  </p>
                </div>
              )}
              <div className="border-t border-[#E5E7EB] pt-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Prepared By</span>
                <p className="text-xs text-[#374151] mt-0.5">
                  {(data.prepared_by as string | undefined) || company.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
