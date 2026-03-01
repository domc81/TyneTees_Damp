import { redirect } from 'next/navigation'

// Legacy page — surveyor creation is now handled via /admin/team
export default function NewSurveyorPage() {
  redirect('/admin/team')
}
