'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Save, Clock, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import WizardStepper from '@/components/wizard/WizardStepper'
import SiteDetailsStep from '@/components/wizard/SiteDetailsStep'
import ExternalInspectionStep from '@/components/wizard/ExternalInspectionStep'
import RoomInspectionStep from '@/components/wizard/RoomInspectionStep'
import AdditionalWorksStep from '@/components/wizard/AdditionalWorksStep'
import ReviewStep from '@/components/wizard/ReviewStep'
import {
  SurveyWizardData,
  SiteDetails,
  ExternalInspection,
  AdditionalWorks,
  SurveyRoomRow,
} from '@/types/survey-wizard.types'
import {
  loadWizardData,
  saveWizardData,
  saveAllRooms,
} from '@/lib/survey-wizard-data'
import { loadSurveyPhotos } from '@/lib/survey-photo-service'
import type { SurveyPhoto } from '@/types/survey-photo.types'

const WIZARD_STEPS = [
  { label: 'Site Details', description: 'Property & inspection info' },
  { label: 'External Inspection', description: 'Building defects' },
  { label: 'Room Inspection', description: 'Room-by-room survey' },
  { label: 'Additional Works', description: 'Whole-property items' },
  { label: 'Review', description: 'Summary & submit' },
]

export default function SurveyWizardPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Survey data state
  const [wizardData, setWizardData] = useState<SurveyWizardData>({
    wizard_step: 0,
    wizard_completed: false,
  })

  const [rooms, setRooms] = useState<SurveyRoomRow[]>([])
  const [photos, setPhotos] = useState<SurveyPhoto[]>([])

  // Debounce timer ref
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Refs to always hold the latest state (fixes stale closure bug)
  const roomsRef = useRef<SurveyRoomRow[]>(rooms)
  const wizardDataRef = useRef<SurveyWizardData>(wizardData)

  // Keep refs in sync with state
  useEffect(() => {
    roomsRef.current = rooms
  }, [rooms])

  useEffect(() => {
    wizardDataRef.current = wizardData
  }, [wizardData])

  // Load existing survey data from Supabase
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError(null)

      try {
        const { wizardData: loadedWizardData, rooms: loadedRooms } =
          await loadWizardData(projectId)

        setWizardData(loadedWizardData)
        setRooms(loadedRooms)
        setCurrentStep(loadedWizardData.wizard_step || 0)

        // Load photos
        const loadedPhotos = await loadSurveyPhotos(projectId)
        setPhotos(loadedPhotos)
      } catch (err) {
        console.error('Failed to load wizard data:', err)
        setError('Failed to load survey data. Please refresh the page.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [projectId])

  // Auto-save function with actual Supabase calls
  const handleAutoSave = useCallback(async () => {
    if (isSaving) return // Prevent concurrent saves

    setIsSaving(true)
    setError(null)

    try {
      // Save wizard data (property-level) - read from ref to get latest value
      await saveWizardData(projectId, wizardDataRef.current)

      // Save all rooms (batch operation) - read from ref to get latest value
      const updatedRooms = await saveAllRooms(projectId, roomsRef.current)

      // Only update IDs that changed (temp → DB), preserve any new rooms added during save
      setRooms(prev => prev.map(room => {
        if (room.id.startsWith('room-')) {
          const saved = updatedRooms.find(r => r.name === room.name && r.display_order === room.display_order)
          return saved ? { ...room, id: saved.id, survey_id: saved.survey_id, created_at: saved.created_at, updated_at: saved.updated_at } : room
        }
        return room
      }))

      setLastSaved(new Date())
      console.log('Auto-save completed successfully')
    } catch (err) {
      console.error('Auto-save failed:', err)
      setError('Failed to save changes. Your data may not be saved.')
    } finally {
      setIsSaving(false)
    }
  }, [projectId, isSaving])

  // Debounced auto-save (2 seconds)
  const triggerDebouncedSave = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current)
    }

    saveTimerRef.current = setTimeout(() => {
      handleAutoSave()
    }, 2000)
  }, [handleAutoSave])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
    }
  }, [])

  // Step validation
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0: // Site Details
        return (
          wizardData.site_details?.inspection_date &&
          wizardData.site_details?.weather_conditions &&
          wizardData.site_details?.temperature_c !== undefined &&
          wizardData.site_details?.property_type &&
          wizardData.site_details?.construction_type
        )
      case 1: { // External Inspection — valid when no defects, or defects toggled on with at least one selected
        const ext = wizardData.external_inspection
        if (!ext?.building_defects_found) return true
        return (ext.building_defects?.length ?? 0) > 0
      }
      case 2: // Room Inspection
        return true // TODO: Add room validation in next iteration
      case 3: // Additional Works
        return true // TODO: Add validation in next iteration
      case 4: // Review
        return true
      default:
        return false
    }
  }

  // Navigation handlers
  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < WIZARD_STEPS.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      const updatedData = { ...wizardData, wizard_step: nextStep }
      setWizardData(updatedData)
      handleAutoSave() // Save immediately on navigation
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      const updatedData = { ...wizardData, wizard_step: prevStep }
      setWizardData(updatedData)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    const updatedData = { ...wizardData, wizard_step: stepIndex }
    setWizardData(updatedData)
  }

  // Final submission handler
  const handleCompleteSurvey = async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Save everything first
      const completedData = { ...wizardData, wizard_completed: true }
      await saveWizardData(projectId, completedData)
      await saveAllRooms(projectId, rooms)

      setWizardData(completedData)
      setLastSaved(new Date())

      // Redirect to costing review page
      router.push(`/survey/${projectId}/costing`)
    } catch (err) {
      console.error('Failed to complete survey:', err)
      setError('Failed to save survey. Please try again.')
      setIsSaving(false)
    }
  }

  // Data update handlers (with debounced auto-save)
  const handleSiteDetailsChange = (data: Partial<SiteDetails>) => {
    setWizardData({
      ...wizardData,
      site_details: data as SiteDetails,
    })
    triggerDebouncedSave()
  }

  const handleExternalInspectionChange = (data: Partial<ExternalInspection>) => {
    setWizardData({
      ...wizardData,
      external_inspection: data as ExternalInspection,
    })
    triggerDebouncedSave()
  }

  const handleAdditionalWorksChange = (data: Partial<AdditionalWorks>) => {
    setWizardData({
      ...wizardData,
      additional_works: data as AdditionalWorks,
    })
    triggerDebouncedSave()
  }

  // Room update handler (with debounced auto-save)
  const handleRoomsChange = (updatedRooms: SurveyRoomRow[]) => {
    setRooms(updatedRooms)
    triggerDebouncedSave()
  }

  // Photos change handler (reload from DB)
  const handlePhotosChange = useCallback(async () => {
    try {
      const loadedPhotos = await loadSurveyPhotos(projectId)
      setPhotos(loadedPhotos)
    } catch (err) {
      console.error('Failed to reload photos:', err)
    }
  }, [projectId])

  // Compute flags for AdditionalWorksStep
  const hasCondensation = rooms.some((r) => r.issues_identified?.includes('condensation'))
  const hasTimberOrDamp = rooms.some((r) =>
    r.issues_identified?.some((i) => i === 'damp' || i === 'timber_decay')
  )
  const hasDampTimberOrWoodworm = rooms.some((r) =>
    r.issues_identified?.some((i) => i === 'damp' || i === 'timber_decay' || i === 'woodworm')
  )

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SiteDetailsStep
            data={wizardData.site_details || {}}
            onChange={handleSiteDetailsChange}
            surveyId={projectId}
            photos={photos}
            onPhotosChange={handlePhotosChange}
          />
        )
      case 1:
        return (
          <ExternalInspectionStep
            data={wizardData.external_inspection || {}}
            onChange={handleExternalInspectionChange}
            surveyId={projectId}
            photos={photos}
            onPhotosChange={handlePhotosChange}
          />
        )
      case 2:
        return (
          <RoomInspectionStep
            rooms={rooms}
            onRoomsChange={handleRoomsChange}
            surveyId={projectId}
            photos={photos}
            onPhotosChange={handlePhotosChange}
          />
        )
      case 3:
        return (
          <AdditionalWorksStep
            data={wizardData.additional_works || {}}
            onChange={handleAdditionalWorksChange}
            hasCondensation={hasCondensation}
            hasTimberOrDamp={hasTimberOrDamp}
            hasDampTimberOrWoodworm={hasDampTimberOrWoodworm}
          />
        )
      case 4:
        return <ReviewStep wizardData={wizardData} rooms={rooms} />
      default:
        return null
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-300 animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading survey data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <Link
              href={`/surveys/${projectId}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Survey</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Wizard</h1>
              <p className="text-sm text-white/60">Project #{projectId.slice(0, 8)}</p>
            </div>

            {/* Save indicator */}
            <button
              onClick={handleAutoSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-sm text-white/70">
                {isSaving ? 'Saving...' : lastSaved ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>

          {/* Last saved timestamp */}
          {lastSaved && !error && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/50">
              <Clock className="w-3 h-3" />
              Last saved at {lastSaved.toLocaleTimeString()}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-center justify-center gap-2 mt-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-400/30">
              <AlertCircle className="w-4 h-4 text-red-300" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Stepper */}
        <div className="mb-8">
          <WizardStepper
            currentStep={currentStep}
            steps={WIZARD_STEPS}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Step content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="text-sm text-white/60">
            Step {currentStep + 1} of {WIZARD_STEPS.length}
          </div>

          {currentStep < WIZARD_STEPS.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleCompleteSurvey}
              disabled={!canProceedToNextStep() || isSaving}
              className="flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Complete Survey
            </Button>
          )}
        </div>

        {/* Validation message */}
        {!canProceedToNextStep() && currentStep === 0 && (
          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
            <p className="text-sm text-amber-300 text-center">
              Please complete all required fields (*) before proceeding
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
