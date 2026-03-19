"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { contactInfo, companyInfo } from "@/data";
import { FaInstagram, FaFacebook, FaTiktok, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/logo.png"
                alt="OWLIGHTING Logo"
                width={160}
                height={40}
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {companyInfo.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                aria-label="Instagram"
              >
                <FaInstagram size={18} className="text-white/70" />
              </a>
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                aria-label="Facebook"
              >
                <FaFacebook size={18} className="text-white/70" />
              </a>
              <a
                href={contactInfo.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                aria-label="TikTok"
              >
                <FaTiktok size={18} className="text-white/70" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "Beranda" },
                { href: "/about", label: "Tentang Kami" },
                { href: "/services", label: "Layanan Bengkel" },
                { href: "/portfolio", label: "Hasil Karya" },
                { href: "/blog", label: "Video Edukasi & Review" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection("reservation")}
                  className="text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  Konsultasi & Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors flex items-start gap-2.5"
                >
                  <FaMapMarkerAlt size={14} className="text-primary/60 mt-0.5 shrink-0" />
                  <span>{contactInfo.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-muted hover:text-primary transition-colors flex items-center gap-2.5"
                >
                  <FaPhone size={13} className="text-primary/60 shrink-0" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-muted hover:text-primary transition-colors flex items-center gap-2.5"
                >
                  <FaEnvelope size={13} className="text-primary/60 shrink-0" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-white/5">
                <span className="text-primary font-bold text-lg">#MenolakGelap</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted"
        >
          <div className="flex items-center gap-1">
            © {new Date().getFullYear()} {companyInfo.name}. Made with{" "}
            <FaHeart size={12} className="text-red-400 mx-0.5" /> in Lampung Timur.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors text-xs">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors text-xs">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
