// ============================================================================
// Status display labels — shared by activity feed renderers.
//
// Activity rows store raw status slugs in their titles ("Status changed from
// awaiting_payment to booked") so the data stays machine-parseable. Map slugs
// to display labels at render time — this also fixes historic rows.
// ============================================================================

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: 'New',
  awaiting_payment: 'Awaiting Payment',
  booked: 'Booked',
  survey_complete: 'Survey Complete',
  sent: 'Sent',
  won: 'Won',
  closed: 'Closed',
  on_hold: 'On Hold',
  lost: 'Lost',
  // Legacy statuses that may still appear in old activity rows
  contacted: 'Contacted',
  survey_booked: 'Booked',
  completed: 'Completed',
  handed_over: 'Handed Over',
}

/**
 * Humanize an activity title of the exact form "Status changed from X to Y".
 * Deliberately anchored — a blanket slug replacement would corrupt ordinary
 * words like "sent" or "new" in other activity titles.
 */
export function humanizeActivityTitle(title: string): string {
  return title.replace(
    /^Status changed from (\S+) to (\S+)$/,
    (_match, from: string, to: string) =>
      `Status changed from ${ENQUIRY_STATUS_LABELS[from] ?? from} to ${ENQUIRY_STATUS_LABELS[to] ?? to}`
  )
}
