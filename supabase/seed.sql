-- ============================================================
-- Owlighting CMS — Seed data
-- ============================================================
-- Run AFTER schema.sql to populate the database with default content.
-- All inserts use ON CONFLICT DO NOTHING so re-running is idempotent.
-- ============================================================

-- ---------- HOMEPAGE STATS ----------------------------------
INSERT INTO homepage_stats (slug, value, label, icon, sort_order) VALUES
  ('vehicles',     '500+', 'Kendaraan',         'FaCar',      1),
  ('satisfaction', '99%',  'Kepuasan',          'FaStar',     2),
  ('experience',   '5+',   'Tahun Pengalaman',  'FaClock',    3),
  ('precision',    '100%', 'Presisi',           'FaBullseye', 4)
ON CONFLICT (slug) DO NOTHING;

-- ---------- SERVICES ----------------------------------------
INSERT INTO services (slug, title, description, icon, features, is_active, sort_order, price_from, duration, category) VALUES
  ('biled-retrofit',
   'BILED Retrofit',
   'Fokus cahaya tajam dengan cut-off RHD rapi. Tidak menyilaukan lawan arah. Terang maksimal, aman untuk semua kondisi jalan. Instalasi wiring profesional - DIJAMIN TIDAK TERBAKAR & AMAN UNTUK AKI. #MenolakGelap',
   'BiSolidBulb',
   '["Cut-off RHD presisi","Beam pattern tajam 6000K-8000K","Wiring rapih dengan relay proteksi","Socket & fuse original - Anti terbakar","Kabel tembaga murni proper gauge","Heatshrink & waterproof taping","Ballast branded (Morimoto/AC/Osram)","Instalasi SOP safety - Aman untuk aki","Garansi 1 tahun komponen & instalasi"]'::jsonb,
   true, 1, '2.5jt', '1 hari kerja', 'Otomotif'),
  ('d2-laser',
   'D2 Laser / Foglamp',
   'Tambahan cahaya tembak untuk medan kabut dan hujan. Mode putih & kuning untuk visibilitas ekstrem. Instalasi dengan relay & fuse protection untuk keamanan maksimal.',
   'IoFlashOutline',
   '["Dual color (white/yellow)","Waterproof IP67","Bracket custom CNC","Relay & fuse protection","Plug & play wiring rapih","Kabel weather resistant"]'::jsonb,
   true, 2, '1.2jt', 'Setengah hari', 'Otomotif'),
  ('custom-cnc',
   'Custom CNC & 3D',
   'Punya ide gila? DRL custom, lazy eyes, atau setup unik untuk kendaraan spesial. Kami wujudkan dengan teknologi presisi.',
   'FaCog',
   '["Design konsultasi gratis","CNC laser precision","3D printing shroud","Unlimited creativity"]'::jsonb,
   true, 3, NULL, '1-3 hari', 'Custom'),
  ('slimframe',
   'Slimframe',
   'Frame custom ultra tipis untuk tampilan headlight yang lebih modern dan elegan. Cocok untuk berbagai jenis kendaraan.',
   'HiOutlinePhoto',
   '["Ultra slim design","Material premium","Custom fit per mobil","Finishing rapih"]'::jsonb,
   true, 4, '850rb', 'Setengah hari', 'Otomotif'),
  ('custom-akrilik',
   'Custom Akrilik',
   'Produksi custom akrilik untuk berbagai keperluan otomotif. Dari cover lampu hingga aksesoris interior.',
   'IoSparkles',
   '["Akrilik grade A","Laser cutting presisi","Berbagai ketebalan","Custom bentuk & ukuran"]'::jsonb,
   true, 5, NULL, '1-2 hari', 'Custom'),
  ('neon-box',
   'Neon Box',
   'Pembuatan neon box untuk branding bengkel, showroom, atau toko aksesoris otomotif Anda.',
   'MdBuild',
   '["LED neon tahan lama","Weatherproof outdoor","Custom design & size","Free konsultasi desain"]'::jsonb,
   true, 6, NULL, '3-7 hari', 'Signage'),
  ('neonbox-huruf-timbul',
   'Neonbox Huruf Timbul',
   'Signage premium dengan huruf timbul dan lampu neon untuk tampilan yang lebih eksklusif dan eye-catching.',
   'FaStar',
   '["3D raised letters","Backlit LED neon","Material stainless/acrylic","Instalasi profesional"]'::jsonb,
   true, 7, NULL, '5-10 hari', 'Signage')
ON CONFLICT (slug) DO NOTHING;

