-- ============================================================
-- Owlighting CMS — Wave 3: about-page content
-- ============================================================
-- The /about page rendered hardcoded copy from data/company.ts:
--   • companyStory (3 paragraphs)
--   • whyChooseUs (8 cards)
--   • facilities  (4 cards)
-- All three now move to Supabase so the workshop can edit them without a
-- redeploy. contactInfo is still env-driven (it's config, not content).
-- ============================================================

-- ---------- company_paragraphs --------------------------------
-- Ordered list of body paragraphs shown in the "Story" section of /about.
CREATE TABLE IF NOT EXISTS company_paragraphs (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER company_paragraphs_set_updated
  BEFORE UPDATE ON company_paragraphs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO company_paragraphs (body, sort_order) VALUES
  ('Owlighting dimulai dari passion terhadap otomotif dan teknologi pencahayaan. Kami percaya bahwa pencahayaan yang baik bukan hanya soal estetika, tapi juga keselamatan berkendara di malam hari.', 1),
  ('Dimulai dari garasi kecil di tahun 2019, kami bertekad memberikan solusi pencahayaan terbaik dengan teknologi terkini. Kini, dengan dilengkapi CNC Laser dan 3D Printer, kami mampu mewujudkan custom lighting yang bahkan tidak tersedia di pasaran.', 2),
  ('Dari sedan sport hingga motor trail, dari halogen kuning ke BILED putih tajam, kami telah mengubah ratusan kendaraan menjadi lebih aman dan lebih keren.', 3)
ON CONFLICT DO NOTHING;

-- ---------- why_choose_us -------------------------------------
-- Feature/benefit cards shown in "Mengapa Pilih Kami" section.
CREATE TABLE IF NOT EXISTS why_choose_us (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(60),
  title VARCHAR(160) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER why_choose_us_set_updated
  BEFORE UPDATE ON why_choose_us
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO why_choose_us (icon, title, description, sort_order) VALUES
  ('FaPlug', 'Perkabelan Aman & Rapih', 'Instalasi wiring profesional dengan kabel original, relay proteksi, dan fuse box. Dijamin tidak terbakar, aman untuk aki, dan rapih seperti factory install.', 1),
  ('FaShieldAlt', 'Safety First - Anti Soak Aki', 'Sistem kelistrikan dengan relay dan socket proper untuk melindungi aki dari konslet. Tidak ada kabel yang langsung ke aki tanpa pengaman.', 2),
  ('FaMicroscope', 'Teknologi Presisi', 'In-house CNC Laser & 3D Printer untuk fabrikasi bracket dan shroud custom. Presisi hingga milimeter.', 3),
  ('FaBolt', 'Garansi Kualitas', 'Semua hasil pekerjaan dijamin. Fokus cahaya rapi, cut-off sempurna, tidak menyilaukan. Termasuk garansi instalasi kelistrikan.', 4),
  ('FaBullseye', 'Konsultasi Gratis', 'Tim kami siap membantu memilih solusi terbaik untuk kendaraan Anda. Dari BILED hingga custom DRL.', 5),
  ('FaTools', 'Pengalaman 5+ Tahun', 'Ratusan mobil dan motor telah kami kerjakan tanpa kasus terbakar atau aki soak.', 6),
  ('FaLightbulb', 'Original Parts', 'Kami hanya menggunakan komponen original dan berkualitas. Ballast branded, kabel tembaga murni, relay Bosch/Tyco.', 7),
  ('FaRocket', 'Inovasi Terus Menerus', 'Selalu update dengan teknologi lighting terbaru. Dari D2 Laser hingga Matrix LED.', 8)
ON CONFLICT DO NOTHING;

-- ---------- facilities ----------------------------------------
-- Workshop facility cards (CNC, 3D, testing lab, etc.).
CREATE TABLE IF NOT EXISTS facilities (
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

CREATE TRIGGER facilities_set_updated
  BEFORE UPDATE ON facilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO facilities (title, description, image_url, tone, sort_order) VALUES
  ('CNC Laser Precision', 'Fabrikasi bracket & dudukan custom', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop', 'beam', 1),
  ('3D Printing Studio', 'Prototyping & custom shroud', 'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=1171&auto=format&fit=crop', 'halo', 2),
  ('Testing Lab', 'Quality control & beam pattern testing', 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop', 'beam', 3),
  ('Clean Workshop', 'AC, lift hydraulic, full tools', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop', 'halo', 4)
ON CONFLICT DO NOTHING;

-- ---------- public read RLS -----------------------------------
ALTER TABLE company_paragraphs ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us      ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities         ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_paragraphs') THEN
    CREATE POLICY public_read_paragraphs ON company_paragraphs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_why') THEN
    CREATE POLICY public_read_why ON why_choose_us FOR SELECT USING (published);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_facilities') THEN
    CREATE POLICY public_read_facilities ON facilities FOR SELECT USING (published);
  END IF;
END $$;
