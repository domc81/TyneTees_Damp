// =============================================================================
// Report Generator — Populates report templates with survey data
// Orchestrates boilerplate selection, data population, and LLM narrative generation
// =============================================================================

import type {
  ReportTemplate,
  ReportTemplateSection,
  ReportSection,
  SurveyReport,
  BoilerplateVariant,
} from '@/types/survey-report.types'
import type {
  SurveyWizardData,
  SurveyRoomRow,
  BuildingDefect,
} from '@/types/survey-wizard.types'
import { BUILDING_DEFECTS } from '@/types/survey-wizard.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'
import { loadWizardData } from './survey-wizard-data'
import { loadSurveyPhotos, getPhotoUrl } from './survey-photo-service'
import { generateCostingFromSurvey } from './survey-mapping'
import { getSupabase } from './supabase-client'

// =============================================================================
// Template Loading
// =============================================================================

/**
 * Load the default report template for a survey type
 */
export async function loadDefaultTemplate(
  surveyType: string
): Promise<ReportTemplate | null> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('report_templates')
    .select('*')
    .eq('survey_type', surveyType)
    .eq('is_default', true)
    .single()

  if (error) {
    console.error(`Error loading template for ${surveyType}:`, error)
    return null
  }

  return data as ReportTemplate
}

// =============================================================================
// Condition Evaluation — Maps survey data to boilerplate condition keys
// =============================================================================

/**
 * Evaluate all condition keys used in boilerplate variants
 * Returns a flat Record<string, boolean> mapping condition keys to true/false
 */
