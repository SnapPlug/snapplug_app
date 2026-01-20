'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    item: '콘텐츠 작성',
    before: '주 5시간',
    after: '주 30분',
    improvement: '90% 절감',
  },
  {
    item: '고객 응대',
    before: '하루 2시간 (놓치는 문의 多)',
    after: '하루 10분 (24시간 자동)',
    improvement: '응대율 100%',
  },
  {
    item: '리드 관리',
    before: '수동 정리, 누락 잦음',
    after: '자동 분류/알림',
    improvement: '전환율 2배',
  },
  {
    item: '월 비용',
    before: '인건비 300~500만원 (1인)',
    after: 'AI 팀원 20~50만원',
    improvement: '최대 90% 절감',
  },
];

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);

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

      // Table animation (desktop)
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 80%',
          },
        }
      );

      // Table rows animation
      const rows = tableRef.current?.querySelectorAll('tbody tr');
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Mobile cards animation
      const mobileCards = mobileCardsRef.current?.querySelectorAll('.comparison-card');
      if (mobileCards) {
        gsap.fromTo(
          mobileCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mobileCardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          AI 팀원 도입 전 vs 후
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Table */}
          <div ref={tableRef} className="hidden md:block card overflow-hidden p-0 opacity-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="p-4 text-left font-semibold">항목</th>
                  <th className="p-4 text-center font-semibold bg-gray-50 text-[var(--text-sub)]">
                    BEFORE
                  </th>
                  <th className="p-4 text-center font-semibold bg-[#FFF8F5] text-[var(--primary)]">
                    AFTER
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >
                    <td className="p-4 font-medium">{item.item}</td>
                    <td className="p-4 text-center bg-gray-50 text-[var(--text-sub)]">
                      {item.before}
                    </td>
                    <td className="p-4 text-center bg-[#FFF8F5]">
                      <span className="block">{item.after}</span>
                      <span className="text-sm text-[var(--success)] font-semibold">
                        ✨ {item.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div ref={mobileCardsRef} className="md:hidden space-y-4">
            {comparisons.map((item, index) => (
              <div key={index} className="comparison-card card opacity-0">
                <h3 className="font-bold text-lg mb-3">{item.item}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-[var(--text-sub)] mb-1">BEFORE</p>
                    <p className="text-sm">{item.before}</p>
                  </div>
                  <div className="bg-[#FFF8F5] rounded-lg p-3">
                    <p className="text-xs text-[var(--primary)] mb-1">AFTER</p>
                    <p className="text-sm">{item.after}</p>
                    <p className="text-xs text-[var(--success)] font-semibold mt-1">
                      ✨ {item.improvement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
