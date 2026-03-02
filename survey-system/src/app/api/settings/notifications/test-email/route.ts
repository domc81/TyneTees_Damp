// =============================================================================
// Test Email API — POST /api/settings/notifications/test-email
//
// Admin-only. Sends a test email to the logged-in admin's email address
// using the currently configured email settings.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { getEmailConfig } from '@/lib/email-config'
import { sendEmail } from '@/lib/email-service'
import { testEmail } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

export async function POST(_request: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────────

  let adminEmail: string | null = null
  let adminProfileId: string | null = null

  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Verify admin role — also grab profile id for communication_log.sent_by
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    adminEmail = user.email ?? null
    adminProfileId = profile?.id ?? null
  } catch {
    return NextResponse.json({ error: 'Authentication check failed' }, { status: 401 })
  }

  if (!adminEmail) {
    return NextResponse.json({ error: 'Admin email address not available' }, { status: 400 })
  }

  // ── Check email is configured ───────────────────────────────────────────

  const config = await getEmailConfig()
  if (!config) {
    return NextResponse.json({ error: 'Email is not configured. Save your email settings first.' }, { status: 400 })
  }

  // ── Generate and send the test email ───────────────────────────────────

  const sentAt = new Date().toISOString()

  const template = await testEmail({
    fromEmail: config.fromEmail,
    replyToEmail: config.replyTo,
    sentAt,
  })

  const result = await sendEmail({
    to: adminEmail,
    subject: template.subject,
    html: template.html,
    templateName: 'test',
    sentBy: adminProfileId ?? undefined,
    recipientName: adminEmail,
  })

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? 'Failed to send test email' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    messageId: result.messageId,
    sentTo: adminEmail,
  })
}
