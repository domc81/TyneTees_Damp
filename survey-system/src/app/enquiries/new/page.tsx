'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  User,
  MapPin,
  Calendar,
} from 'lucide-react'

const surveyTypes = [
  { value: 'damp', label: 'Damp Survey', description: 'Rising damp, penetrating damp, tanking' },
  { value: 'timber', label: 'Timber Survey', description: 'Structural timber, decay analysis' },
  { value: 'woodworm', label: 'Woodworm Survey', description: 'Beetle infestation, treatment planning' },
  { value: 'condensation', label: 'Condensation Survey', description: 'Ventilation, moisture control' },
  { value: 'structural', label: 'Structural Survey', description: 'Structural movement, wall ties' },
  { value: 'comprehensive', label: 'Comprehensive', description: 'Full property survey' },
]

export default function NewEnquiryPage() {
  const router = useRouter()

  const [step, setStep] = useState<'client' | 'site' | 'booking'>('client')

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    site_address_1: '',
    site_address_2: '',
    site_address_3: '',
    site_city: '',
    site_county: '',
    site_postcode: '',
    survey_type: 'damp' as const,
    proposed_survey_date: '',
    source: '',
    notes: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating enquiry:', formData)
    router.push('/enquiries')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/enquiries" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">New Enquiry</h1>
            <p className="text-sm text-white/50">Create new enquiry and assign surveyor</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          <ProgressStep number="1" label="Client" active={step === 'client'} />
          <div className="h-1 w-16 bg-white/10 rounded" />
          <ProgressStep number="2" label="Site" active={step === 'site'} />
          <div className="h-1 w-16 bg-white/10 rounded" />
          <ProgressStep number="3" label="Booking" active={step === 'booking'} />
        </div>

        <form onSubmit={handleSubmit}>
          {step === 'client' && (
            <div className="glass-card animate-in">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-white/40" />
                  Client Information
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Client Name *"
                    value={formData.client_name}
                    onChange={(v) => handleInputChange('client_name', v)}
                    required
                  />
                  <FormField
                    label="Email"
                    type="email"
                    value={formData.client_email}
                    onChange={(v) => handleInputChange('client_email', v)}
                  />
                </div>
                <FormField
                  label="Phone Number"
                  type="tel"
                  value={formData.client_phone}
                  onChange={(v) => handleInputChange('client_phone', v)}
                />
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-end">
                <button type="button" onClick={() => setStep('site')} className="btn-primary flex items-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'site' && (
            <div className="glass-card animate-in">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white/40" />
                  Site Address
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <FormField
                  label="Address Line 1 *"
                  value={formData.site_address_1}
                  onChange={(v) => handleInputChange('site_address_1', v)}
                  required
                />
                <FormField
                  label="Address Line 2"
                  value={formData.site_address_2}
                  onChange={(v) => handleInputChange('site_address_2', v)}
                />
                <FormField
                  label="Address Line 3"
                  value={formData.site_address_3}
                  onChange={(v) => handleInputChange('site_address_3', v)}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="City"
                    value={formData.site_city}
                    onChange={(v) => handleInputChange('site_city', v)}
                  />
                  <FormField
                    label="County"
                    value={formData.site_county}
                    onChange={(v) => handleInputChange('site_county', v)}
                  />
                  <FormField
                    label="Postcode *"
                    value={formData.site_postcode}
                    onChange={(v) => handleInputChange('site_postcode', v.toUpperCase())}
                    required
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-between">
                <button type="button" onClick={() => setStep('client')} className="btn-secondary">
                  Back
                </button>
                <button type="button" onClick={() => setStep('booking')} className="btn-primary flex items-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'booking' && (
            <div className="glass-card animate-in">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white/40" />
                  Booking Details
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Survey Type *</label>
                  <select
                    value={formData.survey_type}
                    onChange={(e) => handleInputChange('survey_type', e.target.value)}
                    className="input-select"
                  >
                    {surveyTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <FormField
                  label="Proposed Survey Date"
                  type="date"
                  value={formData.proposed_survey_date}
                  onChange={(v) => handleInputChange('proposed_survey_date', v)}
                />

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    className="input-select"
                  >
                    <option value="">Select source...</option>
                    <option value="website">Website</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="referral">Referral</option>
                    <option value="repeat">Repeat Customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Additional notes for the surveyor..."
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-between">
                <button type="button" onClick={() => setStep('site')} className="btn-secondary">
                  Back
                </button>
                <div className="flex gap-3">
                  <button type="button" className="btn-ghost">Save Draft</button>
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Enquiry
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

function ProgressStep({ number, label, active }: { number: string; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? 'text-brand-400' : 'text-white/40'}`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                         ${active ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30' : 'bg-white/10 text-white/50'}`}>
        {number}
      </span>
      <span className="font-medium">{label}</span>
    </div>
  )
}

interface FormFieldProps {
  label: string
  required?: boolean
  type?: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

function FormField({ label, required, type = 'text', value, onChange, multiline = false, placeholder }: FormFieldProps) {
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
