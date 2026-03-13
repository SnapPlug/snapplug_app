'use client';

import dynamic from 'next/dynamic';
import { scenarios } from '@/data/scenarios';
import { CHANNEL_WORKFLOW_ID } from '@/constants/navigation';

const ScenarioCard = dynamic(() => import('./ScenarioCard'));

export default function Scenarios() {
  return (
    <section id="scenarios" className="section" aria-labelledby="scenarios-title">
      <div className="container">
        <h2 id="scenarios-title" className="section-title">이 대표님들은 왜 AI 팀원을 뽑았을까?</h2>
        <p className="text-center text-[var(--text-sub)] text-[13px] sm:text-sm md:text-base mb-2 sm:mb-3 max-w-2xl mx-auto">
          AI 팀원 도입 후 실제 달라진 현장의 이야기
        </p>
        <p className="text-center text-[10px] sm:text-[11px] text-[var(--text-sub)] opacity-70 mb-6 sm:mb-8 md:mb-10">
          * 실제 프로젝트를 바탕으로 재구성하였습니다
        </p>

        {/* Grid Layout */}
        <div
          className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto"
          role="list"
          aria-label="채용 사례 목록"
        >
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
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
