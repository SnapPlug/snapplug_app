import type { BlogPost } from '@/types';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
        관련 글
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
