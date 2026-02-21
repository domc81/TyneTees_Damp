// =============================================================================
// Report PDF Renderer — Professional customer-facing PDF generation
// Uses @react-pdf/renderer for server-side PDF generation
// Matches the redesigned damp report structure (v2)
// Section rendering driven by section.key for precise layout control
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
    marginTop: 40,
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
    textTransform: 'uppercase',
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
    marginTop: 0,
    marginBottom: 12,
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
  paragraphSmall: {
    fontSize: 9,
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 1.5,
  },
  paragraphItalic: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 1.5,
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
  // Data table (property details)
  propertyTable: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  propertyTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  propertyTableRowLast: {
    flexDirection: 'row',
    padding: 8,
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
    color: '#1f2937',
  },
  // Treatment table (room findings)
  treatmentTable: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    padding: 6,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    padding: 6,
  },
  tableRowLast: {
    flexDirection: 'row',
    padding: 6,
  },
  tableCell: {
    fontSize: 9,
    color: '#1f2937',
  },
  tableCellBold: {
    fontSize: 9,
    color: '#1f2937',
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
  // Surveyor profile
  surveyorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  surveyorIntro: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  surveyorPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    objectFit: 'cover',
  },
  surveyorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  surveyorTitle: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  surveyorCredentials: {
    fontSize: 10,
    color: '#1f2937',
    marginBottom: 8,
  },
  surveyorExperience: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 400,
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
  sketchImage: {
    width: '100%',
    maxHeight: 500,
    objectFit: 'contain',
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
          <Text style={styles.coverText}>{coverData.client_name as string}</Text>
        )}
        {coverData.site_address && (
          <Text style={styles.coverText}>{coverData.site_address as string}</Text>
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
// Content Rendering — Section-key-driven layout
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

  // Filter out empty sections
  const nonEmptySections = contentSections.filter((section) => !isSectionEmpty(section))

  // Define which sections get their own page vs which flow together
  const newPageBefore = [
    'property',
    'external_inspection',
    'room_findings',
    'summary_of_works',
    'surveyor_profile',
    'sketch_plan',
  ]

  // Group closing sections to flow together
  const closingSections = ['ancillary_items', 'extent_of_survey', 'payment_terms']

  let currentPageSections: typeof nonEmptySections = []
  let inClosingGroup = false

  for (let i = 0; i < nonEmptySections.length; i++) {
    const section = nonEmptySections[i]
    const needsNewPage = newPageBefore.includes(section.key)
    const isClosingSection = closingSections.includes(section.key)

    // Check if entering closing group
    if (isClosingSection && !inClosingGroup) {
      // Render accumulated sections first
      if (currentPageSections.length > 0) {
        pages.push(
          <Page key={`page-${currentPageNumber}`} size="A4" style={styles.page}>
            <PageHeader settings={settings} />
            {currentPageSections.map((s) => (
              <SectionContent key={s.key} section={s} photoUrls={photoUrls} settings={settings} />
            ))}
            <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
          </Page>
        )
        currentPageNumber++
        currentPageSections = []
      }
      inClosingGroup = true
    }

    // Handle closing sections group
    if (inClosingGroup && isClosingSection) {
      currentPageSections.push(section)
      // If last closing section, render the page
      if (section.key === 'payment_terms' || i === nonEmptySections.length - 1) {
        pages.push(
          <Page key={`page-${currentPageNumber}`} size="A4" style={styles.page}>
            <PageHeader settings={settings} />
            {currentPageSections.map((s) => (
              <SectionContent key={s.key} section={s} photoUrls={photoUrls} settings={settings} />
            ))}
            <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
          </Page>
        )
        currentPageNumber++
        currentPageSections = []
        inClosingGroup = false
      }
      continue
    }

    // Handle sections that need new pages
    if (needsNewPage) {
      // Render accumulated sections first
      if (currentPageSections.length > 0) {
        pages.push(
          <Page key={`page-${currentPageNumber}`} size="A4" style={styles.page}>
            <PageHeader settings={settings} />
            {currentPageSections.map((s) => (
              <SectionContent key={s.key} section={s} photoUrls={photoUrls} settings={settings} />
            ))}
            <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
          </Page>
        )
        currentPageNumber++
        currentPageSections = []
      }

      // Render this section on its own page
      pages.push(
        <Page key={section.key} size="A4" style={styles.page}>
          <PageHeader settings={settings} />
          <SectionContent section={section} photoUrls={photoUrls} settings={settings} />
          <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
        </Page>
      )
      currentPageNumber++
    } else {
      // Accumulate sections that flow together
      currentPageSections.push(section)
    }
  }

  // Render any remaining sections
  if (currentPageSections.length > 0) {
    pages.push(
      <Page key={`page-${currentPageNumber}`} size="A4" style={styles.page}>
        <PageHeader settings={settings} />
        {currentPageSections.map((s) => (
          <SectionContent key={s.key} section={s} photoUrls={photoUrls} settings={settings} />
        ))}
        <PageFooter pageNumber={currentPageNumber} totalPages={totalPages} />
      </Page>
    )
  }

  return pages
}

// =============================================================================
// Section Content Renderer — Key-driven rendering
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
  // Render based on section key (not type)
  switch (section.key) {
    case 'about_us':
      return <AboutUsSection section={section} />
    case 'survey_context':
      return <SurveyContextSection section={section} />
    case 'property':
      return <PropertySection section={section} photoUrls={photoUrls} />
    case 'external_inspection':
      return <ExternalInspectionSection section={section} photoUrls={photoUrls} />
    case 'dpc_findings':
    case 'sub_floor_ventilation':
    case 'surveyor_comments':
      return <TextSection section={section} photoUrls={photoUrls} />
    case 'room_findings':
      return <RoomFindingsSection section={section} photoUrls={photoUrls} />
    case 'summary_of_works':
      return <SummaryOfWorksSection section={section} />
    case 'ancillary_items':
    case 'extent_of_survey':
    case 'payment_terms':
      return <BoilerplateSection section={section} />
    case 'surveyor_profile':
      return <SurveyorProfileSection section={section} photoUrls={photoUrls} settings={settings} />
    case 'sketch_plan':
      return <SketchSection section={section} photoUrls={photoUrls} />
    default:
      return <TextSection section={section} photoUrls={photoUrls} />
  }
}

