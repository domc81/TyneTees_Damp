// =============================================================================
// Survey Wizard Types — Room-First, Issue-Driven Data Model
// Canonical type definitions for the survey wizard interface.
// Matches the architecture described in CLAUDE.md and PROJECT_STATE.md
// Last updated: 2026-02-19
// =============================================================================

// =============================================================================
// Top-Level Wizard Data (stored in surveys.survey_data JSONB)
// =============================================================================

export interface SurveyWizardData {
  site_details?: SiteDetails
  external_inspection?: ExternalInspection
  additional_works?: AdditionalWorks
  reported_defect?: string // Captured at booking time — what the customer described
  wizard_step: number
  wizard_completed: boolean
}

// =============================================================================
// Site Details (Step 1: Property & Inspection Information)
// =============================================================================

export interface SiteDetails {
  inspection_date: string // ISO date string
  weather_conditions: WeatherCondition
  temperature_c: number
  property_type: PropertyType
  construction_type: ConstructionType
  approx_build_year: string // e.g., "1920s", "1950-1960", "2000+"
}

export type WeatherCondition =
  | 'dry'
  | 'light_rain'
  | 'heavy_rain'
  | 'overcast'
  | 'sunny'
  | 'cold'
  | 'frost'
  | 'snow'

export type PropertyType =
  | 'detached'
  | 'semi_detached'
  | 'terraced'
  | 'end_terrace'
  | 'flat'
  | 'bungalow'
  | 'maisonette'
  | 'other'

export type ConstructionType =
  | 'cavity_brick'
  | 'solid_brick'
  | 'stone'
  | 'timber_frame'
  | 'concrete'
  | 'mixed'
  | 'other'

// =============================================================================
// External Inspection (Step 2: Building Exterior Assessment)
// =============================================================================

export interface ExternalInspection {
  building_defects_found: boolean
  building_defects: BuildingDefect[] // Multi-select
  defect_urgency?: DefectUrgency
  wall_tie_concern: boolean
  cracking_concern: boolean
  notes?: string
  raw_notes?: string // Raw voice transcript — preserved as audit trail
}

export type BuildingDefect =
  | 'chimney_pointing'
  | 'chimney_flashings'
  | 'ridge_tiles'
  | 'verge_pointing'
  | 'hip_pointing'
  | 'slipped_slates'
  | 'loose_slates'
  | 'missing_slates'
  | 'defective_gutters'
  | 'blocked_gutters'
  | 'external_pointing'
  | 'perished_paintwork'
  | 'wet_rot_joinery'
  | 'perished_brickwork'
  | 'defective_joint'
  | 'wall_cracks'
  | 'lintel_cracks'

export type DefectUrgency =
  | 'immediate'
  | 'short_term' // 3 months
  | 'medium_term' // 6 months
  | 'long_term' // 12+ months

// =============================================================================
// Room Data (stored in survey_rooms.room_data JSONB, keyed by issue type)
// =============================================================================

export interface RoomData {
  rh_reading?: number | null  // Ambient relative humidity % for the room (room-level, not issue-specific)
  damp?: DampRoomData
  condensation?: CondensationRoomData
  timber_decay?: TimberRoomData
  woodworm?: WoodwormRoomData
}

// =============================================================================
// Survey Room Row (DB columns + RoomData)
// =============================================================================

export interface SurveyRoomRow {
  id: string
  survey_id: string
  name: string
  room_type: RoomType
  floor_level: FloorLevel
  display_order: number
  issues_identified: IssueType[] // Multi-select (can be empty)
  room_data: RoomData // JSONB keyed by issue type
  findings?: string | null // Surveyor's room observation — report-ready text (polished or raw)
  surveyor_notes?: string | null // Raw voice transcript — preserved as audit trail
  recommendations?: string | null // Generated recommendations
  is_completed: boolean
  created_at?: string
  updated_at?: string
}

export type RoomType =
  | 'living_room'
  | 'dining_room'
  | 'kitchen'
  | 'bedroom'
  | 'bathroom'
  | 'hallway'
  | 'landing'
  | 'cellar'
  | 'loft'
  | 'utility'
  | 'conservatory'
  | 'garage'
  | 'other'

export type FloorLevel =
  | 'basement'
  | 'ground'
  | 'first'
  | 'second'
  | 'third'
  | 'loft'

