import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabase/server';
import type { DBSop } from '@/lib/supabase/types';

async function loadSop(slug: string): Promise<DBSop | null> {
  try {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.from('sops').select('*').eq('slug', slug).maybeSingle();
    return (data as DBSop) ?? null;
  } catch {
    return null;
  }
}

/** Very lightweight markdown renderer — sufficient for SOP body content.
 *  No external dep. Handles headings, bullets, bold, italic, code. */
function renderMd(md: string): string {
  // Escape HTML
  const safe = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return safe
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\s*-\s+(.*)$/gim, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>\s*)+/g, '<ul>$&</ul>')
    .replace(/^\s*\d+\.\s+(.*)$/gim, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .split(/\n\n+/)
    .map((para) =>
      /^<(h\d|ul|ol|li|p|blockquote|pre)/.test(para.trim())
        ? para
        : `<p>${para.replace(/\n/g, '<br/>')}</p>`,
    )
    .join('\n');
}

export default async function SopDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sop = await loadSop(slug);
  if (!sop) notFound();

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <Link href="/admin/sops" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--admin-text-muted)', marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to SOPs
      </Link>

      <header style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
          {sop.category.replace('_', ' ')}
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 600, marginTop: 4, lineHeight: 1.2 }}>{sop.title}</h1>
        {sop.summary && (
          <p style={{ fontSize: 15, color: 'var(--admin-text-muted)', marginTop: 8 }}>{sop.summary}</p>
        )}
        <p style={{ fontSize: 11, color: 'var(--admin-text-faint)', marginTop: 8 }}>
          Last updated {new Date(sop.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </header>

      <article
        className="sop-body"
        style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '28px 32px', fontSize: 14, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: renderMd(sop.body_md) }}
      />

      <style>{`
        .sop-body h1 { font-size: 22px; font-weight: 600; margin: 18px 0 10px; }
        .sop-body h2 { font-size: 17px; font-weight: 600; margin: 20px 0 8px; color: var(--admin-text); }
        .sop-body h3 { font-size: 14px; font-weight: 600; margin: 14px 0 6px; color: var(--admin-text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .sop-body p { margin: 10px 0; }
        .sop-body ul, .sop-body ol { margin: 10px 0 10px 22px; }
        .sop-body li { margin: 4px 0; }
        .sop-body code { background: var(--admin-alt); padding: 1px 6px; border-radius: 4px; font-size: 12.5px; }
        .sop-body strong { font-weight: 600; }
      `}</style>
    </div>
  );
}
