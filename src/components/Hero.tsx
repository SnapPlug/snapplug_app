'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aiTeamMembers = [
  { name: 'Ara', role: '수석보좌관', desc: '일정 · 이메일', image: '/AI_ara.webp', delay: 0 },
  { name: 'Rio', role: '영업 책임자', desc: '리드 · 세일즈', image: '/AI_rio.webp', delay: 0.5 },
  { name: 'Luna', role: '마케팅 책임자', desc: '콘텐츠 · 발행', image: '/AI_luna.webp', delay: 1 },
  { name: 'Sera', role: '고객응대 책임자', desc: '24시간 CS', image: '/AI_sera.webp', delay: 1.5 },
];

// Random underline SVG paths (hand-drawn style)
const underlinePaths = [
  "M0,8 Q30,2 60,8 T120,8 T180,8",
  "M0,5 C20,12 40,0 60,8 S100,2 120,8 S160,12 180,5",
  "M0,8 Q45,0 90,8 T180,8",
  "M0,6 C30,14 60,0 90,8 C120,16 150,2 180,6",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      // Title - bounce up
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Subtitle - slide up
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // Draw underline animation
      if (underlineRef.current) {
        const pathLength = underlineRef.current.getTotalLength();
        gsap.set(underlineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        tl.to(
          underlineRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Team cards - bounce in with stagger
      const cards = teamGridRef.current?.querySelectorAll('.team-card');
      if (cards) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            scale: 0.5,
            rotation: -10
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'back.out(2)',
          },
          '-=0.3'
        );

        // Add continuous floating animation to each card
        cards.forEach((card, index) => {
          gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });
        });
      }

      // CTA - pop in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.4'
      );

      // CTA pulse animation
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Scroll parallax
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
        y: -50,
        opacity: 0.3,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Select a random underline path
  const randomPath = underlinePaths[Math.floor(Math.random() * underlinePaths.length)];

  return (
    <section
      ref={sectionRef}
      className="hero-ponpon px-6 md:px-12 py-20"
    >
      {/* Title */}
      <h1
        ref={titleRef}
        className="hero-title-ponpon text-5xl md:text-7xl lg:text-8xl text-center mb-4 opacity-0"
      >
        BUSINESS & BEYOND
      </h1>

      <p
        ref={subtitleRef}
        className="text-lg md:text-2xl text-center text-[var(--text-sub)] mb-12 md:mb-16 opacity-0"
      >
        당신의 첫 번째{' '}
        <span className="relative inline-block">
          <span className="text-[var(--primary)] font-bold">AI 팀원</span>
          <svg
            className="absolute -bottom-2 left-0 w-full h-4 overflow-visible"
            viewBox="0 0 180 16"
            preserveAspectRatio="none"
          >
            <path
              ref={underlineRef}
              d={randomPath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        을 만나보세요
      </p>

      {/* Team Grid */}
      <div
        ref={teamGridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16"
      >
        {aiTeamMembers.map((member) => (
          <div
            key={member.name}
            className="team-card team-card-ponpon text-center opacity-0"
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden bg-[var(--accent-warm)]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 112px"
              />
            </div>
            <h3 className="font-bold text-lg md:text-xl mb-1">{member.name}</h3>
            <p className="text-sm text-[var(--secondary)] font-medium mb-1">
              AI {member.role}
            </p>
            <p className="text-xs text-[var(--text-sub)]">{member.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a
        ref={ctaRef}
        href="#ai-team"
        className="cta-ponpon opacity-0"
      >
        AI 팀원 만나기
      </a>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-[var(--secondary)] opacity-60 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-[var(--primary)] opacity-40 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-[var(--secondary)] opacity-50 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-10 w-5 h-5 rounded-full bg-[var(--accent-warm)] opacity-70 animate-float" style={{ animationDelay: '1.5s' }} />
    </section>
  );
}
