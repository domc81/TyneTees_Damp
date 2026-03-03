'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  User,
  ClipboardList,
  FileText,
  Save,
  Plus,
  CalendarClock,
  Check,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { createSurveyFromForm, updateSurvey, getCustomers } from '@/lib/supabase-data'
import { createBooking } from '@/lib/calendar-data'
import { SlotPicker } from '@/components/calendar/SlotPicker'
import type { SelectedSlot } from '@/components/calendar/SlotPicker'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import type { Customer, SurveyType } from '@/types/database.types'

const SURVEY_TYPE_OPTIONS: { value: SurveyType; label: string }[] = [
  { value: 'damp', label: 'Damp' },
  { value: 'condensation', label: 'Condensation' },
  { value: 'timber', label: 'Timber' },
  { value: 'woodworm', label: 'Woodworm' },
  { value: 'structural', label: 'Structural' },
  { value: 'comprehensive', label: 'Comprehensive' },
]

/** Format "YYYY-MM-DD" for human display: "Mon 3 Mar 2026" */
function formatSlotDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function NewSurveyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedCustomerId = searchParams.get('customerId')
  const { profile } = useAuth()

  const [formData, setFormData] = useState({
    customer_id: preSelectedCustomerId || '',
    survey_type: 'damp' as SurveyType,
    site_address: '',
    site_address_line2: '',
    site_city: '',
    site_county: '',
    site_postcode: '',
    reported_defect: '',
    notes: '',
  })

  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null)
  const [showNoSlotConfirm, setShowNoSlotConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Derive display names for the dropdown
  const customerOptions = useMemo(
    () =>
      customers.map((c) => ({
        id: c.id,
        name: `${c.first_name} ${c.last_name} (${c.email})`,
      })),
    [customers]
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  // Sync customerId from URL into form state (handles return from customer creation)
  useEffect(() => {
    if (preSelectedCustomerId) {
      setFormData((prev) => ({ ...prev, customer_id: preSelectedCustomerId }))
    }
  }, [preSelectedCustomerId])

  // Load customers on component mount
  useEffect(() => {
    async function loadCustomers() {
      try {
        setIsLoadingCustomers(true)
        const customerList = await getCustomers()
        setCustomers(customerList)
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
      router.push('/customers/new?returnTo=survey-new')
    } else {
      handleInputChange('customer_id', value)
    }
  }

  const handleSlotSelected = (slot: SelectedSlot) => {
    setSelectedSlot(slot)
  }

  /** Core submission logic — creates survey, then booking + survey update if a slot is selected */
  const doSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Step 1: Create the survey
      const newSurvey = await createSurveyFromForm({
        customer_id: formData.customer_id,
        site_address: formData.site_address,
        site_address_line2: formData.site_address_line2,
        site_city: formData.site_city,
        site_county: formData.site_county,
        site_postcode: formData.site_postcode,
        survey_type: formData.survey_type,
        status: 'draft',
        notes: formData.notes,
        reported_defect: formData.reported_defect,
      })

      if (!newSurvey) {
        throw new Error('Survey creation returned null')
      }

      // Notify admin/office that a new survey was created (fire-and-forget)
      fetch('/api/notifications/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'survey_created', survey_id: newSurvey.id }),
      }).catch(err => console.error('Notification trigger failed:', err))

      // Step 2: If a slot was selected, create the booking and update the survey
      if (selectedSlot) {
        const customer = customers.find((c) => c.id === formData.customer_id)
        const customerAddress = [
          formData.site_address,
          formData.site_address_line2,
          formData.site_city,
          formData.site_county,
          formData.site_postcode,
        ]
          .filter(Boolean)
          .join(', ')

        try {
          const newBooking = await createBooking({
            surveyId: newSurvey.id,
            surveyorId: selectedSlot.surveyorId,
            customerName: customer
              ? `${customer.first_name} ${customer.last_name}`
              : newSurvey.client_name || 'Unknown',
            customerPhone: customer?.phone || null,
            customerEmail: customer?.email || null,
            customerAddress,
            bookingDate: selectedSlot.date,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
            notes: formData.notes || null,
            createdBy: profile?.id || '',
          })

          // Send booking confirmation email to customer (fire-and-forget)
          fetch('/api/bookings/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: newBooking.id, eventType: 'booking_created' }),
          }).catch((err) => console.error('Booking confirmation email failed:', err))

          // Update the survey record with surveyor_id and survey_date
          await updateSurvey(newSurvey.id, {
            surveyor_id: selectedSlot.surveyorId,
            survey_date: selectedSlot.date,
          })
        } catch (bookingError) {
          // Booking failed — likely a slot collision. Survey is preserved.
          const message =
            bookingError instanceof Error
              ? bookingError.message
              : 'Unknown error'

          if (
            message.includes('exclusion') ||
            message.includes('overlap') ||
            message.includes('conflict')
          ) {
            alert(
              'This time slot was just booked by someone else. Please select a different time.\n\nYour survey has been created — you can add a booking from the calendar.'
            )
          } else {
            alert(
              `Booking could not be created: ${message}\n\nYour survey has been created — you can add a booking later.`
            )
          }
        }
      }

      router.push(`/surveys/${newSurvey.id}`)
    } catch (error) {
      console.error('Survey creation failed:', error)
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error, null, 2)
      alert(`Failed to create survey: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customer_id || !formData.site_address || !formData.site_postcode) {
      alert('Please fill in all required fields')
      return
    }

    // If no slot selected, show soft confirmation before proceeding
    if (!selectedSlot) {
      setShowNoSlotConfirm(true)
      return
    }

    await doSubmit()
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h2 className="text-2xl font-bold text-white mt-2">Book New Survey</h2>
            <p className="text-sm text-white/50">
              Schedule a property survey for a customer
            </p>
          </div>

          <div className="max-w-4xl">
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
                        {customerOptions.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Link
                        href="/customers/new?returnTo=survey-new"
                        className="btn-secondary flex items-center gap-2 w-full justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        Create Customer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Survey Type */}
              <div className="glass-card mt-6">
                <div className="px-6 py-5 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-white/40" />
                    Survey Type
                  </h3>
                </div>
                <div className="p-6">
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Type of Survey <span className="text-red-400 ml-1">*</span>
                    </label>
                    <select
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/15 text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                      value={formData.survey_type}
                      onChange={(e) => handleInputChange('survey_type', e.target.value)}
                    >
                      {SURVEY_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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

              {/* Schedule Survey — SlotPicker */}
              <div className="glass-card mt-6">
                <div className="px-6 py-5 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CalendarClock className="w-5 h-5 text-white/40" />
                    Schedule Survey
                  </h3>
                  <p className="text-sm text-white/40 mt-1">
                    Choose a surveyor and pick an available time slot
                  </p>
                </div>
                <div className="p-6">
                  <SlotPicker
                    onSlotSelected={handleSlotSelected}
                    selectedSlot={selectedSlot}
                  />

                  {/* Confirmation summary when a slot is selected */}
                  {selectedSlot && (
                    <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-300">
                        Booked with{' '}
                        <span className="font-semibold text-white">
                          {selectedSlot.surveyorName}
                        </span>{' '}
                        on{' '}
                        <span className="font-semibold text-white">
                          {formatSlotDate(selectedSlot.date)}
                        </span>{' '}
                        at{' '}
                        <span className="font-semibold text-white">
                          {selectedSlot.startTime} – {selectedSlot.endTime}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end mt-8">
                <div className="flex items-center gap-4">
                  <Link href="/" className="btn-secondary flex items-center gap-2">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Book Survey
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* No-slot confirmation modal */}
        {showNoSlotConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="glass-card max-w-md mx-4 shadow-2xl">
              <div className="p-6 text-center space-y-4">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-semibold text-white">
                  No time slot selected
                </h3>
                <p className="text-sm text-white/60">
                  The survey will be created without a booking. You can schedule a
                  time later from the calendar.
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNoSlotConfirm(false)}
                    className="btn-secondary px-4 py-2"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setShowNoSlotConfirm(false)
                      doSubmit()
                    }}
                    className="btn-primary px-4 py-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                        Creating...
                      </>
                    ) : (
                      'Create Without Booking'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-4" />
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      }
    >
      <NewSurveyContent />
    </Suspense>
  )
}
