'use client';

import type { ComputeFn } from './compute-helpers';
import { SLUG_TO_FILE } from './slug-to-file';

const computeCache = new Map<string, ComputeFn>();

const fallbackCompute: ComputeFn = () => [
  { value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' },
];

function computeMapName(file: string): string {
  const suffix = file.replace(/^compute-/, '').replace(/-/g, '_');
  return `computeMap_${suffix}`;
}

async function loadComputeModule(file: string) {
  switch (file) {
    case 'compute-construction_a_1':
      return import('./compute-construction_a_1');
    case 'compute-construction_a_2':
      return import('./compute-construction_a_2');
    case 'compute-construction_b_1':
      return import('./compute-construction_b_1');
    case 'compute-construction_b_2':
      return import('./compute-construction_b_2');
    case 'compute-conv-clothing-sizes':
      return import('./compute-conv-clothing-sizes');
    case 'compute-conv-currency':
      return import('./compute-conv-currency');
    case 'compute-conv-length-mass':
      return import('./compute-conv-length-mass');
    case 'compute-conv-temp-speed_a':
      return import('./compute-conv-temp-speed_a');
    case 'compute-conv-temp-speed_b':
      return import('./compute-conv-temp-speed_b');
    case 'compute-conv_energy_power_1':
      return import('./compute-conv_energy_power_1');
    case 'compute-conv_energy_power_2':
      return import('./compute-conv_energy_power_2');
    case 'compute-conv_pressure_area_1':
      return import('./compute-conv_pressure_area_1');
    case 'compute-conv_pressure_area_2':
      return import('./compute-conv_pressure_area_2');
    case 'compute-daily_daily_a_1':
      return import('./compute-daily_daily_a_1');
    case 'compute-daily_daily_a_2':
      return import('./compute-daily_daily_a_2');
    case 'compute-daily_daily_a_3':
      return import('./compute-daily_daily_a_3');
    case 'compute-daily_daily_a_4':
      return import('./compute-daily_daily_a_4');
    case 'compute-daily_daily_a_5':
      return import('./compute-daily_daily_a_5');
    case 'compute-daily_daily_b_1':
      return import('./compute-daily_daily_b_1');
    case 'compute-daily_daily_b_2':
      return import('./compute-daily_daily_b_2');
    case 'compute-daily_daily_b_3':
      return import('./compute-daily_daily_b_3');
    case 'compute-daily_daily_b_4':
      return import('./compute-daily_daily_b_4');
    case 'compute-daily_daily_b_5':
      return import('./compute-daily_daily_b_5');
    case 'compute-finance_a_1':
      return import('./compute-finance_a_1');
    case 'compute-finance_a_2':
      return import('./compute-finance_a_2');
    case 'compute-finance_b_1':
      return import('./compute-finance_b_1');
    case 'compute-finance_b_2':
      return import('./compute-finance_b_2');
    case 'compute-health-beauty':
      return import('./compute-health-beauty');
    case 'compute-health_health2_a_1':
      return import('./compute-health_health2_a_1');
    case 'compute-health_health2_a_2':
      return import('./compute-health_health2_a_2');
    case 'compute-health_health2_a_3':
      return import('./compute-health_health2_a_3');
    case 'compute-health_health2_a_4':
      return import('./compute-health_health2_a_4');
    case 'compute-health_health2_b_1':
      return import('./compute-health_health2_b_1');
    case 'compute-health_health2_b_2':
      return import('./compute-health_health2_b_2');
    case 'compute-health_health2_b_3':
      return import('./compute-health_health2_b_3');
    case 'compute-health_health2_b_4':
      return import('./compute-health_health2_b_4');
    case 'compute-helpers':
      return import('./compute-helpers');
    case 'compute-hobby_a':
      return import('./compute-hobby_a');
    case 'compute-hobby_b_1':
      return import('./compute-hobby_b_1');
    case 'compute-hobby_b_2':
      return import('./compute-hobby_b_2');
    case 'compute-missing-1':
      return import('./compute-missing-1');
    case 'compute-missing-2':
      return import('./compute-missing-2');
    case 'compute-missing-3':
      return import('./compute-missing-3');
    case 'compute-missing-4':
      return import('./compute-missing-4');
    case 'compute-missing-5':
      return import('./compute-missing-5');
    case 'compute-missing-6':
      return import('./compute-missing-6');
    case 'compute-other_other2_a_1':
      return import('./compute-other_other2_a_1');
    case 'compute-other_other2_a_2':
      return import('./compute-other_other2_a_2');
    case 'compute-other_other2_a_3':
      return import('./compute-other_other2_a_3');
    case 'compute-other_other2_a_4':
      return import('./compute-other_other2_a_4');
    case 'compute-other_other2_a_5':
      return import('./compute-other_other2_a_5');
    case 'compute-other_other2_b_1':
      return import('./compute-other_other2_b_1');
    case 'compute-other_other2_b_2':
      return import('./compute-other_other2_b_2');
    case 'compute-other_other2_b_3':
      return import('./compute-other_other2_b_3');
    case 'compute-other_other2_b_4':
      return import('./compute-other_other2_b_4');
    case 'compute-other_other2_b_5':
      return import('./compute-other_other2_b_5');
    case 'compute-science_science_a_1':
      return import('./compute-science_science_a_1');
    case 'compute-science_science_a_2':
      return import('./compute-science_science_a_2');
    case 'compute-science_science_a_3':
      return import('./compute-science_science_a_3');
    case 'compute-science_science_a_4':
      return import('./compute-science_science_a_4');
    case 'compute-science_science_a_5':
      return import('./compute-science_science_a_5');
    case 'compute-science_science_b_1':
      return import('./compute-science_science_b_1');
    case 'compute-science_science_b_2':
      return import('./compute-science_science_b_2');
    case 'compute-science_science_b_3':
      return import('./compute-science_science_b_3');
    case 'compute-science_science_b_4':
      return import('./compute-science_science_b_4');
    case 'compute-tech_it_a_1':
      return import('./compute-tech_it_a_1');
    case 'compute-tech_it_a_2':
      return import('./compute-tech_it_a_2');
    case 'compute-tech_it_a_3':
      return import('./compute-tech_it_a_3');
    case 'compute-tech_it_a_4':
      return import('./compute-tech_it_a_4');
    case 'compute-tech_it_b_1':
      return import('./compute-tech_it_b_1');
    case 'compute-tech_it_b_2':
      return import('./compute-tech_it_b_2');
    default:
      return undefined;
  }
}

export async function getComputeFn(slug: string): Promise<ComputeFn> {
  const cached = computeCache.get(slug);
  if (cached) return cached;

  const file = SLUG_TO_FILE[slug];
  if (!file) {
    return fallbackCompute;
  }

  const mod = await loadComputeModule(file);
  if (!mod) {
    return fallbackCompute;
  }

  const map = (mod as Record<string, Record<string, ComputeFn>>)[computeMapName(file)];
  const fn = map?.[slug];
  if (!fn) {
    return fallbackCompute;
  }

  computeCache.set(slug, fn);
  return fn;
}
