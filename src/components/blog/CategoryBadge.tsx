import Link from 'next/link';
import type { BlogCategory } from '@/types';
import { BLOG_CATEGORIES } from '@/types';

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  'ai-automation': 'bg-[var(--primary)] text-white',
  'case-study': 'bg-[var(--secondary)] text-[var(--foreground)]',
  'how-to': 'bg-emerald-100 text-emerald-800',
  'industry-trends': 'bg-blue-100 text-blue-800',
};

interface CategoryBadgeProps {
  category: BlogCategory;
  linked?: boolean;
}

export default function CategoryBadge({ category, linked = false }: CategoryBadgeProps) {
  const label = BLOG_CATEGORIES[category]?.label ?? category;
  const colorClass = CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-800';
  const className = `inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`;

  if (linked) {
    return (
      <Link href={`/blog/category/${category}`} className={`${className} hover:opacity-80 transition-opacity`}>
        {label}
      </Link>
    );
  }

  return <span className={className}>{label}</span>;
}
