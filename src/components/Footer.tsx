'use client';

import { useState } from 'react';

export default function Footer() {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[var(--background)] border-t border-[var(--border)] py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-[var(--text-sub)]">
            © {new Date().getFullYear()} SnapPlug. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-sub)]">
            <a
              href="https://elegant-sand-f36.notion.site/24f2b9ca10c38009b496fca952cac1d4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="https://elegant-sand-f36.notion.site/24f2b9ca10c380c6b295d0fa5e23633c"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Terms of Service
            </a>
            <button
              onClick={() => setIsCompanyModalOpen(true)}
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Company
            </button>
          </div>
        </div>
      </footer>

      {/* Company Info Modal */}
      {isCompanyModalOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
          onClick={() => setIsCompanyModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCompanyModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[var(--foreground)]">사업자 정보</h3>
            </div>

            {/* Company Info */}
            <div className="space-y-3 text-[var(--text-sub)]">
              <div className="flex">
                <span className="w-28 font-medium text-[var(--foreground)]">상호명</span>
                <span>SNAPPLUG (스냅플러그)</span>
              </div>
              <div className="flex">
                <span className="w-28 font-medium text-[var(--foreground)]">대표</span>
                <span>정해성</span>
              </div>
              <div className="flex">
                <span className="w-28 font-medium text-[var(--foreground)]">사업자등록번호</span>
                <span>551-10-02859</span>
              </div>
              <div className="flex">
                <span className="w-28 font-medium text-[var(--foreground)]">Contact</span>
                <a
                  href="mailto:hello@snapplug.app"
                  className="text-[var(--accent)] hover:underline"
                >
                  hello@snapplug.app
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
