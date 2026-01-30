'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

const pirulen = localFont({
  src: '../../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

// AI 팀원 정보
const aiTeamData: Record<string, {
  name: string;
  nameKo: string;
  role: string;
  image: string;
  color: string;
  description: string;
  features: string[];
}> = {
  sera: {
    name: 'Sera',
    nameKo: '세라',
    role: 'AI 고객 서비스 담당',
    image: '/AI_sera.webp',
    color: '#06B6D4',
    description: '24시간 고객 문의 자동 응대',
    features: ['채널톡/카카오톡 연동', 'FAQ 자동 답변', '복잡한 문의 담당자 연결'],
  },
  rio: {
    name: 'Rio',
    nameKo: '리오',
    role: 'AI 세일즈 담당',
    image: '/AI_rio.webp',
    color: '#F59E0B',
    description: 'BANT 기반 리드 검증 및 영업 지원',
    features: ['Hot/Warm/Cold 리드 분류', '자동 팔로업', 'CRM 자동 정리'],
  },
  luna: {
    name: 'Luna',
    nameKo: '루나',
    role: 'AI 콘텐츠 마케팅 담당',
    image: '/AI_luna.webp',
    color: '#EC4899',
    description: '콘텐츠 멀티채널 자동 배포',
    features: ['5개+ 채널 동시 발행', '채널별 톤 최적화', '콘텐츠 캘린더 관리'],
  },
  alex: {
    name: 'Alex',
    nameKo: '알렉스',
    role: 'AI 정보 처리 담당',
    image: '/AI_alex.webp',
    color: '#10B981',
    description: '문서 처리, 데이터 정리 자동화',
    features: ['영수증/증빙 자동 처리', '데이터 입력 자동화', '보고서 자동 생성'],
  },
  ara: {
    name: 'Ara',
    nameKo: '아라',
    role: 'AI 자동화 전문가',
    image: '/AI_ara.webp',
    color: '#8B5CF6',
    description: '업무 프로세스 분석 및 자동화 설계',
    features: ['워크플로우 자동화', '일정 조율 자동화', '시스템 연동'],
  },
};

// 역할 → AI 팀원 매핑
const roleToAgent: Record<string, string> = {
  'cs_담당자': 'sera',
  '영업_담당자': 'rio',
  '마케터': 'luna',
  '데이터_담당': 'alex',
  '비서': 'ara',
  '자동화_전문가': 'ara',
};

// 업무 → AI 팀원 매핑
const taskToAgent: Record<string, string> = {
  '고객_문의_응대': 'sera',
  '영업_리드_관리': 'rio',
  '콘텐츠_마케팅': 'luna',
  '데이터_입력_정리': 'alex',
  '문서_증빙_처리': 'alex',
  '일정_조율_미팅': 'ara',
  '업무_프로세스_자동화': 'ara',
};

// 주당 시간 → 월간 시간 매핑
const hoursMap: Record<string, number> = {
  '5시간_미만': 16,
  '5-10시간': 30,
  '10-20시간': 60,
  '20시간_이상': 100,
};

// 자동화 가능 비율 매핑
const automationRateMap: Record<string, number> = {
  '대부분반복': 0.7,
  '절반패턴화': 0.5,
  '케이스마다다름': 0.3,
};

// AI 팀원별 도입 사례
const agentCaseStudies: Record<string, { quote: string; company: string; result: string }> = {
  sera: {
    quote: '채널톡 연동 24시간 자동 응대로 CS 담당자 채용 없이 문의의 80%를 자동 처리',
    company: '이커머스 스타트업 D사',
    result: 'CS 채용 불필요 (월 250만원+ 절감), 클레임 50% 감소',
  },
  rio: {
    quote: '구매 이탈 고객 자동 팔로업으로 장바구니 이탈 시 자동 리마인드 발송',
    company: '이커머스 스타트업 D사',
    result: '전환율 15% 향상, 리드 관리 시간 주 3시간 → 자동화',
  },
  luna: {
    quote: '스레드 글 1개로 4채널 자동 발행, 콘텐츠 작업 2시간 → 15분으로 단축',
    company: '비즈니스 코치 C님 (1인 운영)',
    result: '월 20시간 절감, 노출 4배 증가 → 문의 증가',
  },
  alex: {
    quote: '영수증 업로드 → AI OCR 추출 → 구글시트 자동 저장 → 보고서 자동 생성',
    company: '관세사무소 B (1인 운영)',
    result: '건당 1시간 → 5분, 월 25시간 절감, 본업 집중 가능',
  },
  ara: {
    quote: '상담 일정 자동 조율로 캘린더 링크 자동 발송, 일정 조율 시간 0분',
    company: '비즈니스 코치 C님 (1인 운영)',
    result: '월 20시간 절감, 수면 1시간 더 확보',
  },
};

// 자동화 적합도 계산
function getAutomationFitScore(pattern: string): number {
  const rate = automationRateMap[pattern] || 0.5;
  return Math.round(rate * 5);
}

// 추천 AI 팀원 계산
function getRecommendedAgents(role: string, tasks: string[]): { agent: string; score: number; reasons: string[] }[] {
  const scores: Record<string, { score: number; reasons: string[] }> = {};

  // 역할 기반 점수 (2점)
  if (role && roleToAgent[role]) {
    const agent = roleToAgent[role];
    if (!scores[agent]) scores[agent] = { score: 0, reasons: [] };
    scores[agent].score += 2;
    scores[agent].reasons.push('선택한 직원 역할과 일치');
  }

  // 업무 기반 점수 (각 1점)
  tasks.forEach((task) => {
    const agent = taskToAgent[task];
    if (agent) {
      if (!scores[agent]) scores[agent] = { score: 0, reasons: [] };
      scores[agent].score += 1;
      scores[agent].reasons.push(`"${task.replace(/_/g, ' ')}" 업무 자동화`);
    }
  });

  // 점수순 정렬
  return Object.entries(scores)
    .map(([agent, data]) => ({ agent, ...data }))
    .sort((a, b) => b.score - a.score);
}

// ROI 계산
function calculateROI(hours: string, pattern: string) {
  const monthlyHours = hoursMap[hours] || 30;
  const automationRate = automationRateMap[pattern] || 0.5;
  const monthlySavedHours = Math.round(monthlyHours * automationRate);
  const annualSaving = monthlySavedHours * 12 * 50000; // 시간당 5만원 기준

  return {
    monthlyHours,
    monthlySavedHours,
    annualSaving,
    automationRate: Math.round(automationRate * 100),
  };
}

function DiagnosisResultContent() {
  const searchParams = useSearchParams();

  // URL 파라미터 파싱
  const role = searchParams.get('role') || '';
  const tasksParam = searchParams.get('tasks') || '';
  const tasks = tasksParam ? tasksParam.split(',') : [];
  const hours = searchParams.get('hours') || '10-20시간';
  const pattern = searchParams.get('pattern') || '절반패턴화';
  const name = searchParams.get('name') || '고객';
  const company = searchParams.get('company') || '귀사';

  // 추천 AI 팀원 계산
  const recommendedAgents = getRecommendedAgents(role, tasks);

  // ROI 계산
  const roi = calculateROI(hours, pattern);
  const fitScore = getAutomationFitScore(pattern);

  // 기본 추천 (선택이 없는 경우)
  const hasRecommendations = recommendedAgents.length > 0;
  const displayAgents = hasRecommendations
    ? recommendedAgents
    : [{ agent: 'ara', score: 1, reasons: ['업무 자동화 컨설팅'] }];

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Navbar */}
      <nav className="navbar pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}
          >
            SnapPlug
          </Link>
          <Link
            href="/"
            className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </nav>

      {/* Result Section */}
      <section className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[var(--primary)] font-semibold mb-2">AI 자동화 진단 결과</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-4">
              {company}의 맞춤 AI 팀원 추천
            </h1>
            <p className="text-[var(--text-sub)]">
              {name}님, 진단 결과를 확인해보세요
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)]">
              <p className="text-[var(--text-sub)] text-sm mb-1">예상 월간 절감 시간</p>
              <p className="text-3xl font-bold text-[var(--primary)]">
                {roi.monthlySavedHours}<span className="text-lg font-normal">시간</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)]">
              <p className="text-[var(--text-sub)] text-sm mb-1">예상 연간 비용 절감</p>
              <p className="text-3xl font-bold text-[var(--success)]">
                {(roi.annualSaving / 10000).toLocaleString()}<span className="text-lg font-normal">만원</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)]">
              <p className="text-[var(--text-sub)] text-sm mb-1">자동화 적합도</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`text-2xl ${i <= fitScore ? 'text-yellow-400' : 'text-gray-200'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended AI Team Members */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6">
              추천 AI 팀원
            </h2>
            <div className="space-y-4">
              {displayAgents.map((rec, index) => {
                const agentData = aiTeamData[rec.agent];
                if (!agentData) return null;

                return (
                  <div
                    key={rec.agent}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: `${agentData.color}20` }}
                      >
                        <Image
                          src={agentData.image}
                          alt={agentData.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {index === 0 && (
                            <span
                              className="px-2 py-0.5 text-xs font-semibold rounded text-white"
                              style={{ backgroundColor: agentData.color }}
                            >
                              1순위 추천
                            </span>
                          )}
                          <span className="text-[var(--text-sub)] text-sm">
                            매칭 점수: {rec.score}점
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                          {agentData.name} ({agentData.nameKo}) - {agentData.role}
                        </h3>
                        <p className="text-[var(--text-sub)] text-sm mb-3">
                          {agentData.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {agentData.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 text-xs rounded-full bg-[var(--background)] text-[var(--text-sub)]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        {rec.reasons.length > 0 && (
                          <div className="text-sm text-[var(--text-sub)]">
                            <span className="font-medium">추천 이유:</span>{' '}
                            {rec.reasons.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Study - 1순위 추천 AI 팀원에 맞는 사례 표시 */}
          {displayAgents[0] && agentCaseStudies[displayAgents[0].agent] && (
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-2xl p-6 md:p-8 mb-12">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                {aiTeamData[displayAgents[0].agent]?.name} 도입 사례
              </h2>
              <blockquote className="text-[var(--text-sub)] italic mb-4">
                &quot;{agentCaseStudies[displayAgents[0].agent].quote}&quot;
              </blockquote>
              <p className="text-sm text-[var(--success)] font-medium mb-2">
                {agentCaseStudies[displayAgents[0].agent].result}
              </p>
              <p className="text-sm text-[var(--text-sub)]">
                - {agentCaseStudies[displayAgents[0].agent].company}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--border)] text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4">
              다음 단계: 무료 60분 심층 진단
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6 text-left md:text-center">
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span className="text-[var(--text-sub)]">귀사 업무 프로세스 구체 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span className="text-[var(--text-sub)]">AI 팀원 맞춤 설계 제안</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span className="text-[var(--text-sub)]">30일 도입 로드맵</span>
              </div>
            </div>
            <p className="text-sm text-[var(--text-sub)] mb-6">
              &quot;30일 안에 효과 없으면 비용 0원&quot;
            </p>
            <Link
              href="/contacts"
              className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-xl hover:bg-[var(--primary-hover)] transition-colors"
            >
              무료 진단 미팅 신청하기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function DiagnosisResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--text-sub)]">결과를 불러오는 중...</p>
        </div>
      </main>
    }>
      <DiagnosisResultContent />
    </Suspense>
  );
}
