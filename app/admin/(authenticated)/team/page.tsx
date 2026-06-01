import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { DBUser } from '@/lib/supabase/types';

async function loadTeam(): Promise<DBUser[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from('users').select('*').order('name');
    return (data as DBUser[]) ?? [];
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const team = await loadTeam();

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
          Team
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>Team members</h1>
        <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginTop: 6 }}>
          Anyone signed in via magic link appears here. Admins can change roles.
        </p>
      </header>

      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, overflow: 'hidden' }}>
        {team.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: 14 }}>
            No team members yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--admin-alt)', textAlign: 'left' }}>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {team.map((u) => (
                <tr key={u.id} style={{ borderTop: '1px solid var(--admin-border)' }}>
                  <td style={td}><strong>{u.name}</strong></td>
                  <td style={td}>{u.email}</td>
                  <td style={td}><span style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                  <td style={td}>{new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: 'var(--admin-text-muted)' }}>
        To add someone: add their 10-digit mobile number to the <code>ADMIN_PHONE_WHITELIST</code> env var on Vercel and redeploy. They&rsquo;ll then be able to sign in at <strong>/admin/login</strong>.
      </p>
    </div>
  );
}

const th: React.CSSProperties = { padding: '10px 14px', fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)' };
const td: React.CSSProperties = { padding: '12px 14px', verticalAlign: 'middle' };
