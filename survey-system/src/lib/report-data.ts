// =============================================================================
// Report Data Layer — Database operations for survey reports
// CRUD operations for the survey_reports table
// =============================================================================

import { getSupabase } from './supabase-client'
import type { SurveyReport, ReportStatus } from '@/types/survey-report.types'

// =============================================================================
// Save Report
// =============================================================================

/**
 * Save a report to the database (insert or update)
 */
export async function saveReport(
  report: SurveyReport
): Promise<SurveyReport> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Check if report exists
  const { data: existing } = await supabase
    .from('survey_reports')
    .select('id')
    .eq('id', report.id)
    .single()

  if (existing) {
    // Update existing report
    const { error } = await supabase
      .from('survey_reports')
      .update({
        template_id: report.template_id,
        status: report.status,
        sections: report.sections as any,
        reviewed_by: report.reviewed_by,
        finalised_at: report.finalised_at,
        updated_at: new Date().toISOString(),
      })
      .eq('id', report.id)

    if (error) {
      throw new Error(`Failed to update report: ${error.message}`)
    }
  } else {
    // Insert new report
    const { error } = await supabase.from('survey_reports').insert({
      id: report.id,
      survey_id: report.survey_id,
      template_id: report.template_id,
      status: report.status,
      sections: report.sections as any,
      generated_at: report.generated_at,
      reviewed_by: report.reviewed_by,
      finalised_at: report.finalised_at,
      created_at: report.created_at || new Date().toISOString(),
      updated_at: report.updated_at || new Date().toISOString(),
    })

    if (error) {
      throw new Error(`Failed to insert report: ${error.message}`)
    }
  }

  return report
}

// =============================================================================
// Load Report
// =============================================================================

/**
 * Load a report by ID
 */
export async function loadReport(
  reportId: string
): Promise<SurveyReport | null> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    throw new Error(`Failed to load report: ${error.message}`)
  }

  return data as SurveyReport
}

/**
 * Load a report by survey ID (returns most recent if multiple)
 */
export async function loadReportBySurvey(
  surveyId: string
): Promise<SurveyReport | null> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    throw new Error(`Failed to load report: ${error.message}`)
  }

  return data as SurveyReport
}

/**
 * Load all reports for a survey (sorted by created_at desc)
 */
export async function loadReportsBySurvey(
  surveyId: string
): Promise<SurveyReport[]> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { data, error } = await supabase
    .from('survey_reports')
    .select('*')
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to load reports: ${error.message}`)
  }

  return (data || []) as SurveyReport[]
}

// =============================================================================
// Update Report Section
// =============================================================================

/**
 * Update a single section's content
 * Sets is_edited = true and preserves original_content for audit trail
 */
export async function updateReportSection(
  reportId: string,
  sectionKey: string,
  content: string
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Load current report
  const report = await loadReport(reportId)
  if (!report) {
    throw new Error(`Report not found: ${reportId}`)
  }

  // Find and update the section
  const updatedSections = report.sections.map((section) => {
    if (section.key === sectionKey) {
      return {
        ...section,
        content,
        is_edited: true,
        original_content: section.original_content || section.content, // Preserve original
      }
    }
    return section
  })

  // Save updated report
  const { error } = await supabase
    .from('survey_reports')
    .update({
      sections: updatedSections as any,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)

  if (error) {
    throw new Error(`Failed to update report section: ${error.message}`)
  }
}

// =============================================================================
// Update Report Status
// =============================================================================

/**
 * Update report status (draft → generated → reviewed → finalised)
 */
export async function updateReportStatus(
  reportId: string,
  status: ReportStatus,
  reviewedBy?: string
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === 'reviewed' && reviewedBy) {
    updates.reviewed_by = reviewedBy
  }

  if (status === 'finalised') {
    updates.finalised_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('survey_reports')
    .update(updates)
    .eq('id', reportId)

  if (error) {
    throw new Error(`Failed to update report status: ${error.message}`)
  }
}

// =============================================================================
// Delete Report
// =============================================================================

/**
 * Delete a report by ID
 */
export async function deleteReport(reportId: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  const { error } = await supabase
    .from('survey_reports')
    .delete()
    .eq('id', reportId)

  if (error) {
    throw new Error(`Failed to delete report: ${error.message}`)
  }
}

// =============================================================================
// List Reports (for admin dashboard)
// =============================================================================

/**
 * List all reports with optional filters
 */
export async function listReports(filters?: {
  status?: ReportStatus
  surveyType?: string
  limit?: number
}): Promise<SurveyReport[]> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  let query = supabase
    .from('survey_reports')
    .select('*, surveys!inner(survey_type)')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.surveyType) {
    query = query.eq('surveys.survey_type', filters.surveyType)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to list reports: ${error.message}`)
  }

  return (data || []) as SurveyReport[]
}
