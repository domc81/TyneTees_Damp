'use client'

import { useState } from 'react'
import { AdditionalWorks, CondensationPIV, DuctingComponent, DuctingType } from '@/types/survey-wizard.types'
import {
  Package,
  ChevronDown,
  ChevronUp,
  Wind,
  PaintBucket,
  Wind as Airbrick,
  Droplets as Spray,
  AlertCircle,
  Plus,
  Trash2,
  Truck,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdditionalWorksStepProps {
  data: Partial<AdditionalWorks>
  onChange: (data: Partial<AdditionalWorks>) => void
  hasCondensation: boolean
  hasDampTimberOrWoodworm: boolean
}

const DUCTING_TYPE_OPTIONS: { value: DuctingType; label: string }[] = [
  { value: 'flexible_duct', label: 'Insulated Flexi 3m' },
  { value: 'rigid_duct', label: 'Ducting 1m Length' },
  { value: 'duct_elbow', label: 'Round Elbow' },
  { value: 'duct_connector', label: 'Round Straight Connector' },
  { value: 'round_1m', label: 'Round 1m' },
  { value: 'flat_to_round_adaptor', label: 'Flat→Round Adaptor' },
  { value: 'flat_straight_connector', label: 'Flat Straight Connector' },
  { value: 'flat_horizontal_bend', label: 'Flat Horizontal Bend' },
  { value: 'flat_vertical_bend', label: 'Flat Vertical Bend' },
  { value: 'flat_1m', label: 'Flat 1m' },
  { value: 'grille', label: 'Grille' },
]

export default function AdditionalWorksStep({
  data,
  onChange,
  hasCondensation,
  hasDampTimberOrWoodworm,
}: AdditionalWorksStepProps) {
  // Collapsible section state
  const [expandedSections, setExpandedSections] = useState({
    condensation: hasCondensation,
    plastering: true,
    airbricks: false,
    spray: false,
    optional: false,
    logistics: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] })
  }

  const handleChange = (field: keyof AdditionalWorks, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // PIV helper — reads from condensation_piv with defaults
  const piv: CondensationPIV = {
    piv_recommended: false,
    piv_type: null,
    piv_unit_count: 0,
    core_hole_count: 0,
    electrical_pack_count: 0,
    sarkvent_count: 0,
    ducting_components_as_exists: false,
    joinery_ducting_boxwork_lm: 0,
    ...data.condensation_piv,
  }

  const handlePIVChange = (field: keyof CondensationPIV, value: any) => {
    onChange({
      ...data,
      condensation_piv: { ...piv, [field]: value },
    })
  }

  // Ducting components management (wall-mounted PIV, when not "as exists")
  const addDuctingComponent = () => {
    const components = data.ducting_components || []
    const newComponent: DuctingComponent = { type: 'flexible_duct', count: 1 }
    handleChange('ducting_components', [...components, newComponent])
  }

  const updateDuctingComponent = (index: number, updates: Partial<DuctingComponent>) => {
    const components = [...(data.ducting_components || [])]
    components[index] = { ...components[index], ...updates }
    handleChange('ducting_components', components)
  }

  const removeDuctingComponent = (index: number) => {
    const components = [...(data.ducting_components || [])]
    components.splice(index, 1)
    handleChange('ducting_components', components)
  }

  const isLoftPIV = piv.piv_type === 'loft_heated' || piv.piv_type === 'loft_unheated'

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Package className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Additional Works</h4>
            <p className="text-sm text-white/60">Whole-property items and logistics</p>
          </div>
        </div>
      </div>

      {/* Condensation Equipment - only shown when hasCondensation */}
      {hasCondensation && (
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('condensation')}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-purple-300" />
              <h5 className="font-semibold text-white">Condensation Equipment</h5>
            </div>
            {expandedSections.condensation ? (
              <ChevronUp className="w-5 h-5 text-white/50" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/50" />
            )}
          </button>

          {expandedSections.condensation && (
            <div className="p-4 pt-0 space-y-4">
              {/* Is PIV Recommended? */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <label className="text-sm font-medium text-white">Is PIV Recommended?</label>
                  <p className="text-xs text-white/50">Positive Input Ventilation — whole property system</p>
                </div>
                <button
                  onClick={() => handlePIVChange('piv_recommended', !piv.piv_recommended)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-300
                    ${piv.piv_recommended ? 'bg-purple-500' : 'bg-white/20'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                      transition-transform duration-300
                      ${piv.piv_recommended ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              {piv.piv_recommended && (
                <>
                  {/* PIV Type */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      PIV Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'loft_heated', label: 'Loft Heated' },
                        { value: 'loft_unheated', label: 'Loft Unheated' },
                        { value: 'wall_mounted', label: 'Wall Mounted' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handlePIVChange('piv_type', option.value)}
                          className={`
                            px-3 py-2 rounded-lg text-xs font-medium transition-all
                            ${
                              piv.piv_type === option.value
                                ? 'bg-purple-500/30 border border-purple-400 text-white'
                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Loft PIV fields */}
                  {isLoftPIV && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">
                            PIV Unit Count *
                          </label>
                          <input
                            type="number"
                            value={piv.piv_unit_count || ''}
                            onChange={(e) => handlePIVChange('piv_unit_count', parseInt(e.target.value) || 0)}
                            className="input-field"
                            min="1"
                          />
                          {piv.piv_unit_count < 1 && (
                            <p className="text-xs text-red-400 mt-1">At least 1 PIV unit is required</p>
                          )}
                        </div>
                        <div className="flex items-end pb-2">
                          <p className="text-sm text-white/50 italic">No Core Hole — not required for loft units</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">
                            Electrical Pack Count
                          </label>
                          <input
                            type="number"
                            value={piv.electrical_pack_count || ''}
                            onChange={(e) => handlePIVChange('electrical_pack_count', parseInt(e.target.value) || 0)}
                            className="input-field"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">
                            Sarkvent Count
                          </label>
                          <input
                            type="number"
                            value={piv.sarkvent_count || ''}
                            onChange={(e) => handlePIVChange('sarkvent_count', parseInt(e.target.value) || 0)}
                            className="input-field"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wall Mounted PIV fields */}
                  {piv.piv_type === 'wall_mounted' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">
                            PIV Unit Count *
                          </label>
                          <input
                            type="number"
                            value={piv.piv_unit_count || ''}
                            onChange={(e) => handlePIVChange('piv_unit_count', parseInt(e.target.value) || 0)}
                            className="input-field"
                            min="1"
                          />
                          {piv.piv_unit_count < 1 && (
                            <p className="text-xs text-red-400 mt-1">At least 1 PIV unit is required</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">
                            Core Hole Count
                          </label>
                          <input
                            type="number"
                            value={piv.core_hole_count || ''}
                            onChange={(e) => handlePIVChange('core_hole_count', parseInt(e.target.value) || 0)}
                            className="input-field"
                            min="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Electrical Pack Count
                        </label>
                        <input
                          type="number"
                          value={piv.electrical_pack_count || ''}
                          onChange={(e) => handlePIVChange('electrical_pack_count', parseInt(e.target.value) || 0)}
                          className="input-field"
                          min="0"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <label className="text-sm font-medium text-white">Ducting Components As Exists</label>
                        <button
                          onClick={() => handlePIVChange('ducting_components_as_exists', !piv.ducting_components_as_exists)}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full
                            transition-colors duration-300
                            ${piv.ducting_components_as_exists ? 'bg-purple-500' : 'bg-white/20'}
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                              transition-transform duration-300
                              ${piv.ducting_components_as_exists ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                      </div>

                      {/* Ducting components editor — only when NOT reusing the existing layout */}
                      {!piv.ducting_components_as_exists && (
                        <div className="pl-4 space-y-2">
                          <p className="text-sm font-medium text-white/70 mb-1.5">Ducting Components</p>
                          {(data.ducting_components || []).map((component, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <select
                                value={component.type}
                                onChange={(e) => updateDuctingComponent(index, { type: e.target.value as DuctingType })}
                                className="input-field flex-1 text-sm"
                              >
                                {DUCTING_TYPE_OPTIONS.map(({ value, label }) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="number"
                                value={component.count || ''}
                                onChange={(e) => updateDuctingComponent(index, { count: parseInt(e.target.value) || 0 })}
                                className="input-field w-20 text-sm"
                                min="0"
                                placeholder="Qty"
                              />
                              <button
                                onClick={() => removeDuctingComponent(index)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            onClick={addDuctingComponent}
                            variant="secondary"
                            size="sm"
                            className="w-full flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Component
                          </Button>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Joinery Ducting Boxwork (linear metres)
                        </label>
                        <input
                          type="number"
                          value={piv.joinery_ducting_boxwork_lm || ''}
                          onChange={(e) => handlePIVChange('joinery_ducting_boxwork_lm', parseFloat(e.target.value) || 0)}
                          className="input-field"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Loft Access - shown for loft PIV types */}
              {piv.piv_recommended && isLoftPIV && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white/70">
                    Loft Access
                  </label>

                  {/* New Loft Hatch */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <label className="text-sm font-medium text-white">New Loft Hatch & Ladder Required</label>
                    <button
                      onClick={() => {
                        const newValue = !data.loft_hatch_new_required
                        onChange({
                          ...data,
                          loft_hatch_new_required: newValue || undefined,
                          ...(newValue ? { loft_hatch_enlarge_required: undefined } : {}),
                        })
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-300
                        ${data.loft_hatch_new_required ? 'bg-purple-500' : 'bg-white/20'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                          transition-transform duration-300
                          ${data.loft_hatch_new_required ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>

                  {/* Enlarge Existing Loft Hatch */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <label className="text-sm font-medium text-white">Enlarge Existing Loft Hatch</label>
                    <button
                      onClick={() => {
                        const newValue = !data.loft_hatch_enlarge_required
                        onChange({
                          ...data,
                          loft_hatch_enlarge_required: newValue || undefined,
                          ...(newValue ? { loft_hatch_new_required: undefined } : {}),
                        })
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-300
                        ${data.loft_hatch_enlarge_required ? 'bg-purple-500' : 'bg-white/20'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                          transition-transform duration-300
                          ${data.loft_hatch_enlarge_required ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Antinox Floor Protection Boards - damp, timber, woodworm only */}
      {hasDampTimberOrWoodworm && (
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-brand-300" />
            <div>
              <h5 className="font-semibold text-white">Floor Protection</h5>
              <p className="text-xs text-white/50">Each board is 2.4m × 1.2m</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Antinox HD Floor Protection Boards
            </label>
            <input
              type="number"
              value={data.antinox_board_count || ''}
              onChange={(e) => handleChange('antinox_board_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="Number of boards"
            />
          </div>
        </div>
      )}

      {/* Plastering Extras */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('plastering')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <PaintBucket className="w-5 h-5 text-brand-300" />
            <h5 className="font-semibold text-white">Plastering Extras</h5>
          </div>
          {expandedSections.plastering ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.plastering && (
          <div className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Stop Beads
                </label>
                <input
                  type="number"
                  value={data.stop_bead_count || ''}
                  onChange={(e) => handleChange('stop_bead_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Corner Beads (2.4m)
                </label>
                <input
                  type="number"
                  value={data.corner_bead_24_count || ''}
                  onChange={(e) => handleChange('corner_bead_24_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Corner Beads (3m)
                </label>
                <input
                  type="number"
                  value={data.corner_bead_30_count || ''}
                  onChange={(e) => handleChange('corner_bead_30_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Difficulty Hours (Plastering)
              </label>
              <input
                type="number"
                value={data.difficulty_hours_plastering || ''}
                onChange={(e) => handleChange('difficulty_hours_plastering', parseFloat(e.target.value) || undefined)}
                className="input-field"
                step="0.5"
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Airbricks */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('airbricks')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Airbrick className="w-5 h-5 text-brand-300" />
            <h5 className="font-semibold text-white">Airbricks</h5>
          </div>
          {expandedSections.airbricks ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.airbricks && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Clean Existing
                </label>
                <input
                  type="number"
                  value={data.airbrick_clean_count || ''}
                  onChange={(e) => handleChange('airbrick_clean_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Upgrade Existing
                </label>
                <input
                  type="number"
                  value={data.airbrick_upgrade_count || ''}
                  onChange={(e) => handleChange('airbrick_upgrade_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Install New
                </label>
                <input
                  type="number"
                  value={data.airbrick_new_count || ''}
                  onChange={(e) => handleChange('airbrick_new_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spray Treatment */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('spray')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Spray className="w-5 h-5 text-brand-300" />
            <h5 className="font-semibold text-white">Spray Treatment (Whole Property)</h5>
          </div>
          {expandedSections.spray ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.spray && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Total Treatment Area (m²)
                </label>
                <input
                  type="number"
                  value={data.spray_treatment_area || ''}
                  onChange={(e) => handleChange('spray_treatment_area', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Difficulty Hours
                </label>
                <input
                  type="number"
                  value={data.spray_difficulty_hours || ''}
                  onChange={(e) => handleChange('spray_difficulty_hours', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.5"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional Items */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('optional')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-300" />
            <h5 className="font-semibold text-white">Optional Items (Customer Choice)</h5>
          </div>
          {expandedSections.optional ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.optional && (
          <div className="p-4 pt-0 space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
              <p className="text-xs text-white/70">
                These items will appear on the quote, but the customer decides whether to proceed with them.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  ACO Drain (LM)
                </label>
                <input
                  type="number"
                  value={data.aco_drain_length || ''}
                  onChange={(e) => handleChange('aco_drain_length', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  French Drain (LM)
                </label>
                <input
                  type="number"
                  value={data.french_drain_length || ''}
                  onChange={(e) => handleChange('french_drain_length', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Aquaban Area (m²)
                </label>
                <input
                  type="number"
                  value={data.aquaban_area || ''}
                  onChange={(e) => handleChange('aquaban_area', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Asbestos Tests
                </label>
                <input
                  type="number"
                  value={data.asbestos_test_count || ''}
                  onChange={(e) => handleChange('asbestos_test_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Waste & Logistics - always shown, required */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleSection('logistics')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-300" />
            <h5 className="font-semibold text-white">Waste & Logistics</h5>
            <span className="text-xs text-red-400">* Required</span>
          </div>
          {expandedSections.logistics ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSections.logistics && (
          <div className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Skip Count
                </label>
                <input
                  type="number"
                  value={data.skip_count || ''}
                  onChange={(e) => handleChange('skip_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Distance from Office (miles) *
                </label>
                <input
                  type="number"
                  value={data.distance_from_office || ''}
                  onChange={(e) => handleChange('distance_from_office', parseFloat(e.target.value) || undefined)}
                  className="input-field"
                  step="0.1"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Men Travelling *
                </label>
                <input
                  type="number"
                  value={data.num_men_travelling || ''}
                  onChange={(e) => handleChange('num_men_travelling', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="1"
                  required
                />
              </div>
            </div>

            <p className="text-xs text-white/50">
              Distance and men travelling are required for accurate costing calculations
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
