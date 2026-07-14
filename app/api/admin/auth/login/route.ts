import { NextResponse, type NextRequest } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  isPhoneAllowed,
  normalizePhone,
  signSession,
  verifyAccessCode,
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
  let code = '';
  try {
    const body = await req.json();
    phone = typeof body?.phone === 'string' ? body.phone : '';
    code = typeof body?.code === 'string' ? body.code : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const normalized = normalizePhone(phone);
  if (!normalized || normalized.length !== 10) {
    return NextResponse.json({ error: 'Enter a 10-digit Indian mobile number.' }, { status: 400 });
  }

  // Two factors, checked together: an allow-listed phone AND the shared access
  // code. Both are evaluated before responding, and a single generic error is
  // returned either way, so the response never reveals which factor failed
  // (a phone number is not a secret — the access code is the real gate).
  const phoneOk = isPhoneAllowed(normalized);
  const codeOk = await verifyAccessCode(code);
  if (!phoneOk || !codeOk) {
    return NextResponse.json(
      { error: 'Invalid mobile number or access code.' },
      { status: 401 },
    );
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
