/**
 * Google Sheets read-only client for the Giovanni "Banquet & Room Enquiry"
 * spreadsheet. Pulls all five lead tabs, normalises each row, returns a
 * unified `MirroredLead[]` for upsert into the `leads` table.
 *
 * Auth: service account JSON (env `GOOGLE_SERVICE_ACCOUNT_KEY` — single-line JSON).
 * The service account email must be added as a Viewer on the sheet.
 */
import crypto from 'node:crypto';
import { google, sheets_v4 } from 'googleapis';
import type {
  LeadInterest,
  LeadSource,
  LeadStatus,
} from '@/lib/supabase/types';

export const SHEET_ID = '129tygnhM1AfgG_hmBqkCfIc6GFP1NNkguJW-52cnD_8';

/** Tab definitions — header row is on row 1, data starts row 2. */
interface TabDef {
  tab: string;
  /** Columns we care about, by index (0-based) in the sheet's row */
  cols: {
    enquiryDate?: number;
    name: number;
    phone: number;
    city?: number;
    eventDate?: number;
    pax?: number;
    details?: number;
    callDate1?: number;
    callHighlight1?: number;
    callDate2?: number;
    callHighlight2?: number;
    callDate3?: number;
    callHighlight3?: number;
    salesExec?: number;
    closedOrLost?: number;
    roomOrBanquet?: number; // AILeads only
    conversationSummary?: number; // 302Leads
    lastContact?: number; // 302Leads
  };
  /** Default interest if not derivable from the row */
  defaultInterest: LeadInterest;
  /** Default source */
  defaultSource: LeadSource;
}

export const TABS: TabDef[] = [
  {
    tab: 'Banquets Enquiry',
    defaultInterest: 'event',
    defaultSource: 'sheet_manual',
    cols: {
      enquiryDate: 0,
      name: 1,
      phone: 2,
      city: 3,
      eventDate: 4,
      pax: 5,
      details: 6,
      salesExec: 7,
      callDate1: 8,
      callHighlight1: 9,
      callDate2: 10,
      callHighlight2: 11,
      callDate3: 12,
      callHighlight3: 13,
      closedOrLost: 14,
    },
  },
  {
    tab: 'Rooms Enquiry',
    defaultInterest: 'stay',
    defaultSource: 'sheet_manual',
    cols: {
      enquiryDate: 0,
      name: 1,
      phone: 2,
      city: 3,
      eventDate: 4,
      pax: 5,
      details: 6,
      salesExec: 7,
      callDate1: 8,
      callHighlight1: 9,
      callDate2: 10,
      callHighlight2: 11,
      callDate3: 12,
      callHighlight3: 13,
      closedOrLost: 14,
    },
  },
  {
    tab: 'Jungle Safari+Experiences',
    defaultInterest: 'experience',
    defaultSource: 'sheet_manual',
    cols: {
      enquiryDate: 0,
      name: 1,
      phone: 2,
      city: 3,
      eventDate: 4,
      pax: 5,
      details: 6,
      salesExec: 7,
      callDate1: 8,
      callHighlight1: 9,
      callDate2: 10,
      callHighlight2: 11,
      callDate3: 12,
      callHighlight3: 13,
      closedOrLost: 14,
    },
  },
  {
    tab: 'AILeads ',
    defaultInterest: 'other',
    defaultSource: 'ai_chatbot',
    cols: {
      name: 1,
      phone: 2,
      city: 3,
      pax: 4,
      roomOrBanquet: 5,
      details: 6,
      callDate1: 7,
      callHighlight1: 8,
      salesExec: 9,
      callDate2: 10,
      callHighlight2: 11,
      callDate3: 12,
      callHighlight3: 13,
      closedOrLost: 14,
    },
  },
  {
    tab: '302Leads',
    defaultInterest: 'other',
    defaultSource: 'phone_302',
    cols: {
      phone: 0,
      name: 1,
      lastContact: 2,
      conversationSummary: 3,
      callDate1: 4,
      callHighlight1: 5,
      salesExec: 6,
      callDate2: 7,
      callHighlight2: 8,
      callDate3: 9,
      callHighlight3: 10,
      closedOrLost: 11,
    },
  },
];

// ── Normalisation helpers ─────────────────────────────────────────────────

/** Strip `p:+`, decimals, dashes; return digits-only or null. */
export function normalisePhone(raw: unknown): string | null {
  if (!raw) return null;
  let s = String(raw).trim();
  s = s.replace(/^p:\+?/i, '');
  s = s.replace(/[.\s\-()]/g, '');
  s = s.replace(/\.0$/, '');
  // Strip non-digits except leading +
  s = s.replace(/[^\d+]/g, '');
  if (!s) return null;
  // If 10 digits and no country code, prepend +91 (India)
  if (/^\d{10}$/.test(s)) s = '+91' + s;
  // If 12 digits starting with 91, prepend +
  if (/^91\d{10}$/.test(s)) s = '+' + s;
  return s.length >= 8 ? s : null;
}

