'use client'

import { useState } from 'react'
import {
  DampRoomData,
  DampWall,
  DPCType,
  WallTreatment,
  MembraneHeight,
  FloorTreatment,
  FlooringType,
  JoistEntry,
  FindingUrgency,
} from '@/types/survey-wizard.types'
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Droplets,
  Hammer,
  Layers,
  Package,
  PaintBucket,
  Clock,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import PhotoCapture from './PhotoCapture'
import UrgencySelector from './UrgencySelector'
import { filterPhotos } from '@/lib/survey-photo-service'
import type { SurveyPhoto } from '@/types/survey-photo.types'

interface DampFieldsProps {
  data: Partial<DampRoomData>
  onChange: (data: Partial<DampRoomData>) => void
  surveyId: string
  roomId: string
  photos: SurveyPhoto[]
  onPhotosChange: () => void
}

const JOIST_SIZES: { key: string; label: string }[] = [
  { key: '4x2', label: '4x2" (100×50mm)' },
  { key: '5x2', label: '5x2" (125×50mm)' },
  { key: '6x2', label: '6x2" (150×50mm)' },
  { key: '7x2', label: '7x2" (175×50mm)' },
  { key: '8x2', label: '8x2" (200×50mm)' },
  { key: '9x2', label: '9x2" (225×50mm)' },
]

