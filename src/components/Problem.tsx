'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { challenges, getTeamMemberByName } from '@/data/team';
import type { TeamMember } from '@/types';
import TeamMemberModal from './TeamMemberModal';

// Random underline SVG path (hand-drawn style)
const underlinePath = "M0,8 Q30,2 60,8 T120,8 T180,8";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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

            // Lazy load GSAP
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

  const openModal = useCallback((aiName: string) => {
    const member = getTeamMemberByName(aiName);
    if (member) {
      setSelectedMember(member);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="section bg-white"
      aria-labelledby="problem-title"
    >
      <div className="container">
        <h2 ref={titleRef} id="problem-title" className="text-center mb-3 sm:mb-4 opacity-0">
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
                aria-hidden="true"
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
          role="list"
          aria-label="AI 팀원 도입 효과 비교"
        >
          {challenges.map((item) => (
            <article
              key={item.id}
              className="challenge-card card !p-4 sm:!p-5 md:!p-6 overflow-hidden opacity-0"
              role="listitem"
            >
              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[var(--accent-warm)] flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={`${item.aiName} - AI ${item.title} 담당`}
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
                  <div
                    className="h-6 sm:h-8 bg-gray-100 rounded-full overflow-hidden relative"
                    role="progressbar"
                    aria-valuenow={item.beforeValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.title} 도입 전: ${item.beforeLabel}`}
                  >
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
                  <div
                    className="h-6 sm:h-8 bg-[#FFF0E8] rounded-full overflow-hidden relative"
                    role="progressbar"
                    aria-valuenow={item.afterValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.title} 도입 후: ${item.afterLabel}`}
                  >
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
                className="block w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-[var(--foreground)] text-white text-center text-[13px] sm:text-base font-semibold rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                aria-label={`${item.aiName} 상세 정보 보기`}
              >
                {item.aiName} 자세히 보기
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal member={selectedMember} onClose={closeModal} />
    </section>
  );
}
