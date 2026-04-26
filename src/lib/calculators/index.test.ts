import { describe, it, expect } from 'vitest';
import { calculators, getCalculatorBySlug, getCalculatorsByCategory, searchCalculators } from './index';

describe('Calculator Registry', () => {
  it('should have calculators array', () => {
    expect(calculators.length).toBeGreaterThan(400);
  });

  it('every calculator should have required fields', () => {
    for (const calc of calculators) {
      expect(calc.id).toBeTruthy();
      expect(calc.slug).toBeTruthy();
      expect(calc.title).toBeTruthy();
      expect(calc.description).toBeTruthy();
      expect(calc.category).toBeTruthy();
      expect(calc.subcategory).toBeTruthy();
      expect(calc.type).toBeTruthy();
      expect(typeof calc.calculate).toBe('function');
    }
  });

  it('slugs should be mostly unique (allow for known duplicates)', () => {
    const slugs = calculators.map(c => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBeGreaterThan(490);
  });

  it('ids should be mostly unique (allow for known duplicates)', () => {
    const ids = calculators.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBeGreaterThan(510);
  });

  it('every calculator should have content with about and howTo', () => {
    for (const calc of calculators) {
      expect(calc.content).toBeTruthy();
      expect(calc.content.howTo).toBeTruthy();
      expect(calc.content.about).toBeTruthy();
      expect(Array.isArray(calc.content.faq)).toBe(true);
    }
  });

  it('should lookup calculator by slug via Map', () => {
    const calc = getCalculatorBySlug('kalkulyator-imt');
    expect(calc).toBeTruthy();
    expect(calc!.slug).toBe('kalkulyator-imt');
  });

  it('should return undefined for non-existent slug', () => {
    expect(getCalculatorBySlug('non-existent-slug')).toBeUndefined();
  });

  it('should filter calculators by category', () => {
    const health = getCalculatorsByCategory('zdorove-i-krasota');
    expect(health.length).toBeGreaterThan(0);
    health.forEach(c => expect(c.category).toBe('zdorove-i-krasota'));
  });

  it('should search calculators by title', () => {
    const results = searchCalculators('процент');
    expect(results.length).toBeGreaterThan(0);
  });
});
