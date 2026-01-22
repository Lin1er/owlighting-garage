import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type TikTokVideo = {
  id: number;
  video_id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  views?: number;
  created_at: string;
  updated_at: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  before_image_url?: string;
  after_image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};