/** Try to parse a date; returns YYYY-MM-DD or null. Also recognises
 *  chatbot placeholders (e.g. `_this_week`). */
export function parseDate(raw: unknown): { date: string | null; phrase: string | null } {
  if (!raw) return { date: null, phrase: null };
  const s = String(raw).trim();
  // Placeholder phrases
  if (s.startsWith('_') || /next_week|this_week|coming_month|request_a_call_back/i.test(s)) {
    return { date: null, phrase: s.replace(/^[^a-zA-Z]+/, '') };
  }
  // Excel-style date string from openpyxl: "2025-07-01 00:00:00"
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return { date: `${m[1]}-${m[2]}-${m[3]}`, phrase: null };
  // dd/mm/yyyy
  const m2 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m2) {
    const [, d, mo, y] = m2;
    return { date: `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`, phrase: null };
  }
  // Try JS Date parsing
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 2020 && parsed.getFullYear() < 2100) {
    return { date: parsed.toISOString().slice(0, 10), phrase: null };
  }
  return { date: null, phrase: s };
}

/** Map free-text "Confirmed / Lost" column to our lead_status enum. */
export function mapStatus(raw: unknown, hasCallActivity: boolean): LeadStatus {
  const s = (raw ? String(raw) : '').trim().toLowerCase();
  if (!s) return hasCallActivity ? 'contacted' : 'new';
  if (/confirm|booked/.test(s)) return 'booked';
  if (/cancel|lost|not\s*intere|another\s*venue|closed/.test(s)) return 'lost';
  return hasCallActivity ? 'contacted' : 'new';
}

/** For AILeads, R/B column → interest. */
export function mapRoomBanquet(raw: unknown): LeadInterest | null {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (s.startsWith('r')) return 'stay';
  if (s.startsWith('b')) return 'event';
  return null;
}

/** Parsed lead, ready to upsert into the `leads` table. */
export interface MirroredLead {
  external_source: 'google_sheet';
  external_tab: string;
  external_id: string;        // tab + row number
  external_row_hash: string;  // sha1 of the raw row, to detect change quickly
  name: string;
  email: string | null;
  phone: string | null;
  source: LeadSource;
  interest: LeadInterest;
  party_size: number | null;
  date_from: string | null;
  date_to: string | null;
  message: string | null;
  status: LeadStatus;
  metadata: Record<string, unknown>;
  callNotes: { body: string; date: string | null }[];
  /** Original enquiry date from the sheet — used to override `created_at`
   *  so /admin/leads shows the real lead age, not the time of our last sync. */
  receivedAt: string | null;
}

function hashRow(row: unknown[]): string {
  return crypto.createHash('sha1').update(JSON.stringify(row)).digest('hex');
}

