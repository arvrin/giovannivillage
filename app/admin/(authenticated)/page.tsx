import Link from 'next/link';
import { ExternalLink, Calendar, FileSpreadsheet, Building2 } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabase/server';

interface StatBox {
  label: string;
  value: number;
  href?: string;
  tone?: 'neutral' | 'brass';
}

async function loadStats(): Promise<{ stats: StatBox[]; recent: Array<{ id: string; name: string; interest: string; status: string; created_at: string }> }> {
  try {
    const supabase = await getSupabaseServer();
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const sinceIso = since.toISOString();

    const [{ count: newCount }, { count: unassigned }, { count: weekCount }, { count: bookedCount }] =
      await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).is('assigned_to', null).neq('status', 'archived'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', sinceIso),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'booked').gte('created_at', sinceIso),
      ]);

    const { data: recent } = await supabase
      .from('leads')
      .select('id, name, interest, status, created_at')
      .order('created_at', { ascending: false })
      .limit(8);

    return {
      stats: [
        { label: 'New leads', value: newCount ?? 0, href: '/admin/leads?status=new', tone: 'brass' },
        { label: 'Unassigned', value: unassigned ?? 0, href: '/admin/leads?unassigned=1' },
        { label: 'This week', value: weekCount ?? 0 },
        { label: 'Booked (7d)', value: bookedCount ?? 0 },
      ],
      recent: recent ?? [],
    };
  } catch {
    return {
      stats: [
        { label: 'New leads', value: 0, tone: 'brass' },
        { label: 'Unassigned', value: 0 },
        { label: 'This week', value: 0 },
        { label: 'Booked (7d)', value: 0 },
      ],
      recent: [],
    };
  }
}

export default async function AdminDashboard() {
  const { stats, recent } = await loadStats();

  return (
    <div>
      <header style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
          Overview
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>Dashboard</h1>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map((s) => {
          const inner = (
            <div
              style={{
                background: 'var(--admin-surface)',
                border: '1px solid var(--admin-border)',
                borderRadius: 10,
                padding: '20px 22px',
                cursor: s.href ? 'pointer' : 'default',
                transition: 'border-color 150ms ease',
              }}
            >
              <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 32, fontWeight: 600, color: s.tone === 'brass' ? 'var(--admin-brass)' : 'var(--admin-text)' }}>
                {s.value}
              </p>
            </div>
          );
          return s.href ? <Link key={s.label} href={s.href} style={{ display: 'block' }}>{inner}</Link> : <div key={s.label}>{inner}</div>;
        })}
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Tools & integrations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          <ToolCard
            icon={Calendar}
            title="Banquet Management"
            description="Event bookings, table plans, banquet settlements — by Jivaha."
            href="https://app.giovannivillage.com/"
            external
          />
          <ToolCard
            icon={FileSpreadsheet}
            title="Live Lead Sheet"
            description="Banquet & Room Enquiry — synced from Google Sheets."
            href="/admin/leads/sheet"
          />
          <ToolCard
            icon={Building2}
            title="IPMS (Room PMS)"
            description="Reservations, room status, guest folios."
            href="https://live.ipms247.com/booking/roomlist-giovannivillageresortspa-be"
            external
          />
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent leads</h2>
          <Link href="/admin/leads" style={{ fontSize: 13, color: 'var(--admin-text-muted)' }}>
            View all →
          </Link>
        </div>

        <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, overflow: 'hidden' }}>
          {recent.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: 14 }}>
              No leads yet. The public contact form posts here.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--admin-alt)', textAlign: 'left' }}>
                  <Th>Name</Th>
                  <Th>Interest</Th>
                  <Th>Status</Th>
                  <Th>When</Th>
                </tr>
              </thead>
              <tbody>
                {recent.map((l) => (
                  <tr key={l.id} style={{ borderTop: '1px solid var(--admin-border)' }}>
                    <Td>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 500 }}>
                        {l.name}
                      </Link>
                    </Td>
                    <Td><span style={{ textTransform: 'capitalize' }}>{l.interest.replace('_', ' ')}</span></Td>
                    <Td><StatusPill status={l.status} /></Td>
                    <Td style={{ color: 'var(--admin-text-muted)' }}>{timeAgo(l.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  icon: Icon,
  title,
  description,
  href,
  external,
  disabled,
  badge,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
}) {
  const inner = (
    <div
      style={{
        position: 'relative',
        background: 'var(--admin-surface)',
        border: '1px solid var(--admin-border)',
        borderRadius: 10,
        padding: 18,
        display: 'flex',
        gap: 14,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        height: '100%',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 38,
          height: 38,
          borderRadius: 8,
          background: 'var(--admin-alt)',
          color: 'var(--admin-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={18} strokeWidth={1.6} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <p style={{ fontSize: 14, fontWeight: 500 }}>{title}</p>
          {external && !disabled && (
            <ExternalLink size={12} style={{ color: 'var(--admin-text-muted)' }} strokeWidth={1.6} />
          )}
        </div>
        <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', lineHeight: 1.5 }}>{description}</p>
        {badge && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '2px 8px',
              borderRadius: 999,
              background: 'rgba(31,42,36,0.06)',
              color: 'var(--admin-text-muted)',
              fontSize: 10,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
  if (disabled) return inner;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      style={{ display: 'block' }}
    >
      {inner}
    </a>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '10px 14px', fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>{children}</th>;
}
function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <td style={{ padding: '12px 14px', ...style }}>{children}</td>;
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
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
