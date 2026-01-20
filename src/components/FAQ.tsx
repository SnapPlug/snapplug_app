'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'AI 팀원 도입 비용이 얼마인가요?',
    answer: `회사 상황에 따라 다릅니다.
맞춤 구축이라 템플릿을 붙이는 게 아니거든요.
무료 진단 후 정확한 견적을 안내드려요.
보통 초기 구축 200~500만원, 월 유지비 20~50만원 수준입니다.`,
  },
  {
    question: '우리 회사 툴이랑 연동이 되나요?',
    answer: `채널톡, 카카오톡, 슬랙, 노션, 구글 워크스페이스 등
대부분의 업무 툴과 연동 가능합니다.
특수한 툴이 있다면 진단 시 확인해드려요.`,
  },
  {
    question: 'AI가 실수하면 어떡하죠?',
    answer: `초기 2주간 집중 모니터링을 합니다.
이상 응답이 감지되면 즉시 조정하고,
중요한 건은 담당자에게 연결되도록 설계해요.
점점 더 정확해집니다.`,
  },
  {
    question: '직원들이 거부감을 느끼진 않을까요?',
    answer: `AI 팀원은 사람을 대체하는 게 아니라
반복 업무를 대신해서
사람이 더 중요한 일에 집중하게 해줍니다.
오히려 업무 만족도가 올라가는 경우가 많아요.`,
  },
  {
    question: '작은 회사도 도입할 수 있나요?',
    answer: `네, 1인 기업도 많이 도입하세요.
오히려 작은 회사일수록 효과가 커요.
대표 혼자 다 해야 하는 상황에서
AI 팀원이 큰 도움이 됩니다.`,
  },
  {
    question: '계약 기간이나 약정이 있나요?',
    answer: `초기 구축 후 월 단위로 유지보수 계약합니다.
장기 약정은 없어요.
만족하시면 계속, 아니면 언제든 종료 가능합니다.`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

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

      // FAQ items animation
      const items = faqListRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqListRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 ref={titleRef} className="section-title opacity-0">
          자주 묻는 질문
        </h2>

        <div ref={faqListRef} className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item card p-0 overflow-hidden opacity-0">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--background)] transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <span
                  className={`text-2xl text-[var(--primary)] transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 text-[var(--text-sub)] whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
