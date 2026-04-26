'use client';

import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  slot: string;
  className?: string;
  size?: 'banner' | 'rectangle' | 'skyscraper' | 'leaderboard';
}

export function AdPlaceholder({ slot, className, size = 'rectangle' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'w-full h-[90px]',
    rectangle: 'w-full max-w-[300px] h-[250px] mx-auto',
    skyscraper: 'hidden lg:block w-[160px] h-[600px]',
    leaderboard: 'w-full h-[90px]',
  };

  return (
    <div className={cn('bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground my-4', sizeClasses[size], className)}>
      <span>Реклама ({slot})</span>
    </div>
  );
}
