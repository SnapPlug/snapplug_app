import Link from 'next/link';
import type { BlogPost } from '@/types';
import CategoryBadge from './CategoryBadge';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const dateStr = new Date(frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="block bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={frontmatter.category} />
        <time className="text-xs text-[var(--text-sub)]" dateTime={frontmatter.date}>
          {dateStr}
        </time>
      </div>

      <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2">
        {frontmatter.title}
      </h3>

      <p className="text-sm text-[var(--text-sub)] mb-4 line-clamp-2">
        {frontmatter.description}
      </p>

      <div className="flex items-center justify-between text-xs text-[var(--text-sub)]">
        <span>{frontmatter.author}</span>
        <span>{readingTime}분 읽기</span>
      </div>
    </Link>
  );
}
