import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { DBLead, DBLeadNote, DBUser } from '@/lib/supabase/types';
import StatusChanger from './StatusChanger';
import AddNote from './AddNote';

async function loadLead(id: string): Promise<{ lead: DBLead; notes: DBLeadNote[]; team: DBUser[]; assigned: DBUser | null } | null> {
  try {
    const supabase = getSupabaseAdmin();
    const [{ data: lead }, { data: notes }, { data: team }] = await Promise.all([
      supabase.from('leads').select('*').eq('id', id).maybeSingle(),
      supabase.from('lead_notes').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
      supabase.from('users').select('*').order('name'),
    ]);
    if (!lead) return null;
    const assigned = lead.assigned_to ? (team ?? []).find((u: DBUser) => u.id === lead.assigned_to) ?? null : null;
    return { lead: lead as DBLead, notes: (notes as DBLeadNote[]) ?? [], team: (team as DBUser[]) ?? [], assigned };
  } catch {
    return null;
  }
}

export default async function LeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await loadLead(id);
  if (!result) notFound();
  const { lead, notes, team, assigned } = result;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Link href="/admin/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--admin-text-muted)', marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to leads
      </Link>

      <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
            {lead.interest.replace('_', ' ')} · {lead.source.replace('_', ' ')}
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{lead.name}</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginTop: 4 }}>
            Created {new Date(lead.created_at).toLocaleString('en-IN')}
            {assigned && <> · Assigned to {assigned.name}</>}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {lead.phone && (
            <a href={`tel:${lead.phone}`} style={pillBtn}>
              <Phone size={14} /> Call
            </a>
          )}
          {lead.phone && (
            <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={pillBtn}>
              <MessageCircle size={14} /> WhatsApp
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} style={pillBtn}>
              <Mail size={14} /> Email
            </a>
          )}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left column — content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Message">
            <p style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.7 }}>
              {lead.message || <em style={{ color: 'var(--admin-text-muted)' }}>No message provided.</em>}
            </p>
          </Card>

          <Card title="Add note">
            <AddNote leadId={lead.id} />
          </Card>

          <Card title="Timeline">
            {notes.length === 0 ? (
              <p style={{ color: 'var(--admin-text-muted)', fontSize: 13 }}>No activity yet.</p>
            ) : (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {notes.map((n) => (
                  <li key={n.id} style={{ paddingBottom: 12, borderBottom: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'capitalize', color: 'var(--admin-text-muted)' }}>
                        {n.type.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--admin-text-faint)' }}>
                        {new Date(n.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, whiteSpace: 'pre-wrap' }}>{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Right column — meta */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="Status">
            <StatusChanger leadId={lead.id} current={lead.status} />
          </Card>

          <Card title="Assignment">
            <p style={{ fontSize: 13 }}>{assigned?.name ?? <em style={{ color: 'var(--admin-text-muted)' }}>Unassigned</em>}</p>
            {/* Future: dropdown to reassign */}
          </Card>

          <Card title="Contact">
            <KV k="Email" v={lead.email} link={lead.email ? `mailto:${lead.email}` : undefined} />
            <KV k="Phone" v={lead.phone} link={lead.phone ? `tel:${lead.phone}` : undefined} />
            <KV k="Party size" v={lead.party_size?.toString()} />
            <KV k="Dates" v={lead.date_from ? `${lead.date_from}${lead.date_to ? ` → ${lead.date_to}` : ''}` : undefined} />
            <KV k="Budget" v={lead.budget_inr ? `₹${lead.budget_inr.toLocaleString('en-IN')}` : undefined} />
          </Card>
        </aside>
      </div>
    </div>
  );
}

const pillBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '8px 14px',
  borderRadius: 999,
  border: '1px solid var(--admin-border)',
  background: 'var(--admin-surface)',
  fontSize: 13, fontWeight: 500,
  color: 'var(--admin-text)',
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: 20 }}>
      <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: 12 }}>
        {title}
      </p>
      {children}
    </section>
  );
}

function KV({ k, v, link }: { k: string; v?: string | null; link?: string }) {
  if (!v) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--admin-text-muted)' }}>{k}</span>
      {link ? <a href={link} style={{ textAlign: 'right' }}>{v}</a> : <span style={{ textAlign: 'right' }}>{v}</span>}
    </div>
  );
}
