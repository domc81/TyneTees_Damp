// =============================================================================
// Report PDF Renderer — Professional customer-facing PDF generation
// Uses @react-pdf/renderer for server-side PDF generation
// Matches the style of existing survey report PDFs
// =============================================================================

import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type {
  SurveyReport,
  ReportSection,
  ReportSettings,
} from '@/types/survey-report.types'

// Register fonts for better typography
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica', fontWeight: 'normal' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
})

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: '40pt 50pt 60pt 50pt',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  // Header styles
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2pt solid #1a56db',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a56db',
    marginBottom: 4,
  },
  companyTagline: {
    fontSize: 10,
    color: '#6b7280',
  },
  // Page number footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#6b7280',
  },
  // Cover page styles
  coverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  coverSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  coverHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  coverText: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 4,
  },
  coverLabel: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 2,
  },
  // Section styles
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 10,
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 1.6,
  },
  // Badge styles
  badge: {
    display: 'inline-block',
    padding: '3pt 8pt',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 8,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 8,
  },
  // Photo grid
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
  },
  photoContainer: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    borderRadius: 4,
  },
  photoCaption: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  // Data table
  table: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  tableCellLabel: {
    flex: 1,
    fontSize: 9,
    color: '#6b7280',
  },
  tableCellValue: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
  },
  // List styles
  bulletList: {
    marginTop: 8,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 20,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#1f2937',
  },
  // Cost summary
  costSummary: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 4,
    borderLeft: '4pt solid #1a56db',
  },
  costLabel: {
    fontSize: 10,
    color: '#1e40af',
    marginBottom: 4,
  },
  costValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  // Signature
  signature: {
    marginTop: 24,
    paddingTop: 12,
    borderTop: '1pt solid #e5e7eb',
  },
  signatureText: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  // Sketch placeholder
  sketchPlaceholder: {
    padding: 40,
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 4,
  },
  sketchText: {
    fontSize: 10,
    color: '#9ca3af',
  },
})

// =============================================================================
// Main PDF Document Component
// =============================================================================

interface ReportPDFDocumentProps {
  report: SurveyReport
  settings: ReportSettings
  photoUrls: Record<string, string>
  surveyData?: any // Additional survey data (client, address, etc.)
}

export function ReportPDFDocument({
  report,
  settings,
  photoUrls,
  surveyData,
}: ReportPDFDocumentProps) {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <PageHeader settings={settings} />
        <CoverPage report={report} settings={settings} surveyData={surveyData} />
        <PageFooter pageNumber={1} totalPages={calculateTotalPages(report)} />
      </Page>

      {/* Content Pages */}
      {renderContentPages(report, settings, photoUrls)}
    </Document>
  )
}

// =============================================================================
// Page Components
// =============================================================================

function PageHeader({ settings }: { settings: ReportSettings }) {
  return (
    <View style={styles.header}>
      <Text style={styles.companyName}>
        {settings.company_name || 'TYNE TEES DAMP PROOFING LTD'}
      </Text>
      <Text style={styles.companyTagline}>Damp Proofing Specialists</Text>
    </View>
  )
}

