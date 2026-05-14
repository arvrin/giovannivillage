import Link from 'next/link';
import { ExternalLink, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabase/server';
import SyncNowButton from './SyncNowButton';

interface SyncRun {
  id: string;
  source: string;
  status: 'running' | 'success' | 'partial' | 'failed';
  rows_read: number | null;
  rows_inserted: number | null;
  rows_updated: number | null;
  rows_skipped: number | null;
  error: string | null;
  started_at: string;
  finished_at: string | null;
}

async function loadData(): Promise<{
  runs: SyncRun[];
  totalLeads: number;
  serviceAccountEmail: string | null;
  envConfigured: boolean;
}> {
  let totalLeads = 0;
  let runs: SyncRun[] = [];
  try {
    const supabase = await getSupabaseServer();
    const [{ count }, { data }] = await Promise.all([
      supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('external_source', 'google_sheet'),
      supabase
        .from('sync_runs')
        .select('*')
        .eq('source', 'google_sheet')
        .order('started_at', { ascending: false })
        .limit(20),
    ]);
    totalLeads = count ?? 0;
    runs = (data as SyncRun[]) ?? [];
  } catch {
    // env not configured
  }

  // Try to extract the service account email from env (server-side only)
  let serviceAccountEmail: string | null = null;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      serviceAccountEmail = parsed.client_email ?? null;
    } catch {
      // malformed env, leave null
    }
  }
  const envConfigured = Boolean(serviceAccountEmail);

  return { runs, totalLeads, serviceAccountEmail, envConfigured };
}

export const dynamic = 'force-dynamic';

export default async function SheetIntegrationStatus() {
  const { runs, totalLeads, serviceAccountEmail, envConfigured } = await loadData();
  const lastRun = runs[0];

  return (
    <div style={{ maxWidth: 980 }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
          Integration
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>Google Sheet sync</h1>
        <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginTop: 6 }}>
          Mirrors the Banquet & Room Enquiry sheet into this admin every 30 minutes.
          The team continues editing the sheet as today.
        </p>
      </header>

      {!envConfigured && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 10,
            background: 'rgba(166,75,75,0.08)',
            border: '1px solid rgba(166,75,75,0.25)',
            color: 'var(--admin-text)',
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          <strong>Setup required.</strong> Add <code>GOOGLE_SERVICE_ACCOUNT_KEY</code> to{' '}
          <code>.env.local</code> (single-line JSON of your Google Cloud service account).
          Follow the steps in <code>ADMIN-PORTAL-SETUP.md §8</code>, then refresh this page.
        </div>
      )}

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
        <Stat label="Status" value={envConfigured ? 'Connected' : 'Not connected'} tone={envConfigured ? 'good' : 'bad'} />
        <Stat label="Leads mirrored" value={totalLeads.toLocaleString()} />
        <Stat
          label="Last sync"
          value={lastRun ? timeAgo(lastRun.started_at) : '—'}
          tone={lastRun?.status === 'failed' ? 'bad' : lastRun?.status === 'partial' ? 'warn' : 'good'}
        />
        <Stat label="Schedule" value="Every 30 min" />
      </section>

      {envConfigured && (
        <section style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <SyncNowButton />
          <a
            href={`https://docs.google.com/spreadsheets/d/129tygnhM1AfgG_hmBqkCfIc6GFP1NNkguJW-52cnD_8/edit`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 999,
              border: '1px solid var(--admin-border)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--admin-text)',
            }}
          >
            Open the sheet <ExternalLink size={12} />
          </a>
          <Link
            href="/admin/leads/sheet"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: 999,
              border: '1px solid var(--admin-border)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--admin-text)',
            }}
          >
            View embedded
          </Link>
        </section>
      )}

      {serviceAccountEmail && (
        <section
          style={{
            background: 'var(--admin-surface)',
            border: '1px solid var(--admin-border)',
            borderRadius: 10,
            padding: 18,
            marginBottom: 28,
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: 6 }}>
            Service account
          </p>
          <p style={{ fontSize: 13 }}>
            Sheet must be shared with: <code>{serviceAccountEmail}</code>
          </p>
          <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 6 }}>
            Open the sheet → Share → paste this email → Viewer permission → Send.
          </p>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recent sync runs</h2>
        <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, overflow: 'hidden' }}>
          {runs.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', fontSize: 13, color: 'var(--admin-text-muted)' }}>
              No sync runs yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--admin-alt)', textAlign: 'left' }}>
                  <Th>Started</Th>
                  <Th>Status</Th>
                  <Th align="right">Read</Th>
                  <Th align="right">+ Inserted</Th>
                  <Th align="right">Updated</Th>
                  <Th align="right">Skipped</Th>
                  <Th>Duration</Th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.id} style={{ borderTop: '1px solid var(--admin-border)' }}>
                    <Td>{new Date(r.started_at).toLocaleString('en-IN')}</Td>
                    <Td>
                      <StatusPill status={r.status} />
                      {r.error && (
                        <p style={{ fontSize: 11, color: 'var(--admin-error)', marginTop: 4, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {r.error}
                        </p>
                      )}
                    </Td>
                    <Td align="right">{r.rows_read ?? 0}</Td>
                    <Td align="right" style={{ color: 'var(--admin-success)' }}>{r.rows_inserted ?? 0}</Td>
                    <Td align="right">{r.rows_updated ?? 0}</Td>
                    <Td align="right" style={{ color: 'var(--admin-text-muted)' }}>{r.rows_skipped ?? 0}</Td>
                    <Td style={{ color: 'var(--admin-text-muted)' }}>
                      {r.finished_at
                        ? `${Math.round((new Date(r.finished_at).getTime() - new Date(r.started_at).getTime()) / 1000)}s`
                        : '—'}
                    </Td>
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

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' | 'warn' }) {
  const color = tone === 'good' ? 'var(--admin-success)' : tone === 'bad' ? 'var(--admin-error)' : tone === 'warn' ? 'var(--admin-brass)' : 'var(--admin-text)';
  return (
    <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '14px 16px' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontSize: 18, fontWeight: 600, color }}>{value}</p>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <th style={{ padding: '10px 14px', textAlign: align || 'left', fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>{children}</th>;
}
function Td({ children, align, style }: { children: React.ReactNode; align?: 'left' | 'right'; style?: React.CSSProperties }) {
  return <td style={{ padding: '10px 14px', textAlign: align || 'left', verticalAlign: 'top', ...style }}>{children}</td>;
}

function StatusPill({ status }: { status: SyncRun['status'] }) {
  const map = {
    running: { bg: 'rgba(31,42,36,0.08)', color: 'var(--admin-text)', icon: <Loader2 size={11} /> },
    success: { bg: 'rgba(107,142,107,0.18)', color: '#3F5F3F', icon: <CheckCircle2 size={11} /> },
    partial: { bg: 'rgba(201,169,97,0.18)', color: '#8B6F2E', icon: <AlertCircle size={11} /> },
    failed: { bg: 'rgba(166,75,75,0.15)', color: '#7C2E2E', icon: <AlertCircle size={11} /> },
  } as const;
  const s = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: s.bg, color: s.color, fontSize: 11, fontWeight: 500, textTransform: 'capitalize' }}>
      {s.icon} {status}
    </span>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
