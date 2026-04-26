import type { Calculator } from '../types';

export const bakingFormCalculator: Calculator = {
  id: 'baking-form-converter',
  slug: 'kalkulyator-formy-dlya-vypechki',
  title: 'Калькулятор формы для выпечки',
  description: 'Пересчёт рецепта при замене формы: круглая, прямоугольная, квадратная, бабка',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'originalShape',
      label: 'Исходная форма',
      type: 'select',
      options: [
        { value: 'round18', label: 'Круглая Ø 18 см' },
        { value: 'round20', label: 'Круглая Ø 20 см' },
        { value: 'round22', label: 'Круглая Ø 22 см' },
        { value: 'round24', label: 'Круглая Ø 24 см' },
        { value: 'round26', label: 'Круглая Ø 26 см' },
        { value: 'round28', label: 'Круглая Ø 28 см' },
        { value: 'square18', label: 'Квадрат 18×18 см' },
        { value: 'square20', label: 'Квадрат 20×20 см' },
        { value: 'square22', label: 'Квадрат 22×22 см' },
        { value: 'rect20x30', label: 'Прямоугольная 20×30 см' },
        { value: 'rect25x35', label: 'Прямоугольная 25×35 см' },
        { value: 'rect30x40', label: 'Прямоугольная 30×40 см' },
        { value: 'bundt22', label: 'Форма-бабка Ø 22 см' },
        { value: 'bundt24', label: 'Форма-бабка Ø 24 см' },
      ],
      defaultValue: 'round24',
    },
    {
      name: 'targetShape',
      label: 'Нужная форма',
      type: 'select',
      options: [
        { value: 'round18', label: 'Круглая Ø 18 см' },
        { value: 'round20', label: 'Круглая Ø 20 см' },
        { value: 'round22', label: 'Круглая Ø 22 см' },
        { value: 'round24', label: 'Круглая Ø 24 см' },
        { value: 'round26', label: 'Круглая Ø 26 см' },
        { value: 'round28', label: 'Круглая Ø 28 см' },
        { value: 'square18', label: 'Квадрат 18×18 см' },
        { value: 'square20', label: 'Квадрат 20×20 см' },
        { value: 'square22', label: 'Квадрат 22×22 см' },
        { value: 'rect20x30', label: 'Прямоугольная 20×30 см' },
        { value: 'rect25x35', label: 'Прямоугольная 25×35 см' },
        { value: 'rect30x40', label: 'Прямоугольная 30×40 см' },
        { value: 'bundt22', label: 'Форма-бабка Ø 22 см' },
        { value: 'bundt24', label: 'Форма-бабка Ø 24 см' },
      ],
      defaultValue: 'round20',
    },
    {
      name: 'ingredientAmount',
      label: 'Количество ингредиента (г, мл, шт)',
      type: 'number',
      placeholder: '200',
      min: 0,
      step: 1,
      defaultValue: 200,
    },
  ],
  outputs: [
    { name: 'coefficient', label: 'Коэффициент пересчёта', type: 'number' },
    { name: 'newAmount', label: 'Новое количество', type: 'number' },
    { name: 'areaOriginal', label: 'Площадь исходной формы', type: 'number', unit: 'см²' },
    { name: 'areaTarget', label: 'Площадь новой формы', type: 'number', unit: 'см²' },
  ],
  calculate: (inputs) => {
    const areaMap: Record<string, number> = {
      round18: Math.PI * 9 * 9,     // 254.5
      round20: Math.PI * 10 * 10,   // 314.2
      round22: Math.PI * 11 * 11,   // 380.1
      round24: Math.PI * 12 * 12,   // 452.4
      round26: Math.PI * 13 * 13,   // 530.9
      round28: Math.PI * 14 * 14,   // 615.8
      square18: 18 * 18,            // 324
      square20: 20 * 20,            // 400
      square22: 22 * 22,            // 484
      rect20x30: 20 * 30,           // 600
      rect25x35: 25 * 35,           // 875
      rect30x40: 30 * 40,           // 1200
      bundt22: Math.PI * 11 * 11 * 0.7, // 266 (rough estimate for ring shape)
      bundt24: Math.PI * 12 * 12 * 0.7,   // 317
    };

    const originalShape = String(inputs.originalShape);
    const targetShape = String(inputs.targetShape);
    const ingredientAmount = Number(inputs.ingredientAmount) || 0;

    const areaOriginal = areaMap[originalShape] || 1;
    const areaTarget = areaMap[targetShape] || 1;
    const coefficient = areaTarget / areaOriginal;
    const newAmount = Math.round(ingredientAmount * coefficient);

    return [
      { value: Math.round(coefficient * 100) / 100, label: 'Коэффициент пересчёта' },
      { value: newAmount, label: 'Новое количество' },
      { value: Math.round(areaOriginal), label: 'Площадь исходной формы', unit: 'см²' },
      { value: Math.round(areaTarget), label: 'Площадь новой формы', unit: 'см²' },
    ];
  },
  content: {
    howTo:
      'Выберите форму, указанную в рецепте, затем форму, которую у вас есть. Введите количество любого ингредиента — калькулятор покажет, сколько нужно взять для новой формы.',
    about:
      'Калькулятор пересчёта форм для выпечки помогает адаптировать рецепт к имеющейся форме. Пересчёт основан на соотношении площадей дна форм. Для форм разной высоты результат является приближённым.',
    formula: 'Коэффициент = Площадь новой формы / Площадь исходной формы. Новое количество = Исходное количество × Коэффициент.',
    faq: [
      {
        question: 'Как пересчитать рецепт с круглой формы на прямоугольную?',
        answer:
          'Выберите круглую форму рецепта в поле «Исходная форма» и прямоугольную в поле «Нужная форма». Калькулятор рассчитает коэффициент по площади — просто умножьте все ингредиенты на этот коэффициент.',
      },
      {
        question: 'Работает ли калькулятор для форм разной высоты?',
        answer:
          'Калькулятор считает площадь дна формы. Если высота форм сильно отличается (например, 3 см vs 7 см), тесто может не пропечься или перепечься. Для форм с сильно разной высотой корректируйте также температуру и время выпечки.',
      },
      {
        question: 'Как пересчитать время выпечки?',
        answer:
          'Если новая форма меньше — сократите время на 10-15 минут и проверяйте готовность зубочисткой. Если больше — увеличьте время на 10-20 минут. При выпечке в мультиварке или аэрогриле время может отличаться ещё сильнее.',
      },
    ],
    sources: [
      { title: 'Как заменить форму для выпечки — Лента.ру', url: 'https://lenta.ru/articles/2021/baking-form-substitution/' },
    ],
    updatedAt: '2026-04-26',
  },
  popularCalculations: [
    { value: 'Круг Ø24 → Круг Ø20', url: '/calc/kalkulyator-formy-dlya-vypechki?originalShape=round24&targetShape=round20&ingredientAmount=200' },
    { value: 'Круг Ø24 → Прямоуг. 20×30', url: '/calc/kalkulyator-formy-dlya-vypechki?originalShape=round24&targetShape=rect20x30&ingredientAmount=200' },
    { value: 'Квадрат 20×20 → Круг Ø22', url: '/calc/kalkulyator-formy-dlya-vypechki?originalShape=square20&targetShape=round22&ingredientAmount=300' },
    { value: 'Круг Ø26 → Квадрат 22×22', url: '/calc/kalkulyator-formy-dlya-vypechki?originalShape=round26&targetShape=square22&ingredientAmount=250' },
  ],
};

export const bakingFormCalculators: Calculator[] = [bakingFormCalculator];
