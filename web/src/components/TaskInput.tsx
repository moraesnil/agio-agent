'use client';

interface TaskInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder?: string;
  label?: string;
}

export default function TaskInput({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder = 'Descreva a tarefa em linguagem natural...',
  label,
}: TaskInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!loading && value.trim()) onSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {label && (
        <label
          style={{
            fontSize: '11px',
            fontFamily: 'IBM Plex Mono, monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={loading}
        rows={4}
        style={{
          width: '100%',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '14px 16px',
          color: 'var(--text)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          lineHeight: 1.6,
          resize: 'vertical',
          minHeight: '100px',
          transition: 'border-color 200ms',
          opacity: loading ? 0.6 : 1,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-subtle)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          Ctrl+Enter para executar
        </span>

        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="btn-pulse"
          style={{
            background: loading ? 'var(--surface-2)' : 'var(--accent)',
            color: loading ? 'var(--text-muted)' : '#0c0e14',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 22px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
            fontSize: '13.5px',
            cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 200ms, opacity 200ms',
            opacity: !value.trim() ? 0.4 : 1,
          }}
        >
          {loading ? (
            <>
              <Spinner />
              Executando...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Executar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="7" cy="7" r="5.5" stroke="var(--text-subtle)" strokeWidth="1.5" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
