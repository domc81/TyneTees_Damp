'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import StructuredSurveyForm from '@/components/structured-survey-form'
import { getProject as getSupabaseProject } from '@/lib/supabase-data'
import type { Project } from '@/types/database.types'

export default function StructuredSurveyPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        const proj = await getSupabaseProject(params.projectId as string)
        setProject(proj)
      } catch (err) {
        console.error('Error loading project:', err)
        setError('Failed to load project')
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [params.projectId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">
            {error || 'Project not found'}
          </h2>
          <a href="/projects" className="btn-primary mt-4 inline-block">
            Back to Projects
          </a>
        </div>
      </div>
    )
  }

  return <StructuredSurveyForm project={project} />
}
