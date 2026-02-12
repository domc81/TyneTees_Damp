// Supabase Data Layer for Tyne Tees Survey System
// Replaces localStorage with real database operations

import { getSupabase } from './supabase-client'

// ============================================================================
// Photo URL Helper
// ============================================================================

/**
 * Get the public URL for a photo from Supabase Storage
 */
export function getPhotoUrl(photo: { storage_path?: string | null; file_path?: string }): string {
  // If storage_path exists, construct Supabase public URL
  if (photo.storage_path) {
    const supabase = getSupabase()
    if (supabase) {
      const { data } = supabase
        .storage
        .from('survey-photos')
        .getPublicUrl(photo.storage_path)
      return data.publicUrl
    }
  }

  // Fallback to file_path for legacy photos (during migration)
  return photo.file_path || ''
}

// ============================================================================
// Mock Data for Fallback (when Supabase isn't available)
// ============================================================================

const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    enquiry_id: 'enq-001',
    project_number: 'TT-2026-0001',
    survey_type: 'damp',
    status: 'in_progress',
    survey_date: '2026-01-15',
    weather_conditions: 'Dry and cloudy',
    client_name: 'John Smith',
    site_address: '12 Victoria Street, Newcastle upon Tyne, NE1 4LP',
    site_postcode: 'NE1 4LP',
    notes: 'Rising damp reported in ground floor living room',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-15T14:30:00Z',
  },
  {
    id: 'proj-002',
    enquiry_id: 'enq-002',
    project_number: 'TT-2026-0002',
    survey_type: 'timber',
    status: 'pending_review',
    survey_date: '2026-01-18',
    weather_conditions: 'Overcast',
    client_name: 'Sarah Johnson',
    site_address: '45 Jesmond Road, Jesmond, Newcastle upon Tyne, NE2 4AB',
    site_postcode: 'NE2 4AB',
    notes: 'Timber survey requested for period property',
    created_at: '2026-01-12T09:00:00Z',
    updated_at: '2026-01-18T11:00:00Z',
  },
  {
    id: 'proj-003',
    enquiry_id: 'enq-003',
    project_number: 'TT-2026-0003',
    survey_type: 'woodworm',
    status: 'completed',
    survey_date: '2026-01-20',
    weather_conditions: 'Sunny',
    client_name: 'Michael Brown',
    site_address: '78 High Street, Gosforth, Newcastle upon Tyne, NE3 1ES',
    site_postcode: 'NE3 1ES',
    notes: 'Woodworm treatment specification required',
    created_at: '2026-01-14T15:00:00Z',
    updated_at: '2026-01-20T16:00:00Z',
  },
  {
    id: 'proj-004',
    enquiry_id: 'enq-004',
    project_number: 'TT-2026-0004',
    survey_type: 'condensation',
    status: 'draft',
    survey_date: null,
    weather_conditions: null,
    client_name: 'Emily Davis',
    site_address: '22 Heaton Road, Heaton, Newcastle upon Tyne, NE6 1SL',
    site_postcode: 'NE6 1SL',
    notes: 'Condensation and mold issues in bedroom',
    created_at: '2026-01-22T11:00:00Z',
    updated_at: '2026-01-22T11:00:00Z',
  },
  {
    id: 'proj-005',
    enquiry_id: 'enq-005',
    project_number: 'TT-2026-0005',
    survey_type: 'damp',
    status: 'draft',
    survey_date: null,
    weather_conditions: null,
    client_name: 'Robert Wilson',
    site_address: '5 Fernwood Road, Jesmond, Newcastle upon Tyne, NE2 3TJ',
    site_postcode: 'NE2 3TJ',
    notes: 'Damp patch appearing on upstairs bedroom wall',
    created_at: '2026-01-25T08:00:00Z',
    updated_at: '2026-01-25T08:00:00Z',
  },
]

// Flag to track if we're using mock data
let useMockData = false

// ============================================================================
// Types (matching database schema)
// ============================================================================

