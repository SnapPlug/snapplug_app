import type { Metadata } from "next";
import "./globals.css";
import { pirulen } from "./fonts";
import ChannelTalk from "@/components/ChannelTalk";
import { SITE_CONFIG } from "@/constants/navigation";
import { faqs } from "@/data/faq";

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SnapPlug - 당신의 첫 번째 AI 팀원 | Business & Beyond",
    template: "%s | SnapPlug",
  },
  description: "AI 자동화로 반복 업무에서 해방되세요. Ara, Rio, Luna, Sera, Alex - 5명의 AI 팀원이 마케팅, 영업, 고객응대, 업무자동화를 대신합니다. 월 54시간 절감, 매출 2배 상승 실제 사례.",
  keywords: [
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
  authors: [{ name: "SnapPlug", url: siteUrl }],
  creator: "SnapPlug",
  publisher: "SnapPlug",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SnapPlug - 당신의 첫 번째 AI 팀원",
    description: "AI 자동화로 반복 업무에서 해방되세요. 60분 맞춤 컨설팅으로 시작하세요. 월 54시간 절감, 매출 2배 상승.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "SnapPlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapPlug - 당신의 첫 번째 AI 팀원",
    description: "AI 자동화로 반복 업무에서 해방되세요. 월 54시간 절감, 매출 2배 상승.",
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
    // Google Search Console 인증 코드 (필요시 추가)
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: "AI 자동화 솔루션으로 스몰비즈니스와 1인 기업의 반복 업무를 자동화합니다.",
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_CONFIG.email,
    contactType: "Customer Service",
    availableLanguage: ["Korean"],
  },
  sameAs: [
    // 소셜 미디어 링크 추가 가능
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: siteUrl,
  description: "당신의 첫 번째 AI 팀원 - AI 자동화로 반복 업무에서 해방되세요.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 팀원 채용 서비스",
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
      </head>
      <body className={`antialiased ${pirulen.variable}`}>
        {children}
        <ChannelTalk />
      </body>
    </html>
  );
}
