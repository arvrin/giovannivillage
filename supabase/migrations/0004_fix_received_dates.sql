-- ============================================================================
-- Fix `created_at` on already-synced sheet leads. The first sync set them all
-- to the moment of sync. After this migration, run a fresh sync — new logic
-- will use the sheet's enquiry date for newly-inserted rows.
--
-- For rows already in the DB, this re-derives `created_at` from the metadata
-- columns we captured (if available).
-- ============================================================================

-- 1) For rows from 302Leads (last_contact has a precise timestamp)
update public.leads
set created_at = (metadata->>'last_contact')::timestamptz
where external_source = 'google_sheet'
  and metadata ? 'last_contact'
  and (metadata->>'last_contact') ~ '^\d{4}-\d{2}-\d{2}'
  and abs(extract(epoch from (created_at - external_synced_at))) < 600;  -- only rows that look like sync-default

-- 2) For other tabs, force a re-sync by clearing the row hash so the next
--    sync re-pulls every row (and the new logic will set created_at from
--    the sheet's enquiry date). Safe — only affects rows that came from sheet.
update public.leads
set external_row_hash = null
where external_source = 'google_sheet';
