// =============================================================================
// Survey Tag Derivation — Pure Function
// Derives an array of granular finding tags from in-memory wizard data.
// No DB access, no side effects. Called after every save operation.
// =============================================================================

import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'

// Maps external building defect values to tag names.
// Some defects share a tag (e.g. both gutter defect types → defective_rainwater_goods).
const EXTERNAL_DEFECT_TAG_MAP: Record<string, string> = {
  wet_rot_joinery:    'external_wet_rot',
  defective_gutters:  'defective_rainwater_goods',
  blocked_gutters:    'defective_rainwater_goods',
  slipped_slates:     'roof_defects',
  loose_slates:       'roof_defects',
  missing_slates:     'roof_defects',
  ridge_tiles:        'roof_defects',
}

/**
 * Derive the full set of survey tags from room data and external inspection.
 * Returns a sorted, deduplicated array of tag strings.
 * Safe to call with partial / incomplete wizard data — missing fields are ignored.
 */
export function deriveSurveyTags(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[]
): string[] {
  const tags = new Set<string>()

  for (const room of rooms) {
    // High-level issue tags from issues_identified (damp, condensation, timber_decay, woodworm)
    for (const issue of room.issues_identified || []) {
      tags.add(issue)
    }

    const rd = room.room_data || {}

    // ── Damp sub-tags ──────────────────────────────────────────────────────
    const damp = rd.damp as any
    if (damp?.dpc_type === 'traditional' || damp?.dpc_type === 'digital') {
      tags.add('rising_damp')
    }

    // ── Timber sub-tags (fungal species) ──────────────────────────────────
    const timber = rd.timber_decay as any
    if (Array.isArray(timber?.fungal_findings)) {
      for (const f of timber.fungal_findings) {
        if (f && f !== 'none') tags.add(f) // dry_rot, wet_rot, cellar_fungus, white_pore_fungus
      }
    }

    // ── Woodworm sub-tags ─────────────────────────────────────────────────
    const ww = rd.woodworm as any
    // Note: the field is species_identified (not species) per WoodwormRoomData type
    if (ww?.species_identified && ww.species_identified !== 'unknown') {
      tags.add(ww.species_identified) // common_furniture_beetle, deathwatch_beetle, etc.
    }
    if (ww?.infestation_status === 'active') {
      tags.add('active_woodworm')
    }

    // ── Condensation sub-tags ─────────────────────────────────────────────
    const cond = rd.condensation as any
    if (cond?.black_mould_present === true) {
      tags.add('black_mould')
    }
  }

  // ── External building defects ────────────────────────────────────────────
  // building_defects is BuildingDefect[] — an array of string values, not objects
  const defects = wizardData?.external_inspection?.building_defects || []
  for (const defect of defects) {
    const tag = EXTERNAL_DEFECT_TAG_MAP[defect]
    if (tag) tags.add(tag)
  }

  return [...tags].sort()
}