export interface Enquiry {
  id: string
  enquiry_number: string
  internal_reference: string | null
  client_name: string
  client_email: string | null
  client_phone: string | null
  site_address_1: string
  site_address_2: string | null
  site_city: string
  site_county: string | null
  site_postcode: string
  survey_type: string
  status: string
  source: string | null
  enquiry_date: string
  proposed_survey_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  enquiry_id: string | null
  project_number: string
  survey_type: string
  status: string
  survey_date: string | null
  weather_conditions: string | null
  client_name: string
  site_address: string
  site_address_line2?: string
  site_city?: string
  site_postcode: string
  notes: string | null
  created_at: string
  updated_at: string
  // Survey data (structured survey answers)
  survey_data?: Record<string, any>
  survey_skipped_sections?: string[]
  survey_progress?: number
  survey_completed?: boolean
}

export interface SurveyRoom {
  id: string
  project_id: string
  name: string
  room_type: string
  floor_level: string
  display_order: number
  wall_type: string | null
  plaster_type: string | null
  floor_type: string | null
  findings: string | null
  recommendations: string | null
  surveyor_notes: string | null
  is_completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface MoistureReading {
  id: string
  room_id: string
  location: string
  reading: number
  unit: string
  material: string | null
  notes: string | null
  timestamp: string
}

export interface Defect {
  id: string
  room_id: string
  defect_type: string
  severity: string
  location: string
  description: string | null
  photo_id: string | null
  recommendation: string | null
  created_at: string
}

export interface Photo {
  id: string
  project_id: string
  room_id: string | null
  file_path: string
  file_name: string
  category: string
  description: string | null
  created_at: string
}

export interface WorkSection {
  id: string
  name: string
  description: string | null
  is_optional: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Material {
  id: string
  name: string
  supplier: string | null
  supplier_url: string | null
  unit_cost: number
  unit: string
  coverage: string | null
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
  item_type: string
  is_mandatory: boolean
  markup_override: number | null
  contractor_cost: number | null
  created_at: string
  updated_at: string
}

export interface ProjectCosting {
  id: string
  project_id: string
  selected_items: Record<string, number>
  selected_optional_items: string[]
  travel_miles: number
  notes: string | null
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

// ============================================================================
// Enquiries
// ============================================================================

export async function getEnquiries(): Promise<Enquiry[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching enquiries:', error)
    return []
  }

  return data || []
}

export async function getEnquiry(id: string): Promise<Enquiry | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching enquiry:', error)
    return null
  }

  return data
}

// ============================================================================
// Projects
// ============================================================================

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase()
  if (!supabase) {
    useMockData = true
    return MOCK_PROJECTS
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase error, using mock data:', error.message)
      useMockData = true
      return MOCK_PROJECTS
    }

    return data || []
  } catch (err) {
    console.warn('Supabase connection failed, using mock data:', err)
    useMockData = true
    return MOCK_PROJECTS
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function createProject(
  project: Omit<Project, 'id' | 'project_number' | 'created_at' | 'updated_at'>
): Promise<Project | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Generate project number
  const { data: countData } = await supabase
    .from('projects')
    .select('count', { count: 'exact', head: true })

  const count = (countData?.count || 0) + 1
  const year = new Date().getFullYear()
  const projectNumber = `TT-${year}-${count.toString().padStart(4, '0')}`

  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...project,
      project_number: projectNumber,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }

  return data
}

// Create project from form data (simpler version for new survey form)
// Returns the project with generated ID and number
export async function createProjectFromForm(data: {
  client_name: string
  client_email?: string
  client_phone?: string
  site_address: string
  site_address_line2?: string
  site_city?: string
  site_county?: string
  site_postcode: string
  survey_type: string
  status: string
  weather_conditions?: string
  survey_date?: string
  notes?: string
}): Promise<Project | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Generate project number
  const { data: countData } = await supabase
    .from('projects')
    .select('count', { count: 'exact', head: true })

  const count = (countData?.count || 0) + 1
  const year = new Date().getFullYear()
  const projectNumber = `TT-${year}-${count.toString().padStart(4, '0')}`

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      client_name: data.client_name,
      client_email: data.client_email || null,
      client_phone: data.client_phone || null,
      site_address: data.site_address,
      site_address_line2: data.site_address_line2 || null,
      site_city: data.site_city || null,
      site_county: data.site_county || null,
      site_postcode: data.site_postcode,
      survey_type: data.survey_type,
      status: data.status || 'draft',
      weather_conditions: data.weather_conditions || null,
      survey_date: data.survey_date || null,
      notes: data.notes || null,
      project_number: projectNumber,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project from form:', error)
    return null
  }

  return project
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    return null
  }

  return data
}

