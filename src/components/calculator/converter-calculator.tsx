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
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { getCalculator } from './calculator-engine';

interface ConverterCalculatorProps {
  calculator: CalcType;
}

export function ConverterCalculator({ calculator }: ConverterCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>(() => {
    const defaults: Record<string, number | string | boolean> = {};
    calculator.inputs.forEach(input => {
      defaults[input.name] = input.defaultValue ?? '';
    });
    return defaults;
  });
  
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleCalculate = () => {
    const calculateFn = getCalculator(calculator.id);
    if (!calculateFn) return;
    const calculatedResults = calculateFn(inputs as Record<string, number | string>);
    setResults(calculatedResults);
  };

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    const allFilled = calculator.inputs.every(input => 
      inputs[input.name] !== '' && inputs[input.name] !== undefined
    );
    if (allFilled) {
      handleCalculate();
    }
  }, [inputs]);

  const swapUnits = () => {
    const fromValue = inputs['from'];
    const toValue = inputs['to'];
    if (fromValue && toValue) {
      handleInputChange('from', toValue);
      handleInputChange('to', fromValue);
    }
  };

  const valueInput = calculator.inputs.find(i => i.name === 'value');
  const fromInput = calculator.inputs.find(i => i.name === 'from');
  const toInput = calculator.inputs.find(i => i.name === 'to');

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Конвертер
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Value Input */}
        {valueInput && (
          <div className="space-y-2">
            <Label htmlFor="value">{valueInput.label}</Label>
            <Input
              id="value"
              type="number"
              placeholder={valueInput.placeholder}
              min={valueInput.min}
              max={valueInput.max}
              step={valueInput.step}
              value={String(inputs['value'] || '')}
              onChange={(e) => handleInputChange('value', e.target.value)}
              className="text-lg"
            />
          </div>
        )}

        {/* Unit Selection */}
        <div className="grid gap-4 sm:grid-cols-[1fr,auto,1fr]">
          {fromInput && (
            <div className="space-y-2">
              <Label htmlFor="from">{fromInput.label}</Label>
              <Select
                value={String(inputs['from'] || '')}
                onValueChange={(value) => handleInputChange('from', value || '')}
              >
                <SelectTrigger id="from">
                  <SelectValue placeholder="Выберите..." />
                </SelectTrigger>
                <SelectContent>
                  {fromInput.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Swap Button */}
          <div className="flex items-end justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapUnits}
              className="mb-0"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          {toInput && (
            <div className="space-y-2">
              <Label htmlFor="to">{toInput.label}</Label>
              <Select
                value={String(inputs['to'] || '')}
                onValueChange={(value) => handleInputChange('to', value || '')}
              >
                <SelectTrigger id="to">
                  <SelectValue placeholder="Выберите..." />
                </SelectTrigger>
                <SelectContent>
                  {toInput.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="converter-result">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-bold text-primary">
                  {result.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
