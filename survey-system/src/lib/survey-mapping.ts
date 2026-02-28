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
  const [damp, condensation, timber, woodworm] = await Promise.all([
    loadTemplateLookup('damp'),
    loadTemplateLookup('condensation'),
    loadTemplateLookup('timber'),
    loadTemplateLookup('woodworm')
  ])

  return { damp, condensation, timber, woodworm }
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
  let totalWallAreaWithWallpaper = 0
  let totalWallAreaWithoutWallpaper = 0
  let totalDpcLength = 0
  let dpcWallDepth: number | undefined
  let totalMembraneArea = 0
  let totalTankingArea = 0
  let totalFilletJointLength = 0
  let totalFloorArea = 0
  let totalStripFloorArea = 0
  let totalSubFloorArea = 0
  let totalStudWallArea = 0
  let totalPlasterboardArea = 0
  let totalSkimArea = 0
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
        totalWallAreaWithWallpaper += wallArea
      } else {
        totalWallAreaWithoutWallpaper += wallArea
      }

      totalRadiators += wall.radiator_count || 0
      totalSockets += wall.socket_count || 0
      totalSkirtingLength += wall.skirting_length || 0
    }

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
    } else if (dampData.wall_treatment === 'tanking') {
      totalTankingArea += dampData.tanking_area || 0
      totalFilletJointLength += dampData.fillet_joint_length || 0
    }

    // Floor treatment
    if (dampData.floor_treatment) {
      totalFloorArea += dampData.floor_area || 0
      if (dampData.strip_existing_floor) {
        totalStripFloorArea += dampData.strip_floor_area || 0
      }
      totalSubFloorArea += dampData.sub_floor_area || 0
    }

    // Plastering
    totalStudWallArea += dampData.stud_wall_area || 0
    totalPlasterboardArea += dampData.plasterboard_area || 0
    totalSkimArea += dampData.skim_area || 0

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

  // === STRIP OUT ===

  // Remove plaster from walls
  const stripoutArea = totalWallAreaWithWallpaper + totalWallAreaWithoutWallpaper
  const plasterRemovalInput = createLineInput(lookup, 'strip_out', 'remove_plaster_walls', stripoutArea)
  if (plasterRemovalInput) inputs.push(plasterRemovalInput)

  // Strip existing floor
  const stripFloorInput = createLineInput(lookup, 'strip_out', 'strip_timber_floor_gf', totalStripFloorArea)
  if (stripFloorInput) inputs.push(stripFloorInput)

  // Scrape subfloors
  const scrapeSubfloorInput = createLineInput(lookup, 'strip_out', 'scrape_subfloors', totalSubFloorArea)
  if (scrapeSubfloorInput) inputs.push(scrapeSubfloorInput)

  // Auto-cascading: Debris bags = strip-out area × 2 bags per m²
  const debrisBags = Math.ceil(stripoutArea * 2)
  const debrisInput = createLineInput(lookup, 'strip_out', 'bag_cart_debris', debrisBags)
  if (debrisInput) inputs.push(debrisInput)

  // Disposal (tiered formula - handled by pricing engine)
  const disposalInput = createLineInput(lookup, 'strip_out', 'licensed_disposal', debrisBags)
  if (disposalInput) inputs.push(disposalInput)

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

  return inputs
}

// =============================================================================
// CONDENSATION SURVEY MAPPING
// =============================================================================

/**
 * Map condensation survey data to line inputs
 *
 * Room-count driven rather than area-based. Maps PIV units, fans,
 * humidistat vents, and mould treatment based on room selections.
 */
