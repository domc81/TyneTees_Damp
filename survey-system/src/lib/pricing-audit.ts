// =============================================================================
// Pricing audit — read access to pricing_change_log.
//
// The log is written exclusively by the SECURITY DEFINER trigger
// log_pricing_change() (migration 20260711000007) on every INSERT/UPDATE/
// DELETE to pricing_config, materials_catalog, costing_line_templates and
// costing_sections. RLS restricts reads to active admins.
// =============================================================================

import { getSupabase } from './supabase-client'

export interface PricingChangeEntry {
  id: number
  changed_at: string
  table_name: string
  row_pk: string
  row_label: string | null
  operation: 'INSERT' | 'UPDATE' | 'DELETE'
  changed_by_name: string | null
  changed_fields: string[] | null
  old_values: Record<string, any> | null
  new_values: Record<string, any> | null
}

/**
 * Load the most recent pricing changes for the given source tables,
 * newest first.
 */
export async function getPricingChanges(
  tables: string[],
  limit = 50
): Promise<PricingChangeEntry[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('pricing_change_log')
    .select(
      'id, changed_at, table_name, row_pk, row_label, operation, changed_by_name, changed_fields, old_values, new_values'
    )
    .in('table_name', tables)
    .order('changed_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error loading pricing change log:', error)
    return []
  }
  return (data ?? []) as PricingChangeEntry[]
}
