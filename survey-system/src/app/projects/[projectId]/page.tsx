'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  Droplets,
  Bug,
  Wind,
  Thermometer,
  FileText,
  Calculator,
  Camera,
  MapPin,
  User,
  Calendar,
  Cloud,
  ChevronRight,
  Check,
  Plus,
  Home,
  ChevronDown,
  Package,
  ClipboardList,
  Building,
} from 'lucide-react'
import type { Project, SurveyType } from '@/types/database.types'
import { getProjectSections, getProjectItems, initializeSampleData } from '@/lib/store'
import { getPhotoUrl, getProjectPhotos as getSupabaseProjectPhotos, getProject as getSupabaseProject, getSurveyRooms, createSurveyRoom, updateSurveyRoom } from '@/lib/supabase-data'
import { getSupabase } from '@/lib/supabase-client'
import type { SurveyRoom } from '@/lib/supabase-data'
import { formatCurrency, calculateLineItemTotal } from '@/lib/cost-calculator'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string; label: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Damp Survey' },
  timber: { icon: Bug, color: 'text-amber-600', bgColor: 'bg-amber-50', label: 'Timber Survey' },
  woodworm: { icon: Bug, color: 'text-amber-700', bgColor: 'bg-amber-50', label: 'Woodworm Survey' },
  condensation: { icon: Wind, color: 'text-cyan-600', bgColor: 'bg-cyan-50', label: 'Condensation Survey' },
}

