'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/lib/categories';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Calculator className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold uppercase tracking-tight">
            CALCUS.CLONE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Поиск калькуляторов..."
                  className="w-64"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="h-10 w-10"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Поиск</span>
              </Button>
            )}
          </div>
          
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger
              data-testid="desktop-menu-toggle"
              render={
                <Button variant="outline" size="sm" className="gap-2">
                  Меню
                  <Menu className="h-4 w-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Категории</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                <Link
                  href="/"
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Главная
                </Link>
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-col">
                    <Link
                      href={`/${category.slug}`}
                      className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      {category.title}
                    </Link>
                    <div className="ml-4 flex flex-col border-l pl-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/${category.slug}/${sub.slug}`}
                          className="rounded-lg px-4 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              data-testid="mobile-menu-toggle"
              render={
                <Button variant="outline" size="sm" className="gap-2">
                  Меню
                  <Menu className="h-4 w-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Поиск калькуляторов..."
                    className="w-full"
                  />
                </div>
                <Link
                  href="/"
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Главная
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
