'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '1',
    title: '무료 진단',
    duration: '30분',
    items: [
      '현재 업무 프로세스 파악',
      '자동화 가능 포인트 발견',
      'ROI 예상치 공유',
    ],
  },
  {
    number: '2',
    title: '맞춤 설계',
    duration: '1주',
    items: [
      '회사에 맞는 AI 팀원 구성 제안',
      '연동할 툴 확인 (채널톡, 슬랙 등)',
      '견적 및 일정 확정',
    ],
  },
  {
    number: '3',
    title: '구축 & 테스트',
    duration: '1~2주',
    items: [
      '회사 데이터로 AI 학습',
      '실제 환경에서 테스트',
      '피드백 반영 및 조정',
    ],
  },
  {
    number: '4',
    title: '런칭 & 모니터링',
    duration: '',
    items: [
      'AI 팀원 정식 투입',
      '초기 2주 집중 모니터링',
      '필요시 추가 조정',
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
                <div className="timeline-circle w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg mb-2 opacity-0">
                  {step.number}
                </div>
                <p className="font-semibold text-center">{step.title}</p>
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
            <div key={idx} className="process-card card opacity-0">
              <div className="flex items-center gap-3 mb-4 md:hidden">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  {step.duration && (
                    <p className="text-sm text-[var(--text-sub)]">({step.duration})</p>
                  )}
                </div>
              </div>

              <h3 className="hidden md:block font-bold mb-1">
                {step.number}️⃣ {step.title} {step.duration && `(${step.duration})`}
              </h3>

              <ul className="space-y-2 mt-3">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-sm text-[var(--text-sub)]">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-10 opacity-0">
          <a href="#contact" className="btn-primary">
            무료 진단 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