export function evaluateConditions(
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[]
): Record<string, boolean> {
  const conditions: Record<string, boolean> = {}

  // Always-true condition
  conditions.always = true

  // === EXTERNAL INSPECTION CONDITIONS ===
  const ext = wizardData.external_inspection

  conditions.no_defects = !ext?.building_defects_found
  conditions.defects_found = ext?.building_defects_found === true
  conditions.defects_warning_cause = ext?.building_defects_found === true
  conditions.defects_warning_general = ext?.building_defects_found === true
  conditions.wall_tie_concern = ext?.wall_tie_concern === true
  conditions.cracking_concern = ext?.cracking_concern === true

  // Building defect types (for condensation reports)
  conditions.see_damp_report = false // Set manually if damp report exists

  // === PROPERTY TYPE CONDITIONS ===
  conditions.flat_lease_warning =
    wizardData.site_details?.property_type === 'flat'

  // === DPC CONDITIONS ===
  const hasDpcRequired = rooms.some(
    (r) => r.room_data?.damp?.dpc_required === true
  )
  conditions.has_dpc_evidence = hasDpcRequired
  conditions.dpc_required = hasDpcRequired
  conditions.dpc_original_exists = false // Requires surveyor input
  conditions.dpc_chemical_exists = false // Requires surveyor input
  conditions.dpc_not_visible = false // Requires surveyor input
  conditions.dpc_previous_work = false // Requires surveyor input
  conditions.dpc_check_guarantee = false // Requires surveyor input
  conditions.dpc_proposal = hasDpcRequired

  // === GROUND LEVEL CONDITIONS ===
  const additionalWorks = wizardData.additional_works
  conditions.no_ground_issues =
    !additionalWorks?.aco_drain_length && !additionalWorks?.french_drain_length
  conditions.high_ground_levels =
    additionalWorks?.aco_drain_length! > 0 ||
    additionalWorks?.french_drain_length! > 0
  conditions.ground_falling_towards = false // Requires surveyor judgment
  conditions.ground_recommendation =
    conditions.high_ground_levels || conditions.ground_falling_towards
  conditions.aco_drain_recommended = additionalWorks?.aco_drain_length! > 0
  conditions.french_drain_recommended =
    additionalWorks?.french_drain_length! > 0
  conditions.lower_ground_levels = conditions.high_ground_levels

  // === AIRBRICK CONDITIONS ===
  const hasAirbrickWork =
    additionalWorks?.airbrick_clean_count! > 0 ||
    additionalWorks?.airbrick_upgrade_count! > 0 ||
    additionalWorks?.airbrick_new_count! > 0

  conditions.no_airbricks = !hasAirbrickWork
  conditions.airbricks_not_inspectable = false // Requires surveyor input
  conditions.airbricks_present = hasAirbrickWork
  conditions.ventilation_sufficient = false // Requires moisture readings
  conditions.ventilation_insufficient = hasAirbrickWork
  conditions.airbricks_blocked = additionalWorks?.airbrick_clean_count! > 0
  conditions.airbricks_too_low = additionalWorks?.airbrick_upgrade_count! > 0
  conditions.proposal_remove_clean = additionalWorks?.airbrick_clean_count! > 0
  conditions.proposal_upgrade = additionalWorks?.airbrick_upgrade_count! > 0
  conditions.proposal_install_new = additionalWorks?.airbrick_new_count! > 0
  conditions.proposal_benefit = hasAirbrickWork
  conditions.proposal_lift = additionalWorks?.airbrick_upgrade_count! > 0
  conditions.lift_benefit = additionalWorks?.airbrick_upgrade_count! > 0
  conditions.no_works_required = !hasAirbrickWork

  // === CONDENSATION CONDITIONS ===
  const condensationRooms = rooms.filter((r) =>
    r.issues_identified?.includes('condensation')
  )
  const hasCondensation = condensationRooms.length > 0

  conditions.condensation_on_windows = condensationRooms.some(
    (r) => r.room_data?.condensation?.condensation_on_windows === true
  )
  conditions.low_temp_dew_points = hasCondensation // Generic assumption
  conditions.black_mould = condensationRooms.some(
    (r) => r.room_data?.condensation?.black_mould_present === true
  )
  conditions.lack_ventilation = hasCondensation
  conditions.poor_insulation =
    wizardData.site_details?.construction_type === 'solid_brick'
  conditions.humidity_reading = condensationRooms.some(
    (r) => r.room_data?.condensation?.humidity_reading !== undefined
  )

  // Condensation causes
  conditions.cause_ventilation = hasCondensation
  conditions.cause_insulation = conditions.poor_insulation
  conditions.cause_dampness = rooms.some((r) =>
    r.issues_identified?.includes('damp')
  )
  conditions.cause_elevated_humidity = hasCondensation
  conditions.cause_insufficient_extraction = hasCondensation

  // PIV/Fan conditions
  const pivCount = additionalWorks?.piv_count || 0
  const fanCount = condensationRooms.reduce(
    (sum, r) => sum + (r.room_data?.condensation?.fan_count || 0),
    0
  )

  conditions.piv_selected = pivCount > 0
  conditions.piv_loft_heated =
    pivCount > 0 && additionalWorks?.piv_type === 'nuaire_drimaster_eco'
  conditions.piv_loft_unheated =
    pivCount > 0 && additionalWorks?.piv_type === 'nuaire_drimaster_2000'
  conditions.piv_loft_diffusor = pivCount > 0
  conditions.fans_humidistat = fanCount > 0
  conditions.fans_upgrade = fanCount > 0
  conditions.electrical_fittings = pivCount > 0 || fanCount > 0
  conditions.mould_treatment = conditions.black_mould
  conditions.asbestos_test = additionalWorks?.asbestos_test_count! > 0
  conditions.electrical_not_current = false // Requires surveyor judgment

  // === TIMBER/WOODWORM CONDITIONS ===
  const timberRooms = rooms.filter((r) =>
    r.issues_identified?.includes('timber_decay')
  )
  const woodwormRooms = rooms.filter((r) =>
    r.issues_identified?.includes('woodworm')
  )

  const hasFungalFindings = timberRooms.some(
    (r) => r.room_data?.timber_decay?.fungal_findings?.length! > 0
  )
  const hasWoodworm = woodwormRooms.length > 0

  conditions.issue_woodworm = hasWoodworm || hasFungalFindings
  conditions.issue_wet_rot = timberRooms.some(
    (r) => r.room_data?.timber_decay?.fungal_findings?.includes('wet_rot')
  )
  conditions.issue_dry_rot = timberRooms.some(
    (r) => r.room_data?.timber_decay?.fungal_findings?.includes('dry_rot')
  )
  conditions.issue_woodboring_weevil = false // Specific finding
  conditions.issue_high_moisture = timberRooms.some(
    (r) => r.room_data?.timber_decay?.sub_floor_ventilation === 'inadequate'
  )

  conditions.fogging_proposal = hasFungalFindings
  conditions.timbers_at_risk_intro = hasFungalFindings

  // Room-level conditions (used in repeating sections)
  conditions.no_timber_defects = timberRooms.length === 0
  conditions.timber_defects_found = timberRooms.length > 0
  conditions.timber_defects_found_with_report = false // Separate report attached

  // Woodworm specific
  conditions.no_damage = woodwormRooms.length === 0
  conditions.historic_attack = woodwormRooms.some(
    (r) => r.room_data?.woodworm?.infestation_status === 'historic'
  )
  conditions.active_infestation = woodwormRooms.some(
    (r) => r.room_data?.woodworm?.infestation_status === 'active'
  )
  conditions.infestation_areas_intro = hasWoodworm

  // Proposals
  conditions.no_treatment =
    woodwormRooms.length === 0 && timberRooms.length === 0
  conditions.treatment_header = hasWoodworm || hasFungalFindings
  conditions.proposal_discrete_openings = hasWoodworm
  conditions.proposal_fogging = hasWoodworm
  conditions.proposal_dry_rot = conditions.issue_dry_rot
  conditions.proposal_wet_rot = conditions.issue_wet_rot
  conditions.proposal_wet_rot_weevil = conditions.issue_woodboring_weevil
  conditions.proposal_woodworm = hasWoodworm

  // Treatment schedules
  conditions.woodworm_treatment = hasWoodworm
  conditions.dry_rot_treatment = conditions.issue_dry_rot
  conditions.wet_rot_treatment = conditions.issue_wet_rot
  conditions.wet_rot_weevil_treatment = conditions.issue_woodboring_weevil

  // === INTERNAL INSPECTION (DAMP) ===
  const dampRooms = rooms.filter((r) => r.issues_identified?.includes('damp'))

  conditions.non_destructive_notice = true // Always shown for damp
  conditions.damp_timber_risk = dampRooms.length > 0
  conditions.destructive_permission_template = dampRooms.length > 0
  conditions.no_permission_negotiate = false // User choice
  conditions.no_permission_arrange_later = false // User choice

  // Wall inspections
  conditions.inspection_method = dampRooms.length > 0
  conditions.plaster_degradation = dampRooms.some((r) =>
    r.room_data?.damp?.walls?.some((w: any) => w.has_wallpaper || w.moisture_readings?.length > 0)
  )
  conditions.defect_shadow_bands = false // Requires surveyor observation
  conditions.defect_salting = false // Requires surveyor observation
  conditions.defect_loss_of_key = false // Requires surveyor observation
  conditions.no_plaster_degradation = !conditions.plaster_degradation
  conditions.walls_not_inspectable = false // Requires surveyor input

  // Proposals (walls)
  conditions.proposal_header = dampRooms.length > 0
  conditions.proposal_remove_radiators = dampRooms.some((r) =>
    r.room_data?.damp?.walls?.some((w: any) => (w.radiator_count || 0) > 0)
  )
  conditions.proposal_remove_sockets = dampRooms.some((r) =>
    r.room_data?.damp?.walls?.some((w: any) => (w.socket_count || 0) > 0)
  )
  conditions.proposal_remove_skirting = dampRooms.some((r) =>
    r.room_data?.damp?.walls?.some((w: any) => (w.skirting_length || 0) > 0)
  )
  conditions.proposal_strip_plaster = conditions.plaster_degradation
  conditions.proposal_strip_wallpaper = dampRooms.some((r) =>
    r.room_data?.damp?.walls?.some((w: any) => w.has_wallpaper === true)
  )
  conditions.proposal_install_dpc_system = hasDpcRequired
  conditions.proposal_fillet_seal = dampRooms.some(
    (r) => r.room_data?.damp?.wall_treatment === 'membrane'
  )
  conditions.proposal_debris_disposal = dampRooms.length > 0

  // Floor conditions
  conditions.timber_floors_heading = dampRooms.some(
    (r) => r.room_data?.damp?.floor_treatment !== undefined
  )
  conditions.solid_floors_excluded = true // Generic notice
  conditions.solid_floor_damp_found = dampRooms.some(
    (r) => r.room_data?.damp?.floor_treatment === 'resin_membrane'
  )
  conditions.solid_floor_proposal = conditions.solid_floor_damp_found

  // Obstructions
  conditions.non_accessible = false // Requires surveyor input
  conditions.obstruction_polished_floor = false
  conditions.obstruction_laminate = false
  conditions.obstruction_carpet = false
  conditions.obstruction_ceramic = false
  conditions.obstruction_furniture = false

  return conditions
}

