import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/constants/navigation';
import { BLOG_CATEGORIES } from '@/types';
import type { BlogCategory } from '@/types';

const pirulen = localFont({
  src: '../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI 자동화 블로그',
  description: 'AI 자동화 인사이트, 실전 가이드, 고객 사례를 공유합니다. 스몰비즈니스와 1인 기업을 위한 AI 자동화 지식을 만나보세요.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: 'AI 자동화 블로그 | 스냅플러그',
    description: 'AI 자동화 인사이트, 실전 가이드, 고객 사례를 공유합니다.',
    url: `${SITE_CONFIG.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '스냅플러그 AI 자동화 블로그',
    description: 'AI 자동화 인사이트와 실전 가이드',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.frontmatter.title,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    })),
  };

  const categories = Object.keys(BLOG_CATEGORIES) as BlogCategory[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <main className="min-h-screen flex flex-col bg-[var(--background)]">
        <nav className="navbar pt-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}>
              SnapPlug
            </Link>
            <Link href="/" className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors">
              ← 홈으로
            </Link>
          </div>
        </nav>

        <section className="flex-1 py-16 md:py-24">
          <div className="container max-w-5xl">
            <Breadcrumb
              items={[{ label: '홈', href: '/' }]}
              current="블로그"
            />

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                AI 자동화 블로그
              </h1>
              <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
                스몰비즈니스를 위한 AI 자동화 인사이트와 실전 가이드
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Link
                href="/blog"
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--foreground)] text-white"
              >
                전체
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${cat}`}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-[var(--text-sub)] hover:bg-gray-200 transition-colors"
                >
                  {BLOG_CATEGORIES[cat].label}
                </Link>
              ))}
            </div>

            {/* Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[var(--text-sub)] text-lg">아직 게시된 글이 없습니다.</p>
                <p className="text-[var(--text-sub)] text-sm mt-2">곧 유용한 콘텐츠가 올라올 예정이에요.</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
