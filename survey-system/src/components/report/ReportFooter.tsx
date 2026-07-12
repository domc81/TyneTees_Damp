// =============================================================================
// ReportFooter — Professional three-column footer with regional presence,
// company details, and report reference.
//
// Location data comes from the company_locations table (review pt 9) — no
// hardcoded addresses, phone numbers, or towns. service_area rows render as
// towns only, never as postal offices.
// =============================================================================

import { formatDate } from './utils'
import type { CompanyLocation } from '@/lib/company-locations'

interface ReportFooterProps {
  customerName: string
  company: {
    name: string
    phone: string
    email: string
    website: string
    registrationNumber?: string
  }
  locations: CompanyLocation[]
  reportId: string
  /** Survey reference (e.g. TT-2026-0026) — preferred over the report UUID */
  projectNumber?: string | null
  generatedAt: string | null
}

function addressLines(loc: CompanyLocation): string[] {
  return [loc.address_line1, loc.address_line2, loc.city, loc.county, loc.postcode]
    .map((p) => (p ?? '').trim())
    .filter(Boolean)
}

export function ReportFooter({
  customerName,
  company,
  locations,
  reportId,
  projectNumber,
  generatedAt,
}: ReportFooterProps) {
  const registered = locations.find((l) => l.type === 'registered')
  const contactNumbers = locations.filter((l) => l.type === 'contact_number' && l.phone)
  // Towns line: regional offices + service areas (service areas are towns
  // only — they must never be presented as postal offices)
  const towns = locations
    .filter((l) => l.type === 'regional_office' || l.type === 'service_area')
    .map((l) => l.label)

  return (
    <footer className="mt-16 bg-[#09283f] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-[800px] px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Registered Office */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7fb4cc] mb-3">
              Registered Office
            </p>
            {registered ? (
              <p className="text-xs text-[#d8e7ef] leading-relaxed">
                {addressLines(registered).map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ) : (
              <p className="text-xs text-[#d8e7ef] leading-relaxed">{company.name}</p>
            )}
            {company.registrationNumber && (
              <p className="text-xs text-[#7fb4cc] mt-2">
                Company No. {company.registrationNumber}
              </p>
            )}
          </div>

          {/* Regional Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7fb4cc] mb-3">
              Regional Contact
            </p>
            <div className="space-y-1.5 text-xs text-[#d8e7ef]">
              {contactNumbers.length > 0 ? (
                contactNumbers.map((c) => (
                  <p key={c.id}>
                    {c.label}: {c.phone}
                  </p>
                ))
              ) : (
                <p>{company.phone}</p>
              )}
            </div>
          </div>

          {/* Report Details */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7fb4cc] mb-3">
              Report Details
            </p>
            <p className="text-xs text-[#d8e7ef] mb-1">
              Reference:{' '}
              <span className="font-mono text-white">
                {projectNumber || reportId.slice(0, 8).toUpperCase()}
              </span>
            </p>
            {generatedAt && (
              <p className="text-xs text-[#d8e7ef] mb-1">
                Generated: {formatDate(generatedAt)}
              </p>
            )}
            <p className="text-xs text-[#7fb4cc] mt-3">
              {company.email}
            </p>
            <p className="text-xs text-[#7fb4cc]">
              {company.website}
            </p>
          </div>
        </div>

        {/* Confidentiality */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[11px] text-[#7fb4cc] leading-relaxed">
            This report is confidential and has been prepared exclusively for{' '}
            <span className="text-white font-medium">{customerName || 'the client'}</span>.
            It may not be reproduced or disclosed to any third party without prior written consent from {company.name}.
          </p>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/10 py-3">
        <div className="mx-auto max-w-[800px] px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#7fb4cc]">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          {towns.length > 0 && (
            <p className="text-[11px] text-[#7fb4cc]">
              {towns.join(' · ')}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
