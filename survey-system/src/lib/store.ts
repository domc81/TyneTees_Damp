// Complete Survey System Store with all CRUD operations
import type { SurveyType, Project } from '@/types/database.types'

// ============ ROOMS ============

export interface MoistureReading {
  id: string
  location: string
  reading: number
  unit: 'percentage' | 'mm'
  material: string
  notes?: string
  timestamp: string
}

export interface DefectObservation {
  id: string
  type: string
  severity: 1 | 2 | 3 | 4 | 5  // 1=Minor, 2=Moderate, 3=Significant, 4=Severe, 5=Critical
  location: string
  description: string
  photo_id?: string
  recommendation?: string
}

export interface SurveyRoom {
  id: string
  project_id: string
  name: string
  room_type: string
  floor_level: string
  order: number

  // Mandatory: At least one moisture reading required
  moisture_readings: MoistureReading[]

  // Mandatory: At least one photo required
  photos: Array<{
    id: string
    file_name: string
    category: string
    description: string
    timestamp: string
  }>

  // Defects observed
  defects: DefectObservation[]

  // Observations (mandatory for survey completeness)
  findings: string
  recommendations: string

  // Additional context
  wall_type?: string
  plaster_type?: string
  floor_type?: string

  // Survey metadata
  surveyor_notes?: string
  is_completed: boolean
  completed_at?: string
  created_at: string
  updated_at: string
}

// Validation helpers
export function validateRoomSurvey(room: SurveyRoom): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!room.moisture_readings || room.moisture_readings.length === 0) {
    errors.push('At least one moisture reading is required')
  }

  if (!room.photos || room.photos.length === 0) {
    errors.push('At least one photo is required')
  }

  if (!room.findings || room.findings.trim().length < 10) {
    errors.push('Findings must be at least 10 characters describing observations')
  }

  if (!room.recommendations || room.recommendations.trim().length < 10) {
    errors.push('Recommendations must be at least 10 characters describing proposed works')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Moisture thresholds (from Excel workbook)
export const MOISTURE_THRESHOLDS = {
  TIMBER_CRITICAL: 20,  // % - Timber at risk
  TIMBER_ELEVATED: 15,  // % - Monitor
  MASONRY_NORMAL: 5,    // % - Normal for masonry
  MASONRY_DAMP: 10,     // % - May indicate damp
  MASONRY_WET: 15,      // % - Damp confirmed
}

export function getMoistureStatus(reading: number, isTimber: boolean): {
  status: 'normal' | 'elevated' | 'warning' | 'critical'
  color: string
  message: string
} {
  const threshold = isTimber ? MOISTURE_THRESHOLDS.TIMBER_CRITICAL : MOISTURE_THRESHOLDS.MASONRY_DAMP

  if (reading < (isTimber ? MOISTURE_THRESHOLDS.TIMBER_ELEVATED : MOISTURE_THRESHOLDS.MASONRY_NORMAL)) {
    return { status: 'normal', color: 'text-green-600', message: 'Normal' }
  } else if (reading < (isTimber ? MOISTURE_THRESHOLDS.TIMBER_CRITICAL : MOISTURE_THRESHOLDS.MASONRY_WET)) {
    return { status: 'elevated', color: 'text-amber-600', message: 'Elevated - Monitor' }
  } else if (reading < threshold) {
    return { status: 'warning', color: 'text-orange-600', message: 'Damp Detected' }
  } else {
    return { status: 'critical', color: 'text-red-600', message: 'Critical - Action Required' }
  }
}

const ROOMS_KEY = 'tyne-tees-rooms'

function getRooms(): SurveyRoom[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(ROOMS_KEY)
  return data ? JSON.parse(data) : []
}

export function getProjectRooms(projectId: string): SurveyRoom[] {
  return getRooms().filter(r => r.project_id === projectId)
}

// Room types for dropdowns
export const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'hallway', label: 'Hallway' },
  { value: 'landing', label: 'Landing' },
  { value: 'stairwell', label: 'Stairwell' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'study', label: 'Study' },
  { value: 'utility', label: 'Utility Room' },
  { value: 'wc', label: 'WC/Cloakroom' },
  { value: 'garage', label: 'Garage' },
  { value: 'conservatory', label: 'Conservatory' },
  { value: 'cellar', label: 'Cellar' },
  { value: 'loft', label: 'Loft/Attic' },
  { value: 'other', label: 'Other' },
]

// Floor levels - comprehensive for multi-story properties
export const floorLevels = [
  { value: 'basement_2', label: 'Basement Level 2' },
  { value: 'basement_1', label: 'Basement Level 1' },
  { value: 'ground', label: 'Ground Floor' },
  { value: 'first', label: 'First Floor' },
  { value: 'second', label: 'Second Floor' },
  { value: 'third', label: 'Third Floor' },
  { value: 'fourth', label: 'Fourth Floor+' },
  { value: 'loft', label: 'Loft/Attic' },
]

