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
  roleEn: string;
  image: string;
  tagline: string;
  problems: string[];
  solution: {
    description: string;
    channels?: string[];
    features?: string[];
  };
  metrics: { label: string; before: string; after: string }[];
  // Resume-style data
  licenses: { name: string; date: string }[];
  skills: { name: string; level: number }[];
  introduction: string;
  experiences: {
    period: string;
    company: string;
    industry: 'saas' | 'ecommerce' | 'agency' | 'coach' | 'logistics' | 'hr' | 'education' | 'subscription' | 'startup';
    description: string;
    result: string;
  }[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'luna',
    name: 'Luna',
    role: 'AI 마케팅 책임자',
    roleEn: 'HEAD OF MARKETING',
    image: '/AI_luna.webp',
    tagline: '"콘텐츠 하나로 세상을 뒤집어 놓겠습니다"',
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
    licenses: [
      { name: '콘텐츠 마케팅 전문가', date: '2026.01' },
      { name: '멀티채널 운영 자격', date: '2026.01' },
      { name: '광고 성과 분석사', date: '2026.01' },
    ],
    skills: [
      { name: '블로그/SNS 콘텐츠 작성', level: 5 },
      { name: '광고 카피라이팅', level: 4 },
      { name: '채널별 콘텐츠 최적화', level: 5 },
      { name: '콘텐츠 캘린더 관리', level: 4 },
      { name: '해시태그/키워드 분석', level: 4 },
    ],
    introduction: '대표님의 서비스와 제품을 더 많은 고객에게 알려드립니다',
    experiences: [
      {
        period: '',
        company: '신제품/서비스 런칭 마케팅',
        industry: 'saas',
        description: '제품 소개 콘텐츠를 X, 인스타, 링크드인, 블로그 등 5개+ 채널에 맞게 자동 생성',
        result: '런칭 초기 인지도 확보',
      },
      {
        period: '',
        company: 'SNS 채널 운영 자동화',
        industry: 'coach',
        description: '아이디어 하나만 주시면 각 채널 톤에 맞는 콘텐츠로 동시 생성',
        result: '콘텐츠 생산 시간 90% 절감',
      },
      {
        period: '',
        company: '광고 소재 대량 생산',
        industry: 'ecommerce',
        description: '상품별 광고 카피와 이미지 문구를 다양한 버전으로 자동 생성',
        result: 'A/B 테스트용 소재 무한 생산',
      },
    ],
  },
  {
    id: 'sera',
    name: 'Sera',
    role: 'AI 고객응대 책임자',
    roleEn: 'HEAD OF CUSTOMER SUCCESS',
    image: '/AI_sera.webp',
    tagline: '"잠들지 않습니다. 고객님이 필요할 때 항상 여기 있어요"',
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
    licenses: [
      { name: '24시간 무휴 응대 전문가', date: '2026.01' },
      { name: '자연어 대화 처리 자격', date: '2026.01' },
      { name: '고객 경험 관리사', date: '2026.01' },
    ],
    skills: [
      { name: '자연스러운 대화 응대', level: 5 },
      { name: '채널톡/카카오톡 연동', level: 5 },
      { name: '문의 유형 자동 분류', level: 5 },
      { name: '복잡한 문의 담당자 연결', level: 4 },
      { name: '고객 감정 파악', level: 4 },
    ],
    introduction: '대표님이 주무시는 동안에도 고객 문의에 자연스럽게 응대합니다',
    experiences: [
      {
        period: '',
        company: '24시간 고객 문의 자동 응대',
        industry: 'ecommerce',
        description: '밤/주말에도 고객 문의에 즉시 응답하여 이탈 방지, 복잡한 건만 담당자에게 연결',
        result: '응대율 100%, 고객 만족도 향상',
      },
      {
        period: '',
        company: '반복 문의 자동 처리',
        industry: 'education',
        description: '"배송 언제 되나요?", "환불 어떻게 하나요?" 등 자주 묻는 질문 즉시 답변',
        result: 'CS 업무 80% 자동화',
      },
      {
        period: '',
        company: '고객 경험 개선',
        industry: 'subscription',
        description: '빠른 응대로 고객 대기 시간 최소화, 친절하고 일관된 톤 유지',
        result: '고객 이탈률 25% 감소',
      },
    ],
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'AI 영업 책임자',
    roleEn: 'HEAD OF SALES',
    image: '/AI_rio.webp',
    tagline: '"지구 끝까지 찾아가서 결제받아오겠습니다 (IP 추적으로)"',
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
    licenses: [
      { name: 'BANT 분석 전문가', date: '2026.01' },
      { name: '리드 스코어링 자격', date: '2026.01' },
      { name: '세일즈 자동화 관리사', date: '2026.01' },
    ],
    skills: [
      { name: 'BANT 기반 리드 검증', level: 5 },
      { name: '고객 온도 분류 (Hot/Warm/Cold)', level: 5 },
      { name: '고객별 맞춤 응대', level: 5 },
      { name: 'CRM 자동 정리', level: 4 },
      { name: '팔로업 타이밍 최적화', level: 4 },
    ],
    introduction: '진짜 고객과 아닌 고객을 BANT로 걸러내고, 우선순위에 맞게 응대합니다',
    experiences: [
      {
        period: '',
        company: 'BANT 기반 리드 검증',
        industry: 'saas',
        description: '예산(Budget), 결정권(Authority), 필요(Need), 시기(Timeline)를 자동 파악하여 진짜 고객 선별',
        result: '영업 효율 3배 향상',
      },
      {
        period: '',
        company: '고객 온도별 우선순위 관리',
        industry: 'startup',
        description: 'Hot 리드는 즉시 미팅 제안, Warm은 너처링, Cold는 장기 관리로 자동 분류',
        result: '기회 손실 최소화',
      },
      {
        period: '',
        company: '고객별 맞춤형 팔로업',
        industry: 'agency',
        description: '고객 상황에 맞는 메시지로 개인화된 팔로업 자동 발송',
        result: '전환율 2배 증가',
      },
    ],
  },
  {
    id: 'ara',
    name: 'Ara',
    role: 'AI 수석보좌관',
    roleEn: 'CHIEF OF STAFF',
    image: '/AI_ara.webp',
    tagline: '"대표님, 오늘 일정 제가 다 챙겨뒀어요"',
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
    licenses: [
      { name: '업무 프로세스 자동화 전문가', date: '2026.01' },
      { name: '워크플로우 설계 자격', date: '2026.01' },
      { name: '데이터 연동 관리사', date: '2026.01' },
    ],
    skills: [
      { name: '문서/서류 작성 자동화', level: 5 },
      { name: '반복 데이터 처리', level: 5 },
      { name: '보고서 자동 생성', level: 5 },
      { name: '일정 조율 및 관리', level: 4 },
      { name: '툴 간 데이터 연동', level: 4 },
    ],
    introduction: '매일 반복되는 불필요한 업무를 자동화하여 진짜 중요한 일에 집중하게 해드립니다',
    experiences: [
      {
        period: '',
        company: '문서/서류 작업 자동화',
        industry: 'agency',
        description: '데이터 입력 → 서류 작성 → 보고서 생성까지 수작업 없이 원스톱 처리',
        result: '건당 1시간 → 5분',
      },
      {
        period: '',
        company: '반복 데이터 처리 자동화',
        industry: 'ecommerce',
        description: '여러 시스템에 흩어진 데이터를 자동 수집, 정리, 입력하여 처리',
        result: '입력 오류 0%, 시간 90% 절감',
      },
      {
        period: '',
        company: '일정 조율 및 보고서 자동화',
        industry: 'startup',
        description: '미팅 일정 자동 조율, 정기 보고서 자동 생성 및 관계자 발송',
        result: '반복 업무 완전 자동화',
      },
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
        <h2 ref={titleRef} className="text-center mb-3 sm:mb-4 opacity-0">
          <span className="text-xl sm:text-2xl md:text-3xl text-[var(--text-sub)]">반복 업무에 지치셨나요?</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-5xl font-bold mt-1 sm:mt-2 block">
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

        <p className="text-center text-[var(--text-sub)] text-[13px] sm:text-sm md:text-base mb-8 sm:mb-12 md:mb-16">
          도입 전후를 비교해보세요
        </p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {challenges.map((item) => (
            <div
              key={item.id}
              className="challenge-card card !p-4 sm:!p-5 md:!p-6 overflow-hidden opacity-0"
            >
              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[var(--accent-warm)] flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.aiName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[var(--primary)] font-semibold">with {item.aiName}</p>
                </div>
                <div className="ml-auto bg-[var(--primary)] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <span className="text-sm sm:text-base font-bold">{item.improvement}</span>
                  <span className="text-[11px] sm:text-sm ml-1">{item.improvementLabel}</span>
                </div>
              </div>

              {/* Visual Comparison Graph */}
              <div className="space-y-3 sm:space-y-4">
                {/* Before Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-sub)] uppercase tracking-wider">Before</span>
                    <span className="text-[13px] sm:text-sm font-bold text-[var(--text-main)]">{item.beforeLabel}</span>
                  </div>
                  <div className="h-6 sm:h-8 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="comparison-bar before-bar h-full bg-gray-400 rounded-full flex items-center justify-end pr-2 sm:pr-3"
                      style={{ width: `${item.beforeValue}%` }}
                    >
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mt-1">{item.problemDesc}</p>
                </div>

                {/* After Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">After</span>
                    <span className="text-[13px] sm:text-sm font-bold text-[var(--primary)]">{item.afterLabel}</span>
                  </div>
                  <div className="h-6 sm:h-8 bg-[#FFF0E8] rounded-full overflow-hidden relative">
                    <div
                      className="comparison-bar after-bar h-full bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] rounded-full flex items-center justify-end pr-2 sm:pr-3"
                      style={{ width: `${item.afterValue}%` }}
                    >
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mt-1">{item.solutionDesc}</p>
                </div>
              </div>

              {/* Detail Button */}
              <button
                onClick={() => openModal(item.aiName)}
                className="block w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-[var(--foreground)] text-white text-center text-[13px] sm:text-base font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                {item.aiName} 자세히 보기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Resume-Style Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Resume Header */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4 bg-[#F8F9FA] border-b border-gray-200">
              <div className="flex items-start gap-3 sm:gap-5">
                {/* Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[var(--accent-warm)] flex-shrink-0 shadow-md">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 pt-0.5 sm:pt-1">
                  <p className="text-xs sm:text-sm text-[var(--text-sub)] italic mb-0.5 sm:mb-1 line-clamp-2">
                    {selectedMember.tagline}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">
                    <span className="text-[var(--secondary)]">AI</span>{' '}
                    {selectedMember.name} ({selectedMember.name.toUpperCase()})
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#2D2D2D] text-white text-[10px] sm:text-xs font-semibold rounded">
                      {selectedMember.role} ({selectedMember.roleEn})
                    </span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 border border-[var(--secondary)] text-[var(--secondary)] text-[10px] sm:text-xs font-semibold rounded flex items-center gap-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--secondary)] rounded-full"></span>
                      AI AGENT v2.1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Body - 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Left Column */}
              <div className="md:col-span-2 p-4 sm:p-6 md:border-r border-gray-100">
                {/* Licenses */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    자격/면허
                    <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">LICENSE</span>
                  </h4>
                  <div className="border-t border-gray-200 pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                    {selectedMember.licenses.map((license, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-[var(--text-main)]">{license.name}</span>
                        <span className="text-[var(--text-sub)] text-[10px] sm:text-xs">{license.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    보유기술
                    <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">SKILLS</span>
                  </h4>
                  <div className="border-t border-gray-200 pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                    {selectedMember.skills.map((skill, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-[var(--text-main)]">{skill.name}</span>
                        <span className="text-[var(--primary)] tracking-tight text-xs sm:text-sm">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < skill.level ? '' : 'opacity-25'}>
                              ★
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Introduction */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-current rounded-full flex items-center justify-center text-[10px] sm:text-xs">i</span>
                    INTRODUCTION
                  </h4>
                  <div className="border-t border-gray-200 pt-2 sm:pt-3">
                    <p className="text-xs sm:text-sm text-[var(--text-sub)] leading-relaxed">
                      {selectedMember.introduction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Use Cases */}
              <div className="md:col-span-3 p-4 sm:p-6 bg-white border-t md:border-t-0 border-gray-100">
                <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  활용 시나리오
                  <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">USE CASES</span>
                </h4>

                {/* Use Cases Header */}
                <div className="border-t border-gray-200 pt-2 sm:pt-3">
                  <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] sm:text-xs font-semibold text-[var(--text-sub)] uppercase tracking-wider mb-2 sm:mb-3">
                    <div className="col-span-3">상황</div>
                    <div className="col-span-9">시나리오 & 기대효과</div>
                  </div>

                  {/* Use Case Items */}
                  <div className="space-y-4 sm:space-y-5">
                    {selectedMember.experiences.map((exp, idx) => {
                      const industryColors: Record<string, string> = {
                        saas: '#3B82F6',
                        ecommerce: '#F59E0B',
                        agency: '#8B5CF6',
                        coach: '#EC4899',
                        logistics: '#F97316',
                        hr: '#06B6D4',
                        education: '#10B981',
                        subscription: '#6366F1',
                        startup: '#EF4444',
                      };
                      const industryNames: Record<string, string> = {
                        saas: 'SaaS',
                        ecommerce: '이커머스',
                        agency: '에이전시',
                        coach: '코칭/컨설팅',
                        logistics: '물류',
                        hr: 'HR',
                        education: '교육',
                        subscription: '구독서비스',
                        startup: '스타트업',
                      };
                      const dotColor = industryColors[exp.industry] || '#6B7280';
                      const industryName = industryNames[exp.industry] || exp.industry;

                      return (
                        <div key={idx} className="flex flex-col sm:grid sm:grid-cols-12 gap-1 sm:gap-2">
                          {/* Industry/Situation */}
                          <div className="sm:col-span-3 text-xs text-[var(--text-sub)]">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-white text-[10px] font-medium"
                              style={{ backgroundColor: dotColor }}
                            >
                              {industryName}
                            </span>
                          </div>
                          {/* Details */}
                          <div className="sm:col-span-9">
                            <h5 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
                              {exp.company}
                            </h5>
                            <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mb-1.5 sm:mb-2 leading-relaxed">
                              {exp.description}
                            </p>
                            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[var(--secondary)] text-white text-[10px] sm:text-xs font-bold rounded">
                              기대효과 {exp.result}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-100">
              <a
                href="#contact"
                className="block w-full py-3 sm:py-4 bg-[var(--primary)] text-white text-center text-sm sm:text-base font-bold rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
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
