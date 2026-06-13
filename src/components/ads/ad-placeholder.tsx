'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AD_BLOCK_IDS } from '@/lib/ads/config';

// Map legacy slot names to config keys
const SLOT_TO_BLOCK_ID: Record<string, string> = {
  'home-top': AD_BLOCK_IDS.homeTop,
  'home-bottom': AD_BLOCK_IDS.homeBottom,
  'calc-top': AD_BLOCK_IDS.calcTop,
  'calc-bottom': AD_BLOCK_IDS.calcBottom,
  'cat-top': AD_BLOCK_IDS.categoryTop,
  'cat-bottom': AD_BLOCK_IDS.categoryBottom,
  'conv-top': AD_BLOCK_IDS.converterTop,
  'conv-bottom': AD_BLOCK_IDS.converterBottom,
};

interface AdPlaceholderProps {
  slot: string;
  className?: string;
  size?: 'banner' | 'rectangle' | 'skyscraper' | 'leaderboard';
}

interface YandexAdBlockProps {
  blockId: string;
  renderTo: string;
  className?: string;
  size?: 'banner' | 'rectangle' | 'skyscraper' | 'leaderboard';
}


export function YandexAdBlock({ blockId, className, size = 'rectangle' }: Omit<YandexAdBlockProps, 'renderTo'>) {
  const renderTo = `yandex_rtb_${blockId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render ads in production and not in development
    if (process.env.NODE_ENV === 'development') return;

    // Check if yandex Context API is available
    const yaContextCb = (window as Window & { yaContextCb?: Array<() => void> }).yaContextCb;
    if (yaContextCb) {
      yaContextCb.push(() => {
        (window as Window & { Ya?: { Context: { AdvManager: { render: (p: { blockId: string; renderTo: string }) => void } } } }).Ya?.Context.AdvManager.render({
          blockId,
          renderTo,
        });
      });
    }
  }, [blockId, renderTo]);

  const sizeClasses = {
    banner: 'w-full h-[90px]',
    rectangle: 'w-full max-w-[300px] h-[250px] mx-auto',
    skyscraper: 'hidden lg:block w-[160px] h-[600px]',
    leaderboard: 'w-full h-[90px]',
  };

  // In development, show placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={cn('bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground my-4', sizeClasses[size], className)}>
        <span>Реклама Yandex.Direct ({blockId})</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={renderTo}
      className={cn('my-4', sizeClasses[size], className)}
    />
  );
}

export function AdPlaceholder({ slot, className, size = 'rectangle' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'w-full h-[90px]',
    rectangle: 'w-full max-w-[300px] h-[250px] mx-auto',
    skyscraper: 'hidden lg:block w-[160px] h-[600px]',
    leaderboard: 'w-full h-[90px]',
  };

  // In production, render real Yandex ad
  if (process.env.NODE_ENV !== 'development') {
    const blockId = SLOT_TO_BLOCK_ID[slot] || AD_BLOCK_IDS.calcTop;
    return <YandexAdBlock blockId={blockId} className={className} size={size} />;
  }

  return (
    <div className={cn('bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground my-4', sizeClasses[size], className)}>
      <span>Реклама ({slot})</span>
    </div>
  );
}
