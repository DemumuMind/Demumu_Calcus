import type { Calculator } from '../types';

export const pomodoroCalculator: Calculator = {
  id: 'pomodoro-planner',
  slug: 'pomodoro-taymer',
  title: 'Помодоро-таймер и планировщик',
  description: 'Расчёт рабочих циклов по методу Помидоро: работа 25 мин + перерывы',
  category: 'tekhnologii',
  subcategory: 'data-i-vremya',
  type: 'formula',
  inputs: [
    {
      name: 'workHours',
      label: 'Рабочих часов',
      type: 'number',
      placeholder: '8',
      min: 1,
      max: 16,
      step: 0.5,
      defaultValue: 8,
    },
    {
      name: 'pomodoroMinutes',
      label: 'Длительность помидора (мин)',
      type: 'select',
      options: [
        { value: '15', label: '15 мин — короткий' },
        { value: '25', label: '25 мин — классический' },
        { value: '45', label: '45 мин — глубокая работа' },
        { value: '52', label: '52 мин — 52/17' },
        { value: '60', label: '60 мин — часовой' },
      ],
      defaultValue: '25',
    },
    {
      name: 'breakMinutes',
      label: 'Короткий перерыв (мин)',
      type: 'select',
      options: [
        { value: '3', label: '3 мин' },
        { value: '5', label: '5 мин — классический' },
        { value: '10', label: '10 мин' },
        { value: '17', label: '17 мин — 52/17' },
      ],
      defaultValue: '5',
    },
    {
      name: 'longBreakAfter',
      label: 'Длинный перерыв после каждых N помидоров',
      type: 'select',
      options: [
        { value: '2', label: '2 помидора' },
        { value: '3', label: '3 помидора' },
        { value: '4', label: '4 помидора — классика' },
        { value: '5', label: '5 помидоров' },
      ],
      defaultValue: '4',
    },
    {
      name: 'longBreakMinutes',
      label: 'Длительность длинного перерыва (мин)',
      type: 'select',
      options: [
        { value: '10', label: '10 мин' },
        { value: '15', label: '15 мин — классический' },
        { value: '20', label: '20 мин' },
        { value: '30', label: '30 мин' },
      ],
      defaultValue: '15',
    },
  ],
  outputs: [
    { name: 'pomodoroCount', label: 'Помидоров в день', type: 'number', unit: 'шт' },
    { name: 'totalWorkMinutes', label: 'Время чистой работы', type: 'number', unit: 'мин' },
    { name: 'totalBreakMinutes', label: 'Время на перерывы', type: 'number', unit: 'мин' },
    { name: 'totalTimeMinutes', label: 'Общее время циклов', type: 'number', unit: 'мин' },
    { name: 'pomodorosBeforeLunch', label: 'Помидоров до обеда (4 часа)', type: 'number', unit: 'шт' },
  ],
  calculate: (inputs) => {
    const workHours = Number(inputs.workHours) || 8;
    const pomodoro = Number(inputs.pomodoroMinutes) || 25;
    const shortBreak = Number(inputs.breakMinutes) || 5;
    const longAfter = Number(inputs.longBreakAfter) || 4;
    const longBreak = Number(inputs.longBreakMinutes) || 15;

    const totalWorkMinutes = workHours * 60;
    // Each cycle: pomodoro + short break. After longAfter pomodoros: long break instead of short
    // Average cycle length = pomodoro + shortBreak + (longBreak - shortBreak) / longAfter
    const avgCycle = pomodoro + shortBreak + (longBreak - shortBreak) / longAfter;
    const pomodoroCount = Math.floor(totalWorkMinutes / avgCycle);
    const totalBreakMinutes = Math.round(pomodoroCount * shortBreak +
      Math.floor(pomodoroCount / longAfter) * (longBreak - shortBreak));
    const totalTimeMinutes = pomodoroCount * pomodoro + totalBreakMinutes;

    // Before lunch: 4 hours
    const morningWorkMinutes = 4 * 60;
    const morningPomodoros = Math.floor(morningWorkMinutes / avgCycle);

    return [
      { value: pomodoroCount, label: 'Помидоров в день', unit: 'шт' },
      { value: pomodoroCount * pomodoro, label: 'Время чистой работы', unit: 'мин' },
      { value: totalBreakMinutes, label: 'Время на перерывы', unit: 'мин' },
      { value: totalTimeMinutes, label: 'Общее время циклов', unit: 'мин' },
      { value: morningPomodoros, label: 'Помидоров до обеда (4 часа)', unit: 'шт' },
    ];
  },
  content: {
    howTo:
      'Введите количество рабочих часов, выберите длительность помидора (рабочего интервала) и перерывов. Калькулятор покажет, сколько помидоров поместится в день, сколько чистого времени работы получится и сколько перерывов.',
    about:
      'Метод Помидоро — техника управления временем, при которой работа разбивается на интервалы (обычно 25 минут), разделённые короткими перерывами (5 минут). После 4 помидоров делается длинный перерыв (15-30 минут). Этот метод помогает поддерживать концентрацию и предотвращать выгорание.',
    formula:
      'Помидоров в день = Рабочие минуты / (Длительность помидора + Короткий перерыв + (Длинный перерыв − Короткий) / Количество помидоров до длинного перерыва).',
    faq: [
      {
        question: 'Что такое метод Помидоро?',
        answer:
          'Метод Помидоро — техника тайм-менеджмента, изобретённая Франческо Чирилло в 1980-х. Работа разбивается на 25-минутные интервалы («помидоры»), между которыми 5-минутные перерывы. После 4 помидоров — длинный перерыв 15-30 минут.',
      },
      {
        question: 'Сколько помидоров в день реально сделать?',
        answer:
          'В 8-часовой рабочий день получается 12-16 классических помидоров (25 мин + 5 мин), что даёт 5-6,5 часов чистой работы. Реальное количество зависит от количества совещаний, переписки и других отвлекающих факторов.',
      },
      {
        question: 'Что делать, если задача занимает больше одного помидора?',
        answer:
          'Если задача занимает более 4 помидоров — разбейте её на подзадачи. Если задача занимает менее одного помидора — объедините несколько мелких задач в один помидор. Важно: один помидор = одна задача или группа связанных задач.',
      },
      {
        question: 'Какой длительность помидора лучше?',
        answer:
          '25 минут — классика, хорошо подходит для большинства задач. 45-52 минуты (техника «52/17») лучше для глубокой работы, требующей длительной концентрации (программирование, написание текста). 15 минут подходит для начинающих или для очень рутинных задач.',
      },
    ],
    sources: [
      { title: 'Метод Помидоро — официальный сайт', url: 'https://francescocirillo.com/products/the-pomodoro-technique' },
      { title: 'Правило 52/17 — DeskTime исследование', url: 'https://desktime.com/blog/the-secret-of-the-10-percent-most-productive-people' },
    ],
    updatedAt: '2026-04-26',
  },
  popularCalculations: [
    { value: 'Классика: 8ч, 25/5, перерыв 15', url: '/calc/pomodoro-taymer?workHours=8&pomodoroMinutes=25&breakMinutes=5&longBreakAfter=4&longBreakMinutes=15' },
    { value: 'Глубокая работа: 8ч, 45/10', url: '/calc/pomodoro-taymer?workHours=8&pomodoroMinutes=45&breakMinutes=10&longBreakAfter=4&longBreakMinutes=20' },
    { value: '52/17: 8ч, 52/17, перерыв 30', url: '/calc/pomodoro-taymer?workHours=8&pomodoroMinutes=52&breakMinutes=17&longBreakAfter=4&longBreakMinutes=30' },
    { value: 'Короткий день: 4ч, 25/5', url: '/calc/pomodoro-taymer?workHours=4&pomodoroMinutes=25&breakMinutes=5&longBreakAfter=4&longBreakMinutes=15' },
  ],
};

export const pomodoroCalculators: Calculator[] = [pomodoroCalculator];
