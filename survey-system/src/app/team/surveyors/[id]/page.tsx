import { redirect } from 'next/navigation'

// Legacy page — surveyor details are now managed via /admin/team
export default function SurveyorDetailPage() {
  redirect('/admin/team')
}
