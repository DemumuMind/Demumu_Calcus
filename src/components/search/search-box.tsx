'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, X, ArrowRight, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calculators } from '@/lib/calculators';
import { categories } from '@/lib/categories';
import { getCategoryStyle } from '@/lib/category-styles';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';

export function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const searchResults = useMemo(() => {
    if (!query.trim()) return { calculators: [], categories: [] };
    
    const lowerQuery = query.toLowerCase();
    
    const matchedCalculators = calculators
      .filter(c => 
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 6);
    
    const matchedCategories = categories
      .filter(c => 
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3);
    
    return { calculators: matchedCalculators, categories: matchedCategories };
  }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if (e.key === 'Enter' && searchResults.calculators.length > 0) {
      router.push(`/calc/${searchResults.calculators[0].slug}`);
      setIsOpen(false);
      setQuery('');
    }
  }, [searchResults.calculators, router]);

  const hasResults = searchResults.calculators.length > 0 || searchResults.categories.length > 0;
  const totalCount = calculators.length;

  return (
    <>
      {/* Search Trigger */}
      <div className="relative w-full max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`Поиск среди ${totalCount}+ калькуляторов...`}
            className="h-14 pl-12 pr-4 text-base shadow-sm"
            onFocus={() => setIsOpen(true)}
            readOnly
          />
          <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground md:block">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Поиск калькуляторов</DialogTitle>
          </DialogHeader>
          
          {/* Search Input */}
          <div className="flex items-center border-b px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Введите название калькулятора..."
              className="flex-1 bg-transparent px-4 py-2 text-lg outline-none placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {!query.trim() ? (
              <div className="py-8 text-center text-muted-foreground">
                <Calculator className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>Начните вводить название калькулятора</p>
                <p className="mt-2 text-sm">или категории</p>
              </div>
            ) : !hasResults ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>Ничего не найдено</p>
                <p className="mt-2 text-sm">Попробуйте другой запрос</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Categories */}
                {searchResults.categories.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Категории
                    </p>
                    <div className="space-y-1">
                      {searchResults.categories.map((cat) => {
                        const style = getCategoryStyle(cat.slug);
                        const Icon = style.icon;
                        return (
                          <Link
                            key={cat.id}
                            href={`/${cat.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setQuery('');
                            }}
                            className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bgColor} ${style.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{cat.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{cat.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Calculators */}
                {searchResults.calculators.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Калькуляторы
                    </p>
                    <div className="space-y-1">
                      {searchResults.calculators.map((calc) => {
                        const style = getCategoryStyle(calc.category);
                        return (
                          <Link
                            key={calc.id}
                            href={`/calc/${calc.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setQuery('');
                            }}
                            className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bgColor} ${style.color}`}>
                              <Calculator className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{calc.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{calc.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Нажмите Enter для перехода к первому результату</span>
              <span>Esc для закрытия</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
