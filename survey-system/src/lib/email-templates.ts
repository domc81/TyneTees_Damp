// =============================================================================
// Email Templates — server-side only
//
// Generates branded HTML email content for all platform email types.
// All templates use getCompanyBranding() — zero hardcoded company values.
//
// Design principles:
//   - Table-based layout for maximum email client compatibility
//   - Inline styles only (Gmail/Outlook strip <style> blocks)
//   - Responsive: works on mobile and desktop
//   - Tested visual design based on the send-quotation Edge Function template
//
// SECURITY: Server-side only. Never import in client components.
// =============================================================================

import { createServerClient as createSSRClient } from '@supabase/ssr'

// ---------------------------------------------------------------------------
// Company branding
// ---------------------------------------------------------------------------

export interface CompanyBranding {
  companyName: string
  companyEmail: string
  companyPhone: string
  logoUrl: string | null
  appUrl: string
}

// Module-level cache — per Node process (resets on deploy), fine for branding data
let _brandingCache: CompanyBranding | null = null

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }
  return createSSRClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
  })
}

/**
 * Returns company branding data for email templates.
 * Reads from company_profile + NEXT_PUBLIC_APP_URL env var.
 * Lightweight in-process cache so a batch of emails doesn't hammer the DB.
 */
export async function getCompanyBranding(): Promise<CompanyBranding> {
  if (_brandingCache) return _brandingCache

  const supabase = createServiceRoleClient()
  const { data } = await supabase
    .from('company_profile')
    .select('name, email_primary, phone_primary, logo_url')
    .single()

  const profile = data as {
    name?: string | null
    email_primary?: string | null
    phone_primary?: string | null
    logo_url?: string | null
  } | null

  _brandingCache = {
    companyName: profile?.name ?? 'Your Survey Company',
    companyEmail: profile?.email_primary ?? '',
    companyPhone: profile?.phone_primary ?? '',
    logoUrl: profile?.logo_url ?? null,
    appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, ''),
  }

  return _brandingCache
}

/** Clear the branding cache — call after company profile updates */
export function clearBrandingCache() {
  _brandingCache = null
}

// ---------------------------------------------------------------------------
// Base layout
// ---------------------------------------------------------------------------

/**
 * Wraps body content in a full, responsive HTML email shell.
 * Uses table-based layout for Outlook/Gmail/Apple Mail compatibility.
 * All styling is inline.
 */
export function wrapInBrandedLayout(bodyContent: string, branding: CompanyBranding): string {
  // SVG is blocked by virtually all email clients (Gmail, Outlook, Apple Mail)
  // for security reasons. Only render an <img> tag for raster formats (PNG/JPG/etc).
  // Fall back to the company name as styled text for SVG or missing logo.
  const isRasterLogo = branding.logoUrl && !/\.svg$/i.test(branding.logoUrl)
  const logoSection = isRasterLogo
    ? `<img src="${branding.logoUrl}" alt="${escapeHtml(branding.companyName)}" style="max-height:60px;max-width:200px;display:block;" />`
    : `<span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">${escapeHtml(branding.companyName)}</span>`

  const phoneFooter = branding.companyPhone
    ? `<a href="tel:${branding.companyPhone.replace(/\s/g, '')}" style="color:#9ca3af;text-decoration:none;">${escapeHtml(branding.companyPhone)}</a> &nbsp;·&nbsp; `
    : ''

  const emailFooter = branding.companyEmail
    ? `<a href="mailto:${branding.companyEmail}" style="color:#9ca3af;text-decoration:none;">${escapeHtml(branding.companyEmail)}</a>`
    : ''

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(branding.companyName)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!-- Inner card (max 600px) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0f2540 100%);padding:32px 40px;border-radius:12px 12px 0 0;" align="left">
              ${logoSection}
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;" align="center">
              <p style="margin:0 0 6px 0;font-size:13px;color:#6b7280;font-weight:600;">${escapeHtml(branding.companyName)}</p>
              <p style="margin:0 0 6px 0;font-size:12px;color:#9ca3af;">
                ${phoneFooter}${emailFooter}
              </p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">This email was sent by ${escapeHtml(branding.companyName)}.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Template result type
// ---------------------------------------------------------------------------

