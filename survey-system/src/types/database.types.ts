// =============================================================================
// Tyne Tees Survey System — Canonical Type Definitions
// Single source of truth. All other files import from here.
// These types match the actual Supabase database schema.
// Last verified against live DB: 19 Feb 2026 (post-migration)
// =============================================================================

// --- Enums (match PostgreSQL enums) ---

export type EnquiryStatus =
  | 'new'
  | 'assigned'
  | 'surveyed'
  | 'quoted'
  | 'accepted'
  | 'declined'
  | 'on_hold'
  | 'completed'

export type SurveyType =
  | 'damp'
  | 'timber'
  | 'woodworm'
  | 'condensation'
  | 'structural'
  | 'comprehensive'

export type SurveyStatus =
  | 'draft'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'archived'

/** @deprecated Use SurveyStatus instead */
export type ProjectStatus = SurveyStatus

export type DefectSeverity =
  | 'minor'
  | 'moderate'
  | 'significant'
  | 'severe'
  | 'critical'

export type ItemType = 'MTL' | 'LBR' | 'SUB' | 'OVR' | 'TRA'

// --- Core Tables ---

export interface Customer {
  id: string
  title?: string | null
  first_name: string
  last_name: string
  email: string
  phone: string
  mobile?: string | null
  address_line1: string
  address_line2?: string | null
  city: string
  county?: string | null
  postcode: string
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface Enquiry {
  id: string
  enquiry_number: string
  internal_reference?: string | null
  client_name: string
  client_email?: string | null
  client_phone?: string | null
  site_address_1: string
  site_address_2?: string | null
  site_city: string
  site_county?: string | null
  site_postcode: string
  distance_miles?: number | null
  survey_type: SurveyType
  status: EnquiryStatus
  source?: string | null
  enquiry_date: string
  proposed_survey_date?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface Survey {
  id: string
  enquiry_id?: string | null
  project_number: string
  survey_type: SurveyType
  status: SurveyStatus
  survey_date?: string | null
  weather_conditions?: string | null
  surveyor_id?: string | null
  customer_id?: string | null
  client_name?: string | null
  site_address: string
  site_address_line2?: string | null
  site_city?: string | null
  site_county?: string | null
  site_postcode: string
  notes?: string | null
  survey_data?: Record<string, any> | null
  survey_skipped_sections?: string[] | null
  survey_progress?: number | null
  survey_completed?: boolean | null
  reported_problem?: string | null
  reported_problem_override?: string | null
  completion_pct?: number | null
  is_complete?: boolean | null
  submitted_at?: string | null
  office_notes?: string | null
  created_at: string
  updated_at: string
  // Joined data (populated by queries with joins, not stored in DB)
  customer?: Customer | null
  surveyor?: Surveyor | null
}

/** @deprecated Use Survey instead */
export type Project = Survey

export interface Surveyor {
  id: string
  user_id?: string | null
  full_name: string
  email: string
  phone?: string | null
  qualifications?: string | null
  availability: boolean
  created_at: string
  updated_at: string
}

// --- Survey Tables ---

export interface SurveyRoom {
  id: string
  project_id: string
  name: string
  room_type: string
  floor_level: string
  display_order: number
  wall_type?: string | null
  plaster_type?: string | null
  floor_type?: string | null
  findings?: string | null
  recommendations?: string | null
  surveyor_notes?: string | null
  is_completed: boolean
  completed_at?: string | null
  created_at: string
  updated_at: string
}

export interface MoistureReading {
  id: string
  room_id: string
  location: string
  reading: number
  unit: string
  material?: string | null
  notes?: string | null
  timestamp: string
}

export interface Defect {
  id: string
  room_id: string
  defect_type: string
  severity: DefectSeverity
  location: string
  description?: string | null
  photo_id?: string | null
  recommendation?: string | null
  created_at: string
}

export interface Photo {
  id: string
  project_id: string
  room_id?: string | null
  question_id?: string | null
  storage_path: string
  file_path?: string | null
  file_name: string
  file_size?: number | null
  mime_type?: string | null
  description?: string | null
  photo_category?: string | null
  latitude?: number | null
  longitude?: number | null
  taken_at?: string | null
  uploaded_by?: string | null
  created_at: string
}

// --- Pricing Tables ---

export interface WorkSection {
  id: string
  name: string
  description?: string | null
  is_optional: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface MaterialsCatalogItem {
  id: string
  name: string
  supplier?: string | null
  supplier_url?: string | null
  unit_cost: number
  unit: string
  coverage?: string | null
  category: string
  default_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PricingItem {
  id: string
  section_id: string
  name: string
  unit: string
  material_cost: number
  labor_hours: number
  item_type: ItemType
  is_mandatory: boolean
  markup_override?: number | null
  contractor_cost?: number | null
  created_at: string
  updated_at: string
}

export interface BaseRate {
  id: string
  category: string
  rate_name: string
  rate_value: number
  description?: string | null
  created_at: string
  updated_at: string
}

export interface MarkupConfig {
  id: string
  item_type: ItemType
  percentage: number
  name: string
  created_at: string
  updated_at: string
}

export interface SurveyCosting {
  id: string
  survey_id: string
  selected_items: Record<string, any>
  selected_optional_items: string[]
  travel_miles: number
  notes?: string | null
  material_subtotal: number
  labor_subtotal: number
  optional_extras: number
  travel_cost: number
  subtotal: number
  vat_amount: number
  total_inc_vat: number
  deposit_amount: number
  created_at: string
  updated_at: string
}

/** @deprecated Use SurveyCosting instead */
export type ProjectCosting = SurveyCosting

// --- Legacy Types (for backward compatibility) ---

export interface Rate {
  id: string
  name: string
  value: number
  unit?: string
  description?: string
  is_active: boolean
  effective_from?: string
  effective_to?: string
  created_at: string
  updated_at: string
}

export interface LineItem {
  id: string
  section_id?: string
  project_id: string
  item_name: string
  description?: string
  category?: string
  length?: number
  width?: number
  height?: number
  quantity?: number
  uom?: string
  unit_rate?: number
  waste_factor?: number
  hours_per_unit?: number
  is_optional?: boolean
  is_active?: boolean
  display_order: number
  created_at: string
  updated_at: string
  // Calculated fields (not in DB)
  material_cost?: number
  labor_cost?: number
  total_cost?: number
}

export interface Section {
  id: string
  project_id: string
  name: string
  display_order: number
  markup_percentage: number
  created_at: string
  line_items?: LineItem[]
}

// --- Quotation & Report ---

export interface Quotation {
  id: string
  project_id: string
  quotation_number: string
  subtotal: number
  vat_rate: number
  vat_amount: number
  total: number
  deposit_percentage: number
  deposit_amount?: number | null
  validity_days: number
  status: string
  sent_at?: string | null
  accepted_at?: string | null
  notes?: string | null
  terms?: string | null
  created_at: string
  updated_at: string
}

/** @deprecated Use ReportTemplate + SurveyReport from survey-report.types.ts instead */
export interface Report {
  id: string
  project_id: string
  report_type: string
  version: number
  template_name: string
  content?: Record<string, unknown> | null
  pdf_path?: string | null
  generated_at?: string | null
  generated_by?: string | null
  created_at: string
}

// --- Report Templates & Generated Reports (new model) ---
// Full type definitions in src/types/survey-report.types.ts
// These DB-level types match the report_templates and survey_reports tables.

export interface DbReportTemplate {
  id: string
  name: string
  survey_type: string
  version: number
  sections: Record<string, unknown>[] // JSONB — typed as ReportTemplateSection[] in survey-report.types.ts
  settings: Record<string, unknown>   // JSONB — typed as ReportSettings in survey-report.types.ts
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface DbSurveyReport {
  id: string
  survey_id: string
  template_id: string
  status: 'draft' | 'generated' | 'reviewed' | 'finalised'
  sections: Record<string, unknown>[] // JSONB — typed as ReportSection[] in survey-report.types.ts
  generated_at?: string | null
  reviewed_by?: string | null
  finalised_at?: string | null
  created_at: string
  updated_at: string
}

// --- Form Input Types (for creating/updating records) ---

export type CustomerInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>
export type CustomerUpdate = Partial<CustomerInput>

export type SurveyInput = Omit<Survey, 'id' | 'project_number' | 'created_at' | 'updated_at' | 'customer' | 'surveyor'>
export type SurveyUpdate = Partial<SurveyInput>

/** @deprecated Use SurveyInput instead */
export type ProjectInput = SurveyInput
/** @deprecated Use SurveyUpdate instead */
export type ProjectUpdate = SurveyUpdate

export type SurveyorInput = Omit<Surveyor, 'id' | 'created_at' | 'updated_at'>
export type SurveyorUpdate = Partial<SurveyorInput>

// --- Cost Summary (calculated, not stored) ---

export interface CostSummary {
  materials_total: number
  labor_total: number
  travel_cost: number
  subtotal: number
  vat_amount: number
  total: number
  deposit_30_percent: number
}