'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ROICalculator() {
  const [showDetail, setShowDetail] = useState(false);

  // 간단 버전 입력 (직원수, 평균월급만)
  const [employees, setEmployees] = useState(1);
  const [monthlySalary, setMonthlySalary] = useState(300); // 만원

  // 자세한 버전에서만 수정 가능한 값들 (기본값 설정)
  const [taskHoursPerDay, setTaskHoursPerDay] = useState(4); // 업무수행시간 (시간/일)
  const [automationRate, setAutomationRate] = useState(70); // AI 자동화 효과 %
  const [developmentCost, setDevelopmentCost] = useState(300); // AI 개발비 만원 (기본값 300만원)

  // 고정 값
  const workDaysPerMonth = 20;
  const hoursPerDay = 8;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // 계산
  const hourlyRate = Math.round((monthlySalary * 10000) / (workDaysPerMonth * hoursPerDay)); // 시급
  const yearlyWorkDays = workDaysPerMonth * 12;
  const yearlyTaskHours = taskHoursPerDay * yearlyWorkDays * employees;

  // Before (현재)
  const beforeYearlyCost = Math.round((taskHoursPerDay * hourlyRate * yearlyWorkDays * employees) / 10000); // 만원
  const beforeYearlyHours = yearlyTaskHours;

  // After (AI 도입 후)
  const savedRate = automationRate / 100;
  const afterYearlyCost = Math.round(beforeYearlyCost * (1 - savedRate));
  const afterYearlyHours = Math.round(beforeYearlyHours * (1 - savedRate));

  // 절감량
  const savedCost = beforeYearlyCost - afterYearlyCost;
  const savedHours = beforeYearlyHours - afterYearlyHours;

  // 그래프 높이 비율 (Before가 100%)
  const afterHeightPercent = 100 - automationRate;

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        calculatorRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 80%',
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
          AI 팀원 도입하면 얼마나 절약될까?
        </h2>

        <div ref={calculatorRef} className="max-w-5xl mx-auto opacity-0">
          {/* 1행: 입력 파라미터 (전체 너비) */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[var(--text-main)] text-lg font-bold">대표님의 상황을 알려주세요.</h3>
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="text-[var(--primary)] text-sm font-medium hover:underline"
              >
                {showDetail ? '간단히 보기 ←' : '자세히 설정 →'}
              </button>
            </div>

            {/* 1행: 직원수, 평균월급 (간단/자세히 공통) */}
            <div className="grid grid-cols-2 gap-4">
              {/* 직원 수 */}
              <div>
                <label className="text-[var(--text-sub)] text-sm mb-2 block">직원 수 (명)</label>
                <input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value) || 1)}
                  min={1}
                  className="w-full bg-[var(--background)] text-[var(--text-main)] rounded-lg px-4 py-3 border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* 평균 월급 */}
              <div>
                <label className="text-[var(--text-sub)] text-sm mb-2 block">평균 월급 (만원)</label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value) || 300)}
                  min={100}
                  step={50}
                  className="w-full bg-[var(--background)] text-[var(--text-main)] rounded-lg px-4 py-3 border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* 2행: 자세히 보기 - 업무수행시간, 자동화 효과, 개발비 (3열) */}
            {showDetail && (
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                <div>
                  <label className="text-[var(--text-sub)] text-sm mb-2 block">업무수행시간 (시간/일)</label>
                  <input
                    type="number"
                    value={taskHoursPerDay}
                    onChange={(e) => setTaskHoursPerDay(Math.min(8, Math.max(1, Number(e.target.value) || 4)))}
                    min={1}
                    max={8}
                    className="w-full bg-[var(--background)] text-[var(--text-main)] rounded-lg px-4 py-3 border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-sub)] text-sm mb-2 block">자동화 효과 (%)</label>
                  <input
                    type="number"
                    value={automationRate}
                    onChange={(e) => setAutomationRate(Math.min(90, Math.max(30, Number(e.target.value) || 70)))}
                    min={30}
                    max={90}
                    className="w-full bg-[var(--background)] text-[var(--text-main)] rounded-lg px-4 py-3 border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-sub)] text-sm mb-2 block">개발비 (만원)</label>
                  <input
                    type="number"
                    value={developmentCost}
                    onChange={(e) => setDevelopmentCost(Number(e.target.value) || 300)}
                    min={100}
                    step={50}
                    className="w-full bg-[var(--background)] text-[var(--text-main)] rounded-lg px-4 py-3 border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            )}

            {/* 간단 버전일 때 기본 설정 안내 */}
            {!showDetail && (
              <p className="text-xs text-[var(--text-sub)] mt-4">
                * 기본 설정: 업무 {taskHoursPerDay}시간/일, 자동화 {automationRate}%, 개발비 {developmentCost}만원
              </p>
            )}
          </div>

          {/* 2행: 절감효과 + 그래프 (2열 배치) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 왼쪽: 계산 결과 */}
            <div className="card">
              <h3 className="text-[var(--text-main)] text-lg font-bold mb-6">예상 절감 효과</h3>

              <div className="space-y-4">
                {/* 연간 절감액 */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] rounded-xl p-5 text-white">
                  <p className="text-white/80 text-sm mb-1">연간 절감액</p>
                  <p className="text-4xl font-bold">
                    {savedCost.toLocaleString()}<span className="text-2xl">만원</span>
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    월 약 {Math.round(savedCost / 12).toLocaleString()}만원 절감
                  </p>
                </div>

                {/* 연간 절감시간 */}
                <div className="bg-[var(--secondary)] rounded-xl p-5">
                  <p className="text-white/80 text-sm mb-1">연간 절감시간</p>
                  <p className="text-white text-4xl font-bold">
                    {savedHours.toLocaleString()}<span className="text-2xl">시간</span>
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    약 {Math.round(savedHours / 8)}일의 업무시간 확보
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽: Before/After 그래프 */}
            <div className="card !p-4 flex flex-col justify-center">
              <h3 className="text-[var(--text-main)] text-center text-lg font-bold mb-4">
                AI 팀원 도입 전 후
              </h3>

              <div className="flex items-end justify-center gap-6 h-64">
                {/* Before 막대 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 bg-gray-300 rounded-t-lg flex flex-col items-center justify-center transition-all duration-500"
                    style={{ height: '210px' }}
                  >
                    <span className="text-[var(--text-main)] font-bold text-lg">{beforeYearlyCost.toLocaleString()}만원</span>
                    <span className="text-[var(--text-sub)] text-sm">{beforeYearlyHours.toLocaleString()}시간</span>
                  </div>
                  <span className="text-[var(--text-sub)] text-xs mt-2">도입 전</span>
                </div>

                {/* 화살표 */}
                <div className="flex flex-col items-center justify-center pb-8">
                  <span className="text-[var(--primary)] text-3xl font-bold">→</span>
                  <span className="text-[var(--primary)] text-sm font-bold">{automationRate}%</span>
                </div>

                {/* After 막대 */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center justify-end" style={{ height: '210px' }}>
                    <div
                      className="w-32 bg-gradient-to-t from-[var(--primary)] to-[#FF9A76] rounded-t-lg flex flex-col items-center justify-center transition-all duration-500"
                      style={{ height: `${Math.max(afterHeightPercent * 2.1, 50)}px` }}
                    >
                      <span className="text-white font-bold">{afterYearlyCost.toLocaleString()}만원</span>
                      <span className="text-white/80 text-sm">{afterYearlyHours.toLocaleString()}시간</span>
                    </div>
                  </div>
                  <span className="text-[var(--primary)] text-xs mt-2 font-bold">도입 후</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="#contact"
              className="btn-primary text-center"
            >
              무료 진단 받기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
