'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSmartBack } from '@/hooks/useSmartBack'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Edit,
  Trash2,
  X,
  ClipboardList,
  FileText,
  Calendar,
  MessageSquare,
  Check,
  AlertTriangle,
  Loader2,
  Plus,
  ChevronRight,
  StickyNote,
  PhoneCall,
  MessageCircle,
  Users,
  Send,
} from 'lucide-react'
import {
  getCustomerDetail,
  deleteCustomer,
  createManualCommunication,
  type CustomerDetail,
  type ManualCommChannel,
} from '@/lib/customer-data'
import { updateCustomer } from '@/lib/supabase-data'
import { useAuth } from '@/context/AuthContext'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Title options
const titleOptions = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Other']

// Status badge colours
const surveyStatusConfig: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-400/20', label: 'Draft' },
  in_progress: { color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-400/20', label: 'In Progress' },
  pending_review: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-400/20', label: 'Pending Review' },
  completed: { color: 'text-slate-400', bg: 'bg-slate-500/10 border border-slate-400/20', label: 'Completed' },
  archived: { color: 'text-slate-500', bg: 'bg-slate-500/10 border border-slate-500/20', label: 'Archived' },
}

const quotationStatusConfig: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-400/20', label: 'Draft' },
  sent: { color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-400/20', label: 'Sent' },
  viewed: { color: 'text-purple-400', bg: 'bg-purple-500/10 border border-purple-400/20', label: 'Viewed' },
  accepted: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-400/20', label: 'Accepted' },
  declined: { color: 'text-red-400', bg: 'bg-red-500/10 border border-red-400/20', label: 'Declined' },
}

