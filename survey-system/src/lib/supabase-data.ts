// Supabase Data Layer — canonical query functions for all tables
// Replaces localStorage with real database operations

import { getSupabase } from './supabase-client'
import type {
  Customer,
  Enquiry,
  Survey,
  Surveyor,
  SurveyRoom,
  MoistureReading,
  Defect,
  Photo,
  WorkSection,
  MaterialsCatalogItem,
  PricingItem,
  SurveyCosting,
  BaseRate,
  MarkupConfig,
} from '@/types/database.types'

// Re-export types for convenience (other files import from here)
export type {
  Customer,
  Enquiry,
  Survey,
  Surveyor,
  SurveyRoom,
  MoistureReading,
  Defect,
  Photo,
  WorkSection,
  MaterialsCatalogItem,
  PricingItem,
  SurveyCosting,
  BaseRate,
  MarkupConfig,
}

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
// Types (matching database schema)
// ============================================================================

// ============================================================================
// Customers
// ============================================================================

export async function getCustomers(): Promise<Customer[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }

  return data || []
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching customer:', error)
    return null
  }

  return data
}

export async function createCustomer(customerData: {
  first_name: string
  last_name: string
  email: string
  phone: string
  mobile?: string
  address_line1: string
  address_line2?: string
  city: string
  county?: string
  postcode: string
  notes?: string
}): Promise<Customer> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('customers')
    .insert([{
      ...customerData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating customer:', error)
    throw new Error(`Failed to create customer: ${error.message}`)
  }

  return data
}

export async function updateCustomer(
  id: string,
  customerData: {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    mobile?: string
    address_line1?: string
    address_line2?: string
    city?: string
    county?: string
    postcode?: string
    notes?: string
  }
): Promise<Customer> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('customers')
    .update({
      ...customerData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating customer:', error)
    throw new Error(`Failed to update customer: ${error.message}`)
  }

  return data
}

// ============================================================================
// Surveyors
// ============================================================================

export async function getSurveyors(): Promise<Surveyor[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('surveyors')
    .select('*')
    .order('full_name')

  if (error) {
    console.error('Error fetching surveyors:', error)
    return []
  }

  return data || []
}

export async function getSurveyor(id: string): Promise<Surveyor | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('surveyors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching surveyor:', error)
    return null
  }

  return data
}

export async function createSurveyor(surveyorData: {
  full_name: string
  email: string
  phone?: string
  qualifications?: string
  availability?: boolean
}): Promise<Surveyor> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('surveyors')
    .insert([{
      full_name: surveyorData.full_name,
      email: surveyorData.email,
      phone: surveyorData.phone || null,
      qualifications: surveyorData.qualifications || null,
      availability: surveyorData.availability ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating surveyor:', error)
    throw new Error(`Failed to create surveyor: ${error.message}`)
  }

  return data
}

export async function updateSurveyor(
  id: string,
  surveyorData: {
    full_name?: string
    email?: string
    phone?: string | null
    qualifications?: string | null
    availability?: boolean
  }
): Promise<Surveyor> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('surveyors')
    .update({
      ...surveyorData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating surveyor:', error)
    throw new Error(`Failed to update surveyor: ${error.message}`)
  }

  return data
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

export async function getSurveys(): Promise<Survey[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('surveys')
    .select('*, customer:customers(id, first_name, last_name, email, phone)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching surveys:', error.message)
    return []
  }

  return data || []
}

export async function getSurvey(id: string): Promise<Survey | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('surveys')
    .select('*, customer:customers(id, first_name, last_name, email, phone)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function createSurvey(
  project: Omit<Survey, 'id' | 'project_number' | 'created_at' | 'updated_at'>
): Promise<Survey | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Generate project number
  const { count: countData } = await supabase
    .from('surveys')
    .select('*', { count: 'exact', head: true })

  const count = (countData || 0) + 1
  const year = new Date().getFullYear()
  const projectNumber = `TT-${year}-${count.toString().padStart(4, '0')}`

  const { data, error } = await supabase
    .from('surveys')
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
export async function createSurveyFromForm(data: {
  customer_id?: string
  client_name?: string
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
  reported_defect?: string
}): Promise<Survey | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Generate project number
  const { count: countData } = await supabase
    .from('surveys')
    .select('*', { count: 'exact', head: true })

  const count = (countData || 0) + 1
  const year = new Date().getFullYear()
  const projectNumber = `TT-${year}-${count.toString().padStart(4, '0')}`

  // Fetch customer name for denormalised client_name field
  let clientName: string | null = null
  if (data.customer_id) {
    const { data: customer } = await supabase
      .from('customers')
      .select('first_name, last_name, title')
      .eq('id', data.customer_id)
      .single()
    if (customer) {
      const titlePrefix = customer.title ? `${customer.title} ` : ''
      clientName = `${titlePrefix}${customer.first_name} ${customer.last_name}`
    }
  }

  // Store reported_defect in survey_data JSONB at the top level
  const surveyData: Record<string, unknown> = {}
  if (data.reported_defect) {
    surveyData.reported_defect = data.reported_defect
  }

  const { data: project, error } = await supabase
    .from('surveys')
    .insert({
      customer_id: data.customer_id,
      client_name: clientName,
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
      survey_data: surveyData,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project from form:', JSON.stringify(error, null, 2))
    alert(`Supabase Error: ${JSON.stringify(error, null, 2)}`)
    return null
  }

  return project
}

export async function updateSurvey(
  id: string,
  updates: Partial<Survey>
): Promise<Survey | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('surveys')
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

export async function getSurveyPhotos(projectId: string): Promise<Photo[]> {
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

export async function getMaterials(category?: string): Promise<MaterialsCatalogItem[]> {
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

export async function getMaterial(id: string): Promise<MaterialsCatalogItem | null> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase client not available')
    return null
  }

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

export async function getItemsBySection(sectionId: string): Promise<PricingItem[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('section_id', sectionId)
    .order('name')
  if (error) { console.error('Error fetching items by section:', error); return [] }
  return data || []
}

export async function getBaseRates(): Promise<BaseRate[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('base_rates')
    .select('*')
    .order('category', { ascending: true })
  if (error) { console.error('Error fetching base rates:', error); return [] }
  return data || []
}

export async function getMarkupConfig(): Promise<MarkupConfig[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('markup_config')
    .select('*')
    .order('item_type', { ascending: true })
  if (error) { console.error('Error fetching markup config:', error); return [] }
  return data || []
}

// ============================================================================
// Survey Costing
// ============================================================================

export async function getSurveyCosting(projectId: string): Promise<SurveyCosting | null> {
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

export async function saveSurveyCosting(
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
): Promise<SurveyCosting | null> {
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
      .from('surveys')
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
      .from('surveys')
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
      .from('surveys')
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

