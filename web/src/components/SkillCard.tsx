'use client';

import { Skill } from '@/lib/skills';

interface SkillCardProps {
  skill: Skill;
  selected: boolean;
  onSelect: (name: string) => void;
}

const SKILL_ICONS: Record<string, string> = {
  // Marketing
  'copy-generator': '✍',
  'briefing-generator': '📋',
  'content-intelligence': '🔍',
  'content-transformation': '🔄',
  'image-prompt-generator': '🎨',
  'input-triage': '📥',
  'notion-report-builder': '📄',
  // Comercial
  'proposta-comercial': '🤝',
  'follow-up-comercial': '💬',
  // Financeiro
  'relatorio-financeiro': '📊',
  // Orçamento
  'composicao-orcamentaria': '🧮',
  'analise-desvio-orcamento': '📉',
  // Administrativo & Financeiro
  'gestao-contratos': '📑',
  // Compras
  'cotacao-fornecedores': '🔎',
  'pedido-compra': '🛒',
  // Engenharia
  'relatorio-visita-obra': '🏗️',
  'memoria-de-calculo': '📐',
  // Arquitetura
  'memorial-descritivo': '🏛️',
  'especificacao-tecnica': '📏',
};

export default function SkillCard({ skill, selected, onSelect }: SkillCardProps) {
  const icon = SKILL_ICONS[skill.name] || '⚡';
  const label = skill.name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <button
      className={`skill-card${selected ? ' selected' : ''}`}
      onClick={() => onSelect(skill.name)}
      style={{
        width: '100%',
        textAlign: 'left',
        background: selected ? 'var(--accent-dim-2)' : 'var(--surface)',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line when selected */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--accent)',
            borderRadius: '12px 12px 0 0',
          }}
        />
      )}

      {/* Circular icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-2)'}`,
          background: selected ? 'var(--accent-dim)' : 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          flexShrink: 0,
          transition: 'border-color 200ms, background 200ms',
        }}
      >
        {icon}
      </div>

      {/* Name + description */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            color: selected ? 'var(--accent)' : 'var(--text)',
            marginBottom: '7px',
            lineHeight: 1.2,
            transition: 'color 200ms',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {skill.description}
        </div>
      </div>

      {/* Version footer */}
      {skill.metadata?.version != null && (
        <div
          style={{
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: selected ? 'var(--accent)' : 'var(--text-subtle)',
            letterSpacing: '0.04em',
            opacity: 0.7,
            transition: 'color 200ms',
          }}
        >
          v{String(skill.metadata.version)}
        </div>
      )}
    </button>
  );
}
