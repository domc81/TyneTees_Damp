'use client'

import {
  WoodwormRoomData,
  WoodwormSpecies,
  InfestationStatus,
  InfestationSeverity,
} from '@/types/survey-wizard.types'
import { Bug, AlertTriangle, Layers, Clock, Hammer } from 'lucide-react'

interface WoodwormFieldsProps {
  data: Partial<WoodwormRoomData>
  onChange: (data: Partial<WoodwormRoomData>) => void
}

export default function WoodwormFields({ data, onChange }: WoodwormFieldsProps) {
  const handleChange = (field: keyof WoodwormRoomData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20">
            <Bug className="w-5 h-5 text-red-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Woodworm Assessment</h4>
            <p className="text-sm text-white/60">Infestation identification and treatment</p>
          </div>
        </div>
      </div>

      {/* Infestation Details */}
      <div className="glass-card p-4 space-y-4">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-300" />
          Infestation Details
        </h5>

        {/* Species Identified */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Species Identified
          </label>
          <select
            value={data.species_identified || ''}
            onChange={(e) => handleChange('species_identified', e.target.value as WoodwormSpecies)}
            className="input-field"
          >
            <option value="">Select species...</option>
            <option value="common_furniture_beetle">Common Furniture Beetle</option>
            <option value="deathwatch_beetle">Deathwatch Beetle</option>
            <option value="house_longhorn">House Longhorn Beetle</option>
            <option value="powderpost_beetle">Powderpost Beetle</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Infestation Status */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Infestation Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['active', 'historic', 'uncertain'] as InfestationStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => handleChange('infestation_status', status)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    data.infestation_status === status
                      ? 'bg-red-500/30 border border-red-400 text-white'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Severity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'moderate', 'severe'] as InfestationSeverity[]).map((severity) => (
              <button
                key={severity}
                onClick={() => handleChange('severity', severity)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    data.severity === severity
                      ? 'bg-red-500/30 border border-red-400 text-white'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>

        {/* Structural Damage */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <div>
            <label className="text-sm font-medium text-white">Structural Damage</label>
            <p className="text-xs text-white/50">Evidence of load-bearing timber damage</p>
          </div>
          <button
            onClick={() => handleChange('structural_damage', !data.structural_damage)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.structural_damage ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.structural_damage ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>

      {/* Treatment Areas */}
      <div className="glass-card p-4 space-y-4">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-300" />
          Treatment Areas
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Spray Floor Area (m²)
            </label>
            <input
              type="number"
              value={data.spray_floor_area || ''}
              onChange={(e) => handleChange('spray_floor_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Floor area"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Spray Timber Area (m²)
            </label>
            <input
              type="number"
              value={data.spray_timber_area || ''}
              onChange={(e) => handleChange('spray_timber_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Exposed timber"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Paste Treatment Area (m²)
            </label>
            <input
              type="number"
              value={data.paste_treatment_area || ''}
              onChange={(e) => handleChange('paste_treatment_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Paste required"
            />
          </div>
        </div>

        <p className="text-xs text-white/50">
          Enter the area requiring treatment for each method
        </p>
      </div>

      {/* Staircase Fogging */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Hammer className="w-4 h-4 text-red-300" />
          Staircase Fogging
        </h5>
        <p className="text-xs text-white/50">Enter step counts only where staircase fogging is required</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Open Rear Treads (steps)
            </label>
            <input
              type="number"
              value={data.staircase_open_rear_steps || ''}
              onChange={(e) => handleChange('staircase_open_rear_steps', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Closed Rear Treads — Drill &amp; Plug (steps)
            </label>
            <input
              type="number"
              value={data.staircase_closed_rear_steps || ''}
              onChange={(e) => handleChange('staircase_closed_rear_steps', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Difficulty Hours */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-red-300" />
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
