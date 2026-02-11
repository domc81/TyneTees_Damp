// Structured Survey Types based on Excel Report Sheet
// This defines the data structure for the detailed survey questionnaire

export interface SurveySection {
  id: string
  title: string
  description?: string
  questions: SurveyQuestion[]
  isCompleted: boolean
  order: number
}

export type QuestionType =
  | 'yes_no'
  | 'text'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'measurement'
  | 'image'
  | 'rich_text'

export interface SurveyQuestion {
  id: string
  sectionId: string
  type: QuestionType
  label: string
  subLabel?: string
  placeholder?: string
  options?: string[]
  conditionalOn?: string  // Question ID this depends on
  conditionalValue?: string | boolean | number  // Value that triggers visibility
  required?: boolean
  order: number
  visible: boolean
  value?: any
  children?: SurveyQuestion[]  // Nested questions for conditional logic
  helpText?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

// ============================================================================
// HEADER SECTION
// ============================================================================

export const headerSection: SurveySection = {
  id: 'header',
  title: 'Header Information',
  description: 'Client details and survey metadata',
  order: 1,
  isCompleted: false,
  questions: [
    {
      id: 'client_name',
      sectionId: 'header',
      type: 'text',
      label: 'Client Name',
      placeholder: 'Enter client name',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'site_address',
      sectionId: 'header',
      type: 'text',
      label: 'Site Address',
      placeholder: 'Enter full site address',
      required: true,
      order: 2,
      visible: true,
    },
    {
      id: 'internal_reference',
      sectionId: 'header',
      type: 'text',
      label: 'Internal Reference ID',
      placeholder: 'Auto-populated',
      required: false,
      order: 3,
      visible: true,
    },
    {
      id: 'survey_date',
      sectionId: 'header',
      type: 'text', // In production, use date picker
      label: 'Date of Inspection',
      placeholder: 'DD/MM/YYYY',
      required: true,
      order: 4,
      visible: true,
    },
    {
      id: 'weather_temperature',
      sectionId: 'header',
      type: 'number',
      label: 'Weather Temperature',
      subLabel: '°C',
      placeholder: 'Enter temperature',
      required: true,
      order: 5,
      visible: true,
      validation: { min: -20, max: 50 },
    },
    {
      id: 'weather_conditions',
      sectionId: 'header',
      type: 'text',
      label: 'Weather Conditions',
      placeholder: 'Describe weather conditions',
      required: true,
      order: 6,
      visible: true,
    },
  ],
}

// ============================================================================
// PROPERTY DETAILS SECTION
// ============================================================================

export const propertySection: SurveySection = {
  id: 'property',
  title: 'Property Details',
  description: 'Property type, construction and age',
  order: 2,
  isCompleted: false,
  questions: [
    {
      id: 'property_type',
      sectionId: 'property',
      type: 'select',
      label: 'The property is a:',
      options: [
        'Detached House',
        'Semi-Detached House',
        'Terraced House',
        'End of Terrace',
        'Bungalow',
        'Flat/Apartment',
        'Maisonette',
        'Townhouse',
        'Cottage',
        'Other',
      ],
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'construction_type',
      sectionId: 'property',
      type: 'select',
      label: 'The property is constructed of:',
      options: [
        'Solid Brick',
        'Cavity Wall',
        'Stone',
        'Timber Frame',
        'Concrete',
        'Steel Frame',
        'Mixed',
        'Other',
      ],
      required: true,
      order: 2,
      visible: true,
    },
    {
      id: 'property_age',
      sectionId: 'property',
      type: 'text',
      label: 'The property was built approximately:',
      placeholder: 'e.g., 1920s, Victorian, 1960s',
      required: true,
      order: 3,
      visible: true,
    },
    {
      id: 'reported_problem',
      sectionId: 'property',
      type: 'rich_text',
      label: 'Reported Problem',
      subLabel: 'The reported problem which was:',
      placeholder: 'Describe the problem reported by the client',
      required: true,
      order: 4,
      visible: true,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - BUILDING DEFECTS
// ============================================================================

export const buildingDefectsSection: SurveySection = {
  id: 'building_defects',
  title: 'External Inspection - Building Defects',
  description: 'Assessment of external building elements',
  order: 3,
  isCompleted: false,
  questions: [
    {
      id: 'no_building_defects',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'No building defects were noted at the time of our inspection.',
      subLabel: 'If Yes, skip remaining building defect questions',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'has_building_defects',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'We noted the following building defects:',
      required: true,
      order: 2,
      visible: true,
      conditionalOn: 'no_building_defects',
      conditionalValue: false,
    },
    // Chimney defects
    {
      id: 'defective_pointing_chimney',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective pointing to chimney stack',
      required: false,
      order: 3,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'defective_flashings_chimney',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective flashings to chimney stack',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    // Roof defects
    {
      id: 'defective_pointing_ridge',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective pointing to ridge tiles',
      required: false,
      order: 5,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'defective_pointing_verge',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective pointing to verge',
      required: false,
      order: 6,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'defective_pointing_hips',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective pointing to hips',
      required: false,
      order: 7,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'slipped_roof_slates',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Slipped roof slates',
      required: false,
      order: 8,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'loose_roof_slates',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Loose roof slates',
      required: false,
      order: 9,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'missing_roof_slates',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Missing roof slates',
      required: false,
      order: 10,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    // Rainwater goods
    {
      id: 'defective_rainwater_goods',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective rainwater goods',
      required: false,
      order: 11,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'blockage_rainwater_goods',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Blockage/vegetation to rainwater goods',
      required: false,
      order: 12,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    // Wall defects
    {
      id: 'defective_pointing_walls',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective pointing to external walls',
      required: false,
      order: 13,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'perished_paintwork',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Perished external paintwork',
      required: false,
      order: 14,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'wet_rot_joinery',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Wet rot noted to external joinery timbers',
      required: false,
      order: 15,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'perished_brickwork',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Perished external brickwork',
      required: false,
      order: 16,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'defective_perimeter_joint',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Defective perimeter joint',
      required: false,
      order: 17,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'cracks_walls',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Cracks/movement to walls',
      required: false,
      order: 18,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'cracks_lintels',
      sectionId: 'building_defects',
      type: 'yes_no',
      label: 'Cracks/movement to lintels',
      required: false,
      order: 19,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
    {
      id: 'other_building_defects',
      sectionId: 'building_defects',
      type: 'rich_text',
      label: 'Other building defects',
      placeholder: 'Describe any other defects not listed above',
      required: false,
      order: 20,
      visible: true,
      conditionalOn: 'has_building_defects',
      conditionalValue: true,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - WALL TIES
// ============================================================================

export const wallTiesSection: SurveySection = {
  id: 'wall_ties',
  title: 'External Inspection - Wall Ties',
  description: 'Assessment of wall tie condition',
  order: 4,
  isCompleted: false,
  questions: [
    {
      id: 'lateral_cracks_noted',
      sectionId: 'wall_ties',
      type: 'yes_no',
      label: 'Our surveyor noted lateral cracks within the render/mortar beds',
      subLabel: 'This is often a sign of decayed wall ties',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'wall_tie_recommendation',
      sectionId: 'wall_ties',
      type: 'select',
      label: 'Recommendation',
      options: [
        'Arrange wall tie survey USCC',
        'Arrange wall tie inspection from specialist USCC',
        'No further action required',
        'Not applicable',
      ],
      required: true,
      order: 2,
      visible: true,
      conditionalOn: 'lateral_cracks_noted',
      conditionalValue: true,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - CRACKING TO WALLS
// ============================================================================

export const crackingWallsSection: SurveySection = {
  id: 'cracking_walls',
  title: 'External Inspection - Cracking To Walls',
  description: 'Assessment of structural cracking',
  order: 5,
  isCompleted: false,
  questions: [
    {
      id: 'lateral_stepped_cracks',
      sectionId: 'cracking_walls',
      type: 'yes_no',
      label: 'Our surveyor noted lateral/stepped cracks within the render/mortar beds',
      subLabel: 'This is often a sign of movement within the structure',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'structural_survey_recommendation',
      sectionId: 'cracking_walls',
      type: 'select',
      label: 'Recommendation',
      options: [
        'Arrange structural repair survey USCC',
        'Arrange structural engineer assessment USCC',
        'No further action required',
        'Not applicable',
      ],
      required: true,
      order: 2,
      visible: true,
      conditionalOn: 'lateral_stepped_cracks',
      conditionalValue: true,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - GROUND LEVELS
// ============================================================================

export const groundLevelsSection: SurveySection = {
  id: 'ground_levels',
  title: 'External Inspection - Ground Levels',
  description: 'Assessment of external ground conditions',
  order: 6,
  isCompleted: false,
  questions: [
    {
      id: 'no_ground_issues',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'There were no apparent ground level issues',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'high_ground_levels',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'We noted high ground levels to the following areas:',
      required: false,
      order: 2,
      visible: true,
      conditionalOn: 'no_ground_issues',
      conditionalValue: false,
    },
    {
      id: 'high_ground_locations',
      sectionId: 'ground_levels',
      type: 'rich_text',
      label: 'Areas with high ground levels',
      placeholder: 'List areas where ground levels are too high',
      required: false,
      order: 3,
      visible: true,
      conditionalOn: 'high_ground_levels',
      conditionalValue: true,
    },
    {
      id: 'ground_falling_towards_building',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'External ground was falling towards building at:',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'no_ground_issues',
      conditionalValue: false,
    },
    {
      id: 'ground_falling_locations',
      sectionId: 'ground_levels',
      type: 'rich_text',
      label: 'Areas where ground falls towards building',
      placeholder: 'List areas where ground slopes towards building',
      required: false,
      order: 5,
      visible: true,
      conditionalOn: 'ground_falling_towards_building',
      conditionalValue: true,
    },
    {
      id: 'aco_drain_recommended',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'The following areas would benefit from the installation of an aco drain channel',
      required: false,
      order: 6,
      visible: true,
      conditionalOn: 'no_ground_issues',
      conditionalValue: false,
    },
    {
      id: 'aco_drain_areas',
      sectionId: 'ground_levels',
      type: 'rich_text',
      label: 'Areas for aco drain installation',
      placeholder: 'Describe areas that would benefit from aco drain',
      required: false,
      order: 7,
      visible: true,
      conditionalOn: 'aco_drain_recommended',
      conditionalValue: true,
    },
    {
      id: 'lower_ground_levels',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'Lower the ground levels to create sufficient clearance below the DPC',
      required: false,
      order: 8,
      visible: true,
      conditionalOn: 'no_ground_issues',
      conditionalValue: false,
    },
    {
      id: 'lower_ground_areas',
      sectionId: 'ground_levels',
      type: 'rich_text',
      label: 'Areas to lower ground levels',
      placeholder: 'Describe areas and extent of ground lowering required',
      required: false,
      order: 9,
      visible: true,
      conditionalOn: 'lower_ground_levels',
      conditionalValue: true,
    },
    {
      id: 'french_drain_recommended',
      sectionId: 'ground_levels',
      type: 'yes_no',
      label: 'Form a french drain by installing gravel to promote breathing of the walls',
      required: false,
      order: 10,
      visible: true,
      conditionalOn: 'no_ground_issues',
      conditionalValue: false,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - DAMP PROOF COURSE
// ============================================================================

export const dpcSection: SurveySection = {
  id: 'dpc',
  title: 'External Inspection - Damp Proof Course',
  description: 'Assessment of existing damp proofing',
  order: 7,
  isCompleted: false,
  questions: [
    {
      id: 'original_dpc_present',
      sectionId: 'dpc',
      type: 'yes_no',
      label: 'There is evidence of an original damp proof course in the mortar bed',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'chemical_dpc_present',
      sectionId: 'dpc',
      type: 'yes_no',
      label: 'There is evidence of a chemical injection damp proof course',
      required: false,
      order: 2,
      visible: true,
    },
    {
      id: 'dpc_not_visible',
      sectionId: 'dpc',
      type: 'yes_no',
      label: 'The area where the damp proof course should be located was not visible',
      subLabel: 'Cannot confirm or deny existence of DPC',
      required: false,
      order: 3,
      visible: true,
    },
    {
      id: 'possible_previous_work',
      sectionId: 'dpc',
      type: 'yes_no',
      label: 'It is possible that work may have been carried out by another company in the past',
      required: false,
      order: 4,
      visible: true,
    },
    {
      id: 'dpc_proposal',
      sectionId: 'dpc',
      type: 'select',
      label: 'Proposal',
      options: [
        'Install low pressure injection damp proof course system',
        'Check existing guarantee coverage',
        'No further damp proof works required',
        'Further investigation needed',
      ],
      required: true,
      order: 5,
      visible: true,
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - SUB FLOOR VENTILATION
// ============================================================================

export const subFloorVentSection: SurveySection = {
  id: 'subfloor_vent',
  title: 'External Inspection - Sub Floor Ventilation',
  description: 'Assessment of sub-floor ventilation',
  order: 8,
  isCompleted: false,
  questions: [
    {
      id: 'no_airbricks',
      sectionId: 'subfloor_vent',
      type: 'yes_no',
      label: 'There were no airbricks installed',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'airbricks_obstructed',
      sectionId: 'subfloor_vent',
      type: 'yes_no',
      label: 'It was not possible to inspect the airbricks due to obstructions',
      required: false,
      order: 2,
      visible: true,
    },
    {
      id: 'obstruction_type',
      sectionId: 'subfloor_vent',
      type: 'multi_select',
      label: 'Obstruction type',
      options: [
        'Polished solid wood flooring',
        'Laminate, vinyl, Lino or cushion-floor overlay',
        'Carpets heavily tacked',
        'Ceramic tiling',
        'Furniture obstructing access',
        'Other',
      ],
      required: false,
      order: 3,
      visible: true,
      conditionalOn: 'airbricks_obstructed',
      conditionalValue: true,
    },
    {
      id: 'obstruction_details',
      sectionId: 'subfloor_vent',
      type: 'rich_text',
      label: 'Obstruction details',
      placeholder: 'Describe the obstruction',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'airbricks_obstructed',
      conditionalValue: true,
    },
    {
      id: 'airbrick_count_front',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks - Front elevation',
      required: false,
      order: 5,
      visible: true,
      validation: { min: 0, max: 50 },
    },
    {
      id: 'airbrick_count_left',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks - Left elevation',
      required: false,
      order: 6,
      visible: true,
      validation: { min: 0, max: 50 },
    },
    {
      id: 'airbrick_count_right',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks - Right elevation',
      required: false,
      order: 7,
      visible: true,
      validation: { min: 0, max: 50 },
    },
    {
      id: 'airbrick_count_rear',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks - Rear elevation',
      required: false,
      order: 8,
      visible: true,
      validation: { min: 0, max: 50 },
    },
    {
      id: 'airbrick_count_rear_offshoot',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks - Rear offshoot',
      required: false,
      order: 9,
      visible: true,
      validation: { min: 0, max: 50 },
    },
    {
      id: 'airbricks_blocked',
      sectionId: 'subfloor_vent',
      type: 'yes_no',
      label: 'Some existing airbricks appeared to be blocked',
      required: false,
      order: 10,
      visible: true,
    },
    {
      id: 'airbricks_too_low',
      sectionId: 'subfloor_vent',
      type: 'yes_no',
      label: 'Some airbricks were installed too low to external ground levels',
      subLabel: 'May permit water ingress to sub floor voids',
      required: false,
      order: 11,
      visible: true,
    },
    {
      id: 'proposal_airbricks',
      sectionId: 'subfloor_vent',
      type: 'multi_select',
      label: 'Proposal for airbricks',
      options: [
        'Remove and reinstall existing airbricks',
        'Upgrade airbricks to 225 x 150',
        'Install additional airbricks',
        'Lift existing airbricks',
        'No further works required',
      ],
      required: true,
      order: 12,
      visible: true,
    },
    {
      id: 'airbricks_to_remove',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks to remove',
      required: false,
      order: 13,
      visible: true,
      conditionalOn: 'proposal_airbricks',
      conditionalValue: 'remove',
    },
    {
      id: 'airbricks_to_upgrade',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks to upgrade',
      required: false,
      order: 14,
      visible: true,
      conditionalOn: 'proposal_airbricks',
      conditionalValue: 'upgrade',
    },
    {
      id: 'airbricks_to_install',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of additional airbricks to install',
      required: false,
      order: 15,
      visible: true,
      conditionalOn: 'proposal_airbricks',
      conditionalValue: 'install',
    },
    {
      id: 'airbricks_to_lift',
      sectionId: 'subfloor_vent',
      type: 'number',
      label: 'Number of airbricks to lift',
      required: false,
      order: 16,
      visible: true,
      conditionalOn: 'proposal_airbricks',
      conditionalValue: 'lift',
    },
  ],
}

// ============================================================================
// EXTERNAL INSPECTION - SUB FLOOR TIMBERS
// ============================================================================

export const subFloorTimbersSection: SurveySection = {
  id: 'subfloor_timbers',
  title: 'External Inspection - Sub Floor Timbers',
  description: 'Assessment of sub-floor timber condition',
  order: 9,
  isCompleted: false,
  questions: [
    {
      id: 'subfloor_timbers_not_inspectable',
      sectionId: 'subfloor_timbers',
      type: 'yes_no',
      label: 'It was not possible to inspect the sub floor timbers',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'subfloor_inspection_obstruction',
      sectionId: 'subfloor_timbers',
      type: 'multi_select',
      label: 'Reason for non-inspection',
      options: [
        'Polished solid wood flooring',
        'Laminate, vinyl, Lino or cushion-floor overlay',
        'Carpets heavily tacked',
        'Ceramic tiling',
        'Furniture obstructing access',
        'Other',
      ],
      required: false,
      order: 2,
      visible: true,
      conditionalOn: 'subfloor_timbers_not_inspectable',
      conditionalValue: true,
    },
    {
      id: 'subfloor_moisture_reading',
      sectionId: 'subfloor_timbers',
      type: 'number',
      label: 'Sub floor timber moisture content',
      subLabel: '% W/W',
      placeholder: 'Enter moisture reading',
      required: false,
      order: 3,
      visible: true,
      validation: { min: 0, max: 100 },
    },
    {
      id: 'timbers_at_risk',
      sectionId: 'subfloor_timbers',
      type: 'yes_no',
      label: 'Timbers equal to or above 20% W/W are classed as being at risk',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'subfloor_moisture_reading',
      conditionalValue: 20,
    },
    {
      id: 'sufficient_airflow',
      sectionId: 'subfloor_timbers',
      type: 'yes_no',
      label: 'Airbricks are providing sufficient airflow (reading below 20%)',
      required: false,
      order: 5,
      visible: true,
      conditionalOn: 'subfloor_moisture_reading',
      conditionalValue: 20,
    },
    {
      id: 'timber_proposal',
      sectionId: 'subfloor_timbers',
      type: 'select',
      label: 'Proposal for timbers',
      options: [
        'Treat with anti-fungal fogging application',
        'No further works required',
        'Further investigation required',
      ],
      required: true,
      order: 6,
      visible: true,
    },
  ],
}

// ============================================================================
// INTERNAL INSPECTION - FLOORS
// ============================================================================

export const internalFloorsSection: SurveySection = {
  id: 'internal_floors',
  title: 'Internal Inspection - Floors',
  description: 'Assessment of internal floor condition',
  order: 10,
  isCompleted: false,
  questions: [
    {
      id: 'timber_floors_present',
      sectionId: 'internal_floors',
      type: 'yes_no',
      label: 'Timber floors present',
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'no_timber_defects',
      sectionId: 'internal_floors',
      type: 'yes_no',
      label: 'An inspection of timbers adjacent to damp masonry did not reveal any timber defects',
      required: false,
      order: 2,
      visible: true,
      conditionalOn: 'timber_floors_present',
      conditionalValue: true,
    },
    {
      id: 'wood_rot_detected',
      sectionId: 'internal_floors',
      type: 'yes_no',
      label: 'Inspection revealed issues with wood rot',
      subLabel: 'Please see attached timber inspection report',
      required: false,
      order: 3,
      visible: true,
      conditionalOn: 'timber_floors_present',
      conditionalValue: true,
    },
    {
      id: 'wood_rot_summary',
      sectionId: 'internal_floors',
      type: 'rich_text',
      label: 'Wood rot summary',
      placeholder: 'Describe the wood rot issues found',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'wood_rot_detected',
      conditionalValue: true,
    },
    {
      id: 'floors_not_accessible',
      sectionId: 'internal_floors',
      type: 'yes_no',
      label: 'It was not possible to inspect the sub floor timbers',
      required: false,
      order: 5,
      visible: true,
      conditionalOn: 'timber_floors_present',
      conditionalValue: true,
    },
    {
      id: 'floor_obstruction_type',
      sectionId: 'internal_floors',
      type: 'multi_select',
      label: 'Reason for non-access',
      options: [
        'Polished solid wood flooring',
        'Laminate, vinyl, Lino or cushion-floor overlay',
        'Carpets heavily tacked',
        'Ceramic tiling',
        'Furniture obstructing access',
        'Other',
      ],
      required: false,
      order: 6,
      visible: true,
      conditionalOn: 'floors_not_accessible',
      conditionalValue: true,
    },
  ],
}

// ============================================================================
// INTERNAL INSPECTION - WALLS
// ============================================================================

export const internalWallsSection: SurveySection = {
  id: 'internal_walls',
  title: 'Internal Inspection - Walls',
  description: 'Assessment of internal wall condition',
  order: 11,
  isCompleted: false,
  questions: [
    {
      id: 'dampness_detected',
      sectionId: 'internal_walls',
      type: 'select',
      label: 'Inspection conclusion',
      options: [
        'Evidence of dampness to the walls',
        'Evidence of condensation to the walls',
        'Evidence of dampness and condensation',
        'No evidence of dampness or condensation',
      ],
      required: true,
      order: 1,
      visible: true,
    },
    {
      id: 'plaster_degradation',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'The wall plastering has suffered degradation due to dampness',
      required: true,
      order: 2,
      visible: true,
      conditionalOn: 'dampness_detected',
      conditionalValue: 'dampness',
    },
    {
      id: 'plaster_defects',
      sectionId: 'internal_walls',
      type: 'multi_select',
      label: 'Plaster defects noted',
      options: [
        'Shadow bands (darker areas resembling shadows)',
        'Signs of salting',
        'Loss of key',
      ],
      required: false,
      order: 3,
      visible: true,
      conditionalOn: 'plaster_degradation',
      conditionalValue: true,
    },
    {
      id: 'no_plaster_degradation',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'No apparent degradation to internal plaster/render surfaces',
      required: false,
      order: 4,
      visible: true,
      conditionalOn: 'dampness_detected',
      conditionalValue: 'dampness',
    },
    {
      id: 'wall_proposal',
      sectionId: 'internal_walls',
      type: 'multi_select',
      label: 'Proposal for walls',
      options: [
        'Remove and set aside radiators',
        'Remove and set aside socket fronts',
        'Remove skirting boards/boxing',
        'Strip off existing plaster/render',
        'Strip back wallpaper',
        'Install damp proofing system',
        'Install wall floor fillet seal',
        'Dispose of debris via licensed facility',
        'Arrange asbestos testing',
        'No further works required',
      ],
      required: true,
      order: 5,
      visible: true,
    },
    {
      id: 'walls_not_inspectable',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'It was not possible to inspect some walls',
      required: false,
      order: 6,
      visible: true,
    },
    {
      id: 'wall_inspection_obstruction',
      sectionId: 'internal_walls',
      type: 'multi_select',
      label: 'Reason for non-inspection',
      options: [
        'Ceramic tiling',
        'Furniture obstructing access',
        'Other',
      ],
      required: false,
      order: 7,
      visible: true,
      conditionalOn: 'walls_not_inspectable',
      conditionalValue: true,
    },
    {
      id: 'solid_floors_present',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'Solid floors present',
      required: true,
      order: 8,
      visible: true,
    },
    {
      id: 'solid_floors_inspected',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'Solid floors are included in inspection',
      required: false,
      order: 9,
      visible: true,
      conditionalOn: 'solid_floors_present',
      conditionalValue: true,
    },
    {
      id: 'dampness_in_solid_floors',
      sectionId: 'internal_walls',
      type: 'yes_no',
      label: 'Dampness noted within concrete floor(s)',
      required: false,
      order: 10,
      visible: true,
      conditionalOn: 'solid_floors_present',
      conditionalValue: true,
    },
  ],
}

// ============================================================================
// EXPORT ALL SECTIONS
// ============================================================================

export const surveySections: SurveySection[] = [
  headerSection,
  propertySection,
  buildingDefectsSection,
  wallTiesSection,
  crackingWallsSection,
  groundLevelsSection,
  dpcSection,
  subFloorVentSection,
  subFloorTimbersSection,
  internalFloorsSection,
  internalWallsSection,
]

// Helper function to get section by ID
export function getSectionById(id: string): SurveySection | undefined {
  return surveySections.find(s => s.id === id)
}

// Helper function to check if question should be visible
export function isQuestionVisible(
  question: SurveyQuestion,
  answers: Record<string, any>
): boolean {
  if (!question.conditionalOn) return true

  const dependentValue = answers[question.conditionalOn]

  if (dependentValue === undefined) return false

  if (typeof question.conditionalValue === 'boolean') {
    return dependentValue === question.conditionalValue
  }

  if (typeof question.conditionalValue === 'number') {
    // For numeric comparisons
    if (typeof dependentValue === 'number') {
      if (question.conditionalOn.includes('above')) {
        return dependentValue >= question.conditionalValue
      }
    }
    return dependentValue === question.conditionalValue
  }

  return dependentValue === question.conditionalValue
}

// Helper to check if all required questions in section are answered
export function isSectionComplete(
  section: SurveySection,
  answers: Record<string, any>
): boolean {
  const visibleQuestions = section.questions.filter(q =>
    q.required && isQuestionVisible(q, answers)
  )

  return visibleQuestions.every(q =>
    answers[q.id] !== undefined &&
    answers[q.id] !== null &&
    answers[q.id] !== ''
  )
}
