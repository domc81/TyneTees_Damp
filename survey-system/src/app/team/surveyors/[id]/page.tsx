'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Award,
  CheckCircle,
  Save,
  Edit,
  Trash2,
  X,
  ClipboardList
} from 'lucide-react'
import { getSurveyor, updateSurveyor } from '@/lib/supabase-data'
import type { Surveyor } from '@/lib/supabase-data'

export default function SurveyorDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [surveyor, setSurveyor] = useState<Surveyor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Surveyor>>({})

  useEffect(() => {
    async function loadSurveyor() {
      try {
        setIsLoading(true)
        setError(null)
        const surveyorData = await getSurveyor(params.id)

        if (!surveyorData) {
          setError('Surveyor not found')
          return
        }

        setSurveyor(surveyorData)
        setFormData(surveyorData)
      } catch (err) {
        console.error('Error loading surveyor:', err)
        setError('Failed to load surveyor data')
      } finally {
        setIsLoading(false)
      }
    }

    loadSurveyor()
  }, [params.id])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = async () => {
    if (!surveyor) return

    setIsSaving(true)
    setError(null)

    try {
      const updatedSurveyor = await updateSurveyor(surveyor.id, {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        qualifications: formData.qualifications,
        availability: formData.availability
      })

      setSurveyor(updatedSurveyor)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Error saving surveyor:', err)
      setError(`Failed to save changes: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this surveyor? This action cannot be undone.')) {
      return
    }

    try {
      // TODO: Implement actual delete functionality
      alert('Delete functionality to be implemented')
      router.push('/team/surveyors')
    } catch (err) {
      console.error('Error deleting surveyor:', err)
      setError('Failed to delete surveyor')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading surveyor details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Surveyor</h3>
          <p className="text-white/60 mb-4">{error}</p>
          <button
            onClick={() => router.push('/team/surveyors')}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Surveyors
          </button>
        </div>
      </div>
    )
  }

  if (!surveyor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Surveyor Not Found</h3>
          <p className="text-white/60 mb-6">The requested surveyor does not exist.</p>
          <Link
            href="/team/surveyors"
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Surveyors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/team/surveyors" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                <User className="w-6 h-6 text-white/40" />
                {surveyor.full_name}
              </h1>
              <p className="text-sm text-white/60">Surveyor Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center gap-2"
                disabled={isSaving}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(surveyor)
                    setError(null)
                  }}
                  className="btn-ghost flex items-center gap-2"
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 transition-colors"
              title="Delete surveyor"
              disabled={isSaving}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Information Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-white/40" />
                Contact Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name || ''}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{surveyor.full_name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{surveyor.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-white">{surveyor.phone || 'Not specified'}</p>
                )}
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
              <label className="block text-sm font-medium text-white/80 mb-2">Qualifications</label>
              {isEditing ? (
                <textarea
                  value={formData.qualifications || ''}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  className="input-field min-h-[120px] resize-y"
                  placeholder="List relevant qualifications, certifications, and experience..."
                />
              ) : (
                <p className="text-white whitespace-pre-wrap">{surveyor.qualifications || 'No qualifications listed'}</p>
              )}
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
              {isEditing ? (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.availability ?? true}
                    onChange={(e) => handleInputChange('availability', e.target.checked)}
                    className="w-5 h-5 rounded border-white/30 bg-white/10 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                  />
                  <span className="text-white">Available for new assignments</span>
                </label>
              ) : (
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    surveyor.availability
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {surveyor.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              )}
              <p className="text-sm text-white/50 mt-3">
                When available, this surveyor will appear in the assignment dropdown for new projects.
              </p>
            </div>
          </div>

          {/* Related Projects Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-white/40" />
                Assigned Projects
              </h2>
            </div>

            <div className="p-6">
              <p className="text-white/60">
                Projects assigned to this surveyor will appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
