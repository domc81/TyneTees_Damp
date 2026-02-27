'use client'

import { Suspense, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Phone, MapPin, Home, Save } from 'lucide-react'
import { createCustomer } from '@/lib/supabase-data'

// Title options for dropdown
const titleOptions = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
  { value: 'Other', label: 'Other' }
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
    address1: '',
    address2: '',
    city: '',
    county: '',
    postCode: '',
    emailAddress: '',
    contactNumber: '',
    secondaryContact: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = (): boolean => {
    const requiredFields = [
      'firstName', 'lastName', 'address1', 'city', 'county', 'postCode',
      'emailAddress', 'contactNumber'
    ]

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]?.trim()) {
        setError(`Please fill in all required fields`)
        return false
      }
    }

    // Basic email validation
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.emailAddress)) {
      setError('Please enter a valid email address')
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create customer using Supabase
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
        notes: ''
      })

      console.log('Customer created successfully:', newCustomer)

      // Redirect based on where the user came from
      // Use ref value (immune to React re-render closures) + hard navigation
      // to guarantee query params arrive intact on the target page
      const destination = returnToRef.current
      if (destination === 'survey-new') {
        window.location.href = `/survey/new?customerId=${newCustomer.id}`
      } else if (destination === 'dashboard') {
        router.push('/')
      } else {
        router.push('/customers')
      }
    } catch (error) {
      console.error('Error creating customer:', error)
      
      // Enhanced error handling for common issues
      if (error instanceof Error) {
        if (error.message.includes('table') && error.message.includes('not found')) {
          setError('Database table not found. Please run database migrations first.')
        } else if (error.message.includes('connection')) {
          setError('Could not connect to database. Check your Supabase configuration.')
        } else {
          setError(`Failed to create customer: ${error.message}`)
        }
      } else {
        setError('Failed to create customer: Unknown error')
      }
      
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href={returnTo === 'survey-new' ? '/survey/new' : returnTo === 'dashboard' ? '/' : '/customers'} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">New Customer</h1>
            <p className="text-sm text-white/60">Create a new customer record</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-white/40" />
                Personal Information
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                  <select
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-select"
                  >
                    {titleOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Last Name *</label>
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

          {/* Contact Information Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-white/40" />
                Contact Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Secondary Contact */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Secondary Contact (Optional)</label>
                <input
                  type="tel"
                  value={formData.secondaryContact}
                  onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white/40" />
                Address
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Address Line 1 *</label>
                <input
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleInputChange('address1', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleInputChange('address2', e.target.value)}
                  className="input-field"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* County */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">County *</label>
                <input
                  type="text"
                  value={formData.county}
                  onChange={(e) => handleInputChange('county', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Postcode */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Postcode *</label>
                <input
                  type="text"
                  value={formData.postCode}
                  onChange={(e) => handleInputChange('postCode', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-300">{error}</p>
              {error.includes('Database table not found') && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg text-sm text-white/80">
                  <p className="font-medium">🔧 Setup Required</p>
                  <p className="mt-1">Run the following commands to set up your database:</p>
                  <div className="mt-2 p-2 bg-white/10 rounded font-mono text-xs">
                    cd survey-system<br/>
                    ./setup.sh<br/>
                    # Choose option 1 for Docker setup<br/>
                  </div>
                  <p className="mt-2 text-xs">Or check <code>.env.local</code> for Supabase configuration.</p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewCustomerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <NewCustomerContent />
    </Suspense>
  )
}