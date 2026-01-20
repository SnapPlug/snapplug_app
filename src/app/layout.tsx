import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapPlug - 당신의 첫 번째 AI 팀원 | Business & Beyond",
  description: "AI 자동화로 반복 업무에서 해방되세요. Ara, Rio, Luna, Sera - 4명의 AI 팀원이 마케팅, 영업, 고객응대, 일정관리를 대신합니다.",
  keywords: "AI 자동화, AI 팀원, 업무 자동화, 마케팅 자동화, 고객 응대, 챗봇, 스몰비즈니스",
  openGraph: {
    title: "SnapPlug - 당신의 첫 번째 AI 팀원",
    description: "AI 자동화로 반복 업무에서 해방되세요. 30분 무료 진단으로 시작하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "SnapPlug",
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
      </body>
    </html>
  );
}
