-- ============================================================
-- Owlighting CMS — Wave 2 extensions
-- ============================================================
-- Adds:
--   • slug + ordering + price_from + duration on existing tables
--   • homepage stats table (was hardcoded)
--   • reservations log (was fire-and-forget WA redirect)
--   • settings key/value (operating hours, contact, gallery toggles)
--   • before/after gallery (separate from `portfolio_projects`)
-- Idempotent: safe to re-run.
-- ============================================================

-- ---------- portfolio_projects: enrich -----------------------
ALTER TABLE portfolio_projects
  ADD COLUMN IF NOT EXISTS slug VARCHAR(120),
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS lux_before INT,
  ADD COLUMN IF NOT EXISTS lux_after INT,
  ADD COLUMN IF NOT EXISTS year SMALLINT;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_portfolio_slug
  ON portfolio_projects(slug)
  WHERE slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_portfolio_published
  ON portfolio_projects(published, sort_order);

-- ---------- services: enrich --------------------------------
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS slug VARCHAR(120),
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS price_from VARCHAR(40),
  ADD COLUMN IF NOT EXISTS price_note VARCHAR(200),
  ADD COLUMN IF NOT EXISTS duration VARCHAR(80),
  ADD COLUMN IF NOT EXISTS category VARCHAR(40);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_services_slug
  ON services(slug)
  WHERE slug IS NOT NULL;

-- ---------- testimonials: enrich ----------------------------
ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS vehicle VARCHAR(120),
  ADD COLUMN IF NOT EXISTS service_tag VARCHAR(80),
  ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(60),
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS work_date DATE;

-- ---------- homepage_stats ----------------------------------
CREATE TABLE IF NOT EXISTS homepage_stats (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  value VARCHAR(20) NOT NULL,
  label VARCHAR(100) NOT NULL,
  icon VARCHAR(60),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER homepage_stats_set_updated
  BEFORE UPDATE ON homepage_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO homepage_stats (slug, value, label, icon, sort_order) VALUES
  ('vehicles',      '500+', 'Kendaraan',          'FaCar',      1),
  ('satisfaction',  '99%',  'Kepuasan',           'FaStar',     2),
  ('experience',    '5+',   'Tahun Pengalaman',   'FaClock',    3),
  ('precision',     '100%', 'Presisi',            'FaBullseye', 4)
ON CONFLICT (slug) DO NOTHING;

-- ---------- before/after gallery ----------------------------
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(60) NOT NULL,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  slider_color VARCHAR(20) DEFAULT '#00C2FF',
  service_tag VARCHAR(80),
  vehicle VARCHAR(120),
  lux_before INT,
  lux_after INT,
  duration_days SMALLINT,
  description TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER gallery_images_set_updated
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_gallery_published
  ON gallery_images(published, sort_order);

-- ---------- reservations log --------------------------------
-- Captures form submissions client-side just before the WA redirect.
-- We don't *block* on this insert (form still opens WA either way), but it
-- gives the admin dashboard a feed of leads even if the user never replies on
-- WhatsApp, and lets us track conversion source.
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40),
  vehicle VARCHAR(40) NOT NULL,
  vehicle_model VARCHAR(120),
  service VARCHAR(120) NOT NULL,
  preferred_date DATE,
  source VARCHAR(40) DEFAULT 'reservation_form',
  status VARCHAR(20) DEFAULT 'new', -- new | contacted | won | lost
  notes TEXT,
  utm_source VARCHAR(80),
  utm_medium VARCHAR(80),
  utm_campaign VARCHAR(80),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER reservations_set_updated
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_reservations_status_created
  ON reservations(status, created_at DESC);

-- ---------- site settings (key-value) -----------------------
-- Simple kv store for things admins should be able to tweak without redeploy:
-- working hours string, contact phone, hashtag, hero copy, feature flags.
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(80) PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER site_settings_set_updated
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO site_settings (key, value, description) VALUES
  ('working_hours',  'Senin - Sabtu: 09.00 - 18.00', 'Jam kerja workshop, format: "Senin - Sabtu: 09.00 - 18.00"'),
  ('hero_hashtag',   '#MENOLAKGELAP',                'Hashtag tagline di Hero'),
  ('feature_videos', 'true',                          'Tampilkan section video / blog'),
  ('feature_supabase_content', 'true',                'Toggle global: pakai data Supabase atau fallback statis')
ON CONFLICT (key) DO NOTHING;

-- ---------- public read RLS ---------------------------------
-- Tabel content publik harus bisa di-read tanpa auth (anon key).
-- Tabel privat (reservations) hanya bisa diinsert anon (form submit) dan
-- dibaca service-role (admin server-side).
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images     ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_videos      ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Public read for content tables (idempotent guards)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_portfolio') THEN
    CREATE POLICY public_read_portfolio   ON portfolio_projects FOR SELECT USING (published);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_services') THEN
    CREATE POLICY public_read_services    ON services           FOR SELECT USING (is_active);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_testimonials') THEN
    CREATE POLICY public_read_testimonials ON testimonials       FOR SELECT USING (published);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_stats') THEN
    CREATE POLICY public_read_stats       ON homepage_stats     FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_gallery') THEN
    CREATE POLICY public_read_gallery     ON gallery_images     FOR SELECT USING (published);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_settings') THEN
    CREATE POLICY public_read_settings    ON site_settings      FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_videos') THEN
    CREATE POLICY public_read_videos      ON tiktok_videos      FOR SELECT USING (true);
  END IF;

  -- Anonymous insert into reservations (form submit), no read for anon
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_insert_reservations') THEN
    CREATE POLICY anon_insert_reservations ON reservations FOR INSERT WITH CHECK (true);
  END IF;
END $$;
