import { Calculator,
  ArrowRightLeft,
  Heart,
  Home,
  Car,
  Cpu,
  Coffee,
  FlaskConical,
  DollarSign,
  Ruler,
  Gauge,
  Binary,
  Thermometer,
  Scale,
  Clock,
  Wallet,
  ChefHat,
  Percent,
  Timer, LucideIcon } from "lucide-react";

export interface CategoryStyle {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  'nauka-i-ucheba': {
    icon: FlaskConical,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    gradient: 'from-blue-500/10 to-indigo-500/10' },
  'konvertery': {
    icon: ArrowRightLeft,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-500/10 to-teal-500/10' },
  'procenty': {
    icon: Percent,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    gradient: 'from-blue-500/10 to-cyan-500/10' },
  'tajmery': {
    icon: Timer,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-500/10 to-teal-500/10' },
  'kulinarnye-mery': {
    icon: ChefHat,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-500/10 to-yellow-500/10' },
  'zdorove-i-krasota': {
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800',
    gradient: 'from-rose-500/10 to-pink-500/10' },
  'stroitelstvo-i-remont': {
    icon: Home,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-500/10 to-orange-500/10' },
  'transport': {
    icon: Car,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    gradient: 'from-cyan-500/10 to-sky-500/10' },
  'tekhnologii': {
    icon: Cpu,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
    borderColor: 'border-violet-200 dark:border-violet-800',
    gradient: 'from-violet-500/10 to-purple-500/10' },
  'povsednevnoe': {
    icon: Coffee,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    gradient: 'from-orange-500/10 to-amber-500/10' } };

export const subcategoryIcons: Record<string, LucideIcon> = {
  'matematicheskie': Calculator,
  'finansovye': DollarSign,
  'finansovye-prodvinutye': Wallet,
  'geometriya': Ruler,
  'fizika': Gauge,
  'conv-dlina': Ruler,
  'conv-massa': Scale,
  'conv-temperatura': Thermometer,
  'conv-skorost': Gauge,
  'conv-informaciya': Binary,
  'conv-obem': FlaskConical,
  'conv-ploshchad': Ruler,
  'conv-energiya': Gauge,
  'conv-davlenie': Gauge,
  'conv-moshchnost': Gauge,
  'conv-vremya': Clock,
  'conv-ugly': Ruler,
  'procenty-osnovnye': Percent,
  'procenty-izmenenie': Percent,
  'procenty-slozhnye': Percent,
  'tajmery-korotkie': Timer,
  'tajmery-minuty': Timer,
  'tajmery-chasy': Timer,
  'pitanie-i-ves': Scale,
  'sport-i-aktivnost': Heart,
  'beremennost-i-deti': Heart,
  'zdorove-raznoe': Heart,
  'vneshnost': Heart,
  'krasota': Heart,
  'stroitelnye-materialy': Home,
  'fundamenty': Home,
  'otdelka': Home,
  'pokrytiya': Home,
  'raskhod-topliva': Car,
  'stoimost-poezdki': Car,
  'nalogi-i-sbory': DollarSign,
  'rastamozhka': Car,
  'data-i-vremya': Clock,
  'generatory': Binary,
  'internet-i-fajly': Cpu,
  'tekhnologii-raznoe': Cpu,
  'eda-i-napitki': Coffee,
  'razmery': Ruler,
  'pitomcy': Heart,
  'razvlecheniya': Coffee,
  'muka': ChefHat,
  'krupy': ChefHat,
  'sahar': ChefHat,
  'masla': ChefHat,
  'molochnye': ChefHat,
  'specii': ChefHat };

export function getCategoryStyle(slug: string): CategoryStyle {
  return categoryStyles[slug] || {
    icon: Calculator,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    gradient: 'from-primary/10 to-primary/5' };
}

export function getSubcategoryIcon(slug: string): LucideIcon {
  return subcategoryIcons[slug] || Calculator;
}
