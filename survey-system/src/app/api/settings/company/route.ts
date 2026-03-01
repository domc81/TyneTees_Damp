// =============================================================================
// Company Profile API — GET & PATCH /api/settings/company
// Requires authentication (any role). Returns / updates the singleton row.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { getCompanyProfilePublic, updateCompanyProfile } from '@/lib/company-profile'
import type { CompanyProfileUpdate } from '@/types/database.types'

// Fields that the PATCH endpoint accepts (prevents updating id, timestamps, etc.)
const UPDATABLE_FIELDS = new Set([
  'name',
  'trading_name',
  'established_year',
  'registered_address_line1',
  'registered_address_line2',
  'registered_address_city',
  'registered_address_county',
  'registered_address_postcode',
  'phone_primary',
  'phone_secondary',
  'email_primary',
  'email_secondary',
  'website',
  'logo_url',
  'about_us_text',
  'terms_and_conditions',
  'default_deposit_note',
  'guarantee_years',
  'guarantee_scheme_name',
  'company_registration_number',
  'vat_number',
])

/**
 * Verify the caller has an active Supabase session.
 * Returns the user ID on success, or null if unauthenticated.
 */
async function verifyAuthenticated(): Promise<string | null> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null
    return user.id
  } catch {
    return null
  }
}

// =============================================================================
// GET /api/settings/company
// =============================================================================

export async function GET() {
  const userId = await verifyAuthenticated()
  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    // Use service-role client for the read — auth already verified above.
    // This avoids double cookie-based auth and RLS issues.
    const profile = await getCompanyProfilePublic()
    return NextResponse.json(profile)
  } catch (err) {
    console.error('GET /api/settings/company error:', err)
    return NextResponse.json(
      { error: 'Failed to load company profile' },
      { status: 500 }
    )
  }
}

// =============================================================================
// PATCH /api/settings/company
// =============================================================================

export async function PATCH(request: NextRequest) {
  const userId = await verifyAuthenticated()
  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Filter to only accepted fields
    const updates: CompanyProfileUpdate = {}
    for (const [key, value] of Object.entries(body)) {
      if (UPDATABLE_FIELDS.has(key)) {
        (updates as Record<string, unknown>)[key] = value
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided' },
        { status: 400 }
      )
    }

    const profile = await updateCompanyProfile(updates)
    return NextResponse.json(profile)
  } catch (err) {
    console.error('PATCH /api/settings/company error:', err)
    return NextResponse.json(
      { error: 'Failed to update company profile' },
      { status: 500 }
    )
  }
}
