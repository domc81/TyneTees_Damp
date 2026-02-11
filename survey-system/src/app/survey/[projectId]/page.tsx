'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Camera,
  MapPin,
  AlertTriangle,
  Check,
  Save,
  Droplets,
  Thermometer,
  Wind,
  Bug,
  Shield,
  FileText,
} from 'lucide-react'

// Defect types based on the Excel system
const defectTypes = [
  { id: 'rising_damp', label: 'Rising Damp', icon: Droplets, color: 'text-blue-600', surveyTypes: ['damp'] },
  { id: 'penetrating_damp', label: 'Penetrating Damp', icon: Wind, color: 'text-cyan-600', surveyTypes: ['damp'] },
  { id: 'wet_rot', label: 'Wet Rot', icon: AlertTriangle, color: 'text-amber-600', surveyTypes: ['timber', 'damp'] },
  { id: 'dry_rot', label: 'Dry Rot', icon: AlertTriangle, color: 'text-red-600', surveyTypes: ['timber', 'damp'] },
  { id: 'woodworm', label: 'Woodworm/Beetles', icon: Bug, color: 'text-amber-700', surveyTypes: ['woodworm', 'timber'] },
  { id: 'condensation', label: 'Condensation', icon: Thermometer, color: 'text-cyan-500', surveyTypes: ['condensation'] },
  { id: 'mould', label: 'Mould', icon: Wind, color: 'text-green-600', surveyTypes: ['condensation'] },
  { id: 'asbestos', label: 'Asbestos Suspected', icon: Shield, color: 'text-red-700', surveyTypes: ['damp', 'timber', 'structural'] },
  { id: 'wall_ties', label: 'Wall Tie Failure', icon: Shield, color: 'text-orange-600', surveyTypes: ['structural'] },
]

const severityLevels = [
  { value: 1, label: 'Minor', color: 'bg-green-100 text-green-700' },
  { value: 2, label: 'Moderate', color: 'bg-yellow-100 text-yellow-700' },
  { value: 3, label: 'Significant', color: 'bg-orange-100 text-orange-700' },
  { value: 4, label: 'Severe', color: 'bg-red-100 text-red-700' },
  { value: 5, label: 'Critical', color: 'bg-red-200 text-red-800' },
]

