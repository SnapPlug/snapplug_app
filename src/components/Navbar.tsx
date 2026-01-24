'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const pirulen = localFont({
  src: '../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

const navLinks = [
  { href: '#problem', label: 'AI 팀원' },
  { href: '#scenarios', label: '성과' },
  { href: '#roi', label: '기대효과' },
];

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

  return (
    <nav className={`navbar pt-6 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}
        >
          SnapPlug
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <button
            className="cta-ponpon !py-3 !px-6 !text-sm"
            onClick={() => window.ChannelIO?.('openWorkflow', 803868)}
          >
            문의하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-4 gap-3 sm:p-6 sm:gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base sm:text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            className="cta-ponpon text-center mt-2 w-full text-[15px] sm:text-base"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.ChannelIO?.('openWorkflow', 803868);
            }}
          >
            문의하기
          </button>
        </div>
      </div>
    </nav>
  );
}
