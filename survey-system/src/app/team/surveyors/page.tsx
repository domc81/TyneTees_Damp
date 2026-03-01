import { redirect } from 'next/navigation'

// Legacy page — surveyor management is now consolidated into /admin/team
export default function SurveyorsPage() {
  redirect('/admin/team')
}
