'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, AlertCircle, PackageCheck, Users, Calculator,
  Camera, FileText, ExternalLink, Check, Copy, CheckCircle, Download,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSmartBack } from '@/hooks/useSmartBack'
import { getSupabase } from '@/lib/supabase-client'
import { setCfExportedAt, markEnquiryHandedOver } from '@/lib/supabase-data'
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

function HandoverContent() {
  const params = useParams()
  const projectId = params.projectId as string
  const { goBack } = useSmartBack()
  const { user, profile } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [handoverData, setHandoverData] = useState<HandoverData | null>(null)
  const [photoCount, setPhotoCount] = useState(0)
  const [reportUrl, setReportUrl] = useState<string | null>(null)

  // Download state
  const [downloadingCustomerCSV, setDownloadingCustomerCSV] = useState(false)
  const [downloadingCFCSV, setDownloadingCFCSV] = useState(false)
  const [downloadingPhotos, setDownloadingPhotos] = useState(false)
  const [downloadingSummary, setDownloadingSummary] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [handedOver, setHandedOver] = useState(false)
  const [confirmingHandover, setConfirmingHandover] = useState(false)

  // Readiness
  const enquiryStatus = handoverData?.enquiry?.status
  const isReady = enquiryStatus === 'accepted' || enquiryStatus === 'completed' || enquiryStatus === 'handed_over'
  const isWon = !!handoverData?.enquiry?.won_at
  const isAlreadyHandedOver = enquiryStatus === 'handed_over' || handedOver

  // Load data
  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getHandoverData(projectId)
        setHandoverData(data)

        // Count photos
        const surveyData = data.survey.survey_data as Record<string, unknown> | null
        const photos = (surveyData?.photos || []) as SurveyPhoto[]
        setPhotoCount(photos.length)

        // Build report URL
        if (data.report?.publish_token) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
          setReportUrl(`${appUrl}/report/${data.report.id}?token=${data.report.publish_token}`)
        }

        if (data.enquiry?.status === 'handed_over') {
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
    } catch (err) {
      toast.error('Failed to generate customer CSV')
    } finally {
      setDownloadingCustomerCSV(false)
    }
  }, [handoverData])

  // CF Estimate CSV
  const handleCFCSV = useCallback(async () => {
    if (!handoverData) return
    setDownloadingCFCSV(true)
    try {
      // Load costing data (same as costing page)
      const { wizardData, rooms } = await loadWizardData(projectId)
      if (!wizardData) throw new Error('No wizard data found')

      const pricingConfig = await loadPricingConfig()
      const { costingResults, surveyTypes } = await generateCostingFromSurvey(
        wizardData, rooms, pricingConfig
      )

      // Check if any results have costs
      const hasAnyCosts = Object.values(costingResults).some(r => r.lines.length > 0)
      if (!hasAnyCosts) {
        toast.error('No costing data — complete the survey wizard first')
        return
      }

      // Load section adjustments
      const sectionAdjustments = await loadSectionAdjustments(projectId)

      // Calculate travel overhead
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
      })

      const { csv, filename } = generateCFCSV(
        costingResults, travelOverhead, sectionAdjustments,
        surveyTypes.filter(t => t !== 'site_preparation'), projectId
      )

      downloadBlob(csv, filename, 'text/csv')
      toast.success('CF Estimate CSV downloaded')

      // Fire-and-forget: set cf_exported_at
      if (handoverData.enquiry?.id) {
        setCfExportedAt(handoverData.enquiry.id).catch(() => {})
      }
    } catch (err) {
      toast.error('Failed to generate CF CSV')
      console.error('CF CSV error:', err)
    } finally {
      setDownloadingCFCSV(false)
    }
  }, [handoverData, projectId])

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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to download photos')
    } finally {
      setDownloadingPhotos(false)
    }
  }, [projectId])

  // Job Summary
  const handleJobSummary = useCallback(async () => {
    if (!handoverData) return
    setDownloadingSummary(true)
    try {
      const { text, filename } = generateJobSummaryText(handoverData)
      downloadBlob(text, filename, 'text/plain')
      toast.success('Job summary downloaded')
    } catch (err) {
      toast.error('Failed to generate job summary')
    } finally {
      setDownloadingSummary(false)
    }
  }, [handoverData])

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

  // Mark as Handed Over
  const handleMarkHandedOver = useCallback(async () => {
    if (!handoverData?.enquiry?.id) return

    // Guard: must be completed first
    if (handoverData.enquiry.status !== 'completed') {
      toast.error('Enquiry must be marked as Completed before handing over')
      return
    }

    setConfirmingHandover(true)
    try {
      await markEnquiryHandedOver(handoverData.enquiry.id, user?.id || null)
      setHandedOver(true)
      toast.success('Enquiry marked as Handed Over')
    } catch (err) {
      toast.error('Failed to mark as handed over')
    } finally {
      setConfirmingHandover(false)
    }
  }, [handoverData, user])

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

  const { survey, customer, enquiry, quotation, quotationSections } = handoverData
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
            <div>
              <h3 className="text-sm font-semibold text-white">Customer Details CSV</h3>
              <p className="text-xs text-white/40">Customer import file for Contractor Foreman</p>
            </div>
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
        </Card>

        {/* CF Estimate CSV */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">CF Estimate CSV</h3>
              <p className="text-xs text-white/40">Estimate import with scope of works and pricing</p>
            </div>
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
        </Card>

        {/* Photos ZIP */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Survey Photos & Sketches</h3>
              <p className="text-xs text-white/40">
                {photoCount > 0 ? `${photoCount} photo${photoCount !== 1 ? 's' : ''} + sketch plans` : 'All photos and sketch plans'}
              </p>
            </div>
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
        </Card>

        {/* Job Summary */}
        <Card className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Job Summary Notes</h3>
              <p className="text-xs text-white/40">Plain text summary for CF Project notes</p>
            </div>
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
        </Card>
      </div>

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

      {/* Mark as Handed Over */}
      {isReady && !isAlreadyHandedOver && (
        <div className="pt-4 border-t border-white/10">
          {enquiry?.status === 'completed' ? (
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
              Mark as Handed Over to Contractor Foreman
            </Button>
          ) : (
            <p className="text-xs text-white/30 text-center">
              Mark the enquiry as Completed before marking as Handed Over
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