// Exterior survey types
export const exteriorSurveyTypes = [
  { value: 'walls', label: 'External Walls', icon: '🏠' },
  { value: 'pointing', label: 'Pointing/Mortar', icon: '🧱' },
  { value: 'gutters', label: 'Gutters & Downpipes', icon: '🌧️' },
  { value: 'dpc', label: 'DPC Inspection', icon: '📏' },
  { value: 'ground_levels', label: 'External Ground Levels', icon: '⛰️' },
  { value: 'ventilation', label: 'Ventilation Assessment', icon: '💨' },
  { value: 'roof', label: 'Roof & Flashing', icon: '🏠' },
  { value: 'windows', label: 'Windows & Doors', icon: '🪟' },
]

// Wall construction types
export const wallConstructionTypes = [
  { value: 'solid_brick', label: 'Solid Brick' },
  { value: 'cavity_brick', label: 'Cavity Brick' },
  { value: 'solid_stone', label: 'Solid Stone' },
  { value: 'stone_cavity', label: 'Stone with Cavity' },
  { value: 'timber_frame', label: 'Timber Frame' },
  { value: 'concrete', label: 'Concrete Panel' },
  { value: 'rendered', label: 'Rendered Block' },
  { value: 'other', label: 'Other' },
]

// Pointing condition
export const pointingConditions = [
  { value: 'good', label: 'Good - No action required' },
  { value: 'minor_mortar_loss', label: 'Minor mortar loss' },
  { value: 'significant_mortar_loss', label: 'Significant mortar loss' },
  { value: 'repointing_required', label: 'Repointing required' },
  { value: 'deep_recessed', label: 'Deep recessed pointing' },
]

// Ground level assessment
export const groundLevelConditions = [
  { value: 'adequate', label: 'Adequate - 150mm+ below DPC' },
  { value: 'slightly_high', label: 'Slightly high - 75-150mm below DPC' },
  { value: 'too_high', label: 'Too high - below DPC level' },
  { value: 'raised_beds', label: 'Raised flower beds against wall' },
  { value: 'paving_adjacent', label: 'Paving abutting wall' },
]

// ============ EXTERIOR SURVEY ============

export interface ExteriorSurvey {
  id: string
  project_id: string
  survey_date: string
  wall_construction: string
  wall_construction_other?: string
  external_wall_condition: string
  pointing_condition: string
  dpc_type: string
  dpc_visible: boolean
  dpc_condition: string
  ground_level_condition: string
  ground_level_action_required: string
  gutters_condition: string
  downpipes_condition: string
  ventilation_assessment: string
  roof_condition: string
  window_condition: string
  door_condition: string
  exterior_findings: string
  exterior_recommendations: string
  photos: string[]
  created_at: string
  updated_at: string
}

const EXTERIOR_KEY = 'tyne-tees-exterior'

function getExteriorSurveys(): ExteriorSurvey[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(EXTERIOR_KEY)
  return data ? JSON.parse(data) : []
}

export function getProjectExterior(projectId: string): ExteriorSurvey | null {
  return getExteriorSurveys().find(e => e.project_id === projectId) || null
}

export function saveExteriorSurvey(survey: ExteriorSurvey): void {
  const surveys = getExteriorSurveys()
  const index = surveys.findIndex(s => s.project_id === survey.project_id)
  if (index >= 0) {
    surveys[index] = survey
  } else {
    surveys.push(survey)
  }
  localStorage.setItem(EXTERIOR_KEY, JSON.stringify(surveys))
}

// DPC types
export const dpcTypes = [
  { value: 'bitumen', label: 'Bitumen/Hanson' },
  { value: 'slate', label: 'Slate' },
  { value: 'cement', label: 'Cement DPC' },
  { value: 'plastic', label: 'Modern Plastic' },
  { value: 'lead', label: 'Lead' },
  { value: 'none_identified', label: 'None identified' },
  { value: 'unknown', label: 'Unknown - requires investigation' },
]

// ============ PRODUCT CATALOG ============

export interface Product {
  id: string
  code: string
  name: string
  description: string
  category: string
  subcategory: string
  unit_cost: number
  unit_of_measure: string
  coverage_per_unit: number
  supplier: string
  supplier_url?: string
  waste_factor: number
  markup_percentage: number
  is_active: boolean
}

