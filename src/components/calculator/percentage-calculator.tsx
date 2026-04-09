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
import { 
  percentageTypes, 
  calculateByType,
  type PercentageCalculation,
} from '@/lib/percentages';

interface PercentageCalculatorProps {
  initialType?: string;
  initialValue1?: number;
  initialValue2?: number;
}

export function PercentageCalculator({
  initialType = 'procentov-ot-chisla',
  initialValue1 = 10,
  initialValue2 = 100,
}: PercentageCalculatorProps) {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [value1, setValue1] = useState<string>(initialValue1.toString());
  const [value2, setValue2] = useState<string>(initialValue2.toString());
  const [result, setResult] = useState<{ result: number; explanation: string } | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Wrapper for Select onValueChange
  const handleTypeChange = (val: string | null) => {
    if (val !== null) setSelectedType(val);
  };
  
  const calcType = percentageTypes.find((t) => t.slug === selectedType) || percentageTypes[0];
  
  // Вычисление результата
  const calculate = useCallback(() => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    
    if (isNaN(num1) || isNaN(num2)) {
      setResult(null);
      return;
    }
    
    const calcResult = calculateByType(calcType.id, num1, num2);
    setResult(calcResult);
  }, [value1, value2, calcType.id]);
  
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
  const popularValues1 = calcType.id === 'percent-of-number' 
    ? [1, 5, 10, 15, 20, 25, 50, 75, 100]
    : [10, 25, 50, 100, 200, 500];
  const popularValues2 = [100, 200, 500, 1000];
  
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
  const getFieldLabels = (typeId: string): { label1: string; label2: string; unit1: string; unit2: string } => {
    switch (typeId) {
      case 'percent-of-number':
        return { label1: 'Процент', label2: 'Число', unit1: '%', unit2: '' };
      case 'number-is-percent-of':
        return { label1: 'Число', label2: 'От общего', unit1: '', unit2: '' };
      case 'percent-change':
        return { label1: 'Старое значение', label2: 'Новое значение', unit1: '', unit2: '' };
      case 'percent-difference':
        return { label1: 'Число 1', label2: 'Число 2', unit1: '', unit2: '' };
      case 'add-percent':
        return { label1: 'Процент', label2: 'Число', unit1: '%', unit2: '' };
      case 'subtract-percent':
        return { label1: 'Процент', label2: 'Число', unit1: '%', unit2: '' };
      case 'compound-percent':
        return { label1: 'Процент', label2: 'Сумма', unit1: '%', unit2: '₽' };
      default:
        return { label1: 'Значение 1', label2: 'Значение 2', unit1: '', unit2: '' };
    }
  };
  
  const labels = getFieldLabels(calcType.id);
  
  return (
    <div className="space-y-6">
      {/* Основной калькулятор */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            Калькулятор процентов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор типа расчёта */}
          <div className="space-y-2">
            <Label>Тип расчёта</Label>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger>
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
              <Label htmlFor="value1">{labels.label1}</Label>
              <div className="relative">
                <Input
                  id="value1"
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="text-lg pr-8"
                  placeholder="Введите число"
                />
                {labels.unit1 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {labels.unit1}
                  </span>
                )}
              </div>
              
              {/* Быстрые значения 1 */}
              <div className="flex gap-2 flex-wrap">
                {popularValues1.slice(0, 5).map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    onClick={() => setValue1(val.toString())}
                    className="text-xs"
                  >
                    {val}{labels.unit1}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Поле 2 */}
            <div className="space-y-2">
              <Label htmlFor="value2">{labels.label2}</Label>
              <div className="relative">
                <Input
                  id="value2"
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  className="text-lg pr-8"
                  placeholder="Введите число"
                />
                {labels.unit2 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {labels.unit2}
                  </span>
                )}
              </div>
              
              {/* Быстрые значения 2 */}
              <div className="flex gap-2 flex-wrap">
                {popularValues2.map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    onClick={() => setValue2(val.toString())}
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
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Результат
                </p>
                <p className="text-3xl font-bold text-primary mb-2">
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
                  <th className="text-left py-2">{labels.label1}</th>
                  <th className="text-left py-2">{labels.label2}</th>
                  <th className="text-left py-2">Результат</th>
                </tr>
              </thead>
              <tbody>
                {popularValues1.slice(0, 5).map((v1) => {
                  const popularResult = calculateByType(calcType.id, v1, 100);
                  return (
                    <tr 
                      key={v1} 
                      className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setValue1(v1.toString());
                        setValue2('100');
                      }}
                    >
                      <td className="py-2">{v1}{labels.unit1}</td>
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
