'use client'

import { useEffect } from 'react'
import { CondensationRoomData, ExtractionType, MouldSeverity, FindingUrgency } from '@/types/survey-wizard.types'
import { Wind, Droplet, Fan, AlertCircle } from 'lucide-react'
import UrgencySelector from './UrgencySelector'

interface CondensationFieldsProps {
  data: Partial<CondensationRoomData>
  onChange: (data: Partial<CondensationRoomData>) => void
  rhReading?: number | null
}

export default function CondensationFields({ data, onChange, rhReading }: CondensationFieldsProps) {
  // Auto-fill humidity_reading from room-level RH when empty
  useEffect(() => {
    if (rhReading != null && data.humidity_reading == null) {
      onChange({ ...data, humidity_reading: rhReading })
    }
    // Only trigger on mount or when rhReading changes — not on every data change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rhReading])
  const handleChange = (field: keyof CondensationRoomData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleMultiChange = (updates: Partial<CondensationRoomData>) => {
    onChange({ ...data, ...updates })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Wind className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Condensation Evidence</h4>
            <p className="text-sm text-white/60">Room-specific observations</p>
          </div>
        </div>
      </div>

      {/* Finding Urgency */}
      <UrgencySelector
        value={data.urgency}
        onChange={(v: FindingUrgency) => handleChange('urgency', v)}
      />

      {/* Evidence Toggles */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Droplet className="w-4 h-4 text-purple-300" />
          Evidence
        </h5>

        {/* Condensation visible on internal surfaces */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <label className="text-sm font-medium text-white">Condensation visible on internal surfaces</label>
          <button
            onClick={() => handleChange('condensation_on_windows', !data.condensation_on_windows)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.condensation_on_windows ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.condensation_on_windows ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Black Mould Present */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <label className="text-sm font-medium text-white">Black Mould Present</label>
          <button
            onClick={() => {
              if (data.black_mould_present) {
                handleMultiChange({ black_mould_present: false, mould_severity: undefined })
              } else {
                handleChange('black_mould_present', true)
              }
            }}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.black_mould_present ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.black_mould_present ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Mould Severity - only shown when black_mould_present is true */}
        {data.black_mould_present && (
          <div className="pl-4 pt-2">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Mould Severity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'moderate', 'severe'] as MouldSeverity[]).map((severity) => (
                <button
                  key={severity}
                  onClick={() => handleChange('mould_severity', severity)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                    ${
                      data.mould_severity === severity
                        ? 'bg-purple-500/30 border border-purple-400 text-white'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }
                  `}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ventilation Adequate */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <label className="text-sm font-medium text-white">Ventilation Adequate</label>
          <button
            onClick={() => handleChange('ventilation_adequate', !data.ventilation_adequate)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.ventilation_adequate ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.ventilation_adequate ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Humidity Reading */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Humidity Reading (% RH)
          </label>
          <input
            type="number"
            value={data.humidity_reading || ''}
            onChange={(e) => handleChange('humidity_reading', parseFloat(e.target.value) || undefined)}
            className="input-field"
            step="1"
            min="0"
            max="100"
            placeholder="e.g., 65"
          />
          <p className="mt-1 text-xs text-white/50">
            Relative humidity percentage (0-100%)
          </p>
        </div>
      </div>

      {/* Extraction */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Fan className="w-4 h-4 text-purple-300" />
          Extraction
        </h5>

        {/* Extraction Needed */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <label className="text-sm font-medium text-white">Extraction Needed</label>
          <button
            onClick={() => {
              if (data.extraction_needed) {
                handleMultiChange({
                  extraction_needed: false,
                  extraction_type: undefined,
                  cpass_passive_vent_count: undefined,
                  dryaire_cvent_count: undefined,
                  core_hole_required: undefined,
                  core_hole_count: undefined,
                  trickle_boost_fan_count: undefined,
                  electrical_pack_count: undefined,
                  core_hole_count_active: undefined,
                  fan_grille_count: undefined,
                })
              } else {
                handleChange('extraction_needed', true)
              }
            }}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.extraction_needed ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.extraction_needed ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {data.extraction_needed && (
          <>
            {/* Active / Passive selection */}
            <div className="pl-4 pt-2">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Extraction Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['passive', 'active'] as ExtractionType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      handleMultiChange({
                        extraction_type: type,
                        cpass_passive_vent_count: undefined,
                        dryaire_cvent_count: undefined,
                        core_hole_required: undefined,
                        core_hole_count: undefined,
                        trickle_boost_fan_count: undefined,
                        electrical_pack_count: undefined,
                        core_hole_count_active: undefined,
                        fan_grille_count: undefined,
                      })
                    }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                      ${
                        data.extraction_type === type
                          ? 'bg-purple-500/30 border border-purple-400 text-white'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Passive sub-fields */}
            {data.extraction_type === 'passive' && (
              <div className="pl-4 space-y-3 border-l-2 border-purple-500/30 ml-2">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Cpass Passive Vents
                  </label>
                  <input
                    type="number"
                    value={data.cpass_passive_vent_count ?? 0}
                    onChange={(e) => handleChange('cpass_passive_vent_count', parseInt(e.target.value) || 0)}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Dryaire CVents
                  </label>
                  <input
                    type="number"
                    value={data.dryaire_cvent_count ?? 0}
                    onChange={(e) => handleChange('dryaire_cvent_count', parseInt(e.target.value) || 0)}
                    className="input-field"
                    min="0"
                  />
                </div>

                {/* Core Hole Required gate */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <label className="text-sm font-medium text-white">Core Hole Required</label>
                  <button
                    onClick={() => {
                      if (data.core_hole_required) {
                        handleMultiChange({ core_hole_required: false, core_hole_count: undefined })
                      } else {
                        handleChange('core_hole_required', true)
                      }
                    }}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full
                      transition-colors duration-300
                      ${data.core_hole_required ? 'bg-brand-500' : 'bg-white/20'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                        transition-transform duration-300
                        ${data.core_hole_required ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {data.core_hole_required && (
                  <div className="pl-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Core Hole Count
                    </label>
                    <input
                      type="number"
                      value={data.core_hole_count ?? ''}
                      onChange={(e) => handleChange('core_hole_count', parseInt(e.target.value) || undefined)}
                      className="input-field"
                      min="1"
                      placeholder="e.g., 1"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Active sub-fields */}
            {data.extraction_type === 'active' && (
              <div className="pl-4 space-y-3 border-l-2 border-purple-500/30 ml-2">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Trickle & Boost Humidstat Fan Units
                  </label>
                  <input
                    type="number"
                    value={data.trickle_boost_fan_count ?? ''}
                    onChange={(e) => handleChange('trickle_boost_fan_count', parseInt(e.target.value) || undefined)}
                    className="input-field"
                    min="1"
                    placeholder="Required — min. 1"
                  />
                  {(data.trickle_boost_fan_count == null || data.trickle_boost_fan_count < 1) && (
                    <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      At least 1 fan unit required for active extraction
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Electrical Packs
                  </label>
                  <input
                    type="number"
                    value={data.electrical_pack_count ?? 0}
                    onChange={(e) => handleChange('electrical_pack_count', parseInt(e.target.value) || 0)}
                    className="input-field"
                    min="0"
                  />
                  <p className="mt-1 text-xs text-white/50">0 = none needed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Core Holes
                  </label>
                  <input
                    type="number"
                    value={data.core_hole_count_active ?? 0}
                    onChange={(e) => handleChange('core_hole_count_active', parseInt(e.target.value) || 0)}
                    className="input-field"
                    min="0"
                  />
                  <p className="mt-1 text-xs text-white/50">0 = none needed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Fan Grilles
                  </label>
                  <input
                    type="number"
                    value={data.fan_grille_count ?? 0}
                    onChange={(e) => handleChange('fan_grille_count', parseInt(e.target.value) || 0)}
                    className="input-field"
                    min="0"
                  />
                  <p className="mt-1 text-xs text-white/50">0 = none needed</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
