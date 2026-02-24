// =============================================================================
// RoomFindingsSection — Internal Inspection with per-room sub-sections
// Renders per room: ID photo, observation, RH reading, damp walls table,
// condensation findings, timber decay findings, woodworm findings,
// meter reading photos, defect evidence photos.
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'
import { isSectionEmpty, formatLabel } from './utils'
import { TextContent } from './TextContent'
import { PhotoGrid } from './PhotoGrid'

interface RoomFindingsSectionProps {
  section: ReportSection
  photoUrls: Record<string, string>
  /** Map of photoId → description text used as captions under defect evidence photos */
  photoCaptions?: Record<string, string>
}

// ─── Local data-shape interfaces (mirror report-generator roomData output) ────

interface WallData {
  wall_position: string
  treatment_area_length: string
  treatment_area_height: string
  treatment_area_m2: string
  treatment_type: string
  moisture_reading?: string
}

interface CondensationData {
  condensation_on_windows: boolean
  black_mould_present: boolean
  mould_severity: string | null
  ventilation_adequate: boolean
  humidity_reading: number | null
  piv_recommended: boolean
  fan_recommended: boolean
  fan_count: number
}

interface JoistEntry {
  size: string
  quantity: number
  length: number
}

interface TimberData {
  floor_type: string | null
  floor_condition: string | null
  floor_access: string | null
  sub_floor_inspected: boolean
  sub_floor_ventilation: string | null
  joist_condition: string | null
  fungal_findings: string[]
  fungal_treatment_area: number
  timber_replacement_needed: boolean
  joist_entries: JoistEntry[]
  flooring_type: string | null
  flooring_area: number
  ceiling_affected: boolean
  ceiling_area: number
}

interface WoodwormData {
  species_identified: string | null
  infestation_status: string | null
  severity: string | null
  structural_damage: boolean
  spray_floor_area: number
  spray_timber_area: number
  paste_treatment_area: number
}

// ─── Colour helpers ───────────────────────────────────────────────────────────

/** Returns a Tailwind text colour class. badWhenTrue = true means "yes" = red. */
function boolColour(value: boolean, badWhenTrue: boolean): string {
  if (value) return badWhenTrue ? 'text-red-600 font-medium' : 'text-green-600 font-medium'
  return badWhenTrue ? 'text-green-600' : 'text-red-600 font-medium'
}

function severityColour(severity: string | null): string {
  if (severity === 'severe') return 'text-red-600 font-semibold'
  if (severity === 'moderate') return 'text-amber-600 font-medium'
  return 'text-green-600'
}

function conditionColour(value: string | null): string {
  if (!value) return 'text-[#374151]'
  if (['good', 'sound', 'adequate'].includes(value)) return 'text-green-600'
  if (['poor', 'failed', 'inadequate'].includes(value)) return 'text-red-600 font-medium'
  return 'text-amber-600'
}

// ─── Sub-heading style shared across issue blocks ─────────────────────────────

const subHeading = 'text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2'
const tableContainer = 'overflow-x-auto rounded-lg border border-[#E5E7EB]'
const theadRow = 'bg-[#F3F4F6]'
const th = 'text-left px-3 py-2 font-semibold text-[#374151]'
const tbodyRow = 'border-t border-[#E5E7EB]'
const td = 'px-3 py-2.5 text-[#374151]'
const tdBold = 'px-3 py-2.5 font-medium text-[#1F2937]'

// =============================================================================

