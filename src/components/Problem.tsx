'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { challenges, getTeamMemberByName } from '@/data/team';
import { industryColors, industryNames } from '@/types';
import type { TeamMember } from '@/types';

// Random underline SVG path (hand-drawn style)
const underlinePath = "M0,8 Q30,2 60,8 T120,8 T180,8";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMember && e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  // Focus trap for modal
  useEffect(() => {
    if (selectedMember && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [selectedMember]);

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
                  <div className="h-6 sm:h-8 bg-gray-100 rounded-full overflow-hidden relative" role="progressbar" aria-valuenow={item.beforeValue} aria-valuemin={0} aria-valuemax={100}>
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
                  <div className="h-6 sm:h-8 bg-[#FFF0E8] rounded-full overflow-hidden relative" role="progressbar" aria-valuenow={item.afterValue} aria-valuemin={0} aria-valuemax={100}>
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

      {/* Resume-Style Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="모달 닫기"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
                  <h3 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">
                    <span className="text-[var(--secondary)]">AI</span>{' '}
                    {selectedMember.name} ({selectedMember.name.toUpperCase()})
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#2D2D2D] text-white text-[10px] sm:text-xs font-semibold rounded">
                      {selectedMember.role} ({selectedMember.roleEn})
                    </span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 border border-[var(--secondary)] text-[var(--secondary)] text-[10px] sm:text-xs font-semibold rounded flex items-center gap-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--secondary)] rounded-full" aria-hidden="true"></span>
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
                        <span className="text-[var(--primary)] tracking-tight text-xs sm:text-sm" aria-label={`숙련도 ${skill.level}점`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < skill.level ? '' : 'opacity-25'} aria-hidden="true">
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
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-current rounded-full flex items-center justify-center text-[10px] sm:text-xs" aria-hidden="true">i</span>
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
                className="block w-full py-3 sm:py-4 bg-[var(--primary)] text-white text-center text-sm sm:text-base font-bold rounded-lg hover:bg-[var(--primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
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