// Comprehensive product catalog based on Excel workbook
export const PRODUCT_CATALOG: Product[] = [
  // DPC INJECTION
  {
    id: 'prod-dpc-cream-1l',
    code: 'DPC-001',
    name: 'Creamline 8 DPC Injection Cream',
    description: 'Low viscosity DPC cream for chemical damp proof course',
    category: 'DPC',
    subcategory: 'Injection Cream',
    unit_cost: 13.93,
    unit_of_measure: 'L',
    coverage_per_unit: 8, // linear meters per litre (8m per litre based on 150mm wall)
    supplier: 'Safeguard',
    supplier_url: 'https://www.safeguardeurope.co.uk',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-dpc-cream-5l',
    code: 'DPC-002',
    name: 'Creamline 8 DPC Injection Cream (5L)',
    description: '5L container of DPC injection cream',
    category: 'DPC',
    subcategory: 'Injection Cream',
    unit_cost: 65.00,
    unit_of_measure: 'Container',
    coverage_per_unit: 40,
    supplier: 'Safeguard',
    waste_factor: 0.05,
    markup_percentage: 35,
    is_active: true,
  },

  // CAVITY DRAINAGE MEMBRANES
  {
    id: 'prod-mem-cm3-12',
    code: 'MEM-001',
    name: 'Wykamol CM3 Cavity Drain Membrane',
    description: '3mm studded cavity drainage membrane for walls',
    category: 'Membranes',
    subcategory: 'Cavity Drain',
    unit_cost: 18.35,
    unit_of_measure: 'M2',
    coverage_per_unit: 1,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-mem-hdpe-8',
    code: 'MEM-002',
    name: 'Heavy Duty HDPE Membrane 8mm',
    description: '8mm studded HDPE membrane for floors and walls',
    category: 'Membranes',
    subcategory: 'Cavity Drain',
    unit_cost: 24.50,
    unit_of_measure: 'M2',
    coverage_per_unit: 1,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },

  // FLOOR MEMBRANES
  {
    id: 'prod-mem-floor-lrf',
    code: 'MEM-003',
    name: 'Liquid Resin Floor Membrane System',
    description: 'PU based liquid applied floor membrane',
    category: 'Membranes',
    subcategory: 'Liquid Applied',
    unit_cost: 45.00,
    unit_of_measure: 'M2',
    coverage_per_unit: 1,
    supplier: 'Sika',
    waste_factor: 0.15,
    markup_percentage: 35,
    is_active: true,
  },

  // PLUGS AND FIXINGS
  {
    id: 'prod-fix-plug-100',
    code: 'FIX-001',
    name: 'Plaster Plugs (Bag of 100)',
    description: 'Universal plugs for membrane fixing',
    category: 'Fixings',
    subcategory: 'Plugs',
    unit_cost: 12.50,
    unit_of_measure: 'Bag',
    coverage_per_unit: 10, // bags per M2 approx
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-fix-screw-200',
    code: 'FIX-002',
    name: 'Screws for Plaster Plugs (Box of 200)',
    description: 'Self-tapping screws for membrane installation',
    category: 'Fixings',
    subcategory: 'Screws',
    unit_cost: 8.75,
    unit_of_measure: 'Box',
    coverage_per_unit: 20,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },

  // DRAINAGE ACCESSORIES
  {
    id: 'prod-drain-ag-110',
    code: 'DRAIN-001',
    name: 'Aco Drain Channel (110mm)',
    description: 'HDPE drainage channel for perimeter drainage',
    category: 'Drainage',
    subcategory: 'Channels',
    unit_cost: 18.50,
    unit_of_measure: 'LM',
    coverage_per_unit: 1,
    supplier: 'Aco',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-drain-sump',
    code: 'DRAIN-002',
    name: 'Sump and Pump System',
    description: 'Cavity drain sump with pump unit',
    category: 'Drainage',
    subcategory: 'Sump',
    unit_cost: 485.00,
    unit_of_measure: 'Each',
    coverage_per_unit: 1,
    supplier: 'Wykamol',
    waste_factor: 0.05,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-drain-perimeter',
    code: 'DRAIN-003',
    name: 'Perimeter Drainage Channel',
    description: 'Channel drainage system for membrane outlets',
    category: 'Drainage',
    subcategory: 'Channels',
    unit_cost: 22.00,
    unit_of_measure: 'LM',
    coverage_per_unit: 1,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },

  // CEMENTITIOUS TANKING
  {
    id: 'prod-tank-renderoc',
    code: 'TANK-001',
    name: 'Renderoc Tanking Slurry',
    description: 'Cementitious waterproofing slurry',
    category: 'Tanking',
    subcategory: 'Cementitious',
    unit_cost: 28.50,
    unit_of_measure: 'M2',
    coverage_per_unit: 1.5, // kg per M2 for 2 coats
    supplier: ' Fosroc',
    waste_factor: 0.15,
    markup_percentage: 35,
    is_active: true,
  },

  // AIRBRICKS
  {
    id: 'prod-air-terra',
    code: 'AIR-001',
    name: 'Terranova Airbrick (Red)',
    description: 'Passive air vent airbrick',
    category: 'Ventilation',
    subcategory: 'Airbricks',
    unit_cost: 4.95,
    unit_of_measure: 'Each',
    coverage_per_unit: 0.4, // each per LM (brick size)
    supplier: 'Ibstock',
    waste_factor: 0.05,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-air-plastic',
    code: 'AIR-002',
    name: 'Plastic Airbrick (Black)',
    description: 'HDPE airbrick for cavity tray ventilation',
    category: 'Ventilation',
    subcategory: 'Airbricks',
    unit_cost: 3.25,
    unit_of_measure: 'Each',
    coverage_per_unit: 0.4,
    supplier: 'Wykamol',
    waste_factor: 0.05,
    markup_percentage: 35,
    is_active: true,
  },

  // SPRAY TREATMENTS
  {
    id: 'prod-spray-boron',
    code: 'SPRAY-001',
    name: 'Borbased Timber Treatment',
    description: 'Boron based preservative for wet rot',
    category: 'Treatment',
    subcategory: 'Spray',
    unit_cost: 45.00,
    unit_of_measure: 'L',
    coverage_per_unit: 4, // M2 per litre
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-spray-fungi',
    code: 'SPRAY-002',
    name: 'Fungicidal Wash',
    description: 'Mould and fungal treatment solution',
    category: 'Treatment',
    subcategory: 'Spray',
    unit_cost: 32.00,
    unit_of_measure: 'L',
    coverage_per_unit: 6,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },

  // SURFACE PREPARATION
  {
    id: 'prod-prep-rena-plast',
    code: 'PREP-001',
    name: 'Renovating Plaster (25kg)',
    description: 'Breathable plaster for damp walls',
    category: 'Plastering',
    subcategory: 'Renovating',
    unit_cost: 18.50,
    unit_of_measure: 'Bag',
    coverage_per_unit: 2.5, // M2 per bag at 13mm
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active:  true,
  },
  {
    id: 'prod-prep-heritage',
    code: 'PREP-002',
    name: 'Heritage Renovating Plaster',
    description: 'Lime-based renovating plaster for older properties',
    category: 'Plastering',
    subcategory: 'Renovating',
    unit_cost: 24.00,
    unit_of_measure: 'Bag',
    coverage_per_unit: 2.5,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-prep-primer',
    code: 'PREP-003',
    name: 'UDL Primer',
    description: 'Universal primer for waterproofing systems',
    category: 'Plastering',
    subcategory: 'Primer',
    unit_cost: 15.50,
    unit_of_measure: 'L',
    coverage_per_unit: 8,
    supplier: 'Wykamol',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active:  true,
  },

  // PROTECTION
  {
    id: 'prod-prot-floor',
    code: 'PROT-001',
    name: 'Antinox Floor Protection',
    description: 'Reusable floor protection film',
    category: 'Protection',
    subcategory: 'Floor',
    unit_cost: 4.16,
    unit_of_measure: 'M2',
    coverage_per_unit: 1,
    supplier: 'Antinox',
    waste_factor: 0.1,
    markup_percentage: 35,
    is_active: true,
  },
  {
    id: 'prod-prot-dust',
    code: 'PROT-002',
    name: 'Dust Sheets (Canvas)',
    description: 'Heavy duty canvas dust sheets',
    category: 'Protection',
    subcategory: 'Dust',
    unit_cost: 8.50,
    unit_of_measure: 'Each',
    coverage_per_unit: 20, // approx room coverage
    supplier: 'Protective',
    waste_factor: 0.05,
    markup_percentage: 35,
    is_active: true,
  },

  // SKIP HIRE (placeholder - usually external)
  {
    id: 'prod-waste-skip',
    code: 'WASTE-001',
    name: 'Skip Hire (6 Yard)',
    description: '6 yard skip for waste removal',
    category: 'Waste',
    subcategory: 'Skip',
    unit_cost: 250.00,
    unit_of_measure: 'Week',
    coverage_per_unit: 1,
    supplier: 'Local',
    waste_factor: 0,
    markup_percentage: 10,
    is_active: true,
  },
]

