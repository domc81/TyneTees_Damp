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
  { id: 'survey', label: 'Survey', icon: ClipboardList },
  { id: 'inspection', label: 'Rooms', icon: Home },
  { id: 'wizard', label: 'Survey Wizard', icon: ClipboardList },
  { id: 'photos', label: 'Photos', icon: Camera, count: true },
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

              // For survey tab, use Link instead of button (goes to structured survey)
              if (tab.id === 'survey') {
                return (
                  <Link
                    key={tab.id}
                    href={`/projects/${project.id}/survey`}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors
                               ${activeTab === tab.id
                                 ? 'border-brand-600 text-brand-600'
                                 : 'border-transparent text-surface-500 hover:text-surface-700'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Link>
                )
              }

              // For inspection tab, use Link instead of button
              if (tab.id === 'inspection') {
                return (
                  <Link
                    key={tab.id}
                    href={`/survey/${project.id}/inspection`}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors
                               ${activeTab === tab.id
                                 ? 'border-brand-600 text-brand-600'
                                 : 'border-transparent text-surface-500 hover:text-surface-700'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Link>
                )
              }

              // Survey Wizard tab (new - primary action)
              if (tab.id === 'wizard') {
                return (
                  <Link
                    key={tab.id}
                    href={`/survey/${project.id}/wizard`}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors font-medium
                               ${activeTab === tab.id
                                 ? 'border-brand-600 text-brand-600'
                                 : 'border-transparent text-brand-600 hover:text-brand-700'}`}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Survey Wizard</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
                      NEW
                    </span>
                  </Link>
                )
              }

              const count = tab.count === true
                ? tab.id === 'photos' ? photos.length
                : tab.id === 'costing' ? sections.length
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-surface-900">Structured Survey</h2>
                <p className="text-surface-500">Complete the detailed inspection questionnaire</p>
              </div>
              <Link href={`/projects/${project.id}/survey`} className="btn-primary flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Open Survey Form
              </Link>
            </div>

            <div className="section-card">
              <div className="section-card-header">
                <h3 className="font-semibold text-surface-900">Survey Sections</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <Link
                  href={`/projects/${project.id}/survey`}
                  className="p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <Thermometer className="w-6 h-6 text-brand-600 mb-2" />
                  <h4 className="font-semibold text-surface-900">Header & Property Details</h4>
                  <p className="text-sm text-surface-500">Client info, weather, property type</p>
                </Link>
                <Link
                  href={`/projects/${project.id}/survey`}
                  className="p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <Building className="w-6 h-6 text-brand-600 mb-2" />
                  <h4 className="font-semibold text-surface-900">External Inspection</h4>
                  <p className="text-sm text-surface-500">Building defects, DPC, ventilation</p>
                </Link>
                <Link
                  href={`/projects/${project.id}/survey`}
                  className="p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <Home className="w-6 h-6 text-brand-600 mb-2" />
                  <h4 className="font-semibold text-surface-900">Internal Inspection</h4>
                  <p className="text-sm text-surface-500">Floors, walls, solid floors</p>
                </Link>
                <Link
                  href={`/projects/${project.id}/survey`}
                  className="p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <FileText className="w-6 h-6 text-brand-600 mb-2" />
                  <h4 className="font-semibold text-surface-900">Report Generation</h4>
                  <p className="text-sm text-surface-500">Auto-generate from survey answers</p>
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Complete the structured survey questionnaire for a comprehensive report.
                The survey follows the standard Tyne Tees inspection process.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'inspection' && (
          <InspectionTab projectId={project.id} />
        )}

        {activeTab === 'photos' && (
          <PhotosTab photos={photos} projectId={project.id} />
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-surface-500">{label}</p>
      <p className="font-medium text-surface-900">{value}</p>
    </div>
  )
}

// ============ PHOTOS TAB ============
function PhotosTab({ photos, projectId }: { photos: ReturnType<typeof getProjectPhotos>; projectId: string }) {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-surface-900">Site Photos</h2>
          <p className="text-surface-500">Photos taken during survey</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="btn-primary flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">
          <Camera className="empty-state-icon" />
          <p className="empty-state-title">No photos yet</p>
          <p className="empty-state-description">Capture photos during your survey to document findings</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {photos.map((photo) => {
            const photoUrl = getPhotoUrl(photo)
            return (
              <div key={photo.id} className="aspect-square rounded-xl overflow-hidden bg-surface-100 group relative">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={photo.description || 'Survey photo'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) fallback.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center text-surface-400 ${photoUrl ? 'hidden' : ''}`}
                >
                  <Camera className="w-12 h-12" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-white truncate">
                    {photo.description || 'No description'}
                  </p>
                  <p className="text-xs text-white/80">
                    {photo.created_at ? new Date(photo.created_at).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
            )
          })}
          {/* Add more photo slot */}
          <button
            onClick={() => setShowUpload(true)}
            className="aspect-square rounded-xl border-2 border-dashed border-surface-300 flex flex-col items-center justify-center gap-2 hover:border-brand-400 hover:bg-brand-50 transition-colors"
          >
            <Plus className="w-8 h-8 text-surface-400" />
            <span className="text-sm text-surface-500">Add Photo</span>
          </button>
        </div>
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

