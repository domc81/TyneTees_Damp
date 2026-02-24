'use client'

import { useEffect } from 'react'
import { CondensationRoomData, MouldSeverity } from '@/types/survey-wizard.types'
import { Wind, Droplet, Fan, AlertCircle } from 'lucide-react'

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

      {/* Evidence Toggles */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Droplet className="w-4 h-4 text-purple-300" />
          Evidence
        </h5>

        {/* Condensation on Windows */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <label className="text-sm font-medium text-white">Condensation on Windows</label>
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
              const newValue = !data.black_mould_present
              handleChange('black_mould_present', newValue)
              // Clear severity if mould is not present
              if (!newValue) {
                handleChange('mould_severity', undefined)
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

      {/* Recommendations */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Fan className="w-4 h-4 text-purple-300" />
          Recommendations (Room-Specific)
        </h5>

        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-purple-300 mt-0.5 shrink-0" />
          <p className="text-xs text-white/70">
            Equipment quantities will be captured in Additional Works (Step 4). Here, indicate if
            this room would benefit from ventilation improvements.
          </p>
        </div>

        {/* PIV Recommended */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <div>
            <label className="text-sm font-medium text-white">PIV Recommended</label>
            <p className="text-xs text-white/50">Positive Input Ventilation</p>
          </div>
          <button
            onClick={() => handleChange('piv_recommended', !data.piv_recommended)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.piv_recommended ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.piv_recommended ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Fan Recommended */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <div>
            <label className="text-sm font-medium text-white">Fan Recommended</label>
            <p className="text-xs text-white/50">Extractor fan</p>
          </div>
          <button
            onClick={() => {
              const newValue = !data.fan_recommended
              handleChange('fan_recommended', newValue)
              // Clear fan count if not recommended
              if (!newValue) {
                handleChange('fan_count', undefined)
              }
            }}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.fan_recommended ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
                transition-transform duration-300
                ${data.fan_recommended ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Fan Count - only shown when fan_recommended is true */}
        {data.fan_recommended && (
          <div className="pl-4 pt-2">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Number of Fans for This Room
            </label>
            <input
              type="number"
              value={data.fan_count || ''}
              onChange={(e) => handleChange('fan_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="e.g., 1"
            />
          </div>
        )}
      </div>
    </div>
  )
}
