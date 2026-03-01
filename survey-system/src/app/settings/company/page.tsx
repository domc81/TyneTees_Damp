'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Upload,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import type { CompanyProfile } from '@/types/database.types'

// Fields grouped for the form
type FormData = {
  name: string
  trading_name: string
  company_registration_number: string
  vat_number: string
  established_year: string
  phone_primary: string
  phone_secondary: string
  email_primary: string
  email_secondary: string
  website: string
  registered_address_line1: string
  registered_address_line2: string
  registered_address_city: string
  registered_address_county: string
  registered_address_postcode: string
  about_us_text: string
  guarantee_years: string
  guarantee_scheme_name: string
  terms_and_conditions: string
  default_deposit_note: string
}

function profileToForm(p: CompanyProfile): FormData {
  return {
    name: p.name || '',
    trading_name: p.trading_name || '',
    company_registration_number: p.company_registration_number || '',
    vat_number: p.vat_number || '',
    established_year: p.established_year?.toString() || '',
    phone_primary: p.phone_primary || '',
    phone_secondary: p.phone_secondary || '',
    email_primary: p.email_primary || '',
    email_secondary: p.email_secondary || '',
    website: p.website || '',
    registered_address_line1: p.registered_address_line1 || '',
    registered_address_line2: p.registered_address_line2 || '',
    registered_address_city: p.registered_address_city || '',
    registered_address_county: p.registered_address_county || '',
    registered_address_postcode: p.registered_address_postcode || '',
    about_us_text: p.about_us_text || '',
    guarantee_years: p.guarantee_years?.toString() || '',
    guarantee_scheme_name: p.guarantee_scheme_name || '',
    terms_and_conditions: p.terms_and_conditions || '',
    default_deposit_note: p.default_deposit_note || '',
  }
}

function formToPayload(f: FormData): Record<string, unknown> {
  return {
    name: f.name,
    trading_name: f.trading_name || null,
    company_registration_number: f.company_registration_number || null,
    vat_number: f.vat_number || null,
    established_year: f.established_year ? parseInt(f.established_year, 10) : null,
    phone_primary: f.phone_primary || null,
    phone_secondary: f.phone_secondary || null,
    email_primary: f.email_primary || null,
    email_secondary: f.email_secondary || null,
    website: f.website || null,
    registered_address_line1: f.registered_address_line1 || null,
    registered_address_line2: f.registered_address_line2 || null,
    registered_address_city: f.registered_address_city || null,
    registered_address_county: f.registered_address_county || null,
    registered_address_postcode: f.registered_address_postcode || null,
    about_us_text: f.about_us_text || null,
    guarantee_years: f.guarantee_years ? parseInt(f.guarantee_years, 10) : null,
    guarantee_scheme_name: f.guarantee_scheme_name || null,
    terms_and_conditions: f.terms_and_conditions || null,
    default_deposit_note: f.default_deposit_note || null,
  }
}

