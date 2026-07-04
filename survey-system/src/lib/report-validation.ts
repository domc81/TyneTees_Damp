// =============================================================================
// Report Completeness Validation — Office QA Gate
// Checks for missing items before a report can be sent to the customer
// =============================================================================

import type { SurveyPhoto } from '@/types/survey-photo.types'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'

export interface ValidationWarning {
  id: string
  message: string
  severity: 'critical' | 'warning'
}

export function validateReportCompleteness(
  wizardData: SurveyWizardData | null,
  rooms: SurveyRoomRow[],
  photos: SurveyPhoto[],
  hasSketchPlan: boolean
): ValidationWarning[] {
  const warnings: ValidationWarning[] = []

  // Front elevation photo
  const hasFrontElevation = photos.some(
    (p) =>
      p.step === 'site_details' &&
      (p.category === 'property_front' ||
        p.category === 'building_exterior' ||
        p.category === 'street_view')
  )
  if (!hasFrontElevation) {
    warnings.push({
      id: 'no_front_elevation',
      message: 'Front elevation photo missing',
      severity: 'warning',
    })
  }

  // Rear elevation photo (check description for 'rear')
  const hasRearElevation = photos.some(
    (p) =>
      p.step === 'site_details' &&
      p.description?.toLowerCase().includes('rear')
  )
  if (!hasRearElevation) {
    warnings.push({
      id: 'no_rear_elevation',
      message: 'Rear elevation photo missing',
      severity: 'warning',
    })
  }

  // Sketch plan
  if (!hasSketchPlan) {
    warnings.push({
      id: 'no_sketch_plan',
      message: 'No sketch plan uploaded',
      severity: 'warning',
    })
  }

  // Check each room has findings and urgency
  const roomsWithIssues = rooms.filter(
    (r) => r.issues_identified && r.issues_identified.length > 0
  )

  for (const room of roomsWithIssues) {
    // Check urgency set for each issue type
    const rd = room.room_data
    for (const issue of room.issues_identified) {
      const issueData = rd?.[issue as keyof typeof rd] as any
      if (issueData && !issueData.urgency) {
        warnings.push({
          id: `no_urgency_${room.id}_${issue}`,
          message: `${room.name}: ${issue.replace('_', ' ')} urgency not set`,
          severity: 'warning',
        })
      }
    }

    // Check room has at least one photo
    const roomPhotos = photos.filter((p) => p.room_id === room.id)
    if (roomPhotos.length === 0) {
      warnings.push({
        id: `no_photos_${room.id}`,
        message: `${room.name}: no photos taken`,
        severity: 'warning',
      })
    }
  }

  // External inspection completed
  if (!wizardData?.external_inspection?.building_defects_found && wizardData?.external_inspection?.building_defects_found !== false) {
    warnings.push({
      id: 'external_not_completed',
      message: 'External inspection not completed',
      severity: 'critical',
    })
  }

  // External urgency not set (when defects found)
  if (wizardData?.external_inspection?.building_defects_found && !wizardData.external_inspection.urgency) {
    warnings.push({
      id: 'external_no_urgency',
      message: 'External inspection urgency not set',
      severity: 'warning',
    })
  }

  // No rooms with issues
  if (roomsWithIssues.length === 0) {
    warnings.push({
      id: 'no_rooms_with_issues',
      message: 'No rooms have issues identified',
      severity: 'critical',
    })
  }

  // Proposal items
  if (!wizardData?.proposal_items || wizardData.proposal_items.length === 0) {
    warnings.push({
      id: 'no_proposal_items',
      message: 'No proposal items selected',
      severity: 'warning',
    })
  }

  // Limitations
  if (!wizardData?.limitations || wizardData.limitations.length === 0) {
    warnings.push({
      id: 'no_limitations',
      message: 'No limitations/access restrictions selected',
      severity: 'warning',
    })
  }

  return warnings
}
