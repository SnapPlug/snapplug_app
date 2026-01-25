'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { NAV_LINKS, CHANNEL_WORKFLOW_ID } from '@/constants/navigation';

const pirulen = localFont({
  src: '../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`navbar pt-6 ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}
          aria-label="SnapPlug 홈으로 이동"
        >
          SnapPlug
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <button
            className="cta-ponpon !py-3 !px-6 !text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            onClick={() => window.ChannelIO?.('openWorkflow', CHANNEL_WORKFLOW_ID)}
          >
            문의하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col p-4 gap-3 sm:p-6 sm:gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base sm:text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <button
            className="cta-ponpon text-center mt-2 w-full text-[15px] sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.ChannelIO?.('openWorkflow', CHANNEL_WORKFLOW_ID);
            }}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            문의하기
          </button>
        </div>
      </div>
    </nav>
  );
}
