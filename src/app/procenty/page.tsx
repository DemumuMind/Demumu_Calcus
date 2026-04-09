import { Metadata } from 'next';
import Link from 'next/link';
import { Percent, ArrowRight, Calculator } from 'lucide-react';
import { percentageTypes } from '@/lib/percentages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Калькулятор процентов — онлайн расчёт',
  description: 'Онлайн калькулятор процентов. 7 типов расчётов: процент от числа, прибавить процент, вычесть процент, изменение в процентах и другие.',
  keywords: 'проценты, калькулятор процентов, процент от числа, прибавить процент, вычесть процент',
};

export default function PercentagesPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Проценты</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Калькулятор процентов
          </h1>
          <p className="text-lg text-muted-foreground">
            Выберите тип расчёта. Все калькуляторы работают онлайн без регистрации.
          </p>
        </div>

        {/* Calculator Types */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {percentageTypes.map((type) => (
            <Link
              key={type.id}
              href={`/procenty/${type.slug}`}
              className="group"
            >
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 h-full">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 shrink-0">
                      <Percent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Как пользоваться
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Все калькуляторы процентов работают мгновенно — введите числа и получите результат сразу.
              Каждый расчёт сопровождается формулой и подробным объяснением.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Процент от числа — найдите, сколько составляет X% от Y</li>
              <li>Прибавить процент — увеличьте число на заданный процент</li>
              <li>Вычесть процент — уменьшите число на заданный процент</li>
              <li>Изменение в процентах — найдите разницу между двумя числами в %</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
