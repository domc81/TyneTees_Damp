// =============================================================================
// ReportFooter — confidentiality notice + company contact + PDF download button
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
  generatedAt: string | null
}

export function ReportFooter({
  customerName,
  company,
  reportId,
  generatedAt,
}: ReportFooterProps) {
  return (
    <footer className="mt-16 border-t border-[#E5E7EB] bg-[#F9FAFB]">
      {/* Main footer content */}
      <div className="mx-auto max-w-[800px] px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Confidentiality notice */}
          <div>
            <p className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">
              Confidentiality
            </p>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              This report is confidential and has been prepared exclusively for{' '}
              <span className="font-medium text-[#374151]">{customerName || 'the client'}</span>.
              It may not be reproduced or disclosed without prior written consent.
            </p>
          </div>

          {/* Company contact */}
          <div>
            <p className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">
              Contact Us
            </p>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {company.name}
            </p>
            <p className="text-xs text-[#6B7280]">{company.phone}</p>
            <p className="text-xs text-[#6B7280]">{company.email}</p>
            <p className="text-xs text-[#6B7280]">{company.website}</p>
          </div>

          {/* Report reference + download */}
          <div>
            <p className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">
              Report Details
            </p>
            <p className="text-xs text-[#6B7280] mb-1">
              Reference:{' '}
              <span className="font-mono text-[#374151]">
                {reportId.slice(0, 8).toUpperCase()}
              </span>
            </p>
            {generatedAt && (
              <p className="text-xs text-[#6B7280] mb-3">
                Generated: {formatDate(generatedAt)}
              </p>
            )}

            {/* Download PDF button — placeholder (no functionality yet) */}
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] rounded opacity-60 cursor-not-allowed print:hidden"
              title="PDF download coming soon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E5E7EB] py-3">
        <div className="mx-auto max-w-[800px] px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {company.website}
          </p>
        </div>
      </div>
    </footer>
  )
}
