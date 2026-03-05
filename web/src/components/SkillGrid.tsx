'use client';

import { useState } from 'react';
import { Skill } from '@/lib/skills';
import { useModel } from '@/lib/useModel';
import SkillCard from './SkillCard';
import TaskInput from './TaskInput';
import StreamingOutput from './StreamingOutput';

interface SkillGridProps {
  skills: Skill[];
}

export default function SkillGrid({ skills }: SkillGridProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modelId] = useModel();

  // Build ordered list of unique departments
  const departments = Array.from(new Set(skills.map((s) => s.department).filter(Boolean)));
  const showTabs = departments.length > 0;

  const filteredSkills =
    activeTab === 'all' ? skills : skills.filter((s) => s.department === activeTab);

  const handleSelect = (name: string) => {
    setSelectedSkill(name === selectedSkill ? null : name);
    setOutput('');
    setError('');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedSkill(null);
    setOutput('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!task.trim() || loading) return;
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: task.trim(), skillName: selectedSkill ?? undefined, modelId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || `Erro ${res.status}`);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setOutput(accumulated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const selectedSkillData = skills.find((s) => s.name === selectedSkill);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px' }}>

      {/* Page heading */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '30px',
            fontWeight: 400,
            color: 'var(--text)',
            margin: '0 0 6px 0',
            lineHeight: 1.15,
          }}
        >
          Painel de <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Skills</span>
        </h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13.5px' }}>
          Selecione uma skill para focar o agente, ou execute sem seleção para modo geral.
        </p>
      </div>

      {/* Department tabs */}
      {showTabs && (
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          {departments.length > 1 && (
            <TabButton
              label="Todos"
              count={skills.length}
              active={activeTab === 'all'}
              onClick={() => handleTabChange('all')}
            />
          )}
          {departments.map((dept) => (
            <TabButton
              key={dept}
              label={dept}
              count={skills.filter((s) => s.department === dept).length}
              active={activeTab === dept}
              onClick={() => handleTabChange(dept)}
            />
          ))}
        </div>
      )}

      {/* Separator line */}
      <div
        style={{
          height: '1px',
          background: 'var(--border)',
          marginBottom: '24px',
        }}
      />

      {/* Skills grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '14px',
          marginBottom: '36px',
        }}
      >
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            selected={selectedSkill === skill.name}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Active skill indicator + task input */}
      <div style={{ maxWidth: '760px' }}>
        {/* Skill context badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: selectedSkillData ? 'var(--accent)' : 'var(--text-subtle)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: selectedSkillData ? 'var(--accent)' : 'var(--text-subtle)',
            }}
          >
            {selectedSkillData ? `skill: ${selectedSkillData.name}` : 'modo geral'}
          </span>
        </div>

        <TaskInput
          value={task}
          onChange={setTask}
          onSubmit={handleSubmit}
          loading={loading}
          label="Descreva sua tarefa"
          placeholder={
            selectedSkillData
              ? `Ex: "${selectedSkillData.description.slice(0, 80)}..."`
              : 'Descreva a tarefa em linguagem natural...'
          }
        />

        {(output || loading || error) && (
          <div style={{ marginTop: '24px' }}>
            <StreamingOutput output={output} loading={loading} error={error} />
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '7px 16px',
        borderRadius: '100px',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'var(--accent)' : 'var(--surface)',
        color: active ? '#fff' : 'var(--text-muted)',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'DM Sans, sans-serif',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        letterSpacing: '0.01em',
      }}
    >
      {label}
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'IBM Plex Mono, monospace',
          background: active ? 'rgba(255,255,255,0.2)' : 'var(--surface-2)',
          color: active ? '#fff' : 'var(--text-subtle)',
          padding: '1px 6px',
          borderRadius: '100px',
          letterSpacing: '0.02em',
        }}
      >
        {count}
      </span>
    </button>
  );
}
