'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/browser';

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
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const envMissing =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/admin/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send link');
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
          We'll email you a one-time link. Click it to enter the portal.
        </p>

        {envMissing && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              background: 'rgba(166,75,75,0.08)',
              border: '1px solid rgba(166,75,75,0.25)',
              color: 'var(--admin-error)',
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            <strong>Setup required.</strong> Add{' '}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your <code>.env.local</code>.
            See <code>ADMIN-PORTAL-SETUP.md</code>.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 6,
              color: 'var(--admin-text-muted)',
            }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@giovannivillage.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'sending' || status === 'sent'}
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
            disabled={status === 'sending' || status === 'sent' || envMissing}
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
              opacity: envMissing ? 0.5 : 1,
            }}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Check your inbox' : 'Send magic link'}
          </button>
        </form>

        {status === 'sent' && (
          <p
            style={{
              marginTop: 18,
              padding: '12px 14px',
              borderRadius: 8,
              background: 'rgba(107,142,107,0.10)',
              color: 'var(--admin-success)',
              fontSize: 13,
            }}
          >
            ✓ Link sent. Open the email and click the link — it'll bring you right back here.
          </p>
        )}

        {error && (
          <p style={{ marginTop: 14, color: 'var(--admin-error)', fontSize: 13 }}>
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
