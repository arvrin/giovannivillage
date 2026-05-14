import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/admin';

  if (!code) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const res = NextResponse.redirect(new URL(next, req.url));

  const supabase = createServerClient(supaUrl, anon, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error('[admin auth] code exchange failed', error);
    return NextResponse.redirect(new URL('/admin/login?error=exchange', req.url));
  }

  return res;
}
