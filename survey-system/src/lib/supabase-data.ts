// Supabase Data Layer — canonical query functions for all tables
// Replaces localStorage with real database operations

import { getSupabase } from './supabase-client'
import type {
  Customer,
  Enquiry,
  EnquiryActivity,
  EnquiryActivityType,
  EnquiryPriority,
  EnquiryStatus,
  OnHoldReason,
  OnHoldMessageTemplate,
  Survey,
  Surveyor,
  SurveyRoom,
  SurveyType,
  Photo,
  MaterialsCatalogItem,
} from '@/types/database.types'

// Re-export types for convenience (other files import from here)
export type {
  Customer,
  Enquiry,
  EnquiryActivity,
  EnquiryActivityType,
  EnquiryPriority,
  EnquiryStatus,
  OnHoldReason,
  OnHoldMessageTemplate,
  Survey,
  Surveyor,
  SurveyRoom,
  SurveyType,
  Photo,
  MaterialsCatalogItem,
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
  title?: string
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

/**
 * Find or create a customer record from an enquiry's inline text fields.
 * Idempotent: calling twice for the same enquiry won't create duplicates.
 *
 * Resolution order:
 *  1. If enquiry already has customer_id → return that customer
 *  2. If client_email exists → case-insensitive match on customers.email
 *  3. Otherwise → auto-create a new customer from the enquiry's fields
 *
 * Side effect: sets enquiry.customer_id when a match/create happens.
 */
export async function findOrCreateCustomerFromEnquiry(
  enquiry: Enquiry
): Promise<Customer> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // 1. Already linked — fetch and return the customer directly
  if (enquiry.customer_id) {
    const { data: existing, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', enquiry.customer_id)
      .single()

    if (error || !existing) {
      throw new Error(`Linked customer ${enquiry.customer_id} not found`)
    }
    return existing
  }

  // 2. Try email match (case-insensitive)
  if (enquiry.client_email?.trim()) {
    const { data: emailMatch } = await supabase
      .from('customers')
      .select('*')
      .ilike('email', enquiry.client_email.trim())
      .maybeSingle()

    if (emailMatch) {
      // Link the enquiry to this existing customer
      await supabase
        .from('enquiries')
        .update({ customer_id: emailMatch.id })
        .eq('id', enquiry.id)

      return emailMatch
    }
  }

  // 3. Auto-create a new customer from enquiry fields
  const TITLES = ['mr', 'mrs', 'ms', 'dr', 'miss']
  const nameParts = (enquiry.client_name || '').trim().split(/\s+/)
  let title: string | undefined
  let firstName = ''
  let lastName = ''

  if (nameParts.length > 0 && TITLES.includes(nameParts[0].toLowerCase())) {
    title = nameParts[0]            // e.g. "Mr"
    firstName = nameParts[1] || ''  // e.g. "John"
    lastName = nameParts.slice(2).join(' ') || '' // e.g. "Smith"
  } else {
    firstName = nameParts[0] || ''
    lastName = nameParts.slice(1).join(' ') || ''
  }

  const newCustomer = await createCustomer({
    first_name: firstName || 'Unknown',
    last_name: lastName,
    email: enquiry.client_email?.trim() || `no-email-${enquiry.id.slice(0, 8)}@placeholder.local`,
    phone: enquiry.client_phone?.trim() || '',
    address_line1: enquiry.site_address_1 || '',
    address_line2: enquiry.site_address_2 || undefined,
    city: enquiry.site_city || '',
    county: enquiry.site_county || undefined,
    postcode: enquiry.site_postcode || '',
  })

  // Set title if parsed (createCustomer doesn't accept title, so update separately)
  if (title) {
    await supabase
      .from('customers')
      .update({ title })
      .eq('id', newCustomer.id)
    newCustomer.title = title
  }

  // Link the enquiry to the newly created customer
  await supabase
    .from('enquiries')
    .update({ customer_id: newCustomer.id })
    .eq('id', enquiry.id)

  return newCustomer
}

// ============================================================================
// Surveyors (now backed by user_profiles WHERE is_surveyor = true)
// ============================================================================

/** Map a user_profiles row to the legacy Surveyor shape for backward compatibility */
function profileToSurveyor(profile: import('@/types/database.types').UserProfile): Surveyor {
  return {
    id: profile.id,
    user_id: profile.user_id,
    full_name: profile.display_name,
    email: profile.email,
    phone: profile.phone ?? null,
    qualifications: profile.qualifications ?? null,
    availability: profile.is_active,
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  }
}

/**
 * Get all users who can conduct surveys.
 * Queries user_profiles WHERE is_surveyor = true (replaces legacy surveyors table).
 */
export async function getSurveyors(): Promise<Surveyor[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('is_surveyor', true)
    .eq('is_active', true)
    .order('display_name')

  if (error) {
    console.error('Error fetching surveyors:', error)
    return []
  }

  return (data || []).map(profileToSurveyor)
}

/**
 * Get a single surveyor by user_profiles ID.
 */
export async function getSurveyor(id: string): Promise<Surveyor | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .eq('is_surveyor', true)
    .single()

  if (error) {
    console.error('Error fetching surveyor:', error)
    return null
  }

  return data ? profileToSurveyor(data) : null
}