// =============================================================================
// Section-Specific Renderers
// =============================================================================

// About Us — detect sub-headings in text
function AboutUsSection({ section }: { section: ReportSection }) {
  const subHeadingKeywords = ['Qualifications & Standards', 'Guarantees', 'Our Track Record']

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {renderTextWithSubHeadings(section.content, subHeadingKeywords)}
    </View>
  )
}

// Survey Context — detect sub-headings
function SurveyContextSection({ section }: { section: ReportSection }) {
  const subHeadingKeywords = ['Orientation', 'Scope of Inspection', 'Abbreviations']

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {renderTextWithSubHeadings(section.content, subHeadingKeywords, true)}
    </View>
  )
}

// Property section with table and photos
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
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {/* Property details table */}
      <View style={styles.propertyTable}>
        {data.property_type && (
          <View style={data.construction_type || data.approx_build_year ? styles.propertyTableRow : styles.propertyTableRowLast}>
            <Text style={styles.tableCellLabel}>Property Type</Text>
            <Text style={styles.tableCellValue}>
              {(data.property_type as string).replace(/_/g, ' ').toUpperCase()}
            </Text>
          </View>
        )}
        {data.construction_type && (
          <View style={data.approx_build_year ? styles.propertyTableRow : styles.propertyTableRowLast}>
            <Text style={styles.tableCellLabel}>Construction</Text>
            <Text style={styles.tableCellValue}>
              {(data.construction_type as string).replace(/_/g, ' ').toUpperCase()}
            </Text>
          </View>
        )}
        {data.approx_build_year && (
          <View style={styles.propertyTableRowLast}>
            <Text style={styles.tableCellLabel}>Approx. Build Year</Text>
            <Text style={styles.tableCellValue}>{data.approx_build_year as string}</Text>
          </View>
        )}
      </View>

      {/* Property photo - single large centered street view */}
      {section.photos.length > 0 && (
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          {(() => {
            const url = photoUrls[section.photos[0]]
            if (!url) return null
            return (
              <Image
                src={url}
                style={{
                  width: 350,
                  height: 250,
                  objectFit: 'cover',
                }}
              />
            )
          })()}
        </View>
      )}
    </View>
  )
}

