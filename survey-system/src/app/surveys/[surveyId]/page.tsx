'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Droplets,
  Bug,
  Wind,
  ClipboardList,
  Calculator,
  FileText,
  HardHat,
  MapPin,
  User,
  Calendar,
  Cloud,
  Check,
  AlertCircle,
  Copy,
  Eye,
  Receipt,
  Clock,
  Send,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import type { Survey } from '@/types/database.types'
import { getSurvey as getSupabaseSurvey } from '@/lib/supabase-data'
import { getSupabase } from '@/lib/supabase-client'

// ─── Quotation types & config ────────────────────────────────────────────────

interface QuotationSummary {
  id: string
  quotation_number: string
  version: number
  share_token: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'
  total_incl_vat: number
  created_at: string
  valid_until: string
  view_count: number
  last_viewed_at: string | null
}

const QUOTATION_STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; label: string; Icon: React.FC<{ className?: string }> }> = {
  draft:    { bg: 'bg-gray-500/10',    text: 'text-gray-400',    border: 'border-gray-400/30',    label: 'Draft',    Icon: Clock },
  sent:     { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-400/30',    label: 'Sent',     Icon: Send },
  viewed:   { bg: 'bg-purple-500/10',  text: 'text-purple-400',  border: 'border-purple-400/30',  label: 'Viewed',   Icon: Eye },
  accepted: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'Accepted', Icon: CheckCircle },
  declined: { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-400/30',     label: 'Declined', Icon: XCircle },
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(value)
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB')
}

function formatDateTimeLong(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string; label: string }> = {
  damp: { icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-400/30', label: 'Damp Survey' },
  timber: { icon: Bug, color: 'text-amber-400', bgColor: 'bg-amber-500/20 border-amber-400/30', label: 'Timber Survey' },
  woodworm: { icon: Bug, color: 'text-amber-300', bgColor: 'bg-amber-500/20 border-amber-400/30', label: 'Woodworm Survey' },
  condensation: { icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20 border-cyan-400/30', label: 'Condensation Survey' },
}

export default function SurveyDetailPage({ params }: { params: { surveyId: string } }) {
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportStatus, setReportStatus] = useState<string | null>(null)
  const [quotation, setQuotation] = useState<QuotationSummary | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    async function loadSurvey() {
      try {
        setIsLoading(true)
        const data = await getSupabaseSurvey(params.surveyId)
        setSurvey(data)

        if (data) {
          const supabase = getSupabase()
          if (supabase) {
            const [{ data: report }, { data: q }] = await Promise.all([
              supabase
                .from('survey_reports')
                .select('status')
                .eq('survey_id', data.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single(),
              supabase
                .from('quotations')
                .select('id, quotation_number, version, share_token, status, total_incl_vat, created_at, valid_until, view_count, last_viewed_at')
                .eq('survey_id', data.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single(),
            ])
            if (report) setReportStatus(report.status)
            if (q) setQuotation(q as QuotationSummary)
          }
        }
      } catch (err) {
        console.error('Error loading survey:', err)
        setError('Failed to load survey')
      } finally {
        setIsLoading(false)
      }
    }
    loadSurvey()
  }, [params.surveyId])

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading survey...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (error || !survey) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white">
                {error || 'Survey not found'}
              </h2>
              <Link href="/surveys" className="btn-primary mt-6 inline-block">
                Back to Surveys
              </Link>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  function handleCopyLink() {
    if (!quotation) return
    navigator.clipboard.writeText(`${window.location.origin}/q/${quotation.share_token}`)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const config = surveyTypeConfig[survey.survey_type] || surveyTypeConfig.damp
  const Icon = config.icon
  const isComplete = survey.survey_completed || false
  const reportedProblem = survey.reported_problem_override || survey.reported_problem

  // Survey date and weather live in the JSONB survey_data.site_details (set by wizard),
  // with top-level columns as fallback (set at survey creation time).
  const siteDetails = (survey.survey_data as any)?.site_details
  const surveyDate = siteDetails?.inspection_date || survey.survey_date
  const weatherConditions = siteDetails?.weather_conditions || survey.weather_conditions

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* ── Header ── */}
          <div>
            <Link
              href="/surveys"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Surveys
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${config.bgColor} border`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-mono text-white/50">
                      {survey.project_number}
                    </span>
                    <span className={`badge ${config.bgColor} ${config.color} border`}>
                      {config.label}
                    </span>
                    {isComplete ? (
                      <span className="badge bg-emerald-500/20 border-emerald-400/30 text-emerald-300 border">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Survey Complete
                      </span>
                    ) : (
                      <span className="badge bg-amber-500/20 border-amber-400/30 text-amber-300 border">
                        Not Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-white mt-1">
                    {survey.client_name || 'Unknown Client'}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* ── Survey Information ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Details */}
            <div className="glass-card">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <User className="w-4 h-4 text-white/50" />
                <h3 className="font-semibold text-white">Client Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <InfoRow label="Name" value={survey.client_name || '-'} />
                <InfoRow label="Email" value={survey.customer?.email || '-'} />
                <InfoRow label="Phone" value={survey.customer?.phone || '-'} />
              </div>
            </div>

            {/* Site Address */}
            <div className="glass-card">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/50" />
                <h3 className="font-semibold text-white">Site Address</h3>
              </div>
              <div className="p-6 space-y-4">
                <InfoRow label="Address" value={survey.site_address} />
                {survey.site_address_line2 && (
                  <InfoRow label="" value={survey.site_address_line2} />
                )}
                <InfoRow label="City" value={survey.site_city || '-'} />
                <InfoRow label="County" value={survey.site_county || '-'} />
                <InfoRow label="Postcode" value={survey.site_postcode} />
              </div>
            </div>

            {/* Survey Metadata */}
            <div className="glass-card">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/50" />
                <h3 className="font-semibold text-white">Survey Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <InfoRow
                  label="Survey Date"
                  value={surveyDate
                    ? new Date(surveyDate).toLocaleDateString('en-GB')
                    : '-'}
                />
                <InfoRow label="Weather" value={weatherConditions
                  ? weatherConditions.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                  : '-'} />
                <InfoRow label="Reference" value={survey.project_number} />
                {reportStatus && (
                  <div>
                    <p className="text-sm text-white/50">Report Status</p>
                    <span className={`badge mt-1 border ${
                      reportStatus === 'draft' ? 'bg-white/10 border-white/20 text-white/70' :
                      reportStatus === 'generated' ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' :
                      reportStatus === 'reviewed' ? 'bg-amber-500/20 border-amber-400/30 text-amber-300' :
                      reportStatus === 'finalised' ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' : ''
                    }`}>
                      {reportStatus.charAt(0).toUpperCase() + reportStatus.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Notes & Reported Problem */}
            <div className="glass-card">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-white/50" />
                <h3 className="font-semibold text-white">Notes</h3>
              </div>
              <div className="p-6 space-y-4">
                {reportedProblem && (
                  <div>
                    <p className="text-sm text-white/50 mb-1">Reported Problem</p>
                    <p className="text-white/80">{reportedProblem}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-white/50 mb-1">Survey Notes</p>
                  <p className="text-white/80">
                    {survey.notes || 'No notes added.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Quotation ── */}
          {quotation ? (() => {
            const qStatus = QUOTATION_STATUS_CONFIG[quotation.status] ?? QUOTATION_STATUS_CONFIG.draft
            const QIcon = qStatus.Icon
            const isExpired = new Date(quotation.valid_until) < new Date()
            return (
              <div className="glass-card">
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-white/50" />
                    <h3 className="font-semibold text-white">Quotation</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${qStatus.bg} ${qStatus.text} ${qStatus.border}`}>
                    <QIcon className="w-3 h-3" />
                    {qStatus.label}
                  </span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Reference</p>
                      <p className="font-medium text-white text-sm">{quotation.quotation_number} <span className="text-white/40">v{quotation.version}</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Total (inc. VAT)</p>
                      <p className="font-bold text-brand-300">{formatCurrency(quotation.total_incl_vat)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Generated</p>
                      <p className="font-medium text-white text-sm">{formatDateShort(quotation.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Valid Until</p>
                      <p className={`font-medium text-sm ${isExpired ? 'text-red-400' : 'text-white'}`}>
                        {formatDateShort(quotation.valid_until)}
                        {isExpired && <span className="ml-1 text-xs font-normal">(Expired)</span>}
                      </p>
                    </div>
                  </div>
                  {quotation.view_count > 0 && (
                    <p className="text-sm text-white/50 mb-4 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      Viewed {quotation.view_count} time{quotation.view_count !== 1 ? 's' : ''}
                      {quotation.last_viewed_at && <>, last on {formatDateTimeLong(quotation.last_viewed_at)}</>}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/survey/${params.surveyId}/quotation/${quotation.id}`}
                      className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Quotation
                    </Link>
                    <button
                      onClick={handleCopyLink}
                      className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
                    >
                      {copiedLink ? (
                        <><Check className="w-4 h-4 text-emerald-400" />Copied!</>
                      ) : (
                        <><Copy className="w-4 h-4" />Copy Customer Link</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })() : (
            <div className="glass-card">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-white/50" />
                <h3 className="font-semibold text-white">Quotation</h3>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-white/60 text-sm">No quotation has been generated yet.</p>
                  <p className="text-white/40 text-xs mt-1">Complete the costing then use the &ldquo;Generate Quotation&rdquo; button to create one.</p>
                </div>
                {isComplete && (
                  <Link
                    href={`/survey/${params.surveyId}/costing`}
                    className="btn-secondary flex items-center gap-2 text-sm px-4 py-2 whitespace-nowrap"
                  >
                    <Calculator className="w-4 h-4" />
                    Go to Costing
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* ── Actions ── */}
          <div className="glass-card">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-semibold text-white">Actions</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/survey/${survey.id}/wizard`}
                  className="btn-primary flex items-center gap-2 px-6 py-3 text-base"
                >
                  <ClipboardList className="w-5 h-5" />
                  {isComplete ? 'Continue Survey' : 'Start Survey'}
                </Link>

                {isComplete && (
                  <>
                    <Link
                      href={`/survey/${survey.id}/costing`}
                      className="btn-secondary flex items-center gap-2 px-6 py-3 text-base"
                    >
                      <Calculator className="w-5 h-5" />
                      View Costing
                    </Link>
                    <Link
                      href={`/survey/${survey.id}/report`}
                      className="btn-secondary flex items-center gap-2 px-6 py-3 text-base"
                    >
                      <FileText className="w-5 h-5" />
                      {reportStatus ? 'View Report' : 'Generate Report'}
                    </Link>
                    <Link
                      href={`/survey/${survey.id}/installer-info`}
                      className="btn-secondary flex items-center gap-2 px-6 py-3 text-base"
                    >
                      <HardHat className="w-5 h-5" />
                      Installer Info
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      {label && <p className="text-sm text-white/50">{label}</p>}
      <p className="font-medium text-white">{value}</p>
    </div>
  )
}