/**
 * @deprecated Use /api/admin/team POST instead — surveyor creation now goes through
 * team management which creates both an auth account and a user_profiles row.
 */
export async function createSurveyor(_surveyorData: {
  full_name: string
  email: string
  phone?: string
  qualifications?: string
  availability?: boolean
}): Promise<Surveyor> {
  throw new Error(
    'createSurveyor is deprecated. Use the Team Management page (/admin/team) to add new surveyors.'
  )
}

/**
 * @deprecated Use /api/admin/team PATCH instead — surveyor updates now go through
 * team management which updates user_profiles directly.
 */
export async function updateSurveyor(
  _id: string,
  _surveyorData: {
    full_name?: string
    email?: string
    phone?: string | null
    qualifications?: string | null
    availability?: boolean
  }
): Promise<Surveyor> {
  throw new Error(
    'updateSurveyor is deprecated. Use the Team Management page (/admin/team) to edit surveyors.'
  )
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

export interface EnquiryListOptions {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}

export interface EnquiryListResult {
  enquiries: Enquiry[]
  totalCount: number
}

export async function getEnquiryList(options: EnquiryListOptions = {}): Promise<EnquiryListResult> {
  const supabase = getSupabase()
  if (!supabase) return { enquiries: [], totalCount: 0 }

  const { search = '', status = 'all', page = 1, pageSize = 25 } = options
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('enquiries')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search.trim()) {
    const term = search.trim()
    query = query.or(
      `client_name.ilike.%${term}%,client_email.ilike.%${term}%,client_phone.ilike.%${term}%,enquiry_number.ilike.%${term}%`
    )
  }

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching enquiry list:', error)
    return { enquiries: [], totalCount: 0 }
  }

  return { enquiries: data || [], totalCount: count ?? 0 }
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
// Enquiry Pipeline Functions (migration 20260303000001)
// ============================================================================

/**
 * Generic activity logger for enquiry_activity table.
 * Called internally by other pipeline functions and can be called directly
 * for note_added, call_logged, etc.
 * userId is null for system-generated events.
 */
export async function logEnquiryActivity(
  enquiryId: string,
  activityType: EnquiryActivityType,
  title: string,
  userId?: string | null,
  description?: string | null,
  metadata?: Record<string, unknown>
): Promise<EnquiryActivity | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('enquiry_activity')
    .insert({
      enquiry_id: enquiryId,
      user_id: userId ?? null,
      activity_type: activityType,
      title,
      description: description ?? null,
      metadata: metadata ?? {},
    })
    .select()
    .single()

  if (error) {
    console.error('Error logging enquiry activity:', error)
    return null
  }

  return data
}

/**
 * Create a new enquiry and log a 'created' activity entry.
 * Generates enquiry_number in format CF-{TYPE}-{YEAR}-{SEQUENCE}.
 * Attempts customer matching by email; sets customer_id if found.
 * Retries up to 3 times on unique constraint violation (race condition guard).
 */
