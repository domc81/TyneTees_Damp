// =============================================================================
// Installer Info Data Layer — CRUD for survey_installer_info table
// =============================================================================

import { getSupabase } from './supabase-client'
import type { InstallerInfoRow, InstallerInfoCategory } from '@/types/installer-info.types'

/**
 * Load installer info for a survey. Returns null if none exists yet.
 */
export async function getInstallerInfo(surveyId: string): Promise<InstallerInfoRow | null> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('survey_installer_info')
    .select('*')
    .eq('survey_id', surveyId)
    .maybeSingle()

  if (error) throw new Error(`Failed to load installer info: ${error.message}`)
  return data as InstallerInfoRow | null
}

/**
 * Create a new installer info record for a survey.
 */
export async function createInstallerInfo(
  surveyId: string,
  categoriesApplicable: InstallerInfoCategory[]
): Promise<InstallerInfoRow> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('survey_installer_info')
    .insert({
      survey_id: surveyId,
      site_info: {},
      categories_applicable: categoriesApplicable,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create installer info: ${error.message}`)
  return data as InstallerInfoRow
}

/**
 * Update site_info JSONB, categories, and notes. Used by auto-save.
 */
export async function updateInstallerInfo(
  id: string,
  updates: {
    site_info?: Record<string, Record<string, unknown>>
    categories_applicable?: InstallerInfoCategory[]
    completed?: boolean
    notes?: string | null
  }
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { error } = await supabase
    .from('survey_installer_info')
    .update(updates)
    .eq('id', id)

  if (error) throw new Error(`Failed to update installer info: ${error.message}`)
}
