'use client'
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
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(0); // Initially first card is expanded

  useEffect(() => {
    // Set initial state - first card expanded
    if (cardRefs.current[0]) {
      const initialExpandedProps = orientation === 'horizontal' 
        ? { width: expandedSize, force3D: true }
        : { height: expandedSize, force3D: true };
      
      gsap.set(cardRefs.current[0], initialExpandedProps);
      gsap.set(contentRefs.current[0], { 
        scale: 1.05,
        force3D: true
      });
    }
    
    // Set other cards to collapsed state
    cardRefs.current.forEach((card, index) => {
      if (index !== 0 && card) {
        const initialCollapsedProps = orientation === 'horizontal'
          ? { width: collapsedSize, force3D: true }
          : { height: collapsedSize, force3D: true };
        
        gsap.set(card, initialCollapsedProps);
        gsap.set(contentRefs.current[index], { 
          scale: 1,
          force3D: true
        });
      }
    });
  }, [orientation, expandedSize, collapsedSize]);

  const handleMouseEnter = (index: number) => {
    if (index === expandedIndex) return; // Already expanded
    
    // Create a timeline for simultaneous animations
    const tl = gsap.timeline();
    
    // Define animation properties based on orientation
    const collapseProps = orientation === 'horizontal'
      ? { width: collapsedSize, duration: 0.35, ease: 'power3.out', force3D: true }
      : { height: collapsedSize, duration: 0.35, ease: 'power3.out', force3D: true };
    
    const expandProps = orientation === 'horizontal'
      ? { width: expandedSize, duration: 0.35, ease: 'power3.out', force3D: true }
      : { height: expandedSize, duration: 0.35, ease: 'power3.out', force3D: true };
    
    // Animate both collapse and expand simultaneously for smoother transition
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
    }, 0.05); // Minimal delay for content scaling
    
    setExpandedIndex(index);
  };

  // Dynamic styles based on orientation
  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center justify-center relative gap-1'
    : 'flex flex-col items-center justify-center relative gap-1';

  const getCardStyle = (index: number) => {
    const baseStyle = {
      willChange: orientation === 'horizontal' ? 'width, transform' : 'height, transform',
      backfaceVisibility: 'hidden' as const,
      perspective: 1000
    };

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

  const getOriginClass = (index: number) => {
    if (orientation === 'horizontal') {
      return index === 0 ? 'origin-left' : 'origin-right';
    } else {
      return index === 0 ? 'origin-top' : 'origin-bottom';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={containerClass}>
        {data.map((item, index) => (
          <div 
            key={index} 
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className={`relative rounded-4xl overflow-hidden cursor-pointer ${getOriginClass(index)} ${cardClassName}`}
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
              <div className="absolute inset-0  flex items-center justify-center">
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


export { OnHoverExpand }
