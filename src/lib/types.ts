export type CalculatorType = 'arithmetic' | 'converter' | 'formula' | 'reference' | 'timer' | 'estimator' | 'tool' | 'assessment' | 'calculator';

export interface InputField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date' | 'boolean';
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  defaultValue?: number | string | boolean;
  required?: boolean;
}

export interface OutputField {
  name: string;
  label: string;
  type?: 'number' | 'text';
  unit?: string;
  formula?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Source {
  title: string;
  url: string;
}

export interface CalculatorContent {
  howTo: string;
  about: string;
  usage?: string;
  formula?: string;
  faq: FAQItem[];
  sources: Source[];
  updatedAt: string;
}

export interface CalculationResult {
  value: number | string;
  label: string;
  unit?: string;
  additionalInfo?: string;
}

export interface Calculator {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: CalculatorType;
  inputs: InputField[];
  outputs: OutputField[];
  calculate: (inputs: Record<string, any>) => CalculationResult[] | any;
  content: CalculatorContent;
  popularCalculations?: { value: number | string; url: string }[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  slug: string;
  title: string;
  description: string;
}