// ============================================================================
// Survey Rooms
// ============================================================================

export async function getSurveyRooms(projectId: string): Promise<SurveyRoom[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('survey_rooms')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order')

  if (error) {
    console.error('Error fetching survey rooms:', error)
    return []
  }

  return data || []
}

export async function createSurveyRoom(
  room: Omit<SurveyRoom, 'id' | 'created_at' | 'updated_at'>
): Promise<SurveyRoom | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('survey_rooms')
    .insert(room)
    .select()
    .single()

  if (error) {
    console.error('Error creating survey room:', error)
    return null
  }

  return data
}

export async function updateSurveyRoom(
  id: string,
  updates: Partial<SurveyRoom>
): Promise<SurveyRoom | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('survey_rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating survey room:', error)
    return null
  }

  return data
}

// ============================================================================
// Moisture Readings
// ============================================================================

export async function getMoistureReadings(roomId: string): Promise<MoistureReading[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('moisture_readings')
    .select('*')
    .eq('room_id', roomId)
    .order('timestamp')

  if (error) {
    console.error('Error fetching moisture readings:', error)
    return []
  }

  return data || []
}

export async function createMoistureReading(
  reading: Omit<MoistureReading, 'id' | 'timestamp'>
): Promise<MoistureReading | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('moisture_readings')
    .insert(reading)
    .select()
    .single()

  if (error) {
    console.error('Error creating moisture reading:', error)
    return null
  }

  return data
}

// ============================================================================
// Defects
// ============================================================================

export async function getDefects(roomId: string): Promise<Defect[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('defects')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at')

  if (error) {
    console.error('Error fetching defects:', error)
    return []
  }

  return data || []
}

// ============================================================================
// Photos
// ============================================================================

export async function getProjectPhotos(projectId: string): Promise<Photo[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at')

  if (error) {
    console.error('Error fetching photos:', error)
    return []
  }

  return data || []
}

// ============================================================================
// Work Sections
// ============================================================================

export async function getWorkSections(): Promise<WorkSection[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('work_sections')
    .select('*')
    .order('display_order')

  if (error) {
    console.error('Error fetching work sections:', error)
    return []
  }

  return data || []
}

// ============================================================================
// Materials Catalog
// ============================================================================

export async function getMaterials(category?: string): Promise<Material[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('materials_catalog')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching materials:', error)
    return []
  }

  return data || []
}

export async function getMaterial(id: string): Promise<Material | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('materials_catalog')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching material:', error)
    return null
  }

  return data
}

// ============================================================================
// Pricing Items
// ============================================================================

export async function getPricingItems(sectionId?: string): Promise<PricingItem[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  let query = supabase
    .from('pricing_items')
    .select('*')
    .order('name')

  if (sectionId) {
    query = query.eq('section_id', sectionId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching pricing items:', error)
    return []
  }

  return data || []
}

// ============================================================================
// Project Costing
// ============================================================================

export async function getProjectCosting(projectId: string): Promise<ProjectCosting | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('project_costing')
    .select('*')
    .eq('project_id', projectId)
    .single()

  if (error) {
    // Not found is okay, just return null
    if (error.code !== 'PGRST116') {
      console.error('Error fetching project costing:', error)
    }
    return null
  }

  return data
}

export async function saveProjectCosting(
  projectId: string,
  costing: {
    selectedItems: Record<string, number>
    selectedOptionalItems: string[]
    travelMiles: number
    notes?: string
    materialSubtotal: number
    laborSubtotal: number
    optionalExtras: number
    travelCost: number
    subtotal: number
    vatAmount: number
    totalIncVat: number
    depositAmount: number
  }
): Promise<ProjectCosting | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Check if exists, then upsert
  const { data: existing } = await supabase
    .from('project_costing')
    .select('id')
    .eq('project_id', projectId)
    .single()

  const { data, error } = await supabase
    .from('project_costing')
    .upsert({
      project_id: projectId,
      selected_items: costing.selectedItems,
      selected_optional_items: costing.selectedOptionalItems,
      travel_miles: costing.travelMiles,
      notes: costing.notes || null,
      material_subtotal: costing.materialSubtotal,
      labor_subtotal: costing.laborSubtotal,
      optional_extras: costing.optionalExtras,
      travel_cost: costing.travelCost,
      subtotal: costing.subtotal,
      vat_amount: costing.vatAmount,
      total_inc_vat: costing.totalIncVat,
      deposit_amount: costing.depositAmount,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving project costing:', error)
    return null
  }

  return data
}