export async function createEnquiry(data: {
  customer_id?: string
  client_name: string
  client_email?: string
  client_phone?: string
  site_address_1: string
  site_address_2?: string
  site_city?: string
  site_county?: string
  site_postcode: string
  survey_type: SurveyType
  proposed_survey_date?: string
  source?: string
  notes?: string
  reported_problem?: string
  priority?: EnquiryPriority
  estimated_value?: number
  follow_up_date?: string
}): Promise<Enquiry> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // Explicit link (picked from the existing-customer search) wins; otherwise
  // attempt customer match by email (phone matching skipped — formatting is unreliable)
  let customer_id: string | null = data.customer_id ?? null
  if (!customer_id && data.client_email?.trim()) {
    const { data: match } = await supabase
      .from('customers')
      .select('id')
      .ilike('email', data.client_email.trim())
      .maybeSingle()
    customer_id = match?.id ?? null
  }

  // Build enquiry_number prefix: CF-{TYPE_UPPER}-{YEAR}-
  const year = new Date().getFullYear()
  const typeCode = data.survey_type.toUpperCase()
  const prefix = `CF-${typeCode}-${year}-`

  // Find the highest existing sequence for this type+year
  const { data: latest } = await supabase
    .from('enquiries')
    .select('enquiry_number')
    .like('enquiry_number', `${prefix}%`)
    .order('enquiry_number', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextSequence = 1
  if (latest?.enquiry_number) {
    const seqStr = latest.enquiry_number.slice(prefix.length)
    const parsed = parseInt(seqStr, 10)
    if (!isNaN(parsed)) nextSequence = parsed + 1
  }

  const insertBase = {
    customer_id,
    client_name: data.client_name,
    client_email: data.client_email || null,
    client_phone: data.client_phone || null,
    site_address_1: data.site_address_1,
    site_address_2: data.site_address_2 || null,
    site_city: data.site_city || null,
    site_county: data.site_county || null,
    site_postcode: data.site_postcode,
    survey_type: data.survey_type,
    proposed_survey_date: data.proposed_survey_date || null,
    source: data.source || null,
    notes: data.notes || null,
    reported_problem: data.reported_problem || null,
    priority: (data.priority ?? 'medium') as EnquiryPriority,
    estimated_value: data.estimated_value ?? null,
    follow_up_date: data.follow_up_date || null,
    status: 'new' as EnquiryStatus,
    enquiry_date: new Date().toISOString().split('T')[0],
  }

  // Try up to 3 times, incrementing sequence on unique constraint collision
  for (let attempt = 0; attempt < 3; attempt++) {
    const enquiry_number = `${prefix}${(nextSequence + attempt).toString().padStart(4, '0')}`

    const { data: created, error } = await supabase
      .from('enquiries')
      .insert({ ...insertBase, enquiry_number })
      .select()
      .single()

    if (!error && created) {
      // Log the creation event (fire-and-forget style — don't fail if this errors)
      await logEnquiryActivity(
        created.id,
        'created',
        `Enquiry ${enquiry_number} created for ${data.client_name}`,
        null,
        null,
        { client_name: data.client_name, survey_type: data.survey_type, enquiry_number }
      )
      return created
    }

    // Only retry on unique constraint violation (23505)
    if (error?.code !== '23505') {
      throw new Error(`Failed to create enquiry: ${error?.message}`)
    }
  }

  throw new Error('Failed to create enquiry after 3 attempts (sequence conflict)')
}

/**
 * General-purpose update for non-status fields (notes, priority, follow_up_date, etc.).
 * Does NOT handle status changes — use updateEnquiryStatus() for that.
 */
