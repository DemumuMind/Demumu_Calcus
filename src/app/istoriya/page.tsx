'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HistoryEntry, getHistory, clearHistory, deleteHistoryEntry } from '@/lib/history';
import { Clock, Trash2, X, Calculator, ChevronRight, Search } from 'lucide-react';

const PAGE_SIZE = 30;

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
  return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
}

function summarizeResults(results: Array<{ label: string; value: string | number }>): string {
  if (results.length === 0) return '';
  return results.map(r => `${r.label}: ${r.value}`).join(' • ');
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const refresh = useCallback(() => {
    setEntries(getHistory());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const calculatorTypes = useMemo(() => {
    const types = new Set(entries.map(e => e.calculatorTitle));
    return Array.from(types).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch =
        !searchQuery ||
        entry.calculatorTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        summarizeResults(entry.results).toLowerCase().includes(searchQuery.toLowerCase()) ||
        summarizeInputs(entry.inputs).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || entry.calculatorTitle === selectedType;
      return matchesSearch && matchesType;
    });
  }, [entries, searchQuery, selectedType]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Clock className="h-6 w-6 text-primary" />
          История расчётов
        </h1>
        <p className="text-muted-foreground">
          Все недавние вычисления сохраняются локально в этом браузере.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по результатам или калькулятору..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={(v) => setSelectedType(v ?? 'all')}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Все калькуляторы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все калькуляторы</SelectItem>
                {calculatorTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filtered.length} из {entries.length} записей
            </span>
            {entries.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleClear} className="gap-1">
                <Trash2 className="h-3.5 w-3.5" />
                Очистить всё
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Clock className="h-12 w-12 mb-4 opacity-40" />
          <p className="text-base font-medium">История пуста</p>
          <p className="text-sm mt-1 max-w-md text-center">
            {entries.length === 0
              ? 'Выполните расчёт на любом калькуляторе, и он появится здесь автоматически.'
              : 'По вашему запросу ничего не найдено. Попробуйте изменить фильтры.'}
          </p>
        </div>
      ) : (
        <ScrollArea className="space-y-4">
          {visible.map((entry, index) => (
            <React.Fragment key={entry.id}>
              {index > 0 && <Separator className="my-3" />}
              <Card size="sm" className="group relative transition-all hover:shadow-sm">
                <CardHeader className="pb-0 pr-10">
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Calculator className="h-3.5 w-3.5 text-primary" />
                    {entry.calculatorTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <Link href={entry.url} className="block space-y-1 hover:opacity-80 transition-opacity">
                    <p className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</p>
                    <p className="text-base font-semibold">{summarizeResults(entry.results)}</p>
                    <p className="text-sm text-muted-foreground">{summarizeInputs(entry.inputs)}</p>
                    <div className="flex items-center text-sm text-primary pt-1">
                      Перейти к калькулятору <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                </CardContent>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(entry.id);
                  }}
                  aria-label="Удалить запись"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </Card>
            </React.Fragment>
          ))}
          {hasMore && (
            <div className="pt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              >
                Загрузить ещё
              </Button>
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
