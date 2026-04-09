'use client';

import { notFound } from 'next/navigation';
import { Calculator } from '@/lib/types';
import { categories } from '@/lib/categories';
import { calculators, getCalculatorBySlug } from '@/lib/calculators';
import { getCategoryStyle } from '@/lib/category-styles';
import { FormulaCalculator } from '@/components/calculator/formula-calculator';
import { ConverterCalculator } from '@/components/calculator/converter-calculator';
import { ArithmeticCalculator } from '@/components/calculator/arithmetic-calculator';
import { getCalculator as getCalculatorEngine } from '@/components/calculator/calculator-engine';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calculator as CalculatorIcon, ChevronRight, Clock, BookOpen, Info, HelpCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import { generateClientCalculatorSchema } from '@/lib/client-schema';

interface CalculatorPageProps {
  params: {
    slug: string;
  };
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = params;
  
  const calculatorData = useMemo(() => getCalculatorBySlug(slug), [slug]);
  
  if (!calculatorData) {
    notFound();
  }

  // Create calculator without calculate function for passing to components
  const calculator = calculatorData;
  
  // Find category and subcategory
  const category = categories.find((c) => c.slug === calculator.category);
  const subcategory = category?.subcategories.find((s) => s.slug === calculator.subcategory);
  const style = getCategoryStyle(calculator.category);
  const CategoryIcon = style.icon;

  // Check if we have a client-side engine for this calculator
  const hasEngine = getCalculatorEngine(calculator.id) !== null;

  // Generate schema for this calculator
  const calculatorSchema = useMemo(() => {
    const faqs = calculator.content.faq?.map(faq => ({
      question: faq.question,
      answer: faq.answer
    })) || [];
    
    return generateClientCalculatorSchema(
      calculator.title,
      calculator.description,
      `/calc/${slug}`,
      category?.title,
      faqs
    );
  }, [calculator, slug, category]);

  // Inject JSON-LD schema using useEffect for client-side rendering
  useEffect(() => {
    // Remove any existing schema scripts
    const existingScripts = document.querySelectorAll('script[data-schema="true"]');
    existingScripts.forEach(script => script.remove());

    // Add new schema scripts
    calculatorSchema.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      const scripts = document.querySelectorAll('script[data-schema="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [calculatorSchema]);

  // Render appropriate calculator component
  const renderCalculator = () => {
    if (!hasEngine && calculator.type !== 'arithmetic') {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Калькулятор в разработке</p>
        </Card>
      );
    }
    
    switch (calculator.type) {
      case 'arithmetic':
        return <ArithmeticCalculator calculator={calculator} />;
      case 'converter':
        return <ConverterCalculator calculator={calculator} />;
      case 'formula':
      default:
        return <FormulaCalculator calculator={calculator} />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <Link href="/" className="transition-colors hover:text-foreground">
              Главная
            </Link>
          </li>
          {category && (
            <>
              <li role="presentation" aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link 
                  href={`/${category.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
              </li>
            </>
          )}
          {subcategory && (
            <>
              <li role="presentation" aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link 
                  href={`/${category?.slug}/podkat/${subcategory.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {subcategory.title}
                </Link>
              </li>
            </>
          )}
          <li role="presentation" aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="font-normal text-foreground">{calculator.title}</span>
          </li>
        </ol>
      </nav>

      <article>
        {/* Header with Category Style */}
        <div className={`mb-8 rounded-2xl p-6 bg-gradient-to-br ${style.gradient} border ${style.borderColor}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
              <CategoryIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                {calculator.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {category?.title} {subcategory && `• ${subcategory.title}`}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{calculator.description}</p>
        </div>

        {/* Calculator Component */}
        <div className="mb-8">
          {renderCalculator()}
        </div>

        {/* How to Use Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Как использовать</h2>
          </div>
          <Card className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {calculator.content.howTo}
            </p>
          </Card>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">О калькуляторе</h2>
          </div>
          <Card className="p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {calculator.content.about}
            </p>
            {calculator.content.formula && (
              <>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-semibold mb-2">Формула</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {calculator.content.formula}
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>

        {/* FAQ Section */}
        {calculator.content.faq && calculator.content.faq.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Часто задаваемые вопросы</h2>
            </div>
            <Accordion className="space-y-2">
              {calculator.content.faq.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Sources Section */}
        {calculator.content.sources && calculator.content.sources.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Источники</h2>
            </div>
            <Card className="p-6">
              <ul className="space-y-2">
                {calculator.content.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {source.title}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Updated At */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Обновлено: {calculator.content.updatedAt}</span>
        </div>
      </article>
    </div>
  );
}
