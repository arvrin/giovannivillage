/**
 * Google Sheet → Supabase mirror sync.
 *
 * Triggers:
 *   - POST /api/sync/sheets        (manual button from /admin/integrations/sheets)
 *   - GET  /api/sync/sheets        (Vercel Cron — protected by CRON_SECRET header)
 *
 * Behaviour:
 *   - Pulls all 5 lead tabs from the sheet
 *   - Upserts into `leads` table by (external_source='google_sheet', external_id='Tab:RowN')
 *   - Skips unchanged rows by comparing `external_row_hash`
 *   - Inserts call-activity rows as `lead_notes` of type 'call'
 *   - Records the run in `sync_runs`
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { pullSheetLeads } from '@/lib/integrations/sheets';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

async function runSync() {
  const supabase = getSupabaseAdmin();

  // Create the run row
  const { data: runRow, error: runErr } = await supabase
    .from('sync_runs')
    .insert({ source: 'google_sheet', status: 'running' })
    .select('id')
    .single();
  if (runErr) {
    return NextResponse.json({ error: runErr.message }, { status: 500 });
  }
  const runId = runRow.id;

  const finish = async (patch: Record<string, unknown>) => {
    await supabase
      .from('sync_runs')
      .update({ ...patch, finished_at: new Date().toISOString() })
      .eq('id', runId);
  };

  let pulled;
  try {
    pulled = await pullSheetLeads();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'pull failed';
    await finish({ status: 'failed', error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  const syncedAt = new Date().toISOString();

  for (const lead of pulled.leads) {
    // Look up existing by external_id — include the admin-controlled fields
    // so we know NOT to overwrite them on re-sync.
    const { data: existing } = await supabase
      .from('leads')
      .select('id, external_row_hash, status, assigned_to, metadata')
      .eq('external_source', 'google_sheet')
      .eq('external_id', lead.external_id)
      .maybeSingle();

    if (existing && existing.external_row_hash === lead.external_row_hash) {
      // No change in the sheet row since last sync
      skipped++;
      continue;
    }

    // Fields ALWAYS owned by the sheet — overwrite on every change.
    const sheetOwnedFields = {
      external_source: lead.external_source,
      external_tab: lead.external_tab,
      external_id: lead.external_id,
      external_row_hash: lead.external_row_hash,
      external_synced_at: syncedAt,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      interest: lead.interest,
      party_size: lead.party_size,
      date_from: lead.date_from,
      date_to: lead.date_to,
      message: lead.message,
    };

    if (existing) {
      // Preserve admin-controlled status & assignment. Merge metadata so
      // admin-added keys (priority, tags) survive, but sheet-owned keys refresh.
      const mergedMetadata = {
        ...(lead.metadata || {}),
        ...(existing.metadata && typeof existing.metadata === 'object'
          ? Object.fromEntries(
              Object.entries(existing.metadata as Record<string, unknown>).filter(
                ([k]) => !['sheet_row', 'sheet_tab', 'city', 'event_date_phrase',
                            'original_sales_rep', 'original_status_text', 'last_contact'].includes(k),
              ),
            )
          : {}),
      };

      const { error } = await supabase
        .from('leads')
        .update({
          ...sheetOwnedFields,
          metadata: mergedMetadata,
          // The sheet owns the enquiry date → keep created_at in sync with it.
          ...(lead.receivedAt ? { created_at: lead.receivedAt } : {}),
          // status, assigned_to NOT touched — admin owns them after first sync
        })
        .eq('id', existing.id);
      if (error) {
        console.error('[sync] update failed', existing.id, error.message);
        continue;
      }
      updated++;

      // Replace only the auto-imported call notes (not admin-added notes).
      await supabase
        .from('lead_notes')
        .delete()
        .eq('lead_id', existing.id)
        .eq('type', 'call')
        .filter('metadata->>from_sheet', 'eq', 'true');

      if (lead.callNotes.length) {
        await supabase.from('lead_notes').insert(
          lead.callNotes.map((n) => ({
            lead_id: existing.id,
            type: 'call' as const,
            body: n.body,
            metadata: { from_sheet: true, call_date: n.date },
          })),
        );
      }
    } else {
      // First-time insert — use the sheet's enquiry date as created_at so age
      // calculations & sorting reflect reality, not when we ran the sync.
      const { data: created, error } = await supabase
        .from('leads')
        .insert({
          ...sheetOwnedFields,
          status: lead.status,
          metadata: lead.metadata,
          ...(lead.receivedAt ? { created_at: lead.receivedAt } : {}),
        })
        .select('id')
        .single();
      if (error || !created) {
        console.error('[sync] insert failed', lead.external_id, error?.message);
        continue;
      }
      inserted++;
      if (lead.callNotes.length) {
        await supabase.from('lead_notes').insert(
          lead.callNotes.map((n) => ({
            lead_id: created.id,
            type: 'call' as const,
            body: n.body,
            metadata: { from_sheet: true, call_date: n.date },
          })),
        );
      }
    }
  }

  const status = inserted + updated > 0 ? 'success' : skipped === pulled.leads.length ? 'success' : 'partial';
  await finish({
    status,
    rows_read: pulled.rowsRead,
    rows_inserted: inserted,
    rows_updated: updated,
    rows_skipped: skipped,
  });

  return NextResponse.json({
    ok: true,
    run_id: runId,
    rows_read: pulled.rowsRead,
    inserted,
    updated,
    skipped,
    per_tab: pulled.perTab,
  });
}

async function isAuthorised(req: NextRequest): Promise<boolean> {
  // Cron requests: must include the Vercel cron secret header
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;

  // Browser admin button: must be a signed-in admin
  const { getSupabaseServer } = await import('@/lib/supabase/server');
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  return profile?.role === 'admin';
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }
  return runSync();
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }
  return runSync();
}
