// =============================================================================
// Photos ZIP — GET /api/surveys/[id]/photos-zip
//
// Server-side endpoint that bundles all survey photos and sketch plans into a
// ZIP file for the Contractor Foreman handover pack.
//
// Authenticated — admin/office role required.
// Uses service role client to bypass RLS for storage access.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import JSZip from 'jszip'
import type { SurveyPhoto } from '@/types/survey-photo.types'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const surveyId = params.id

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!profile || !['admin', 'office'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden — admin or office role required' }, { status: 403 })
  }

  // Load survey for photos metadata and project number
  const { data: survey, error: surveyErr } = await supabase
    .from('surveys')
    .select('project_number, survey_data')
    .eq('id', surveyId)
    .single()

  if (surveyErr || !survey) {
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 })
  }

  const surveyData = survey.survey_data as Record<string, unknown> | null
  const photos = (surveyData?.photos || []) as SurveyPhoto[]

  // Also list sketch files from storage
  const { data: sketchFiles } = await supabase.storage
    .from('survey-photos')
    .list(`${surveyId}/sketch`, { limit: 100 })

  const sketchPaths = (sketchFiles || [])
    .filter(f => f.name && !f.name.startsWith('.'))
    .map(f => ({
      storagePath: `${surveyId}/sketch/${f.name}`,
      fileName: f.name,
    }))

  if (photos.length === 0 && sketchPaths.length === 0) {
    return NextResponse.json({ error: 'No photos or sketches found for this survey' }, { status: 404 })
  }

  // Build ZIP
  const zip = new JSZip()

  // Add survey photos organized by step
  const photoFolder = zip.folder('survey_photos')!
  const usedNames = new Map<string, number>()

  for (const photo of photos) {
    if (!photo.storage_path) continue

    try {
      const { data: blob, error: dlErr } = await supabase.storage
        .from('survey-photos')
        .download(photo.storage_path)

      if (dlErr || !blob) continue

      // Organize by step folder
      const stepFolder = photo.step || 'other'
      const folder = photoFolder.folder(stepFolder)!

      // Generate unique filename
      let baseName = photo.file_name || `photo-${photo.id}`
      const nameKey = `${stepFolder}/${baseName}`
      const count = usedNames.get(nameKey) || 0
      if (count > 0) {
        const ext = baseName.lastIndexOf('.') > 0 ? baseName.slice(baseName.lastIndexOf('.')) : ''
        const stem = baseName.lastIndexOf('.') > 0 ? baseName.slice(0, baseName.lastIndexOf('.')) : baseName
        baseName = `${stem}_${count}${ext}`
      }
      usedNames.set(nameKey, count + 1)

      const arrayBuffer = await blob.arrayBuffer()
      folder.file(baseName, arrayBuffer)
    } catch {
      // Skip individual photo errors — don't fail the whole zip
      console.error(`Failed to download photo: ${photo.storage_path}`)
    }
  }

  // Add sketch plans
  if (sketchPaths.length > 0) {
    const sketchFolder = zip.folder('sketch_plans')!

    for (const sketch of sketchPaths) {
      try {
        const { data: blob, error: dlErr } = await supabase.storage
          .from('survey-photos')
          .download(sketch.storagePath)

        if (dlErr || !blob) continue

        const arrayBuffer = await blob.arrayBuffer()
        sketchFolder.file(sketch.fileName, arrayBuffer)
      } catch {
        console.error(`Failed to download sketch: ${sketch.storagePath}`)
      }
    }
  }

  // Generate zip buffer
  const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })

  const filename = `Photos-${survey.project_number || surveyId}.zip`

  return new NextResponse(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': zipBuffer.byteLength.toString(),
    },
  })
}