/** Parse one raw row into MirroredLead (or null if row is empty/junk). */
export function parseRow(tabDef: TabDef, row: (string | number | null)[], rowIndex: number): MirroredLead | null {
  const cells = (i?: number) => (i === undefined ? '' : (row[i] ?? '').toString().trim());
  const name = cells(tabDef.cols.name);
  const phoneRaw = cells(tabDef.cols.phone);
  const phone = normalisePhone(phoneRaw);

  // Skip rows where both name and phone are empty
  if (!name && !phone) return null;
  // Skip rows where name is clearly a header repeat or a date-only calendar row
  if (!name && phoneRaw === '') return null;

  const partySize = Number(cells(tabDef.cols.pax)) || null;
  const eventDateParsed = parseDate(cells(tabDef.cols.eventDate));
  const closedOrLost = cells(tabDef.cols.closedOrLost);

  // Interest: from R/B column if present, else default
  let interest = tabDef.defaultInterest;
  if (tabDef.cols.roomOrBanquet !== undefined) {
    const ib = mapRoomBanquet(cells(tabDef.cols.roomOrBanquet));
    if (ib) interest = ib;
  }

  // Collect call activity → notes
  const callNotes: MirroredLead['callNotes'] = [];
  const callPairs: Array<[number | undefined, number | undefined]> = [
    [tabDef.cols.callDate1, tabDef.cols.callHighlight1],
    [tabDef.cols.callDate2, tabDef.cols.callHighlight2],
    [tabDef.cols.callDate3, tabDef.cols.callHighlight3],
  ];
  for (const [dCol, hCol] of callPairs) {
    if (dCol === undefined && hCol === undefined) continue;
    const d = cells(dCol);
    const h = cells(hCol);
    if (!d && !h) continue;
    const parsed = parseDate(d);
    const body = [h, parsed.phrase ? `(date phrase: ${parsed.phrase})` : ''].filter(Boolean).join(' — ').trim();
    if (!body && !d) continue;
    callNotes.push({
      body: body || `Call on ${d}`,
      date: parsed.date,
    });
  }
  const hasCallActivity = callNotes.length > 0;

  const messageParts: string[] = [];
  if (cells(tabDef.cols.details)) messageParts.push(cells(tabDef.cols.details));
  if (cells(tabDef.cols.conversationSummary)) messageParts.push(cells(tabDef.cols.conversationSummary));
  const message = messageParts.join('\n\n') || null;

  const metadata: Record<string, unknown> = {
    sheet_row: rowIndex,
    sheet_tab: tabDef.tab,
  };
  const city = cells(tabDef.cols.city);
  if (city) metadata.city = city;
  if (eventDateParsed.phrase) metadata.event_date_phrase = eventDateParsed.phrase;
  const salesExec = cells(tabDef.cols.salesExec);
  if (salesExec) metadata.original_sales_rep = salesExec;
  if (closedOrLost) metadata.original_status_text = closedOrLost;
  const lastContact = cells(tabDef.cols.lastContact);
  if (lastContact) metadata.last_contact = lastContact;

  // Compute the "received at" date — best guess at when this lead actually
  // came in. Priority: enquiryDate column → lastContact (302Leads) → first
  // filled call date → null (sync will use now()).
  let receivedAt: string | null = null;
  const enquiryDateRaw = cells(tabDef.cols.enquiryDate);
  if (enquiryDateRaw) {
    const d = parseDate(enquiryDateRaw);
    if (d.date) receivedAt = d.date + 'T00:00:00.000Z';
  }
  if (!receivedAt && lastContact) {
    // 302Leads "Last Contact" is a timestamp string like "2026-05-11 12:45:00"
    const t = new Date(lastContact.replace(' ', 'T'));
    if (!isNaN(t.getTime()) && t.getFullYear() > 2020) receivedAt = t.toISOString();
  }
  if (!receivedAt && callNotes.length > 0) {
    const firstDated = callNotes.find((n) => n.date);
    if (firstDated?.date) receivedAt = firstDated.date + 'T00:00:00.000Z';
  }

  return {
    external_source: 'google_sheet',
    external_tab: tabDef.tab,
    external_id: `${tabDef.tab}:${rowIndex}`,
    external_row_hash: hashRow(row),
    name: name || `(Unknown — ${tabDef.tab} row ${rowIndex})`,
    email: null,
    phone,
    source: tabDef.defaultSource,
    interest,
    party_size: partySize,
    date_from: eventDateParsed.date,
    date_to: null,
    message,
    status: mapStatus(closedOrLost, hasCallActivity),
    metadata,
    callNotes,
    receivedAt,
  };
}

/** Build a Sheets API client from the env service-account JSON. */
function getClient(): sheets_v4.Sheets {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');
  }
  let creds: { client_email: string; private_key: string };
  try {
    creds = JSON.parse(raw);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON');
  }
  if (!creds.client_email || !creds.private_key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY missing client_email or private_key');
  }
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return google.sheets({ version: 'v4', auth });
}

/** Pull all configured tabs and return parsed leads. */
export async function pullSheetLeads(): Promise<{
  leads: MirroredLead[];
  rowsRead: number;
  perTab: Record<string, { read: number; parsed: number }>;
}> {
  const sheets = getClient();
  const ranges = TABS.map((t) => `'${t.tab}'!A1:AB`);

  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: SHEET_ID,
    ranges,
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
  });

  const all: MirroredLead[] = [];
  const perTab: Record<string, { read: number; parsed: number }> = {};
  let rowsRead = 0;

  res.data.valueRanges?.forEach((vr, idx) => {
    const tabDef = TABS[idx];
    const rows = (vr.values ?? []) as (string | number | null)[][];
    // Row 1 is the header; data starts row 2 (rowIndex starts at 2 for human-readable matching)
    let parsedCount = 0;
    for (let i = 1; i < rows.length; i++) {
      const rowIndex = i + 1; // 1-based, matches Sheets row number
      rowsRead++;
      const parsed = parseRow(tabDef, rows[i], rowIndex);
      if (parsed) {
        all.push(parsed);
        parsedCount++;
      }
    }
    perTab[tabDef.tab] = { read: rows.length - 1, parsed: parsedCount };
  });

  return { leads: all, rowsRead, perTab };
}
