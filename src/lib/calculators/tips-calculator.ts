import type { Calculator } from '../types';

export const tipsCalculator: Calculator = {
  id: 'tips-calculator',
  slug: 'kalkulyator-chaevyh',
  title: 'Калькулятор чаевых',
  description: 'Расчёт чаевых и разделение счёта между несколькими людьми',
  category: 'povsednevnoe',
  subcategory: 'eda-i-napitki',
  type: 'formula',
  inputs: [
    {
      name: 'billAmount',
      label: 'Сумма счёта',
      type: 'number',
      placeholder: '2500',
      min: 0,
      step: 1,
      defaultValue: 2500,
    },
    {
      name: 'tipPercent',
      label: 'Процент чаевых',
      type: 'select',
      options: [
        { value: '0', label: 'Без чаевых (0%)' },
        { value: '5', label: '5% — минимум' },
        { value: '10', label: '10%' },
        { value: '15', label: '15% — стандарт' },
        { value: '20', label: '20% — хороший сервис' },
        { value: '25', label: '25% — отличный сервис' },
      ],
      defaultValue: '15',
    },
    {
      name: 'peopleCount',
      label: 'Количество человек',
      type: 'number',
      placeholder: '2',
      min: 1,
      step: 1,
      defaultValue: 2,
    },
  ],
  outputs: [
    { name: 'tipAmount', label: 'Сумма чаевых', type: 'number', unit: '₽' },
    { name: 'totalAmount', label: 'Итого с чаевыми', type: 'number', unit: '₽' },
    { name: 'perPerson', label: 'С каждого', type: 'number', unit: '₽' },
  ],
  calculate: (inputs) => {
    const bill = Number(inputs.billAmount) || 0;
    const tipPercent = Number(inputs.tipPercent) || 0;
    const people = Number(inputs.peopleCount) || 1;

    const tipAmount = Math.round(bill * (tipPercent / 100));
    const totalAmount = bill + tipAmount;
    const perPerson = Math.round(totalAmount / people);

    return [
      { value: tipAmount, label: 'Сумма чаевых', unit: '₽' },
      { value: totalAmount, label: 'Итого с чаевыми', unit: '₽' },
      { value: perPerson, label: 'С каждого', unit: '₽' },
    ];
  },
  content: {
    howTo:
      'Введите сумму счёта, выберите процент чаевых и количество человек. Калькулятор мгновенно покажет сумму чаевых, общую сумму и сколько нужно с каждого.',
    about:
      'Калькулятор чаевых помогает быстро рассчитать размер чаевых и разделить счёт между несколькими людьми. Стандартный размер чаевых в России — 10-15%, в США и Европе — 15-20%.',
    formula: 'Чаевые = Сумма счёта × (Процент / 100). Итого = Сумма счёта + Чаевые. С каждого = Итого / Количество человек.',
    faq: [
      {
        question: 'Какой процент чаевых считается нормой?',
        answer:
          'В России стандарт — 10-15% от суммы счёта. В ресторанах высокого класса или при отличном сервисе принято оставлять 20%. В кафе и бистро достаточно 5-10%.',
      },
      {
        question: 'Как разделить счёт поровну?',
        answer:
          'Введите количество человек в поле «Количество человек». Калькулятор покажет сумму «С каждого» — это равная доля для каждого участника с учётом чаевых.',
      },
      {
        question: 'Сколько чаевых оставить при заказе навынос?',
        answer:
          'При заказе навынос чаевые обычно не оставляют или оставляют символическую сумму (5-10%), так как обслуживание минимальное.',
      },
    ],
    sources: [],
    updatedAt: '2026-04-26',
  },
  popularCalculations: [
    { value: '2000 + 10%', url: '/calc/kalkulyator-chaevyh?billAmount=2000&tipPercent=10&peopleCount=1' },
    { value: '3000 + 15% на двоих', url: '/calc/kalkulyator-chaevyh?billAmount=3000&tipPercent=15&peopleCount=2' },
    { value: '5000 + 20% на четверых', url: '/calc/kalkulyator-chaevyh?billAmount=5000&tipPercent=20&peopleCount=4' },
    { value: '1000 без чаевых', url: '/calc/kalkulyator-chaevyh?billAmount=1000&tipPercent=0&peopleCount=1' },
  ],
};

export const tipsCalculators: Calculator[] = [tipsCalculator];
