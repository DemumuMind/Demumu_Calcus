'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calculator, ArrowRightLeft, Heart } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Главная' },
    { href: '/nauka-i-ucheba', icon: Calculator, label: 'Кальк.' },
    { href: '/konvertery', icon: ArrowRightLeft, label: 'Конв.' },
    { href: '/zdorove-i-krasota', icon: Heart, label: 'Здоровье' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs ${
              pathname === href || pathname.startsWith(href + '/')
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
