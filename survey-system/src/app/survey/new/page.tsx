'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Droplets,
  Bug,
  Wind,
  Thermometer,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  Cloud,
  ClipboardList,
  Camera,
  Save,
  ChevronRight,
  Check,
} from 'lucide-react'
import type { SurveyType } from '@/types/database.types'
import { createProject } from '@/lib/store'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string; gradient: string; label: string; description: string }> = {
  damp: {
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    gradient: 'from-blue-900/40 to-blue-800/30',
    label: 'Damp Survey',
    description: 'Rising damp, penetrating damp, and damp proofing solutions',
  },
  timber: {
    icon: Bug,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    gradient: 'from-amber-900/40 to-amber-800/30',
    label: 'Timber Survey',
    description: 'Structural timber assessment and decay analysis',
  },
  woodworm: {
    icon: Bug,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    gradient: 'from-amber-950/50 to-amber-900/40',
    label: 'Woodworm Survey',
    description: 'Beetle infestation identification and treatment planning',
  },
  condensation: {
    icon: Wind,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 border-cyan-200',
    gradient: 'from-cyan-900/40 to-cyan-800/30',
    label: 'Condensation Survey',
    description: 'Ventilation assessment and moisture analysis',
  },
}

const weatherConditions = [
  'Dry',
  'Light Rain',
  'Heavy Rain',
  'Overcast',
  'Humid',
  'Cold/Frosty',
  'Hot/Sunny',
  'Variable',
]

function NewSurveyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  // If type is in URL, skip to details step
  const initialStep = typeParam ? 'details' : 'type'
  const initialType = typeParam as SurveyType | null

  const [step, setStep] = useState<'type' | 'details'>(initialStep)
  const [selectedType, setSelectedType] = useState<SurveyType | null>(initialType)
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    site_address: '',
    site_address_line2: '',
    site_city: '',
    site_county: '',
    site_postcode: '',
    survey_type: (typeParam as SurveyType) || '' as SurveyType,
    weather_conditions: '',
    survey_date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const handleTypeSelect = (type: SurveyType) => {
    setSelectedType(type)
    setFormData({ ...formData, survey_type: type })
    setStep('details')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.client_name || !formData.site_address || !formData.site_postcode || !formData.survey_type) {
      alert('Please fill in all required fields')
      return
    }

    // Create the project
    const newProject = createProject({
      client_name: formData.client_name,
      client_email: formData.client_email,
      client_phone: formData.client_phone,
      site_address: formData.site_address,
      site_address_line2: formData.site_address_line2,
      site_city: formData.site_city,
      site_county: formData.site_county,
      site_postcode: formData.site_postcode,
      survey_type: formData.survey_type,
      status: 'draft',
      weather_conditions: formData.weather_conditions,
      survey_date: formData.survey_date,
      notes: formData.notes,
    })

    // Redirect to the new project
    router.push(`/projects/${newProject.id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">New Survey</h1>
            <p className="text-sm text-white/50">Create a new property survey</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${step === 'type' ? 'text-brand-400' : 'text-white/90'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                ${step === 'type' ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30' : 'bg-white/10 text-white/50'}`}>
                {step === 'details' ? '✓' : '1'}
              </span>
              <span className="font-medium">Survey Type</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30" />
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-brand-400' : 'text-white/40'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                ${step === 'details' ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30' : 'bg-white/10 text-white/50'}`}>
                2
              </span>
              <span className="font-medium">Property Details</span>
            </div>
          </div>
        </div>

        {step === 'type' ? (
          /* Step 1: Survey Type Selection */
          <div className="animate-in">
            <h2 className="text-2xl font-bold text-white mb-2">Choose Survey Type</h2>
            <p className="text-white/50 mb-6">Select the type of survey you need to conduct</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(surveyTypeConfig).map(([key, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={key}
                    onClick={() => handleTypeSelect(key as SurveyType)}
                    className={`p-6 rounded-xl border border-white/10 transition-all duration-300 text-left
                               hover:shadow-lg hover:-translate-y-1 hover:border-white/20
                               bg-gradient-to-br ${config.gradient} backdrop-blur-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-white ${config.color}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{config.label}</h3>
                        <p className="text-sm text-white/70 mt-1">{config.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          /* Step 2: Property Details Form */
          <form onSubmit={handleSubmit} className="animate-in slide-up-in">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${surveyTypeConfig[selectedType!]?.gradient}`}>
                {selectedType && (() => {
                  const Icon = surveyTypeConfig[selectedType].icon
                  return <Icon className={`w-5 h-5 ${surveyTypeConfig[selectedType].color}`} />
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Property Details</h2>
                <p className="text-white/50">
                  Enter the client and site information for this {surveyTypeConfig[selectedType!]?.label.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-white/40" />
                  Client Information
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Client Name"
                  required
                  value={formData.client_name}
                  onChange={(v) => handleInputChange('client_name', v)}
                  placeholder="Enter client name"
                />
                <FormField
                  label="Email Address"
                  type="email"
                  value={formData.client_email}
                  onChange={(v) => handleInputChange('client_email', v)}
                  placeholder="client@example.com"
                />
                <FormField
                  label="Phone Number"
                  type="tel"
                  value={formData.client_phone}
                  onChange={(v) => handleInputChange('client_phone', v)}
                  placeholder="+44 1234 567890"
                />
              </div>
            </div>

            <div className="glass-card mt-6">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white/40" />
                  Site Address
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <FormField
                  label="Property Address"
                  required
                  value={formData.site_address}
                  onChange={(v) => handleInputChange('site_address', v)}
                  placeholder="House name or number and street"
                />
                <FormField
                  label="Address Line 2"
                  value={formData.site_address_line2}
                  onChange={(v) => handleInputChange('site_address_line2', v)}
                  placeholder="(Optional)"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Town/City"
                    value={formData.site_city}
                    onChange={(v) => handleInputChange('site_city', v)}
                    placeholder="Newcastle"
                  />
                  <FormField
                    label="County"
                    value={formData.site_county}
                    onChange={(v) => handleInputChange('site_county', v)}
                    placeholder="Tyne and Wear"
                  />
                  <FormField
                    label="Postcode"
                    required
                    value={formData.site_postcode}
                    onChange={(v) => handleInputChange('site_postcode', v.toUpperCase())}
                    placeholder="NE1 4LP"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card mt-6">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-white/40" />
                  Survey Details
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Survey Date"
                  type="date"
                  required
                  value={formData.survey_date}
                  onChange={(v) => handleInputChange('survey_date', v)}
                />
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Weather Conditions</label>
                  <select
                    value={formData.weather_conditions}
                    onChange={(e) => handleInputChange('weather_conditions', e.target.value)}
                    className="input-select"
                  >
                    <option value="">Select conditions...</option>
                    {weatherConditions.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
                <FormField
                  label="Notes"
                  value={formData.notes}
                  onChange={(v) => handleInputChange('notes', v)}
                  placeholder="Additional notes or instructions"
                  multiline
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep('type')}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-4">
                <button type="button" className="btn-ghost">
                  Save Draft
                </button>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Create Survey
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// Form Field Component
function FormField({
  label,
  required = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string
  required?: boolean
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
}) {
  const input = multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="input-field resize-none"
    />
  ) : (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input-field"
    />
  )

  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {input}
    </div>
  )
}

export default function NewSurveyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <NewSurveyContent />
    </Suspense>
  )
}