export async function updateEnquiry(
  id: string,
  updates: Partial<Pick<Enquiry,
    | 'notes'
    | 'priority'
    | 'follow_up_date'
    | 'estimated_value'
    | 'reported_problem'
    | 'client_name'
    | 'client_email'
    | 'client_phone'
    | 'source'
    | 'proposed_survey_date'
    | 'internal_reference'
  >>
): Promise<Enquiry> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const { data, error } = await supabase
    .from('enquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating enquiry:', error)
    throw new Error(`Failed to update enquiry: ${error.message}`)
  }

  return data
}

/**
 * Single point of truth for all enquiry status changes.
 * Every status transition MUST go through this function.
 * Automatically handles hold_reason/loss_reason side effects.
 * The status_changed_at timestamp is set by a DB trigger.
 */
export async function updateEnquiryStatus(
  id: string,
  newStatus: EnquiryStatus,
  userId: string | null,
  options?: {
    holdReason?: OnHoldReason
    holdReasonNote?: string
    lossReason?: string
  }
): Promise<Enquiry> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // Fetch current enquiry to capture old status for the activity log
  const { data: current, error: fetchError } = await supabase
    .from('enquiries')
    .select('id, status, hold_reason, hold_reason_note, won_at')
    .eq('id', id)
    .single()

  if (fetchError || !current) {
    throw new Error(`Enquiry not found: ${id}`)
  }

  const oldStatus = current.status

  // Build the update payload
  const updatePayload: Record<string, unknown> = { status: newStatus }

  if (newStatus === 'on_hold') {
    updatePayload.hold_reason = options?.holdReason ?? null
    updatePayload.hold_reason_note = options?.holdReasonNote ?? null
  } else if (oldStatus === 'on_hold') {
    // Moving away from on_hold — clear hold fields
    updatePayload.hold_reason = null
    updatePayload.hold_reason_note = null
  }

  // Keep won_at consistent with manual moves: entering won stamps it,
  // leaving won (except onward to closed) clears it so reporting doesn't
  // count a mis-move that was corrected.
  if (newStatus === 'won' && !current.won_at) {
    updatePayload.won_at = new Date().toISOString()
  } else if (current.won_at && newStatus !== 'won' && newStatus !== 'closed') {
    updatePayload.won_at = null
  }

  if (newStatus === 'lost' && options?.lossReason) {
    updatePayload.loss_reason = options.lossReason
  }

  const { data: updated, error } = await supabase
    .from('enquiries')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update enquiry status: ${error.message}`)
  }

  // Log the status change activity
  const activityMeta: Record<string, unknown> = { old_status: oldStatus, new_status: newStatus }
  if (options?.holdReason) activityMeta.hold_reason = options.holdReason
  if (options?.lossReason) activityMeta.loss_reason = options.lossReason

  await logEnquiryActivity(
    id,
    'status_change',
    `Status changed from ${oldStatus} to ${newStatus}`,
    userId,
    null,
    activityMeta
  )

  return updated
}

// ============================================================================
// Enquiry Auto-Transition Guard
// ============================================================================

/**
 * Pipeline ordering for forward-only auto-transitions.
 * Higher number = further along the pipeline.
 * lost and closed are terminal — never overwritten by auto-transitions.
 * on_hold is a side-lane that allows forward transitions.
 */
const ENQUIRY_STATUS_ORDER: Record<string, number> = {
  new: 0,
  awaiting_payment: 1,
  booked: 2,
  survey_complete: 3,
  sent: 4,
  won: 5,
  closed: 6,
  lost: 4,
}

/** Statuses that should never be overwritten by auto-transitions. */
const TERMINAL_STATUSES = new Set<string>(['lost', 'closed'])

/**
 * Determine whether an automatic status transition should proceed.
 * Rules:
 *  - Terminal statuses (lost, closed) are never overwritten.
 *  - on_hold is special: transitions still apply (completing a survey while
 *    on hold should move the enquiry forward).
 *  - Otherwise, only allow forward movement in the pipeline ordering.
 */
export function shouldAutoTransition(
  currentStatus: EnquiryStatus,
  targetStatus: EnquiryStatus
): boolean {
  if (TERMINAL_STATUSES.has(currentStatus)) return false
  if (currentStatus === 'on_hold') return true

  const currentOrder = ENQUIRY_STATUS_ORDER[currentStatus] ?? -1
  const targetOrder = ENQUIRY_STATUS_ORDER[targetStatus] ?? -1
  return targetOrder > currentOrder
}

/**
 * Auto-transition an enquiry's status with forward-only guard.
 * Fetches the current status, checks shouldAutoTransition, and calls
 * updateEnquiryStatus only if the transition is valid.
 * Designed for client-side use (uses browser Supabase client).
 * Throws on failure — callers should wrap in try/catch if non-blocking.
 */
export async function autoTransitionEnquiryStatus(
  enquiryId: string,
  targetStatus: EnquiryStatus,
  userId: string | null
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  const { data: enquiry, error } = await supabase
    .from('enquiries')
    .select('status')
    .eq('id', enquiryId)
    .single()

  if (error || !enquiry) {
    console.error('Auto-transition: failed to fetch enquiry:', error?.message)
    return
  }

  if (!shouldAutoTransition(enquiry.status as EnquiryStatus, targetStatus)) {
    return
  }

  await updateEnquiryStatus(enquiryId, targetStatus, userId)
}

// ---------------------------------------------------------------------------
// Enquiry lifecycle helpers (post-acceptance)
// ---------------------------------------------------------------------------

/** Mark an enquiry as won (deposit collected). Sets won_at and logs activity. */
export async function markEnquiryWon(
  enquiryId: string,
  userId: string | null
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase
    .from('enquiries')
    .update({ won_at: new Date().toISOString() })
    .eq('id', enquiryId)

  if (error) {
    console.error('markEnquiryWon failed:', error.message)
    return
  }

  await logEnquiryActivity(enquiryId, 'status_change', 'Deposit received — marked as won', userId)
}

/** Record CF CSV export timestamp on an enquiry. */
export async function setCfExportedAt(enquiryId: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { error } = await supabase
    .from('enquiries')
    .update({ cf_exported_at: new Date().toISOString() })
    .eq('id', enquiryId)

  if (error) {
    console.error('setCfExportedAt failed:', error.message)
    return false
  }

  return true
}

/** Transition an enquiry to closed (terminal). Requires won status. */
export async function markEnquiryClosed(
  enquiryId: string,
  userId: string | null
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  const { data: enquiry } = await supabase
    .from('enquiries')
    .select('status')
    .eq('id', enquiryId)
    .single()

  if (!enquiry || enquiry.status !== 'won') {
    console.error('markEnquiryClosed: enquiry must be in won status')
    return
  }

  await updateEnquiryStatus(enquiryId, 'closed', userId)
}

/**
 * Assign an enquiry to a team member.
 * Logs assignment_change activity. Does not change enquiry status.
 */
export async function assignEnquiry(
  enquiryId: string,
  assigneeId: string,
  userId: string | null
): Promise<Enquiry> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // Fetch current enquiry and old assignee details
  const { data: current, error: fetchError } = await supabase
    .from('enquiries')
    .select('id, status, assigned_to')
    .eq('id', enquiryId)
    .single()

  if (fetchError || !current) {
    throw new Error(`Enquiry not found: ${enquiryId}`)
  }

  // Look up the assignee's display name
  const { data: assigneeProfile } = await supabase
    .from('user_profiles')
    .select('id, display_name')
    .eq('id', assigneeId)
    .single()

  // Update assigned_to
  const { data: updated, error } = await supabase
    .from('enquiries')
    .update({ assigned_to: assigneeId })
    .eq('id', enquiryId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to assign enquiry: ${error.message}`)
  }

  // Log assignment activity
  await logEnquiryActivity(
    enquiryId,
    'assignment_change',
    `Enquiry assigned to ${assigneeProfile?.display_name ?? assigneeId}`,
    userId,
    null,
    {
      old_assignee_id: current.assigned_to,
      new_assignee_id: assigneeId,
      new_assignee_name: assigneeProfile?.display_name ?? null,
    }
  )

  return updated
}

