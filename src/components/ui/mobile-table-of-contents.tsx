"use client"

import { useEffect, useState } from "react"

interface Section {
  id: string
  title: string
}

interface MobileTableOfContentsProps {
  sections: Section[]
}

export function MobileTableOfContents({ sections }: MobileTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0
      }
    )

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sections])

  return (
    <details className="border rounded-lg">
      <summary className="p-4 cursor-pointer font-medium hover:bg-muted/50 transition-colors">
        Table of Contents
      </summary>
      <div className="p-4 pt-0 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`block py-2 px-3 text-sm hover:text-foreground rounded-md transition-colors text-left w-full ${
              activeSection === section.id
                ? 'text-green-500 font-medium border-l-2 border-green-500'
                : 'text-muted-foreground'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </details>
  )
}