'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Phone, Award, CheckCircle, Save } from 'lucide-react'
import { createSurveyor } from '@/lib/supabase-data'

export default function NewSurveyorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualifications: ''
  })
  const [availability, setAvailability] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError('Please enter the surveyor\'s full name')
      return false
    }

    if (!formData.email.trim()) {
      setError('Please enter an email address')
      return false
    }

    // Basic email validation
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
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
      const newSurveyor = await createSurveyor({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        qualifications: formData.qualifications || undefined,
        availability
      })

      console.log('Surveyor created successfully:', newSurveyor)
      router.push('/team/surveyors')
    } catch (err) {
      console.error('Error creating surveyor:', err)

      if (err instanceof Error) {
        if (err.message.includes('table') && err.message.includes('not found')) {
          setError('Database table not found. Please run database migrations first.')
        } else if (err.message.includes('connection')) {
          setError('Could not connect to database. Check your Supabase configuration.')
        } else {
          setError(`Failed to create surveyor: ${err.message}`)
        }
      } else {
        setError('Failed to create surveyor: Unknown error')
      }

      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/team/surveyors" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">New Surveyor</h1>
            <p className="text-sm text-white/60">Add a new surveyor to your team</p>
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
                Surveyor Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="input-field"
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="email@example.com"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input-field"
                  placeholder="+44 1234 567890"
                />
              </div>
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-white/40" />
                Qualifications & Experience
              </h2>
            </div>

            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Qualifications (Optional)</label>
                <textarea
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  className="input-field min-h-[120px] resize-y"
                  placeholder="List relevant qualifications, certifications, and experience..."
                />
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white/40" />
                Availability
              </h2>
            </div>

            <div className="p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                  className="w-5 h-5 rounded border-white/30 bg-white/10 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                />
                <span className="text-white">Available for new assignments</span>
              </label>
              <p className="text-sm text-white/50 mt-2 ml-8">
                When enabled, this surveyor will appear in the assignment dropdown for new projects.
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-300">{error}</p>
              {error.includes('Database table not found') && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg text-sm text-white/80">
                  <p className="font-medium">Setup Required</p>
                  <p className="mt-1">Run migrations to create the surveyors table.</p>
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
              {isSubmitting ? 'Creating...' : 'Create Surveyor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
