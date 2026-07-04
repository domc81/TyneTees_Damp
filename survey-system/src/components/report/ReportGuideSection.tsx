// =============================================================================
// ReportGuideSection — "How to Read This Report" 3-card customer guide
// Inserted after executive summary to set expectations for the reader
// =============================================================================

export function ReportGuideSection() {
  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="report_guide"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-5">
        How to Read This Report
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-[#E5E7EB] rounded-xl p-5 bg-gradient-to-b from-white to-[#F9FAFB]">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1E40AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[#1F2937] mb-2">What We Found</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            A clear summary of the visible evidence, readings and defects recorded during the inspection.
          </p>
        </div>

        <div className="border border-[#E5E7EB] rounded-xl p-5 bg-gradient-to-b from-white to-[#F9FAFB]">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[#1F2937] mb-2">What This Means</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Plain-English explanation of the likely cause, risk level and whether action is advised.
          </p>
        </div>

        <div className="border border-[#E5E7EB] rounded-xl p-5 bg-gradient-to-b from-white to-[#F9FAFB]">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[#1F2937] mb-2">What We Propose</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            The proposed remedial works or advice, including areas where no works are proposed based on dry findings.
          </p>
        </div>
      </div>
    </section>
  )
}
