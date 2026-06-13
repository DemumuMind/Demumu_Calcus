import 'server-only';

import type { ComputeFn } from './compute-helpers';
import {
  getCalculators as getMetadataCalculators,
  getCalculatorBySlug as getMetadataCalculatorBySlug,
  getCalculatorsByCategory as getMetadataCalculatorsByCategory,
  getCalculatorsBySubcategory as getMetadataCalculatorsBySubcategory,
  fallbackCalculate,
} from './metadata';

import { computeMap_tech_it_b_2 } from './compute-tech_it_b_2';
import { computeMap_missing_1 } from './compute-missing-1';
import { computeMap_missing_2 } from './compute-missing-2';
import { computeMap_missing_3 } from './compute-missing-3';
import { computeMap_missing_4 } from './compute-missing-4';
import { computeMap_missing_5 } from './compute-missing-5';
import { computeMap_missing_6 } from './compute-missing-6';

const computeMap: Record<string, ComputeFn> = {
  ...computeMap_tech_it_b_2,
  ...computeMap_missing_1,
  ...computeMap_missing_2,
  ...computeMap_missing_3,
  ...computeMap_missing_4,
  ...computeMap_missing_5,
  ...computeMap_missing_6,
};

export function getCalculators() {
  return getMetadataCalculators().map((calc) => ({
    ...calc,
    calculate: computeMap[calc.slug] || fallbackCalculate,
  }));
}

export const calculators = getCalculators();

export function getCalculatorBySlug(slug: string) {
  const calc = getMetadataCalculatorBySlug(slug);
  if (!calc) return undefined;
  return {
    ...calc,
    calculate: computeMap[slug] || fallbackCalculate,
  };
}

export function getCalculatorsByCategory(category: string) {
  return getMetadataCalculatorsByCategory(category).map((calc) => ({
    ...calc,
    calculate: computeMap[calc.slug] || fallbackCalculate,
  }));
}

export function getCalculatorsBySubcategory(subcategory: string) {
  return getMetadataCalculatorsBySubcategory(subcategory).map((calc) => ({
    ...calc,
    calculate: computeMap[calc.slug] || fallbackCalculate,
  }));
}
