'use client'

import { useState } from 'react'
import {
  ExternalInspection,
  BuildingDefect,
  BUILDING_DEFECTS,
  DefectUrgency,
} from '@/types/survey-wizard.types'
import { Home, AlertTriangle, CheckSquare, Square, FileText, Camera } from 'lucide-react'
import PhotoCapture from './PhotoCapture'
import { filterPhotos } from '@/lib/survey-photo-service'
import type { SurveyPhoto } from '@/types/survey-photo.types'

interface ExternalInspectionStepProps {
  data: Partial<ExternalInspection>
  onChange: (data: Partial<ExternalInspection>) => void
  surveyId: string
  photos: SurveyPhoto[]
  onPhotosChange: () => void
}

export default function ExternalInspectionStep({ data, onChange, surveyId, photos, onPhotosChange }: ExternalInspectionStepProps) {
  const handleChange = (field: keyof ExternalInspection, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const toggleDefect = (defect: BuildingDefect) => {
    const currentDefects = data.building_defects || []
    const newDefects = currentDefects.includes(defect)
      ? currentDefects.filter((d) => d !== defect)
      : [...currentDefects, defect]
    handleChange('building_defects', newDefects)
  }

  const isDefectSelected = (defect: BuildingDefect) => {
    return (data.building_defects || []).includes(defect)
  }

  const hasDefects = data.building_defects_found === true
  const hasSelectedDefects = (data.building_defects || []).length > 0

  // Filter photos for this step
  const externalPhotos = filterPhotos(photos, { step: 'external_inspection' })

  return (
    <div className="space-y-6">
      {/* Building Defects Found Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Home className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Building Defects</h3>
            <p className="text-sm text-white/60">External inspection findings</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Main toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-base font-medium text-white">
                Were building defects noted?
              </label>
              <p className="text-sm text-white/50 mt-1">
                Toggle to indicate if any external defects were found
              </p>
            </div>
            <button
              onClick={() => {
                const newValue = !data.building_defects_found
                handleChange('building_defects_found', newValue)
                // Clear defects list if toggling to "no defects"
                if (!newValue) {
                  handleChange('building_defects', [])
                  handleChange('defect_urgency', undefined)
                }
              }}
              className={`
                relative inline-flex h-7 w-14 items-center rounded-full
                transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                ${hasDefects ? 'bg-brand-500' : 'bg-white/20'}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
                  transition-transform duration-300
                  ${hasDefects ? 'translate-x-8' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {/* Defect checklist - only shown if defects found */}
          {hasDefects && (
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-white/80 mb-3">
                Select all defects observed:
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {BUILDING_DEFECTS.map((defect) => {
                  const isSelected = isDefectSelected(defect.value)
                  return (
                    <button
                      key={defect.value}
                      onClick={() => toggleDefect(defect.value)}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg text-left
                        transition-all duration-200
                        ${
                          isSelected
                            ? 'bg-brand-500/20 border border-brand-400/50'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="mt-0.5">
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-brand-300" />
                        ) : (
                          <Square className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isSelected ? 'text-white font-medium' : 'text-white/70'
                        }`}
                      >
                        {defect.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Defect urgency selector - shown when defects selected */}
              {hasSelectedDefects && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Defect Urgency
                    </span>
                  </label>
                  <select
                    value={data.defect_urgency || ''}
                    onChange={(e) => handleChange('defect_urgency', e.target.value as DefectUrgency)}
                    className="input-field"
                  >
                    <option value="">Select urgency level...</option>
                    <option value="immediate">Immediate (urgent repair needed)</option>
                    <option value="short_term">Short term (within 3 months)</option>
                    <option value="medium_term">Medium term (within 6 months)</option>
                    <option value="long_term">Long term (within 12 months)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* No defects message */}
          {!hasDefects && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-400/30">
              <p className="text-sm text-green-300">
                No building defects were noted at the time of inspection.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Building Defect Photos */}
      {hasDefects && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-brand-500/20">
              <Camera className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Defect Evidence Photos</h3>
              <p className="text-sm text-white/60">Visual evidence of defects found</p>
            </div>
          </div>

          <PhotoCapture
            surveyId={surveyId}
            step="external_inspection"
            category="building_defect"
            label="Building Defect Evidence"
            maxPhotos={10}
            existingPhotos={filterPhotos(externalPhotos, { category: 'building_defect' })}
            onPhotosChange={onPhotosChange}
          />
        </div>
      )}

      {/* External General Photos */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Camera className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">General External Photos</h3>
            <p className="text-sm text-white/60">Additional external observations</p>
          </div>
        </div>

        <PhotoCapture
          surveyId={surveyId}
          step="external_inspection"
          category="general"
          label="General External"
          maxPhotos={5}
          existingPhotos={filterPhotos(externalPhotos, { category: 'general' })}
          onPhotosChange={onPhotosChange}
        />
      </div>

      {/* Specific Concerns */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <AlertTriangle className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Specific Concerns</h3>
            <p className="text-sm text-white/60">Wall ties and structural cracking</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Wall tie concern */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-base font-medium text-white">Wall Tie Concern</label>
              <p className="text-sm text-white/50 mt-1">
                Evidence of lateral cracks or potential wall tie issues
              </p>
            </div>
            <button
              onClick={() => handleChange('wall_tie_concern', !data.wall_tie_concern)}
              className={`
                relative inline-flex h-7 w-14 items-center rounded-full
                transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                ${data.wall_tie_concern ? 'bg-brand-500' : 'bg-white/20'}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
                  transition-transform duration-300
                  ${data.wall_tie_concern ? 'translate-x-8' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {/* Cracking concern */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-base font-medium text-white">Cracking Concern</label>
              <p className="text-sm text-white/50 mt-1">
                Structural cracks or movement noted in walls/lintels
              </p>
            </div>
            <button
              onClick={() => handleChange('cracking_concern', !data.cracking_concern)}
              className={`
                relative inline-flex h-7 w-14 items-center rounded-full
                transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                ${data.cracking_concern ? 'bg-brand-500' : 'bg-white/20'}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
                  transition-transform duration-300
                  ${data.cracking_concern ? 'translate-x-8' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <FileText className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Additional Notes</h3>
            <p className="text-sm text-white/60">Any other observations</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            External Inspection Notes
          </label>
          <textarea
            value={data.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="input-field min-h-[100px] resize-y"
            placeholder="Additional observations from the external inspection..."
            rows={4}
          />
          <p className="mt-1.5 text-sm text-white/50">
            Optional: Add any other relevant observations or context
          </p>
        </div>
      </div>
    </div>
  )
}
