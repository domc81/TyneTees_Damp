'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSmartBack } from '@/hooks/useSmartBack'
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  Check,
  Edit2,
  Save,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  Globe,
  Copy,
  ExternalLink,
  Link2,
  Send,
  Mail,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { generateReport, regenerateReport, regenerateSection } from '@/lib/report-generator'
import {
  loadReportBySurvey,
  updateReportSection,
  updateReportSectionPhotos,
  updateReportStatus,
} from '@/lib/report-data'
import { publishReport, unpublishReport } from '@/lib/report-publish'
import { validateReportCompleteness, ValidationWarning } from '@/lib/report-validation'
import { getPhotoUrl } from '@/lib/survey-photo-service'
import { serializeWrite } from '@/lib/write-queue'
import type {
  SurveyReport,
  ReportSection,
  ReportStatus,
} from '@/types/survey-report.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'
import { getSupabase } from '@/lib/supabase-client'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Section categories
const REVIEWABLE_SECTIONS = new Set([
  'property',
  'external_inspection',
  'inaccessible_areas',
  'dpc_findings',
  'sub_floor_ventilation',
  'room_findings',
  'condensation_causes',
  'party_wall_notification',
  'scope_of_works',
  'treatment_methodology',
  'woodworm_treatment_methodology',
  'summary_of_works',
  'surveyor_comments',
  'surveyor_profile',
  'sketch_plan',
])

const AUTOMATIC_SECTIONS = new Set([
  'cover',
  'about_us',
  'survey_context',
  'ancillary_items',
  'extent_of_survey',
  'payment_terms',
])

// Status badge colors
const STATUS_COLORS: Record<ReportStatus, { bg: string; text: string; border: string }> = {
  draft: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-400/30' },
  generated: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30' },
  reviewed: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  finalised: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-400/30' },
  published: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-400/30' },
}

// Content source badge colors
const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  template: { bg: 'bg-gray-500/10', text: 'text-gray-400' },
  survey_data: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  llm_generated: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  mixed: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  costing_data: { bg: 'bg-green-500/10', text: 'text-green-400' },
  surveyor_input: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
}

