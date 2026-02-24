'use client'

import { useState } from 'react'
import {
  ExternalInspection,
  BuildingDefect,
  BUILDING_DEFECTS,
  DefectUrgency,
} from '@/types/survey-wizard.types'
import { Home, AlertTriangle, CheckSquare, Square, FileText, Camera, Loader2 } from 'lucide-react'
import PhotoCapture from './PhotoCapture'
import AudioRecorder from './AudioRecorder'
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
  const [isPolishing, setIsPolishing] = useState(false)
  const [polishError, setPolishError] = useState<string | null>(null)
  const [wasPolished, setWasPolished] = useState(false)

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

  // --- STT handlers (mirroring RoomInspectionStep) ---
  const handleTranscription = (text: string) => {
    const currentNotes = data.notes || ''
    const newNotes = currentNotes ? `${currentNotes} ${text}` : text
    const currentRaw = data.raw_notes || ''
    const newRaw = currentRaw ? `${currentRaw}\n${text}` : text
    onChange({ ...data, notes: newNotes, raw_notes: newRaw })
    setWasPolished(false)
  }

  const handlePolish = async () => {
    if (!data.notes?.trim()) return
    setIsPolishing(true)
    setPolishError(null)

    const rawText = data.notes

    try {
      const response = await fetch('/api/polish-observation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Polish failed')
      }

      const result = await response.json()
      onChange({ ...data, notes: result.polished, raw_notes: rawText })
      setWasPolished(true)
    } catch (err) {
      console.error('Polish error:', err)
      setPolishError(err instanceof Error ? err.message : 'Failed to polish text')
      setTimeout(() => setPolishError(null), 5000)
    } finally {
      setIsPolishing(false)
    }
  }

  const handleUndoPolish = () => {
    if (!data.raw_notes) return
    onChange({ ...data, notes: data.raw_notes })
    setWasPolished(false)
  }

  // Helper: get photos for a specific defect (matched by autoDescription = defect label)
  const getDefectPhotos = (defectLabel: string): SurveyPhoto[] => {
    return externalPhotos.filter(
      (p) => p.category === 'external_defect' && p.description === defectLabel
    )
  }

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
                // Single onChange call to avoid stale-prop overwrites
                if (!newValue) {
                  onChange({ ...data, building_defects_found: false, building_defects: [], defect_urgency: undefined })
                } else {
                  onChange({ ...data, building_defects_found: true })
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

          {/* Defect checklist with per-defect photo capture */}
          {hasDefects && (
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-white/80 mb-3">
                Select all defects observed:
              </label>

              <div className="space-y-2">
                {BUILDING_DEFECTS.map((defect) => {
                  const isSelected = isDefectSelected(defect.value)
                  return (
                    <div key={defect.value}>
                      <button
                        onClick={() => toggleDefect(defect.value)}
                        className={`
                          w-full flex items-start gap-3 p-3 rounded-lg text-left
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

                      {/* Per-defect photo capture — shown when defect is selected */}
                      {isSelected && (
                        <div className="ml-8 mt-2 mb-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="w-4 h-4 text-brand-300" />
                            <span className="text-sm font-medium text-white/80">{defect.label}</span>
                          </div>
                          <p className="text-xs text-white/50 mb-3">
                            Photograph this defect. Add a second photo if needed.
                          </p>
                          <PhotoCapture
                            surveyId={surveyId}
                            step="external_inspection"
                            category="external_defect"
                            label={defect.label}
                            maxPhotos={2}
                            existingPhotos={getDefectPhotos(defect.label)}
                            onPhotosChange={onPhotosChange}
                            autoDescription={defect.label}
                          />
                        </div>
                      )}
                    </div>
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

      {/* External Inspection Observations (STT + Polish) */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <FileText className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">External Inspection Observations</h3>
            <p className="text-sm text-white/60">Describe what you observe externally — condition of walls, pointing, DPC, ground levels, drainage.</p>
          </div>
        </div>

        <textarea
          value={data.notes || ''}
          onChange={(e) => {
            handleChange('notes', e.target.value)
            setWasPolished(false)
          }}
          placeholder="Tap record to describe what you see, or type your observations here..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 text-sm mb-4"
        />

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <AudioRecorder
              onTranscriptionComplete={handleTranscription}
              disabled={isPolishing}
            />
          </div>
          <button
            onClick={handlePolish}
            disabled={!data.notes?.trim() || isPolishing}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-white/90"
          >
            {isPolishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>✨</span>
            )}
            {isPolishing ? 'Polishing...' : 'Polish'}
          </button>
        </div>

        {wasPolished && (
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="text-brand-300">✨ Polished</span>
            <button
              onClick={handleUndoPolish}
              className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              Undo
            </button>
          </div>
        )}

        {polishError && (
          <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
            {polishError}
          </div>
        )}
      </div>
    </div>
  )
}
