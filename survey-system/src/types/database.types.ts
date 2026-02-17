// Database types for Tyne Tees Survey System
// Generated from Supabase schema

export type SurveyType = 'damp' | 'timber' | 'woodworm' | 'condensation'
export type ProjectStatus = 'draft' | 'in_progress' | 'pending_review' | 'completed' | 'archived'

export interface Profile {
  id: string
  email: string
  full_name?: string
  role?: 'admin' | 'surveyor' | 'office'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Surveyor {
  id: string
  full_name: string
  email: string
  phone?: string
  qualifications?: string
  availability: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  project_number: string
  client_name: string
  client_email?: string
  client_phone?: string
  site_address: string
  site_address_line2?: string
  site_city?: string
  site_county?: string
  site_postcode: string
  survey_type: SurveyType
  status: ProjectStatus
  surveyor_id?: string
  weather_conditions?: string
  survey_date?: string
  completion_date?: string
  notes?: string
  internal_reference?: string
  created_at: string
  updated_at: string
  // Survey data (structured survey answers)
  survey_data?: Record<string, any>
  survey_skipped_sections?: string[]
  survey_progress?: number
  survey_completed?: boolean
  // Joined data
  surveyor?: Profile
  sections?: Section[]
  photos?: Photo[]
}

export interface Photo {
  id: string
  project_id: string
  room_id?: string | null           // Optional room linkage
  question_id?: string | null        // Link to survey question

  // Storage
  storage_path: string               // Path in Supabase Storage
  file_path?: string | null         // DEPRECATED: Legacy base64 storage
  file_name: string
  file_size?: number
  mime_type?: string

  // Metadata
  description?: string
  photo_category?: string           // 'survey_question', 'room', 'detail', etc
  latitude?: number
  longitude?: number
  taken_at?: string
  uploaded_by?: string
  created_at: string
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

export interface Quotation {
  id: string
  project_id: string
  quotation_number: string
  subtotal: number
  vat_rate: number
  vat_amount: number
  total: number
  deposit_percentage: number
  deposit_amount?: number
  validity_days: number
  status: string
  sent_at?: string
  accepted_at?: string
  notes?: string
  terms?: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  project_id: string
  report_type: string
  version: number
  template_name: string
  content?: Record<string, unknown>
  pdf_path?: string
  generated_at?: string
  generated_by?: string
  created_at: string
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface ProjectFormData {
  client_name: string
  client_email?: string
  client_phone?: string
  site_address: string
  site_address_line2?: string
  site_city?: string
  site_county?: string
  site_postcode: string
  survey_type: SurveyType
  weather_conditions?: string
  survey_date?: string
  notes?: string
  internal_reference?: string
}

export interface LineItemFormData {
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
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ProjectWithDetails extends Project {
  sections: SectionWithItems[]
}

export interface SectionWithItems extends Section {
  line_items: LineItem[]
}

export interface CostSummary {
  materials_total: number
  labor_total: number
  travel_cost: number
  subtotal: number
  vat_amount: number
  total: number
  deposit_30_percent: number
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface PhotoCaptureState {
  isCapturing: boolean
  selectedCategory: string
  photos: Photo[]
}
