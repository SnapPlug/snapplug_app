import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 자동화 진단 결과",
  description: "스냅플러그 AI 자동화 진단 결과 페이지입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DiagnosisResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
