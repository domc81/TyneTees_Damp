// =============================================================================
// Survey Report Types — Report Templates & Generated Report Instances
// Canonical type definitions for the report data model.
//
// A report has three content sources:
// 1. BOILERPLATE — pre-written text that shows/hides based on survey data
// 2. AUTO-POPULATED — data pulled from survey wizard (client name, readings, etc.)
// 3. LLM-GENERATED — AI-written narrative sections, editable by surveyor
//
// Reports are stored as structured JSONB and rendered to multiple formats:
// - PDF (downloadable for customer)
// - HTML (customer portal — future)
// - Dashboard view (internal review — future)
//
// Last updated: 2026-02-20
// =============================================================================

// =============================================================================
// Report Template — defines the structure/skeleton of a report type
// Stored in report_templates table. One default template per survey type.
// =============================================================================

export interface ReportTemplate {
  id: string
  name: string // e.g., "Damp Survey Report v1"
  survey_type: ReportSurveyType
  version: number
  sections: ReportTemplateSection[]
  settings: ReportSettings
  is_default: boolean
  created_at: string
  updated_at: string
}

export type ReportSurveyType = 'damp' | 'condensation' | 'timber' | 'woodworm'

// =============================================================================
// Report Template Section — one section in the template skeleton
// =============================================================================

export interface ReportTemplateSection {
  key: string // unique identifier e.g., 'cover', 'property', 'room_findings'
  title: string // display title
  type: ReportSectionType
  order: number
  required: boolean
  content_source: ContentSource
  boilerplate_variants?: BoilerplateVariant[] // conditional text options
  data_fields?: string[] // which survey_data fields to pull in
  photo_categories?: string[] // which photo categories to show
  llm_prompt_hint?: string // guidance for LLM when generating this section
  sub_sections?: ReportTemplateSection[] // for nested/repeating sections
  repeats_per?: 'room' | 'floor' // for room-by-room or floor-by-floor sections
}

export type ReportSectionType =
  | 'cover' // title page with client details, date, weather
  | 'property' // property description with front elevation photos
  | 'boilerplate' // pre-written text (scope, orientation, abbreviations)
  | 'data' // auto-populated from survey data
  | 'findings' // LLM-generated or mixed content (room inspections, defects)
  | 'photos' // photo gallery section
  | 'proposals' // schedule of works / recommended actions
  | 'treatment' // treatment methodology descriptions
  | 'closing' // extent of survey, payment, ancillary items
  | 'signature' // surveyor name and credentials
  | 'sketch' // sketch plan placeholder

export type ContentSource =
  | 'template' // boilerplate text from the template (static)
  | 'survey_data' // auto-populated from survey wizard data
  | 'llm_generated' // written by AI based on findings
  | 'surveyor_input' // free-text entered by surveyor
  | 'costing_data' // pulled from the costing engine results
  | 'mixed' // combination of sources

// =============================================================================
// Boilerplate Variant — conditional pre-written text
// The condition key maps to survey data to determine which variant to show.
// =============================================================================

export interface BoilerplateVariant {
  condition: string // condition key, e.g., 'no_defects', 'defects_found'
  text: string // the pre-written text to use when condition is met
}

// =============================================================================
// Report Settings — template-level configuration
// =============================================================================

export interface ReportSettings {
  title_prefix: string // e.g., "Timbers Inspection", "Specific Defects Inspection - Condensation"
  abbreviations: Record<string, string> // e.g., { DPC: "Damp Proof Course" }
  include_sketch_plan: boolean
  include_payment_terms: boolean
  payment_deposit_percentage: number // default 30
  guarantee_years: number
  company_name: string
  company_phone?: string
  company_email?: string
  company_website?: string
  general_notes_document: string // name of enclosed document
  piv_info_url?: string // link to PIV benefits page (condensation only)
}

// =============================================================================
// Survey Report — a generated report instance for a specific survey
// =============================================================================

export interface SurveyReport {
  id: string
  survey_id: string
  template_id: string
  status: ReportStatus
  sections: ReportSection[] // the populated content
  generated_at?: string
  reviewed_by?: string
  finalised_at?: string
  publish_token?: string | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

export type ReportStatus =
  | 'draft' // initial state, being assembled
  | 'generated' // all sections populated (auto + LLM)
  | 'reviewed' // surveyor has reviewed and edited
  | 'finalised' // locked, ready for customer
  | 'published' // shared with customer via public link

// =============================================================================
// Report Section — one populated section in a generated report
// =============================================================================

export interface ReportSection {
  key: string // matches template section key
  title: string
  type: ReportSectionType
  content: string // the text content (boilerplate, LLM-generated, or surveyor-edited)
  content_source: ContentSource
  is_edited: boolean // true if surveyor modified the generated text
  original_content?: string // pre-edit version for audit trail
  data: Record<string, unknown> // structured data for this section (readings, defects, etc.)
  photos: string[] // photo IDs to include in this section
  sub_sections?: ReportSection[] // for nested/repeating sections (e.g., per-room)
}

// =============================================================================
// Input types (for creating/updating)
// =============================================================================

export type ReportTemplateInput = Omit<ReportTemplate, 'id' | 'created_at' | 'updated_at'>
export type SurveyReportInput = Omit<SurveyReport, 'id' | 'created_at' | 'updated_at'>

// =============================================================================
// Display helpers
// =============================================================================

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  draft: 'Draft',
  generated: 'Generated',
  reviewed: 'Reviewed',
  finalised: 'Finalised',
  published: 'Published',
}

export const REPORT_STATUS_COLOURS: Record<ReportStatus, string> = {
  draft: 'gray',
  generated: 'blue',
  reviewed: 'amber',
  finalised: 'green',
  published: 'emerald',
}

export const REPORT_TITLE_PREFIXES: Record<ReportSurveyType, string> = {
  damp: 'Specific Defects Inspection - Rising Damp',
  condensation: 'Specific Defects Inspection - Condensation',
  timber: 'Timbers Inspection',
  woodworm: 'Specific Defects Inspection - Woodworm',
}
