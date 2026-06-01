import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const SHEET_ID = '129tygnhM1AfgG_hmBqkCfIc6GFP1NNkguJW-52cnD_8';
const EMBED_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing&rm=embedded&widget=true&headers=false`;
const OPEN_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

export const dynamic = 'force-dynamic';

export default function SheetView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', margin: '-32px -40px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderBottom: '1px solid var(--admin-border)',
          background: 'var(--admin-surface)',
        }}
      >
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--admin-text-faint)' }}>
            Live Google Sheet
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>Banquet & Room Enquiry</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link
            href="/admin/integrations/sheets"
            style={{
              fontSize: 12,
              padding: '6px 12px',
              border: '1px solid var(--admin-border)',
              borderRadius: 999,
              color: 'var(--admin-text-muted)',
            }}
          >
            Sync status
          </Link>
          <a
            href={OPEN_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'var(--admin-accent)',
              color: 'var(--admin-surface)',
            }}
          >
            Open in Google Sheets <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <iframe
        src={EMBED_URL}
        style={{ flex: 1, width: '100%', border: 'none', background: 'white' }}
        title="Banquet & Room Enquiry sheet"
      />

      <p style={{ padding: '8px 24px', fontSize: 11, color: 'var(--admin-text-faint)', background: 'var(--admin-alt)' }}>
        Your team&rsquo;s existing sheet. Edit here OR in Google Sheets — both work. The dashboard mirrors the sheet every 30 minutes.
      </p>
    </div>
  );
}
