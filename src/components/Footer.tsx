'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-[var(--text-sub)]">
          © {new Date().getFullYear()} SnapPlug. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[var(--text-sub)]">
          <a href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-[var(--foreground)] transition-colors">
            Terms of Service
          </a>
          <a href="/company" className="hover:text-[var(--foreground)] transition-colors">
            Company
          </a>
        </div>
      </div>
    </footer>
  );
}
