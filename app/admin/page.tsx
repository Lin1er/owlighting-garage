"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured, type Reservation } from "@/lib/supabase";
import {
  FaVideo,
  FaImages,
  FaCog,
  FaStar,
  FaCalendarCheck,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "./_components/AdminShell";

type Counts = {
  portfolio: number;
  gallery: number;
  services: number;
  testimonials: number;
  videos: number;
  faqs: number;
  reservations: number;
  reservations_new: number;
};

const initialCounts: Counts = {
  portfolio: 0,
  gallery: 0,
  services: 0,
  testimonials: 0,
  videos: 0,
  faqs: 0,
  reservations: 0,
  reservations_new: 0,
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [recent, setRecent] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    const [
      portfolio,
      gallery,
      services,
      testimonials,
      videos,
      faqs,
      reservations,
      reservationsNew,
      recentReservations,
    ] = await Promise.all([
      supabase.from("portfolio_projects").select("*", { count: "exact", head: true }),
      supabase.from("gallery_images").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("tiktok_videos").select("*", { count: "exact", head: true }),
      supabase.from("faqs").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase
        .from("reservations")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    setCounts({
      portfolio: portfolio.count ?? 0,
      gallery: gallery.count ?? 0,
      services: services.count ?? 0,
      testimonials: testimonials.count ?? 0,
      videos: videos.count ?? 0,
      faqs: faqs.count ?? 0,
      reservations: reservations.count ?? 0,
      reservations_new: reservationsNew.count ?? 0,
    });
    setRecent((recentReservations.data ?? []) as Reservation[]);
    setLoading(false);
  };

  const cards = [
    { key: "portfolio", title: "Portfolio", icon: FaImages, href: "/admin/portfolio" },
    { key: "gallery", title: "Before / After", icon: FaImage, href: "/admin/gallery" },
    { key: "services", title: "Services", icon: FaCog, href: "/admin/services" },
    { key: "testimonials", title: "Testimonials", icon: FaStar, href: "/admin/testimonials" },
    { key: "videos", title: "Videos", icon: FaVideo, href: "/admin/videos" },
  ] as const;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan konten website dan reservasi terbaru."
      />

      {!isSupabaseConfigured && <NotConfiguredBanner />}

      {/* Reservations summary — biggest, on top */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <AdminCard className="p-5">
          <div className="flex items-start justify-between mb-3">
            <FaCalendarCheck className="text-beam-400" size={20} />
            <span className="text-[11px] uppercase tracking-widest text-text-tertiary">
              Reservasi Baru
            </span>
          </div>
          <div className="text-4xl font-bold tabular text-white">
            {loading ? "—" : counts.reservations_new}
          </div>
          <p className="text-xs text-text-secondary mt-1">
            dari total {counts.reservations} sepanjang masa
          </p>
          <Link
            href="/admin/reservations"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-beam-400 hover:text-beam-200"
          >
            Lihat semua reservasi <FaArrowRight size={10} />
          </Link>
        </AdminCard>

        <AdminCard className="p-5">
          <div className="flex items-start justify-between mb-3">
            <FaImages className="text-halo-300" size={20} />
            <span className="text-[11px] uppercase tracking-widest text-text-tertiary">
              Total Konten
            </span>
          </div>
          <div className="text-4xl font-bold tabular text-white">
            {loading
              ? "—"
              : counts.portfolio + counts.gallery + counts.services + counts.testimonials}
          </div>
          <p className="text-xs text-text-secondary mt-1">
            entri di seluruh tabel content
          </p>
        </AdminCard>
      </div>

      {/* Per-resource counts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="glass rounded-xl p-4 border border-white/5 hover:border-beam-400/30 hover:bg-beam-400/5 transition-all group"
          >
            <c.icon className="text-beam-400 mb-3" size={18} />
            <div className="text-2xl font-bold tabular text-white">
              {loading ? "—" : counts[c.key]}
            </div>
            <div className="text-xs text-text-secondary mt-1 group-hover:text-white transition-colors">
              {c.title}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent reservations */}
      <AdminCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Reservasi Terbaru</h2>
          <Link
            href="/admin/reservations"
            className="text-xs text-beam-400 hover:text-beam-200"
          >
            Lihat semua →
          </Link>
        </div>
        {loading ? (
          <p className="text-sm text-text-tertiary">Memuat…</p>
        ) : recent.length === 0 ? (
          <p className="text-sm text-text-tertiary">
            Belum ada reservasi tercatat. Submission baru akan muncul di sini.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map((r) => (
              <div key={r.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-text-secondary">
                    {r.vehicle}
                    {r.vehicle_model ? ` · ${r.vehicle_model}` : ""} ·{" "}
                    <span className="text-beam-400">{r.service}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold ${
                      r.status === "new"
                        ? "text-warning"
                        : r.status === "won"
                          ? "text-success"
                          : "text-text-tertiary"
                    }`}
                  >
                    {r.status}
                  </span>
                  <p className="text-[11px] text-text-tertiary mt-0.5">
                    {new Date(r.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