/**
 * Fetch all activity entries for an enquiry, ordered newest first.
 * Joins user_profiles to include the acting user's display_name.
 */
export async function getEnquiryActivities(enquiryId: string): Promise<EnquiryActivity[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('enquiry_activity')
    .select('*, user:user_profiles!user_id(display_name)')
    .eq('enquiry_id', enquiryId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching enquiry activities:', error)
    return []
  }

  return data || []
}

/**
 * Fetch all active on-hold message templates, ordered by display_order.
 */
export async function getOnHoldTemplates(): Promise<OnHoldMessageTemplate[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('on_hold_message_templates')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching on-hold templates:', error)
    return []
  }

  return data || []
}

/**
 * Fetch all enquiries grouped by status for the Kanban pipeline board.
 * Joins assignee (user_profiles) and customer (customers) for display.
 * Within each status, enquiries are ordered oldest first (longest waiting at top).
 */
export async function getEnquiriesByStatus(): Promise<Record<string, Enquiry[]>> {
  const supabase = getSupabase()
  if (!supabase) return {}

  const { data, error } = await supabase
    .from('enquiries')
    .select(`
      *,
      assignee:user_profiles!assigned_to(id, display_name),
      customer_data:customers!customer_id(id, first_name, last_name, email)
    `)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching enquiries by status:', error)
    return {}
  }

  // Group by status in JavaScript
  const grouped: Record<string, Enquiry[]> = {}
  for (const enquiry of data || []) {
    const status = enquiry.status as string
    if (!grouped[status]) grouped[status] = []
    grouped[status].push(enquiry as Enquiry)
  }

  return grouped
}

