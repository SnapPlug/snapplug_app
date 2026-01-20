'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  tagline: string;
  problems: string[];
  solution: {
    description: string;
    channels?: string[];
    features?: string[];
  };
  metrics: { label: string; before: string; after: string }[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'luna',
    name: 'Luna',
    role: 'AI 마케팅 책임자',
    image: '/AI_luna.webp',
    tagline: '"콘텐츠, 저한테 맡기세요"',
    problems: [
      '글 하나 쓰면 X, 링크드인, 뉴스레터에 다시 올려야 해서 귀찮음',
      '채널마다 톤 다르게 바꾸는 게 시간 낭비',
      '콘텐츠 더 올리면 좋은 거 아는데 시간이 없음',
    ],
    solution: {
      description: '글 1개 작성 → Luna에게 전달 → 각 채널 톤에 맞게 자동 변환 (5분)',
      channels: ['X 버전', '링크드인', '뉴스레터', '블로그 버전'],
    },
    metrics: [
      { label: '작업시간', before: '주 5시간', after: '주 30분' },
      { label: '발행채널', before: '1~2개', after: '4개' },
      { label: '월절감액', before: '-', after: '~80만원 (시급5만원 기준)' },
    ],
  },
  {
    id: 'sera',
    name: 'Sera',
    role: 'AI 고객응대 책임자',
    image: '/AI_sera.webp',
    tagline: '"고객 문의, 제가 받을게요"',
    problems: [
      '밤/주말에 문의 오면 다음 날 답하는데, 그때 이미 고객이 이탈함',
      '똑같은 질문에 매번 같은 답변 반복',
      'CS 담당자 뽑기엔 아직 애매함',
    ],
    solution: {
      description: '고객 문의 (채널톡/카카오/웹) → Sera 자동 응대 (24시간)',
      features: [
        '자주 묻는 질문 → 즉시 답변',
        '복잡한 문의 → 담당자 연결',
        '문의 유형별 자동 분류',
        '급한 건만 알림',
      ],
    },
    metrics: [
      { label: '응대시간', before: '평균 4시간', after: '평균 5분' },
      { label: '응대율', before: '70%', after: '100%' },
      { label: '월절감액', before: '-', after: '~150만원 (CS인건비 대비)' },
    ],
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'AI 영업 책임자',
    image: '/AI_rio.webp',
    tagline: '"리드, 제가 관리할게요"',
    problems: [
      '리드는 들어오는데 정리가 안 됨',
      '누가 진짜 고객인지 파악이 어려움',
      '팔로업 타이밍 놓쳐서 기회 손실',
    ],
    solution: {
      description: '리드 유입 (문의, 웨비나, 광고) → Rio BANT 자동 검증',
      features: [
        '🔥 Hot 리드 → 즉시 미팅 제안',
        '🌡️ Warm 리드 → 자동 너처링',
        '❄️ Cold 리드 → 장기 관리',
      ],
    },
    metrics: [
      { label: '리드정리 시간', before: '주 3시간', after: '자동화' },
      { label: '전환율', before: '5%', after: '10%+' },
      { label: '기회손실', before: '많음', after: '최소화' },
    ],
  },
  {
    id: 'ara',
    name: 'Ara',
    role: 'AI 수석보좌관',
    image: '/AI_ara.webp',
    tagline: '"대표님 일정, 제가 챙길게요"',
    problems: [
      '미팅 잡느라 이메일 왔다갔다 시간 낭비',
      '일정 겹쳐서 실수하는 경우 발생',
      '반복 업무(보고서, 정리)에 시간 뺏김',
    ],
    solution: {
      description: '일정 및 반복 업무 자동화',
      features: [
        '미팅 일정 자동 조율',
        '캘린더 충돌 체크 & 알림',
        '정기 보고서 자동 생성',
        '이메일 초안 작성',
      ],
    },
    metrics: [
      { label: '일정조율', before: '건당 30분', after: '자동화' },
      { label: '실수율', before: '가끔', after: '0%' },
      { label: '주간절감', before: '-', after: '~5시간' },
    ],
  },
];

export default function AITeamDetail() {
  const [activeTab, setActiveTab] = useState('luna');
  const activeMember = teamMembers.find((m) => m.id === activeTab)!;

  return (
    <section id="ai-team" className="section bg-white">
      <div className="container">
        <h2 className="section-title">AI 팀원을 소개합니다</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setActiveTab(member.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === member.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]'
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              {member.name}
            </button>
          ))}
        </div>

        {/* Active Member Content */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="card mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={activeMember.image}
                  alt={activeMember.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{activeMember.name}</h3>
                <p className="text-[var(--text-sub)]">{activeMember.role}</p>
              </div>
            </div>
            <p className="text-lg text-[var(--primary)] font-medium">
              {activeMember.tagline}
            </p>
          </div>

          {/* Problems */}
          <div className="card mb-6">
            <h4 className="text-lg font-bold mb-4">😩 이런 문제, 있으시죠?</h4>
            <ul className="space-y-3">
              {activeMember.problems.map((problem, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[var(--text-sub)]">•</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="card mb-6 bg-[#FFF8F5] border-[var(--primary)] border-opacity-30">
            <h4 className="text-lg font-bold mb-4">
              ✨ {activeMember.name}가 함께하면
            </h4>
            <p className="mb-4 text-[var(--text-main)]">
              {activeMember.solution.description}
            </p>
            {activeMember.solution.channels && (
              <div className="flex flex-wrap gap-2">
                {activeMember.solution.channels.map((channel, idx) => (
                  <span key={idx} className="ai-badge">
                    {channel}
                  </span>
                ))}
              </div>
            )}
            {activeMember.solution.features && (
              <ul className="space-y-2">
                {activeMember.solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Metrics */}
          <div className="card">
            <h4 className="text-lg font-bold mb-4">📊 예상 효과</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 px-3 text-left text-sm font-semibold">항목</th>
                    <th className="py-2 px-3 text-center text-sm font-semibold text-[var(--text-sub)]">
                      Before
                    </th>
                    <th className="py-2 px-3 text-center text-sm font-semibold text-[var(--primary)]">
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeMember.metrics.map((metric, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="py-3 px-3 font-medium">{metric.label}</td>
                      <td className="py-3 px-3 text-center text-[var(--text-sub)]">
                        {metric.before}
                      </td>
                      <td className="py-3 px-3 text-center text-[var(--success)] font-semibold">
                        {metric.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a href="#contact" className="btn-primary">
              {activeMember.name} 도입 상담하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
