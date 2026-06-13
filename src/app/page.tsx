import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowRight,
  Calculator,
  Zap,
  Shield,
  Heart,
  Percent,
  DollarSign,
  Receipt,
  Wallet,
  Flame,
  Lock,
  Search,
  ChevronRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { calculators, getCalculatorsByCategory, getCalculatorsBySubcategory } from '@/lib/calculators';
import { CategoryCard } from '@/components/category/category-card';
import { SearchBox } from '@/components/search/search-box';
import { YandexAdBlock } from '@/components/ads/ad-placeholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchemaInjector } from '@/components/seo/schema-injector';
import { generateHomePageSchema } from '@/lib/schema';
import { getCategoryStyle } from '@/lib/category-styles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus.ru';

const getCategoryCalculatorCount = (slug: string) => {
  return getCalculatorsByCategory(slug).length;
};

export const metadata: Metadata = {
  title: 'Calcus — бесплатные онлайн калькуляторы',
  description: `${calculators.length}+ бесплатных онлайн-калькуляторов для математики, финансов, здоровья, строительства и других задач. Все расчёты мгновенно и без регистрации.`,
  openGraph: {
    title: 'Calcus — бесплатные онлайн калькуляторы',
    description: `${calculators.length}+ калькуляторов для любых расчётов. Бесплатно, без регистрации.`,
    url: SITE_URL,
    siteName: 'Calcus',
    type: 'website',
    locale: 'ru_RU' },
  alternates: {
    canonical: SITE_URL } };

// Popular today calculators — hand-picked
const POPULAR_CALCULATORS = [
  { slug: 'prostoj-kalkulyator', title: 'Простой калькулятор', desc: 'Базовые арифметические операции', icon: Calculator, color: 'text-blue-500' },
  { slug: 'kalkulyator-imt', title: 'Калькулятор ИМТ', desc: 'Расчёт индекса массы тела', icon: Heart, color: 'text-rose-500' },
  { slug: 'kreditnyj-kalkulyator', title: 'Кредитный калькулятор', desc: 'Платежи и переплата по кредиту', icon: Wallet, color: 'text-cyan-500' },
  { slug: 'kalkulyator-procentov', title: 'Калькулятор процентов', desc: 'Проценты от числа и изменения', icon: Percent, color: 'text-violet-500' },
  { slug: 'kalkulyator-nds', title: 'Калькулятор НДС', desc: 'Выделение и начисление НДС', icon: Receipt, color: 'text-amber-500' },
  { slug: 'generator-parolej', title: 'Генератор паролей', desc: 'Надёжные случайные пароли', icon: Lock, color: 'text-slate-500' },
  { slug: 'kalkulyator-kalorij-kbzhu', title: 'Калькулятор калорий', desc: 'Суточная норма КБЖУ', icon: Flame, color: 'text-orange-500' },
  { slug: 'konverter-valyut', title: 'Конвертер валют', desc: 'Курсы доллара, евро, рубля', icon: DollarSign, color: 'text-emerald-500' },
];

// Featured category blocks
const FEATURED_BLOCKS = [
  {
    categorySlug: 'nauka-i-ucheba',
    title: 'Наука и Учёба',
    subcategorySlugs: ['matematicheskie', 'finansovye', 'geometriya', 'fizika'],
    count: 4 },
  {
    categorySlug: 'zdorove-i-krasota',
    title: 'Здоровье и Красота',
    subcategorySlugs: ['pitanie-i-ves', 'sport-i-aktivnost', 'beremennost-i-deti', 'vneshnost'],
    count: 4 },
  {
    categorySlug: 'nauka-i-ucheba',
    title: 'Финансы',
    subcategorySlugs: ['finansovye'],
    count: 4 },
];

