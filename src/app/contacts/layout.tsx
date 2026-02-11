import type { Metadata } from "next";

const pageUrl = "https://snapplug.app/contacts";

export const metadata: Metadata = {
  title: "상담 예약 - 60분 무료 진단 컨설팅",
  description:
    "AI 팀원 도입 무료 상담을 예약하세요. 60분 맞춤 진단으로 업무 자동화 포인트를 찾아드립니다. 마케팅, 고객응대, 영업, 업무자동화 전문가 상담.",
  keywords: [
    "AI 자동화 상담",
    "무료 컨설팅",
    "AI 팀원 도입 상담",
    "업무 자동화 컨설팅",
    "AI 진단 예약",
    "비즈니스 자동화 상담",
  ],
  openGraph: {
    title: "상담 예약 - 60분 무료 진단 컨설팅",
    description:
      "AI 팀원 도입 무료 상담을 예약하세요. 60분 맞춤 진단으로 업무 자동화 포인트를 찾아드립니다.",
    type: "website",
    locale: "ko_KR",
    url: pageUrl,
    siteName: "SnapPlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "상담 예약 - 60분 무료 진단 컨설팅",
    description:
      "AI 팀원 도입 무료 상담을 예약하세요. 60분 맞춤 진단으로 업무 자동화 포인트를 찾아드립니다.",
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
