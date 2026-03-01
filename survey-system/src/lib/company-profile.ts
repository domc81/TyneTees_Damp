// =============================================================================
// Company Profile — Data Access Layer
// Singleton table: exactly one row, never inserted/deleted from the app.
// =============================================================================

import { createServerClient as createSSRClient } from '@supabase/ssr'
import type { CompanyProfile, CompanyProfileUpdate } from '@/types/database.types'

// =============================================================================
// Service-role client — bypasses RLS, usable without user session.
// All data operations use this client; callers verify auth separately.
// =============================================================================

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
  })
}

// =============================================================================
// Read
// =============================================================================

/**
 * Fetch the singleton company profile using the service-role key.
 * No user session required — safe for public pages, API routes,
 * server components, and the root layout.
 */
export async function getCompanyProfilePublic(): Promise<CompanyProfile> {
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase
    .from('company_profile')
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(
      `Failed to load company profile: ${error?.message ?? 'no data returned'}`
    )
  }

  return data as CompanyProfile
}

// =============================================================================
// Update
// =============================================================================

/**
 * Partial-update the singleton company profile.
 * Returns the full updated row.
 * Uses service-role client — callers must verify auth before calling.
 */
export async function updateCompanyProfile(
  updates: CompanyProfileUpdate
): Promise<CompanyProfile> {
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase
    .from('company_profile')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('is_singleton', true)
    .select()
    .single()

  if (error || !data) {
    throw new Error(
      `Failed to update company profile: ${error?.message ?? 'no data returned'}`
    )
  }

  return data as CompanyProfile
}

// =============================================================================
// Logo Upload
// =============================================================================

const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
] as const

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB — matches bucket config

/**
 * Upload a company logo to the company-assets storage bucket.
 * Deletes any previous logo file to avoid accumulating old files.
 * Returns the public URL of the uploaded logo.
 */
export async function uploadCompanyLogo(
  file: File
): Promise<string> {
  // Validate MIME type
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed: png, jpg, svg, webp.`
    )
  }

  // Validate size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`
    )
  }

  // Use service-role client — callers must verify auth before calling
  const supabase = createServiceRoleClient()

  // 1. Read the current logo_url so we can delete the old file
  const { data: profile } = await supabase
    .from('company_profile')
    .select('logo_url')
    .single()

  const oldLogoUrl: string | null = (profile as { logo_url: string | null } | null)?.logo_url ?? null

  // 2. Determine the storage path
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
  const storagePath = `logo/company-logo-${Date.now()}.${ext}`

  // 3. Upload the new logo
  const { error: uploadError } = await supabase.storage
    .from('company-assets')
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Logo upload failed: ${uploadError.message}`)
  }

  // 4. Get the public URL
  const { data: urlData } = supabase.storage
    .from('company-assets')
    .getPublicUrl(storagePath)

  const publicUrl = urlData.publicUrl

  // 5. Update the profile row with the new URL
  const { error: updateError } = await supabase
    .from('company_profile')
    .update({ logo_url: publicUrl, updated_at: new Date().toISOString() })
    .eq('is_singleton', true)

  if (updateError) {
    throw new Error(`Failed to save logo URL: ${updateError.message}`)
  }

  // 6. Clean up old logo file (best-effort — don't throw on failure)
  if (oldLogoUrl) {
    try {
      // Extract the storage path from the full public URL
      const bucketSegment = '/company-assets/'
      const idx = oldLogoUrl.indexOf(bucketSegment)
      if (idx !== -1) {
        const oldPath = oldLogoUrl.substring(idx + bucketSegment.length)
        await supabase.storage.from('company-assets').remove([oldPath])
      }
    } catch {
      // Non-critical — old file stays but won't be referenced
    }
  }

  return publicUrl
}
