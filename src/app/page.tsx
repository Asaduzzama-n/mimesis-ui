import Link from 'next/link';
import { ArrowRight, Github, Star, Users, Heart, Code2, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { OnHoverExpand } from "@/components/ui/hover-effects/on-hover-expand";
import { onHoverExpandData } from "@/data/components/hover-effects/on-hover-expand-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="space-y-6">
          <div className=" text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Open Source
                <br />
                <span className="text-muted-foreground">Component Library</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A community-driven collection of beautiful, reusable UI components. 
                Built by developers, for developers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/components"
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 text-lg font-medium transition-all hover:bg-primary/90"
              >
                <span>Browse Components</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/Asaduzzama-n/mimesis-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-foreground px-8 py-4 text-lg font-medium transition-all hover:text-muted-foreground"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code2 className="h-4 w-4" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Interactive Components</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience smooth animations and interactions built with modern web technologies.
              </p>
            </div>
            
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                 <OnHoverExpand 
                   data={onHoverExpandData}
                   orientation="horizontal"
                   className="h-80 min-w-[600px] lg:min-w-0"
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Values Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Built for the Community</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Every component is crafted with care, shared freely, and improved collectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <Heart className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Open Source</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Completely free and open source. No hidden costs, no premium tiers. 
                  Just quality components for everyone.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Community Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built by developers from around the world. Contribute your own components 
                  and help grow the library.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Production Ready</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every component is tested, documented, and ready for production use. 
                  Copy, paste, and ship with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12 sm:space-y-16">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Growing Collection</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From simple buttons to complex animations, discover components that elevate your projects.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">12+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Free</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">MIT</div>
                <div className="text-sm text-muted-foreground">Licensed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* For Users */}
            <div className="text-center lg:text-left space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Start Building</h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse our collection of components and start building beautiful interfaces today. 
                Everything is free and ready to use.
              </p>
              <Link
                href="/components"
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 font-medium transition-all hover:bg-primary/90"
              >
                <span>Browse Components</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* For Contributors */}
            <div className="text-center lg:text-left space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Join the Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a component to share? Contribute to the library and help other developers 
                build amazing experiences.
              </p>
              <Link
                href="https://github.com/your-username/mimesis-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-foreground font-medium transition-all hover:text-muted-foreground"
              >
                <Github className="h-4 w-4" />
                <span>Contribute on GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