// ============ INSPECTION TAB ============
function InspectionTab({ projectId }: { projectId: string }) {
  const [rooms, setRooms] = useState<SurveyRoom[]>([])
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingSave, setPendingSave] = useState(false)

  // Load rooms from Supabase
  useEffect(() => {
    async function loadRooms() {
      try {
        setIsLoading(true)
        const data = await getSurveyRooms(projectId)
        setRooms(data)
      } catch (err) {
        console.error('Error loading rooms:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadRooms()
  }, [projectId])

  // Auto-save function
  const saveRoom = async (room: SurveyRoom) => {
    try {
      if (room.id.startsWith('local-')) {
        // New room - create it
        const created = await createSurveyRoom({
          project_id: projectId,
          name: room.name,
          room_type: room.room_type,
          floor_level: room.floor_level,
          findings: room.findings || '',
          recommendations: room.recommendations || '',
        })
        if (created) {
          setRooms(prev => prev.map(r => r.id === room.id ? created : r))
        }
      } else {
        // Existing room - update it
        await updateSurveyRoom(room.id, {
          name: room.name,
          room_type: room.room_type,
          floor_level: room.floor_level,
          findings: room.findings || '',
          recommendations: room.recommendations || '',
        })
      }
    } catch (err) {
      console.error('Error saving room:', err)
    }
  }

  const handleAddRoom = async () => {
    const newRoom: SurveyRoom = {
      id: `local-${Date.now()}`,
      project_id: projectId,
      name: 'New Room',
      room_type: 'living_room',
      floor_level: 'ground',
      display_order: rooms.length + 1,
      findings: '',
      recommendations: '',
      is_completed: false,
      created_at: new Date().toISOString(),
    }
    setRooms(prev => [...prev, newRoom])
    // Save immediately
    const created = await createSurveyRoom({
      project_id: projectId,
      name: newRoom.name,
      room_type: newRoom.room_type,
      floor_level: newRoom.floor_level,
      findings: '',
      recommendations: '',
    })
    if (created) {
      setRooms(prev => prev.map(r => r.id === newRoom.id ? created : r))
    }
  }

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Delete this room?')) return
    setRooms(prev => prev.filter(r => r.id !== id))
    // Delete from Supabase if not a local ID
    if (!id.startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('survey_rooms')
          .delete()
          .eq('id', id)
        if (error) console.error('Error deleting room:', error)
      } catch (err) {
        console.error('Error deleting room:', err)
      }
    }
  }

  const handleRoomChange = async (roomId: string, updates: Partial<SurveyRoom>) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, ...updates } : r))
    const room = rooms.find(r => r.id === roomId)
    if (room) {
      await saveRoom({ ...room, ...updates })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-surface-900">Room Inspection</h2>
          <p className="text-surface-500">Record findings for each room</p>
        </div>
        <button onClick={handleAddRoom} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="empty-state">
          <Home className="empty-state-icon" />
          <p className="empty-state-title">No rooms added yet</p>
          <p className="empty-state-description">Start your survey by adding rooms</p>
          <button onClick={handleAddRoom} className="btn-primary mt-4">
            Add First Room
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <div key={room.id} className="section-card">
              <button
                onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-surface-900">{room.name}</h4>
                    <p className="text-sm text-surface-500">
                      {room.room_type?.replace('_', ' ')} • {room.floor_level?.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {room.findings && (
                    <span className="badge badge-amber">Findings recorded</span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-surface-400 transition-transform ${expandedRoom === room.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {expandedRoom === room.id && (
                <div className="border-t border-surface-100 px-6 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Room Name</label>
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) => handleRoomChange(room.id, { name: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="input-label">Room Type</label>
                      <select
                        value={room.room_type}
                        onChange={(e) => handleRoomChange(room.id, { room_type: e.target.value })}
                        className="input-field"
                      >
                        <option value="living_room">Living Room</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bathroom">Bathroom</option>
                        <option value="hallway">Hallway</option>
                        <option value="basement">Basement</option>
                        <option value="loft">Loft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="input-label">Floor Level</label>
                    <select
                      value={room.floor_level}
                      onChange={(e) => handleRoomChange(room.id, { floor_level: e.target.value })}
                      className="input-field"
                    >
                      <option value="ground">Ground Floor</option>
                      <option value="first">First Floor</option>
                      <option value="second">Second Floor</option>
                      <option value="basement">Basement</option>
                      <option value="attic">Attic</option>
                    </select>
                  </div>

                  <div>
                    <label className="input-label">Findings / Observations</label>
                    <textarea
                      value={room.findings || ''}
                      onChange={(e) => handleRoomChange(room.id, { findings: e.target.value })}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Describe what was found..."
                    />
                  </div>

                  <div>
                    <label className="input-label">Recommendations</label>
                    <textarea
                      value={room.recommendations || ''}
                      onChange={(e) => handleRoomChange(room.id, { recommendations: e.target.value })}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Recommended works..."
                    />
                  </div>

                  <button onClick={() => handleDeleteRoom(room.id)} className="btn-ghost text-red-600 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Room
                  </button>
                </div>
              )}
            </div>
          ))}
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
