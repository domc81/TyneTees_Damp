// =============================================================================
// On-Hold Customer Notification API
// POST /api/enquiries/[id]/notify-on-hold
//
// Sends the customer an email when their enquiry is placed on hold.
// Uses the reason-specific message from on_hold_message_templates.
// Logs a 'customer_notified' activity on the enquiry.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { enquiryOnHoldEmail } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email-service'

// Service-role client for privileged reads/writes (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase service-role credentials')
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Verify the requesting user is authenticated and has admin or office role
async function verifyAdminOrOffice(): Promise<{
  authorized: boolean
  profileId?: string
  error?: string
}> {
  try {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return { authorized: false, error: 'Not authenticated' }

    const db = getServiceClient()
    const { data: profile } = await db
      .from('user_profiles')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    if (!profile || !['admin', 'office'].includes(profile.role)) {
      return { authorized: false, error: 'Insufficient permissions — admin or office role required' }
    }

    return { authorized: true, profileId: profile.id }
  } catch {
    return { authorized: false, error: 'Authentication check failed' }
  }
}

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Auth check
    const { authorized, profileId, error: authError } = await verifyAdminOrOffice()
    if (!authorized || !profileId) {
      return NextResponse.json({ error: authError || 'Unauthorized' }, { status: 401 })
    }

    const enquiryId = params.id
    if (!enquiryId) {
      return NextResponse.json({ error: 'Missing enquiry ID' }, { status: 400 })
    }

    const db = getServiceClient()

    // 2. Load the enquiry
    const { data: enquiry, error: eErr } = await db
      .from('enquiries')
      .select('id, client_name, client_email, hold_reason, hold_reason_note')
      .eq('id', enquiryId)
      .single()

    if (eErr || !enquiry) {
      return NextResponse.json(
        { error: `Enquiry not found: ${eErr?.message || 'no data'}` },
        { status: 404 }
      )
    }

    // 3. Guard: email required
    if (!enquiry.client_email) {
      return NextResponse.json(
        { error: 'Cannot notify — no email address on this enquiry' },
        { status: 400 }
      )
    }

    // 4. Guard: hold reason required
    if (!enquiry.hold_reason) {
      return NextResponse.json(
        { error: 'Cannot notify — no hold reason set' },
        { status: 400 }
      )
    }

    // 5. Fetch the template message for this hold reason
    const { data: template, error: tErr } = await db
      .from('on_hold_message_templates')
      .select('display_label, customer_message')
      .eq('reason_key', enquiry.hold_reason)
      .eq('is_active', true)
      .single()

    if (tErr || !template) {
      return NextResponse.json(
        { error: `No message template found for reason: ${enquiry.hold_reason}` },
        { status: 400 }
      )
    }

    // 6. Build and send the email
    const email = await enquiryOnHoldEmail({
      customerName: enquiry.client_name || 'Customer',
      customerMessage: template.customer_message,
    })

    const result = await sendEmail({
      to: enquiry.client_email,
      subject: email.subject,
      html: email.html,
      templateName: 'enquiry_on_hold',
      sentBy: profileId,
      recipientName: enquiry.client_name || undefined,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send on-hold notification email' },
        { status: 500 }
      )
    }

    // 7. Log 'customer_notified' activity on the enquiry
    await db.from('enquiry_activity').insert({
      enquiry_id: enquiryId,
      user_id: profileId,
      activity_type: 'customer_notified',
      title: `Customer notified — on hold (${template.display_label})`,
      description: null,
      metadata: {
        reason_key: enquiry.hold_reason,
        email_sent_to: enquiry.client_email,
        template_message: template.customer_message,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Notify on-hold error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
