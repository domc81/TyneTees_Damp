'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Copy,
  Check,
  Send,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Save,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useCompanyProfile } from '@/context/CompanyProfileContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getSupabase } from '@/lib/supabase-client'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Quotation {
  id: string
  survey_id: string
  version: number
  quotation_number: string
  share_token: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'
  subtotal_mandatory: number
  subtotal_optional: number
  subtotal_combined: number
  pso_total: number
  vat_rate: number
  vat_amount: number
  total_incl_vat: number
  deposit_percentage: number
  deposit_amount: number
  validity_days: number
  valid_until: string
  notes: string | null
  terms: string | null
  customer_name: string | null
  customer_address: string | null
  site_address: string | null
  surveyor_name: string | null
  surveyor_qualifications: string | null
  company_name: string | null
  company_phone: string | null
  company_email: string | null
  first_viewed_at: string | null
  last_viewed_at: string | null
  view_count: number
  sent_at: string | null
  created_at: string
}

interface QuotationSection {
  id: string
  quotation_id: string
  survey_type: string
  section_key: string
  display_name: string
  display_order: number
  material_total: number
  labour_total: number
  section_total: number
  is_optional: boolean
  is_included: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

type QuotationStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'

const STATUS_CONFIG: Record<QuotationStatus, {
  label: string
  bg: string
  text: string
  border: string
  Icon: React.FC<{ className?: string }>
}> = {
  draft: { label: 'Draft', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-400/30', Icon: Clock },
  sent: { label: 'Sent', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30', Icon: Send },
  viewed: { label: 'Viewed', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-400/30', Icon: Eye },
  accepted: { label: 'Accepted', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-400/30', Icon: CheckCircle },
  declined: { label: 'Declined', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-400/30', Icon: XCircle },
}

// Customer-facing work type headings (what the customer reads on the quote)
const SURVEY_TYPE_WORK_NAMES: Record<string, string> = {
  damp: 'Damp Proofing Works',
  condensation: 'Condensation Works',
  timber: 'Timber Treatment Works',
  woodworm: 'Woodworm Treatment Works',
}

// Sensible default terms, used when the quotation record has no terms stored yet
function getDefaultTerms(companyName: string): string {
  return `1. A deposit is required prior to the commencement of works as stated in this quotation.
2. The balance is due upon satisfactory completion of all works.
3. This quotation is valid for the period stated above from the date of issue.
4. All specified works are guaranteed against failure as per our standard guarantee documentation.
5. Access to the property and appropriate working conditions must be provided throughout the works.
6. ${companyName} reserves the right to revise this quotation should site conditions differ materially from those assessed during the survey.
7. Any additional works identified and agreed during the course of the project will be charged at our standard rates.`
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QuotationManagementPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const quotationId = params.quotationId as string

  const companyProfile = useCompanyProfile()

  const [quotation, setQuotation] = useState<Quotation | null>(null)
  const [sections, setSections] = useState<QuotationSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Button states
  const [copiedLink, setCopiedLink] = useState(false)
  const [isMarkingSent, setIsMarkingSent] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)

  // Editable fields — initialised from DB once loaded
  const [editNotes, setEditNotes] = useState('')
  const [editTerms, setEditTerms] = useState('')
  const [editValidityDays, setEditValidityDays] = useState(30)

  useEffect(() => {
    loadQuotation()
  }, [quotationId]) // eslint-disable-line react-hooks/exhaustive-deps

  async function loadQuotation() {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Database connection unavailable')

      const [{ data: q, error: qErr }, { data: secs, error: secErr }] = await Promise.all([
        supabase.from('quotations').select('*').eq('id', quotationId).single(),
        supabase
          .from('quotation_sections')
          .select('*')
          .eq('quotation_id', quotationId)
          .order('display_order', { ascending: true }),
      ])

      if (qErr || !q) throw new Error(qErr?.message || 'Quotation not found')
      if (secErr) throw new Error(secErr.message)

      const loaded = q as Quotation
      setQuotation(loaded)
      setSections((secs || []) as QuotationSection[])

      // Seed editable fields from DB
      setEditNotes(loaded.notes || '')
      setEditTerms(loaded.terms || getDefaultTerms(loaded.company_name || companyProfile.name))
      setEditValidityDays(loaded.validity_days || 30)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quotation')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCopyLink() {
    if (!quotation) return
    const url = `${window.location.origin}/q/${quotation.share_token}`
    await navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  async function handleMarkAsSent() {
    if (!quotation) return
    setIsMarkingSent(true)
    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('No DB connection')
      const now = new Date().toISOString()
      const { error: updateErr } = await supabase
        .from('quotations')
        .update({ status: 'sent', sent_at: now })
        .eq('id', quotationId)
      if (updateErr) throw updateErr
      setQuotation({ ...quotation, status: 'sent', sent_at: now })
    } catch (err) {
      console.error('Failed to mark as sent:', err)
    } finally {
      setIsMarkingSent(false)
    }
  }

  async function handleSaveChanges() {
    if (!quotation) return
    setIsSaving(true)
    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('No DB connection')

      // Recompute valid_until from the quotation creation date + new validity_days
      const base = new Date(quotation.created_at)
      base.setDate(base.getDate() + editValidityDays)
      const newValidUntil = base.toISOString().split('T')[0]

      const { error: updateErr } = await supabase
        .from('quotations')
        .update({
          notes: editNotes || null,
          terms: editTerms || null,
          validity_days: editValidityDays,
          valid_until: newValidUntil,
        })
        .eq('id', quotationId)

      if (updateErr) throw updateErr

      setQuotation({
        ...quotation,
        notes: editNotes || null,
        terms: editTerms || null,
        validity_days: editValidityDays,
        valid_until: newValidUntil,
      })
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 2500)
    } catch (err) {
      console.error('Failed to save changes:', err)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDownloadPdf() {
    if (!quotation) return
    setIsDownloadingPdf(true)
    try {
      const res = await fetch(`/api/quotation-pdf/${quotationId}`)
      if (!res.ok) throw new Error(`PDF generation failed (${res.status})`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${quotation.quotation_number}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Could not generate the PDF. Please try again.')
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  // ─── Loading ──────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-brand-300 animate-spin mx-auto mb-4" />
              <p className="text-white/60">Loading quotation…</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  // ─── Error ────────────────────────────────────────────────────────────────

  if (error || !quotation) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <Card className="max-w-md w-full p-8 text-center glass border-red-400/30">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Quotation Not Found</h2>
              <p className="text-white/70 mb-6">{error || 'This quotation could not be loaded.'}</p>
              <Link href={`/survey/${projectId}/costing`} className="btn-secondary inline-block">
                Back to Costing
              </Link>
            </Card>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  // ─── Derived data ─────────────────────────────────────────────────────────

  const statusCfg = STATUS_CONFIG[quotation.status] ?? STATUS_CONFIG.draft
  const { Icon: StatusIcon } = statusCfg

  // Site preparation sections — their totals are combined with pso_total for the PSO line
  const sitePrepSections = sections.filter(s => s.survey_type === 'site_preparation')
  const sitePrepTotal = sitePrepSections.reduce((sum, s) => sum + s.section_total, 0)
  const psoDisplayTotal = sitePrepTotal + quotation.pso_total

  // Per-type work sections (everything except site_preparation)
  const perTypeSections = sections.filter(s => s.survey_type !== 'site_preparation')
  const mandatorySections = perTypeSections.filter(s => !s.is_optional)
  const optionalSections = perTypeSections.filter(s => s.is_optional && s.is_included)
  const hasOptional = optionalSections.length > 0

  // Group mandatory sections by survey type (preserves display order within each group)
  const mandatoryByType: Record<string, QuotationSection[]> = {}
  for (const section of mandatorySections) {
    if (!mandatoryByType[section.survey_type]) mandatoryByType[section.survey_type] = []
    mandatoryByType[section.survey_type].push(section)
  }

  // Totals (derived from section data for accurate customer-facing display)
  const mandatoryWorksTotal = mandatorySections.reduce((sum, s) => sum + s.section_total, 0)
  const optionalWorksTotal = optionalSections.reduce((sum, s) => sum + s.section_total, 0)
  const subtotalExVat = quotation.total_incl_vat - quotation.vat_amount
  const balanceDue = quotation.total_incl_vat - quotation.deposit_amount

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div>
            <Link
              href={`/survey/${projectId}/costing`}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Costing
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Quotation identity */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">{quotation.quotation_number}</h1>
                  <span className="text-sm text-white/40">v{quotation.version}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusCfg.label}
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-1">
                  Created {formatDate(quotation.created_at)}&ensp;·&ensp;Valid until {formatDate(quotation.valid_until)}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                  {copiedLink ? (
                    <><Check className="w-4 h-4 mr-1.5 text-emerald-400" />Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-1.5" />Copy Link</>
                  )}
                </Button>

                {quotation.status === 'draft' && (
                  <Button variant="primary" size="sm" onClick={handleMarkAsSent} disabled={isMarkingSent}>
                    {isMarkingSent ? (
                      <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Sending…</>
                    ) : (
                      <><Send className="w-4 h-4 mr-1.5" />Mark as Sent</>
                    )}
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                >
                  {isDownloadingPdf ? (
                    <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Generating…</>
                  ) : (
                    <><Download className="w-4 h-4 mr-1.5" />Download PDF</>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* ── Two-column layout ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ═══════════════════════════════════════════════════════════
                QUOTATION PREVIEW — left 2/3
                ═══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-2">
              <Card className="glass border-white/10 overflow-hidden">
                {/* Preview label */}
                <div className="px-6 py-3 border-b border-white/10 bg-white/5">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Customer Preview
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">This is what the customer sees at their link</p>
                </div>

                <div className="p-8 space-y-8">

                  {/* Company header */}
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{quotation.company_name ?? companyProfile.name}</h2>
                      <div className="mt-2 space-y-1">
                        {quotation.company_phone && (
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                            {quotation.company_phone}
                          </div>
                        )}
                        {quotation.company_email && (
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            {quotation.company_email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <h3 className="text-2xl font-bold text-white tracking-wide">QUOTATION</h3>
                      <p className="text-sm font-mono text-white/60">{quotation.quotation_number}</p>
                      <p className="text-sm text-white/50 mt-2">Date: {formatDate(quotation.created_at)}</p>
                      <p className="text-sm text-white/50">Valid until: {formatDate(quotation.valid_until)}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10" />

                  {/* Customer & site address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-3.5 h-3.5 text-white/30" />
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Prepared for</p>
                      </div>
                      <p className="font-semibold text-white">{quotation.customer_name || '—'}</p>
                      {quotation.customer_address && (
                        <p className="text-sm text-white/60 mt-1 leading-relaxed">{quotation.customer_address}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-white/30" />
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Site address</p>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{quotation.site_address || '—'}</p>
                    </div>
                  </div>

                  {/* Surveyor line */}
                  {quotation.surveyor_name && (
                    <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                      <User className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                      <span className="font-medium text-white/80">{quotation.surveyor_name}</span>
                      {quotation.surveyor_qualifications && (
                        <span className="text-white/40">&middot; {quotation.surveyor_qualifications}</span>
                      )}
                    </div>
                  )}

                  {/* ── Works summary table ── */}
                  <div>
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                      Proposed Works
                    </p>

                    <div className="rounded-xl border border-white/10 overflow-hidden">

                      {/* Mandatory works — grouped by survey type */}
                      {Object.entries(mandatoryByType).map(([surveyType, typeSections]) => (
                        <div key={surveyType}>
                          {/* Survey type heading row */}
                          <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                              {SURVEY_TYPE_WORK_NAMES[surveyType] ?? surveyType}
                            </span>
                          </div>
                          {typeSections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center justify-between px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <span className="text-sm text-white/80">{section.display_name}</span>
                              <span className="text-sm font-medium text-white tabular-nums">
                                {formatCurrency(section.section_total)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* Mandatory subtotal row */}
                      {mandatorySections.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.07] border-b border-white/10">
                          <span className="text-sm font-semibold text-white/70">Mandatory Works Subtotal</span>
                          <span className="text-sm font-semibold text-white tabular-nums">
                            {formatCurrency(mandatoryWorksTotal)}
                          </span>
                        </div>
                      )}

                      {/* Optional works group */}
                      {hasOptional && (
                        <>
                          <div className="px-4 py-2 bg-amber-500/5 border-b border-white/10">
                            <span className="text-xs font-semibold text-amber-400/70 uppercase tracking-wider">
                              Optional Works
                            </span>
                          </div>
                          {optionalSections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center justify-between px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <span className="text-sm text-white/80">{section.display_name}</span>
                              <span className="text-sm font-medium text-amber-300 tabular-nums">
                                {formatCurrency(section.section_total)}
                              </span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between px-4 py-3 bg-amber-500/5 border-b border-white/10">
                            <span className="text-sm font-semibold text-amber-400/70">Optional Works Subtotal</span>
                            <span className="text-sm font-semibold text-amber-300 tabular-nums">
                              {formatCurrency(optionalWorksTotal)}
                            </span>
                          </div>
                        </>
                      )}

                      {/* Project Specific Overheads — site_prep sections + travel overhead combined */}
                      {psoDisplayTotal > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-sky-500/5 border-b border-white/5">
                          <span className="text-sm text-white/70">Project Specific Overheads</span>
                          <span className="text-sm font-medium text-white tabular-nums">
                            {formatCurrency(psoDisplayTotal)}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* ── Totals block ── */}
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <div className="px-6 py-3 bg-white/5 border-b border-white/10">
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Summary</p>
                    </div>
                    <div className="p-6 space-y-3">

                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Mandatory Works</span>
                        <span className="text-white tabular-nums">{formatCurrency(mandatoryWorksTotal)}</span>
                      </div>

                      {hasOptional && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Optional Works</span>
                          <span className="text-amber-300 tabular-nums">{formatCurrency(optionalWorksTotal)}</span>
                        </div>
                      )}

                      {psoDisplayTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Project Specific Overheads</span>
                          <span className="text-white tabular-nums">{formatCurrency(psoDisplayTotal)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm pt-3 border-t border-white/10">
                        <span className="text-white/80 font-medium">Subtotal (exc. VAT)</span>
                        <span className="text-white font-semibold tabular-nums">{formatCurrency(subtotalExVat)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">VAT ({Math.round(quotation.vat_rate * 100)}%)</span>
                        <span className="text-white/80 tabular-nums">{formatCurrency(quotation.vat_amount)}</span>
                      </div>

                      <div className="flex justify-between pt-3 border-t border-white/10">
                        <span className="text-white font-bold">Total (inc. VAT)</span>
                        <span className="text-brand-300 font-bold text-xl tabular-nums">
                          {formatCurrency(quotation.total_incl_vat)}
                        </span>
                      </div>

                      {quotation.deposit_percentage > 0 && (
                        <>
                          <div className="flex justify-between text-sm pt-3 border-t border-white/10">
                            <span className="text-white/60">
                              Deposit required ({Math.round(quotation.deposit_percentage * 100)}%)
                            </span>
                            <span className="text-brand-300 font-semibold tabular-nums">
                              {formatCurrency(quotation.deposit_amount)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Balance due on completion</span>
                            <span className="text-white font-medium tabular-nums">
                              {formatCurrency(balanceDue)}
                            </span>
                          </div>
                        </>
                      )}

                    </div>
                  </div>

                  {/* ── Terms & conditions ── */}
                  <div>
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                      Terms &amp; Conditions
                    </p>
                    <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line bg-white/5 rounded-xl p-5 border border-white/10">
                      {quotation.terms ?? getDefaultTerms(quotation.company_name || companyProfile.name)}
                    </div>
                  </div>

                  {/* ── Surveyor notes (only rendered if populated) ── */}
                  {quotation.notes && (
                    <div>
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                        Notes
                      </p>
                      <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line bg-white/5 rounded-xl p-5 border border-white/10">
                        {quotation.notes}
                      </div>
                    </div>
                  )}

                </div>
              </Card>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                RIGHT COLUMN — edit panel + analytics
                ═══════════════════════════════════════════════════════════ */}
            <div className="space-y-6">

              {/* ── Edit panel ── */}
              <Card className="glass border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                  <h2 className="font-semibold text-white">Edit Quotation</h2>
                  <p className="text-xs text-white/40 mt-0.5">Adjust before sharing with the customer</p>
                </div>
                <div className="p-6 space-y-5">

                  {/* Validity days */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Valid for (days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={editValidityDays}
                      onChange={(e) => setEditValidityDays(parseInt(e.target.value) || 30)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-brand-300/50 focus:ring-1 focus:ring-brand-300/20"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      Currently valid until {formatDate(quotation.valid_until)}
                    </p>
                  </div>

                  {/* Notes to customer */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Notes to customer
                    </label>
                    <textarea
                      rows={4}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Additional context or instructions for the customer…"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-300/50 focus:ring-1 focus:ring-brand-300/20 resize-y"
                    />
                  </div>

                  {/* Terms & conditions */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Terms &amp; Conditions
                    </label>
                    <textarea
                      rows={10}
                      value={editTerms}
                      onChange={(e) => setEditTerms(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-brand-300/50 focus:ring-1 focus:ring-brand-300/20 resize-y"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="w-full justify-center"
                  >
                    {isSaving ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
                    ) : savedSuccess ? (
                      <><Check className="w-4 h-4 mr-2 text-emerald-400" />Saved!</>
                    ) : (
                      <><Save className="w-4 h-4 mr-2" />Save Changes</>
                    )}
                  </Button>
                </div>
              </Card>

              {/* ── Analytics panel (surveyor-only) ── */}
              <Card className="glass border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-white/40" />
                    <h2 className="font-semibold text-white">Engagement</h2>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">Visible to you only — not shown to the customer</p>
                </div>
                <div className="p-6">
                  {quotation.view_count === 0 ? (
                    <div className="text-center py-6">
                      <Eye className="w-10 h-10 text-white/15 mx-auto mb-3" />
                      <p className="text-sm font-medium text-white/50">Not yet viewed</p>
                      <p className="text-xs text-white/30 mt-1 leading-relaxed">
                        Send the customer link — views will appear here once they open it.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">Total views</span>
                        <span className="text-2xl font-bold text-white">{quotation.view_count}</span>
                      </div>

                      {quotation.first_viewed_at && (
                        <div className="pt-3 border-t border-white/10">
                          <p className="text-xs text-white/40 mb-0.5">First viewed</p>
                          <p className="text-sm text-white/80">{formatDateTime(quotation.first_viewed_at)}</p>
                        </div>
                      )}

                      {quotation.last_viewed_at && quotation.last_viewed_at !== quotation.first_viewed_at && (
                        <div>
                          <p className="text-xs text-white/40 mb-0.5">Last viewed</p>
                          <p className="text-sm text-white/80">{formatDateTime(quotation.last_viewed_at)}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {quotation.sent_at && (
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <p className="text-xs text-white/40 mb-0.5">Sent</p>
                      <p className="text-sm text-white/70">{formatDateTime(quotation.sent_at)}</p>
                    </div>
                  )}
                </div>
              </Card>

            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