// ============================================================================
// Dashboard: Lightweight Pipeline Stats
// ============================================================================

export interface EnquiryPipelineStats {
  statusCounts: Record<string, number>
  statusValues: Record<string, number>
  redCounts: Record<string, number>
  totals: {
    active: number
    pipelineValue: number
    redTotal: number
    won: number
    lost: number
    wonThisMonth: number
    wonThisMonthValue: number
  }
}

// Red threshold (hours) — matches SLA_HOURS amber thresholds in the Kanban board
const PIPELINE_RED_HOURS: Partial<Record<string, number>> = {
  new:              48,
  awaiting_payment: 72,
  survey_complete:  48,
  sent:             240,
}

export async function getEnquiryPipelineStats(): Promise<EnquiryPipelineStats> {
  const empty: EnquiryPipelineStats = {
    statusCounts: {}, statusValues: {}, redCounts: {},
    totals: { active: 0, pipelineValue: 0, redTotal: 0, won: 0, lost: 0, wonThisMonth: 0, wonThisMonthValue: 0 },
  }
  const supabase = getSupabase()
  if (!supabase) return empty

  const { data, error } = await supabase
    .from('enquiries')
    .select('status, estimated_value, status_changed_at, won_at')
    .in('status', ['new', 'awaiting_payment', 'booked', 'survey_complete', 'sent', 'won', 'closed', 'lost'])

  if (error) {
    console.error('Error fetching pipeline stats:', error)
    return empty
  }

  const statusCounts: Record<string, number> = {}
  const statusValues: Record<string, number> = {}
  const redCounts: Record<string, number> = {}

  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)
  let wonThisMonth = 0
  let wonThisMonthValue = 0

  for (const row of data || []) {
    const s = row.status as string
    statusCounts[s] = (statusCounts[s] ?? 0) + 1
    statusValues[s] = (statusValues[s] ?? 0) + (row.estimated_value ?? 0)
    const redHours = PIPELINE_RED_HOURS[s]
    if (redHours && row.status_changed_at) {
      const hoursInStatus = (Date.now() - new Date(row.status_changed_at).getTime()) / 3_600_000
      if (hoursInStatus >= redHours) {
        redCounts[s] = (redCounts[s] ?? 0) + 1
      }
    }
    if (row.won_at && new Date(row.won_at) >= monthStart) {
      wonThisMonth++
      wonThisMonthValue += row.estimated_value ?? 0
    }
  }

  const active = ['new', 'awaiting_payment', 'booked', 'survey_complete', 'sent'].reduce((s, k) => s + (statusCounts[k] ?? 0), 0)
  const pipelineValue = ['new', 'awaiting_payment', 'booked', 'survey_complete', 'sent', 'won'].reduce((s, k) => s + (statusValues[k] ?? 0), 0)
  const redTotal = Object.values(redCounts).reduce((s, c) => s + c, 0)

  return {
    statusCounts,
    statusValues,
    redCounts,
    totals: {
      active, pipelineValue, redTotal,
      won: statusCounts['won'] ?? 0,
      lost: statusCounts['lost'] ?? 0,
      wonThisMonth,
      wonThisMonthValue,
    },
  }
}

