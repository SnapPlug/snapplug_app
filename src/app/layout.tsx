import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ChannelTalk from "@/components/ChannelTalk";
import { SITE_CONFIG } from "@/constants/navigation";

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
  name: "AI 팀원 도입 서비스",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
  },
  description: "마케팅, 영업, 고객응대, 업무자동화를 담당하는 AI 팀원을 도입하여 비즈니스 효율을 극대화합니다.",
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
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <ChannelTalk />
      </body>
    </html>
  );
}
