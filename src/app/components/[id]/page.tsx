import { notFound } from 'next/navigation';
import { getComponentById } from '@/lib/components';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/code-block';
import { TableOfContents } from "@/components/ui/table-of-contents"
import { MobileTableOfContents } from "@/components/ui/mobile-table-of-contents"
import { OnHoverExpand } from '@/components/ui/hover-effects/on-hover-expand';
import { onHoverExpandData } from '@/data/components/hover-effects/on-hover-expand-data';
import { Star } from 'lucide-react';

interface ComponentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { id } = await params;
  const component = getComponentById(id);

  if (!component) {
    notFound();
  }

  // For demo purposes, we'll render the OnHoverExpand component
  // In a real app, you'd have a dynamic component renderer
  const renderComponent = () => {
    if (id === 'on-hover-expand') {
      return (
        <div className="space-y-8 w-full">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
            <div className="w-full overflow-x-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="min-w-[600px] w-full flex justify-center">
                <OnHoverExpand
                  data={onHoverExpandData}
                  orientation="horizontal"
                  className="w-full max-w-4xl"
                  cardClassName="bg-card border rounded-lg shadow-sm"
                  expandedSize="300px"
                  collapsedSize="80px"
                  cardHeight="240px"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Vertical Layout</h3>
            <div className="w-full flex justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="w-full max-w-xs">
                <OnHoverExpand
                  data={onHoverExpandData.slice(0, 4)}
                  orientation="vertical"
                  className="w-full"
                  cardClassName="bg-card border rounded-lg shadow-sm"
                  expandedSize="200px"
                  collapsedSize="60px"
                  cardWidth="280px"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (id === 'badge') {
      return (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
            <div className="flex items-center gap-2">
              <Badge>Default</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">With Icons</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
              <Badge variant="secondary">New</Badge>
              <Badge variant="destructive">99+</Badge>
            </div>
          </div>
        </div>
      );
    }
    
    return <div>Component preview not available</div>;
  };

  // Dynamic installation code based on component dependencies
  const installationCode = component.installation?.code || 
    `npm install ${component.dependencies.join(' ')}
# or
yarn add ${component.dependencies.join(' ')}`;

  // Dynamic usage code from component metadata
  const usageCode = component.usage?.code || 
    `import { ${component.name} } from '@/components/ui/${component.id}';

export function Example() {
  return (
    <${component.name} />
  );
}`;

  const componentCode = `'use client'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CardData {
  src: StaticImageData;
  alt: string;
  code: string;
}

interface OnHoverExpandProps {
  data: CardData[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  cardClassName?: string;
  cardHeight?: string;
  cardWidth?: string;
  expandedSize?: string;
  collapsedSize?: string;
}

function OnHoverExpand({ 
  data, 
  orientation = 'horizontal',
  className = '',
  cardClassName = '',
  cardHeight = '400px',
  cardWidth = '5vw',
  expandedSize = '20vw',
  collapsedSize = '5vw'
}: OnHoverExpandProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerClass = orientation === 'horizontal' 
    ? 'flex flex-row gap-2' 
    : 'flex flex-col gap-2';

  const baseStyle = {
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'width, height',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px'
  };

  const getCardStyle = (index: number) => {
    if (orientation === 'horizontal') {
      return {
        ...baseStyle,
        height: cardHeight,
        width: index === 0 ? expandedSize : collapsedSize,
        transformOrigin: index === 0 ? 'left center' : 'right center'
      };
    } else {
      return {
        ...baseStyle,
        width: cardWidth,
        height: index === 0 ? expandedSize : collapsedSize,
        transformOrigin: index === 0 ? 'top center' : 'bottom center'
      };
    }
  };

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card && contentRefs.current[index]) {
        gsap.set(card, {
          width: index === 0 ? expandedSize : collapsedSize,
          height: orientation === 'horizontal' ? cardHeight : (index === 0 ? expandedSize : collapsedSize),
          force3D: true
        });
        
        gsap.set(contentRefs.current[index], {
          scale: index === 0 ? 1.05 : 1,
          force3D: true
        });
      }
    });
  }, [orientation, expandedSize, collapsedSize]);

  const handleMouseEnter = (index: number) => {
    if (index === expandedIndex) return;
    
    const tl = gsap.timeline();
    
    const collapseProps = orientation === 'horizontal'
      ? { width: collapsedSize, duration: 0.35, ease: 'power3.out', force3D: true }
      : { height: collapsedSize, duration: 0.35, ease: 'power3.out', force3D: true };
    
    const expandProps = orientation === 'horizontal'
      ? { width: expandedSize, duration: 0.35, ease: 'power3.out', force3D: true }
      : { height: expandedSize, duration: 0.35, ease: 'power3.out', force3D: true };
    
    tl.to(cardRefs.current[expandedIndex], collapseProps, 0)
    .to(contentRefs.current[expandedIndex], {
      scale: 1,
      duration: 0.25,
      ease: 'power3.out',
      force3D: true
    }, 0)
    .to(cardRefs.current[index], expandProps, 0)
    .to(contentRefs.current[index], {
      scale: 1.05,
      duration: 0.25,
      ease: 'power3.out',
      force3D: true
    }, 0.05);
    
    setExpandedIndex(index);
  };

  const getOriginClass = (index: number) => {
    if (orientation === 'horizontal') {
      return index === 0 ? 'origin-left' : 'origin-right';
    } else {
      return index === 0 ? 'origin-top' : 'origin-bottom';
    }
  };

  return (
    <div className={\`flex flex-col items-center justify-center \${className}\`}>
      <div className={containerClass}>
        {data.map((item, index) => (
          <div 
            key={index} 
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className={\`relative rounded-4xl overflow-hidden cursor-pointer \${getOriginClass(index)} \${cardClassName}\`}
            style={getCardStyle(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <div 
              ref={(el) => {
                if (el) contentRefs.current[index] = el;
              }}
              className="relative w-full h-full"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                className="rounded-4xl object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
                  {item.code}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { OnHoverExpand }`;

  const sections = [
    { id: 'preview', title: 'Preview' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'component-code', title: 'Component Code' },
    { id: 'props', title: 'Props' },
    { id: 'examples', title: 'Examples' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen w-full max-w-full">
      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden w-full max-w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{component.name}</h1>
            <Badge variant={component.difficulty === 'beginner' ? 'default' : component.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
              {component.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-4 leading-relaxed">{component.description}</p>
          <div className="flex flex-wrap gap-2">
            {component.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs sm:text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mobile Table of Contents */}
        <div className="lg:hidden mb-6 sm:mb-8">
          <MobileTableOfContents sections={sections} />
        </div>

          {/* Scrollable Sections */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full max-w-full">
        {/* Preview Section */}
        <section id="preview" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Preview</h2>
          <div className="border rounded-lg p-3 sm:p-4 lg:p-6 bg-background overflow-x-hidden w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto">
              {renderComponent()}
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section id="installation" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Installation</h2>
          <div className="w-full max-w-full">
            <CodeBlock
              code={installationCode}
              language="bash"
              title="Installation"
              className="border rounded-lg overflow-hidden"
            />
          </div>
        </section>

        {/* Usage Section */}
        <section id="usage" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Usage</h2>
          <div className="w-full max-w-full">
            <CodeBlock
              code={usageCode}
              language={component.usage?.language || "tsx"}
              title="Basic Usage"
              className="border rounded-lg overflow-hidden"
            />
          </div>
        </section>

        {/* Component Code Section */}
        <section id="component-code" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Component Code</h2>
          <div className="w-full max-w-full">
            <CodeBlock
              code={componentCode}
              language="tsx"
              title="OnHoverExpand Component"
              className="border rounded-lg overflow-hidden"
            />
          </div>
        </section>

        {/* Props Section */}
        <section id="props" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Props</h2>
          <div className="border rounded-lg overflow-hidden w-full max-w-full">
            <div className="overflow-x-auto w-full max-w-full">
              <table className="w-full min-w-[500px] sm:min-w-[600px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-xs sm:text-sm">Prop</th>
                    <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-xs sm:text-sm">Type</th>
                    <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-xs sm:text-sm">Default</th>
                    <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-xs sm:text-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {component.props.map((prop, index) => (
                    <tr key={prop.name} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                      <td className="p-2 sm:p-3 lg:p-4 font-mono text-xs break-all">{prop.name}</td>
                      <td className="p-2 sm:p-3 lg:p-4 font-mono text-xs text-muted-foreground break-all">{prop.type}</td>
                      <td className="p-2 sm:p-3 lg:p-4 font-mono text-xs text-muted-foreground break-all">
                        {prop.default || '-'}
                      </td>
                      <td className="p-2 sm:p-3 lg:p-4 text-xs sm:text-sm break-words">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Examples</h2>
          <div className="space-y-6 sm:space-y-8 w-full max-w-full">
            {component.examples.map((example, index) => (
              <div key={index} className="w-full max-w-full">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 break-words">{example.name}</h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">{example.description}</p>
                <div className="w-full max-w-full">
                  <CodeBlock
                    code={example.code}
                    language="tsx"
                    title={example.name}
                    className="border rounded-lg overflow-hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
          </div>
        </main>

        {/* Desktop Table of Contents */}
         <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 border-l pl-4 lg:pl-6 xl:pl-8">
           <div className="sticky top-8 overflow-y-auto max-h-[calc(100vh-8rem)]">
             <TableOfContents sections={sections} />
           </div>
         </aside>
       </div>
  );
}