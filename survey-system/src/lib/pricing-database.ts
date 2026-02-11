/**
 * Tyne Tees Damp Proofing - Pricing Database
 *
 * Structured for Supabase PostgreSQL migration:
 * - Uses PostgreSQL-compatible types
 * - Indexed fields for query performance
 * - JSONB for flexible survey-to-pricing mappings
 * - Foreign key relationships ready for relational schema
 *
 * Migration to Supabase:
 * 1. Run the schema migration in supabase/migrations/
 * 2. Seed with data from this file
 * 3. Update frontend to use Supabase client instead of local storage
 */

// ============================================================================
// BASE RATES (Single source of truth for pricing)
// ============================================================================

export const BASE_RATES = {
  labor: {
    base_hourly_rate: 30.63,      // £30.63 per hour base
    markup_percentage: 100,        // 100% markup = £61.26 charged
  },
  contractor: {
    hourly_rate: 28.00,           // £28.00 per hour paid to contractor
  },
  travel: {
    hourly_rate: 30.63,           // Travel time billed at labor rate
    vehicle_cost_per_mile: 0.50,  // Fuel cost per mile
  },
} as const

// ============================================================================
// MARKUP CONFIGURATIONS BY ITEM TYPE
// ============================================================================

export const MARKUP_CONFIG = {
  MTL: { percentage: 30, name: 'Materials' },        // 30% markup on supplier materials
  LBR: { percentage: 100, name: 'Labour' },           // 100% markup on labor
  SUB: { percentage: 0, name: 'Subcontractor' },      // No markup (contractor rate)
  OVR: { percentage: 30, name: 'Overheads' },         // 30% on project overheads
  TRA: { percentage: 0, name: 'Travel' },             // No markup on travel
} as const

// ============================================================================
// WORK SECTIONS - Maps to survey sections for auto-pricing
// ============================================================================

export const WORK_SECTIONS = {
  preparatory: {
    id: 'preparatory',
    name: 'Stripping Out / Preparatory Work',
    description: 'All preparatory works required before damp proofing',
    is_optional: false,
    display_order: 1,
  },
  walls_dpc: {
    id: 'walls_dpc',
    name: 'Walls (DPC Installation)',
    description: 'Damp proof course installation - traditional or digital',
    is_optional: false,
    display_order: 2,
  },
  walls_membrane: {
    id: 'walls_membrane',
    name: 'Walls (Cavity Drain Membrane)',
    description: 'CM3 mesh cavity drain membrane system',
    is_optional: false,
    display_order: 3,
  },
  tanking: {
    id: 'tanking',
    name: 'Cementitious Tanking System',
    description: 'Internal tanking system for waterproofing',
    is_optional: false,
    display_order: 4,
  },
  floor_resin: {
    id: 'floor_resin',
    name: 'Floor Liquid Resin Membranes',
    description: 'EP40 epoxy resin floor coating system',
    is_optional: false,
    display_order: 5,
  },
  plastering: {
    id: 'plastering',
    name: 'Plastering & Finishing',
    description: 'All plastering and decorative finishes',
    is_optional: false,
    display_order: 6,
  },
  insulation: {
    id: 'insulation',
    name: 'Warmline Internal Wall Insulation',
    description: 'TIWI thin internal wall insulation system',
    is_optional: false,
    display_order: 7,
  },
  flooring: {
    id: 'flooring',
    name: 'Floor Joists & Decking',
    description: 'Structural timber floor repairs and replacements',
    is_optional: false,
    display_order: 8,
  },
  airbricks: {
    id: 'airbricks',
    name: 'Airbricks & Ventilation',
    description: 'Sub-floor ventilation improvements',
    is_optional: false,
    display_order: 9,
  },
  spray_treatment: {
    id: 'spray_treatment',
    name: 'Spray Treatments',
    description: 'Anti-fungal sub-floor treatments',
    is_optional: false,
    display_order: 10,
  },
  drains: {
    id: 'drains',
    name: 'Drainage Systems',
    description: 'Aco drain and French drain installation',
    is_optional: true,
    display_order: 11,
  },
  external_treatment: {
    id: 'external_treatment',
    name: 'External Wall Treatment',
    description: 'Aquaban water repellent system',
    is_optional: true,
    display_order: 12,
  },
  asbestos: {
    id: 'asbestos',
    name: 'Asbestos Testing',
    description: 'Asbestos survey and testing',
    is_optional: true,
    display_order: 13,
  },
  overheads: {
    id: 'overheads',
    name: 'Project Specific Overheads',
    description: 'Skips, tools, equipment, and project management',
    is_optional: false,
    display_order: 14,
  },
} as const

// ============================================================================
// MATERIALS CATALOG - Complete with supplier pricing
// Source: DP_Materials_List.csv (Preservation Shop pricing)
// ============================================================================

