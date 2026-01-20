'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Random underline SVG path (hand-drawn style)
const underlinePath = "M0,8 Q30,2 60,8 T120,8 T180,8";

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
    tagline: '"마케팅 콘텐츠, 저한테 맡기세요"',
    problems: [
      '마케팅 채널은 많은데 콘텐츠 만들 시간이 부족함',
      '전문 마케터 고용하기엔 비용 부담',
    ],
    solution: {
      description: '아이디어 하나만 전달하면, Luna가 모든 채널용 콘텐츠를 자동 생성',
      features: [
        '콘텐츠 생성 (X, 링크드인, 인스타, 페이스북, 유튜브)',
        '광고 성과 관리',
      ],
    },
    metrics: [
      { label: '콘텐츠 제작', before: '주 10시간+', after: '주 1시간' },
      { label: '활용 채널', before: '1~2개', after: '5개+' },
      { label: '월절감액', before: '-', after: '~200만원 (마케터 인건비 대비)' },
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
        'Hot 리드 → 즉시 미팅 제안',
        'Warm 리드 → 자동 너처링',
        'Cold 리드 → 장기 관리',
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

const challenges = [
  {
    id: 'content',
    title: '마케팅 콘텐츠',
    avatar: '/AI_luna.webp',
    aiName: 'Luna',
    beforeValue: 100,
    afterValue: 10,
    beforeLabel: '주 10시간+',
    afterLabel: '주 1시간',
    problemDesc: '채널별로 각각 콘텐츠 만들기 힘들어요',
    solutionDesc: '아이디어 하나로 5개+ 채널 콘텐츠 생성',
    improvement: '90%',
    improvementLabel: '시간 절감',
  },
  {
    id: 'cs',
    title: '고객 응대',
    avatar: '/AI_sera.webp',
    aiName: 'Sera',
    beforeValue: 40,
    afterValue: 100,
    beforeLabel: '40% 응대',
    afterLabel: '100% 응대',
    problemDesc: '밤/주말엔 답변 불가, 고객 이탈',
    solutionDesc: '즉시 응대, 복잡한 건만 연결',
    improvement: '100%',
    improvementLabel: '응대율',
  },
  {
    id: 'lead',
    title: '리드 관리',
    avatar: '/AI_rio.webp',
    aiName: 'Rio',
    beforeValue: 50,
    afterValue: 100,
    beforeLabel: '15% 전환',
    afterLabel: '30% 전환',
    problemDesc: '누락 잦고, 팔로업 타이밍 놓침',
    solutionDesc: 'Hot/Warm/Cold 자동 분류 & 알림',
    improvement: '2배',
    improvementLabel: '전환율',
  },
  {
    id: 'admin',
    title: '반복 업무',
    avatar: '/AI_ara.webp',
    aiName: 'Ara',
    beforeValue: 100,
    afterValue: 20,
    beforeLabel: '하루 2시간+',
    afterLabel: '하루 24분',
    problemDesc: '일정 조율, 보고서, 이메일...',
    solutionDesc: '일정/보고서/이메일 자동 처리',
    improvement: '80%',
    improvementLabel: '업무 감소',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Draw underline animation
      if (underlineRef.current) {
        const pathLength = underlineRef.current.getTotalLength();
        gsap.set(underlineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        });
      }

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.challenge-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Animate comparison bars
      const comparisonBars = cardsRef.current?.querySelectorAll('.comparison-bar');
      if (comparisonBars) {
        comparisonBars.forEach((bar) => {
          const targetWidth = (bar as HTMLElement).style.width;
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMember]);

  const openModal = (aiName: string) => {
    const member = teamMembers.find((m) => m.name === aiName);
    if (member) {
      setSelectedMember(member);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 ref={titleRef} className="text-center mb-4 opacity-0">
          <span className="text-2xl md:text-3xl text-[var(--text-sub)]">반복 업무에 지치셨나요?</span>
          <br />
          <span className="text-3xl md:text-5xl font-bold mt-2 block">
            AI 팀원이{' '}
            <span className="relative inline-block">
              <span className="text-[var(--primary)]">확실하게</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 overflow-visible"
                viewBox="0 0 180 16"
                preserveAspectRatio="none"
              >
                <path
                  ref={underlineRef}
                  d={underlinePath}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {' '}해결합니다
          </span>
        </h2>

        <p className="text-center text-[var(--text-sub)] mb-12 md:mb-16">
          도입 전후를 비교해보세요
        </p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {challenges.map((item) => (
            <div
              key={item.id}
              className="challenge-card card p-6 overflow-hidden opacity-0"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--accent-warm)] flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.aiName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-xs text-[var(--primary)] font-semibold">with {item.aiName}</p>
                </div>
                <div className="ml-auto bg-[var(--primary)] text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-bold">{item.improvement}</span>
                  <span className="text-xs ml-1">{item.improvementLabel}</span>
                </div>
              </div>

              {/* Visual Comparison Graph */}
              <div className="space-y-4">
                {/* Before Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--text-sub)] uppercase tracking-wider">Before</span>
                    <span className="text-sm font-bold text-[var(--text-main)]">{item.beforeLabel}</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="comparison-bar before-bar h-full bg-gray-400 rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${item.beforeValue}%` }}
                    >
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-sub)] mt-1">{item.problemDesc}</p>
                </div>

                {/* After Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">After</span>
                    <span className="text-sm font-bold text-[var(--primary)]">{item.afterLabel}</span>
                  </div>
                  <div className="h-8 bg-[#FFF0E8] rounded-full overflow-hidden relative">
                    <div
                      className="comparison-bar after-bar h-full bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${item.afterValue}%` }}
                    >
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-sub)] mt-1">{item.solutionDesc}</p>
                </div>
              </div>

              {/* Detail Button */}
              <button
                onClick={() => openModal(item.aiName)}
                className="block w-full mt-6 py-3 bg-[var(--foreground)] text-white text-center font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                {item.aiName} 자세히 보기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[var(--accent-warm)]">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                  <p className="text-[var(--primary)] font-semibold">{selectedMember.role}</p>
                </div>
              </div>
              <p className="text-lg text-[var(--text-sub)] italic mb-6">
                {selectedMember.tagline}
              </p>
            </div>

            {/* Problems */}
            <div className="px-6 py-4 bg-gray-50">
              <h4 className="text-lg font-bold mb-3">이런 문제, 있으시죠?</h4>
              <ul className="space-y-2">
                {selectedMember.problems.map((problem, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[var(--text-sub)]">
                    <span className="text-[var(--primary)] mt-1">-</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="px-6 py-4 bg-[#FFF8F5]">
              <h4 className="text-lg font-bold mb-3 text-[var(--primary)]">
                {selectedMember.name}가 함께하면
              </h4>
              <p className="mb-3 text-[var(--text-main)]">
                {selectedMember.solution.description}
              </p>
              {selectedMember.solution.channels && (
                <div className="flex flex-wrap gap-2">
                  {selectedMember.solution.channels.map((channel, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[var(--secondary)] text-white text-sm rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              )}
              {selectedMember.solution.features && (
                <ul className="space-y-1 mt-2">
                  {selectedMember.solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">-</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Metrics */}
            <div className="px-6 py-4">
              <h4 className="text-lg font-bold mb-3">예상 효과</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="py-2 px-3 text-left text-sm font-semibold">항목</th>
                      <th className="py-2 px-3 text-center text-sm font-semibold text-[var(--text-sub)]">Before</th>
                      <th className="py-2 px-3 text-center text-sm font-semibold text-[var(--primary)]">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMember.metrics.map((metric, idx) => (
                      <tr key={idx} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-3 px-3 font-medium">{metric.label}</td>
                        <td className="py-3 px-3 text-center text-[var(--text-sub)]">{metric.before}</td>
                        <td className="py-3 px-3 text-center text-[var(--success)] font-semibold">{metric.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 pt-2">
              <a
                href="#contact"
                className="block w-full py-4 bg-[var(--primary)] text-white text-center font-bold rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                onClick={closeModal}
              >
                {selectedMember.name} 도입 상담하기
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
