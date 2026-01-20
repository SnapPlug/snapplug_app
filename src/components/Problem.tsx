'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Random underline SVG path (hand-drawn style)
const underlinePath = "M0,8 Q30,2 60,8 T120,8 T180,8";

const challenges = [
  {
    id: 'content',
    title: '콘텐츠 작성',
    avatar: '/AI_luna.webp',
    aiName: 'Luna',
    beforeValue: 100,
    afterValue: 10,
    beforeLabel: '주 5시간',
    afterLabel: '주 30분',
    problemDesc: '채널마다 다시 쓰고, 톤 맞추고...',
    solutionDesc: '1개 작성 → 4개 채널 자동 변환',
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
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}
