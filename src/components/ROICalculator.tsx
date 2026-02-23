'use client';

import { useState, useEffect, useRef } from 'react';

export default function ROICalculator() {
  const [showDetail, setShowDetail] = useState(false);

  // 간단 버전 입력 (직원수, 평균월급만)
  const [employees, setEmployees] = useState(1);
  const [monthlySalary, setMonthlySalary] = useState(300); // 만원

  // 자세한 버전에서만 수정 가능한 값들 (기본값 설정)
  const [taskHoursPerDay, setTaskHoursPerDay] = useState(4); // 업무수행시간 (시간/일)
  const [automationRate, setAutomationRate] = useState(70); // AI 자동화 효과 %
  const [developmentCost, setDevelopmentCost] = useState(300); // AI 개발비 만원 (기본값 300만원)

  // 입력 필드용 문자열 상태 (사용자가 자유롭게 입력/삭제 가능)
  const [employeesStr, setEmployeesStr] = useState('1');
  const [salaryStr, setSalaryStr] = useState('300');
  const [taskHoursStr, setTaskHoursStr] = useState('4');
  const [automationStr, setAutomationStr] = useState('70');
  const [devCostStr, setDevCostStr] = useState('300');

  // blur 시 유효성 검증 후 숫자 상태 동기화
  const handleBlur = (
    rawValue: string,
    setNum: (v: number) => void,
    setStr: (v: string) => void,
    min: number,
    max: number,
    defaultVal: number
  ) => {
    const parsed = Number(rawValue);
    if (!rawValue.trim() || isNaN(parsed)) {
      setNum(defaultVal);
      setStr(String(defaultVal));
      return;
    }
    const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
    setNum(clamped);
    setStr(String(clamped));
  };

  // 스테퍼 버튼 핸들러
  const handleStep = (
    currentNum: number,
    step: number,
    direction: 1 | -1,
    setNum: (v: number) => void,
    setStr: (v: string) => void,
    min: number,
    max: number
  ) => {
    const next = Math.min(max, Math.max(min, currentNum + step * direction));
    setNum(next);
    setStr(String(next));
  };

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

  // After (AI 채용 후)
  const savedRate = automationRate / 100;
  const afterYearlyCost = Math.round(beforeYearlyCost * (1 - savedRate));
  const afterYearlyHours = Math.round(beforeYearlyHours * (1 - savedRate));

  // 절감량
  const savedCost = beforeYearlyCost - afterYearlyCost;
  const savedHours = beforeYearlyHours - afterYearlyHours;

  // 그래프 높이 비율 (Before가 100%)
  const afterHeightPercent = 100 - automationRate;

  // Lazy load GSAP only when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            Promise.all([
              import('gsap'),
              import('gsap/ScrollTrigger')
            ]).then(([gsapModule, scrollTriggerModule]) => {
              const gsap = gsapModule.gsap;
              const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
              gsap.registerPlugin(ScrollTrigger);

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
              }, section);

              cleanup = () => ctx.revert();
            });
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  // 스테퍼 입력 컴포넌트
  const StepperInput = ({
    id, label, value, strValue, setStr, setNum,
    min, max, defaultVal, step, unit,
  }: {
    id: string; label: string; value: number; strValue: string;
    setStr: (v: string) => void; setNum: (v: number) => void;
    min: number; max: number; defaultVal: number; step: number; unit: string;
  }) => (
    <div>
      <label htmlFor={id} className="text-[var(--text-sub)] text-[13px] sm:text-sm mb-2 block">
        {label} ({unit})
      </label>
      <div className="flex items-stretch">
        <button
          type="button"
          aria-label={`${label} 감소`}
          onClick={() => handleStep(value, step, -1, setNum, setStr, min, max)}
          className="flex-none w-11 sm:w-12 bg-[var(--background)] border border-r-0 border-[var(--border)] rounded-l-lg text-[var(--text-sub)] text-xl font-bold hover:bg-gray-100 active:bg-gray-200 transition-colors select-none"
        >
          −
        </button>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={strValue}
          onChange={(e) => {
            const v = e.target.value;
            if (v === '' || /^\d*$/.test(v)) setStr(v);
          }}
          onBlur={() => handleBlur(strValue, setNum, setStr, min, max, defaultVal)}
          onFocus={(e) => e.target.select()}
          className="flex-1 min-w-0 bg-[var(--background)] text-[var(--text-main)] border-y border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-center text-base sm:text-xl font-bold py-3"
        />
        <button
          type="button"
          aria-label={`${label} 증가`}
          onClick={() => handleStep(value, step, 1, setNum, setStr, min, max)}
          className="flex-none w-11 sm:w-12 bg-[var(--background)] border border-l-0 border-[var(--border)] rounded-r-lg text-[var(--text-sub)] text-xl font-bold hover:bg-gray-100 active:bg-gray-200 transition-colors select-none"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <section id="roi" ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          AI 팀원 채용하면 얼마나 절약될까?
        </h2>

        <div ref={calculatorRef} className="max-w-5xl mx-auto opacity-0">
          {/* 1행: 입력 파라미터 (전체 너비) */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-[var(--text-main)] text-base sm:text-lg font-bold">대표님의 상황을 알려주세요.</h3>
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="text-[var(--primary)] text-[13px] sm:text-sm font-medium hover:underline"
              >
                {showDetail ? '간단히 보기 ←' : '자세히 설정 →'}
              </button>
            </div>

            {/* 1행: 직원수, 평균월급 (간단/자세히 공통) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <StepperInput
                id="roi-employees" label="직원 수" value={employees}
                strValue={employeesStr} setStr={setEmployeesStr} setNum={setEmployees}
                min={1} max={999} defaultVal={1} step={1} unit="명"
              />
              <StepperInput
                id="roi-salary" label="평균 월급" value={monthlySalary}
                strValue={salaryStr} setStr={setSalaryStr} setNum={setMonthlySalary}
                min={100} max={9999} defaultVal={300} step={50} unit="만원"
              />
            </div>

            {/* 2행: 자세히 보기 - 업무수행시간, 자동화 효과, 개발비 */}
            {showDetail && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                <StepperInput
                  id="roi-task-hours" label="업무수행시간" value={taskHoursPerDay}
                  strValue={taskHoursStr} setStr={setTaskHoursStr} setNum={setTaskHoursPerDay}
                  min={1} max={8} defaultVal={4} step={1} unit="시간/일"
                />
                <StepperInput
                  id="roi-automation" label="자동화 효과" value={automationRate}
                  strValue={automationStr} setStr={setAutomationStr} setNum={setAutomationRate}
                  min={30} max={90} defaultVal={70} step={5} unit="%"
                />
                <StepperInput
                  id="roi-dev-cost" label="개발비" value={developmentCost}
                  strValue={devCostStr} setStr={setDevCostStr} setNum={setDevelopmentCost}
                  min={100} max={9999} defaultVal={300} step={50} unit="만원"
                />
              </div>
            )}

            {/* 간단 버전일 때 기본 설정 안내 */}
            {!showDetail && (
              <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mt-3 sm:mt-4">
                * 기본 설정: 업무 {taskHoursPerDay}시간/일, 자동화 {automationRate}%, 개발비 {developmentCost}만원
              </p>
            )}
          </div>

          {/* 2행: 절감효과 + 그래프 (2열 배치) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 왼쪽: 계산 결과 */}
            <div className="card">
              <h3 className="text-[var(--text-main)] text-base sm:text-lg font-bold mb-4 sm:mb-6">예상 절감 효과</h3>

              <div className="space-y-3 sm:space-y-4">
                {/* 연간 절감액 */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] rounded-xl p-4 sm:p-5 text-white">
                  <p className="text-white/80 text-[13px] sm:text-sm mb-1">연간 절감액</p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {savedCost.toLocaleString()}<span className="text-xl sm:text-2xl">만원</span>
                  </p>
                  <p className="text-white/70 text-[11px] sm:text-xs mt-2">
                    월 약 {Math.round(savedCost / 12).toLocaleString()}만원 절감
                  </p>
                </div>

                {/* 연간 절감시간 */}
                <div className="bg-[var(--secondary)] rounded-xl p-4 sm:p-5">
                  <p className="text-white/80 text-[13px] sm:text-sm mb-1">연간 절감시간</p>
                  <p className="text-white text-3xl sm:text-4xl font-bold">
                    {savedHours.toLocaleString()}<span className="text-xl sm:text-2xl">시간</span>
                  </p>
                  <p className="text-white/70 text-[11px] sm:text-xs mt-2">
                    약 {Math.round(savedHours / 8)}일의 업무시간 확보
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽: Before/After 그래프 */}
            <div className="card !p-3 sm:!p-4">
              <h3 className="text-[var(--text-main)] text-center text-base sm:text-lg font-bold mb-3 sm:mb-4">
                AI 팀원 채용 전 후
              </h3>

              <div className="flex items-end justify-center gap-3 sm:gap-6 h-48 sm:h-56 md:h-64">
                {/* Before 막대 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 sm:w-28 md:w-32 bg-gray-300 rounded-t-lg flex flex-col items-center justify-center transition-all duration-500"
                    style={{ height: '160px' }}
                  >
                    <span className="text-[var(--text-main)] font-bold text-sm sm:text-lg">{beforeYearlyCost.toLocaleString()}만원</span>
                    <span className="text-[var(--text-sub)] text-[11px] sm:text-sm">{beforeYearlyHours.toLocaleString()}시간</span>
                  </div>
                  <span className="text-[var(--text-sub)] text-[11px] sm:text-xs mt-2">채용 전</span>
                </div>

                {/* 화살표 */}
                <div className="flex flex-col items-center justify-center pb-6 sm:pb-8">
                  <span className="text-[var(--primary)] text-2xl sm:text-3xl font-bold">→</span>
                  <span className="text-[var(--primary)] text-[11px] sm:text-sm font-bold">{automationRate}%</span>
                </div>

                {/* After 막대 */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center justify-end" style={{ height: '160px' }}>
                    <div
                      className="w-20 sm:w-28 md:w-32 bg-gradient-to-t from-[var(--primary)] to-[#FF9A76] rounded-t-lg flex flex-col items-center justify-center transition-all duration-500"
                      style={{ height: `${Math.max(afterHeightPercent * 1.6, 40)}px` }}
                    >
                      <span className="text-white font-bold text-sm sm:text-base">{afterYearlyCost.toLocaleString()}만원</span>
                      <span className="text-white/80 text-[11px] sm:text-sm">{afterYearlyHours.toLocaleString()}시간</span>
                    </div>
                  </div>
                  <span className="text-[var(--primary)] text-[11px] sm:text-xs mt-2 font-bold">채용 후</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              className="btn-primary text-center"
              onClick={() => window.openChannelIOWorkflow?.(803868)}
            >
              문의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