export default function DampFields({ data, onChange, surveyId, roomId, photos, onPhotosChange }: DampFieldsProps) {
  // Collapsible section state
  const [expandedSections, setExpandedSections] = useState({
    walls: true,
    dpc: true,
    stripOut: false,
    wallTreatment: true,
    floorTreatment: false,
    plastering: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] })
  }

  const handleChange = (field: keyof DampRoomData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Wall management
  const addWall = () => {
    const walls = data.walls || []
    const newWall: DampWall = {
      name: `Wall ${walls.length + 1}`,
      length: 0,
      height: 0,
      has_wallpaper: false,
      radiator_count: 0,
      socket_count: 0,
      skirting_length: 0,
      moisture_readings: [],
    }
    handleChange('walls', [...walls, newWall])
  }

  const updateWall = (index: number, updates: Partial<DampWall>) => {
    const walls = [...(data.walls || [])]
    walls[index] = { ...walls[index], ...updates }

    // Auto-update skirting length when wall length changes
    if (updates.length !== undefined && walls[index].skirting_length === 0) {
      walls[index].skirting_length = updates.length
    }

    handleChange('walls', walls)
  }

  const removeWall = (index: number) => {
    const walls = [...(data.walls || [])]
    walls.splice(index, 1)
    handleChange('walls', walls)
  }

  // Membrane wall lengths management
  const addMembraneLength = () => {
    const lengths = data.membrane_wall_lengths || []
    handleChange('membrane_wall_lengths', [...lengths, 0])
  }

  const updateMembraneLength = (index: number, value: number) => {
    const lengths = [...(data.membrane_wall_lengths || [])]
    lengths[index] = value
    handleChange('membrane_wall_lengths', lengths)
  }

  const removeMembraneLength = (index: number) => {
    const lengths = [...(data.membrane_wall_lengths || [])]
    lengths.splice(index, 1)
    handleChange('membrane_wall_lengths', lengths)
  }

  // Joist entries management ('new_joists' floor treatment)
  const addJoistEntry = () => {
    const entries = data.joist_entries || []
    const newEntry: JoistEntry = {
      size: '4x2',
      quantity: 0,
      length: 0,
    }
    handleChange('joist_entries', [...entries, newEntry])
  }

  const updateJoistEntry = (index: number, updates: Partial<JoistEntry>) => {
    const entries = [...(data.joist_entries || [])]
    entries[index] = { ...entries[index], ...updates }
    handleChange('joist_entries', entries)
  }

  const removeJoistEntry = (index: number) => {
    const entries = [...(data.joist_entries || [])]
    entries.splice(index, 1)
    handleChange('joist_entries', entries)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Droplets className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Damp Treatment</h4>
            <p className="text-sm text-white/60">Wall-by-wall measurements and treatments</p>
          </div>
        </div>
      </div>

      {/* Finding Urgency */}
      <UrgencySelector
        value={data.urgency}
        onChange={(v: FindingUrgency) => handleChange('urgency', v)}
      />

      {/* Affected Walls Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('walls')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">Affected Walls</h5>
            <span className="text-sm text-white/50">
              ({(data.walls || []).length} wall{(data.walls || []).length !== 1 ? 's' : ''})
            </span>
          </div>
          {expandedSections.walls ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.walls && (
          <div className="p-4 pt-0 space-y-4">
            {(data.walls || []).map((wall, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={wall.name}
                    onChange={(e) => updateWall(index, { name: e.target.value })}
                    className="input-field text-sm font-semibold bg-transparent border-0 px-0 focus:ring-0"
                    placeholder="Wall name"
                  />
                  <button
                    onClick={() => removeWall(index)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      value={wall.length || ''}
                      onChange={(e) => updateWall(index, { length: parseFloat(e.target.value) || 0 })}
                      className="input-field text-sm"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Height (m)
                    </label>
                    <input
                      type="number"
                      value={wall.height || ''}
                      onChange={(e) => updateWall(index, { height: parseFloat(e.target.value) || 0 })}
                      className="input-field text-sm"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Area (m²)
                    </label>
                    <div className="input-field text-sm bg-white/10 text-white/60">
                      {(wall.length * wall.height).toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Skirting (m)
                    </label>
                    <input
                      type="number"
                      value={wall.skirting_length || ''}
                      onChange={(e) => updateWall(index, { skirting_length: parseFloat(e.target.value) || 0 })}
                      className="input-field text-sm"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Radiators
                    </label>
                    <input
                      type="number"
                      value={wall.radiator_count || ''}
                      onChange={(e) => updateWall(index, { radiator_count: parseInt(e.target.value) || 0 })}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Sockets
                    </label>
                    <input
                      type="number"
                      value={wall.socket_count || ''}
                      onChange={(e) => updateWall(index, { socket_count: parseInt(e.target.value) || 0 })}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`wallpaper-${index}`}
                    checked={wall.has_wallpaper}
                    onChange={(e) => updateWall(index, { has_wallpaper: e.target.checked })}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-brand-500 focus:ring-brand-500"
                  />
                  <label htmlFor={`wallpaper-${index}`} className="text-sm text-white/70">
                    Has wallpaper
                  </label>
                </div>

                {/* Moisture Reading */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">
                    Moisture Reading
                  </p>
                  <div className="grid grid-cols-2 gap-3 items-start">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        Reading (% WME)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="e.g., 24.5"
                        value={wall.moisture_readings?.[0]?.reading || ''}
                        onChange={(e) =>
                          updateWall(index, {
                            moisture_readings: [{
                              location: wall.name,
                              reading: parseFloat(e.target.value) || 0,
                              depth: 0,
                            }],
                          })
                        }
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <PhotoCapture
                        surveyId={surveyId}
                        step="room_inspection"
                        roomId={roomId}
                        category="meter_reading"
                        label={`${wall.name} Meter`}
                        maxPhotos={1}
                        existingPhotos={photos.filter(
                          (p) => p.category === 'meter_reading' && p.description?.includes(wall.name)
                        )}
                        onPhotosChange={onPhotosChange}
                        autoDescription={`${wall.name} — moisture meter reading`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addWall} variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Wall
            </Button>
          </div>
        )}
      </div>

      {/* DPC Treatment Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('dpc')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">DPC Treatment</h5>
          </div>
          {expandedSections.dpc ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.dpc && (
          <div className="p-4 pt-0 space-y-4">
            {/* DPC Required toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">DPC Required</label>
              <button
                onClick={() => handleChange('dpc_required', !data.dpc_required)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.dpc_required ? 'bg-brand-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                    transition-transform duration-300
                    ${data.dpc_required ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {data.dpc_required && (
              <div className="space-y-3">
                {/* DPC Type */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    DPC Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['traditional', 'digital'] as DPCType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleChange('dpc_type', type)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${
                            data.dpc_type === type
                              ? 'bg-brand-500/30 border border-brand-400 text-white'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                          }
                        `}
                      >
                        {type === 'traditional' ? 'Traditional (Physical)' : 'Digital (Electro-osmotic)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Traditional DPC fields */}
                {data.dpc_type === 'traditional' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Wall Length (LM)
                      </label>
                      <input
                        type="number"
                        value={data.dpc_wall_length || ''}
                        onChange={(e) => handleChange('dpc_wall_length', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.1"
                        min="0"
                        placeholder="Linear metres"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Wall Thickness (m)
                      </label>
                      <input
                        type="number"
                        value={data.dpc_wall_thickness_m ?? ''}
                        onChange={(e) => handleChange('dpc_wall_thickness_m', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.005"
                        min="0"
                        placeholder="e.g. 0.330 for a 330mm wall"
                      />
                      {!data.dpc_wall_thickness_m && data.dpc_wall_depth ? (
                        <p className="text-xs text-amber-400/80 mt-1">
                          This survey has a legacy &quot;{data.dpc_wall_depth} course&quot; entry — please
                          enter the measured wall thickness in metres.
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Wall Treatment Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('wallTreatment')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">Wall Treatment</h5>
          </div>
          {expandedSections.wallTreatment ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.wallTreatment && (
          <div className="p-4 pt-0 space-y-4">
            {/* Wall Treatment Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Treatment Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['membrane', 'tanking', 'none'] as WallTreatment[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange('wall_treatment', type)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                      ${
                        data.wall_treatment === type
                          ? 'bg-brand-500/30 border border-brand-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Warmline DC — first-class treatment option (review pt 4). Standalone or
                alongside membrane/tanking, so an independent area input rather than a
                fourth mutually-exclusive Treatment Type button. */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <label className="block text-sm font-medium text-white mb-1.5">
                Warmline DC — Internal Wall Insulation (m²)
              </label>
              <input
                type="number"
                value={data.warmline_insulation_area || ''}
                onChange={(e) => handleChange('warmline_insulation_area', parseFloat(e.target.value) || 0)}
                className="input-field"
                step="0.1"
                min="0"
                placeholder="Wall area to insulate"
              />
              <p className="mt-1 text-xs text-white/50">
                Thin internal wall insulation. Can be specified on its own or alongside membrane/tanking.
              </p>
            </div>

            {/* Membrane-specific fields */}
            {data.wall_treatment === 'membrane' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Membrane Height
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['1m', '1.2m', '2m'] as MembraneHeight[]).map((height) => (
                      <button
                        key={height}
                        onClick={() => handleChange('membrane_height', height)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${
                            data.membrane_height === height
                              ? 'bg-brand-500/30 border border-brand-400 text-white'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                          }
                        `}
                      >
                        {height}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Wall Lengths Needing Membrane (LM)
                  </label>
                  {(data.membrane_wall_lengths || []).map((length, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="number"
                        value={length || ''}
                        onChange={(e) => updateMembraneLength(index, parseFloat(e.target.value) || 0)}
                        className="input-field flex-1"
                        step="0.1"
                        min="0"
                        placeholder="Linear metres"
                      />
                      <button
                        onClick={() => removeMembraneLength(index)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <Button
                    onClick={addMembraneLength}
                    variant="secondary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Wall Length
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Fillet Joint Length (LM)
                  </label>
                  <input
                    type="number"
                    value={data.fillet_joint_length || ''}
                    onChange={(e) => handleChange('fillet_joint_length', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.1"
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Overtape Length (lm)
                    </label>
                    <input
                      type="number"
                      value={data.overtape_length || ''}
                      onChange={(e) => handleChange('overtape_length', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Overtape Height (m)
                    </label>
                    <input
                      type="number"
                      value={data.overtape_height || ''}
                      onChange={(e) => handleChange('overtape_height', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                      placeholder="Total = length + 2 × height"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tanking-specific fields */}
            {data.wall_treatment === 'tanking' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Tanking Area (m²)
                  </label>
                  <input
                    type="number"
                    value={data.tanking_area || ''}
                    onChange={(e) => handleChange('tanking_area', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.1"
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Dubbing Out Coat (m²)
                    </label>
                    <input
                      type="number"
                      value={data.dubbing_out_area ?? ''}
                      onChange={(e) => handleChange('dubbing_out_area', e.target.value === '' ? undefined : parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                      placeholder="blank = same as tanking area"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Renovating Plaster (m²)
                    </label>
                    <input
                      type="number"
                      value={data.renovating_plaster_area ?? ''}
                      onChange={(e) => handleChange('renovating_plaster_area', e.target.value === '' ? undefined : parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                      placeholder="blank = same as tanking area"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Fillet Joint Length (LM)
                    </label>
                    <input
                      type="number"
                      value={data.fillet_joint_length || ''}
                      onChange={(e) => handleChange('fillet_joint_length', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Difficulty Hours
                    </label>
                    <input
                      type="number"
                      value={data.tanking_difficulty_hours || ''}
                      onChange={(e) => handleChange('tanking_difficulty_hours', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.5"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Strip-Out Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('stripOut')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">Strip-Out</h5>
          </div>
          {expandedSections.stripOut ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.stripOut && (
          <div className="p-4 pt-0 space-y-3">
            <p className="text-xs text-white/50 mb-2">
              Enter strip-out areas based on your assessment. Include any plaster removal needed for DPC access.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Remove plaster/render — Walls (m²)
                </label>
                <input
                  type="number"
                  value={data.strip_out_plaster_area || ''}
                  onChange={(e) => handleChange('strip_out_plaster_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Removal of stud walls (m²)
                </label>
                <input
                  type="number"
                  value={data.strip_out_stud_walls_area || ''}
                  onChange={(e) => handleChange('strip_out_stud_walls_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Plaster & stud removal — Ceilings (m²)
                </label>
                <input
                  type="number"
                  value={data.strip_out_ceilings_area || ''}
                  onChange={(e) => handleChange('strip_out_ceilings_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floor Treatment Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('floorTreatment')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">Floor Treatment</h5>
          </div>
          {expandedSections.floorTreatment ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.floorTreatment && (
          <div className="p-4 pt-0 space-y-4">
            {/* Floor Treatment Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Treatment Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['resin_membrane', 'new_joists', 'none'] as FloorTreatment[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange('floor_treatment', type)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all
                      ${
                        data.floor_treatment === type
                          ? 'bg-brand-500/30 border border-brand-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {type === 'resin_membrane' ? 'Resin Membrane' : type === 'new_joists' ? 'New Joists' : 'None'}
                  </button>
                ))}
              </div>
            </div>

            {/* Resin Membrane fields — mirrors Damp workbook rows 69-72: each
                component is an independent quantity, priced only when > 0 */}
            {data.floor_treatment === 'resin_membrane' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Floor Area (m²)
                  </label>
                  <input
                    type="number"
                    value={data.floor_area || ''}
                    onChange={(e) => handleChange('floor_area', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.1"
                    min="0"
                    placeholder="Room floor measurement"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70 mb-1.5">Resin Components (m² per component — only filled components are priced)</p>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      ['resin_topcoat_area', 'Top Coat'],
                      ['resin_primer_area', 'Primer'],
                      ['resin_grip_grit_area', 'Grip Grit'],
                    ] as const).map(([field, label]) => (
                      <div key={field}>
                        <label className="block text-xs text-white/60 mb-1">{label}</label>
                        <input
                          type="number"
                          value={data[field] ?? ''}
                          onChange={(e) => handleChange(field, e.target.value === '' ? undefined : parseFloat(e.target.value) || 0)}
                          className="input-field"
                          step="0.1"
                          min="0"
                          placeholder={data.floor_area ? `= ${data.floor_area}?` : '0'}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    Tap a field and enter the area treated by that component (often the floor area).
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Fillet Joint Length (lm)
                  </label>
                  <input
                    type="number"
                    value={data.floor_resin_fillet_length || ''}
                    onChange={(e) => handleChange('floor_resin_fillet_length', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.1"
                    min="0"
                    placeholder="Perimeter seal at wall/floor junction"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Difficulty Hours (resin)
                  </label>
                  <input
                    type="number"
                    value={data.resin_difficulty_hours || ''}
                    onChange={(e) => handleChange('resin_difficulty_hours', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            )}

            {/* New Joists fields */}
            {data.floor_treatment === 'new_joists' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <label className="text-sm font-medium text-white">Strip Existing Floor</label>
                  <button
                    onClick={() => handleChange('strip_existing_floor', !data.strip_existing_floor)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full
                      transition-colors duration-300
                      ${data.strip_existing_floor ? 'bg-brand-500' : 'bg-white/20'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                        transition-transform duration-300
                        ${data.strip_existing_floor ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {data.strip_existing_floor && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Strip Floor Area (m²)
                    </label>
                    <input
                      type="number"
                      value={data.strip_floor_area || ''}
                      onChange={(e) => handleChange('strip_floor_area', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Sub-floor Area (m²)
                  </label>
                  <input
                    type="number"
                    value={data.sub_floor_area || ''}
                    onChange={(e) => handleChange('sub_floor_area', parseFloat(e.target.value) || 0)}
                    className="input-field"
                    step="0.1"
                    min="0"
                  />
                </div>

                {/* Joists & Decking — damp workbook rows 89-108 (mirrors timber) */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <p className="text-sm font-medium text-white/70 mb-1.5">Joists &amp; Decking</p>

                  {(data.joist_entries || []).map((entry, index) => (
                    <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="grid grid-cols-3 gap-3 mb-2">
                        <div>
                          <label className="block text-xs font-medium text-white/60 mb-1">
                            Size
                          </label>
                          <select
                            value={entry.size}
                            onChange={(e) => updateJoistEntry(index, { size: e.target.value })}
                            className="input-field text-sm"
                          >
                            {JOIST_SIZES.map(({ key, label }) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/60 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            value={entry.quantity || ''}
                            onChange={(e) => updateJoistEntry(index, { quantity: parseInt(e.target.value) || 0 })}
                            className="input-field text-sm"
                            min="0"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/60 mb-1">
                            Length (m)
                          </label>
                          <input
                            type="number"
                            value={entry.length || ''}
                            onChange={(e) => updateJoistEntry(index, { length: parseFloat(e.target.value) || 0 })}
                            className="input-field text-sm"
                            step="0.1"
                            min="0"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => removeJoistEntry(index)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  ))}

                  <Button
                    onClick={addJoistEntry}
                    variant="secondary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Joist Entry
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Treat &amp; Endwrap (LM)
                      </label>
                      <input
                        type="number"
                        value={data.endwrap_joists_lm || ''}
                        onChange={(e) => handleChange('endwrap_joists_lm', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Wall Plate 100x25 (LM)
                      </label>
                      <input
                        type="number"
                        value={data.wall_plate_lm || ''}
                        onChange={(e) => handleChange('wall_plate_lm', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Bower Beams (pairs)
                      </label>
                      <input
                        type="number"
                        value={data.bower_beams_count || ''}
                        onChange={(e) => handleChange('bower_beams_count', parseInt(e.target.value) || 0)}
                        className="input-field"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Flitch Plates (pairs)
                      </label>
                      <input
                        type="number"
                        value={data.flitch_plates_count || ''}
                        onChange={(e) => handleChange('flitch_plates_count', parseInt(e.target.value) || 0)}
                        className="input-field"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Flooring */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <p className="text-sm font-medium text-white/70 mb-1.5">Flooring</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Flooring Type
                      </label>
                      <select
                        value={data.flooring_type || ''}
                        onChange={(e) => handleChange('flooring_type', (e.target.value || undefined) as FlooringType | undefined)}
                        className="input-field"
                      >
                        <option value="">No replacement</option>
                        <option value="weyrock_18mm">Weyrock 18mm</option>
                        <option value="weyrock_22mm">Weyrock 22mm</option>
                        <option value="std_tg_floorboards">Std T&amp;G Floorboards</option>
                        <option value="victorian_tg_floorboards">Victorian T&amp;G</option>
                        <option value="engineered_flooring_sheet">Engineered Sheet</option>
                        <option value="structural_engineered_flooring_sheet">Structural Engineered (onto joists)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Flooring Area (m²)
                      </label>
                      <input
                        type="number"
                        value={data.flooring_area || ''}
                        onChange={(e) => handleChange('flooring_area', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Suspended Floor Insulation (m²)
                    </label>
                    <input
                      type="number"
                      value={data.suspended_floor_insulation_area || ''}
                      onChange={(e) => handleChange('suspended_floor_insulation_area', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Difficulty Hours (joists)
                      </label>
                      <input
                        type="number"
                        value={data.joists_difficulty_hours || ''}
                        onChange={(e) => handleChange('joists_difficulty_hours', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.5"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Difficulty Hours (decking)
                      </label>
                      <input
                        type="number"
                        value={data.decking_difficulty_hours || ''}
                        onChange={(e) => handleChange('decking_difficulty_hours', parseFloat(e.target.value) || 0)}
                        className="input-field"
                        step="0.5"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plastering Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('plastering')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <PaintBucket className="w-5 h-5 text-blue-300" />
            <h5 className="font-semibold text-white">Plastering</h5>
          </div>
          {expandedSections.plastering ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.plastering && (
          <div className="p-4 pt-0 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Stud Wall Area (m²)
                </label>
                <input
                  type="number"
                  value={data.stud_wall_area || ''}
                  onChange={(e) => handleChange('stud_wall_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Plasterboard Area (m²)
                </label>
                <input
                  type="number"
                  value={data.plasterboard_area || ''}
                  onChange={(e) => handleChange('plasterboard_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Skim Area (m²)
                </label>
                <input
                  type="number"
                  value={data.skim_area || ''}
                  onChange={(e) => handleChange('skim_area', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>

            {/* Warmline moved to the Wall Treatment section (review pt 4) — it is a
                treatment option in its own right, not a plastering finish. */}
          </div>
        )}
      </div>

      {/* Difficulty Hours */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-blue-300" />
          <label className="text-sm font-semibold text-white">
            Difficulty Hours (Extra Labour)
          </label>
        </div>
        <input
          type="number"
          value={data.difficulty_hours || ''}
          onChange={(e) => handleChange('difficulty_hours', parseFloat(e.target.value) || 0)}
          className="input-field"
          step="0.5"
          min="0"
          placeholder="Hours for difficult access/complexity"
        />
        <p className="mt-1.5 text-xs text-white/50">
          Additional hours to account for difficult access or complex work
        </p>
      </div>
    </div>
  )
}
