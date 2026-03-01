// =============================================================================
// Report Generator — Direct, explicit section builder
// No templates, no condition engine, no field aliasing.
// Each section is built with clear field mappings.
// LLM used only for executive_summary.
// =============================================================================

import type {
  ReportTemplate,
  ReportSection,
  SurveyReport,
  ContentSource,
  ReportSectionType,
} from '@/types/survey-report.types'
import type { Customer, Surveyor } from '@/types/database.types'
import { BUILDING_DEFECTS } from '@/types/survey-wizard.types'
import type {
  CondensationRoomData,
  TimberRoomData,
  WoodwormRoomData,
} from '@/types/survey-wizard.types'
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

const GUARANTEE_PARAGRAPH =
  'All treatment works carried out by Tyne Tees Damp Proofing Ltd are covered by our 25-year insurance-backed guarantee, issued through the Westminster Protected Guarantee scheme. This guarantee covers both materials and labour, operates independently of the contractor, and is fully transferable to future property owners — providing genuine long-term protection for your investment.'

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

function formatFlooringType(code: string | undefined): string {
  if (!code) return 'timber'
  const map: Record<string, string> = {
    tongue_and_groove: 'tongue and groove',
    square_edge: 'square edge',
    chipboard: 'chipboard',
    plywood: 'plywood',
    other: 'timber',
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

  let customer: Customer | null = null
  if (survey.customer_id) {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('id', survey.customer_id)
      .single()
    customer = data as Customer | null
  }

  let surveyor: Surveyor | null = null
  if (survey.surveyor_id) {
    const { data } = await supabase
      .from('surveyors')
      .select('*')
      .eq('id', survey.surveyor_id)
      .single()
    surveyor = data as Surveyor | null
  }

  // Fallback surveyor name from wizard data (when no DB surveyor record exists)
  const sdAny = sd as any
  const fallbackSurveyorName: string | null =
    !surveyor && sdAny?.surveyor_name ? (sdAny.surveyor_name as string) : null

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

  // 2. RUN ROOMS LOOP EARLY — builds roomSubSections + llmContextParts
  //    Must run before section pushing so executive_summary LLM call has context.
  const roomSubSections: ReportSection[] = []
  const llmContextParts: string[] = []
  // Track assigned photo IDs so each photo appears in at most one room section.
  // Recovered photos have room_id = null, so they fall back to step-based matching.
  const assignedPhotoIds = new Set<string>()

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

    // a. DAMP: Build wall table data
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

    // Build the room data object — includes all issue types present in the room
    const roomData: Record<string, unknown> = {
      room_name: room.name,
      floor_level: formatFloorLevel(room.floor_level),
      issues: room.issues_identified,
      walls: walls,
      rh_reading: (room.room_data as any)?.rh_reading ?? null,
    }

    if (dampData && walls.length > 0) {
      roomData.treatment_type = getTreatmentLabel(dampData.wall_treatment)
    }

    // b. CONDENSATION data
    if (room.issues_identified.includes('condensation')) {
      const condData = room.room_data?.condensation as CondensationRoomData | undefined
      roomData.condensation = {
        condensation_on_windows: condData?.condensation_on_windows || false,
        black_mould_present: condData?.black_mould_present || false,
        mould_severity: condData?.mould_severity || null,
        ventilation_adequate: condData?.ventilation_adequate || false,
        humidity_reading: condData?.humidity_reading || null,
        piv_recommended: condData?.piv_recommended || false,
        fan_recommended: condData?.fan_recommended || false,
        fan_count: condData?.fan_count || 0,
      }
    }

    // c. TIMBER DECAY data
    if (room.issues_identified.includes('timber_decay')) {
      const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
      roomData.timber = {
        floor_type: timberData?.floor_type || null,
        floor_condition: timberData?.floor_condition || null,
        floor_access: timberData?.floor_access || null,
        sub_floor_inspected: timberData?.sub_floor_inspected || false,
        sub_floor_ventilation: timberData?.sub_floor_ventilation || null,
        joist_condition: timberData?.joist_condition || null,
        fungal_findings: timberData?.fungal_findings || [],
        fungal_treatment_area: timberData?.fungal_treatment_area || 0,
        timber_replacement_needed: timberData?.timber_replacement_needed || false,
        joist_entries: timberData?.joist_entries || [],
        flooring_type: timberData?.flooring_type || null,
        flooring_area: timberData?.flooring_area || 0,
        ceiling_affected: timberData?.ceiling_affected || false,
        ceiling_area: timberData?.ceiling_area || 0,
      }
    }

    // d. WOODWORM data
    if (room.issues_identified.includes('woodworm')) {
      const woodwormData = room.room_data?.woodworm as WoodwormRoomData | undefined
      roomData.woodworm = {
        species_identified: woodwormData?.species_identified || null,
        infestation_status: woodwormData?.infestation_status || null,
        severity: woodwormData?.severity || null,
        structural_damage: woodwormData?.structural_damage || false,
        spray_floor_area: woodwormData?.spray_floor_area || 0,
        spray_timber_area: woodwormData?.spray_timber_area || 0,
        paste_treatment_area: woodwormData?.paste_treatment_area || 0,
      }
    }

    // Match photos to room — first try by room_id (includes new categories: room_id,
    // defect_evidence, meter_reading), then fall back to step for recovered photos
    // that have room_id = null. Legacy category names also accepted as fallback.
    // Each photo is claimed at most once.
    let matchedPhotos = photos.filter(
      (p) => p.room_id === room.id && !assignedPhotoIds.has(p.id)
    )
    if (matchedPhotos.length === 0) {
      matchedPhotos = photos.filter(
        (p) =>
          p.step === 'room_inspection' &&
          !assignedPhotoIds.has(p.id) &&
          [
            'room_id',
            'defect_evidence',
            'meter_reading',
            'damp_evidence',
            'room_general',
            'condensation_evidence',
            'timber_evidence',
            'woodworm_evidence',
          ].includes(p.category || '')
      )
    }
    for (const p of matchedPhotos) assignedPhotoIds.add(p.id)

    // Organise by category so the renderer can place them appropriately
    roomData.room_id_photo =
      matchedPhotos.find((p) => p.category === 'room_id')?.id || null
    roomData.defect_photos = matchedPhotos
      .filter((p) => p.category === 'defect_evidence')
      .map((p) => p.id)
    roomData.meter_photos = matchedPhotos
      .filter((p) => p.category === 'meter_reading')
      .map((p) => p.id)

    // All room photo IDs go in sub_section.photos for backward-compatible URL resolution
    const allRoomPhotoIds = matchedPhotos.map((p) => p.id)

    roomSubSections.push(
      buildSection(
        `room_${room.id}`,
        roomTitle,
        'findings' as ReportSectionType,
        'survey_data',
        roomContent,
        roomData,
        allRoomPhotoIds
      )
    )

    // Build context for executive summary LLM call
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
    // Condensation context
    if (room.issues_identified.includes('condensation')) {
      const condData = room.room_data?.condensation as CondensationRoomData | undefined
      if (condData) {
        contextLines.push(
          `Condensation: ${condData.black_mould_present ? 'Black mould present' : 'No mould'}, ventilation ${condData.ventilation_adequate ? 'adequate' : 'inadequate'}`
        )
      }
    }
    // Timber context
    if (room.issues_identified.includes('timber_decay')) {
      const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
      if (timberData) {
        contextLines.push(
          `Timber: ${timberData.fungal_findings?.join(', ') || 'No fungal findings'}, floor condition: ${timberData.floor_condition || 'not assessed'}`
        )
      }
    }
    // Woodworm context
    if (room.issues_identified.includes('woodworm')) {
      const woodwormData = room.room_data?.woodworm as WoodwormRoomData | undefined
      if (woodwormData) {
        contextLines.push(
          `Woodworm: ${woodwormData.species_identified || 'Species unidentified'}, severity: ${woodwormData.severity || 'not assessed'}`
        )
      }
    }
    llmContextParts.push(contextLines.join('\n'))
  }

  // 3. BUILD LLM CONTEXT AND CALL FOR EXECUTIVE SUMMARY
  const llmContext = [
    `Property: ${sd?.property_type || 'Unknown'}, ${sd?.construction_type?.replace(/_/g, ' ') || 'Unknown construction'}, built ${sd?.approx_build_year || 'unknown year'}.`,
    `Total rooms inspected: ${rooms.filter((r) => r.issues_identified?.length).length}`,
    `Total affected rooms: ${dampRooms.length} with damp, ${condensationRooms.length} with condensation, ${timberRooms.length} with timber decay, ${woodwormRooms.length} with woodworm.`,
    '',
    'Room-by-room findings:',
    ...llmContextParts,
    '',
    ext?.notes?.trim() ? `External inspection notes: ${ext.notes.trim()}` : '',
    ext?.building_defects_found
      ? `External defects: ${ext.building_defects.map((d: string) => getDefectLabel(d)).join(', ')}`
      : 'No external defects noted.',
    ext?.wall_tie_concern ? 'Wall tie concern identified.' : '',
    ext?.cracking_concern ? 'Structural cracking concern identified.' : '',
  ]
    .filter(Boolean)
    .join('\n')

  let execSummaryLlmText = ''
  if (llmContextParts.length > 0) {
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
              key: 'executive_summary',
              prompt:
                'Write an executive summary for this survey report in 2 paragraphs. Paragraph 1: Briefly summarise the key findings — which rooms are affected, what issues were identified, and what treatment has been specified. Be specific with room names and treatments. Paragraph 2: Explain why these works should be carried out promptly — reference the risks of delay (further deterioration, increased repair costs, potential health risks from damp/mould). Keep the tone professional and authoritative but not alarmist.',
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
        const match = generated?.find((s) => s.key === 'executive_summary')
        if (match && !match.error) {
          execSummaryLlmText = match.content
        }
      }
    } catch (err) {
      console.error('LLM call failed for executive summary:', err)
    }
  }

  const execSummaryContent = execSummaryLlmText
    ? execSummaryLlmText + '\n\n' + GUARANTEE_PARAGRAPH
    : 'Executive summary to be reviewed.' + '\n\n' + GUARANTEE_PARAGRAPH

  // 4. BUILD SECTIONS
  const surveyorName =
    surveyor?.full_name ||
    fallbackSurveyorName ||
    'Surveyor details to be confirmed'

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
      prepared_by: surveyorName,
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
      buildSurveyContextText(wizardData.reported_defect || (sd as any)?.reported_defect || '')
    )
  )

  // --- THE PROPERTY ---
  // Get the first street view photo from the site_details step
  const streetViewPhoto = photos.find(
    (p) => p.step === 'site_details' && (p.category === 'street_view' || p.category === 'building_exterior')
  )
  const propertyPhotos = streetViewPhoto ? [streetViewPhoto.id] : []

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

  // --- EXECUTIVE SUMMARY ---
  sections.push(
    buildSection(
      'executive_summary',
      'Executive Summary',
      'findings',
      'llm_generated',
      execSummaryContent
    )
  )

  // --- EXTERNAL INSPECTION ---
  const extSubSections: ReportSection[] = []
  let extContent = ''

  if (ext) {
    if (ext.building_defects_found && ext.building_defects?.length > 0) {
      const defectLabels = ext.building_defects.map((d: string) => getDefectLabel(d))
      extSubSections.push(
        buildSection(
          'building_defects',
          'Building Defects',
          'findings',
          'survey_data',
          `We noted the following building defects:\n\n${defectLabels.map((d: string) => ` - ${d}`).join('\n')}`
        )
      )
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

  // Surveyor observation notes always take priority as top-level content
  if (ext?.notes?.trim()) {
    extContent = ext.notes.trim()
  } else if (ext && !ext.building_defects_found) {
    extContent =
      'No significant building defects were noted during our external inspection.'
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
        p.category === 'building_defect' ||
        p.category === 'external_defect'
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
  // Four variants depending on DPC status identified during the survey:
  //   Variant 1 — Original DPC adequate: damp rooms surveyed, no treatment required.
  //   Variant 2 — Previous chemical DPC found: evidence of prior third-party injection.
  //               TODO: requires a new wizard field (e.g. `dpc_status` on ExternalInspection
  //               or DampRoomData) to distinguish from "original adequate". Not yet captured.
  //   Variant 3 — Chemical injection DPC recommended: BBA-approved cream injection.
  //   Variant 4 — Digital DPC recommended: Mursec Eco electro-osmotic system.
  const hasDpcRequired = dampRooms.some(
    (r) => r.room_data?.damp?.dpc_required === true
  )
  let dpcContent = ''
  if (hasDpcRequired) {
    // Variants 3 & 4: DPC treatment is required — select type from surveyed rooms
    const dpcRooms = dampRooms.filter(
      (r) => r.room_data?.damp?.dpc_required === true
    )
    const dpcTypes = new Set(
      dpcRooms
        .map((r) => r.room_data?.damp?.dpc_type)
        .filter(Boolean)
    )
    if (dpcTypes.has('digital')) {
      // Variant 4 — Digital DPC (Mursec electro-osmotic system)
      dpcContent =
        'Based on our inspection findings, we recommend the installation of a Mursec Eco digital damp proof course system to the affected areas.'
    } else {
      // Variant 3 — Chemical injection DPC recommended
      dpcContent =
        'Based on our inspection findings, we recommend the installation of a new chemical damp proof course to the affected areas. This will be carried out using BBA-approved DPC injection cream applied to the mortar course at a minimum of 150mm above external ground level.'
    }
  } else if (dampRooms.length > 0) {
    // Variant 1 — Original DPC adequate (damp rooms were surveyed but no treatment required)
    dpcContent =
      'Evidence of the original damp proof course was identified during the survey. The DPC appears to be in adequate condition and functioning as intended. No remedial damp proofing treatment is recommended at this time.'
  }
  // Non-damp surveys (no dampRooms at all): dpcContent stays empty — section is hidden.

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
  // Show this section only when there's actual airbrick work proposed OR
  // timber rooms report sub-floor ventilation concerns.
  // Don't default to "no airbricks installed" when no data exists — that
  // assumption can contradict external inspection notes.
  const airbrickClean = aw?.airbrick_clean_count || 0
  const airbrickUpgrade = aw?.airbrick_upgrade_count || 0
  const airbrickNew = aw?.airbrick_new_count || 0
  const totalAirbricks = airbrickClean + airbrickUpgrade + airbrickNew

  // Check timber rooms for sub-floor ventilation assessment
  const ventilationConcerns = timberRooms.filter((r) => {
    const v = (r.room_data?.timber_decay as any)?.sub_floor_ventilation
    return v === 'inadequate' || v === 'blocked' || v === 'none'
  })

  let ventContent = ''
  if (totalAirbricks > 0) {
    // Build specific proposal text from the airbrick work items
    const parts: string[] = []
    if (airbrickClean > 0) {
      parts.push(
        `removal, cleaning and reinstallation of ${airbrickClean} existing airbrick(s)`
      )
    }
    if (airbrickUpgrade > 0) {
      parts.push(
        `upgrading of ${airbrickUpgrade} airbrick(s) to 225 x 150mm airbricks`
      )
    }
    if (airbrickNew > 0) {
      parts.push(
        `installation of ${airbrickNew} new 225 x 150mm airbrick(s)`
      )
    }
    ventContent =
      `We propose the following airbrick works: ${parts.join('; ')}. ` +
      'This will increase the airflow through the floor voids, reduce the humidity and the moisture content of linked timbers, which will greatly reduce the chances of attack by wood rotting fungi such as dry rot and wet rot.'
  } else if (ventilationConcerns.length > 0) {
    // Timber rooms flagged ventilation issues but no specific airbrick work proposed
    ventContent =
      'During our inspection, concerns were noted regarding the sub floor ventilation. We recommend that the existing airbricks are assessed and, where necessary, cleaned, upgraded or supplemented to ensure adequate airflow to the sub floor voids.'
  }
  // When no airbrick work and no ventilation concerns, section stays empty and is hidden

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

  // --- PARTY WALL ACT NOTIFICATION ---
  // Dry rot (Serpula lacrymans) can spread through masonry into adjoining properties,
  // engaging the Party Wall etc. Act 1996. Section is only shown when dry rot is found
  // in any timber room. When not triggered, empty content hides the section.
  const hasDryRot = timberRooms.some(
    (r) =>
      (r.room_data?.timber_decay as TimberRoomData)?.fungal_findings?.includes(
        'dry_rot'
      )
  )
  sections.push(
    buildSection(
      'party_wall_notification',
      'Party Wall Act — Notification',
      'findings',
      'survey_data',
      hasDryRot
        ? `Dry rot (Serpula lacrymans) has been identified during the course of our survey.\n\nUnlike wet rot, dry rot mycelium is capable of spreading through masonry and other inert materials into adjoining properties. Where treatment works are adjacent to or affect party walls, the provisions of the Party Wall etc. Act 1996 may be engaged — in particular Section 6, which governs works that could affect the structure of an adjoining property.\n\nThe property owner is advised to serve the appropriate notice on all affected adjoining owners before commencing any treatment or remedial works that affect or are adjacent to party walls. Failure to comply with the Act may result in legal liability to the adjoining owner.\n\nWe recommend that you seek independent legal advice regarding your obligations under the Party Wall etc. Act 1996 prior to instructing works. Tyne Tees Damp Proofing Ltd can provide further guidance on the notification process on request.`
        : ''
    )
  )

  // --- SCOPE OF PROPOSED WORKS ---
  // Builds a detailed, numbered schedule of all works per room and property-wide.
  // Each room produces one entry grouping items for all issue types in that room.
  let scopeItemNumber = 1
  const roomWorks: any[] = []
  let totalAffectedArea = 0
  let hasStripOut = false

  for (const room of rooms) {
    if (!room.issues_identified || room.issues_identified.length === 0) continue

    const items: any[] = []

    // --- DAMP WORK ITEMS ---
    if (room.issues_identified.includes('damp')) {
      const dampData = room.room_data?.damp as any
      if (dampData?.walls && dampData.walls.length > 0) {
        const treatmentCode = dampData.wall_treatment
        let roomTotalArea = 0
        let roomTotalLength = 0
        for (const wall of dampData.walls) {
          roomTotalArea += (wall.length || 0) * (wall.height || 0)
          roomTotalLength += wall.length || 0
        }
        totalAffectedArea += roomTotalArea
        hasStripOut = true

        const areaStr = `${roomTotalArea.toFixed(1)}m²`
        const lengthStr = `${roomTotalLength.toFixed(1)} linear metres`

        if (treatmentCode === 'membrane') {
          items.push({ number: scopeItemNumber++, description: 'Remove existing plaster to affected walls', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Remove skirting boards to affected areas', urgency: 'high', length: lengthStr })
          items.push({ number: scopeItemNumber++, description: 'Install cavity drain membrane system to affected walls', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Fix new plasterboard to membrane and apply multi-finish skim plaster', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Reinstate skirting boards to treated areas', urgency: 'medium' })
        } else if (treatmentCode === 'injection') {
          items.push({ number: scopeItemNumber++, description: 'Strip existing plaster to affected area', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Injection of chemical damp proof course to mortar course at 150mm above external ground level', urgency: 'high', length: lengthStr })
          items.push({ number: scopeItemNumber++, description: 'Apply renovation plaster to treated walls', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Reinstate skirting boards to treated areas', urgency: 'medium' })
        } else if (treatmentCode === 'tanking') {
          items.push({ number: scopeItemNumber++, description: 'Prepare substrate — remove existing plaster finishes to affected walls', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Apply cementitious tanking system to affected walls', urgency: 'high', area: areaStr })
          items.push({ number: scopeItemNumber++, description: 'Apply renovation plaster to tanked surface', urgency: 'high', area: areaStr })
        } else {
          // Fallback for unrecognised treatment code
          items.push({ number: scopeItemNumber++, description: `Apply ${getTreatmentLabel(treatmentCode)} to affected walls`, urgency: 'high', area: areaStr })
        }
      }
    }

    // --- CONDENSATION WORK ITEMS ---
    // Per-room items only: mould treatment and extractor fans.
    // PIV is property-wide and handled in additional_works below.
    if (room.issues_identified.includes('condensation')) {
      const condData = room.room_data?.condensation as any
      if (condData) {
        if (condData.black_mould_present) {
          items.push({ number: scopeItemNumber++, description: 'Treat mould-affected surfaces with fungicidal wash', urgency: 'high' })
        }
        if (condData.fan_recommended && (condData.fan_count || 0) > 0) {
          items.push({ number: scopeItemNumber++, description: `Installation of ${condData.fan_count} extractor fan(s) to improve ventilation`, urgency: 'medium' })
        }
      }
    }

    // --- TIMBER DECAY WORK ITEMS ---
    if (room.issues_identified.includes('timber_decay')) {
      const timberData = room.room_data?.timber_decay as any
      if (timberData) {
        if (timberData.fungal_findings?.includes('dry_rot')) {
          items.push({ number: scopeItemNumber++, description: 'Cut out and remove all timber affected by dry rot including 300mm beyond visible decay', urgency: 'high' })
          hasStripOut = true
        }
        if (timberData.fungal_findings?.includes('wet_rot')) {
          items.push({ number: scopeItemNumber++, description: 'Cut out and remove all timber affected by wet rot including 300mm beyond visible decay', urgency: 'high' })
          hasStripOut = true
        }
        if ((timberData.fungal_treatment_area || 0) > 0) {
          const area = `${(timberData.fungal_treatment_area as number).toFixed(1)}m²`
          items.push({ number: scopeItemNumber++, description: `Apply fungicidal spray treatment to all exposed masonry and timber (${area})`, urgency: 'high', area })
          totalAffectedArea += timberData.fungal_treatment_area as number
        }
        if (timberData.timber_replacement_needed && timberData.joist_entries?.length > 0) {
          hasStripOut = true
          for (const joistEntry of timberData.joist_entries as Array<{ size: string; quantity: number; length: number }>) {
            items.push({ number: scopeItemNumber++, description: `Supply and install ${joistEntry.quantity}x ${joistEntry.size} replacement joists at ${joistEntry.length}m each`, urgency: 'high' })
          }
        }
        if ((timberData.flooring_area || 0) > 0) {
          const area = `${(timberData.flooring_area as number).toFixed(1)}m²`
          const flooringLabel = formatFlooringType(timberData.flooring_type)
          items.push({ number: scopeItemNumber++, description: `Supply and install replacement ${flooringLabel} flooring (${area})`, urgency: 'high', area })
          totalAffectedArea += timberData.flooring_area as number
          hasStripOut = true
        }
        if (timberData.ceiling_affected && (timberData.ceiling_area || 0) > 0) {
          const area = `${(timberData.ceiling_area as number).toFixed(1)}m²`
          items.push({ number: scopeItemNumber++, description: `Renew ceiling to affected area (${area})`, urgency: 'medium', area })
        }
      }
    }

    // --- WOODWORM WORK ITEMS ---
    if (room.issues_identified.includes('woodworm')) {
      const woodwormData = room.room_data?.woodworm as any
      if (woodwormData) {
        const severityUrgencyMap: Record<string, string> = { light: 'low', moderate: 'medium', severe: 'high' }
        const urgency = severityUrgencyMap[woodwormData.severity as string] || 'medium'
        if ((woodwormData.spray_floor_area || 0) > 0) {
          const area = `${(woodwormData.spray_floor_area as number).toFixed(1)}m²`
          items.push({ number: scopeItemNumber++, description: `Apply insecticidal spray treatment to floor timbers (${area})`, urgency, area })
          totalAffectedArea += woodwormData.spray_floor_area as number
        }
        if ((woodwormData.spray_timber_area || 0) > 0) {
          const area = `${(woodwormData.spray_timber_area as number).toFixed(1)}m²`
          items.push({ number: scopeItemNumber++, description: `Apply insecticidal spray treatment to exposed structural timbers (${area})`, urgency, area })
          totalAffectedArea += woodwormData.spray_timber_area as number
        }
        if ((woodwormData.paste_treatment_area || 0) > 0) {
          const area = `${(woodwormData.paste_treatment_area as number).toFixed(1)}m²`
          items.push({ number: scopeItemNumber++, description: `Apply insecticidal paste treatment to affected timbers (${area})`, urgency, area })
          totalAffectedArea += woodwormData.paste_treatment_area as number
        }
        if (woodwormData.structural_damage) {
          items.push({ number: scopeItemNumber++, description: 'Structural assessment required for timber members with significant insect damage', urgency: 'high' })
        }
      }
    }

    if (items.length > 0) {
      roomWorks.push({
        room_name: room.name,
        floor_level: formatFloorLevel(room.floor_level),
        items,
      })
    }
  }

  // Additional works — property-wide
  const scopeAdditionalWorks: any[] = []

  if (hasDpcRequired) {
    const totalDpcLen = dampRooms.reduce((sum, r) => {
      const dampData = r.room_data?.damp as any
      return sum + (dampData?.dpc_wall_length || 0)
    }, 0)
    scopeAdditionalWorks.push({
      number: scopeItemNumber++,
      description: 'Injection of chemical damp proof course to mortar bed at 150mm above external ground level',
      urgency: 'high',
      length: totalDpcLen > 0 ? `${totalDpcLen.toFixed(1)} linear metres` : undefined,
    })
  }

  if (hasStripOut) {
    scopeAdditionalWorks.push({
      number: scopeItemNumber++,
      description: 'Disposal of waste materials via licensed skip hire and transfer to licensed waste carrier',
      urgency: 'high',
    })
  }

  if (aw?.piv_count && aw.piv_count > 0) {
    scopeAdditionalWorks.push({
      number: scopeItemNumber++,
      description: `Installation of ${aw.piv_count} positive input ventilation (PIV) unit(s) to improve air quality and reduce condensation risk`,
      urgency: 'medium',
    })
  }

  if (totalAirbricks > 0) {
    scopeAdditionalWorks.push({
      number: scopeItemNumber++,
      description: `Installation of ${totalAirbricks} airbrick(s) to improve sub-floor ventilation`,
      urgency: 'medium',
    })
  }

  sections.push(
    buildSection(
      'scope_of_works',
      'Scope of Proposed Works',
      'data',
      'survey_data',
      'The following schedule of works has been specified based on our survey findings. Works are listed by location and treatment sequence.',
      {
        room_works: roomWorks,
        additional_works: scopeAdditionalWorks,
        total_affected_area: `${totalAffectedArea.toFixed(1)}m²`,
      }
    )
  )

  // --- SURVEYOR ADDITIONAL COMMENTS ---
  // Only included when the surveyor has entered non-empty free text.
  // Stored in survey_data JSONB alongside other wizard fields.
  const surveyorComments = wizardData.surveyor_additional_comments?.trim() || ''
  if (surveyorComments) {
    sections.push(
      buildSection(
        'surveyor_comments',
        'Additional Comments From Surveyor',
        'findings',
        'survey_data',
        surveyorComments
      )
    )
  }

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
  sections.push(
    buildSection(
      'surveyor_profile',
      'Your Surveyor',
      'signature',
      'survey_data',
      surveyorName,
      {
        surveyor_name: surveyorName,
        surveyor_title: 'Surveyor',
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

  // 5. SAVE REPORT TO DATABASE
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
// Regenerate Section — Re-runs LLM for executive_summary
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

  // Only executive_summary supports LLM regeneration
  if (sectionKey !== 'executive_summary') {
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
    if (room.issues_identified.includes('condensation')) {
      const condData = room.room_data?.condensation as CondensationRoomData | undefined
      if (condData) {
        lines.push(
          `Condensation: ${condData.black_mould_present ? 'Black mould present' : 'No mould'}, ventilation ${condData.ventilation_adequate ? 'adequate' : 'inadequate'}`
        )
      }
    }
    if (room.issues_identified.includes('timber_decay')) {
      const timberData = room.room_data?.timber_decay as TimberRoomData | undefined
      if (timberData) {
        lines.push(
          `Timber: ${timberData.fungal_findings?.join(', ') || 'No fungal findings'}, floor condition: ${timberData.floor_condition || 'not assessed'}`
        )
      }
    }
    if (room.issues_identified.includes('woodworm')) {
      const woodwormData = room.room_data?.woodworm as WoodwormRoomData | undefined
      if (woodwormData) {
        lines.push(
          `Woodworm: ${woodwormData.species_identified || 'Species unidentified'}, severity: ${woodwormData.severity || 'not assessed'}`
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
    ext?.notes?.trim() ? `External inspection notes: ${ext.notes.trim()}` : '',
    ext?.building_defects_found
      ? `External defects: ${ext.building_defects.map((d: string) => getDefectLabel(d)).join(', ')}`
      : 'No external defects noted.',
    ext?.wall_tie_concern ? 'Wall tie concern identified.' : '',
    ext?.cracking_concern ? 'Structural cracking concern identified.' : '',
  ]
    .filter(Boolean)
    .join('\n')

  let newLlmText = ''

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
            key: 'executive_summary',
            prompt:
              'Write an executive summary for this survey report in 2 paragraphs. Paragraph 1: Briefly summarise the key findings — which rooms are affected, what issues were identified, and what treatment has been specified. Be specific with room names and treatments. Paragraph 2: Explain why these works should be carried out promptly — reference the risks of delay (further deterioration, increased repair costs, potential health risks from damp/mould). Keep the tone professional and authoritative but not alarmist.',
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
      const match = generated?.find((s) => s.key === 'executive_summary')
      if (match && !match.error) {
        newLlmText = match.content
      }
    }
  } catch (err) {
    console.error('Error regenerating executive summary:', err)
  }

  const newContent = newLlmText
    ? newLlmText + '\n\n' + GUARANTEE_PARAGRAPH
    : 'Executive summary to be reviewed.' + '\n\n' + GUARANTEE_PARAGRAPH

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
