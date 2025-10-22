'use client';


import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        On This Page
      </h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`block py-2 px-3 text-sm hover:text-foreground rounded-md transition-colors text-left w-full ${
              activeSection === section.id
                ? 'text-green-500 font-medium'
                : 'text-muted-foreground'
            }`}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}