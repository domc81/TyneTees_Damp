// =============================================================================
// Survey Photo Types — Photo Capture & Storage for Survey Wizard
// Photos are stored in surveys.survey_data JSONB under a "photos" key
// Storage bucket: "survey-photos"
// =============================================================================

export interface SurveyPhoto {
  id: string
  survey_id: string
  room_id?: string // null for property-level photos (exterior, street view)
  step: PhotoStep
  category: string
  description: string
  storage_path: string
  file_name: string
  file_size: number // bytes
  mime_type: string
  width: number // pixels
  height: number // pixels
  taken_at: string // ISO datetime — when photo was captured
  latitude?: number
  longitude?: number
  created_at: string
}

export type PhotoStep =
  | 'site_details'
  | 'external_inspection'
  | 'room_inspection'

// Photo categories by step
export const PHOTO_CATEGORIES = {
  site_details: [
    { value: 'street_view', label: 'Street View' },
    { value: 'building_exterior', label: 'Building Exterior' },
    { value: 'property_front', label: 'Property Front' },
    { value: 'general', label: 'General' },
  ],
  external_inspection: [
    { value: 'building_defect', label: 'Building Defect' },
    { value: 'external_defect', label: 'External Defect (per-defect)' },
    { value: 'roof_defect', label: 'Roof Defect' },
    { value: 'gutter_defect', label: 'Gutter/RWG Defect' },
    { value: 'wall_crack', label: 'Wall Crack' },
    { value: 'pointing_defect', label: 'Pointing Defect' },
    { value: 'dpc_evidence', label: 'DPC Evidence' },
    { value: 'general', label: 'General' },
  ],
  room_inspection: [
    { value: 'damp_evidence', label: 'Damp Evidence' },
    { value: 'timber_damage', label: 'Timber Damage' },
    { value: 'condensation_evidence', label: 'Condensation Evidence' },
    { value: 'woodworm_evidence', label: 'Woodworm Evidence' },
    { value: 'room_overview', label: 'Room Overview' },
    { value: 'general', label: 'General' },
  ],
} as const

export interface PhotoCapture {
  file: File
  category: string
  description: string
  step: PhotoStep
  room_id?: string
}

export interface PhotoUploadProgress {
  photo_id: string
  progress: number // 0-100
  status: 'uploading' | 'compressing' | 'complete' | 'error'
  error?: string
}
