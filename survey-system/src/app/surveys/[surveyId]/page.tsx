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
  MapPin,
  User,
  Calendar,
  Cloud,
  Check,
  AlertCircle,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import type { Project, SurveyType } from '@/types/database.types'
import { getProject as getSupabaseProject } from '@/lib/supabase-data'
import { getSupabase } from '@/lib/supabase-client'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string; label: string }> = {
  damp: { icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-400/30', label: 'Damp Survey' },
  timber: { icon: Bug, color: 'text-amber-400', bgColor: 'bg-amber-500/20 border-amber-400/30', label: 'Timber Survey' },
  woodworm: { icon: Bug, color: 'text-amber-300', bgColor: 'bg-amber-500/20 border-amber-400/30', label: 'Woodworm Survey' },
  condensation: { icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20 border-cyan-400/30', label: 'Condensation Survey' },
}

export default function SurveyDetailPage({ params }: { params: { surveyId: string } }) {
  const [survey, setSurvey] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportStatus, setReportStatus] = useState<string | null>(null)

  useEffect(() => {
    async function loadSurvey() {
      try {
        setIsLoading(true)
        const data = await getSupabaseProject(params.surveyId)
        setSurvey(data)

        if (data) {
          const supabase = getSupabase()
          if (supabase) {
            const { data: report } = await supabase
              .from('survey_reports')
              .select('status')
              .eq('survey_id', data.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single()
            if (report) {
              setReportStatus(report.status)
            }
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