const tabs = [
  { id: 'details', label: 'Details', icon: User },
  { id: 'survey', label: 'Overview', icon: ClipboardList },
  { id: 'costing', label: 'Costing', icon: Calculator, count: true },
  { id: 'materials', label: 'Materials', icon: Package },
  { id: 'report', label: 'Quote', icon: FileText },
]

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState('details')
  const [isLoading, setIsLoading] = useState(true)
  const [photos, setPhotos] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [wizardCompleted, setWizardCompleted] = useState(false)
  const [reportStatus, setReportStatus] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        initializeSampleData()
        const data = await getSupabaseProject(params.projectId)
        setProject(data)
        if (data) {
          // Load photos for this project
          const projectPhotos = await getSupabaseProjectPhotos(data.id)
          setPhotos(projectPhotos)
          // Load wizard_completed status
          setWizardCompleted(data.wizard_completed || false)
          // Load report status
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
        console.error('Error loading project:', err)
        setError('Failed to load project')
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [params.projectId])

  // Load photos from Supabase
  useEffect(() => {
    if (!project) return

    getSupabaseProjectPhotos(project.id).then((loadedPhotos) => {
      setPhotos(loadedPhotos)
    }).catch((err) => {
      console.error('Error loading photos:', err)
    })
  }, [project?.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">Error loading project</h2>
          <p className="text-surface-500 mt-2">{error}</p>
          <Link href="/projects" className="btn-primary mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">Project not found</h2>
          <Link href="/projects" className="btn-primary mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const config = surveyTypeConfig[project.survey_type]
  const sections = getProjectSections(project.id)
  const allItems = getProjectItems(project.id)

  // Calculate totals
  const totals = allItems.reduce((acc, item) => {
    const calc = calculateLineItemTotal(item)
    return {
      materials: acc.materials + calc.materialCost,
      labor: acc.labor + calc.laborCost,
      total: acc.total + calc.total,
    }
  }, { materials: 0, labor: 0, total: 0 })

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/projects" className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-surface-600" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-surface-500">{project.project_number}</span>
                  <span className={`badge ${
                    project.status === 'draft' ? 'badge-amber' :
                    project.status === 'in_progress' ? 'badge-blue' :
                    project.status === 'pending_review' ? 'badge-green' : ''
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-surface-900">{project.client_name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <Link href={`/reports/${project.id}/quotation`} className="btn-primary flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 border-t border-surface-100">
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const count = tab.count === true
                ? tab.id === 'costing' ? sections.length
                : 0
                : null

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors
                             ${activeTab === tab.id
                               ? 'border-brand-600 text-brand-600'
                               : 'border-transparent text-surface-500 hover:text-surface-700'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {count !== null && count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-surface-100 text-xs font-medium">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'details' && (
          <DetailsTab project={project} config={config} />
        )}

        {activeTab === 'survey' && (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-surface-900">Survey Overview</h2>
              <p className="text-surface-500">Survey status and progress</p>
            </div>

            {/* Survey Status Card */}
            <div className="section-card p-8 bg-gradient-to-br from-brand-500/10 to-brand-600/5 border-brand-400/30 mb-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-surface-900">
                      {wizardCompleted ? 'Survey Complete' : 'Survey Not Started'}
                    </h3>
                    {wizardCompleted && (
                      <span className="badge bg-green-100 text-green-700">
                        <Check className="w-4 h-4 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-surface-600 mb-4">
                    {wizardCompleted
                      ? 'Your survey is complete. View or edit survey details, or proceed to costing and quote generation.'
                      : 'Start the room-by-room survey wizard to record findings, capture photos, and automatically generate costing.'}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/survey/${project.id}/wizard`}
                      className="btn-primary flex items-center gap-2 px-6 py-3 text-base"
                    >
                      <ClipboardList className="w-5 h-5" />
                      {wizardCompleted ? 'Edit Survey' : 'Start Survey Wizard'}
                    </Link>
                    {wizardCompleted && (
                      <>
                        <Link
                          href={`/survey/${project.id}/costing`}
                          className="btn-secondary flex items-center gap-2 px-6 py-3 text-base"
                        >
                          <Calculator className="w-5 h-5" />
                          View Costing
                        </Link>
                        <Link
                          href={`/survey/${project.id}/report`}
                          className="btn-secondary flex items-center gap-2 px-6 py-3 text-base"
                        >
                          <FileText className="w-5 h-5" />
                          {reportStatus ? 'View Report' : 'Generate Report'}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 rounded-2xl bg-brand-100 flex items-center justify-center">
                    <ClipboardList className="w-16 h-16 text-brand-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Survey Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="section-card">
                <div className="section-card-header">
                  <h3 className="font-semibold text-surface-900">Survey Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  <DetailRow label="Client" value={project.client_name} />
                  <DetailRow label="Site Address" value={project.site_address} />
                  <DetailRow label="Survey Type" value={config.label} />
                  <DetailRow label="Survey Date" value={project.survey_date ? new Date(project.survey_date).toLocaleDateString() : '-'} />
                  {reportStatus && (
                    <DetailRow label="Report Status" value={
                      <span className={`badge ${
                        reportStatus === 'draft' ? 'badge-gray' :
                        reportStatus === 'generated' ? 'badge-blue' :
                        reportStatus === 'reviewed' ? 'badge-amber' :
                        reportStatus === 'finalised' ? 'badge-green' : ''
                      }`}>
                        {reportStatus}
                      </span>
                    } />
                  )}
                </div>
              </div>

              <div className="section-card">
                <div className="section-card-header">
                  <h3 className="font-semibold text-surface-900">Reported Problem</h3>
                </div>
                <div className="p-6">
                  <p className="text-surface-600">{project.notes || 'No problem description provided.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'costing' && (
          <CostingTab
            projectId={project.id}
            sections={sections}
            items={allItems}
            totals={totals}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsTab projectId={project.id} items={allItems} />
        )}

        {activeTab === 'report' && (
          <ReportTab project={project} config={config} totals={totals} photos={photos} />
        )}
      </div>
    </div>
  )
}

// ============ DETAILS TAB ============
function DetailsTab({ project, config }: { project: Project; config: typeof surveyTypeConfig['damp'] }) {
  const Icon = config.icon

  return (
    <div className="max-w-4xl">
      {/* Survey Type Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
          <span className={`font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Client Info */}
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="font-semibold text-surface-900">Client Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <DetailRow label="Name" value={project.client_name} />
            <DetailRow label="Email" value={project.customer?.email || '-'} />
            <DetailRow label="Phone" value={project.customer?.phone || '-'} />
          </div>
        </div>

        {/* Site Info */}
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="font-semibold text-surface-900">Site Address</h3>
          </div>
          <div className="p-6 space-y-4">
            <DetailRow label="Address" value={project.site_address} />
            <DetailRow label="City" value={project.site_city || '-'} />
            <DetailRow label="County" value={project.site_county || '-'} />
            <DetailRow label="Postcode" value={project.site_postcode} />
          </div>
        </div>

        {/* Survey Info */}
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="font-semibold text-surface-900">Survey Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <DetailRow label="Survey Date" value={project.survey_date ? new Date(project.survey_date).toLocaleDateString() : '-'} />
            <DetailRow label="Weather" value={project.weather_conditions || '-'} />
            <DetailRow label="Reference" value={project.enquiry_id || '-'} />
          </div>
        </div>

        {/* Notes */}
        <div className="section-card col-span-2">
          <div className="section-card-header">
            <h3 className="font-semibold text-surface-900">Notes</h3>
          </div>
          <div className="p-6">
            <p className="text-surface-600">{project.notes || 'No notes added'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-surface-500">{label}</p>
      {typeof value === 'string' ? (
        <p className="font-medium text-surface-900">{value}</p>
      ) : (
        <div>{value}</div>
      )}
    </div>
  )
}


// ============ COSTING TAB ============
function CostingTab({
  projectId,
  sections,
  items,
  totals
}: {
  projectId: string
  sections: ReturnType<typeof getProjectSections>
  items: ReturnType<typeof getProjectItems>
  totals: { materials: number; labor: number; total: number }
}) {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-surface-900">Cost Breakdown</h2>
          <p className="text-surface-500">Materials, labor, and total costs</p>
        </div>
        <Link href={`/costing/${projectId}`} className="btn-primary flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Open Cost Calculator
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="section-card p-6">
          <p className="text-sm text-surface-500">Materials</p>
          <p className="text-2xl font-bold text-surface-900">{formatCurrency(totals.materials)}</p>
        </div>
        <div className="section-card p-6">
          <p className="text-sm text-surface-500">Labor</p>
          <p className="text-2xl font-bold text-surface-900">{formatCurrency(totals.labor)}</p>
        </div>
        <div className="section-card p-6 bg-brand-50 border-brand-200">
          <p className="text-sm text-brand-700">Total</p>
          <p className="text-2xl font-bold text-brand-600">{formatCurrency(totals.total)}</p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const sectionItems = items.filter(i => i.section_id === section.id)
        const sectionTotal = sectionItems.reduce((acc, item) => {
          const calc = calculateLineItemTotal(item)
          return acc + calc.total
        }, 0)

        return (
          <div key={section.id} className="section-card mb-4">
            <div className="section-card-header flex items-center justify-between">
              <h3 className="font-semibold text-surface-900">{section.section_name}</h3>
              <span className="text-lg font-bold text-brand-600">{formatCurrency(sectionTotal)}</span>
            </div>
            <div className="divide-y divide-surface-100">
              {sectionItems.map((item) => {
                const calc = calculateLineItemTotal(item)
                return (
                  <div key={item.id} className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-surface-900">{item.item_name}</p>
                      <p className="text-sm text-surface-500">{calc.quantity.toFixed(2)} {item.uom}</p>
                    </div>
                    <span className="font-semibold text-surface-900">{formatCurrency(calc.total)}</span>
                  </div>
                )
              })}
              {sectionItems.length === 0 && (
                <div className="px-6 py-4 text-center text-surface-500">
                  No items in this section
                </div>
              )}
            </div>
          </div>
        )
      })}

      {sections.length === 0 && (
        <div className="empty-state">
          <Calculator className="empty-state-icon" />
          <p className="empty-state-title">No costing yet</p>
          <p className="empty-state-description">Add items to start calculating costs</p>
        </div>
      )}
    </div>
  )
}


