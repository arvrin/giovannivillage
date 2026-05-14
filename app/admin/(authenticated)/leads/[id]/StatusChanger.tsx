'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/browser';
import type { LeadStatus } from '@/lib/supabase/types';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal_sent', 'booked', 'lost', 'archived'];

export default function StatusChanger({ leadId, current }: { leadId: string; current: LeadStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(current);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const update = async (next: LeadStatus) => {
    setError(null);
    setStatus(next);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.from('leads').update({ status: next }).eq('id', leadId);
    if (error) {
      setError(error.message);
      setStatus(current);
      return;
    }
    startTransition(() => router.refresh());
  };

  return (
    <div>
      <select
        value={status}
        onChange={(e) => update(e.target.value as LeadStatus)}
        disabled={isPending}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid var(--admin-border)',
          borderRadius: 8,
          fontSize: 13,
          background: 'var(--admin-bg)',
          fontFamily: 'inherit',
        }}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s.replace('_', ' ')}</option>
        ))}
      </select>
      {error && <p style={{ color: 'var(--admin-error)', fontSize: 12, marginTop: 6 }}>{error}</p>}
    </div>
  );
}
