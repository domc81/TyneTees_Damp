'use client'

import { useState } from 'react'
import {
  TimberRoomData,
  TimberFloorType,
  FloorCondition,
  FloorAccess,
  SubFloorVentilation,
  JoistCondition,
  FungalFinding,
  FlooringType,
  JoistEntry,
} from '@/types/survey-wizard.types'
import {
  TreeDeciduous,
  ChevronDown,
  ChevronUp,
  Layers,
  Bug,
  Hammer,
  Plus,
  Trash2,
  Clock,
  CheckSquare,
  Square,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimberFieldsProps {
  data: Partial<TimberRoomData>
  onChange: (data: Partial<TimberRoomData>) => void
}

const JOIST_SIZES = ['4x2', '6x2', '8x2', '9x2', '4x3', '6x3', '8x3']

export default function TimberFields({ data, onChange }: TimberFieldsProps) {
  // Collapsible section state
  const [expandedSections, setExpandedSections] = useState({
    floorInspection: true,
    fungalFindings: true,
    timberReplacement: data.timber_replacement_needed || false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] })
  }

  const handleChange = (field: keyof TimberRoomData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Fungal findings multi-select with "none" exclusivity
  const toggleFungalFinding = (finding: FungalFinding) => {
    const currentFindings = data.fungal_findings || []

    if (finding === 'none') {
      // Selecting "none" clears all others
      handleChange('fungal_findings', ['none'])
    } else {
      // Selecting any other removes "none" and toggles the selected one
      const withoutNone = currentFindings.filter((f) => f !== 'none')
      const hasIt = withoutNone.includes(finding)
      const newFindings = hasIt
        ? withoutNone.filter((f) => f !== finding)
        : [...withoutNone, finding]
      handleChange('fungal_findings', newFindings.length > 0 ? newFindings : ['none'])
    }
  }

  const isFungalFindingSelected = (finding: FungalFinding) => {
    return (data.fungal_findings || []).includes(finding)
  }

  const hasFungalIssues = () => {
    const findings = data.fungal_findings || []
    return findings.length > 0 && !findings.includes('none')
  }

  // Joist entries management
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
          <div className="p-2 rounded-lg bg-amber-500/20">
            <TreeDeciduous className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Timber Decay Assessment</h4>
            <p className="text-sm text-white/60">Floor inspection and fungal findings</p>
          </div>
        </div>
      </div>

      {/* Floor Inspection Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('floorInspection')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-300" />
            <h5 className="font-semibold text-white">Floor Inspection</h5>
          </div>
          {expandedSections.floorInspection ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.floorInspection && (
          <div className="p-4 pt-0 space-y-4">
            {/* Floor Type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Floor Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(['suspended_timber', 'solid_concrete', 'chipboard', 'floorboards', 'other'] as TimberFloorType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange('floor_type', type)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize
                      ${
                        data.floor_type === type
                          ? 'bg-amber-500/30 border border-amber-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Condition - shown when floor_type is suspended_timber */}
            {data.floor_type === 'suspended_timber' && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Floor Condition
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['good', 'fair', 'poor', 'failed'] as FloorCondition[]).map((condition) => (
                    <button
                      key={condition}
                      onClick={() => handleChange('floor_condition', condition)}
                      className={`
                        px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize
                        ${
                          data.floor_condition === condition
                            ? 'bg-amber-500/30 border border-amber-400 text-white'
                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                        }
                      `}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Floor Access */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Floor Access
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['full', 'partial', 'none'] as FloorAccess[]).map((access) => (
                  <button
                    key={access}
                    onClick={() => handleChange('floor_access', access)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize
                      ${
                        data.floor_access === access
                          ? 'bg-amber-500/30 border border-amber-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {access}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-floor Inspected */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">Sub-floor Inspected</label>
              <button
                onClick={() => {
                  const newValue = !data.sub_floor_inspected
                  handleChange('sub_floor_inspected', newValue)
                  if (!newValue) {
                    handleChange('sub_floor_ventilation', undefined)
                  }
                }}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.sub_floor_inspected ? 'bg-brand-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                    transition-transform duration-300
                    ${data.sub_floor_inspected ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Sub-floor Ventilation - shown when sub_floor_inspected is true */}
            {data.sub_floor_inspected && (
              <div className="pl-4">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Sub-floor Ventilation
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['adequate', 'inadequate', 'blocked', 'none'] as SubFloorVentilation[]).map((vent) => (
                    <button
                      key={vent}
                      onClick={() => handleChange('sub_floor_ventilation', vent)}
                      className={`
                        px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize
                        ${
                          data.sub_floor_ventilation === vent
                            ? 'bg-amber-500/30 border border-amber-400 text-white'
                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                        }
                      `}
                    >
                      {vent}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Joist Condition */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Joist Condition
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['sound', 'minor_decay', 'moderate_decay', 'severe_decay'] as JoistCondition[]).map((condition) => (
                  <button
                    key={condition}
                    onClick={() => handleChange('joist_condition', condition)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all
                      ${
                        data.joist_condition === condition
                          ? 'bg-amber-500/30 border border-amber-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {condition.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fungal Findings Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('fungalFindings')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-amber-300" />
            <h5 className="font-semibold text-white">Fungal Findings</h5>
          </div>
          {expandedSections.fungalFindings ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.fungalFindings && (
          <div className="p-4 pt-0 space-y-4">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Select all observed (or "None")
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(['none', 'dry_rot', 'wet_rot', 'cellar_fungus', 'white_pore_fungus'] as FungalFinding[]).map(
                (finding) => {
                  const isSelected = isFungalFindingSelected(finding)
                  return (
                    <button
                      key={finding}
                      onClick={() => toggleFungalFinding(finding)}
                      className={`
                        flex items-start gap-2 p-3 rounded-lg text-left text-sm
                        transition-all duration-200
                        ${
                          isSelected
                            ? 'bg-amber-500/20 border border-amber-400/50'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="mt-0.5">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-amber-300" />
                        ) : (
                          <Square className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                      <span className={isSelected ? 'text-white font-medium' : 'text-white/70'}>
                        {finding.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </button>
                  )
                }
              )}
            </div>

            {/* Fungal Treatment Area - shown when any fungal type other than "none" is selected */}
            {hasFungalIssues() && (
              <div className="pt-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Fungal Treatment Area (m²)
                </label>
                <input
                  type="number"
                  value={data.fungal_treatment_area || ''}
                  onChange={(e) => handleChange('fungal_treatment_area', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                  placeholder="Area requiring spray treatment"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timber Replacement Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('timberReplacement')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-300" />
            <h5 className="font-semibold text-white">Timber Replacement</h5>
          </div>
          {expandedSections.timberReplacement ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.timberReplacement && (
          <div className="p-4 pt-0 space-y-4">
            {/* Timber Replacement Needed */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">Timber Replacement Needed</label>
              <button
                onClick={() => {
                  const newValue = !data.timber_replacement_needed
                  handleChange('timber_replacement_needed', newValue)
                  // Auto-expand section when enabled
                  if (newValue && !expandedSections.timberReplacement) {
                    setExpandedSections({ ...expandedSections, timberReplacement: true })
                  }
                }}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.timber_replacement_needed ? 'bg-brand-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                    transition-transform duration-300
                    ${data.timber_replacement_needed ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Joist Entries - shown when timber_replacement_needed is true */}
            {data.timber_replacement_needed && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white/70">
                  Joist Entries
                </label>

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
                          {JOIST_SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}"
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

                {/* Flooring Type and Area */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Flooring Type
                    </label>
                    <select
                      value={data.flooring_type || ''}
                      onChange={(e) => handleChange('flooring_type', e.target.value as FlooringType)}
                      className="input-field"
                    >
                      <option value="">Select type...</option>
                      <option value="tongue_and_groove">Tongue & Groove</option>
                      <option value="square_edge">Square Edge</option>
                      <option value="chipboard">Chipboard</option>
                      <option value="plywood">Plywood</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Flooring Area (m²)
                    </label>
                    <input
                      type="number"
                      value={data.flooring_area || ''}
                      onChange={(e) => handleChange('flooring_area', parseFloat(e.target.value) || undefined)}
                      className="input-field"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Ceiling Affected */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">Ceiling Affected</label>
              <button
                onClick={() => {
                  const newValue = !data.ceiling_affected
                  handleChange('ceiling_affected', newValue)
                  if (!newValue) {
                    handleChange('ceiling_area', undefined)
                  }
                }}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.ceiling_affected ? 'bg-brand-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                    transition-transform duration-300
                    ${data.ceiling_affected ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Ceiling Area - shown when ceiling_affected is true */}
            {data.ceiling_affected && (
              <div className="pl-4">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Ceiling Area (m²)
                </label>
                <input
                  type="number"
                  value={data.ceiling_area || ''}
                  onChange={(e) => handleChange('ceiling_area', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Difficulty Hours */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-amber-300" />
          <label className="text-sm font-semibold text-white">
            Difficulty Hours (Extra Labour)
          </label>
        </div>
        <input
          type="number"
          value={data.difficulty_hours || ''}
          onChange={(e) => handleChange('difficulty_hours', parseFloat(e.target.value) || undefined)}
          className="input-field"
          step="0.5"
          min="0"
          placeholder="Hours for difficult access/complexity"
        />
      </div>
    </div>
  )
}
