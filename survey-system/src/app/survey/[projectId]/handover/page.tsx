'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, AlertCircle, PackageCheck, Users, Calculator,
  Camera, FileText, ExternalLink, Check, Copy, CheckCircle, Download,
  Receipt, Square, CheckSquare,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSmartBack } from '@/hooks/useSmartBack'
import { getSupabase } from '@/lib/supabase-client'
import { setCfExportedAt, markEnquiryClosed } from '@/lib/supabase-data'
import { getHandoverData, generateCustomerCSV, generateJobSummaryText, deriveGuaranteeType } from '@/lib/handover-pack'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { generateCostingFromSurvey } from '@/lib/survey-mapping'
import { loadPricingConfig, loadSectionAdjustments } from '@/lib/pricing-data'
import { calculateTravelOverhead } from '@/lib/travel-overhead'
import { generateCFCSV } from '@/lib/cf-csv-export'
import { useAuth } from '@/context/AuthContext'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { toast } from 'sonner'
import type { HandoverData } from '@/lib/handover-pack'
import type { SurveyPhoto } from '@/types/survey-photo.types'

// =============================================================================
// Handover tracking — persisted in surveys.survey_data.handover_tracking
// =============================================================================

interface HandoverTracking {
  customer_csv_downloaded_at?: string
  cf_estimate_downloaded_at?: string
  photos_downloaded_at?: string
  summary_downloaded_at?: string
  customer_csv_added_to_cf?: boolean
  cf_estimate_added_to_cf?: boolean
  photos_added_to_cf?: boolean
  summary_added_to_cf?: boolean
}

async function loadHandoverTracking(surveyId: string): Promise<HandoverTracking> {
  const supabase = getSupabase()
  if (!supabase) return {}
  const { data } = await supabase
    .from('surveys')
    .select('survey_data')
    .eq('id', surveyId)
    .single()
  return (data?.survey_data as Record<string, unknown>)?.handover_tracking as HandoverTracking || {}
}

async function saveHandoverTracking(surveyId: string, tracking: HandoverTracking): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return
  // Read current survey_data, merge handover_tracking, write back
  const { data } = await supabase
    .from('surveys')
    .select('survey_data')
    .eq('id', surveyId)
    .single()
  const currentData = (data?.survey_data || {}) as Record<string, unknown>
  await supabase
    .from('surveys')
    .update({ survey_data: { ...currentData, handover_tracking: tracking } })
    .eq('id', surveyId)
}

// =============================================================================
// Status tag components
// =============================================================================

function DownloadedTag({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
      <Check className="w-2.5 h-2.5" />
      Downloaded {new Date(date).toLocaleDateString('en-GB')}
    </span>
  )
}

function AddedToCFTag() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
      <CheckCircle className="w-2.5 h-2.5" />
      Added to CF
    </span>
  )
}

function AddToCFCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/70 transition-colors mt-1"
    >
      {checked ? (
        <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
      ) : (
        <Square className="w-3.5 h-3.5" />
      )}
      Added to Contractor Foreman
    </button>
  )
}

// =============================================================================
// Main content
// =============================================================================

