'use client';

import { useEffect, useRef } from 'react';

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';

interface UseScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  start?: string;
  markers?: boolean;
}

// Lazy load GSAP only when needed (scroll animations)
let gsapPromise: Promise<typeof import('gsap')> | null = null;

const loadGsap = async () => {
  if (!gsapPromise) {
    gsapPromise = import('gsap').then(async (gsapModule) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsapModule.gsap.registerPlugin(ScrollTrigger);
      return gsapModule;
    });
  }
  return gsapPromise;
};

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    type = 'fadeUp',
    delay = 0,
    duration = 0.8,
    staggerAmount = 0.15,
    start = 'top 85%',
    markers = false,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let cleanup: (() => void) | undefined;

    // Use IntersectionObserver to only load GSAP when element is near viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            loadGsap().then(({ gsap }) => {
              const ctx = gsap.context(() => {
                let fromVars: gsap.TweenVars = { opacity: 0 };
                let toVars: gsap.TweenVars = { opacity: 1, duration, delay };

                switch (type) {
                  case 'fadeUp':
                    fromVars = { opacity: 0, y: 50 };
                    toVars = { opacity: 1, y: 0, duration, delay, ease: 'power3.out' };
                    break;
                  case 'fadeIn':
                    fromVars = { opacity: 0 };
                    toVars = { opacity: 1, duration, delay, ease: 'power2.out' };
                    break;
                  case 'slideLeft':
                    fromVars = { opacity: 0, x: 100 };
                    toVars = { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
                    break;
                  case 'slideRight':
                    fromVars = { opacity: 0, x: -100 };
                    toVars = { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
                    break;
                  case 'scale':
                    fromVars = { opacity: 0, scale: 0.8 };
                    toVars = { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' };
                    break;
                  case 'stagger':
                    const children = element.children;
                    gsap.fromTo(
                      children,
                      { opacity: 0, y: 40 },
                      {
                        opacity: 1,
                        y: 0,
                        duration,
                        stagger: staggerAmount,
                        ease: 'power3.out',
                        scrollTrigger: {
                          trigger: element,
                          start,
                          markers,
                        },
                      }
                    );
                    return;
                }

                gsap.fromTo(element, fromVars, {
                  ...toVars,
                  scrollTrigger: {
                    trigger: element,
                    start,
                    markers,
                  },
                });
              });

              cleanup = () => ctx.revert();
            });
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [type, delay, duration, staggerAmount, start, markers]);

  return ref;
}

// Hook for section title animations - also lazy loads GSAP
export function useSectionAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            loadGsap().then(({ gsap }) => {
              const ctx = gsap.context(() => {
                // Animate section title
                const title = section.querySelector('.section-title');
                if (title) {
                  gsap.fromTo(
                    title,
                    { opacity: 0, y: 30 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.8,
                      ease: 'power3.out',
                      scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                      },
                    }
                  );
                }

                // Animate cards with stagger
                const cards = section.querySelectorAll('.card');
                if (cards.length > 0) {
                  gsap.fromTo(
                    cards,
                    { opacity: 0, y: 40 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      stagger: 0.1,
                      ease: 'power3.out',
                      scrollTrigger: {
                        trigger: cards[0],
                        start: 'top 85%',
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

  return sectionRef;
}
