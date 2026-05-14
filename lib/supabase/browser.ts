'use client';

import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser client — used in Client Components. Reads/writes the session cookie
 * that Next.js middleware will read on the next request.
 */
export function getSupabaseBrowser() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}
