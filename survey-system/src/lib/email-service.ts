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
import { createServerClient as createSSRClient } from '@supabase/ssr'
import { getEmailConfig } from './email-config'
import { recordUsage } from '@/lib/usage'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  /** File attachments (e.g. quotation PDF). Resend accepts Buffer or base64 content. */
  attachments?: { filename: string; content: Buffer | string }[]
  // Logging context — optional, for audit trail in communication_log
  templateName?: string
  customerId?: string
  surveyId?: string
  quotationId?: string
  bookingId?: string
  sentBy?: string
  recipientName?: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// ---------------------------------------------------------------------------
// Internal: logging helper
// ---------------------------------------------------------------------------

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}

async function logCommunication(params: {
  status: 'sent' | 'failed'
  recipientEmail: string
  recipientName?: string
  subject: string
  messageId?: string
  errorMessage?: string
  templateName?: string
  customerId?: string
  surveyId?: string
  quotationId?: string
  bookingId?: string
  sentBy?: string
}): Promise<void> {
  try {
    const supabase = createServiceRoleClient()
    if (!supabase) return

    await supabase.from('communication_log').insert({
      channel: 'email',
      direction: 'outbound',
      status: params.status,
      recipient_email: params.recipientEmail,
      recipient_name: params.recipientName ?? null,
      subject: params.subject,
      message_id: params.messageId ?? null,
      error_message: params.errorMessage ?? null,
      template_name: params.templateName ?? null,
      customer_id: params.customerId ?? null,
      survey_id: params.surveyId ?? null,
      quotation_id: params.quotationId ?? null,
      booking_id: params.bookingId ?? null,
      sent_by: params.sentBy ?? null,
    })
  } catch (err) {
    // Logging must never cause the send to fail
    console.error('[email-service] Failed to write to communication_log:', err)
  }
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
  const {
    to, subject, html, replyTo, attachments,
    templateName, customerId, surveyId, quotationId, bookingId, sentBy, recipientName,
  } = options

  const recipientEmail = Array.isArray(to) ? to[0] : to

  // Shared logging args for every exit path
  const logBase = { recipientEmail, recipientName, subject, templateName, customerId, surveyId, quotationId, bookingId, sentBy }

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
      // Resend SDK v3+ expects camelCase replyTo — the old snake_case
      // reply_to key is silently ignored and Reply-To never gets set
      ...(effectiveReplyTo ? { replyTo: effectiveReplyTo } : {}),
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
    })

    if (error) {
      const msg = typeof error === 'object' && 'message' in error
        ? String((error as { message: unknown }).message)
        : JSON.stringify(error)
      console.error('[email-service] Resend API error:', msg, { to, subject })
      await logCommunication({ ...logBase, status: 'failed', errorMessage: msg })
      return { success: false, error: 'Failed to send email' }
    }

    const messageId = data?.id
    await logCommunication({ ...logBase, status: 'sent', messageId })

    // Fire-and-forget usage tracking — one event per successful send
    recordUsage({
      category: 'email',
      provider: 'resend',
      quantity: 1,
      unit: 'emails',
      source: 'lib/email-service',
      source_ref: messageId ? `resend:${messageId}` : undefined,
    })

    return { success: true, messageId }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[email-service] Unexpected error sending email:', msg, { to, subject })
    await logCommunication({ ...logBase, status: 'failed', errorMessage: msg })
    return { success: false, error: 'An unexpected error occurred while sending email' }
  }
}
