import Link from 'next/link';
import { ArrowRight, Zap, MousePointer, RotateCcw, Sparkles, Layers } from 'lucide-react';
import { componentRegistry, getAllCategories, getComponentsByCategory } from '@/lib/components';

export default function ComponentsPage() {
  const categories = getAllCategories();

  const categoryIcons = {
    'hover-effects': MousePointer,
    'animations': Sparkles,
    'transitions': RotateCcw,
    'interactions': Zap,
    'ui-components': Layers,
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Components</h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
          A collection of beautiful, animated components built with GSAP and Framer Motion. 
          Copy the code and customize to fit your needs.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="p-4 sm:p-6 rounded-lg border bg-card">
          <div className="text-xl sm:text-2xl font-bold text-primary">
            {Object.keys(componentRegistry).length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">Total Components</div>
        </div>
        <div className="p-4 sm:p-6 rounded-lg border bg-card">
          <div className="text-xl sm:text-2xl font-bold text-primary">
            {categories.length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="p-4 sm:p-6 rounded-lg border bg-card">
          <div className="text-xl sm:text-2xl font-bold text-primary">100%</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Free & Open Source</div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8 sm:space-y-12">
        {categories.map((category) => {
          const components = getComponentsByCategory(category);
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Sparkles;

          return (
            <section key={category} className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{formatCategoryName(category)}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {components.length} component{components.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {components.map((component) => (
                  <Link
                    key={component.id}
                    href={`/components/${component.id}`}
                    className="group block p-4 sm:p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-2 min-w-0 flex-1">
                          <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                            {component.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {component.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1 min-w-0">
                          {component.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-muted rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {component.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-muted rounded-md">
                              +{component.tags.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <div className={`h-2 w-2 rounded-full ${
                            component.difficulty === 'beginner' ? 'bg-green-500' :
                            component.difficulty === 'intermediate' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                          <span className="text-xs text-muted-foreground capitalize">
                            {component.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No components yet</h3>
          <p className="text-muted-foreground">
            Components are being added regularly. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}