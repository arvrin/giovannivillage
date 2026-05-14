/**
 * Database type definitions — mirrors `supabase/migrations/0001_init.sql`.
 * Hand-written for Phase 1 (no codegen yet). When schema changes, update here.
 */

export type UserRole = 'admin' | 'concierge' | 'planner' | 'staff';

export type LeadSource =
  | 'website' | 'whatsapp' | 'instagram' | 'phone' | 'walk_in' | 'partner' | 'referral'
  | 'ai_chatbot' | 'phone_302' | 'sheet_manual';

export type LeadInterest =
  | 'stay' | 'wedding' | 'event' | 'dining' | 'spa' | 'corporate' | 'other' | 'experience';

export type LeadStatus =
  | 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'booked' | 'lost' | 'archived';

export type LeadNoteType =
  | 'note' | 'call' | 'email' | 'whatsapp' | 'status_change' | 'file' | 'assignment';

export type SopCategory =
  | 'reservations' | 'front_desk' | 'housekeeping' | 'food_beverage' | 'kitchen'
  | 'spa' | 'events' | 'experiences' | 'maintenance' | 'security' | 'finance' | 'hr' | 'general';

export interface DBUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBLead {
  id: string;
  source: LeadSource;
  name: string;
  email: string | null;
  phone: string | null;
  interest: LeadInterest;
  party_size: number | null;
  date_from: string | null;
  date_to: string | null;
  budget_inr: number | null;
  message: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DBLeadNote {
  id: string;
  lead_id: string;
  author_id: string | null;
  type: LeadNoteType;
  body: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface DBSop {
  id: string;
  slug: string;
  category: SopCategory;
  title: string;
  summary: string | null;
  body_md: string;
  tags: string[];
  attachments: string[];
  last_editor: string | null;
  created_at: string;
  updated_at: string;
}
