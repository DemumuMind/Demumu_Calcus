'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calculator, ArrowRightLeft, Heart, Timer, ChefHat, Percent, Wallet, Home as HomeIcon, Car, Cpu, Coffee } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/nauka-i-ucheba', icon: Calculator, label: 'Наука' },
  { href: '/konvertery', icon: ArrowRightLeft, label: 'Конв.' },
  { href: '/procenty', icon: Percent, label: '%' },
  { href: '/finansy', icon: Wallet, label: 'Фин.' },
  { href: '/zdorove-i-krasota', icon: Heart, label: 'Здор.' },
  { href: '/stroitelstvo-i-remont', icon: HomeIcon, label: 'Строй.' },
  { href: '/tajmery', icon: Timer, label: 'Тайм.' },
  { href: '/kulinarnye-mery', icon: ChefHat, label: 'Кулин.' },
  { href: '/transport', icon: Car, label: 'Авто' },
  { href: '/tekhnologii', icon: Cpu, label: 'Тех.' },
  { href: '/povsednevnoe', icon: Coffee, label: 'Быт' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden pb-safe">
      <div className="flex overflow-x-auto scrollbar-hide h-16">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 text-xs min-w-[64px] px-2 shrink-0 ${
              pathname === href || pathname.startsWith(href + '/')
                ? 'text-primary border-t-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
