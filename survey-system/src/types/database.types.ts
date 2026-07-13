// =============================================================================
// Survey System — Canonical Type Definitions
// Single source of truth. All other files import from here.
// These types match the actual Supabase database schema.
// Last verified against live DB: 19 Feb 2026 (post-migration)
// =============================================================================

// --- Enums (match PostgreSQL enums) ---

export type UserRole = 'admin' | 'office' | 'surveyor'

export type EnquiryStatus =
  | 'new'
  | 'awaiting_payment'
  | 'booked'
  | 'survey_complete'
  | 'sent'
  | 'won'
  | 'closed'
  | 'on_hold'
  | 'lost'

export type EnquiryPriority = 'low' | 'medium' | 'high' | 'urgent'

export type OnHoldReason =
  | 'awaiting_supplier'
  | 'awaiting_customer_info'
  | 'scheduling_conflict'
  | 'specialist_assessment'
  | 'customer_requested'
  | 'other'

export type EnquiryActivityType =
  | 'status_change'
  | 'assignment_change'
  | 'note_added'
  | 'call_logged'
  | 'email_sent'
  | 'survey_created'
  | 'quotation_generated'
  | 'quotation_sent'
  | 'customer_notified'
  | 'follow_up_set'
  | 'priority_changed'
  | 'on_hold_reason_set'
  | 'created'

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
  reported_problem?: string | null
  // Pipeline columns (migration 20260303000001)
  customer_id: string | null
  assigned_to: string | null
  priority: EnquiryPriority
  follow_up_date: string | null
  estimated_value: number | null
  loss_reason: string | null
  hold_reason: OnHoldReason | null
  hold_reason_note: string | null
  won_at: string | null
  cf_exported_at: string | null
  status_changed_at: string
  created_at: string
  updated_at: string
  // Joined data (populated by queries with joins, not stored in DB)
  assignee?: { id: string; display_name: string } | null
  customer_data?: { id: string; first_name: string; last_name: string; email: string } | null
}

export interface EnquiryActivity {
  id: string
  enquiry_id: string
  user_id: string | null
  activity_type: EnquiryActivityType
  title: string
  description: string | null
  metadata: Record<string, unknown>
  created_at: string
  // Joined (populated by getEnquiryActivities)
  user?: { display_name: string } | null
}

export interface OnHoldMessageTemplate {
  id: string
  reason_key: OnHoldReason
  display_label: string
  customer_message: string
  display_order: number
  is_active: boolean
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
  survey_tags?: string[] | null  // auto-populated from wizard findings
  survey_skipped_sections?: string[] | null
  survey_progress?: number | null
  survey_completed?: boolean | null
  reported_problem?: string | null
  reported_problem_override?: string | null
  completion_pct?: number | null
  is_complete?: boolean | null
  submitted_at?: string | null
  office_notes?: string | null
  cf_project_reference?: string | null  // Contractor Foreman project ID, created manually in CF
  created_at: string
  updated_at: string
  // Joined data (populated by queries with joins, not stored in DB)
  customer?: Customer | null
  surveyor?: Surveyor | null
}

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

export interface UserProfile {
  id: string
  user_id: string
  role: UserRole
  display_name: string
  email: string
  phone?: string | null
  is_active: boolean
  is_surveyor: boolean
  qualifications?: string | null
  must_change_password: boolean
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
  product_key?: string | null
  coverage_m2?: number | null
  unit_size?: string | null
}

// --- Quotation ---

export type QuotationStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'

export interface Quotation {
  id: string
  survey_id: string
  version: number
  quotation_number: string
  share_token: string
  status: QuotationStatus

  // Financials (frozen at generation time)
  subtotal_mandatory: number
  subtotal_optional: number
  subtotal_combined: number
  pso_total: number
  vat_rate: number
  vat_amount: number
  total_incl_vat: number
  deposit_percentage: number
  deposit_amount: number

  // Validity
  validity_days: number
  valid_until: string  // DATE — returned as ISO string

  // Surveyor notes / T&Cs
  notes?: string | null
  terms?: string | null

  // Snapshot fields (denormalised)
  customer_name?: string | null
  customer_address?: string | null
  site_address?: string | null
  surveyor_name?: string | null
  surveyor_qualifications?: string | null
  company_name?: string | null
  company_phone?: string | null
  company_email?: string | null

  // Customer engagement
  first_viewed_at?: string | null
  last_viewed_at?: string | null
  view_count: number
  sent_at?: string | null
  accepted_at?: string | null
  declined_at?: string | null

  created_at: string
  updated_at: string
}

export interface QuotationSection {
  id: string
  quotation_id: string
  survey_type: string         // damp | timber | woodworm | condensation | site_preparation
  section_key: string         // matches costing_sections.section_key
  display_name: string
  display_order: number
  material_total: number
  labour_total: number
  section_total: number
  is_optional: boolean
  is_included: boolean
  created_at: string
}

export interface QuotationView {
  id: string
  quotation_id: string
  viewed_at: string
  ip_address?: string | null
  user_agent?: string | null
  duration_seconds?: number | null
  referrer?: string | null
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
  status: 'draft' | 'generated' | 'reviewed' | 'finalised' | 'published'
  sections: Record<string, unknown>[] // JSONB — typed as ReportSection[] in survey-report.types.ts
  generated_at?: string | null
  reviewed_by?: string | null
  finalised_at?: string | null
  publish_token?: string | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

// --- Company Profile (singleton) ---

export interface CompanyProfile {
  id: string
  is_singleton: boolean
  name: string
  trading_name?: string | null
  established_year?: number | null
  registered_address_line1?: string | null
  registered_address_line2?: string | null
  registered_address_city?: string | null
  registered_address_county?: string | null
  registered_address_postcode?: string | null
  phone_primary?: string | null
  phone_secondary?: string | null
  email_primary?: string | null
  email_secondary?: string | null
  website?: string | null
  logo_url?: string | null
  about_us_text?: string | null
  terms_and_conditions?: string | null
  default_deposit_note?: string | null
  guarantee_years?: number | null
  guarantee_scheme_name?: string | null
  company_registration_number?: string | null
  vat_number?: string | null
  created_at: string
  updated_at: string
}

export type CompanyProfileUpdate = Partial<Omit<CompanyProfile, 'id' | 'is_singleton' | 'created_at' | 'updated_at'>>

// --- Form Input Types (for creating/updating records) ---

export type CustomerInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>
export type CustomerUpdate = Partial<CustomerInput>

export type SurveyInput = Omit<Survey, 'id' | 'project_number' | 'created_at' | 'updated_at' | 'customer' | 'surveyor'>
export type SurveyUpdate = Partial<SurveyInput>

export type SurveyorInput = Omit<Surveyor, 'id' | 'created_at' | 'updated_at'>
export type SurveyorUpdate = Partial<SurveyorInput>

export type UserProfileInput = Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
export type UserProfileUpdate = Partial<Omit<UserProfileInput, 'user_id'>>

// --- Payment Types ---

export type PaymentType = 'survey_fee' | 'deposit'

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'cancelled' | 'failed'

export type PaymentMethod = 'bank_transfer' | 'card_phone' | 'cash' | 'cheque' | 'online'

export interface Payment {
  id: string
  booking_id: string | null
  quotation_id: string | null
  payment_type: PaymentType
  amount: number
  currency: string
  status: PaymentStatus
  payment_method: PaymentMethod | null
  recorded_by: string | null
  recorded_at: string | null
  reference_note: string | null
  stripe_payment_intent_id: string | null
  stripe_checkout_session_id: string | null
  stripe_receipt_url: string | null
  payment_token: string
  paid_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

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