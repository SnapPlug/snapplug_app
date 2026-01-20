'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aiTeamMembers = [
  { name: 'Ara', role: 'AI 수석보좌관', desc: '일정관리, 이메일 답장', image: '/AI_ara.webp' },
  { name: 'Rio', role: 'AI 영업 책임자', desc: '고객 DB 관리, 세일즈 최적화', image: '/AI_rio.webp' },
  { name: 'Luna', role: 'AI 마케팅 책임자', desc: '콘텐츠 초안 작성, 자동발행', image: '/AI_luna.webp' },
  { name: 'Sera', role: 'AI 고객응대 책임자', desc: '24시간 고객 문의 자동 응대', image: '/AI_sera.webp' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subLogoRef = useRef<HTMLParagraphElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Timeline with dramatic effects
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Logo - 3D Flip from Y axis
      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          rotationY: 180,
          scale: 0.5,
          z: -500
        },
        {
          opacity: 1,
          rotationY: 0,
          scale: 1,
          z: 0,
          duration: 1.2,
          ease: 'power4.out'
        }
      );

      // Sub logo - slide in with rotation
      tl.fromTo(
        subLogoRef.current,
        {
          opacity: 0,
          rotationX: -90,
          y: -50
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        },
        '-=0.6'
      );

      // Main slogan - dramatic 3D rotation from below
      tl.fromTo(
        sloganRef.current,
        {
          opacity: 0,
          rotationX: -90,
          y: 100,
          scale: 0.8,
          transformOrigin: 'center bottom'
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)'
        },
        '-=0.4'
      );

      // Greeting - fade with subtle 3D
      tl.fromTo(
        greetingRef.current,
        {
          opacity: 0,
          y: 30,
          rotationX: -20
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.3'
      );

      // Team cards - 3D spin entrance with stagger
      const cards = teamCardsRef.current?.querySelectorAll('.team-card');
      if (cards) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            rotationY: -180,
            scale: 0,
            z: -200
          },
          {
            opacity: 1,
            rotationY: 0,
            scale: 1,
            z: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(2)',
          },
          '-=0.2'
        );
      }

      // CTA button - elastic pop from below
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          rotationX: 90,
          y: 50,
          z: -100,
          scale: 0.5
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          z: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.3'
      );

      // Continuous 3D floating animation for team cards
      if (cards) {
        cards.forEach((card, index) => {
          // Create a floating timeline for each card
          const floatTl = gsap.timeline({ repeat: -1, yoyo: true });

          floatTl.to(card, {
            y: -10,
            rotationY: 5,
            rotationX: -3,
            duration: 2 + index * 0.3,
            ease: 'sine.inOut',
          });

          // Add slight delay based on index
          floatTl.delay(index * 0.2);
        });
      }

      // CTA pulse with subtle 3D
      gsap.to(ctaRef.current, {
        scale: 1.05,
        rotationX: -5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Scroll-triggered parallax with 3D
      gsap.to(logoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        rotationX: 30,
        opacity: 0,
      });

      gsap.to(sloganRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        rotationX: 20,
        opacity: 0.3,
      });

      // Cards 3D parallax on scroll
      if (cards) {
        cards.forEach((card, index) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: '50% top',
              end: 'bottom top',
              scrub: 1,
            },
            y: -30 - index * 10,
            rotationY: index % 2 === 0 ? 15 : -15,
            opacity: 0.5,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-3d-container min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden"
    >
      <div className="text-center max-w-4xl mx-auto hero-3d-element">
        {/* Logo */}
        <h1
          ref={logoRef}
          className="hero-3d-element text-4xl md:text-5xl font-bold mb-2 tracking-tight opacity-0"
        >
          SNAPPLUG
        </h1>
        <p
          ref={subLogoRef}
          className="hero-3d-element text-lg text-[var(--text-sub)] mb-8 opacity-0"
        >
          Business & Beyond
        </p>

        {/* Main Slogan */}
        <h2
          ref={sloganRef}
          className="hero-3d-element text-3xl md:text-5xl font-bold mb-8 leading-tight opacity-0"
        >
          &ldquo;당신의 첫 번째 AI 팀원&rdquo;
        </h2>

        {/* Greeting */}
        <div ref={greetingRef} className="hero-3d-element mb-12 opacity-0">
          <p className="text-xl md:text-2xl mb-2">반갑습니다!</p>
          <p className="text-lg md:text-xl text-[var(--text-sub)]">
            저희가 대표님의 팀이 되어드릴게요.
          </p>
        </div>

        {/* AI Team Members */}
        <div
          ref={teamCardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          style={{ perspective: '1000px' }}
        >
          {aiTeamMembers.map((member) => (
            <div
              key={member.name}
              className="team-card team-card-3d card text-center p-6 cursor-pointer opacity-0"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden bg-[var(--background)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-sm text-[var(--text-sub)] mb-2">{member.role}</p>
              <p className="text-xs text-[var(--text-sub)]">{member.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#ai-team"
          className="hero-3d-element btn-primary text-lg opacity-0 inline-block"
        >
          AI 팀원 만나기
        </a>
      </div>
    </section>
  );
}
