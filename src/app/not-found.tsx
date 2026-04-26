import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Card>
        <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Страница не найдена</h1>
          <p className="text-muted-foreground max-w-md">
            Калькулятор или страница, которую вы ищете, не существует. 
            Возможно, он был перемещён или удалён.
          </p>
          <div className="flex gap-3">
            <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              На главную
            </Link>
            <Link href="/#categories" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Все категории
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
