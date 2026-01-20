'use client';

import Image from 'next/image';

interface Scenario {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  aiTeam: ('luna' | 'sera' | 'rio' | 'ara')[];
  highlight: {
    number: string;
    unit: string;
    suffix: string;
  };
  painPoint: string;
  solutions: string[];
}

const aiTeamInfo: Record<string, { name: string; image: string; color: string }> = {
  luna: { name: 'Luna', image: '/AI_luna.webp', color: '#EC4899' },
  sera: { name: 'Sera', image: '/AI_sera.webp', color: '#06B6D4' },
  rio: { name: 'Rio', image: '/AI_rio.webp', color: '#F59E0B' },
  ara: { name: 'Ara', image: '/AI_ara.webp', color: '#8B5CF6' },
};

const scenarios: Scenario[] = [
  {
    id: 'customs',
    icon: '⚖️',
    title: 'P 관세사무소',
    subtitle: '한달 평균 30~40건 처리',
    aiTeam: ['ara'],
    highlight: {
      number: '40',
      unit: '시간',
      suffix: '/월 절감',
    },
    painPoint: '한 건당 평균 20장 영수증 처리, 평균 1시간 소요',
    solutions: [
      '영수증 OCR 판독 및 AI 자동 문서 작성',
      '건당 처리시간 1시간 → 10분',
    ],
  },
  {
    id: 'sensor',
    icon: '🏭',
    title: 'K 센서장비 제조사',
    subtitle: '전국 시공/설치/AS 운영',
    aiTeam: ['ara'],
    highlight: {
      number: '전사',
      unit: '',
      suffix: '업무 자동화',
    },
    painPoint: '전국에 흩어진 시공현황, 장비현황, 문서작업을 수동으로 관리',
    solutions: [
      '전국 시공현황 실시간 대시보드',
      '장비현황 자동 모니터링',
      '문서작업 및 보고서 자동 생성',
    ],
  },
  {
    id: 'obgyn',
    icon: '🏥',
    title: 'O 산부인과',
    subtitle: '환자 1명당 간호사 1명 배정',
    aiTeam: ['ara', 'sera'],
    highlight: {
      number: '43.5',
      unit: '시간',
      suffix: '/월 절감',
    },
    painPoint: '환자 1명당 평균 10~15분 소요되는 예진·문진 과정',
    solutions: [
      '예진·문진·상담과정 자동화',
      '환자 응대 챗봇 연동',
    ],
  },
  {
    id: 'stenography',
    icon: '📝',
    title: 'S 속기사사무소',
    subtitle: '한달 평균 200건+ 계약 상담',
    aiTeam: ['sera', 'rio'],
    highlight: {
      number: '54',
      unit: '시간',
      suffix: '/월 절감',
    },
    painPoint: '전화·카카오톡 문의 채널 관리와 계약 단계별 안내에 시간 소모',
    solutions: [
      '문의 채널 연동 상담 예약·변경 자동 처리',
      '계약 단계별 안내·알림 및 후속 메시지 자동 발송',
    ],
  },
  {
    id: 'pilates',
    icon: '🧘',
    title: 'S 필라테스',
    subtitle: '회원 관리 시스템 개선',
    aiTeam: ['ara', 'sera'],
    highlight: {
      number: '2',
      unit: '배',
      suffix: ' 매출 상승',
    },
    painPoint: '기존 회원관리 시스템의 복잡한 인터페이스, 잔여 기간 모니터링 부재',
    solutions: [
      '카카오톡 기반 회원관리 시스템',
      '수강 만료 전 자동 알림으로 연장률 개선',
    ],
  },
  {
    id: 'academy',
    icon: '📚',
    title: 'J 종합학원',
    subtitle: '강사 2명 / 수강생 80명',
    aiTeam: ['ara', 'sera', 'rio'],
    highlight: {
      number: '67',
      unit: '%',
      suffix: ' 재등록률 상승',
    },
    painPoint: '아침 10시~밤 12시 쉴틈 없는 수업으로 상담 누락 발생',
    solutions: [
      '상담 및 학생 진단 프로세스 AI 자동화',
      '24시간 문의 응대 챗봇',
    ],
  },
];


export default function Scenarios() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">매출 2배, 비용 40% 절감, 월 54시간 확보</h2>
        <p className="text-center text-[var(--text-sub)] mb-10 max-w-2xl mx-auto">
          AI 팀원 도입 후 실제 달라진 결과입니다
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="card overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{scenario.icon}</span>
                <div>
                  <h3 className="text-lg font-bold">{scenario.title}</h3>
                  <p className="text-xs text-[var(--text-sub)]">{scenario.subtitle}</p>
                </div>
              </div>

                {/* AI Team Badge */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex -space-x-2">
                    {scenario.aiTeam.map((member) => (
                      <div
                        key={member}
                        className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                      >
                        <Image
                          src={aiTeamInfo[member].image}
                          alt={aiTeamInfo[member].name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-[var(--primary)] font-medium">
                    with {scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(' + ')}
                  </span>
                </div>

                {/* Highlight */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white p-4 rounded-xl mb-4 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{scenario.highlight.number}</span>
                    <span className="text-lg font-bold">{scenario.highlight.unit}</span>
                    <span className="text-sm opacity-90">{scenario.highlight.suffix}</span>
                  </div>
                </div>

                {/* Pain Point */}
                <div className="mb-4">
                  <p className="text-xs text-[var(--text-sub)] mb-1">😩 도입 전</p>
                  <p className="text-sm text-[var(--text-main)]">{scenario.painPoint}</p>
                </div>

                {/* Solutions */}
                <div>
                  <p className="text-xs text-[var(--text-sub)] mb-2">✨ 솔루션</p>
                  <div className="space-y-1.5">
                    {scenario.solutions.map((solution, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--primary)] mt-0.5">•</span>
                        <span className="text-[var(--text-main)]">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[var(--text-sub)] mb-4">
            우리 업종에도 적용 가능한지 궁금하신가요?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
          >
            무료 진단 받기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
