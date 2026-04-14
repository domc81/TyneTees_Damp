// =============================================================================
// Survey-to-Costing Mapping Engine
// Transforms wizard survey data into LineInput[] for the pricing engine.
// This is the bridge between survey data collection and cost calculation.
// =============================================================================

import { getSupabase } from './supabase-client'
import type { LineInput, CalculationResult } from './pricing-engine'
import type {
  SurveyWizardData,
  SurveyRoomRow,
  DampRoomData,
  CondensationRoomData,
  TimberRoomData,
  WoodwormRoomData,
  AdditionalWorks
} from '../types/survey-wizard.types'
import { calculateSurveyCosting } from './pricing-data'

// =============================================================================
// Template Lookup Map Types
// =============================================================================

/**
 * Map of "section_key:line_key" to template UUID
 * Used to quickly find template IDs for line item generation
 */
export type TemplateLookup = Map<string, string>

/**
 * Result of loading template lookups for all survey types
 */
interface TemplateLookupCache {
  damp: TemplateLookup
  condensation: TemplateLookup
  timber: TemplateLookup
  woodworm: TemplateLookup
  site_preparation: TemplateLookup
}

// =============================================================================
// Template Lookup Loading
// =============================================================================

/**
 * Load template lookup map for a specific survey type
 *
 * Queries costing_line_templates joined with costing_sections to build
 * a Map<string, string> where key is "section_key:line_key" and value
 * is the template UUID.
 *
 * @param surveyType - The survey type (damp, condensation, timber, woodworm)
 * @returns Map of template lookup keys to template IDs
 */
export async function loadTemplateLookup(surveyType: string): Promise<TemplateLookup> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase client not available')
    return new Map()
  }

  const { data, error } = await supabase
    .from('costing_line_templates')
    .select(`
      id,
      line_key,
      costing_sections!inner (
        section_key,
        survey_type
      )
    `)
    .eq('costing_sections.survey_type', surveyType)

  if (error) {
    console.error(`Error loading template lookup for ${surveyType}:`, error)
    return new Map()
  }

  if (!data) {
    return new Map()
  }

  // Build lookup map: "section_key:line_key" → template_id
  const lookup = new Map<string, string>()
  for (const row of data) {
    const section = (row.costing_sections as any)
    const lookupKey = `${section.section_key}:${row.line_key}`
    lookup.set(lookupKey, row.id)
  }

  return lookup
}

/**
 * Load all template lookups for all survey types
 * Caches the results for efficient reuse
 */
