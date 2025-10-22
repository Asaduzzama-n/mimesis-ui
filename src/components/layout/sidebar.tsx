'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { componentRegistry, getAllCategories } from '@/lib/components';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['hover-effects']) // Default expanded category
  );

  const categories = getAllCategories();
  
  const filteredComponents = Object.values(componentRegistry).filter(
    component =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <aside className={cn("w-64 bg-background h-full overflow-x-hidden", className)}>
      <div className="p-4 space-y-4 overflow-x-hidden">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {searchQuery ? (
            // Show filtered results when searching
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">
                Search Results ({filteredComponents.length})
              </h3>
              {filteredComponents.map((component) => (
                <Link
                  key={component.id}
                  href={`/components/${component.id}`}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:text-foreground",
                    pathname === `/components/${component.id}` 
                      ? "text-green-500" 
                      : "text-muted-foreground"
                  )}
                >
                  {pathname === `/components/${component.id}` && (
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  )}
                  <span className={cn(
                    "truncate flex-1 text-left",
                    pathname !== `/components/${component.id}` ? "ml-4" : ""
                  )}>
                    {component.name}
                  </span>
                </Link>
              ))}
              {filteredComponents.length === 0 && (
                <p className="text-sm text-muted-foreground px-3 py-2">
                  No components found.
                </p>
              )}
            </div>
          ) : (
            // Show categorized components when not searching
            categories.map((category) => {
              const categoryComponents = Object.values(componentRegistry).filter(
                component => component.category === category
              );
              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center justify-between w-full px-2 py-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{formatCategoryName(category)}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-2 space-y-1">
                      {categoryComponents.map((component) => (
                        <Link
                          key={component.id}
                          href={`/components/${component.id}`}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:text-foreground",
                            pathname === `/components/${component.id}` 
                              ? "text-green-500" 
                              : "text-muted-foreground"
                          )}
                        >
                          {pathname === `/components/${component.id}` && (
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          )}
                          <span className={cn(
                            "truncate flex-1 text-left",
                            pathname !== `/components/${component.id}` ? "ml-4" : ""
                          )}>
                            {component.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </nav>
      </div>
    </aside>
  );
}