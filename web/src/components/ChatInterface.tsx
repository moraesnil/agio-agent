'use client';

import { useState, useRef, useEffect } from 'react';
import { useModel } from '@/lib/useModel';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [modelId] = useModel();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Placeholder for assistant response
    const assistantIndex = newMessages.length;
    setMessages([...newMessages, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, modelId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIndex] = { role: 'assistant', content: `[Erro: ${msg}]` };
          return updated;
        });
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIndex] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }

      if (!accumulated) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIndex] = { role: 'assistant', content: '[Erro: resposta vazia. Verifique a chave de API do modelo selecionado.]' };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIndex] = {
          role: 'assistant',
          content: `[Erro: ${err instanceof Error ? err.message : 'Desconhecido'}]`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
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
          Conversa livre com o agente — sem skill selecionada, contexto de todas as skills disponível.
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
        {messages.length === 0 && (
          <EmptyState />
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} isStreaming={loading && i === messages.length - 1 && msg.role === 'assistant' && msg.content === ''} />
        ))}

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
            disabled={loading}
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
              opacity: loading ? 0.7 : 1,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? 'var(--surface-2)' : 'var(--accent)',
              color: loading || !input.trim() ? 'var(--text-subtle)' : '#0c0e14',
              border: 'none',
              borderRadius: '8px',
              width: '48px',
              height: '48px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 200ms',
            }}
          >
            {loading ? (
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

function MessageBubble({ message, isStreaming }: { message: Message; isStreaming: boolean }) {
  const isUser = message.role === 'user';

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
          background: isUser ? 'var(--accent-dim)' : 'var(--surface)',
          border: `1px solid ${isUser ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
          padding: '12px 16px',
        }}
      >
        {message.content ? (
          <pre
            className={isStreaming ? '' : ''}
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
            {message.content}
            {isStreaming && (
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
        ) : (
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
        )}
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
        Inicie uma conversa
      </p>
    </div>
  );
}