export type IssueType =
  | 'damp'
  | 'condensation'
  | 'timber_decay'
  | 'woodworm'

// =============================================================================
// Damp Room Data (Most Complex — Wall-by-Wall + Treatments)
// =============================================================================

export interface DampRoomData {
  // Wall-by-wall measurements
  walls: DampWall[]

  // DPC (Damp Proof Course) Requirements
  dpc_required: boolean
  dpc_type?: DPCType
  dpc_wall_length?: number // Total linear metres
  dpc_wall_depth?: number // Brick courses (e.g., 4, 5, 6)

  // Wall Treatment
  wall_treatment?: WallTreatment
  membrane_height?: MembraneHeight // Only for membrane treatment
  membrane_wall_lengths?: number[] // Array of wall lengths needing membrane
  tanking_area?: number // m² for tanking treatment
  fillet_joint_length?: number // Linear metres
  overtape_length?: number // Linear metres of overtape for sealing membrane joints

  // Floor Treatment
  floor_treatment?: FloorTreatment
  floor_area?: number // m²
  floor_resin_fillet_length?: number // Linear metres of fillet joint for floor resin
  strip_existing_floor?: boolean
  strip_floor_area?: number // m²
  sub_floor_area?: number // m² requiring membrane

  // Plastering & Finishing
  stud_wall_area?: number // m²
  plasterboard_area?: number // m²
  skim_area?: number // m²

  // Difficulty Adjustment
  difficulty_hours?: number // Extra labour hours for access/complexity
}

export interface DampWall {
  name: string // e.g., "North Wall", "Party Wall"
  length: number // metres
  height: number // metres
  has_wallpaper: boolean
  radiator_count: number
  socket_count: number
  skirting_length: number // metres
  moisture_readings: MoistureReading[]
}

export interface MoistureReading {
  location: string // e.g., "Top left", "Bottom right", "Centre"
  reading: number // % water weight
  depth: number // mm from surface
}

export type DPCType =
  | 'traditional' // Physical DPC
  | 'digital' // Electro-osmotic
  | 'none'

export type WallTreatment =
  | 'membrane' // Cavity drain membrane
  | 'tanking' // Hydradry tanking slurry
  | 'none'

export type MembraneHeight =
  | '1m'
  | '1.2m'
  | '2m'

export type FloorTreatment =
  | 'resin_membrane' // Liquid resin DPM
  | 'new_joists' // Floor replacement
  | 'none'

// =============================================================================
// Condensation Room Data (Evidence + Recommendations)
// =============================================================================

export interface CondensationRoomData {
  // Evidence
  condensation_on_windows: boolean
  black_mould_present: boolean
  mould_severity?: MouldSeverity
  ventilation_adequate: boolean
  humidity_reading?: number // % RH

  // Recommendations (room-specific)
  piv_recommended: boolean
  fan_recommended: boolean
  fan_count?: number // How many fans in this room
}

export type MouldSeverity =
  | 'light'
  | 'moderate'
  | 'severe'

// =============================================================================
// Timber Room Data (Floor Inspection + Fungal Findings + Replacements)
// =============================================================================

export interface TimberRoomData {
  // Floor Assessment
  floor_type: TimberFloorType
  floor_condition: FloorCondition
  floor_access: FloorAccess

  // Sub-floor Inspection
  sub_floor_inspected: boolean
  sub_floor_ventilation?: SubFloorVentilation
  joist_condition?: JoistCondition

  // Fungal Findings
  fungal_findings: FungalFinding[] // Multi-select
  fungal_treatment_area?: number // m² requiring spray treatment

  // Timber Replacement
  timber_replacement_needed: boolean
  joist_entries?: JoistEntry[] // Array of joist sizes/quantities

  // Flooring
  flooring_type?: FlooringType
  flooring_area?: number // m²

  // Ceiling Work (if affected)
  ceiling_affected: boolean
  ceiling_area?: number // m²

  // Masonry Preparation
  grind_back_mortar_area?: number // m² of mortar grinding on brickwork courses
  wire_scrub_area?: number // m² of wire scrubbing on brickwork faces

  // Difficulty Adjustment
  difficulty_hours?: number
}

export interface JoistEntry {
  size: string // e.g., "4x2", "6x2", "8x2"
  quantity: number
  length: number // metres per piece
}

export type TimberFloorType =
  | 'suspended_timber'
  | 'solid_concrete'
  | 'chipboard'
  | 'floorboards'
  | 'other'