// ============================================================================
// Pricing Calculations
// ============================================================================

export async function calculateItemCost(itemId: string, quantity: number = 1): Promise<{
  materialCost: number
  laborCost: number
  total: number
} | null> {
  const item = await getPricingItem(itemId)
  if (!item) return null

  const materialCost = item.material_cost * quantity * 1.30 // 30% markup
  const laborCost = item.labor_hours * quantity * 30.63 * 2 // £30.63/hr × 100% markup

  return {
    materialCost,
    laborCost,
    total: materialCost + laborCost,
  }
}

async function getPricingItem(id: string): Promise<PricingItem | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching pricing item:', error)
    return null
  }

  return data
}

// ============================================================================
// Sample Data Initialization
// ============================================================================

export async function initializeSampleData(): Promise<void> {
  // If we're using mock data, skip database initialization
  if (useMockData) {
    console.log('Using mock data - skipping database initialization')
    return
  }

  const supabase = getSupabase()
  if (!supabase) {
    useMockData = true
    return
  }

  try {
    // Check if we already have data
    const { count, error: countError } = await supabase
      .from('projects')
      .select('count', { count: 'exact', head: true })

    if (countError) {
      console.warn('Failed to check data, using mock:', countError.message)
      useMockData = true
      return
    }

    if (count && count > 0) {
      console.log('Sample data already exists')
      return
    }

    console.log('Initializing sample data...')

    // Insert sample enquiry
    const { data: enquiry, error: enquiryError } = await supabase
      .from('enquiries')
      .insert({
        enquiry_number: 'CF-DAMP-2026-0001',
        internal_reference: 'SMITH-123',
        client_name: 'John Smith',
        client_email: 'john.smith@email.com',
        client_phone: '01234 567890',
        site_address_1: '12 Victoria Street',
        site_address_2: '',
        site_city: 'Newcastle upon Tyne',
        site_county: 'Tyne and Wear',
        site_postcode: 'NE1 4LP',
        survey_type: 'damp',
        status: 'surveyed',
        source: 'Website',
        enquiry_date: new Date().toISOString().split('T')[0],
        proposed_survey_date: null,
        notes: 'Rising damp reported in ground floor',
      })
      .select()
      .single()

    if (enquiryError || !enquiry) {
      console.warn('Failed to create sample enquiry, using mock:', enquiryError?.message)
      useMockData = true
      return
    }

    // Insert sample project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        enquiry_id: enquiry.id,
        survey_type: 'damp',
        status: 'in_progress',
        survey_date: new Date().toISOString().split('T')[0],
        weather_conditions: 'Dry',
        client_name: 'John Smith',
        site_address: '12 Victoria Street, Newcastle upon Tyne',
        site_postcode: 'NE1 4LP',
        notes: 'Rising damp to ground floor - demo project',
      })
      .select()
      .single()

    if (projectError || !project) {
      console.warn('Failed to create sample project, using mock:', projectError?.message)
      useMockData = true
      return
    }

    // Insert sample room
    const { data: room, error: roomError } = await supabase
      .from('survey_rooms')
      .insert({
        project_id: project.id,
        name: 'Living Room',
        room_type: 'living_room',
        floor_level: 'ground',
        display_order: 1,
        wall_type: 'solid_brick',
        plaster_type: 'cement_hard',
        floor_type: 'solid_concrete',
        findings: 'Rising damp to north wall up to 1.2m. Visible tide marks and salt crystallisation.',
        recommendations: 'Install physical DPC and replaster with renovating plaster system.',
        is_completed: true,
      })
      .select()
      .single()

    if (roomError || !room) {
      console.warn('Failed to create sample room, using mock:', roomError?.message)
      useMockData = true
      return
    }

    // Insert moisture readings
    const { error: readingsError } = await supabase
      .from('moisture_readings')
      .insert([
        { room_id: room.id, location: 'North wall - low', reading: 18, unit: 'percentage', material: 'masonry' },
        { room_id: room.id, location: 'North wall - mid', reading: 22, unit: 'percentage', material: 'masonry' },
        { room_id: room.id, location: 'North wall - high', reading: 19, unit: 'percentage', material: 'masonry' },
      ])

    if (readingsError) {
      console.warn('Failed to create moisture readings:', readingsError.message)
    }

    console.log('Sample data initialized successfully')
  } catch (err) {
    console.warn('Database initialization failed, using mock data:', err)
    useMockData = true
  }
}

