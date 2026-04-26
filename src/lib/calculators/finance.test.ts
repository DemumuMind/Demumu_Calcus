import { describe, it, expect } from 'vitest';
import { vatCalculator } from './finance';

describe('VAT Calculator', () => {
  const calc = vatCalculator;

  it('should add 20% VAT to 10000', () => {
    const result = calc.calculate({ amount: 10000, vatRate: '20', operation: 'add' });
    expect(result[0].value).toBe('10000.00');
    expect(result[1].value).toBe('2000.00');
    expect(result[2].value).toBe('12000.00');
  });

  it('should extract 20% VAT from 12000', () => {
    const result = calc.calculate({ amount: 12000, vatRate: '20', operation: 'extract' });
    expect(result[0].value).toBe('10000.00');
    expect(result[1].value).toBe('2000.00');
    expect(result[2].value).toBe('12000.00');
  });

  it('should add 10% VAT to 1000', () => {
    const result = calc.calculate({ amount: 1000, vatRate: '10', operation: 'add' });
    expect(result[1].value).toBe('100.00');
    expect(result[2].value).toBe('1100.00');
  });

  it('should return dash for zero amount', () => {
    const result = calc.calculate({ amount: 0, vatRate: '20', operation: 'add' });
    expect(result[0].value).toBe('—');
  });

  it('should handle 0% VAT rate', () => {
    const result = calc.calculate({ amount: 5000, vatRate: '0', operation: 'add' });
    expect(result[1].value).toBe('0.00');
    expect(result[2].value).toBe('5000.00');
  });
});
