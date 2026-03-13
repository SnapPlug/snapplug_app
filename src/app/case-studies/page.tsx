import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { scenarios } from '@/data/scenarios';
import { aiTeamInfo } from '@/data/team';
import { SITE_CONFIG } from '@/constants/navigation';

export const metadata: Metadata = {
  title: 'AI 팀원 도입 사례 — 업종별 성과',
  description: '관세사무소 월 40시간 절감, 속기사사무소 월 54시간 절감, 종합학원 재등록률 67% 상승 등 스냅플러그 AI 팀원 실제 도입 사례 10가지를 확인하세요.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/case-studies`,
  },
  openGraph: {
    title: 'AI 팀원 도입 사례 — 업종별 성과 | 스냅플러그',
    description: '관세사무소, 병원, 로펌, 이커머스 등 10개 업종의 AI 도입 성과 사례.',
    url: `${SITE_CONFIG.url}/case-studies`,
  },
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '스냅플러그 AI 팀원 도입 사례',
  description: '스냅플러그 AI 팀원을 도입한 기업의 실제 성과 사례 모음',
  numberOfItems: scenarios.length,
  itemListElement: scenarios.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${s.title} AI 도입 사례 — ${s.highlight.number}${s.highlight.unit}${s.highlight.suffix}`,
    url: `${SITE_CONFIG.url}/case-studies/${s.id}`,
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <main className="min-h-screen flex flex-col bg-[var(--background)]">
        <nav className="navbar pt-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-lg sm:text-xl md:text-2xl tracking-wide font-bold">
              SnapPlug
            </Link>
            <Link href="/" className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors">
              ← 홈으로
            </Link>
          </div>
        </nav>

        <section className="flex-1 py-16 md:py-24">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                AI 팀원 도입 사례
              </h1>
              <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
                실제 도입 기업의 구체적인 성과를 확인하세요.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
              {scenarios.map((scenario) => (
                <li key={scenario.id}>
                  <Link
                    href={`/case-studies/${scenario.id}`}
                    className="block bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-3xl" aria-hidden="true">{scenario.icon}</span>
                      <div>
                        <h2 className="font-bold text-[var(--foreground)]">{scenario.title}</h2>
                        <p className="text-sm text-[var(--text-sub)]">{scenario.subtitle}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white rounded-xl px-4 py-3 mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">{scenario.highlight.number}</span>
                        <span className="text-sm font-semibold">{scenario.highlight.unit}</span>
                        <span className="text-xs opacity-80">{scenario.highlight.suffix}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {scenario.aiTeam.map((member) => (
                          <div
                            key={member}
                            className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-sm relative"
                          >
                            <img
                              src={aiTeamInfo[member].image}
                              alt={aiTeamInfo[member].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-[var(--primary)] font-medium">
                        with {scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(' + ')}
                      </span>
                      <span className="ml-auto text-xs text-[var(--text-sub)]">자세히 보기 →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-16 text-center">
              <p className="text-[var(--text-sub)] mb-6">
                우리 회사에 맞는 AI 팀원이 궁금하신가요?
              </p>
              <Link
                href="/contacts"
                className="inline-block bg-[var(--primary)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--primary-hover)] transition-colors"
              >
                무료 컨설팅 예약하기
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
