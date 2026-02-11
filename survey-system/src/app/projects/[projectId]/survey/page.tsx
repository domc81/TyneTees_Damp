'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import StructuredSurveyForm from '@/components/structured-survey-form'
import { getProject } from '@/lib/store'
import type { Project } from '@/types/database.types'

export default function StructuredSurveyPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const proj = getProject(params.projectId as string)
    if (proj) {
      setProject(proj)
    }
    setIsLoading(false)
  }, [params.projectId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">Project not found</h2>
          <a href="/projects" className="btn-primary mt-4 inline-block">
            Back to Projects
          </a>
        </div>
      </div>
    )
  }

  return <StructuredSurveyForm project={project} />
}
