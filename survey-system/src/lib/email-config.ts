// =============================================================================
// Email Configuration Helper — server-side only
//
// Reads the active email mode from platform_settings and returns a config
// object ready for use by the email sending layer.
//
// SECURITY: This module uses the service role client to read sensitive settings
// (API keys). It must NEVER be imported in client components or returned to the
// browser. Use only in API route handlers and server components.
// =============================================================================

import { createServerClient as createSSRClient } from '@supabase/ssr'

// ---------------------------------------------------------------------------
// Service-role client
// ---------------------------------------------------------------------------

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
    // Email config must always be live — never let the Next Data Cache serve
    // a stale platform_settings/company_profile row (see lib/company-profile.ts).
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmailConfig {
  /** Resend API key to use for sending */
  apiKey: string
  /** The "From" email address */
  fromEmail: string
  /** The display name shown in the From field */
  fromName: string
  /** Reply-to address (company's primary contact email) */
  replyTo: string | null
}

// ---------------------------------------------------------------------------
// getEmailConfig()
// ---------------------------------------------------------------------------

/**
 * Returns the active email configuration, or null if email is not configured.
 *
 * Platform mode:
 *   - apiKey: RESEND_API_KEY env var (primary) or platform_resend_api_key setting
 *   - fromEmail: platform_from_email setting
 *   - fromName: company_profile.name
 *   - replyTo: company_profile.email_primary
 *
 * Custom mode:
 *   - apiKey: custom_resend_api_key setting
 *   - fromEmail: custom_from_email setting
 *   - fromName: custom_from_name setting
 *   - replyTo: company_profile.email_primary
 *
 * Returns null if the required credentials are not configured.
 */
export async function getEmailConfig(): Promise<EmailConfig | null> {
  const supabase = createServiceRoleClient()

  // Fetch all settings in one query
  const { data: settingsRows, error: settingsError } = await supabase
    .from('platform_settings')
    .select('key, value, is_sensitive')

  if (settingsError) {
    console.error('[email-config] Failed to load platform_settings:', settingsError.message)
    return null
  }

  // Build settings map
  const settings: Record<string, string> = {}
  for (const row of settingsRows ?? []) {
    if (row.value !== null && row.value !== undefined) {
      settings[row.key] = row.value
    }
  }

  // Fetch company profile for display name and reply-to
  const { data: company } = await supabase
    .from('company_profile')
    .select('name, email_primary')
    .single()

  const companyName: string = (company as { name?: string } | null)?.name ?? ''
  const companyEmail: string | null = (company as { email_primary?: string | null } | null)?.email_primary ?? null

  const mode = settings['email_mode'] ?? 'platform'

  if (mode === 'platform') {
    // API key: prefer RESEND_API_KEY env var, fall back to stored setting
    const apiKey = process.env.RESEND_API_KEY || settings['platform_resend_api_key'] || ''
    const fromEmail = settings['platform_from_email'] || ''

    if (!apiKey || !fromEmail) {
      // Platform email not fully configured
      return null
    }

    return {
      apiKey,
      fromEmail,
      fromName: companyName,
      replyTo: companyEmail,
    }
  }

  if (mode === 'custom') {
    const apiKey = settings['custom_resend_api_key'] || ''
    const fromEmail = settings['custom_from_email'] || ''
    const fromName = settings['custom_from_name'] || companyName

    if (!apiKey || !fromEmail) {
      // Custom email not fully configured
      return null
    }

    return {
      apiKey,
      fromEmail,
      fromName,
      replyTo: companyEmail,
    }
  }

  return null
}