// =============================================================================
// Boilerplate Selection
// =============================================================================

/**
 * Select the appropriate boilerplate text based on conditions
 * Returns the text of the first matching variant, or empty string if none match
 */
export function selectBoilerplate(
  variants: BoilerplateVariant[] | undefined,
  conditions: Record<string, boolean>
): string {
  if (!variants || variants.length === 0) {
    return ''
  }

  for (const variant of variants) {
    // Special case: "always" condition always matches
    if (variant.condition === 'always') {
      return variant.text
    }

    // Check if condition is true
    if (conditions[variant.condition] === true) {
      return variant.text
    }
  }

  return ''
}

// =============================================================================
// Data Formatting Helpers
// =============================================================================

/**
 * Get human-readable label for a building defect key
 */
function getDefectLabel(defectKey: string): string {
  const defect = BUILDING_DEFECTS.find((d) => d.value === defectKey)
  return defect?.label || defectKey.replace(/_/g, ' ')
}

/**
 * Format building defects array as readable labels
 */
function formatDefects(defects: string[] | undefined): string[] {
  if (!defects || defects.length === 0) return []
  return defects.map((d) => getDefectLabel(d))
}

// =============================================================================
// Data Population
// =============================================================================

/**
 * Populate a data section with structured survey data
 */
function populateDataSection(
  section: ReportTemplateSection,
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  photos: SurveyPhoto[],
  costingResults: any,
  customerData?: any,
  surveyorData?: any
): Partial<ReportSection> {
  const data: Record<string, unknown> = {}
  const sectionPhotos: string[] = []

  // === CUSTOMER DATA (for cover section) ===
  if (customerData && section.key === 'cover') {
    data.client_name = `${customerData.first_name} ${customerData.last_name}`
    data.site_address = customerData.address_line1
    if (customerData.address_line2) {
      data.site_address_line2 = customerData.address_line2
    }
    data.site_city = customerData.city
    if (customerData.county) {
      data.site_county = customerData.county
    }
    data.site_postcode = customerData.postcode
  }

  // === SURVEYOR DATA (for signature section) ===
  if (surveyorData && section.key === 'surveyor_signature') {
    data.surveyor_name = `${surveyorData.first_name} ${surveyorData.last_name}`
    if (surveyorData.qualifications) {
      data.surveyor_credentials = surveyorData.qualifications
    }
    if (surveyorData.job_title) {
      data.surveyor_title = surveyorData.job_title
    }
  }

  // Extract data fields from wizard data
  if (section.data_fields) {
    for (const field of section.data_fields) {
      // Site details
      if (wizardData.site_details && field in wizardData.site_details) {
        data[field] = (wizardData.site_details as any)[field]
      }

      // External inspection
      if (
        wizardData.external_inspection &&
        field in wizardData.external_inspection
      ) {
        let value = (wizardData.external_inspection as any)[field]

        // Format building defects as readable labels
        if (field === 'building_defects' && Array.isArray(value)) {
          value = formatDefects(value)
        }

        data[field] = value
      }

      // Additional works
      if (wizardData.additional_works && field in wizardData.additional_works) {
        data[field] = (wizardData.additional_works as any)[field]
      }

      // Room-level data (aggregate)
      if (field === 'rooms') {
        data[field] = rooms
      }
    }
  }

  // Match photos to section
  if (section.photo_categories) {
    for (const category of section.photo_categories) {
      const matchingPhotos = photos.filter((p) => p.category === category)
      sectionPhotos.push(...matchingPhotos.map((p) => p.id))
    }
  }

  // Costing data (for proposals section)
  if (section.content_source === 'costing_data' && costingResults) {
    data.costing_sections = costingResults.sections || []
    data.costing_lines = costingResults.lines || []
    data.total_cost = costingResults.totalCost || 0
  }

  return {
    data,
    photos: sectionPhotos,
  }
}

