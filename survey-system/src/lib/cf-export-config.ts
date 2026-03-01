// =============================================================================
// CF CSV Export Configuration — Section Mapping for All 4 Survey Types
//
// Maps our internal DB section_keys to the exact CF section names used in the
// Contractor Foreman "CF CSV Upload" sheets. Extracted directly from all 4
// workbooks (Damp v48, Condensation v37, Timber v33/34, Woodworm v26).
//
// Key rules discovered from workbook investigation:
// - CF only imports BUNDLE rows (2 per section: Materials + Labour)
// - Column A = customer-visible section name
// - Column G = cost code (e.g. "Damp Materials" / "Damp Labour")
// - Column L = is_optional (Yes/No)
// - Section deleted from export if its raw cost = 0
// =============================================================================

/**
 * A single CF section definition — maps to one pair of bundle rows in the CSV.
 */
export interface CFSectionDef {
  /** Customer-visible section name in CF (Column A) */
  cfSectionName: string

  /** Whether this section is marked Is Optional = "Yes" in the CF workbook */
  isOptional: boolean

  /**
   * Our DB section_key values (within this survey type) that contribute to
   * this CF section. Multiple keys are combined into one CF bundle.
   */
  sectionKeys: string[]

  /**
   * Optional filter on templateDescription.
   * Used to split the plastering section:
   *  - non-Warmline items → "Plastering & finishing"
   *  - Warmline items → "Warmline Internal Wall Insulation"
   * When provided, only lines whose description passes the filter are included.
   */
  templateFilter?: (description: string) => boolean
}

/**
 * Configuration for a single survey type's CF CSV export.
 */
export interface CFSurveyTypeConfig {
  /** Column G value for Materials bundle rows (e.g. "Damp Materials") */
  materialsCostCode: string

  /** Column G value for Labour bundle rows (e.g. "Damp Labour") */
  labourCostCode: string

  /** Ordered list of CF sections. Output order matches workbook order. */
  sections: CFSectionDef[]
}

// =============================================================================
// Template description filters for the Warmline split
// =============================================================================

/** Identifies Warmline IWI templates within the plastering section */
const isWarmline = (desc: string): boolean =>
  desc.toLowerCase().includes('warmline')

/** All non-Warmline plastering templates */
const isNotWarmline = (desc: string): boolean =>
  !desc.toLowerCase().includes('warmline')

// =============================================================================
// PSO (Project Specific Overheads) — shared across all survey types
// =============================================================================

/**
 * PSO section definition.
 * Materials = skip hire + vehicle mileage.
 * Labour = travel labour.
 * Column B is populated with the description on PSO bundle rows.
 */
export const PSO_SECTION = {
  cfSectionName: 'Project Specific Overheads',
  isOptional: false,
  /** Column B — only populated on PSO bundle rows */
  description:
    '(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.)',
} as const

// =============================================================================
// Site preparation routing
// =============================================================================

/**
 * site_preparation section_keys that route into the "Stripping out..." CF section.
 * Only applicable when the primary survey type has a stripping-out section.
 */
export const SITE_PREP_STRIPPING_OUT_KEYS = ['preparatory_work', 'strip_out_disposal'] as const

/**
 * site_preparation section_keys that route into PSO Materials.
 * Skip hire costs are aggregated with vehicle mileage into PSO.
 */
export const SITE_PREP_PSO_KEYS = ['skip_hire'] as const

// =============================================================================
// Priority order for determining primary survey type in multi-type surveys
// =============================================================================

/**
 * When a job has multiple survey types, this order determines:
 *  1. Which type's section order is used (primary type's sections come first)
 *  2. Which cost code prefix is used ("Damp Materials" vs "Timber Materials" etc.)
 *  3. The survey type label in the filename (CF-Damp-... vs CF-Timber-...)
 */
export const PRIMARY_TYPE_PRIORITY = ['damp', 'timber', 'woodworm', 'condensation'] as const

// =============================================================================
// Per-survey-type CF configuration
// =============================================================================

