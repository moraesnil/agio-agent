'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Skill } from '@/lib/skills';
import { useModel } from '@/lib/useModel';
import SkillItem from './SkillCard';
import TaskInput from './TaskInput';
import AgentMessage from './AgentMessage';

interface SkillGridProps {
  skills: Skill[];
}

export default function SkillGrid({ skills }: SkillGridProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [openDept, setOpenDept] = useState<string | null>(null);
  const [task, setTask] = useState('');
  const [modelId] = useModel();
  const outputRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { modelId, skillName: selectedSkill ?? undefined },
      }),
    [modelId, selectedSkill],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({ transport });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Build ordered departments with their skills
  const deptMap = new Map<string, Skill[]>();
  for (const skill of skills) {
    const dept = skill.department || 'Geral';
    if (!deptMap.has(dept)) deptMap.set(dept, []);
    deptMap.get(dept)!.push(skill);
  }
  const departments = Array.from(deptMap.entries());

  // Auto-open first department
  if (openDept === null && departments.length > 0) {
    // Use effect-free initialization via lazy check
    const firstDept = departments[0][0];
    if (openDept !== firstDept) {
      // Will be set on first render
      setTimeout(() => setOpenDept(firstDept), 0);
    }
  }

  const selectedSkillData = skills.find((s) => s.name === selectedSkill);

  const handleSelect = (name: string) => {
    setSelectedSkill(name === selectedSkill ? null : name);
    setMessages([]);
  };

  const handleDeptToggle = (dept: string) => {
    setOpenDept(openDept === dept ? null : dept);
  };

  const handleSubmit = () => {
    if (!task.trim() || isLoading) return;
    sendMessage({ text: task.trim() });
    setTask('');
  };

  // Scroll to output when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      outputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

      {/* Main layout: Sidebar + Detail */}
      <div
        style={{
          display: 'flex',
          gap: '1px',
          marginBottom: '32px',
          minHeight: '400px',
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: '280px',
            flexShrink: 0,
            background: 'var(--surface)',
            borderRadius: '12px 0 0 12px',
            border: '1px solid var(--border)',
            borderRight: 'none',
            padding: '16px 12px',
            overflowY: 'auto',
            maxHeight: '520px',
          }}
        >
          {departments.map(([dept, deptSkills]) => (
            <div key={dept} style={{ marginBottom: '4px' }}>
              {/* Department header (accordion toggle) */}
              <button
                onClick={() => handleDeptToggle(dept)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: openDept === dept ? 'rgba(232, 60, 60, 0.06)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 150ms',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: openDept === dept ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'color 150ms',
                  }}
                >
                  {dept}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    {deptSkills.length}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      color: openDept === dept ? 'var(--accent)' : 'var(--text-subtle)',
                      transition: 'transform 150ms, color 150ms',
                      transform: openDept === dept ? 'rotate(0deg)' : 'rotate(-90deg)',
                      display: 'inline-block',
                    }}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {/* Skills list (shown when dept is open) */}
              {openDept === dept && (
                <div style={{ marginTop: '2px', marginBottom: '8px' }}>
                  {deptSkills.map((skill) => (
                    <SkillItem
                      key={skill.name}
                      skill={skill}
                      selected={selectedSkill === skill.name}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail / Output panel */}
        <div
          style={{
            flex: 1,
            background: 'var(--surface)',
            borderRadius: '0 12px 12px 0',
            border: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {messages.length > 0 ? (
            /* Agent messages replace detail panel */
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages
                .filter((m) => m.role === 'assistant')
                .map((msg, i, arr) => (
                  <AgentMessage
                    key={msg.id}
                    message={msg}
                    isStreaming={isLoading && i === arr.length - 1}
                  />
                ))}
            </div>
          ) : selectedSkillData ? (
            /* Skill detail */
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent)',
                  marginBottom: '6px',
                }}
              >
                {selectedSkillData.name
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--text-subtle)',
                  marginBottom: '16px',
                  letterSpacing: '0.04em',
                }}
              >
                v{String(selectedSkillData.metadata?.version || '0.1.0')} · {selectedSkillData.department}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  margin: '0 0 20px 0',
                }}
              >
                {selectedSkillData.description}
              </p>

              {/* Sections preview */}
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-subtle)',
                    marginBottom: '8px',
                  }}
                >
                  Seções
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Goal', 'Required Inputs', 'Workflow', 'Anti-patterns', 'Output Template', 'Quality Gate', 'Example'].map(
                    (section) => (
                      <span
                        key={section}
                        style={{
                          fontSize: '11px',
                          fontFamily: 'IBM Plex Mono, monospace',
                          color: 'var(--text-muted)',
                          background: 'var(--surface-2)',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {section}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="var(--text-subtle)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  color: 'var(--text-subtle)',
                  fontSize: '13px',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                Selecione uma skill na sidebar
                <br />
                <span style={{ fontSize: '12px' }}>ou execute em modo geral</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Task input — separate section below */}
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
            {selectedSkillData ? `skill: ${selectedSkillData.name}` : 'modo agente'}
          </span>

          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              limpar
            </button>
          )}
        </div>

        <TaskInput
          value={task}
          onChange={setTask}
          onSubmit={handleSubmit}
          loading={isLoading}
          label="Descreva sua tarefa"
          placeholder={
            selectedSkillData
              ? `Ex: "${selectedSkillData.description.slice(0, 80)}..."`
              : 'Descreva a tarefa em linguagem natural...'
          }
        />

        {/* Agent messages output */}
        {(messages.length > 0 || error) && (
          <div ref={outputRef} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages
              .filter((m) => m.role === 'assistant')
              .map((msg, i, arr) => (
                <AgentMessage
                  key={msg.id}
                  message={msg}
                  isStreaming={isLoading && i === arr.length - 1}
                />
              ))}

            {error && (
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid #ef4444',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#ef4444',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '12px',
                }}
              >
                {error.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
