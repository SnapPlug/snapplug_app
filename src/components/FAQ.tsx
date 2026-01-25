'use client';

import { useState, useEffect, useRef } from 'react';
import { faqs } from '@/data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="section bg-white" aria-labelledby="faq-title">
      <div className="container">
        <h2 ref={titleRef} id="faq-title" className="section-title opacity-0">
          자주 묻는 질문
        </h2>

        <div ref={faqListRef} className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item card p-0 overflow-hidden opacity-0">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-[var(--background)] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary)]"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-button-${idx}`}
              >
                <span className="font-semibold text-[13px] sm:text-base">{faq.question}</span>
                <span
                  className={`text-xl sm:text-2xl text-[var(--primary)] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === idx ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-button-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-64 sm:max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-[var(--text-sub)] text-[13px] sm:text-base whitespace-pre-line">
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
