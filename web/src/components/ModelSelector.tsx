'use client';

import { MODELS } from '@/lib/providers';

interface Props {
  value: string;
  onChange: (id: string) => void;
}

const PROVIDER_LABELS: Record<string, string> = {
  anthropic: 'Anthropic',
  google: 'Google',
  openrouter: 'OpenRouter',
};

export default function ModelSelector({ value, onChange }: Props) {
  const providers = ['anthropic', 'google', 'openrouter'] as const;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        color: 'var(--text)',
        fontSize: '12px',
        fontFamily: 'IBM Plex Mono, monospace',
        padding: '5px 28px 5px 10px',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238b8fa8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 8px center',
        minWidth: '180px',
      }}
    >
      {providers.map((provider) => (
        <optgroup key={provider} label={PROVIDER_LABELS[provider]}>
          {MODELS.filter((m) => m.provider === provider).map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