export function RoomFindingsSection({
  section,
  photoUrls,
  photoCaptions = {},
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
          const data = room.data ?? {}

          const walls = (data.walls as WallData[] | undefined) ?? []
          const condensation = data.condensation as CondensationData | undefined
          const timber = data.timber as TimberData | undefined
          const woodworm = data.woodworm as WoodwormData | undefined
          const rhReading = data.rh_reading as number | null | undefined
          const roomIdPhotoId = data.room_id_photo as string | null | undefined
          const defectPhotos = (data.defect_photos as string[] | undefined) ?? []
          const meterPhotos = (data.meter_photos as string[] | undefined) ?? []

          const roomIdPhotoUrl = roomIdPhotoId ? photoUrls[roomIdPhotoId] : null

          // Fallback: for legacy reports where defect_photos isn't populated yet,
          // show remaining room.photos minus the ID photo.
          const legacyPhotos =
            defectPhotos.length === 0 && meterPhotos.length === 0
              ? (room.photos ?? []).filter((id) => id !== roomIdPhotoId)
              : []

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

                {/* ── 1. Observation + Room ID photo side-by-side ── */}
                <div className={roomIdPhotoUrl ? 'flex gap-4 items-start' : undefined}>
                  <div className="flex-1 space-y-2">
                    <TextContent content={room.content} />
                    {rhReading != null && rhReading > 0 && (
                      <p className="text-xs text-[#6B7280] italic">
                        Relative Humidity:{' '}
                        <span className="font-medium text-[#374151]">
                          {rhReading}% RH
                        </span>
                      </p>
                    )}
                  </div>

                  {roomIdPhotoUrl && (
                    <div className="shrink-0" style={{ maxWidth: '180px' }}>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <figure
                        data-lightbox-src={roomIdPhotoUrl}
                        data-lightbox-caption="Room identification photo"
                        className="overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm cursor-pointer group"
                        role="button"
                        tabIndex={0}
                        aria-label="View room identification photo"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={roomIdPhotoUrl}
                          alt="Room identification"
                          className="w-full h-28 object-cover group-hover:opacity-90 transition-opacity duration-150"
                          loading="lazy"
                        />
                        <figcaption className="px-2 py-1 text-[10px] text-[#9CA3AF] bg-white border-t border-[#E5E7EB] text-center">
                          {(data.room_name as string | undefined) || 'Room ID'}
                        </figcaption>
                      </figure>
                    </div>
                  )}
                </div>

                {/* ── 2. Damp: Affected Areas table ── */}
                {walls.length > 0 && (
                  <div>
                    <p className={subHeading}>Affected Areas</p>
                    <div className={tableContainer}>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className={theadRow}>
                            <th className={th}>Wall</th>
                            <th className={th}>Treatment Area</th>
                            <th className={th}>Treatment Type</th>
                            <th className={th}>Moisture Reading</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walls.map((wall, idx) => (
                            <tr key={idx} className={tbodyRow}>
                              <td className={td}>{wall.wall_position}</td>
                              <td className={td}>
                                {wall.treatment_area_length}m &times;{' '}
                                {wall.treatment_area_height}m (
                                {wall.treatment_area_m2}m²)
                              </td>
                              <td className={tdBold}>{wall.treatment_type}</td>
                              <td className={td}>
                                {wall.moisture_reading || '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── 3. Condensation Assessment ── */}
                {condensation && (
                  <div className="border-t border-[#F3F4F6] pt-4">
                    <p className={subHeading}>Condensation Assessment</p>
                    <div className={tableContainer}>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className={theadRow}>
                            <th className={`${th} w-1/2`}>Finding</th>
                            <th className={th}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={tbodyRow}>
                            <td className={td}>Condensation on windows</td>
                            <td className={`px-3 py-2.5 ${boolColour(condensation.condensation_on_windows, true)}`}>
                              {condensation.condensation_on_windows ? 'Yes' : 'No'}
                            </td>
                          </tr>
                          <tr className={tbodyRow}>
                            <td className={td}>Black mould present</td>
                            <td className={`px-3 py-2.5 ${boolColour(condensation.black_mould_present, true)}`}>
                              {condensation.black_mould_present
                                ? `Yes${condensation.mould_severity ? ` — ${formatLabel(condensation.mould_severity)}` : ''}`
                                : 'No'}
                            </td>
                          </tr>
                          <tr className={tbodyRow}>
                            <td className={td}>Ventilation adequate</td>
                            <td className={`px-3 py-2.5 ${boolColour(condensation.ventilation_adequate, false)}`}>
                              {condensation.ventilation_adequate ? 'Yes' : 'No'}
                            </td>
                          </tr>
                          {condensation.humidity_reading != null &&
                            condensation.humidity_reading > 0 && (
                              <tr className={tbodyRow}>
                                <td className={td}>Humidity reading</td>
                                <td className={td}>{condensation.humidity_reading}%</td>
                              </tr>
                            )}
                          <tr className={tbodyRow}>
                            <td className={td}>Extractor fan recommended</td>
                            <td className={`px-3 py-2.5 ${condensation.fan_recommended ? 'text-amber-600 font-medium' : 'text-[#374151]'}`}>
                              {condensation.fan_recommended
                                ? `Yes${condensation.fan_count > 0 ? ` (${condensation.fan_count} unit${condensation.fan_count !== 1 ? 's' : ''})` : ''}`
                                : 'No'}
                            </td>
                          </tr>
                          <tr className={tbodyRow}>
                            <td className={td}>PIV recommended</td>
                            <td className={`px-3 py-2.5 ${condensation.piv_recommended ? 'text-amber-600 font-medium' : 'text-[#374151]'}`}>
                              {condensation.piv_recommended ? 'Yes' : 'No'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── 4. Timber & Damp Decay Assessment ── */}
                {timber && (
                  <div className="border-t border-[#F3F4F6] pt-4">
                    <p className={subHeading}>Timber &amp; Damp Decay Assessment</p>
                    <div className={tableContainer}>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className={theadRow}>
                            <th className={`${th} w-1/2`}>Finding</th>
                            <th className={th}>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {timber.floor_type && (
                            <tr className={tbodyRow}>
                              <td className={td}>Floor type</td>
                              <td className={td}>{formatLabel(timber.floor_type)}</td>
                            </tr>
                          )}
                          {timber.floor_condition && (
                            <tr className={tbodyRow}>
                              <td className={td}>Floor condition</td>
                              <td className={`px-3 py-2.5 ${conditionColour(timber.floor_condition)}`}>
                                {formatLabel(timber.floor_condition)}
                              </td>
                            </tr>
                          )}
                          {timber.floor_access && (
                            <tr className={tbodyRow}>
                              <td className={td}>Floor access</td>
                              <td className={td}>{formatLabel(timber.floor_access)}</td>
                            </tr>
                          )}
                          <tr className={tbodyRow}>
                            <td className={td}>Sub-floor inspected</td>
                            <td className={td}>{timber.sub_floor_inspected ? 'Yes' : 'No'}</td>
                          </tr>
                          {timber.sub_floor_inspected && timber.sub_floor_ventilation && (
                            <tr className={tbodyRow}>
                              <td className={td}>Sub-floor ventilation</td>
                              <td className={`px-3 py-2.5 ${conditionColour(timber.sub_floor_ventilation)}`}>
                                {formatLabel(timber.sub_floor_ventilation)}
                              </td>
                            </tr>
                          )}
                          {timber.sub_floor_inspected && timber.joist_condition && (
                            <tr className={tbodyRow}>
                              <td className={td}>Joist condition</td>
                              <td className={`px-3 py-2.5 ${conditionColour(timber.joist_condition)}`}>
                                {formatLabel(timber.joist_condition)}
                              </td>
                            </tr>
                          )}
                          <tr className={tbodyRow}>
                            <td className={td}>Fungal findings</td>
                            <td className={`px-3 py-2.5 ${timber.fungal_findings.length > 0 ? 'text-red-600 font-medium' : 'text-green-600'}`}>
                              {timber.fungal_findings.length > 0
                                ? timber.fungal_findings.map(formatLabel).join(', ')
                                : 'None identified'}
                            </td>
                          </tr>
                          {timber.fungal_treatment_area > 0 && (
                            <tr className={tbodyRow}>
                              <td className={td}>Treatment area</td>
                              <td className={td}>{timber.fungal_treatment_area}m²</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Timber replacement schedule */}
                    {timber.timber_replacement_needed &&
                      timber.joist_entries.length > 0 && (
                        <div className="mt-3">
                          <p className={subHeading}>Timber Replacement Schedule</p>
                          <div className={tableContainer}>
                            <table className="w-full text-xs">
                              <thead>
                                <tr className={theadRow}>
                                  <th className={th}>Joist Size</th>
                                  <th className={th}>Quantity</th>
                                  <th className={th}>Length</th>
                                </tr>
                              </thead>
                              <tbody>
                                {timber.joist_entries.map((j, idx) => (
                                  <tr key={idx} className={tbodyRow}>
                                    <td className={td}>{j.size}</td>
                                    <td className={td}>{j.quantity}</td>
                                    <td className={td}>{j.length}m</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    {/* Flooring and ceiling notes */}
                    {(timber.flooring_area > 0 ||
                      (timber.ceiling_affected && timber.ceiling_area > 0)) && (
                      <div className="mt-2 space-y-1">
                        {timber.flooring_area > 0 && (
                          <p className="text-xs text-[#374151]">
                            Replacement flooring:{' '}
                            <span className="font-medium">
                              {formatLabel(timber.flooring_type || 'timber')}
                            </span>{' '}
                            — {timber.flooring_area}m²
                          </p>
                        )}
                        {timber.ceiling_affected && timber.ceiling_area > 0 && (
                          <p className="text-xs text-[#374151]">
                            Ceiling renewal required:{' '}
                            <span className="font-medium">{timber.ceiling_area}m²</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── 5. Woodworm Assessment ── */}
                {woodworm && (
                  <div className="border-t border-[#F3F4F6] pt-4">
                    <p className={subHeading}>Woodworm Assessment</p>
                    <div className={tableContainer}>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className={theadRow}>
                            <th className={`${th} w-1/2`}>Finding</th>
                            <th className={th}>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {woodworm.species_identified && (
                            <tr className={tbodyRow}>
                              <td className={td}>Species identified</td>
                              <td className={td}>{formatLabel(woodworm.species_identified)}</td>
                            </tr>
                          )}
                          {woodworm.infestation_status && (
                            <tr className={tbodyRow}>
                              <td className={td}>Infestation status</td>
                              <td className={td}>{formatLabel(woodworm.infestation_status)}</td>
                            </tr>
                          )}
                          {woodworm.severity && (
                            <tr className={tbodyRow}>
                              <td className={td}>Severity</td>
                              <td className={`px-3 py-2.5 ${severityColour(woodworm.severity)}`}>
                                {formatLabel(woodworm.severity)}
                              </td>
                            </tr>
                          )}
                          <tr className={tbodyRow}>
                            <td className={td}>Structural damage</td>
                            <td className={`px-3 py-2.5 ${boolColour(woodworm.structural_damage, true)}`}>
                              {woodworm.structural_damage ? 'Yes' : 'No'}
                            </td>
                          </tr>
                          {woodworm.spray_floor_area > 0 && (
                            <tr className={tbodyRow}>
                              <td className={td}>Floor spray area</td>
                              <td className={td}>{woodworm.spray_floor_area}m²</td>
                            </tr>
                          )}
                          {woodworm.spray_timber_area > 0 && (
                            <tr className={tbodyRow}>
                              <td className={td}>Timber spray area</td>
                              <td className={td}>{woodworm.spray_timber_area}m²</td>
                            </tr>
                          )}
                          {woodworm.paste_treatment_area > 0 && (
                            <tr className={tbodyRow}>
                              <td className={td}>Paste treatment area</td>
                              <td className={td}>{woodworm.paste_treatment_area}m²</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── 6. Meter reading photos ── */}
                {meterPhotos.length > 0 && (
                  <div>
                    <p className={subHeading}>Moisture Meter Readings</p>
                    <PhotoGrid
                      photoIds={meterPhotos}
                      photoUrls={photoUrls}
                      columns={2}
                    />
                  </div>
                )}

                {/* ── 7. Defect evidence photos ── */}
                {defectPhotos.length > 0 && (
                  <div>
                    <p className={subHeading}>Defect Evidence</p>
                    <PhotoGrid
                      photoIds={defectPhotos}
                      photoUrls={photoUrls}
                      captions={photoCaptions}
                    />
                  </div>
                )}

                {/* ── Fallback: legacy room.photos (older reports without structured photo categories) ── */}
                {legacyPhotos.length > 0 && (
                  <div>
                    <p className={subHeading}>Photos</p>
                    <PhotoGrid photoIds={legacyPhotos} photoUrls={photoUrls} />
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