// Product lookup helpers
export function getProductsByCategory(category: string): Product[] {
  return PRODUCT_CATALOG.filter(p => p.category === category && p.is_active)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCT_CATALOG.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase()
  return PRODUCT_CATALOG.filter(p =>
    p.is_active && (
      p.name.toLowerCase().includes(lower) ||
      p.code.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
    )
  )
}

// Storage keys
const STORAGE_KEYS = {
  ENQUIRIES: 'tyne-tees-enquiries',
  PROJECTS: 'tyne-tees-projects',
  SECTIONS: 'tyne-tees-sections',
  LINE_ITEMS: 'tyne-tees-line-items',
  PHOTOS: 'tyne-tees-photos',
  RATES: 'tyne-tees-rates',
}

// ============ HELPERS ============

function generateProjectNumber(): string {
  const year = new Date().getFullYear()
  const projects = getProjects()
  const count = projects.length + 1
  return `TT-${year}-${count.toString().padStart(4, '0')}`
}

function generateEnquiryNumber(surveyType: string): string {
  const year = new Date().getFullYear()
  const enquiries = getEnquiries()
  const prefix = surveyType === 'damp' ? 'DAMP' : surveyType.toUpperCase()
  const count = enquiries.filter(e => e.survey_type === surveyType).length + 1
  return `CF-${prefix}-${year}-${count.toString().padStart(4, '0')}`
}

