-- ============================================================
-- Owlighting CMS — Wave 4: FAQs
-- ============================================================
-- The /services page rendered a hardcoded FAQS array (7 Q&A items).
-- Workshop owner is likely to add FAQs over time, so this moves them to
-- a CMS-editable table.
-- ============================================================

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(60),                         -- react-icons name (FaFire, etc.)
  question VARCHAR(300) NOT NULL,
  answer TEXT NOT NULL,                     -- supports markdown-lite (bold via **text**)
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER faqs_set_updated
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_faqs_published
  ON faqs(published, sort_order);

INSERT INTO faqs (icon, question, answer, sort_order) VALUES
  ('FaFire',
   'Apakah Custom BILED Aman? Tidak Akan Terbakar?',
   'Sangat aman jika instalasi dilakukan dengan benar. Di Owlighting, kami menggunakan relay proteksi, fuse, dan kabel proper gauge (sesuai ampere). Semua sambungan custom BILED dilindungi heatshrink waterproof. **5+ tahun beroperasi, 500+ kendaraan, 0 kasus terbakar.**',
   1),
  ('FaBatteryFull',
   'Apakah Aki Bisa Soak / Tekor Setelah Pasang Custom BILED?',
   'Tidak. Kami pakai sistem relay yang memisahkan beban dari aki langsung. Plus socket & fuse untuk proteksi maksimal. Konsumsi daya custom BILED bahkan lebih rendah dari halogen (35W vs 55W). **Instalasi sesuai SOP keamanan elektrikal otomotif.**',
   2),
  ('FaBolt',
   'Apa Bedanya Custom BILED di Owlighting dengan Tempat Lain?',
   '**Owlighting:** kabel tembaga murni, relay Bosch/Tyco, ballast branded (Morimoto/AC/Osram), wiring rapih seperti factory install, heatshrink waterproof, garansi instalasi. **Tempat asal-asalan:** kabel asal nyambung, tidak pakai relay/fuse, ballast KW, sambungan lakban, rawan konslet.',
   3),
  ('FaLightbulb',
   'Berapa Lama Garansi Custom BILED di Owlighting?',
   'Garansi 1 tahun untuk komponen custom BILED (ballast, bulb) dan instalasi kelistrikan. Jika ada masalah dalam periode garansi, kami perbaiki atau ganti gratis. **After-sales support siap membantu kapan pun.**',
   4),
  ('FaCar',
   'Mobil / Motor Saya Bisa Dipasang Custom BILED?',
   'Hampir semua kendaraan bisa dipasang custom BILED — dari mobil Jepang, Eropa, Korea, hingga motor. Kami akan survey headlamp Anda terlebih dahulu untuk menentukan projector custom BILED yang cocok dan bracket yang dibutuhkan. **Konsultasi gratis via WhatsApp.**',
   5),
  ('FaRuler',
   'Berapa Lama Pengerjaan Pasang Custom BILED?',
   'Retrofit custom BILED standar: 1-2 hari. Custom project (DRL, lazy eyes, dll): 3-5 hari tergantung kompleksitas. Kami tidak buru-buru karena detail dan keamanan adalah prioritas. **Quality over speed.**',
   6),
  ('FaMoneyBillWave',
   'Berapa Harga Pasang Custom BILED di Owlighting?',
   'Harga bervariasi tergantung jenis kendaraan dan projector yang dipilih. Mulai dari Rp 1.5 juta untuk motor hingga Rp 3-5 juta untuk mobil. Hubungi via WhatsApp untuk konsultasi & penawaran terbaik. **Konsultasi & survey GRATIS.**',
   7)
ON CONFLICT DO NOTHING;

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_faqs') THEN
    CREATE POLICY public_read_faqs ON faqs FOR SELECT USING (published);
  END IF;
END $$;