// =============================================================================
// LLM Context Building
// =============================================================================

/**
 * Build rich context string for LLM generation
 */
function buildLLMContext(
  sectionKey: string,
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  photos: SurveyPhoto[]
): string {
  const contextParts: string[] = []

  // Basic property context (always include)
  if (wizardData.site_details) {
    const sd = wizardData.site_details
    contextParts.push(
      `Property: ${sd.property_type || 'Unknown'}, ${sd.construction_type?.replace(/_/g, ' ') || 'Unknown construction'}, built ${sd.approx_build_year || 'Unknown year'}.`
    )
    if (sd.reported_defect) {
      contextParts.push(`Reported problem: ${sd.reported_defect}.`)
    }
  }

  // Section-specific context
  if (sectionKey === 'room_findings' || sectionKey === 'internal_inspection') {
    // Room-by-room findings
    if (rooms.length > 0) {
      contextParts.push(`\nRooms inspected: ${rooms.length} (${rooms.map(r => r.name).join(', ')}).`)

      for (const room of rooms) {
        contextParts.push(`\n=== ${room.name} (${room.floor_level || 'Unknown floor'}) ===`)

        if (room.issues_identified && room.issues_identified.length > 0) {
          contextParts.push(`Issues: ${room.issues_identified.join(', ')}`)

          // Damp data
          if (room.room_data?.damp) {
            const damp = room.room_data.damp as any
            if (damp.walls && Array.isArray(damp.walls)) {
              contextParts.push(`Damp findings: ${damp.walls.length} affected wall(s).`)
              for (const wall of damp.walls) {
                const wallInfo = []
                wallInfo.push(`${wall.name || 'Wall'}: length ${wall.length || 0}m, height ${wall.height || 0}m, area ${wall.area || 0}m²`)
                if (wall.has_skirting) wallInfo.push('Skirting present')
                if (wall.treatment) wallInfo.push(`Treatment: ${wall.treatment}`)
                if (wall.moisture_readings && wall.moisture_readings.length > 0) {
                  wallInfo.push(`Moisture readings: ${wall.moisture_readings.join('%, ')}%`)
                }
                contextParts.push(`- ${wallInfo.join('. ')}.`)
              }
            }
            if (damp.dpc_required) contextParts.push(`DPC required: yes.`)
            if (damp.floor_treatment) {
              contextParts.push(`Floor treatment: ${damp.floor_treatment.replace(/_/g, ' ')}.`)
            }
          }

          // Condensation data
          if (room.room_data?.condensation) {
            const cond = room.room_data.condensation as any
            const condInfo = []
            if (cond.condensation_on_windows) condInfo.push('condensation on windows')
            if (cond.black_mould_present) condInfo.push('black mould present')
            if (cond.humidity_reading) condInfo.push(`humidity ${cond.humidity_reading}%`)
            if (cond.fan_count) condInfo.push(`${cond.fan_count} fan(s) needed`)
            if (condInfo.length > 0) {
              contextParts.push(`Condensation findings: ${condInfo.join(', ')}.`)
            }
          }

          // Timber data
          if (room.room_data?.timber_decay) {
            const timber = room.room_data.timber_decay as any
            if (timber.fungal_findings && timber.fungal_findings.length > 0) {
              contextParts.push(`Timber findings: ${timber.fungal_findings.join(', ')}.`)
            }
            if (timber.sub_floor_ventilation) {
              contextParts.push(`Sub-floor ventilation: ${timber.sub_floor_ventilation}.`)
            }
          }

          // Woodworm data
          if (room.room_data?.woodworm) {
            const ww = room.room_data.woodworm as any
            if (ww.infestation_status) {
              contextParts.push(`Woodworm: ${ww.infestation_status} infestation.`)
            }
            if (ww.species_identified) {
              contextParts.push(`Species: ${ww.species_identified}.`)
            }
          }
        }

        // Photo context
        const roomPhotos = photos.filter(p => p.room_id === room.id)
        if (roomPhotos.length > 0) {
          contextParts.push(`Photos taken: ${roomPhotos.length} (${roomPhotos.map(p => p.category || 'general').join(', ')})`)
        }
      }
    }
  }

  if (sectionKey === 'external_inspection') {
    // External findings
    if (wizardData.external_inspection) {
      const ext = wizardData.external_inspection
      if (ext.building_defects_found && ext.building_defects && ext.building_defects.length > 0) {
        contextParts.push(`\nExternal defects noted: ${ext.building_defects.map(d => getDefectLabel(d)).join(', ')}.`)
      }
      if (ext.wall_tie_concern) {
        contextParts.push(`Wall tie concern flagged.`)
      }
      if (ext.cracking_concern) {
        contextParts.push(`Cracking concern flagged.`)
      }
    }
  }

  if (sectionKey === 'dpc_findings') {
    // DPC-specific context
    const dampRooms = rooms.filter(r => r.issues_identified?.includes('damp'))
    if (dampRooms.length > 0) {
      contextParts.push(`\n${dampRooms.length} room(s) with damp issues requiring DPC work.`)
      for (const room of dampRooms) {
        if (room.room_data?.damp?.dpc_required) {
          contextParts.push(`${room.name}: DPC required.`)
        }
      }
    }
  }

  if (sectionKey === 'sub_floor_ventilation') {
    // Airbrick data
    if (wizardData.additional_works) {
      const aw = wizardData.additional_works
      if (aw.airbrick_clean_count || aw.airbrick_upgrade_count || aw.airbrick_new_count) {
        contextParts.push(`\nAirbrick work: ${aw.airbrick_clean_count || 0} to clean, ${aw.airbrick_upgrade_count || 0} to upgrade, ${aw.airbrick_new_count || 0} new.`)
      }
    }
  }

  if (sectionKey === 'causes') {
    // Condensation causes
    const condensationRooms = rooms.filter(r => r.issues_identified?.includes('condensation'))
    if (condensationRooms.length > 0) {
      contextParts.push(`\n${condensationRooms.length} room(s) with condensation issues.`)
      const hasBlackMould = condensationRooms.some(r => r.room_data?.condensation?.black_mould_present)
      const avgHumidity = condensationRooms.reduce((sum, r) => sum + (r.room_data?.condensation?.humidity_reading || 0), 0) / condensationRooms.length
      if (hasBlackMould) contextParts.push(`Black mould present.`)
      if (avgHumidity > 0) contextParts.push(`Average humidity: ${avgHumidity.toFixed(1)}%.`)
    }
  }

  if (sectionKey === 'surveyor_comments') {
    // Overall survey summary context with specific measurements
    const allIssues = new Set<string>()
    rooms.forEach(r => r.issues_identified?.forEach(i => allIssues.add(i)))

    contextParts.push(`\nOverall survey summary:`)
    contextParts.push(`- ${rooms.length} room(s) inspected`)
    if (allIssues.size > 0) {
      contextParts.push(`- Issues found: ${Array.from(allIssues).join(', ')}`)
    }

    // Detailed damp measurements
    let totalDampArea = 0
    let totalDampWalls = 0
    const dampRooms: string[] = []
    rooms.forEach(r => {
      const walls = (r.room_data?.damp as any)?.walls
      if (walls && walls.length > 0) {
        dampRooms.push(r.name)
        totalDampWalls += walls.length
        walls.forEach((w: any) => {
          const area = w.area || (w.length * w.height)
          totalDampArea += area
        })
      }
    })

    if (totalDampWalls > 0) {
      contextParts.push(`\nDamp findings:`)
      contextParts.push(`- Affected rooms: ${dampRooms.join(', ')}`)
      contextParts.push(`- Total affected walls: ${totalDampWalls}`)
      contextParts.push(`- Total affected area: ${totalDampArea.toFixed(1)}m²`)

      // DPC requirements
      const dpcRequired = rooms.some(r => r.room_data?.damp?.dpc_required)
      if (dpcRequired) {
        contextParts.push(`- DPC system required`)
      }

      // Treatment types
      const treatments = new Set<string>()
      rooms.forEach(r => {
        if (r.room_data?.damp?.wall_treatment) {
          treatments.add((r.room_data.damp as any).wall_treatment)
        }
      })
      if (treatments.size > 0) {
        contextParts.push(`- Recommended treatments: ${Array.from(treatments).map(t => t.replace(/_/g, ' ')).join(', ')}`)
      }
    }

    // External defects with details
    if (wizardData.external_inspection?.building_defects_found && wizardData.external_inspection.building_defects) {
      contextParts.push(`\nExternal defects: ${wizardData.external_inspection.building_defects.map(d => getDefectLabel(d)).join(', ')}`)
      if (wizardData.external_inspection.wall_tie_concern) {
        contextParts.push(`- Wall tie concern flagged`)
      }
      if (wizardData.external_inspection.cracking_concern) {
        contextParts.push(`- Structural cracking concern`)
      }
    }

    // Additional works with measurements
    if (wizardData.additional_works) {
      const aw = wizardData.additional_works
      const works = []
      if (aw.aco_drain_length) works.push(`ACO drain (${aw.aco_drain_length}m)`)
      if (aw.french_drain_length) works.push(`French drain (${aw.french_drain_length}m)`)
      if (aw.piv_count) works.push(`${aw.piv_count} PIV unit(s)`)
      if (aw.airbrick_clean_count) works.push(`${aw.airbrick_clean_count} airbricks to clean`)
      if (aw.airbrick_upgrade_count) works.push(`${aw.airbrick_upgrade_count} airbricks to upgrade`)
      if (aw.airbrick_new_count) works.push(`${aw.airbrick_new_count} new airbricks`)
      if (works.length > 0) {
        contextParts.push(`\nAdditional works: ${works.join(', ')}`)
      }
    }

    // Include total costing if available
    contextParts.push(`\nIMPORTANT: Reference specific room names, wall measurements (e.g., "Left wall: 3m × 2m = 6m²"), and treatment recommendations in your narrative. Do not write generic advice. Every statement should relate to specific findings from this survey.`)
  }

  if (sectionKey === 'summary') {
    // Timber summary
    const timberRooms = rooms.filter(r => r.issues_identified?.includes('timber_decay'))
    const woodwormRooms = rooms.filter(r => r.issues_identified?.includes('woodworm'))

    contextParts.push(`\nTimber survey summary:`)
    contextParts.push(`- ${timberRooms.length} room(s) with timber decay`)
    contextParts.push(`- ${woodwormRooms.length} room(s) with woodworm`)

    for (const room of [...timberRooms, ...woodwormRooms]) {
      contextParts.push(`${room.name}: ${room.issues_identified?.join(', ')}`)
    }
  }

  return contextParts.join('\n')
}

