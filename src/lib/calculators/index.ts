import type { Calculator } from '../types';
import type { ComputeFn } from './compute-helpers';
import { computeMap_construction_a_1 } from './compute-construction_a_1';
import { computeMap_construction_a_2 } from './compute-construction_a_2';
import { computeMap_construction_b_1 } from './compute-construction_b_1';
import { computeMap_construction_b_2 } from './compute-construction_b_2';
import { computeMap_clothing_sizes } from './compute-conv-clothing-sizes';
import { computeMap_currency } from './compute-conv-currency';
import { computeMap_length_mass } from './compute-conv-length-mass';
import { computeMap_temp_speed_a } from './compute-conv-temp-speed_a';
import { computeMap_temp_speed_b } from './compute-conv-temp-speed_b';
import { computeMap_conv_energy_power_1 } from './compute-conv_energy_power_1';
import { computeMap_conv_energy_power_2 } from './compute-conv_energy_power_2';
import { computeMap_conv_pressure_area_1 } from './compute-conv_pressure_area_1';
import { computeMap_conv_pressure_area_2 } from './compute-conv_pressure_area_2';
import { computeMap_daily_daily_a_1 } from './compute-daily_daily_a_1';
import { computeMap_daily_daily_a_2 } from './compute-daily_daily_a_2';
import { computeMap_daily_daily_a_3 } from './compute-daily_daily_a_3';
import { computeMap_daily_daily_a_4 } from './compute-daily_daily_a_4';
import { computeMap_daily_daily_a_5 } from './compute-daily_daily_a_5';
import { computeMap_daily_daily_b_1 } from './compute-daily_daily_b_1';
import { computeMap_daily_daily_b_2 } from './compute-daily_daily_b_2';
import { computeMap_daily_daily_b_3 } from './compute-daily_daily_b_3';
import { computeMap_daily_daily_b_4 } from './compute-daily_daily_b_4';
import { computeMap_daily_daily_b_5 } from './compute-daily_daily_b_5';
import { computeMap_finance_a_1 } from './compute-finance_a_1';
import { computeMap_finance_a_2 } from './compute-finance_a_2';
import { computeMap_finance_b_1 } from './compute-finance_b_1';
import { computeMap_finance_b_2 } from './compute-finance_b_2';
import { computeMap_health_beauty } from './compute-health-beauty';
import { computeMap_health_health2_a_1 } from './compute-health_health2_a_1';
import { computeMap_health_health2_a_2 } from './compute-health_health2_a_2';
import { computeMap_health_health2_a_3 } from './compute-health_health2_a_3';
import { computeMap_health_health2_a_4 } from './compute-health_health2_a_4';
import { computeMap_health_health2_b_1 } from './compute-health_health2_b_1';
import { computeMap_health_health2_b_2 } from './compute-health_health2_b_2';
import { computeMap_health_health2_b_3 } from './compute-health_health2_b_3';
import { computeMap_health_health2_b_4 } from './compute-health_health2_b_4';
import { computeMap_hobby_a } from './compute-hobby_a';
import { computeMap_hobby_b_1 } from './compute-hobby_b_1';
import { computeMap_hobby_b_2 } from './compute-hobby_b_2';
import { computeMap_other_other2_a_1 } from './compute-other_other2_a_1';
import { computeMap_other_other2_a_2 } from './compute-other_other2_a_2';
import { computeMap_other_other2_a_3 } from './compute-other_other2_a_3';
import { computeMap_other_other2_a_4 } from './compute-other_other2_a_4';
import { computeMap_other_other2_a_5 } from './compute-other_other2_a_5';
import { computeMap_other_other2_b_1 } from './compute-other_other2_b_1';
import { computeMap_other_other2_b_2 } from './compute-other_other2_b_2';
import { computeMap_other_other2_b_3 } from './compute-other_other2_b_3';
import { computeMap_other_other2_b_4 } from './compute-other_other2_b_4';
import { computeMap_other_other2_b_5 } from './compute-other_other2_b_5';
import { computeMap_science_science_a_1 } from './compute-science_science_a_1';
import { computeMap_science_science_a_2 } from './compute-science_science_a_2';
import { computeMap_science_science_a_3 } from './compute-science_science_a_3';
import { computeMap_science_science_a_4 } from './compute-science_science_a_4';
import { computeMap_science_science_a_5 } from './compute-science_science_a_5';
import { computeMap_science_science_b_1 } from './compute-science_science_b_1';
import { computeMap_science_science_b_2 } from './compute-science_science_b_2';
import { computeMap_science_science_b_3 } from './compute-science_science_b_3';
import { computeMap_science_science_b_4 } from './compute-science_science_b_4';
import { computeMap_tech_it_a_1 } from './compute-tech_it_a_1';
import { computeMap_tech_it_a_2 } from './compute-tech_it_a_2';
import { computeMap_tech_it_a_3 } from './compute-tech_it_a_3';
import { computeMap_tech_it_a_4 } from './compute-tech_it_a_4';
import { computeMap_tech_it_b_1 } from './compute-tech_it_b_1';
import { computeMap_tech_it_b_2 } from './compute-tech_it_b_2';
import { computeMap_missing_1 } from './compute-missing-1';
import { computeMap_missing_2 } from './compute-missing-2';
import { computeMap_missing_3 } from './compute-missing-3';
import { computeMap_missing_4 } from './compute-missing-4';
import { computeMap_missing_5 } from './compute-missing-5';
import { computeMap_missing_6 } from './compute-missing-6';

