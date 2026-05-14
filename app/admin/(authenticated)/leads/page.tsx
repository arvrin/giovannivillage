import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase/server';
import type { DBLead } from '@/lib/supabase/types';

interface SearchParams {
  status?: string;
  interest?: string;
  source?: string;
  q?: string;
  unassigned?: string;
}

async function loadLeads(params: SearchParams): Promise<{ leads: DBLead[]; error: string | null }> {
  try {
    const supabase = await getSupabaseServer();
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(100);
    if (params.status) query = query.eq('status', params.status);
    if (params.interest) query = query.eq('interest', params.interest);
    if (params.source) query = query.eq('source', params.source);
    if (params.unassigned === '1') query = query.is('assigned_to', null);
    if (params.q) query = query.ilike('name', `%${params.q}%`);
    const { data, error } = await query;
    if (error) throw error;
    return { leads: (data as DBLead[]) ?? [], error: null };
  } catch (err) {
    return { leads: [], error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

const STATUSES = ['new', 'contacted', 'qualified', 'proposal_sent', 'booked', 'lost', 'archived'];
const INTERESTS = ['stay', 'wedding', 'event', 'dining', 'spa', 'corporate', 'other'];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { leads, error } = await loadLeads(params);

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
            All leads
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>
            Leads {leads.length > 0 && <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--admin-text-muted)' }}>({leads.length})</span>}
          </h1>
        </div>
      </header>

      <form method="get" style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          name="q"
          defaultValue={params.q || ''}
          placeholder="Search by name…"
          style={{ padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: 'var(--admin-surface)', minWidth: 200 }}
        />
        <FilterSelect name="status" value={params.status} options={STATUSES} placeholder="All statuses" />
        <FilterSelect name="interest" value={params.interest} options={INTERESTS} placeholder="All interests" />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--admin-border)', background: 'var(--admin-accent)', color: 'var(--admin-surface)', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', cursor: 'pointer' }}>
          Apply
        </button>
        {(params.q || params.status || params.interest || params.unassigned) && (
          <Link href="/admin/leads" style={{ padding: '8px 12px', fontSize: 12, color: 'var(--admin-text-muted)', alignSelf: 'center' }}>
            Clear
          </Link>
        )}
      </form>

      {error && (
        <div style={{ padding: '14px 16px', borderRadius: 8, background: 'rgba(166,75,75,0.08)', color: 'var(--admin-error)', fontSize: 13, marginBottom: 16 }}>
          Couldn't load leads — {error}. Most likely missing Supabase env vars; see <code>ADMIN-PORTAL-SETUP.md</code>.
        </div>
      )}

      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, overflow: 'hidden' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: 14 }}>
            No leads yet. New leads from the website land here automatically.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--admin-alt)', textAlign: 'left' }}>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Interest</Th>
                <Th>Status</Th>
                <Th>Source</Th>
                <Th>Created</Th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} style={{ borderTop: '1px solid var(--admin-border)' }}>
                  <Td>
                    <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 500 }}>
                      {l.name}
                    </Link>
                  </Td>
                  <Td style={{ color: 'var(--admin-text-muted)' }}>
                    {l.email && <div>{l.email}</div>}
                    {l.phone && <div>{l.phone}</div>}
                  </Td>
                  <Td><span style={{ textTransform: 'capitalize' }}>{l.interest.replace('_', ' ')}</span></Td>
                  <Td><StatusPill status={l.status} /></Td>
                  <Td style={{ color: 'var(--admin-text-muted)', textTransform: 'capitalize' }}>{l.source.replace('_', ' ')}</Td>
                  <Td style={{ color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>{formatDate(l.created_at)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ name, value, options, placeholder }: { name: string; value?: string; options: string[]; placeholder: string }) {
  return (
    <select
      name={name}
      defaultValue={value || ''}
      style={{ padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: 'var(--admin-surface)' }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o.replace('_', ' ')}</option>
      ))}
    </select>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '10px 14px', fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>{children}</th>;
}
function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <td style={{ padding: '12px 14px', verticalAlign: 'top', ...style }}>{children}</td>;
}
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    new:           { bg: 'rgba(201,169,97,0.18)', color: '#8B6F2E' },
    contacted:     { bg: 'rgba(31,42,36,0.08)',   color: '#1F2A24' },
    qualified:     { bg: 'rgba(107,142,107,0.18)',color: '#3F5F3F' },
    proposal_sent: { bg: 'rgba(31,42,36,0.08)',   color: '#1F2A24' },
    booked:        { bg: 'rgba(107,142,107,0.30)',color: '#2E4F2E' },
    lost:          { bg: 'rgba(166,75,75,0.15)',  color: '#7C2E2E' },
    archived:      { bg: 'rgba(31,42,36,0.05)',   color: '#6E7670' },
  };
  const s = map[status] ?? map.new;
  return (
    <span style={{ padding: '3px 8px', borderRadius: 999, background: s.bg, color: s.color, fontSize: 11, fontWeight: 500, textTransform: 'capitalize' }}>
      {status.replace('_', ' ')}
    </span>
  );
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
