"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactInfo, companyInfo } from "@/data";
import type { PortfolioProject } from "@/lib/supabase";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { StatusDot } from "./ui/StatusDot";
import { getOpenStatus } from "@/lib/operating-hours";

export default function Footer() {
  const pathname = usePathname();
  const [openStatus, setOpenStatus] = useState(() =>
    getOpenStatus(contactInfo.workingHours),
  );
  const [recentProjects, setRecentProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setOpenStatus((prev) => {
        const next = getOpenStatus(contactInfo.workingHours);
        return prev.open === next.open && prev.nextChange === next.nextChange
          ? prev
          : next;
      });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Latest projects load client-side via the Supabase anon key (public read RLS).
  // Footer is shared across server + client trees, so this avoids forcing every
  // parent page to fetch and pass the same prop.
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(3);
      if (!cancelled && data) setRecentProjects(data as PortfolioProject[]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/services", label: "Layanan" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Video & Review" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-bg-raised">
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beam-400/30 to-transparent"
      />

      <div className="container-x py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4"
              title="Owlighting - Custom BILED Lampung Timur"
            >
              <Image
                src="/assets/logo.png"
                alt="Owlighting Logo - Spesialis Custom BILED Lampung Timur"
                width={160}
                height={40}
              />
            </Link>
            <p className="font-editorial italic text-base text-white/80 leading-snug mb-4 max-w-xs">
              Studio rekayasa cahaya untuk mobil &amp; motor.
            </p>
            <p className="text-xs text-text-secondary leading-relaxed mb-5">
              Retrofit BILED, D2 Laser, DRL Matrix — dengan garansi resmi.
            </p>

            {/* Operating-hours status — small mono pill */}
            <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-text-tertiary mb-5">
              <StatusDot open={openStatus.open} />
              <span>{openStatus.open ? "Buka" : "Tutup"}</span>
              {openStatus.nextChange && (
                <>
                  <span aria-hidden>·</span>
                  <span>{openStatus.nextChange}</span>
                </>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {[
                {
                  href: contactInfo.socialMedia.instagram,
                  Icon: FaInstagram,
                  label: "Instagram",
                },
                {
                  href: contactInfo.socialMedia.facebook,
                  Icon: FaFacebook,
                  label: "Facebook",
                },
                {
                  href: contactInfo.socialMedia.tiktok,
                  Icon: FaTiktok,
                  label: "TikTok",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-beam-400/15 hover:border-beam-400/30 transition-all border border-transparent"
                  aria-label={`${label} Owlighting`}
                  title={label}
                >
                  <Icon size={15} className="text-text-secondary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="eyebrow mb-4">Navigasi</h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-beam-400 transition-colors inline-flex items-center gap-1.5 group"
                    title={link.label}
                  >
                    <span className="w-1 h-1 rounded-full bg-beam-400/40 group-hover:bg-beam-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection("reservation")}
                  className="text-text-secondary hover:text-beam-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-beam-400/40 group-hover:bg-beam-400 transition-colors" />
                  Konsultasi Gratis
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-beam-400 transition-colors flex items-start gap-2.5"
                  title="Lokasi Bengkel Custom BILED Owlighting"
                >
                  <FaMapMarkerAlt
                    size={13}
                    className="text-beam-400/70 mt-0.5 shrink-0"
                  />
                  <span className="leading-relaxed">
                    Jl. Danau Km.1, Sumberjo, Way Jepara, Lampung Timur 34396
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsappNumber}?text=Halo%20Owlighting,%20saya%20ingin%20konsultasi%20Custom%20BILED`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-beam-400 transition-colors flex items-center gap-2.5"
                  title="WhatsApp Owlighting"
                >
                  <FaPhone size={12} className="text-beam-400/70 shrink-0" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-text-secondary hover:text-beam-400 transition-colors flex items-center gap-2.5"
                  title="Email Owlighting"
                >
                  <FaEnvelope size={12} className="text-beam-400/70 shrink-0" />
                  <span className="truncate">{contactInfo.email}</span>
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-white/5 font-mono-tech text-[10px] text-text-tertiary tabular leading-relaxed">
                <p>05°11&prime;11&Prime;S · 105°41&prime;26&Prime;E</p>
                <p className="mt-1">EST. 2019 · WAY JEPARA</p>
              </li>
            </ul>
          </div>

          {/* Latest projects */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="eyebrow mb-4">Karya Terbaru</h3>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5 mb-3">
              {recentProjects.map((p) => (
                <Link
                  key={p.id}
                  href="/portfolio"
                  className="group flex items-center gap-3 md:bg-white/[0.02] md:border md:border-white/5 md:rounded-lg md:p-2 md:hover:border-beam-400/30 md:hover:bg-beam-400/5 transition-colors"
                >
                  <div className="relative w-full md:w-12 aspect-square md:aspect-square shrink-0 rounded-md overflow-hidden">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 33vw, 48px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="hidden md:block min-w-0 flex-1">
                    <p className="text-xs text-white truncate font-medium group-hover:text-beam-400 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-text-tertiary">
                      {p.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-beam-400 hover:text-beam-200 transition-colors group/link"
            >
              Lihat semua karya
              <FaArrowRight
                size={10}
                className="group-hover/link:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-text-tertiary"
        >
          <div className="flex items-center gap-1.5">
            © {new Date().getFullYear()} {companyInfo.name}. Made with{" "}
            <FaHeart size={11} className="text-danger/80" /> di Lampung Timur.
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-beam-400 transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-beam-400 transition-colors"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
