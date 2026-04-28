'use client';

import { useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="mb-8 rounded-xl border bg-card p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 text-left"
      >
        <List className="h-4 w-4 text-primary" />
        <span className="font-semibold">Оглавление</span>
        <ChevronRight
          className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <ol className="mt-3 space-y-1 text-sm">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                <span className="text-xs text-muted-foreground/60 min-w-[20px]">
                  {index + 1}.
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
