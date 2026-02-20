'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  Download,
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
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { generateReport, regenerateSection } from '@/lib/report-generator'
import {
  loadReportBySurvey,
  updateReportSection,
  updateReportStatus,
} from '@/lib/report-data'
import { getPhotoUrl } from '@/lib/survey-photo-service'
import type {
  SurveyReport,
  ReportSection,
  ReportStatus,
} from '@/types/survey-report.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'
import { getSupabase } from '@/lib/supabase-client'

// Status badge colors
const STATUS_COLORS: Record<ReportStatus, { bg: string; text: string; border: string }> = {
  draft: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-400/30' },
  generated: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30' },
  reviewed: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  finalised: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-400/30' },
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

  // Section refs for scrolling
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
        if (existingReport.sections.length > 0) {
          setActiveSectionKey(existingReport.sections[0].key)
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
    } finally {
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
      if (newReport.sections.length > 0) {
        setActiveSectionKey(newReport.sections[0].key)
      }
    } catch (err) {
      console.error('Error generating report:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate report')
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-300 animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading report...</p>
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
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Report</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={() => router.push(`/survey/${projectId}/wizard`)}>
              Back to Wizard
            </Button>
            <Button variant="primary" onClick={loadReportData}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // No report - show generate button
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center glass border-white/10">
          <FileText className="w-16 h-16 text-brand-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Generate Survey Report</h2>
          <p className="text-white/70 mb-6">
            Generate a professional survey report from the completed wizard data. This will create boilerplate
            sections, populate data fields, and generate narrative content.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </Card>
      </div>
    )
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
              href={`/survey/${projectId}/costing`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Costing</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Report</h1>
              <p className="text-sm text-white/60">Project #{projectId.slice(0, 8)}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
              {report.status === 'draft' && <Clock className="w-4 h-4" />}
              {report.status === 'generated' && <Sparkles className="w-4 h-4" />}
              {report.status === 'reviewed' && <Eye className="w-4 h-4" />}
              {report.status === 'finalised' && <CheckCircle className="w-4 h-4" />}
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
                <h3 className="text-sm font-semibold text-white">Sections</h3>
              </div>
              <nav className="p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {report.sections.map((section) => {
                  const isActive = section.key === activeSectionKey
                  const hasContent = section.content.length > 0
                  const isEdited = section.is_edited

                  return (
                    <button
                      key={section.key}
                      onClick={() => scrollToSection(section.key)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-all text-sm
                        ${isActive
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
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
                          {hasContent ? (
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
            {report.sections.map((section) => (
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

  return (
    <Card ref={setSectionRef} className="glass border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
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
  if (!content || content === '[LLM content to be generated]') {
    return (
      <div className="text-center py-8 text-white/30 italic">
        Content will be generated or filled by surveyor
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
