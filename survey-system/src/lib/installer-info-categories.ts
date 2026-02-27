// =============================================================================
// Category Applicability Logic
// Determines which installer-info categories are relevant for a given survey
// based on its survey_data, survey_rooms, and survey_type.
// =============================================================================

import type { InstallerInfoCategory } from '@/types/installer-info.types'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'

/**
 * Determine which categories are applicable based on survey data.
 *
 * Always included: general_access, health_and_safety, electrical
 *
 * Conditional:
 *  - loft: any room on upper floor / loft, or loft-related additional works
 *  - external_works: external defects found, DPC survey, or external wall work
 *  - ventilation: PIV, extraction fans, or airbricks in additional works
 *  - groundworks: ACO drain, French drain, or Aquaban in additional works
 */
export function determineApplicableCategories(
  surveyType: string,
  wizardData: SurveyWizardData | null | undefined,
  rooms: SurveyRoomRow[]
): InstallerInfoCategory[] {
  const categories: InstallerInfoCategory[] = [
    'general_access',
    'health_and_safety',
    'electrical',
  ]

  const aw = wizardData?.additional_works
  const ext = wizardData?.external_inspection

  // ── Loft ──
  // Show if any room is on an upper floor or in the loft,
  // or if additional works include loft-related insulation.
  const hasUpperFloorRoom = rooms.some(r =>
    ['first', 'second', 'third', 'loft'].includes(r.floor_level)
  )
  const hasLoftInsulation = (aw?.warmline_insulation_area ?? 0) > 0
  if (hasUpperFloorRoom || hasLoftInsulation) {
    categories.push('loft')
  }

  // ── External Works ──
  // Show if external inspection found defects, wall tie / cracking concerns,
  // or if the survey type is 'damp' (DPC injection is external work).
  const hasExternalDefects = ext?.building_defects_found === true
  const hasWallTieConcern = ext?.wall_tie_concern === true
  const hasCrackingConcern = ext?.cracking_concern === true
  const isDampSurvey = surveyType === 'damp'
  if (hasExternalDefects || hasWallTieConcern || hasCrackingConcern || isDampSurvey) {
    categories.push('external_works')
  }

  // ── Ventilation ──
  // Show if additional works include PIV units, extraction fans, or airbricks.
  const hasPIV = aw?.piv_type && aw.piv_count && aw.piv_count > 0
  const hasFans = (aw?.fan_core_hole_count ?? 0) > 0 || (aw?.fan_grille_count ?? 0) > 0
  const hasAirbricks = (
    (aw?.airbrick_clean_count ?? 0) > 0 ||
    (aw?.airbrick_upgrade_count ?? 0) > 0 ||
    (aw?.airbrick_new_count ?? 0) > 0
  )
  const hasDucting = (aw?.ducting_components?.length ?? 0) > 0
  if (hasPIV || hasFans || hasAirbricks || hasDucting) {
    categories.push('ventilation')
  }

  // ── Groundworks ──
  // Show if additional works include drainage or excavation items.
  const hasACO = (aw?.aco_drain_length ?? 0) > 0
  const hasFrenchDrain = (aw?.french_drain_length ?? 0) > 0
  const hasAquaban = (aw?.aquaban_area ?? 0) > 0
  if (hasACO || hasFrenchDrain || hasAquaban) {
    categories.push('groundworks')
  }

  return categories
}
