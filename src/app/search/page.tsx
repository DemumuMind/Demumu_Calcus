import { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Calculator } from 'lucide-react';
import { SearchBox } from '@/components/search/search-box';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Поиск калькуляторов — Calcus',
  description: 'Найдите нужный калькулятор или конвертер среди сотен инструментов.',
};

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Поиск</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Поиск калькуляторов</h1>
          <p className="text-lg text-muted-foreground">
            Введите название калькулятора или категории, чтобы быстро найти нужный инструмент.
          </p>
        </div>

        <div className="mb-8">
          <SearchBox />
        </div>

        <Card>
          <CardContent className="py-12 text-center">
            <Search className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              Начните вводить название калькулятора в строке поиска выше.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Или вернитесь на <Link href="/" className="text-primary hover:underline">главную страницу</Link>.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
