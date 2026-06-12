import type { ComputeFn } from './compute-helpers';
import { fmtResult } from './compute-helpers';

export const computeMap_conv_pressure_area_2: Record<string, ComputeFn> = {
  'tehn-atm-v-pa': (inputs) => {
    const value = Number(inputs.value);
    if (!value)
        return [{ value: '—', label: 'Результат' }];
    const result = value * 98066.5;
    return [{
            value: `${value} ат = ${fmtResult(result)} Па`,
            label: 'Результат'
        }];
},
}
