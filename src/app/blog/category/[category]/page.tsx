import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/blog';
import { SITE_CONFIG } from '@/constants/navigation';
import { BLOG_CATEGORIES } from '@/types';
import type { BlogCategory } from '@/types';

const pirulen = localFont({
  src: '../../../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

interface Props {
  params: Promise<{ category: string }>;
}

const validCategories = Object.keys(BLOG_CATEGORIES) as BlogCategory[];

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = BLOG_CATEGORIES[category as BlogCategory];
  if (!meta) return {};

  return {
    title: `${meta.label} — 블로그`,
    description: `${meta.description}. 스냅플러그 AI 자동화 블로그에서 ${meta.label} 관련 글을 확인하세요.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/category/${category}`,
    },
    openGraph: {
      title: `${meta.label} | 스냅플러그 블로그`,
      description: meta.description,
      url: `${SITE_CONFIG.url}/blog/category/${category}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!validCategories.includes(category as BlogCategory)) notFound();

  const posts = await getPostsByCategory(category as BlogCategory);
  const meta = BLOG_CATEGORIES[category as BlogCategory];

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)]">
      <nav className="navbar pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}>
            SnapPlug
          </Link>
          <Link href="/blog" className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors">
            ← 블로그
          </Link>
        </div>
      </nav>

      <section className="flex-1 py-16 md:py-24">
        <div className="container max-w-5xl">
          <Breadcrumb
            items={[
              { label: '홈', href: '/' },
              { label: '블로그', href: '/blog' },
            ]}
            current={meta.label}
          />

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              {meta.label}
            </h1>
            <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
              {meta.description}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-[var(--text-sub)] hover:bg-gray-200 transition-colors"
            >
              전체
            </Link>
            {validCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${cat}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  cat === category
                    ? 'bg-[var(--foreground)] text-white'
                    : 'bg-gray-100 text-[var(--text-sub)] hover:bg-gray-200'
                }`}
              >
                {BLOG_CATEGORIES[cat].label}
              </Link>
            ))}
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-sub)] text-lg">이 카테고리에 아직 게시된 글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
