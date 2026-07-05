// =============================================================================
// ReportFooter — Professional three-column footer with regional presence,
// company details, and report reference
// =============================================================================

import { formatDate } from './utils'

interface ReportFooterProps {
  customerName: string
  company: {
    name: string
    phone: string
    email: string
    website: string
  }
  reportId: string
  /** Survey reference (e.g. TT-2026-0026) — preferred over the report UUID */
  projectNumber?: string | null
  generatedAt: string | null
}

export function ReportFooter({
  customerName,
  company,
  reportId,
  projectNumber,
  generatedAt,
}: ReportFooterProps) {
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
            <p className="text-xs text-[#d8e7ef] leading-relaxed">
              The Town Hall Conference<br />
              &amp; Business Centre<br />
              High Street East<br />
              Wallsend, NE28 7AT
            </p>
            <p className="text-xs text-[#7fb4cc] mt-2">
              Company No. 09747364
            </p>
          </div>

          {/* Regional Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7fb4cc] mb-3">
              Regional Contact
            </p>
            <div className="space-y-1.5 text-xs text-[#d8e7ef]">
              <p>Tyneside: 0191 814 1613</p>
              <p>Wearside: 0191 500 1097</p>
              <p>Northumberland: 01434 303 725</p>
              <p>Durham: 0191 300 3625</p>
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
          <p className="text-[11px] text-[#7fb4cc]">
            South Shields · Blyth · Corbridge · Whitley Bay · North Shields · Sunderland · Durham
          </p>
        </div>
      </div>
    </footer>
  )
}
