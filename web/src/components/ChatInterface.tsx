'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useModel } from '@/lib/useModel';
import AgentMessage from './AgentMessage';

export default function ChatInterface() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [modelId] = useModel();
  const [input, setInput] = useState('');

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat', body: { modelId } }),
    [modelId],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({ transport });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 56px)',
      }}
    >
      {/* Heading */}
      <div style={{ padding: '28px 0 20px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Chat <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Livre</span>
        </h1>
        <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>
          Conversa livre com o agente — modo agente com tools e subagentes.
        </p>
      </div>

      {/* Message history */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.length === 0 && <EmptyState />}

        {messages.map((msg, i) => (
          <AgentMessage
            key={msg.id}
            message={msg}
            isStreaming={isLoading && i === messages.length - 1 && msg.role === 'assistant'}
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

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva sua mensagem..."
            disabled={isLoading}
            rows={3}
            style={{
              flex: 1,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              lineHeight: 1.5,
              resize: 'none',
              opacity: isLoading ? 0.7 : 1,
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              background: isLoading || !input.trim() ? 'var(--surface-2)' : 'var(--accent)',
              color: isLoading || !input.trim() ? 'var(--text-subtle)' : '#0c0e14',
              border: 'none',
              borderRadius: '8px',
              width: '48px',
              height: '48px',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 200ms',
            }}
          >
            {isLoading ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <circle cx="8" cy="8" r="6" stroke="var(--text-subtle)" strokeWidth="1.5" />
                <path d="M8 2A6 6 0 0 1 14 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', fontFamily: 'IBM Plex Mono, monospace' }}>
          Ctrl+Enter para enviar
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        opacity: 0.5,
        padding: '60px 0',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c.83 0 1.5.67 1.5 1.5S10.83 8 10 8s-1.5-.67-1.5-1.5S9.17 5 10 5zm0 10c-2 0-3.77-1.03-4.8-2.59.02-.97 3.21-1.5 4.8-1.5 1.58 0 4.77.53 4.8 1.5C13.77 13.97 12 15 10 15z"
            fill="var(--text-muted)"
          />
        </svg>
      </div>
      <p style={{ margin: 0, fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
        Modo agente ativo — inicie uma conversa
      </p>
    </div>
  );
}
