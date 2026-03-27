import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/constants/navigation';

export const metadata: Metadata = {
  title: '스냅플러그 소개 | 창업자 정해성',
  description: '스냅플러그 창업자 정해성(Jason Jeong)을 소개합니다. 스몰비즈니스와 1인 기업을 위한 AI 팀원 서비스, 스냅플러그를 만든 이유와 비전을 확인하세요.',
  alternates: {
    canonical: 'https://snapplug.app/about',
  },
  openGraph: {
    title: '스냅플러그 소개 | 창업자 정해성',
    description: '스몰비즈니스와 1인 기업을 위한 AI 팀원 서비스, 스냅플러그를 만든 이유와 비전을 확인하세요.',
    url: 'https://snapplug.app/about',
    images: [
      {
        url: 'https://snapplug.app/Jason%20Jeong.jpeg',
        width: 400,
        height: 400,
        alt: '스냅플러그 창업자 정해성',
      },
    ],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '정해성',
  alternateName: 'Jason Jeong',
  jobTitle: '대표',
  description: '스몰비즈니스와 1인 기업을 위한 AI 자동화 솔루션 스냅플러그(SnapPlug) 창업자. 반복 업무에서 사람을 해방시켜 진짜 중요한 일에 집중하게 하는 것을 사명으로 삼고 있습니다.',
  worksFor: {
    '@type': 'Organization',
    name: '스냅플러그(SnapPlug)',
    url: SITE_CONFIG.url,
  },
  image: `${SITE_CONFIG.url}/Jason%20Jeong.jpeg`,
  url: `${SITE_CONFIG.url}/about`,
  email: SITE_CONFIG.email,
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="min-h-screen flex flex-col bg-[var(--background)]">
        {/* Simple Navbar */}
        <nav className="navbar pt-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-lg sm:text-xl md:text-2xl tracking-wide font-bold"
            >
              SnapPlug
            </Link>
            <Link
              href="/"
              className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors"
            >
              ← 홈으로
            </Link>
          </div>
        </nav>

        {/* About Section */}
        <section className="flex-1 py-16 md:py-24">
          <div className="container max-w-4xl">
            <Breadcrumb
              items={[{ label: '홈', href: '/' }]}
              current="소개"
            />

            {/* Founder Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 md:p-12 mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden">
                    <Image
                      src="/Jason Jeong.jpeg"
                      alt="스냅플러그 창업자 정해성"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                      정해성
                    </h1>
                    <span className="text-sm text-[var(--text-sub)] font-medium">Jason Jeong</span>
                  </div>
                  <p className="text-[var(--primary)] font-semibold mb-4">
                    스냅플러그(SnapPlug) 대표
                  </p>
                  <p className="text-[var(--text-sub)] leading-relaxed">
                    스몰비즈니스와 1인 기업 대표님들이 반복 업무에 치여 정작 중요한 일을 못 하는 모습을 보면서
                    스냅플러그를 창업했습니다. AI 팀원이 단순 반복 업무를 대신하고,
                    사람은 진짜 가치 있는 일에 집중할 수 있는 세상을 만들고 싶습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4">
                  스냅플러그를 만든 이유
                </h2>
                <div className="text-[var(--text-sub)] leading-relaxed space-y-4">
                  <p>
                    소규모 비즈니스를 운영하는 분들을 만나보면 공통된 패턴이 있습니다.
                    정말 잘 하는 본업이 있는데, 콘텐츠 올리기, 고객 문의 답하기, 리드 정리하기 같은
                    반복 업무에 하루의 절반이 사라지는 현실입니다.
                  </p>
                  <p>
                    AI는 이미 이런 반복 업무를 충분히 잘 할 수 있습니다. 하지만 대부분의 AI 도구는
                    "기술자가 아니면 쓰기 어렵다"는 문제가 있었습니다. 스냅플러그는 이 간극을 메우기 위해 만들었습니다.
                    복잡한 설정 없이, 우리 팀처럼 일하는 AI 팀원을 채용하는 경험을 제공합니다.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4">
                  미션
                </h2>
                <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2">
                  <p className="text-lg text-[var(--foreground)] font-medium leading-relaxed">
                    "AI 자동화는 사람을 대체하는 게 아니라,
                    사람이 진짜 중요한 일에 집중하게 해주는 것"
                  </p>
                </blockquote>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4">
                  스냅플러그
                </h2>
                <div className="text-[var(--text-sub)] leading-relaxed space-y-3">
                  <div className="flex gap-4">
                    <span className="font-medium text-[var(--foreground)] w-24 flex-shrink-0">상호명</span>
                    <span>SNAPPLUG (스냅플러그)</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-medium text-[var(--foreground)] w-24 flex-shrink-0">대표</span>
                    <span>정해성</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-medium text-[var(--foreground)] w-24 flex-shrink-0">사업자등록번호</span>
                    <span>551-10-02859</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-medium text-[var(--foreground)] w-24 flex-shrink-0">연락처</span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-[var(--primary)] hover:underline"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href="/contacts"
                  className="inline-block bg-[var(--primary)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--primary-hover)] transition-colors"
                >
                  무료 컨설팅 예약하기
                </Link>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
