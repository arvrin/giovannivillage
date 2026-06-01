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

async function notifyConcierge(lead: z.infer<typeof LeadSchema> & { id?: string }) {
  if (!resend) {
    console.warn('[leads] RESEND_API_KEY missing — skipping email notification');
    return;
  }
  const inbox = process.env.LEAD_NOTIFY_TO || siteConfig.contact.email;
  const from = process.env.LEAD_NOTIFY_FROM || 'Giovanni Website <noreply@giovannivillage.com>';
  const subject = `New ${lead.interest} lead — ${lead.name}`;
  const lines = [
    `<strong>${lead.name}</strong>`,
    lead.email && `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.party_size && `Party size: ${lead.party_size}`,
    lead.date_from && `Dates: ${lead.date_from}${lead.date_to ? ` → ${lead.date_to}` : ''}`,
    lead.budget_inr && `Budget: ₹${lead.budget_inr.toLocaleString('en-IN')}`,
    lead.message && `<br/><em>Message:</em><br/>${lead.message.replace(/\n/g, '<br/>')}`,
    `<br/><small>Source: ${lead.source} · Interest: ${lead.interest}</small>`,
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

  // Guard: must have at least an email OR a phone to be actionable
  if (!lead.email && !lead.phone) {
    return NextResponse.json(
      { error: 'Either email or phone is required' },
      { status: 400 },
    );
  }

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

    // Fire-and-forget email
    notifyConcierge({ ...lead, id: data.id });

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[leads] DB insert failed', err);
    return NextResponse.json(
      { error: 'Failed to save lead. Please call us at ' + siteConfig.contact.phone },
      { status: 500 },
    );
  }
}