export type FloorCondition =
  | 'good'
  | 'fair'
  | 'poor'
  | 'failed'

export type FloorAccess =
  | 'full'
  | 'partial'
  | 'none'

export type SubFloorVentilation =
  | 'adequate'
  | 'inadequate'
  | 'blocked'
  | 'none'

export type JoistCondition =
  | 'sound'
  | 'minor_decay'
  | 'moderate_decay'
  | 'severe_decay'

export type FungalFinding =
  | 'dry_rot'
  | 'wet_rot'
  | 'cellar_fungus'
  | 'white_pore_fungus'
  | 'none'

export type FlooringType =
  | 'tongue_and_groove'
  | 'square_edge'
  | 'chipboard'
  | 'plywood'
  | 'other'

// =============================================================================
// Woodworm Room Data (Infestation Assessment + Treatment Areas)
// =============================================================================

export interface WoodwormRoomData {
  species_identified: WoodwormSpecies
  infestation_status: InfestationStatus
  severity: InfestationSeverity
  structural_damage: boolean

  // Treatment Areas
  spray_floor_area?: number // m² of floor to spray
  spray_timber_area?: number // m² of exposed timber
  paste_treatment_area?: number // m² requiring paste

  // Difficulty Adjustment
  difficulty_hours?: number
}

export type WoodwormSpecies =
  | 'common_furniture_beetle'
  | 'deathwatch_beetle'
  | 'house_longhorn'
  | 'powderpost_beetle'
  | 'unknown'

export type InfestationStatus =
  | 'active'
  | 'historic'
  | 'uncertain'

export type InfestationSeverity =
  | 'light'
  | 'moderate'
  | 'severe'

// =============================================================================
// Additional Works (Whole-Property Items — Step 5)
// =============================================================================

export interface AdditionalWorks {
  // Condensation Equipment (whole-house)
  piv_type?: PIVType
  piv_count?: number
  piv_electrical_pack?: boolean
  sarkvents_count?: number
  ducting_components?: DuctingComponent[]
  wall_mounted_electrical_pack_count?: number
  wall_mounted_core_hole_count?: number
  fan_electrical_pack_total?: number
  fan_grille_count?: number
  fan_core_hole_count?: number

  // Loft Hatch (condensation — only for loft PIV installations)
  loft_hatch_new_required?: boolean
  loft_hatch_enlarge_required?: boolean

  // Joinery (condensation — ducting boxwork for wall-mounted PIV)
  joinery_ducting_metres?: number

  // Passive Vents (condensation)
  cpass_vent_count?: number
  cvent_count?: number

  // Joist & Flooring Extras
  joist_endwrap_count?: number
  wall_plate_count?: number
  bower_beam_pairs?: number
  flitch_plate_pairs?: number
  need_insulation?: boolean
  warmline_insulation_area?: number // m²

  // Plastering Extras (whole-property)
  stop_bead_count?: number
  corner_bead_24_count?: number // 2.4m length
  corner_bead_30_count?: number // 3m length
  difficulty_hours_plastering?: number

  // Airbricks
  airbrick_clean_count?: number
  airbrick_upgrade_count?: number
  airbrick_new_count?: number

  // Spray Treatment (whole-property total)
  spray_treatment_area?: number // m² total across property
  spray_difficulty_hours?: number

  // Optional Items
  aco_drain_length?: number // Linear metres
  french_drain_length?: number // Linear metres
  aquaban_area?: number // m²
  asbestos_test_count?: number

  // Floor Protection
  antinox_board_count?: number // Count of 2.4m × 1.2m boards (damp, timber, woodworm)

  // Waste Disposal
  skip_count?: number

  // Logistics
  distance_from_office?: number // Miles
  num_men_travelling?: number
}

export type PIVType =
  | 'loft_heated'
  | 'loft_unheated'
  | 'wall_mounted'
  | 'none'

export interface DuctingComponent {
  type: DuctingType
  count: number
}

export type DuctingType =
  | 'flexible_duct'        // → ducting_insulated_flexi_3m_length
  | 'rigid_duct'           // → ducting_1m_length
  | 'duct_elbow'           // → ducting_round_elbow
  | 'duct_connector'       // → ducting_round_straight_conn
  | 'grille'               // → grille
  | 'round_1m'             // → ducting_round_1m
  | 'flat_to_round_adaptor'    // → ducting_flat_to_round_adaptor
  | 'flat_straight_connector'  // → ducting_flat_straight_connector
  | 'flat_horizontal_bend'     // → ducting_flat_horizontal_bend
  | 'flat_vertical_bend'       // → ducting_flat_vertical_bend
  | 'flat_1m'              // → ducting_flat_1m