// ============================================================================
// Structured Survey Data (Phase 10)
// ============================================================================

/**
 * Save survey answers to the database
 * Stores answers, skipped sections, progress, and completion status
 */
export async function saveSurveyData(
  projectId: string,
  data: {
    answers: Record<string, any>
    skippedSections: string[]
    photos?: Record<string, string[]>
    progress: number
    isComplete: boolean
  }
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) {
    console.warn('Supabase not available, skipping database save')
    return false
  }

  try {
    const { error } = await supabase
      .from('projects')
      .update({
        survey_data: data.answers,
        survey_skipped_sections: data.skippedSections,
        survey_progress: data.progress,
        survey_completed: data.isComplete,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)

    if (error) {
      console.error('Error saving survey data:', error)
      return false
    }

    // Optionally save photos to database (if provided)
    if (data.photos && Object.keys(data.photos).length > 0) {
      await saveSurveyPhotos(projectId, data.photos)
    }

    return true
  } catch (err) {
    console.error('Exception saving survey data:', err)
    return false
  }
}

/**
 * Load survey answers from the database
 */
export async function loadSurveyData(projectId: string): Promise<{
  answers: Record<string, any>
  skippedSections: string[]
  photos: Record<string, string[]>
  progress: number
  isComplete: boolean
} | null> {
  const supabase = getSupabase()
  if (!supabase) {
    console.warn('Supabase not available')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('survey_data, survey_skipped_sections, survey_progress, survey_completed')
      .eq('id', projectId)
      .single()

    if (error) {
      console.error('Error loading survey data:', error)
      return null
    }

    // Load photos from database
    const photos = await loadSurveyPhotos(projectId)

    return {
      answers: (data.survey_data as Record<string, any>) || {},
      skippedSections: (data.survey_skipped_sections as string[]) || [],
      photos: photos,
      progress: data.survey_progress || 0,
      isComplete: data.survey_completed || false,
    }
  } catch (err) {
    console.error('Exception loading survey data:', err)
    return null
  }
}

/**
 * Helper: Convert base64 string to Blob
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

/**
 * Save survey photos to Supabase Storage and database
 */
async function saveSurveyPhotos(
  projectId: string,
  photos: Record<string, string[]>
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  try {
    // For each question with photos
    for (const [questionId, questionPhotos] of Object.entries(photos)) {
      for (let i = 0; i < questionPhotos.length; i++) {
        const photoDataUrl = questionPhotos[i]

        // Skip if already uploaded (detected by data URL prefix)
        if (photoDataUrl.startsWith('http')) {
          // Photo already in storage, skip
          continue
        }

        // Convert base64 data URL to Blob
        const base64Data = photoDataUrl.split(',')[1]
        const mimeType = photoDataUrl.match(/data:([^;]+);/)?.[1] || 'image/jpeg'
        const blob = base64ToBlob(base64Data, mimeType)

        // Generate file path in storage: projectId/questionId/index.jpg
        const fileExtension = mimeType.split('/')[1] || 'jpg'
        const fileName = `photo_${i}.${fileExtension}`
        const storagePath = `${projectId}/${questionId}/${fileName}`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('survey-photos')
          .upload(storagePath, blob, {
            contentType: mimeType,
            upsert: true, // Overwrite if exists
          })

        if (uploadError) {
          console.error('Error uploading photo to storage:', uploadError)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase
          .storage
          .from('survey-photos')
          .getPublicUrl(storagePath)

        const publicUrl = urlData?.publicUrl || `http://127.0.0.1:54321/storage/v1/object/public/survey-photos/${storagePath}`

        // Save metadata to database
        const photoId = `${projectId}-${questionId}-${i}`

        const photoRecord = {
          id: photoId,
          project_id: projectId,
          question_id: questionId,
          storage_path: storagePath,
          file_name: fileName,
          file_size: blob.size,
          mime_type: mimeType,
          photo_category: 'survey_question',
          description: `Survey question: ${questionId}`,
          taken_at: new Date().toISOString(),
          uploaded_by: 'survey_system',
        }

        // Upsert to database
        const { error: dbError } = await supabase
          .from('photos')
          .upsert(photoRecord, { onConflict: 'id' })

        if (dbError) {
          console.error('Error saving photo metadata:', dbError)
        }
      }
    }
  } catch (err) {
    console.error('Error saving survey photos:', err)
  }
}

/**
 * Load survey photos from storage
 */
async function loadSurveyPhotos(projectId: string): Promise<Record<string, string[]>> {
  const supabase = getSupabase()
  if (!supabase) return {}

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('question_id, storage_path')
      .eq('project_id', projectId)
      .not('question_id', 'is', null)
      .order('question_id')
      .order('created_at')

    if (error) {
      console.error('Error loading survey photos:', error)
      return {}
    }

    const photos: Record<string, string[]> = {}

    for (const photo of data || []) {
      if (!photo.question_id || !photo.storage_path) continue

      // Get public URL from storage path
      const { data: urlData } = supabase
        .storage
        .from('survey-photos')
        .getPublicUrl(photo.storage_path)

      if (!photos[photo.question_id]) {
        photos[photo.question_id] = []
      }

      photos[photo.question_id].push(urlData.publicUrl)
    }

    return photos
  } catch (err) {
    console.error('Exception loading survey photos:', err)
    return {}
  }
}

