'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const hourOptions = [5, 10, 20];
const rateOptions = [30000, 50000, 100000];

export default function ROICalculator() {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(50000);
  const [customHours, setCustomHours] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const effectiveHours = customHours ? parseInt(customHours) || 0 : hours;
  const monthlySavings = effectiveHours * rate * 4;
  const yearlySavings = monthlySavings * 12;

  const formatCurrency = (value: number) => {
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`;
    }
    return `${value.toLocaleString()}원`;
  };

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

      // Calculator cards animation
      const cards = calculatorRef.current?.querySelectorAll('.calc-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: calculatorRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Result card animation
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: resultRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate result number when values change
  useEffect(() => {
    if (resultRef.current) {
      gsap.fromTo(
        resultRef.current.querySelector('.savings-amount'),
        { scale: 1.1 },
        { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [monthlySavings]);

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          AI 팀원 도입하면 얼마나 절약될까?
        </h2>

        <div ref={calculatorRef} className="max-w-xl mx-auto">
          {/* Question 1 */}
          <div className="calc-card card mb-6 opacity-0">
            <h3 className="font-bold mb-4">Q1. 반복 업무에 주 몇 시간 쓰세요?</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {hourOptions.map((h) => (
                <button
                  key={h}
                  onClick={() => {
                    setHours(h);
                    setCustomHours('');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    hours === h && !customHours
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {h}시간
                </button>
              ))}
              <input
                type="number"
                placeholder="직접입력"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] w-24 focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>

          {/* Question 2 */}
          <div className="calc-card card mb-6 opacity-0">
            <h3 className="font-bold mb-4">Q2. 대표님/담당자 시급은? (대략)</h3>
            <div className="flex flex-wrap gap-2">
              {rateOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    rate === r
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {r / 10000}만원
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div
            ref={resultRef}
            className="card bg-gradient-to-br from-[var(--primary)] to-[#FF9966] text-white opacity-0"
          >
            <div className="text-center">
              <p className="text-lg mb-2">💰 예상 월 절감액</p>
              <p className="savings-amount text-4xl md:text-5xl font-bold mb-4">
                약 {formatCurrency(monthlySavings)}
              </p>
              <p className="text-sm opacity-90 mb-6">
                (주 {effectiveHours}시간 × 시급 {rate / 10000}만원 × 4주)
              </p>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-left">
                <p className="mb-2">
                  연간으로 환산하면 <strong>약 {formatCurrency(yearlySavings)}</strong>
                </p>
                <p className="text-sm opacity-90">
                  = 신입 직원 1명 연봉과 비슷해요
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="#contact" className="btn-primary text-center">
              무료 진단 받기
            </a>
            <button className="btn-secondary">
              자세히 계산하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
