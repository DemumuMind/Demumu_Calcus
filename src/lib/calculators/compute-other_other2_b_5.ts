import type { ComputeFn } from './compute-helpers';

export const computeMap_other_other2_b_5: Record<string, ComputeFn> = {
  'vremya-v-puti': (inputs) => {
    const distance = Number(inputs.distance);
    const avgSpeed = Number(inputs.avgSpeed);
    const trafficDelay = Number(inputs.trafficDelay);
    const restStops = Number(inputs.restStops);
    if (!distance || !avgSpeed) {
        return [
            { value: '—', label: 'Базовое время' },
            { value: '—', label: 'Время в пробках' },
            { value: '—', label: 'Время остановок' },
            { value: '—', label: 'Общее время' },
            { value: '—', label: 'Время прибытия' }
        ];
    }
    const baseMinutes = (distance / avgSpeed) * 60;
    const trafficMinutes = baseMinutes * (trafficDelay / 100);
    const restMinutes = restStops * 15; // Assume 15 min per stop
    const totalMinutes = baseMinutes + trafficMinutes + restMinutes;
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        if (hours > 0) {
            return `${hours} ч ${mins} мин`;
        }
        return `${mins} мин`;
    };
    const baseTime = formatTime(baseMinutes);
    const trafficTime = formatTime(trafficMinutes);
    const restTime = formatTime(restMinutes);
    const totalTime = formatTime(totalMinutes);
    const now = new Date();
    const arrival = new Date(now.getTime() + totalMinutes * 60000);
    const arrivalTime = arrival.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return [
        { value: baseTime, label: 'Базовое время' },
        { value: trafficTime, label: 'Время в пробках' },
        { value: restTime, label: 'Время остановок' },
        { value: totalTime, label: 'Общее время' },
        { value: arrivalTime, label: 'Время прибытия' }
    ];
},
  'zabor-raschet': (inputs) => {
    const perimeter = Number(inputs.perimeter);
    const spacing = Number(inputs.postSpacing);
    const sections = Math.ceil(perimeter / spacing);
    const posts = sections + 1;
    return [
        { value: posts, label: 'Количество столбов' },
        { value: sections, label: 'Количество секций' },
        { value: perimeter, label: 'Длина забора', unit: 'м' }
    ];
},
}
