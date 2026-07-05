'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Save, Loader2, AlertCircle, CheckCircle2, WifiOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useSmartBack } from '@/hooks/useSmartBack'
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
import { loadSurveyPhotosLocalFirst } from '@/lib/offline/photos-offline'
import {
  loadWizardDataLocalFirst,
  saveWizardLocal,
  enqueueCompletionOps,
  NotAvailableOfflineError,
} from '@/lib/offline/local-data'
import { syncNow, onRemoteIdsMapped } from '@/lib/offline/sync-engine'
import { onAudioTranscribed, deepReplaceString } from '@/lib/offline/audio-offline'
import { SyncStatusPill } from '@/components/offline/SyncStatusPill'
import { useSyncStatus } from '@/hooks/useSyncStatus'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
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
  const goBack = useSmartBack(`/surveys/${projectId}`)
  const { role } = useAuth()
  const syncStatus = useSyncStatus(projectId)

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const [projectNumber, setProjectNumber] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notAvailableOffline, setNotAvailableOffline] = useState(false)

  // Enquiry id captured at load time — needed to enqueue the offline
  // survey-complete transition without a live lookup.
  const enquiryIdRef = useRef<string | null>(null)

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

  // Load existing survey data — local-first (mirror when ahead of/offline from
  // the server, fresh fetch when online and clean). Never returns blank
  // defaults for an offline miss (that would risk clobbering real data).
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError(null)
      setNotAvailableOffline(false)

      try {
        const { wizardData, rooms, photos, projectNumber, enquiryId } =
          await loadWizardDataLocalFirst(projectId)

        setWizardData(wizardData)
        setRooms(rooms)
        setPhotos(photos)
        setProjectNumber(projectNumber)
        setCurrentStep(wizardData.wizard_step || 0)
        enquiryIdRef.current = enquiryId
      } catch (err) {
        if (err instanceof NotAvailableOfflineError) {
          setNotAvailableOffline(true)
        } else {
          console.error('Failed to load wizard data:', err)
          setError('Failed to load survey data. Please refresh the page.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [projectId])

  // When the sync engine flushes rooms and maps temp ids → DB ids, patch the
  // open wizard's in-memory rooms/photos so subsequent saves reference DB ids.
  useEffect(() => {
    return onRemoteIdsMapped(projectId, (mapping) => {
      setRooms((prev) =>
        prev.map((room) =>
          mapping[room.id] ? { ...room, id: mapping[room.id], survey_id: projectId } : room
        )
      )
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.room_id && mapping[photo.room_id]
            ? { ...photo, room_id: mapping[photo.room_id] }
            : photo
        )
      )
    })
  }, [projectId])

  // When a queued voice note transcribes, patch the open wizard's in-memory
  // state so the placeholder becomes the transcript (and a later save doesn't
  // overwrite the mirror's transcript with the stale placeholder).
  useEffect(() => {
    return onAudioTranscribed(projectId, ({ placeholderText, transcript }) => {
      setWizardData((prev) => deepReplaceString(prev, placeholderText, transcript))
      setRooms((prev) => deepReplaceString(prev, placeholderText, transcript))
    })
  }, [projectId])

  // Local-first save: writes to IndexedDB + enqueues durable sync ops (fast,
  // never blocks on the network). Temp-room-id reconciliation now happens in the
  // sync engine (onRemoteIdsMapped patches state when rooms flush). A throw here
  // means a device storage/quota error, not a network error.
  const handleAutoSave = useCallback(async () => {
    if (isSaving) return // Prevent concurrent saves

    setIsSaving(true)

    try {
      await saveWizardLocal(projectId, wizardDataRef.current, roomsRef.current)
    } catch (err) {
      console.error('Local save failed:', err)
      setError('Device storage error — do not continue, contact office.')
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
      case 2: // Room Inspection — require at least one room
        return rooms.length > 0
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
      handleAutoSave() // Save immediately on back navigation (matches handleNext)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    const updatedData = { ...wizardData, wizard_step: stepIndex }
    setWizardData(updatedData)
    handleAutoSave() // Save immediately on step click
  }

  // Final submission handler — fully offline-capable. Saves locally with
  // wizard_completed:true (flips mirror + surveys.status on flush) and enqueues
  // the enquiry transition + completion notification as durable ops.
  const handleCompleteSurvey = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const completedData = { ...wizardData, wizard_completed: true }
      await saveWizardLocal(projectId, completedData, rooms)
      await enqueueCompletionOps(projectId, enquiryIdRef.current)

      setWizardData(completedData)

      // Surveyors get a confirmation screen (costing is office work); the sync
      // engine flushes in the background. Office/admin are online — wait for the
      // flush so costing loads with the completed survey.
      if (role === 'surveyor') {
        void syncNow()
        setCompleted(true)
        setIsSaving(false)
      } else {
        await syncNow()
        router.push(`/survey/${projectId}/costing`)
      }
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

  const handleCommentsChange = (value: string) => {
    setWizardData({
      ...wizardData,
      surveyor_additional_comments: value,
    })
    triggerDebouncedSave()
  }

  const handleProposalItemsChange = (items: string[]) => {
    setWizardData({
      ...wizardData,
      proposal_items: items,
    })
    triggerDebouncedSave()
  }

  const handleProposalCommentsChange = (value: string) => {
    setWizardData({
      ...wizardData,
      proposal_comments: value,
    })
    triggerDebouncedSave()
  }

  const handleLimitationsChange = (items: string[]) => {
    setWizardData({
      ...wizardData,
      limitations: items,
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
      const loadedPhotos = await loadSurveyPhotosLocalFirst(projectId)
      setPhotos(loadedPhotos)
    } catch (err) {
      console.error('Failed to reload photos:', err)
    }
  }, [projectId])

  // Compute flags for AdditionalWorksStep
  const hasCondensation = rooms.some((r) => r.issues_identified?.includes('condensation'))
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
            hasDampTimberOrWoodworm={hasDampTimberOrWoodworm}
          />
        )
      case 4:
        return <ReviewStep wizardData={wizardData} rooms={rooms} onCommentsChange={handleCommentsChange} onProposalItemsChange={handleProposalItemsChange} onProposalCommentsChange={handleProposalCommentsChange} onLimitationsChange={handleLimitationsChange} />
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

  // Survey not downloaded and no signal to fetch it
  if (notAvailableOffline) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md w-full text-center space-y-5">
              <WifiOff className="w-16 h-16 text-amber-400 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Survey not downloaded</h2>
                <p className="text-sm text-white/60">
                  This survey isn&apos;t downloaded to this device yet. Connect to signal and it
                  will download automatically — then reopen it here.
                </p>
              </div>
              <Link href="/surveys" className="btn-primary w-full py-2.5 text-sm text-center inline-block">
                Back to My Surveys
              </Link>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  // Post-submit confirmation (surveyor role)
  if (completed) {
    const stillSyncing =
      syncStatus.pendingData + syncStatus.pendingPhotos + syncStatus.pendingAudio > 0
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md w-full text-center space-y-5">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Survey Submitted</h2>
                <p className="text-sm text-white/60">
                  {projectNumber ? `Survey ${projectNumber} is complete. ` : 'Your survey is complete. '}
                  The office team will prepare the costing, report and quotation.
                </p>
              </div>
              {stillSyncing ? (
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Waiting for signal to send — keep the app installed and it will sync automatically
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Synced ✓
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Link href="/surveys" className="btn-primary w-full py-2.5 text-sm text-center">
                  Back to My Surveys
                </Link>
                <Link
                  href={`/survey/${projectId}/costing`}
                  className="btn-secondary w-full py-2.5 text-sm text-center"
                >
                  View Costing
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h2 className="text-2xl font-bold text-white mt-2">Survey Wizard</h2>
              <p className="text-sm text-white/60">{projectNumber ?? `Project #${projectId.slice(0, 8)}`}</p>
            </div>
            <div className="flex items-center gap-3">
              <SyncStatusPill surveyId={projectId} />
              <button
                onClick={async () => {
                  await handleAutoSave()
                  void syncNow()
                }}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/70"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/30">
              <AlertCircle className="w-4 h-4 text-red-300" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <div className="max-w-5xl">
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

        {/* Pending voice-note warning on the Review step */}
        {currentStep === WIZARD_STEPS.length - 1 && syncStatus.pendingAudio > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-300">
              {syncStatus.pendingAudio} voice note{syncStatus.pendingAudio > 1 ? 's' : ''} not yet
              transcribed — the text will be added automatically when back in signal. You can still
              complete the survey now.
            </p>
          </div>
        )}

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
      </Layout>
    </ProtectedRoute>
  )
}
