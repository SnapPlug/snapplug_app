'use client';

import Image from 'next/image';
import { scenarios } from '@/data/scenarios';
import { aiTeamInfo } from '@/data/team';
import { CHANNEL_WORKFLOW_ID } from '@/constants/navigation';

export default function Scenarios() {
  return (
    <section id="scenarios" className="section" aria-labelledby="scenarios-title">
      <div className="container">
        <h2 id="scenarios-title" className="section-title">매출 2배, 비용 40% 절감, 월 54시간 확보</h2>
        <p className="text-center text-[var(--text-sub)] text-[13px] sm:text-sm md:text-base mb-2 sm:mb-3 max-w-2xl mx-auto">
          AI 팀원 도입 후 실제 달라진 결과입니다
        </p>
        <p className="text-center text-[10px] sm:text-[11px] text-[var(--text-sub)] opacity-70 mb-6 sm:mb-8 md:mb-10">
          * SnapPlug 고객 데이터 기반 (2024-2025)
        </p>

        {/* Grid Layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto"
          role="list"
          aria-label="도입 사례 목록"
        >
          {scenarios.map((scenario) => (
            <article
              key={scenario.id}
              className="card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              role="listitem"
            >
              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl" aria-hidden="true">{scenario.icon}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">{scenario.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[var(--text-sub)]">{scenario.subtitle}</p>
                </div>
              </div>

              {/* AI Team Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
                <div className="flex -space-x-2">
                  {scenario.aiTeam.map((member) => (
                    <div
                      key={member}
                      className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                    >
                      <Image
                        src={aiTeamInfo[member].image}
                        alt={aiTeamInfo[member].name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[11px] sm:text-sm text-[var(--primary)] font-medium">
                  with {scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(' + ')}
                </span>
              </div>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-bold">{scenario.highlight.number}</span>
                  <span className="text-base sm:text-lg font-bold">{scenario.highlight.unit}</span>
                  <span className="text-[11px] sm:text-sm opacity-90">{scenario.highlight.suffix}</span>
                </div>
              </div>

              {/* Pain Point */}
              <div className="mb-3 sm:mb-4">
                <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mb-1">
                  <span aria-hidden="true">😩</span> 도입 전
                </p>
                <p className="text-[13px] sm:text-sm text-[var(--text-main)]">{scenario.painPoint}</p>
              </div>

              {/* Solutions */}
              <div>
                <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mb-1.5 sm:mb-2">
                  <span aria-hidden="true">✨</span> 솔루션
                </p>
                <ul className="space-y-1 sm:space-y-1.5">
                  {scenario.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] sm:text-sm">
                      <span className="text-[var(--primary)] mt-0.5" aria-hidden="true">•</span>
                      <span className="text-[var(--text-main)]">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Quote (GEO: Expert/Customer testimonial) */}
              {scenario.quote && (
                <blockquote className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <p className="text-[12px] sm:text-[13px] text-[var(--text-sub)] italic leading-relaxed">
                    &ldquo;{scenario.quote}&rdquo;
                  </p>
                  {scenario.quoteName && (
                    <cite className="block text-[11px] sm:text-xs text-[var(--primary)] font-medium mt-1 not-italic">
                      — {scenario.quoteName}
                    </cite>
                  )}
                </blockquote>
              )}
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-[var(--text-sub)] text-[13px] sm:text-sm md:text-base mb-3 sm:mb-4">
            우리 업종에도 적용 가능한지 궁금하신가요?
          </p>
          <button
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--foreground)] text-white text-[13px] sm:text-base font-semibold rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            onClick={() => window.openChannelIOWorkflow?.(CHANNEL_WORKFLOW_ID)}
          >
            문의하기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
