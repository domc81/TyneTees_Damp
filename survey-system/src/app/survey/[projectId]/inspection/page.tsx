'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Camera,
  MapPin,
  Droplets,
  Bug,
  Wind,
  Check,
  Save,
  Trash2,
  ChevronDown,
} from 'lucide-react'
import { getProject, getProjectRooms } from '@/lib/store'
import type { SurveyRoom } from '@/lib/store'

const photoCategories = [
  { id: 'general', label: 'General', icon: Camera },
  { id: 'damp_evidence', label: 'Damp Evidence', icon: Droplets },
  { id: 'timber_damage', label: 'Timber', icon: Bug },
  { id: 'ventilation', label: 'Ventilation', icon: Wind },
]

const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'hallway', label: 'Hallway' },
  { value: 'basement', label: 'Basement' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'study', label: 'Study' },
  { value: 'other', label: 'Other' },
]

const floorLevels = [
  { value: 'ground', label: 'Ground Floor' },
  { value: 'first', label: 'First Floor' },
  { value: 'second', label: 'Second Floor' },
  { value: 'basement', label: 'Basement' },
]

export default function SurveyInspectionPage({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<any>(null)
  const [rooms, setRooms] = useState<SurveyRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<SurveyRoom | null>(null)
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const proj = getProject(params.projectId)
    if (proj) {
      setProject(proj)
      setRooms(getProjectRooms(params.projectId))
    }
    setIsLoading(false)
  }, [params.projectId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="spinner" />
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

  // Handle add room
  const handleAddRoom = () => {
    const newRoom: SurveyRoom = {
      id: crypto.randomUUID(),
      project_id: params.projectId,
      name: `Room ${rooms.length + 1}`,
      room_type: 'living_room',
      floor_level: 'ground',
      order: rooms.length + 1,
      findings: '',
      recommendations: '',
      moisture_readings: [],
      photos: [],
      defects: [],
      created_at: new Date().toISOString(),
    }

    // Save to localStorage
    const existingRooms = JSON.parse(localStorage.getItem('tyne-tees-rooms') || '[]')
    existingRooms.push(newRoom)
    localStorage.setItem('tyne-tees-rooms', JSON.stringify(existingRooms))
    setRooms([...rooms, newRoom])
    setShowAddRoom(false)
  }

  // Handle delete room
  const handleDeleteRoom = (roomId: string) => {
    const existingRooms = JSON.parse(localStorage.getItem('tyne-tees-rooms') || '[]')
    const filtered = existingRooms.filter((r: SurveyRoom) => r.id !== roomId)
    localStorage.setItem('tyne-tees-rooms', JSON.stringify(filtered))
    setRooms(rooms.filter(r => r.id !== roomId))
    if (activeRoom?.id === roomId) {
      setActiveRoom(null)
    }
  }

  // Handle update room
  const handleUpdateRoom = (roomId: string, updates: Partial<SurveyRoom>) => {
    const updatedRooms = rooms.map(r => r.id === roomId ? { ...r, ...updates } : r)
    setRooms(updatedRooms)
    setActiveRoom(updatedRooms.find(r => r.id === roomId) || null)

    // Save to localStorage
    const existingRooms = JSON.parse(localStorage.getItem('tyne-tees-rooms') || '[]')
    const savedIndex = existingRooms.findIndex((r: SurveyRoom) => r.id === roomId)
    if (savedIndex >= 0) {
      existingRooms[savedIndex] = { ...existingRooms[savedIndex], ...updates }
      localStorage.setItem('tyne-tees-rooms', JSON.stringify(existingRooms))
    }
  }

  const getRoomTypeLabel = (value: string) => roomTypes.find(r => r.value === value)?.label || value
  const getFloorLabel = (value: string) => floorLevels.find(f => f.value === value)?.label || value

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${params.projectId}`} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </Link>
            <div>
              <p className="text-sm font-mono text-surface-500">{project.project_number}</p>
              <h1 className="text-xl font-bold text-surface-900">Room Inspection</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
        <div className="max-w-5xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">Rooms</p>
              <p className="text-2xl font-bold text-surface-900">{rooms.length}</p>
            </div>
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">With Findings</p>
              <p className="text-2xl font-bold text-amber-600">
                {rooms.filter(r => r.findings && r.findings.length > 0).length}
              </p>
            </div>
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">Moisture Readings</p>
              <p className="text-2xl font-bold text-surface-900">
                {rooms.reduce((sum, r) => sum + (r.moisture_readings?.length || 0), 0)}
              </p>
            </div>
            <div className="section-card p-6 bg-brand-50 border-brand-200">
              <p className="text-sm text-brand-700">Photos</p>
              <p className="text-2xl font-bold text-brand-600">
                {rooms.reduce((sum, r) => sum + (r.photos?.length || 0), 0)}
              </p>
            </div>
          </div>

          {/* Rooms List */}
          <div className="section-card">
            <div className="section-card-header flex items-center justify-between">
              <h2 className="font-semibold text-surface-900">Property Rooms</h2>
              <button
                onClick={() => setShowAddRoom(true)}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Room
              </button>
            </div>

            {rooms.length === 0 ? (
              <div className="p-12 text-center">
                <MapPin className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-surface-900">No rooms added yet</p>
                <p className="text-surface-500 mt-1">Start your survey by adding rooms to inspect</p>
                <button
                  onClick={() => setShowAddRoom(true)}
                  className="btn-primary mt-4"
                >
                  Add First Room
                </button>
              </div>
            ) : (
              <div className="divide-y divide-surface-100">
                {rooms.map((room, index) => (
                  <div key={room.id}>
                    {/* Room Header */}
                    <button
                      onClick={() => setActiveRoom(activeRoom?.id === room.id ? null : room)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-surface-900">{room.name}</h3>
                          <p className="text-sm text-surface-500">
                            {getRoomTypeLabel(room.room_type)} • {getFloorLabel(room.floor_level)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {room.findings && (
                          <span className="badge badge-amber">Findings</span>
                        )}
                        {(room.moisture_readings?.length || 0) > 0 && (
                          <span className="badge badge-blue">Readings</span>
                        )}
                        {(room.photos?.length || 0) > 0 && (
                          <span className="badge badge-green">Photos</span>
                        )}
                        <ChevronDown
                          className={`w-5 h-5 text-surface-400 transition-transform ${
                            activeRoom?.id === room.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded Room Details */}
                    {activeRoom?.id === room.id && (
                      <div className="border-t border-surface-100 bg-surface-50 p-6 space-y-6">
                        {/* Room Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">Room Name</label>
                            <input
                              type="text"
                              value={room.name}
                              onChange={(e) => handleUpdateRoom(room.id, { name: e.target.value })}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="input-label">Room Type</label>
                            <select
                              value={room.room_type}
                              onChange={(e) => handleUpdateRoom(room.id, { room_type: e.target.value })}
                              className="input-field"
                            >
                              {roomTypes.map(rt => (
                                <option key={rt.value} value={rt.value}>{rt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="input-label">Floor Level</label>
                            <select
                              value={room.floor_level}
                              onChange={(e) => handleUpdateRoom(room.id, { floor_level: e.target.value })}
                              className="input-field"
                            >
                              {floorLevels.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Findings */}
                        <div>
                          <label className="input-label">Findings / Observations</label>
                          <textarea
                            value={room.findings || ''}
                            onChange={(e) => handleUpdateRoom(room.id, { findings: e.target.value })}
                            className="input-field resize-none"
                            rows={4}
                            placeholder="Describe what was found during inspection..."
                          />
                        </div>

                        {/* Recommendations */}
                        <div>
                          <label className="input-label">Recommendations</label>
                          <textarea
                            value={room.recommendations || ''}
                            onChange={(e) => handleUpdateRoom(room.id, { recommendations: e.target.value })}
                            className="input-field resize-none"
                            rows={4}
                            placeholder="Recommended works..."
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="btn-ghost text-red-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Room
                          </button>
                          <button
                            onClick={() => setActiveRoom(null)}
                            className="btn-secondary"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddRoom(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-surface-100">
              <h3 className="text-lg font-semibold text-surface-900">Add New Room</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="input-label">Room Name</label>
                <input
                  type="text"
                  id="new-room-name"
                  className="input-field"
                  placeholder="e.g., Living Room"
                  defaultValue={`Room ${rooms.length + 1}`}
                />
              </div>
              <div>
                <label className="input-label">Room Type</label>
                <select id="new-room-type" className="input-field" defaultValue="living_room">
                  {roomTypes.map(rt => (
                    <option key={rt.value} value={rt.value}>{rt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Floor Level</label>
                <select id="new-room-floor" className="input-field" defaultValue="ground">
                  {floorLevels.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex gap-3">
              <button
                onClick={() => setShowAddRoom(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const nameInput = document.getElementById('new-room-name') as HTMLInputElement
                  const typeInput = document.getElementById('new-room-type') as HTMLSelectElement
                  const floorInput = document.getElementById('new-room-floor') as HTMLSelectElement

                  const newRoom: SurveyRoom = {
                    id: crypto.randomUUID(),
                    project_id: params.projectId,
                    name: nameInput?.value || `Room ${rooms.length + 1}`,
                    room_type: typeInput?.value || 'living_room',
                    floor_level: floorInput?.value || 'ground',
                    order: rooms.length + 1,
                    findings: '',
                    recommendations: '',
                    moisture_readings: [],
                    photos: [],
                    defects: [],
                    created_at: new Date().toISOString(),
                  }

                  const existingRooms = JSON.parse(localStorage.getItem('tyne-tees-rooms') || '[]')
                  existingRooms.push(newRoom)
                  localStorage.setItem('tyne-tees-rooms', JSON.stringify(existingRooms))
                  setRooms([...rooms, newRoom])
                  setShowAddRoom(false)
                }}
                className="btn-primary flex-1"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
