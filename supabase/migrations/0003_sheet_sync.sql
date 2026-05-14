-- ============================================================================
-- Google Sheet sync — read-only mirror of the Banquet & Room Enquiry sheet
-- The sheet remains the system of record for sales-team + chatbot leads.
-- Website-form leads still go directly to `leads`. Sheet leads are mirrored
-- here on a schedule (Vercel Cron) for analytics + dashboards.
-- ============================================================================

-- ── New enum values ─────────────────────────────────────────────────────────
-- Enum value additions must each be a top-level statement; cannot be wrapped
-- in a single transaction with later commands that reference them.

alter type lead_interest add value if not exists 'experience';
alter type lead_source add value if not exists 'ai_chatbot';
alter type lead_source add value if not exists 'phone_302';
alter type lead_source add value if not exists 'sheet_manual';
commit;

-- ── Columns on `leads` to track external origin ─────────────────────────────
alter table public.leads
  add column if not exists external_source text,   -- e.g. 'google_sheet'
  add column if not exists external_tab text,      -- e.g. 'Banquets Enquiry'
  add column if not exists external_id text,       -- 'tab:row_number' or any stable ID
  add column if not exists external_row_hash text, -- to detect changes cheaply
  add column if not exists external_synced_at timestamptz;

-- Uniqueness for upserting from sheet
create unique index if not exists leads_external_uniq
  on public.leads (external_source, external_id)
  where external_source is not null;

create index if not exists leads_external_synced_at_idx
  on public.leads (external_synced_at desc);

-- ── Sync run log ────────────────────────────────────────────────────────────
create type sync_status as enum ('running', 'success', 'partial', 'failed');

create table if not exists public.sync_runs (
  id uuid primary key default uuid_generate_v4(),
  source text not null,                  -- 'google_sheet'
  status sync_status not null default 'running',
  rows_read int default 0,
  rows_inserted int default 0,
  rows_updated int default 0,
  rows_skipped int default 0,
  error text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists sync_runs_started_idx on public.sync_runs(started_at desc);

alter table public.sync_runs enable row level security;

create policy "sync_runs_read_signed_in" on public.sync_runs
  for select using (auth.uid() is not null);

create policy "sync_runs_admin_write" on public.sync_runs
  for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');
