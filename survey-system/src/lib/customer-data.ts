// Customer Data Layer — search, pagination, history, and delete
// Extends the basic CRUD in supabase-data.ts with richer query capabilities.

import { getSupabase } from './supabase-client'
import type { Customer, Quotation } from '@/types/database.types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CustomerWithSurveyCount extends Customer {
  survey_count: number
}

export interface CustomerListOptions {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export interface CustomerListResult {
  customers: CustomerWithSurveyCount[]
  totalCount: number
}

export interface CustomerSurvey {
  id: string
  project_number: string
  survey_type: string
  status: string
  survey_date: string | null
  created_at: string
}

export interface CustomerQuotation {
  id: string
  quotation_number: string
  status: string
  total_incl_vat: number
  created_at: string
  survey_id: string
}

export interface CustomerBooking {
  id: string
  booking_date: string
  start_time: string
  end_time: string
  status: string
  surveyor_id: string
  survey_id: string
}

export interface CustomerCommunication {
  id: string
  channel: string
  direction: string
  status: string
  recipient_email: string | null
  recipient_name: string | null
  subject: string | null
  template_name: string | null
  created_at: string
}

export interface CustomerDetail extends Customer {
  surveys: CustomerSurvey[]
  quotations: CustomerQuotation[]
  bookings: CustomerBooking[]
  communications: CustomerCommunication[]
  survey_count: number
}

// ---------------------------------------------------------------------------
// List with search, sort, pagination
// ---------------------------------------------------------------------------

export async function getCustomerList(
  options: CustomerListOptions = {}
): Promise<CustomerListResult> {
  const supabase = getSupabase()
  if (!supabase) return { customers: [], totalCount: 0 }

  const {
    search,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    pageSize = 25,
  } = options

  // Build the base query with survey count via a left join
  // Supabase JS doesn't support aggregated counts in a single query easily,
  // so we fetch customer list + do a separate count query for totals.
  let query = supabase
    .from('customers')
    .select('*', { count: 'exact' })

  // Apply search filter across multiple columns
  if (search && search.trim()) {
    const term = `%${search.trim()}%`
    query = query.or(
      `first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term},phone.ilike.${term},postcode.ilike.${term}`
    )
  }

  // Apply sorting
  const validSortColumns = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'postcode',
    'created_at',
  ]
  const col = validSortColumns.includes(sortBy) ? sortBy : 'created_at'
  query = query.order(col, { ascending: sortOrder === 'asc' })

  // Apply pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching customer list:', error)
    return { customers: [], totalCount: 0 }
  }

  const customers: Customer[] = data || []
  const totalCount = count ?? 0

  // Fetch survey counts for these customers in one query
  const customerIds = customers.map((c) => c.id)
  let surveyCounts: Record<string, number> = {}

  if (customerIds.length > 0) {
    const { data: surveyRows, error: scError } = await supabase
      .from('surveys')
      .select('customer_id')
      .in('customer_id', customerIds)

    if (!scError && surveyRows) {
      for (const row of surveyRows) {
        if (row.customer_id) {
          surveyCounts[row.customer_id] = (surveyCounts[row.customer_id] || 0) + 1
        }
      }
    }
  }

  const enriched: CustomerWithSurveyCount[] = customers.map((c) => ({
    ...c,
    survey_count: surveyCounts[c.id] || 0,
  }))

  return { customers: enriched, totalCount }
}

// ---------------------------------------------------------------------------
// Single customer with full history
// ---------------------------------------------------------------------------

export async function getCustomerDetail(
  id: string
): Promise<CustomerDetail | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  // Fetch customer
  const { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !customer) {
    console.error('Error fetching customer detail:', error)
    return null
  }

  // Fetch surveys for this customer
  const { data: surveyRows } = await supabase
    .from('surveys')
    .select('id, project_number, survey_type, status, survey_date, created_at')
    .eq('customer_id', id)
    .order('created_at', { ascending: false })

  const surveys: CustomerSurvey[] = (surveyRows || []).map((s) => ({
    id: s.id,
    project_number: s.project_number,
    survey_type: s.survey_type,
    status: s.status,
    survey_date: s.survey_date,
    created_at: s.created_at,
  }))

  // Fetch quotations linked to this customer's surveys
  const surveyIds = surveys.map((s) => s.id)
  let quotations: CustomerQuotation[] = []

  if (surveyIds.length > 0) {
    const { data: quotationRows } = await supabase
      .from('quotations')
      .select('id, quotation_number, status, total_incl_vat, created_at, survey_id')
      .in('survey_id', surveyIds)
      .order('created_at', { ascending: false })

    quotations = (quotationRows || []).map((q) => ({
      id: q.id,
      quotation_number: q.quotation_number,
      status: q.status,
      total_incl_vat: Number(q.total_incl_vat),
      created_at: q.created_at,
      survey_id: q.survey_id,
    }))
  }

  // Fetch bookings linked to this customer's surveys
  let bookings: CustomerBooking[] = []

  if (surveyIds.length > 0) {
    const { data: bookingRows } = await supabase
      .from('survey_bookings')
      .select('id, booking_date, start_time, end_time, status, surveyor_id, survey_id')
      .in('survey_id', surveyIds)
      .order('booking_date', { ascending: false })

    bookings = (bookingRows || []).map((b) => ({
      id: b.id,
      booking_date: b.booking_date,
      start_time: b.start_time,
      end_time: b.end_time,
      status: b.status,
      surveyor_id: b.surveyor_id,
      survey_id: b.survey_id,
    }))
  }

  // Fetch recent communications for this customer (last 10)
  const { data: commRows } = await supabase
    .from('communication_log')
    .select('id, channel, direction, status, recipient_email, recipient_name, subject, template_name, created_at')
    .eq('customer_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  const communications: CustomerCommunication[] = (commRows || []).map((c) => ({
    id: c.id,
    channel: c.channel,
    direction: c.direction,
    status: c.status,
    recipient_email: c.recipient_email,
    recipient_name: c.recipient_name,
    subject: c.subject,
    template_name: c.template_name,
    created_at: c.created_at,
  }))

  return {
    ...customer,
    surveys,
    quotations,
    bookings,
    communications,
    survey_count: surveys.length,
  }
}

// ---------------------------------------------------------------------------
// Delete customer (with guard)
// ---------------------------------------------------------------------------

export async function deleteCustomer(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()
  if (!supabase) return { success: false, error: 'Database not available' }

  // Check for linked surveys
  const { count, error: countError } = await supabase
    .from('surveys')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', id)

  if (countError) {
    return { success: false, error: 'Failed to check linked surveys' }
  }

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete — customer has ${count} linked survey${count > 1 ? 's' : ''}`,
    }
  }

  // Safe to delete
  const { error } = await supabase.from('customers').delete().eq('id', id)

  if (error) {
    console.error('Error deleting customer:', error)
    return { success: false, error: `Failed to delete customer: ${error.message}` }
  }

  return { success: true }
}
