// =============================================================================
// Public Quotation Page — /q/[token]
//
// PUBLIC — no authentication. The share_token UUID (122 bits of entropy) IS
// the access credential. Placed outside any authenticated layout group so it
// renders without sidebar or app navigation.
//
// Server Component: all quotation data is fetched server-side with the service
// role key. Client-side interactivity is delegated to client.tsx components.
// =============================================================================

import type { Metadata } from 'next'
import { cache } from 'react'
import { createServerClient } from '@supabase/ssr'
import { Phone, Mail, MapPin, User, AlertTriangle, FileText } from 'lucide-react'
import { getCompanyProfilePublic } from '@/lib/company-profile'
import { QuotationViewTracker, QuotationActions } from './client'
import './quotation-public.css'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Quotation {
  id: string
  quotation_number: string
  share_token: string
  status: string
  subtotal_mandatory: number
  subtotal_optional: number
  pso_total: number
  vat_rate: number
  vat_amount: number
  total_incl_vat: number
  deposit_percentage: number
  deposit_amount: number
  valid_until: string
  notes: string | null
  terms: string | null
  customer_name: string | null
  customer_address: string | null
  site_address: string | null
  surveyor_name: string | null
  surveyor_qualifications: string | null
  company_name: string | null
  company_phone: string | null
  company_email: string | null
  created_at: string
}

interface QuotationSection {
  id: string
  survey_type: string
  display_name: string
  display_order: number
  section_total: number
  is_optional: boolean
  is_included: boolean
}

// ─── Company profile — cached across metadata + page render ─────────────────

const getCachedProfile = cache(async () => {
  try {
    const p = await getCompanyProfilePublic()
    return {
      name: p.name,
      phone: p.phone_primary || '',
      email: p.email_primary || '',
      terms: p.terms_and_conditions || null,
    }
  } catch {
    return { name: 'Survey System', phone: '', email: '', terms: null }
  }
})

// ─── Constants ───────────────────────────────────────────────────────────────

const SURVEY_TYPE_WORK_NAMES: Record<string, string> = {
  damp: 'Damp Proofing Works',
  condensation: 'Condensation Works',
  timber: 'Timber Treatment Works',
  woodworm: 'Woodworm Treatment Works',
}

// ─── Service-role Supabase client ─────────────────────────────────────────────
// Bypasses RLS — safe because we always filter by share_token (not by row id).

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }

  return createServerClient(url, serviceKey, {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  })
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Not-found page ───────────────────────────────────────────────────────────