export const MATERIALS_CATALOG = {
  // PREP WORK MATERIALS
  'antinox_floor_protection': {
    id: 'antinox_floor_protection',
    name: 'Antinox HD Floor Protection Boards – 2.4m x 1.2m',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/',
    unit_cost: 4.16,
    unit: 'Each',
    coverage: '2.88 m2 per sheet',
    category: 'prep',
    default_quantity: 0,
  },

  // DPC MATERIALS
  'ultracure_cream': {
    id: 'ultracure_cream',
    name: 'Wykamol Ultracure Damp Proofing Cream',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-ultracure-damp-proofing-cream/',
    unit_cost: 13.93,
    unit: '1ltr Cartridge',
    coverage: '10 linear metres at 115mm brick thickness',
    category: 'dpc',
    default_quantity: 0,
  },
  'drill_plugs_12mm': {
    id: 'drill_plugs_12mm',
    name: 'Drill Plugs 12mm – Grey or Black',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/12mm-drill-plugs-grey-for-dpc-injection/',
    unit_cost: 0.04,
    unit: 'Each (round to 50)',
    coverage: '50 plugs per 6 linear metres',
    category: 'dpc',
    default_quantity: 0,
  },
  'mursec_eco_unit': {
    id: 'mursec_eco_unit',
    name: 'Mursec Eco Unit - Digital DPC',
    supplier: 'Murrett',
    supplier_url: null,
    unit_cost: 750.00,  // Minimum selling price per unit
    unit: 'Each',
    coverage: 'Per unit (varies by property)',
    category: 'dpc',
    default_quantity: 0,
  },

  // CAVITY DRAIN MEMBRANE - 1mtr
  'cm3_membrane_1mtr': {
    id: 'cm3_membrane_1mtr',
    name: 'Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/',
    unit_cost: 4.17,
    unit: 'M2',
    coverage: 'Sold in 5m roll increments',
    category: 'membrane',
    default_quantity: 0,
  },
  // CAVITY DRAIN MEMBRANE - 1.2mtr
  'cm3_membrane_1_2mtr': {
    id: 'cm3_membrane_1_2mtr',
    name: 'Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/',
    unit_cost: 4.45,
    unit: 'M2',
    coverage: 'Sold in 5m roll increments',
    category: 'membrane',
    default_quantity: 0,
  },
  // CAVITY DRAIN MEMBRANE - 2mtr
  'cm3_membrane_2mtr': {
    id: 'cm3_membrane_2mtr',
    name: 'Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/',
    unit_cost: 4.42,
    unit: 'M2',
    coverage: 'Sold in 5m roll increments',
    category: 'membrane',
    default_quantity: 0,
  },
  // MEMBRANE FIXINGS
  'membrane_plugs_50mm': {
    id: 'membrane_plugs_50mm',
    name: 'Cavity Membrane Fixing Plugs – 50mm',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/cavity-membrane-fixing-plugs-50mm/',
    unit_cost: 0.09,
    unit: 'Each (round to 20)',
    coverage: '10 plugs per m2',
    category: 'membrane',
    default_quantity: 0,
  },
  'sealing_tape_28mm': {
    id: 'sealing_tape_28mm',
    name: 'Wykamol Membrane Sealing Tape – 28mm x 22m',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-membrane-sealing-tape-28mm-x-22m/',
    unit_cost: 19.16,
    unit: 'Roll x 22 mtrs',
    coverage: '22 linear metres per roll',
    category: 'membrane',
    default_quantity: 0,
  },
  'technoseal_5ltr': {
    id: 'technoseal_5ltr',
    name: 'Wykamol Technoseal Liquid DPM 5ltr - Black or White',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/',
    unit_cost: 23.33,
    unit: '5ltr Container',
    coverage: '80 linear metres per 5ltr container',
    category: 'membrane',
    default_quantity: 0,
  },
  'universal_mortar': {
    id: 'universal_mortar',
    name: 'Wykamol Universal Mortar',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-universal-mortar/',
    unit_cost: 24.51,
    unit: '25kg Bag',
    coverage: '12 linear metres per bag (fillet joints)',
    category: 'membrane',
    default_quantity: 0,
  },
  'fleece_tape_115mm': {
    id: 'fleece_tape_115mm',
    name: 'Wykamol Membrane Fibre/Fleece Tape – 115mm X 5m',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-fibre-tape/',
    unit_cost: 10.83,
    unit: 'Roll x 5 mtrs',
    coverage: '5 linear metres per roll',
    category: 'membrane',
    default_quantity: 0,
  },
  'rope_10mm': {
    id: 'rope_10mm',
    name: 'Wykamol Rope 10mm x 5m',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-rope-10mm-x-5m/',
    unit_cost: 10.33,
    unit: 'Roll x 5 mtrs',
    coverage: '5 linear metres per roll',
    category: 'membrane',
    default_quantity: 0,
  },

  // CEMENTITIOUS TANKING
  'sbr_latex': {
    id: 'sbr_latex',
    name: 'Wykamol SBR Latex – 5ltr',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-sbr-latex-5l/',
    unit_cost: 16.66,
    unit: '5ltr Container',
    coverage: 'Dubbing out: 4m per tub with sand/cement',
    category: 'tanking',
    default_quantity: 0,
  },
  'building_sand': {
    id: 'building_sand',
    name: 'Building Sand',
    supplier: 'Builders Merchant',
    supplier_url: null,
    unit_cost: 2.79,
    unit: 'Per bag',
    coverage: 'For tanking mix',
    category: 'tanking',
    default_quantity: 0,
  },
  'cement_25kg': {
    id: 'cement_25kg',
    name: 'Cement 25kg',
    supplier: 'Builders Merchant',
    supplier_url: 'https://www.preservationshop.co.uk/product/cement/',
    unit_cost: 7.69,
    unit: 'Per bag',
    coverage: 'For tanking mix',
    category: 'tanking',
    default_quantity: 0,
  },
  'hydradry_tanking': {
    id: 'hydradry_tanking',
    name: 'Wykamol Hydradry Tanking Slurry – 20kg',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/hydradry-tanking-slurry/',
    unit_cost: 21.70,
    unit: '20kg Container',
    coverage: '7 m2 per tub (2 coat application)',
    category: 'tanking',
    default_quantity: 0,
  },
  'renovating_plaster': {
    id: 'renovating_plaster',
    name: 'Wykamol Renovating Plaster – 20kg Bag',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/renovating-plaster/',
    unit_cost: 16.25,
    unit: '20kg Bag',
    coverage: '3 m2 per bag at 10mm thickness',
    category: 'tanking',
    default_quantity: 0,
  },

  // FLOOR RESIN SYSTEM
  'ep40_primer': {
    id: 'ep40_primer',
    name: 'EP40 2 Pack resin Primer',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/ep40-primer-coat/',
    unit_cost: 56.70,
    unit: '5ltr Container',
    coverage: '30 m2 per tub',
    category: 'resin_floor',
    default_quantity: 0,
  },
  'ep40_topcoat': {
    id: 'ep40_topcoat',
    name: 'EP40 2 Pack resin top coat',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-ep40-epoxy-floor-coating-5l-grey/',
    unit_cost: 63.70,
    unit: '5ltr Container',
    coverage: '30 m2 per tub',
    category: 'resin_floor',
    default_quantity: 0,
  },
  'grip_grit': {
    id: 'grip_grit',
    name: 'Grip grit',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/grip-grit/',
    unit_cost: 2.08,
    unit: 'Bag',
    coverage: '25 m2 per bag',
    category: 'resin_floor',
    default_quantity: 0,
  },

  // PLASTERING MATERIALS
  'plasterboard_1220x900': {
    id: 'plasterboard_1220x900',
    name: 'Plasterboards, 1220mm x 900mm x 9.5mm',
    supplier: 'Builders Merchant',
    supplier_url: null,
    unit_cost: 8.24,
    unit: 'Each',
    coverage: '1.098 m2 per board',
    category: 'plastering',
    default_quantity: 0,
  },
  'stop_bead_3m': {
    id: 'stop_bead_3m',
    name: 'Plastering Stop Bead - 3m length',
    supplier: 'Builders Merchant',
    supplier_url: null,
    unit_cost: 1.00,
    unit: 'Each',
    coverage: 'Per length as needed',
    category: 'plastering',
    default_quantity: 0,
  },
  'angle_bead_2_4m': {
    id: 'angle_bead_2_4m',
    name: 'Plastering Thin Coat Angle/Corner Bead - 2.4m length',
    supplier: 'Builders Merchant',
    supplier_url: null,
    unit_cost: 1.66,
    unit: 'Each',
    coverage: 'Per length as needed',
    category: 'plastering',
    default_quantity: 0,
  },
  'angle_bead_3m': {
    id: 'angle_bead_3m',
    name: 'Plastering Thin Coat Angle/Corner Bead - 3m length',
    supplier: 'Builders Merchant',
    supplier_url: null,
    unit_cost: 2.49,
    unit: 'Each',
    coverage: 'Per length as needed',
    category: 'plastering',
    default_quantity: 0,
  },
  'multi_finish_plaster': {
    id: 'multi_finish_plaster',
    name: 'Multi Finish Plaster – 25kg Bag (British Gypsum Thistle)',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/multi-finish-plaster-25kg-bag-british-gypsum-thistle/',
    unit_cost: 12.08,
    unit: '25kg Bag',
    coverage: '10 m2 per bag',
    category: 'plastering',
    default_quantity: 0,
  },

  // INTERNAL WALL INSULATION
  'tiwi_roll': {
    id: 'tiwi_roll',
    name: 'Wykamol ISO-THERM TIWI – 0.95m x 7.5m',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/',
    unit_cost: 27.60,
    unit: 'Roll (7.125 m2)',
    coverage: '7.125 m2 per roll',
    category: 'insulation',
    default_quantity: 0,
  },
  'tiwi_adhesive': {
    id: 'tiwi_adhesive',
    name: 'Wykamol ISO-THERM Adhesive For TIWI',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/',
    unit_cost: 38.50,
    unit: 'Per 15kg tub',
    coverage: '7.125 m2 per tub',
    category: 'insulation',
    default_quantity: 0,
  },

  // AIRBRICKS
  'plastic_airbrick': {
    id: 'plastic_airbrick',
    name: 'Plastic Airbrick 9 x 3 (Beige, Black or Terracotta)',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/plastic-air-brick-9-x-3/',
    unit_cost: 1.66,
    unit: 'Each',
    coverage: '2 plastic airbricks = 1 installed airbrick',
    category: 'ventilation',
    default_quantity: 0,
  },

  // SPRAY TREATMENTS
  'microtech_dual': {
    id: 'microtech_dual',
    name: 'Wykamol Microtech Dual Purpose Concentrate - 400g',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-microtech-dual-purpose-concentrate/',
    unit_cost: 20.97,
    unit: '400g bottle',
    coverage: '400g makes 25 Litres = 100 m2 coverage',
    category: 'treatment',
    default_quantity: 0,
  },

  // EXTERNAL WALL TREATMENT
  'enviroseal_5ltr': {
    id: 'enviroseal_5ltr',
    name: 'Wykamol Enviroseal Liquid Water Repellent - 5ltr',
    supplier: 'Preservation Shop',
    supplier_url: 'https://www.preservationshop.co.uk/product/wykamol-enviroseal-liquid-water-repellent/',
    unit_cost: 12.50,
    unit: '5ltr Container',
    coverage: '25 m2 per 5ltr container',
    category: 'external',
    default_quantity: 0,
  },
} as const

