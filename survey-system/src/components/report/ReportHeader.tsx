// =============================================================================
// ReportHeader — sticky top bar with company branding + regional contact
// Dark navy bar, white text. Hidden on print.
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
    <header className="sticky top-0 z-50 w-full bg-[#09283f] shadow-md print:hidden">
      <div className="mx-auto max-w-[880px] px-6 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-bold text-base leading-tight">
            {company.name}
          </p>
          <p className="text-[#7fb4cc] text-[11px] hidden sm:block">
            Registered Office: High Street East, Wallsend, NE28 7AT
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[#d8e7ef] text-xs">Tyneside 0191 814 1613 · Wearside 0191 500 1097</p>
          <p className="text-[#7fb4cc] text-[11px]">Northumberland 01434 303 725 · Durham 0191 300 3625</p>
        </div>
      </div>
    </header>
  )
}
