import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/auth/callback'];

export async function middleware(req: NextRequest) {
  // Only guard the admin area
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Public admin paths (login page itself, magic-link callback)
  if (PUBLIC_ADMIN_PATHS.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // If env vars aren't set yet, let the page render (it'll show a setup notice).
  if (!url || !anon) return NextResponse.next();

  const res = NextResponse.next({ request: req });
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
