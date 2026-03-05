'use client';

interface StreamingOutputProps {
  output: string;
  loading: boolean;
  error?: string;
}

export default function StreamingOutput({ output, loading, error }: StreamingOutputProps) {
  if (!output && !loading && !error) return null;

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: loading ? 'var(--accent)' : error ? '#ef4444' : 'var(--green)',
              boxShadow: loading ? '0 0 8px var(--accent)' : undefined,
              animation: loading ? 'pulse 1.5s ease infinite' : undefined,
            }}
          />
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {loading ? 'gerando...' : error ? 'erro' : 'concluído'}
          </span>
        </div>

        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            title="Copiar"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              padding: '3px 8px',
              cursor: 'pointer',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            copiar
          </button>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 24px',
          maxHeight: '520px',
          overflowY: 'auto',
        }}
      >
        {error ? (
          <div
            style={{
              color: '#ef4444',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '13px',
            }}
          >
            {error}
          </div>
        ) : (
          <pre
            className={loading && output ? 'streaming-cursor' : ''}
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '13px',
              lineHeight: 1.75,
              color: 'var(--text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}
          >
            {output || (loading ? '' : '')}
          </pre>
        )}
      </div>
    </div>
  );
}
