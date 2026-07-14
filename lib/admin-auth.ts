/**
 * Lightweight admin auth — two-factor (phone allowlist + access code),
 * HMAC-signed cookie.
 *
 * Why this exists: we used to gate /admin via Supabase magic-link auth,
 * but email links kept getting consumed by mail-scanner previews. For
 * a single-operator admin portal that's overkill, so we replaced it with
 * a phone allowlist signed into an HttpOnly cookie.
 *
 * SECURITY MODEL — a phone number is NOT a secret (it's guessable, and
 * this code is in a public repo), so the allowlist alone is not an
 * authentication factor. Login therefore requires BOTH an allow-listed
 * phone AND the shared secret access code (`ADMIN_ACCESS_CODE`). Both
 * are configured only via env; there is intentionally NO hardcoded
 * fallback — if either env var is unset, login fails closed.
 *
 * Edge-runtime safe: uses Web Crypto (`crypto.subtle`) rather than the
 * Node `crypto` module so the same helper runs in middleware.
 *
 * Env vars (set in Vercel → Project → Environment Variables):
 *   ADMIN_AUTH_SECRET        Required. ≥32 random bytes (base64 / hex).
 *                            HMACs the session cookie.
 *   ADMIN_ACCESS_CODE        Required. ≥8-char shared secret — the second
 *                            factor at login. Without it, nobody can sign in.
 *   ADMIN_PHONE_WHITELIST    Required. Comma-separated phone numbers in
 *                            10-digit Indian form. Empty ⇒ nobody allowed.
 */

export const SESSION_COOKIE = 'gv-admin-session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/** Strip everything that isn't a digit and collapse to the 10-digit Indian form. */
export function normalizePhone(input: string): string {
  const digits = (input ?? '').replace(/\D/g, '');
  // 12 digits starting with 91 → drop country code (+91 9876543210 → 9876543210)
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  // 11 digits starting with 0 → drop trunk prefix
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

/** Read the allowlist from env. No fallback — empty env means nobody is allowed. */
export function getWhitelist(): string[] {
  const raw = process.env.ADMIN_PHONE_WHITELIST?.trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map((p) => normalizePhone(p))
    .filter((p) => p.length === 10);
}

export function isPhoneAllowed(phone: string): boolean {
  const n = normalizePhone(phone);
  if (n.length !== 10) return false;
  return getWhitelist().includes(n);
}

// ────────────────────────────────────────────────────────── HMAC helpers

const enc = new TextEncoder();

function base64UrlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Constant-time string equality. HMACs both inputs under a fresh random key
 * and compares the fixed-length digests, so neither the compare duration nor
 * the digest length leaks anything about the secret. Edge-safe (Web Crypto).
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const rand = crypto.getRandomValues(new Uint8Array(32));
  const key = await crypto.subtle.importKey(
    'raw',
    rand,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const [da, db] = await Promise.all([
    crypto.subtle.sign('HMAC', key, enc.encode(a)),
    crypto.subtle.sign('HMAC', key, enc.encode(b)),
  ]);
  const va = new Uint8Array(da);
  const vb = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

/**
 * Verify the second-factor access code against `ADMIN_ACCESS_CODE`.
 * Fails closed: returns false if the env var is missing/too short or the
 * supplied code is empty. Comparison is constant-time.
 */
export async function verifyAccessCode(input: string | undefined): Promise<boolean> {
  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected || expected.length < 8) return false;
  if (!input) return false;
  return timingSafeEqual(input, expected);
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function getSecret(): string {
  const s = process.env.ADMIN_AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      'ADMIN_AUTH_SECRET is missing or too short — set it in Vercel env (≥32 random chars).',
    );
  }
  return s;
}

/**
 * Sign a session payload as `{phone}.{expMs}.{sig}` — expMs is an absolute
 * expiry as Unix millis (a plain number, no dots) so the cookie is safe
 * to `split('.')` for parsing. The signature covers `phone.expMs`.
 */
export async function signSession(phone: string): Promise<string> {
  const expMs = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${phone}.${expMs}`;
  const key = await importKey(getSecret());
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return `${payload}.${base64UrlEncode(sig)}`;
}

export interface VerifiedSession {
  phone: string;
  expiresAt: Date;
}

/** Returns the verified session if the cookie is valid + unexpired, else null. */
export async function verifySession(cookieValue: string | undefined): Promise<VerifiedSession | null> {
  if (!cookieValue) return null;
  const parts = cookieValue.split('.');
  if (parts.length !== 3) return null;
  const [phone, expMsStr, sig] = parts;

  const expMs = Number(expMsStr);
  if (!Number.isFinite(expMs)) return null;

  // Re-compute the signature over the payload and compare.
  let key: CryptoKey;
  try {
    key = await importKey(getSecret());
  } catch {
    return null;
  }
  const expectedSig = await crypto.subtle.sign('HMAC', key, enc.encode(`${phone}.${expMsStr}`));
  if (base64UrlEncode(expectedSig) !== sig) return null;

  if (expMs <= Date.now()) return null;

  // Defensive re-check: phone must still be on the whitelist.
  if (!isPhoneAllowed(phone)) return null;

  return { phone, expiresAt: new Date(expMs) };
}