// =============================================================================
// Section Generation
// =============================================================================

/**
 * Generate a single report section
 */
async function generateSection(
  templateSection: ReportTemplateSection,
  wizardData: SurveyWizardData,
  rooms: SurveyRoomRow[],
  photos: SurveyPhoto[],
  costingResults: any,
  conditions: Record<string, boolean>,
  customerData?: any,
  surveyorData?: any
): Promise<ReportSection> {
  const section: ReportSection = {
    key: templateSection.key,
    title: templateSection.title,
    type: templateSection.type,
    content: '',
    content_source: templateSection.content_source,
    is_edited: false,
    data: {},
    photos: [],
  }

  // Populate data fields and photos
  const dataPopulation = populateDataSection(
    templateSection,
    wizardData,
    rooms,
    photos,
    costingResults,
    customerData,
    surveyorData
  )
  section.data = dataPopulation.data || {}
  section.photos = dataPopulation.photos || []

  // Generate content based on source
  switch (templateSection.content_source) {
    case 'template':
      // Pure boilerplate
      section.content = selectBoilerplate(
        templateSection.boilerplate_variants,
        conditions
      )
      break

    case 'survey_data':
      // Auto-populated from data
      // Format data into readable text
      section.content = formatDataAsText(section.data)
      break

    case 'llm_generated':
      // Will be generated via API call (placeholder for now)
      // Use a surveyor-friendly placeholder that won't show "Content not available" in PDF
      section.content = 'To be completed by surveyor during review.'
      break

    case 'mixed':
      // Combine boilerplate + data
      const boilerplateText = selectBoilerplate(
        templateSection.boilerplate_variants,
        conditions
      )
      const dataText = formatDataAsText(section.data)
      section.content = [boilerplateText, dataText].filter(Boolean).join('\n\n')
      break

    case 'costing_data':
      // Format costing results as schedule of works
      section.content = formatCostingAsSchedule(costingResults)
      break

    case 'surveyor_input':
      // Leave empty for surveyor to fill
      section.content = ''
      break
  }

  // Generate per-room sub-sections if template has repeats_per: "room"
  // IMPORTANT: When repeats_per is set, SKIP template sub-sections (like Walls, Proposal, Floors)
  // because we're generating dynamic room-specific content instead
  if (templateSection.repeats_per === 'room' && rooms.length > 0) {
    section.sub_sections = []

    for (const room of rooms) {
      // Create a room sub-section - minimal content, photos are the main content
      const roomSection: ReportSection = {
        key: `room_${room.id}`,
        title: room.name,
        type: 'findings',
        content: generateRoomContent(room, wizardData), // Minimal room identifier
        content_source: 'survey_data',
        is_edited: false,
        data: {
          room_name: room.name,
          room_type: room.room_type,
          floor_level: room.floor_level,
          issues_identified: room.issues_identified,
          room_data: room.room_data,
        },
        photos: [],
      }

      // Match photos for this room
      const roomPhotos = photos.filter(
        (p) => p.room_id === room.id || p.category?.includes(room.name.toLowerCase())
      )
      roomSection.photos = roomPhotos.map((p) => p.id)

      // Only add room sub-section if there are photos (otherwise LLM narrative in parent is sufficient)
      if (roomSection.photos.length > 0) {
        section.sub_sections.push(roomSection)
      }
    }
  }
  // Generate template sub-sections ONLY if repeats_per is NOT set
  else if (templateSection.sub_sections) {
    section.sub_sections = []
    for (const subTemplate of templateSection.sub_sections) {
      const subSection = await generateSection(
        subTemplate,
        wizardData,
        rooms,
        photos,
        costingResults,
        conditions,
        customerData,
        surveyorData
      )
      section.sub_sections.push(subSection)
    }
  }

  return section
}

