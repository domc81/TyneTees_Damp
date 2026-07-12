// =============================================================================
// Public Payment Page — /pay/[token]
//
// PUBLIC — no authentication. The payment_token UUID is the access credential.
// Shows payment details and instructions for the customer.
// Payment provider TBD — currently manual (office marks as paid).
// Customer sees amount due + contact details; office sends payment
// instructions via their own payment provider.
// =============================================================================

import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { Phone, Mail, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { PaymentClient } from './client'

// Payment status changes between visits (pending → paid) — never serve a
// cached render of this page
export const dynamic = 'force-dynamic'

// ─── Data fetching ──────────────────────────────────────────────────────────

async function getPaymentData(token: string) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: { getAll: () => [], setAll: () => {} },
      // Keep payment status + company contact live — never let the Next Data
      // Cache serve a stale row (see lib/company-profile.ts).
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
      },
    }
  )

  const { data: payment, error } = await supabase
    .from('payments')
    .select('*')
    .eq('payment_token', token)
    .single()

  if (error || !payment) return null

  // Fetch linked booking
  let booking = null
  if (payment.booking_id) {
    const { data } = await supabase
      .from('survey_bookings')
      .select('id, booking_date, start_time, end_time, customer_name, customer_address, status')
      .eq('id', payment.booking_id)
      .single()
    booking = data
  }

  // Fetch linked quotation (for deposit payments)
  let quotation = null
  if (payment.quotation_id) {
    const { data } = await supabase
      .from('quotations')
      .select('id, quotation_number, total_incl_vat, deposit_amount, customer_name, site_address')
      .eq('id', payment.quotation_id)
      .single()
    quotation = data
  }

  // Fetch company profile — aliased to this page's field names; the table's
  // real columns are name/phone_primary/email_primary/registered_address_*
  interface CompanyContact {
    company_name: string | null
    phone: string | null
    email: string | null
    address_line_1: string | null
    address_line_2: string | null
    city: string | null
    county: string | null
    postcode: string | null
  }
  const { data: company } = await supabase
    .from('company_profile')
    .select(
      'company_name:name, phone:phone_primary, email:email_primary, ' +
      'address_line_1:registered_address_line1, address_line_2:registered_address_line2, ' +
      'city:registered_address_city, county:registered_address_county, postcode:registered_address_postcode'
    )
    .eq('is_singleton', true)
    .single<CompanyContact>()

  return { payment, booking, quotation, company }
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { token: string } }): Promise<Metadata> {
  return {
    title: 'Payment — Tyne Tees Damp Proofing',
    robots: { index: false, follow: false },
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function PaymentPage({ params }: { params: { token: string } }) {
  const data = await getPaymentData(params.token)

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Payment Not Found</h1>
          <p className="text-gray-600">
            This payment link may have expired or is no longer valid.
            Please contact us if you need assistance.
          </p>
        </div>
      </div>
    )
  }

  const { payment, booking, quotation, company } = data
  // No hardcoded fallback (review pt 9) — the profile is the single source
  const companyName = company?.company_name || ''
  const isSurveyFee = payment.payment_type === 'survey_fee'
  const isDeposit = payment.payment_type === 'deposit'
  const isPaid = payment.status === 'paid'
  const isCancelled = payment.status === 'cancelled'
  const isExpired = payment.expires_at && new Date(payment.expires_at) < new Date() && payment.status === 'pending'

  const customerName = booking?.customer_name || quotation?.customer_name || 'Customer'
  const address = booking?.customer_address || quotation?.site_address || ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white py-6">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-xl font-bold">{companyName}</h1>
          <p className="text-white/70 text-sm mt-1">
            {isSurveyFee ? 'Survey Fee Payment' : 'Deposit Payment'}
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Status banner */}
        {isPaid && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">Payment Received</p>
              <p className="text-sm text-emerald-700 mt-1">
                Thank you — your payment has been confirmed.
                {isSurveyFee && ' Your survey appointment is now confirmed.'}
              </p>
              {payment.paid_at && (
                <p className="text-xs text-emerald-600 mt-2">
                  Paid on {new Date(payment.paid_at).toLocaleDateString('en-GB', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        )}

        {(isCancelled || isExpired) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-red-800">
                {isCancelled ? 'Payment Cancelled' : 'Payment Link Expired'}
              </p>
              <p className="text-sm text-red-700 mt-1">
                Please contact us to rebook your appointment.
              </p>
            </div>
          </div>
        )}

        {/* Payment details card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Amount header */}
          <div className="bg-gray-50 border-b border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">
              {isSurveyFee ? 'Survey Fee' : 'Deposit'} Amount
            </p>
            <p className="text-4xl font-bold text-gray-900">
              £{Number(payment.amount).toFixed(2)}
            </p>
            {!isPaid && !isCancelled && !isExpired && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <p className="text-sm text-amber-600 font-medium">Awaiting Payment</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {/* Booking details (survey fee) */}
            {isSurveyFee && booking && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Appointment Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Date: </span>
                    {new Date(booking.booking_date + 'T12:00:00').toLocaleDateString('en-GB', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Time: </span>
                    {booking.start_time?.slice(0, 5)} – {booking.end_time?.slice(0, 5)}
                  </p>
                  {address && (
                    <p>
                      <span className="font-medium text-gray-700">Property: </span>
                      {address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Quotation details (deposit) */}
            {isDeposit && quotation && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Quotation Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Quotation: </span>
                    {quotation.quotation_number}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Total: </span>
                    £{Number(quotation.total_incl_vat).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </p>
                  {address && (
                    <p>
                      <span className="font-medium text-gray-700">Property: </span>
                      {address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment instructions */}
            {!isPaid && !isCancelled && !isExpired && (
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">How to Pay</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-gray-700 space-y-2">
                  <p>
                    A payment of <strong>£{Number(payment.amount).toFixed(2)}</strong> is required.
                    We will contact you with payment instructions, or you can reach us
                    using the details below.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {isSurveyFee
                      ? 'Your survey appointment will be confirmed once payment is received.'
                      : 'Works will be scheduled once your deposit has been received.'}
                  </p>
                </div>
              </div>
            )}

            {/* Expiry notice */}
            {payment.expires_at && !isPaid && !isCancelled && !isExpired && (
              <p className="text-xs text-gray-400">
                This payment link expires on {new Date(payment.expires_at).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>

        {/* Contact footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">Questions? Contact us:</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            {company?.phone && (
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            )}
            {company?.email && (
              <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline">
                <Mail className="w-4 h-4" />
                {company.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
