'use client';

import { Skill } from '@/lib/skills';

interface SkillItemProps {
  skill: Skill;
  selected: boolean;
  onSelect: (name: string) => void;
}

export default function SkillItem({ skill, selected, onSelect }: SkillItemProps) {
  const label = skill.name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <button
      onClick={() => onSelect(skill.name)}
      style={{
        width: '100%',
        textAlign: 'left',
        background: selected ? 'rgba(232, 60, 60, 0.08)' : 'transparent',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 150ms, color 150ms',
        color: selected ? 'var(--accent)' : 'var(--text-muted)',
      }}
    >
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: selected ? 'var(--accent)' : 'var(--border-2)',
          flexShrink: 0,
          transition: 'background 150ms',
        }}
      />
      <span
        style={{
          fontSize: '13px',
          fontWeight: selected ? 500 : 400,
          fontFamily: 'DM Sans, sans-serif',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>
    </button>
  );
}
