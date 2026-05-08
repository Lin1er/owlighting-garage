import {
  supabase,
  isSupabaseConfigured,
  type PortfolioProject,
  type Service,
  type Testimonial,
  type HomepageStat,
  type GalleryImage,
  type Reservation,
  type SiteSetting,
  type TikTokVideo,
} from "./supabase";
import {
  portfolioProjects as staticPortfolio,
  testimonials as staticTestimonials,
  stats as staticStats,
  galleryImages as staticGallery,
} from "@/data/portfolio";
import { services as staticServices } from "@/data/services";

/**
 * Public-content API.
 *
 * Each fetch tries Supabase, then falls back to the bundled `data/*.ts`
 * constants. This means the site works in three modes without code changes:
 *
 *   1. No env vars set    → static data only (dev / first deploy)
 *   2. Empty Supabase      → static data shown as seed
 *   3. Populated Supabase  → CMS-driven content
 *
 * Server components can import these directly. Don't pass a Supabase row
 * straight into a section that expects the static shape — use the *Adapted
 * helpers below to normalize.
 */

// ------------------------------------------------------------
// Tiktok / blog videos
// ------------------------------------------------------------

export async function getTikTokVideos(): Promise<TikTokVideo[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("tiktok_videos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
  return (data as TikTokVideo[]) || [];
}

// ------------------------------------------------------------
// Portfolio
// ------------------------------------------------------------

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticPortfolio.map(adaptStaticPortfolio);
  }
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching portfolio:", error);
    return staticPortfolio.map(adaptStaticPortfolio);
  }
  return data as PortfolioProject[];
}

function adaptStaticPortfolio(
  p: (typeof staticPortfolio)[number],
  i: number,
): PortfolioProject {
  return {
    id: i + 1,
    slug: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    image_url: p.image,
    sort_order: i,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ------------------------------------------------------------
// Services
// ------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticServices.map(adaptStaticService);
  }
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching services:", error);
    return staticServices.map(adaptStaticService);
  }
  return data as Service[];
}

function adaptStaticService(
  s: (typeof staticServices)[number],
  i: number,
): Service {
  return {
    id: i + 1,
    slug: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
    features: s.features,
    is_active: true,
    sort_order: i,
    price_from: s.priceFrom ?? null,
    duration: s.duration ?? null,
    category: s.category ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticTestimonials.map(adaptStaticTestimonial);
  }
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching testimonials:", error);
    return staticTestimonials.map(adaptStaticTestimonial);
  }
  return data as Testimonial[];
}

function adaptStaticTestimonial(
  t: (typeof staticTestimonials)[number],
  i: number,
): Testimonial {
  return {
    id: i + 1,
    name: t.name,
    rating: t.rating,
    comment: t.text,
    location: null,
    vehicle: t.vehicle,
    published: true,
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ------------------------------------------------------------
// Homepage stats
// ------------------------------------------------------------

export async function getHomepageStats(): Promise<HomepageStat[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticStats.map(adaptStaticStat);
  }
  const { data, error } = await supabase
    .from("homepage_stats")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching stats:", error);
    return staticStats.map(adaptStaticStat);
  }
  return data as HomepageStat[];
}

function adaptStaticStat(
  s: (typeof staticStats)[number],
  i: number,
): HomepageStat {
  return {
    id: i + 1,
    slug: s.id,
    value: s.value,
    label: s.label,
    icon: ["FaCar", "FaStar", "FaClock", "FaBullseye"][i] ?? "FaStar",
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ------------------------------------------------------------
// Gallery (before/after)
// ------------------------------------------------------------

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticGallery.map(adaptStaticGallery);
  }
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching gallery:", error);
    return staticGallery.map(adaptStaticGallery);
  }
  return data as GalleryImage[];
}

function adaptStaticGallery(
  g: (typeof staticGallery)[number],
  i: number,
): GalleryImage {
  return {
    id: i + 1,
    slug: g.id,
    title: g.title,
    category: g.category,
    before_image_url: g.beforeImage,
    after_image_url: g.afterImage,
    slider_color: g.sliderColor,
    service_tag: g.serviceTag ?? null,
    vehicle: g.vehicle ?? null,
    lux_before: g.luxBefore ?? null,
    lux_after: g.luxAfter ?? null,
    duration_days: g.durationDays ?? null,
    description: g.description ?? null,
    published: true,
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ------------------------------------------------------------
// Reservations
// ------------------------------------------------------------

export type ReservationInput = Omit<
  Reservation,
  "id" | "created_at" | "updated_at" | "status" | "source"
> & {
  source?: string;
};

export async function createReservation(input: ReservationInput): Promise<{
  ok: boolean;
  id?: number;
  error?: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, error: "Supabase not configured" };
  }
  const { data, error } = await supabase
    .from("reservations")
    .insert([{ source: "reservation_form", ...input }])
    .select("id")
    .single();

  if (error) {
    console.error("Error creating reservation:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true, id: data?.id };
}

export async function listReservations(): Promise<Reservation[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("Error listing reservations:", error);
    return [];
  }
  return (data as Reservation[]) || [];
}

// ------------------------------------------------------------
// Site settings (key-value)
// ------------------------------------------------------------

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) return {};
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
  const map: Record<string, string> = {};
  for (const row of (data as SiteSetting[]) ?? []) {
    if (row.value != null) map[row.key] = row.value;
  }
  return map;
}

export async function getSetting(key: string): Promise<string | null> {
  const map = await getSiteSettings();
  return map[key] ?? null;
}

export async function updateSetting(key: string, value: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, error: "Supabase not configured" };
  }
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  return { ok: !error, error: error?.message };
}
