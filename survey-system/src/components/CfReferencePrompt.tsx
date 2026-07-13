'use client'

// =============================================================================
// CfReferencePrompt — soft prompt to record the Contractor Foreman project
// reference when a lead is won. CF projects are created manually in CF, so
// this nudges the office to copy the ID back here while it's fresh. Never a
// hard gate: Skip closes it, and the field stays editable on the survey hub's
// Survey Details card.
//
// Self-contained: given an enquiryId it looks up the linked survey itself and
// silently closes if there's no survey or the reference is already recorded.
// =============================================================================

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getSupabase } from '@/lib/supabase-client'
import { updateSurvey } from '@/lib/supabase-data'

interface CfReferencePromptProps {
  /** Enquiry to prompt for — render with null to keep the prompt closed */
  enquiryId: string | null
  clientName?: string | null
  onClose: () => void
}

export function CfReferencePrompt({ enquiryId, clientName, onClose }: CfReferencePromptProps) {
  const [surveyId, setSurveyId] = useState<string | null>(null)
  const [projectNumber, setProjectNumber] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!enquiryId) {
      setSurveyId(null)
      return
    }
    let cancelled = false
    async function lookup() {
      const supabase = getSupabase()
      if (!supabase) { onClose(); return }
      const { data, error } = await supabase
        .from('surveys')
        .select('id, project_number, cf_project_reference')
        .eq('enquiry_id', enquiryId)
        .order('created_at', { ascending: false })
        .limit(1)
      if (cancelled) return
      const survey = data?.[0]
      // No linked survey, already recorded, or lookup failed — nothing to prompt for
      if (error || !survey || survey.cf_project_reference) {
        onClose()
        return
      }
      setValue('')
      setProjectNumber(survey.project_number)
      setSurveyId(survey.id)
    }
    lookup()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiryId])

  useEffect(() => {
    if (!enquiryId || !surveyId) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [enquiryId, surveyId, onClose])

  if (!enquiryId || !surveyId) return null

  async function handleSave() {
    const trimmed = value.trim()
    if (!trimmed || !surveyId) return
    setSaving(true)
    const updated = await updateSurvey(surveyId, { cf_project_reference: trimmed })
    setSaving(false)
    if (updated) {
      toast.success('CF Project Reference saved')
      onClose()
    } else {
      toast.error('Failed to save CF Project Reference — you can add it later on the survey’s Survey Details card')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add CF Project Reference"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/15 p-6 space-y-5"
        style={{
          background: 'linear-gradient(135deg, rgba(30,42,56,0.98) 0%, rgba(13,21,32,0.99) 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">Add CF Project Reference</h2>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            {clientName ? `"${clientName}" is` : 'This lead is'} now won. If you&apos;ve created the
            project in Contractor Foreman, record its reference against survey{' '}
            <span className="font-mono text-white/80">{projectNumber}</span> so you can cross-reference
            it later.
          </p>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">CF Project Reference</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
            autoFocus
            autoComplete="off"
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            placeholder="e.g. CF project ID"
          />
          <p className="mt-1.5 text-xs text-white/40">
            Not created it yet? Skip — the field is always available on the survey&apos;s Survey Details card.
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 text-sm py-2">
            Skip for now
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !value.trim()}
            className="btn-primary flex-1 text-sm py-2 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
