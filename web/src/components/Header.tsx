'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ModelSelector from './ModelSelector';
import { useModel } from '@/lib/useModel';
import { useTheme } from '@/lib/useTheme';

export default function Header() {
  const pathname = usePathname();
  const [modelId, setModel] = useModel();
  const [theme, toggleTheme] = useTheme();

  return (
    <header
      style={{
        height: '56px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: '16px',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <img
          src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'}
          alt="Agio"
          style={{ height: '36px', width: 'auto' }}
        />
      </Link>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '15px',
            flexShrink: 0,
            transition: 'border-color 150ms, color 150ms',
          }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <ModelSelector value={modelId} onChange={setModel} />

        <nav style={{ display: 'flex', gap: '4px' }}>
          <NavLink href="/" active={pathname === '/'}>
            Skills
          </NavLink>
          <NavLink href="/chat" active={pathname === '/chat'}>
            Chat Livre
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        padding: '6px 14px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        textDecoration: 'none',
        color: active ? 'var(--accent)' : 'var(--text-muted)',
        background: active ? 'var(--accent-dim)' : 'transparent',
        transition: 'color 150ms, background 150ms',
        fontFamily: 'IBM Plex Mono, monospace',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </Link>
  );
}
