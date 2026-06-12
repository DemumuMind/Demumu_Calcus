import type { ComputeFn } from './compute-helpers';
import { clothesEU2RU, clothesEU2US, clothesRU2EU, clothesRU2US, clothesUS2EU, clothesUS2RU, shoesEU2UK, shoesEU2US, shoesUK2EU, shoesUK2US, shoesUS2EU, shoesUS2UK } from './compute-helpers';

export const computeMap_clothing_sizes: Record<string, ComputeFn> = {
  'razmer-obuvi-eu-v-uk': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesEU2UK[v] || 'Неизвестный размер', label: 'Размер UK' }];
},
  'razmer-obuvi-eu-v-us': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesEU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
},
  'razmer-obuvi-uk-v-eu': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUK2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
},
  'razmer-obuvi-uk-v-us': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUK2US[v] || 'Неизвестный размер', label: 'Размер US' }];
},
  'razmer-obuvi-us-v-eu': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUS2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
},
  'razmer-obuvi-us-v-uk': (inputs) => {
    const v = String(inputs.value);
    return [{ value: shoesUS2UK[v] || 'Неизвестный размер', label: 'Размер UK' }];
},
  'razmer-odezhdy-eu-v-ru': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesEU2RU[v] || 'Неизвестный размер', label: 'Размер RU' }];
},
  'razmer-odezhdy-eu-v-us': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesEU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
},
  'razmer-odezhdy-ru-v-eu': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesRU2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
},
  'razmer-odezhdy-ru-v-us': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesRU2US[v] || 'Неизвестный размер', label: 'Размер US' }];
},
  'razmer-odezhdy-us-v-eu': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesUS2EU[v] || 'Неизвестный размер', label: 'Размер EU' }];
},
  'razmer-odezhdy-us-v-ru': (inputs) => {
    const v = String(inputs.value);
    return [{ value: clothesUS2RU[v] || 'Неизвестный размер', label: 'Размер RU' }];
},
}
