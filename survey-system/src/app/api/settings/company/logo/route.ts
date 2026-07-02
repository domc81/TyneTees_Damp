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
 * Verify the caller is an admin.
 */
async function verifyAdmin(): Promise<{ authorized: boolean; userId?: string }> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return { authorized: false }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') return { authorized: false }
    return { authorized: true, userId: user.id }
  } catch {
    return { authorized: false }
  }
}

// =============================================================================
// POST /api/settings/company/logo
// =============================================================================

export async function POST(request: NextRequest) {
  const { authorized } = await verifyAdmin()
  if (!authorized) {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
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
