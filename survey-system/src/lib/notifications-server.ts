// =============================================================================
// Server-side Notification Helpers
//
// Uses the service-role Supabase client to bypass RLS, allowing system-generated
// notifications to be inserted regardless of which user triggered the event.
// These functions are meant to be called from API routes or server actions only.
// =============================================================================

import { createClient } from '@supabase/supabase-js'
import type { NotificationCreateData } from './calendar-types'

// -----------------------------------------------------------------------------
// Service-role client (singleton per process — safe for serverless)
// -----------------------------------------------------------------------------

let _adminClient: ReturnType<typeof createClient> | null = null

function getServiceClient() {
  if (_adminClient) return _adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for server notifications'
    )
  }

  _adminClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _adminClient
}

// -----------------------------------------------------------------------------
// Core insert — used by all helpers below
// -----------------------------------------------------------------------------

async function insertNotification(data: NotificationCreateData): Promise<void> {
  const supabase = getServiceClient()

  const { error } = await supabase.from('notifications').insert(data)

  if (error) {
    console.error('[notifications-server] Insert failed:', error)
    throw new Error(`Failed to insert notification: ${error.message}`)
  }
}

async function insertNotifications(rows: NotificationCreateData[]): Promise<void> {
  if (rows.length === 0) return
  const supabase = getServiceClient()

  const { error } = await supabase.from('notifications').insert(rows)

  if (error) {
    console.error('[notifications-server] Batch insert failed:', error)
    throw new Error(`Failed to insert notifications: ${error.message}`)
  }
}

// -----------------------------------------------------------------------------
// Recipient resolution — office & admin staff
// -----------------------------------------------------------------------------

async function getOfficeAndAdminProfileIds(): Promise<string[]> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('user_profiles')
    .select('id')
    .in('role', ['admin', 'office'])
    .eq('is_active', true)

  if (error) {
    console.error('[notifications-server] Failed to fetch office/admin profiles:', error)
    return []
  }

  return (data || []).map((row) => row.id)
}

// -----------------------------------------------------------------------------
// Survey notifications
// -----------------------------------------------------------------------------

export async function notifySurveyCreated(
  survey: { id: string; project_number?: string; client_name?: string },
  createdByName: string
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const label = survey.project_number || 'New survey'
  const customer = survey.client_name || 'Unknown customer'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'survey_created',
    title: 'New Survey Created',
    message: `${createdByName} created survey ${label} for ${customer}.`,
    survey_id: survey.id,
    link_url: `/projects/${survey.id}`,
  }))

  await insertNotifications(rows)
}

export async function notifySurveyAssigned(
  survey: { id: string; project_number?: string; client_name?: string },
  surveyorProfileId: string
): Promise<void> {
  const label = survey.project_number || 'A survey'
  const customer = survey.client_name || 'a customer'

  await insertNotification({
    user_id: surveyorProfileId,
    type: 'survey_assigned',
    title: 'Survey Assigned to You',
    message: `You have been assigned survey ${label} for ${customer}.`,
    survey_id: survey.id,
    link_url: `/projects/${survey.id}`,
  })
}

export async function notifySurveyCompleted(
  survey: { id: string; project_number?: string; client_name?: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const label = survey.project_number || 'A survey'
  const customer = survey.client_name || 'Unknown customer'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'survey_completed',
    title: 'Survey Completed',
    message: `Survey ${label} for ${customer} has been completed.`,
    survey_id: survey.id,
    link_url: `/projects/${survey.id}`,
  }))

  await insertNotifications(rows)
}

// -----------------------------------------------------------------------------
// Quotation notifications
// -----------------------------------------------------------------------------

export async function notifyQuotationGenerated(
  quotation: { id: string; quotation_number?: string },
  survey: { id: string; project_number?: string; client_name?: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const qNum = quotation.quotation_number || 'New quotation'
  const customer = survey.client_name || 'Unknown customer'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'quotation_generated',
    title: 'Quotation Generated',
    message: `Quotation ${qNum} generated for ${customer}.`,
    quotation_id: quotation.id,
    survey_id: survey.id,
    link_url: `/survey/${survey.id}/costing`,
  }))

  await insertNotifications(rows)
}

export async function notifyQuotationSent(
  quotation: { id: string; quotation_number?: string },
  survey: { id: string; project_number?: string; client_name?: string },
  customerName: string
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const qNum = quotation.quotation_number || 'A quotation'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'quotation_sent',
    title: `Quotation sent — ${qNum}`,
    message: `${qNum} has been emailed to ${customerName}.`,
    quotation_id: quotation.id,
    survey_id: survey.id,
    link_url: `/survey/${survey.id}/costing`,
  }))

  await insertNotifications(rows)
}

export async function notifyQuotationViewed(
  quotation: { id: string; quotation_number?: string; survey_id: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const qNum = quotation.quotation_number || 'A quotation'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'quotation_viewed',
    title: 'Quotation Viewed by Customer',
    message: `${qNum} has been viewed by the customer.`,
    quotation_id: quotation.id,
    survey_id: quotation.survey_id,
    link_url: `/survey/${quotation.survey_id}/costing`,
  }))

  await insertNotifications(rows)
}

// -----------------------------------------------------------------------------
// Report notifications
// -----------------------------------------------------------------------------

export async function notifyReportPublished(
  report: { id: string },
  survey: { id: string; project_number?: string; client_name?: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const label = survey.project_number || 'A survey'
  const customer = survey.client_name || 'Unknown customer'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'report_published',
    title: 'Report Published',
    message: `Report for ${label} (${customer}) has been published.`,
    report_id: report.id,
    survey_id: survey.id,
    link_url: `/survey/${survey.id}/report`,
  }))

  await insertNotifications(rows)
}

export async function notifyReportSent(
  report: { id: string },
  survey: { id: string; project_number?: string; client_name?: string },
  customerName: string
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const label = survey.project_number || 'A survey'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'report_sent',
    title: `Report sent — ${label}`,
    message: `Report for ${label} has been emailed to ${customerName}.`,
    report_id: report.id,
    survey_id: survey.id,
    link_url: `/survey/${survey.id}/report`,
  }))

  await insertNotifications(rows)
}

export async function notifyReportViewed(
  report: { id: string; survey_id: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'report_viewed',
    title: 'Report Viewed by Customer',
    message: `A customer has viewed their survey report.`,
    report_id: report.id,
    survey_id: report.survey_id,
    link_url: `/survey/${report.survey_id}/report`,
  }))

  await insertNotifications(rows)
}

// -----------------------------------------------------------------------------
// Enquiry notifications
// -----------------------------------------------------------------------------

export async function notifyEnquiryCreated(
  enquiry: { id: string; name?: string; email?: string }
): Promise<void> {
  const recipientIds = await getOfficeAndAdminProfileIds()
  if (recipientIds.length === 0) return

  const who = enquiry.name || enquiry.email || 'Someone'

  const rows: NotificationCreateData[] = recipientIds.map((userId) => ({
    user_id: userId,
    type: 'enquiry_created',
    title: 'New Enquiry Received',
    message: `${who} submitted a new enquiry.`,
    enquiry_id: enquiry.id,
    link_url: '/enquiries',
  }))

  await insertNotifications(rows)
}
