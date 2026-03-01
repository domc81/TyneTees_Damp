// =============================================================================
// ReportHeader — sticky top bar with company branding
// Full-width blue bar, white text. Hidden on print.
// =============================================================================

interface ReportHeaderProps {
  company: {
    name: string
    phone: string
    email: string
    website: string
  }
}

export function ReportHeader({ company }: ReportHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E40AF] shadow-md print:hidden">
      <div className="mx-auto max-w-[880px] px-6 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-bold text-base leading-tight">
            {company.name}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-blue-100 text-xs">{company.phone}</p>
          <p className="text-blue-200 text-xs">{company.email}</p>
        </div>
      </div>
    </header>
  )
}
