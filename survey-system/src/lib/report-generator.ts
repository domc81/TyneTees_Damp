// =============================================================================
// Report Generator — Direct, explicit section builder
// No templates, no condition engine, no field aliasing.
// Each section is built with clear field mappings.
// LLM used only for surveyor_comments summary.
// =============================================================================

import type {
  ReportTemplate,
  ReportSection,
  SurveyReport,
  ContentSource,
  ReportSectionType,
} from '@/types/survey-report.types'
import type {
  SurveyWizardData,
  SurveyRoomRow,
} from '@/types/survey-wizard.types'
import { BUILDING_DEFECTS } from '@/types/survey-wizard.types'
import { loadWizardData } from './survey-wizard-data'
import { loadSurveyPhotos } from './survey-photo-service'
import { getSupabase } from './supabase-client'

// =============================================================================
// Template Loading (kept — used for template_id on report record)
// =============================================================================

export async function loadDefaultTemplate(
  surveyType: string
): Promise<ReportTemplate | null> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('report_templates')
    .select('*')
    .eq('survey_type', surveyType)
    .eq('is_default', true)
    .single()

  if (error) {
    console.error(`Error loading template for ${surveyType}:`, error)
    return null
  }

  return data as ReportTemplate
}

// =============================================================================
// Boilerplate Constants
// =============================================================================

const ABOUT_US_TEXT = `Tyne Tees Damp Proofing Ltd is a specialist remedial contractor serving residential and commercial clients across the North East of England, including Tyneside, Wearside, Northumberland and County Durham. Our team has been working in the damp proofing industry since 1987.

We specialise in the diagnosis and treatment of rising damp, penetrating damp, condensation, timber decay (dry rot and wet rot), woodworm infestation and basement waterproofing. Our surveyors are trained to correctly differentiate between the causes of damp — ensuring accurate diagnosis and effective treatment first time.

Qualifications & Standards

Our surveyors hold the Certificated Surveyor in Remedial Treatments (CSRT) qualification and are Associate members of the Institute of Specialist Surveyors and Engineers (A.Inst.SSE). All survey and treatment works are carried out using only BBA-approved products and in accordance with current industry best practice.

Guarantees

We offer 25-year company and insurance-backed guarantees for damp proofing and timber treatment works above external ground level. All guarantees cover both materials and labour. Our membrane products carry a 25-year manufacturer's product guarantee. Insurance-backed guarantees are issued through the Westminster Protected Guarantee scheme, which operates independently of the contractor and does not rely on renewal premiums for continued cover — providing genuine long-term protection that is fully transferable to future property owners.

Our Track Record

We maintain a 100% success rate on all damp and timber treatments, with no guarantee claims to date.`

function buildSurveyContextText(reportedDefect: string): string {
  return `In accordance with your instructions, we carried out a specific defects inspection of the above property for the following reported problem:

Reported defect: ${reportedDefect || 'As instructed by client.'}

Orientation

The terms left, right, front and rear are used as viewed from the outside of the building, facing the front elevation.

Scope of Inspection

This inspection was limited to identifying evidence of the problems listed above within the areas indicated to us at the time of our visit. Any areas not referred to in this report were not inspected and are not covered by our findings or estimate.

Where treatment has been recommended, this is on the understanding that the specified area has not previously been treated under an existing guarantee, unless otherwise stated.

Abbreviations

DPC — Damp Proof Course · DPM — Damp Proof Membrane · USCC — Under Separate Contract and Costs · ACMs — Asbestos Containing Materials · W/W — Water Weight`
}

const ANCILLARY_TEXT = `Our estimate does not include the removal or replacement of floor coverings, furnishings, furniture, stored items in roof voids, or any other items that may obstruct the works.

Please arrange for rooms to be cleared of anything delicate or of value before our arrival on site. We are happy to roll back and loosely relay carpets where possible.

Any time spent clearing areas to enable work to proceed will be charged at our standard day rates and added to your final account, unless otherwise agreed in writing.`

