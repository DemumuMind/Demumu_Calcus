'use client';

import dynamic from 'next/dynamic';
import { getCalculatorBySlug } from '@/lib/calculators';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator as CalculatorIcon } from 'lucide-react';

const FormulaCalculator = dynamic(
  () => import('@/components/calculator/formula-calculator').then(m => ({ default: m.FormulaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: true }
);

const ConverterCalculator = dynamic(
  () => import('@/components/calculator/converter-calculator').then(m => ({ default: m.ConverterCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: true }
);

const ArithmeticCalculator = dynamic(
  () => import('@/components/calculator/arithmetic-calculator').then(m => ({ default: m.ArithmeticCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: true }
);

const EngineeringCalculator = dynamic(
  () => import('@/components/calculator/engineering-calculator').then(m => ({ default: m.EngineeringCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: true }
);

function CalculatorSkeleton() {
  return (
    <Card className="mb-8 animate-pulse">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-muted-foreground/50" />
          <div className="h-5 w-32 bg-muted rounded" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
        <div className="h-10 bg-muted rounded" />
      </CardContent>
    </Card>
  );
}

interface CalculatorClientWrapperProps {
  slug: string;
  type: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function CalculatorClientWrapper({ slug, type, searchParams }: CalculatorClientWrapperProps) {
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return (
      <div className="rounded-xl border p-8 text-center text-muted-foreground">
        Калькулятор не найден
      </div>
    );
  }

  // Normalize searchParams to simple string values
  const params: Record<string, string> = {};
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === 'string') {
        params[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        params[key] = value[0];
      }
    }
  }

  switch (type) {
    case 'arithmetic':
      return <ArithmeticCalculator calculator={calculator} initialParams={params} />;
    case 'engineering':
      return <EngineeringCalculator calculator={calculator} initialParams={params} />;
    case 'converter':
      return <ConverterCalculator calculator={calculator} initialParams={params} />;
    case 'formula':
    default:
      return <FormulaCalculator calculator={calculator} initialParams={params} />;
  }
}
