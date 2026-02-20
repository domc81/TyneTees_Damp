'use client'

import { useState, useEffect } from 'react'
import {
  SurveyRoomRow,
  RoomData,
  IssueType,
  ISSUE_TYPE_LABELS,
  ISSUE_TYPE_COLOURS,
  FLOOR_LEVELS,
} from '@/types/survey-wizard.types'
import { Plus, Trash2, Check, Droplets, Wind, TreeDeciduous, Bug, Home, X, Camera, Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AudioRecorder from './AudioRecorder'
import DampFields from './DampFields'
import CondensationFields from './CondensationFields'
import TimberFields from './TimberFields'
import WoodwormFields from './WoodwormFields'
import PhotoCapture from './PhotoCapture'
import { filterPhotos } from '@/lib/survey-photo-service'
import type { SurveyPhoto } from '@/types/survey-photo.types'

interface RoomInspectionStepProps {
  rooms: SurveyRoomRow[]
  onRoomsChange: (rooms: SurveyRoomRow[]) => void
  surveyId: string
  photos: SurveyPhoto[]
  onPhotosChange: () => void
}

const ISSUE_ICONS: Record<IssueType, any> = {
  damp: Droplets,
  condensation: Wind,
  timber_decay: TreeDeciduous,
  woodworm: Bug,
}

const QUICK_ROOM_NAMES = [
  'Living Room',
  'Kitchen',
  'Hallway',
  'Bedroom 1',
  'Bedroom 2',
  'Bedroom 3',
  'Bathroom',
  'Dining Room',
  'Study',
  'Basement',
  'Utility Room',
  'Landing',
]

export default function RoomInspectionStep({ rooms, onRoomsChange, surveyId, photos, onPhotosChange }: RoomInspectionStepProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    rooms.length > 0 ? rooms[0].id : null
  )
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomFloor, setNewRoomFloor] = useState<string>('ground')
  const [isPolishing, setIsPolishing] = useState(false)
  const [polishError, setPolishError] = useState<string | null>(null)
  const [wasPolished, setWasPolished] = useState(false)

  // Reset polish state when selected room changes
  useEffect(() => {
    setIsPolishing(false)
    setPolishError(null)
    setWasPolished(false)
  }, [selectedRoomId])

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)

  // Filter photos for the current room
  const roomPhotos = selectedRoom ? filterPhotos(photos, { step: 'room_inspection', room_id: selectedRoom.id }) : []

  // Update fields on the selected room
  const updateSelectedRoom = (updates: Partial<typeof selectedRoom>) => {
    if (!selectedRoom) return
    const updatedRooms = rooms.map((r) =>
      r.id === selectedRoomId ? { ...r, ...updates } : r
    )
    onRoomsChange(updatedRooms)
  }

  // Handle transcription from audio recorder
  const handleTranscription = (text: string) => {
    if (!selectedRoom) return
    const currentFindings = selectedRoom.findings || ''
    const newFindings = currentFindings ? `${currentFindings} ${text}` : text
    const currentNotes = selectedRoom.surveyor_notes || ''
    const newNotes = currentNotes ? `${currentNotes}\n${text}` : text
    updateSelectedRoom({ findings: newFindings, surveyor_notes: newNotes })
    setWasPolished(false)
  }

  // Polish observations with AI
  const handlePolish = async () => {
    if (!selectedRoom || !selectedRoom.findings?.trim()) return
    setIsPolishing(true)
    setPolishError(null)

    const rawText = selectedRoom.findings

    try {
      const response = await fetch('/api/polish-observation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Polish failed')
      }

      const result = await response.json()
      updateSelectedRoom({ findings: result.polished, surveyor_notes: rawText })
      setWasPolished(true)
    } catch (err) {
      console.error('Polish error:', err)
      setPolishError(err instanceof Error ? err.message : 'Failed to polish text')
      setTimeout(() => setPolishError(null), 5000)
    } finally {
      setIsPolishing(false)
    }
  }

  // Undo polish — restore from surveyor_notes
  const handleUndoPolish = () => {
    if (!selectedRoom || !selectedRoom.surveyor_notes) return
    updateSelectedRoom({ findings: selectedRoom.surveyor_notes })
    setWasPolished(false)
  }

  // Add new room
  const handleAddRoom = () => {
    if (!newRoomName.trim()) return

    const newRoom: SurveyRoomRow = {
      id: `room-${Date.now()}`,
      survey_id: '', // Will be set when saving
      name: newRoomName.trim(),
      room_type: 'other',
      floor_level: newRoomFloor as any,
      display_order: rooms.length,
      issues_identified: [],
      room_data: {},
      is_completed: false,
    }

    const updatedRooms = [...rooms, newRoom]
    onRoomsChange(updatedRooms)
    setSelectedRoomId(newRoom.id)
    setNewRoomName('')
    setNewRoomFloor('ground')
    setShowAddRoom(false)
  }

  // Remove room
  const handleRemoveRoom = (roomId: string) => {
    if (!confirm('Are you sure you want to remove this room?')) return

    const updatedRooms = rooms.filter((r) => r.id !== roomId)
    onRoomsChange(updatedRooms)

    if (selectedRoomId === roomId) {
      setSelectedRoomId(updatedRooms.length > 0 ? updatedRooms[0].id : null)
    }
  }

  // Toggle issue for selected room
  const handleToggleIssue = (issue: IssueType) => {
    if (!selectedRoom) return

    const currentIssues = selectedRoom.issues_identified
    const hasIssue = currentIssues.includes(issue)

    const updatedIssues = hasIssue
      ? currentIssues.filter((i) => i !== issue)
      : [...currentIssues, issue]

    // If removing an issue, also remove its data
    const updatedRoomData = { ...selectedRoom.room_data }
    if (hasIssue) {
      delete updatedRoomData[issue]
    }

    const updatedRooms = rooms.map((r) =>
      r.id === selectedRoomId
        ? { ...r, issues_identified: updatedIssues, room_data: updatedRoomData }
        : r
    )

    onRoomsChange(updatedRooms)
  }

  // Update room data for a specific issue
  const handleRoomDataChange = (issue: IssueType, data: any) => {
    if (!selectedRoom) return

    const updatedRoomData = {
      ...selectedRoom.room_data,
      [issue]: data,
    }

    const updatedRooms = rooms.map((r) =>
      r.id === selectedRoomId ? { ...r, room_data: updatedRoomData } : r
    )

    onRoomsChange(updatedRooms)
  }

  // Mark room as complete
  const handleToggleComplete = () => {
    if (!selectedRoom) return

    const updatedRooms = rooms.map((r) =>
      r.id === selectedRoomId ? { ...r, is_completed: !r.is_completed } : r
    )

    onRoomsChange(updatedRooms)
  }

  return (
    <div className="space-y-6">
      {/* Room tabs */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Home className="w-5 h-5 text-brand-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Rooms</h3>
            <p className="text-sm text-white/60">Select a room to inspect</p>
          </div>
          <Button onClick={() => setShowAddRoom(true)} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Room
          </Button>
        </div>

        {/* Room list */}
        {rooms.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-brand-500/30 border border-brand-400 text-white'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }
                  `}
                >
                  <span className="font-medium">{room.name}</span>
                  {room.is_completed && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                  {room.issues_identified.length > 0 && (
                    <div className="flex items-center gap-1 ml-1">
                      {room.issues_identified.map((issue) => {
                        const Icon = ISSUE_ICONS[issue]
                        return (
                          <Icon
                            key={issue}
                            className="w-3 h-3 text-brand-300"
                            title={ISSUE_TYPE_LABELS[issue]}
                          />
                        )
                      })}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-white/50">
            No rooms added yet. Click "Add Room" to get started.
          </div>
        )}

        {/* Add room form */}
        {showAddRoom && (
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Add New Room</h4>
              <button
                onClick={() => setShowAddRoom(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Quick select buttons */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-white/70 mb-2">
                Quick Select:
              </label>
              <div className="flex flex-wrap gap-2">
                {QUICK_ROOM_NAMES.map((name) => (
                  <button
                    key={name}
                    onClick={() => setNewRoomName(name)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-400/50 text-white/70 hover:text-white transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Room Name *
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g., Living Room"
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Floor Level *
                </label>
                <select
                  value={newRoomFloor}
                  onChange={(e) => setNewRoomFloor(e.target.value)}
                  className="input-field text-sm"
                >
                  {FLOOR_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddRoom}
                disabled={!newRoomName.trim()}
                size="sm"
                className="flex-1"
              >
                Add Room
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowAddRoom(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Room editor */}
      {selectedRoom ? (
        <div className="space-y-6">
          {/* Room header */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedRoom.name}</h3>
                <p className="text-sm text-white/60">
                  {FLOOR_LEVELS.find((l) => l.value === selectedRoom.floor_level)?.label}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleComplete}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                    transition-all duration-200
                    ${
                      selectedRoom.is_completed
                        ? 'bg-green-500/20 border border-green-400/50 text-green-300'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }
                  `}
                >
                  <Check className="w-4 h-4" />
                  {selectedRoom.is_completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleRemoveRoom(selectedRoom.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 text-red-300 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Issue selector */}
          <div className="glass-card p-6">
            <div className="mb-4">
              <h4 className="text-base font-semibold text-white mb-2">Issues Identified</h4>
              <p className="text-sm text-white/60">
                Select all issues present in this room (multi-select)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['damp', 'condensation', 'timber_decay', 'woodworm'] as IssueType[]).map(
                (issue) => {
                  const Icon = ISSUE_ICONS[issue]
                  const isSelected = selectedRoom.issues_identified.includes(issue)
                  const color = ISSUE_TYPE_COLOURS[issue]

                  return (
                    <button
                      key={issue}
                      onClick={() => handleToggleIssue(issue)}
                      className={`
                        flex flex-col items-center gap-2 p-4 rounded-xl
                        transition-all duration-200
                        ${
                          isSelected
                            ? `bg-${color}-500/20 border-2 border-${color}-400`
                            : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? `text-${color}-300` : 'text-white/50'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? 'text-white' : 'text-white/60'
                        }`}
                      >
                        {ISSUE_TYPE_LABELS[issue]}
                      </span>
                    </button>
                  )
                }
              )}
            </div>
          </div>

          {/* Room Observations */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-brand-500/20">
                <FileText className="w-5 h-5 text-brand-300" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Room Observations</h4>
                <p className="text-sm text-white/60">Describe what you see in this room — all issues, all observations.</p>
              </div>
            </div>

            <textarea
              value={selectedRoom.findings || ''}
              onChange={(e) => {
                updateSelectedRoom({ findings: e.target.value })
                setWasPolished(false)
              }}
              placeholder="Tap record to describe what you see, or type your observations here..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 text-sm mb-4"
            />

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <AudioRecorder
                  onTranscriptionComplete={handleTranscription}
                  disabled={isPolishing}
                />
              </div>
              <button
                onClick={handlePolish}
                disabled={!selectedRoom.findings?.trim() || isPolishing}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-white/90"
              >
                {isPolishing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>✨</span>
                )}
                {isPolishing ? 'Polishing...' : 'Polish'}
              </button>
            </div>

            {wasPolished && (
              <div className="flex items-center gap-3 mt-3 text-sm">
                <span className="text-brand-300">✨ Polished</span>
                <button
                  onClick={handleUndoPolish}
                  className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
                >
                  Undo
                </button>
              </div>
            )}

            {polishError && (
              <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
                {polishError}
              </div>
            )}
          </div>

          {/* Issue-specific fields */}
          {selectedRoom.issues_identified.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-white/60">
                <span className="text-green-400 font-medium">✓</span> No issues — this room is
                clear
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedRoom.issues_identified.includes('damp') && (
                <>
                  <DampFields
                    data={selectedRoom.room_data.damp || {}}
                    onChange={(data) => handleRoomDataChange('damp', data)}
                  />
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Camera className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">Damp Evidence Photos</h4>
                        <p className="text-sm text-white/60">Visual evidence of damp issues</p>
                      </div>
                    </div>
                    <PhotoCapture
                      surveyId={surveyId}
                      step="room_inspection"
                      roomId={selectedRoom.id}
                      category="damp_evidence"
                      label="Damp Evidence"
                      maxPhotos={10}
                      existingPhotos={filterPhotos(roomPhotos, { category: 'damp_evidence' })}
                      onPhotosChange={onPhotosChange}
                    />
                  </div>
                </>
              )}

              {selectedRoom.issues_identified.includes('condensation') && (
                <>
                  <CondensationFields
                    data={selectedRoom.room_data.condensation || {}}
                    onChange={(data) => handleRoomDataChange('condensation', data)}
                  />
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Camera className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">Condensation Evidence Photos</h4>
                        <p className="text-sm text-white/60">Mould, condensation patterns</p>
                      </div>
                    </div>
                    <PhotoCapture
                      surveyId={surveyId}
                      step="room_inspection"
                      roomId={selectedRoom.id}
                      category="condensation_evidence"
                      label="Condensation Evidence"
                      maxPhotos={5}
                      existingPhotos={filterPhotos(roomPhotos, { category: 'condensation_evidence' })}
                      onPhotosChange={onPhotosChange}
                    />
                  </div>
                </>
              )}

              {selectedRoom.issues_identified.includes('timber_decay') && (
                <>
                  <TimberFields
                    data={selectedRoom.room_data.timber_decay || {}}
                    onChange={(data) => handleRoomDataChange('timber_decay', data)}
                  />
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <Camera className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">Timber Damage Photos</h4>
                        <p className="text-sm text-white/60">Rot, decay, structural issues</p>
                      </div>
                    </div>
                    <PhotoCapture
                      surveyId={surveyId}
                      step="room_inspection"
                      roomId={selectedRoom.id}
                      category="timber_evidence"
                      label="Timber Evidence"
                      maxPhotos={10}
                      existingPhotos={filterPhotos(roomPhotos, { category: 'timber_evidence' })}
                      onPhotosChange={onPhotosChange}
                    />
                  </div>
                </>
              )}

              {selectedRoom.issues_identified.includes('woodworm') && (
                <>
                  <WoodwormFields
                    data={selectedRoom.room_data.woodworm || {}}
                    onChange={(data) => handleRoomDataChange('woodworm', data)}
                  />
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-red-500/20">
                        <Camera className="w-5 h-5 text-red-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">Woodworm Evidence Photos</h4>
                        <p className="text-sm text-white/60">Flight holes, frass, damage</p>
                      </div>
                    </div>
                    <PhotoCapture
                      surveyId={surveyId}
                      step="room_inspection"
                      roomId={selectedRoom.id}
                      category="woodworm_evidence"
                      label="Woodworm Evidence"
                      maxPhotos={5}
                      existingPhotos={filterPhotos(roomPhotos, { category: 'woodworm_evidence' })}
                      onPhotosChange={onPhotosChange}
                    />
                  </div>
                </>
              )}

              {/* General Room Photos (always shown) */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-brand-500/20">
                    <Camera className="w-5 h-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">General Room Photos</h4>
                    <p className="text-sm text-white/60">Overall room views</p>
                  </div>
                </div>
                <PhotoCapture
                  surveyId={surveyId}
                  step="room_inspection"
                  roomId={selectedRoom.id}
                  category="room_general"
                  label="General Room"
                  maxPhotos={5}
                  existingPhotos={filterPhotos(roomPhotos, { category: 'room_general' })}
                  onPhotosChange={onPhotosChange}
                />
              </div>
            </div>
          )}
        </div>
      ) : rooms.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Rooms Added Yet</h3>
          <p className="text-white/60 mb-4">
            Start by adding rooms to inspect. You can add multiple rooms and inspect them one by
            one.
          </p>
          <Button onClick={() => setShowAddRoom(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add First Room
          </Button>
        </div>
      ) : null}
    </div>
  )
}
