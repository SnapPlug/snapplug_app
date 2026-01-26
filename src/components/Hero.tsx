'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroTeamMembers } from '@/data/team';

// Random underline SVG paths (hand-drawn style)
const underlinePaths = [
  "M0,8 Q30,2 60,8 T120,8 T180,8",
  "M0,5 C20,12 40,0 60,8 S100,2 120,8 S160,12 180,5",
  "M0,8 Q45,0 90,8 T180,8",
  "M0,6 C30,14 60,0 90,8 C120,16 150,2 180,6",
];

export default function Hero() {
  // Use fixed path for SSR, randomize on client to avoid hydration mismatch
  const [randomPath, setRandomPath] = useState(underlinePaths[0]);
  const [svgMounted, setSvgMounted] = useState(false);

  // Scroll to top on initial page load (clear stale #contact hash)
  useEffect(() => {
    if (window.location.hash === '#contact') {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  // Set mounted state only for SVG underline drawing
  useEffect(() => {
    setRandomPath(underlinePaths[Math.floor(Math.random() * underlinePaths.length)]);
    setSvgMounted(true);
  }, []);

  return (
    <section
      id="ai-team"
      className="hero-ponpon px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20"
      aria-labelledby="hero-title"
    >
      {/* Title - Pure CSS animation, runs immediately */}
      <h1
        id="hero-title"
        className="hero-title-ponpon text-[26px] sm:text-4xl md:text-5xl lg:text-6xl text-center mb-3 sm:mb-4 hero-animate-fade-in"
      >
        BUSINESS & BEYOND
      </h1>

      <p className="text-base sm:text-xl md:text-2xl text-center text-[var(--text-sub)] mb-8 sm:mb-12 md:mb-16 hero-animate-fade-in-delay">
        당신의 첫 번째{' '}
        <span className="relative inline-block">
          <span className="text-[var(--primary)] font-bold">AI 팀원</span>
          <svg
            className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-3 sm:h-4 overflow-visible"
            viewBox="0 0 180 16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={randomPath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: svgMounted ? 0 : 200,
                transition: 'stroke-dashoffset 1s ease-out 0.5s',
              }}
            />
          </svg>
        </span>
        을 만나보세요
      </p>

      {/* Team Grid - Pure CSS stagger animation */}
      <h2 className="sr-only">AI 팀원 소개</h2>
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16"
        role="list"
        aria-label="AI 팀원 목록"
      >
        {heroTeamMembers.map((member, index) => (
          <article
            key={member.name}
            className="team-card team-card-ponpon text-center w-[130px] sm:w-[150px] md:w-[180px] hero-animate-bounce-in"
            style={{
              animationDelay: `${0.3 + index * 0.1}s`,
            }}
            role="listitem"
          >
            <div
              className="team-avatar relative w-14 h-14 sm:w-[72px] sm:h-[72px] md:w-24 md:h-24 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full overflow-hidden bg-[var(--accent-warm)] hero-card-float"
              style={{
                animationDelay: `${1 + index * 0.2}s`,
              }}
            >
              <Image
                src={member.image}
                alt={`${member.name} - AI ${member.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 56px, (max-width: 768px) 72px, 96px"
                priority={index < 2}
              />
            </div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">{member.name}</h3>
            <div className="relative inline-block mb-0.5 sm:mb-1">
              <p className="text-[11px] sm:text-xs md:text-sm text-[var(--primary)] font-bold">
                AI {member.role}
              </p>
              <svg
                className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-2 sm:h-3 overflow-visible"
                viewBox="0 0 180 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d={underlinePaths[index % underlinePaths.length]}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 200,
                    strokeDashoffset: svgMounted ? 0 : 200,
                    transition: `stroke-dashoffset 0.8s ease-out ${0.6 + index * 0.15}s`,
                  }}
                />
              </svg>
            </div>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-[var(--text-sub)] leading-tight">{member.desc}</p>
          </article>
        ))}
      </div>

      {/* CTA Button - Pure CSS animation */}
      <a
        href="#problem"
        className="cta-ponpon hero-animate-pop-in hero-cta-pulse"
      >
        AI 팀원 만나기
      </a>

      {/* Decorative Elements - CSS animations only */}
      <div className="absolute top-32 left-[20%] w-4 h-4 rounded-full bg-[var(--secondary)] opacity-60 animate-float" style={{ animationDelay: '0s' }} aria-hidden="true" />
      <div className="absolute top-48 right-[25%] w-6 h-6 rounded-full bg-[var(--primary)] opacity-40 animate-float" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
      <div className="absolute bottom-48 left-[25%] w-3 h-3 rounded-full bg-[var(--secondary)] opacity-50 animate-float" style={{ animationDelay: '1s' }} aria-hidden="true" />
      <div className="absolute bottom-32 right-[20%] w-5 h-5 rounded-full bg-[var(--accent-warm)] opacity-70 animate-float" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
      <div className="absolute top-[30%] left-[15%] w-2 h-2 rounded-full bg-[var(--primary)] opacity-50 animate-float" style={{ animationDelay: '0.3s' }} aria-hidden="true" />
      <div className="absolute top-[25%] right-[18%] w-3 h-3 rounded-full bg-[var(--accent-warm)] opacity-60 animate-float" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
      <div className="absolute bottom-[35%] right-[30%] w-4 h-4 rounded-full bg-[var(--secondary)] opacity-45 animate-float" style={{ animationDelay: '1.2s' }} aria-hidden="true" />
      <div className="absolute top-[60%] left-[30%] w-2 h-2 rounded-full bg-[var(--primary)] opacity-35 animate-float" style={{ animationDelay: '1.8s' }} aria-hidden="true" />
      <div className="absolute bottom-[25%] left-[18%] w-5 h-5 rounded-full bg-[var(--accent-warm)] opacity-50 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
      <div className="absolute top-[45%] right-[15%] w-3 h-3 rounded-full bg-[var(--secondary)] opacity-55 animate-float" style={{ animationDelay: '0.7s' }} aria-hidden="true" />
    </section>
  );
}
