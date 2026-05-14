'use client';

import { LogOut } from 'lucide-react';
import { getSupabaseBrowser } from '@/lib/supabase/browser';

export default function SignOutButton() {
  const handle = async () => {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
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
