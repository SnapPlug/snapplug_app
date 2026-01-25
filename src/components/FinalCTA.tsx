'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const aiTeamMembers = [
  { name: 'Ara', role: '수석보좌관', image: '/AI_ara.webp' },
  { name: 'Rio', role: '영업 책임자', image: '/AI_rio.webp' },
  { name: 'Luna', role: '마케팅 책임자', image: '/AI_luna.webp' },
  { name: 'Sera', role: '고객응대 책임자', image: '/AI_sera.webp' },
  { name: 'Alex', role: '데이터 분석가', image: '/AI_alex.webp' },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use IntersectionObserver for visibility-based CSS animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
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
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          반복 업무에서 해방될 준비 되셨나요?
        </h2>

        {/* AI Team Members */}
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {aiTeamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`text-center transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-90'
              }`}
              style={{
                transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms',
                animation: isVisible ? `float ${2 + index * 0.3}s ease-in-out infinite ${index * 0.15}s` : 'none'
              }}
            >
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

        <div
          className={`transition-all duration-700 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
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
          className={`inline-block bg-white text-[var(--primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all shadow-lg cursor-pointer ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            transitionDelay: isVisible ? '700ms' : '0ms',
            transitionDuration: '500ms',
            animation: isVisible ? 'pulse-scale 2s ease-in-out infinite 1.5s' : 'none'
          }}
          onClick={() => window.ChannelIO?.('openWorkflow', 803868)}
        >
          문의하기
        </button>

        <p
          className={`mt-3 sm:mt-4 text-[11px] sm:text-sm opacity-80 transition-all duration-500 delay-700 ${
            isVisible ? 'opacity-80' : 'opacity-0'
          }`}
        >
          컨설팅 후 구매 의무 없습니다. 부담 없이 신청하세요.
        </p>
      </div>
    </section>
  );
}