function generateInternalRef(clientName: string): string {
  const surname = clientName.split(' ').pop() || 'PROJECT'
  const random = Math.floor(Math.random() * 900) + 100
  return `${surname.toUpperCase().substring(0, 5)}-${random}`
}

// ============ ENQUIRIES ============

export interface Enquiry {
  id: string
  enquiry_number: string
  internal_reference: string
  client_name: string
  client_email: string
  client_phone: string
  site_address_1: string
  site_address_2: string
  site_city: string
  site_county: string
  site_postcode: string
  survey_type: SurveyType
  status: 'new' | 'assigned' | 'surveyed' | 'quoted' | 'accepted' | 'declined' | 'on_hold'
  enquiry_date: string
  proposed_survey_date: string
  source: string
  notes: string
  created_at: string
}

function getEnquiries(): Enquiry[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES)
  return data ? JSON.parse(data) : []
}

function saveEnquiries(enquiries: Enquiry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries))
}

export function createEnquiry(data: Omit<Enquiry, 'id' | 'enquiry_number' | 'internal_reference' | 'created_at'>): Enquiry {
  const enquiries = getEnquiries()
  const enquiry: Enquiry = {
    ...data,
    id: crypto.randomUUID(),
    enquiry_number: generateEnquiryNumber(data.survey_type),
    internal_reference: generateInternalRef(data.client_name),
    created_at: new Date().toISOString(),
  }
  enquiries.push(enquiry)
  saveEnquiries(enquiries)
  return enquiry
}

export function getEnquiry(id: string): Enquiry | null {
  return getEnquiries().find(e => e.id === id) || null
}

export function updateEnquiry(id: string, updates: Partial<Enquiry>): Enquiry | null {
  const enquiries = getEnquiries()
  const index = enquiries.findIndex(e => e.id === id)
  if (index === -1) return null
  enquiries[index] = { ...enquiries[index], ...updates }
  saveEnquiries(enquiries)
  return enquiries[index]
}

// ============ PROJECTS ============

// Note: Project type is imported from '@/types/database.types'

function getProjects(): Project[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
  return data ? JSON.parse(data) : []
}

export function getAllProjects(): Project[] {
  return getProjects()
}

function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
}

export function createProject(data: Omit<Project, 'id' | 'project_number' | 'created_at' | 'updated_at'>): Project {
  const projects = getProjects()
  const project: Project = {
    ...data,
    id: crypto.randomUUID(),
    project_number: generateProjectNumber(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  projects.push(project)
  saveProjects(projects)
  return project
}

export function getProject(id: string): Project | null {
  return getProjects().find(p => p.id === id) || null
}

// ============ SECTIONS ============

export interface CostSection {
  id: string
  project_id: string
  section_name: string
  display_order: number
  markup_percentage: number
  is_optional: boolean
  is_active: boolean
  materials_total: number
  labor_total: number
  section_total: number
}

function getSections(): CostSection[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.SECTIONS)
  return data ? JSON.parse(data) : []
}

function saveSections(sections: CostSection[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections))
}

export function getProjectSections(projectId: string): CostSection[] {
  return getSections().filter(s => s.project_id === projectId)
}

export function createSection(data: Omit<CostSection, 'id'>): CostSection {
  const sections = getSections()
  const section: CostSection = {
    ...data,
    id: crypto.randomUUID(),
  }
  sections.push(section)
  saveSections(sections)
  return section
}

