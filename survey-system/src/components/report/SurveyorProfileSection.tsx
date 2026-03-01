// =============================================================================
// SurveyorProfileSection — surveyor name, title, credentials
// Clean centred layout; professional look
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'

interface SurveyorProfileSectionProps {
  section: ReportSection
}

export function SurveyorProfileSection({ section }: SurveyorProfileSectionProps) {
  const data = section.data || {}
  const surveyorName = (data.surveyor_name as string) || section.content || ''
  const surveyorTitle = data.surveyor_title as string | undefined
  const surveyorCredentials = data.surveyor_credentials as string | undefined

  return (
    <section
      className="py-10 border-t border-[#E5E7EB] report-section"
      data-section="surveyor_profile"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-6">
        {section.title}
      </h2>

      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-[#6B7280] mb-4">
          Report produced under the guidance of {(data.company_name as string) || 'our company'} by:
        </p>

        {/* Initials avatar */}
        <div className="w-16 h-16 rounded-full bg-[#1E40AF] flex items-center justify-center mb-4 shadow-md">
          <span className="text-white text-xl font-bold">
            {surveyorName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
        </div>

        <p className="text-lg font-bold text-[#1F2937] mb-1">{surveyorName}</p>

        {surveyorTitle && (
          <p className="text-sm text-[#6B7280] mb-1">{surveyorTitle}</p>
        )}

        {surveyorCredentials && (
          <p className="text-sm text-[#374151] font-medium">{surveyorCredentials}</p>
        )}

        {/* Divider */}
        <div className="mt-6 w-16 h-0.5 bg-[#E5E7EB]" />
      </div>
    </section>
  )
}
