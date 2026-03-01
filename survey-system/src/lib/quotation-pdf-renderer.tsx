// =============================================================================
// Quotation PDF Renderer — @react-pdf/renderer document component
//
// Generates a professional A4 PDF quotation document.
// Called server-side from the /api/q/[token]/pdf route.
// Parallel to report-pdf-renderer.tsx — does not modify it.
// =============================================================================

import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuotationForPDF {
  quotation_number: string
  version: number
  status: string
  created_at: string
  valid_until: string
  customer_name: string | null
  customer_address: string | null
  site_address: string | null
  surveyor_name: string | null
  surveyor_qualifications: string | null
  company_name: string | null
  company_phone: string | null
  company_email: string | null
  subtotal_mandatory: number
  subtotal_optional: number
  pso_total: number
  vat_rate: number
  vat_amount: number
  total_incl_vat: number
  deposit_percentage: number
  deposit_amount: number
  notes: string | null
  terms: string | null
}

export interface QuotationSectionForPDF {
  survey_type: string
  display_name: string
  display_order: number
  section_total: number
  is_optional: boolean
  is_included: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SURVEY_TYPE_WORK_NAMES: Record<string, string> = {
  damp: 'Damp Proofing Works',
  condensation: 'Condensation Works',
  timber: 'Timber Treatment Works',
  woodworm: 'Woodworm Treatment Works',
}

const DEFAULT_TERMS = `1. A deposit is required prior to the commencement of works as stated in this quotation.
2. The balance is due upon satisfactory completion of all works.
3. This quotation is valid for the period stated above from the date of issue.
4. All specified works are guaranteed against failure as per our standard guarantee documentation.
5. Access to the property and appropriate working conditions must be provided throughout the works.
6. Tyne Tees Damp Proofing Ltd reserves the right to revise this quotation should site conditions differ materially from those assessed during the survey.
7. Any additional works identified and agreed during the course of the project will be charged at our standard rates.`

const NAVY = '#1E3A5F'
const SLATE = '#374151'
const MUTED = '#6B7280'
const LIGHT_BG = '#F9FAFB'
const BORDER = '#E5E7EB'
const AMBER = '#92400E'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 50,
    backgroundColor: '#FFFFFF',
    fontSize: 9,
    color: '#1F2937',
    lineHeight: 1.5,
  },

  // Header strip
  headerStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: NAVY,
    padding: 18,
    marginBottom: 20,
    borderRadius: 4,
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  companyContact: {
    fontSize: 8,
    color: '#BFDBFE',
    marginBottom: 2,
  },
  quotationTitleRight: {
    alignItems: 'flex-end',
  },
  quotationWord: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 3,
  },
  quotationNumber: {
    fontSize: 9,
    color: '#BFDBFE',
    fontFamily: 'Helvetica',
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 8,
    color: '#93C5FD',
  },

  // Two-column address block
  addressRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: `1pt solid ${BORDER}`,
  },
  addressCol: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 8,
    color: SLATE,
    lineHeight: 1.5,
  },

  // Surveyor line
  surveyorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_BG,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
    border: `1pt solid ${BORDER}`,
  },
  surveyorText: {
    fontSize: 8,
    color: SLATE,
  },
  surveyorQuals: {
    fontSize: 8,
    color: MUTED,
    marginLeft: 6,
  },

  // Works table
  tableHeading: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  tableContainer: {
    border: `1pt solid ${BORDER}`,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  typeHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottom: `1pt solid ${BORDER}`,
  },
  typeHeaderText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottom: `0.5pt solid ${BORDER}`,
  },
  tableRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  tableRowName: {
    fontSize: 8,
    color: SLATE,
    flex: 1,
  },
  tableRowAmount: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    textAlign: 'right',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#F9FAFB',
    borderTop: `1pt solid ${BORDER}`,
  },
  subtotalLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: SLATE,
  },
  subtotalAmount: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  optionalTypeRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTop: `1pt solid ${BORDER}`,
    borderBottom: `1pt solid ${BORDER}`,
  },
  optionalTypeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: AMBER,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionalRowAmount: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: AMBER,
    textAlign: 'right',
  },
  optionalSubtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FFFBEB',
    borderTop: `1pt solid ${BORDER}`,
  },
  optionalSubtotalLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: AMBER,
  },
  psoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#F0F9FF',
    borderTop: `1pt solid ${BORDER}`,
  },

  // Totals block
  totalsContainer: {
    border: `1pt solid ${BORDER}`,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  totalsHeader: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottom: `1pt solid ${BORDER}`,
  },
  totalsHeaderText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalsBody: {
    padding: 12,
  },
  totalsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalsLineLabel: {
    fontSize: 8,
    color: MUTED,
  },
  totalsLineValue: {
    fontSize: 8,
    color: '#1F2937',
  },
  totalsDivider: {
    borderTop: `1pt solid ${BORDER}`,
    marginVertical: 6,
  },
  totalsDividerStrong: {
    borderTop: `2pt solid ${NAVY}`,
    marginVertical: 8,
  },
  grandTotalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  grandTotalValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
  },
  depositLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTop: `1pt solid ${BORDER}`,
  },
  depositLabel: {
    fontSize: 8,
    color: MUTED,
  },
  depositValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
  },
  balanceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  balanceLabel: {
    fontSize: 8,
    color: MUTED,
  },
  balanceValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: SLATE,
  },

  // Terms & notes
  termsHeading: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
    marginTop: 12,
  },
  termsBox: {
    backgroundColor: LIGHT_BG,
    border: `1pt solid ${BORDER}`,
    borderRadius: 4,
    padding: 10,
  },
  termsText: {
    fontSize: 7.5,
    color: MUTED,
    lineHeight: 1.6,
  },
  notesBox: {
    backgroundColor: LIGHT_BG,
    border: `1pt solid ${BORDER}`,
    borderRadius: 4,
    padding: 10,
  },
  notesText: {
    fontSize: 8,
    color: SLATE,
    lineHeight: 1.6,
  },

  // Footer
  pageFooter: {
    position: 'absolute',
    bottom: 24,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `0.5pt solid ${BORDER}`,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: MUTED,
  },
})

