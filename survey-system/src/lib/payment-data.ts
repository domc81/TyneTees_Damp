// =============================================================================
// Payment Data Layer — Supabase query functions for survey fee and deposit
// payments. Follows the same patterns as calendar-data.ts.
// =============================================================================

import { getSupabase } from './supabase-client'
import type { Payment, PaymentStatus, PaymentMethod } from '@/types/database.types'

export type { Payment, PaymentStatus, PaymentMethod }

// =============================================================================
// Read
// =============================================================================

/** Fetch a payment by its ID. */
export async function getPaymentById(paymentId: string): Promise<Payment | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .maybeSingle()

  if (error) {
    console.error('getPaymentById error:', error.message)
    return null
  }
  return data as Payment | null
}

/** Fetch the survey fee payment for a booking. */
export async function getPaymentByBookingId(bookingId: string): Promise<Payment | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('booking_id', bookingId)
    .eq('payment_type', 'survey_fee')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('getPaymentByBookingId error:', error.message)
    return null
  }
  return data as Payment | null
}

/** Fetch the deposit payment for a quotation. */
export async function getPaymentByQuotationId(quotationId: string): Promise<Payment | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('quotation_id', quotationId)
    .eq('payment_type', 'deposit')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('getPaymentByQuotationId error:', error.message)
    return null
  }
  return data as Payment | null
}

/** Fetch a payment by its public token (for customer-facing payment page). */
export async function getPaymentByToken(token: string): Promise<Payment | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('payment_token', token)
    .maybeSingle()

  if (error) {
    console.error('getPaymentByToken error:', error.message)
    return null
  }
  return data as Payment | null
}

/** Fetch all payments for an enquiry (via its bookings and quotations). */
export async function getPaymentsForEnquiry(enquiryId: string): Promise<Payment[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  // Get all survey IDs linked to this enquiry
  const { data: surveys } = await supabase
    .from('surveys')
    .select('id')
    .eq('enquiry_id', enquiryId)

  if (!surveys || surveys.length === 0) return []

  const surveyIds = surveys.map(s => s.id)

  // Get bookings for these surveys
  const { data: bookings } = await supabase
    .from('survey_bookings')
    .select('id')
    .in('survey_id', surveyIds)

  // Get quotations for these surveys
  const { data: quotations } = await supabase
    .from('quotations')
    .select('id')
    .in('survey_id', surveyIds)

  const bookingIds = bookings?.map(b => b.id) ?? []
  const quotationIds = quotations?.map(q => q.id) ?? []

  if (bookingIds.length === 0 && quotationIds.length === 0) return []

  // Fetch all payments linked to these bookings or quotations
  let query = supabase.from('payments').select('*')

  if (bookingIds.length > 0 && quotationIds.length > 0) {
    query = query.or(`booking_id.in.(${bookingIds.join(',')}),quotation_id.in.(${quotationIds.join(',')})`)
  } else if (bookingIds.length > 0) {
    query = query.in('booking_id', bookingIds)
  } else {
    query = query.in('quotation_id', quotationIds)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('getPaymentsForEnquiry error:', error.message)
    return []
  }
  return (data ?? []) as Payment[]
}

// =============================================================================
// Create
// =============================================================================

/** Create a survey fee payment for a provisional booking. */
export async function createSurveyFeePayment(
  bookingId: string,
  amount: number,
  expiryDays: number
): Promise<Payment> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + expiryDays)

  const { data, error } = await supabase
    .from('payments')
    .insert({
      booking_id: bookingId,
      payment_type: 'survey_fee',
      amount,
      status: 'pending',
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('createSurveyFeePayment error:', error.message)
    throw new Error(`Failed to create survey fee payment: ${error.message}`)
  }
  return data as Payment
}

/** Create a deposit payment after quotation acceptance. */
export async function createDepositPayment(
  quotationId: string,
  amount: number
): Promise<Payment> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const { data, error } = await supabase
    .from('payments')
    .insert({
      quotation_id: quotationId,
      payment_type: 'deposit',
      amount,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('createDepositPayment error:', error.message)
    throw new Error(`Failed to create deposit payment: ${error.message}`)
  }
  return data as Payment
}

// =============================================================================
// Update
// =============================================================================

/** Mark a payment as paid (manual recording by office staff). */
export async function markPaymentPaid(
  paymentId: string,
  opts: {
    method: PaymentMethod
    recordedBy: string
    referenceNote?: string
  }
): Promise<Payment> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client not available')

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('payments')
    .update({
      status: 'paid' as PaymentStatus,
      payment_method: opts.method,
      recorded_by: opts.recordedBy,
      recorded_at: now,
      paid_at: now,
      reference_note: opts.referenceNote || null,
    })
    .eq('id', paymentId)
    .select()
    .single()

  if (error) {
    console.error('markPaymentPaid error:', error.message)
    throw new Error(`Failed to mark payment as paid: ${error.message}`)
  }

  // If this is a survey fee payment, confirm the booking
  const payment = data as Payment
  if (payment.payment_type === 'survey_fee' && payment.booking_id) {
    await confirmBookingFromPayment(payment.booking_id)
  }

  return payment
}

/** Cancel a payment (and linked provisional booking if applicable). */
export async function cancelPayment(paymentId: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  const { data: payment } = await supabase
    .from('payments')
    .select('booking_id, payment_type, status')
    .eq('id', paymentId)
    .single()

  if (!payment || payment.status !== 'pending') return

  const { error } = await supabase
    .from('payments')
    .update({ status: 'cancelled' as PaymentStatus })
    .eq('id', paymentId)

  if (error) {
    console.error('cancelPayment error:', error.message)
    return
  }

  // If this is a survey fee, cancel the provisional booking too
  if (payment.payment_type === 'survey_fee' && payment.booking_id) {
    await supabase
      .from('survey_bookings')
      .update({ status: 'cancelled' })
      .eq('id', payment.booking_id)
      .eq('status', 'provisional')
  }
}

// =============================================================================
// Internal helpers
// =============================================================================

/** Transition a provisional booking to scheduled after payment. */
async function confirmBookingFromPayment(bookingId: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase
    .from('survey_bookings')
    .update({ status: 'scheduled' })
    .eq('id', bookingId)
    .eq('status', 'provisional')

  if (error) {
    console.error('confirmBookingFromPayment error:', error.message)
  }
}
