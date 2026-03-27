import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

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
  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: 'AI 진단', href: '/ai-diagnosis' },
        ]}
        current="진단 결과"
        className="container max-w-4xl pt-4"
      />
      {children}
    </>
  );
}
