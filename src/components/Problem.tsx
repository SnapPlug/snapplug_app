'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Random underline SVG path (hand-drawn style)
const underlinePath = "M0,8 Q30,2 60,8 T120,8 T180,8";

const challenges = [
  {
    id: 'content',
    title: '콘텐츠 작성',
    icon: '✍️',
    problem: '주 5시간 소요',
    problemDesc: '채널마다 다시 쓰고, 톤 맞추고...',
    solution: '주 30분',
    solutionDesc: '1개 작성 → 4개 채널 자동 변환',
    improvement: '90%',
    improvementLabel: '시간 절감',
  },
  {
    id: 'cs',
    title: '고객 응대',
    icon: '💬',
    problem: '놓치는 문의 多',
    problemDesc: '밤/주말엔 답변 불가, 고객 이탈',
    solution: '24시간 자동',
    solutionDesc: '즉시 응대, 복잡한 건만 연결',
    improvement: '100%',
    improvementLabel: '응대율',
  },
  {
    id: 'lead',
    title: '리드 관리',
    icon: '📊',
    problem: '수동 정리',
    problemDesc: '누락 잦고, 팔로업 타이밍 놓침',
    solution: '자동 분류',
    solutionDesc: 'Hot/Warm/Cold 자동 분류 & 알림',
    improvement: '2배',
    improvementLabel: '전환율',
  },
  {
    id: 'admin',
    title: '반복 업무',
    icon: '📋',
    problem: '하루 2시간+',
    problemDesc: '일정 조율, 보고서, 이메일...',
    solution: '자동화',
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
  const ctaRef = useRef<HTMLDivElement>(null);

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

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
              className="challenge-card card p-0 overflow-hidden opacity-0"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-5 border-b border-[var(--border)]">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>

              {/* Content */}
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="p-5 bg-gray-50 border-r border-[var(--border)]">
                  <p className="text-xs font-semibold text-[var(--text-sub)] mb-2 uppercase tracking-wider">Before</p>
                  <p className="text-lg font-bold text-[var(--text-main)] mb-1">{item.problem}</p>
                  <p className="text-sm text-[var(--text-sub)]">{item.problemDesc}</p>
                </div>

                {/* After */}
                <div className="p-5 bg-[#FFF8F5]">
                  <p className="text-xs font-semibold text-[var(--primary)] mb-2 uppercase tracking-wider">After</p>
                  <p className="text-lg font-bold text-[var(--text-main)] mb-1">{item.solution}</p>
                  <p className="text-sm text-[var(--text-sub)]">{item.solutionDesc}</p>
                </div>
              </div>

              {/* Improvement Badge */}
              <div className="p-4 bg-[var(--primary)] text-white flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">{item.improvement}</span>
                <span className="text-sm">{item.improvementLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-12 opacity-0">
          <p className="text-xl md:text-2xl font-semibold mb-4">
            더 이상 시간 낭비하지 마세요
          </p>
          <a href="#contact" className="btn-primary">
            무료 진단 받기
          </a>
        </div>
      </div>
    </section>
  );
}
