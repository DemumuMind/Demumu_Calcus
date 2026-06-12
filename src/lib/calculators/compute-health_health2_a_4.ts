import type { ComputeFn } from './compute-helpers';

export const computeMap_health_health2_a_4: Record<string, ComputeFn> = {
  'maksimum-v-odnom-povtorenii': (inputs) => {
    const weight = Number(inputs.weight);
    const _reps = Number(inputs.reps);
    if (!weight || !_reps) {
        return [{ value: 'Введите вес и количество повторений', label: 'Результат' }];
    }
    // Формула Бржицкого (Brzycki): 1RM = weight / (1.0278 − 0.0278 × _reps)
    const brzycki = weight / (1.0278 - 0.0278 * _reps);
    // Формула Эпли (Epley): 1RM = weight × (1 + 0.0333 × _reps)
    const epley = weight * (1 + 0.0333 * _reps);
    // Формула Ломбарди (Lombardi): 1RM = weight × _reps^0.10
    const lombardi = weight * Math.pow(_reps, 0.10);
    const average = (brzycki + epley + lombardi) / 3;
    const percentages: string[] = [];
    for (const pct of [50, 60, 70, 80, 90]) {
        const weightAtPct = (average * pct / 100).toFixed(1);
        percentages.push(`${pct}%: ${weightAtPct} кг`);
    }
    return [
        { value: brzycki.toFixed(1), label: 'Формула Бржицкого', unit: 'кг' },
        { value: epley.toFixed(1), label: 'Формула Эпли', unit: 'кг' },
        { value: lombardi.toFixed(1), label: 'Формула Ломбарди', unit: 'кг' },
        { value: average.toFixed(1), label: 'Среднее значение', unit: 'кг' },
        { value: percentages.join('; '), label: 'Проценты от 1RM' }
    ];
},
  'menstrualnyj-cikl': (inputs) => {
    const lastStr = String(inputs.lastPeriod);
    const cycle = Number(inputs.cycleLength);
    const periodLen = Number(inputs.periodLength);
    if (!lastStr)
        return [{ value: '—', label: 'Следующие месячные' }, { value: '—', label: 'Овуляция' }, { value: '—', label: 'Фертильное окно' }, { value: '—', label: 'Безопасные дни' }];
    const last = new Date(lastStr);
    const nextPeriod = new Date(last);
    nextPeriod.setDate(last.getDate() + cycle);
    const ovulation = new Date(last);
    ovulation.setDate(last.getDate() + cycle - 14);
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 2);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 2);
    const safeEnd = new Date(last);
    safeEnd.setDate(last.getDate() + periodLen);
    const safeStart = new Date(nextPeriod);
    safeStart.setDate(nextPeriod.getDate() - 7);
    return [
        { value: nextPeriod.toLocaleDateString('ru-RU'), label: 'Следующие месячные' },
        { value: ovulation.toLocaleDateString('ru-RU'), label: 'Овуляция (приблизительно)' },
        { value: `${fertileStart.toLocaleDateString('ru-RU')} - ${fertileEnd.toLocaleDateString('ru-RU')}`, label: 'Фертильное окно' },
        { value: `До ${safeEnd.toLocaleDateString('ru-RU')} и после ${safeStart.toLocaleDateString('ru-RU')}`, label: 'Безопасные дни' }
    ];
},
}