export async function loadAllTemplateLookups(): Promise<TemplateLookupCache> {
  const [damp, condensation, timber, woodworm, site_preparation] = await Promise.all([
    loadTemplateLookup('damp'),
    loadTemplateLookup('condensation'),
    loadTemplateLookup('timber'),
    loadTemplateLookup('woodworm'),
    loadTemplateLookup('site_preparation')
  ])

  return { damp, condensation, timber, woodworm, site_preparation }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get template ID from lookup, warn if not found
 */
function getTemplateId(
  lookup: TemplateLookup,
  sectionKey: string,
  lineKey: string
): string | null {
  const lookupKey = `${sectionKey}:${lineKey}`
  const templateId = lookup.get(lookupKey)

  if (!templateId) {
    console.warn(`Template not found: ${lookupKey}`)
  }

  return templateId || null
}

/**
 * Create a LineInput if quantity > 0 and template exists
 */
function createLineInput(
  lookup: TemplateLookup,
  sectionKey: string,
  lineKey: string,
  quantity: number,
  dimension?: number
): LineInput | null {
  if (quantity <= 0) return null

  const templateId = getTemplateId(lookup, sectionKey, lineKey)
  if (!templateId) return null

  return {
    templateId,
    inputQuantity: quantity,
    inputDimension: dimension
  }
}

// =============================================================================
// DAMP SURVEY MAPPING
// =============================================================================

/**
 * Map damp survey data to line inputs
 *
 * Aggregates wall-by-wall measurements across all rooms with damp issues.
 * Handles DPC injection, membrane installation, tanking, floor treatment,
 * plastering, and all preparatory work.
 */
function mapDampSurvey(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []

  // Filter rooms with damp issues
  const dampRooms = rooms.filter(r => r.issues_identified?.includes('damp'))
  if (dampRooms.length === 0) return inputs

  // Initialize aggregation variables
  let totalRadiators = 0
  let totalSockets = 0
  let totalSkirtingLength = 0
  let totalWallpaperArea = 0
  let totalStripOutPlasterArea = 0
  let totalStripOutStudWallsArea = 0
  let totalStripOutCeilingsArea = 0
  let totalDpcLength = 0
  let dpcWallDepth: number | undefined
  let totalMembraneArea = 0
  let totalTankingArea = 0
  let totalFilletJointLength = 0
  let totalOvertapeLength = 0
  let totalFloorArea = 0
  let totalFloorResinFilletLength = 0
  let totalStripFloorArea = 0
  let totalSubFloorArea = 0
  let totalStudWallArea = 0
  let totalPlasterboardArea = 0
  let totalSkimArea = 0
  let totalWarmlineArea = 0
  let totalDifficultyHours = 0

  // Aggregate across all damp rooms
  for (const room of dampRooms) {
    const dampData = room.room_data?.damp as DampRoomData | undefined
    if (!dampData) continue

    // Aggregate wall data
    for (const wall of dampData.walls || []) {
      const wallArea = wall.length * wall.height

      if (wall.has_wallpaper) {
        totalWallpaperArea += wallArea
      }

      totalRadiators += wall.radiator_count || 0
      totalSockets += wall.socket_count || 0
      totalSkirtingLength += wall.skirting_length || 0
    }

    // Strip-out (manual M² inputs)
    totalStripOutPlasterArea += dampData.strip_out_plaster_area || 0
    totalStripOutStudWallsArea += dampData.strip_out_stud_walls_area || 0
    totalStripOutCeilingsArea += dampData.strip_out_ceilings_area || 0

    // DPC requirements
    if (dampData.dpc_required) {
      totalDpcLength += dampData.dpc_wall_length || 0
      if (dampData.dpc_wall_depth && !dpcWallDepth) {
        dpcWallDepth = dampData.dpc_wall_depth
      }
    }

    // Wall treatment (membrane or tanking)
    if (dampData.wall_treatment === 'membrane') {
      // Membrane area from wall lengths and height
      for (const wallLength of dampData.membrane_wall_lengths || []) {
        const height = dampData.membrane_height === '1m' ? 1 :
                       dampData.membrane_height === '1.2m' ? 1.2 : 2
        totalMembraneArea += wallLength * height
      }
      totalFilletJointLength += dampData.fillet_joint_length || 0
      totalOvertapeLength += dampData.overtape_length || 0
    } else if (dampData.wall_treatment === 'tanking') {
      totalTankingArea += dampData.tanking_area || 0
      totalFilletJointLength += dampData.fillet_joint_length || 0
    }

    // Floor treatment
    if (dampData.floor_treatment) {
      totalFloorArea += dampData.floor_area || 0
      totalFloorResinFilletLength += dampData.floor_resin_fillet_length || 0
      if (dampData.strip_existing_floor) {
        totalStripFloorArea += dampData.strip_floor_area || 0
      }
      totalSubFloorArea += dampData.sub_floor_area || 0
    }

    // Plastering
    totalStudWallArea += dampData.stud_wall_area || 0
    totalPlasterboardArea += dampData.plasterboard_area || 0
    totalSkimArea += dampData.skim_area || 0
    totalWarmlineArea += dampData.warmline_insulation_area || 0

    // Difficulty hours
    totalDifficultyHours += dampData.difficulty_hours || 0
  }

  // === PREPARATORY WORK ===

  // Remove radiators
  const radiatorInput = createLineInput(lookup, 'preparatory_work', 'remove_radiators_valves', totalRadiators)
  if (radiatorInput) inputs.push(radiatorInput)

  // Remove sockets
  const socketInput = createLineInput(lookup, 'preparatory_work', 'remove_socket_fronts', totalSockets)
  if (socketInput) inputs.push(socketInput)

  // Skirting removal
  const skirtingInput = createLineInput(lookup, 'preparatory_work', 'skirting_board_removal', totalSkirtingLength)
  if (skirtingInput) inputs.push(skirtingInput)

  // Strip wallpaper
  const wallpaperInput = createLineInput(lookup, 'preparatory_work', 'strip_wallpaper', totalWallpaperArea)
  if (wallpaperInput) inputs.push(wallpaperInput)

  // === STRIP OUT (manual M² inputs from surveyor) ===

  // Remove plaster/render from walls
  const plasterRemovalInput = createLineInput(lookup, 'strip_out', 'remove_plaster_walls', totalStripOutPlasterArea)
  if (plasterRemovalInput) inputs.push(plasterRemovalInput)

  // Remove stud walls
  const studWallRemovalInput = createLineInput(lookup, 'strip_out', 'remove_stud_walls', totalStripOutStudWallsArea)
  if (studWallRemovalInput) inputs.push(studWallRemovalInput)

  // Plaster & stud removal from ceilings
  const ceilingRemovalInput = createLineInput(lookup, 'strip_out', 'plaster_removal_ceilings', totalStripOutCeilingsArea)
  if (ceilingRemovalInput) inputs.push(ceilingRemovalInput)

  // Strip existing floor
  const stripFloorInput = createLineInput(lookup, 'strip_out', 'strip_timber_floor_gf', totalStripFloorArea)
  if (stripFloorInput) inputs.push(stripFloorInput)

  // Scrape subfloors
  const scrapeSubfloorInput = createLineInput(lookup, 'strip_out', 'scrape_subfloors', totalSubFloorArea)
  if (scrapeSubfloorInput) inputs.push(scrapeSubfloorInput)

  // NOTE: bag_cart_debris and licensed_disposal moved to mapSitePreparation (job-level)

  // === DPC INSTALLATION ===

  if (totalDpcLength > 0 && dpcWallDepth) {
    const dpcInput = createLineInput(
      lookup,
      'dpc_traditional',
      'dpc_injection_traditional',
      totalDpcLength,
      dpcWallDepth
    )
    if (dpcInput) inputs.push(dpcInput)
  }

  // === WALL MEMBRANE ===

  if (totalMembraneArea > 0) {
    // Determine membrane height variant
    const membraneHeight = dampRooms[0]?.room_data?.damp?.membrane_height || '1m'
    let membraneLineKey = 'wall_membrane_1m'
    if (membraneHeight === '1.2m') membraneLineKey = 'wall_membrane_1_2m'
    else if (membraneHeight === '2m') membraneLineKey = 'wall_membrane_2m'

    const membraneInput = createLineInput(lookup, 'wall_membrane', membraneLineKey, totalMembraneArea)
    if (membraneInput) inputs.push(membraneInput)

    // Auto-cascading: Membrane plugs = membrane area × rate (handled by ceiling_coverage formula)
    const plugsInput = createLineInput(lookup, 'wall_membrane', 'membrane_plugs', totalMembraneArea)
    if (plugsInput) inputs.push(plugsInput)

    // Sealing tape
    const sealingTapeInput = createLineInput(lookup, 'wall_membrane', 'sealing_tape', totalMembraneArea)
    if (sealingTapeInput) inputs.push(sealingTapeInput)

    // Overtape (joint sealing tape across rooms)
    const overtapeInput = createLineInput(lookup, 'wall_membrane', 'overtape', totalOvertapeLength)
    if (overtapeInput) inputs.push(overtapeInput)

    // Fillet joint
    const filletInput = createLineInput(lookup, 'wall_membrane', 'wall_floor_fillet_joint', totalFilletJointLength)
    if (filletInput) inputs.push(filletInput)

    // Difficulty hours
    if (totalDifficultyHours > 0) {
      const difficultyInput = createLineInput(lookup, 'wall_membrane', 'difficulty_hours_walls', totalDifficultyHours)
      if (difficultyInput) inputs.push(difficultyInput)
    }
  }

  // === CEMENTITIOUS TANKING ===

  if (totalTankingArea > 0) {
    // Dubbing coat
    const dubbingInput = createLineInput(lookup, 'cementitious_tanking', 'dubbing_out_coat', totalTankingArea)
    if (dubbingInput) inputs.push(dubbingInput)

    // Tanking slurry
    const tankingInput = createLineInput(lookup, 'cementitious_tanking', 'tankingslurry_2coat', totalTankingArea)
    if (tankingInput) inputs.push(tankingInput)

    // Renovating plaster
    const renovatingInput = createLineInput(lookup, 'cementitious_tanking', 'renovating_plaster', totalTankingArea)
    if (renovatingInput) inputs.push(renovatingInput)

    // Fillet joint
    const filletTankingInput = createLineInput(lookup, 'cementitious_tanking', 'wall_floor_fillet_tanking', totalFilletJointLength)
    if (filletTankingInput) inputs.push(filletTankingInput)
  }

  // === FLOOR RESIN ===

  if (totalFloorArea > 0) {
    // Primer
    const primerInput = createLineInput(lookup, 'floor_resin', 'resin_primer_ep40', totalFloorArea)
    if (primerInput) inputs.push(primerInput)

    // Top coat
    const topcoatInput = createLineInput(lookup, 'floor_resin', 'resin_topcoat_ep40', totalFloorArea)
    if (topcoatInput) inputs.push(topcoatInput)

    // Grip grit
    const gripInput = createLineInput(lookup, 'floor_resin', 'grip_grit', totalFloorArea)
    if (gripInput) inputs.push(gripInput)

    // Floor resin fillet joint (separate from wall membrane fillet joint)
    if (totalFloorResinFilletLength > 0) {
      const resinFilletInput = createLineInput(lookup, 'floor_resin', 'wall_floor_fillet_resin', totalFloorResinFilletLength)
      if (resinFilletInput) inputs.push(resinFilletInput)
    }
  }

  // === PLASTERING ===

  // Stud wall construction
  const studWallInput = createLineInput(lookup, 'plastering', 'construct_stud_wall', totalStudWallArea)
  if (studWallInput) inputs.push(studWallInput)

  // Plasterboarding
  const plasterboardInput = createLineInput(lookup, 'plastering', 'plaster_boarding', totalPlasterboardArea)
  if (plasterboardInput) inputs.push(plasterboardInput)

  // Skimming
  const skimmingInput = createLineInput(lookup, 'plastering', 'skimming_walls', totalSkimArea)
  if (skimmingInput) inputs.push(skimmingInput)

  // Warmline Internal Wall Insulation — two templates, same area quantity
  // Roll and adhesive have different coverage rates so each needs independent CEILING rounding
  const warmlineInput = createLineInput(lookup, 'plastering', 'warmline_iwi', totalWarmlineArea)
  if (warmlineInput) inputs.push(warmlineInput)

  const warmlineAdhesiveInput = createLineInput(lookup, 'plastering', 'warmline_iwi_adhesive', totalWarmlineArea)
  if (warmlineAdhesiveInput) inputs.push(warmlineAdhesiveInput)

  return inputs
}

// =============================================================================
// CONDENSATION SURVEY MAPPING
// =============================================================================

/**
 * Map condensation survey data to line inputs
 *
 * PIV is property-level (from additional_works.condensation_piv).
 * Extraction is room-level (from each room's CondensationRoomData).
 * Mould treatment is aggregated across rooms by severity.
 *
 * Falls back to deprecated field paths for old surveys that predate the
 * new PIV/extraction data structures.
 */
function mapCondensationSurvey(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []
  const additionalWorks = wizardData.additional_works || {}
  const condensationPiv = additionalWorks.condensation_piv

  // Filter rooms with condensation issues
  const condensationRooms = rooms.filter(r => r.issues_identified?.includes('condensation'))

  // Early return: no condensation rooms and no PIV (new or legacy)
  if (condensationRooms.length === 0 && !condensationPiv?.piv_recommended && !additionalWorks.piv_count) return inputs

  // === AGGREGATE ROOM DATA ===

  let totalMouldArea = 0

  // New extraction aggregators (room-level)
  let totalPassiveVents = 0
  let totalPassiveCoreHoles = 0
  let totalCVents = 0
  let totalFans = 0
  let totalFanElecPacks = 0
  let totalFanCoreHoles = 0
  let totalFanGrilles = 0
  let hasNewExtractionData = false

  // Legacy fan aggregator
  let legacyFanCount = 0

  for (const room of condensationRooms) {
    const condData = room.room_data?.condensation as CondensationRoomData | undefined
    if (!condData) continue

    // Mould severity → estimated area
    if (condData.black_mould_present && condData.mould_severity) {
      const areaBySeverity = {
        light: 3,
        moderate: 6,
        severe: 12
      }
      totalMouldArea += areaBySeverity[condData.mould_severity] || 6
    }

    // New extraction structure (extraction_needed field present)
    if (condData.extraction_needed !== undefined) {
      hasNewExtractionData = true
      if (condData.extraction_needed) {
        if (condData.extraction_type === 'passive') {
          totalPassiveVents += condData.cpass_passive_vent_count || 0
          totalCVents += condData.dryaire_cvent_count || 0
          if (condData.core_hole_required) {
            totalPassiveCoreHoles += condData.core_hole_count || 0
          }
        } else if (condData.extraction_type === 'active') {
          totalFans += condData.trickle_boost_fan_count || 0
          totalFanElecPacks += condData.electrical_pack_count || 0
          totalFanCoreHoles += condData.core_hole_count_active || 0
          totalFanGrilles += condData.fan_grille_count || 0
        }
      }
    } else {
      // Legacy: old room-level fan fields
      if (condData.fan_recommended) {
        legacyFanCount += condData.fan_count || 1
      }
    }
  }

  // === PIV UNITS (property-level) ===

  const useNewPiv = condensationPiv?.piv_recommended && condensationPiv.piv_type && condensationPiv.piv_type !== 'none'

  if (useNewPiv) {
    // --- New PIV structure (CondensationPIV on additional_works) ---
    const pivType = condensationPiv!.piv_type!
    const pivCount = condensationPiv!.piv_unit_count || 0

    if (pivCount > 0) {
      if (pivType === 'loft_heated' || pivType === 'loft_unheated') {
        // C7 fix: check directly for 'loft_unheated' (not legacy product name)
        const pivLineKey = pivType === 'loft_unheated'
          ? 'va_pozidry_loft_unit_unheated'
          : 'va_pozidry_loft_unit_heated'

        const pivInput = createLineInput(lookup, 'piv_loft', pivLineKey, pivCount)
        if (pivInput) inputs.push(pivInput)

        // Electrical packs (explicit count)
        const elecCount = condensationPiv!.electrical_pack_count || 0
        if (elecCount > 0) {
          const elecInput = createLineInput(lookup, 'piv_loft', 'electrical_pack_fused_spur_cable_jb', elecCount)
          if (elecInput) inputs.push(elecInput)
        }

        // Sarkvents (loft types only)
        const sarkCount = condensationPiv!.sarkvent_count || 0
        if (sarkCount > 0) {
          const sarkInput = createLineInput(lookup, 'piv_loft', 'sarkvents', sarkCount)
          if (sarkInput) inputs.push(sarkInput)
        }

        // Loft Hatch — new or enlarge (mutually exclusive)
        if (additionalWorks.loft_hatch_new_required) {
          const loftHatchNewInput = createLineInput(lookup, 'loft_hatch_new', 'new_loft_hatch_with_sturdy_fold_down_ladder_with_handrail_an', 1)
          if (loftHatchNewInput) inputs.push(loftHatchNewInput)
        } else if (additionalWorks.loft_hatch_enlarge_required) {
          const loftHatchEnlargeInput = createLineInput(lookup, 'loft_hatch_enlarge', 'existing_loft_hatch_enlarge_loft_hatch', 1)
          if (loftHatchEnlargeInput) inputs.push(loftHatchEnlargeInput)
        }
      } else if (pivType === 'wall_mounted') {
        const wallPivInput = createLineInput(lookup, 'piv_wall', 'va_pozidry_compact_wall_mounted_unit', pivCount)
        if (wallPivInput) inputs.push(wallPivInput)

        // Electrical packs (wall-mounted)
        const wallElecCount = condensationPiv!.electrical_pack_count || 0
        if (wallElecCount > 0) {
          const wallElecInput = createLineInput(lookup, 'piv_wall', 'electrical_pack_fused_spur_cable_jb_piv_wall', wallElecCount)
          if (wallElecInput) inputs.push(wallElecInput)
        }

        // Core holes (wall-mounted only)
        const coreCount = condensationPiv!.core_hole_count || 0
        if (coreCount > 0) {
          const coreInput = createLineInput(lookup, 'piv_wall', 'diamond_core_107mm_hole', coreCount)
          if (coreInput) inputs.push(coreInput)
        }

        // Joinery ducting boxwork (wall-mounted only, min charge 2.4m)
        const joineryLm = condensationPiv!.joinery_ducting_boxwork_lm || 0
        if (joineryLm > 0) {
          const joineryQty = Math.max(joineryLm, 2.4)
          const joineryInput = createLineInput(lookup, 'joinery_ducting', 'joinery_to_box_in_ducting_per_metre_min_charge_24_metres', joineryQty)
          if (joineryInput) inputs.push(joineryInput)
        }
      }
    }
  } else if ((additionalWorks.piv_count || 0) > 0 && additionalWorks.piv_type && additionalWorks.piv_type !== 'none') {
    // --- Legacy PIV structure (deprecated flat fields on additional_works) ---
    const pivCount = additionalWorks.piv_count!
    const pivType = additionalWorks.piv_type!

    if (pivType === 'loft_heated' || pivType === 'loft_unheated') {
      const pivLineKey = pivType === 'loft_unheated'
        ? 'va_pozidry_loft_unit_unheated'
        : 'va_pozidry_loft_unit_heated'

      const pivInput = createLineInput(lookup, 'piv_loft', pivLineKey, pivCount)
      if (pivInput) inputs.push(pivInput)

      if (additionalWorks.piv_electrical_pack) {
        const electricalInput = createLineInput(lookup, 'piv_loft', 'electrical_pack_fused_spur_cable_jb', pivCount)
        if (electricalInput) inputs.push(electricalInput)
      }

      const sarkventCount = additionalWorks.sarkvents_count || 0
      if (sarkventCount > 0) {
        const sarkventInput = createLineInput(lookup, 'piv_loft', 'sarkvents', sarkventCount)
        if (sarkventInput) inputs.push(sarkventInput)
      }

      if (additionalWorks.loft_hatch_new_required) {
        const loftHatchNewInput = createLineInput(lookup, 'loft_hatch_new', 'new_loft_hatch_with_sturdy_fold_down_ladder_with_handrail_an', 1)
        if (loftHatchNewInput) inputs.push(loftHatchNewInput)
      } else if (additionalWorks.loft_hatch_enlarge_required) {
        const loftHatchEnlargeInput = createLineInput(lookup, 'loft_hatch_enlarge', 'existing_loft_hatch_enlarge_loft_hatch', 1)
        if (loftHatchEnlargeInput) inputs.push(loftHatchEnlargeInput)
      }
    } else if (pivType === 'wall_mounted') {
      const wallPivInput = createLineInput(lookup, 'piv_wall', 'va_pozidry_compact_wall_mounted_unit', pivCount)
      if (wallPivInput) inputs.push(wallPivInput)

      const wallElecCount = additionalWorks.wall_mounted_electrical_pack_count || 0
      if (wallElecCount > 0) {
        const wallElecInput = createLineInput(lookup, 'piv_wall', 'electrical_pack_fused_spur_cable_jb_piv_wall', wallElecCount)
        if (wallElecInput) inputs.push(wallElecInput)
      }

      const wallCoreCount = additionalWorks.wall_mounted_core_hole_count || 0
      if (wallCoreCount > 0) {
        const wallCoreInput = createLineInput(lookup, 'piv_wall', 'diamond_core_107mm_hole', wallCoreCount)
        if (wallCoreInput) inputs.push(wallCoreInput)
      }
    }

    // Legacy joinery ducting
    const joineryDuctingMetres = additionalWorks.joinery_ducting_metres || 0
    if (joineryDuctingMetres > 0) {
      const joineryQuantity = Math.max(joineryDuctingMetres, 2.4)
      const joineryInput = createLineInput(lookup, 'joinery_ducting', 'joinery_to_box_in_ducting_per_metre_min_charge_24_metres', joineryQuantity)
      if (joineryInput) inputs.push(joineryInput)
    }
  }

  // === DUCTING COMPONENTS (unchanged — same structure on additionalWorks) ===

  for (const component of additionalWorks.ducting_components || []) {
    let lineKey = ''
    switch (component.type) {
      case 'flexible_duct':
        lineKey = 'ducting_insulated_flexi_3m_length'
        break
      case 'rigid_duct':
        lineKey = 'ducting_1m_length'
        break
      case 'duct_elbow':
        lineKey = 'ducting_round_elbow'
        break
      case 'duct_connector':
        lineKey = 'ducting_round_straight_conn'
        break
      case 'grille':
        lineKey = 'grille'
        break
      case 'round_1m':
        lineKey = 'ducting_round_1m'
        break
      case 'flat_to_round_adaptor':
        lineKey = 'ducting_flat_to_round_adaptor'
        break
      case 'flat_straight_connector':
        lineKey = 'ducting_flat_straight_connector'
        break
      case 'flat_horizontal_bend':
        lineKey = 'ducting_flat_horizontal_bend'
        break
      case 'flat_vertical_bend':
        lineKey = 'ducting_flat_vertical_bend'
        break
      case 'flat_1m':
        lineKey = 'ducting_flat_1m'
        break
    }

    if (lineKey) {
      const ductInput = createLineInput(lookup, 'piv_wall', lineKey, component.count)
      if (ductInput) inputs.push(ductInput)
    }
  }

  // === EXTRACTION — ACTIVE (humidistat fans) ===

  if (hasNewExtractionData) {
    // New: room-level aggregated fan counts
    if (totalFans > 0) {
      const fanInput = createLineInput(lookup, 'humidistat_fan', 'trickle_and_boost_humidistat_fan_greenwood', totalFans)
      if (fanInput) inputs.push(fanInput)

      if (totalFanElecPacks > 0) {
        const fanElecInput = createLineInput(lookup, 'humidistat_fan', 'electrical_pack_fused_spur_cable_jb_humidistat_fan', totalFanElecPacks)
        if (fanElecInput) inputs.push(fanElecInput)
      }

      if (totalFanGrilles > 0) {
        const grilleInput = createLineInput(lookup, 'humidistat_fan', 'grille_humidistat_fan', totalFanGrilles)
        if (grilleInput) inputs.push(grilleInput)
      }

      if (totalFanCoreHoles > 0) {
        const coreHoleInput = createLineInput(lookup, 'humidistat_fan', 'diamond_core_107mm_hole_humidistat_fan', totalFanCoreHoles)
        if (coreHoleInput) inputs.push(coreHoleInput)
      }
    }
  } else if (legacyFanCount > 0) {
    // Legacy: fan_recommended + fan_count from rooms, accessories from additional_works
    const fanInput = createLineInput(lookup, 'humidistat_fan', 'trickle_and_boost_humidistat_fan_greenwood', legacyFanCount)
    if (fanInput) inputs.push(fanInput)

    const fanElectricalCount = additionalWorks.fan_electrical_pack_total || legacyFanCount
    const fanElectricalInput = createLineInput(lookup, 'humidistat_fan', 'electrical_pack_fused_spur_cable_jb_humidistat_fan', fanElectricalCount)
    if (fanElectricalInput) inputs.push(fanElectricalInput)

    const grilleCount = additionalWorks.fan_grille_count || legacyFanCount
    const grilleInput = createLineInput(lookup, 'humidistat_fan', 'grille_humidistat_fan', grilleCount)
    if (grilleInput) inputs.push(grilleInput)

    const coreHoleCount = additionalWorks.fan_core_hole_count || legacyFanCount
    const coreHoleInput = createLineInput(lookup, 'humidistat_fan', 'diamond_core_107mm_hole_humidistat_fan', coreHoleCount)
    if (coreHoleInput) inputs.push(coreHoleInput)
  }

  // === EXTRACTION — PASSIVE (Cpass vents + CVents) ===

  if (hasNewExtractionData) {
    // New: room-level aggregated passive vent counts
    if (totalPassiveVents > 0) {
      const ventInput = createLineInput(lookup, 'passive_vent', 'dryaire_cpass_plasmo_insulated_pullcord_passive_vent', totalPassiveVents)
      if (ventInput) inputs.push(ventInput)

      if (totalPassiveCoreHoles > 0) {
        const coreInput = createLineInput(lookup, 'passive_vent', 'diamond_core_107mm_hole_passive_vent', totalPassiveCoreHoles)
        if (coreInput) inputs.push(coreInput)
      }
    }

    if (totalCVents > 0) {
      const cventInput = createLineInput(lookup, 'dryaire_cvent', 'dryaire_cvent', totalCVents)
      if (cventInput) inputs.push(cventInput)

      // Each CVent needs a core hole
      const cventCoreInput = createLineInput(lookup, 'dryaire_cvent', 'diamond_core_107mm_hole_dryaire_cvent', totalCVents)
      if (cventCoreInput) inputs.push(cventCoreInput)
    }
  } else {
    // Legacy: passive vents from additional_works
    const cpassVentCount = additionalWorks.cpass_vent_count || 0
    if (cpassVentCount > 0) {
      const ventInput = createLineInput(lookup, 'passive_vent', 'dryaire_cpass_plasmo_insulated_pullcord_passive_vent', cpassVentCount)
      if (ventInput) inputs.push(ventInput)

      const coreHoleInput = createLineInput(lookup, 'passive_vent', 'diamond_core_107mm_hole_passive_vent', cpassVentCount)
      if (coreHoleInput) inputs.push(coreHoleInput)
    }

    const cventCount = additionalWorks.cvent_count || 0
    if (cventCount > 0) {
      const cventInput = createLineInput(lookup, 'dryaire_cvent', 'dryaire_cvent', cventCount)
      if (cventInput) inputs.push(cventInput)

      const cventCoreHoleInput = createLineInput(lookup, 'dryaire_cvent', 'diamond_core_107mm_hole_dryaire_cvent', cventCount)
      if (cventCoreHoleInput) inputs.push(cventCoreHoleInput)
    }
  }

  // === MOULD TREATMENT ===

  if (totalMouldArea > 0) {
    const mouldInput = createLineInput(lookup, 'mould_treatment', 'mould_treatment', totalMouldArea)
    if (mouldInput) inputs.push(mouldInput)
  }

  return inputs
}

// =============================================================================
// TIMBER SURVEY MAPPING
// =============================================================================

/**
 * Map timber survey data to line inputs
 *
 * Floor area driven with joist size/quantity selections. Maps joist replacements,
 * flooring, treatments, and associated prep work.
 */
function mapTimberSurvey(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []
  const additionalWorks = wizardData.additional_works || {}

  // Filter rooms with timber issues
  const timberRooms = rooms.filter(r => r.issues_identified?.includes('timber_decay'))
  if (timberRooms.length === 0) return inputs

  // Aggregate timber data
  let totalFungalTreatmentArea = 0
  let totalFlooringArea = 0
  let totalCeilingArea = 0
  let totalDifficultyHours = 0
  let totalGrindBackMortarArea = 0
  let totalWireScrubArea = 0
  let totalMasonrySterilantArea = 0
  let totalProtectiveTreatmentArea = 0
  let totalClearSubFloorDebrisArea = 0
  let totalStaircaseOpenRearSteps = 0
  let totalStaircaseClosedRearSteps = 0
  let totalEndwrapJoistsLm = 0
  let totalWallPlateLm = 0
  let totalBowerBeamsCount = 0
  let totalFlitchPlatesCount = 0
  let totalWarmlineInsulationArea = 0
  const joistEntries: { size: string; totalLength: number }[] = []
  const flooringByType: Record<string, number> = {}

  for (const room of timberRooms) {
    const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
    if (!timberData) continue

    // Fungal treatment area
    totalFungalTreatmentArea += timberData.fungal_treatment_area || 0

    // Flooring area
    totalFlooringArea += timberData.flooring_area || 0

    // Flooring installation — aggregate area by type
    if (timberData.flooring_type && timberData.flooring_area && timberData.flooring_area > 0) {
      flooringByType[timberData.flooring_type] = (flooringByType[timberData.flooring_type] || 0) + timberData.flooring_area
    }

    // Ceiling area (if affected)
    if (timberData.ceiling_affected) {
      totalCeilingArea += timberData.ceiling_area || 0
    }

    // Sub-floor debris clearance
    totalClearSubFloorDebrisArea += timberData.clear_sub_floor_debris_area || 0

    // Masonry preparation areas
    totalGrindBackMortarArea += timberData.grind_back_mortar_area || 0
    totalWireScrubArea += timberData.wire_scrub_area || 0
    totalMasonrySterilantArea += timberData.masonry_sterilant_area || 0
    totalProtectiveTreatmentArea += timberData.protective_treatment_area || 0
    totalStaircaseOpenRearSteps += timberData.staircase_open_rear_steps || 0
    totalStaircaseClosedRearSteps += timberData.staircase_closed_rear_steps || 0

    // Joist accessories (per-room)
    totalEndwrapJoistsLm += timberData.endwrap_joists_lm || 0
    totalWallPlateLm += timberData.wall_plate_lm || 0
    totalBowerBeamsCount += timberData.bower_beams_count || 0
    totalFlitchPlatesCount += timberData.flitch_plates_count || 0
    totalWarmlineInsulationArea += timberData.warmline_insulation_area || 0

    // Joist entries (aggregate by size)
    for (const entry of timberData.joist_entries || []) {
      const existing = joistEntries.find(j => j.size === entry.size)
      const totalLength = entry.quantity * entry.length

      if (existing) {
        existing.totalLength += totalLength
      } else {
        joistEntries.push({ size: entry.size, totalLength })
      }
    }

    // Difficulty hours
    totalDifficultyHours += timberData.difficulty_hours || 0
  }

  // === STRIP OUT ===

  // Masonry preparation — grind back mortar courses on brickwork
  const grindBackMortarInput = createLineInput(lookup, 'strip_out', 'grind_back_mortar_courses_on_brickwork', totalGrindBackMortarArea)
  if (grindBackMortarInput) inputs.push(grindBackMortarInput)

  // Masonry preparation — wire scrub brickwork faces
  const wireScrubInput = createLineInput(lookup, 'strip_out', 'wire_scrub_brickwork_faces', totalWireScrubArea)
  if (wireScrubInput) inputs.push(wireScrubInput)

  // Plaster removal (walls)
  const plasterRemovalArea = totalCeilingArea // Simplified assumption
  const plasterRemovalInput = createLineInput(lookup, 'strip_out', 'remove_plasterrender_walls', plasterRemovalArea)
  if (plasterRemovalInput) inputs.push(plasterRemovalInput)

  // Strip floor
  const stripFloorInput = createLineInput(lookup, 'strip_out', 'strip_out_existing_timber_floor_gf', totalFlooringArea)
  if (stripFloorInput) inputs.push(stripFloorInput)

  // NOTE: bag_up_debris and disposal moved to mapSitePreparation (job-level)

  // === JOISTS ===

  for (const joistEntry of joistEntries) {
    // Map size to line key
    const sizeMap: Record<string, string> = {
      '4x2': 'joists_100_x_50',
      '5x2': 'joists_125_x_50',
      '6x2': 'joists_150_x_50',
      '7x2': 'joists_175_x_50',
      '8x2': 'joists_200_x_50',
      '9x2': 'joists_225_x_50'
    }

    const lineKey = sizeMap[joistEntry.size]
    if (lineKey) {
      const joistInput = createLineInput(lookup, 'floor_joists_decking', lineKey, joistEntry.totalLength)
      if (joistInput) inputs.push(joistInput)
    }
  }

  // Joist extras — per-room with additional_works fallback for existing surveys
  const endwrapQty = totalEndwrapJoistsLm || additionalWorks.joist_endwrap_count || 0
  const joist_endwrapInput = createLineInput(lookup, 'floor_joists_decking', 'treat_and_endwrap_joist', endwrapQty)
  if (joist_endwrapInput) inputs.push(joist_endwrapInput)

  const wallPlateQty = totalWallPlateLm || additionalWorks.wall_plate_count || 0
  const wallPlateInput = createLineInput(lookup, 'floor_joists_decking', 'wall_plate_100x25', wallPlateQty)
  if (wallPlateInput) inputs.push(wallPlateInput)

  const bowerBeamQty = totalBowerBeamsCount || additionalWorks.bower_beam_pairs || 0
  const bowerBeamInput = createLineInput(lookup, 'floor_joists_decking', 'bower_beams_pair', bowerBeamQty)
  if (bowerBeamInput) inputs.push(bowerBeamInput)

  const flitchPlateQty = totalFlitchPlatesCount || additionalWorks.flitch_plate_pairs || 0
  const flitchPlateInput = createLineInput(lookup, 'floor_joists_decking', 'flitch_plates_pair', flitchPlateQty)
  if (flitchPlateInput) inputs.push(flitchPlateInput)

  // Insulation — per-room with additional_works fallback
  const insulationArea = totalWarmlineInsulationArea || (additionalWorks.need_insulation ? (additionalWorks.warmline_insulation_area || totalFlooringArea) : 0)
  if (insulationArea > 0) {
    const insulationInput = createLineInput(lookup, 'floor_joists_decking', 'provide_insulation_to_suspended_flooring', insulationArea)
    if (insulationInput) inputs.push(insulationInput)
  }

  // === FLOORING INSTALLATION ===

  const flooringTypeToLineKey: Record<string, string> = {
    'weyrock_18mm': 'install_weyrock_flooring_18mm_m2',
    'weyrock_22mm': 'install_weyrock_flooring_22mm_m2',
    'std_tg_floorboards': 'install_std_tg_floorboards_m2',
    'victorian_tg_floorboards': 'install_victorian_tg_floorboards_m2',
    'engineered_flooring_sheet': 'install_engineered_flooring_sheet_m2',
  }

  for (const [flooringType, area] of Object.entries(flooringByType)) {
    const lineKey = flooringTypeToLineKey[flooringType]
    if (lineKey) {
      const flooringInput = createLineInput(lookup, 'floor_joists_decking', lineKey, area)
      if (flooringInput) inputs.push(flooringInput)
    }
  }

  // === TIMBER TREATMENTS ===

  // Fog subfloor
  const fogInput = createLineInput(lookup, 'timber_treatments', 'fog_subfloor_void_m2', totalFungalTreatmentArea)
  if (fogInput) inputs.push(fogInput)

  // Masonry sterilant (Wykabor 20 brush-applied to exposed masonry after timber removal)
  const masonrySterilantInput = createLineInput(lookup, 'timber_treatments', 'masonry_sterilant_wyakbor_20_brush_applied', totalMasonrySterilantArea)
  if (masonrySterilantInput) inputs.push(masonrySterilantInput)

  // Clear debris from sub-floor
  const clearDebrisInput = createLineInput(lookup, 'timber_treatments', 'clear_debris_from_sub_floor', totalClearSubFloorDebrisArea)
  if (clearDebrisInput) inputs.push(clearDebrisInput)

  // Protective treatment for new replacement timbers (DP-O)
  const protectiveTreatmentInput = createLineInput(lookup, 'timber_treatments', 'protective_treatment_following_new_timbers_installation_dp_o', totalProtectiveTreatmentArea)
  if (protectiveTreatmentInput) inputs.push(protectiveTreatmentInput)

  // Staircase fogging — open rear treads
  const staircaseOpenInput = createLineInput(lookup, 'timber_treatments', 'fogging_staircase_open_rear_treads_per_step', totalStaircaseOpenRearSteps)
  if (staircaseOpenInput) inputs.push(staircaseOpenInput)

  // Staircase fogging — closed rear treads (drill & plug)
  const staircaseClosedInput = createLineInput(lookup, 'timber_treatments', 'fogging_staircase_rear_closed_drill_and_plug_per_step', totalStaircaseClosedRearSteps)
  if (staircaseClosedInput) inputs.push(staircaseClosedInput)

  // === DIFFICULTY HOURS ===

  if (totalDifficultyHours > 0) {
    const difficultyInput = createLineInput(lookup, 'floor_joists_decking', 'difficulty_hours_additional_hours_if_required', totalDifficultyHours)
    if (difficultyInput) inputs.push(difficultyInput)
  }

  return inputs
}

// =============================================================================
// WOODWORM SURVEY MAPPING
// =============================================================================

/**
 * Map woodworm survey data to line inputs
 *
 * Area-driven with smart labour scaling (boarded area uses 1/43 multiplier).
 * Maps fogging, injection, and protective treatments.
 */
function mapWoodwormSurvey(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []

  // Filter rooms with woodworm issues
  const woodwormRooms = rooms.filter(r => r.issues_identified?.includes('woodworm'))
  if (woodwormRooms.length === 0) return inputs

  // Aggregate woodworm data
  let totalSprayFloorArea = 0
  let totalSprayTimberArea = 0
  let totalPasteTreatmentArea = 0
  let totalDifficultyHours = 0
  let totalWWStaircaseOpenRearSteps = 0
  let totalWWStaircaseClosedRearSteps = 0
  let totalLoftInsulationArea = 0
  let totalLiftingArea = 0
  let totalRelayingArea = 0

  for (const room of woodwormRooms) {
    const woodwormData = room.room_data?.woodworm as WoodwormRoomData | undefined
    if (!woodwormData) continue

    totalSprayFloorArea += woodwormData.spray_floor_area || 0
    totalSprayTimberArea += woodwormData.spray_timber_area || 0
    totalPasteTreatmentArea += woodwormData.paste_treatment_area || 0
    totalDifficultyHours += woodwormData.difficulty_hours || 0
    totalWWStaircaseOpenRearSteps += woodwormData.staircase_open_rear_steps || 0
    totalWWStaircaseClosedRearSteps += woodwormData.staircase_closed_rear_steps || 0
    totalLoftInsulationArea += woodwormData.loft_insulation_area || 0
    if (woodwormData.include_lifting_loft_insulation) {
      totalLiftingArea += woodwormData.loft_insulation_area || 0
    }
    if (woodwormData.include_relaying_loft_insulation) {
      totalRelayingArea += woodwormData.loft_insulation_area || 0
    }
  }

  // === TIMBER TREATMENTS ===

  // Fogging floor area
  const fogFloorInput = createLineInput(lookup, 'timber_treatments', 'fogging_floor_area', totalSprayFloorArea)
  if (fogFloorInput) inputs.push(fogFloorInput)

  // Fogging boarded area
  const fogBoardedInput = createLineInput(lookup, 'timber_treatments', 'fogging_boarded_area', totalSprayTimberArea)
  if (fogBoardedInput) inputs.push(fogBoardedInput)

  // Gel injection (paste treatment)
  const gelInjectionInput = createLineInput(lookup, 'timber_treatments', '401_gel_injection_100mm_centres_plug_with_dowel', totalPasteTreatmentArea)
  if (gelInjectionInput) inputs.push(gelInjectionInput)

  // Staircase fogging — open rear treads
  const wwStaircaseOpenInput = createLineInput(lookup, 'timber_treatments', 'fogging_staircase_open_rear_treads_per_step', totalWWStaircaseOpenRearSteps)
  if (wwStaircaseOpenInput) inputs.push(wwStaircaseOpenInput)

  // Staircase fogging — closed rear treads (drill & plug)
  const wwStaircaseClosedInput = createLineInput(lookup, 'timber_treatments', 'fogging_staircase_rear_closed_drill_and_plug_per_step', totalWWStaircaseClosedRearSteps)
  if (wwStaircaseClosedInput) inputs.push(wwStaircaseClosedInput)

  // Loft — fogging always included when area > 0; lifting/relaying only when toggled on
  if (totalLoftInsulationArea > 0) {
    const fogLoftInput = createLineInput(lookup, 'timber_treatments', 'fogging_loft_area_calculated_from_floor_area_of_loft', totalLoftInsulationArea)
    if (fogLoftInput) inputs.push(fogLoftInput)
  }

  if (totalLiftingArea > 0) {
    const liftInsulationInput = createLineInput(lookup, 'timber_treatments', 'lifting_loft_insulation', totalLiftingArea)
    if (liftInsulationInput) inputs.push(liftInsulationInput)
  }

  if (totalRelayingArea > 0) {
    const relayInsulationInput = createLineInput(lookup, 'timber_treatments', 'relaying_loft_insulation', totalRelayingArea)
    if (relayInsulationInput) inputs.push(relayInsulationInput)
  }

  // === DIFFICULTY HOURS ===

  if (totalDifficultyHours > 0) {
    const difficultyInput = createLineInput(lookup, 'floor_joists_decking', 'difficulty_hours_additional_hours_if_required', totalDifficultyHours)
    if (difficultyInput) inputs.push(difficultyInput)
  }

  return inputs
}

// =============================================================================
// SHARED/ADDITIONAL WORKS MAPPING
// =============================================================================

/**
 * Map additional works that apply across all survey types
 */
/**
 * Map type-specific additional works items.
 *
 * Only emits items that belong exclusively to one survey type (guarded by type
 * checks). Shared job-level items (airbricks, asbestos, plastering extras) are
 * handled by mapSharedAdditionalWorks which runs once.
 */
function mapTypeSpecificAdditionalWorks(
  additionalWorks: AdditionalWorks,
  lookup: TemplateLookup,
  surveyType: string
): LineInput[] {
  const inputs: LineInput[] = []

  // === DRAINS (damp only) ===

  if (surveyType === 'damp') {
    const acoDrainInput = createLineInput(lookup, 'drains', 'aco_drain_lm', additionalWorks.aco_drain_length || 0)
    if (acoDrainInput) inputs.push(acoDrainInput)

    const frenchDrainInput = createLineInput(lookup, 'drains', 'french_drain_lm', additionalWorks.french_drain_length || 0)
    if (frenchDrainInput) inputs.push(frenchDrainInput)
  }

  // === AQUABAN (damp only) ===

  if (surveyType === 'damp') {
    const aquabanInput = createLineInput(lookup, 'aquaban', 'aquaban_system', additionalWorks.aquaban_area || 0)
    if (aquabanInput) inputs.push(aquabanInput)
  }

  // === SPRAY TREATMENTS (timber, woodworm) ===

  if (surveyType === 'timber') {
    const sprayAreaInput = createLineInput(lookup, 'timber_treatments', 'fog_subfloor_void_m2', additionalWorks.spray_treatment_area || 0)
    if (sprayAreaInput) inputs.push(sprayAreaInput)
  }

  if (surveyType === 'woodworm') {
    const sprayAreaInput = createLineInput(lookup, 'timber_treatments', 'fogging_floor_area', additionalWorks.spray_treatment_area || 0)
    if (sprayAreaInput) inputs.push(sprayAreaInput)
  }

  return inputs
}

// =============================================================================
// SHARED ADDITIONAL WORKS (job-level items emitted once)
// =============================================================================

/**
 * Map additional works items that apply once per job regardless of survey types.
 *
 * Airbricks, asbestos testing, and plastering extras are property-level work —
 * they should only appear once even when multiple survey types are active.
 * Template keys vary by survey type, so the primary type determines which
 * template variant to use (priority: damp > timber > woodworm > condensation).
 */
function mapSharedAdditionalWorks(
  additionalWorks: AdditionalWorks,
  surveyTypesPresent: Set<string>,
  lookupCache: TemplateLookupCache
): { primaryType: string; inputs: LineInput[] } {
  // Determine primary type for template key selection
  let primaryType: string
  let lookup: TemplateLookup
  if (surveyTypesPresent.has('damp')) {
    primaryType = 'damp'
    lookup = lookupCache.damp
  } else if (surveyTypesPresent.has('timber')) {
    primaryType = 'timber'
    lookup = lookupCache.timber
  } else if (surveyTypesPresent.has('woodworm')) {
    primaryType = 'woodworm'
    lookup = lookupCache.woodworm
  } else {
    primaryType = 'condensation'
    lookup = lookupCache.condensation
  }

  const inputs: LineInput[] = []

  // === AIRBRICKS (line keys differ between damp and other survey types) ===

  const airbrickCleanKey = primaryType === 'damp'
    ? 'clean_out_airbrick'
    : 'clean_out_airbrickfit_new_face'
  const airbrickCleanInput = createLineInput(lookup, 'airbricks', airbrickCleanKey, additionalWorks.airbrick_clean_count || 0)
  if (airbrickCleanInput) inputs.push(airbrickCleanInput)

  const airbrickUpgradeKey = primaryType === 'damp'
    ? 'lift_upgrade_airbrick'
    : 'liftupgrade_existing_airbrickfit_new_face'
  const airbrickUpgradeInput = createLineInput(lookup, 'airbricks', airbrickUpgradeKey, additionalWorks.airbrick_upgrade_count || 0)
  if (airbrickUpgradeInput) inputs.push(airbrickUpgradeInput)

  const airbrickNewInput = createLineInput(lookup, 'airbricks', 'install_additional_airbrick', additionalWorks.airbrick_new_count || 0)
  if (airbrickNewInput) inputs.push(airbrickNewInput)

  // === ASBESTOS TESTING ===

  const asbestosInput = createLineInput(lookup, 'asbestos_testing', 'asbestos_testing', additionalWorks.asbestos_test_count || 0)
  if (asbestosInput) inputs.push(asbestosInput)

  // === PLASTERING EXTRAS (not for condensation-only surveys) ===

  if (primaryType !== 'condensation') {
    const stopBeadKey = primaryType === 'damp'
      ? 'plastering_stop_bead'
      : 'plastering_stop_bead_3m_length'
    const stopBeadInput = createLineInput(lookup, 'plastering', stopBeadKey, additionalWorks.stop_bead_count || 0)
    if (stopBeadInput) inputs.push(stopBeadInput)

    const cornerBead24Key = primaryType === 'damp'
      ? 'thin_coat_angle_2_4m'
      : 'plastering_thin_coat_anglecorner_bead_24m_length'
    const cornerBead24Input = createLineInput(lookup, 'plastering', cornerBead24Key, additionalWorks.corner_bead_24_count || 0)
    if (cornerBead24Input) inputs.push(cornerBead24Input)

    const cornerBead30Key = primaryType === 'damp'
      ? 'thin_coat_angle_3m'
      : 'plastering_thin_coat_anglecorner_bead_3m_length'
    const cornerBead30Input = createLineInput(lookup, 'plastering', cornerBead30Key, additionalWorks.corner_bead_30_count || 0)
    if (cornerBead30Input) inputs.push(cornerBead30Input)

    const difficultyKey = primaryType === 'damp'
      ? 'difficulty_hours_plastering'
      : 'difficulty_hours_fireplace_corners_etc'
    const plasteringDifficultyInput = createLineInput(lookup, 'plastering', difficultyKey, additionalWorks.difficulty_hours_plastering || 0)
    if (plasteringDifficultyInput) inputs.push(plasteringDifficultyInput)
  }

  return { primaryType, inputs }
}

// =============================================================================
// DEBRIS BAG CALCULATION HELPERS
// =============================================================================

/**
 * Calculate debris bags from damp strip-out work.
 * Matches workbook R34: SUM(all 5 strip-out areas) × 2 bags per m²
 */
function calcDampDebrisBags(rooms: SurveyRoomRow[]): number {
  const dampRooms = rooms.filter(r => r.issues_identified?.includes('damp'))
  let totalStripOutArea = 0

  for (const room of dampRooms) {
    const dampData = room.room_data?.damp as DampRoomData | undefined
    if (!dampData) continue

    totalStripOutArea += dampData.strip_out_plaster_area || 0
    totalStripOutArea += dampData.strip_out_stud_walls_area || 0
    totalStripOutArea += dampData.strip_out_ceilings_area || 0
    if (dampData.strip_existing_floor) {
      totalStripOutArea += dampData.strip_floor_area || 0
    }
    totalStripOutArea += dampData.sub_floor_area || 0
  }

  return totalStripOutArea > 0 ? Math.ceil(totalStripOutArea * 2) : 0
}

/**
 * Calculate debris bags from timber floor strip-out work.
 * Bags = ceil(total flooring area × 2 bags per m²)
 */
function calcTimberDebrisBags(rooms: SurveyRoomRow[]): number {
  const timberRooms = rooms.filter(r => r.issues_identified?.includes('timber_decay'))
  let totalFlooringArea = 0

  for (const room of timberRooms) {
    const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
    if (!timberData) continue

    totalFlooringArea += timberData.flooring_area || 0
  }

  return totalFlooringArea > 0 ? Math.ceil(totalFlooringArea * 2) : 0
}

// =============================================================================
// SITE PREPARATION MAPPING (job-level items emitted once)
// =============================================================================

/**
 * Map site preparation items that apply once per job regardless of survey types.
 *
 * Consolidates skip hire, antinox floor protection, bag & cart debris removal,
 * and licensed disposal into a single set of line items with combined quantities.
 */
function mapSitePreparation(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  surveyTypesPresent: Set<string>,
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []
  const additionalWorks = wizardData.additional_works || {}

  // === SKIP HIRE ===
  const skipCount = additionalWorks.skip_count || 0
  const skipInput = createLineInput(lookup, 'skip_hire', 'skip_hire', skipCount)
  if (skipInput) inputs.push(skipInput)

  // === ANTINOX FLOOR PROTECTION (not for condensation-only surveys) ===
  const hasNonCondensation = surveyTypesPresent.has('damp') ||
    surveyTypesPresent.has('timber') ||
    surveyTypesPresent.has('woodworm')

  if (hasNonCondensation) {
    const antinoxInput = createLineInput(lookup, 'preparatory_work', 'floor_protection_boards', additionalWorks.antinox_board_count || 0)
    if (antinoxInput) inputs.push(antinoxInput)
  }

  // === BAG & CART DEBRIS (combined across all survey types) ===
  let totalBags = 0
  if (surveyTypesPresent.has('damp')) {
    totalBags += calcDampDebrisBags(rooms)
  }
  if (surveyTypesPresent.has('timber')) {
    totalBags += calcTimberDebrisBags(rooms)
  }

  const bagCartInput = createLineInput(lookup, 'strip_out_disposal', 'bag_cart_debris', totalBags)
  if (bagCartInput) inputs.push(bagCartInput)

  // === LICENSED DISPOSAL (only if no skip hired — mutually exclusive) ===
  if (skipCount === 0 && totalBags > 0) {
    const disposalInput = createLineInput(lookup, 'strip_out_disposal', 'licensed_disposal', totalBags)
    if (disposalInput) inputs.push(disposalInput)
  }

  return inputs
}

// =============================================================================
// MAIN MAPPING FUNCTION
// =============================================================================

/**
 * Map complete survey data to line inputs for ALL survey types present
 *
 * A single survey can have rooms with different issue types (damp, condensation,
 * timber, woodworm). This function identifies which survey types are present and
 * generates line inputs for each type.
 *
 * @param wizardData - Top-level wizard data (site details, external inspection, additional works)
 * @param rooms - All survey rooms with their issue-specific data
 * @param lookupCache - Pre-loaded template lookups for all survey types
 * @returns Object mapping survey type to line inputs
 */
export function mapSurveyToLineInputs(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookupCache: TemplateLookupCache
): Record<string, LineInput[]> {
  const result: Record<string, LineInput[]> = {}

  // Determine which survey types are present
  const surveyTypesPresent = new Set<string>()
  for (const room of rooms) {
    for (const issueType of room.issues_identified || []) {
      if (issueType === 'damp') surveyTypesPresent.add('damp')
      else if (issueType === 'condensation') surveyTypesPresent.add('condensation')
      else if (issueType === 'timber_decay') surveyTypesPresent.add('timber')
      else if (issueType === 'woodworm') surveyTypesPresent.add('woodworm')
    }
  }

  const additionalWorks = wizardData.additional_works || {}

  // Map each survey type (room-level + type-specific additional works)
  if (surveyTypesPresent.has('damp')) {
    const inputs = mapDampSurvey(wizardData, rooms, lookupCache.damp)
    const typeSpecific = mapTypeSpecificAdditionalWorks(additionalWorks, lookupCache.damp, 'damp')
    result.damp = [...inputs, ...typeSpecific]
  }

  if (surveyTypesPresent.has('condensation')) {
    const inputs = mapCondensationSurvey(wizardData, rooms, lookupCache.condensation)
    const typeSpecific = mapTypeSpecificAdditionalWorks(additionalWorks, lookupCache.condensation, 'condensation')
    result.condensation = [...inputs, ...typeSpecific]
  }

  if (surveyTypesPresent.has('timber')) {
    const inputs = mapTimberSurvey(wizardData, rooms, lookupCache.timber)
    const typeSpecific = mapTypeSpecificAdditionalWorks(additionalWorks, lookupCache.timber, 'timber')
    result.timber = [...inputs, ...typeSpecific]
  }

  if (surveyTypesPresent.has('woodworm')) {
    const inputs = mapWoodwormSurvey(wizardData, rooms, lookupCache.woodworm)
    const typeSpecific = mapTypeSpecificAdditionalWorks(additionalWorks, lookupCache.woodworm, 'woodworm')
    result.woodworm = [...inputs, ...typeSpecific]
  }

  // Shared additional works: airbricks, asbestos, plastering extras — emitted once
  // Appended to the primary survey type's results for display under that tab
  const shared = mapSharedAdditionalWorks(additionalWorks, surveyTypesPresent, lookupCache)
  if (shared.inputs.length > 0 && result[shared.primaryType]) {
    result[shared.primaryType] = [...result[shared.primaryType], ...shared.inputs]
  }

  // Job-level items: skip hire, antinox, bag & cart, disposal — emitted once
  const sitePrep = mapSitePreparation(wizardData, rooms, surveyTypesPresent, lookupCache.site_preparation)
  if (sitePrep.length > 0) {
    result.site_preparation = sitePrep
  }

  return result
}

// =============================================================================
// CONVENIENCE FUNCTION
// =============================================================================

/**
 * Generate complete costing from survey data
 *
 * This is the main entry point for generating costs from a completed survey.
 * It handles loading templates, mapping data, and calculating costs for all
 * survey types present in the data.
 *
 * @param surveyId - The survey UUID (for future reference/caching)
 * @param wizardData - Top-level wizard data
 * @param rooms - All survey rooms
 * @returns Combined calculation results for all survey types
 */
export async function generateCostingFromSurvey(
  surveyId: string,
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[]
): Promise<Record<string, CalculationResult>> {
  // Load all template lookups
  const lookupCache = await loadAllTemplateLookups()

  // Map survey data to line inputs by survey type
  const lineInputsByType = mapSurveyToLineInputs(wizardData, rooms, lookupCache)

  // Calculate costs for each survey type
  const results: Record<string, CalculationResult> = {}

  for (const [surveyType, lineInputs] of Object.entries(lineInputsByType)) {
    if (lineInputs.length > 0) {
      const result = await calculateSurveyCosting(surveyType, lineInputs)
      results[surveyType] = result
    }
  }

  return results
}
