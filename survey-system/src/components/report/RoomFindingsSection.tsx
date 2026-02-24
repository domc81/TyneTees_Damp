// =============================================================================
// RoomFindingsSection — Internal Inspection with per-room sub-sections
// Each room: observation text + affected areas table + room photos
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { isSectionEmpty } from './utils'
import { TextContent } from './TextContent'
import { PhotoGrid } from './PhotoGrid'

interface RoomFindingsSectionProps {
  section: ReportSection
  photoUrls: Record<string, string>
}

interface WallData {
  wall_position: string
  treatment_area_length: string
  treatment_area_height: string
  treatment_area_m2: string
  treatment_type: string
  moisture_reading?: string
}

export function RoomFindingsSection({
  section,
  photoUrls,
}: RoomFindingsSectionProps) {
  const roomSections = section.sub_sections?.filter(
    (sub) => !isSectionEmpty(sub)
  ) ?? []

  if (roomSections.length === 0) return null

  return (
    <section
      className="py-8 border-t border-[#E5E7EB] report-section"
      data-section="room_findings"
    >
      <h2 className="text-base font-semibold text-[#1F2937] uppercase tracking-wide mb-2">
        {section.title}
      </h2>

      {/* Non-destructive inspection note */}
      <p className="text-xs italic text-[#6B7280] mb-6 leading-relaxed">
        Note: This was a non-destructive inspection. All findings are based on
        visual assessment, electronic moisture meter readings, digital laser
        thermometer readings and tactile examination of accessible surfaces. No
        opening up works were carried out.
      </p>

      {/* Per-room sub-sections */}
      <div className="space-y-8">
        {roomSections.map((room) => {
          const walls = (room.data?.walls as WallData[] | undefined) ?? []

          return (
            <div
              key={room.key}
              className="border border-[#E5E7EB] rounded-xl overflow-hidden"
            >
              {/* Room header */}
              <div className="bg-[#1E40AF] px-5 py-3">
                <h3 className="text-sm font-semibold text-white">
                  {room.title}
                </h3>
              </div>

              <div className="p-5 space-y-5">
                {/* Surveyor observation */}
                <TextContent content={room.content} />

                {/* Affected areas table */}
                {walls.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">
                      Affected Areas
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-[#F3F4F6]">
                            <th className="text-left px-3 py-2 font-semibold text-[#374151]">
                              Wall
                            </th>
                            <th className="text-left px-3 py-2 font-semibold text-[#374151]">
                              Treatment Area
                            </th>
                            <th className="text-left px-3 py-2 font-semibold text-[#374151]">
                              Treatment Type
                            </th>
                            <th className="text-left px-3 py-2 font-semibold text-[#374151]">
                              Moisture Reading
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {walls.map((wall, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx < walls.length - 1
                                  ? 'border-t border-[#E5E7EB]'
                                  : 'border-t border-[#E5E7EB]'
                              }
                            >
                              <td className="px-3 py-2.5 text-[#374151]">
                                {wall.wall_position}
                              </td>
                              <td className="px-3 py-2.5 text-[#374151]">
                                {wall.treatment_area_length}m ×{' '}
                                {wall.treatment_area_height}m (
                                {wall.treatment_area_m2}m²)
                              </td>
                              <td className="px-3 py-2.5 font-medium text-[#1F2937]">
                                {wall.treatment_type}
                              </td>
                              <td className="px-3 py-2.5 text-[#374151]">
                                {wall.moisture_reading || '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Room photos */}
                {room.photos && room.photos.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">
                      Photos
                    </p>
                    <PhotoGrid
                      photoIds={room.photos}
                      photoUrls={photoUrls}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
