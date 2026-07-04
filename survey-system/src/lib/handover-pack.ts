// =============================================================================
// Handover Pack — Data aggregation, CSV/text generation for CF handover
//
// Produces downloadable exports so the office can create a Contractor Foreman
// Project without re-typing. All functions use the browser Supabase client.
// =============================================================================

import { getSupabase } from './supabase-client'
import type { Customer, Enquiry, Quotation, QuotationSection } from '@/types/database.types'
import type { InstallerInfoRow } from '@/types/installer-info.types'
import { INSTALLER_INFO_CATEGORIES } from '@/types/installer-info.types'

// =============================================================================
// Types
// =============================================================================

export interface HandoverData {
  survey: {
    id: string
    project_number: string
    survey_type: string
    notes: string | null
    office_notes: string | null
    survey_data: Record<string, unknown> | null
    survey_tags: string[] | null
    reported_problem: string | null
  }
  customer: Customer | null
  enquiry: Enquiry | null
  quotation: Quotation | null
  quotationSections: QuotationSection[]
  installerInfo: InstallerInfoRow | null
  report: {
    id: string
    publish_token: string | null
    status: string
  } | null
}

// =============================================================================
// Data Aggregation
// =============================================================================

/**
 * Fetch all data needed for the handover pack from a single survey ID.
 * Runs queries in parallel for speed.
 */
