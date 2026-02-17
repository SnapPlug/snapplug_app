'use client';

import { useEffect, useRef } from 'react';

export default function WorkspaceDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            // Lazy load GSAP
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
                  descRef.current,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: descRef.current,
                      start: 'top 85%',
                    },
                  }
                );

                gsap.fromTo(
                  videoContainerRef.current,
                  { opacity: 0, y: 40, scale: 0.95 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: videoContainerRef.current,
                      start: 'top 85%',
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

  // CSS fallback: ensure elements become visible even if GSAP fails
  useEffect(() => {
    const timer = setTimeout(() => {
      titleRef.current?.classList.remove('opacity-0');
      descRef.current?.classList.remove('opacity-0');
      videoContainerRef.current?.classList.remove('opacity-0');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Aggressive autoplay fallback for mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    // Try on canplay
    video.addEventListener('canplay', attemptPlay, { once: true });

    // Also try after a short delay (covers cases where canplay already fired)
    const timer = setTimeout(attemptPlay, 500);

    // Also try on first user interaction (touch) as ultimate fallback
    const onTouch = () => {
      attemptPlay();
      document.removeEventListener('touchstart', onTouch);
    };
    document.addEventListener('touchstart', onTouch, { once: true, passive: true });

    return () => {
      video.removeEventListener('canplay', attemptPlay);
      clearTimeout(timer);
      document.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return (
    <section
      id="workspace-demo"
      ref={sectionRef}
      className="section bg-white"
      aria-labelledby="workspace-demo-title"
    >
      <div className="container">
        <h2
          ref={titleRef}
          id="workspace-demo-title"
          className="text-center mb-3 sm:mb-4 opacity-0"
        >
          <span className="text-xl sm:text-2xl md:text-3xl text-[var(--text-sub)]">
            궁금하시죠?
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-5xl font-bold mt-1 sm:mt-2 block">
            AI 팀원이 일하는 모습,{' '}
            <span className="text-[var(--primary)]">직접 보세요</span>
          </span>
        </h2>

        <p
          ref={descRef}
          className="text-center text-[var(--text-sub)] text-[13px] sm:text-sm md:text-base mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto opacity-0"
        >
          Ara, Rio, Luna, Sera가 실제로 어떻게 협업하는지 확인해보세요.
          <br className="hidden sm:block" />
          대표님은 지시만 하면, 나머지는 AI 팀원이 알아서 처리합니다.
        </p>

        <div
          ref={videoContainerRef}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] opacity-0"
        >
          <video
            ref={videoRef}
            className="w-full aspect-video"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            poster="/workspace-demo-poster.jpg"
          >
            {/* Mobile-first: small file loads fast, desktop gets full quality */}
            <source src="/workspace-demo-sm.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/workspace-demo.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="text-center text-[var(--text-sub)] text-[11px] sm:text-xs mt-4 sm:mt-6">
          * 실제 AI 팀원 워크스페이스 화면입니다
        </p>
      </div>
    </section>
  );
}
