'use client';

import { useState, useEffect } from 'react';
import { Calculator as CalcType, CalculationResult } from '@/lib/types';
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
import { Calculator } from 'lucide-react';
import { getCalculator } from './calculator-engine';

interface FormulaCalculatorProps {
  calculator: CalcType;
}

export function FormulaCalculator({ calculator }: FormulaCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>(() => {
    const defaults: Record<string, number | string | boolean> = {};
    calculator.inputs.forEach(input => {
      defaults[input.name] = input.defaultValue ?? '';
    });
    return defaults;
  });
  
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const calculateFn = getCalculator(calculator.id);
    if (!calculateFn) return;
    const calculatedResults = calculateFn(inputs as Record<string, number | string>);
    setResults(calculatedResults);
    setCalculated(true);
  };

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Auto-calculate if all inputs are filled
  useEffect(() => {
    const allFilled = calculator.inputs.every(input => 
      inputs[input.name] !== '' && inputs[input.name] !== undefined
    );
    if (allFilled) {
      handleCalculate();
    }
  }, [inputs]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Калькулятор
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          {calculator.inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <Label htmlFor={input.name}>{input.label}</Label>
              {input.type === 'select' ? (
                <Select
                  value={String(inputs[input.name] || '')}
                  onValueChange={(value) => handleInputChange(input.name, value || '')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={input.placeholder} />
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
                />
              )}
            </div>
          ))}
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculate}
          className="w-full"
          size="lg"
          data-testid="calculate-button"
        >
          Рассчитать
        </Button>

        {/* Results */}
        {calculated && results.length > 0 && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="calculator-result">
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