export const CF_SURVEY_CONFIG: Record<string, CFSurveyTypeConfig> = {
  // ──────────────────────────────────────────────────────────────────────────
  // DAMP — Damp Costing v48
  // 13 CF sections (including 3 optional)
  // Cost codes: "Damp Materials" / "Damp Labour"
  // ──────────────────────────────────────────────────────────────────────────
  damp: {
    materialsCostCode: 'Damp Materials',
    labourCostCode: 'Damp Labour',
    sections: [
      {
        // Combines preparatory_work + strip_out from our damp sections.
        // Also receives site_preparation.preparatory_work + strip_out_disposal
        // (added separately by the export function via SITE_PREP_STRIPPING_OUT_KEYS).
        cfSectionName: 'Stripping out of items as required to proceed with works',
        isOptional: false,
        sectionKeys: ['preparatory_work', 'strip_out'],
      },
      {
        // Combines three of our damp sub-sections into one CF section.
        cfSectionName: 'Walls (Install membrane system)',
        isOptional: false,
        sectionKeys: ['dpc_traditional', 'dpc_digital', 'wall_membrane'],
      },
      {
        cfSectionName: 'Cementitious tanking system',
        isOptional: false,
        sectionKeys: ['cementitious_tanking'],
      },
      {
        cfSectionName: 'Floor - Liquid Resin floor Membranes',
        isOptional: false,
        sectionKeys: ['floor_resin'],
      },
      {
        // Non-Warmline plastering items only — Warmline split out below.
        cfSectionName: 'Plastering & finishing',
        isOptional: false,
        sectionKeys: ['plastering'],
        templateFilter: isNotWarmline,
      },
      {
        // Warmline IWI items from within our plastering section.
        // In CF these are a separate section; in our DB they live under plastering.
        cfSectionName: 'Warmline Internal Wall Insulation',
        isOptional: false,
        sectionKeys: ['plastering'],
        templateFilter: isWarmline,
      },
      {
        cfSectionName: 'Floor Joists & Floor Decking',
        isOptional: false,
        sectionKeys: ['floor_joists_decking'],
      },
      {
        cfSectionName: 'Airbricks',
        isOptional: false,
        sectionKeys: ['airbricks'],
      },
      {
        cfSectionName: 'Spray treatments',
        isOptional: false,
        sectionKeys: ['spray_treatments'],
      },
      {
        cfSectionName: 'Drains',
        isOptional: true,
        sectionKeys: ['drains'],
      },
      {
        cfSectionName: 'External Wall - Aquaban Water Repellent Treatments',
        isOptional: true,
        sectionKeys: ['aquaban'],
      },
      {
        cfSectionName: 'Asbestos Testing',
        isOptional: true,
        sectionKeys: ['asbestos_testing'],
      },
      // PSO is always appended last — handled separately by the export function.
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CONDENSATION — Condensation PIV Costing v37
  // 11 CF sections (including 4 optional)
  // Cost codes: "Condensation Materials" / "Condensation Labour"
  // Note: No "Stripping out" section — site_prep items not exported for
  //       condensation-only surveys.
  // Note: mould_treatment is "No" in CF workbook despite is_optional=true in DB.
  // ──────────────────────────────────────────────────────────────────────────
  condensation: {
    materialsCostCode: 'Condensation Materials',
    labourCostCode: 'Condensation Labour',
    sections: [
      {
        cfSectionName:
          'Condensation control: Supply and install Loft Dryaire system & required accessories',
        isOptional: false,
        sectionKeys: ['piv_loft'],
      },
      {
        cfSectionName:
          'Condensation control: Supply and install Wall Mounted Dryaire system & required accessories',
        isOptional: false,
        sectionKeys: ['piv_wall'],
      },
      {
        cfSectionName: 'Condensation control: Supply and install Trickle & Boost Fan',
        isOptional: false,
        sectionKeys: ['humidistat_fan'],
      },
      {
        cfSectionName:
          'Condensation control: Supply and install Dryaire Cpass Insulated Pullcord Passive Vent',
        isOptional: false,
        sectionKeys: ['passive_vent'],
      },
      {
        cfSectionName: 'Condensation control: Supply and install Dryaire CVent',
        isOptional: false,
        sectionKeys: ['dryaire_cvent'],
      },
      {
        cfSectionName: 'Airbricks',
        isOptional: false,
        sectionKeys: ['airbricks'],
      },
      {
        cfSectionName: 'Joinery: Supply and fit boxwork for ducting',
        isOptional: true,
        sectionKeys: ['joinery_ducting'],
      },
      {
        cfSectionName:
          'New hatch and ladder: Create larger opening, install new sturdy hatch and ladder to loft entry',
        isOptional: true,
        sectionKeys: ['loft_hatch_new'],
      },
      {
        cfSectionName:
          'Loft opening: Enlarge existing loft opening and install new hatch lid',
        isOptional: true,
        sectionKeys: ['loft_hatch_enlarge'],
      },
      {
        // CF workbook shows Is Optional = "No" for mould treatment,
        // even though our DB has is_optional = true.
        cfSectionName: 'Remedial treatments: Mould treatment',
        isOptional: false,
        sectionKeys: ['mould_treatment'],
      },
      {
        cfSectionName: 'Asbestos Testing',
        isOptional: true,
        sectionKeys: ['asbestos_testing'],
      },
      // PSO appended last by the export function.
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TIMBER — Timber Costing v33/34
  // 9 CF sections (all mandatory)
  // Cost codes: "Timber Materials" / "Timber Labour"
  // Note: No dpc_traditional/dpc_digital — wall_membrane maps directly to
  //       "Walls (Install membrane system)"
  // ──────────────────────────────────────────────────────────────────────────
  timber: {
    materialsCostCode: 'Timber Materials',
    labourCostCode: 'Timber Labour',
    sections: [
      {
        cfSectionName: 'Stripping out of items as required to proceed with works',
        isOptional: false,
        sectionKeys: ['preparatory_work', 'strip_out'],
      },
      {
        cfSectionName: 'Walls (Install membrane system)',
        isOptional: false,
        sectionKeys: ['wall_membrane'],
      },
      {
        cfSectionName: 'Cementitious tanking system',
        isOptional: false,
        sectionKeys: ['cementitious_tanking'],
      },
      {
        cfSectionName: 'Floor - Liquid Resin floor Membranes',
        isOptional: false,
        sectionKeys: ['floor_resin'],
      },
      {
        cfSectionName: 'Plastering & finishing',
        isOptional: false,
        sectionKeys: ['plastering'],
        templateFilter: isNotWarmline,
      },
      {
        cfSectionName: 'Warmline Internal Wall Insulation',
        isOptional: false,
        sectionKeys: ['plastering'],
        templateFilter: isWarmline,
      },
      {
        cfSectionName: 'Floor Joists & Floor Decking',
        isOptional: false,
        sectionKeys: ['floor_joists_decking'],
      },
      {
        cfSectionName: 'Timber Treatments',
        isOptional: false,
        sectionKeys: ['timber_treatments'],
      },
      {
        cfSectionName: 'Airbricks',
        isOptional: false,
        sectionKeys: ['airbricks'],
      },
      // PSO appended last by the export function.
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // WOODWORM — Woodworm Costing v26
  // 5 CF sections (all mandatory)
  // Cost codes: "Woodworm Materials" / "Woodworm Labour"
  // Note: No Warmline section — all plastering maps to "Plastering & finishing"
  // ──────────────────────────────────────────────────────────────────────────
  woodworm: {
    materialsCostCode: 'Woodworm Materials',
    labourCostCode: 'Woodworm Labour',
    sections: [
      {
        cfSectionName: 'Stripping out of items as required to proceed with works',
        isOptional: false,
        sectionKeys: ['preparatory_work', 'strip_out'],
      },
      {
        cfSectionName: 'Plastering & finishing',
        isOptional: false,
        sectionKeys: ['plastering'],
        // No templateFilter — woodworm has no Warmline items in its DB templates
      },
      {
        cfSectionName: 'Floor Joists & Floor Decking',
        isOptional: false,
        sectionKeys: ['floor_joists_decking'],
      },
      {
        cfSectionName: 'Timber Treatments',
        isOptional: false,
        sectionKeys: ['timber_treatments'],
      },
      {
        cfSectionName: 'Airbricks',
        isOptional: false,
        sectionKeys: ['airbricks'],
      },
      // PSO appended last by the export function.
    ],
  },
}
