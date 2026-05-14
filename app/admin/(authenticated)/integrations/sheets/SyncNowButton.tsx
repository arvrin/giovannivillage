'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SyncNowButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [_, startTransition] = useTransition();

  const run = async () => {
    setState('running');
    setMessage(null);
    try {
      const res = await fetch('/api/sync/sheets', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'sync failed');
      setState('success');
      setMessage(`+${data.inserted} new, ${data.updated} updated, ${data.skipped} unchanged`);
      startTransition(() => router.refresh());
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'sync failed');
    }
  };

  const Icon = state === 'success' ? CheckCircle2 : state === 'error' ? AlertCircle : RefreshCw;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button
        onClick={run}
        disabled={state === 'running'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 18px',
          borderRadius: 999,
          border: 'none',
          background: 'var(--admin-brass)',
          color: 'var(--admin-text)',
          fontSize: 12,
          fontWeight: 500,
          cursor: state === 'running' ? 'wait' : 'pointer',
          letterSpacing: '0.04em',
        }}
      >
        <Icon size={14} className={state === 'running' ? 'spin' : ''} />
        {state === 'running' ? 'Syncing…' : 'Sync now'}
      </button>
      {message && (
        <span
          style={{
            fontSize: 12,
            color: state === 'error' ? 'var(--admin-error)' : 'var(--admin-text-muted)',
          }}
        >
          {message}
        </span>
      )}
      <style>{`.spin { animation: sp 1s linear infinite; } @keyframes sp { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