/**
 * Generate minimal room header content
 * Room details are now in the LLM narrative in the parent section
 * Sub-sections exist only to hold photos
 */
function generateRoomContent(room: SurveyRoomRow, wizardData: SurveyWizardData): string {
  // Return minimal plain text room identifier
  // This appears as a sub-section heading in the PDF with photos below
  return `${room.room_type ? room.room_type.replace(/_/g, ' ') + ' on ' : ''}${room.floor_level || 'unknown'} floor`
}

// =============================================================================
// Formatting Helpers
// =============================================================================

/**
 * Format structured data as readable text
 */
function formatDataAsText(data: Record<string, unknown>): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue

    // Format based on type
    if (typeof value === 'string' || typeof value === 'number') {
      lines.push(`${formatLabel(key)}: ${value}`)
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        lines.push(`${formatLabel(key)}:`)
        value.forEach((item) => {
          lines.push(`  - ${item}`)
        })
      }
    } else if (typeof value === 'object') {
      // Nested object
      lines.push(`${formatLabel(key)}:`)
      lines.push(formatDataAsText(value as Record<string, unknown>))
    }
  }

  return lines.join('\n')
}

/**
 * Format camelCase/snake_case keys as readable labels
 */
function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

/**
 * Format costing results as schedule of works
 */
