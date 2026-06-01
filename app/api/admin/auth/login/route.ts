import { NextResponse, type NextRequest } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  isPhoneAllowed,
  normalizePhone,
  signSession,
} from '@/lib/admin-auth';
import { consume, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // Rate limit: 10 attempts per 10 minutes per IP. Generous enough for a real
  // user fumbling their number on mobile, tight enough to make brute-force
  // guessing of the whitelist impractical.
  const ip = getClientIp(req);
  const window = consume(`admin-login:${ip}`, 10, 10 * 60_000);
  if (!window.ok) {
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(window.retryAfterSec ?? 600) } },
    );
  }

  let phone = '';
  try {
    const body = await req.json();
    phone = typeof body?.phone === 'string' ? body.phone : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const normalized = normalizePhone(phone);
  if (!normalized || normalized.length !== 10) {
    return NextResponse.json({ error: 'Enter a 10-digit Indian mobile number.' }, { status: 400 });
  }

  if (!isPhoneAllowed(normalized)) {
    // Same response shape as a successful POST but always 401 — don't leak
    // whether the number exists in the whitelist via timing.
    return NextResponse.json({ error: 'This number is not authorised for the admin portal.' }, { status: 401 });
  }

  let token: string;
  try {
    token = await signSession(normalized);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Auth not configured';
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
