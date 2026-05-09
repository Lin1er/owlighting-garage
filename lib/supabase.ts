import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when the project is wired to a real Supabase backend. */
export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

/**
 * Public Supabase client.
 *
 * The historical code used a non-null-asserted client which threw at module
 * load time if env vars were missing — making the whole site unbuildable in
 * dev environments without a Supabase project. We now lazily build a client
 * only when both keys are present and surface `isSupabaseConfigured` so
 * callers can fall back to bundled static data without a try/catch.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;

// ============================================================
// Database types
// ============================================================

export type TikTokVideo = {
  id: number;
  video_id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  views?: string;
  created_at: string;
  updated_at: string;
};

export type PortfolioProject = {
  id: number;
  slug?: string | null;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  before_image_url?: string | null;
  after_image_url?: string | null;
  sort_order?: number | null;
  featured?: boolean | null;
  published?: boolean | null;
  lux_before?: number | null;
  lux_after?: number | null;
  year?: number | null;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: number;
  slug?: string | null;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  sort_order?: number | null;
  price_from?: string | null;
  price_note?: string | null;
  duration?: string | null;
  category?: string | null;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  name: string;
  location: string | null;
  rating: number;
  comment: string;
  image_url?: string | null;
  vehicle?: string | null;
  service_tag?: string | null;
  instagram_handle?: string | null;
  featured?: boolean | null;
  published?: boolean | null;
  sort_order?: number | null;
  work_date?: string | null;
  created_at: string;
  updated_at: string;
};

export type HomepageStat = {
  id: number;
  slug: string;
  value: string;
  label: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: number;
  slug: string | null;
  title: string;
  category: string;
  before_image_url: string;
  after_image_url: string;
  slider_color: string | null;
  service_tag: string | null;
  vehicle: string | null;
  lux_before: number | null;
  lux_after: number | null;
  duration_days: number | null;
  description: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: number;
  name: string;
  phone: string | null;
  vehicle: string;
  vehicle_model: string | null;
  service: string;
  preferred_date: string | null;
  source: string;
  status: "new" | "contacted" | "won" | "lost";
  notes: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  key: string;
  value: string | null;
  description: string | null;
  updated_at: string;
};

export type CompanyParagraph = {
  id: number;
  body: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type WhyChooseItem = {
  id: number;
  icon: string | null;
  title: string;
  description: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Facility = {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  tone: "beam" | "halo" | string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
