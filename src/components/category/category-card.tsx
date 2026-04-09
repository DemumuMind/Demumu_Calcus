'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { getCategoryStyle } from '@/lib/category-styles';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
  calculatorCount?: number;
}

export function CategoryCard({ category, calculatorCount = 0 }: CategoryCardProps) {
  const style = getCategoryStyle(category.slug);
  const Icon = style.icon;

  return (
    <Link href={`/${category.slug}`}>
      <Card className={`group relative h-full overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${style.borderColor} bg-gradient-to-br ${style.gradient}`}>
        <div className="flex flex-col p-6">
          {/* Icon and Title Row */}
          <div className="flex items-start justify-between">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.bgColor} ${style.color} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="h-7 w-7" />
            </div>
            <div className={`flex h-8 items-center justify-center rounded-full px-3 text-sm font-semibold ${style.bgColor} ${style.color}`}>
              {calculatorCount} инструментов
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {category.title}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {category.description}
          </p>

          {/* Arrow Link */}
          <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${style.color} opacity-0 transition-opacity group-hover:opacity-100`}>
            <span>Перейти</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