const EXTENT_TEXT = `We have reported on the areas inspected in accordance with your instructions. If you believe any areas have been omitted or that we have misinterpreted your requirements, please contact us immediately.

Our findings relate to conditions evident at the time of inspection. We are not commenting on the general risk of dampness, fungal decay or any other defect not visible during our visit, or that may develop in the future.`

const PAYMENT_TEXT = `An initial payment of 30% of the contract value is required before works commence. This covers the cost of ordering materials specific to your project and securing a date in our installation schedule.

The remaining balance is due within 7 days of completion.`

// =============================================================================
// Helper Functions
// =============================================================================

function getDefectLabel(defectKey: string): string {
  const defect = BUILDING_DEFECTS.find((d) => d.value === defectKey)
  return defect?.label || defectKey.replace(/_/g, ' ')
}

function formatFloorLevel(floorLevel: string | undefined): string {
  if (!floorLevel) return 'Unknown Floor'

  const floorMap: Record<string, string> = {
    ground: 'Ground Floor',
    first: 'First Floor',
    second: 'Second Floor',
    third: 'Third Floor',
    basement: 'Basement',
    loft: 'Loft Space',
  }

  return floorMap[floorLevel.toLowerCase()] || floorLevel
}

function getTreatmentLabel(code: string | undefined): string {
  if (!code) return 'Treatment to be specified'
  const map: Record<string, string> = {
    membrane: 'Cavity drain membrane system',
    injection: 'Chemical DPC injection',
    tanking: 'Cementitious tanking system',
  }
  return map[code] || code.replace(/_/g, ' ')
}

// =============================================================================
// Section Builder Helper
// =============================================================================

function buildSection(
  key: string,
  title: string,
  type: ReportSectionType,
  contentSource: ContentSource,
  content: string,
  data: Record<string, unknown> = {},
  sectionPhotos: string[] = [],
  subSections?: ReportSection[]
): ReportSection {
  return {
    key,
    title,
    type,
    content,
    content_source: contentSource,
    is_edited: false,
    data,
    photos: sectionPhotos,
    sub_sections: subSections,
  }
}

// =============================================================================
// Main Report Generation — Direct Field Mapping
// =============================================================================