function formatCostingAsSchedule(costingResults: any): string {
  if (!costingResults || !costingResults.sections) {
    return 'No costing data available.'
  }

  const lines: string[] = []

  for (const section of costingResults.sections) {
    lines.push(`\n## ${section.name}`)
    lines.push('')

    if (section.lines && section.lines.length > 0) {
      for (const line of section.lines) {
        lines.push(
          `- ${line.description}: £${line.totalCost?.toFixed(2) || '0.00'}`
        )
      }
    }

    if (section.subtotal) {
      lines.push(`\n**Section Total: £${section.subtotal.toFixed(2)}**`)
    }
  }

  if (costingResults.totalCost) {
    lines.push(`\n\n**Total Cost: £${costingResults.totalCost.toFixed(2)}**`)
  }

  return lines.join('\n')
}

// =============================================================================
// Main Report Generation
// =============================================================================

/**
 * Generate a complete report for a survey
 */
export async function generateReport(
  surveyId: string
): Promise<SurveyReport> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Load survey data
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', surveyId)
    .single()

  if (surveyError || !survey) {
    throw new Error(`Failed to load survey: ${surveyError?.message}`)
  }

  // Load wizard data and rooms
  const { wizardData, rooms } = await loadWizardData(surveyId)

  // Load photos
  const photos = await loadSurveyPhotos(surveyId)

  // Load customer data
  let customerData = null
  if (survey.customer_id) {
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('id', survey.customer_id)
      .single()
    customerData = customer
  }

  // Load surveyor data (if assigned)
  let surveyorData = null
  if (survey.surveyor_id) {
    const { data: surveyor } = await supabase
      .from('surveyors')
      .select('*')
      .eq('id', survey.surveyor_id)
      .single()
    surveyorData = surveyor
  }

  // Fallback: try to get surveyor name from survey_data if no surveyor assigned
  if (!surveyorData && wizardData.site_details?.surveyor_name) {
    surveyorData = {
      first_name: wizardData.site_details.surveyor_name,
      last_name: '',
      qualifications: null,
      job_title: 'Surveyor',
    }
  }

  // Load template
  const surveyType = survey.survey_type || 'damp'
  const template = await loadDefaultTemplate(surveyType)

  if (!template) {
    throw new Error(`No template found for survey type: ${surveyType}`)
  }

  // Generate costing
  const costingResults = await generateCostingFromSurvey(
    surveyId,
    wizardData,
    rooms
  )

  // Evaluate conditions
  const conditions = evaluateConditions(wizardData, rooms)

  // Generate all sections (exclude proposals section - that's for future schedule of works feature)
  const reportSections: ReportSection[] = []
  const sectionsNeedingLLM: Array<{
    section: ReportSection
    prompt: string
    context: string
  }> = []

  for (const templateSection of template.sections) {
    // Skip proposals section - Schedule of Works is a separate future feature
    if (templateSection.type === 'proposals') {
      continue
    }

    const section = await generateSection(
      templateSection,
      wizardData,
      rooms,
      photos,
      costingResults[surveyType], // Use costing for matching survey type
      conditions,
      customerData,
      surveyorData
    )
    reportSections.push(section)

    // Collect sections that need LLM generation
    if (
      (templateSection.content_source === 'llm_generated' ||
        templateSection.content_source === 'mixed') &&
      templateSection.llm_prompt_hint
    ) {
      sectionsNeedingLLM.push({
        section,
        prompt: templateSection.llm_prompt_hint,
        context: buildLLMContext(
          templateSection.key,
          wizardData,
          rooms,
          photos
        ),
      })
    }
  }

  // Generate LLM content for collected sections
  if (sectionsNeedingLLM.length > 0) {
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${siteUrl}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId,
          sections: sectionsNeedingLLM.map((s) => ({
            key: s.section.key,
            prompt: s.prompt,
            context: s.context,
          })),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const generatedSections = result.sections as Array<{
          key: string
          content: string
          error?: string
        }>

        // Update sections with LLM-generated content
        for (const generated of generatedSections) {
          const reportSection = reportSections.find(
            (s) => s.key === generated.key
          )
          if (reportSection) {
            if (generated.error) {
              console.error(
                `LLM generation failed for section ${generated.key}: ${generated.error}`
              )
              // Keep placeholder text
            } else {
              // For mixed content, append LLM text to existing content
              if (reportSection.content_source === 'mixed' && reportSection.content) {
                reportSection.content = [reportSection.content, generated.content]
                  .filter(Boolean)
                  .join('\n\n')
              } else {
                reportSection.content = generated.content
              }
            }
          }
        }
      } else {
        console.error('LLM API call failed:', response.statusText)
        // Sections keep their placeholder text
      }
    } catch (error) {
      console.error('Error calling LLM API:', error)
      // Sections keep their placeholder text
    }
  }

  // Create report record
  const reportId = crypto.randomUUID()
  const report: SurveyReport = {
    id: reportId,
    survey_id: surveyId,
    template_id: template.id,
    status: 'generated',
    sections: reportSections,
    generated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Save to database
  const { error: insertError } = await supabase
    .from('survey_reports')
    .insert({
      id: report.id,
      survey_id: report.survey_id,
      template_id: report.template_id,
      status: report.status,
      sections: report.sections as any,
      generated_at: report.generated_at,
      created_at: report.created_at,
      updated_at: report.updated_at,
    })

  if (insertError) {
    throw new Error(`Failed to save report: ${insertError.message}`)
  }

  return report
}

