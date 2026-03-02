'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { UserProfile } from '@/types/database.types'

// =============================================================================
// SurveyorSelect — Reusable surveyor dropdown
// Fetches active surveyors on mount, styled consistently with the app theme.
// Used in: SlotPicker, calendar filters, future booking assignment features.
// =============================================================================

export interface SurveyorSelectProps {
  onSelect: (surveyorId: string, surveyorName: string) => void
  selectedId?: string | null
  disabled?: boolean
  label?: string
}

export function SurveyorSelect({
  onSelect,
  selectedId,
  disabled,
  label = 'Surveyor',
}: SurveyorSelectProps) {
  const [surveyors, setSurveyors] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('is_surveyor', true)
        .eq('is_active', true)
        .order('display_name')

      if (error) {
        console.error('Failed to load surveyors:', error)
      } else {
        setSurveyors(data || [])
      }
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    const surveyor = surveyors.find((s) => s.id === id)
    if (surveyor) {
      onSelect(surveyor.id, surveyor.display_name)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">
        {label}
      </label>
      <select
        value={selectedId || ''}
        onChange={handleChange}
        disabled={disabled || loading}
        className="input-field w-full"
      >
        {loading ? (
          <option value="">Loading surveyors...</option>
        ) : surveyors.length === 0 ? (
          <option value="">No active surveyors</option>
        ) : (
          <>
            <option value="">Select a surveyor...</option>
            {surveyors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.display_name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  )
}