function mapCondensationSurvey(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  lookup: TemplateLookup
): LineInput[] {
  const inputs: LineInput[] = []
  const additionalWorks = wizardData.additional_works || {}

  // Filter rooms with condensation issues
  const condensationRooms = rooms.filter(r => r.issues_identified?.includes('condensation'))
  if (condensationRooms.length === 0 && !additionalWorks.piv_count) return inputs

  // Aggregate condensation data
  let totalMouldArea = 0
  let fanCount = 0

  for (const room of condensationRooms) {
    const condData = room.room_data?.condensation as CondensationRoomData | undefined
    if (!condData) continue

    if (condData.fan_recommended) {
      fanCount += condData.fan_count || 1
    }

    // Mould severity affects area
    if (condData.black_mould_present && condData.mould_severity) {
      const areaBySeverity = {
        light: 3,
        moderate: 6,
        severe: 12
      }
      totalMouldArea += areaBySeverity[condData.mould_severity] || 6
    }
  }

  // === PIV UNITS ===

  const pivCount = additionalWorks.piv_count || 0
  const pivType = additionalWorks.piv_type || 'none'

  if (pivCount > 0 && pivType !== 'none') {
    if (pivType === 'loft_heated' || pivType === 'loft_unheated') {
      // Determine PIV line key based on heated vs unheated selection
      const pivLineKey = pivType === 'loft_unheated'
        ? 'va_pozidry_loft_unit_unheated'
        : 'va_pozidry_loft_unit_heated'

      const pivInput = createLineInput(lookup, 'piv_loft', pivLineKey, pivCount)
      if (pivInput) inputs.push(pivInput)

      // Electrical pack per PIV
      if (additionalWorks.piv_electrical_pack) {
        const electricalInput = createLineInput(lookup, 'piv_loft', 'electrical_pack_fused_spur_cable_jb', pivCount)
        if (electricalInput) inputs.push(electricalInput)
      }

      // Sarkvents
      const sarkventCount = additionalWorks.sarkvents_count || 0
      if (sarkventCount > 0) {
        const sarkventInput = createLineInput(lookup, 'piv_loft', 'sarkvents', sarkventCount)
        if (sarkventInput) inputs.push(sarkventInput)
      }
    } else if (pivType === 'wall_mounted') {
      // Wall-mounted PIV — ducting components handled in the ducting section below
      // TODO: Add wall-mounted PIV unit line item when template is available
    }
  }

  // === DUCTING COMPONENTS ===

  for (const component of additionalWorks.ducting_components || []) {
    let lineKey = ''
    switch (component.type) {
      case 'flexible_duct':
        lineKey = 'ducting_insulated_flexi_3m_length'
        break
      case 'rigid_duct':
        lineKey = 'ducting_round_1m'
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
    }

    if (lineKey) {
      const ductInput = createLineInput(lookup, 'piv_wall', lineKey, component.count)
      if (ductInput) inputs.push(ductInput)
    }
  }

  // === HUMIDISTAT FANS ===

  if (fanCount > 0) {
    const fanInput = createLineInput(lookup, 'humidistat_fan', 'trickle_and_boost_humidistat_fan_greenwood', fanCount)
    if (fanInput) inputs.push(fanInput)

    // Electrical pack per fan
    const fanElectricalCount = additionalWorks.fan_electrical_pack_total || fanCount
    const fanElectricalInput = createLineInput(lookup, 'humidistat_fan', 'electrical_pack_fused_spur_cable_jb_humidistat_fan', fanElectricalCount)
    if (fanElectricalInput) inputs.push(fanElectricalInput)

    // Grilles
    const grilleCount = additionalWorks.fan_grille_count || fanCount
    const grilleInput = createLineInput(lookup, 'humidistat_fan', 'grille_humidistat_fan', grilleCount)
    if (grilleInput) inputs.push(grilleInput)

    // Core holes
    const coreHoleCount = additionalWorks.fan_core_hole_count || fanCount
    const coreHoleInput = createLineInput(lookup, 'humidistat_fan', 'diamond_core_107mm_hole_humidistat_fan', coreHoleCount)
    if (coreHoleInput) inputs.push(coreHoleInput)
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
  const joistEntries: { size: string; totalLength: number }[] = []

  for (const room of timberRooms) {
    const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
    if (!timberData) continue

    // Fungal treatment area
    totalFungalTreatmentArea += timberData.fungal_treatment_area || 0

    // Flooring area
    totalFlooringArea += timberData.flooring_area || 0

    // Ceiling area (if affected)
    if (timberData.ceiling_affected) {
      totalCeilingArea += timberData.ceiling_area || 0
    }

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

  // Plaster removal (walls)
  const plasterRemovalArea = totalCeilingArea // Simplified assumption
  const plasterRemovalInput = createLineInput(lookup, 'strip_out', 'remove_plasterrender_walls', plasterRemovalArea)
  if (plasterRemovalInput) inputs.push(plasterRemovalInput)

  // Strip floor
  const stripFloorInput = createLineInput(lookup, 'strip_out', 'strip_out_existing_timber_floor_gf', totalFlooringArea)
  if (stripFloorInput) inputs.push(stripFloorInput)

  // Debris removal
  const debrisBags = Math.ceil(totalFlooringArea * 2)
  const debrisInput = createLineInput(lookup, 'strip_out', 'bag_up_debris_cart_outside', debrisBags)
  if (debrisInput) inputs.push(debrisInput)

  const disposalInput = createLineInput(lookup, 'strip_out', 'disposal_via_licensed_transfer_agent', debrisBags)
  if (disposalInput) inputs.push(disposalInput)

  // === JOISTS ===

  for (const joistEntry of joistEntries) {
    // Map size to line key
    const sizeMap: Record<string, string> = {
      '4x2': 'joists_100x50',
      '5x2': 'joists_125x50',
      '6x2': 'joists_150x50',
      '7x2': 'joists_175x50',
      '8x2': 'joists_200x50',
      '9x2': 'joists_225x50'
    }

    const lineKey = sizeMap[joistEntry.size]
    if (lineKey) {
      const joistInput = createLineInput(lookup, 'floor_joists_decking', lineKey, joistEntry.totalLength)
      if (joistInput) inputs.push(joistInput)
    }
  }

  // Joist extras from additional works
  const joist_endwrapInput = createLineInput(lookup, 'floor_joists_decking', 'treat_endwrap_joist', additionalWorks.joist_endwrap_count || 0)
  if (joist_endwrapInput) inputs.push(joist_endwrapInput)

  const wallPlateInput = createLineInput(lookup, 'floor_joists_decking', 'wall_plate_100x25', additionalWorks.wall_plate_count || 0)
  if (wallPlateInput) inputs.push(wallPlateInput)

  const bowerBeamInput = createLineInput(lookup, 'floor_joists_decking', 'bower_beams', additionalWorks.bower_beam_pairs || 0)
  if (bowerBeamInput) inputs.push(bowerBeamInput)

  const flitchPlateInput = createLineInput(lookup, 'floor_joists_decking', 'flitch_plates', additionalWorks.flitch_plate_pairs || 0)
  if (flitchPlateInput) inputs.push(flitchPlateInput)

  // Insulation
  if (additionalWorks.need_insulation) {
    const insulationArea = additionalWorks.warmline_insulation_area || totalFlooringArea
    const insulationInput = createLineInput(lookup, 'floor_joists_decking', 'insulation_suspended_flooring', insulationArea)
    if (insulationInput) inputs.push(insulationInput)
  }

  // === TIMBER TREATMENTS ===

  // Fog subfloor
  const fogInput = createLineInput(lookup, 'timber_treatments', 'fog_subfloor_void_m2', totalFungalTreatmentArea)
  if (fogInput) inputs.push(fogInput)

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

  for (const room of woodwormRooms) {
    const woodwormData = room.room_data?.woodworm as WoodwormRoomData | undefined
    if (!woodwormData) continue

    totalSprayFloorArea += woodwormData.spray_floor_area || 0
    totalSprayTimberArea += woodwormData.spray_timber_area || 0
    totalPasteTreatmentArea += woodwormData.paste_treatment_area || 0
    totalDifficultyHours += woodwormData.difficulty_hours || 0
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
function mapAdditionalWorks(
  additionalWorks: AdditionalWorks,
  lookup: TemplateLookup,
  surveyType: string
): LineInput[] {
  const inputs: LineInput[] = []

  // === AIRBRICKS (common to all types) ===

  const airbrickCleanInput = createLineInput(lookup, 'airbricks', 'clean_out_airbrick', additionalWorks.airbrick_clean_count || 0)
  if (airbrickCleanInput) inputs.push(airbrickCleanInput)

  const airbrickUpgradeInput = createLineInput(lookup, 'airbricks', 'lift_upgrade_airbrick', additionalWorks.airbrick_upgrade_count || 0)
  if (airbrickUpgradeInput) inputs.push(airbrickUpgradeInput)

  const airbrickNewInput = createLineInput(lookup, 'airbricks', 'install_additional_airbrick', additionalWorks.airbrick_new_count || 0)
  if (airbrickNewInput) inputs.push(airbrickNewInput)

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

  // === ASBESTOS TESTING (all types) ===

  const asbestosInput = createLineInput(lookup, 'asbestos_testing', 'asbestos_testing', additionalWorks.asbestos_test_count || 0)
  if (asbestosInput) inputs.push(asbestosInput)

  // === SKIP HIRE (all types) ===

  const skipInput = createLineInput(lookup, 'skip_hire', 'skip_hire', additionalWorks.skip_count || 0)
  if (skipInput) inputs.push(skipInput)

  // === PLASTERING EXTRAS (damp, timber, woodworm) ===

  if (surveyType !== 'condensation') {
    const stopBeadInput = createLineInput(lookup, 'plastering', 'plastering_stop_bead', additionalWorks.stop_bead_count || 0)
    if (stopBeadInput) inputs.push(stopBeadInput)

    const cornerBead24Input = createLineInput(lookup, 'plastering', 'thin_coat_angle_2_4m', additionalWorks.corner_bead_24_count || 0)
    if (cornerBead24Input) inputs.push(cornerBead24Input)

    const cornerBead30Input = createLineInput(lookup, 'plastering', 'thin_coat_angle_3m', additionalWorks.corner_bead_30_count || 0)
    if (cornerBead30Input) inputs.push(cornerBead30Input)

    const plasteringDifficultyInput = createLineInput(lookup, 'plastering', 'difficulty_hours_plastering', additionalWorks.difficulty_hours_plastering || 0)
    if (plasteringDifficultyInput) inputs.push(plasteringDifficultyInput)
  }

  // === SPRAY TREATMENTS (timber, woodworm) ===

  if (surveyType === 'timber' || surveyType === 'woodworm') {
    const sprayAreaInput = createLineInput(lookup, 'spray_treatments', 'fog_subfloor_antifungal', additionalWorks.spray_treatment_area || 0)
    if (sprayAreaInput) inputs.push(sprayAreaInput)

    const sprayDifficultyInput = createLineInput(lookup, 'spray_treatments', 'difficulty_hours_spray', additionalWorks.spray_difficulty_hours || 0)
    if (sprayDifficultyInput) inputs.push(sprayDifficultyInput)
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

  // Map each survey type
  if (surveyTypesPresent.has('damp')) {
    const inputs = mapDampSurvey(wizardData, rooms, lookupCache.damp)
    const additionalInputs = mapAdditionalWorks(wizardData.additional_works || {}, lookupCache.damp, 'damp')
    result.damp = [...inputs, ...additionalInputs]
  }

  if (surveyTypesPresent.has('condensation')) {
    const inputs = mapCondensationSurvey(wizardData, rooms, lookupCache.condensation)
    const additionalInputs = mapAdditionalWorks(wizardData.additional_works || {}, lookupCache.condensation, 'condensation')
    result.condensation = [...inputs, ...additionalInputs]
  }

  if (surveyTypesPresent.has('timber')) {
    const inputs = mapTimberSurvey(wizardData, rooms, lookupCache.timber)
    const additionalInputs = mapAdditionalWorks(wizardData.additional_works || {}, lookupCache.timber, 'timber')
    result.timber = [...inputs, ...additionalInputs]
  }

  if (surveyTypesPresent.has('woodworm')) {
    const inputs = mapWoodwormSurvey(wizardData, rooms, lookupCache.woodworm)
    const additionalInputs = mapAdditionalWorks(wizardData.additional_works || {}, lookupCache.woodworm, 'woodworm')
    result.woodworm = [...inputs, ...additionalInputs]
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
