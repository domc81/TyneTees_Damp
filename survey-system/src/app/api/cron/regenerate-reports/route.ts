// =============================================================================
// Temporary API Route — Regenerate All Reports
// One-shot route to regenerate existing reports with updated template/formatting.
// Protected by CRON_SECRET. DELETE THIS ROUTE after use.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateCronSecret } from '@/lib/cron-auth'
import { generateReport } from '@/lib/report-generator'
import { setSupabaseOverride } from '@/lib/supabase-client'

export const maxDuration = 300 // 5 minutes max

export async function POST(request: NextRequest) {
  if (!validateCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Supabase credentials not configured' },
      { status: 500 }
    )
  }

  // Create a service-role client that bypasses RLS
  const serviceClient = createClient(supabaseUrl, serviceRoleKey) as any

  // Load all existing reports
  const { data: existingReports, error: loadError } = await serviceClient
    .from('survey_reports')
    .select('id, survey_id, status, publish_token, view_count, first_viewed_at, last_viewed_at, sections')
    .order('created_at')

  if (loadError) {
    return NextResponse.json(
      { error: `Failed to load reports: ${loadError.message}` },
      { status: 500 }
    )
  }

  const results: { survey_id: string; status: string; ok: boolean; error?: string }[] = []

  // Inject the service-role client into the module singleton
  setSupabaseOverride(serviceClient)

  try {
    for (const existing of existingReports) {
      try {
        // Preserve the executive_summary from the old report (it was LLM-generated
        // and may have been manually edited — we don't want to re-generate it)
        const oldSections = (existing.sections || []) as any[]
        const oldExecSummary = oldSections.find((s: any) => s.key === 'executive_summary')

        // Preserve any user-edited sections (sections where content differs from original_content)
        const editedSections = new Map<string, any>()
        for (const s of oldSections) {
          if (s.original_content && s.content !== s.original_content) {
            editedSections.set(s.key, { content: s.content, original_content: s.original_content })
          }
        }

        // Generate new report (creates a NEW row in survey_reports)
        const newReport = await generateReport(existing.survey_id, serviceClient)

        // Merge: replace exec summary with preserved version, restore edits
        const mergedSections = newReport.sections.map((section: any) => {
          if (section.key === 'executive_summary' && oldExecSummary) {
            return {
              ...section,
              content: oldExecSummary.content,
              original_content: oldExecSummary.original_content || oldExecSummary.content,
            }
          }
          const edited = editedSections.get(section.key)
          if (edited) {
            return {
              ...section,
              content: edited.content,
              original_content: section.content, // new generated content becomes the "original"
            }
          }
          return section
        })

        // Update the OLD report record with new sections, preserving all metadata
        const { error: updateError } = await serviceClient
          .from('survey_reports')
          .update({
            sections: mergedSections,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)

        // Delete the newly-created report (we only needed its sections)
        await serviceClient
          .from('survey_reports')
          .delete()
          .eq('id', newReport.id)

        if (updateError) {
          results.push({
            survey_id: existing.survey_id,
            status: existing.status,
            ok: false,
            error: updateError.message,
          })
        } else {
          results.push({
            survey_id: existing.survey_id,
            status: existing.status,
            ok: true,
          })
        }
      } catch (err: any) {
        results.push({
          survey_id: existing.survey_id,
          status: existing.status,
          ok: false,
          error: err.message,
        })
      }
    }
  } finally {
    // Reset the module singleton so normal browser-client usage resumes
    setSupabaseOverride(null)
  }

  const succeeded = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok).length

  return NextResponse.json({
    total: results.length,
    succeeded,
    failed,
    results,
  })
}
