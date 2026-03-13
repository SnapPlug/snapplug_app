import type { Metadata } from "next";
import "./globals.css";
import { pirulen } from "./fonts";
import ChannelTalk from "@/components/ChannelTalk";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_CONFIG } from "@/constants/navigation";
import { faqs } from "@/data/faq";

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "스냅플러그(SnapPlug) - 당신의 첫 번째 AI 팀원 | Business & Beyond",
    template: "%s | 스냅플러그(SnapPlug)",
  },
  description: "스냅플러그(SnapPlug) - AI 자동화로 반복 업무에서 해방되세요. Ara, Rio, Luna, Sera, Alex - 5명의 AI 팀원이 마케팅, 영업, 고객응대, 업무자동화를 대신합니다. 월 54시간 절감, 매출 2배 상승 실제 사례.",
  keywords: [
    "스냅플러그",
    "SnapPlug",
    "AI 자동화",
    "AI 팀원",
    "업무 자동화",
    "마케팅 자동화",
    "고객 응대 챗봇",
    "AI 어시스턴트",
    "스몰비즈니스 AI",
    "1인 기업 자동화",
    "AI 에이전트",
    "비즈니스 자동화",
    "RPA",
    "업무 효율화",
  ],
  authors: [{ name: "정해성", url: `${siteUrl}/about` }],
  creator: "정해성",
  publisher: "SnapPlug",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "스냅플러그(SnapPlug) - 당신의 첫 번째 AI 팀원",
    description: "스냅플러그 - AI 자동화로 반복 업무에서 해방되세요. 60분 맞춤 컨설팅으로 시작하세요. 월 54시간 절감, 매출 2배 상승.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "스냅플러그(SnapPlug)",
  },
  twitter: {
    card: "summary_large_image",
    title: "스냅플러그(SnapPlug) - 당신의 첫 번째 AI 팀원",
    description: "스냅플러그 - AI 자동화로 반복 업무에서 해방되세요. 월 54시간 절감, 매출 2배 상승.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "hdmRbgfjNtEJvyv6hleCrwDM9G_v08N7NY_ajEWZlbI",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'ko': siteUrl,
      'x-default': siteUrl,
    },
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "스냅플러그(SnapPlug)",
  alternateName: "스냅플러그",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
  },
  description: "스냅플러그(SnapPlug) - AI 자동화 솔루션으로 스몰비즈니스와 1인 기업의 반복 업무를 자동화합니다.",
  founder: {
    "@type": "Person",
    name: "정해성",
    alternateName: "Jason Jeong",
    url: `${siteUrl}/about`,
    image: `${siteUrl}/Jason%20Jeong.jpeg`,
  },
  sameAs: [
    "https://www.threads.com/@snapplug.app",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_CONFIG.email,
    contactType: "customer service",
    availableLanguage: ["Korean"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "스냅플러그(SnapPlug)",
  alternateName: "스냅플러그",
  url: siteUrl,
  inLanguage: "ko-KR",
  description: "스냅플러그 - 당신의 첫 번째 AI 팀원. AI 자동화로 반복 업무에서 해방되세요.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "스냅플러그 AI 팀원 채용 서비스",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
  },
  description: "마케팅, 영업, 고객응대, 업무자동화를 담당하는 AI 팀원을 채용하여 비즈니스 효율을 극대화합니다.",
  areaServed: {
    "@type": "Country",
    name: "South Korea",
  },
  serviceType: "AI Automation Service",
  offers: {
    "@type": "Offer",
    description: "맞춤 컨설팅 및 AI 솔루션 구축",
    priceCurrency: "KRW",
    priceRange: "초기 구축 200~500만원 / 월 유지비 20~50만원",
  },
};

// FAQ Schema for GEO optimization
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.replace(/\n/g, " "),
    },
  })),
};