/**
 * Regenerate a single section (useful for LLM retries)
 */
export async function regenerateSection(
  reportId: string,
  sectionKey: string
): Promise<ReportSection> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Load report
  const { data: report, error: reportError } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    throw new Error(`Failed to load report: ${reportError?.message}`)
  }

  // Load template
  const { data: template, error: templateError } = await supabase
    .from('report_templates')
    .select('*')
    .eq('id', report.template_id)
    .single()

  if (templateError || !template) {
    throw new Error(`Failed to load template: ${templateError?.message}`)
  }

  // Find section template
  const templateSection = (template.sections as any[]).find(
    (s) => s.key === sectionKey
  )

  if (!templateSection) {
    throw new Error(`Section not found: ${sectionKey}`)
  }

  // Load survey data
  const { data: survey } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', report.survey_id)
    .single()

  const { wizardData, rooms } = await loadWizardData(report.survey_id)
  const photos = await loadSurveyPhotos(report.survey_id)
  const costingResults = await generateCostingFromSurvey(
    report.survey_id,
    wizardData,
    rooms
  )

  // Load customer data
  let customerData = null
  if (survey?.customer_id) {
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('id', survey.customer_id)
      .single()
    customerData = customer
  }

  // Load surveyor data
  let surveyorData = null
  if (survey?.surveyor_id) {
    const { data: surveyor } = await supabase
      .from('surveyors')
      .select('*')
      .eq('id', survey.surveyor_id)
      .single()
    surveyorData = surveyor
  }

  const conditions = evaluateConditions(wizardData, rooms)

  // Regenerate section
  const newSection = await generateSection(
    templateSection,
    wizardData,
    rooms,
    photos,
    costingResults[template.survey_type],
    conditions,
    customerData,
    surveyorData
  )

  // Generate LLM content if needed
  if (
    (templateSection.content_source === 'llm_generated' ||
      templateSection.content_source === 'mixed') &&
    templateSection.llm_prompt_hint
  ) {
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${siteUrl}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId: report.survey_id,
          sections: [
            {
              key: newSection.key,
              prompt: templateSection.llm_prompt_hint,
              context: buildLLMContext(
                templateSection.key,
                wizardData,
                rooms,
                await loadSurveyPhotos(report.survey_id)
              ),
            },
          ],
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const generated = result.sections[0]

        if (generated && !generated.error) {
          // For mixed content, append LLM text to existing content
          if (newSection.content_source === 'mixed' && newSection.content) {
            newSection.content = [newSection.content, generated.content]
              .filter(Boolean)
              .join('\n\n')
          } else {
            newSection.content = generated.content
          }
        }
      }
    } catch (error) {
      console.error('Error regenerating LLM content:', error)
      // Keep placeholder text
    }
  }

  // Update report in database
  const updatedSections = (report.sections as any[]).map((s) =>
    s.key === sectionKey ? newSection : s
  )

  await supabase
    .from('survey_reports')
    .update({
      sections: updatedSections as any,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)

  return newSection
}
