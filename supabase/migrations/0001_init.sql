-- ============================================================================
-- Giovanni Village Admin Portal — Phase 1 schema
-- Project: ahlejuecgdwrmfexcamz
-- Run order:
--   1. Paste this entire file into the Supabase SQL editor and Run.
--   2. Then run 0002_seed_sops.sql to populate the SOP library.
-- ============================================================================

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "btree_gist";  -- for daterange exclusion later

-- ── Enums ───────────────────────────────────────────────────────────────────
create type user_role as enum ('admin', 'concierge', 'planner', 'staff');

create type lead_source as enum (
  'website', 'whatsapp', 'instagram', 'phone', 'walk_in', 'partner', 'referral'
);

create type lead_interest as enum (
  'stay', 'wedding', 'event', 'dining', 'spa', 'corporate', 'other'
);

create type lead_status as enum (
  'new', 'contacted', 'qualified', 'proposal_sent', 'booked', 'lost', 'archived'
);

create type lead_note_type as enum (
  'note', 'call', 'email', 'whatsapp', 'status_change', 'file', 'assignment'
);

create type sop_category as enum (
  'reservations', 'front_desk', 'housekeeping', 'food_beverage', 'kitchen',
  'spa', 'events', 'experiences', 'maintenance', 'security', 'finance', 'hr', 'general'
);

-- ── Tables ──────────────────────────────────────────────────────────────────

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role user_role not null default 'staff',
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  source lead_source not null default 'website',
  name text not null,
  email text,
  phone text,
  interest lead_interest not null default 'other',
  party_size int,
  date_from date,
  date_to date,
  budget_inr int,
  message text,
  status lead_status not null default 'new',
  assigned_to uuid references public.users(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_idx on public.leads(status);
create index leads_assigned_to_idx on public.leads(assigned_to);
create index leads_created_at_idx on public.leads(created_at desc);
create index leads_interest_idx on public.leads(interest);
create index leads_source_idx on public.leads(source);

create table public.lead_notes (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid references public.users(id) on delete set null,
  type lead_note_type not null default 'note',
  body text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index lead_notes_lead_idx on public.lead_notes(lead_id, created_at desc);

create table public.sops (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  category sop_category not null,
  title text not null,
  summary text,
  body_md text not null,
  tags text[] default '{}',
  attachments text[] default '{}',
  last_editor uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sops_category_idx on public.sops(category);
create index sops_slug_idx on public.sops(slug);

-- ── Auto-update updated_at ──────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger users_touch before update on public.users
  for each row execute function public.touch_updated_at();
create trigger leads_touch before update on public.leads
  for each row execute function public.touch_updated_at();
create trigger sops_touch before update on public.sops
  for each row execute function public.touch_updated_at();

-- ── Auto-log status changes onto lead_notes ─────────────────────────────────
create or replace function public.log_lead_status_change()
returns trigger language plpgsql as $$
begin
  if old.status is distinct from new.status then
    insert into public.lead_notes (lead_id, author_id, type, body, metadata)
    values (
      new.id,
      coalesce(auth.uid(), new.assigned_to),
      'status_change',
      format('Status: %s → %s', old.status, new.status),
      jsonb_build_object('from', old.status, 'to', new.status)
    );
  end if;
  return new;
end;
$$;

create trigger leads_log_status after update of status on public.leads
  for each row execute function public.log_lead_status_change();

-- ── Auto-create users row on auth.users insert ──────────────────────────────
create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    case
      -- First user (the bootstrap email) becomes admin
      when new.email = 'giovannixfmwebdev@gmail.com' then 'admin'::user_role
      else 'staff'::user_role
    end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.sops enable row level security;

-- Helper: current user's role
create or replace function public.current_role()
returns user_role language sql stable security definer as $$
  select role from public.users where id = auth.uid();
$$;

-- USERS: every signed-in user can see the team; only admins edit.
create policy "users_read_all_signed_in" on public.users
  for select using (auth.uid() is not null);

create policy "users_admin_write" on public.users
  for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "users_self_update" on public.users
  for update using (id = auth.uid())
  with check (id = auth.uid());

-- LEADS:
--   admin/concierge → all rows
--   planner         → wedding & event rows OR rows assigned to them
--   staff           → only rows assigned to them
create policy "leads_read" on public.leads
  for select using (
    public.current_role() in ('admin', 'concierge')
    or (public.current_role() = 'planner' and (interest in ('wedding', 'event', 'corporate') or assigned_to = auth.uid()))
    or assigned_to = auth.uid()
  );

create policy "leads_insert_staff" on public.leads
  for insert with check (auth.uid() is not null);

create policy "leads_update" on public.leads
  for update using (
    public.current_role() in ('admin', 'concierge')
    or assigned_to = auth.uid()
  );

create policy "leads_delete_admin" on public.leads
  for delete using (public.current_role() = 'admin');

-- LEAD NOTES: visible if the parent lead is visible; insert if signed in.
create policy "lead_notes_read" on public.lead_notes
  for select using (
    exists (select 1 from public.leads l where l.id = lead_id)
  );

create policy "lead_notes_insert" on public.lead_notes
  for insert with check (auth.uid() is not null);

create policy "lead_notes_admin_delete" on public.lead_notes
  for delete using (public.current_role() = 'admin');

-- SOPS: everyone reads, admins write.
create policy "sops_read_all" on public.sops
  for select using (auth.uid() is not null);

create policy "sops_admin_write" on public.sops
  for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ── Service-role bypass for /api/leads (public form submission) ─────────────
-- The `/api/leads` route uses the service_role key so RLS is bypassed.
-- The route itself does the zod validation.
