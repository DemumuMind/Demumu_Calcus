import type { Calculator } from '../types';

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

export const fallbackCalculate = () => [
  { value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' },
];

export function getCalculators(): Calculator[] {
  return allJsonData.map((calc: any) => ({
    ...calc,
    inputs: calc.inputs || [],
    outputs: calc.outputs || [],
    content: calc.content || { howTo: '', about: '', faq: [], sources: [], updatedAt: '' },
    calculate: fallbackCalculate,
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