function HandoverContent() {
  const params = useParams()
  const projectId = params.projectId as string
  const goBack = useSmartBack(`/surveys/${projectId}`)
  const { profile } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [handoverData, setHandoverData] = useState<HandoverData | null>(null)
  const [photoCount, setPhotoCount] = useState(0)
  const [reportUrl, setReportUrl] = useState<string | null>(null)
  const [quotationUrl, setQuotationUrl] = useState<string | null>(null)

  // Download state
  const [downloadingCustomerCSV, setDownloadingCustomerCSV] = useState(false)
  const [downloadingCFCSV, setDownloadingCFCSV] = useState(false)
  const [downloadingPhotos, setDownloadingPhotos] = useState(false)
  const [downloadingSummary, setDownloadingSummary] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [handedOver, setHandedOver] = useState(false)
  const [confirmingHandover, setConfirmingHandover] = useState(false)

  // Tracking state (persisted)
  const [tracking, setTracking] = useState<HandoverTracking>({})

  // Readiness
  const enquiryStatus = handoverData?.enquiry?.status
  const isReady = enquiryStatus === 'won' || enquiryStatus === 'closed'
  const isWon = !!handoverData?.enquiry?.won_at
  const isAlreadyHandedOver = enquiryStatus === 'closed' || handedOver

  // Persist tracking changes
  const updateTracking = useCallback(async (updates: Partial<HandoverTracking>) => {
    const newTracking = { ...tracking, ...updates }
    setTracking(newTracking)
    await saveHandoverTracking(projectId, newTracking)
  }, [tracking, projectId])

  // Load data
  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [data, savedTracking] = await Promise.all([
          getHandoverData(projectId),
          loadHandoverTracking(projectId),
        ])
        setHandoverData(data)
        setTracking(savedTracking)

        // Count photos
        const surveyData = data.survey.survey_data as Record<string, unknown> | null
        const photos = (surveyData?.photos || []) as SurveyPhoto[]
        setPhotoCount(photos.length)

        // Build report URL
        if (data.report?.publish_token) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
          setReportUrl(`${appUrl}/report/${data.report.id}?token=${data.report.publish_token}`)
        }

        // Build quotation URL
        if (data.quotation?.share_token) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
          setQuotationUrl(`${appUrl}/q/${data.quotation.share_token}`)
        }

        if (data.enquiry?.status === 'closed') {
          setHandedOver(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load handover data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [projectId])

  // Download helpers
  function downloadBlob(content: string, filename: string, type: string) {
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + content], { type: `${type};charset=utf-8` })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Customer CSV
  const handleCustomerCSV = useCallback(async () => {
    if (!handoverData) return
    setDownloadingCustomerCSV(true)
    try {
      const { csv, filename } = generateCustomerCSV(handoverData)
      downloadBlob(csv, filename, 'text/csv')
      toast.success('Customer CSV downloaded')
      updateTracking({ customer_csv_downloaded_at: new Date().toISOString() })
    } catch {
      toast.error('Failed to generate customer CSV')
    } finally {
      setDownloadingCustomerCSV(false)
    }
  }, [handoverData, updateTracking])

  // CF Estimate CSV
  const handleCFCSV = useCallback(async () => {
    if (!handoverData) return
    setDownloadingCFCSV(true)
    try {
      const { wizardData, rooms } = await loadWizardData(projectId)
      if (!wizardData) throw new Error('No wizard data found')

      const pricingConfig = await loadPricingConfig()
      const costingResults = await generateCostingFromSurvey(
        projectId, wizardData, rooms
      )
      const surveyTypes = Object.keys(costingResults).filter(t => t !== 'site_preparation')

      const hasAnyCosts = Object.values(costingResults).some(r => r.lines.length > 0)
      if (!hasAnyCosts) {
        toast.error('No costing data — complete the survey wizard first')
        return
      }

      const sectionAdjustments = await loadSectionAdjustments(projectId)

      const aw = wizardData.additional_works
      const totalLabourHours = Object.values(costingResults).reduce(
        (sum, r) => sum + r.lines.reduce((s, l) => s + l.result.labourHours, 0), 0
      )
      const travelOverhead = calculateTravelOverhead({
        totalLabourHours,
        distanceFromOffice: aw?.distance_from_office || 0,
        numMenTravelling: aw?.num_men_travelling || 1,
        hourlyLabourRate: pricingConfig.hourly_labour_rate || 30.63,
        vehicleCostPerMile: pricingConfig.vehicle_cost_per_mile || 0.5,
        productiveHoursPerDay: pricingConfig.productive_hours_per_day || 6.5,
        travelSpeedMph: pricingConfig.travel_speed_mph || 30,
      })

      const { csv, filename } = generateCFCSV(
        costingResults, travelOverhead, sectionAdjustments,
        surveyTypes.filter(t => t !== 'site_preparation'), projectId,
        pricingConfig.hourly_labour_rate || 30.63
      )

      downloadBlob(csv, filename, 'text/csv')
      toast.success('CF Estimate CSV downloaded')
      updateTracking({ cf_estimate_downloaded_at: new Date().toISOString() })

      if (handoverData.enquiry?.id) {
        setCfExportedAt(handoverData.enquiry.id).catch(() => {})
      }
    } catch (err) {
      toast.error('Failed to generate CF CSV')
      console.error('CF CSV error:', err)
    } finally {
      setDownloadingCFCSV(false)
    }
  }, [handoverData, projectId, updateTracking])

  // Photos ZIP
  const handlePhotosZip = useCallback(async () => {
    setDownloadingPhotos(true)
    try {
      const response = await fetch(`/api/surveys/${projectId}/photos-zip`)
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to generate photos ZIP')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const disposition = response.headers.get('Content-Disposition')
      a.download = disposition?.match(/filename="(.+)"/)?.[1] || `Photos-${projectId}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Photos ZIP downloaded')
      updateTracking({ photos_downloaded_at: new Date().toISOString() })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to download photos')
    } finally {
      setDownloadingPhotos(false)
    }
  }, [projectId, updateTracking])

  // Job Summary
  const handleJobSummary = useCallback(async () => {
    if (!handoverData) return
    setDownloadingSummary(true)
    try {
      const { text, filename } = generateJobSummaryText(handoverData)
      downloadBlob(text, filename, 'text/plain')
      toast.success('Job summary downloaded')
      updateTracking({ summary_downloaded_at: new Date().toISOString() })
    } catch {
      toast.error('Failed to generate job summary')
    } finally {
      setDownloadingSummary(false)
    }
  }, [handoverData, updateTracking])

  // Copy summary to clipboard
  const handleCopySummary = useCallback(async () => {
    if (!handoverData) return
    try {
      const { text } = generateJobSummaryText(handoverData)
      await navigator.clipboard.writeText(text)
      setCopiedSummary(true)
      toast.success('Summary copied to clipboard')
      setTimeout(() => setCopiedSummary(false), 3000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }, [handoverData])

  // Mark as Closed (handover complete)
  const handleMarkHandedOver = useCallback(async () => {
    if (!handoverData?.enquiry?.id) return

    if (handoverData.enquiry.status !== 'won') {
      toast.error('Lead must be in Won status before closing')
      return
    }

    setConfirmingHandover(true)
    try {
      await markEnquiryClosed(handoverData.enquiry.id, profile?.id || null)
      setHandedOver(true)
      toast.success('Handover complete — lead closed')
    } catch {
      toast.error('Failed to close handover')
    } finally {
      setConfirmingHandover(false)
    }
  }, [handoverData, profile])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-white/30" />
      </div>
    )
  }

  if (error || !handoverData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <p className="text-red-300">{error || 'Failed to load data'}</p>
        </div>
      </div>
    )
  }

  const { survey, customer, enquiry, quotation } = handoverData
  const guarantee = deriveGuaranteeType(survey.survey_type, survey.survey_tags)
  const customerName = customer
    ? `${customer.first_name} ${customer.last_name}`
    : enquiry?.client_name || 'Unknown'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={goBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/60" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <PackageCheck className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">Handover Pack</h1>
            {isAlreadyHandedOver && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Handed Over
              </span>
            )}
          </div>
          <p className="text-sm text-white/50 mt-1">
            {survey.project_number} — {customerName}
          </p>
        </div>
      </div>

      {/* Readiness banner */}
      {!isReady && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Not ready for handover</p>
            <p className="text-xs text-amber-300/70 mt-1">
              The enquiry must be in Accepted or Completed status with the deposit marked as paid before the handover pack can be used.
            </p>
          </div>
        </div>
      )}

      {isReady && !isWon && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Deposit not yet received</p>
            <p className="text-xs text-amber-300/70 mt-1">
              The deposit payment has not been marked as paid. You can still download exports, but the job is not officially won.
            </p>
          </div>
        </div>
      )}

      {/* Download cards — 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer CSV */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Customer Details CSV</h3>
              <p className="text-xs text-white/40">Customer import file for Contractor Foreman</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tracking.customer_csv_downloaded_at && <DownloadedTag date={tracking.customer_csv_downloaded_at} />}
            {tracking.customer_csv_added_to_cf && <AddedToCFTag />}
          </div>
          <Button
            onClick={handleCustomerCSV}
            disabled={downloadingCustomerCSV}
            className="w-full"
            variant="secondary"
          >
            {downloadingCustomerCSV ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download CSV
          </Button>
          <AddToCFCheckbox
            checked={!!tracking.customer_csv_added_to_cf}
            onChange={v => updateTracking({ customer_csv_added_to_cf: v })}
          />
        </Card>

        {/* CF Estimate CSV */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">CF Estimate CSV</h3>
              <p className="text-xs text-white/40">Estimate import with scope of works and pricing</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tracking.cf_estimate_downloaded_at && <DownloadedTag date={tracking.cf_estimate_downloaded_at} />}
            {tracking.cf_estimate_added_to_cf && <AddedToCFTag />}
          </div>
          <Button
            onClick={handleCFCSV}
            disabled={downloadingCFCSV}
            className="w-full"
            variant="secondary"
          >
            {downloadingCFCSV ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download CF Estimate
          </Button>
          <AddToCFCheckbox
            checked={!!tracking.cf_estimate_added_to_cf}
            onChange={v => updateTracking({ cf_estimate_added_to_cf: v })}
          />
        </Card>

        {/* Photos ZIP */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Survey Photos & Sketches</h3>
              <p className="text-xs text-white/40">
                {photoCount > 0 ? `${photoCount} photo${photoCount !== 1 ? 's' : ''} + sketch plans` : 'All photos and sketch plans'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tracking.photos_downloaded_at && <DownloadedTag date={tracking.photos_downloaded_at} />}
            {tracking.photos_added_to_cf && <AddedToCFTag />}
          </div>
          <Button
            onClick={handlePhotosZip}
            disabled={downloadingPhotos || photoCount === 0}
            className="w-full"
            variant="secondary"
          >
            {downloadingPhotos ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {downloadingPhotos ? 'Preparing ZIP...' : 'Download Photos ZIP'}
          </Button>
          <AddToCFCheckbox
            checked={!!tracking.photos_added_to_cf}
            onChange={v => updateTracking({ photos_added_to_cf: v })}
          />
        </Card>

        {/* Job Summary */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Job Summary Notes</h3>
              <p className="text-xs text-white/40">Plain text summary for CF Project notes</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tracking.summary_downloaded_at && <DownloadedTag date={tracking.summary_downloaded_at} />}
            {tracking.summary_added_to_cf && <AddedToCFTag />}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleJobSummary}
              disabled={downloadingSummary}
              className="flex-1"
              variant="secondary"
            >
              {downloadingSummary ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download
            </Button>
            <Button
              onClick={handleCopySummary}
              variant="secondary"
              className="flex-1"
            >
              {copiedSummary ? (
                <Check className="w-4 h-4 mr-2 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copiedSummary ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <AddToCFCheckbox
            checked={!!tracking.summary_added_to_cf}
            onChange={v => updateTracking({ summary_added_to_cf: v })}
          />
        </Card>
      </div>

      {/* Quotation Link */}
      <Card className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Receipt className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Quotation</h3>
              <p className="text-xs text-white/40">
                {quotation
                  ? `${quotation.quotation_number} — ${quotation.status === 'accepted' ? 'Accepted' : quotation.status}`
                  : 'No quotation generated'}
              </p>
            </div>
          </div>
          {quotationUrl ? (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  await navigator.clipboard.writeText(quotationUrl)
                  toast.success('Quotation link copied')
                }}
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy Link
              </Button>
              <a href={quotationUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  View Quote
                </Button>
              </a>
            </div>
          ) : quotation ? (
            <Link href={`/survey/${projectId}/quotation/${quotation.id}`}>
              <Button variant="secondary" size="sm">
                Go to Quotation
              </Button>
            </Link>
          ) : null}
        </div>
      </Card>

      {/* Report Link */}
      <Card className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Survey Report</h3>
              <p className="text-xs text-white/40">
                {reportUrl
                  ? 'Published report — share link or print to PDF from browser'
                  : 'Report not yet published'}
              </p>
            </div>
          </div>
          {reportUrl ? (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  await navigator.clipboard.writeText(reportUrl)
                  toast.success('Report link copied')
                }}
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy Link
              </Button>
              <a href={reportUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Open Report
                </Button>
              </a>
            </div>
          ) : (
            <Link href={`/survey/${projectId}/report`}>
              <Button variant="secondary" size="sm">
                Go to Report
              </Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Guarantee Summary */}
      <Card className="glass-card p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/10">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Guarantee</h3>
        </div>
        <p className="text-sm text-white/70 ml-12">{guarantee.description}</p>
      </Card>

      {/* Handover Complete */}
      {isReady && !isAlreadyHandedOver && (
        <div className="pt-4 border-t border-white/10">
          {enquiry?.status === 'won' ? (
            <Button
              onClick={handleMarkHandedOver}
              disabled={confirmingHandover}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              {confirmingHandover ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <PackageCheck className="w-4 h-4 mr-2" />
              )}
              Handover Complete
            </Button>
          ) : (
            <p className="text-xs text-white/30 text-center">
              Lead must be in Won status before completing handover
            </p>
          )}
        </div>
      )}

      {isAlreadyHandedOver && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-indigo-300">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Handed over to Contractor Foreman</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HandoverPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'office']}>
      <Layout>
        <HandoverContent />
      </Layout>
    </ProtectedRoute>
  )
}
