import type { Metadata } from "next";

const pageUrl = "https://snapplug.app/ai-diagnosis";

export const metadata: Metadata = {
  title: "AI 자동화 ROI 진단 - 30초 만에 확인하세요",
  description:
    "반복 업무에 매달 얼마를 쓰고 계신가요? 30초 진단으로 AI 팀원 도입 시 절감 시간과 비용을 바로 확인하세요. 마케팅, 고객응대, 영업, 업무자동화 맞춤 분석.",
  keywords: [
    "스냅플러그",
    "SnapPlug",
    "AI ROI 계산",
    "AI 자동화 진단",
    "업무 자동화 비용",
    "AI 도입 효과",
    "반복 업무 절감",
    "AI 팀원 진단",
  ],
  openGraph: {
    title: "AI 자동화 ROI 진단 - 30초 만에 확인하세요",
    description:
      "반복 업무에 매달 얼마를 쓰고 계신가요? 30초 진단으로 AI 팀원 도입 시 절감 시간과 비용을 바로 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: pageUrl,
    siteName: "SnapPlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 자동화 ROI 진단 - 30초 만에 확인하세요",
    description:
      "반복 업무에 매달 얼마를 쓰고 계신가요? 30초 진단으로 절감 시간과 비용을 확인하세요.",
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function AiDiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
