// =============================================================================
// Quotation Presentation — single source of truth for the CUSTOMER view
//
// Consumed by all three customer-facing renderers so they can never drift:
//   - /q/[token] public page
//   - lib/quotation-pdf-renderer.tsx (PDF)
//   - the internal "Customer Preview" panel on the quotation page
//
// Presentation only: every figure comes from the quotation row and its
// quotation_sections children. Nothing here recalculates pricing.
//
// Customer presentation rules (review point 1, decision D1 = option B):
//   - every mandatory work item shows its own price (as optional always did)
//   - site_preparation sections + the travel/PSO overhead fold into ONE
//     customer-worded line rather than being pro-rated into item prices
//   - no material/labour split, margins, or subcontractor figures
// =============================================================================

// ─── Input shapes (structural — each caller's own types satisfy these) ───────

export interface QuotationTotalsLike {
  pso_total: number
  vat_rate: number
  vat_amount: number
  total_incl_vat: number
  deposit_percentage: number
  deposit_amount: number
}

export interface QuotationSectionLike {
  id?: string
  survey_type: string
  display_name: string
  display_order?: number
  section_total: number
  is_optional: boolean
  is_included: boolean
}

// ─── Output view model ────────────────────────────────────────────────────────

export interface CustomerQuotationLine {
  key: string
  label: string
  amount: number
}

export interface CustomerQuotationGroup {
  surveyType: string
  heading: string
  lines: CustomerQuotationLine[]
}

export interface CustomerQuotationView {
  /** Mandatory works grouped by survey type, each line individually priced */
  groups: CustomerQuotationGroup[]
  /** Combined site-prep + project overheads as one customer-worded line (null when zero) */
  overheadLine: CustomerQuotationLine | null
  /** Mandatory works + overhead line — matches the summary "Works subtotal" row */
  worksSubtotal: number
  optionalLines: CustomerQuotationLine[]
  optionalSubtotal: number
  hasOptional: boolean
  subtotalExVat: number
  vatRate: number
  vatAmount: number
  totalInclVat: number
  depositPercentage: number
  depositAmount: number
  balanceDue: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const SURVEY_TYPE_WORK_NAMES: Record<string, string> = {
  damp: 'Damp Proofing Works',
  condensation: 'Condensation Works',
  timber: 'Timber Treatment Works',
  woodworm: 'Woodworm Treatment Works',
}

/** Customer wording for site_preparation sections + travel/project overheads */
export const OVERHEAD_LINE_LABEL = 'Site setup, access & project management'

// ─── Builder ──────────────────────────────────────────────────────────────────

const round2 = (n: number) => Math.round(n * 100) / 100

export function buildCustomerQuotationView(
  quotation: QuotationTotalsLike,
  sections: QuotationSectionLike[],
  context?: string
): CustomerQuotationView {
  const ordered = [...sections].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  )

  const sitePrepTotal = ordered
    .filter(s => s.survey_type === 'site_preparation')
    .reduce((sum, s) => sum + s.section_total, 0)
  const overheadTotal = round2(sitePrepTotal + quotation.pso_total)

  const perTypeSections = ordered.filter(s => s.survey_type !== 'site_preparation')
  const mandatorySections = perTypeSections.filter(s => !s.is_optional)
  const optionalSections = perTypeSections.filter(s => s.is_optional && s.is_included)

  const groups: CustomerQuotationGroup[] = []
  for (const section of mandatorySections) {
    let group = groups.find(g => g.surveyType === section.survey_type)
    if (!group) {
      group = {
        surveyType: section.survey_type,
        heading: SURVEY_TYPE_WORK_NAMES[section.survey_type] ?? section.survey_type,
        lines: [],
      }
      groups.push(group)
    }
    group.lines.push({
      key: section.id ?? `${section.survey_type}-${group.lines.length}`,
      label: section.display_name,
      amount: section.section_total,
    })
  }

  const overheadLine: CustomerQuotationLine | null =
    overheadTotal > 0
      ? { key: 'overheads', label: OVERHEAD_LINE_LABEL, amount: overheadTotal }
      : null

  const mandatoryTotal = mandatorySections.reduce((sum, s) => sum + s.section_total, 0)
  const worksSubtotal = round2(mandatoryTotal + overheadTotal)

  const optionalLines: CustomerQuotationLine[] = optionalSections.map((s, i) => ({
    key: s.id ?? `optional-${i}`,
    label: s.display_name,
    amount: s.section_total,
  }))
  const optionalSubtotal = round2(
    optionalSections.reduce((sum, s) => sum + s.section_total, 0)
  )

  const subtotalExVat = round2(quotation.total_incl_vat - quotation.vat_amount)

  // Reconciliation: displayed lines must sum to the stored totals to the penny.
  // Presentation-side protection only — flags snapshot/display drift, never
  // adjusts a figure and never blocks the render (legacy snapshots carry a few
  // pennies of rounding noise between section rows and stored totals).
  const displayedSum = round2(worksSubtotal + optionalSubtotal)
  if (Math.abs(displayedSum - subtotalExVat) > 0.015) {
    console.error(
      `[quotation-presentation]${context ? ` ${context}:` : ''} displayed lines ` +
      `(£${displayedSum.toFixed(2)}) do not reconcile with stored subtotal ` +
      `ex VAT (£${subtotalExVat.toFixed(2)})`
    )
  }

  return {
    groups,
    overheadLine,
    worksSubtotal,
    optionalLines,
    optionalSubtotal,
    hasOptional: optionalLines.length > 0,
    subtotalExVat,
    vatRate: quotation.vat_rate,
    vatAmount: quotation.vat_amount,
    totalInclVat: quotation.total_incl_vat,
    depositPercentage: quotation.deposit_percentage,
    depositAmount: quotation.deposit_amount,
    balanceDue: round2(quotation.total_incl_vat - quotation.deposit_amount),
  }
}