async function NotFoundPage() {
  const profile = await getCachedProfile()
  return (
    <div
      className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-[#9CA3AF]" />
        </div>
        <h1 className="text-xl font-bold text-[#1F2937] mb-2">Quotation Not Found</h1>
        <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
          This quotation link is invalid or no longer available. Please contact us if you think this is an error.
        </p>
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 text-left">
          <p className="text-sm font-semibold text-[#374151] mb-4">{profile.name}</p>
          <div className="space-y-3">
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {profile.phone}
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {profile.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { token: string }
}): Promise<Metadata> {
  const profile = await getCachedProfile()

  try {
    const supabase = createServiceClient()
    const { data: q } = await supabase
      .from('quotations')
      .select('quotation_number, customer_name, company_name')
      .eq('share_token', params.token)
      .single()

    if (q) {
      const companyName = q.company_name ?? profile.name
      const title = q.customer_name
        ? `Quotation for ${q.customer_name} — ${companyName}`
        : `${q.quotation_number} — ${companyName}`
      return {
        title,
        description: `Your quotation from ${companyName}`,
        robots: { index: false, follow: false },
      }
    }
  } catch {
    // Fall through to default
  }

  return {
    title: `Quotation — ${profile.name}`,
    robots: { index: false, follow: false },
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default async function PublicQuotationPage({
  params,
}: {
  params: { token: string }
}) {
  const { token } = params

  let supabase: ReturnType<typeof createServiceClient>
  try {
    supabase = createServiceClient()
  } catch {
    return <NotFoundPage />
  }

  // Fetch quotation by share_token
  const { data: q, error: qErr } = await supabase
    .from('quotations')
    .select('*')
    .eq('share_token', token)
    .single()

  if (qErr || !q) return <NotFoundPage />

  const quotation = q as Quotation

  // Fetch sections ordered for display
  const { data: secs } = await supabase
    .from('quotation_sections')
    .select('*')
    .eq('quotation_id', quotation.id)
    .order('display_order', { ascending: true })

  const sections = (secs || []) as QuotationSection[]

  // Expiry check — compare valid_until date to today's date (not time)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const validUntil = new Date(quotation.valid_until)
  validUntil.setHours(0, 0, 0, 0)
  const isExpired = validUntil < today

  // ─── Derived section data ─────────────────────────────────────────────────
  // Mirror exactly the logic used in the surveyor preview page

  const sitePrepSections = sections.filter(s => s.survey_type === 'site_preparation')
  const sitePrepTotal = sitePrepSections.reduce((sum, s) => sum + s.section_total, 0)
  const psoDisplayTotal = sitePrepTotal + quotation.pso_total

  const perTypeSections = sections.filter(s => s.survey_type !== 'site_preparation')
  const mandatorySections = perTypeSections.filter(s => !s.is_optional)
  const optionalSections = perTypeSections.filter(s => s.is_optional && s.is_included)
  const hasOptional = optionalSections.length > 0

  // Group mandatory sections by survey type to render type headings
  const mandatoryByType: Record<string, QuotationSection[]> = {}
  for (const section of mandatorySections) {
    if (!mandatoryByType[section.survey_type]) mandatoryByType[section.survey_type] = []
    mandatoryByType[section.survey_type].push(section)
  }

  const mandatoryWorksTotal = mandatorySections.reduce((sum, s) => sum + s.section_total, 0)
  const optionalWorksTotal = optionalSections.reduce((sum, s) => sum + s.section_total, 0)
  const subtotalExVat = quotation.total_incl_vat - quotation.vat_amount
  const balanceDue = quotation.total_incl_vat - quotation.deposit_amount

  const profile = await getCachedProfile()
  const company = {
    name: quotation.company_name ?? profile.name,
    phone: quotation.company_phone ?? profile.phone,
    email: quotation.company_email ?? profile.email,
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-[#F9FAFB] text-[#1F2937]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >

      {/* ── Sticky action bar (hidden on print) ─────────────────────────── */}
      <header className="no-print sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wider truncate">{company.name}</p>
            <p className="text-sm font-semibold text-[#1F2937] truncate">{quotation.quotation_number}</p>
          </div>
          <QuotationActions token={token} quotationNumber={quotation.quotation_number} />
        </div>
      </header>

      {/* ── Expiry banner ────────────────────────────────────────────────── */}
      {isExpired && (
        <div className="quotation-expiry-banner bg-amber-50 border-b border-amber-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">This quotation has expired</p>
              <p className="text-sm text-amber-700 mt-0.5 leading-relaxed">
                This quotation was valid until {formatDate(quotation.valid_until)}.
                Please contact us on{' '}
                <a href={`tel:${company.phone}`} className="underline font-medium">{company.phone}</a>
                {' '}or{' '}
                <a href={`mailto:${company.email}`} className="underline font-medium">{company.email}</a>
                {' '}to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Quotation document ───────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="quotation-content bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">

          {/* ── Company header ────────────────────────────────────────────── */}
          <div className="px-6 sm:px-10 py-8 bg-[#1E3A5F]">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-white leading-tight">{company.name}</h1>
                <div className="mt-3 space-y-1.5">
                  {company.phone && (
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <a href={`tel:${company.phone}`} className="hover:text-white transition-colors">
                        {company.phone}
                      </a>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                        {company.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <h2 className="text-3xl font-bold text-white tracking-widest">QUOTATION</h2>
                <p className="text-sm font-mono text-blue-200 mt-1.5">{quotation.quotation_number}</p>
                <div className="mt-3 space-y-0.5">
                  <p className="text-xs text-blue-300">Date: {formatDate(quotation.created_at)}</p>
                  <p className="text-xs text-blue-300">Valid until: {formatDate(quotation.valid_until)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">

            {/* ── Customer & site address ───────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-[#E5E7EB] quotation-section">
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <User className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Prepared for</p>
                </div>
                <p className="font-semibold text-[#111827]">{quotation.customer_name || '—'}</p>
                {quotation.customer_address && (
                  <p className="text-sm text-[#6B7280] mt-1.5 leading-relaxed">{quotation.customer_address}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Site address</p>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed">{quotation.site_address || '—'}</p>
              </div>
            </div>

            {/* ── Surveyor ──────────────────────────────────────────────────── */}
            {quotation.surveyor_name && (
              <div className="flex items-center gap-2.5 text-sm bg-[#F9FAFB] rounded-xl px-4 py-3 border border-[#E5E7EB] quotation-section">
                <User className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" />
                <span className="font-medium text-[#374151]">Surveyed by {quotation.surveyor_name}</span>
                {quotation.surveyor_qualifications && (
                  <span className="text-[#9CA3AF]">· {quotation.surveyor_qualifications}</span>
                )}
              </div>
            )}

            {/* ── Works summary table ───────────────────────────────────────── */}
            <div className="quotation-section">
              <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
                Proposed Works
              </h3>

              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">

                {/* Mandatory sections grouped by survey type */}
                {Object.entries(mandatoryByType).map(([surveyType, typeSections]) => (
                  <div key={surveyType}>
                    <div className="px-5 py-3 bg-[#F3F4F6] border-b border-[#E5E7EB]">
                      <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                        {SURVEY_TYPE_WORK_NAMES[surveyType] ?? surveyType}
                      </span>
                    </div>
                    {typeSections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]"
                      >
                        <span className="text-sm text-[#374151]">{section.display_name}</span>
                        <span className="text-sm font-semibold text-[#1F2937] tabular-nums ml-6">
                          {formatCurrency(section.section_total)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Mandatory subtotal */}
                {mandatorySections.length > 0 && (
                  <div className="flex items-center justify-between px-5 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
                    <span className="text-sm font-semibold text-[#374151]">Mandatory Works Subtotal</span>
                    <span className="text-sm font-bold text-[#1F2937] tabular-nums ml-6">
                      {formatCurrency(mandatoryWorksTotal)}
                    </span>
                  </div>
                )}

                {/* Optional sections */}
                {hasOptional && (
                  <>
                    <div className="px-5 py-3 bg-amber-50 border-t border-[#E5E7EB]">
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        Optional Works
                      </span>
                    </div>
                    {optionalSections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]"
                      >
                        <span className="text-sm text-[#374151]">{section.display_name}</span>
                        <span className="text-sm font-semibold text-amber-700 tabular-nums ml-6">
                          {formatCurrency(section.section_total)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-5 py-4 bg-amber-50 border-t border-[#E5E7EB]">
                      <span className="text-sm font-semibold text-amber-800">Optional Works Subtotal</span>
                      <span className="text-sm font-bold text-amber-700 tabular-nums ml-6">
                        {formatCurrency(optionalWorksTotal)}
                      </span>
                    </div>
                  </>
                )}

                {/* Project Specific Overheads */}
                {psoDisplayTotal > 0 && (
                  <div className="flex items-center justify-between px-5 py-4 bg-sky-50 border-t border-[#E5E7EB]">
                    <span className="text-sm text-[#374151]">Project Specific Overheads</span>
                    <span className="text-sm font-semibold text-[#1F2937] tabular-nums ml-6">
                      {formatCurrency(psoDisplayTotal)}
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* ── Financial summary ──────────────────────────────────────────── */}
            <div className="rounded-xl border border-[#E5E7EB] overflow-hidden quotation-section">
              <div className="px-6 py-3.5 bg-[#F3F4F6] border-b border-[#E5E7EB]">
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Summary</h3>
              </div>
              <div className="p-6 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Mandatory Works</span>
                  <span className="text-[#1F2937] tabular-nums">{formatCurrency(mandatoryWorksTotal)}</span>
                </div>

                {hasOptional && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Optional Works</span>
                    <span className="text-amber-700 tabular-nums">{formatCurrency(optionalWorksTotal)}</span>
                  </div>
                )}

                {psoDisplayTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Project Specific Overheads</span>
                    <span className="text-[#1F2937] tabular-nums">{formatCurrency(psoDisplayTotal)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm pt-4 border-t border-[#E5E7EB]">
                  <span className="text-[#374151] font-semibold">Subtotal (exc. VAT)</span>
                  <span className="text-[#1F2937] font-bold tabular-nums">{formatCurrency(subtotalExVat)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">VAT ({Math.round(quotation.vat_rate * 100)}%)</span>
                  <span className="text-[#6B7280] tabular-nums">{formatCurrency(quotation.vat_amount)}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t-2 border-[#1E3A5F]">
                  <span className="font-bold text-[#111827] text-base">Total (inc. VAT)</span>
                  <span className="font-bold text-[#1E3A5F] text-xl tabular-nums">
                    {formatCurrency(quotation.total_incl_vat)}
                  </span>
                </div>

                {quotation.deposit_percentage > 0 && (
                  <>
                    <div className="flex justify-between text-sm pt-3 border-t border-[#E5E7EB]">
                      <span className="text-[#6B7280]">
                        Deposit required ({Math.round(quotation.deposit_percentage * 100)}%)
                      </span>
                      <span className="text-[#1E3A5F] font-semibold tabular-nums">
                        {formatCurrency(quotation.deposit_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B7280]">Balance due on completion</span>
                      <span className="text-[#374151] font-medium tabular-nums">
                        {formatCurrency(balanceDue)}
                      </span>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* ── Terms & conditions ────────────────────────────────────────── */}
            <div className="quotation-section">
              <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                Terms &amp; Conditions
              </h3>
              <div className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line bg-[#F9FAFB] rounded-xl p-5 border border-[#E5E7EB]">
                {quotation.terms ?? profile.terms ?? ''}
              </div>
            </div>

            {/* ── Surveyor notes ────────────────────────────────────────────── */}
            {quotation.notes && (
              <div className="quotation-section">
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Notes
                </h3>
                <div className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line bg-[#F9FAFB] rounded-xl p-5 border border-[#E5E7EB]">
                  {quotation.notes}
                </div>
              </div>
            )}

          </div>

          {/* ── Footer action area (home for future accept/decline buttons) ── */}
          <div className="no-print px-6 sm:px-10 py-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Questions about this quotation?{' '}
                <a href={`tel:${company.phone}`} className="text-[#1E3A5F] hover:underline font-medium">
                  {company.phone}
                </a>
                {' '}or{' '}
                <a href={`mailto:${company.email}`} className="text-[#1E3A5F] hover:underline font-medium">
                  {company.email}
                </a>
              </p>
              <QuotationActions token={token} quotationNumber={quotation.quotation_number} />
            </div>
          </div>

        </div>

        {/* Small brand footer */}
        <p className="no-print text-center text-xs text-[#D1D5DB] mt-6">
          {company.name}
        </p>
      </main>

      {/* Analytics beacon — fires on page load, non-blocking */}
      <QuotationViewTracker token={token} />

    </div>
  )
}