export async function getHandoverData(surveyId: string): Promise<HandoverData> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  // 1. Load survey
  const { data: survey, error: surveyErr } = await supabase
    .from('surveys')
    .select('id, project_number, survey_type, notes, office_notes, survey_data, survey_tags, reported_problem, enquiry_id, customer_id')
    .eq('id', surveyId)
    .single()

  if (surveyErr || !survey) throw new Error(`Failed to load survey: ${surveyErr?.message}`)

  // 2. Parallel fetch of related data
  const [enquiryResult, customerResult, quotationResult, installerResult, reportResult] = await Promise.all([
    // Enquiry
    survey.enquiry_id
      ? supabase.from('enquiries').select('*').eq('id', survey.enquiry_id).single()
      : Promise.resolve({ data: null, error: null }),
    // Customer
    survey.customer_id
      ? supabase.from('customers').select('*').eq('id', survey.customer_id).single()
      : Promise.resolve({ data: null, error: null }),
    // Latest accepted quotation
    supabase
      .from('quotations')
      .select('*')
      .eq('survey_id', surveyId)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle(),
    // Installer info
    supabase
      .from('survey_installer_info')
      .select('*')
      .eq('survey_id', surveyId)
      .maybeSingle(),
    // Latest report
    supabase
      .from('survey_reports')
      .select('id, publish_token, status')
      .eq('survey_id', surveyId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  // 3. Quotation sections (needs quotation ID)
  let quotationSections: QuotationSection[] = []
  if (quotationResult.data) {
    const { data: sections } = await supabase
      .from('quotation_sections')
      .select('*')
      .eq('quotation_id', quotationResult.data.id)
      .eq('is_included', true)
      .order('display_order', { ascending: true })

    quotationSections = (sections || []) as QuotationSection[]
  }

  return {
    survey: {
      id: survey.id,
      project_number: survey.project_number,
      survey_type: survey.survey_type,
      notes: survey.notes,
      office_notes: survey.office_notes,
      survey_data: survey.survey_data,
      survey_tags: survey.survey_tags,
      reported_problem: survey.reported_problem,
    },
    customer: customerResult.data as Customer | null,
    enquiry: enquiryResult.data as Enquiry | null,
    quotation: quotationResult.data as Quotation | null,
    quotationSections,
    installerInfo: installerResult.data as InstallerInfoRow | null,
    report: reportResult.data as HandoverData['report'],
  }
}

// =============================================================================
// Guarantee Derivation
// =============================================================================

/**
 * Derive the guarantee type from survey type and tags.
 * 25-year for damp/timber/woodworm, 7-year for condensation/mould.
 * Multi-type surveys use the highest guarantee.
 */
export function deriveGuaranteeType(
  surveyType: string,
  tags?: string[] | null
): { years: number; description: string } {
  const twentyFiveYearTypes = ['damp', 'timber', 'woodworm']
  const hasTwentyFiveYear = twentyFiveYearTypes.includes(surveyType)
    || (tags || []).some(t =>
      t.includes('damp') || t.includes('timber') || t.includes('dry_rot')
      || t.includes('wet_rot') || t.includes('woodworm')
    )

  if (hasTwentyFiveYear) {
    return {
      years: 25,
      description: '25-year company guarantee covering treatment works, materials and labour. Insurance-backed guarantees available through the Protected Guarantee scheme.',
    }
  }

  return {
    years: 7,
    description: '7-year warranty covering mould/condensation treatment, materials and labour. Insurance-backed guarantees available through the Protected Guarantee scheme.',
  }
}

// =============================================================================
// Customer CSV
// =============================================================================

/**
 * Generate a CF-compatible customer import CSV.
 */
export function generateCustomerCSV(data: HandoverData): { csv: string; filename: string } {
  const c = data.customer
  const e = data.enquiry

  const firstName = c?.first_name || (e?.client_name || '').split(' ').slice(0, -1).join(' ') || ''
  const lastName = c?.last_name || (e?.client_name || '').split(' ').pop() || ''
  const email = c?.email || e?.client_email || ''
  const phone = c?.phone || e?.client_phone || ''
  const mobile = c?.mobile || ''
  const addr1 = c?.address_line1 || e?.site_address_1 || ''
  const addr2 = c?.address_line2 || e?.site_address_2 || ''
  const city = c?.city || e?.site_city || ''
  const county = c?.county || e?.site_county || ''
  const postcode = c?.postcode || e?.site_postcode || ''

  const header = 'First Name,Last Name,Email,Phone,Mobile,Address 1,Address 2,City,County,Postcode,Country'
  const row = [firstName, lastName, email, phone, mobile, addr1, addr2, city, county, postcode, 'United Kingdom']
    .map(csvEscape)
    .join(',')

  const csv = header + '\n' + row

  const ref = data.survey.project_number || 'customer'
  const filename = `CF-Customer-${ref}.csv`

  return { csv, filename }
}

// =============================================================================
// Job Summary Text
// =============================================================================

/**
 * Generate a plain text job summary for copy-pasting into CF Project notes.
 */
export function generateJobSummaryText(data: HandoverData): { text: string; filename: string } {
  const { survey, customer, enquiry, quotation, quotationSections, installerInfo, report } = data
  const siteInfo = installerInfo?.site_info || {}
  const ga = siteInfo.general_access || {}
  const hs = siteInfo.health_and_safety || {}

  const guarantee = deriveGuaranteeType(survey.survey_type, survey.survey_tags)

  const lines: string[] = []

  // Header
  const enquiryNumber = enquiry?.enquiry_number || ''
  lines.push('═══════════════════════════════════════')
  lines.push('CONTRACTOR FOREMAN HANDOVER SUMMARY')
  lines.push(`Job Reference: ${survey.project_number}${enquiryNumber ? ' / ' + enquiryNumber : ''}`)
  lines.push('═══════════════════════════════════════')
  lines.push('')

  // Customer
  lines.push('── CUSTOMER ──')
  const title = customer?.title ? customer.title + ' ' : ''
  const custName = customer
    ? `${title}${customer.first_name} ${customer.last_name}`
    : enquiry?.client_name || 'Unknown'
  lines.push(`Name: ${custName}`)
  if (customer?.email || enquiry?.client_email) lines.push(`Email: ${customer?.email || enquiry?.client_email}`)
  if (customer?.phone || enquiry?.client_phone) lines.push(`Phone: ${customer?.phone || enquiry?.client_phone}`)
  if (customer?.mobile) lines.push(`Mobile: ${customer.mobile}`)
  lines.push('')

  // Site Address
  lines.push('── SITE ADDRESS ──')
  const siteAddr = [
    enquiry?.site_address_1 || customer?.address_line1,
    enquiry?.site_address_2 || customer?.address_line2,
    enquiry?.site_city || customer?.city,
    enquiry?.site_county || customer?.county,
    enquiry?.site_postcode || customer?.postcode,
  ].filter(Boolean)
  lines.push(siteAddr.join('\n') || 'Not recorded')
  lines.push('')

  // Scope of Works
  lines.push('── ACCEPTED SCOPE OF WORKS ──')
  if (quotationSections.length > 0) {
    for (const s of quotationSections) {
      const total = typeof s.section_total === 'number' ? `£${s.section_total.toFixed(2)}` : ''
      lines.push(`• ${s.display_name}${total ? ' — ' + total : ''}`)
    }
    if (quotation) {
      lines.push(`Subtotal (ex VAT): £${(quotation.subtotal_combined + (quotation.pso_total || 0)).toFixed(2)}`)
      lines.push(`VAT (${((quotation.vat_rate || 0.2) * 100).toFixed(0)}%): £${(quotation.vat_amount || 0).toFixed(2)}`)
      lines.push(`Total (inc VAT): £${(quotation.total_incl_vat || 0).toFixed(2)}`)
      lines.push(`Deposit (${((quotation.deposit_percentage || 0) * 100).toFixed(0)}%): £${(quotation.deposit_amount || 0).toFixed(2)}`)
    }
  } else {
    lines.push('No accepted quotation sections found')
  }
  lines.push('')

  // Guarantee
  lines.push('── GUARANTEE ──')
  lines.push(guarantee.description)
  lines.push('')

  // Access & Parking
  lines.push('── ACCESS & PARKING ──')
  if (ga.parking) lines.push(`Parking: ${formatFieldValue(ga.parking as string)}`)
  if (ga.parking_notes) lines.push(`Parking Notes: ${ga.parking_notes}`)
  if (ga.access_method) lines.push(`Access Method: ${formatFieldValue(ga.access_method as string)}`)
  if (ga.access_notes) lines.push(`Access Notes: ${ga.access_notes}`)
  if (ga.property_occupied) lines.push(`Property Occupied: ${ga.property_occupied === true || ga.property_occupied === 'yes' ? 'Yes' : 'No'}`)
  if (ga.occupant_present_during_works) lines.push(`Occupant Present During Works: ${ga.occupant_present_during_works === true || ga.occupant_present_during_works === 'yes' ? 'Yes' : 'No'}`)
  if (ga.pets_on_site === true || ga.pets_on_site === 'yes') lines.push(`Pets: Yes${ga.pet_details ? ' — ' + ga.pet_details : ''}`)
  if (ga.vulnerable_occupants === true || ga.vulnerable_occupants === 'yes') lines.push(`Vulnerable Occupants: Yes${ga.vulnerable_occupant_notes ? ' — ' + ga.vulnerable_occupant_notes : ''}`)
  if (ga.furniture_removal_needed === true || ga.furniture_removal_needed === 'yes') lines.push(`Furniture Removal: Yes${ga.furniture_notes ? ' — ' + ga.furniture_notes : ''}`)
  if (ga.floor_coverings_to_protect === true || ga.floor_coverings_to_protect === 'yes') lines.push(`Floor Coverings to Protect: Yes${ga.floor_covering_notes ? ' — ' + ga.floor_covering_notes : ''}`)
  if (!ga.parking && !ga.access_method) lines.push('Not recorded')
  lines.push('')

  // Health & Safety / Risks
  lines.push('── HEALTH & SAFETY / RISKS ──')
  if (hs.asbestos_suspected) lines.push(`Asbestos: ${formatYesNoUnknown(hs.asbestos_suspected)}${hs.asbestos_notes ? ' — ' + hs.asbestos_notes : ''}`)
  if (hs.lead_paint_suspected) lines.push(`Lead Paint: ${formatYesNoUnknown(hs.lead_paint_suspected)}`)
  if (hs.confined_spaces === true || hs.confined_spaces === 'yes') lines.push(`Confined Spaces: Yes${hs.confined_space_details ? ' — ' + hs.confined_space_details : ''}`)
  if (hs.working_at_height === true || hs.working_at_height === 'yes') lines.push(`Working at Height: Yes${hs.height_details ? ' — ' + hs.height_details : ''}`)
  if (hs.floor_condition_issues === true || hs.floor_condition_issues === 'yes') lines.push(`Floor Issues: Yes${hs.floor_condition_notes ? ' — ' + hs.floor_condition_notes : ''}`)
  if (hs.other_hazards) lines.push(`Other Hazards: ${hs.other_hazards}`)
  if (hs.ppe_requirements) lines.push(`PPE: ${hs.ppe_requirements}`)
  if (!hs.asbestos_suspected && !hs.lead_paint_suspected && !hs.other_hazards) lines.push('No hazards recorded')
  lines.push('')

  // Special Instructions for Workmen
  lines.push('── SPECIAL INSTRUCTIONS FOR WORKMEN ──')
  lines.push(installerInfo?.notes || 'None recorded')
  lines.push('')

  // Additional Notes
  const hasNotes = survey.notes || survey.office_notes || survey.reported_problem
  lines.push('── ADDITIONAL NOTES ──')
  if (survey.reported_problem) lines.push(`Reported Problem: ${survey.reported_problem}`)
  if (survey.notes) lines.push(`Survey Notes: ${survey.notes}`)
  if (survey.office_notes) lines.push(`Office Notes: ${survey.office_notes}`)
  if (!hasNotes) lines.push('None')
  lines.push('')

  // Report Link
  lines.push('── REPORT ──')
  if (report?.publish_token) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || ''
    lines.push(`${appUrl}/report/${report.id}?token=${report.publish_token}`)
  } else {
    lines.push('Report not yet published')
  }
  lines.push('')

  // Footer
  lines.push('═══════════════════════════════════════')
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  lines.push(`Generated: ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`)
  lines.push('═══════════════════════════════════════')

  const text = lines.join('\n')
  const filename = `CF-Handover-${survey.project_number}.txt`

  return { text, filename }
}

// =============================================================================
// Helpers
// =============================================================================

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}

function formatFieldValue(value: string): string {
  return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatYesNoUnknown(value: unknown): string {
  if (value === true || value === 'yes') return 'Yes'
  if (value === false || value === 'no') return 'No'
  if (value === 'unknown') return 'Unknown'
  return String(value || 'Not recorded')
}