export async function generateReport(
  surveyId: string
): Promise<SurveyReport> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // 1. LOAD ALL DATA
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', surveyId)
    .single()

  if (surveyError || !survey) {
    throw new Error(`Failed to load survey: ${surveyError?.message}`)
  }

  const { wizardData, rooms } = await loadWizardData(surveyId)
  const sd = wizardData.site_details
  const ext = wizardData.external_inspection
  const aw = wizardData.additional_works

  let customer: any = null
  if (survey.customer_id) {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('id', survey.customer_id)
      .single()
    customer = data
  }

  let surveyor: any = null
  if (survey.surveyor_id) {
    const { data } = await supabase
      .from('surveyors')
      .select('*')
      .eq('id', survey.surveyor_id)
      .single()
    surveyor = data
  }

  // Fallback surveyor from wizard data
  if (!surveyor && sd?.surveyor_name) {
    surveyor = {
      first_name: sd.surveyor_name,
      last_name: '',
      qualifications: null,
      job_title: 'Surveyor',
    }
  }

  const photos = await loadSurveyPhotos(surveyId)

  // Filter rooms by issue type
  const dampRooms = rooms.filter((r) => r.issues_identified?.includes('damp'))
  const condensationRooms = rooms.filter((r) =>
    r.issues_identified?.includes('condensation')
  )
  const timberRooms = rooms.filter((r) =>
    r.issues_identified?.includes('timber_decay')
  )
  const woodwormRooms = rooms.filter((r) =>
    r.issues_identified?.includes('woodworm')
  )

  // Load template ID for report record
  const surveyType = survey.survey_type || 'damp'
  const template = await loadDefaultTemplate(surveyType)
  const templateId = template?.id || 'no-template'

  // 2. BUILD SECTIONS
  const sections: ReportSection[] = []

  // --- COVER ---
  sections.push(
    buildSection('cover', 'Survey Report', 'cover', 'survey_data', 'Cover page', {
      client_name: customer
        ? `${customer.first_name} ${customer.last_name}`
        : 'Client name not available',
      site_address: customer?.address_line1 || '',
      site_address_line2: customer?.address_line2 || '',
      site_city: customer?.city || '',
      site_county: customer?.county || '',
      site_postcode: customer?.postcode || '',
      inspection_date: sd?.inspection_date || '',
      weather_conditions: sd?.weather_conditions || '',
      temperature_c: sd?.temperature_c || '',
    })
  )

  // --- ABOUT US ---
  sections.push(
    buildSection(
      'about_us',
      'About Tyne Tees Damp Proofing Ltd',
      'boilerplate',
      'template',
      ABOUT_US_TEXT
    )
  )

  // --- THE SURVEY ---
  sections.push(
    buildSection(
      'survey_context',
      'The Survey',
      'boilerplate',
      'template',
      buildSurveyContextText(sd?.reported_defect || '')
    )
  )

  // --- THE PROPERTY ---
  const propertyPhotos = photos
    .filter(
      (p) =>
        p.category === 'site_details' ||
        p.category === 'street_view' ||
        p.category === 'property_front'
    )
    .map((p) => p.id)

  sections.push(
    buildSection(
      'property',
      'The Property',
      'property',
      'survey_data',
      'Property details',
      {
        property_type: sd?.property_type || '',
        construction_type: sd?.construction_type || '',
        approx_build_year: sd?.approx_build_year || '',
      },
      propertyPhotos
    )
  )

  // --- EXTERNAL INSPECTION ---
  const extSubSections: ReportSection[] = []
  let extContent = ''

  if (ext) {
    if (ext.building_defects_found && ext.building_defects?.length > 0) {
      const defectLabels = ext.building_defects.map((d) => getDefectLabel(d))
      extSubSections.push(
        buildSection(
          'building_defects',
          'Building Defects',
          'findings',
          'survey_data',
          `We noted the following building defects:\n\n${defectLabels.map((d) => ` - ${d}`).join('\n')}`
        )
      )
    } else {
      extContent =
        'No significant building defects were noted during our external inspection.'
    }

    if (ext.wall_tie_concern) {
      extSubSections.push(
        buildSection(
          'wall_ties',
          'Wall Ties',
          'findings',
          'survey_data',
          'Our surveyor noted lateral cracks within the render/mortar beds, this is often a sign of decayed wall ties. We would recommend a wall tie survey be carried out by a specialist contractor to determine whether remedial wall tie replacement is required.'
        )
      )
    }

    if (ext.cracking_concern) {
      extSubSections.push(
        buildSection(
          'cracking',
          'Cracking To Walls',
          'findings',
          'survey_data',
          'Our surveyor noted lateral/stepped cracks within the render/mortar beds, this is often a sign of movement within the structure of a building. We would recommend further investigation by a structural engineer to determine the cause and extent of any movement.'
        )
      )
    }

    const hasGroundIssues = (aw?.aco_drain_length || 0) > 0 || (aw?.french_drain_length || 0) > 0
    if (hasGroundIssues) {
      extSubSections.push(
        buildSection(
          'ground_levels',
          'External Ground Levels',
          'findings',
          'survey_data',
          'External ground levels were found to be at or above the level of the internal floor, which can contribute to damp ingress. We recommend the installation of drainage to reduce ground water levels adjacent to the property.'
        )
      )
    } else {
      extSubSections.push(
        buildSection(
          'ground_levels',
          'External Ground Levels',
          'findings',
          'survey_data',
          'There were no apparent ground level issues.'
        )
      )
    }
  }

  // If no external inspection data at all, set a default
  if (!extContent && extSubSections.length === 0) {
    extContent = 'External inspection details to be completed.'
  }
  // If we have sub-sections but no top-level content, set a pass-through
  if (!extContent && extSubSections.length > 0) {
    extContent = 'See findings below.'
  }

  const extPhotos = photos
    .filter(
      (p) =>
        p.category === 'external_inspection' ||
        p.category === 'building_defect'
    )
    .map((p) => p.id)

  sections.push(
    buildSection(
      'external_inspection',
      'External Inspection',
      'findings',
      'survey_data',
      extContent,
      {},
      extPhotos,
      extSubSections
    )
  )

  // --- DPC FINDINGS ---
  const hasDpcRequired = dampRooms.some(
    (r) => r.room_data?.damp?.dpc_required === true
  )
  let dpcContent = ''
  if (hasDpcRequired) {
    dpcContent =
      'Based on our inspection findings, we recommend the installation of a new chemical damp proof course to the affected areas. This will be carried out using BBA-approved DPC injection cream applied to the mortar course at a minimum of 150mm above external ground level.'
  } else if (dampRooms.length > 0) {
    dpcContent =
      'Our inspection did not identify a requirement for a new damp proof course at this time. The existing DPC appears to be functioning adequately.'
  }
  // If no damp rooms, dpcContent stays empty and section will be hidden by isSectionEmpty

  sections.push(
    buildSection(
      'dpc_findings',
      'Damp Proof Course',
      'findings',
      'survey_data',
      dpcContent
    )
  )

  // --- SUB FLOOR VENTILATION ---
  const totalAirbricks =
    (aw?.airbrick_clean_count || 0) +
    (aw?.airbrick_upgrade_count || 0) +
    (aw?.airbrick_new_count || 0)

  let ventContent = ''
  if (totalAirbricks > 0) {
    ventContent = `The sub floor voids were ventilated by ${totalAirbricks} airbrick(s). Additional airbricks may be required to ensure adequate ventilation to the sub floor void.`
  } else if (dampRooms.length > 0) {
    ventContent =
      'There were no airbricks installed. We recommend the installation of airbricks to provide adequate ventilation to the sub floor void, which will help to reduce the risk of timber decay and dampness.'
  }

  sections.push(
    buildSection(
      'sub_floor_ventilation',
      'Sub Floor Ventilation',
      'findings',
      'survey_data',
      ventContent
    )
  )

  // --- INTERNAL INSPECTION / ROOM FINDINGS ---
  const roomSubSections: ReportSection[] = []
  const llmContextParts: string[] = []

  for (const room of rooms) {
    if (!room.issues_identified || room.issues_identified.length === 0) continue

    const dampData = room.room_data?.damp as any
    const roomTitle = `${room.name} — ${formatFloorLevel(room.floor_level)}`

    // Use surveyor's observation text if available
    let roomContent = room.findings || ''
    if (!roomContent && dampData) {
      roomContent = `Inspection of this room identified ${room.issues_identified.join(', ')} issues requiring attention.`
    }
    if (!roomContent) {
      roomContent = `${room.issues_identified.join(', ')} issues identified.`
    }

    // Build wall table data (for damp rooms)
    const walls: any[] = []
    if (dampData?.walls && Array.isArray(dampData.walls)) {
      const treatmentCode = dampData.wall_treatment
      for (const wall of dampData.walls) {
        const length = wall.length || 0
        const height = wall.height || 0
        const area = length * height

        const wallEntry: any = {
          wall_position: wall.name || wall.wall_position || 'Wall',
          treatment_area_length: length.toString(),
          treatment_area_height: height.toString(),
          treatment_area_m2: area > 0 ? area.toFixed(1) : '0',
          treatment_type: getTreatmentLabel(treatmentCode),
        }

        // Handle moisture readings (array of MoistureReading objects)
        if (
          wall.moisture_readings &&
          Array.isArray(wall.moisture_readings) &&
          wall.moisture_readings.length > 0
        ) {
          const readings = wall.moisture_readings.map((r: any) =>
            typeof r === 'number' ? r : r.reading || 0
          )
          const maxReading = Math.max(...readings)
          if (maxReading > 0) {
            wallEntry.moisture_reading = `${maxReading}% W/W`
          }
        }

        walls.push(wallEntry)
      }
    }

    // Match photos to room
    const roomPhotos = photos
      .filter(
        (p) =>
          p.room_id === room.id ||
          p.category === 'room_inspection' ||
          p.category === 'damp_evidence'
      )
      .map((p) => p.id)

    roomSubSections.push(
      buildSection(
        `room_${room.id}`,
        roomTitle,
        'findings' as ReportSectionType,
        'survey_data',
        roomContent,
        {
          room_name: room.name,
          floor_level: formatFloorLevel(room.floor_level),
          issues: room.issues_identified,
          walls: walls,
        },
        roomPhotos
      )
    )

    // Build context for surveyor summary LLM call
    const contextLines = [
      `Room: ${room.name} (${formatFloorLevel(room.floor_level)})`,
      `Issues: ${room.issues_identified.join(', ')}`,
    ]
    if (room.findings) {
      contextLines.push(`Surveyor observation: ${room.findings}`)
    }
    if (walls.length > 0) {
      for (const w of walls) {
        contextLines.push(
          `- ${w.wall_position}: ${w.treatment_area_length}m × ${w.treatment_area_height}m (${w.treatment_area_m2}m²), Treatment: ${w.treatment_type}`
        )
      }
    }
    llmContextParts.push(contextLines.join('\n'))
  }

  // The non-destructive note is hardcoded in the PDF renderer,
  // but we need non-empty content to pass the isSectionEmpty filter
  const roomFindingsContent =
    roomSubSections.length > 0
      ? 'Note: This was a non-destructive inspection. All findings are based on visual assessment, electronic moisture meter readings, digital laser thermometer readings and tactile examination of accessible surfaces.'
      : ''

  sections.push(
    buildSection(
      'room_findings',
      'Internal Inspection',
      'findings',
      'survey_data',
      roomFindingsContent,
      {},
      [],
      roomSubSections
    )
  )

  // --- SUMMARY OF PROPOSED WORKS ---
  const worksSummary: any[] = []
  for (const room of rooms) {
    if (!room.issues_identified?.includes('damp')) continue
    const dampData = room.room_data?.damp as any
    if (!dampData?.walls) continue

    const treatmentCode = dampData.wall_treatment
    let totalArea = 0
    for (const wall of dampData.walls) {
      totalArea += (wall.length || 0) * (wall.height || 0)
    }

    worksSummary.push({
      room_name: room.name,
      floor_level: formatFloorLevel(room.floor_level),
      issue: 'Rising damp',
      treatment: getTreatmentLabel(treatmentCode),
      total_area: `${totalArea.toFixed(1)}m²`,
    })

    if (room.issues_identified?.includes('condensation')) {
      worksSummary.push({
        room_name: room.name,
        floor_level: formatFloorLevel(room.floor_level),
        issue: 'Condensation',
        treatment: 'Ventilation improvement',
        total_area: '—',
      })
    }
  }

  const additionalWorks: string[] = []
  if (aw?.piv_count && aw.piv_count > 0) {
    additionalWorks.push(
      `Installation of ${aw.piv_count} PIV unit(s) for ventilation`
    )
  }
  if (totalAirbricks > 0) {
    additionalWorks.push(`Installation of ${totalAirbricks} airbrick(s)`)
  }
  if (dampRooms.length > 0) {
    additionalWorks.push('Multi-finish plaster skim to treated walls')
    additionalWorks.push('Disposal of waste materials')
  }

  sections.push(
    buildSection(
      'summary_of_works',
      'Summary of Proposed Works',
      'data',
      'survey_data',
      'Based on our inspection, we propose the following remedial works:',
      {
        rooms: worksSummary,
        additional_works: additionalWorks,
      }
    )
  )

  // --- SURVEYOR COMMENTS (LLM generated) ---
  let surveyorComments = ''
  if (llmContextParts.length > 0) {
    const llmContext = [
      `Property: ${sd?.property_type || 'Unknown'}, ${sd?.construction_type?.replace(/_/g, ' ') || 'Unknown construction'}, built ${sd?.approx_build_year || 'unknown year'}.`,
      `Total rooms inspected: ${rooms.filter((r) => r.issues_identified?.length).length}`,
      `Total affected rooms: ${dampRooms.length} with damp, ${condensationRooms.length} with condensation, ${timberRooms.length} with timber decay, ${woodwormRooms.length} with woodworm.`,
      '',
      'Room-by-room findings:',
      ...llmContextParts,
      '',
      ext?.building_defects_found
        ? `External defects: ${ext.building_defects.map((d) => getDefectLabel(d)).join(', ')}`
        : 'No external defects noted.',
      ext?.wall_tie_concern ? 'Wall tie concern identified.' : '',
      ext?.cracking_concern ? 'Structural cracking concern identified.' : '',
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${siteUrl}/api/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId,
          sections: [
            {
              key: 'surveyor_comments',
              prompt:
                'Write 2-3 paragraphs summarising the overall survey findings. Reference specific rooms, measurements and treatments by name. State the most urgent priorities. State what treatment works have been specified — do NOT suggest the customer consider options. Be specific and authoritative.',
              context: llmContext,
            },
          ],
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const generated = result.sections as Array<{
          key: string
          content: string
          error?: string
        }>
        const match = generated?.find((s) => s.key === 'surveyor_comments')
        if (match && !match.error) {
          surveyorComments = match.content
        }
      }
    } catch (err) {
      console.error('LLM call failed for surveyor comments:', err)
    }
  }

  if (!surveyorComments) {
    surveyorComments = 'Surveyor comments to be added during review.'
  }

  sections.push(
    buildSection(
      'surveyor_comments',
      'Surveyor Comments',
      'findings',
      'llm_generated',
      surveyorComments
    )
  )

  // --- CLOSING SECTIONS ---
  sections.push(
    buildSection(
      'ancillary_items',
      'Ancillary Items',
      'boilerplate',
      'template',
      ANCILLARY_TEXT
    )
  )

  sections.push(
    buildSection(
      'extent_of_survey',
      'Extent of Survey',
      'boilerplate',
      'template',
      EXTENT_TEXT
    )
  )

  sections.push(
    buildSection(
      'payment_terms',
      'Payment Terms',
      'boilerplate',
      'template',
      PAYMENT_TEXT
    )
  )

  // --- SURVEYOR PROFILE ---
  const surveyorName = surveyor
    ? `${surveyor.first_name} ${surveyor.last_name}`
    : 'Surveyor details to be confirmed'

  sections.push(
    buildSection(
      'surveyor_profile',
      'Your Surveyor',
      'signature',
      'survey_data',
      surveyorName,
      {
        surveyor_name: surveyorName,
        surveyor_title: surveyor?.job_title || '',
        surveyor_credentials: surveyor?.qualifications || '',
      }
    )
  )

  // --- SKETCH PLAN ---
  const sketchPhotos = photos
    .filter((p) => p.category === 'sketch_plan')
    .map((p) => p.id)

  sections.push(
    buildSection(
      'sketch_plan',
      'Sketch Plan',
      'sketch',
      'surveyor_input',
      sketchPhotos.length === 0
        ? 'Sketch plan to be provided by surveyor'
        : 'Sketch plan attached.',
      {},
      sketchPhotos
    )
  )

  // 3. SAVE REPORT TO DATABASE
  const reportId = crypto.randomUUID()
  const report: SurveyReport = {
    id: reportId,
    survey_id: surveyId,
    template_id: templateId,
    status: 'generated',
    sections,
    generated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { error: insertError } = await supabase
    .from('survey_reports')
    .insert({
      id: report.id,
      survey_id: report.survey_id,
      template_id: report.template_id,
      status: report.status,
      sections: report.sections as any,
      generated_at: report.generated_at,
      created_at: report.created_at,
      updated_at: report.updated_at,
    })

  if (insertError) {
    throw new Error(`Failed to save report: ${insertError.message}`)
  }

  return report
}

