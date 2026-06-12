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
  SelectValue } from '@/components/ui/select';
import { ChefHat, Copy, Check } from 'lucide-react';
import {
  cookingIngredients,
  standardMeasures,
  measureToGrams,
  gramsToMeasure,
  getIngredientCategories,
  getIngredientsByCategory } from "@/lib/cooking";

interface CookingConverterProps {
  initialIngredient?: string;
  initialMeasure?: string;
  initialValue?: number;
}

export function CookingConverter({
  initialIngredient,
  initialMeasure,
  initialValue = 1 }: CookingConverterProps) {
  const ingredients = Object.values(cookingIngredients);
  const measures = Object.values(standardMeasures);
  const categories = getIngredientCategories();
  
  const [selectedIngredient, setSelectedIngredient] = useState(
    initialIngredient || ingredients[0]?.id || ''
  );
  const [selectedMeasure, setSelectedMeasure] = useState(
    initialMeasure || 'tablespoon'
  );
  const [value, setValue] = useState<string>(initialValue.toString());
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Wrapper functions to handle Select onValueChange type
  const handleCategoryChange = (val: string | null) => {
    if (val !== null) setSelectedCategory(val);
  };
  const handleIngredientChange = (val: string | null) => {
    if (val !== null) setSelectedIngredient(val);
  };
  const handleMeasureChange = (val: string | null) => {
    if (val !== null) setSelectedMeasure(val);
  };
  
  const ingredient = cookingIngredients[selectedIngredient];
  const measure = standardMeasures[selectedMeasure];
  
  // Вычисление результата
  const calculate = useCallback(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || !ingredient || !measure) {
      setResult(null);
      return;
    }
    
    try {
      const grams = measureToGrams(selectedIngredient, selectedMeasure, numValue);
      setResult(grams);
    } catch {
      setResult(null);
    }
  }, [value, selectedIngredient, selectedMeasure, ingredient, measure]);
  
  // Автоматический пересчёт
  useEffect(() => {
    calculate();
  }, [calculate]);
  
  // Копировать результат
  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(`${result.toLocaleString('ru-RU', { maximumFractionDigits: 1 })} г`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Фильтрация продуктов по категории
  const filteredIngredients = selectedCategory === 'all' 
    ? ingredients 
    : getIngredientsByCategory(selectedCategory);
  
  // Популярные значения
  const popularValues = [1, 2, 3, 5, 10];
  
  // Таблица соответствий для выбранного продукта
  const conversionTable = ingredient ? [
    { measure: 'чайная ложка', shortName: 'ч. л.', grams: ingredient.gramsPerTeaspoon },
    { measure: 'столовая ложка', shortName: 'ст. л.', grams: ingredient.gramsPerTablespoon },
    { measure: 'рюмка', shortName: 'рюмка', grams: ingredient.gramsPerShot },
    { measure: 'гранёный стакан', shortName: 'стакан', grams: ingredient.gramsPerCup },
  ] : [];
  
  return (
    <div className="space-y-6">
      {/* Основной конвертер */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            Кулинарный конвертер
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Категория продукта */}
          <div className="space-y-2">
            <Label>Категория</Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Выбор продукта */}
          <div className="space-y-2">
            <Label>Продукт</Label>
            <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите продукт" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {filteredIngredients.map((ing) => (
                  <SelectItem key={ing.id} value={ing.id}>
                    {ing.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Ввод значения */}
          <div className="space-y-2">
            <Label htmlFor="value">Количество</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg"
              placeholder="Введите число"
              min="0"
              step="0.5"
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
          
          {/* Выбор меры */}
          <div className="space-y-2">
            <Label>Мера</Label>
            <Select value={selectedMeasure} onValueChange={handleMeasureChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите меру" />
              </SelectTrigger>
              <SelectContent>
                {measures.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name} ({m.shortName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Результат */}
          {result !== null && ingredient && (
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {parseFloat(value).toLocaleString('ru-RU')} {measure?.shortName} {ingredient.name} =
                </p>
                <p className="text-3xl font-bold text-primary mb-2">
                  {result < 10 
                    ? result.toFixed(1) 
                    : Math.round(result).toLocaleString('ru-RU')
                  } г
                </p>
                <p className="text-xs text-muted-foreground">
                  {ingredient.name} в {measure?.name.toLowerCase()}
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
      {ingredient && value === '1' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Сколько граммов {ingredient.name} в разных мерах
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {conversionTable.map((row, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between py-2 border-b last:border-0"
                >
                  <span>1 {row.shortName}</span>
                  <span className="font-medium">{row.grams} г</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Обратная конвертация */}
      {ingredient && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Обратная конвертация: граммы в меры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {[50, 100, 150, 200, 250].map((grams) => {
                const tablespoons = gramsToMeasure(ingredient.id, 'tablespoon', grams);
                const teaspoons = gramsToMeasure(ingredient.id, 'teaspoon', grams);
                return (
                  <div 
                    key={grams} 
                    className="flex justify-between py-2 border-b last:border-0"
                  >
                    <span>{grams} г =</span>
                    <span className="font-medium">
                      {tablespoons.toFixed(1)} ст. л. ({teaspoons.toFixed(1)} ч. л.)
                    </span>
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
