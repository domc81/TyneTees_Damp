// =============================================================================
// Public Report Page — /report/[reportId]?token=...
//
// PUBLIC — no authentication. Token in query string IS the credential.
// Server Component: fetches data directly from DB using service role key.
// Core content is server-rendered HTML. PhotoLightbox adds JS progressively.
// =============================================================================

import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import type { ReportSection } from '@/types/survey-report.types'
import { isSectionEmpty } from '@/components/report/utils'
import './report.css'

// Section components
import { ReportHeader } from '@/components/report/ReportHeader'
import { ReportFooter } from '@/components/report/ReportFooter'
import { CoverSection } from '@/components/report/CoverSection'
import { AboutUsSection } from '@/components/report/AboutUsSection'
import { SurveyContextSection } from '@/components/report/SurveyContextSection'
import { PropertySection } from '@/components/report/PropertySection'
import { ExecutiveSummarySection } from '@/components/report/ExecutiveSummarySection'
import { ExternalInspectionSection } from '@/components/report/ExternalInspectionSection'
import { TextSection } from '@/components/report/TextSection'
import { RoomFindingsSection } from '@/components/report/RoomFindingsSection'
import { ScopeOfWorksSection } from '@/components/report/ScopeOfWorksSection'
import { BoilerplateSection } from '@/components/report/BoilerplateSection'
import { SurveyorProfileSection } from '@/components/report/SurveyorProfileSection'
import { CondensationCausesSection } from '@/components/report/CondensationCausesSection'
import { TreatmentMethodologySection } from '@/components/report/TreatmentMethodologySection'
import { PhotoLightbox } from '@/components/report/PhotoLightbox'

// =============================================================================
// Company constant (mirrors API route)
// =============================================================================

const COMPANY = {
  name: 'Tyne Tees Damp Proofing Ltd',
  phone: '0191 XXX XXXX',
  email: 'info@tyneteesdampproofing.co.uk',
  website: 'www.tyneteesdampproofing.co.uk',
}

// =============================================================================
// Service-role Supabase client (bypasses RLS — safe because we validate
// the publish_token before returning any report data)
// =============================================================================

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase service role credentials not configured')
  }

  return createServerClient(url, serviceKey, {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  })
}

// =============================================================================
// Metadata
// =============================================================================

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { reportId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const token = typeof searchParams.token === 'string' ? searchParams.token : ''

  try {
    const supabase = createServiceClient()

    const { data: report } = await supabase
      .from('survey_reports')
      .select('survey_id, publish_token')
      .eq('id', params.reportId)
      .single()

    if (report?.publish_token === token && report.survey_id) {
      const { data: survey } = await supabase
        .from('surveys')
        .select('customer_id, survey_type')
        .eq('id', report.survey_id)
        .single()

      if (survey?.customer_id) {
        const { data: customer } = await supabase
          .from('customers')
          .select('first_name, last_name, title')
          .eq('id', survey.customer_id)
          .single()

        if (customer) {
          const name = [customer.title, customer.first_name, customer.last_name]
            .filter(Boolean)
            .join(' ')
          return {
            title: `Survey Report — ${name} | Tyne Tees Damp Proofing Ltd`,
            description:
              'Your damp proofing survey report from Tyne Tees Damp Proofing Ltd.',
            openGraph: {
              title: `Survey Report — ${name}`,
              description:
                'Your damp proofing survey report from Tyne Tees Damp Proofing Ltd.',
              type: 'website',
            },
            robots: { index: false, follow: false },
          }
        }
      }
    }
  } catch {
    // Fall through to default
  }

  return {
    title: 'Survey Report | Tyne Tees Damp Proofing Ltd',
    description: 'Damp proofing survey report from Tyne Tees Damp Proofing Ltd.',
    robots: { index: false, follow: false },
  }
}

// =============================================================================
// Photo URL resolution
// =============================================================================

function collectPhotoIds(sections: ReportSection[]): string[] {
  const ids: string[] = []

  function walk(secs: ReportSection[]) {
    for (const sec of secs) {
      if (sec.photos && sec.photos.length > 0) ids.push(...sec.photos)
      if (sec.sub_sections && sec.sub_sections.length > 0) walk(sec.sub_sections)
    }
  }

  walk(sections)
  return [...new Set(ids)]
}

function resolvePhotoUrls(
  supabase: ReturnType<typeof createServiceClient>,
  photoIds: string[],
  surveyData: Record<string, unknown> | null
): Record<string, string> {
  if (photoIds.length === 0) return {}

  // Photos live in survey_data.photos JSONB — not in the legacy photos table.
  const allPhotos = (surveyData?.photos as Array<{ id: string; storage_path?: string }>) ?? []
  const photoMap = new Map(allPhotos.map((p) => [p.id, p.storage_path]))

  const urls: Record<string, string> = {}

  for (const id of photoIds) {
    const storagePath = photoMap.get(id)
    if (!storagePath) continue
    const { data: urlData } = supabase.storage
      .from('survey-photos')
      .getPublicUrl(storagePath)
    if (urlData?.publicUrl) {
      urls[id] = urlData.publicUrl
    }
  }

  return urls
}

/** Build a photoId → description map from survey_data.photos metadata. */
function resolvePhotoCaptions(
  photoIds: string[],
  surveyData: Record<string, unknown> | null
): Record<string, string> {
  if (photoIds.length === 0) return {}

  const allPhotos =
    (surveyData?.photos as Array<{ id: string; description?: string }>) ?? []
  const captionMap = new Map(allPhotos.map((p) => [p.id, p.description]))

  const captions: Record<string, string> = {}
  for (const id of photoIds) {
    const caption = captionMap.get(id)
    if (caption) captions[id] = caption
  }
  return captions
}

