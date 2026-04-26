'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CalculatorError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Calculator error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Card className="border-destructive/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold">Ошибка калькулятора</h2>
          <p className="text-muted-foreground max-w-md">
            Произошла ошибка при загрузке калькулятора. Попробуйте обновить страницу.
          </p>
          <Button onClick={reset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Попробовать снова
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
