'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Lightweight hook for CSS-based scroll animations using IntersectionObserver.
 * Triggers CSS transitions when element enters viewport.
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useInViewAnimation({ threshold: 0.1 });
 * return (
 *   <div
 *     ref={ref}
 *     className={`transition-all duration-700 ${
 *       isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
 *     }`}
 *   >
 *     Content
 *   </div>
 * );
 * ```
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook for staggered animations with CSS transitions.
 * Returns isInView state and calculates delay for each item.
 *
 * @example
 * ```tsx
 * const { ref, isInView, getDelay } = useStaggerAnimation({ staggerDelay: 100 });
 * return (
 *   <div ref={ref}>
 *     {items.map((item, index) => (
 *       <div
 *         key={item.id}
 *         className={`transition-all duration-500 ${
 *           isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
 *         }`}
 *         style={{ transitionDelay: isInView ? getDelay(index) : '0ms' }}
 *       >
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions & { staggerDelay?: number; baseDelay?: number } = {}
) {
  const { staggerDelay = 100, baseDelay = 0, ...inViewOptions } = options;
  const { ref, isInView } = useInViewAnimation<T>(inViewOptions);

  const getDelay = useCallback(
    (index: number) => `${baseDelay + index * staggerDelay}ms`,
    [baseDelay, staggerDelay]
  );

  return { ref, isInView, getDelay };
}

export default useInViewAnimation;
