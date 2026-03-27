import type { MDXComponents } from 'mdx/types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function Callout({ type = 'info', children }: { type?: 'info' | 'tip' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-300 text-blue-900',
    tip: 'bg-[var(--accent-warm)] border-[var(--primary)] text-[var(--foreground)]',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-900',
  };

  const icons = { info: 'ℹ️', tip: '💡', warning: '⚠️' };

  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-6 ${styles[type]}`}>
      <div className="flex gap-2">
        <span>{icons[type]}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--border)] text-center">
      <p className="text-sm text-[var(--text-sub)] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[var(--primary)]">{value}</p>
      {sub && <p className="text-xs text-[var(--text-sub)] mt-1">{sub}</p>}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;
    return (
      <h2 id={id} className="text-xl md:text-2xl font-bold text-[var(--foreground)] mt-10 mb-4 scroll-mt-20" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;
    return (
      <h3 id={id} className="text-lg md:text-xl font-semibold text-[var(--foreground)] mt-8 mb-3 scroll-mt-20" {...props}>
        {children}
      </h3>
    );
  },
  p: (props) => (
    <p className="text-[var(--foreground)] leading-relaxed mb-4" {...props} />
  ),
  a: (props) => (
    <a className="text-[var(--primary)] hover:underline font-medium" target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined} {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--foreground)]" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--foreground)]" {...props} />
  ),
  li: (props) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-[var(--primary)] bg-[var(--accent-warm)] rounded-r-lg pl-4 py-3 my-6 text-[var(--foreground)] italic" {...props} />
  ),
  code: (props) => (
    <code className="bg-gray-100 text-[var(--primary)] px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 my-6 overflow-x-auto text-sm" {...props} />
  ),
  hr: () => <hr className="my-8 border-[var(--border)]" />,
  table: (props) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="bg-[var(--primary)] text-white border-b border-r last:border-r-0 border-[var(--primary-hover)] px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-r last:border-r-0 border-[var(--border)] px-4 py-3 text-[var(--foreground)]" {...props} />
  ),
  strong: (props) => (
    <strong className="font-bold text-[var(--foreground)]" {...props} />
  ),
  Callout,
  StatCard,
};
