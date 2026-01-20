'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--text-main)] text-white py-12">
      <div className="container text-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-1">SNAPPLUG</h2>
        <p className="text-sm text-gray-400 mb-2">Business & Beyond</p>
        <p className="text-sm mb-6">&ldquo;당신의 첫 번째 AI 팀원&rdquo;</p>

        {/* Divider */}
        <div className="w-16 h-px bg-gray-600 mx-auto mb-6" />

        {/* Contact */}
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            문의:{' '}
            <a
              href="mailto:contact@snapplug.app"
              className="hover:text-white transition-colors"
            >
              contact@snapplug.app
            </a>
          </p>
          <p>
            카카오톡:{' '}
            <a
              href="https://pf.kakao.com/_snapplug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @snapplug
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} SnapPlug. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
