import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server client bound to the request cookies — used in Server Components,
 * Route Handlers and Server Actions. Respects the signed-in user's RLS.
 */
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Setting cookies in Server Components throws; safe to ignore.
        }
      },
    },
  });
}

/**
 * Admin client — bypasses RLS. ONLY use server-side, for trusted operations
 * like the public `/api/leads` endpoint or scheduled tasks.
 */
export function getSupabaseAdmin() {
  if (!SUPABASE_SERVICE) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