function PageFooter({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  return (
    <View style={styles.footer}>
      <Text>Confidential Report</Text>
      <Text>
        Page {pageNumber} of {totalPages}
      </Text>
    </View>
  )
}

// =============================================================================
// Cover Page
// =============================================================================

function CoverPage({
  report,
  settings,
  surveyData,
}: {
  report: SurveyReport
  settings: ReportSettings
  surveyData?: any
}) {
  // Find cover section data
  const coverSection = report.sections.find((s) => s.key === 'cover')
  const coverData = coverSection?.data || {}

  return (
    <View>
      <Text style={styles.coverTitle}>{settings.title_prefix}</Text>
      <Text style={styles.coverSubtitle}>Survey Report</Text>

      {/* Client and Site Details */}
      <View style={styles.coverSection}>
        <Text style={styles.coverHeading}>Client Name And Site Details</Text>
        {coverData.client_name && (
          <View>
            <Text style={styles.coverLabel}>Client Name</Text>
            <Text style={styles.coverText}>{coverData.client_name as string}</Text>
          </View>
        )}
        {coverData.site_address && (
          <View>
            <Text style={styles.coverLabel}>Site Address</Text>
            <Text style={styles.coverText}>{coverData.site_address as string}</Text>
          </View>
        )}
        {coverData.site_city && (
          <Text style={styles.coverText}>
            {coverData.site_city as string}
            {coverData.site_county ? `, ${coverData.site_county}` : ''}
          </Text>
        )}
        {coverData.site_postcode && (
          <Text style={styles.coverText}>{coverData.site_postcode as string}</Text>
        )}
      </View>

      {/* Survey Details */}
      <View style={styles.coverSection}>
        <Text style={styles.coverHeading}>Survey Details</Text>
        {coverData.internal_reference && (
          <View>
            <Text style={styles.coverLabel}>Internal Reference</Text>
            <Text style={styles.coverText}>{coverData.internal_reference as string}</Text>
          </View>
        )}
        {coverData.inspection_date && (
          <View>
            <Text style={styles.coverLabel}>Inspection Date</Text>
            <Text style={styles.coverText}>
              {new Date(coverData.inspection_date as string).toLocaleDateString('en-GB')}
            </Text>
          </View>
        )}
        {coverData.weather_conditions && (
          <View>
            <Text style={styles.coverLabel}>Weather Conditions</Text>
            <Text style={styles.coverText}>
              {(coverData.weather_conditions as string).replace(/_/g, ' ').toUpperCase()}
              {coverData.temperature_c ? `, ${coverData.temperature_c}°C` : ''}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

// =============================================================================
// Content Rendering
// =============================================================================

function renderContentPages(
  report: SurveyReport,
  settings: ReportSettings,
  photoUrls: Record<string, string>
) {
  const pages: JSX.Element[] = []
  let currentPageNumber = 2 // Start from page 2 (page 1 is cover)
  const totalPages = calculateTotalPages(report)

  // Skip cover section (already rendered)
  const contentSections = report.sections.filter((s) => s.key !== 'cover')

  // Render each section
  for (const section of contentSections) {
    pages.push(
      <Page key={section.key} size="A4" style={styles.page}>
        <PageHeader settings={settings} />
        <SectionContent section={section} photoUrls={photoUrls} settings={settings} />
        <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
      </Page>
    )
    currentPageNumber++
  }

  return pages
}

// =============================================================================
// Section Content Renderer
// =============================================================================

function SectionContent({
  section,
  photoUrls,
  settings,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
  settings: ReportSettings
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {/* Render based on section type */}
      {section.type === 'property' && <PropertySection section={section} photoUrls={photoUrls} />}
      {section.type === 'data' && <DataSection section={section} />}
      {(section.type === 'findings' ||
        section.type === 'boilerplate' ||
        section.type === 'closing') && <TextSection section={section} photoUrls={photoUrls} />}
      {section.type === 'proposals' && <ProposalsSection section={section} />}
      {section.type === 'photos' && <PhotoSection section={section} photoUrls={photoUrls} />}
      {section.type === 'signature' && <SignatureSection section={section} settings={settings} />}
      {section.type === 'sketch' && <SketchSection section={section} photoUrls={photoUrls} />}
      {section.type === 'treatment' && <TextSection section={section} photoUrls={photoUrls} />}

      {/* Render sub-sections */}
      {section.sub_sections &&
        section.sub_sections.map((subSection) => (
          <View key={subSection.key}>
            <Text style={styles.subSectionTitle}>{subSection.title}</Text>
            <TextContent content={subSection.content} />
          </View>
        ))}
    </View>
  )
}

// Property section with photos
function PropertySection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  const data = section.data || {}

  return (
    <View>
      {/* Property details */}
      <View style={styles.table}>
        {data.property_type && (
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Property Type</Text>
            <Text style={styles.tableCellValue}>
              {(data.property_type as string).replace(/_/g, ' ').toUpperCase()}
            </Text>
          </View>
        )}
        {data.construction_type && (
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Construction</Text>
            <Text style={styles.tableCellValue}>
              {(data.construction_type as string).replace(/_/g, ' ').toUpperCase()}
            </Text>
          </View>
        )}
        {data.approx_build_year && (
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Approx. Build Year</Text>
            <Text style={styles.tableCellValue}>{data.approx_build_year as string}</Text>
          </View>
        )}
      </View>

      {/* Property photos */}
      {section.photos.length > 0 && (
        <View style={styles.photoGrid}>
          {section.photos.map((photoId) => {
            const url = photoUrls[photoId]
            if (!url) return null
            return (
              <View key={photoId} style={styles.photoContainer}>
                <Image src={url} style={styles.photo} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

// Data section with table
function DataSection({ section }: { section: ReportSection }) {
  const data = section.data || {}

  return (
    <View style={styles.table}>
      {Object.entries(data).map(([key, value]) => {
        if (value === null || value === undefined) return null
        return (
          <View key={key} style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>{key.replace(/_/g, ' ').toUpperCase()}</Text>
            <Text style={styles.tableCellValue}>{String(value)}</Text>
          </View>
        )
      })}
    </View>
  )
}

// Text section (findings, boilerplate, closing)
function TextSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  return (
    <View>
      <TextContent content={section.content} />

      {/* Photos below text */}
      {section.photos.length > 0 && (
        <View style={styles.photoGrid}>
          {section.photos.map((photoId) => {
            const url = photoUrls[photoId]
            if (!url) return null
            return (
              <View key={photoId} style={styles.photoContainer}>
                <Image src={url} style={styles.photo} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

// Text content with paragraph handling
function TextContent({ content }: { content: string }) {
  if (!content) {
    return <Text style={styles.paragraph}>Content not available.</Text>
  }

  // Don't render placeholder text as "Content not available"
  if (
    content === '[LLM content to be generated]' ||
    content === 'To be completed by surveyor during review.'
  ) {
    return <Text style={styles.paragraph}>{content}</Text>
  }

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <View>
      {paragraphs.map((para, idx) => {
        // Check if it's a bullet point (starts with - or •)
        if (para.startsWith('- ') || para.startsWith('• ')) {
          const items = para.split('\n').filter(Boolean)
          return (
            <View key={idx} style={styles.bulletList}>
              {items.map((item, itemIdx) => (
                <View key={itemIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item.replace(/^[•\-]\s*/, '')}</Text>
                </View>
              ))}
            </View>
          )
        }

        return (
          <Text key={idx} style={styles.paragraph}>
            {para}
          </Text>
        )
      })}
    </View>
  )
}

// Proposals section (schedule of works)
function ProposalsSection({ section }: { section: ReportSection }) {
  return (
    <View>
      <TextContent content={section.content} />

      {/* Cost summary if available */}
      {section.data.total_cost && (
        <View style={styles.costSummary}>
          <Text style={styles.costLabel}>Total Estimated Cost</Text>
          <Text style={styles.costValue}>
            £{(section.data.total_cost as number).toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  )
}

// Photo section (photo grid only)
function PhotoSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  return (
    <View style={styles.photoGrid}>
      {section.photos.map((photoId) => {
        const url = photoUrls[photoId]
        if (!url) return null
        return (
          <View key={photoId} style={styles.photoContainer}>
            <Image src={url} style={styles.photo} />
          </View>
        )
      })}
    </View>
  )
}

// Signature section
function SignatureSection({
  section,
  settings,
}: {
  section: ReportSection
  settings: ReportSettings
}) {
  const data = section.data || {}

  return (
    <View style={styles.signature}>
      <Text style={styles.signatureText}>
        Report produced under the guidance of {settings.company_name} by:
      </Text>
      {data.surveyor_name && (
        <Text style={styles.signatureName}>{data.surveyor_name as string}</Text>
      )}
      {data.surveyor_credentials && (
        <Text style={styles.signatureText}>{data.surveyor_credentials as string}</Text>
      )}
    </View>
  )
}

// Sketch section
function SketchSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  // Check if sketch photo exists
  if (section.photos.length > 0) {
    const sketchUrl = photoUrls[section.photos[0]]
    if (sketchUrl) {
      return <Image src={sketchUrl} style={{ width: '100%', maxHeight: 400 }} />
    }
  }

  // Placeholder if no sketch
  return (
    <View style={styles.sketchPlaceholder}>
      <Text style={styles.sketchText}>Sketch plan to be provided by surveyor</Text>
    </View>
  )
}

// =============================================================================
// Helpers
// =============================================================================

function calculateTotalPages(report: SurveyReport): number {
  // Cover page + content sections (rough estimate)
  // In practice, @react-pdf/renderer calculates this automatically
  return Math.max(1 + report.sections.length, 10)
}
