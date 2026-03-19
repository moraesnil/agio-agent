'use client';

import { useState } from 'react';
import type { UIMessage } from 'ai';

interface AgentMessageProps {
  message: UIMessage;
  isStreaming: boolean;
}

export default function AgentMessage({ message, isStreaming }: AgentMessageProps) {
  const isUser = message.role === 'user';
  const parts = message.parts ?? [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: '4px',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'IBM Plex Mono, monospace',
          color: 'var(--text-subtle)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {isUser ? 'você' : 'agio agent'}
      </span>

      <div
        style={{
          maxWidth: '85%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {parts.map((part: any, i: number) => {
          if (part.type === 'text' && part.text) {
            return (
              <TextBubble
                key={i}
                text={part.text}
                isUser={isUser}
                showCursor={isStreaming && i === parts.length - 1}
              />
            );
          }
          if (part.type === 'tool-invocation') {
            const inv = part.toolInvocation;
            return <ToolCallCard key={inv.toolCallId} invocation={inv} />;
          }
          return null;
        })}

        {/* Empty streaming state */}
        {!isUser && parts.length === 0 && isStreaming && (
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px 12px 12px 4px',
              padding: '12px 16px',
            }}
          >
            <LoadingDots />
          </div>
        )}
      </div>
    </div>
  );
}

function TextBubble({
  text,
  isUser,
  showCursor,
}: {
  text: string;
  isUser: boolean;
  showCursor: boolean;
}) {
  return (
    <div
      style={{
        background: isUser ? 'var(--accent-dim)' : 'var(--surface)',
        border: `1px solid ${isUser ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
        padding: '12px 16px',
      }}
    >
      <pre
        style={{
          fontFamily: isUser ? 'DM Sans, sans-serif' : 'IBM Plex Mono, monospace',
          fontSize: isUser ? '14px' : '13px',
          lineHeight: isUser ? 1.6 : 1.75,
          color: 'var(--text)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          margin: 0,
        }}
      >
        {text}
        {showCursor && (
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              background: 'var(--accent)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </pre>
    </div>
  );
}

function ToolCallCard({ invocation }: { invocation: any }) {
  const [expanded, setExpanded] = useState(false);
  const isDone = invocation.state === 'result';
  const isRunning = invocation.state === 'call' || invocation.state === 'partial-call';

  const toolLabels: Record<string, string> = {
    get_skill_instructions: 'Consultando skill',
    run_skill_subtask: 'Executando subagente',
  };
  const label = toolLabels[invocation.toolName] || invocation.toolName;

  return (
    <div
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontSize: '12px',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isDone ? 'var(--green, #22c55e)' : 'var(--accent)',
            boxShadow: isRunning ? '0 0 6px var(--accent)' : undefined,
            animation: isRunning ? 'pulse 1.5s ease infinite' : undefined,
            flexShrink: 0,
          }}
        />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

        <span style={{ flex: 1 }}>
          {label}
          {invocation.args?.skillName && (
            <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>
              {invocation.args.skillName}
            </span>
          )}
        </span>

        <span style={{ color: 'var(--text-subtle)', fontSize: '10px' }}>
          {isDone ? '✓' : isRunning ? '...' : ''}
        </span>

        <span style={{ color: 'var(--text-subtle)', fontSize: '10px', transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 150ms' }}>
          ▾
        </span>
      </button>

      {expanded && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '8px 12px',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {invocation.args?.subtask && (
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-subtle)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                subtarefa
              </span>
              <pre style={{ margin: '4px 0 0', whiteSpace: 'pre-wrap', color: 'var(--text)', fontSize: '11px', lineHeight: 1.6 }}>
                {invocation.args.subtask}
              </pre>
            </div>
          )}

          {isDone && invocation.result && (
            <div>
              <span style={{ color: 'var(--text-subtle)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                resultado
              </span>
              <pre style={{ margin: '4px 0 0', whiteSpace: 'pre-wrap', color: 'var(--text)', fontSize: '11px', lineHeight: 1.6 }}>
                {typeof invocation.result === 'string'
                  ? invocation.result
                  : JSON.stringify(invocation.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: `bounce 1.2s ease infinite ${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
