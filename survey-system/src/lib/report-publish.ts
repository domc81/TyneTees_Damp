// =============================================================================
// Report Publish Utilities
// Token-based public report sharing — no login required on the customer side.
//
// The publish_token IS the credential. Anyone with the URL can view the report.
// Clearing the token immediately revokes access.
// =============================================================================

import { getSupabase } from './supabase-client'

// =============================================================================
// Token Generation
// =============================================================================

/**
 * Generate a URL-safe random publish token.
 * Uses crypto.randomUUID() for 122 bits of entropy — brute-force resistant.
 * Strips hyphens and appends a second UUID segment for extra length (64 chars).
 */
export function generatePublishToken(): string {
  const a = crypto.randomUUID().replace(/-/g, '')
  const b = crypto.randomUUID().replace(/-/g, '')
  return `${a}${b}` // 64 hex chars
}

// =============================================================================
// Public URL Builder
// =============================================================================

/**
 * Returns the full public URL a customer would use to view the report.
 * Uses NEXT_PUBLIC_APP_URL env var with fallback to localhost for dev.
 */
export function getPublicReportUrl(reportId: string, token: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/report/${reportId}?token=${token}`
}

// =============================================================================
// Publish
// =============================================================================

/**
 * Publish a report: generates a token, stamps published_at, sets status to
 * 'published', and returns the token so the caller can build the share URL.
 */
export async function publishReport(reportId: string): Promise<string> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const token = generatePublishToken()
  const now = new Date().toISOString()

  const { error } = await supabase
    .from('survey_reports')
    .update({
      publish_token: token,
      published_at: now,
      status: 'published',
      updated_at: now,
    })
    .eq('id', reportId)

  if (error) {
    throw new Error(`Failed to publish report: ${error.message}`)
  }

  return token
}

// =============================================================================
// Unpublish
// =============================================================================

/**
 * Unpublish a report: clears the token and published_at, reverts status to
 * 'finalised' so the report remains accessible internally.
 */
export async function unpublishReport(reportId: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { error } = await supabase
    .from('survey_reports')
    .update({
      publish_token: null,
      published_at: null,
      status: 'finalised',
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)

  if (error) {
    throw new Error(`Failed to unpublish report: ${error.message}`)
  }
}
