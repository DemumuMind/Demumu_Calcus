import Link from 'next/link';
import { ArrowRight, Calculator, Zap, Shield, Heart, Percent, DollarSign, Receipt, Wallet, Flame, Lock } from 'lucide-react';
import { categories } from '@/lib/categories';
import { calculators, getCalculatorsByCategory } from '@/lib/calculators';
import { CategoryCard } from '@/components/category/category-card';
import { SearchBox } from '@/components/search/search-box';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchemaInjector } from '@/components/seo/schema-injector';
import { generateHomePageSchema } from '@/lib/schema';

// Get calculator counts per category
const getCategoryCalculatorCount = (slug: string) => {
  return getCalculatorsByCategory(slug).length;
};

export default function HomePage() {
  const homeSchema = generateHomePageSchema();
  
  return (
    <div className="flex flex-col">
      <SchemaInjector schemas={homeSchema} />
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Самые простые и удобные{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                онлайн-калькуляторы
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {calculators.length}+ бесплатных калькуляторов для математики, финансов, здоровья, 
              строительства и других задач. Все расчёты выполняются мгновенно 
              и без регистрации.
            </p>
            
            {/* Search Box */}
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Категории калькуляторов
            </h2>
            <p className="mt-2 text-muted-foreground">
              Выберите нужную категорию или воспользуйтесь поиском
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                calculatorCount={getCategoryCalculatorCount(category.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{calculators.length}+ калькуляторов</h3>
              <p className="text-sm text-muted-foreground">
                Математика, конвертеры, здоровье, финансы, строительство и многое другое
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
                <Zap className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Мгновенные расчёты</h3>
              <p className="text-sm text-muted-foreground">
                Результаты выводятся сразу при вводе данных, без ожидания
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Shield className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Без регистрации</h3>
              <p className="text-sm text-muted-foreground">
                Все калькуляторы бесплатны и не требуют создания аккаунта
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Популярные калькуляторы
              </h2>
              <p className="mt-2 text-muted-foreground">
                Часто используемые инструменты
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: 'Простой калькулятор', 
                slug: 'prostoj-kalkulyator', 
                desc: 'Базовые арифметические операции: сложение, вычитание, умножение, деление',
                icon: Calculator,
                color: 'text-blue-500'
              },
              { 
                title: 'Калькулятор процентов', 
                slug: 'kalkulyator-procentov', 
                desc: 'Вычисление процентов от числа, процентного соотношения и изменений',
                icon: Percent,
                color: 'text-violet-500'
              },
              { 
                title: 'Калькулятор ИМТ', 
                slug: 'kalkulyator-imt', 
                desc: 'Расчёт индекса массы тела (ИМТ) по росту и весу',
                icon: Heart,
                color: 'text-rose-500'
              },
              { 
                title: 'Конвертер валют', 
                slug: 'konverter-valyut', 
                desc: 'Актуальные курсы доллара, евро, рубля и других валют',
                icon: DollarSign,
                color: 'text-emerald-500'
              },
              { 
                title: 'Калькулятор НДС', 
                slug: 'kalkulyator-nds', 
                desc: 'Выделение и начисление НДС 20%, 10%, 0%',
                icon: Receipt,
                color: 'text-amber-500'
              },
              { 
                title: 'Кредитный калькулятор', 
                slug: 'kreditnyj-kalkulyator', 
                desc: 'Расчёт платежей и переплаты по кредиту',
                icon: Wallet,
                color: 'text-cyan-500'
              },
              { 
                title: 'Калькулятор калорий (КБЖУ)', 
                slug: 'kalkulyator-kalorij-kbzhu', 
                desc: 'Суточная норма калорий, белков, жиров и углеводов',
                icon: Flame,
                color: 'text-orange-500'
              },
              { 
                title: 'Генератор паролей', 
                slug: 'generator-parolej', 
                desc: 'Надёжные случайные пароли любой сложности',
                icon: Lock,
                color: 'text-slate-500'
              },
              { 
                title: 'Ипотечный калькулятор', 
                slug: 'ipotechnyj-kalkulyator', 
                desc: 'Расчёт ипотеки: платежи, переплата, необходимый доход',
                icon: Wallet,
                color: 'text-indigo-500'
              },
              { 
                title: 'Калькулятор НДФЛ', 
                slug: 'kalkulyator-ndfl', 
                desc: 'Расчёт налога на доходы физических лиц 13% и 15%',
                icon: Receipt,
                color: 'text-teal-500'
              },
              { 
                title: 'Конвертер температуры', 
                slug: 'konverter-temperatury', 
                desc: 'Перевод Цельсия, Фаренгейта, Кельвина, Реомюра',
                icon: Flame,
                color: 'text-red-500'
              },
              { 
                title: 'Калькулятор дробей', 
                slug: 'kalkulyator-drobej', 
                desc: 'Сложение, вычитание, умножение и деление дробей',
                icon: Calculator,
                color: 'text-purple-500'
              },
            ].map((calc) => (
              <Link key={calc.slug} href={`/calc/${calc.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-2 hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${calc.color}`}>
                        <calc.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {calc.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{calc.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <span>Открыть</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
            Бесплатные онлайн калькуляторы
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Наш сервис предлагает {calculators.length}+ бесплатных онлайн-калькуляторов для самых разных задач. 
            Математические и финансовые калькуляторы, конвертеры единиц, инструменты для здоровья и строительства. 
            Все расчёты выполняются мгновенно прямо в вашем браузере — бесплатно и без регистрации.
          </p>
        </div>
      </section>
    </div>
  );
}
