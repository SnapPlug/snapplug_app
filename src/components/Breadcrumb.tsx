import Link from 'next/link';
import { SITE_CONFIG } from '@/constants/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  current: string;
  className?: string;
}

export default function Breadcrumb({ items, current, className = '' }: BreadcrumbProps) {
  const schemaItems = [
    ...items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.label,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
    {
      '@type': 'ListItem' as const,
      position: items.length + 1,
      name: current,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="breadcrumb" className={`mb-8 ${className}`}>
        <ol className="flex items-center gap-2 text-sm text-[var(--text-sub)]">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Link
                href={item.href}
                className="hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li className="text-[var(--foreground)] font-medium truncate">
            {current}
          </li>
        </ol>
      </nav>
    </>
  );
}
