import { describe, it, expect } from 'vitest';
import { bmiCalculator } from './health';

describe('BMI Calculator (health.ts)', () => {
  const calc = bmiCalculator;

  it('should calculate BMI for 175cm 70kg', () => {
    const result = calc.calculate({ height: 175, weight: 70 });
    expect(result[0].value).toBe(22.9);
    expect(result[0].unit).toBe('кг/м²');
    expect(result[1].value).toBe('Нормальная масса');
  });

  it('should classify underweight BMI', () => {
    const result = calc.calculate({ height: 180, weight: 55 });
    const bmi = result[0].value as number;
    expect(bmi).toBeLessThan(18.5);
    expect(result[1].value).toMatch(/Недостаточная|дефицит/);
  });

  it('should classify obesity BMI', () => {
    const result = calc.calculate({ height: 170, weight: 120 });
    const bmi = result[0].value as number;
    expect(bmi).toBeGreaterThanOrEqual(35);
    expect(result[1].value).toContain('Ожирение');
  });

  it('should return dash for zero height', () => {
    const result = calc.calculate({ height: 0, weight: 70 });
    expect(result[0].value).toBe('—');
  });

  it('should calculate BMI = weight / height²', () => {
    const height = 175;
    const weight = 70;
    const expected = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
    const result = calc.calculate({ height, weight });
    expect(result[0].value).toBe(expected);
  });
});
