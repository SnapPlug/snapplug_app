import type { Metadata } from 'next';
import AIDiagnosisClient from './AIDiagnosisClient';

export const metadata: Metadata = {
  title: 'AI 자동화 ROI 진단',
  description: '30초 만에 귀사에 맞는 AI 팀원과 예상 ROI를 확인하세요. 고객응대, 영업, 마케팅, 업무자동화 중 어디서 가장 많은 시간이 낭비되는지 진단해드립니다.',
  alternates: {
    canonical: 'https://snapplug.app/ai-diagnosis',
  },
  openGraph: {
    title: 'AI 자동화 ROI 진단 | 스냅플러그',
    description: '30초 만에 귀사에 맞는 AI 팀원과 예상 ROI를 확인하세요.',
    url: 'https://snapplug.app/ai-diagnosis',
  },
};

export default function AIDiagnosisPage() {
  return <AIDiagnosisClient />;
}
