'use client'

import { useState, useEffect } from 'react'
import { List, ChevronDown } from 'lucide-react'

interface Section {
  id: string
  label: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const linkList = (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
            activeId === section.id
              ? 'text-blue-300 bg-blue-500/10'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="section-card p-4">
            <div className="flex items-center gap-2 mb-3 text-white/60">
              <List className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Contents</span>
            </div>
            {linkList}
          </div>
        </div>
      </div>

      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="section-card w-full p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-white/60">
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">Contents</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && (
          <div className="section-card mt-1 p-3">
            {linkList}
          </div>
        )}
      </div>
    </>
  )
}