// =============================================================================
// Display Helpers (for UI rendering)
// =============================================================================

export const WEATHER_OPTIONS: { value: WeatherCondition; label: string }[] = [
  { value: 'dry', label: 'Dry' },
  { value: 'light_rain', label: 'Light Rain' },
  { value: 'heavy_rain', label: 'Heavy Rain' },
  { value: 'overcast', label: 'Overcast' },
  { value: 'sunny', label: 'Sunny' },
  { value: 'cold', label: 'Cold' },
  { value: 'frost', label: 'Frost' },
  { value: 'snow', label: 'Snow' },
]

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'detached', label: 'Detached House' },
  { value: 'semi_detached', label: 'Semi-Detached House' },
  { value: 'terraced', label: 'Terraced House' },
  { value: 'end_terrace', label: 'End Terrace' },
  { value: 'flat', label: 'Flat' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'maisonette', label: 'Maisonette' },
  { value: 'other', label: 'Other' },
]

export const CONSTRUCTION_TYPES: { value: ConstructionType; label: string }[] = [
  { value: 'cavity_brick', label: 'Cavity Brick' },
  { value: 'solid_brick', label: 'Solid Brick' },
  { value: 'stone', label: 'Stone' },
  { value: 'timber_frame', label: 'Timber Frame' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'mixed', label: 'Mixed Construction' },
  { value: 'other', label: 'Other' },
]

export const ROOM_TYPES: { value: RoomType; label: string }[] = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'hallway', label: 'Hallway' },
  { value: 'landing', label: 'Landing' },
  { value: 'cellar', label: 'Cellar' },
  { value: 'loft', label: 'Loft' },
  { value: 'utility', label: 'Utility Room' },
  { value: 'conservatory', label: 'Conservatory' },
  { value: 'garage', label: 'Garage' },
  { value: 'other', label: 'Other' },
]

export const FLOOR_LEVELS: { value: FloorLevel; label: string }[] = [
  { value: 'basement', label: 'Basement' },
  { value: 'ground', label: 'Ground Floor' },
  { value: 'first', label: 'First Floor' },
  { value: 'second', label: 'Second Floor' },
  { value: 'third', label: 'Third Floor' },
  { value: 'loft', label: 'Loft' },
]

export const BUILDING_DEFECTS: { value: BuildingDefect; label: string }[] = [
  { value: 'chimney_pointing', label: 'Defective pointing to chimney stack' },
  { value: 'chimney_flashings', label: 'Defective flashings to chimney stack' },
  { value: 'ridge_tiles', label: 'Defective pointing to ridge tiles' },
  { value: 'verge_pointing', label: 'Defective pointing to verge' },
  { value: 'hip_pointing', label: 'Defective pointing to hips' },
  { value: 'slipped_slates', label: 'Slipped roof slates' },
  { value: 'loose_slates', label: 'Loose roof slates' },
  { value: 'missing_slates', label: 'Missing roof slates' },
  { value: 'defective_gutters', label: 'Defective rainwater goods' },
  { value: 'blocked_gutters', label: 'Blockage/vegetation to rainwater goods' },
  { value: 'external_pointing', label: 'Defective pointing to external walls' },
  { value: 'perished_paintwork', label: 'Perished external paintwork' },
  { value: 'wet_rot_joinery', label: 'Wet rot noted to external joinery timbers' },
  { value: 'perished_brickwork', label: 'Perished external brickwork' },
  { value: 'defective_joint', label: 'Defective perimeter joint' },
  { value: 'wall_cracks', label: 'Cracks/movement to walls' },
  { value: 'lintel_cracks', label: 'Cracks/movement to lintels' },
]

export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
  damp: 'Damp',
  condensation: 'Condensation',
  timber_decay: 'Timber Decay',
  woodworm: 'Woodworm',
}

export const ISSUE_TYPE_COLOURS: Record<IssueType, string> = {
  damp: 'blue',
  condensation: 'purple',
  timber_decay: 'amber',
  woodworm: 'red',
}
