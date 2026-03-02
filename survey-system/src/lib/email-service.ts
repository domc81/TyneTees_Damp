// =============================================================================
// Email Service — server-side only
//
// Single point of contact for all email sending from the platform.
// Reads credentials dynamically from getEmailConfig() on every call.
// Never throws — always returns a success/failure result object.
//
// SECURITY: Server-side only. Never import in client components.
// =============================================================================

import { Resend } from 'resend'
import { getEmailConfig } from './email-config'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// ---------------------------------------------------------------------------
// sendEmail()
// ---------------------------------------------------------------------------

/**
 * Send an email via Resend using the dynamically configured credentials.
 *
 * Returns { success: true, messageId } on success, or { success: false, error }
 * on any failure (misconfiguration, network error, Resend API error).
 *
 * Never throws.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const { to, subject, html, replyTo } = options

  // 1. Load email config dynamically — returns null if not configured
  let config
  try {
    config = await getEmailConfig()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error loading email config'
    console.error('[email-service] Failed to load email config:', msg)
    return { success: false, error: 'Email configuration could not be loaded' }
  }

  if (!config) {
    console.warn('[email-service] Email not configured — skipping send')
    return { success: false, error: 'Email not configured' }
  }

  // 2. Send via Resend
  try {
    const resend = new Resend(config.apiKey)

    const from = config.fromName
      ? `${config.fromName} <${config.fromEmail}>`
      : config.fromEmail

    const effectiveReplyTo = replyTo ?? config.replyTo ?? undefined

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(effectiveReplyTo ? { reply_to: effectiveReplyTo } : {}),
    })

    if (error) {
      const msg = typeof error === 'object' && 'message' in error
        ? String((error as { message: unknown }).message)
        : JSON.stringify(error)
      console.error('[email-service] Resend API error:', msg, { to, subject })
      // TODO (Prompt 4): log to communication_log table
      console.log('[email-service] SEND_LOG', {
        recipient: Array.isArray(to) ? to.join(', ') : to,
        subject,
        success: false,
        error: msg,
        timestamp: new Date().toISOString(),
      })
      return { success: false, error: 'Failed to send email' }
    }

    const messageId = data?.id
    // TODO (Prompt 4): log to communication_log table
    console.log('[email-service] SEND_LOG', {
      recipient: Array.isArray(to) ? to.join(', ') : to,
      subject,
      success: true,
      messageId,
      timestamp: new Date().toISOString(),
    })

    return { success: true, messageId }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[email-service] Unexpected error sending email:', msg, { to, subject })
    // TODO (Prompt 4): log to communication_log table
    console.log('[email-service] SEND_LOG', {
      recipient: Array.isArray(to) ? to.join(', ') : to,
      subject,
      success: false,
      error: msg,
      timestamp: new Date().toISOString(),
    })
    return { success: false, error: 'An unexpected error occurred while sending email' }
  }
}
