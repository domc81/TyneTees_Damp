// Mock Data Store - For development without Supabase
// Uses localStorage for persistence during development

import type { Project, SurveyType } from '@/types/database.types'

// Survey type icons and labels
export const surveyTypes: Record<SurveyType, { label: string; icon: string; color: string }> = {
  damp: { label: 'Damp Survey', icon: '💧', color: 'text-blue-600' },
  timber: { label: 'Timber Survey', icon: '🪵', color: 'text-amber-600' },
  woodworm: { label: 'Woodworm Survey', icon: '🪲', color: 'text-amber-700' },
  condensation: { label: 'Condensation Survey', icon: '💨', color: 'text-cyan-600' },
}

// Generate next project number
function generateProjectNumber(): string {
  const year = new Date().getFullYear()
  const existing = getProjects()
  const count = existing.length + 1
  return `TT-${year}-${count.toString().padStart(4, '0')}`
}

// Storage key
const STORAGE_KEY = 'tyne-tees-projects'

// Get projects from localStorage
export function getProjects(): Project[] {
  if (typeof window === 'undefined') return []

  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save projects to localStorage
function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

// Create new project
export function createProject(project: Omit<Project, 'id' | 'project_number' | 'created_at' | 'updated_at'>): Project {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    project_number: generateProjectNumber(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  projects.push(newProject)
  saveProjects(projects)

  return newProject
}

// Update project
export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects()
  const index = projects.findIndex(p => p.id === id)

  if (index === -1) return null

  projects[index] = {
    ...projects[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  saveProjects(projects)
  return projects[index]
}

// Get single project
export function getProject(id: string): Project | null {
  const projects = getProjects()
  return projects.find(p => p.id === id) || null
}

// Delete project
export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const filtered = projects.filter(p => p.id !== id)

  if (filtered.length === projects.length) return false

  saveProjects(filtered)
  return true
}

// Initialize with sample data if empty
export function initializeMockData(): void {
  if (typeof window === 'undefined') return

  const existing = getProjects()
  if (existing.length > 0) return

  const sampleProjects: Project[] = [
    {
      id: 'demo-1',
      project_number: 'TT-2026-0001',
      client_name: 'Smith Residence',
      client_email: 'smith@email.com',
      client_phone: '01234 567890',
      site_address: '12 Victoria Street',
      site_city: 'Newcastle upon Tyne',
      site_county: 'Tyne and Wear',
      site_postcode: 'NE1 4LP',
      survey_type: 'damp',
      status: 'in_progress',
      surveyor_id: 'user-1',
      weather_conditions: 'Dry',
      survey_date: '2026-02-05',
      notes: 'Rising damp to ground floor walls',
      internal_reference: 'SMITH-001',
      created_at: '2026-02-04T10:00:00Z',
      updated_at: '2026-02-04T10:00:00Z',
    },
    {
      id: 'demo-2',
      project_number: 'TT-2026-0002',
      client_name: 'Johnson Property',
      client_email: 'johnson@email.com',
      site_address: '45 Riverside Drive',
      site_city: 'Sunderland',
      site_county: 'Tyne and Wear',
      site_postcode: 'SR1 1AB',
      survey_type: 'timber',
      status: 'pending_review',
      survey_date: '2026-02-04',
      created_at: '2026-02-03T14:00:00Z',
      updated_at: '2026-02-03T14:00:00Z',
    },
    {
      id: 'demo-3',
      project_number: 'TT-2026-0003',
      client_name: 'Williams Flat',
      site_address: 'Flat 3, 88 High Street',
      site_city: 'Middlesbrough',
      site_county: 'North Yorkshire',
      site_postcode: 'TS1 1XX',
      survey_type: 'condensation',
      status: 'draft',
      survey_date: '2026-02-03',
      created_at: '2026-02-02T09:00:00Z',
      updated_at: '2026-02-02T09:00:00Z',
    },
  ]

  saveProjects(sampleProjects)
}

// Clear all data (for testing)
export function clearMockData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
