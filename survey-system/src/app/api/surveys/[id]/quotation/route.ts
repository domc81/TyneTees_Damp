// =============================================================================
// Quotation Generation API — Creates frozen quotation snapshots from costing data
// POST /api/surveys/[id]/quotation
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { getCompanyProfilePublic } from '@/lib/company-profile'

// Service-role client for inserts (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL environment variables')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Verify the requesting user is authenticated
async function verifyAuthenticated(): Promise<{ authorized: boolean; userId?: string }> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return { authorized: false }
    return { authorized: true, userId: user.id }
  } catch {
    return { authorized: false }
  }
}

// --- Request body types ---

interface SectionPayload {
  surveyType: string
  sectionKey: string
  displayName: string
  displayOrder: number
  materialTotal: number
  labourTotal: number
  sectionTotal: number    // after adjustment baked in
  isOptional: boolean
  isIncluded: boolean
}

interface QuotationPayload {
  subtotalMandatory: number
  subtotalOptional: number
  subtotalCombined: number
  psoTotal: number       // site_prep + travel overhead combined
  vatRate: number
  vatAmount: number
  totalInclVat: number
  depositPercentage: number
  depositAmount: number
  sections: SectionPayload[]
}

/**
 * POST /api/surveys/[id]/quotation
 * Creates a new quotation (or new version) with frozen snapshot data.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Auth check
    const { authorized } = await verifyAuthenticated()
    if (!authorized) {
      return NextResponse.json(
        { error: 'Unauthorized — authentication required' },
        { status: 401 }
      )
    }

    const surveyId = params.id
    if (!surveyId) {
      return NextResponse.json({ error: 'Missing survey ID' }, { status: 400 })
    }

    const body: QuotationPayload = await request.json()
    const {
      subtotalMandatory,
      subtotalOptional,
      subtotalCombined,
      psoTotal,
      vatRate,
      vatAmount,
      totalInclVat,
      depositPercentage,
      depositAmount,
      sections,
    } = body

    if (sections == null || !Array.isArray(sections)) {
      return NextResponse.json(
        { error: 'Missing required field: sections' },
        { status: 400 }
      )
    }

    const db = getServiceClient()

    // --- Load snapshot data ---

    // 1. Survey + customer + surveyor
    const { data: survey, error: surveyErr } = await db
      .from('surveys')
      .select(`
        id, site_address, site_address_line2, site_city, site_county, site_postcode,
        client_name, customer_id, surveyor_id,
        customers ( title, first_name, last_name, address_line1, address_line2, city, county, postcode ),
        surveyors ( full_name, qualifications )
      `)
      .eq('id', surveyId)
      .single()

    if (surveyErr || !survey) {
      return NextResponse.json(
        { error: `Survey not found: ${surveyErr?.message || 'no data'}` },
        { status: 404 }
      )
    }

    // Build snapshot strings
    const customer = survey.customers as unknown as {
      title?: string | null; first_name: string; last_name: string;
      address_line1: string; address_line2?: string | null;
      city: string; county?: string | null; postcode: string
    } | null

    const customerName = customer
      ? [customer.title, customer.first_name, customer.last_name].filter(Boolean).join(' ')
      : (survey.client_name || null)

    const customerAddress = customer
      ? [customer.address_line1, customer.address_line2, customer.city, customer.county, customer.postcode]
          .filter(Boolean).join(', ')
      : null

    const siteAddress = [
      survey.site_address,
      survey.site_address_line2,
      survey.site_city,
      survey.site_county,
      survey.site_postcode,
    ].filter(Boolean).join(', ')

    const surveyor = survey.surveyors as unknown as {
      full_name: string; qualifications?: string | null
    } | null

    // 2. Load company profile for snapshot
    const profile = await getCompanyProfilePublic()

    // 3. Determine next version number
    const { data: existing } = await db
      .from('quotations')
      .select('version')
      .eq('survey_id', surveyId)
      .order('version', { ascending: false })
      .limit(1)

    const nextVersion = existing && existing.length > 0
      ? existing[0].version + 1
      : 1

    // 4. Insert quotation row (quotation_number + valid_until set by trigger)
    const { data: quotation, error: insertErr } = await db
      .from('quotations')
      .insert({
        survey_id: surveyId,
        version: nextVersion,
        status: 'draft',
        subtotal_mandatory: subtotalMandatory,
        subtotal_optional: subtotalOptional,
        subtotal_combined: subtotalCombined,
        pso_total: psoTotal,
        vat_rate: vatRate,
        vat_amount: vatAmount,
        total_incl_vat: totalInclVat,
        deposit_percentage: depositPercentage,
        deposit_amount: depositAmount,
        validity_days: 30,
        customer_name: customerName,
        customer_address: customerAddress,
        site_address: siteAddress,
        surveyor_name: surveyor?.full_name || null,
        surveyor_qualifications: surveyor?.qualifications || null,
        company_name: profile.name,
        company_phone: profile.phone_primary,
        company_email: profile.email_primary,
        terms: profile.terms_and_conditions || null,
      })
      .select('id, quotation_number, share_token, version, valid_until')
      .single()

    if (insertErr || !quotation) {
      console.error('Quotation insert failed:', insertErr)
      return NextResponse.json(
        { error: `Failed to create quotation: ${insertErr?.message || 'unknown'}` },
        { status: 500 }
      )
    }

    // 5. Insert quotation_sections rows
    const sectionRows = sections.map((s) => ({
      quotation_id: quotation.id,
      survey_type: s.surveyType,
      section_key: s.sectionKey,
      display_name: s.displayName,
      display_order: s.displayOrder,
      material_total: s.materialTotal,
      labour_total: s.labourTotal,
      section_total: s.sectionTotal,
      is_optional: s.isOptional,
      is_included: s.isIncluded,
    }))

    if (sectionRows.length > 0) {
      const { error: secErr } = await db
        .from('quotation_sections')
        .insert(sectionRows)

      if (secErr) {
        console.error('Quotation sections insert failed:', secErr)
        // Quotation row already created — log but don't fail the whole request
        // The quotation can be fixed by re-generating
      }
    }

    return NextResponse.json({
      quotationId: quotation.id,
      quotationNumber: quotation.quotation_number,
      shareToken: quotation.share_token,
      version: quotation.version,
      validUntil: quotation.valid_until,
    })
  } catch (err) {
    console.error('Quotation generation error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