export default function ReportEditorPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const goBack = useSmartBack(`/surveys/${projectId}`)

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<SurveyReport | null>(null)
  const [photos, setPhotos] = useState<SurveyPhoto[]>([])
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  // Warn before leaving with unsaved edits
  useEffect(() => {
    if (!editingSection) return
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault() }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [editingSection])
  const [savingSection, setSavingSection] = useState(false)
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({})
  const [activeSectionKey, setActiveSectionKey] = useState<string>('')
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
  const [showAllSections, setShowAllSections] = useState(false)
  const [standardSectionsExpanded, setStandardSectionsExpanded] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendConfirm, setSendConfirm] = useState(false)
  // Duplicate-send guard (review pt 3): set when the API reports a prior send
  const [resendPrompt, setResendPrompt] = useState<{ lastSentAt?: string; lastSentTo?: string } | null>(null)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)
  const [customerEmail, setCustomerEmail] = useState<string | null>(null)
  const [projectNumber, setProjectNumber] = useState<string | null>(null)
  // Pending styled-dialog confirmation (replaces native window.confirm)
  const [confirmAction, setConfirmAction] = useState<null | 'finalise' | 'unpublish' | 'regenerate'>(null)
  // Live wizard state used to detect data added AFTER report generation
  // (TT-2026-0035: defect photos + extended comments arrived post-generation)
  const [liveComments, setLiveComments] = useState<string>('')
  const [liveRoomIds, setLiveRoomIds] = useState<string[]>([])

  // Section refs for scrolling
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  // Ref to prevent concurrent generation from StrictMode double-render
  const isGeneratingRef = useRef(false)

  // Load report on mount
  useEffect(() => {
    loadReportData()
  }, [projectId])

  // Load customer email for the send button
  useEffect(() => {
    async function loadCustomerEmail() {
      const supabase = getSupabase()
      if (!supabase) return

      const { data: survey } = await supabase
        .from('surveys')
        .select('customer_id, project_number, customers ( email )')
        .eq('id', projectId)
        .single()

      if (survey?.customers) {
        const c = survey.customers as unknown as { email: string | null }
        setCustomerEmail(c?.email || null)
      }
      setProjectNumber(survey?.project_number ?? null)
    }
    loadCustomerEmail()
  }, [projectId])

  async function loadReportData() {
    setIsLoading(true)
    setError(null)

    try {
      // Check if report exists
      const existingReport = await loadReportBySurvey(projectId)

      if (existingReport) {
        setReport(existingReport)
        // Set active section to first reviewable section
        const firstReviewable = existingReport.sections.find((s) =>
          REVIEWABLE_SECTIONS.has(s.key)
        )
        if (firstReviewable) {
          setActiveSectionKey(firstReviewable.key)
        } else if (existingReport.sections.length > 0) {
          setActiveSectionKey(existingReport.sections[0].key)
        }
        setIsLoading(false)
      } else {
        // No report exists - auto-generate it
        setIsLoading(false)
        if (!isGeneratingRef.current) {
          isGeneratingRef.current = true
          await handleGenerateReport()
        }
      }

      // Load photos + live wizard state (for stale-report detection)
      const supabase = getSupabase()
      if (supabase) {
        const [{ data: survey }, { data: roomRows }] = await Promise.all([
          supabase
            .from('surveys')
            .select('survey_data')
            .eq('id', projectId)
            .single(),
          supabase
            .from('survey_rooms')
            .select('id')
            .eq('survey_id', projectId),
        ])

        if (survey?.survey_data?.photos) {
          setPhotos(survey.survey_data.photos)
        }
        setLiveComments(
          ((survey?.survey_data?.surveyor_additional_comments as string) || '').trim()
        )
        setLiveRoomIds((roomRows || []).map((r: { id: string }) => r.id))
      }
    } catch (err) {
      console.error('Error loading report:', err)
      setError(err instanceof Error ? err.message : 'Failed to load report')
      setIsLoading(false)
    }
  }

  // Generate new report
  async function handleGenerateReport() {
    setIsGenerating(true)
    setError(null)

    try {
      const newReport = await generateReport(projectId)
      setReport(newReport)
      // Set active section to first reviewable section
      const firstReviewable = newReport.sections.find((s) =>
        REVIEWABLE_SECTIONS.has(s.key)
      )
      if (firstReviewable) {
        setActiveSectionKey(firstReviewable.key)
      } else if (newReport.sections.length > 0) {
        setActiveSectionKey(newReport.sections[0].key)
      }
    } catch (err) {
      console.error('Error generating report:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate report')
    } finally {
      setIsGenerating(false)
      isGeneratingRef.current = false
    }
  }

  // Regenerate the whole report from the latest survey data (photos, comments,
  // room findings added after the original generation). Replaces all sections
  // in the existing row — manual edits are lost (confirmed via dialog first).
  async function handleRegenerateReport() {
    if (!report) return
    setIsGenerating(true)
    setError(null)
    setEditingSection(null)

    try {
      const refreshed = await regenerateReport(report.id)
      setReport(refreshed)
      setShowOriginal({})
      toast.success('Report rebuilt from the latest survey data')
    } catch (err) {
      console.error('Error regenerating report:', err)
      toast.error('Failed to regenerate report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Edit section
  function handleEditSection(section: ReportSection) {
    setEditingSection(section.key)
    setEditContent(section.content)
  }

  // Save edited section
  async function handleSaveSection(sectionKey: string) {
    if (!report) return

    setSavingSection(true)

    try {
      await updateReportSection(report.id, sectionKey, editContent)

      // Update local state
      setReport({
        ...report,
        sections: report.sections.map((s) =>
          s.key === sectionKey
            ? {
                ...s,
                content: editContent,
                is_edited: true,
                original_content: s.original_content || s.content,
              }
            : s
        ),
      })

      setEditingSection(null)
    } catch (err) {
      console.error('Error saving section:', err)
      toast.error('Failed to save section. Please try again.')
    } finally {
      setSavingSection(false)
    }
  }

  // Regenerate LLM section
  async function handleRegenerateSection(sectionKey: string) {
    if (!report) return

    setRegeneratingSection(sectionKey)

    try {
      const newSection = await regenerateSection(report.id, sectionKey)

      // Update local state
      setReport({
        ...report,
        sections: report.sections.map((s) => (s.key === sectionKey ? newSection : s)),
      })
    } catch (err) {
      console.error('Error regenerating section:', err)
      toast.error('Failed to regenerate section. Please try again.')
    } finally {
      setRegeneratingSection(null)
    }
  }

  // Update report status
  async function applyStatus(newStatus: ReportStatus) {
    if (!report) return
    try {
      await updateReportStatus(report.id, newStatus)
      setReport({ ...report, status: newStatus })
      if (newStatus === 'finalised') toast.success('Report finalised')
    } catch (err) {
      console.error('Error updating status:', err)
      toast.error('Failed to update report status. Please try again.')
    }
  }

  function handleUpdateStatus(newStatus: ReportStatus) {
    if (!report) return
    // Finalisation locks the report — confirm via styled dialog (native
    // confirm() is blockable/invisible and off-convention)
    if (newStatus === 'finalised') {
      setConfirmAction('finalise')
      return
    }
    void applyStatus(newStatus)
  }

  // Publish report
  async function handlePublish() {
    if (!report) return

    setIsPublishing(true)
    try {
      const token = await publishReport(report.id)
      setReport({
        ...report,
        publish_token: token,
        published_at: new Date().toISOString(),
        status: 'published',
      })

      // Notify admin/office that a report was published (fire-and-forget)
      fetch('/api/notifications/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'report_published',
          report_id: report.id,
          survey_id: projectId,
        }),
      }).catch(err => console.error('Notification trigger failed:', err))
    } catch (err) {
      console.error('Error publishing report:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to publish report. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  // Unpublish report
  function handleUnpublish() {
    setConfirmAction('unpublish')
  }

  async function applyUnpublish() {
    if (!report) return

    try {
      await unpublishReport(report.id)
      setReport({
        ...report,
        publish_token: null,
        published_at: null,
        status: 'finalised',
      })
    } catch (err) {
      console.error('Error unpublishing report:', err)
      toast.error('Failed to unpublish report. Please try again.')
    }
  }

  // Copy share link to clipboard
  async function handleCopyLink() {
    if (!report?.publish_token) return

    const url = `${window.location.origin}/report/${report.id}?token=${report.publish_token}`
    await navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Send report to customer
  async function handleSendToCustomer(confirmResend = false) {
    if (!report) return
    setIsSending(true)
    setSendResult(null)

    try {
      const res = await fetch(`/api/reports/${report.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmResend }),
      })
      const data = await res.json()

      if (res.status === 409 && data.alreadySent) {
        // Already sent — require an explicit typed confirmation to resend
        setResendPrompt({ lastSentAt: data.lastSentAt, lastSentTo: data.lastSentTo })
        return
      }

      if (!res.ok || !data.success) {
        setSendResult({ success: false, message: data.error || 'Failed to send report' })
        return
      }

      if (data.sent === false) {
        // Email disabled in notification preferences
        setSendResult({ success: true, message: data.reason || 'Email not sent' })
        return
      }

      const now = new Date().toISOString()
      setResendPrompt(null)
      setReport({
        ...report,
        sent_at: now,
        sent_to_email: data.sentTo,
      })
      setSendResult({ success: true, message: `Report sent to ${data.sentTo}` })
      setSendConfirm(false)

      // Auto-clear success message after 5 seconds
      setTimeout(() => setSendResult(null), 5000)
    } catch (err) {
      console.error('Error sending report:', err)
      setSendResult({ success: false, message: 'An unexpected error occurred' })
    } finally {
      setIsSending(false)
    }
  }

  // Scroll to section
  function scrollToSection(sectionKey: string) {
    const ref = sectionRefs.current[sectionKey]
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSectionKey(sectionKey)
    }
  }

  // Toggle section collapse
  function toggleSectionCollapse(sectionKey: string) {
    setCollapsedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

  // Loading or generating state
  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-300 animate-spin mx-auto mb-4" />
          <p className="text-white/70">
            {isGenerating ? 'Generating report...' : 'Loading report...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center glass border-red-400/30">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Generating Report</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={goBack}>
              Back
            </Button>
            <Button variant="primary" onClick={handleGenerateReport}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Safety check - should not reach here without a report
  if (!report) {
    return null
  }

  const isFinalised = report.status === 'finalised'
  const statusColors = STATUS_COLORS[report.status]

  return (
    <ProtectedRoute>
      <Layout>
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {/* Back button */}
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Report</h1>
              <p className="text-sm text-white/60">{projectNumber ?? `Project #${projectId.slice(0, 8)}`}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2" />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
              {report.status === 'draft' && <Clock className="w-4 h-4" />}
              {report.status === 'generated' && <Sparkles className="w-4 h-4" />}
              {report.status === 'reviewed' && <Eye className="w-4 h-4" />}
              {report.status === 'finalised' && <CheckCircle className="w-4 h-4" />}
              {report.status === 'published' && <Globe className="w-4 h-4" />}
              <span className="text-sm font-medium capitalize">{report.status}</span>
            </div>

            {/* Status progression buttons */}
            <div className="flex gap-2">
              <a
                href={`/report/${report.id}?preview=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                title="See the report exactly as the customer will receive it"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Customer Preview</span>
                <span className="sm:hidden">Preview</span>
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmAction('regenerate')}
                disabled={isGenerating}
                title="Rebuild all sections from the latest survey data"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              {report.status === 'generated' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('reviewed')}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Reviewed
                </Button>
              )}
              {report.status === 'reviewed' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('finalised')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalise Report
                </Button>
              )}
              {report.status === 'finalised' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handlePublish()}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Publish Report
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Completeness Validation Panel */}
      {report.status !== 'published' && (() => {
        const warnings: { message: string; severity: 'critical' | 'warning' }[] = []
        const hasSketch = report.sections.some(s => s.key === 'sketch_plan' && s.photos?.length > 0)
        const hasFrontPhoto = photos.some(p => p.step === 'site_details' && (p.category === 'property_front' || p.category === 'building_exterior' || p.category === 'street_view'))
        const roomSections = report.sections.find(s => s.key === 'room_findings')?.sub_sections || []

        if (!hasFrontPhoto) warnings.push({ message: 'Front elevation photo missing', severity: 'warning' })
        if (!hasSketch) warnings.push({ message: 'No sketch plan uploaded', severity: 'warning' })
        if (roomSections.length === 0) warnings.push({ message: 'No room findings in report', severity: 'critical' })

        // Check each room has urgency set
        for (const room of roomSections) {
          if (!room.data?.urgency) {
            warnings.push({ message: `${room.data?.room_name || room.title}: urgency not set`, severity: 'warning' })
          }
        }

        // Stale-report detection: survey data added AFTER this report was
        // generated is invisible until the report is regenerated.
        const reportPhotoIds = new Set<string>()
        for (const s of report.sections) {
          for (const id of s.photos || []) reportPhotoIds.add(id)
          for (const sub of s.sub_sections || []) {
            for (const id of sub.photos || []) reportPhotoIds.add(id)
          }
        }
        // Only count photos that a regenerate WOULD pick up — photos of since-
        // deleted rooms can never re-enter the report and must not warn forever.
        const missingRoomPhotos = photos.filter(
          (p) =>
            p.step === 'room_inspection' &&
            (!p.room_id || liveRoomIds.includes(p.room_id)) &&
            !reportPhotoIds.has(p.id)
        ).length
        if (missingRoomPhotos > 0) {
          warnings.push({
            message: `${missingRoomPhotos} room photo${missingRoomPhotos !== 1 ? 's' : ''} (defect evidence / meter readings) added after this report was generated — press Regenerate to include them`,
            severity: 'critical',
          })
        }

        const commentsSection = report.sections.find(s => s.key === 'surveyor_comments')
        if (liveComments && !commentsSection) {
          warnings.push({
            message: "Surveyor's additional comments are not in this report — press Regenerate to include them",
            severity: 'critical',
          })
        } else if (liveComments && commentsSection && !commentsSection.is_edited && commentsSection.content.trim() !== liveComments) {
          warnings.push({
            message: "Surveyor's additional comments changed after this report was generated — press Regenerate to update them",
            severity: 'warning',
          })
        }

        if (warnings.length === 0) return null
        const criticalCount = warnings.filter(w => w.severity === 'critical').length

        return (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-4">
            <div className={`rounded-xl p-4 border ${criticalCount > 0 ? 'bg-red-500/10 border-red-400/30' : 'bg-amber-500/10 border-amber-400/30'}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${criticalCount > 0 ? 'text-red-400' : 'text-amber-400'}`} />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Completeness Check — {warnings.length} item{warnings.length !== 1 ? 's' : ''} to review
                  </h4>
                  <ul className="space-y-1">
                    {warnings.map((w, i) => (
                      <li key={i} className={`text-xs ${w.severity === 'critical' ? 'text-red-300' : 'text-amber-300'}`}>
                        • {w.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex gap-6">
          {/* Section Navigation Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="glass border-white/10 sticky top-24">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">Sections</h3>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAllSections}
                    onChange={(e) => setShowAllSections(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-brand-500 focus:ring-brand-500/50"
                  />
                  <span className="text-xs text-white/60">Show all sections</span>
                </label>
              </div>
              <nav className="p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {report.sections
                  .filter((section) =>
                    showAllSections ? true : REVIEWABLE_SECTIONS.has(section.key)
                  )
                  .map((section) => {
                  const isActive = section.key === activeSectionKey
                  const isEmpty = !section.content ||
                    section.content === 'Content not available.' ||
                    section.content === 'To be completed by surveyor during review.' ||
                    section.content === '[LLM content to be generated]'
                  const hasContent = section.content.length > 0 && !isEmpty
                  const isEdited = section.is_edited

                  return (
                    <button
                      key={section.key}
                      onClick={() => scrollToSection(section.key)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-all text-sm
                        ${isActive
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
                          : isEmpty
                          ? 'text-white/40 hover:text-white/60 hover:bg-white/5'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1 truncate">{section.title}</span>
                        <div className="flex items-center gap-1">
                          {isEdited && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Edited" />
                          )}
                          {isEmpty ? (
                            <span className="text-xs text-white/30">Empty</span>
                          ) : hasContent ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Clock className="w-3 h-3 text-white/30" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Publish Section */}
            {(report.status === 'reviewed' || report.status === 'finalised' || report.status === 'published') && (
              <Card className="glass border-white/10 overflow-hidden">
                <div className="px-6 py-5">
                  {report.publish_token && report.status === 'published' ? (
                    // Published state
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-emerald-400">Published</span>
                            {report.published_at && (
                              <p className="text-xs text-white/50">
                                {new Date(report.published_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={handleUnpublish}
                          className="text-sm text-red-400/70 hover:text-red-400 transition-colors border border-red-400/20 hover:border-red-400/40 rounded-lg px-3 py-1.5"
                        >
                          Unpublish
                        </button>
                      </div>

                      {/* Shareable URL */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
                          <Link2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                          <input
                            type="text"
                            readOnly
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/report/${report.id}?token=${report.publish_token}`}
                            className="flex-1 bg-transparent text-sm text-white/80 outline-none truncate"
                          />
                        </div>
                        <Button
                          variant={copiedLink ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={handleCopyLink}
                          className="flex-shrink-0"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-4 h-4 mr-1.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1.5" />
                              Copy Link
                            </>
                          )}
                        </Button>
                        <a
                          href={`${typeof window !== 'undefined' ? window.location.origin : ''}/report/${report.id}?token=${report.publish_token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex-shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">Open</span>
                        </a>
                      </div>

                      {/* Send to Customer */}
                      <div className="border-t border-white/10 pt-4 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          {!sendConfirm ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setSendConfirm(true)}
                              disabled={!customerEmail || isSending}
                              title={!customerEmail ? 'No customer email — update the customer record first' : undefined}
                            >
                              <Send className="w-4 h-4 mr-1.5" />
                              {report.sent_at ? 'Resend to Customer' : 'Send to Customer'}
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
                              <span className="text-xs text-white/70">
                                Send to <strong className="text-white">{customerEmail}</strong>?
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleSendToCustomer()}
                                disabled={isSending}
                              >
                                {isSending ? (
                                  <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />Sending…</>
                                ) : (
                                  'Confirm'
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSendConfirm(false)}
                                disabled={isSending}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>

                        <ConfirmDialog
                          open={resendPrompt !== null}
                          title="Report already sent"
                          message={`This report was already emailed${resendPrompt?.lastSentTo ? ` to ${resendPrompt.lastSentTo}` : ''}${resendPrompt?.lastSentAt ? ` on ${new Date(resendPrompt.lastSentAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}. Sending again will deliver a duplicate email to the customer. Customer documents are normally sent together from the pipeline's Approve & Send.`}
                          confirmLabel="Resend to customer"
                          requireText="RESEND"
                          busy={isSending}
                          onConfirm={() => handleSendToCustomer(true)}
                          onCancel={() => setResendPrompt(null)}
                        />

                        {/* Last sent info */}
                        {report.sent_at && (
                          <p className="text-xs text-white/50 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            Last sent: {new Date(report.sent_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} to {report.sent_to_email}
                          </p>
                        )}

                        {/* Send result feedback */}
                        {sendResult && (
                          <div className={`text-sm px-3 py-2 rounded-lg ${
                            sendResult.success
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20'
                              : 'bg-red-500/10 text-red-400 border border-red-400/20'
                          }`}>
                            {sendResult.success ? <Check className="w-4 h-4 inline mr-1.5" /> : <AlertCircle className="w-4 h-4 inline mr-1.5" />}
                            {sendResult.message}
                          </div>
                        )}

                        {/* View tracking stats */}
                        {(report.view_count ?? 0) > 0 && (
                          <div className="flex items-center gap-3 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {report.view_count} {report.view_count === 1 ? 'view' : 'views'}
                            </span>
                            {report.first_viewed_at && (
                              <span>
                                First viewed: {new Date(report.first_viewed_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Unpublished state
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white/40" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">Share with customer</p>
                          <p className="text-xs text-white/50">Generate a shareable link for your customer</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handlePublish}
                          disabled={isPublishing || report.status !== 'finalised'}
                        >
                          {isPublishing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Publishing...
                            </>
                          ) : (
                            <>
                              <Globe className="w-4 h-4 mr-2" />
                              Publish Report
                            </>
                          )}
                        </Button>
                        {report.status !== 'finalised' && (
                          <p className="text-xs text-white/40">
                            Finalise the report to enable publishing
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Reviewable Sections */}
            {report.sections
              .filter((section) => REVIEWABLE_SECTIONS.has(section.key))
              .map((section) => (
                <SectionCard
                  key={section.key}
                  section={section}
                  report={report}
                  photos={photos}
                  isEditing={editingSection === section.key}
                  editContent={editContent}
                  savingSection={savingSection}
                  regeneratingSection={regeneratingSection}
                  showOriginal={showOriginal[section.key] || false}
                  isCollapsed={collapsedSections[section.key] || false}
                  isFinalised={isFinalised}
                  onEdit={() => handleEditSection(section)}
                  onSave={() => handleSaveSection(section.key)}
                  onCancel={() => setEditingSection(null)}
                  onEditContentChange={setEditContent}
                  onRegenerate={() => handleRegenerateSection(section.key)}
                  onToggleOriginal={() =>
                    setShowOriginal((prev) => ({ ...prev, [section.key]: !prev[section.key] }))
                  }
                  onToggleCollapse={() => toggleSectionCollapse(section.key)}
                  setSectionRef={(el) => (sectionRefs.current[section.key] = el)}
                  surveyId={projectId}
                  onSketchChange={(updatedSection, updatedPhotos) => {
                    setReport({
                      ...report,
                      sections: report.sections.map((s) =>
                        s.key === updatedSection.key ? updatedSection : s
                      ),
                    })
                    setPhotos(updatedPhotos)
                  }}
                />
              ))}

            {/* Standard Sections Accordion */}
            {report.sections.filter((s) => AUTOMATIC_SECTIONS.has(s.key)).length > 0 && (
              <Card className="glass border-white/10 overflow-hidden">
                <button
                  onClick={() => setStandardSectionsExpanded(!standardSectionsExpanded)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-white/60">
                      Standard Report Sections
                    </h3>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400">
                      {report.sections.filter((s) => AUTOMATIC_SECTIONS.has(s.key)).length}
                    </span>
                  </div>
                  {standardSectionsExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white/50" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  )}
                </button>

                {standardSectionsExpanded && (
                  <div className="border-t border-white/10 bg-white/5">
                    <div className="p-6 space-y-4">
                      {report.sections
                        .filter((section) => AUTOMATIC_SECTIONS.has(section.key))
                        .map((section) => (
                          <div
                            key={section.key}
                            className="p-4 rounded-lg bg-white/5 border border-white/5"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-semibold text-white/70">
                                {section.title}
                              </h4>
                              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400">
                                Standard
                              </span>
                            </div>
                            <div className="text-xs text-white/40 leading-relaxed line-clamp-3">
                              {section.content.substring(0, 200)}...
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>

      <ConfirmDialog
        open={confirmAction === 'finalise'}
        title="Finalise this report?"
        message="Once finalised, the report will be locked and no further edits can be made. You can then publish it to share with the customer. If you haven't already, use Customer Preview to check exactly what the customer will receive before locking it."
        confirmLabel="Finalise Report"
        onConfirm={() => {
          setConfirmAction(null)
          void applyStatus('finalised')
        }}
        onCancel={() => setConfirmAction(null)}
      />
      <ConfirmDialog
        open={confirmAction === 'unpublish'}
        title="Unpublish this report?"
        message="This will disable the customer's link — anyone who has it will no longer be able to view the report."
        confirmLabel="Unpublish"
        danger
        onConfirm={() => {
          setConfirmAction(null)
          void applyUnpublish()
        }}
        onCancel={() => setConfirmAction(null)}
      />
      <ConfirmDialog
        open={confirmAction === 'regenerate'}
        title="Regenerate this report?"
        message="All sections will be rebuilt from the latest survey data — photos, comments and findings added since the last generation will be included. Any manual edits to sections will be lost, and the report will return to Generated status for review."
        confirmLabel="Regenerate Report"
        onConfirm={() => {
          setConfirmAction(null)
          void handleRegenerateReport()
        }}
        onCancel={() => setConfirmAction(null)}
      />
      </Layout>
    </ProtectedRoute>
  )
}

// =============================================================================
// Section Card Component
// =============================================================================

interface SectionCardProps {
  section: ReportSection
  report: SurveyReport
  photos: SurveyPhoto[]
  isEditing: boolean
  editContent: string
  savingSection: boolean
  regeneratingSection: string | null
  showOriginal: boolean
  isCollapsed: boolean
  isFinalised: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onEditContentChange: (content: string) => void
  onRegenerate: () => void
  onToggleOriginal: () => void
  onToggleCollapse: () => void
  setSectionRef: (el: HTMLDivElement | null) => void
  onSketchChange?: (updatedSection: ReportSection, updatedPhotos: SurveyPhoto[]) => void
  surveyId?: string
}

function SectionCard({
  section,
  report,
  photos,
  isEditing,
  editContent,
  savingSection,
  regeneratingSection,
  showOriginal,
  isCollapsed,
  isFinalised,
  onEdit,
  onSave,
  onCancel,
  onEditContentChange,
  onRegenerate,
  onToggleOriginal,
  onToggleCollapse,
  setSectionRef,
  onSketchChange,
  surveyId,
}: SectionCardProps) {
  const sourceColors = SOURCE_COLORS[section.content_source] || SOURCE_COLORS.template
  const sectionPhotos = photos.filter((p) => section.photos.includes(p.id))
  const isRegenerating = regeneratingSection === section.key
  const canRegenerate = section.content_source === 'llm_generated' && !isFinalised

  const isEmpty = !section.content ||
    section.content === 'Content not available.' ||
    section.content === 'To be completed by surveyor during review.' ||
    section.content === '[LLM content to be generated]'

  return (
    <Card ref={setSectionRef} className={`glass border-white/10 overflow-hidden ${isEmpty ? 'opacity-60' : ''}`}>
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              {isEmpty && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-400/30">
                  Empty
                </span>
              )}
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-white/50" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-white/50" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${sourceColors.bg} ${sourceColors.text}`}>
                {section.content_source.replace('_', ' ')}
              </span>
              {section.is_edited && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/10 text-amber-400">
                  Edited
                </span>
              )}
            </div>
          </div>

          {/* Section Actions */}
          {!isFinalised && !isCollapsed && (
            <div className="flex items-center gap-2">
              {section.is_edited && section.original_content && (
                <Button variant="ghost" size="sm" onClick={onToggleOriginal}>
                  {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showOriginal ? 'Hide' : 'Show'} Original
                </Button>
              )}
              {canRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
              )}
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      {!isCollapsed && (
        <div className="p-6">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-4">
              <textarea
                value={editContent}
                onChange={(e) => onEditContentChange(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-mono text-sm"
                placeholder="Enter section content..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={onCancel} disabled={savingSection}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onSave}
                  disabled={savingSection}
                >
                  {savingSection ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <SectionContent
                section={section}
                showOriginal={showOriginal}
                photos={sectionPhotos}
                report={report}
                surveyId={surveyId}
                isFinalised={isFinalised}
                onSketchChange={onSketchChange}
              />

              {/* Sub-sections — pass each one's own photos (room ID, defect
                  evidence, meter readings) so they're visible in the editor */}
              {section.sub_sections && section.sub_sections.length > 0 && (
                <div className="mt-6 space-y-4 pl-4 border-l-2 border-white/10">
                  {section.sub_sections.map((subSection) => (
                    <div key={subSection.key}>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">
                        {subSection.title}
                      </h4>
                      <SectionContent
                        section={subSection}
                        showOriginal={false}
                        photos={photos.filter((p) => subSection.photos?.includes(p.id))}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  )
}

// =============================================================================
// Section Content Renderer
// =============================================================================

interface SectionContentProps {
  section: ReportSection
  showOriginal: boolean
  photos: SurveyPhoto[]
  report?: SurveyReport
  surveyId?: string
  isFinalised?: boolean
  onSketchChange?: (updatedSection: ReportSection, updatedPhotos: SurveyPhoto[]) => void
}

function SectionContent({ section, showOriginal, photos, report, surveyId, isFinalised, onSketchChange }: SectionContentProps) {
  const displayContent = showOriginal && section.original_content
    ? section.original_content
    : section.content

  // Condensation causes: render structured factor cards
  if (section.key === 'condensation_causes') {
    return <CondensationCausesEditorView data={section.data} content={displayContent} />
  }

  // Treatment methodology: render structured step blocks
  if (section.key === 'treatment_methodology') {
    return <TreatmentMethodologyEditorView data={section.data} content={displayContent} />
  }

  // Woodworm treatment: methodology steps + amber safety warning + species note
  if (section.key === 'woodworm_treatment_methodology') {
    return <WoodwormTreatmentEditorView data={section.data} content={displayContent} />
  }

  // Render based on section type
  switch (section.type) {
    case 'cover':
      return <CoverSection data={section.data} />

    case 'property':
      return (
        <>
          <PropertySection data={section.data} />
          {photos.length > 0 && <PhotoGrid photos={photos} />}
        </>
      )

    case 'data':
      return <DataSection data={section.data} />

    case 'findings':
    case 'boilerplate':
    case 'closing':
      return (
        <>
          <TextContent content={displayContent} />
          {photos.length > 0 && <PhotoGrid photos={photos} />}
        </>
      )

    case 'proposals':
      return <ProposalsSection content={displayContent} data={section.data} />

    case 'photos':
      return <PhotoGrid photos={photos} />

    case 'sketch':
      return (
        <SketchUpload
          section={section}
          report={report!}
          surveyId={surveyId!}
          photos={photos}
          isFinalised={isFinalised || false}
          onSketchChange={onSketchChange!}
        />
      )

    default:
      return <TextContent content={displayContent} />
  }
}

// Cover section renderer
function CoverSection({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.client_name && (
          <div>
            <p className="text-sm text-white/50">Client Name</p>
            <p className="text-white font-medium">{data.client_name as string}</p>
          </div>
        )}
        {data.site_address && (
          <div>
            <p className="text-sm text-white/50">Site Address</p>
            <p className="text-white font-medium">{data.site_address as string}</p>
          </div>
        )}
        {data.inspection_date && (
          <div>
            <p className="text-sm text-white/50">Inspection Date</p>
            <p className="text-white font-medium">
              {new Date(data.inspection_date as string).toLocaleDateString()}
            </p>
          </div>
        )}
        {data.weather_conditions && (
          <div>
            <p className="text-sm text-white/50">Weather</p>
            <p className="text-white font-medium capitalize">
              {(data.weather_conditions as string).replace('_', ' ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Property section renderer
function PropertySection({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {data.property_type && (
        <div>
          <p className="text-sm text-white/50">Property Type</p>
          <p className="text-white font-medium capitalize">
            {(data.property_type as string).replace('_', ' ')}
          </p>
        </div>
      )}
      {data.construction_type && (
        <div>
          <p className="text-sm text-white/50">Construction</p>
          <p className="text-white font-medium capitalize">
            {(data.construction_type as string).replace('_', ' ')}
          </p>
        </div>
      )}
      {data.approx_build_year && (
        <div>
          <p className="text-sm text-white/50">Approx. Build Year</p>
          <p className="text-white font-medium">{data.approx_build_year as string}</p>
        </div>
      )}
    </div>
  )
}

// Data section renderer
function DataSection({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => {
        if (value === null || value === undefined) return null

        return (
          <div key={key} className="flex justify-between py-2 border-b border-white/5">
            <span className="text-white/60 capitalize">{key.replace(/_/g, ' ')}</span>
            <span className="text-white font-medium">{String(value)}</span>
          </div>
        )
      })}
    </div>
  )
}

// Text content renderer (handles paragraphs)
function TextContent({ content }: { content: string }) {
  if (!content || content === '[LLM content to be generated]' ||
      content === 'To be completed by surveyor during review.' ||
      content === 'Content not available.') {
    return (
      <div className="text-center py-8 px-4 rounded-lg bg-white/5 border-2 border-dashed border-white/10">
        <Clock className="w-8 h-8 text-white/20 mx-auto mb-2" />
        <p className="text-white/30 italic text-sm">
          {content === 'To be completed by surveyor during review.'
            ? 'Content will be completed during review'
            : 'Content will be generated or filled by surveyor'}
        </p>
      </div>
    )
  }

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <div className="space-y-4">
      {paragraphs.map((para, idx) => (
        <p key={idx} className="text-white/90 leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  )
}

// Condensation causes renderer (admin editor view)
const CAUSES_FACTOR_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  ventilation: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-400/30' },
  moisture:    { bg: 'bg-cyan-500/10',  text: 'text-cyan-300',  border: 'border-cyan-400/30' },
  insulation:  { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-400/30' },
  heating:     { bg: 'bg-red-500/10',   text: 'text-red-300',   border: 'border-red-400/30' },
  mould:       { bg: 'bg-gray-500/10',  text: 'text-gray-300',  border: 'border-gray-400/30' },
}

function CondensationCausesEditorView({
  data,
  content,
}: {
  data: Record<string, unknown>
  content: string
}) {
  const factors = (data?.factors as Array<{ icon_key: string; title: string; description: string }> | undefined) ?? []

  if (factors.length === 0) {
    return <TextContent content={content} />
  }

  return (
    <div className="space-y-4">
      <p className="text-white/80 leading-relaxed text-sm italic">
        Condensation occurs when moisture-laden air comes into contact with cold surfaces,
        causing water vapour to condense. The following factors have been identified:
      </p>
      <div className="space-y-3">
        {factors.map((factor, idx) => {
          const colours = CAUSES_FACTOR_COLOURS[factor.icon_key] ?? CAUSES_FACTOR_COLOURS.ventilation
          return (
            <div key={idx} className={`rounded-lg border ${colours.border} ${colours.bg} p-4`}>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${colours.text}`}>
                {factor.icon_key}
              </p>
              <p className="text-sm font-semibold text-white mb-1">{factor.title}</p>
              <p className="text-sm text-white/70 leading-relaxed">{factor.description}</p>
            </div>
          )
        })}
      </div>
      <p className="text-white/60 text-sm italic border-t border-white/10 pt-3">
        The recommended works detailed in the Scope of Works section are designed to address
        these underlying causes and provide long-term resolution.
      </p>
    </div>
  )
}

// Treatment methodology admin view — structured step blocks on dark background
function TreatmentMethodologyEditorView({
  data,
  content,
}: {
  data: Record<string, unknown>
  content: string
}) {
  const methodologies = (
    data?.methodologies as
      | Array<{ id: string; title: string; intro: string; steps: string[] }>
      | undefined
  ) ?? []

  if (methodologies.length === 0) {
    return <TextContent content={content} />
  }

  const HEADER_COLOURS: Record<string, { bg: string; text: string }> = {
    cavity_drain_membrane: { bg: 'bg-blue-900/40', text: 'text-blue-300' },
    cementitious_tanking:  { bg: 'bg-blue-900/40', text: 'text-blue-300' },
    dpc_injection:         { bg: 'bg-blue-900/40', text: 'text-blue-300' },
    wet_rot_treatment:     { bg: 'bg-green-900/40', text: 'text-green-300' },
    dry_rot_treatment:     { bg: 'bg-amber-900/40', text: 'text-amber-300' },
  }

  return (
    <div className="space-y-4">
      <p className="text-white/60 text-sm italic">
        {methodologies.length} treatment methodology sequence{methodologies.length !== 1 ? 's' : ''} generated:
      </p>
      {methodologies.map((m) => {
        const colours = HEADER_COLOURS[m.id] ?? { bg: 'bg-white/5', text: 'text-white/80' }
        return (
          <div key={m.id} className="rounded-lg border border-white/10 overflow-hidden">
            <div className={`${colours.bg} px-4 py-2.5 border-b border-white/10`}>
              <p className={`text-sm font-semibold ${colours.text}`}>{m.title}</p>
            </div>
            <div className="px-4 py-3 bg-white/5">
              <p className="text-xs text-white/50 italic mb-3">{m.intro}</p>
              <ol className="space-y-2">
                {m.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 text-white/60 text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-white/80 leading-snug">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Woodworm treatment methodology + safety/exclusion zone warning
function WoodwormTreatmentEditorView({
  data,
  content,
}: {
  data: Record<string, unknown>
  content: string
}) {
  const methodology = data?.methodology as
    | { id: string; title: string; intro: string; steps: string[] }
    | undefined
  const safetyPoints = (data?.safetyPoints as string[] | undefined) ?? []
  const speciesNote = data?.speciesNote as
    | { name: string; statusLabel: string }
    | null
    | undefined

  if (!methodology) {
    return <TextContent content={content} />
  }

  return (
    <div className="space-y-4">
      {/* Treatment steps block */}
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <div className="bg-amber-900/30 px-4 py-2.5 border-b border-white/10">
          <p className="text-sm font-semibold text-amber-300">{methodology.title}</p>
        </div>
        <div className="px-4 py-3 bg-white/5">
          <p className="text-xs text-white/50 italic mb-3">{methodology.intro}</p>
          <ol className="space-y-2">
            {methodology.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 text-white/60 text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-white/80 leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Safety / Exclusion Zone warning */}
      {safetyPoints.length > 0 && (
        <div className="rounded-lg border border-amber-400/40 overflow-hidden">
          <div className="bg-amber-500/20 px-4 py-2.5 border-b border-amber-400/30 flex items-center gap-2">
            <span className="text-amber-300 text-base">⚠</span>
            <p className="text-sm font-bold text-amber-300 uppercase tracking-wide">
              Important Safety Information — Exclusion Zone
            </p>
          </div>
          <div className="px-4 py-3 bg-amber-500/5">
            <ul className="space-y-2">
              {safetyPoints.map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 text-amber-400 mt-0.5">•</span>
                  <p className="text-sm text-amber-100/80 leading-snug">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Species identification note */}
      {speciesNote && (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">
            Species Identification
          </p>
          <p className="text-sm text-white/80">
            <span className="font-medium">{speciesNote.name}</span>
          </p>
          <p className="text-sm text-white/60 mt-0.5">{speciesNote.statusLabel}</p>
        </div>
      )}

      {/* Loft insulation note */}
      {data?.loftInsulationNote && (
        <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-4 py-3">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-1">
            Loft Insulation
          </p>
          <p className="text-sm text-white/80">{data.loftInsulationNote as string}</p>
        </div>
      )}

      {/* Reference images indicator */}
      {(data?.equipmentImages as unknown[])?.length > 0 && (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs text-white/50">
            Customer report includes {((data.equipmentImages as unknown[]).length) + (data.beetleImage ? 1 : 0)} reference images (beetle identification and treatment equipment)
          </p>
        </div>
      )}
    </div>
  )
}

// Proposals section renderer
function ProposalsSection({
  content,
  data,
}: {
  content: string
  data: Record<string, unknown>
}) {
  return (
    <div className="space-y-4">
      <TextContent content={content} />
      {data.total_cost && (
        <div className="mt-6 p-4 rounded-lg bg-brand-500/10 border border-brand-400/30">
          <p className="text-sm text-brand-300 mb-1">Total Cost</p>
          <p className="text-2xl font-bold text-brand-300">
            £{(data.total_cost as number).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

// Photo grid renderer
function PhotoGrid({ photos }: { photos: SurveyPhoto[] }) {
  if (photos.length === 0) return null

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-white/90 mb-3">Photos ({photos.length})</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10"
          >
            <img
              src={getPhotoUrl(photo.storage_path)}
              alt={photo.description}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Sketch upload component
function SketchUpload({
  section,
  report,
  surveyId,
  photos,
  isFinalised,
  onSketchChange,
}: {
  section: ReportSection
  report: SurveyReport
  surveyId: string
  photos: SurveyPhoto[]
  isFinalised: boolean
  onSketchChange: (updatedSection: ReportSection, updatedPhotos: SurveyPhoto[]) => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sketchPhotos = photos.filter((p) => section.photos.includes(p.id))

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset input so re-selecting the same file works
    e.target.value = ''

    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf'

    if (!isImage && !isPdf) {
      toast.error('Please upload a JPEG, PNG, or PDF file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB')
      return
    }

    setIsUploading(true)

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase not available')

      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2, 9)
      const ext = file.name.split('.').pop()?.toLowerCase() || (isPdf ? 'pdf' : 'jpg')
      const fileName = `${timestamp}-${randomId}.${ext}`
      const storagePath = `${surveyId}/sketch/${fileName}`

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('survey-photos')
        .upload(storagePath, file, {
          contentType: file.type,
          cacheControl: '3600',
        })

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      // Create photo metadata
      const photoId = `sketch_${timestamp}_${randomId}`
      const newPhoto: SurveyPhoto = {
        id: photoId,
        survey_id: surveyId,
        step: 'site_details' as any,
        category: 'sketch_plan',
        description: file.name,
        storage_path: uploadData.path,
        file_name: fileName,
        file_size: file.size,
        mime_type: file.type,
        width: 0,
        height: 0,
        taken_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }

      // Save photo metadata to survey_data.photos (serialized write)
      await serializeWrite(surveyId, async () => {
        const { data: survey, error: fetchError } = await supabase
          .from('surveys')
          .select('survey_data')
          .eq('id', surveyId)
          .single()

        if (fetchError) {
          await supabase.storage.from('survey-photos').remove([uploadData.path])
          throw new Error(`Failed to load survey: ${fetchError.message}`)
        }

        const surveyData = survey.survey_data || {}
        const existingPhotos = Array.isArray(surveyData.photos) ? surveyData.photos : []
        existingPhotos.push(newPhoto)

        const { error: updateError } = await supabase
          .from('surveys')
          .update({ survey_data: { ...surveyData, photos: existingPhotos } })
          .eq('id', surveyId)

        if (updateError) {
          await supabase.storage.from('survey-photos').remove([uploadData.path])
          throw new Error(`Failed to save photo metadata: ${updateError.message}`)
        }
      })

      // Add photo ID to report section
      const updatedPhotoIds = [...section.photos, photoId]
      await updateReportSectionPhotos(report.id, section.key, updatedPhotoIds)

      // Update local state
      const updatedSection = { ...section, photos: updatedPhotoIds }
      onSketchChange(updatedSection, [...photos, newPhoto])
      toast.success('Sketch uploaded')
    } catch (err) {
      console.error('Sketch upload failed:', err)
      toast.error('Failed to upload sketch')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete(photoId: string) {
    const photo = photos.find((p) => p.id === photoId)
    if (!photo) return

    setIsDeleting(photoId)

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase not available')

      // Remove from storage
      await supabase.storage.from('survey-photos').remove([photo.storage_path])

      // Remove from survey_data.photos
      await serializeWrite(surveyId, async () => {
        const { data: survey, error: fetchError } = await supabase
          .from('surveys')
          .select('survey_data')
          .eq('id', surveyId)
          .single()

        if (fetchError) throw new Error(`Failed to load survey: ${fetchError.message}`)

        const surveyData = survey.survey_data || {}
        const existingPhotos = Array.isArray(surveyData.photos) ? surveyData.photos : []
        const filtered = existingPhotos.filter((p: any) => p.id !== photoId)

        await supabase
          .from('surveys')
          .update({ survey_data: { ...surveyData, photos: filtered } })
          .eq('id', surveyId)
      })

      // Remove from report section
      const updatedPhotoIds = section.photos.filter((id) => id !== photoId)
      await updateReportSectionPhotos(report.id, section.key, updatedPhotoIds)

      // Update local state
      const updatedSection = { ...section, photos: updatedPhotoIds }
      onSketchChange(updatedSection, photos.filter((p) => p.id !== photoId))
      toast.success('Sketch removed')
    } catch (err) {
      console.error('Sketch delete failed:', err)
      toast.error('Failed to remove sketch')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Existing sketches */}
      {sketchPhotos.length > 0 && (
        <div className="space-y-3">
          {sketchPhotos.map((photo) => {
            const url = getPhotoUrl(photo.storage_path)
            const isPdf = photo.mime_type === 'application/pdf'

            return (
              <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-white/10 bg-white/5">
                {isPdf ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-white/10 transition-colors"
                  >
                    <FileText className="w-8 h-8 text-brand-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{photo.description || photo.file_name}</p>
                      <p className="text-xs text-white/40">{(photo.file_size / 1024).toFixed(0)} KB - PDF</p>
                    </div>
                  </a>
                ) : (
                  <img
                    src={url}
                    alt={photo.description || 'Sketch plan'}
                    className="w-full max-h-[600px] object-contain bg-black/20"
                  />
                )}
                {!isFinalised && (
                  <button
                    onClick={() => handleDelete(photo.id)}
                    disabled={isDeleting === photo.id}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    title="Remove sketch"
                  >
                    {isDeleting === photo.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Upload area */}
      {!isFinalised && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full text-center py-8 border-2 border-dashed border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-white/30 mx-auto mb-2 animate-spin" />
                <p className="text-white/50 text-sm">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
                <p className="text-white/50 text-sm">
                  {sketchPhotos.length > 0 ? 'Upload another sketch' : 'Upload sketch (JPEG, PNG, or PDF)'}
                </p>
              </>
            )}
          </button>
        </>
      )}

      {/* Empty state when finalised with no sketches */}
      {isFinalised && sketchPhotos.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-lg">
          <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-2" />
          <p className="text-white/30 text-sm">No sketch uploaded</p>
        </div>
      )}
    </div>
  )
}
