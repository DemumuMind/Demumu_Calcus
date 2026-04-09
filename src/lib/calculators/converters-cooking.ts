import type { Calculator } from '../types';

export const convertersCookingCalculators: Calculator[] = [
  {
    id: 'cooking-measures-extended',
    slug: 'cooking-measures-converter',
    title: 'Конвертер кулинарных мер',
    description: 'Переводит кулинарные меры: стаканы, ложки, граммы, миллилитры',
    category: 'converters',
    subcategory: 'cooking',
    type: 'converter',
    inputs: [
      {
        name: 'amount',
        label: 'Количество',
      type: 'number',
        min: 0,
        step: 0.1,
        defaultValue: 1
      },
      {
        name: 'fromUnit',
        label: 'Из',
        type: 'select',
        options: [
          { value: 'cup', label: 'Стакан (250 мл)' },
          { value: 'tbsp', label: 'Столовая ложка (15 мл)' },
          { value: 'tsp', label: 'Чайная ложка (5 мл)' },
          { value: 'ml', label: 'Миллилитр' },
          { value: 'g', label: 'Грамм' }
        ],
        defaultValue: 'cup'
      },
      {
        name: 'toUnit',
        label: 'В',
        type: 'select',
        options: [
          { value: 'ml', label: 'Миллилитры' },
          { value: 'l', label: 'Литры' },
          { value: 'g', label: 'Граммы' },
          { value: 'tbsp', label: 'Столовые ложки' },
          { value: 'tsp', label: 'Чайные ложки' }
        ],
        defaultValue: 'ml'
      }
    ],
    outputs: [
      {
        name: 'result',
        label: 'Результат',
      type: 'number',
      unit: ''
      }
    ],
    calculate: (inputs): any => {
      const conversions: Record<string, number> = {
        cup: 250,
        tbsp: 15,
        tsp: 5,
        ml: 1,
        g: 1,
        l: 1000
      };
      
      const baseValue = Number(inputs.amount) * conversions[String(inputs.fromUnit)];
      const result = baseValue / conversions[String(inputs.toUnit)];
      
      return [{ value: Math.round(result * 100) / 100, label: 'Результат', unit: String(inputs.toUnit) }];
    },
    content: {
      howTo: 'Введите количество, выберите единицу измерения и целевую единицу',
      about: 'Кулинарный конвертер помогает быстро переводить между различными мерами объёма',
      formula: 'Результат = (Количество × Коэффициент из) / Коэффициент в',
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  },
  {
    id: 'oven-temp-converter',
    slug: 'oven-temp-converter',
    title: 'Конвертер температуры духовки',
    description: 'Переводит температуру духовки между °C, °F и газовыми марками',
    category: 'converters',
    subcategory: 'cooking',
    type: 'converter',
    inputs: [
      {
        name: 'temp',
        label: 'Температура',
      type: 'number',
        min: -50,
        max: 500,
        defaultValue: 180
      },
      {
        name: 'fromScale',
        label: 'Из',
        type: 'select',
        options: [
          { value: 'c', label: '°C (Цельсий)' },
          { value: 'f', label: '°F (Фаренгейт)' },
          { value: 'gas', label: 'Газовая марка' }
        ],
        defaultValue: 'c'
      }
    ],
    outputs: [
      {
        name: 'celsius',
        label: '°C',
      type: 'number',
      unit: '°C'
      },
      {
        name: 'fahrenheit',
        label: '°F',
      type: 'number',
      unit: '°F'
      }
    ],
    calculate: (inputs): any => {
      const tempValue = Number(inputs.temp);
      const fromScale = String(inputs.fromScale);
      let celsius;
      if (fromScale === 'c') celsius = tempValue;
      else if (fromScale === 'f') celsius = (tempValue - 32) * 5 / 9;
      else celsius = tempValue * 25; // приближение для газовых марок
      
      const fahrenheit = celsius * 9 / 5 + 32;
      
      return [
        { value: Math.round(celsius), label: '°C', unit: '°C' },
        { value: Math.round(fahrenheit), label: '°F', unit: '°F' }
      ];
    },
    content: {
      howTo: 'Введите температуру и выберите шкалу',
       about: 'Разные страны используют разные температурные шкалы для духовок',
      formula: '°C = (°F - 32) × 5/9, °F = °C × 9/5 + 32',
      faq: [],
      sources: [],
      updatedAt: '2026-04-08'
    }
  }
];
