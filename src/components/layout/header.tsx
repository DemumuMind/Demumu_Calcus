'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Calculator, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchBox } from '@/components/search/search-box';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/lib/categories';
import { useState } from 'react';

function CategoryItem({ category, isMobile = false }: { category: typeof categories[0]; isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors text-left"
        >
          <span onClick={(e) => handleClick(e, `/${category.slug}`)} className="flex-1 cursor-pointer">
            {category.title}
          </span>
          {category.subcategories.length > 0 && (
            isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </button>
        {isOpen && category.subcategories.length > 0 && (
          <div className="ml-4 flex flex-col border-l pl-2 animate-in slide-in-from-top-2 duration-200">
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
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link
          href={`/${category.slug}`}
          className="flex-1 rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
        >
          {category.title}
        </Link>
        {category.subcategories.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-3 hover:bg-accent rounded-lg transition-colors"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
      </div>
      {isOpen && category.subcategories.length > 0 && (
        <div className="ml-4 flex flex-col border-l pl-2 animate-in slide-in-from-top-2 duration-200">
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
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Calculator className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold uppercase tracking-tight">
            CALCUS.CLONE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <SearchBox variant="icon" />
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
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Категории</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2 pb-8">
                <Link
                  href="/"
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Главная
                </Link>
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <SearchBox variant="icon" />
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
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2 pb-20">
                <Link
                  href="/"
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Главная
                </Link>
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} isMobile />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
