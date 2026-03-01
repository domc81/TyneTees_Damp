// =============================================================================
// Company Logo Upload API — POST /api/settings/company/logo
// Accepts multipart/form-data with a single "logo" file field.
// Uploads to Supabase Storage (company-assets bucket), cleans up old logo,
// updates company_profile.logo_url, and returns the new public URL.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { uploadCompanyLogo } from '@/lib/company-profile'

/**
 * Verify the caller has an active Supabase session.
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
// POST /api/settings/company/logo
// =============================================================================

export async function POST(request: NextRequest) {
  const userId = await verifyAuthenticated()
  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('logo')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Missing "logo" file in form data' },
        { status: 400 }
      )
    }

    const logoUrl = await uploadCompanyLogo(file)

    return NextResponse.json({ logo_url: logoUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Logo upload failed'
    console.error('POST /api/settings/company/logo error:', err)

    // Return validation errors as 400, everything else as 500
    const status = message.includes('Invalid file type') || message.includes('File too large')
      ? 400
      : 500

    return NextResponse.json({ error: message }, { status })
  }
}
