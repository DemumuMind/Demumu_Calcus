'use client';

import { useState, useEffect, useCallback } from 'react';
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
  SelectValue } from '@/components/ui/select';
import { Calculator, Copy, Check, Send } from 'lucide-react';

const TELEGRAM_SHARE_BASE_URL = process.env.NEXT_PUBLIC_TELEGRAM_SHARE_URL || 'https://t.me/share/url';

interface FormulaCalculatorProps {
  calculator: CalcType;
  initialParams?: Record<string, string>;
}

export function FormulaCalculator({ calculator, initialParams }: FormulaCalculatorProps) {
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
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return `${window.location.origin}/${calculator.slug}${query ? `?${query}` : ''}`;
  }, [inputs, calculator.slug]);

  const handleCopyUrl = useCallback(async () => {
    const url = buildShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [buildShareUrl]);

  const handleShareTelegram = useCallback(() => {
    const url = buildShareUrl();
    const text = `Результат расчёта в ${calculator.title}`;
    const tgUrl = `${TELEGRAM_SHARE_BASE_URL}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(tgUrl, '_blank', 'width=600,height=400');
  }, [buildShareUrl, calculator.title]);

  const handleCalculate = useCallback(() => {
    try {
      const calculatedResults = calculator.calculate(inputs as Record<string, number | string>);
      if (Array.isArray(calculatedResults)) {
        setResults(calculatedResults);
      }
      setCalculated(true);
    } catch {
      setResults([{ value: 'Ошибка вычисления', label: 'Результат' }]);
      setCalculated(true);
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



  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Калькулятор
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <Button 
          onClick={handleCalculate}
          className="w-full"
          size="lg"
          data-testid="calculate-button"
        >
          Рассчитать
        </Button>

        {calculated && results.length > 0 && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="calculator-result">
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

            {/* Share results */}
            <div className="pt-4 border-t border-primary/10">
              <p className="text-xs text-muted-foreground mb-3 text-center">Поделиться результатом</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Скопировать ссылку</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTelegram}
                  className="gap-1.5 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border-[#229ED9]/30"
                >
                  <Send className="h-4 w-4 text-[#229ED9]" />
                  <span>Telegram</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
