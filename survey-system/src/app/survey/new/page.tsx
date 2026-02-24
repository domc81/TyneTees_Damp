'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  User,
  ClipboardList,
  FileText,
  Save,
  Plus,
} from 'lucide-react'
import { createProjectFromForm } from '@/lib/supabase-data'

function NewSurveyContent() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    customer_id: '',
    site_address: '',
    site_address_line2: '',
    site_city: '',
    site_county: '',
    site_postcode: '',
    reported_defect: '',
    notes: '',
  })

  const [customers, setCustomers] = useState<{id: string, name: string}[]>([])
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  // Load customers on component mount
  useEffect(() => {
    async function loadCustomers() {
      try {
        setIsLoadingCustomers(true)
        const { getCustomers } = await import('@/lib/supabase-data')
        const customerList = await getCustomers()

        const formattedCustomers = customerList.map(customer => ({
          id: customer.id,
          name: `${customer.first_name} ${customer.last_name} (${customer.email})`
        }))

        setCustomers(formattedCustomers)
      } catch (error) {
        console.error('Error loading customers:', error)
      } finally {
        setIsLoadingCustomers(false)
      }
    }

    loadCustomers()
  }, [])

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'new') {
      router.push('/customers/new')
    } else {
      handleInputChange('customer_id', value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customer_id || !formData.site_address || !formData.site_postcode) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const newProject = await createProjectFromForm({
        customer_id: formData.customer_id,
        site_address: formData.site_address,
        site_address_line2: formData.site_address_line2,
        site_city: formData.site_city,
        site_county: formData.site_county,
        site_postcode: formData.site_postcode,
        survey_type: 'damp',
        status: 'draft',
        notes: formData.notes,
        reported_defect: formData.reported_defect,
      })

      if (!newProject) {
        throw new Error('Survey creation returned null')
      }

      router.push(`/projects/${newProject.id}`)
    } catch (error) {
      console.error('Survey creation failed:', error)
      const errorMessage = error instanceof Error
        ? error.message
        : JSON.stringify(error, null, 2)
      alert(`Failed to book survey: ${errorMessage}`)
    }
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
            <h1 className="text-xl font-bold text-white">Book New Survey</h1>
            <p className="text-sm text-white/50">Schedule a property survey for a customer</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <form onSubmit={handleSubmit} className="animate-in slide-up-in">

          {/* Customer Selection */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-white/40" />
                Customer
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Select Customer <span className="text-red-400 ml-1">*</span>
                  </label>
                  <select
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                    value={formData.customer_id}
                    onChange={handleCustomerChange}
                    required
                    disabled={isLoadingCustomers}
                  >
                    <option value="">Select a customer</option>
                    <option value="new">+ Create New Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Link
                    href="/customers/new"
                    className="btn-secondary flex items-center gap-2 w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Create Customer
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Site Address */}
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

          {/* Reported Defect */}
          <div className="glass-card mt-6">
            <div className="px-6 py-5 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-white/40" />
                Reported Defect
              </h3>
            </div>
            <div className="p-6">
              <FormField
                label="What has the customer described?"
                value={formData.reported_defect}
                onChange={(v) => handleInputChange('reported_defect', v)}
                placeholder="e.g., Damp patches on the living room wall, musty smell in the cellar, black mould in the bathroom..."
                multiline
              />
            </div>
          </div>

          {/* Scheduling Notes */}
          <div className="glass-card mt-6">
            <div className="px-6 py-5 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-white/40" />
                Scheduling Notes
              </h3>
            </div>
            <div className="p-6">
              <FormField
                label="Notes"
                value={formData.notes}
                onChange={(v) => handleInputChange('notes', v)}
                placeholder="Preferred dates, access instructions, anything the surveyor should know..."
                multiline
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end mt-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="btn-secondary flex items-center gap-2">
                Cancel
              </Link>
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Book Survey
              </button>
            </div>
          </div>
        </form>
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