// Default sections template
export const DEFAULT_SECTIONS = [
  { section_name: 'Stripping out of items as required', markup_percentage: 0, is_optional: false },
  { section_name: 'Walls (Install membrane system)', markup_percentage: 0, is_optional: false },
  { section_name: 'Cementitious tanking system', markup_percentage: 0, is_optional: false },
  { section_name: 'Floor - Liquid Resin Floor Membranes', markup_percentage: 0, is_optional: false },
  { section_name: 'Plastering & finishing', markup_percentage: 0, is_optional: false },
  { section_name: 'Warmline Internal Wall Insulation', markup_percentage: 0, is_optional: true },
  { section_name: 'Floor Joists & Floor Decking', markup_percentage: 0, is_optional: true },
  { section_name: 'Airbricks', markup_percentage: 0, is_optional: true },
  { section_name: 'Spray treatments', markup_percentage: 0, is_optional: true },
  { section_name: 'Drains', markup_percentage: 0, is_optional: true },
  { section_name: 'External Wall - Aquaban Water Repellant', markup_percentage: 0, is_optional: true },
  { section_name: 'Asbestos Testing', markup_percentage: 0, is_optional: true },
  { section_name: 'Skip hire', markup_percentage: 0, is_optional: false },
]

export function initializeProjectSections(projectId: string): CostSection[] {
  const sections: CostSection[] = DEFAULT_SECTIONS.map((s, i) => ({
    ...s,
    id: crypto.randomUUID(),
    project_id: projectId,
    display_order: i + 1,
    is_active: true,
    materials_total: 0,
    labor_total: 0,
    section_total: 0,
  }))
  saveSections([...getSections(), ...sections])
  return sections
}

// ============ LINE ITEMS ============

interface LineItem {
  id: string
  section_id: string
  project_id: string
  item_name: string
  description: string
  category: string
  length: number
  width: number
  quantity: number
  uom: string
  unit_rate: number
  waste_factor: number
  hours_per_unit: number
  hourly_rate: number
  markup_percentage: number
  labor_markup_percentage: number
  material_cost: number
  labor_cost: number
  line_total: number
  is_optional: boolean
  is_active: boolean
  display_order: number
}

function getLineItems(): LineItem[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.LINE_ITEMS)
  return data ? JSON.parse(data) : []
}

function saveLineItems(items: LineItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.LINE_ITEMS, JSON.stringify(items))
}

export function getSectionItems(sectionId: string): LineItem[] {
  return getLineItems().filter(i => i.section_id === sectionId)
}

export function getProjectItems(projectId: string): LineItem[] {
  return getLineItems().filter(i => i.project_id === projectId)
}

export function createLineItem(data: Omit<LineItem, 'id' | 'material_cost' | 'labor_cost' | 'line_total'>): LineItem {
  const items = getLineItems()

  // Calculate quantity
  const qty = data.quantity > 0 ? data.quantity : (data.length > 0 && data.width > 0 ? data.length * data.width : 0)

  // Calculate costs
  const hourlyRate = data.hourly_rate || 30.63
  const wasteFactor = data.waste_factor || 0.10
  const markup = data.markup_percentage || 35
  const laborMarkup = data.labor_markup_percentage || 100

  const materialCost = qty * data.unit_rate * (1 + wasteFactor) * (1 + markup / 100)
  const laborCost = qty * (data.hours_per_unit || 0) * hourlyRate * (1 + laborMarkup / 100)

  const item: LineItem = {
    ...data,
    id: crypto.randomUUID(),
    quantity: qty,
    material_cost: Math.round(materialCost * 100) / 100,
    labor_cost: Math.round(laborCost * 100) / 100,
    line_total: Math.round((materialCost + laborCost) * 100) / 100,
  }

  items.push(item)
  saveLineItems(items)
  return item
}

export function updateLineItem(id: string, updates: Partial<LineItem>): LineItem | null {
  const items = getLineItems()
  const index = items.findIndex(i => i.id === id)
  if (index === -1) return null

  const item = { ...items[index], ...updates }

  // Recalculate if quantity/rate changed
  const qty = item.quantity > 0 ? item.quantity : (item.length > 0 && item.width > 0 ? item.length * item.width : 0)
  const wasteFactor = item.waste_factor || 0.10
  const markup = item.markup_percentage || 35
  const laborMarkup = item.labor_markup_percentage || 100
  const hourlyRate = item.hourly_rate || 30.63

  item.material_cost = Math.round(qty * item.unit_rate * (1 + wasteFactor) * (1 + markup / 100) * 100) / 100
  item.labor_cost = Math.round(qty * (item.hours_per_unit || 0) * hourlyRate * (1 + laborMarkup / 100) * 100) / 100
  item.line_total = Math.round((item.material_cost + item.labor_cost) * 100) / 100
  item.quantity = qty

  items[index] = item
  saveLineItems(items)
  return item
}

export function deleteLineItem(id: string): boolean {
  const items = getLineItems()
  const filtered = items.filter(i => i.id !== id)
  if (filtered.length === items.length) return false
  saveLineItems(filtered)
  return true
}

