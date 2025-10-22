'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Github, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-xl">Mimesis UI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/components" 
              className="text-foreground/60 hover:text-foreground transition-colors font-medium"
            >
              Components
            </Link>
            <Link 
              href="/docs" 
              className="text-foreground/60 hover:text-foreground transition-colors font-medium"
            >
              Documentation
            </Link>
            <Link 
              href="/examples" 
              className="text-foreground/60 hover:text-foreground transition-colors font-medium"
            >
              Examples
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="https://github.com/yourusername/mimesis-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Star className="h-4 w-4" />
              <span>Star</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/components" 
                  className="text-foreground/60 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Components
                </Link>
                <Link 
                  href="/docs" 
                  className="text-foreground/60 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link 
                  href="/examples" 
                  className="text-foreground/60 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Examples
                </Link>
                <div className="flex flex-col space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-sm">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Link
                    href="https://github.com/yourusername/mimesis-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Link>
                  <button 
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Star className="h-4 w-4" />
                    <span>Star</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}