// =============================================================================
// Installer Site Information Types & Field Definitions
// Defines all categories, their fields, and field metadata for form rendering.
// The site_info JSONB in survey_installer_info is keyed by category name.
// =============================================================================

// --- Photo reference stored within each category's JSONB ---
export interface InstallerPhoto {
  id: string
  storage_path: string
  file_name: string
  caption: string
  created_at: string
}

// --- Category names ---
export type InstallerInfoCategory =
  | 'general_access'
  | 'electrical'
  | 'loft'
  | 'external_works'
  | 'health_and_safety'
  | 'ventilation'
  | 'groundworks'

// --- Field types for form rendering ---
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'yes_no'
  | 'yes_no_unknown'
  | 'checkbox_group'

export interface FieldOption {
  value: string
  label: string
}

export interface FieldDefinition {
  key: string
  label: string
  type: FieldType
  options?: FieldOption[]
  placeholder?: string
  unit?: string        // e.g. "mm" for number fields
  dependsOn?: string   // only show if this sibling field is truthy
  fullWidth?: boolean  // span full grid width (for textareas / notes)
}

export interface CategoryDefinition {
  key: InstallerInfoCategory
  label: string
  description: string
  fields: FieldDefinition[]
}

// --- Row from the database ---
export interface InstallerInfoRow {
  id: string
  survey_id: string
  site_info: Record<string, Record<string, unknown>>
  categories_applicable: InstallerInfoCategory[]
  completed: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

// =============================================================================
// Field Definitions Per Category
// =============================================================================

export const INSTALLER_INFO_CATEGORIES: CategoryDefinition[] = [
  // ── General Access ──
  {
    key: 'general_access',
    label: 'General Access',
    description: 'Parking, keys, occupants, and site preparation for the install team.',
    fields: [
      {
        key: 'parking',
        label: 'Parking',
        type: 'select',
        options: [
          { value: 'driveway', label: 'Driveway' },
          { value: 'on_street', label: 'On-Street' },
          { value: 'permit_required', label: 'Permit Required' },
          { value: 'limited', label: 'Limited' },
          { value: 'none', label: 'No Parking Nearby' },
        ],
      },
      { key: 'parking_notes', label: 'Parking Notes', type: 'text', placeholder: 'e.g. Nearest space is 50m away on side street', dependsOn: 'parking' },
      {
        key: 'access_method',
        label: 'Access Method',
        type: 'select',
        options: [
          { value: 'key_safe', label: 'Key Safe' },
          { value: 'owner_present', label: 'Owner Present' },
          { value: 'letting_agent', label: 'Letting Agent' },
          { value: 'neighbour', label: 'Neighbour' },
          { value: 'other', label: 'Other' },
        ],
      },
      { key: 'access_notes', label: 'Access Notes', type: 'text', placeholder: 'Key safe code / agent contact / details' },
      { key: 'property_occupied', label: 'Property Occupied?', type: 'yes_no' },
      { key: 'occupant_present_during_works', label: 'Occupant Present During Works?', type: 'yes_no' },
      { key: 'pets_on_site', label: 'Pets on Site?', type: 'yes_no' },
      { key: 'pet_details', label: 'Pet Details', type: 'text', placeholder: 'e.g. 2 dogs — owner will confine to kitchen', dependsOn: 'pets_on_site' },
      { key: 'vulnerable_occupants', label: 'Vulnerable Occupants?', type: 'yes_no' },
      { key: 'vulnerable_occupant_notes', label: 'Vulnerable Occupant Notes', type: 'text', dependsOn: 'vulnerable_occupants', placeholder: 'e.g. Elderly resident, limited mobility' },
      { key: 'furniture_removal_needed', label: 'Furniture Removal Needed?', type: 'yes_no' },
      { key: 'furniture_notes', label: 'Furniture Notes', type: 'text', dependsOn: 'furniture_removal_needed', placeholder: 'e.g. Heavy bookcase in hallway needs moving' },
      { key: 'floor_coverings_to_protect', label: 'Floor Coverings to Protect?', type: 'yes_no' },
      { key: 'floor_covering_notes', label: 'Floor Covering Details', type: 'text', dependsOn: 'floor_coverings_to_protect', placeholder: 'e.g. New laminate in living room' },
    ],
  },

  // ── Electrical ──
  {
    key: 'electrical',
    label: 'Electrical',
    description: 'DB board, power availability, and isolation requirements.',
    fields: [
      { key: 'db_board_location', label: 'DB Board Location', type: 'text', placeholder: 'e.g. Under stairs cupboard' },
      {
        key: 'db_board_type',
        label: 'DB Board Type',
        type: 'select',
        options: [
          { value: 'consumer_unit', label: 'Consumer Unit' },
          { value: 'old_fuse_box', label: 'Old Fuse Box' },
          { value: 'rcbo_board', label: 'RCBO Board' },
          { value: 'unknown', label: 'Unknown' },
        ],
      },
      { key: 'power_available', label: 'Power Available on Site?', type: 'yes_no_unknown' },
      { key: 'nearest_socket_location', label: 'Nearest Socket to Work Areas', type: 'text', placeholder: 'e.g. Kitchen — 3m from main work area' },
      { key: 'generator_required', label: 'Generator Required?', type: 'yes_no' },
      { key: 'isolation_required', label: 'Isolation Required Before Works?', type: 'yes_no' },
      { key: 'isolation_notes', label: 'Isolation Notes', type: 'text', dependsOn: 'isolation_required', placeholder: 'e.g. Isolate ring main circuit 3 before drilling' },
    ],
  },

  // ── Health & Safety ──
  {
    key: 'health_and_safety',
    label: 'Health & Safety',
    description: 'Asbestos, lead paint, confined spaces, height work, and other hazards.',
    fields: [
      { key: 'asbestos_suspected', label: 'Asbestos Known or Suspected?', type: 'yes_no_unknown' },
      { key: 'asbestos_survey_done', label: 'Asbestos Survey Done?', type: 'yes_no', dependsOn: 'asbestos_suspected' },
      { key: 'asbestos_notes', label: 'Asbestos Notes', type: 'textarea', dependsOn: 'asbestos_suspected', placeholder: 'Location, type, condition...', fullWidth: true },
      { key: 'lead_paint_suspected', label: 'Lead Paint Suspected?', type: 'yes_no_unknown' },
      { key: 'confined_spaces', label: 'Confined Spaces?', type: 'yes_no' },
      { key: 'confined_space_details', label: 'Confined Space Details', type: 'text', dependsOn: 'confined_spaces' },
      { key: 'working_at_height', label: 'Working at Height Required?', type: 'yes_no' },
      { key: 'height_details', label: 'Height Work Details', type: 'text', dependsOn: 'working_at_height', placeholder: 'e.g. External wall above 2m — ladder or scaffold needed' },
      { key: 'floor_condition_issues', label: 'Floor Condition Issues?', type: 'yes_no' },
      { key: 'floor_condition_notes', label: 'Floor Condition Notes', type: 'text', dependsOn: 'floor_condition_issues' },
      { key: 'other_hazards', label: 'Other Hazards', type: 'textarea', placeholder: 'Any additional safety concerns...', fullWidth: true },
      { key: 'ppe_requirements', label: 'Additional PPE Requirements', type: 'text', placeholder: 'Beyond standard RPE, gloves, overalls' },
    ],
  },

  // ── Loft ──
  {
    key: 'loft',
    label: 'Loft',
    description: 'Loft access, boarding, insulation, and obstructions.',
    fields: [
      { key: 'loft_hatch_location', label: 'Loft Hatch Location', type: 'text', placeholder: 'e.g. Landing, top of stairs' },
      {
        key: 'loft_access_type',
        label: 'Loft Access Type',
        type: 'select',
        options: [
          { value: 'pull_down_ladder', label: 'Pull-Down Ladder' },
          { value: 'fixed_ladder', label: 'Fixed Ladder' },
          { value: 'hatch_only', label: 'Hatch Only (no ladder)' },
          { value: 'none', label: 'No Access' },
        ],
      },
      {
        key: 'loft_boarding',
        label: 'Loft Boarding',
        type: 'select',
        options: [
          { value: 'fully_boarded', label: 'Fully Boarded' },
          { value: 'partial', label: 'Partially Boarded' },
          { value: 'none', label: 'No Boarding' },
        ],
      },
      { key: 'loft_insulation_present', label: 'Loft Insulation Present?', type: 'yes_no_unknown' },
      { key: 'head_height_adequate', label: 'Head Height Adequate?', type: 'yes_no' },
      {
        key: 'obstructions',
        label: 'Obstructions',
        type: 'checkbox_group',
        options: [
          { value: 'water_tanks', label: 'Water Tanks' },
          { value: 'hvac_equipment', label: 'HVAC Equipment' },
          { value: 'low_beams', label: 'Low Beams' },
          { value: 'wiring', label: 'Wiring' },
          { value: 'stored_items', label: 'Stored Items' },
          { value: 'pipework', label: 'Pipework' },
        ],
      },
      { key: 'loft_notes', label: 'Loft Notes', type: 'textarea', placeholder: 'Any additional loft information...', fullWidth: true },
    ],
  },

  // ── External Works ──
  {
    key: 'external_works',
    label: 'External Works',
    description: 'Scaffold, wall access, ground conditions, and external obstructions.',
    fields: [
      { key: 'scaffold_required', label: 'Scaffold Required?', type: 'yes_no' },
      {
        key: 'scaffold_type',
        label: 'Scaffold Type',
        type: 'select',
        dependsOn: 'scaffold_required',
        options: [
          { value: 'full', label: 'Full Scaffold' },
          { value: 'tower', label: 'Tower Scaffold' },
          { value: 'mobile_tower', label: 'Mobile Tower' },
        ],
      },
      { key: 'scaffold_notes', label: 'Scaffold Notes', type: 'text', dependsOn: 'scaffold_required', placeholder: 'e.g. Front elevation only, 6m run' },
      {
        key: 'external_wall_access',
        label: 'External Wall Access',
        type: 'select',
        options: [
          { value: 'clear', label: 'Clear' },
          { value: 'restricted', label: 'Restricted' },
          { value: 'no_access', label: 'No Access' },
        ],
      },
      { key: 'access_restriction_details', label: 'Access Restriction Details', type: 'text', dependsOn: 'external_wall_access', placeholder: 'e.g. Neighbour fence blocks right-side access' },
      {
        key: 'ground_conditions',
        label: 'Ground Conditions',
        type: 'select',
        options: [
          { value: 'paved', label: 'Paved / Flagged' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'grassed', label: 'Grassed' },
          { value: 'soil', label: 'Soil' },
          { value: 'gravel', label: 'Gravel' },
          { value: 'mixed', label: 'Mixed' },
        ],
      },
      { key: 'items_to_move', label: 'Items to Move?', type: 'yes_no' },
      { key: 'items_to_move_notes', label: 'Items to Move Details', type: 'text', dependsOn: 'items_to_move', placeholder: 'e.g. Garden furniture, bins, planters' },
      { key: 'conservatory_obstructing', label: 'Conservatory / Extension Obstructing?', type: 'yes_no' },
      { key: 'core_hole_drilling_needed', label: 'External Core Hole Drilling?', type: 'yes_no' },
      { key: 'core_hole_size_mm', label: 'Core Hole Size', type: 'number', unit: 'mm', dependsOn: 'core_hole_drilling_needed' },
      { key: 'external_notes', label: 'External Works Notes', type: 'textarea', placeholder: 'Any additional external works information...', fullWidth: true },
    ],
  },

  // ── Ventilation ──
  {
    key: 'ventilation',
    label: 'Ventilation',
    description: 'PIV units, extraction fans, airbricks, and core hole requirements.',
    fields: [
      { key: 'piv_location', label: 'PIV Unit Location', type: 'text', placeholder: 'e.g. Landing ceiling, first floor' },
      { key: 'piv_power_available', label: 'Electrical Supply Available for PIV?', type: 'yes_no' },
      { key: 'fan_locations', label: 'Extraction Fan Locations', type: 'textarea', placeholder: 'List each fan location and type...', fullWidth: true },
      { key: 'core_hole_drilling_needed', label: 'Core Hole Drilling Needed?', type: 'yes_no' },
      { key: 'core_hole_size_mm', label: 'Core Hole Size', type: 'number', unit: 'mm', dependsOn: 'core_hole_drilling_needed' },
      { key: 'airbrick_locations', label: 'Airbrick Locations', type: 'textarea', placeholder: 'Describe airbrick positions...', fullWidth: true },
      { key: 'external_vent_positions', label: 'External Vent Positions', type: 'text', placeholder: 'Where external vents will be fitted' },
      { key: 'ventilation_notes', label: 'Ventilation Notes', type: 'textarea', placeholder: 'Any additional ventilation information...', fullWidth: true },
    ],
  },

  // ── Groundworks ──
  {
    key: 'groundworks',
    label: 'Groundworks',
    description: 'Digging, drainage, underground services, and waste disposal.',
    fields: [
      { key: 'dig_required', label: 'Dig Required?', type: 'yes_no' },
      { key: 'dig_depth_estimated_mm', label: 'Estimated Dig Depth', type: 'number', unit: 'mm', dependsOn: 'dig_required' },
      {
        key: 'ground_type',
        label: 'Ground Type',
        type: 'select',
        options: [
          { value: 'soil', label: 'Soil' },
          { value: 'clay', label: 'Clay' },
          { value: 'rock', label: 'Rock' },
          { value: 'chalk', label: 'Chalk' },
          { value: 'mixed', label: 'Mixed' },
        ],
      },
      { key: 'underground_services_known', label: 'Underground Services Known?', type: 'yes_no_unknown' },
      { key: 'service_markings_done', label: 'Service Markings Done?', type: 'yes_no', dependsOn: 'underground_services_known' },
      { key: 'skip_access', label: 'Skip Access Available?', type: 'yes_no' },
      { key: 'skip_location_notes', label: 'Skip Location Notes', type: 'text', dependsOn: 'skip_access', placeholder: 'Where can the skip be placed?' },
      { key: 'drainage_tie_in_needed', label: 'Drainage Tie-In Needed?', type: 'yes_no' },
      { key: 'groundworks_notes', label: 'Groundworks Notes', type: 'textarea', placeholder: 'Any additional groundworks information...', fullWidth: true },
    ],
  },
]

// Lookup map for quick access
export const CATEGORY_MAP = Object.fromEntries(
  INSTALLER_INFO_CATEGORIES.map(c => [c.key, c])
) as Record<InstallerInfoCategory, CategoryDefinition>