// =============================================================================
// Regenerate Section — Re-runs LLM for surveyor_comments
// =============================================================================

export async function regenerateSection(
  reportId: string,
  sectionKey: string
): Promise<ReportSection> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Load report
  const { data: report, error: reportError } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    throw new Error(`Failed to load report: ${reportError?.message}`)
  }

  // Find current section in the report
  const currentSection = (report.sections as ReportSection[]).find(
    (s) => s.key === sectionKey
  )
  if (!currentSection) {
    throw new Error(`Section not found: ${sectionKey}`)
  }

  // Only surveyor_comments supports LLM regeneration
  if (sectionKey !== 'surveyor_comments') {
    return currentSection
  }

  // Load survey data for context
  const { wizardData, rooms } = await loadWizardData(report.survey_id)
  const sd = wizardData.site_details
  const ext = wizardData.external_inspection

  const dampRooms = rooms.filter((r) => r.issues_identified?.includes('damp'))
  const condensationRooms = rooms.filter((r) =>
    r.issues_identified?.includes('condensation')
  )
  const timberRooms = rooms.filter((r) =>
    r.issues_identified?.includes('timber_decay')
  )
  const woodwormRooms = rooms.filter((r) =>
    r.issues_identified?.includes('woodworm')
  )

  // Build LLM context
  const llmContextParts: string[] = []
  for (const room of rooms) {
    if (!room.issues_identified || room.issues_identified.length === 0) continue

    const dampData = room.room_data?.damp as any
    const lines = [
      `Room: ${room.name} (${formatFloorLevel(room.floor_level)})`,
      `Issues: ${room.issues_identified.join(', ')}`,
    ]
    if (room.findings) {
      lines.push(`Surveyor observation: ${room.findings}`)
    }
    if (dampData?.walls && Array.isArray(dampData.walls)) {
      const treatmentCode = dampData.wall_treatment
      for (const wall of dampData.walls) {
        const length = wall.length || 0
        const height = wall.height || 0
        const area = length * height
        lines.push(
          `- ${wall.name || 'Wall'}: ${length}m × ${height}m (${area.toFixed(1)}m²), Treatment: ${getTreatmentLabel(treatmentCode)}`
        )
      }
    }
    llmContextParts.push(lines.join('\n'))
  }

  const llmContext = [
    `Property: ${sd?.property_type || 'Unknown'}, ${sd?.construction_type?.replace(/_/g, ' ') || 'Unknown construction'}, built ${sd?.approx_build_year || 'unknown year'}.`,
    `Total affected rooms: ${dampRooms.length} with damp, ${condensationRooms.length} with condensation, ${timberRooms.length} with timber decay, ${woodwormRooms.length} with woodworm.`,
    '',
    'Room-by-room findings:',
    ...llmContextParts,
    '',
    ext?.building_defects_found
      ? `External defects: ${ext.building_defects.map((d) => getDefectLabel(d)).join(', ')}`
      : 'No external defects noted.',
    ext?.wall_tie_concern ? 'Wall tie concern identified.' : '',
    ext?.cracking_concern ? 'Structural cracking concern identified.' : '',
  ]
    .filter(Boolean)
    .join('\n')

  let newContent = 'Surveyor comments to be added during review.'

  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${siteUrl}/api/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: report.survey_id,
        sections: [
          {
            key: 'surveyor_comments',
            prompt:
              'Write 2-3 paragraphs summarising the overall survey findings. Reference specific rooms, measurements and treatments by name. State the most urgent priorities. State what treatment works have been specified — do NOT suggest the customer consider options. Be specific and authoritative.',
            context: llmContext,
          },
        ],
      }),
    })

    if (response.ok) {
      const result = await response.json()
      const generated = result.sections as Array<{
        key: string
        content: string
        error?: string
      }>
      const match = generated?.find((s) => s.key === 'surveyor_comments')
      if (match && !match.error) {
        newContent = match.content
      }
    }
  } catch (err) {
    console.error('Error regenerating surveyor comments:', err)
  }

  // Build updated section
  const newSection: ReportSection = {
    ...currentSection,
    content: newContent,
    is_edited: false,
  }

  // Update report in database
  const updatedSections = (report.sections as ReportSection[]).map((s) =>
    s.key === sectionKey ? newSection : s
  )

  await supabase
    .from('survey_reports')
    .update({
      sections: updatedSections as any,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)

  return newSection
}