-- ---------- PORTFOLIO PROJECTS ------------------------------
INSERT INTO portfolio_projects (slug, title, category, description, image_url, sort_order, published) VALUES
  ('alphard-led', 'Toyota Alphard - Full LED Retrofit', 'mobil',
   'BILED Projector + DRL Sequential',
   'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop',
   1, true),
  ('civic-laser', 'Honda Civic Type R - Laser Foglamp', 'mobil',
   'D2 Laser 6000K + Angel Eyes',
   'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?w=800&auto=format&fit=crop',
   2, true),
  ('r15-custom', 'Yamaha R15 - Custom Headlight', 'motor',
   'Mini Projector BILED + Devil Eyes',
   'https://images.unsplash.com/photo-1558981033-6f4b0b2eecc0?w=800&auto=format&fit=crop',
   3, true),
  ('mercedes-matrix', 'Mercedes E-Class - Matrix LED', 'mobil',
   'Full matrix LED dengan auto leveling',
   'https://images.unsplash.com/photo-1617531653520-bd466356b3ff?w=800&auto=format&fit=crop',
   4, true),
  ('custom-drl', 'Custom DRL Strip - 3D Printed Shroud', 'custom',
   'Desain unik dengan bracket CNC',
   'https://images.unsplash.com/photo-1606557761934-e7058d9c2481?w=800&auto=format&fit=crop',
   5, true),
  ('bmw-adaptive', 'BMW M3 - Adaptive Headlight', 'mobil',
   'Retrofit bi-xenon dengan auto aim',
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
   6, true),
  ('ninja-led', 'Kawasaki Ninja - LED Conversion', 'motor',
   'Full LED setup dengan custom bracket',
   'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop',
   7, true),
  ('lazy-eyes', 'Lazy Eyes Project - Show Car', 'custom',
   'Lazy eyes mekanik + RGB underglow',
   'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop',
   8, true)
ON CONFLICT (slug) DO NOTHING;

-- ---------- TESTIMONIALS ------------------------------------
INSERT INTO testimonials (name, vehicle, comment, rating, sort_order, published) VALUES
  ('Budi S.', 'Toyota Alphard',
   'Hasil retrofit BILED-nya sempurna! Fokus cahaya tajam, cut-off rapi. Malam hari jadi lebih aman berkendara.',
   5, 1, true),
  ('Andi P.', 'Honda Civic',
   'Custom DRL pakai 3D print, hasilnya gila! Detail banget dan rapi. Timnya profesional, konsultasinya detail.',
   5, 2, true),
  ('Reza M.', 'Yamaha R15',
   'Dari halogen kuning langsung ke BILED putih. Beda banget! Workshop-nya bersih, garansi juga jelas.',
   5, 3, true)
ON CONFLICT DO NOTHING;

-- ---------- BEFORE / AFTER GALLERY --------------------------
INSERT INTO gallery_images (slug, title, vehicle, description, category, service_tag, before_image_url, after_image_url, slider_color, lux_before, lux_after, duration_days, sort_order, published) VALUES
  ('biled-retrofit-avanza',
   'BILED Retrofit', 'Toyota Avanza 2018',
   'Halogen kuning 3.200 lx → BILED putih tajam 6000 K dengan cut-off RHD presisi.',
   'mobil', 'BILED Retrofit',
   'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200&auto=format&fit=crop',
   '#00C2FF', 3200, 18500, 1, 1, true),
  ('d2-laser-jazz',
   'D2 Laser Foglamp', 'Honda Jazz 2020',
   'Foglamp standar redup → cahaya kristal dual-color, IP67, tembus kabut.',
   'mobil', 'D2 Laser',
   'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop',
   '#FFB800', 1800, 12000, 1, 2, true)
ON CONFLICT (slug) DO NOTHING;

-- ---------- COMPANY PARAGRAPHS (about story) ----------------
INSERT INTO company_paragraphs (body, sort_order) VALUES
  ('Owlighting dimulai dari passion terhadap otomotif dan teknologi pencahayaan. Kami percaya bahwa pencahayaan yang baik bukan hanya soal estetika, tapi juga keselamatan berkendara di malam hari.', 1),
  ('Dimulai dari garasi kecil di tahun 2019, kami bertekad memberikan solusi pencahayaan terbaik dengan teknologi terkini. Kini, dengan dilengkapi CNC Laser dan 3D Printer, kami mampu mewujudkan custom lighting yang bahkan tidak tersedia di pasaran.', 2),
  ('Dari sedan sport hingga motor trail, dari halogen kuning ke BILED putih tajam, kami telah mengubah ratusan kendaraan menjadi lebih aman dan lebih keren.', 3)