// ============================================================================
// PRICING ITEMS - Complete item list with costs and labor hours
// Maps to CF_CSV_Upload structure for costing calculations
// ============================================================================

export const PRICING_ITEMS = {
  // =========================================================================
  // SECTION 1: STRIPPING OUT / PREPARATORY WORK
  // =========================================================================
  'prep_remove_radiators': {
    id: 'prep_remove_radiators',
    section_id: 'preparatory',
    name: 'Remove radiators & cap valves',
    unit: 'Each',
    material_cost: 7.00,
    labor_hours: 0.33,
    is_mandatory: true,
    item_type: 'MTL',
  },
  'prep_remove_sockets': {
    id: 'prep_remove_sockets',
    section_id: 'preparatory',
    name: 'Remove socket fronts and isolate',
    unit: 'Each',
    material_cost: 2.00,
    labor_hours: 0.20,
    is_mandatory: true,
    item_type: 'MTL',
  },
  'prep_skirting': {
    id: 'prep_skirting',
    section_id: 'preparatory',
    name: 'Skirting board removal & set aside',
    unit: 'LM',
    material_cost: 0.10,
    labor_hours: 0.07,
    is_mandatory: true,
    item_type: 'MTL',
  },
  'prep_strip_wallpaper': {
    id: 'prep_strip_wallpaper',
    section_id: 'preparatory',
    name: 'Strip Wall Paper',
    unit: 'M2',
    material_cost: 0.50,
    labor_hours: 0.50,
    is_mandatory: true,
    item_type: 'MTL',
  },
  'prep_remove_plaster': {
    id: 'prep_remove_plaster',
    section_id: 'preparatory',
    name: 'Remove plaster/render (Walls)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'prep_remove_stud': {
    id: 'prep_remove_stud',
    section_id: 'preparatory',
    name: 'Removal of stud walls etc (Bag & cart away)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.40,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'prep_remove_ceiling': {
    id: 'prep_remove_ceiling',
    section_id: 'preparatory',
    name: 'Plaster & stud Removal (Ceilings)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.80,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'prep_remove_floor': {
    id: 'prep_remove_floor',
    section_id: 'preparatory',
    name: 'Strip out existing timber floor (GF)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.50,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'prep_scrape_subfloor': {
    id: 'prep_scrape_subfloor',
    section_id: 'preparatory',
    name: 'Scrape back/clear sub floors',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.25,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'prep_bags': {
    id: 'prep_bags',
    section_id: 'preparatory',
    name: 'Bag up debris & cart outside',
    unit: 'Bags',
    material_cost: 1.00,
    labor_hours: 0.01,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'prep_disposal': {
    id: 'prep_disposal',
    section_id: 'preparatory',
    name: 'Disposal via licensed transfer agent',
    unit: 'Bags',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'MTL',
  },

  // =========================================================================
  // SECTION 2: WALLS DPC
  // =========================================================================
  'dpc_traditional': {
    id: 'dpc_traditional',
    section_id: 'walls_dpc',
    name: 'DPC Installation - Traditional',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.35,
    is_mandatory: true,
    item_type: 'LBR',
  },
  'dpc_digital': {
    id: 'dpc_digital',
    section_id: 'walls_dpc',
    name: 'DPC Installation - Digital',
    unit: 'Each',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: true,
    item_type: 'LBR',
    markup_override: 15.4,  // Different markup for digital DPC
  },

  // =========================================================================
  // SECTION 3: WALLS MEMBRANE
  // =========================================================================
  'membrane_cm3_1mtr': {
    id: 'membrane_cm3_1mtr',
    section_id: 'walls_membrane',
    name: 'Wall membrane CM3 - 1mtr',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'membrane_cm3_1_2mtr': {
    id: 'membrane_cm3_1_2mtr',
    section_id: 'walls_membrane',
    name: 'Wall membrane CM3 - 1.2mtr',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'membrane_cm3_2mtr_1': {
    id: 'membrane_cm3_2mtr_1',
    section_id: 'walls_membrane',
    name: 'Wall membrane CM3 - 2mtr #1',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'membrane_cm3_2mtr_2': {
    id: 'membrane_cm3_2mtr_2',
    section_id: 'walls_membrane',
    name: 'Wall membrane CM3 - 2mtr #2',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'membrane_cm3_2mtr_3': {
    id: 'membrane_cm3_2mtr_3',
    section_id: 'walls_membrane',
    name: 'Wall membrane CM3 - 2mtr #3',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'membrane_plugs': {
    id: 'membrane_plugs',
    section_id: 'walls_membrane',
    name: 'Membrane plugs for m2 listed',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.25,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'sealing_tape': {
    id: 'sealing_tape',
    section_id: 'walls_membrane',
    name: 'Sealing Tape Lm',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.10,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'technoseal': {
    id: 'technoseal',
    section_id: 'walls_membrane',
    name: 'Technoseal Lm',
    unit: 'LM',
    material_cost: 1.00,
    labor_hours: 0.0167,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'fillet_joint': {
    id: 'fillet_joint',
    section_id: 'walls_membrane',
    name: 'Wall/floor fillet joint',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'overtape': {
    id: 'overtape',
    section_id: 'walls_membrane',
    name: 'Overtape Lm',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.10,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'fixing_rope': {
    id: 'fixing_rope',
    section_id: 'walls_membrane',
    name: 'Fixing Rope Lm',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.10,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'difficulty_hours': {
    id: 'difficulty_hours',
    section_id: 'walls_membrane',
    name: 'Difficulty hours (additional hours if required)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 4: CEMENTITIOUS TANKING
  // =========================================================================
  'tanking_dubbing': {
    id: 'tanking_dubbing',
    section_id: 'tanking',
    name: 'Dubbing out coat (sand/cement/SBR)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'tanking_slurry': {
    id: 'tanking_slurry',
    section_id: 'tanking',
    name: '2 coat tanking slurry',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.35,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'tanking_renovating': {
    id: 'tanking_renovating',
    section_id: 'tanking',
    name: 'Renovating plaster',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'tanking_fillet': {
    id: 'tanking_fillet',
    section_id: 'tanking',
    name: 'Wall/floor fillet joint',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'tanking_difficulty': {
    id: 'tanking_difficulty',
    section_id: 'tanking',
    name: 'Difficulty hours (additional hours if required)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 5: FLOOR RESIN MEMBRANES
  // =========================================================================
  'resin_primer': {
    id: 'resin_primer',
    section_id: 'floor_resin',
    name: 'EP40 2 Pack resin Primer',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.04,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'resin_topcoat': {
    id: 'resin_topcoat',
    section_id: 'floor_resin',
    name: 'EP40 2 Pack resin top coat',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.04,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'resin_fillet': {
    id: 'resin_fillet',
    section_id: 'floor_resin',
    name: 'Wall/floor fillet joint',
    unit: 'LM',
    material_cost: 0.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'resin_grip': {
    id: 'resin_grip',
    section_id: 'floor_resin',
    name: 'Grip grit',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.01,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'resin_difficulty': {
    id: 'resin_difficulty',
    section_id: 'floor_resin',
    name: 'Difficulty hours (additional hours if required)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 6: PLASTERING & FINISHING
  // =========================================================================
  'plaster_studwall': {
    id: 'plaster_studwall',
    section_id: 'plastering',
    name: 'Construct stud wall to perimeter',
    unit: 'M2',
    material_cost: 14.00,
    labor_hours: 0.40,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'plaster_boarding': {
    id: 'plaster_boarding',
    section_id: 'plastering',
    name: 'Plaster boarding (inc dab/screws)',
    unit: 'M2',
    material_cost: 9.76,
    labor_hours: 0.40,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'plaster_tiwi': {
    id: 'plaster_tiwi',
    section_id: 'plastering',
    name: 'Warmline Internal Wall Insulation',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'plaster_skimming': {
    id: 'plaster_skimming',
    section_id: 'plastering',
    name: 'Skimming walls (multi finish plaster)',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.27,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'plaster_stop_bead': {
    id: 'plaster_stop_bead',
    section_id: 'plastering',
    name: 'Plastering Stop Bead - 3m length',
    unit: 'Each',
    material_cost: 1.10,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'plaster_angle_2_4m': {
    id: 'plaster_angle_2_4m',
    section_id: 'plastering',
    name: 'Plastering Thin Coat Angle/Corner Bead - 2.4m length',
    unit: 'Each',
    material_cost: 1.83,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'plaster_angle_3m': {
    id: 'plaster_angle_3m',
    section_id: 'plastering',
    name: 'Plastering Thin Coat Angle/Corner Beed - 3m length',
    unit: 'Each',
    material_cost: 2.75,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'plaster_difficulty': {
    id: 'plaster_difficulty',
    section_id: 'plastering',
    name: 'Difficulty hours (fireplace, corners etc)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 7: FLOOR JOISTS & DECKING
  // =========================================================================
  'joist_100x50': {
    id: 'joist_100x50',
    section_id: 'flooring',
    name: 'Joists, 100 x 50',
    unit: 'LM',
    material_cost: 5.46,
    labor_hours: 0.25,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_125x50': {
    id: 'joist_125x50',
    section_id: 'flooring',
    name: 'Joists, 125 x 50',
    unit: 'LM',
    material_cost: 6.50,
    labor_hours: 0.25,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_150x50': {
    id: 'joist_150x50',
    section_id: 'flooring',
    name: 'Joists, 150 x 50',
    unit: 'LM',
    material_cost: 7.70,
    labor_hours: 0.25,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_175x50': {
    id: 'joist_175x50',
    section_id: 'flooring',
    name: 'Joists, 175 x 50',
    unit: 'LM',
    material_cost: 8.00,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_200x50': {
    id: 'joist_200x50',
    section_id: 'flooring',
    name: 'Joists, 200 x 50',
    unit: 'LM',
    material_cost: 8.90,
    labor_hours: 0.30,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_225x50': {
    id: 'joist_225x50',
    section_id: 'flooring',
    name: 'Joists, 225 x 50',
    unit: 'LM',
    material_cost: 9.50,
    labor_hours: 0.40,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'joist_endwrap': {
    id: 'joist_endwrap',
    section_id: 'flooring',
    name: 'Treat and endwrap joist',
    unit: 'Each',
    material_cost: 3.00,
    labor_hours: 0.15,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'wall_plate': {
    id: 'wall_plate',
    section_id: 'flooring',
    name: 'Wall plate 100x25',
    unit: 'Each',
    material_cost: 4.84,
    labor_hours: 0.40,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'bower_beams': {
    id: 'bower_beams',
    section_id: 'flooring',
    name: 'Bower beams (pair)',
    unit: 'Pairs',
    material_cost: 36.00,
    labor_hours: 1.50,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flitch_plates': {
    id: 'flitch_plates',
    section_id: 'flooring',
    name: 'Flitch plates (pair)',
    unit: 'Pairs',
    material_cost: 42.00,
    labor_hours: 1.50,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_18mm': {
    id: 'flooring_18mm',
    section_id: 'flooring',
    name: 'Install Weyrock flooring 18mm (M2)',
    unit: 'M2',
    material_cost: 18.00,
    labor_hours: 0.40,
    contractor_cost: 24.50,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_22mm': {
    id: 'flooring_22mm',
    section_id: 'flooring',
    name: 'Install Weyrock flooring 22mm (M2)',
    unit: 'M2',
    material_cost: 22.00,
    labor_hours: 0.425,
    contractor_cost: 26.04,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_tg': {
    id: 'flooring_tg',
    section_id: 'flooring',
    name: 'Install std T&G Floorboards (M2)',
    unit: 'M2',
    material_cost: 46.30,
    labor_hours: 0.60,
    contractor_cost: 36.76,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_victorian_tg': {
    id: 'flooring_victorian_tg',
    section_id: 'flooring',
    name: 'Install Victorian T&G Floorboards (M2)',
    unit: 'M2',
    material_cost: 52.80,
    labor_hours: 0.60,
    contractor_cost: 36.76,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_engineered': {
    id: 'flooring_engineered',
    section_id: 'flooring',
    name: 'Install Engineered Flooring sheet (M2)',
    unit: 'M2',
    material_cost: 49.99,
    labor_hours: 0.40,
    contractor_cost: 24.50,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_structural': {
    id: 'flooring_structural',
    section_id: 'flooring',
    name: 'Install Structural Engineered Flooring sheet (M2) onto joists',
    unit: 'M2',
    material_cost: 52.80,
    labor_hours: 0.90,
    contractor_cost: 55.13,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_insulation': {
    id: 'flooring_insulation',
    section_id: 'flooring',
    name: 'Provide insulation to suspended flooring',
    unit: 'M2',
    material_cost: 6.80,
    labor_hours: 0.20,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'flooring_difficulty': {
    id: 'flooring_difficulty',
    section_id: 'flooring',
    name: 'Difficulty hours (additional hours if required)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 8: AIRBRICKS
  // =========================================================================
  'airbrick_clean': {
    id: 'airbrick_clean',
    section_id: 'airbricks',
    name: 'Clean out airbrick/fit new face',
    unit: 'Each',
    material_cost: 16.00,
    labor_hours: 0.50,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'airbrick_upgrade': {
    id: 'airbrick_upgrade',
    section_id: 'airbricks',
    name: 'Lift / upgrade existing airbrick/fit new face',
    unit: 'Each',
    material_cost: 16.00,
    labor_hours: 0.80,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'airbrick_additional': {
    id: 'airbrick_additional',
    section_id: 'airbricks',
    name: 'Install additional airbrick',
    unit: 'Each',
    material_cost: 16.00,
    labor_hours: 2.00,
    is_mandatory: false,
    item_type: 'MTL',
  },

  // =========================================================================
  // SECTION 9: SPRAY TREATMENTS
  // =========================================================================
  'spray_fog': {
    id: 'spray_fog',
    section_id: 'spray_treatment',
    name: 'Fog sub floor void with anti fungal treatment',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.20,
    is_mandatory: false,
    item_type: 'LBR',
  },
  'spray_difficulty': {
    id: 'spray_difficulty',
    section_id: 'spray_treatment',
    name: 'Difficulty hours (additional hours if required)',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 1.00,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 10: DRAINS (OPTIONAL)
  // =========================================================================
  'drain_aco': {
    id: 'drain_aco',
    section_id: 'drains',
    name: 'Aco Drain per linear meter',
    unit: 'LM',
    material_cost: 8.00,
    labor_hours: 1.00,
    is_optional: true,
    is_mandatory: false,
    item_type: 'MTL',
  },
  'drain_french': {
    id: 'drain_french',
    section_id: 'drains',
    name: 'French Drain per linear meter',
    unit: 'LM',
    material_cost: 2.41,
    labor_hours: 0.67,
    is_optional: true,
    is_mandatory: false,
    item_type: 'MTL',
  },

  // =========================================================================
  // SECTION 11: EXTERNAL WALL (OPTIONAL)
  // =========================================================================
  'external_aquaban': {
    id: 'external_aquaban',
    section_id: 'external_treatment',
    name: 'Aquaban water repellent system',
    unit: 'M2',
    material_cost: 0.00,
    labor_hours: 0.05,
    is_optional: true,
    is_mandatory: false,
    item_type: 'LBR',
  },

  // =========================================================================
  // SECTION 12: ASBESTOS TESTING (OPTIONAL)
  // =========================================================================
  'asbestos_test': {
    id: 'asbestos_test',
    section_id: 'asbestos',
    name: 'Asbestos Testing',
    unit: 'Each',
    material_cost: 30.00,
    labor_hours: 0.64,
    is_optional: true,
    is_mandatory: false,
    item_type: 'MTL',
  },

  // =========================================================================
  // SECTION 13: PROJECT OVERHEADS
  // =========================================================================
  'overhead_skip': {
    id: 'overhead_skip',
    section_id: 'overheads',
    name: 'Rubbish removal skips (8yd)',
    unit: 'Each',
    material_cost: 270.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'OVR',
  },
  'overhead_vehicle': {
    id: 'overhead_vehicle',
    section_id: 'overheads',
    name: 'Vehicle Costs (Fuel)',
    unit: 'Miles',
    material_cost: 0.50,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'TRA',
  },
  'overhead_travel': {
    id: 'overhead_travel',
    section_id: 'overheads',
    name: 'Travel Costs for Tradesmen',
    unit: 'Hours',
    material_cost: 0.00,
    labor_hours: 0.00,
    is_mandatory: false,
    item_type: 'TRA',
  },
} as const

// ============================================================================
// TYPE EXPORTS FOR DATABASE SCHEMA
// ============================================================================

export type BaseRateType = typeof BASE_RATES
export type MarkupConfigType = typeof MARKUP_CONFIG
export type WorkSectionType = typeof WORK_SECTIONS
export type MaterialsCatalogType = typeof MATERIALS_CATALOG
export type PricingItemsType = typeof PRICING_ITEMS

// Individual entry types
export type MaterialCatalogEntry = MaterialsCatalogType[keyof MaterialsCatalogType]
export type PricingItem = PricingItemsType[keyof PricingItemsType]
export type WorkSection = WorkSectionType[keyof WorkSectionType]

// ============================================================================
// HELPER FUNCTIONS FOR PRICING CALCULATIONS
// ============================================================================

/**
 * Calculate material cost with markup
 */
export function calculateMaterialCost(
  baseCost: number,
  quantity: number,
  markupPercentage: number = 30
): number {
  return baseCost * quantity * (1 + markupPercentage / 100)
}

/**
 * Calculate labor cost with markup
 */
export function calculateLaborCost(
  hours: number,
  baseRate: number = BASE_RATES.labor.base_hourly_rate,
  markupPercentage: number = 100
): number {
  return hours * baseRate * (1 + markupPercentage / 100)
}

/**
 * Calculate total item cost
 */
export function calculateItemCost(
  itemId: string,
  quantity: number
): { material: number; labor: number; total: number } {
  const item = PRICING_ITEMS[itemId]
  if (!item) {
    throw new Error(`Item not found: ${itemId}`)
  }

  const markup = item.markup_override ?? MARKUP_CONFIG[item.item_type as keyof typeof MARKUP_CONFIG]?.percentage ?? 30
  const materialCost = calculateMaterialCost(item.material_cost, quantity, markup)
  const laborCost = calculateLaborCost(item.labor_hours * quantity)

  return {
    material: materialCost,
    labor: laborCost,
    total: materialCost + laborCost,
  }
}

/**
 * Calculate section totals
 */
export function calculateSectionTotal(
  sectionId: string,
  items: Record<string, number>  // itemId -> quantity
): { material: number; labor: number; total: number; itemCount: number } {
  let material = 0
  let labor = 0
  let itemCount = 0

  for (const [itemId, quantity] of Object.entries(items)) {
    const item = PRICING_ITEMS[itemId]
    if (item && item.section_id === sectionId && quantity > 0) {
      const costs = calculateItemCost(itemId, quantity)
      material += costs.material
      labor += costs.labor
      itemCount++
    }
  }

  return {
    material,
    labor,
    total: material + labor,
    itemCount,
  }
}

/**
 * Get items by section
 */
export function getItemsBySection(sectionId: string) {
  return Object.values(PRICING_ITEMS).filter(item => item.section_id === sectionId)
}

/**
 * Get section details
 */
export function getSectionDetails(sectionId: string) {
  return WORK_SECTIONS[sectionId as keyof typeof WORK_SECTIONS]
}

/**
 * Get material details
 */
export function getMaterialDetails(materialId: string) {
  return MATERIALS_CATALOG[materialId as keyof typeof MATERIALS_CATALOG]
}

/**
 * Calculate VAT
 */
export function calculateVAT(subtotal: number, vatRate: number = 20): number {
  return subtotal * (vatRate / 100)
}

/**
 * Calculate total with VAT
 */
export function calculateTotalWithVAT(subtotal: number, vatRate: number = 20): {
  subtotal: number
  vat: number
  total: number
} {
  const vat = calculateVAT(subtotal, vatRate)
  return {
    subtotal,
    vat,
    total: subtotal + vat,
  }
}

/**
 * Generate customer summary from section totals
 */
export function generateCustomerSummary(
  sectionTotals: Record<string, { total: number; is_optional?: boolean }>,
  options: {
    includeOptional?: boolean
    vatRate?: number
  } = {}
): {
  sections: Array<{
    name: string
    total: number
    isOptional: boolean
  }>
  subtotal: number
  subtotalWithOptional: number
  vat: number
  total: number
} {
  const { includeOptional = false, vatRate = 20 } = options

  const sections = Object.entries(WORK_SECTIONS)
    .filter(([, section]) => section.is_optional === false || includeOptional)
    .map(([key, section]) => {
      const sectionTotal = sectionTotals[key]?.total ?? 0
      return {
        id: key,
        name: section.name,
        total: sectionTotal,
        isOptional: section.is_optional ?? false,
      }
    })

  const subtotal = sections
    .filter(s => !s.isOptional)
    .reduce((sum, s) => sum + s.total, 0)

  const subtotalWithOptional = sections
    .reduce((sum, s) => sum + s.total, 0)

  const { total } = calculateTotalWithVAT(subtotalWithOptional, vatRate)
  const vat = calculateVAT(subtotalWithOptional, vatRate)

  return {
    sections,
    subtotal,
    subtotalWithOptional,
    vat,
    total,
  }
}
