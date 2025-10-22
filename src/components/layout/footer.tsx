import Link from 'next/link';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl text-foreground">Mimesis UI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Beautiful animated components built with GSAP and Framer Motion.
              Free and open source.
            </p>
          </div>

          {/* Components */}
          <div className="space-y-4">
            <h3 className="font-semibold">Components</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/components/hover-effects" className="hover:text-foreground transition-colors">
                  Hover Effects
                </Link>
              </li>
              <li>
                <Link href="/components/animations" className="hover:text-foreground transition-colors">
                  Animations
                </Link>
              </li>
              <li>
                <Link href="/components/transitions" className="hover:text-foreground transition-colors">
                  Transitions
                </Link>
              </li>
              <li>
                <Link href="/components/interactions" className="hover:text-foreground transition-colors">
                  Interactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/getting-started" className="hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link 
                  href="https://github.com/your-username/mimesis-ui" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://twitter.com/mimesis-ui" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link href="/contributing" className="hover:text-foreground transition-colors">
                  Contributing
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Mimesis UI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for the community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}