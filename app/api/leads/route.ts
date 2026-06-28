import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { siteConfig } from '@/lib/data';
import { consume, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const LeadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  message: z.string().max(4000).optional().or(z.literal('')),
  // Honeypot: a hidden field real users never see. Bots fill every input,
  // so a non-empty value is a strong spam signal. Must stay empty.
  company: z.string().max(0).optional().or(z.literal('')),
  // Render timestamp (ms). Submissions faster than a human could plausibly
  // type are almost always scripted. Optional so older clients still work.
  rendered_at: z.number().int().optional(),
  interest: z
    .enum(['stay', 'wedding', 'event', 'dining', 'spa', 'corporate', 'other'])
    .optional()
    .default('other'),
  source: z
    .enum(['website', 'whatsapp', 'instagram', 'phone', 'walk_in', 'partner', 'referral'])
    .optional()
    .default('website'),
  party_size: z.number().int().positive().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  budget_inr: z.number().int().positive().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

/** Escape user input before it lands in an HTML email body. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

async function notifyConcierge(lead: z.infer<typeof LeadSchema> & { id?: string }) {
  if (!resend) {
    console.warn('[leads] RESEND_API_KEY missing — skipping email notification');
    return;
  }
  const inbox = process.env.LEAD_NOTIFY_TO || siteConfig.contact.email;
  const from = process.env.LEAD_NOTIFY_FROM || 'Giovanni Website <noreply@giovannivillage.com>';
  const subject = `New ${lead.interest} lead — ${lead.name}`;
  const lines = [
    `<strong>${escapeHtml(lead.name)}</strong>`,
    lead.email && `Email: ${escapeHtml(lead.email)}`,
    lead.phone && `Phone: ${escapeHtml(lead.phone)}`,
    lead.party_size && `Party size: ${lead.party_size}`,
    lead.date_from && `Dates: ${escapeHtml(lead.date_from)}${lead.date_to ? ` → ${escapeHtml(lead.date_to)}` : ''}`,
    lead.budget_inr && `Budget: ₹${lead.budget_inr.toLocaleString('en-IN')}`,
    lead.message && `<br/><em>Message:</em><br/>${escapeHtml(lead.message).replace(/\n/g, '<br/>')}`,
    `<br/><small>Source: ${escapeHtml(lead.source)} · Interest: ${escapeHtml(lead.interest)}</small>`,
  ].filter(Boolean).join('<br/>');

  try {
    await resend.emails.send({
      from,
      to: inbox.split(',').map((e) => e.trim()),
      subject,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">${lines}</div>`,
      replyTo: lead.email || undefined,
    });
  } catch (err) {
    console.error('[leads] Failed to send concierge email', err);
  }
}

export async function POST(req: Request) {
  // Rate limit: 5 submissions per minute per IP, 30 per hour per IP. Catches
  // form spam without inconveniencing a genuine user who edits + resubmits.
  const ip = getClientIp(req);
  const perMin = consume(`leads:1m:${ip}`, 5, 60_000);
  if (!perMin.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(perMin.retryAfterSec ?? 60) },
      },
    );
  }
  const perHour = consume(`leads:1h:${ip}`, 30, 60 * 60_000);
  if (!perHour.ok) {
    return NextResponse.json(
      { error: 'Too many requests from this address. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(perHour.retryAfterSec ?? 3600) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Spam guard: honeypot filled, or the form was "submitted" implausibly fast
  // (< 2s after render) → almost certainly a bot. Return a 200 so the bot
  // thinks it succeeded and doesn't retry, but drop the submission silently.
  const tooFast =
    typeof lead.rendered_at === 'number' && Date.now() - lead.rendered_at < 2000;
  if (lead.company || tooFast) {
    console.warn('[leads] dropped suspected spam', { honeypot: !!lead.company, tooFast });
    return NextResponse.json({ ok: true });
  }

  // Guard: must have at least an email OR a phone to be actionable
  if (!lead.email && !lead.phone) {
    return NextResponse.json(
      { error: 'Either email or phone is required' },
      { status: 400 },
    );
  }

  let leadId: string | undefined;
  let dbFailed = false;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: lead.name,
        email: lead.email || null,
        phone: lead.phone || null,
        message: lead.message || null,
        interest: lead.interest,
        source: lead.source,
        party_size: lead.party_size ?? null,
        date_from: lead.date_from ?? null,
        date_to: lead.date_to ?? null,
        budget_inr: lead.budget_inr ?? null,
        metadata: lead.metadata ?? {},
      })
      .select('id')
      .single();

    if (error) throw error;
    leadId = data.id;
  } catch (err) {
    // The DB write failed (missing/invalid Supabase env, outage, etc.). Don't
    // lose the lead — fall through and still email the concierge so a human
    // gets it. We only hard-fail to the guest if BOTH channels are down.
    dbFailed = true;
    console.error('[leads] DB insert failed — falling back to email only', err);
  }

  // Notify the concierge regardless of DB outcome. Awaited when the DB failed
  // so we can honestly tell the guest whether their message got through.
  if (dbFailed) {
    if (!resend) {
      // No DB and no email transport — we genuinely cannot capture this lead.
      console.error('[leads] DB down and RESEND_API_KEY missing — lead not captured');
      return NextResponse.json(
        { error: 'Failed to send your message. Please call us at ' + siteConfig.contact.phone },
        { status: 500 },
      );
    }
    try {
      await notifyConcierge({ ...lead, id: leadId });
    } catch (emailErr) {
      console.error('[leads] both DB and email failed', emailErr);
      return NextResponse.json(
        { error: 'Failed to send your message. Please call us at ' + siteConfig.contact.phone },
        { status: 500 },
      );
    }
    // Email got through even though the DB didn't — the guest is taken care of.
    return NextResponse.json({ ok: true });
  }

  // Happy path: persisted. Fire-and-forget the email.
  notifyConcierge({ ...lead, id: leadId });
  return NextResponse.json({ ok: true, id: leadId });
}
