import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { scenarios } from '@/data/scenarios';
import { aiTeamInfo } from '@/data/team';
import { SITE_CONFIG } from '@/constants/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const scenario = scenarios.find((s) => s.id === id);
  if (!scenario) return {};

  const title = `${scenario.title} AI 도입 사례 — ${scenario.highlight.number}${scenario.highlight.unit}${scenario.highlight.suffix}`;
  const description = `${scenario.painPoint} 스냅플러그 AI 팀원 ${scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(', ')}와 함께 ${scenario.solutions[0]} 등으로 해결했습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/case-studies/${id}`,
    },
    openGraph: {
      title: `${title} | 스냅플러그`,
      description,
      url: `${SITE_CONFIG.url}/case-studies/${id}`,
      ...(scenario.video?.poster && {
        images: [{ url: `${SITE_CONFIG.url}${scenario.video.poster}`, width: 1280, height: 720 }],
      }),
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const scenario = scenarios.find((s) => s.id === id);
  if (!scenario) notFound();

  const pageUrl = `${SITE_CONFIG.url}/case-studies/${id}`;
  const teamNames = scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(', ');
  const highlightText = `${scenario.highlight.number}${scenario.highlight.unit}${scenario.highlight.suffix}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${scenario.title} AI 도입 사례 — ${highlightText}`,
    description: `${scenario.painPoint} 스냅플러그 AI 팀원(${teamNames})으로 해결한 사례입니다.`,
    articleSection: '케이스스터디',
    inLanguage: 'ko-KR',
    datePublished: '2026-01-01',
    dateModified: '2026-03-13',
    author: {
      '@type': 'Organization',
      name: '스냅플러그(SnapPlug)',
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: '스냅플러그(SnapPlug)',
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: pageUrl,
    ...(scenario.video?.poster && {
      image: `${SITE_CONFIG.url}${scenario.video.poster}`,
    }),
    about: {
      '@type': 'Thing',
      name: 'AI 업무 자동화',
    },
  };

  const otherCases = scenarios.filter((s) => s.id !== id).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen flex flex-col bg-[var(--background)]">
        <nav className="navbar pt-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-lg sm:text-xl md:text-2xl tracking-wide font-bold">
              SnapPlug
            </Link>
            <Link href="/case-studies" className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors">
              ← 전체 사례
            </Link>
          </div>
        </nav>

        <article className="flex-1 py-16 md:py-24">
          <div className="container max-w-3xl">

            <Breadcrumb
              items={[
                { label: '홈', href: '/' },
                { label: '케이스스터디', href: '/case-studies' },
              ]}
              current={scenario.title}
            />

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl" aria-hidden="true">{scenario.icon}</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                    {scenario.title}
                  </h1>
                  <p className="text-[var(--text-sub)]">{scenario.subtitle}</p>
                </div>
              </div>

              {/* AI Team */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-2">
                  {scenario.aiTeam.map((member) => (
                    <div
                      key={member}
                      className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                    >
                      <Image
                        src={aiTeamInfo[member].image}
                        alt={`${aiTeamInfo[member].name} — AI 팀원`}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[var(--primary)] font-medium">
                  with {teamNames}
                </span>
              </div>

              {/* Highlight Metric */}
              <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white rounded-2xl px-6 py-5">
                <p className="text-sm opacity-80 mb-1">핵심 성과</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{scenario.highlight.number}</span>
                  <span className="text-xl font-bold">{scenario.highlight.unit}</span>
                  <span className="text-base opacity-80">{scenario.highlight.suffix}</span>
                </div>
              </div>
            </header>

            {/* Video (if available) */}
            {scenario.video && (
              <div className="mb-10 rounded-2xl overflow-hidden aspect-video">
                <video
                  className="w-full h-full object-contain bg-black"
                  controls
                  preload="metadata"
                  poster={scenario.video.poster}
                >
                  <source src={scenario.video.srcMobile} media="(max-width: 768px)" type="video/mp4" />
                  <source src={scenario.video.src} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Pain Point */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">도입 전 문제</h2>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <p className="text-[var(--foreground)]">{scenario.painPoint}</p>
              </div>
            </section>

            {/* Solutions */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">AI 팀원 솔루션</h2>
              <ul className="space-y-3">
                {scenario.solutions.map((sol, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white border border-[var(--border)] rounded-xl p-4">
                    <span className="text-[var(--primary)] font-bold mt-0.5">✓</span>
                    <span className="text-[var(--foreground)]">{sol}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quote */}
            {scenario.quote && (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">현장의 목소리</h2>
                <blockquote className="bg-white border-l-4 border-[var(--primary)] rounded-r-xl px-6 py-5">
                  <p className="text-[var(--foreground)] italic leading-relaxed mb-3">
                    &ldquo;{scenario.quote}&rdquo;
                  </p>
                  {scenario.quoteName && (
                    <cite className="text-sm text-[var(--primary)] font-medium not-italic">
                      — {scenario.quoteName}
                    </cite>
                  )}
                </blockquote>
              </section>
            )}

            {/* CTA */}
            <div className="bg-[var(--primary)] text-white rounded-2xl p-8 text-center mb-16">
              <p className="text-lg font-semibold mb-2">우리 회사도 이런 변화가 가능합니다</p>
              <p className="text-sm opacity-80 mb-6">60분 무료 진단으로 맞춤 솔루션을 확인하세요</p>
              <Link
                href="/contacts"
                className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                무료 컨설팅 예약하기
              </Link>
            </div>

            {/* Related Cases */}
            {otherCases.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">다른 도입 사례</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherCases.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/case-studies/${s.id}`}
                        className="block bg-white border border-[var(--border)] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl" aria-hidden="true">{s.icon}</span>
                          <span className="text-sm font-semibold text-[var(--foreground)] truncate">{s.title}</span>
                        </div>
                        <p className="text-xs text-[var(--primary)] font-medium">
                          {s.highlight.number}{s.highlight.unit}{s.highlight.suffix}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