// ============ REPORT TAB ============
function ReportTab({
  project,
  config,
  totals,
  photos
}: {
  project: Project
  config: typeof surveyTypeConfig['damp']
  totals: { materials: number; labor: number; total: number }
  photos: ReturnType<typeof getProjectPhotos>
}) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-surface-900">Survey Report</h2>
          <p className="text-surface-500">Generate and preview customer report</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Preview PDF
          </button>
          <button className="btn-primary flex items-center gap-2">
            Download PDF
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Cover */}
        <div className="bg-brand-600 text-white p-12">
          <h1 className="text-3xl font-bold">TYNE TEES</h1>
          <p className="text-brand-100">Damp Proofing Specialists</p>
          <div className="mt-8 bg-white/10 rounded-lg p-6">
            <p className="text-sm text-brand-200">Survey Report - {config.label}</p>
            <p className="text-xl font-semibold mt-1">{project.client_name}</p>
            <p className="text-brand-200 mt-1">{project.site_address}</p>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-sm text-surface-500">Survey Date</p>
              <p className="font-semibold">{project.survey_date ? new Date(project.survey_date).toLocaleDateString() : '-'}</p>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-sm text-surface-500">Report Date</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-sm text-surface-500">Ref</p>
              <p className="font-semibold">{project.project_number}</p>
            </div>
          </div>

          <h3 className="font-semibold text-surface-900 mb-4">Executive Summary</h3>
          <p className="text-surface-600 mb-8">
            {project.notes || 'No survey notes available.'}
          </p>

          <h3 className="font-semibold text-surface-900 mb-4">Quote Summary</h3>
          <div className="p-4 bg-surface-50 rounded-lg mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-surface-600">Materials</span>
              <span>{formatCurrency(totals.materials)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-surface-600">Labor</span>
              <span>{formatCurrency(totals.labor)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-surface-200 pt-2 mt-2">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <h3 className="font-semibold text-surface-900 mb-4">Photos ({photos.length})</h3>
          <div className="grid grid-cols-4 gap-2">
            {photos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="aspect-square bg-surface-100 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-surface-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ MATERIALS TAB ============
function MaterialsTab({ projectId, items }: { projectId: string; items: any[] }) {
  const materials = items.filter(item => item.is_active !== false && item.category === 'materials')
  const totalCost = materials.reduce((sum, item) => {
    const calc = calculateLineItemTotal(item)
    return sum + calc.materialCost
  }, 0)

  // Group by section
  const sections = Array.from(new Set(materials.map(item => item.section_id)))

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-surface-900">Materials List</h2>
          <p className="text-surface-500">Materials needed for this project</p>
        </div>
        <Link href={`/projects/${projectId}/materials`} className="btn-secondary flex items-center gap-2">
          <Package className="w-4 h-4" />
          Full List
        </Link>
      </div>

      {materials.length === 0 ? (
        <div className="section-card p-12 text-center">
          <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-surface-900">No materials yet</p>
          <p className="text-surface-500 mt-1">Add materials in the Costing section</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="section-card p-6">
            <p className="text-sm text-surface-500">Total Material Cost</p>
            <p className="text-3xl font-bold text-brand-600">{formatCurrency(totalCost)}</p>
          </div>
          <div className="section-card">
            <div className="section-card-header">
              <h3 className="font-semibold text-surface-900">Materials ({materials.length} items)</h3>
            </div>
            <div className="divide-y divide-surface-100">
              {materials.slice(0, 5).map((item) => {
                const calc = calculateLineItemTotal(item)
                return (
                  <div key={item.id} className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-surface-900">{item.item_name}</p>
                      <p className="text-sm text-surface-500">{calc.quantity.toFixed(2)} {item.uom}</p>
                    </div>
                    <span className="font-semibold text-surface-900">{formatCurrency(calc.materialCost)}</span>
                  </div>
                )
              })}
              {materials.length > 5 && (
                <div className="px-6 py-3 text-center">
                  <Link href={`/projects/${projectId}/materials`} className="text-brand-600 hover:text-brand-700 font-medium">
                    View all {materials.length} items
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
