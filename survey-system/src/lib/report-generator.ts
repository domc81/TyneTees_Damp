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

  // Generate sub-sections if present
  if (templateSection.sub_sections) {
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

  // Generate per-room sub-sections if template has repeats_per: "room"
  if (templateSection.repeats_per === 'room' && rooms.length > 0) {
    section.sub_sections = section.sub_sections || []

    for (const room of rooms) {
      // Create a room sub-section
      const roomSection: ReportSection = {
        key: `room_${room.id}`,
        title: room.name,
        type: 'findings',
        content: generateRoomContent(room, wizardData),
        content_source: 'mixed',
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

      section.sub_sections.push(roomSection)
    }
  }

  return section
}

/**
 * Generate narrative content for a room based on its data
 */
function generateRoomContent(room: SurveyRoomRow, wizardData: SurveyWizardData): string {
  const lines: string[] = []

  lines.push(`**Room:** ${room.name}`)
  if (room.room_type) {
    lines.push(`**Type:** ${room.room_type.replace(/_/g, ' ')}`)
  }
  if (room.floor_level) {
    lines.push(`**Floor:** ${room.floor_level}`)
  }

  if (room.issues_identified && room.issues_identified.length > 0) {
    lines.push('')
    lines.push(`**Issues Identified:** ${room.issues_identified.join(', ')}`)
  }

  // Extract room-specific findings
  if (room.room_data) {
    const roomData = room.room_data as any

    // Damp findings
    if (roomData.damp) {
      lines.push('')
      lines.push('**Damp Findings:**')
      if (roomData.damp.walls && Array.isArray(roomData.damp.walls)) {
        for (const wall of roomData.damp.walls) {
          lines.push(`- ${wall.name}: Length ${wall.length}m, Height ${wall.height}m`)
          if (wall.moisture_readings && wall.moisture_readings.length > 0) {
            lines.push(`  Moisture readings: ${wall.moisture_readings.join('%, ')}%`)
          }
        }
      }
      if (roomData.damp.wall_treatment) {
        lines.push(`- Treatment: ${roomData.damp.wall_treatment.replace(/_/g, ' ')}`)
      }
    }

    // Condensation findings
    if (roomData.condensation) {
      lines.push('')
      lines.push('**Condensation Findings:**')
      if (roomData.condensation.condensation_on_windows) {
        lines.push('- Condensation noted on windows')
      }
      if (roomData.condensation.black_mould_present) {
        lines.push('- Black mould present')
      }
      if (roomData.condensation.humidity_reading) {
        lines.push(`- Humidity: ${roomData.condensation.humidity_reading}%`)
      }
    }

    // Timber findings
    if (roomData.timber_decay) {
      lines.push('')
      lines.push('**Timber Findings:**')
      if (roomData.timber_decay.fungal_findings && Array.isArray(roomData.timber_decay.fungal_findings)) {
        lines.push(`- Fungal findings: ${roomData.timber_decay.fungal_findings.join(', ')}`)
      }
      if (roomData.timber_decay.sub_floor_ventilation) {
        lines.push(`- Sub-floor ventilation: ${roomData.timber_decay.sub_floor_ventilation}`)
      }
    }

    // Woodworm findings
    if (roomData.woodworm) {
      lines.push('')
      lines.push('**Woodworm Findings:**')
      if (roomData.woodworm.infestation_status) {
        lines.push(`- Infestation: ${roomData.woodworm.infestation_status}`)
      }
      if (roomData.woodworm.species_identified) {
        lines.push(`- Species: ${roomData.woodworm.species_identified}`)
      }
    }
  }

  return lines.join('\n')
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