// ---------------------------------------------------------------------------
// Reusable form field
// ---------------------------------------------------------------------------

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [form, setForm] = useState<FormData | null>(null)
  const [savedForm, setSavedForm] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoUploading, setLogoUploading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch profile on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/settings/company')
        if (!res.ok) throw new Error('Failed to load company profile')
        const data: CompanyProfile = await res.json()
        setProfile(data)
        const formData = profileToForm(data)
        setForm(formData)
        setSavedForm(formData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Track unsaved changes
  const hasChanges = form && savedForm && JSON.stringify(form) !== JSON.stringify(savedForm)

  // Warn on navigation with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasChanges])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => prev ? { ...prev, [field]: value } : prev)
  }, [])

  // Save form
  const handleSave = async () => {
    if (!form) return

    if (!form.name.trim()) {
      setToast({ type: 'error', message: 'Company name is required' })
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/settings/company', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToPayload(form)),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save')
      }
      const updated: CompanyProfile = await res.json()
      setProfile(updated)
      const newForm = profileToForm(updated)
      setForm(newForm)
      setSavedForm(newForm)
      setToast({ type: 'success', message: 'Company profile updated' })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  // Logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset the input so the same file can be re-selected
    e.target.value = ''

    setLogoUploading(true)
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const res = await fetch('/api/settings/company/logo', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }
      const { logo_url } = await res.json()
      setProfile(prev => prev ? { ...prev, logo_url } : prev)
      setToast({ type: 'success', message: 'Logo uploaded' })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Upload failed' })
    } finally {
      setLogoUploading(false)
    }
  }

  // Logo remove
  const handleLogoRemove = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/company', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: null }),
      })
      if (!res.ok) throw new Error('Failed to remove logo')
      const updated: CompanyProfile = await res.json()
      setProfile(updated)
      setToast({ type: 'success', message: 'Logo removed' })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Remove failed' })
    } finally {
      setSaving(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (error || !form || !profile) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-white/70">{error || 'Failed to load company profile'}</p>
            <Link href="/settings" className="btn-secondary text-sm px-4 py-2">
              Back to Settings
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-4xl">
          {/* Toast */}
          {toast && (
            <div
              className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border transition-all duration-300 ${
                toast.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-red-500/20 border-red-400/30 text-red-300'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          )}

          {/* Header */}
          <div>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Settings
            </Link>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-400" />
              Company Profile
            </h2>
            <p className="text-sm text-white/60 mt-1">
              These details appear on all reports, quotations, and customer-facing documents
            </p>
          </div>

          {/* Logo Section */}
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="text-lg font-semibold text-white">Company Logo</h3>
            </div>
            <div className="section-card-body">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Preview */}
                <div className="w-48 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {profile.logo_url ? (
                    <img
                      src={profile.logo_url}
                      alt="Company logo"
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-white/30">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-xs">No logo</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={logoUploading}
                      className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                    >
                      {logoUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      {logoUploading ? 'Uploading...' : 'Upload Logo'}
                    </button>
                    {profile.logo_url && (
                      <button
                        onClick={handleLogoRemove}
                        disabled={saving}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-red-400/20 hover:border-red-400/40 transition-all"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1.5" />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    PNG, JPG, SVG, or WebP — max 5 MB. Recommended: 300×100px or similar landscape ratio.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="text-lg font-semibold text-white">Identity</h3>
            </div>
            <div className="section-card-body space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input
                    type="text"
                    className="input-field"
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="e.g. Tyne Tees Damp Proofing Ltd"
                  />
                </Field>
                <Field label="Trading Name" hint="Shown in the app sidebar and short references">
                  <input
                    type="text"
                    className="input-field"
                    value={form.trading_name}
                    onChange={e => updateField('trading_name', e.target.value)}
                    placeholder="e.g. Tyne Tees"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Company Registration Number">
                  <input
                    type="text"
                    className="input-field"
                    value={form.company_registration_number}
                    onChange={e => updateField('company_registration_number', e.target.value)}
                    placeholder="e.g. 12345678"
                  />
                </Field>
                <Field label="VAT Number">
                  <input
                    type="text"
                    className="input-field"
                    value={form.vat_number}
                    onChange={e => updateField('vat_number', e.target.value)}
                    placeholder="e.g. GB 123 4567 89"
                  />
                </Field>
                <Field label="Established Year">
                  <input
                    type="number"
                    className="input-field"
                    value={form.established_year}
                    onChange={e => updateField('established_year', e.target.value)}
                    placeholder="e.g. 1985"
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="text-lg font-semibold text-white">Contact Details</h3>
            </div>
            <div className="section-card-body space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Primary Phone">
                  <input
                    type="tel"
                    className="input-field"
                    value={form.phone_primary}
                    onChange={e => updateField('phone_primary', e.target.value)}
                    placeholder="e.g. 0191 123 4567"
                  />
                </Field>
                <Field label="Secondary Phone">
                  <input
                    type="tel"
                    className="input-field"
                    value={form.phone_secondary}
                    onChange={e => updateField('phone_secondary', e.target.value)}
                    placeholder="Optional"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Primary Email">
                  <input
                    type="email"
                    className="input-field"
                    value={form.email_primary}
                    onChange={e => updateField('email_primary', e.target.value)}
                    placeholder="e.g. info@tynetees.com"
                  />
                </Field>
                <Field label="Secondary Email">
                  <input
                    type="email"
                    className="input-field"
                    value={form.email_secondary}
                    onChange={e => updateField('email_secondary', e.target.value)}
                    placeholder="Optional"
                  />
                </Field>
              </div>
              <Field label="Website">
                <input
                  type="url"
                  className="input-field"
                  value={form.website}
                  onChange={e => updateField('website', e.target.value)}
                  placeholder="e.g. https://www.tynetees.com"
                />
              </Field>
            </div>
          </div>

          {/* Registered Address */}
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="text-lg font-semibold text-white">Registered Address</h3>
            </div>
            <div className="section-card-body space-y-4">
              <Field label="Address Line 1">
                <input
                  type="text"
                  className="input-field"
                  value={form.registered_address_line1}
                  onChange={e => updateField('registered_address_line1', e.target.value)}
                />
              </Field>
              <Field label="Address Line 2">
                <input
                  type="text"
                  className="input-field"
                  value={form.registered_address_line2}
                  onChange={e => updateField('registered_address_line2', e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="City">
                  <input
                    type="text"
                    className="input-field"
                    value={form.registered_address_city}
                    onChange={e => updateField('registered_address_city', e.target.value)}
                    placeholder="e.g. Newcastle upon Tyne"
                  />
                </Field>
                <Field label="County">
                  <input
                    type="text"
                    className="input-field"
                    value={form.registered_address_county}
                    onChange={e => updateField('registered_address_county', e.target.value)}
                    placeholder="e.g. Tyne and Wear"
                  />
                </Field>
                <Field label="Postcode">
                  <input
                    type="text"
                    className="input-field"
                    value={form.registered_address_postcode}
                    onChange={e => updateField('registered_address_postcode', e.target.value)}
                    placeholder="e.g. NE1 4AA"
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Report & Quotation Content */}
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="text-lg font-semibold text-white">Report &amp; Quotation Content</h3>
            </div>
            <div className="section-card-body space-y-4">
              <Field
                label="About Us"
                hint="This text appears in the 'About Us' section of all reports"
              >
                <textarea
                  className="input-field min-h-[120px] resize-y"
                  value={form.about_us_text}
                  onChange={e => updateField('about_us_text', e.target.value)}
                  placeholder="Tell customers about your company, experience, and qualifications..."
                  rows={5}
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Guarantee Years">
                  <input
                    type="number"
                    className="input-field"
                    value={form.guarantee_years}
                    onChange={e => updateField('guarantee_years', e.target.value)}
                    placeholder="e.g. 20"
                    min={0}
                    max={100}
                  />
                </Field>
                <Field label="Guarantee Scheme Name">
                  <input
                    type="text"
                    className="input-field"
                    value={form.guarantee_scheme_name}
                    onChange={e => updateField('guarantee_scheme_name', e.target.value)}
                    placeholder="e.g. Property Care Association"
                  />
                </Field>
              </div>
              <Field
                label="Terms & Conditions"
                hint="Default terms shown on all quotations. Can be edited per quotation."
              >
                <textarea
                  className="input-field min-h-[160px] resize-y"
                  value={form.terms_and_conditions}
                  onChange={e => updateField('terms_and_conditions', e.target.value)}
                  placeholder="Enter your standard terms and conditions..."
                  rows={7}
                />
              </Field>
              <Field label="Default Deposit Note">
                <textarea
                  className="input-field min-h-[80px] resize-y"
                  value={form.default_deposit_note}
                  onChange={e => updateField('default_deposit_note', e.target.value)}
                  placeholder="e.g. A 30% deposit is required upon acceptance..."
                  rows={3}
                />
              </Field>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2 pb-8">
            <div>
              {hasChanges && (
                <span className="text-sm text-amber-300/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Unsaved changes
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
