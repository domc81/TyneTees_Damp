'use client'

import { Suspense, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Phone, MapPin, Save, Loader2 } from 'lucide-react'
import { createCustomer } from '@/lib/supabase-data'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const titleOptions = [
  { value: '', label: 'None' },
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
  { value: 'Other', label: 'Other' },
]

function NewCustomerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo')
  const returnToRef = useRef(returnTo)

  const [formData, setFormData] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    emailAddress: '',
    contactNumber: '',
    secondaryContact: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postCode: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) { setError('First name is required.'); return false }
    if (!formData.lastName.trim()) { setError('Last name is required.'); return false }
    if (!formData.emailAddress.trim()) { setError('Email is required.'); return false }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.emailAddress)) { setError('Please enter a valid email address.'); return false }
    if (!formData.contactNumber.trim()) { setError('Phone number is required.'); return false }
    if (!formData.address1.trim()) { setError('Address line 1 is required.'); return false }
    if (!formData.city.trim()) { setError('City is required.'); return false }
    if (!formData.postCode.trim()) { setError('Postcode is required.'); return false }
    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const newCustomer = await createCustomer({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.emailAddress,
        phone: formData.contactNumber,
        mobile: formData.secondaryContact || undefined,
        address_line1: formData.address1,
        address_line2: formData.address2 || undefined,
        city: formData.city,
        county: formData.county || undefined,
        postcode: formData.postCode,
        notes: formData.notes || undefined,
      })

      // Redirect based on where the user came from
      const destination = returnToRef.current
      if (destination === 'survey-new') {
        window.location.href = `/survey/new?customerId=${newCustomer.id}`
      } else {
        router.push(`/customers/${newCustomer.id}`)
      }
    } catch (err) {
      console.error('Error creating customer:', err)
      if (err instanceof Error) {
        setError(`Failed to create customer: ${err.message}`)
      } else {
        setError('Failed to create customer: Unknown error')
      }
      setIsSubmitting(false)
    }
  }

  const backHref = returnTo === 'survey-new' ? '/survey/new' : '/customers'

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {returnTo === 'survey-new' ? 'Back to New Survey' : 'Back to Customers'}
            </Link>
            <h2 className="text-2xl font-bold text-white mt-2">New Customer</h2>
            <p className="text-sm text-white/60">Create a new customer record</p>
          </div>

          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="glass-card">
                <div className="px-6 py-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-white/40" />
                    Personal Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                      <select
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="input-select"
                      >
                        {titleOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="glass-card">
                <div className="px-6 py-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-white/40" />
                    Contact Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Mobile (Optional)</label>
                      <input
                        type="tel"
                        value={formData.secondaryContact}
                        onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="glass-card">
                <div className="px-6 py-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-white/40" />
                    Address
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Address Line 1 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={formData.address2}
                      onChange={(e) => handleInputChange('address2', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">County</label>
                      <input
                        type="text"
                        value={formData.county}
                        onChange={(e) => handleInputChange('county', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Postcode <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.postCode}
                        onChange={(e) => handleInputChange('postCode', e.target.value.toUpperCase())}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="glass-card">
                <div className="px-6 py-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    Notes
                  </h2>
                </div>
                <div className="p-6">
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any additional notes about this customer..."
                    className="input-field resize-none h-24"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-4">
                <Link href={backHref} className="btn-secondary flex items-center gap-2">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Create Customer</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default function NewCustomerPage() {
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
      <NewCustomerContent />
    </Suspense>
  )
}
