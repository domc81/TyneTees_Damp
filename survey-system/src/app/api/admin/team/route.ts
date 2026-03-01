// =============================================================================
// Admin Team Management API — Server-side user creation with service role key
// Creates Supabase auth accounts + user_profiles rows in a single operation
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'

// Service-role client for admin operations (bypasses RLS)
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL environment variables')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Verify the requesting user is an admin via their session
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

// Generate a random temporary password
function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  const specials = '!@#$%'
  let password = ''
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  // Add a special char and number to satisfy common password requirements
  password += specials.charAt(Math.floor(Math.random() * specials.length))
  password += Math.floor(Math.random() * 10)
  return password
}

/**
 * POST /api/admin/team — Create a new team member
 * Body: { displayName, email, phone?, role }
 * Returns: { user, profile, tempPassword }
 */
export async function POST(request: NextRequest) {
  try {
    const { authorized } = await verifyAdmin()
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized — admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { displayName, email, phone, role, isSurveyor, qualifications } = body

    if (!displayName || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: displayName, email, role' },
        { status: 400 }
      )
    }

    if (!['admin', 'office', 'surveyor'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, office, or surveyor' },
        { status: 400 }
      )
    }

    // Force is_surveyor = true for surveyor role, regardless of what frontend sends
    const effectiveIsSurveyor = role === 'surveyor' ? true : (isSurveyor === true)

    const adminClient = getAdminClient()
    const tempPassword = generateTempPassword()

    // Step 1: Create the auth user
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true, // Skip email verification — admin is creating the account
      user_metadata: { display_name: displayName, role },
    })

    if (authError) {
      // Handle duplicate email
      if (authError.message?.includes('already been registered') || authError.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: `Failed to create auth user: ${authError.message}` },
        { status: 500 }
      )
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Auth user creation returned no user' }, { status: 500 })
    }

    // Step 2: Create the user_profiles row (using service role to bypass RLS)
    const { data: profile, error: profileError } = await adminClient
      .from('user_profiles')
      .insert({
        user_id: authData.user.id,
        display_name: displayName,
        email,
        phone: phone || null,
        role,
        is_active: true,
        is_surveyor: effectiveIsSurveyor,
        qualifications: effectiveIsSurveyor ? (qualifications || null) : null,
      })
      .select()
      .single()

    if (profileError) {
      // Rollback: delete the auth user if profile creation fails
      await adminClient.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: `Failed to create user profile: ${profileError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      profile,
      tempPassword,
      message: 'Team member created successfully. Share the temporary password with them and instruct them to change it immediately via Settings > Change Password.',
    })
  } catch (err) {
    console.error('Team creation error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/team — Update a team member's profile
 * Body: { profileId, displayName?, phone?, role?, isActive? }
 */
export async function PATCH(request: NextRequest) {
  try {
    const { authorized } = await verifyAdmin()
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized — admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { profileId, displayName, phone, role, isActive, isSurveyor, qualifications } = body

    if (!profileId) {
      return NextResponse.json({ error: 'Missing required field: profileId' }, { status: 400 })
    }

    if (role && !['admin', 'office', 'surveyor'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, office, or surveyor' },
        { status: 400 }
      )
    }

    const adminClient = getAdminClient()

    // Build update payload with only provided fields
    const updates: Record<string, unknown> = {}
    if (displayName !== undefined) updates.display_name = displayName
    if (phone !== undefined) updates.phone = phone || null
    if (role !== undefined) {
      updates.role = role
      // Force is_surveyor = true when role is surveyor
      if (role === 'surveyor') updates.is_surveyor = true
    }
    if (isActive !== undefined) updates.is_active = isActive
    if (isSurveyor !== undefined) {
      // Don't allow turning off is_surveyor if role is surveyor
      if (role === 'surveyor' || (!role && isSurveyor === false)) {
        // Need to check existing role if role not provided
        if (!role) {
          const { data: existing } = await adminClient
            .from('user_profiles')
            .select('role')
            .eq('id', profileId)
            .single()
          if (existing?.role !== 'surveyor') {
            updates.is_surveyor = isSurveyor
          }
          // If role is surveyor, keep is_surveyor = true (don't allow override)
        }
      } else {
        updates.is_surveyor = isSurveyor
      }
    }
    if (qualifications !== undefined) updates.qualifications = qualifications || null

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { data: profile, error } = await adminClient
      .from('user_profiles')
      .update(updates)
      .eq('id', profileId)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Failed to update profile: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ profile, message: 'Profile updated successfully' })
  } catch (err) {
    console.error('Team update error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
