'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  title: string;
  duration: string;
  items: string[];
  isHighlighted?: boolean;
  subtext?: string;
}

const steps: Step[] = [
  {
    number: '1',
    title: '맞춤 컨설팅',
    duration: '60분',
    subtext: '무료로 진행됩니다',
    items: [
      '현재 업무 프로세스 심층 분석',
      '자동화 가능 포인트 발견',
      '예상 ROI 및 도입 방향 제안',
    ],
  },
  {
    number: '2',
    title: '서비스 기획 & 설계',
    duration: '1~2주',
    isHighlighted: true,
    subtext: '성공의 80%가 여기서 결정됩니다',
    items: [
      '비즈니스 요구사항 정의',
      '최적의 AI 솔루션 아키텍처 설계',
      '연동 시스템 및 워크플로우 설계',
    ],
  },
  {
    number: '3',
    title: '개발 & 품질 검증',
    duration: '2~3주',
    subtext: '완벽하게 작동할 때까지',
    items: [
      'AI 솔루션 개발 및 학습',
      '내부 테스트 (기능/성능)',
      '외부 테스트 (실사용 환경)',
    ],
  },
  {
    number: '4',
    title: '런칭 & 안정화',
    duration: '',
    subtext: '안심하고 맡기세요',
    items: [
      'AI 팀원 정식 투입',
      '초기 2주 집중 모니터링',
      '지속적인 성능 개선',
    ],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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

      // Timeline circles animation
      const circles = timelineRef.current?.querySelectorAll('.timeline-circle');
      if (circles) {
        gsap.fromTo(
          circles,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Timeline line animation
      const line = timelineRef.current?.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.process-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
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
    <section ref={sectionRef} className="section">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          AI 팀원, 이렇게 합류합니다
        </h2>

        {/* Timeline - Desktop */}
        <div ref={timelineRef} className="hidden md:block max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-8 relative">
            {/* Connecting Line */}
            <div className="timeline-line absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)] origin-left" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className={`timeline-circle w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg mb-2 opacity-0 ${
                  step.isHighlighted ? 'ring-4 ring-orange-200 scale-110' : ''
                }`}>
                  {step.number}
                </div>
                <p className={`font-semibold text-center ${step.isHighlighted ? 'text-[var(--primary)]' : ''}`}>{step.title}</p>
                {step.duration && (
                  <p className="text-sm text-[var(--text-sub)]">({step.duration})</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Details */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`process-card card opacity-0 ${
                step.isHighlighted
                  ? 'border-2 border-[var(--primary)] bg-gradient-to-br from-orange-50 to-white relative'
                  : ''
              }`}
            >
              {/* 핵심 뱃지 */}
              {step.isHighlighted && (
                <span className="absolute -top-3 left-4 bg-[var(--primary)] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  핵심 단계
                </span>
              )}

              <div className="flex items-center gap-3 mb-4 md:hidden">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step.isHighlighted ? 'bg-[var(--primary)] text-white ring-4 ring-orange-200' : 'bg-[var(--primary)] text-white'
                }`}>
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  {step.duration && (
                    <p className="text-sm text-[var(--text-sub)]">({step.duration})</p>
                  )}
                </div>
              </div>

              <h3 className={`hidden md:block font-bold mb-1 ${step.isHighlighted ? 'text-[var(--primary)]' : ''}`}>
                {step.number}️. {step.title} {step.duration && `(${step.duration})`}
              </h3>

              <ul className="space-y-2 mt-3">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-sm text-[var(--text-sub)]">
                    <span className={step.isHighlighted ? 'text-[var(--primary)]' : ''}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* 서브텍스트 */}
              {step.subtext && (
                <p className="mt-3 pt-3 border-t border-gray-100 text-xs text-[var(--primary)] font-semibold text-center">
                  ✨ {step.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-10 opacity-0">
          <a href="#contact" className="btn-primary">
            맞춤 컨설팅 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
