'use client'

import { FindingUrgency, FINDING_URGENCY_OPTIONS } from '@/types/survey-wizard.types'
import { AlertTriangle } from 'lucide-react'

interface UrgencySelectorProps {
  value?: FindingUrgency
  onChange: (value: FindingUrgency) => void
  label?: string
}

export default function UrgencySelector({ value, onChange, label = 'Finding Urgency' }: UrgencySelectorProps) {
  return (
    <div className="glass-card p-4">
      <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-300" />
        {label}
      </h5>
      <div className="grid grid-cols-3 gap-2">
        {FINDING_URGENCY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-3 rounded-lg text-sm font-medium transition-all text-center
              ${value === option.value
                ? option.value === 'green'
                  ? 'bg-green-500/30 border-2 border-green-400 text-white'
                  : option.value === 'amber'
                    ? 'bg-amber-500/30 border-2 border-amber-400 text-white'
                    : 'bg-red-500/30 border-2 border-red-400 text-white'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }
            `}
          >
            <span className={`inline-block w-3 h-3 rounded-full mb-1 ${
              option.value === 'green' ? 'bg-green-400' :
              option.value === 'amber' ? 'bg-amber-400' : 'bg-red-400'
            }`} />
            <span className="block text-xs mt-1">{option.label.split(' — ')[1]}</span>
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-white/50 mt-2">
          {FINDING_URGENCY_OPTIONS.find(o => o.value === value)?.description}
        </p>
      )}
    </div>
  )
}