// =============================================================================
// Error page — no auth, no data
// =============================================================================

function InvalidReportPage() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-6"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-[#1F2937] mb-2">
          Report Link Invalid
        </h1>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          This report link is invalid or has expired. Please contact Tyne Tees
          Damp Proofing Ltd for a new link.
        </p>
        <div className="mt-6 text-xs text-[#9CA3AF] space-y-0.5">
          <p>{COMPANY.phone}</p>
          <p>{COMPANY.email}</p>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Section renderer — key-driven (mirrors PDF renderer approach)
// =============================================================================

function renderSection(
  section: ReportSection,
  photoUrls: Record<string, string>,
  photoCaptions: Record<string, string>
) {
  if (isSectionEmpty(section)) return null

  switch (section.key) {
    case 'about_us':
      return <AboutUsSection key={section.key} section={section} />

    case 'survey_context':
      return <SurveyContextSection key={section.key} section={section} />

    case 'property':
      return (
        <PropertySection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
        />
      )

    case 'executive_summary':
      return <ExecutiveSummarySection key={section.key} section={section} />

    case 'external_inspection':
      return (
        <ExternalInspectionSection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
        />
      )

    case 'dpc_findings':
    case 'sub_floor_ventilation':
    case 'party_wall_notification':
      return (
        <TextSection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
        />
      )

    case 'room_findings':
      return (
        <RoomFindingsSection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
          photoCaptions={photoCaptions}
        />
      )

    case 'condensation_causes':
      return <CondensationCausesSection key={section.key} section={section} />

    case 'scope_of_works':
      return <ScopeOfWorksSection key={section.key} section={section} />

    case 'treatment_methodology':
      return <TreatmentMethodologySection key={section.key} section={section} />

    case 'ancillary_items':
    case 'extent_of_survey':
    case 'payment_terms':
      return <BoilerplateSection key={section.key} section={section} />

    case 'surveyor_profile':
      return <SurveyorProfileSection key={section.key} section={section} />

    case 'sketch_plan':
      if (section.photos.length === 0) return null
      return (
        <TextSection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
        />
      )

    default:
      return (
        <TextSection
          key={section.key}
          section={section}
          photoUrls={photoUrls}
        />
      )
  }
}

// =============================================================================
// Main Page
// =============================================================================

export default async function PublicReportPage({
  params,
  searchParams,
}: {
  params: { reportId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { reportId } = params
  const token = typeof searchParams.token === 'string' ? searchParams.token : ''

  if (!token) {
    return <InvalidReportPage />
  }

  let supabase: ReturnType<typeof createServiceClient>

  try {
    supabase = createServiceClient()
  } catch {
    return <InvalidReportPage />
  }

  // Load report + validate token
  const { data: report, error: reportError } = await supabase
    .from('survey_reports')
    .select(
      'id, survey_id, status, sections, generated_at, published_at, publish_token'
    )
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    return <InvalidReportPage />
  }

  if (!report.publish_token || report.publish_token !== token) {
    return <InvalidReportPage />
  }

  // Load survey (include survey_data for photo resolution)
  const { data: survey } = await supabase
    .from('surveys')
    .select('id, survey_type, customer_id, surveyor_id, survey_data')
    .eq('id', report.survey_id)
    .single()

  if (!survey) {
    return <InvalidReportPage />
  }

  // Load customer + surveyor in parallel
  const [customerResult, surveyorResult] = await Promise.all([
    survey.customer_id
      ? supabase
          .from('customers')
          .select(
            'first_name, last_name, title, address_line1, address_line2, city, county, postcode'
          )
          .eq('id', survey.customer_id)
          .single()
      : Promise.resolve({ data: null }),
    survey.surveyor_id
      ? supabase
          .from('surveyors')
          .select('full_name, qualifications')
          .eq('id', survey.surveyor_id)
          .single()
      : Promise.resolve({ data: null }),
  ])

  const customerData = customerResult.data
  const surveyorData = surveyorResult.data

  // Build names
  const customerName = customerData
    ? [customerData.title, customerData.first_name, customerData.last_name]
        .filter(Boolean)
        .join(' ')
    : ''

  // Suppress unused variable warning — surveyorData available if needed for extension
  void surveyorData

  // Resolve photos from survey_data.photos (not the legacy photos table)
  const sections = (report.sections || []) as ReportSection[]
  const photoIds = collectPhotoIds(sections)
  const surveyDataRecord = survey.survey_data as Record<string, unknown> | null
  const photoUrls = resolvePhotoUrls(supabase, photoIds, surveyDataRecord)
  const photoCaptions = resolvePhotoCaptions(photoIds, surveyDataRecord)

  // Split cover from body sections
  const coverSection = sections.find((s) => s.key === 'cover')
  const contentSections = sections.filter((s) => s.key !== 'cover')

  const surveyType = survey.survey_type || 'damp'

  return (
    <div
      className="min-h-screen bg-white text-[#1F2937]"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Sticky brand header */}
      <header className="report-header-bar">
        <ReportHeader company={COMPANY} />
      </header>

      {/* Cover section — full bleed with its own styling */}
      {coverSection && (
        <CoverSection
          section={coverSection}
          surveyType={surveyType}
          company={COMPANY}
        />
      )}

      {/* Content sections — constrained to 800px, centred */}
      <main>
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          {contentSections.map((section) =>
            renderSection(section, photoUrls, photoCaptions)
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="report-footer-bar">
        <ReportFooter
          customerName={customerName}
          company={COMPANY}
          reportId={report.id}
          generatedAt={report.generated_at ?? null}
        />
      </footer>

      {/* Client component — progressive enhancement for photo lightbox */}
      <PhotoLightbox />
    </div>
  )
}
