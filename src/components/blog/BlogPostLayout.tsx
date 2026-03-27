import Link from 'next/link';
import localFont from 'next/font/local';
import type { BlogPost } from '@/types';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import CategoryBadge from './CategoryBadge';
import RelatedPosts from './RelatedPosts';

const pirulen = localFont({
  src: '../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

interface BlogPostLayoutProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  children: React.ReactNode;
}

export default function BlogPostLayout({ post, relatedPosts, children }: BlogPostLayoutProps) {
  const { frontmatter, readingTime } = post;
  const dateStr = new Date(frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Navbar */}
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

      {/* Article */}
      <article className="flex-1 py-12 md:py-20">
        <div className="container max-w-3xl">
          <Breadcrumb
            items={[
              { label: '홈', href: '/' },
              { label: '블로그', href: '/blog' },
            ]}
            current={frontmatter.title}
          />

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={frontmatter.category} linked />
              <span className="text-sm text-[var(--text-sub)]">{readingTime}분 읽기</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-4 leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-[var(--text-sub)]">
              <span>{frontmatter.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={frontmatter.date}>{dateStr}</time>
              {frontmatter.updatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    수정: {new Date(frontmatter.updatedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* MDX Content */}
          <div className="blog-content">
            {children}
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--border)]">
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-[var(--text-sub)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent-warm)] rounded-2xl p-8 text-center">
            <p className="text-lg font-bold text-[var(--foreground)] mb-2">
              AI 자동화가 궁금하신가요?
            </p>
            <p className="text-sm text-[var(--text-sub)] mb-4">
              30초 진단으로 우리 비즈니스에 맞는 AI 팀원을 확인해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ai-diagnosis"
                className="inline-block px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-xl hover:bg-[var(--primary-hover)] transition-colors"
              >
                30초 ROI 진단
              </Link>
              <Link
                href="/contacts"
                className="inline-block px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-semibold rounded-xl hover:bg-white transition-colors"
              >
                무료 상담 예약
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