// JSON data
import additional_calculators from './data/additional-calculators.json';
import area_volume from './data/area-volume.json';
import baking_form_calculator from './data/baking-form-calculator.json';
import beauty_care from './data/beauty-care.json';
import business_marketing from './data/business-marketing.json';
import color_tools from './data/color-tools.json';
import color from './data/color.json';
import construction_additional from './data/construction-additional.json';
import construction_extended from './data/construction-extended.json';
import construction_final from './data/construction-final.json';
import construction_more from './data/construction-more.json';
import construction from './data/construction.json';
import converters_advanced from './data/converters-advanced.json';
import converters_ancient from './data/converters-ancient.json';
import converters_astronomy from './data/converters-astronomy.json';
import converters_cooking from './data/converters-cooking.json';
import converters_currency from './data/converters-currency.json';
import converters_extended from './data/converters-extended.json';
import converters_length_mass from './data/converters-length-mass.json';
import converters_more from './data/converters-more.json';
import converters_pressure_area from './data/converters-pressure-area.json';
import converters_pressure_energy_power_time_angles_data from './data/converters-pressure-energy-power-time-angles-data.json';
import converters_sizes_travel_pairs from './data/converters-sizes-travel-pairs.json';
import converters_special_more from './data/converters-special-more.json';
import converters_special_pairs from './data/converters-special-pairs.json';
import converters_special from './data/converters-special.json';
import converters_temp_speed_volume_area from './data/converters-temp-speed-volume-area.json';
import converters_travel from './data/converters-travel.json';
import converters from './data/converters.json';
import cooking_food from './data/cooking-food.json';
import daily_extended from './data/daily-extended.json';
import daily_more_1 from './data/daily-more-1.json';
import daily_more_2 from './data/daily-more-2.json';
import daily_more_3 from './data/daily-more-3.json';
import daily from './data/daily.json';
import datetime from './data/datetime.json';
import digital from './data/digital.json';
import diy_crafts from './data/diy-crafts.json';
import education_learning from './data/education-learning.json';
import engineering_more from './data/engineering-more.json';
import engineering from './data/engineering.json';
import environment_ecology from './data/environment-ecology.json';
import fashion_style from './data/fashion-style.json';
import finance_advanced from './data/finance-advanced.json';
import finance_extended from './data/finance-extended.json';
import finance_more from './data/finance-more.json';
import finance_russian from './data/finance-russian.json';
import finance from './data/finance.json';
import fitness_bodybuilding from './data/fitness-bodybuilding.json';
import generators_more from './data/generators-more.json';
import generators from './data/generators.json';
import geometry from './data/geometry.json';
import health_extended_more from './data/health-extended-more.json';
import health_extended from './data/health-extended.json';
import health_more_1 from './data/health-more-1.json';
import health_more_2 from './data/health-more-2.json';
import health_more_3 from './data/health-more-3.json';
import health from './data/health.json';
import hobbies_photography from './data/hobbies-photography.json';
import hobby_garden from './data/hobby-garden.json';
import home_maintenance from './data/home-maintenance.json';
import it_devops from './data/it-devops.json';
import math_advanced from './data/math-advanced.json';
import math from './data/math.json';
import missing_calculators from './data/missing-calculators.json';
import music_audio from './data/music-audio.json';
import niche_calculators from './data/niche-calculators.json';
import parenting_baby from './data/parenting-baby.json';
import percentage_calculators from './data/percentage-calculators.json';
import pet_care from './data/pet-care.json';
import physics_more from './data/physics-more.json';
import physics from './data/physics.json';
import pomodoro_calculator from './data/pomodoro-calculator.json';
import remaining_calculators from './data/remaining-calculators.json';
import shopping_deals from './data/shopping-deals.json';
import sports_fitness from './data/sports-fitness.json';
import technology from './data/technology.json';
import text_tools from './data/text-tools.json';
import text from './data/text.json';
import time_date from './data/time-date.json';
import tips_calculator from './data/tips-calculator.json';
import transport from './data/transport.json';

