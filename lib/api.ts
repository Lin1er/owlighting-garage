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
  type CompanyParagraph,
  type WhyChooseItem,
  type Facility,
  type Faq,
} from "./supabase";

/**
 * Public-content API.
 *
 * All site content lives in Supabase. There is intentionally NO static
 * fallback baked into this file — if Supabase isn't configured the app
 * surfaces empty content rather than silently rendering stale seed data.
 * Run the seed script (`scripts/seed.mjs`) to populate the database.
 */

function logErr(label: string, err: unknown) {
  if (err) console.error(`[api] ${label}:`, err);
}

// ------------------------------------------------------------
// Tiktok / blog videos
// ------------------------------------------------------------

export async function getTikTokVideos(): Promise<TikTokVideo[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("tiktok_videos")
    .select("*")
    .order("created_at", { ascending: false });
  logErr("getTikTokVideos", error);
  return (data as TikTokVideo[]) ?? [];
}

// ------------------------------------------------------------
// Portfolio
// ------------------------------------------------------------

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  logErr("getPortfolioProjects", error);
  return (data as PortfolioProject[]) ?? [];
}

// ------------------------------------------------------------
// Services
// ------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  logErr("getServices", error);
  return (data as Service[]) ?? [];
}

// ------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });
  logErr("getTestimonials", error);
  return (data as Testimonial[]) ?? [];
}

// ------------------------------------------------------------
// Homepage stats
// ------------------------------------------------------------

export async function getHomepageStats(): Promise<HomepageStat[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("homepage_stats")
    .select("*")
    .order("sort_order", { ascending: true });
  logErr("getHomepageStats", error);
  return (data as HomepageStat[]) ?? [];
}

// ------------------------------------------------------------
// Gallery (before/after)
// ------------------------------------------------------------

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  logErr("getGalleryImages", error);
  return (data as GalleryImage[]) ?? [];
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
    logErr("createReservation", error);
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
  logErr("listReservations", error);
  return (data as Reservation[]) ?? [];
}

// ------------------------------------------------------------
// Site settings (key-value)
// ------------------------------------------------------------

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) return {};
  const { data, error } = await supabase.from("site_settings").select("*");
  logErr("getSiteSettings", error);
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

// ------------------------------------------------------------
// About page content — story paragraphs, why-choose-us, facilities
// ------------------------------------------------------------

export async function getCompanyParagraphs(): Promise<CompanyParagraph[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("company_paragraphs")
    .select("*")
    .order("sort_order", { ascending: true });
  logErr("getCompanyParagraphs", error);
  return (data as CompanyParagraph[]) ?? [];
}

export async function getWhyChooseUs(): Promise<WhyChooseItem[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("why_choose_us")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  logErr("getWhyChooseUs", error);
  return (data as WhyChooseItem[]) ?? [];
}

export async function getFacilities(): Promise<Facility[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  logErr("getFacilities", error);
  return (data as Facility[]) ?? [];
}

// ------------------------------------------------------------
// FAQs
// ------------------------------------------------------------

export async function getFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  logErr("getFaqs", error);
  return (data as Faq[]) ?? [];
}