const bookingStatusConfig: Record<string, { color: string; bg: string; label: string }> = {
  confirmed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-400/20', label: 'Confirmed' },
  pending: { color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-400/20', label: 'Pending' },
  cancelled: { color: 'text-red-400', bg: 'bg-red-500/10 border border-red-400/20', label: 'Cancelled' },
  completed: { color: 'text-slate-400', bg: 'bg-slate-500/10 border border-slate-400/20', label: 'Completed' },
}

const commStatusConfig: Record<string, { color: string; bg: string; label: string }> = {
  sent: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-400/20', label: 'Sent' },
  delivered: { color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-400/20', label: 'Delivered' },
  failed: { color: 'text-red-400', bg: 'bg-red-500/10 border border-red-400/20', label: 'Failed' },
  pending: { color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-400/20', label: 'Pending' },
  logged: { color: 'text-slate-400', bg: 'bg-slate-500/10 border border-slate-400/20', label: 'Logged' },
}

const CHANNEL_ICONS: Record<string, typeof Mail> = {
  email: Mail,
  phone: PhoneCall,
  whatsapp: MessageCircle,
  sms: MessageSquare,
  in_person: Users,
  in_app: Send,
}

const CHANNEL_LABELS: Record<string, string> = {
  email: 'Email',
  phone: 'Phone Call',
  whatsapp: 'WhatsApp',
  sms: 'SMS',
  in_person: 'In Person',
  in_app: 'In-App',
}

function StatusBadge({ status, config }: { status: string; config: Record<string, { color: string; bg: string; label: string }> }) {
  const c = config[status] || { color: 'text-white/60', bg: 'bg-white/5 border border-white/10', label: status }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  )
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

export default function CustomerDetailPage({ params }: { params: { customerId: string } }) {
  const { customerId } = params
  const router = useRouter()
  const goBack = useSmartBack('/customers')
  const { profile } = useAuth()
  const [customer, setCustomer] = useState<CustomerDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  // Communication log form state
  const [showCommForm, setShowCommForm] = useState(false)
  const [commChannel, setCommChannel] = useState<ManualCommChannel>('phone')
  const [commDirection, setCommDirection] = useState<'inbound' | 'outbound'>('outbound')
  const [commNotes, setCommNotes] = useState('')
  const [commSaving, setCommSaving] = useState(false)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await getCustomerDetail(customerId)
      if (data) {
        setCustomer(data)
        setFormData({
          title: data.title || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          mobile: data.mobile || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          county: data.county || '',
          postcode: data.postcode || '',
          notes: data.notes || '',
        })
      }
      setIsLoading(false)
    }
    load()
  }, [customerId])

  const handleSave = async () => {
    if (!formData.first_name?.trim() || !formData.last_name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      setError('First name, last name, email and phone are required.')
      return
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSaving(true)
    setError(null)
    try {
      const updated = await updateCustomer(customerId, {
        title: formData.title || undefined,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile || undefined,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 || undefined,
        city: formData.city,
        county: formData.county || undefined,
        postcode: formData.postcode,
        notes: formData.notes || undefined,
      })

      // Refresh full detail (includes surveys etc.)
      const refreshed = await getCustomerDetail(customerId)
      if (refreshed) setCustomer(refreshed)

      setIsEditing(false)
      setSuccessMsg('Customer updated successfully.')
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch (err) {
      setError(`Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogCommunication = async () => {
    if (!commNotes.trim()) {
      setError('Please add notes about the communication.')
      return
    }
    if (!profile) return
    setCommSaving(true)
    setError(null)
    const success = await createManualCommunication({
      customer_id: customerId,
      channel: commChannel,
      direction: commDirection,
      subject: commNotes.trim(),
      sent_by: profile.id,
    })
    if (success) {
      // Reload customer data to show the new entry
      const data = await getCustomerDetail(customerId)
      if (data) setCustomer(data)
      setShowCommForm(false)
      setCommNotes('')
      setCommChannel('phone')
      setCommDirection('outbound')
      setSuccessMsg('Communication logged')
      setTimeout(() => setSuccessMsg(null), 3000)
    } else {
      setError('Failed to log communication')
    }
    setCommSaving(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteCustomer(customerId)
    if (result.success) {
      router.push('/customers')
    } else {
      setError(result.error || 'Failed to delete customer')
      setShowDeleteConfirm(false)
    }
    setIsDeleting(false)
  }

  const handleCancel = () => {
    if (customer) {
      setFormData({
        title: customer.title || '',
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        mobile: customer.mobile || '',
        address_line1: customer.address_line1 || '',
        address_line2: customer.address_line2 || '',
        city: customer.city || '',
        county: customer.county || '',
        postcode: customer.postcode || '',
        notes: customer.notes || '',
      })
    }
    setIsEditing(false)
    setError(null)
  }

  // Loading state
  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading customer...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  // Not found
  if (!customer) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Customer Not Found</h3>
              <p className="text-white/60 mb-6">The requested customer does not exist.</p>
              <button type="button" onClick={goBack} className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  const lastCommunication = customer.communications.length > 0 ? customer.communications[0] : null

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mt-2">
                {customer.title ? `${customer.title} ` : ''}
                {customer.first_name} {customer.last_name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <a href={`mailto:${customer.email}`} className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                  <Mail className="w-4 h-4" /> {customer.email}
                </a>
                <a href={`tel:${customer.phone}`} className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                  <Phone className="w-4 h-4" /> {customer.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-300">{successMsg}</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/20">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="max-w-5xl space-y-8">
            {/* Customer Information */}
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-white/40" />
                  Customer Information
                </h2>
              </div>
              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    {/* Title + Names */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                        <select
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="input-select"
                        >
                          <option value="">None</option>
                          {titleOptions.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
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
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Phone <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Mobile</label>
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>
                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Address Line 1</label>
                        <input
                          type="text"
                          value={formData.address_line1}
                          onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Address Line 2</label>
                        <input
                          type="text"
                          value={formData.address_line2}
                          onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">County</label>
                        <input
                          type="text"
                          value={formData.county}
                          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Postcode</label>
                        <input
                          type="text"
                          value={formData.postcode}
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                          className="input-field"
                        />
                      </div>
                    </div>
                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Notes</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="input-field resize-none h-24"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* View mode — two column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Name</p>
                        <p className="text-white">
                          {customer.title ? `${customer.title} ` : ''}
                          {customer.first_name} {customer.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Email</p>
                        <a href={`mailto:${customer.email}`} className="text-brand-400 hover:text-brand-300 transition-colors">
                          {customer.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Phone</p>
                        <a href={`tel:${customer.phone}`} className="text-brand-400 hover:text-brand-300 transition-colors">
                          {customer.phone}
                        </a>
                      </div>
                      {customer.mobile && (
                        <div>
                          <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Mobile</p>
                          <a href={`tel:${customer.mobile}`} className="text-brand-400 hover:text-brand-300 transition-colors">
                            {customer.mobile}
                          </a>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Address</p>
                        <p className="text-white">
                          {[customer.address_line1, customer.address_line2, customer.city, customer.county, customer.postcode]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                      {customer.notes && (
                        <div className="md:col-span-2">
                          <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Notes</p>
                          <p className="text-white/80 whitespace-pre-wrap">{customer.notes}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">Customer Since</p>
                        <p className="text-white/60">{formatDate(customer.created_at)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Survey History */}
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-white/40" />
                  Survey History
                  {customer.surveys.length > 0 && (
                    <span className="text-sm font-normal text-white/40">({customer.surveys.length})</span>
                  )}
                </h2>
                <Link
                  href={`/survey/new?customerId=${customer.id}`}
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> New Survey
                </Link>
              </div>
              <div className="p-0">
                {customer.surveys.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-white/50">No surveys for this customer yet.</p>
                    <Link
                      href={`/survey/new?customerId=${customer.id}`}
                      className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mt-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Create Survey
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Created</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.surveys.map((s) => (
                          <tr
                            key={s.id}
                            onClick={() => router.push(`/surveys/${s.id}`)}
                            className="cursor-pointer"
                          >
                            <td className="font-mono text-sm text-white/70">{s.project_number}</td>
                            <td className="capitalize text-white/60">{s.survey_type}</td>
                            <td><StatusBadge status={s.status} config={surveyStatusConfig} /></td>
                            <td className="text-white/60">{formatDate(s.survey_date)}</td>
                            <td className="text-white/60">{formatDate(s.created_at)}</td>
                            <td><ChevronRight className="w-4 h-4 text-white/30 ml-auto" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Quotation History */}
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-white/40" />
                  Quotations
                  {customer.quotations.length > 0 && (
                    <span className="text-sm font-normal text-white/40">({customer.quotations.length})</span>
                  )}
                </h2>
              </div>
              <div className="p-0">
                {customer.quotations.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-white/50">No quotations yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>Quotation Number</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Date</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.quotations.map((q) => (
                          <tr
                            key={q.id}
                            onClick={() => router.push(`/survey/${q.survey_id}/quotation/${q.id}`)}
                            className="cursor-pointer"
                          >
                            <td className="font-mono text-sm text-white/70">{q.quotation_number}</td>
                            <td><StatusBadge status={q.status} config={quotationStatusConfig} /></td>
                            <td className="text-white font-medium">{formatCurrency(q.total_incl_vat)}</td>
                            <td className="text-white/60">{formatDate(q.created_at)}</td>
                            <td><ChevronRight className="w-4 h-4 text-white/30 ml-auto" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Booking History */}
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white/40" />
                  Bookings
                  {customer.bookings.length > 0 && (
                    <span className="text-sm font-normal text-white/40">({customer.bookings.length})</span>
                  )}
                </h2>
              </div>
              <div className="p-0">
                {customer.bookings.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-white/50">No bookings yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.bookings.map((b) => (
                          <tr
                            key={b.id}
                            onClick={() => router.push(`/calendar?date=${b.booking_date}`)}
                            className="cursor-pointer"
                          >
                            <td className="text-white/80">{formatDate(b.booking_date)}</td>
                            <td className="text-white/60">{b.start_time} – {b.end_time}</td>
                            <td><StatusBadge status={b.status} config={bookingStatusConfig} /></td>
                            <td><ChevronRight className="w-4 h-4 text-white/30 ml-auto" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Communication History */}
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-white/40" />
                    Communications
                    {customer.communications.length > 0 && (
                      <span className="text-sm font-normal text-white/40">(last 10)</span>
                    )}
                  </h2>
                  <button
                    onClick={() => setShowCommForm(prev => !prev)}
                    className="flex items-center gap-1.5 text-xs font-medium text-brand-300 hover:text-brand-200 transition-colors px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-400/20 hover:bg-brand-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Log Communication
                  </button>
                </div>
                {lastCommunication && (
                  <p className="text-xs text-white/40 mt-1">
                    Last contacted: {formatDateTime(lastCommunication.created_at)}
                  </p>
                )}
              </div>

              {/* Log Communication Form */}
              {showCommForm && (
                <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <div className="space-y-3">
                    {/* Channel + Direction row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Channel</label>
                        <select
                          value={commChannel}
                          onChange={(e) => setCommChannel(e.target.value as ManualCommChannel)}
                          className="input-field text-sm w-full"
                        >
                          <option value="phone">Phone Call</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="sms">SMS</option>
                          <option value="in_person">In Person</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Direction</label>
                        <div className="flex rounded-lg overflow-hidden border border-white/10">
                          <button
                            type="button"
                            onClick={() => setCommDirection('outbound')}
                            className={`flex-1 text-xs py-2 px-3 transition-colors ${
                              commDirection === 'outbound'
                                ? 'bg-brand-500/20 text-brand-300'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                          >
                            Outgoing
                          </button>
                          <button
                            type="button"
                            onClick={() => setCommDirection('inbound')}
                            className={`flex-1 text-xs py-2 px-3 transition-colors ${
                              commDirection === 'inbound'
                                ? 'bg-brand-500/20 text-brand-300'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                          >
                            Incoming
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Notes</label>
                      <textarea
                        value={commNotes}
                        onChange={(e) => setCommNotes(e.target.value)}
                        placeholder="Brief summary of the conversation..."
                        className="input-field text-sm w-full min-h-[80px] resize-y"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => { setShowCommForm(false); setCommNotes('') }}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogCommunication}
                        disabled={commSaving || !commNotes.trim()}
                        className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5"
                      >
                        {commSaving ? (
                          <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
                        ) : (
                          <><Check className="w-3 h-3" /> Log</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-0">
                {customer.communications.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-white/50">No communications recorded.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {customer.communications.map((c) => {
                      const ChannelIcon = CHANNEL_ICONS[c.channel] || Mail
                      return (
                        <div key={c.id} className="px-6 py-4 flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                            <ChannelIcon className="w-4 h-4 text-white/40" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-medium text-white truncate">
                                {c.template_name || c.subject || 'Communication'}
                              </p>
                              <span className="text-xs text-white/30">{CHANNEL_LABELS[c.channel] || c.channel}</span>
                              <StatusBadge status={c.status} config={commStatusConfig} />
                            </div>
                            <p className="text-xs text-white/40 mt-0.5">
                              {c.direction === 'inbound' ? 'Incoming' : 'Outgoing'}
                              {c.recipient_email ? ` · ${c.recipient_email}` : ''}
                              {' · '}{formatDateTime(c.created_at)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Delete Zone */}
            <div className="glass-card border-red-500/20">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-400/60" />
                  Danger Zone
                </h2>
              </div>
              <div className="p-6">
                {customer.survey_count > 0 ? (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">
                        Cannot delete — customer has {customer.survey_count} linked survey{customer.survey_count > 1 ? 's' : ''}.
                      </p>
                      <button
                        disabled
                        className="mt-3 px-4 py-2 rounded-lg bg-red-500/10 text-red-400/40 text-sm font-medium cursor-not-allowed border border-red-400/10"
                      >
                        Delete Customer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-white/50 mb-3">
                      Permanently delete this customer and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium border border-red-400/20 transition-colors"
                    >
                      Delete Customer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="glass-card max-w-md mx-4 shadow-2xl">
              <div className="p-6 text-center space-y-4">
                <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
                <h3 className="text-lg font-semibold text-white">Delete Customer?</h3>
                <p className="text-sm text-white/60">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-white">
                    {customer.first_name} {customer.last_name}
                  </span>
                  ? This cannot be undone.
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn-secondary px-4 py-2"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium border border-red-400/20 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Deleting...</>
                    ) : (
                      'Delete Customer'
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