const computeMap: Record<string, ComputeFn> = {
  ...computeMap_tech_it_b_2, ...computeMap_missing_1, ...computeMap_missing_2, ...computeMap_missing_3, ...computeMap_missing_4, ...computeMap_missing_5, ...computeMap_missing_6
};

const allJsonData: any[] = [
  ...additional_calculators,
  ...area_volume,
  ...baking_form_calculator,
  ...beauty_care,
  ...business_marketing,
  ...color_tools,
  ...color,
  ...construction_additional,
  ...construction_extended,
  ...construction_final,
  ...construction_more,
  ...construction,
  ...converters_advanced,
  ...converters_ancient,
  ...converters_astronomy,
  ...converters_cooking,
  ...converters_currency,
  ...converters_extended,
  ...converters_length_mass,
  ...converters_more,
  ...converters_pressure_area,
  ...converters_pressure_energy_power_time_angles_data,
  ...converters_sizes_travel_pairs,
  ...converters_special_more,
  ...converters_special_pairs,
  ...converters_special,
  ...converters_temp_speed_volume_area,
  ...converters_travel,
  ...converters,
  ...cooking_food,
  ...daily_extended,
  ...daily_more_1,
  ...daily_more_2,
  ...daily_more_3,
  ...daily,
  ...datetime,
  ...digital,
  ...diy_crafts,
  ...education_learning,
  ...engineering_more,
  ...engineering,
  ...environment_ecology,
  ...fashion_style,
  ...finance_advanced,
  ...finance_extended,
  ...finance_more,
  ...finance_russian,
  ...finance,
  ...fitness_bodybuilding,
  ...generators_more,
  ...generators,
  ...geometry,
  ...health_extended_more,
  ...health_extended,
  ...health_more_1,
  ...health_more_2,
  ...health_more_3,
  ...health,
  ...hobbies_photography,
  ...hobby_garden,
  ...home_maintenance,
  ...it_devops,
  ...math_advanced,
  ...math,
  ...missing_calculators,
  ...music_audio,
  ...niche_calculators,
  ...parenting_baby,
  ...percentage_calculators,
  ...pet_care,
  ...physics_more,
  ...physics,
  ...pomodoro_calculator,
  ...remaining_calculators,
  ...shopping_deals,
  ...sports_fitness,
  ...technology,
  ...text_tools,
  ...text,
  ...time_date,
  ...tips_calculator,
  ...transport,
];

export function getCalculators(): Calculator[] {
  return allJsonData.map((calc: any) => ({
    ...calc,
    inputs: calc.inputs || [],
    outputs: calc.outputs || [],
    content: calc.content || { howTo: '', about: '', faq: [], sources: [], updatedAt: '' },
    compute: computeMap[calc.slug] || (() => [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }])
  }));
}

export const calculators = getCalculators();

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c: Calculator) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((c: Calculator) => c.category === category);
}

export function getCalculatorsBySubcategory(subcategory: string): Calculator[] {
  return calculators.filter((c: Calculator) => c.subcategory === subcategory);
}
