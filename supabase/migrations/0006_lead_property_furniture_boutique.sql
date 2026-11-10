-- ─────────────────────────────────────────────────────────────────────────
-- 0006 — Allow Furniture + Boutique splash leads
--
-- giovanni-boutique's /api/leads also runs as the Furniture site
-- (furniture.giovanniboutique.com → 'giovanni-furniture') and the splash
-- (giovanniboutique.com → 'giovanni-boutique'). 0005 only enumerated
-- village/house/suites, so every insert from those two sites failed with an
-- invalid-enum error. Applied to production 2026-11-10.
-- ─────────────────────────────────────────────────────────────────────────

alter type lead_property add value if not exists 'giovanni-furniture';
alter type lead_property add value if not exists 'giovanni-boutique';