// ─── Document component ───────────────────────────────────────────────────────

interface Props {
  quotation: QuotationForPDF
  sections: QuotationSectionForPDF[]
}

export function QuotationPDFDocument({ quotation, sections }: Props) {
  // Derived data — mirrors the logic in the public page
  const sitePrepSections = sections.filter(s => s.survey_type === 'site_preparation')
  const sitePrepTotal = sitePrepSections.reduce((sum, s) => sum + s.section_total, 0)
  const psoDisplayTotal = sitePrepTotal + quotation.pso_total

  const perTypeSections = sections.filter(s => s.survey_type !== 'site_preparation')
  const mandatorySections = perTypeSections.filter(s => !s.is_optional)
  const optionalSections = perTypeSections.filter(s => s.is_optional && s.is_included)
  const hasOptional = optionalSections.length > 0

  const mandatoryByType: Record<string, QuotationSectionForPDF[]> = {}
  for (const section of mandatorySections) {
    if (!mandatoryByType[section.survey_type]) mandatoryByType[section.survey_type] = []
    mandatoryByType[section.survey_type].push(section)
  }

  const mandatoryWorksTotal = mandatorySections.reduce((sum, s) => sum + s.section_total, 0)
  const optionalWorksTotal = optionalSections.reduce((sum, s) => sum + s.section_total, 0)
  const subtotalExVat = quotation.total_incl_vat - quotation.vat_amount
  const balanceDue = quotation.total_incl_vat - quotation.deposit_amount

  const company = {
    name: quotation.company_name ?? 'Tyne Tees Damp Proofing Ltd',
    phone: quotation.company_phone ?? '0191 XXX XXXX',
    email: quotation.company_email ?? 'info@tyneteesdampproofing.co.uk',
  }

  const terms = quotation.terms ?? DEFAULT_TERMS

  return (
    <Document
      title={`${quotation.quotation_number} — ${company.name}`}
      author={company.name}
      subject="Quotation"
    >
      <Page size="A4" style={styles.page}>

        {/* ── Company header strip ─────────────────────────────────────── */}
        <View style={styles.headerStrip}>
          <View>
            <Text style={styles.companyName}>{company.name}</Text>
            {company.phone ? <Text style={styles.companyContact}>{company.phone}</Text> : null}
            {company.email ? <Text style={styles.companyContact}>{company.email}</Text> : null}
          </View>
          <View style={styles.quotationTitleRight}>
            <Text style={styles.quotationWord}>QUOTATION</Text>
            <Text style={styles.quotationNumber}>{quotation.quotation_number}</Text>
            <Text style={styles.metaLabel}>Date: {formatDate(quotation.created_at)}</Text>
            <Text style={styles.metaLabel}>Valid until: {formatDate(quotation.valid_until)}</Text>
          </View>
        </View>

        {/* ── Address block ────────────────────────────────────────────── */}
        <View style={styles.addressRow}>
          <View style={styles.addressCol}>
            <Text style={styles.sectionLabel}>Prepared for</Text>
            <Text style={styles.nameText}>{quotation.customer_name || '—'}</Text>
            {quotation.customer_address
              ? <Text style={styles.addressText}>{quotation.customer_address}</Text>
              : null}
          </View>
          <View style={styles.addressCol}>
            <Text style={styles.sectionLabel}>Site address</Text>
            <Text style={styles.addressText}>{quotation.site_address || '—'}</Text>
          </View>
        </View>

        {/* ── Surveyor ─────────────────────────────────────────────────── */}
        {quotation.surveyor_name ? (
          <View style={styles.surveyorRow}>
            <Text style={styles.surveyorText}>Surveyed by {quotation.surveyor_name}</Text>
            {quotation.surveyor_qualifications
              ? <Text style={styles.surveyorQuals}> · {quotation.surveyor_qualifications}</Text>
              : null}
          </View>
        ) : null}

        {/* ── Works table ──────────────────────────────────────────────── */}
        <Text style={styles.tableHeading}>Proposed Works</Text>
        <View style={styles.tableContainer}>

          {/* Mandatory sections by survey type */}
          {Object.entries(mandatoryByType).map(([surveyType, typeSections], typeIdx) => (
            <View key={surveyType}>
              <View style={styles.typeHeaderRow}>
                <Text style={styles.typeHeaderText}>
                  {SURVEY_TYPE_WORK_NAMES[surveyType] ?? surveyType}
                </Text>
              </View>
              {typeSections.map((section, idx) => {
                const isLast = idx === typeSections.length - 1 &&
                  !hasOptional &&
                  psoDisplayTotal === 0 &&
                  typeIdx === Object.keys(mandatoryByType).length - 1
                return (
                  <View key={`${surveyType}-${idx}`} style={isLast ? styles.tableRowLast : styles.tableRow}>
                    <Text style={styles.tableRowName}>{section.display_name}</Text>
                    <Text style={styles.tableRowAmount}>{formatCurrency(section.section_total)}</Text>
                  </View>
                )
              })}
            </View>
          ))}

          {/* Mandatory subtotal */}
          {mandatorySections.length > 0 ? (
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Mandatory Works Subtotal</Text>
              <Text style={styles.subtotalAmount}>{formatCurrency(mandatoryWorksTotal)}</Text>
            </View>
          ) : null}

          {/* Optional sections */}
          {hasOptional ? (
            <>
              <View style={styles.optionalTypeRow}>
                <Text style={styles.optionalTypeText}>Optional Works</Text>
              </View>
              {optionalSections.map((section, idx) => {
                const isLast = idx === optionalSections.length - 1 && psoDisplayTotal === 0
                return (
                  <View key={`opt-${idx}`} style={isLast ? styles.tableRowLast : styles.tableRow}>
                    <Text style={styles.tableRowName}>{section.display_name}</Text>
                    <Text style={styles.optionalRowAmount}>{formatCurrency(section.section_total)}</Text>
                  </View>
                )
              })}
              <View style={styles.optionalSubtotalRow}>
                <Text style={styles.optionalSubtotalLabel}>Optional Works Subtotal</Text>
                <Text style={styles.optionalRowAmount}>{formatCurrency(optionalWorksTotal)}</Text>
              </View>
            </>
          ) : null}

          {/* PSO */}
          {psoDisplayTotal > 0 ? (
            <View style={styles.psoRow}>
              <Text style={styles.tableRowName}>Project Specific Overheads</Text>
              <Text style={styles.tableRowAmount}>{formatCurrency(psoDisplayTotal)}</Text>
            </View>
          ) : null}

        </View>

        {/* ── Financial summary ─────────────────────────────────────────── */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsHeader}>
            <Text style={styles.totalsHeaderText}>Summary</Text>
          </View>
          <View style={styles.totalsBody}>

            <View style={styles.totalsLine}>
              <Text style={styles.totalsLineLabel}>Mandatory Works</Text>
              <Text style={styles.totalsLineValue}>{formatCurrency(mandatoryWorksTotal)}</Text>
            </View>

            {hasOptional ? (
              <View style={styles.totalsLine}>
                <Text style={styles.totalsLineLabel}>Optional Works</Text>
                <Text style={{ ...styles.totalsLineValue, color: AMBER }}>{formatCurrency(optionalWorksTotal)}</Text>
              </View>
            ) : null}

            {psoDisplayTotal > 0 ? (
              <View style={styles.totalsLine}>
                <Text style={styles.totalsLineLabel}>Project Specific Overheads</Text>
                <Text style={styles.totalsLineValue}>{formatCurrency(psoDisplayTotal)}</Text>
              </View>
            ) : null}

            <View style={styles.totalsDivider} />

            <View style={styles.totalsLine}>
              <Text style={{ ...styles.totalsLineLabel, fontFamily: 'Helvetica-Bold', color: SLATE }}>
                Subtotal (exc. VAT)
              </Text>
              <Text style={{ ...styles.totalsLineValue, fontFamily: 'Helvetica-Bold' }}>
                {formatCurrency(subtotalExVat)}
              </Text>
            </View>

            <View style={styles.totalsLine}>
              <Text style={styles.totalsLineLabel}>
                VAT ({Math.round(quotation.vat_rate * 100)}%)
              </Text>
              <Text style={styles.totalsLineValue}>{formatCurrency(quotation.vat_amount)}</Text>
            </View>

            <View style={styles.totalsDividerStrong} />

            <View style={styles.grandTotalLine}>
              <Text style={styles.grandTotalLabel}>Total (inc. VAT)</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(quotation.total_incl_vat)}</Text>
            </View>

            {quotation.deposit_percentage > 0 ? (
              <>
                <View style={styles.depositLine}>
                  <Text style={styles.depositLabel}>
                    Deposit required ({Math.round(quotation.deposit_percentage * 100)}%)
                  </Text>
                  <Text style={styles.depositValue}>{formatCurrency(quotation.deposit_amount)}</Text>
                </View>
                <View style={styles.balanceLine}>
                  <Text style={styles.balanceLabel}>Balance due on completion</Text>
                  <Text style={styles.balanceValue}>{formatCurrency(balanceDue)}</Text>
                </View>
              </>
            ) : null}

          </View>
        </View>

        {/* ── Terms & conditions ───────────────────────────────────────── */}
        <Text style={styles.termsHeading}>Terms &amp; Conditions</Text>
        <View style={styles.termsBox}>
          <Text style={styles.termsText}>{terms}</Text>
        </View>

        {/* ── Surveyor notes ───────────────────────────────────────────── */}
        {quotation.notes ? (
          <>
            <Text style={styles.termsHeading}>Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{quotation.notes}</Text>
            </View>
          </>
        ) : null}

        {/* ── Page footer ──────────────────────────────────────────────── */}
        <View style={styles.pageFooter} fixed>
          <Text style={styles.footerText}>{company.name}</Text>
          <Text style={styles.footerText}>{quotation.quotation_number}</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>

      </Page>
    </Document>
  )
}