function MiniCalcCard({ calc }: { calc: { slug: string; title: string; desc: string; icon: React.ElementType; color: string } }) {
  const Icon = calc.icon;
  return (
    <Link href={`/${calc.slug}`}>
      <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border hover:border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted ${calc.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm group-hover:text-primary transition-colors">
              {calc.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground line-clamp-2">{calc.desc}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function FeaturedBlock({
  categorySlug,
  title,
  subcategorySlugs,
  count }: {
  categorySlug: string;
  title: string;
  subcategorySlugs: string[];
  count: number;
}) {
  const style = getCategoryStyle(categorySlug);
  const Icon = style.icon;

  const calcs = subcategorySlugs
    .flatMap((s) => getCalculatorsBySubcategory(s))
    .slice(0, count);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bgColor} ${style.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Link
          href={`/${categorySlug}`}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Ещё
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {calcs.map((calc) => (
          <Link key={calc.slug} href={`/${calc.slug}`}>
            <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border hover:border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {calc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2">{calc.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

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

            {/* Enhanced prominent search bar */}
            <div className="w-full max-w-2xl">
              <div className="relative flex items-center rounded-2xl border-2 border-border/60 bg-card shadow-lg transition-all focus-within:border-primary/40 focus-within:shadow-xl hover:border-border">
                <Search className="ml-5 h-6 w-6 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <SearchBox variant="full" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Популярные поиски:</span>
                {['кредит', 'имт', 'ндс', 'проценты'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <Search className="mr-1 h-3 w-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Today Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Популярные калькуляторы сегодня
              </h2>
              <p className="mt-2 text-muted-foreground">
                Часто используемые инструменты
              </p>
            </div>
            <Link
              href="/categories"
              className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
            >
              Смотреть все
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_CALCULATORS.map((calc) => (
              <MiniCalcCard key={calc.slug} calc={calc} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Смотреть все
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <YandexAdBlock blockId="R-A-99999999-1" renderTo="yandex_rtb_R-A-99999999-1" size="leaderboard" className="mx-auto max-w-7xl px-4 my-8" />

      {/* Categories Grid */}
      <section className="border-t bg-muted/30 py-16 md:py-20">
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

      {/* Features */}
      <section className="py-16 md:py-20">
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

      {/* Featured Calculator Blocks by Category */}
      <section className="border-t bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Подборки по темам
            </h2>
            <p className="mt-2 text-muted-foreground">
              Лучшие калькуляторы по категориям
            </p>
          </div>
          {FEATURED_BLOCKS.map((block) => (
            <FeaturedBlock key={block.title} {...block} />
          ))}
        </div>
      </section>

      <YandexAdBlock blockId="R-A-99999999-2" renderTo="yandex_rtb_R-A-99999999-2" size="leaderboard" className="mx-auto max-w-7xl px-4 my-8" />

      {/* SEO Content Block */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            Бесплатные онлайн-калькуляторы для всех задач
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Calcus — это каталог из {calculators.length}+ бесплатных онлайн-калькуляторов, которые помогают
              решать повседневные и профессиональные задачи за считанные секунды. Наш сервис покрывает
              математику, финансы, здоровье, строительство, конвертацию единиц и десятки других направлений.
              Все инструменты работают прямо в браузере: не нужно ничего устанавливать или регистрироваться.
            </p>
            <p>
              Каждый калькулятор снабжён подробным описанием, инструкцией по применению, формулами расчёта
              и разделом FAQ с ответами на частые вопросы. Результаты выводятся мгновенно — просто введите
              данные, и ответ появится на экране. Будь то расчёт ИМТ, перевод валют, вычисление НДС
              или планирование ипотеки — всё доступно бесплатно и без ограничений.
            </p>
            <p>
              Мы регулярно добавляем новые калькуляторы и обновляем существующие, чтобы информация
              оставалась актуальной. Если вы не нашли нужный инструмент — воспользуйтесь поиском
              по названию или категории. Начните прямо сейчас: выберите категорию или введите
              запрос в строку поиска.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
