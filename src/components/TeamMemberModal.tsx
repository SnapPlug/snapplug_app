'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { industryColors, industryNames } from '@/types';
import type { TeamMember } from '@/types';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [member]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (member && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [member, onClose]);

  // Focus trap for modal
  useEffect(() => {
    if (member && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [member]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          aria-label="모달 닫기"
        >
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Resume Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 bg-[#F8F9FA] border-b border-gray-200">
          <div className="flex items-start gap-3 sm:gap-5">
            {/* Avatar */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[var(--accent-warm)] flex-shrink-0 shadow-md">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            {/* Info */}
            <div className="flex-1 pt-0.5 sm:pt-1">
              <p className="text-xs sm:text-sm text-[var(--text-sub)] italic mb-0.5 sm:mb-1 line-clamp-2">
                {member.tagline}
              </p>
              <h3 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">
                <span className="text-[var(--secondary)]">AI</span>{' '}
                {member.name} ({member.name.toUpperCase()})
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#2D2D2D] text-white text-[10px] sm:text-xs font-semibold rounded">
                  {member.role} ({member.roleEn})
                </span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 border border-[var(--secondary)] text-[var(--secondary)] text-[10px] sm:text-xs font-semibold rounded flex items-center gap-1">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--secondary)] rounded-full" aria-hidden="true"></span>
                  AI AGENT v2.1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Body - 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left Column */}
          <div className="md:col-span-2 p-4 sm:p-6 md:border-r border-gray-100">
            {/* Licenses */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                자격/면허
                <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">LICENSE</span>
              </h4>
              <div className="border-t border-gray-200 pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                {member.licenses.map((license, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[var(--text-main)]">{license.name}</span>
                    <span className="text-[var(--text-sub)] text-[10px] sm:text-xs">{license.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                보유기술
                <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">SKILLS</span>
              </h4>
              <div className="border-t border-gray-200 pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                {member.skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[var(--text-main)]">{skill.name}</span>
                    <span className="text-[var(--primary)] tracking-tight text-xs sm:text-sm" aria-label={`숙련도 ${skill.level}점`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < skill.level ? '' : 'opacity-25'} aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Introduction */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-current rounded-full flex items-center justify-center text-[10px] sm:text-xs" aria-hidden="true">i</span>
                INTRODUCTION
              </h4>
              <div className="border-t border-gray-200 pt-2 sm:pt-3">
                <p className="text-xs sm:text-sm text-[var(--text-sub)] leading-relaxed">
                  {member.introduction}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Use Cases */}
          <div className="md:col-span-3 p-4 sm:p-6 bg-white border-t md:border-t-0 border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-2">
              활용 시나리오
              <span className="text-[10px] sm:text-xs font-normal text-[var(--text-sub)] uppercase tracking-wider">USE CASES</span>
            </h4>

            {/* Use Cases Header */}
            <div className="border-t border-gray-200 pt-2 sm:pt-3">
              <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] sm:text-xs font-semibold text-[var(--text-sub)] uppercase tracking-wider mb-2 sm:mb-3">
                <div className="col-span-3">상황</div>
                <div className="col-span-9">시나리오 & 기대효과</div>
              </div>

              {/* Use Case Items */}
              <div className="space-y-4 sm:space-y-5">
                {member.experiences.map((exp, idx) => {
                  const dotColor = industryColors[exp.industry] || '#6B7280';
                  const industryName = industryNames[exp.industry] || exp.industry;

                  return (
                    <div key={idx} className="flex flex-col sm:grid sm:grid-cols-12 gap-1 sm:gap-2">
                      {/* Industry/Situation */}
                      <div className="sm:col-span-3 text-xs text-[var(--text-sub)]">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-white text-[10px] font-medium"
                          style={{ backgroundColor: dotColor }}
                        >
                          {industryName}
                        </span>
                      </div>
                      {/* Details */}
                      <div className="sm:col-span-9">
                        <h5 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
                          {exp.company}
                        </h5>
                        <p className="text-[11px] sm:text-xs text-[var(--text-sub)] mb-1.5 sm:mb-2 leading-relaxed">
                          {exp.description}
                        </p>
                        <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[var(--secondary)] text-white text-[10px] sm:text-xs font-bold rounded">
                          기대효과 {exp.result}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-100">
          <a
            href="#contact"
            className="block w-full py-3 sm:py-4 bg-[var(--primary)] text-white text-center text-sm sm:text-base font-bold rounded-lg hover:bg-[var(--primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            onClick={onClose}
          >
            {member.name} 채용 상담하기
          </a>
        </div>
      </div>
    </div>
  );
}
