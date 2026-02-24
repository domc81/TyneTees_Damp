'use client'

import {
  SurveyWizardData,
  SurveyRoomRow,
  ISSUE_TYPE_LABELS,
  ISSUE_TYPE_COLOURS,
} from '@/types/survey-wizard.types'
import {
  CheckCircle,
  Home,
  Droplets,
  Wind,
  TreeDeciduous,
  Bug,
  MapPin,
  Users,
  Calendar,
  Trash2,
} from 'lucide-react'

interface ReviewStepProps {
  wizardData: SurveyWizardData
  rooms: SurveyRoomRow[]
}

const ISSUE_ICONS = {
  damp: Droplets,
  condensation: Wind,
  timber_decay: TreeDeciduous,
  woodworm: Bug,
}

export default function ReviewStep({ wizardData, rooms }: ReviewStepProps) {
  // Calculate summary statistics
  const totalRooms = rooms.length
  const completedRooms = rooms.filter((r) => r.is_completed).length

  // Count issues by type
  const issuesCounts = {
    damp: 0,
    condensation: 0,
    timber_decay: 0,
    woodworm: 0,
  }

  rooms.forEach((room) => {
    room.issues_identified.forEach((issue) => {
      if (issue in issuesCounts) {
        issuesCounts[issue as keyof typeof issuesCounts]++
      }
    })
  })

  const totalIssuesFound = Object.values(issuesCounts).reduce((sum, count) => sum + count, 0)

  // Calculate total affected walls (damp only)
  const totalWalls = rooms.reduce((sum, room) => {
    const dampData = room.room_data.damp
    return sum + (dampData?.walls?.length || 0)
  }, 0)

  // Calculate total wall area (damp only)
  const totalWallArea = rooms.reduce((sum, room) => {
    const dampData = room.room_data.damp
    const wallArea = (dampData?.walls || []).reduce(
      (areaSum, wall) => areaSum + wall.length * wall.height,
      0
    )
    return sum + wallArea
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/20">
            <CheckCircle className="w-6 h-6 text-green-300" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Survey Complete — Review</h3>
            <p className="text-sm text-white/60">
              Review your survey before submission. Use "Back" to make changes.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-5 h-5 text-brand-300" />
            <span className="text-sm text-white/70">Rooms Inspected</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {completedRooms} / {totalRooms}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span className="text-sm text-white/70">Total Issues</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalIssuesFound}</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-blue-300" />
            <span className="text-sm text-white/70">Affected Walls</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalWalls}</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-blue-300" />
            <span className="text-sm text-white/70">Total Wall Area</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalWallArea.toFixed(1)} m²</div>
        </div>
      </div>

      {/* Issues Breakdown */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Issues by Type</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(issuesCounts).map(([issue, count]) => {
            const Icon = ISSUE_ICONS[issue as keyof typeof ISSUE_ICONS]
            const color = ISSUE_TYPE_COLOURS[issue as keyof typeof ISSUE_TYPE_COLOURS]

            return (
              <div
                key={issue}
                className={`p-4 rounded-xl bg-${color}-500/10 border border-${color}-400/30`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${color}-300`} />
                  <span className="text-sm font-medium text-white">
                    {ISSUE_TYPE_LABELS[issue as keyof typeof ISSUE_TYPE_LABELS]}
                  </span>
                </div>
                <div className="text-xl font-bold text-white">{count} rooms</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Site Details Summary */}
      {wizardData.site_details && (
        <div className="glass-card p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-300" />
            Site Details
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-white/50">Inspection Date</span>
              <p className="text-white font-medium">
                {new Date(wizardData.site_details.inspection_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Weather</span>
              <p className="text-white font-medium capitalize">
                {wizardData.site_details.weather_conditions?.replace('_', ' ')}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Temperature</span>
              <p className="text-white font-medium">{wizardData.site_details.temperature_c}°C</p>
            </div>
            <div>
              <span className="text-sm text-white/50">Property Type</span>
              <p className="text-white font-medium capitalize">
                {wizardData.site_details.property_type?.replace('_', ' ')}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Construction</span>
              <p className="text-white font-medium capitalize">
                {wizardData.site_details.construction_type?.replace('_', ' ')}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Build Year</span>
              <p className="text-white font-medium">{wizardData.site_details.approx_build_year}</p>
            </div>
          </div>
          {wizardData.reported_defect && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-sm text-white/50">Reported Defect (from booking)</span>
              <p className="text-white mt-1">{wizardData.reported_defect}</p>
            </div>
          )}
        </div>
      )}

      {/* External Inspection Summary */}
      {wizardData.external_inspection && (
        <div className="glass-card p-6">
          <h4 className="text-lg font-semibold text-white mb-4">External Inspection</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">Building Defects Found:</span>
              <span
                className={`text-sm font-medium ${
                  wizardData.external_inspection.building_defects_found
                    ? 'text-amber-300'
                    : 'text-green-300'
                }`}
              >
                {wizardData.external_inspection.building_defects_found ? 'Yes' : 'No'}
              </span>
            </div>

            {wizardData.external_inspection.building_defects_found &&
              wizardData.external_inspection.building_defects &&
              wizardData.external_inspection.building_defects.length > 0 && (
                <div>
                  <span className="text-sm text-white/50 block mb-2">Defects:</span>
                  <div className="flex flex-wrap gap-2">
                    {wizardData.external_inspection.building_defects.map((defect) => (
                      <span
                        key={defect}
                        className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-400/30 text-xs text-white"
                      >
                        {defect.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Wall Tie Concern:</span>
                <span className="text-sm font-medium text-white">
                  {wizardData.external_inspection.wall_tie_concern ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Cracking Concern:</span>
                <span className="text-sm font-medium text-white">
                  {wizardData.external_inspection.cracking_concern ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-brand-300" />
          Rooms ({rooms.length})
        </h4>

        {rooms.length > 0 ? (
          <div className="space-y-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h5 className="text-white font-medium">{room.name}</h5>
                    <p className="text-sm text-white/50 capitalize">
                      {room.floor_level.replace('_', ' ')} floor
                    </p>
                  </div>

                  {room.issues_identified.length > 0 && (
                    <div className="flex items-center gap-2">
                      {room.issues_identified.map((issue) => {
                        const Icon = ISSUE_ICONS[issue]
                        const color = ISSUE_TYPE_COLOURS[issue]
                        return (
                          <div
                            key={issue}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-${color}-500/10 border border-${color}-400/30`}
                          >
                            <Icon className={`w-3 h-3 text-${color}-300`} />
                            <span className="text-xs text-white">{ISSUE_TYPE_LABELS[issue]}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {room.issues_identified.length === 0 && (
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                      ✓ No issues
                    </span>
                  )}
                </div>

                {room.is_completed && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/60 text-center py-8">No rooms added</p>
        )}
      </div>

      {/* Logistics Summary */}
      {wizardData.additional_works && (
        <div className="glass-card p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-300" />
            Logistics
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-white/50">Distance from Office</span>
              <p className="text-white font-medium text-lg">
                {wizardData.additional_works.distance_from_office || 0} miles
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Men Travelling</span>
              <p className="text-white font-medium text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                {wizardData.additional_works.num_men_travelling || 0}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/50">Skips Required</span>
              <p className="text-white font-medium text-lg flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                {wizardData.additional_works.skip_count || 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completion Status */}
      <div className="glass-card p-6 bg-brand-500/10 border-brand-400/30">
        <div className="flex items-center gap-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <div>
            <h4 className="text-lg font-semibold text-white">Survey Ready for Submission</h4>
            <p className="text-sm text-white/70">
              Review complete. Click "Complete Survey" below to finalize and generate costing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
