'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <AdminLoginInner />
    </Suspense>
  );
}

function AdminLoginInner() {
  const search = useSearchParams();
  const next = search.get('next') || '/admin';
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Could not sign in.');
      }
      // Hard navigation so the new cookie is sent on the very first request.
      window.location.href = next;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
      setStatus('error');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--admin-surface)',
          border: '1px solid var(--admin-border)',
          borderRadius: 12,
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(31,42,36,0.06)',
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--admin-text-faint)',
            marginBottom: 8,
          }}
        >
          Giovanni Admin
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Sign in</h1>
        <p style={{ color: 'var(--admin-text-muted)', marginBottom: 28, fontSize: 14 }}>
          Enter your allow-listed mobile number and the admin access code to sign in.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="phone"
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 6,
              color: 'var(--admin-text-muted)',
            }}
          >
            Mobile number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="9176084110"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setError(null);
              }
            }}
            disabled={status === 'sending'}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--admin-border)',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              background: 'var(--admin-bg)',
              outline: 'none',
            }}
          />

          <label
            htmlFor="code"
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              margin: '16px 0 6px',
              color: 'var(--admin-text-muted)',
            }}
          >
            Access code
          </label>
          <input
            id="code"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setError(null);
              }
            }}
            disabled={status === 'sending'}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--admin-border)',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              background: 'var(--admin-bg)',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              width: '100%',
              marginTop: 16,
              padding: '12px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--admin-accent)',
              color: 'var(--admin-surface)',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.04em',
              cursor: status === 'sending' ? 'wait' : 'pointer',
            }}
          >
            {status === 'sending' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: 14,
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(166,75,75,0.08)',
              border: '1px solid rgba(166,75,75,0.25)',
              color: 'var(--admin-error)',
              fontSize: 13,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
