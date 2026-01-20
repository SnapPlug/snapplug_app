'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    emoji: '😩',
    text: '"콘텐츠 하나 쓰면 4개 채널에 다시 올려야 하는데... 시간이 없어요"',
  },
  {
    emoji: '😰',
    text: '"고객 문의가 밤에도 오는데 답 안 하면 이탈해요"',
  },
  {
    emoji: '😫',
    text: '"영업 리드 정리하다 하루가 가요"',
  },
  {
    emoji: '😓',
    text: '"서류 작업만 반복하다 정작 중요한 일을 못 해요"',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.problem-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
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

      // Conclusion animation
      gsap.fromTo(
        conclusionRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: conclusionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          대표님, 아직도 직접 하세요?
        </h2>

        <div ref={cardsRef} className="max-w-2xl mx-auto space-y-4 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card card flex items-start gap-4 p-5 opacity-0"
            >
              <span className="text-3xl flex-shrink-0">{problem.emoji}</span>
              <p className="text-base md:text-lg text-[var(--text-main)]">
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        <div ref={conclusionRef} className="text-center opacity-0">
          <p className="text-xl md:text-2xl font-semibold mb-2">
            이 시간, 진짜 중요한 일에 쓰세요.
          </p>
          <p className="text-lg md:text-xl text-[var(--primary)] font-bold">
            AI 팀원이 대신합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