// ============================================================================
// Dashboard: Recent Enquiry Activity Feed
// ============================================================================

export interface RecentActivityItem {
  id: string
  enquiry_id: string
  enquiry_number: string | null
  client_name: string | null
  activity_type: EnquiryActivityType
  title: string
  created_at: string
}

export async function getRecentEnquiryActivity(limit = 5): Promise<RecentActivityItem[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('enquiry_activity')
    .select('id, enquiry_id, activity_type, title, created_at, enquiry:enquiries!enquiry_id(enquiry_number, client_name)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((row: any) => ({
    id: row.id,
    enquiry_id: row.enquiry_id,
    enquiry_number: row.enquiry?.enquiry_number ?? null,
    client_name: row.enquiry?.client_name ?? null,
    activity_type: row.activity_type as EnquiryActivityType,
    title: row.title,
    created_at: row.created_at,
  }))
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

/**
 * Generate a project number in TT-{YYYY}-{NNNN} format.
 * Queries the surveys table for the current count and increments.
 * Used by createSurveyFromEnquiry() — the only survey-creation path;
 * every survey enters via the pipeline (enquiry → Convert & Book).
 */
async function generateProjectNumber(): Promise<string> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const { count } = await supabase
    .from('surveys')
    .select('*', { count: 'exact', head: true })

  const nextNum = (count || 0) + 1
  const year = new Date().getFullYear()
  return `TT-${year}-${nextNum.toString().padStart(4, '0')}`
}

/**
 * Convert an enquiry into a survey. Full orchestration:
 *  1. Fetch the enquiry
 *  2. Guard against duplicate conversion (idempotent)
 *  3. Resolve/create customer via findOrCreateCustomerFromEnquiry()
 *  4. Insert survey with enquiry_id FK
 *  5. Log 'survey_created' activity on the enquiry
 *  6. Return { survey, customer }
 */
export async function createSurveyFromEnquiry(
  enquiryId: string,
  userId: string | null
): Promise<{ survey: Survey; customer: Customer }> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  // 1. Fetch the full enquiry
  const { data: enquiry, error: fetchErr } = await supabase
    .from('enquiries')
    .select('*')
    .eq('id', enquiryId)
    .single()

  if (fetchErr || !enquiry) {
    throw new Error(`Enquiry not found: ${enquiryId}`)
  }

  // 2. Guard: if a survey already exists for this enquiry, return it
  const { data: existingSurveys } = await supabase
    .from('surveys')
    .select('*')
    .eq('enquiry_id', enquiryId)

  if (existingSurveys && existingSurveys.length > 0) {
    const existingSurvey = existingSurveys[0]
    // Also resolve the customer for the return value
    const customer = await findOrCreateCustomerFromEnquiry(enquiry as Enquiry)
    return { survey: existingSurvey, customer }
  }

  // 3. Resolve or create customer
  const customer = await findOrCreateCustomerFromEnquiry(enquiry as Enquiry)

  // Build full name from the customer record
  const titlePrefix = customer.title ? `${customer.title} ` : ''
  const clientName = `${titlePrefix}${customer.first_name} ${customer.last_name}`.trim()

  // 4. Generate project number and insert survey
  const projectNumber = await generateProjectNumber()

  const { data: survey, error: insertErr } = await supabase
    .from('surveys')
    .insert({
      enquiry_id: enquiryId,
      customer_id: customer.id,
      client_name: clientName,
      project_number: projectNumber,
      survey_type: enquiry.survey_type,
      status: 'draft',
      site_address: enquiry.site_address_1,
      site_address_line2: enquiry.site_address_2 || null,
      site_city: enquiry.site_city || null,
      site_county: enquiry.site_county || null,
      site_postcode: enquiry.site_postcode,
      survey_date: enquiry.proposed_survey_date || null,
      reported_problem: enquiry.reported_problem || null,
      notes: enquiry.notes || null,
      survey_data: {},
    })
    .select()
    .single()

  if (insertErr || !survey) {
    console.error('Error creating survey from enquiry:', insertErr)
    throw new Error(`Failed to create survey: ${insertErr?.message ?? 'unknown'}`)
  }

  // 5. Log activity on the enquiry
  await logEnquiryActivity(
    enquiryId,
    'survey_created',
    `Survey created — ${projectNumber}`,
    userId,
    null,
    { survey_id: survey.id, project_number: projectNumber, customer_id: customer.id }
  )

  return { survey, customer }
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
// Materials Catalog CRUD (Admin)
// ============================================================================

