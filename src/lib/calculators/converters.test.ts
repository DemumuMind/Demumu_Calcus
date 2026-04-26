import { describe, it, expect } from 'vitest';
import { kmhToMsConverter } from './index';
import { currencyConverter } from './converters';

describe('Speed Converter (kmhToMsConverter)', () => {
  const calc = kmhToMsConverter;

  it('should convert 1 km/h to m/s', () => {
    const result = calc.calculate({ value: 1, from: 'kmh', to: 'ms' });
    expect(result[0].value).toContain('0.27778');
    expect(result[0].value).toContain('м/с');
  });

  it('should convert 100 km/h to m/s', () => {
    const result = calc.calculate({ value: 100, from: 'kmh', to: 'ms' });
    expect(result[0].value).toContain('27.77778');
  });

  it('should convert 1 m/s to km/h', () => {
    const result = calc.calculate({ value: 1, from: 'ms', to: 'kmh' });
    expect(result[0].value).toContain('3.6');
  });

  it('should convert km/h to mph', () => {
    const result = calc.calculate({ value: 100, from: 'kmh', to: 'mph' });
    expect(result[0].value).toContain('62.13712');
  });

  it('should convert km/h to knots', () => {
    const result = calc.calculate({ value: 100, from: 'kmh', to: 'knot' });
    expect(result[0].value).toContain('53.9957');
  });

  it('should return dash for zero value', () => {
    const result = calc.calculate({ value: 0, from: 'kmh', to: 'ms' });
    expect(result[0].value).toBe('—');
  });

  it('should handle same-unit conversion', () => {
    const result = calc.calculate({ value: 50, from: 'kmh', to: 'kmh' });
    expect(result[0].value).toContain('50');
  });
});

describe('Currency Converter', () => {
  const calc = currencyConverter;

  it('should convert 100 USD to RUB', () => {
    const result = calc.calculate({ amount: 100, from: 'USD', to: 'RUB' });
    expect(result[0].value).toContain('₽');
    expect(result[0].value).toContain('9250');
  });

  it('should return 1:1 for same currency', () => {
    const result = calc.calculate({ amount: 100, from: 'USD', to: 'USD' });
    expect(result[0].value).toContain('100.00 $');
  });

  it('should return dash for zero amount', () => {
    const result = calc.calculate({ amount: 0, from: 'USD', to: 'RUB' });
    expect(result[0].value).toBe('—');
  });

  it('should convert EUR to USD', () => {
    const result = calc.calculate({ amount: 100, from: 'EUR', to: 'USD' });
    expect(result[0].value).toContain('$');
  });
});
