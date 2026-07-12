// =============================================================================
// Company Locations — data access layer (review pt 9)
//
// Central record for registered office / regional offices / service areas /
// regional contact numbers. Service-role client, same pattern as
// lib/company-profile.ts — callers verify auth separately.
// =============================================================================

import { createServerClient as createSSRClient } from '@supabase/ssr'

export type CompanyLocationType =
  | 'registered'
  | 'regional_office'
  | 'service_area'
  | 'contact_number'

export interface CompanyLocation {
  id: string
  label: string
  type: CompanyLocationType
  address_line1: string | null
  address_line2: string | null
  city: string | null
  county: string | null
  postcode: string | null
  phone: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CompanyLocationInsert = Omit<
  CompanyLocation,
  'id' | 'created_at' | 'updated_at'
>
export type CompanyLocationUpdate = Partial<CompanyLocationInsert>

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
    // Location data feeds customer-facing footers — must always be live
    // (see lib/company-profile.ts for the generateMetadata caching hole).
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}

/** Active locations for customer-facing surfaces, in display order. */
export async function getActiveCompanyLocations(): Promise<CompanyLocation[]> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('company_locations')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  if (error) throw new Error(`Failed to load company locations: ${error.message}`)
  return (data ?? []) as CompanyLocation[]
}

/** All locations (incl. inactive) for the settings UI. */
export async function getAllCompanyLocations(): Promise<CompanyLocation[]> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('company_locations')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw new Error(`Failed to load company locations: ${error.message}`)
  return (data ?? []) as CompanyLocation[]
}

export async function createCompanyLocation(
  input: CompanyLocationInsert
): Promise<CompanyLocation> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('company_locations')
    .insert(input)
    .select()
    .single()
  if (error || !data) {
    throw new Error(`Failed to create company location: ${error?.message ?? 'no data'}`)
  }
  return data as CompanyLocation
}

export async function updateCompanyLocation(
  id: string,
  updates: CompanyLocationUpdate
): Promise<CompanyLocation> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('company_locations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error || !data) {
    throw new Error(`Failed to update company location: ${error?.message ?? 'no data'}`)
  }
  return data as CompanyLocation
}