// AI Team Member Service Schemas for GEO optimization
const aiTeamServiceSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Luna - AI 마케팅 책임자",
      description: "아이디어 하나로 X, 링크드인, 인스타그램, 페이스북, 유튜브 등 5개+ 채널 콘텐츠를 자동 생성합니다. 콘텐츠 제작 시간 90% 절감.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Marketing Automation",
    },
    {
      "@type": "Service",
      name: "Sera - AI 고객응대 책임자",
      description: "24시간 무휴로 고객 문의에 즉시 응대합니다. 채널톡, 카카오톡 연동. 응대율 100%, 평균 응대 시간 5분.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Customer Service",
    },
    {
      "@type": "Service",
      name: "Rio - AI 영업 책임자",
      description: "BANT 기반으로 리드를 자동 검증하고 Hot/Warm/Cold로 분류합니다. 전환율 2배 향상, 기회 손실 최소화.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Sales Automation",
    },
    {
      "@type": "Service",
      name: "Ara - AI 수석보좌관",
      description: "일정 조율, 보고서 생성, 이메일 초안 작성 등 반복 업무를 자동화합니다. 주간 5시간+ 절감.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Administrative Assistant",
    },
    {
      "@type": "Service",
      name: "Alex - AI 정보관리 책임자",
      description: "자료와 정보를 자동으로 정리하고 관리합니다. 데이터 입력 오류 0%, 처리 시간 90% 절감.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Information Management",
    },
    {
      "@type": "Service",
      name: "Theo - AI 개발 책임자",
      description: "웹·앱 개발, API 연동, 자동화 시스템 구축을 담당합니다. 개발 리소스 없이 AI 기반 솔루션을 빠르게 구현합니다.",
      provider: { "@type": "Organization", name: SITE_CONFIG.name },
      serviceType: "AI Development",
    },
  ],
};

// VideoObject Schema for workspace demo
const videoObjectSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "스냅플러그 AI 팀원 워크스페이스 데모",
  description: "Ara, Rio, Sera, Luna, Alex, Theo가 실제로 어떻게 협업하는지 보여줍니다. AI 자동화로 반복 업무를 줄이는 과정을 확인하세요.",
  thumbnailUrl: `${siteUrl}/workspace-demo-poster.jpg`,
  contentUrl: `${siteUrl}/workspace-demo.mp4`,
  embedUrl: `${siteUrl}/#workspace-demo`,
  uploadDate: "2025-01-01",
  inLanguage: "ko-KR",
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "스냅플러그(SnapPlug)",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  },
};

// HowTo Schema for 4-step onboarding process
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "AI 팀원 채용 방법 - 스냅플러그 4단계 온보딩",
  description: "스냅플러그의 AI 팀원을 채용하는 4단계 프로세스. 맞춤 컨설팅부터 런칭까지 평균 4~5주 소요됩니다.",
  totalTime: "P5W",
  inLanguage: "ko-KR",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "맞춤 컨설팅 (60분, 무료)",
      text: "현재 업무 프로세스를 심층 분석하고 자동화 가능 포인트를 발견합니다. 예상 ROI 및 AI 팀원 채용 방향을 제안받습니다.",
      url: `${siteUrl}/#process`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "서비스 기획 & 설계 (1~2주)",
      text: "비즈니스 요구사항을 정의하고 최적의 AI 솔루션 아키텍처를 설계합니다. 연동 시스템 및 워크플로우를 확정합니다.",
      url: `${siteUrl}/#process`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "개발 & 품질 검증 (2~3주)",
      text: "설계된 AI 솔루션을 개발하고 실제 업무 환경에서 품질을 검증합니다. 피드백을 반영하여 최적화합니다.",
      url: `${siteUrl}/#process`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "런칭 & 안정화",
      text: "AI 팀원을 정식 투입하고 초기 운영을 안정화합니다. 지속적인 모니터링과 개선으로 최상의 성과를 유지합니다.",
      url: `${siteUrl}/#process`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Preconnect to font CDN for faster loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* Preconnect to Channel.io CDN (loaded lazily but preconnect helps when needed) */}
        <link rel="preconnect" href="https://cdn.channel.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cf.channel.io" crossOrigin="anonymous" />
        {/* DNS prefetch for Sentry (if used) */}
        <link rel="dns-prefetch" href="https://o249840.ingest.sentry.io" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          id="ai-team-services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiTeamServiceSchemas) }}
        />
        <script
          id="video-object-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
        />
        <script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </head>
      <body className={`antialiased ${pirulen.variable}`}>
        <GoogleAnalytics />
        {children}
        <ChannelTalk />
      </body>
    </html>
  );
}
