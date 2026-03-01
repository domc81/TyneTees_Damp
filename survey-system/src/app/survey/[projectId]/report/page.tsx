'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
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
  ChevronDown,
  ChevronUp,
  Globe,
  Copy,
  ExternalLink,
  Link2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { generateReport, regenerateSection } from '@/lib/report-generator'
import {
  loadReportBySurvey,
  updateReportSection,
  updateReportStatus,
} from '@/lib/report-data'
import { publishReport, unpublishReport } from '@/lib/report-publish'
import { getPhotoUrl } from '@/lib/survey-photo-service'
import type {
  SurveyReport,
  ReportSection,
  ReportStatus,
} from '@/types/survey-report.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'
import { getSupabase } from '@/lib/supabase-client'

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

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<SurveyReport | null>(null)
  const [photos, setPhotos] = useState<SurveyPhoto[]>([])
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [savingSection, setSavingSection] = useState(false)
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({})
  const [activeSectionKey, setActiveSectionKey] = useState<string>('')
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
  const [showAllSections, setShowAllSections] = useState(false)
  const [standardSectionsExpanded, setStandardSectionsExpanded] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Section refs for scrolling
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  // Ref to prevent concurrent generation from StrictMode double-render
  const isGeneratingRef = useRef(false)

  // Load report on mount
  useEffect(() => {
    loadReportData()
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

      // Load photos
      const supabase = getSupabase()
      if (supabase) {
        const { data: survey } = await supabase
          .from('surveys')
          .select('survey_data')
          .eq('id', projectId)
          .single()

        if (survey?.survey_data?.photos) {
          setPhotos(survey.survey_data.photos)
        }
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
      alert('Failed to save section. Please try again.')
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
      alert('Failed to regenerate section. Please try again.')
    } finally {
      setRegeneratingSection(null)
    }
  }

  // Update report status
  async function handleUpdateStatus(newStatus: ReportStatus) {
    if (!report) return

    // Confirmation for finalisation
    if (newStatus === 'finalised') {
      const confirmed = confirm(
        'Are you sure you want to finalise this report? Once finalised, the report will be locked and no further edits can be made.'
      )
      if (!confirmed) return
    }

    try {
      await updateReportStatus(report.id, newStatus)
      setReport({ ...report, status: newStatus })
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update report status. Please try again.')
    }
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
    } catch (err) {
      console.error('Error publishing report:', err)
      alert('Failed to publish report. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  // Unpublish report
  async function handleUnpublish() {
    if (!report) return

    const confirmed = confirm(
      'This will disable the customer link. Are you sure?'
    )
    if (!confirmed) return

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
      alert('Failed to unpublish report. Please try again.')
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
            <Button variant="ghost" onClick={() => router.push(`/surveys/${projectId}`)}>
              Back to Survey
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
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {/* Back button */}
            <Link
              href={`/surveys/${projectId}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Survey</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Report</h1>
              <p className="text-sm text-white/60">Project #{projectId.slice(0, 8)}</p>
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
            </div>
          </div>
        </div>
      </header>

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
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handlePublish}
                        disabled={isPublishing}
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
              />

              {/* Sub-sections */}
              {section.sub_sections && section.sub_sections.length > 0 && (
                <div className="mt-6 space-y-4 pl-4 border-l-2 border-white/10">
                  {section.sub_sections.map((subSection) => (
                    <div key={subSection.key}>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">
                        {subSection.title}
                      </h4>
                      <SectionContent section={subSection} showOriginal={false} photos={[]} />
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
}

function SectionContent({ section, showOriginal, photos }: SectionContentProps) {
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
      return <SketchPlaceholder />

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
    cavity_drain_membrane: { bg: 'bg-blue-900/40', text: 'text-blue-200' },
    cementitious_tanking:  { bg: 'bg-blue-900/40', text: 'text-blue-200' },
    dpc_injection:         { bg: 'bg-blue-900/40', text: 'text-blue-200' },
    wet_rot_treatment:     { bg: 'bg-green-900/40', text: 'text-green-200' },
    dry_rot_treatment:     { bg: 'bg-amber-900/40', text: 'text-amber-200' },
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
          <p className="text-sm font-semibold text-amber-200">{methodology.title}</p>
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
            <p className="text-sm font-bold text-amber-200 uppercase tracking-wide">
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

// Sketch placeholder
function SketchPlaceholder() {
  return (
    <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-lg">
      <ImageIcon className="w-12 h-12 text-white/30 mx-auto mb-3" />
      <p className="text-white/50">Sketch plan will be uploaded by surveyor</p>
    </div>
  )
}