// ============ PHOTOS ============

export interface Photo {
  id: string
  project_id: string
  file_name: string
  description: string
  category: string
  created_at: string
}

function getPhotos(): Photo[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.PHOTOS)
  return data ? JSON.parse(data) : []
}

function savePhotos(photos: Photo[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos))
}

export function getProjectPhotos(projectId: string): Photo[] {
  return getPhotos().filter(p => p.project_id === projectId)
}

export function addPhoto(data: Omit<Photo, 'id' | 'created_at'>): Photo {
  const photos = getPhotos()
  const photo: Photo = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  photos.push(photo)
  savePhotos(photos)
  return photo
}

// ============ SAMPLE DATA ============

export function initializeSampleData(): void {
  if (typeof window === 'undefined') return
  if (getEnquiries().length > 0) return

  // Sample enquiries
  const enquiries: Enquiry[] = [
    {
      id: 'eq-1',
      enquiry_number: 'CF-DAMP-2026-0001',
      internal_reference: 'SMITH-123',
      client_name: 'John Smith',
      client_email: 'john.smith@email.com',
      client_phone: '01234 567890',
      site_address_1: '12 Victoria Street',
      site_address_2: '',
      site_city: 'Newcastle upon Tyne',
      site_county: 'Tyne and Wear',
      site_postcode: 'NE1 4LP',
      survey_type: 'damp',
      status: 'new',
      enquiry_date: '2026-02-04',
      proposed_survey_date: '2026-02-10',
      source: 'Website',
      notes: '',
      created_at: '2026-02-04T10:00:00Z',
    },
    {
      id: 'eq-2',
      enquiry_number: 'CF-TIMB-2026-0001',
      internal_reference: 'JOHNSON-456',
      client_name: 'Sarah Johnson',
      client_email: 'sarah.j@email.com',
      client_phone: '0191 123 4567',
      site_address_1: '45 Riverside Drive',
      site_address_2: '',
      site_city: 'Sunderland',
      site_county: 'Tyne and Wear',
      site_postcode: 'SR1 1AB',
      survey_type: 'timber',
      status: 'surveyed',
      enquiry_date: '2026-02-03',
      proposed_survey_date: '2026-02-08',
      source: 'Phone',
      notes: 'Urgent survey needed for mortgage',
      created_at: '2026-02-03T14:00:00Z',
    },
    {
      id: 'eq-3',
      enquiry_number: 'CF-COND-2026-0001',
      internal_reference: 'WILL-789',
      client_name: 'Tom Williams',
      client_email: 'tom.w@email.com',
      client_phone: '01642 123 456',
      site_address_1: 'Flat 3, 88 High Street',
      site_address_2: '',
      site_city: 'Middlesbrough',
      site_county: 'North Yorkshire',
      site_postcode: 'TS1 1XX',
      survey_type: 'condensation',
      status: 'quoted',
      enquiry_date: '2026-02-01',
      proposed_survey_date: '2026-02-05',
      source: 'Referral',
      notes: 'Black mold in bedroom',
      created_at: '2026-02-01T09:00:00Z',
    },
  ]
  saveEnquiries(enquiries)

  // Sample project with sections and items
  const project: Project = {
    id: 'proj-1',
    project_number: 'TT-2026-0001',
    survey_type: 'damp',
    status: 'in_progress',
    client_name: 'John Smith',
    site_address: '12 Victoria Street',
    site_postcode: 'NE1 4LP',
    weather_conditions: 'Dry',
    survey_date: '2026-02-05',
    notes: 'Rising damp to ground floor',
    created_at: '2026-02-04T10:00:00Z',
    updated_at: '2026-02-04T10:00:00Z',
  }
  saveProjects([project])

  // Initialize sections
  const sections = initializeProjectSections('proj-1')

  // Add sample line items
  const items: LineItem[] = [
    {
      id: 'item-1',
      section_id: sections[0].id,
      project_id: 'proj-1',
      item_name: 'Antinox HD Floor Protection',
      description: 'Protective covering for floors',
      category: 'MTL',
      length: 0,
      width: 0,
      quantity: 25,
      uom: 'Each',
      unit_rate: 4.16,
      waste_factor: 0.1,
      hours_per_unit: 0,
      hourly_rate: 30.63,
      markup_percentage: 35,
      labor_markup_percentage: 100,
      material_cost: 114.40,
      labor_cost: 0,
      line_total: 114.40,
      is_optional: false,
      is_active: true,
      display_order: 1,
    },
    {
      id: 'item-2',
      section_id: sections[0].id,
      project_id: 'proj-1',
      item_name: 'Removal of stud walls etc',
      description: 'Strip plaster and studwork',
      category: 'LBR',
      length: 0,
      width: 0,
      quantity: 32,
      uom: 'M2',
      unit_rate: 0,
      waste_factor: 0.1,
      hours_per_unit: 0.4,
      hourly_rate: 30.63,
      markup_percentage: 35,
      labor_markup_percentage: 100,
      material_cost: 0,
      labor_cost: 785.41,
      line_total: 785.41,
      is_optional: false,
      is_active: true,
      display_order: 2,
    },
    {
      id: 'item-3',
      section_id: sections[0].id,
      project_id: 'proj-1',
      item_name: 'Disposal via licensed transfer',
      description: 'Waste removal',
      category: 'Other',
      length: 0,
      width: 0,
      quantity: 12,
      uom: 'Bags',
      unit_rate: 40,
      waste_factor: 0.1,
      hours_per_unit: 0,
      hourly_rate: 30.63,
      markup_percentage: 35,
      labor_markup_percentage: 100,
      material_cost: 528,
      labor_cost: 0,
      line_total: 528,
      is_optional: false,
      is_active: true,
      display_order: 3,
    },
    {
      id: 'item-4',
      section_id: sections[1].id,
      project_id: 'proj-1',
      item_name: 'DPC Installation - Traditional',
      description: 'Creamline 8 DPC injection',
      category: 'MTL',
      length: 8,
      width: 0.15,
      quantity: 0,
      uom: 'LM',
      unit_rate: 13.93,
      waste_factor: 0.1,
      hours_per_unit: 0.35,
      hourly_rate: 30.63,
      markup_percentage: 35,
      labor_markup_percentage: 100,
      material_cost: 183.44,
      labor_cost: 271.18,
      line_total: 454.62,
      is_optional: false,
      is_active: true,
      display_order: 1,
    },
    {
      id: 'item-5',
      section_id: sections[2].id,
      project_id: 'proj-1',
      item_name: 'Wall membrane CM3 - 1.2m',
      description: 'Wykamol mesh membrane',
      category: 'MTL',
      length: 6.5,
      width: 1.2,
      quantity: 0,
      uom: 'M2',
      unit_rate: 18.35,
      waste_factor: 0.1,
      hours_per_unit: 0.3,
      hourly_rate: 30.63,
      markup_percentage: 35,
      labor_markup_percentage: 100,
      material_cost: 157.79,
      labor_cost: 191.44,
      line_total: 349.23,
      is_optional: false,
      is_active: true,
      display_order: 1,
    },
  ]
  saveLineItems(items)

  // Sample photos
  const photos: Photo[] = [
    { id: 'ph-1', project_id: 'proj-1', file_name: 'IMG_001.jpg', description: 'Rising damp on north wall', category: 'damp_evidence', created_at: '2026-02-05T10:30:00Z' },
    { id: 'ph-2', project_id: 'proj-1', file_name: 'IMG_002.jpg', description: 'Salt crystallisation detail', category: 'damp_evidence', created_at: '2026-02-05T10:35:00Z' },
    { id: 'ph-3', project_id: 'proj-1', file_name: 'IMG_003.jpg', description: 'Full room view', category: 'general', created_at: '2026-02-05T10:40:00Z' },
  ]
  savePhotos(photos)

  // Sample rooms
  const rooms: SurveyRoom[] = [
    {
      id: 'room-1',
      project_id: 'proj-1',
      name: 'Living Room',
      room_type: 'living_room',
      floor_level: 'ground',
      order: 1,
      findings: 'Rising damp to north wall up to 1.2m. Visible tide marks and salt crystallisation.',
      recommendations: 'Install physical DPC and replaster with renovating plaster system.',
      moisture_readings: [
        { location: 'North wall - low', reading: 18 },
        { location: 'North wall - mid', reading: 22 },
        { location: 'North wall - high', reading: 19 },
      ],
      photos: ['photo1.jpg', 'photo2.jpg'],
      defects: [
        { type: 'rising_damp', severity: 4, location: 'North wall up to 1.2m', notes: 'Visible tide marks and salt crystallisation' },
      ],
      created_at: '2026-02-05T10:00:00Z',
    },
    {
      id: 'room-2',
      project_id: 'proj-1',
      name: 'Hallway',
      room_type: 'hallway',
      floor_level: 'ground',
      order: 2,
      findings: 'Minor damp staining to external wall. Early stage salt crystallisation.',
      recommendations: 'Monitor and consider DPC installation.',
      moisture_readings: [{ location: 'External wall', reading: 12 }],
      photos: [],
      defects: [],
      created_at: '2026-02-05T10:15:00Z',
    },
  ]
  localStorage.setItem('tyne-tees-rooms', JSON.stringify(rooms))
}

// Clear all data
export function clearAllData(): void {
  if (typeof window === 'undefined') return
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
}