export interface EmailTemplate {
  subject: string
  html: string
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
    <tr>
      <td style="border-radius:8px;background-color:#1e3a5f;">
        <a href="${href}" target="_blank"
           style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`
}

function greeting(customerName: string): string {
  const name = customerName.trim() || 'there'
  return `<p style="margin:0 0 20px 0;font-size:16px;color:#111827;line-height:1.6;">Dear ${escapeHtml(name)},</p>`
}

function signature(branding: CompanyBranding): string {
  const parts = ['Kind regards,', `<strong>${escapeHtml(branding.companyName)}</strong>`]
  if (branding.companyPhone) {
    parts.push(`<a href="tel:${branding.companyPhone.replace(/\s/g, '')}" style="color:#1e3a5f;text-decoration:none;">${escapeHtml(branding.companyPhone)}</a>`)
  }
  return `<p style="margin:24px 0 0 0;font-size:14px;color:#374151;line-height:1.8;">${parts.join('<br />')}</p>`
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;color:#6b7280;width:40%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`
}

function infoBox(rows: Array<[string, string]>): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
            style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:20px 0;">
    <tbody>
      ${rows.map(([l, v]) => infoRow(l, v)).join('\n')}
    </tbody>
  </table>`
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

// ── Booking confirmation ──────────────────────────────────────────────────

export interface BookingConfirmationData {
  customerName: string
  bookingDate: string    // e.g. "Monday 3 March 2026"
  bookingTime: string    // e.g. "9:00 AM"
  surveyorName: string
  siteAddress: string
}

export async function bookingConfirmationEmail(data: BookingConfirmationData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Your survey appointment is confirmed — ${branding.companyName}`

  const preheader = `Your survey is booked for ${data.bookingDate} at ${data.bookingTime}.`

  const body = `
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      ${escapeHtml(preheader)}&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      We're pleased to confirm your damp survey appointment. Please see the details below.
    </p>

    ${infoBox([
      ['Date', data.bookingDate],
      ['Time', data.bookingTime],
      ['Surveyor', data.surveyorName],
      ['Property address', data.siteAddress],
    ])}

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      If you need to reschedule, please contact us as soon as possible:
    </p>

    ${branding.companyPhone ? `<p style="margin:0 0 20px 0;">
      <a href="tel:${branding.companyPhone.replace(/\s/g, '')}"
         style="font-size:16px;font-weight:700;color:#1e3a5f;text-decoration:none;">
        ${escapeHtml(branding.companyPhone)}
      </a>
    </p>` : ''}

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Booking cancellation ──────────────────────────────────────────────────

export interface BookingCancellationData {
  customerName: string
  bookingDate: string
  bookingTime: string
  siteAddress: string
}

export async function bookingCancellationEmail(data: BookingCancellationData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Survey appointment cancelled — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Your survey appointment on ${escapeHtml(data.bookingDate)} has been cancelled.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      We're writing to confirm that your survey appointment has been cancelled.
    </p>

    ${infoBox([
      ['Date', data.bookingDate],
      ['Time', data.bookingTime],
      ['Property address', data.siteAddress],
    ])}

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      To rearrange your survey at a convenient time, please get in touch:
    </p>

    ${branding.companyPhone ? `<p style="margin:0 0 20px 0;">
      <a href="tel:${branding.companyPhone.replace(/\s/g, '')}"
         style="font-size:16px;font-weight:700;color:#1e3a5f;text-decoration:none;">
        ${escapeHtml(branding.companyPhone)}
      </a>
    </p>` : ''}

    ${branding.companyEmail ? `<p style="margin:0 0 20px 0;font-size:14px;color:#374151;">
      Or email us at <a href="mailto:${branding.companyEmail}" style="color:#1e3a5f;">${escapeHtml(branding.companyEmail)}</a>
    </p>` : ''}

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Booking updated ───────────────────────────────────────────────────────

export interface BookingUpdatedData {
  customerName: string
  bookingDate: string    // e.g. "Monday 3 March 2026"
  bookingTime: string    // e.g. "09:00"
  surveyorName: string
  siteAddress: string
}

export async function bookingUpdatedEmail(data: BookingUpdatedData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Your survey appointment has been updated — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Your survey appointment has been rescheduled to ${escapeHtml(data.bookingDate)} at ${escapeHtml(data.bookingTime)}.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      We're writing to let you know that your survey appointment has been updated. Please see the new details below.
    </p>

    ${infoBox([
      ['Date', data.bookingDate],
      ['Time', data.bookingTime],
      ['Surveyor', data.surveyorName],
      ['Property address', data.siteAddress],
    ])}

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      If you have any questions or need to make further changes, please contact us:
    </p>

    ${branding.companyPhone ? `<p style="margin:0 0 20px 0;">
      <a href="tel:${branding.companyPhone.replace(/\s/g, '')}"
         style="font-size:16px;font-weight:700;color:#1e3a5f;text-decoration:none;">
        ${escapeHtml(branding.companyPhone)}
      </a>
    </p>` : ''}

    ${branding.companyEmail ? `<p style="margin:0 0 20px 0;font-size:14px;color:#374151;">
      Or email us at <a href="mailto:${branding.companyEmail}" style="color:#1e3a5f;">${escapeHtml(branding.companyEmail)}</a>
    </p>` : ''}

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Booking reminder ──────────────────────────────────────────────────────

export interface BookingReminderData {
  customerName: string
  bookingDate: string
  bookingTime: string
  surveyorName: string
  siteAddress: string
}

export async function bookingReminderEmail(data: BookingReminderData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Reminder: Your survey is tomorrow — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Friendly reminder — your survey is tomorrow at ${escapeHtml(data.bookingTime)}.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      This is a friendly reminder that your damp survey is scheduled for <strong>tomorrow</strong>.
    </p>

    ${infoBox([
      ['Date', data.bookingDate],
      ['Time', data.bookingTime],
      ['Surveyor', data.surveyorName],
      ['Property address', data.siteAddress],
    ])}

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      Please ensure access to all areas of the property is available for our surveyor.
    </p>

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      Need to make changes? Please contact us as soon as possible:
      ${branding.companyPhone ? `<strong><a href="tel:${branding.companyPhone.replace(/\s/g, '')}" style="color:#1e3a5f;text-decoration:none;">${escapeHtml(branding.companyPhone)}</a></strong>` : ''}
    </p>

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Quotation ─────────────────────────────────────────────────────────────

export interface QuotationEmailData {
  customerName: string
  quotationNumber: string
  quotationUrl: string      // full public URL to the quotation
  validUntilDate: string    // e.g. "31 March 2026"
}

export async function quotationEmail(data: QuotationEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Your quotation from ${branding.companyName} — ${data.quotationNumber}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Your survey quotation ${escapeHtml(data.quotationNumber)} is ready to view.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Following our recent survey, we're pleased to provide your quotation.
      Please click below to view the full details.
    </p>

    ${infoBox([
      ['Quotation reference', data.quotationNumber],
      ['Valid until', data.validUntilDate],
    ])}

    ${ctaButton(data.quotationUrl, 'View Your Quotation')}

    <p style="margin:0 0 20px 0;font-size:13px;color:#6b7280;line-height:1.6;">
      If the button doesn&apos;t work, copy and paste this link into your browser:<br />
      <a href="${data.quotationUrl}" style="color:#1e3a5f;word-break:break-all;">${escapeHtml(data.quotationUrl)}</a>
    </p>

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      If you have any questions about the quotation, please don&apos;t hesitate to get in touch.
    </p>

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Report ────────────────────────────────────────────────────────────────

export interface ReportEmailData {
  customerName: string
  reportUrl: string   // full public URL to the report
  surveyDate?: string
}

export async function reportEmail(data: ReportEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Your survey report — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Your survey report is now available to view.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Your survey report is now available.${data.surveyDate ? ` It covers the survey carried out on ${escapeHtml(data.surveyDate)}.` : ''}
    </p>

    ${ctaButton(data.reportUrl, 'View Your Survey Report')}

    <p style="margin:0 0 20px 0;font-size:13px;color:#6b7280;line-height:1.6;">
      If the button doesn&apos;t work, copy and paste this link into your browser:<br />
      <a href="${data.reportUrl}" style="color:#1e3a5f;word-break:break-all;">${escapeHtml(data.reportUrl)}</a>
    </p>

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      If you have any questions about the report, please contact us.
    </p>

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Test email ────────────────────────────────────────────────────────────

export interface TestEmailData {
  fromEmail: string
  replyToEmail: string | null
  sentAt: string   // ISO timestamp
}

export async function testEmail(data: TestEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Test email from ${branding.companyName}`

  const sentAtFormatted = new Date(data.sentAt).toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Europe/London',
  })

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Test email from your survey platform — email delivery is working.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      This is a test email sent from your survey management platform.
      If you&apos;re reading this, <strong style="color:#16a34a;">email delivery is working correctly.</strong>
    </p>

    ${infoBox([
      ['Sent at', sentAtFormatted],
      ['From address', data.fromEmail],
      ...(data.replyToEmail ? [['Reply-to', data.replyToEmail] as [string, string]] : []),
    ])}

    <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
      No action is required. This email was triggered from the platform notification settings.
    </p>
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Quotation accepted ──────────────────────────────────────────────────

