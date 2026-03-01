// =============================================================================
// ScopeOfWorksSection — Detailed schedule of proposed works
// Per-room numbered items with urgency indicators + additional works
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { URGENCY_CONFIG } from './utils'
import { TextContent } from './TextContent'

interface WorkItem {
  number: number
  description: string
  urgency: 'high' | 'medium' | 'low'
  area?: string
  length?: string
}

interface RoomWork {
  room_name: string
  floor_level: string
  items: WorkItem[]
}

interface ScopeOfWorksSectionProps {
  section: ReportSection
}

function UrgencyDot({ urgency }: { urgency: string }) {
  const config = URGENCY_CONFIG[urgency] ?? URGENCY_CONFIG.medium
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1"
      style={{ backgroundColor: config.dotColour }}
      title={config.label}
      aria-label={config.label}
    />
  )
}

export function ScopeOfWorksSection({ section }: ScopeOfWorksSectionProps) {
  const data = section.data || {}
  const roomWorks = (data.room_works as RoomWork[]) ?? []
  const additionalWorks = (data.additional_works as WorkItem[]) ?? []
  const totalAffectedArea = data.total_affected_area as string | undefined
  const electricalNote = data.electrical_standards_note as string | null | undefined
  const asbestosNote = data.asbestos_note as string | null | undefined

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="scope_of_works"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-3">
        {section.title}
      </h2>

      {/* Intro paragraph */}
      {section.content && (
        <div className="mb-6">
          <TextContent content={section.content} />
        </div>
      )}

      {/* Room works */}
      {roomWorks.length > 0 && (
        <div className="space-y-6 mb-6">
          {roomWorks.map((room, rIdx) => (
            <div
              key={rIdx}
              className="border border-[#E5E7EB] rounded-xl overflow-hidden"
            >
              {/* Room header */}
              <div className="bg-[#F3F4F6] px-5 py-3 border-b border-[#E5E7EB]">
                <h3 className="text-sm font-semibold text-[#1F2937]">
                  {room.room_name}
                  {room.floor_level && (
                    <span className="font-normal text-[#6B7280]">
                      {' '}
                      — {room.floor_level}
                    </span>
                  )}
                </h3>
              </div>

              {/* Work items */}
              <ol className="divide-y divide-[#E5E7EB]">
                {room.items.map((item) => (
                  <li key={item.number} className="flex gap-3 px-5 py-3.5">
                    {/* Item number */}
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1E40AF] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {item.number}
                    </span>

                    {/* Description + measurement */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1F2937] leading-snug">
                        {item.description}
                      </p>
                      {(item.area || item.length) && (
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          {item.area || item.length}
                        </p>
                      )}
                    </div>

                    {/* Urgency dot */}
                    <div className="flex-shrink-0 flex items-start pt-1">
                      <UrgencyDot urgency={item.urgency} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* Additional works */}
      {additionalWorks.length > 0 && (
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
          <div className="bg-[#F3F4F6] px-5 py-3 border-b border-[#E5E7EB]">
            <h3 className="text-sm font-semibold text-[#1F2937]">
              Additional Works
            </h3>
          </div>
          <ol className="divide-y divide-[#E5E7EB]">
            {additionalWorks.map((item) => (
              <li key={item.number} className="flex gap-3 px-5 py-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#374151] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {item.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1F2937] leading-snug">
                    {item.description}
                  </p>
                  {(item.area || item.length) && (
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      {item.area || item.length}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 flex items-start pt-1">
                  <UrgencyDot urgency={item.urgency} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* R12 — Electrical standards note */}
      {electricalNote && (
        <div className="mb-4 flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-sm text-[#374151] leading-relaxed">
            <span className="font-semibold">Electrical Standards (BS 7671): </span>
            {electricalNote}
          </p>
        </div>
      )}

      {/* R13 — Asbestos awareness notice */}
      {asbestosNote && (
        <div className="mb-6 flex gap-3 bg-[#FFFBEB] border border-amber-300 rounded-lg px-4 py-3">
          <p className="text-sm text-[#374151] leading-relaxed">
            <span className="font-semibold">Asbestos Awareness (ACMs): </span>
            {asbestosNote}
          </p>
        </div>
      )}

      {/* Total affected area */}
      {totalAffectedArea && (
        <div className="mb-6 flex items-center gap-3 bg-[#F0F9FF] border border-blue-200 rounded-lg px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#2563EB] flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-[#374151]">
            <span className="font-semibold">Total Affected Area:</span>{' '}
            {totalAffectedArea}
          </p>
        </div>
      )}

      {/* Urgency legend */}
      <div className="flex flex-wrap gap-4 border-t border-[#E5E7EB] pt-4">
        <p className="text-xs text-[#9CA3AF] mr-1">Urgency:</p>
        {Object.entries(URGENCY_CONFIG).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: config.dotColour }}
            />
            <span className="text-xs text-[#6B7280]">{config.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
