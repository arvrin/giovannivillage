'use client';

import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  const handle = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } finally {
      // Hard navigation so the cleared cookie is reflected on the next request.
      window.location.href = '/admin/login';
    }
  };
  return (
    <button
      onClick={handle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        background: 'transparent',
        border: '1px solid var(--admin-border)',
        borderRadius: 6,
        fontSize: 12,
        color: 'var(--admin-text-muted)',
        cursor: 'pointer',
        alignSelf: 'flex-start',
      }}
    >
      <LogOut size={12} />
      Sign out
    </button>
  );
}
