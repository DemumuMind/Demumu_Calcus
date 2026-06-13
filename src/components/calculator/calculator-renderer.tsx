'use client';

import { Calculator as CalcType } from '@/lib/types';
import { FormulaCalculator } from '@/components/calculator/formula-calculator';
import { ConverterCalculator } from '@/components/calculator/converter-calculator';
import { ArithmeticCalculator } from '@/components/calculator/arithmetic-calculator';

interface CalculatorRendererProps {
  calculator: Omit<CalcType, 'calculate'>;
  calculate: (inputs: Record<string, number | string>) => { value: number | string; label: string; unit?: string; additionalInfo?: string }[];
}

export function CalculatorRenderer({ calculator, calculate }: CalculatorRendererProps) {
  // Reconstruct the calculator with the calculate function
  const fullCalculator: CalcType = {
    ...calculator,
    calculate,
  };

  const calculatorNode = (() => {
    switch (fullCalculator.type) {
      case 'arithmetic':
        return <ArithmeticCalculator calculator={fullCalculator} />;
      case 'converter':
        return <ConverterCalculator calculator={fullCalculator} />;
      case 'formula':
      default:
        return <FormulaCalculator calculator={fullCalculator} />;
    }
  })();

  return (
    <div role="form" aria-label={`Калькулятор ${fullCalculator.title}`}>
      {calculatorNode}
    </div>
  );
}
