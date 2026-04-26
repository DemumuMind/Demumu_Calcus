import { describe, it, expect } from 'vitest';
import { mathematicalCalculators } from './math';
import { percentageCalculator } from './math';

describe('Percentage Calculator', () => {
  const calc = percentageCalculator;

  it('should calculate 20% of 1000', () => {
    const result = calc.calculate({ value: 1000, percentage: 20 });
    expect(result[0].value).toBe('200.00');
    expect(result[1].value).toBe('1200.00');
    expect(result[2].value).toBe('800.00');
  });

  it('should calculate 50% of 200', () => {
    const result = calc.calculate({ value: 200, percentage: 50 });
    expect(result[0].value).toBe('100.00');
  });

  it('should return dash for zero value', () => {
    const result = calc.calculate({ value: 0, percentage: 20 });
    expect(result[0].value).toBe('—');
  });

  it('should calculate 10% of 500', () => {
    const result = calc.calculate({ value: 500, percentage: 10 });
    expect(result[0].value).toBe('50.00');
    expect(result[1].value).toBe('550.00');
    expect(result[2].value).toBe('450.00');
  });
});

describe('Mathematical Calculators', () => {
  it('should have at least 5 calculators', () => {
    expect(mathematicalCalculators.length).toBeGreaterThanOrEqual(5);
  });

  it('every calculator should have a working calculate function', () => {
    for (const calc of mathematicalCalculators) {
      // Skip UI-only calculators with no backend inputs (e.g., engineering calculator)
      if (calc.inputs.length === 0) {
        const result = calc.calculate({});
        expect(Array.isArray(result)).toBe(true);
        continue;
      }

      const defaultInputs: Record<string, any> = {};
      calc.inputs.forEach(input => {
        if (input.defaultValue !== undefined) {
          defaultInputs[input.name] = input.defaultValue;
        } else if (input.type === 'number') {
          defaultInputs[input.name] = 1;
        } else if (input.type === 'select' && input.options?.length) {
          defaultInputs[input.name] = input.options[0].value;
        }
      });
      const result = calc.calculate(defaultInputs);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    }
  });
});
