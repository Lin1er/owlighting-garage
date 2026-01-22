-- Create tables for Owlighting CMS

-- TikTok Videos Table
CREATE TABLE IF NOT EXISTS tiktok_videos (
  id SERIAL PRIMARY KEY,
  video_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  views VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tiktok_videos_category ON tiktok_videos(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);

-- Insert sample data for TikTok Videos
INSERT INTO tiktok_videos (video_id, title, description, category, views) VALUES
('7123456789012345678', 'BILED Retrofit untuk Avanza', 'Proses retrofit lampu BILED lengkap dari awal sampai hasil akhir yang bikin mobil makin keren!', 'Tutorial', '125K'),
('7123456789012345679', 'Custom DRL Motif Neon', 'Bikin DRL custom dengan motif neon yang aesthetic banget. Teknologi CNC Laser presisi tinggi!', 'Custom Work', '89K'),
('7123456789012345680', 'Bahaya Retrofit Asal-Asalan', 'Kabel terbakar, relay jebol, aki soak - inilah akibat retrofit yang tidak profesional!', 'Safety', '210K'),
('7123456789012345681', 'D2 Laser vs Halogen', 'Perbandingan langsung cahaya D2 Laser dengan halogen standar. Bedanya kayak siang vs malam!', 'Comparison', '156K'),
('7123456789012345682', '3D Printing Shroud Custom', 'Bikin shroud lampu yang gak ada di pasaran pakai teknologi 3D printing. Unlimited possibilities!', 'Technology', '98K'),
('7123456789012345683', 'CNC Laser Precision Work', 'Lihat prosesnya mesin CNC laser bekerja dengan presisi 0.01mm untuk bikin bracket custom!', 'Technology', '134K')
ON CONFLICT (video_id) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tiktok_videos_updated_at BEFORE UPDATE ON tiktok_videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