/**
 * Update survey progress in the database
 */
export async function updateSurveyProgress(
  projectId: string,
  progress: number,
  isComplete: boolean = false
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  try {
    const { error } = await supabase
      .from('projects')
      .update({
        survey_progress: progress,
        survey_completed: isComplete,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)

    if (error) {
      console.error('Error updating survey progress:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Exception updating survey progress:', err)
    return false
  }
}

// ============================================================================
// Photo Management Functions
// ============================================================================

/**
 * Upload a photo to Supabase Storage and create database record
 */
export async function uploadPhoto(
  projectId: string,
  file: File,
  category: string,
  description: string,
  roomInspectionId?: string
): Promise<Photo | null> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase not initialized')
    return null
  }

  try {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit')
    }

    // Validate file type and handle mobile device formats
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
    
    // Handle mobile device formats by converting to standard formats
    let processedFile = file
    let contentType = file.type
    
    // If it's a HEIC/HEIF file from iOS, we need to handle it specially
    if (file.type === 'image/heic' || file.type === 'image/heif') {
      // For now, we'll reject HEIC/HEIF files since browser support is limited
      // In a production app, you might want to convert these to JPEG using a library
      throw new Error('HEIC/HEIF format not supported. Please use JPG, PNG, or WebP.')
    }
    
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.')
    }

    // Generate unique filename with proper extension
    const fileExt = file.type === 'image/jpeg' ? 'jpg' :
                   file.type === 'image/png' ? 'png' :
                   file.type === 'image/webp' ? 'webp' : 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const storagePath = `${projectId}/${fileName}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('survey-photos')
      .upload(storagePath, processedFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: contentType
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      throw new Error('Failed to upload photo to storage')
    }

    // Create database record
    const { data: photoData, error: dbError } = await supabase
      .from('photos')
      .insert({
        project_id: projectId,
        room_inspection_id: roomInspectionId,
        storage_path: storagePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        category: category,
        description: description,
        taken_at: new Date().toISOString()
      })
      .select()

    if (dbError) {
      console.error('Database insert error:', dbError)
      // Clean up storage if DB insert failed
      await supabase.storage.from('survey-photos').remove([storagePath])
      throw new Error('Failed to create photo record in database')
    }

    return photoData[0] as Photo

  } catch (error) {
    console.error('Photo upload failed:', error)
    throw error
  }
}

/**
 * Delete a photo from both storage and database
 */
export async function deletePhoto(photoId: string, storagePath: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  try {
    // Delete from database first
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId)

    if (dbError) throw dbError

    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('survey-photos')
      .remove([storagePath])

    if (storageError) {
      console.error('Failed to delete from storage:', storageError)
      // Photo deleted from DB but not storage - this is acceptable
    }

    return true
  } catch (error) {
    console.error('Photo deletion failed:', error)
    return false
  }
}
