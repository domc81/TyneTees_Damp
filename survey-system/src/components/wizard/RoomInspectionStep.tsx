'use client'

import { useState } from 'react'
import {
  SurveyRoomRow,
  RoomData,
  IssueType,
  ISSUE_TYPE_LABELS,
  ISSUE_TYPE_COLOURS,
  FLOOR_LEVELS,
} from '@/types/survey-wizard.types'
import { Plus, Trash2, Check, Droplets, Wind, TreeDeciduous, Bug, Home, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DampFields from './DampFields'

interface RoomInspectionStepProps {
  rooms: SurveyRoomRow[]
  onRoomsChange: (rooms: SurveyRoomRow[]) => void
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

export default function RoomInspectionStep({ rooms, onRoomsChange }: RoomInspectionStepProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    rooms.length > 0 ? rooms[0].id : null
  )
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomFloor, setNewRoomFloor] = useState<string>('ground')

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)

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
                <DampFields
                  data={selectedRoom.room_data.damp || {}}
                  onChange={(data) => handleRoomDataChange('damp', data)}
                />
              )}

              {selectedRoom.issues_identified.includes('condensation') && (
                <div className="glass-card p-6">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Wind className="w-5 h-5 text-purple-300" />
                    Condensation Fields
                  </h4>
                  <p className="text-sm text-white/60">Coming soon in next build iteration</p>
                </div>
              )}

              {selectedRoom.issues_identified.includes('timber_decay') && (
                <div className="glass-card p-6">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <TreeDeciduous className="w-5 h-5 text-amber-300" />
                    Timber Decay Fields
                  </h4>
                  <p className="text-sm text-white/60">Coming soon in next build iteration</p>
                </div>
              )}

              {selectedRoom.issues_identified.includes('woodworm') && (
                <div className="glass-card p-6">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Bug className="w-5 h-5 text-red-300" />
                    Woodworm Fields
                  </h4>
                  <p className="text-sm text-white/60">Coming soon in next build iteration</p>
                </div>
              )}
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
