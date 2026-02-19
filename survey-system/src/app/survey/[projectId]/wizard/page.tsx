'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Save, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import WizardStepper from '@/components/wizard/WizardStepper'
import SiteDetailsStep from '@/components/wizard/SiteDetailsStep'
import ExternalInspectionStep from '@/components/wizard/ExternalInspectionStep'
import {
  SurveyWizardData,
  SiteDetails,
  ExternalInspection,
  AdditionalWorks,
  SurveyRoomRow,
} from '@/types/survey-wizard.types'

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

  // Survey data state
  const [wizardData, setWizardData] = useState<SurveyWizardData>({
    wizard_step: 0,
    wizard_completed: false,
  })

  const [rooms, setRooms] = useState<SurveyRoomRow[]>([])

  // Load existing survey data (placeholder for now)
  useEffect(() => {
    // TODO: Load from Supabase in next iteration
    console.log('Loading survey data for project:', projectId)
  }, [projectId])

  // Auto-save function (stub for now)
  const handleAutoSave = async () => {
    setIsSaving(true)
    console.log('Auto-saving wizard data:', {
      projectId,
      wizardData,
      rooms,
    })

    // TODO: Save to Supabase in next iteration
    // For now, just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setLastSaved(new Date())
    setIsSaving(false)
  }

  // Step validation
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0: // Site Details
        return (
          wizardData.site_details?.inspection_date &&
          wizardData.site_details?.weather_conditions &&
          wizardData.site_details?.temperature_c !== undefined &&
          wizardData.site_details?.property_type &&
          wizardData.site_details?.construction_type &&
          wizardData.site_details?.reported_defect
        )
      case 1: // External Inspection
        return wizardData.external_inspection?.building_defects_found !== undefined
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
      setWizardData({ ...wizardData, wizard_step: nextStep })
      handleAutoSave()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setWizardData({ ...wizardData, wizard_step: prevStep })
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setWizardData({ ...wizardData, wizard_step: stepIndex })
  }

  // Data update handlers
  const handleSiteDetailsChange = (data: Partial<SiteDetails>) => {
    setWizardData({
      ...wizardData,
      site_details: data as SiteDetails,
    })
  }

  const handleExternalInspectionChange = (data: Partial<ExternalInspection>) => {
    setWizardData({
      ...wizardData,
      external_inspection: data as ExternalInspection,
    })
  }

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SiteDetailsStep
            data={wizardData.site_details || {}}
            onChange={handleSiteDetailsChange}
          />
        )
      case 1:
        return (
          <ExternalInspectionStep
            data={wizardData.external_inspection || {}}
            onChange={handleExternalInspectionChange}
          />
        )
      case 2:
        return (
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Room Inspection</h3>
            <p className="text-white/60">Coming soon in next build iteration</p>
          </div>
        )
      case 3:
        return (
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Additional Works</h3>
            <p className="text-white/60">Coming soon in next build iteration</p>
          </div>
        )
      case 4:
        return (
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Review & Submit</h3>
            <p className="text-white/60">Coming soon in next build iteration</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <Link
              href={`/projects/${projectId}`}
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
              <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
              <span className="hidden sm:inline text-sm text-white/70">
                {isSaving ? 'Saving...' : lastSaved ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>

          {/* Last saved timestamp */}
          {lastSaved && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/50">
              <Clock className="w-3 h-3" />
              Last saved at {lastSaved.toLocaleTimeString()}
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
              onClick={() => {
                console.log('Submit wizard')
                // TODO: Final submission logic
              }}
              disabled={!canProceedToNextStep()}
            >
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