// External Inspection with sub-sections
function ExternalInspectionSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <TextContent content={section.content} />

      {/* Photos */}
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

      {/* Sub-sections */}
      {section.sub_sections &&
        section.sub_sections
          .filter((sub) => !isSectionEmpty(sub))
          .map((subSection) => (
            <View key={subSection.key}>
              <Text style={styles.subSectionTitle}>{subSection.title}</Text>
              <TextContent content={subSection.content} />
            </View>
          ))}
    </View>
  )
}

// Room Findings — per-room narrative + table
function RoomFindingsSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {/* Inspection note */}
      <Text style={styles.paragraphItalic}>
        Note: This was a non-destructive inspection. All findings are based on visual assessment,
        electronic moisture meter readings, digital laser thermometer readings and tactile
        examination of accessible surfaces. No opening up works were carried out.
      </Text>

      {/* Room sub-sections */}
      {section.sub_sections &&
        section.sub_sections
          .filter((sub) => !isSectionEmpty(sub))
          .map((roomSection) => (
            <View key={roomSection.key} style={{ marginTop: 16 }}>
              <Text style={styles.subSectionTitle}>{roomSection.title}</Text>

              {/* LLM narrative */}
              <TextContent content={roomSection.content} />

              {/* Affected areas table */}
              {roomSection.data.walls && Array.isArray(roomSection.data.walls) && roomSection.data.walls.length > 0 && (
                <View style={styles.treatmentTable}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Wall</Text>
                    <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Treatment Area</Text>
                    <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Treatment Type</Text>
                    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Moisture Reading</Text>
                  </View>
                  {(roomSection.data.walls as any[]).map((wall, idx) => (
                    <View
                      key={idx}
                      style={idx === (roomSection.data.walls as any[]).length - 1 ? styles.tableRowLast : styles.tableRow}
                    >
                      <Text style={[styles.tableCell, { flex: 1 }]}>{wall.wall_position}</Text>
                      <Text style={[styles.tableCell, { flex: 1.5 }]}>
                        {wall.treatment_area_length}m × {wall.treatment_area_height}m ({wall.treatment_area_m2}m²)
                      </Text>
                      <Text style={[styles.tableCellBold, { flex: 1.5 }]}>{wall.treatment_type}</Text>
                      <Text style={[styles.tableCell, { flex: 1 }]}>
                        {wall.moisture_reading || '—'}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Room photos */}
              {roomSection.photos.length > 0 && (
                <View style={styles.photoGrid}>
                  {roomSection.photos.map((photoId) => {
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
          ))}
    </View>
  )
}

// Summary of Proposed Works — table format
function SummaryOfWorksSection({ section }: { section: ReportSection }) {
  const data = section.data || {}
  const rooms = data.rooms as any[] || []
  const additionalWorks = data.additional_works as any[] || []

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.paragraph}>
        Based on our inspection, we propose the following remedial works:
      </Text>

      {/* Rooms summary table */}
      {rooms.length > 0 && (
        <View style={styles.treatmentTable}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Room</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Issue</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Proposed Treatment</Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Area</Text>
          </View>
          {rooms.map((room, idx) => (
            <View
              key={idx}
              style={idx === rooms.length - 1 && additionalWorks.length === 0 ? styles.tableRowLast : styles.tableRow}
            >
              <Text style={[styles.tableCell, { flex: 1 }]}>{room.room_name}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{room.issue}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{room.treatment}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{room.total_area}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Additional works */}
      {additionalWorks.length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={styles.subSectionTitle}>Additional Works</Text>
          <View style={styles.bulletList}>
            {additionalWorks.map((work, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{work.description || work}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

// Boilerplate sections (ancillary items, extent, payment)
function BoilerplateSection({ section }: { section: ReportSection }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <TextContent content={section.content} />
    </View>
  )
}

// Text section with photos
function TextSection({
  section,
  photoUrls,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
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

// Surveyor profile with photo
function SurveyorProfileSection({
  section,
  photoUrls,
  settings,
}: {
  section: ReportSection
  photoUrls: Record<string, string>
  settings: ReportSettings
}) {
  const data = section.data || {}
  const surveyorPhotoId = section.photos[0]
  const surveyorPhotoUrl = surveyorPhotoId ? photoUrls[surveyorPhotoId] : null

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.surveyorContainer}>
        <Text style={styles.surveyorIntro}>
          Report produced under the guidance of {settings.company_name} by:
        </Text>

        {/* Surveyor photo */}
        {surveyorPhotoUrl && (
          <Image src={surveyorPhotoUrl} style={styles.surveyorPhoto} />
        )}

        {/* Surveyor details */}
        <Text style={styles.surveyorName}>
          {(data.surveyor_name as string) || 'Surveyor name to be confirmed'}
        </Text>
        {data.surveyor_title && (
          <Text style={styles.surveyorTitle}>{data.surveyor_title as string}</Text>
        )}
        {data.surveyor_credentials && (
          <Text style={styles.surveyorCredentials}>{data.surveyor_credentials as string}</Text>
        )}
        {data.surveyor_experience && (
          <Text style={styles.surveyorExperience}>{data.surveyor_experience as string}</Text>
        )}
      </View>
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
  const sketchPhotoId = section.photos[0]
  const sketchUrl = sketchPhotoId ? photoUrls[sketchPhotoId] : null

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {sketchUrl ? (
        <Image src={sketchUrl} style={styles.sketchImage} />
      ) : (
        <View style={styles.sketchPlaceholder}>
          <Text style={styles.sketchText}>Sketch plan to be provided by surveyor</Text>
        </View>
      )}
    </View>
  )
}

// =============================================================================
// Text Rendering Helpers
// =============================================================================

// Render text with sub-heading detection
function renderTextWithSubHeadings(
  content: string,
  subHeadingKeywords: string[],
  hasAbbreviations: boolean = false
) {
  if (!content) return null

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <View>
      {paragraphs.map((para, idx) => {
        // Check if this paragraph is a sub-heading
        const isSubHeading = subHeadingKeywords.some((keyword) =>
          para.trim().startsWith(keyword)
        )

        if (isSubHeading) {
          return (
            <Text key={idx} style={styles.subSectionTitle}>
              {para.trim()}
            </Text>
          )
        }

        // Check if this is the abbreviations paragraph (contains ·)
        if (hasAbbreviations && para.includes('·')) {
          return (
            <Text key={idx} style={styles.paragraphSmall}>
              {para}
            </Text>
          )
        }

        // Check for bullet points
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

// Standard text content rendering
function TextContent({ content }: { content: string }) {
  if (!content) return null

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <View>
      {paragraphs.map((para, idx) => {
        // Check for bullet points
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

// =============================================================================
// Helpers
// =============================================================================

function isSectionEmpty(section: ReportSection): boolean {
  if (!section.content || section.content.trim() === '') {
    return true
  }

  const placeholderTexts = [
    'Content not available.',
    'To be completed by surveyor during review.',
    '[LLM content to be generated]',
  ]

  return placeholderTexts.includes(section.content.trim())
}

function calculateTotalPages(report: SurveyReport): number {
  // Rough estimate: cover + content sections
  // In practice, @react-pdf/renderer calculates this automatically
  return Math.max(1 + report.sections.length, 10)
}
