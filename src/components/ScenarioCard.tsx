'use client';

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Scenario } from '@/types';
import { aiTeamInfo } from '@/data/team';

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const video = videoRef.current;
    if (!video) return;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });
    observer.observe(card);

    return () => observer.disconnect();
  }, [handleIntersection]);

  const hasVideo = !!scenario.video;

  return (
    <article
      ref={cardRef}
      className={`overflow-hidden rounded-2xl ${
        hasVideo
          ? ''
          : 'relative card hover:shadow-lg transition-shadow duration-300'
      }`}
      role="listitem"
    >
      {/* Video card */}
      {hasVideo && (
        <>
          {/* Video container */}
          <div className="relative aspect-video rounded-t-2xl md:rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={scenario.video!.poster}
            >
              <source src={scenario.video!.srcMobile} media="(max-width: 768px)" type="video/mp4" />
              <source src={scenario.video!.src} type="video/mp4" />
            </video>

            {/* Desktop overlay panel */}
            <div className="hidden md:block absolute bottom-3 right-3 z-10 w-[260px] bg-black/50 backdrop-blur-md rounded-xl px-3.5 py-3 text-white">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm" aria-hidden="true">{scenario.icon}</span>
                <span className="text-xs font-semibold truncate">{scenario.title}</span>
                <span className="text-[10px] text-white/50 truncate">{scenario.subtitle}</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex -space-x-1.5">
                  {scenario.aiTeam.map((member) => (
                    <div
                      key={member}
                      className="relative w-5 h-5 rounded-full overflow-hidden border border-white/30"
                    >
                      <Image
                        src={aiTeamInfo[member].image}
                        alt={aiTeamInfo[member].name}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-white/70">
                  with {scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(' + ')}
                </span>
              </div>
              <div className="bg-white/10 rounded-lg px-2.5 py-1.5 mb-2">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-bold">{scenario.highlight.number}</span>
                  <span className="text-xs font-semibold">{scenario.highlight.unit}</span>
                  <span className="text-[10px] text-white/70">{scenario.highlight.suffix}</span>
                </div>
              </div>
              <ul className="space-y-0.5">
                {scenario.solutions.slice(0, 2).map((sol, idx) => (
                  <li key={idx} className="text-[10px] text-white/70 leading-tight flex items-start gap-1">
                    <span className="text-white/40 mt-px">&#8226;</span>
                    <span className="line-clamp-1">{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile info panel (below video) */}
          <div className="md:hidden bg-white border border-gray-100 border-t-0 rounded-b-2xl px-3.5 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm" aria-hidden="true">{scenario.icon}</span>
              <span className="text-xs font-semibold text-[var(--text-main)] truncate">{scenario.title}</span>
              <span className="text-[10px] text-[var(--text-sub)] truncate">{scenario.subtitle}</span>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex -space-x-1.5">
                {scenario.aiTeam.map((member) => (
                  <div
                    key={member}
                    className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-sm"
                  >
                    <Image
                      src={aiTeamInfo[member].image}
                      alt={aiTeamInfo[member].name}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-[var(--primary)] font-medium">
                with {scenario.aiTeam.map((m) => aiTeamInfo[m].name).join(' + ')}
              </span>
            </div>
            <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white rounded-lg px-2.5 py-1.5 mb-2">
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold">{scenario.highlight.number}</span>
                <span className="text-xs font-semibold">{scenario.highlight.unit}</span>
                <span className="text-[10px] opacity-80">{scenario.highlight.suffix}</span>
              </div>
            </div>
            <ul className="space-y-0.5">
              {scenario.solutions.slice(0, 2).map((sol, idx) => (
                <li key={idx} className="text-[10px] text-[var(--text-sub)] leading-tight flex items-start gap-1">
                  <span className="text-gray-300 mt-px">&#8226;</span>
                  <span className="line-clamp-1">{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Fallback: Non-video card content */}
      {!hasVideo && (
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <span className="text-2xl sm:text-3xl" aria-hidden="true">{scenario.icon}</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold">{scenario.title}</h3>
              <p className="text-[11px] sm:text-xs text-[var(--text-sub)]">{scenario.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
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

          <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white p-3 sm:p-4 rounded-xl mb-3 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl sm:text-3xl font-bold">{scenario.highlight.number}</span>
              <span className="text-base sm:text-lg font-bold">{scenario.highlight.unit}</span>
              <span className="text-[11px] sm:text-sm opacity-90">{scenario.highlight.suffix}</span>
            </div>
          </div>

          {scenario.quote && (
            <blockquote className="pt-3 border-t border-gray-100">
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
        </div>
      )}
    </article>
  );
}
