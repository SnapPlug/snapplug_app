'use client';

import { useEffect, useRef } from 'react';
import { processSteps } from '@/data/process';
import { CHANNEL_WORKFLOW_ID } from '@/constants/navigation';

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Lazy load GSAP only when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            Promise.all([
              import('gsap'),
              import('gsap/ScrollTrigger')
            ]).then(([gsapModule, scrollTriggerModule]) => {
              const gsap = gsapModule.gsap;
              const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
              gsap.registerPlugin(ScrollTrigger);

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
              }, section);

              cleanup = () => ctx.revert();
            });
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section" aria-labelledby="process-title">
      <div className="container">
        <h2 ref={titleRef} id="process-title" className="section-title opacity-0">
          AI 팀원, 이렇게 합류합니다
        </h2>

        {/* Timeline - Desktop */}
        <nav ref={timelineRef} className="hidden md:block max-w-4xl mx-auto mb-12" aria-label="채용 프로세스 단계">
          <div className="flex justify-between items-center mb-8 relative">
            {/* Connecting Line */}
            <div className="timeline-line absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)] origin-left" aria-hidden="true" />

            {processSteps.map((step, idx) => (
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
        </nav>

        {/* Step Details */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
          role="list"
          aria-label="채용 프로세스 상세"
        >
          {processSteps.map((step, idx) => (
            <article
              key={idx}
              className={`process-card card opacity-0 ${
                step.isHighlighted
                  ? 'border-2 border-[var(--primary)] bg-gradient-to-br from-orange-50 to-white relative'
                  : ''
              }`}
              role="listitem"
            >
              {/* 핵심 뱃지 */}
              {step.isHighlighted && (
                <span className="absolute -top-3 left-4 bg-[var(--primary)] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  핵심 단계
                </span>
              )}

              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:hidden">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                  step.isHighlighted ? 'bg-[var(--primary)] text-white ring-4 ring-orange-200' : 'bg-[var(--primary)] text-white'
                }`}>
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">{step.title}</h3>
                  {step.duration && (
                    <p className="text-[11px] sm:text-sm text-[var(--text-sub)]">({step.duration})</p>
                  )}
                </div>
              </div>

              <h3 className={`hidden md:block font-bold mb-1 ${step.isHighlighted ? 'text-[var(--primary)]' : ''}`}>
                {step.number}. {step.title} {step.duration && `(${step.duration})`}
              </h3>

              <ul className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-[13px] sm:text-sm text-[var(--text-sub)]">
                    <span className={step.isHighlighted ? 'text-[var(--primary)]' : ''} aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* 서브텍스트 */}
              {step.subtext && (
                <p className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 text-[11px] sm:text-xs text-[var(--primary)] font-semibold text-center">
                  <span aria-hidden="true">✨</span> {step.subtext}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-8 sm:mt-10 opacity-0">
          <button
            className="btn-primary focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            onClick={() => window.openChannelIOWorkflow?.(CHANNEL_WORKFLOW_ID)}
          >
            문의하기
          </button>
        </div>
      </div>
    </section>
  );
}
