'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calculator as CalcType, CalculationResult, InputField } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { addToHistory } from '@/lib/history';

interface ConverterCalculatorProps {
  calculator: CalcType;
  initialParams?: Record<string, string>;
}

/**
 * Detects a "swappable pair" of select inputs — two selects that share the same
 * option values, representing a from/to conversion. This works regardless of
 * what the inputs are named (from/to, fromUnit/toUnit, fromTimezone/toTimezone, etc.).
 */
function findSwappablePair(inputFields: InputField[]): [InputField, InputField] | null {
  const selects = inputFields.filter(i => i.type === 'select' && i.options && i.options.length > 0);
  for (let i = 0; i < selects.length; i++) {
    for (let j = i + 1; j < selects.length; j++) {
      const a = selects[i];
      const b = selects[j];
      // Same option count and all values overlap → swappable pair
      if (a.options!.length === b.options!.length) {
        const aValues = new Set(a.options!.map(o => o.value));
        const bValues = new Set(b.options!.map(o => o.value));
        const overlap = [...aValues].every(v => bValues.has(v));
        if (overlap) {
          return [a, b];
        }
      }
    }
  }
  return null;
}

export function ConverterCalculator({ calculator, initialParams }: ConverterCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>(() => {
    const defaults: Record<string, number | string | boolean> = {};
    calculator.inputs.forEach(input => {
      // URL params take priority over defaults
      if (initialParams && initialParams[input.name] !== undefined) {
        defaults[input.name] = input.type === 'number' 
          ? (Number(initialParams[input.name]) || (input.defaultValue ?? ''))
          : initialParams[input.name];
      } else {
        defaults[input.name] = input.defaultValue ?? '';
      }
    });
    return defaults;
  });
  
  const [results, setResults] = useState<CalculationResult[]>([]);

  // Detect swappable pair once — works for any naming convention
  const swappablePair = useMemo(() => findSwappablePair(calculator.inputs), [calculator.inputs]);

  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = useCallback(() => {
    try {
      const calculatedResults = calculator.calculate(inputs as Record<string, number | string>);
      if (Array.isArray(calculatedResults)) {
        setResults(calculatedResults);
      }
      setHasCalculated(true);
    } catch {
      setResults([{ value: 'Ошибка вычисления', label: 'Результат' }]);
      setHasCalculated(true);
    }
  }, [inputs, calculator]);

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const allFilled = calculator.inputs.every(input =>
      inputs[input.name] !== '' && inputs[input.name] !== undefined
    );
    if (allFilled) {
      handleCalculate();
    }
  }, [inputs, calculator, handleCalculate]);

  // Debounced history save
  useEffect(() => {
    if (!hasCalculated || results.length === 0) return;

    const hasError = results.some(r => r.value === 'Ошибка вычисления');
    if (hasError) return;

    const hasEmptyInputs = calculator.inputs.some(
      input => inputs[input.name] === '' || inputs[input.name] === undefined
    );
    if (hasEmptyInputs) return;

    const timer = setTimeout(() => {
      addToHistory({
        calculatorSlug: calculator.slug,
        calculatorTitle: calculator.title,
        inputs: Object.fromEntries(
          Object.entries(inputs).map(([k, v]) => [k, String(v)])
        ),
        results: results.map(r => ({ label: r.label, value: r.value })),
        url: `/calc/${calculator.slug}?${new URLSearchParams(
          Object.entries(inputs).map(([k, v]) => [k, String(v)])
        ).toString()}`,
      });
      window.dispatchEvent(new Event('calcus-history-update'));
    }, 2000);

    return () => clearTimeout(timer);
  }, [results, hasCalculated, calculator, inputs]);

  const swapUnits = () => {
    if (!swappablePair) return;
    const [fromField, toField] = swappablePair;
    const fromValue = inputs[fromField.name];
    const toValue = inputs[toField.name];
    if (fromValue && toValue) {
      handleInputChange(fromField.name, toValue);
      handleInputChange(toField.name, fromValue);
    }
  };

  // Simple converter: has a swappable pair and at most one non-select input (the value)
  const isSimpleConverter = swappablePair !== null 
    && calculator.inputs.filter(i => i.type !== 'select').length <= 1;

  // For simple converters, separate the value input from the pair
  const valueInput = isSimpleConverter 
    ? calculator.inputs.find(i => i.type !== 'select') 
    : null;

  // For complex converters, render all inputs in a grid like FormulaCalculator
  const complexInputs = isSimpleConverter 
    ? calculator.inputs.filter(i => i !== valueInput && i !== swappablePair![0] && i !== swappablePair![1])
    : calculator.inputs;

  const renderInput = (input: InputField) => (
    <div key={input.name} className="space-y-2">
      <Label htmlFor={input.name}>{input.label}</Label>
      {input.type === 'select' ? (
        <Select
          value={String(inputs[input.name] || '')}
          onValueChange={(value) => handleInputChange(input.name, value || '')}
        >
          <SelectTrigger id={input.name}>
            <SelectValue placeholder={input.placeholder || 'Выберите...'} />
          </SelectTrigger>
          <SelectContent>
            {input.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={input.name}
          type={input.type}
          placeholder={input.placeholder}
          min={input.min}
          max={input.max}
          step={input.step}
          value={String(inputs[input.name] || '')}
          onChange={(e) => handleInputChange(input.name, e.target.value)}
          className="text-lg"
        />
      )}
    </div>
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Конвертер
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isSimpleConverter ? (
          <>
            {/* Value input (full width) */}
            {valueInput && renderInput(valueInput)}

            {/* Swappable from/to pair */}
            <div className="grid gap-4 sm:grid-cols-[1fr,auto,1fr]">
              {renderInput(swappablePair![0])}

              <div className="flex items-end justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapUnits}
                  className="mb-0"
                  aria-label="Поменять местами"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              {renderInput(swappablePair![1])}
            </div>

            {/* Any additional inputs beyond the standard value+pair */}
            {complexInputs.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {complexInputs.map(renderInput)}
              </div>
            )}
          </>
        ) : (
          /* Complex converter: render all inputs in a grid */
          <div className="grid gap-4 sm:grid-cols-2">
            {calculator.inputs.map(renderInput)}
          </div>
        )}

        <Button 
          onClick={handleCalculate}
          className="w-full"
          size="lg"
          data-testid="calculate-button"
        >
          Рассчитать
        </Button>

        {results.length > 0 && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="converter-result">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{result.label}</p>
                <p className="text-2xl font-bold text-primary">
                  {typeof result.value === 'number' 
                    ? result.value.toLocaleString('ru-RU', { maximumFractionDigits: 2 })
                    : result.value}
                  {result.unit && <span className="text-base ml-1">{result.unit}</span>}
                </p>
                {result.additionalInfo && (
                  <p className="text-sm text-muted-foreground mt-2">{result.additionalInfo}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
