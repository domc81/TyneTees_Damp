// =============================================================================
// Company Locations API — /api/settings/company/locations (review pt 9)
// GET: any authenticated user (settings display). POST/PUT: admin only.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import {
  getAllCompanyLocations,
  createCompanyLocation,
  updateCompanyLocation,
  type CompanyLocationInsert,
  type CompanyLocationUpdate,
} from '@/lib/company-locations'

export const dynamic = 'force-dynamic'

const LOCATION_TYPES = new Set(['registered', 'regional_office', 'service_area', 'contact_number'])
const UPDATABLE_FIELDS = new Set([
  'label', 'type', 'address_line1', 'address_line2', 'city', 'county',
  'postcode', 'phone', 'display_order', 'is_active',
])

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

async function verifyAdmin(): Promise<boolean> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return false
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()
    return profile?.role === 'admin'
  } catch {
    return false
  }
}

function sanitise(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(body)) {
    if (!UPDATABLE_FIELDS.has(key)) continue
    out[key] = typeof value === 'string' ? value.trim() || null : value
  }
  return out
}

export async function GET() {
  if (!(await verifyAuthenticated())) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }
  try {
    return NextResponse.json({ locations: await getAllCompanyLocations() })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load locations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Admin role required' }, { status: 403 })
  }
  try {
    const body = sanitise(await request.json())
    if (!body.label || typeof body.label !== 'string') {
      return NextResponse.json({ error: 'label is required' }, { status: 400 })
    }
    if (!LOCATION_TYPES.has(body.type as string)) {
      return NextResponse.json({ error: 'invalid type' }, { status: 400 })
    }
    const location = await createCompanyLocation({
      is_active: true,
      display_order: 0,
      address_line1: null,
      address_line2: null,
      city: null,
      county: null,
      postcode: null,
      phone: null,
      ...body,
    } as CompanyLocationInsert)
    return NextResponse.json({ location })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create location' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Admin role required' }, { status: 403 })
  }
  try {
    const raw = await request.json()
    const id = typeof raw.id === 'string' ? raw.id : null
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    const updates = sanitise(raw) as CompanyLocationUpdate
    if (updates.type && !LOCATION_TYPES.has(updates.type)) {
      return NextResponse.json({ error: 'invalid type' }, { status: 400 })
    }
    const location = await updateCompanyLocation(id, updates)
    return NextResponse.json({ location })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update location' },
      { status: 500 }
    )
  }
}
