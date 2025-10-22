'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = 'tsx', 
  title, 
  className,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className={cn("relative group", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-muted text-foreground text-sm leading-relaxed">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-muted-foreground pr-4 text-right min-w-[3rem]">
                  {lines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 border"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}