/**
 * Create a new material in the catalog.
 * Returns the new row on success, null on error.
 */
export async function createMaterial(
  data: Omit<MaterialsCatalogItem, 'id' | 'created_at' | 'updated_at' | 'is_active'>
): Promise<MaterialsCatalogItem | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data: row, error } = await supabase
    .from('materials_catalog')
    .insert({ ...data, is_active: true })
    .select()
    .single()

  if (error) {
    console.error('Error creating material:', error)
    return null
  }
  return row
}

/**
 * Update an existing material. Accepts a partial object of changed fields.
 */
export async function updateMaterial(
  id: string,
  data: Partial<Omit<MaterialsCatalogItem, 'id' | 'created_at'>>
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const { error } = await supabase
    .from('materials_catalog')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error updating material:', error)
    return false
  }
  return true
}

/**
 * Delete a material. If templates reference its product_key, soft-delete
 * (set is_active = false). Otherwise hard-delete.
 * Returns { deleted: boolean; soft: boolean } or null on error.
 */
export async function deleteMaterial(
  id: string,
  productKey: string | null | undefined
): Promise<{ deleted: boolean; soft: boolean } | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Check if any templates reference this product_key
  let hasRefs = false
  if (productKey) {
    const refs = await getTemplatesReferencingMaterial(productKey)
    hasRefs = refs.length > 0
  }

  if (hasRefs) {
    // Soft delete — deactivate
    const { error } = await supabase
      .from('materials_catalog')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) {
      console.error('Error soft-deleting material:', error)
      return null
    }
    return { deleted: true, soft: true }
  } else {
    // Hard delete
    const { error } = await supabase
      .from('materials_catalog')
      .delete()
      .eq('id', id)
    if (error) {
      console.error('Error deleting material:', error)
      return null
    }
    return { deleted: true, soft: false }
  }
}

/**
 * Check if a product_key already exists in materials_catalog.
 * Optionally exclude a specific material ID (for edit mode).
 */
export async function isProductKeyUnique(
  productKey: string,
  excludeId?: string
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  let query = supabase
    .from('materials_catalog')
    .select('id')
    .eq('product_key', productKey)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data } = await query
  return !data || data.length === 0
}

/**
 * Find costing templates that reference a material by product_key
 * (via formula_params @> {"product_key": "..."}). Used to show impact
 * before editing or deleting a material.
 */
export async function getTemplatesReferencingMaterial(
  productKey: string
): Promise<Array<{ description: string; survey_type: string }>> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('costing_line_templates')
    .select('description, costing_sections(survey_type)')
    .contains('formula_params', { product_key: productKey })

  if (error) {
    console.error('Error finding referencing templates:', error)
    return []
  }

  return (data || []).map((row: any) => ({
    description: row.description || '',
    survey_type: (row.costing_sections as any)?.survey_type || '',
  }))
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

