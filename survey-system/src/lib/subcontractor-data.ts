// =============================================================================
// Subcontractor cost rows — data layer for survey_subcontractor_costs
// (review pt 15). One row per (survey, section): computed contractor figures
// refreshed from the engine, assigned_to/notes owned by office.
//
// ONLINE-ONLY office surface — never route through the offline layer.
// =============================================================================

import { getSupabase } from './supabase-client'
import type { ContractorOutputs } from './contractor-costs'

export interface SubcontractorCostRow {
  id: string
  survey_id: string
  section_key: string
  section_name: string | null
  contractor_mat_cost: number
  contractor_lab_cost: number
  contractor_total: number
  projected_hours: number | null
  assigned_to: string | null
  notes: string | null
  display_order: number
  created_at: string
}

export async function getSubcontractorRows(surveyId: string): Promise<SubcontractorCostRow[]> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')
  const { data, error } = await supabase
    .from('survey_subcontractor_costs')
    .select('*')
    .eq('survey_id', surveyId)
    .order('display_order', { ascending: true })
  if (error) throw new Error(`Failed to load subcontractor rows: ${error.message}`)
  return (data ?? []) as SubcontractorCostRow[]
}

/**
 * Refresh the computed figures from the engine's contractor outputs while
 * preserving office-owned fields (assigned_to, notes). Sections that no
 * longer produce operative work are removed.
 */
export async function syncSubcontractorRows(
  surveyId: string,
  outputs: ContractorOutputs,
  sectionNames: Record<string, string>
): Promise<SubcontractorCostRow[]> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const existing = await getSubcontractorRows(surveyId)
  const existingByKey = new Map(existing.map((r) => [r.section_key, r]))

  const round2 = (n: number) => Math.round(n * 100) / 100
  const rows = outputs.sections.map((s, i) => ({
    survey_id: surveyId,
    section_key: s.sectionKey,
    section_name: sectionNames[s.sectionKey] ?? s.sectionKey,
    contractor_mat_cost: round2(s.materials),
    contractor_lab_cost: round2(s.pay),
    contractor_total: round2(s.total),
    projected_hours: Math.round(s.hours * 10) / 10,
    assigned_to: existingByKey.get(s.sectionKey)?.assigned_to ?? null,
    notes: existingByKey.get(s.sectionKey)?.notes ?? null,
    display_order: i,
  }))

  if (rows.length > 0) {
    const { error } = await supabase
      .from('survey_subcontractor_costs')
      .upsert(rows, { onConflict: 'survey_id,section_key' })
    if (error) throw new Error(`Failed to sync subcontractor rows: ${error.message}`)
  }

  // Remove rows for sections that no longer exist in the costing
  const liveKeys = new Set(rows.map((r) => r.section_key))
  const stale = existing.filter((r) => !liveKeys.has(r.section_key))
  if (stale.length > 0) {
    const { error } = await supabase
      .from('survey_subcontractor_costs')
      .delete()
      .in('id', stale.map((r) => r.id))
    if (error) throw new Error(`Failed to prune subcontractor rows: ${error.message}`)
  }

  return getSubcontractorRows(surveyId)
}

/** Office assignment/notes update for one section row. */
export async function updateSubcontractorAssignment(
  rowId: string,
  patch: { assigned_to?: string | null; notes?: string | null }
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')
  const { error } = await supabase
    .from('survey_subcontractor_costs')
    .update(patch)
    .eq('id', rowId)
  if (error) throw new Error(`Failed to update assignment: ${error.message}`)
}
