import type { Metadata } from "next";
import "./globals.css";
import ChannelTalk from "@/components/ChannelTalk";

const siteUrl = "https://snapplug.co.kr";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <ChannelTalk />
      </body>
    </html>
  );
}
