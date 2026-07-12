// =============================================================================
// Customer-document send guard — review pt 3
//
// The customer must never receive duplicate report/quotation emails. Every
// send path (pipeline Approve & Send + the per-page resend utilities) calls
// findPriorCustomerSend() first; if a successful send already exists the
// route returns 409 with the details and the UI requires an explicit typed
// confirmation before re-calling with confirmResend: true.
// =============================================================================

import type { SupabaseClient } from '@supabase/supabase-js'

export interface PriorCustomerSend {
  sentAt: string
  sentTo: string
  templateName: string
}

/**
 * Look up the most recent successful customer-document email for a survey
 * and/or quotation across the given templates.
 */
export async function findPriorCustomerSend(
  db: SupabaseClient,
  opts: {
    surveyId?: string
    quotationId?: string
    templates: string[]
  }
): Promise<PriorCustomerSend | null> {
  const { surveyId, quotationId, templates } = opts
  if (!surveyId && !quotationId) return null

  let query = db
    .from('communication_log')
    .select('created_at, recipient_email, template_name')
    .eq('channel', 'email')
    .eq('direction', 'outbound')
    .eq('status', 'sent')
    .in('template_name', templates)

  if (surveyId && quotationId) {
    query = query.or(`survey_id.eq.${surveyId},quotation_id.eq.${quotationId}`)
  } else if (surveyId) {
    query = query.eq('survey_id', surveyId)
  } else if (quotationId) {
    query = query.eq('quotation_id', quotationId)
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) return null
  return {
    sentAt: data.created_at as string,
    sentTo: (data.recipient_email as string) ?? '',
    templateName: (data.template_name as string) ?? '',
  }
}

/** Standard 409 payload shape shared by the send routes. */
export function alreadySentPayload(prior: PriorCustomerSend) {
  return {
    error: 'Customer documents have already been sent',
    alreadySent: true,
    lastSentAt: prior.sentAt,
    lastSentTo: prior.sentTo,
    lastTemplate: prior.templateName,
  }
}
