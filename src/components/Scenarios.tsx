'use client';

import { useState } from 'react';

const scenarios = [
  {
    id: 'design',
    icon: '🎨',
    title: '디자인 에이전시 A사',
    subtitle: '직원 5명 / 월 프로젝트 8~10건',
    before: [
      '대표가 견적 문의 응대에 하루 2시간 사용',
      '야간/주말 문의는 월요일에 답변 → 30% 이탈',
      '콘텐츠 마케팅 하고 싶은데 시간 없음',
      '정산 서류 정리에 월 8시간 소요',
    ],
    after: [
      { agent: 'Sera', desc: '견적 문의 24시간 자동 응대 → 응대 시간 2시간 → 15분 → 이탈률 30% → 5%' },
      { agent: 'Luna', desc: '포트폴리오 콘텐츠 자동 발행 → 주 1회 → 주 4회 발행 가능' },
    ],
    summary: {
      time: '월 40시간',
      cost: '월 약 200만원 (시급 5만원)',
      extra: '이탈 방지로 월 1건+ 추가 수주',
    },
  },
  {
    id: 'professional',
    icon: '⚖️',
    title: '관세사무소 B',
    subtitle: '1인 운영 / 월 고객 20~30건',
    before: [
      '고객이 영수증 보내면 일일이 엑셀 정리',
      '파워포인트 보고서 수작업 → 건당 1시간',
      '야간 문의 대응 불가',
      '본업(관세 업무)에 집중할 시간 부족',
    ],
    after: [
      { agent: '맞춤 자동화', desc: '영수증 업로드 → AI OCR 추출 → 구글시트 자동 저장 → 보고서 자동 생성 → 건당 1시간 → 5분' },
      { agent: 'Sera', desc: '고객 문의 24시간 자동 응대 → "서류 언제 되나요?" 자동 답변' },
    ],
    summary: {
      time: '월 25시간',
      cost: '월 약 125만원',
      extra: '본업 집중 → 고객 수용량 증가',
    },
  },
  {
    id: 'coach',
    icon: '💼',
    title: '비즈니스 코치 C님',
    subtitle: '1인 운영 / 월 코칭 15~20건',
    before: [
      '콘텐츠 마케팅 해야 하는데 글쓰기 시간 없음',
      'SNS 4개 채널 운영 중인데 1개만 겨우 관리',
      '상담 문의 → 일정 조율에 왔다갔다 30분씩',
      '새벽 4시 기상, 육아와 일 병행 중',
    ],
    after: [
      { agent: 'Luna', desc: '스레드 글 1개 → 4채널 자동 발행 → 콘텐츠 작업 2시간 → 15분 → 4개 채널 모두 운영 가능' },
      { agent: 'Ara', desc: '상담 일정 자동 조율 → 캘린더 링크 자동 발송 → 일정 조율 시간 0분' },
    ],
    summary: {
      time: '월 20시간',
      cost: '수면 1시간 더 확보',
      extra: '노출 4배 증가 → 문의 증가',
    },
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    title: '이커머스 스타트업 D사',
    subtitle: '직원 3명 / 월 주문 500건+',
    before: [
      '카카오톡/채널톡 문의 하루 50건+',
      '"배송 언제 되나요?" 같은 질문 80%',
      'CS 담당자 채용 고민 중 (월 250만원+)',
      '밤 문의 → 다음 날 답변 → 클레임 발생',
    ],
    after: [
      { agent: 'Sera', desc: '채널톡 연동 24시간 자동 응대 → 배송조회 자동 답변 → 반품/교환 절차 자동 안내 → 복잡한 문의만 담당자 연결' },
      { agent: 'Rio', desc: '구매 이탈 고객 자동 팔로업 → 장바구니 이탈 → 자동 리마인드' },
    ],
    summary: {
      time: '문의의 80% 자동 처리',
      cost: 'CS 채용 불필요 (월 250만원+)',
      extra: '클레임 50% 이상 감소',
    },
  },
];

export default function Scenarios() {
  const [activeScenario, setActiveScenario] = useState('design');
  const active = scenarios.find((s) => s.id === activeScenario)!;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">업종별 도입 시나리오</h2>
        <p className="text-center text-[var(--text-sub)] mb-8 max-w-2xl mx-auto">
          &ldquo;우리 회사도 이렇게 되겠구나&rdquo; 상상해보세요
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeScenario === scenario.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-white border border-[var(--border)] hover:border-[var(--primary)]'
              }`}
            >
              <span className="mr-1">{scenario.icon}</span>
              {scenario.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{active.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{active.title}</h3>
                <p className="text-sm text-[var(--text-sub)]">{active.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Before */}
          <div className="card mb-6">
            <h4 className="text-lg font-bold mb-4">😩 도입 전 상황</h4>
            <ul className="space-y-2">
              {active.before.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[var(--text-sub)]">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="card mb-6 bg-[#FFF8F5] border-[var(--primary)] border-opacity-30">
            <h4 className="text-lg font-bold mb-4">✨ 도입 후 변화</h4>
            <div className="space-y-4">
              {active.after.map((item, idx) => (
                <div key={idx}>
                  <span className="ai-badge mb-2">{item.agent}</span>
                  <p className="text-[var(--text-main)] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="card bg-[var(--secondary)] text-white">
            <h4 className="text-lg font-bold mb-4">📊 월간 효과 요약</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-80">절감 시간</p>
                <p className="text-xl font-bold">{active.summary.time}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">비용 절감</p>
                <p className="text-xl font-bold">{active.summary.cost}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">추가 효과</p>
                <p className="text-xl font-bold">{active.summary.extra}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
