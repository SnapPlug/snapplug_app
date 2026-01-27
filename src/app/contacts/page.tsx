'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const pirulen = localFont({
  src: '../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

export default function ContactPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Simple Navbar */}
      <nav className="navbar pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}
          >
            SnapPlug
          </Link>
          <Link
            href="/"
            className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="flex-1 py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
              상담 예약하기
            </h1>
            <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
              AI 팀원 채용에 관심이 있으신가요?<br />
              편한 시간에 60분 무료 진단 컨설팅을 예약해주세요.
            </p>
          </div>

          {/* Cal.com Embed - Official React Component */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Cal
                calLink="snap-plug/60분-진단컨설팅"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view' }}
              />
            </div>
          </div>

          {/* Alternative Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-[var(--text-sub)] mb-4">
              예약이 어려우시면 아래 채널로 연락주세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@snapplug.app"
                className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@snapplug.app
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