export interface QuotationAcceptedEmailData {
  customerName: string
  quotationNumber: string
  totalInclVat: string       // formatted, e.g. "£1,234.56"
  depositAmount: string      // formatted
  coolingOffEndDate: string  // e.g. "16 March 2026"
  quotationUrl: string
}

export async function quotationAcceptedEmail(data: QuotationAcceptedEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Thank you for accepting our quotation — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Your acceptance of quotation ${escapeHtml(data.quotationNumber)} has been recorded.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Thank you for accepting our quotation. We&apos;re pleased to confirm that your acceptance has been recorded.
    </p>

    ${infoBox([
      ['Quotation reference', data.quotationNumber],
      ['Total (inc. VAT)', data.totalInclVat],
      ['Deposit required', data.depositAmount],
    ])}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Our team will contact you shortly to discuss next steps and arrange a convenient start date.
    </p>

    <p style="margin:0 0 6px 0;font-size:14px;color:#374151;line-height:1.6;font-weight:600;">
      Deposit
    </p>
    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      A deposit of ${escapeHtml(data.depositAmount)} is required before we can schedule the works. We&apos;ll provide payment details when we get in touch.
    </p>

    <!-- Cooling-off period reminder — legally required -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
           style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;margin:20px 0;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#92400e;">
            Your Right to Cancel
          </p>
          <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6;">
            Under the Consumer Contracts Regulations 2013, you have the right to cancel this contract within
            14 days of acceptance (until ${escapeHtml(data.coolingOffEndDate)}) without giving any reason.
            To cancel, please contact us by phone, email, or letter within this period.
          </p>
        </td>
      </tr>
    </table>

    ${ctaButton(data.quotationUrl, 'View Your Quotation')}

    <p style="margin:0 0 20px 0;font-size:13px;color:#6b7280;line-height:1.6;">
      If the button doesn&apos;t work, copy and paste this link into your browser:<br />
      <a href="${data.quotationUrl}" style="color:#1e3a5f;word-break:break-all;">${escapeHtml(data.quotationUrl)}</a>
    </p>

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Quotation declined ──────────────────────────────────────────────────

export interface QuotationDeclinedEmailData {
  customerName: string
  quotationNumber: string
}

export async function quotationDeclinedEmail(data: QuotationDeclinedEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `Your quotation response — ${branding.companyName}`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      We&apos;ve received your response to quotation ${escapeHtml(data.quotationNumber)}.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Thank you for letting us know your decision regarding quotation ${escapeHtml(data.quotationNumber)}.
    </p>

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      We understand this may not be the right time. If your circumstances change or you&apos;d like to discuss the quotation further, we&apos;re always happy to help.
    </p>

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}

// ── Enquiry on-hold notification ────────────────────────────────────────

export interface EnquiryOnHoldEmailData {
  customerName: string
  customerMessage: string // reason-specific message from on_hold_message_templates
}

export async function enquiryOnHoldEmail(data: EnquiryOnHoldEmailData): Promise<EmailTemplate> {
  const branding = await getCompanyBranding()
  const subject = `${branding.companyName} — Update on your enquiry`

  const body = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      An update on your enquiry with ${escapeHtml(branding.companyName)}.&nbsp;&#8203;&nbsp;&#8203;
    </div>

    ${greeting(data.customerName)}

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      Thank you for your recent enquiry with ${escapeHtml(branding.companyName)}.
    </p>

    <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
      ${escapeHtml(data.customerMessage)}
    </p>

    <p style="margin:0 0 20px 0;font-size:14px;color:#374151;line-height:1.6;">
      If you have any questions in the meantime, please don&apos;t hesitate to contact us.
    </p>

    ${branding.companyPhone ? `<p style="margin:0 0 20px 0;">
      <a href="tel:${branding.companyPhone.replace(/\\s/g, '')}"
         style="font-size:16px;font-weight:700;color:#1e3a5f;text-decoration:none;">
        ${escapeHtml(branding.companyPhone)}
      </a>
    </p>` : ''}

    ${branding.companyEmail ? `<p style="margin:0 0 20px 0;font-size:14px;color:#374151;">
      <a href="mailto:${branding.companyEmail}" style="color:#1e3a5f;">${escapeHtml(branding.companyEmail)}</a>
    </p>` : ''}

    ${signature(branding)}
  `

  return { subject, html: wrapInBrandedLayout(body, branding) }
}
