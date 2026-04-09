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
import { ArrowRightLeft, Calculator, Copy, Check } from 'lucide-react';
import { UnitCategory, convert } from '@/lib/units';

interface UniversalConverterProps {
  category: UnitCategory;
  initialFrom?: string;
  initialTo?: string;
  initialValue?: number;
}

export function UniversalConverter({
  category,
  initialFrom,
  initialTo,
  initialValue = 1,
}: UniversalConverterProps) {
  const units = Object.values(category.units);
  
  const [fromUnit, setFromUnit] = useState(initialFrom || units[0]?.id || '');
  const [toUnit, setToUnit] = useState(initialTo || units[1]?.id || '');
  const [value, setValue] = useState<string>(initialValue.toString());
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Вычисление результата
  const calculate = useCallback(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || !fromUnit || !toUnit) {
      setResult(null);
      return;
    }
    
    try {
      const converted = convert(numValue, fromUnit, toUnit, category);
      setResult(converted);
    } catch {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, category]);
  
  // Автоматический пересчёт при изменении
  useEffect(() => {
    calculate();
  }, [calculate]);
  
  // Обменять единицы местами
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };
  
  // Обёртки для Select onValueChange
  const handleFromUnitChange = (value: string | null) => {
    if (value) setFromUnit(value);
  };
  
  const handleToUnitChange = (value: string | null) => {
    if (value) setToUnit(value);
  };
  
  // Копировать результат
  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toLocaleString('ru-RU'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Популярные значения для быстрого доступа
  const popularValues = [1, 10, 50, 100, 1000];
  
  // Форматирование числа
  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.001 || Math.abs(num) > 1e6) {
      return num.toExponential(6);
    }
    return num.toLocaleString('ru-RU', {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    });
  };
  
  const fromUnitName = category.units[fromUnit]?.name || '';
  const toUnitName = category.units[toUnit]?.name || '';
  const fromShort = category.units[fromUnit]?.shortName || '';
  const toShort = category.units[toUnit]?.shortName || '';
  
  return (
    <div className="space-y-6">
      {/* Основной конвертер */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Конвертер {category.name.toLowerCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ввод значения */}
          <div className="space-y-2">
            <Label htmlFor="value">Введите значение</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg"
              placeholder="Введите число"
              min="0"
              step="any"
            />
            
            {/* Быстрые значения */}
            <div className="flex gap-2 flex-wrap">
              {popularValues.map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  onClick={() => setValue(val.toString())}
                  className="text-xs"
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Выбор единиц */}
          <div className="grid gap-4 sm:grid-cols-[1fr,auto,1fr]">
            {/* Откуда */}
            <div className="space-y-2">
              <Label>Из</Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.shortName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Кнопка обмена */}
            <div className="flex items-end justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="mb-0"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Куда */}
            <div className="space-y-2">
              <Label>В</Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.shortName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Результат */}
          {result !== null && (
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {parseFloat(value).toLocaleString('ru-RU')} {fromShort} =
                </p>
                <p className="text-3xl font-bold text-primary mb-2">
                  {formatNumber(result)} {toShort}
                </p>
                <p className="text-xs text-muted-foreground">
                  {fromUnitName} → {toUnitName}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="mt-2"
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
      
      {/* Таблица соответствий */}
      {result !== null && parseFloat(value) === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Таблица соответствий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {[1, 2, 5, 10, 50, 100].map((mult) => {
                const converted = convert(mult, fromUnit, toUnit, category);
                return (
                  <div key={mult} className="flex justify-between py-1 border-b last:border-0">
                    <span>{mult} {fromShort}</span>
                    <span className="font-medium">{formatNumber(converted)} {toShort}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
