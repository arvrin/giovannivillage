'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/browser';
import type { LeadNoteType } from '@/lib/supabase/types';

const TYPES: LeadNoteType[] = ['note', 'call', 'email', 'whatsapp'];

export default function AddNote({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [type, setType] = useState<LeadNoteType>('note');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = getSupabaseBrowser();
    const { data: userData } = await supabase.auth.getUser();
    const author_id = userData.user?.id;

    const { error } = await supabase.from('lead_notes').insert({
      lead_id: leadId,
      author_id,
      type,
      body: body.trim(),
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    setBody('');
    setIsSubmitting(false);
    startTransition(() => router.refresh());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid var(--admin-border)',
              background: type === t ? 'var(--admin-accent)' : 'var(--admin-surface)',
              color: type === t ? 'var(--admin-surface)' : 'var(--admin-text)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="Spoke to Priya, confirmed Dec 14-16. Sending proposal by EOD…"
        style={{
          padding: '10px 12px',
          border: '1px solid var(--admin-border)',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: 'inherit',
          background: 'var(--admin-bg)',
          resize: 'vertical',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {error && <p style={{ color: 'var(--admin-error)', fontSize: 12 }}>{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting || !body.trim()}
          style={{
            marginLeft: 'auto',
            padding: '8px 18px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--admin-accent)',
            color: 'var(--admin-surface)',
            fontSize: 12,
            fontWeight: 500,
            cursor: isSubmitting ? 'wait' : 'pointer',
            opacity: !body.trim() ? 0.5 : 1,
          }}
        >
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}
