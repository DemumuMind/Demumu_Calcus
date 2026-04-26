'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HistoryEntry, getHistory, clearHistory, deleteHistoryEntry } from '@/lib/history';
import { Clock, Trash2, X, Calculator, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 20;

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function summarizeInputs(inputs: Record<string, string | number>): string {
  const entries = Object.entries(inputs);
  if (entries.length === 0) return '';
  const first = entries[0];
  const restCount = entries.length - 1;
  let text = `${first[0]}: ${first[1]}`;
  if (restCount > 0) text += ` (+${restCount})`;
  return text;
}

function summarizeResults(results: Array<{ label: string; value: string | number }>): string {
  if (results.length === 0) return '';
  const first = results[0];
  return `${first.label}: ${first.value}`;
}

export function HistoryPanel() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(() => {
    setEntries(getHistory());
  }, []);

  useEffect(() => {
    if (open) {
      refresh();
    }
  }, [open, refresh]);

  const handleClear = useCallback(() => {
    clearHistory();
    refresh();
  }, [refresh]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteHistoryEntry(id);
      refresh();
    },
    [refresh]
  );

  const visible = useMemo(() => entries.slice(0, visibleCount), [entries, visibleCount]);
  const hasMore = visibleCount < entries.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="История расчётов" className="relative">
            <Clock className="h-4 w-4" />
            <HistoryBadge />
          </Button>
        }
      />
      <SheetContent side="right" className="w-96 sm:max-w-sm flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            История расчётов
          </SheetTitle>
          <SheetDescription>
            Недавние вычисления сохраняются в этом браузере.
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm text-muted-foreground">{entries.length} записей</span>
          {entries.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClear} className="gap-1">
              <Trash2 className="h-3.5 w-3.5" />
              Очистить
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 px-4">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Clock className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">История пуста</p>
              <p className="text-xs mt-1">Выполните расчёт, чтобы сохранить его здесь.</p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {visible.map((entry) => (
                <Card key={entry.id} size="sm" className="group relative">
                  <CardHeader className="pb-0 pr-8">
                    <CardTitle className="text-sm flex items-center gap-1.5">
                      <Calculator className="h-3.5 w-3.5 text-primary" />
                      {entry.calculatorTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Link
                      href={entry.url}
                      onClick={() => setOpen(false)}
                      className="block space-y-1 hover:opacity-80 transition-opacity"
                    >
                      <p className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</p>
                      <p className="text-sm font-medium truncate">
                        {summarizeResults(entry.results)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {summarizeInputs(entry.inputs)}
                      </p>
                      <div className="flex items-center text-xs text-primary pt-1">
                        Перейти <ChevronRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </CardContent>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                    aria-label="Удалить запись"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </Card>
              ))}
              {hasMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Загрузить ещё
                </Button>
              )}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function HistoryBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function update() {
      setCount(getHistory().length);
    }
    update();
    window.addEventListener('storage', update);
    // Custom event for same-tab updates
    window.addEventListener('calcus-history-update', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('calcus-history-update', update);
    };
  }, []);

  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
      {count > 99 ? '99+' : count}
    </span>
  );
}