export default function SurveyInspectionPage({ params }: { params: { projectId: string } }) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [showAddDefect, setShowAddDefect] = useState<string | null>(null)

  // Sample project data
  const project = {
    id: params.projectId,
    project_number: 'TT-2026-0001',
    client_name: 'Smith Residence',
    survey_type: 'damp',
    status: 'in_progress',
  }

  // Sample rooms
  useEffect(() => {
    setRooms([
      {
        id: '1',
        name: 'Living Room',
        room_type: 'living_room',
        floor_level: 'ground',
        defects: [
          { id: 'd1', type: 'rising_damp', severity: 4, location: 'North wall up to 1.2m', notes: 'Visible tide marks and salt crystallisation' },
        ],
        moisture_readings: [
          { location: 'North wall - low', reading: 18 },
          { location: 'North wall - mid', reading: 22 },
          { location: 'North wall - high', reading: 19 },
        ],
        findings: 'Rising damp affecting full north wall. Plaster is perished and hygroscopic salts present.',
        recommendations: 'Install physical DPC and replaster with renovating plaster system.',
        photos: ['photo1.jpg', 'photo2.jpg'],
      },
      {
        id: '2',
        name: 'Hallway',
        room_type: 'hallway',
        floor_level: 'ground',
        defects: [],
        moisture_readings: [
          { location: 'External wall', reading: 12 },
        ],
        findings: 'Minor damp staining to external wall. Early stage salt crystallisation.',
        recommendations: 'Monitor and consider DPC installation.',
        photos: [],
      },
      {
        id: '3',
        name: 'Kitchen',
        room_type: 'kitchen',
        floor_level: 'ground',
        defects: [
          { id: 'd2', type: 'penetrating_damp', severity: 3, location: 'Window reveal', notes: 'Water ingress around window frame' },
        ],
        moisture_readings: [
          { location: 'Window reveal', reading: 25 },
        ],
        findings: 'Penetrating damp around window reveal. Pointing appears defective.',
        recommendations: 'Repoint external wall and treat affected area.',
        photos: [],
      },
    ])
  }, [params.projectId])

  const getDefectIcon = (type: string) => {
    return defectTypes.find(d => d.id === type)?.icon || AlertTriangle
  }

  const getDefectColor = (type: string) => {
    return defectTypes.find(d => d.id === type)?.color || 'text-gray-600'
  }

  const getSeverityColor = (severity: number) => {
    return severityLevels.find(s => s.value === severity)?.color || 'bg-gray-100 text-gray-700'
  }

  const hasAsbestosRisk = rooms.some(room =>
    room.defects.some((d: any) => d.type === 'asbestos')
  )

  const hasTimberRisk = rooms.some(room =>
    room.defects.some((d: any) => d.type === 'wet_rot' || d.type === 'dry_rot')
  )

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${project.id}`} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </Link>
            <div>
              <p className="text-sm font-mono text-surface-500">{project.project_number}</p>
              <h1 className="text-xl font-bold text-surface-900">Survey Inspection</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Risk Indicators */}
            {hasAsbestosRisk && (
              <span className="badge bg-red-100 text-red-700 px-3 py-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Asbestos Risk
              </span>
            )}
            {hasTimberRisk && (
              <span className="badge bg-amber-100 text-amber-700 px-3 py-1">
                <Bug className="w-4 h-4 mr-1" />
                Timber at Risk
              </span>
            )}
            <button className="btn-secondary flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Add Photo
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Survey
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <SummaryCard title="Rooms Surveyed" value={`${rooms.length}`} subtitle="Completed" />
            <SummaryCard title="Defects Found" value={rooms.reduce((sum: number, r: any) => sum + r.defects.length, 0).toString()} subtitle="Issues identified" />
            <SummaryCard title="Moisture Readings" value={rooms.reduce((sum: number, r: any) => sum + r.moisture_readings.length, 0).toString()} subtitle="Readings taken" />
            <SummaryCard
              title="Photos"
              value={rooms.reduce((sum: number, r: any) => sum + (r.photos?.length || 0), 0).toString()}
              subtitle="Images captured"
              highlight
            />
          </div>

          {/* Warning Banners */}
          {hasAsbestosRisk && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Asbestos Assessment Required</h4>
                <p className="text-sm text-red-700 mt-1">
                  Artex or decorative plaster suspected. Automatic trigger for asbestos testing section.
                </p>
                <Link href={`/projects/${project.id}/costing`} className="text-sm text-red-800 font-medium mt-2 inline-block underline">
                  View Asbestos Testing Costs →
                </Link>
              </div>
            </div>
          )}

          {hasTimberRisk && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <Bug className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">Timber Treatment Required</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Wet rot or dry rot detected. Automatic trigger for fungicidal treatment.
                </p>
                <Link href={`/projects/${project.id}/costing`} className="text-sm text-amber-800 font-medium mt-2 inline-block underline">
                  View Treatment Costs →
                </Link>
              </div>
            </div>
          )}

          {/* Rooms */}
          <div className="space-y-4">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                projectId={project.id}
                onExpand={() => setActiveRoom(activeRoom === room.id ? null : room.id)}
                isExpanded={activeRoom === room.id}
                getDefectIcon={getDefectIcon}
                getDefectColor={getDefectColor}
                getSeverityColor={getSeverityColor}
              />
            ))}
          </div>

          {/* Add Room Button */}
          <button className="w-full p-4 border-2 border-dashed border-surface-300 rounded-xl
                         text-surface-500 hover:border-brand-400 hover:text-brand-600
                         transition-colors flex items-center justify-center gap-2 mt-4">
            <Plus className="w-5 h-5" />
            Add Another Room
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ title, value, subtitle, highlight }: { title: string; value: string; subtitle: string; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? 'bg-brand-50 border-brand-200' : 'bg-white border-surface-200'}`}>
      <p className="text-sm text-surface-500">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${highlight ? 'text-brand-600' : 'text-surface-900'}`}>{value}</p>
      <p className="text-sm text-surface-400 mt-1">{subtitle}</p>
    </div>
  )
}

function RoomCard({
  room,
  index,
  projectId,
  isExpanded,
  onExpand,
  getDefectIcon,
  getDefectColor,
  getSeverityColor,
}: {
  room: any
  index: number
  projectId: string
  isExpanded: boolean
  onExpand: () => void
  getDefectIcon: any
  getDefectColor: any
  getSeverityColor: any
}) {
  return (
    <div className="section-card">
      {/* Header */}
      <button onClick={onExpand} className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors text-left">
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold text-surface-900">{room.name}</h3>
            <p className="text-sm text-surface-500 capitalize">{room.room_type.replace('_', ' ')} • {room.floor_level.replace('_', ' ')} floor</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {room.defects.length > 0 && (
            <span className="badge bg-red-100 text-red-700">
              {room.defects.length} defect{room.defects.length > 1 ? 's' : ''}
            </span>
          )}
          {room.moisture_readings.length > 0 && (
            <span className="badge bg-blue-100 text-blue-700">
              {room.moisture_readings.length} readings
            </span>
          )}
          {room.photos?.length > 0 && (
            <span className="badge bg-green-100 text-green-700">
              {room.photos.length} photos
            </span>
          )}
          <ChevronRight className={`w-5 h-5 text-surface-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-surface-100 p-6 space-y-6">
          {/* Defects */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-surface-900">Defects Found</h4>
              <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add Defect
              </button>
            </div>
            {room.defects.length === 0 ? (
              <p className="text-sm text-surface-500">No defects recorded</p>
            ) : (
              <div className="space-y-2">
                {room.defects.map((defect: any) => {
                  const DefectIcon = getDefectIcon(defect.type)
                  return (
                    <div key={defect.id} className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${defect.color} bg-opacity-10`}>
                        <DefectIcon className={`w-4 h-4 ${getDefectColor(defect.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-surface-900 capitalize">{defect.type.replace('_', ' ')}</span>
                          <span className={`badge ${getSeverityColor(defect.severity)}`}>{defect.severity}</span>
                        </div>
                        <p className="text-sm text-surface-500">{defect.location}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Moisture Readings */}
          <div>
            <h4 className="font-medium text-surface-900 mb-3">Moisture Readings</h4>
            {room.moisture_readings.length === 0 ? (
              <p className="text-sm text-surface-500">No readings taken</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {room.moisture_readings.map((reading: any, i: number) => (
                  <div key={i} className="p-3 bg-surface-50 rounded-lg">
                    <p className="text-xs text-surface-500">{reading.location}</p>
                    <p className={`text-lg font-semibold ${reading.reading >= 20 ? 'text-red-600' : reading.reading >= 15 ? 'text-amber-600' : 'text-green-600'}`}>
                      {reading.reading}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Findings */}
          <div>
            <h4 className="font-medium text-surface-900 mb-2">Findings</h4>
            <p className="text-surface-600">{room.findings}</p>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-medium text-surface-900 mb-2">Recommendations</h4>
            <p className="text-surface-600">{room.recommendations}</p>
          </div>

          {/* Photos */}
          {room.photos.length > 0 && (
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Photos</h4>
              <div className="flex gap-2">
                {room.photos.map((photo: string) => (
                  <div key={photo} className="w-24 h-24 bg-surface-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-surface-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
