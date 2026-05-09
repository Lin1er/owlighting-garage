-- ============================================================
-- Owlighting CMS — Fresh schema (DROP + CREATE)
-- ============================================================
-- Run this once in the Supabase SQL Editor to reset the database
-- to a known-good schema. WARNING: this DROPs all content tables.
-- After running this, run `supabase/seed.sql` to populate sample data.
--
-- Schema version: 4 (consolidates migrations 001-004)
-- ============================================================

-- ---------- DROP --------------------------------------------
DROP TABLE IF EXISTS reservations         CASCADE;
DROP TABLE IF EXISTS site_settings        CASCADE;
DROP TABLE IF EXISTS faqs                 CASCADE;
DROP TABLE IF EXISTS facilities           CASCADE;
DROP TABLE IF EXISTS why_choose_us        CASCADE;
DROP TABLE IF EXISTS company_paragraphs   CASCADE;
DROP TABLE IF EXISTS gallery_images       CASCADE;
DROP TABLE IF EXISTS homepage_stats       CASCADE;
DROP TABLE IF EXISTS testimonials         CASCADE;
DROP TABLE IF EXISTS services             CASCADE;
DROP TABLE IF EXISTS portfolio_projects   CASCADE;
DROP TABLE IF EXISTS tiktok_videos        CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ---------- helper: updated_at trigger function -------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================
-- TIKTOK VIDEOS
-- ============================================================
CREATE TABLE tiktok_videos (
  id SERIAL PRIMARY KEY,
  video_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  thumbnail_url TEXT,
  views VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_tiktok_videos_category ON tiktok_videos(category);
CREATE TRIGGER tiktok_videos_set_updated BEFORE UPDATE ON tiktok_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- PORTFOLIO PROJECTS
-- ============================================================
CREATE TABLE portfolio_projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  sort_order INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  lux_before INT,
  lux_after INT,
  year SMALLINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE UNIQUE INDEX uniq_portfolio_slug ON portfolio_projects(slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_portfolio_published ON portfolio_projects(published, sort_order);
CREATE INDEX idx_portfolio_category ON portfolio_projects(category);
CREATE TRIGGER portfolio_projects_set_updated BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  price_from VARCHAR(40),
  price_note VARCHAR(200),
  duration VARCHAR(80),
  category VARCHAR(40),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE UNIQUE INDEX uniq_services_slug ON services(slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_services_active ON services(is_active);
CREATE TRIGGER services_set_updated BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image_url TEXT,
  vehicle VARCHAR(120),
  service_tag VARCHAR(80),
  instagram_handle VARCHAR(60),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  work_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER testimonials_set_updated BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- HOMEPAGE STATS
-- ============================================================
CREATE TABLE homepage_stats (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  value VARCHAR(20) NOT NULL,
  label VARCHAR(100) NOT NULL,
  icon VARCHAR(60),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER homepage_stats_set_updated BEFORE UPDATE ON homepage_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- BEFORE/AFTER GALLERY
-- ============================================================
CREATE TABLE gallery_images (
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
CREATE INDEX idx_gallery_published ON gallery_images(published, sort_order);
CREATE TRIGGER gallery_images_set_updated BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- COMPANY PARAGRAPHS (about page story)
-- ============================================================
CREATE TABLE company_paragraphs (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER company_paragraphs_set_updated BEFORE UPDATE ON company_paragraphs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- WHY CHOOSE US (about page benefit cards)
-- ============================================================
CREATE TABLE why_choose_us (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(60),
  title VARCHAR(160) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER why_choose_us_set_updated BEFORE UPDATE ON why_choose_us
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- FACILITIES (about page workshop facility cards)
-- ============================================================
CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  image_url TEXT,
  tone VARCHAR(20) DEFAULT 'beam',
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER facilities_set_updated BEFORE UPDATE ON facilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- FAQS (services page FAQ accordion)
-- ============================================================
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(60),
  question VARCHAR(300) NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_faqs_published ON faqs(published, sort_order);
CREATE TRIGGER faqs_set_updated BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SITE SETTINGS (key-value config)
-- ============================================================
CREATE TABLE site_settings (
  key VARCHAR(80) PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TRIGGER site_settings_set_updated BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- RESERVATIONS (form submission log)
-- ============================================================
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40),
  vehicle VARCHAR(40) NOT NULL,
  vehicle_model VARCHAR(120),
  service VARCHAR(120) NOT NULL,
  preferred_date DATE,
  source VARCHAR(40) DEFAULT 'reservation_form',
  status VARCHAR(20) DEFAULT 'new',
  notes TEXT,
  utm_source VARCHAR(80),
  utm_medium VARCHAR(80),
  utm_campaign VARCHAR(80),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_reservations_status_created ON reservations(status, created_at DESC);
CREATE TRIGGER reservations_set_updated BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Public read for content tables; reservations read-only via service role.
-- Anonymous insert allowed only for reservations (form submission).

ALTER TABLE tiktok_videos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images     ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_paragraphs ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us      ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities         ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs               ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations       ENABLE ROW LEVEL SECURITY;

CREATE POLICY public_read_videos      ON tiktok_videos      FOR SELECT USING (true);
CREATE POLICY public_read_portfolio   ON portfolio_projects FOR SELECT USING (published);
CREATE POLICY public_read_services    ON services           FOR SELECT USING (is_active);
CREATE POLICY public_read_testimonials ON testimonials      FOR SELECT USING (published);
CREATE POLICY public_read_stats       ON homepage_stats     FOR SELECT USING (true);
CREATE POLICY public_read_gallery     ON gallery_images     FOR SELECT USING (published);
CREATE POLICY public_read_paragraphs  ON company_paragraphs FOR SELECT USING (true);
CREATE POLICY public_read_why         ON why_choose_us      FOR SELECT USING (published);
CREATE POLICY public_read_facilities  ON facilities         FOR SELECT USING (published);
CREATE POLICY public_read_faqs        ON faqs               FOR SELECT USING (published);
CREATE POLICY public_read_settings    ON site_settings      FOR SELECT USING (true);
CREATE POLICY anon_insert_reservations ON reservations FOR INSERT WITH CHECK (true);
