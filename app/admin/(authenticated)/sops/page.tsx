import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabase/server';
import type { DBSop, SopCategory } from '@/lib/supabase/types';

const CATEGORY_LABEL: Record<SopCategory, string> = {
  reservations: 'Reservations',
  front_desk: 'Front Desk',
  housekeeping: 'Housekeeping',
  food_beverage: 'Food & Beverage',
  kitchen: 'Kitchen',
  spa: 'Spa & Wellness',
  events: 'Events & Weddings',
  experiences: 'Experiences',
  maintenance: 'Maintenance',
  security: 'Security',
  finance: 'Finance',
  hr: 'HR',
  general: 'General',
};

async function loadSops(): Promise<DBSop[]> {
  try {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.from('sops').select('*').order('category').order('title');
    return (data as DBSop[]) ?? [];
  } catch {
    return [];
  }
}

export default async function SopsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const all = await loadSops();
  const sops = q
    ? all.filter((s) => s.title.toLowerCase().includes(q.toLowerCase()) || s.body_md.toLowerCase().includes(q.toLowerCase()))
    : all;

  const grouped = sops.reduce<Record<string, DBSop[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
          Knowledge base
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>SOPs</h1>
        <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginTop: 6 }}>
          Standard Operating Procedures across every department. Admins can edit; staff can read.
        </p>
      </header>

      <form method="get" style={{ marginBottom: 24 }}>
        <input
          name="q"
          defaultValue={q || ''}
          placeholder="Search SOPs…"
          style={{
            width: '100%',
            maxWidth: 480,
            padding: '10px 14px',
            border: '1px solid var(--admin-border)',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: 'inherit',
            background: 'var(--admin-surface)',
          }}
        />
      </form>

      {sops.length === 0 ? (
        <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: 14, background: 'var(--admin-surface)', borderRadius: 10, border: '1px solid var(--admin-border)' }}>
          {q ? `No SOPs match "${q}".` : 'No SOPs yet. Run the seed migration to populate the library.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <h2 style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: 8, fontWeight: 600 }}>
                {CATEGORY_LABEL[cat as SopCategory]} · {items.length}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {items.map((s) => (
                  <Link
                    key={s.id}
                    href={`/admin/sops/${s.slug}`}
                    style={{
                      display: 'flex',
                      gap: 12,
                      padding: '14px 16px',
                      background: 'var(--admin-surface)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: 10,
                    }}
                  >
                    <BookOpen size={16} style={{ marginTop: 2, color: 'var(--admin-text-muted)', flexShrink: 0 }} strokeWidth={1.5} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.title}</p>
                      {s.summary && <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', lineHeight: 1.5 }}>{s.summary}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
