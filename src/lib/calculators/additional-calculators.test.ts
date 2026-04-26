import { describe, it, expect } from 'vitest';
import { bmiCalculator, calorieCalculator, mortgageCalculator } from './additional-calculators';

describe('BMI Calculator (additional-calculators.ts)', () => {
  it('should calculate BMI for 170cm 70kg male age 30', () => {
    const result = bmiCalculator.calculate({ height: 170, weight: 70, gender: 'male', age: 30 });
    const bmiValue = parseFloat(result[0].value as string);
    expect(bmiValue).toBeCloseTo(24.2, 0);
    expect(result[1].value).toContain('Нормальная');
  });

  it('should show ideal weight range', () => {
    const result = bmiCalculator.calculate({ height: 170, weight: 70, gender: 'male', age: 30 });
    expect(result[2].value).toContain('кг');
    expect(result[2].value).toContain('—');
  });

  it('should adjust ideal weight for age > 40', () => {
    const result30 = bmiCalculator.calculate({ height: 170, weight: 70, gender: 'male', age: 30 });
    const result50 = bmiCalculator.calculate({ height: 170, weight: 70, gender: 'male', age: 50 });
    expect(result50[2].value).not.toBe(result30[2].value);
  });

  it('should reject invalid inputs', () => {
    const result = bmiCalculator.calculate({ height: 0, weight: 0, gender: 'male', age: 30 });
    expect(result[0].value).toBe('—');
  });
});

describe('Calorie Calculator', () => {
  it('should calculate BMR for male 30y 170cm 70kg', () => {
    const result = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'moderate', goal: 'maintain'
    });
    expect(result[0].value).toContain('ккал');
    expect(result[1].value).toContain('ккал');
    expect(result[2].value).toContain('ккал');
  });

  it('should have higher TDEE for active vs sedentary', () => {
    const sedentary = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'sedentary', goal: 'maintain'
    });
    const active = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'very-active', goal: 'maintain'
    });
    const sedTdee = parseInt(sedentary[1].value.replace(/\D/g, ''));
    const actTdee = parseInt(active[1].value.replace(/\D/g, ''));
    expect(actTdee).toBeGreaterThan(sedTdee);
  });

  it('should show fewer calories for weight loss goal', () => {
    const maintain = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'moderate', goal: 'maintain'
    });
    const lose = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'moderate', goal: 'lose'
    });
    const maintainCal = parseInt(maintain[2].value.replace(/\D/g, ''));
    const loseCal = parseInt(lose[2].value.replace(/\D/g, ''));
    expect(loseCal).toBeLessThan(maintainCal);
  });

  it('should calculate lower BMR for female vs male', () => {
    const male = calorieCalculator.calculate({
      gender: 'male', age: 30, height: 170, weight: 70, activity: 'sedentary', goal: 'maintain'
    });
    const female = calorieCalculator.calculate({
      gender: 'female', age: 30, height: 170, weight: 70, activity: 'sedentary', goal: 'maintain'
    });
    const maleBmr = parseInt(male[0].value.replace(/\D/g, ''));
    const femaleBmr = parseInt(female[0].value.replace(/\D/g, ''));
    expect(maleBmr).toBeGreaterThan(femaleBmr);
  });

  it('should reject invalid inputs', () => {
    const result = calorieCalculator.calculate({
      gender: 'male', age: 0, height: 0, weight: 0, activity: 'moderate', goal: 'maintain'
    });
    expect(result[0].value).toBe('—');
  });
});

describe('Mortgage Calculator', () => {
  it('should calculate annuity mortgage payment', () => {
    const result = mortgageCalculator.calculate({
      propertyValue: 5000000,
      downPayment: 1000000,
      interestRate: 8.5,
      loanTerm: 20,
      paymentType: 'annuity'
    });
    expect(result[0].value).toContain('4');
    expect(result[1].value).toBeTruthy();
    expect(result[2].value).toBeTruthy();
    expect(result[3].value).toBeTruthy();
  });

  it('should calculate differentiated mortgage payment', () => {
    const result = mortgageCalculator.calculate({
      propertyValue: 5000000,
      downPayment: 1000000,
      interestRate: 8.5,
      loanTerm: 20,
      paymentType: 'differentiated'
    });
    expect(result[0].value).toContain('4');
    expect(result[1].value).toContain('—');
  });

  it('should have higher total for longer term', () => {
    const short = mortgageCalculator.calculate({
      propertyValue: 5000000, downPayment: 1000000, interestRate: 8.5, loanTerm: 10, paymentType: 'annuity'
    });
    const long = mortgageCalculator.calculate({
      propertyValue: 5000000, downPayment: 1000000, interestRate: 8.5, loanTerm: 30, paymentType: 'annuity'
    });
    const shortTotal = parseInt(short[2].value.replace(/\D/g, ''));
    const longTotal = parseInt(long[2].value.replace(/\D/g, ''));
    expect(longTotal).toBeGreaterThan(shortTotal);
  });

  it('should reject when downPayment >= propertyValue', () => {
    const result = mortgageCalculator.calculate({
      propertyValue: 5000000, downPayment: 5000000, interestRate: 8.5, loanTerm: 20, paymentType: 'annuity'
    });
    expect(result[0].value).toBe('—');
  });
});
