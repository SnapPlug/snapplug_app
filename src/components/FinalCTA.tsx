'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aiTeamMembers = [
  { name: 'Ara', role: '수석보좌관', image: '/AI_ara.webp' },
  { name: 'Rio', role: '영업 책임자', image: '/AI_rio.webp' },
  { name: 'Luna', role: '마케팅 책임자', image: '/AI_luna.webp' },
  { name: 'Sera', role: '고객응대 책임자', image: '/AI_sera.webp' },
  { name: 'Alex', role: '데이터 분석가', image: '/AI_alex.webp' },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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

      // Team members animation
      const members = teamRef.current?.querySelectorAll('.team-member');
      if (members) {
        gsap.fromTo(
          members,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 85%',
            },
          }
        );

        // Floating animation
        members.forEach((member, index) => {
          gsap.to(member, {
            y: -5,
            duration: 1.5 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15,
          });
        });
      }

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
          },
        }
      );

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          },
        }
      );

      // CTA pulse animation
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      style={{
        background: 'linear-gradient(135deg, #FF7F50 0%, #FF9966 50%, #FFB088 100%)',
      }}
    >
      <div className="container text-center text-white">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 opacity-0">
          반복 업무에서 해방될 준비 되셨나요?
        </h2>

        {/* AI Team Members */}
        <div ref={teamRef} className="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {aiTeamMembers.map((member) => (
            <div key={member.name} className="team-member text-center opacity-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-1.5 sm:mb-2 rounded-full overflow-hidden bg-white bg-opacity-20">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <p className="text-[11px] sm:text-sm font-medium">{member.name}</p>
              <p className="text-[10px] sm:text-xs opacity-80">{member.role}</p>
            </div>
          ))}
        </div>

        <div ref={contentRef} className="opacity-0">
          <p className="text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2">
            저희가 대표님의 팀이 되어드릴게요.
          </p>

          <div className="max-w-md mx-auto mb-6 sm:mb-8">
            <p className="text-base sm:text-lg mb-1">60분 맞춤 컨설팅으로 시작하세요.</p>
            <p className="text-[13px] sm:text-base opacity-90">
              어디에 AI 팀원을 붙이면 좋을지 같이 찾아드립니다.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="inline-block bg-white text-[var(--primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all shadow-lg opacity-0 cursor-pointer"
          onClick={() => window.ChannelIO?.('openWorkflow', 803868)}
        >
          문의하기
        </button>

        <p className="mt-3 sm:mt-4 text-[11px] sm:text-sm opacity-80">
          컨설팅 후 구매 의무 없습니다. 부담 없이 신청하세요.
        </p>
      </div>
    </section>
  );
}
