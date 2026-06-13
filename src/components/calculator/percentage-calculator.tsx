'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { Percent, Copy, Check, Calculator } from 'lucide-react';
import { percentageTypes, calculateByType } from "@/lib/percentages";

interface PercentageCalculatorProps {
  initialType?: string;
  initialFirstVal?: number;
  initialSecondVal?: number;
}

export function PercentageCalculator({
  initialType = 'procentov-ot-chisla',
  initialFirstVal = 10,
  initialSecondVal = 100,
}: PercentageCalculatorProps) {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [firstVal, setFirstVal] = useState<string>(initialFirstVal.toString());
  const [secondVal, setSecondVal] = useState<string>(initialSecondVal.toString());
  const [result, setResult] = useState<{ result: number; explanation: string } | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Wrapper for Select onValueChange
  const handleTypeChange = (val: string | null) => {
    if (val !== null) setSelectedType(val);
  };
  
  const calcType = percentageTypes.find((t) => t.slug === selectedType) || percentageTypes[0];
  
  // Вычисление результата
  const calculate = useCallback(() => {
    const firstNumber = parseFloat(firstVal);
    const secondNumber = parseFloat(secondVal);
    
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      setResult(null);
      return;
    }
    
    const calcResult = calculateByType(calcType.id, firstNumber, secondNumber);
    setResult(calcResult);
  }, [firstVal, secondVal, calcType.id]);
  
  // Автоматический пересчёт
  useEffect(() => {
    calculate();
  }, [calculate]);
  
  // Копировать результат
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.result.toLocaleString('ru-RU'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Популярные значения
  const popularFirstVals = calcType.id === 'percent-of-number' 
    ? [1, 5, 10, 15, 20, 25, 50, 75, 100]
    : [10, 25, 50, 100, 200, 500];
  const popularSecondVals = [100, 200, 500, 1000];
  
  // Форматирование числа
  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 0.01 && num !== 0) {
      return num.toExponential(2);
    }
    return num.toLocaleString('ru-RU', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };
  
  // Получить подписи полей в зависимости от типа
  const getFieldLabels = (typeId: string): { firstLabel: string; secondLabel: string; firstUnit: string; secondUnit: string } => {
    switch (typeId) {
      case 'percent-of-number':
        return { firstLabel: 'Процент', secondLabel: 'Число', firstUnit: '%', secondUnit: '' };
      case 'number-is-percent-of':
        return { firstLabel: 'Число', secondLabel: 'От общего', firstUnit: '', secondUnit: '' };
      case 'percent-change':
        return { firstLabel: 'Старое значение', secondLabel: 'Новое значение', firstUnit: '', secondUnit: '' };
      case 'percent-difference':
        return { firstLabel: 'Число 1', secondLabel: 'Число 2', firstUnit: '', secondUnit: '' };
      case 'add-percent':
        return { firstLabel: 'Процент', secondLabel: 'Число', firstUnit: '%', secondUnit: '' };
      case 'subtract-percent':
        return { firstLabel: 'Процент', secondLabel: 'Число', firstUnit: '%', secondUnit: '' };
      case 'compound-percent':
        return { firstLabel: 'Процент', secondLabel: 'Сумма', firstUnit: '%', secondUnit: '₽' };
      default:
        return { firstLabel: 'Значение 1', secondLabel: 'Значение 2', firstUnit: '', secondUnit: '' };
    }
  };
  
  const labels = getFieldLabels(calcType.id);
  
  return (
    <div className="space-y-6">
      {/* Основной калькулятор */}
      <Card className="mb-8" role="form" aria-label="Калькулятор процентов">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            Калькулятор процентов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор типа расчёта */}
          <div className="space-y-2">
            <Label htmlFor="calcType">Тип расчёта</Label>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger id="calcType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {percentageTypes.map((type) => (
                  <SelectItem key={type.id} value={type.slug}>
                    {type.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{calcType.description}</p>
          </div>
          
          {/* Поля ввода */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Поле 1 */}
            <div className="space-y-2">
              <Label htmlFor="firstVal">{labels.firstLabel}</Label>
              <div className="relative">
                <Input
                  id="firstVal"
                  type="number"
                  value={firstVal}
                  onChange={(e) => setFirstVal(e.target.value)}
                  className="text-lg pr-8"
                  placeholder="Введите число"
                />
                {labels.firstUnit && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {labels.firstUnit}
                  </span>
                )}
              </div>
              
              {/* Быстрые значения 1 */}
              <div className="flex gap-2 flex-wrap">
                {popularFirstVals.slice(0, 5).map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    onClick={() => setFirstVal(val.toString())}
                    className="text-xs"
                  >
                    {val}{labels.firstUnit}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Поле 2 */}
            <div className="space-y-2">
              <Label htmlFor="secondVal">{labels.secondLabel}</Label>
              <div className="relative">
                <Input
                  id="secondVal"
                  type="number"
                  value={secondVal}
                  onChange={(e) => setSecondVal(e.target.value)}
                  className="text-lg pr-8"
                  placeholder="Введите число"
                />
                {labels.secondUnit && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {labels.secondUnit}
                  </span>
                )}
              </div>
              
              {/* Быстрые значения 2 */}
              <div className="flex gap-2 flex-wrap">
                {popularSecondVals.map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    onClick={() => setSecondVal(val.toString())}
                    className="text-xs"
                  >
                    {val}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Результат */}
          {result && (
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4" aria-live="polite" aria-atomic="true" aria-label="Результат">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Результат
                </p>
                <p className="text-3xl font-bold text-primary mb-2" role="status" aria-atomic="true">
                  {calcType.id === 'percent-of-number' || calcType.id === 'number-is-percent-of'
                    ? `${formatNumber(result.result)}${calcType.id === 'number-is-percent-of' ? '%' : ''}`
                    : formatNumber(result.result)
                  }
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {result.explanation}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <><Check className="h-4 w-4 mr-1" /> Скопировано</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Копировать</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Таблица популярных расчётов */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Популярные значения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">{labels.firstLabel}</th>
                  <th className="text-left py-2">{labels.secondLabel}</th>
                  <th className="text-left py-2">Результат</th>
                </tr>
              </thead>
              <tbody>
                {popularFirstVals.slice(0, 5).map((fv) => {
                  const popularResult = calculateByType(calcType.id, fv, 100);
                  return (
                    <tr 
                      key={fv} 
                      className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setFirstVal(fv.toString());
                        setSecondVal('100');
                      }}
                    >
                      <td className="py-2">{fv}{labels.firstUnit}</td>
                      <td className="py-2">100</td>
                      <td className="py-2 font-medium text-primary">
                        {formatNumber(popularResult.result)}
                        {calcType.id === 'number-is-percent-of' ? '%' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Формула */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Формула расчёта
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{calcType.formula}</p>
          <p className="text-sm">
            <strong>Пример:</strong> {calcType.example}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
