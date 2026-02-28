'use client'

import { useState } from 'react'
import { AdditionalWorks, DuctingType } from '@/types/survey-wizard.types'
import {
  Package,
  ChevronDown,
  ChevronUp,
  Wind,
  Hammer,
  PaintBucket,
  Wind as Airbrick,
  Droplets as Spray,
  AlertCircle,
  Trash2,
  Truck,
} from 'lucide-react'

interface AdditionalWorksStepProps {
  data: Partial<AdditionalWorks>
  onChange: (data: Partial<AdditionalWorks>) => void
  hasCondensation: boolean
  hasTimberOrDamp: boolean
}

const DUCTING_TYPES: { value: DuctingType; label: string }[] = [
  { value: 'flexible_duct', label: 'Flexible Duct' },
  { value: 'rigid_duct', label: 'Rigid Duct' },
  { value: 'duct_elbow', label: 'Duct Elbow' },
  { value: 'duct_connector', label: 'Duct Connector' },
  { value: 'grille', label: 'Grille' },
]

export default function AdditionalWorksStep({
  data,
  onChange,
  hasCondensation,
  hasTimberOrDamp,
}: AdditionalWorksStepProps) {
  // Collapsible section state
  const [expandedSections, setExpandedSections] = useState({
    condensation: hasCondensation,
    joist: hasTimberOrDamp,
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

  // Ducting components helpers
  const getDuctingCount = (type: DuctingType): number => {
    const component = (data.ducting_components || []).find((c) => c.type === type)
    return component?.count || 0
  }

  const setDuctingCount = (type: DuctingType, count: number) => {
    const components = data.ducting_components || []
    const existing = components.find((c) => c.type === type)

    if (existing) {
      // Update existing
      const updated = components.map((c) => (c.type === type ? { ...c, count } : c))
      handleChange('ducting_components', updated.filter((c) => c.count > 0))
    } else if (count > 0) {
      // Add new
      handleChange('ducting_components', [...components, { type, count }])
    }
  }

  const pivType = data.piv_type as string | undefined
  const isPIVSelected = pivType && pivType !== 'none'
  const isLoftPIV = pivType === 'loft_heated' || pivType === 'loft_unheated'
  const isWallMountedPIV = pivType === 'wall_mounted'

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
              {/* PIV Type */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  PIV (Positive Input Ventilation) Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: 'loft_heated', label: 'Loft Heated' },
                    { value: 'loft_unheated', label: 'Loft Unheated' },
                    { value: 'wall_mounted', label: 'Wall Mounted' },
                    { value: 'none', label: 'None' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleChange('piv_type', option.value as any)}
                      className={`
                        px-3 py-2 rounded-lg text-xs font-medium transition-all
                        ${
                          pivType === option.value
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

              {/* PIV Count and Electrical Pack - shown when PIV selected */}
              {isPIVSelected && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      PIV Unit Count
                    </label>
                    <input
                      type="number"
                      value={data.piv_count || ''}
                      onChange={(e) => handleChange('piv_count', parseInt(e.target.value) || undefined)}
                      className="input-field"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Electrical Packs
                    </label>
                    <input
                      type="number"
                      value={(data.piv_electrical_pack as any) || ''}
                      onChange={(e) => handleChange('piv_electrical_pack', parseInt(e.target.value) || undefined as any)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                </div>
              )}

              {/* Sarkvents - shown for loft PIV */}
              {isLoftPIV && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Sarkvents Count
                  </label>
                  <input
                    type="number"
                    value={data.sarkvents_count || ''}
                    onChange={(e) => handleChange('sarkvents_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>
              )}

              {/* Wall-Mounted PIV extras - shown for wall mounted PIV */}
              {isWallMountedPIV && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Electrical Packs (Wall PIV)
                      </label>
                      <input
                        type="number"
                        value={data.wall_mounted_electrical_pack_count || ''}
                        onChange={(e) => handleChange('wall_mounted_electrical_pack_count', parseInt(e.target.value) || undefined)}
                        className="input-field"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Core Holes (107mm, Wall PIV)
                      </label>
                      <input
                        type="number"
                        value={data.wall_mounted_core_hole_count || ''}
                        onChange={(e) => handleChange('wall_mounted_core_hole_count', parseInt(e.target.value) || undefined)}
                        className="input-field"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">
                      Ducting Components
                    </label>
                    <div className="space-y-2">
                      {DUCTING_TYPES.map((duct) => (
                        <div key={duct.value} className="flex items-center gap-3">
                          <label className="text-sm text-white/70 w-40">{duct.label}</label>
                          <input
                            type="number"
                            value={getDuctingCount(duct.value) || ''}
                            onChange={(e) => setDuctingCount(duct.value, parseInt(e.target.value) || 0)}
                            className="input-field flex-1"
                            min="0"
                            placeholder="Count"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Fan Equipment */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Fan Electrical Packs
                  </label>
                  <input
                    type="number"
                    value={data.fan_electrical_pack_total || ''}
                    onChange={(e) => handleChange('fan_electrical_pack_total', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Fan Grilles
                  </label>
                  <input
                    type="number"
                    value={data.fan_grille_count || ''}
                    onChange={(e) => handleChange('fan_grille_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Core Holes
                  </label>
                  <input
                    type="number"
                    value={data.fan_core_hole_count || ''}
                    onChange={(e) => handleChange('fan_core_hole_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>

              {/* Cpass Passive Vents */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Cpass Passive Vents (each requires one 107mm core hole)
                </label>
                <input
                  type="number"
                  value={data.cpass_vent_count || ''}
                  onChange={(e) => handleChange('cpass_vent_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                  placeholder="Number of vents"
                />
              </div>

              {/* Dryaire CVents */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Dryaire CVents (each requires one 107mm core hole)
                </label>
                <input
                  type="number"
                  value={data.cvent_count || ''}
                  onChange={(e) => handleChange('cvent_count', parseInt(e.target.value) || undefined)}
                  className="input-field"
                  min="0"
                  placeholder="Number of CVents"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Joist & Flooring Extras - only shown when hasTimberOrDamp */}
      {hasTimberOrDamp && (
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('joist')}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-300" />
              <h5 className="font-semibold text-white">Joist & Flooring Extras</h5>
            </div>
            {expandedSections.joist ? (
              <ChevronUp className="w-5 h-5 text-white/50" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/50" />
            )}
          </button>

          {expandedSections.joist && (
            <div className="p-4 pt-0 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Joist Endwraps
                  </label>
                  <input
                    type="number"
                    value={data.joist_endwrap_count || ''}
                    onChange={(e) => handleChange('joist_endwrap_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Wall Plates
                  </label>
                  <input
                    type="number"
                    value={data.wall_plate_count || ''}
                    onChange={(e) => handleChange('wall_plate_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Bower Beam Pairs
                  </label>
                  <input
                    type="number"
                    value={data.bower_beam_pairs || ''}
                    onChange={(e) => handleChange('bower_beam_pairs', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Flitch Plate Pairs
                  </label>
                  <input
                    type="number"
                    value={data.flitch_plate_pairs || ''}
                    onChange={(e) => handleChange('flitch_plate_pairs', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>

              {/* Insulation */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <label className="text-sm font-medium text-white">Warmline Insulation Needed</label>
                <button
                  onClick={() => {
                    const newValue = !data.need_insulation
                    handleChange('need_insulation', newValue)
                    if (!newValue) {
                      handleChange('warmline_insulation_area', undefined)
                    }
                  }}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-300
                    ${data.need_insulation ? 'bg-brand-500' : 'bg-white/20'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                      transition-transform duration-300
                      ${data.need_insulation ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              {data.need_insulation && (
                <div className="pl-4">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Insulation Area (m²)
                  </label>
                  <input
                    type="number"
                    value={data.warmline_insulation_area || ''}
                    onChange={(e) => handleChange('warmline_insulation_area', parseFloat(e.target.value) || undefined)}
                    className="input-field"
                    step="0.1"
                    min="0"
                  />
                </div>
              )}
            </div>
          )}
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