ON CONFLICT DO NOTHING;

-- ---------- WHY CHOOSE US -----------------------------------
INSERT INTO why_choose_us (icon, title, description, sort_order) VALUES
  ('FaPlug', 'Perkabelan Aman & Rapih',
   'Instalasi wiring profesional dengan kabel original, relay proteksi, dan fuse box. Dijamin tidak terbakar, aman untuk aki, dan rapih seperti factory install.', 1),
  ('FaShieldAlt', 'Safety First - Anti Soak Aki',
   'Sistem kelistrikan dengan relay dan socket proper untuk melindungi aki dari konslet. Tidak ada kabel yang langsung ke aki tanpa pengaman.', 2),
  ('FaMicroscope', 'Teknologi Presisi',
   'In-house CNC Laser & 3D Printer untuk fabrikasi bracket dan shroud custom. Presisi hingga milimeter.', 3),
  ('FaBolt', 'Garansi Kualitas',
   'Semua hasil pekerjaan dijamin. Fokus cahaya rapi, cut-off sempurna, tidak menyilaukan. Termasuk garansi instalasi kelistrikan.', 4),
  ('FaBullseye', 'Konsultasi Gratis',
   'Tim kami siap membantu memilih solusi terbaik untuk kendaraan Anda. Dari BILED hingga custom DRL.', 5),
  ('FaTools', 'Pengalaman 5+ Tahun',
   'Ratusan mobil dan motor telah kami kerjakan tanpa kasus terbakar atau aki soak.', 6),
  ('FaLightbulb', 'Original Parts',
   'Kami hanya menggunakan komponen original dan berkualitas. Ballast branded, kabel tembaga murni, relay Bosch/Tyco.', 7),
  ('FaRocket', 'Inovasi Terus Menerus',
   'Selalu update dengan teknologi lighting terbaru. Dari D2 Laser hingga Matrix LED.', 8)
ON CONFLICT DO NOTHING;

-- ---------- FACILITIES --------------------------------------
INSERT INTO facilities (title, description, image_url, tone, sort_order) VALUES
  ('CNC Laser Precision', 'Fabrikasi bracket & dudukan custom',
   'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop',
   'beam', 1),
  ('3D Printing Studio', 'Prototyping & custom shroud',
   'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=1171&auto=format&fit=crop',
   'halo', 2),
  ('Testing Lab', 'Quality control & beam pattern testing',
   'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop',
   'beam', 3),
  ('Clean Workshop', 'AC, lift hydraulic, full tools',
   'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop',
   'halo', 4)
ON CONFLICT DO NOTHING;

-- ---------- FAQS --------------------------------------------
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

-- ---------- TIKTOK VIDEOS (optional sample) -----------------
INSERT INTO tiktok_videos (video_id, title, description, category, views) VALUES
  ('7123456789012345678', 'BILED Retrofit untuk Avanza', 'Proses retrofit lampu BILED lengkap dari awal sampai hasil akhir.', 'Tutorial', '125K'),
  ('7123456789012345679', 'Custom DRL Motif Neon', 'Bikin DRL custom dengan motif neon yang aesthetic banget.', 'Custom Work', '89K'),
  ('7123456789012345680', 'Bahaya Retrofit Asal-Asalan', 'Kabel terbakar, relay jebol, aki soak — akibat retrofit yang tidak profesional.', 'Safety', '210K'),
  ('7123456789012345681', 'D2 Laser vs Halogen', 'Perbandingan langsung cahaya D2 Laser dengan halogen standar.', 'Comparison', '156K'),
  ('7123456789012345682', '3D Printing Shroud Custom', 'Bikin shroud lampu yang gak ada di pasaran pakai 3D printing.', 'Technology', '98K'),
  ('7123456789012345683', 'CNC Laser Precision Work', 'Lihat prosesnya mesin CNC laser bekerja dengan presisi 0.01mm.', 'Technology', '134K')
ON CONFLICT (video_id) DO NOTHING;

-- ---------- SITE SETTINGS -----------------------------------
INSERT INTO site_settings (key, value, description) VALUES
  ('working_hours',  'Senin - Sabtu: 09.00 - 18.00', 'Jam kerja workshop (format: "Senin - Sabtu: 09.00 - 18.00")'),
  ('hero_hashtag',   '#MENOLAKGELAP',                'Hashtag tagline di Hero'),
  ('feature_videos', 'true',                          'Tampilkan section video / blog'),
  ('feature_supabase_content', 'true',                'Toggle global: pakai data Supabase atau fallback statis')
ON CONFLICT (key) DO NOTHING;
