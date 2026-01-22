import { supabase } from "./supabase";
import { portfolioProjects as staticPortfolio } from "@/data/portfolio";
import { services as staticServices } from "@/data/services";
import { testimonials as staticTestimonials } from "@/data/portfolio";

// Fetch TikTok videos from database, fallback to empty array
export async function getTikTokVideos() {
  const { data, error } = await supabase
    .from("tiktok_videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}

// Fetch portfolio projects from database, fallback to static data
export async function getPortfolioProjects() {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching portfolio:", error);
    return staticPortfolio; // Fallback to static
  }

  // If no data in DB, return static
  return data && data.length > 0 ? data : staticPortfolio;
}

// Fetch services from database, fallback to static data
export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching services:", error);
    return staticServices; // Fallback to static
  }

  // If no data in DB, return static
  return data && data.length > 0 ? data : staticServices;
}

// Fetch testimonials from database, fallback to static data
export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return staticTestimonials; // Fallback to static
  }

  // If no data in DB, return static
  return data && data.length > 0 ? data : staticTestimonials;
}
