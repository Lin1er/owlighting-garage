"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Beranda", title: "Home - Custom BILED Lampung Timur" },
  { href: "/about", label: "Tentang", title: "Tentang Owlighting" },
  { href: "/services", label: "Layanan", title: "Layanan Custom BILED" },
  { href: "/portfolio", label: "Portfolio", title: "Portfolio Custom BILED" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between py-3.5">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer shrink-0"
            title="Owlighting - Custom BILED Lampung Timur"
          >
            <Image
              src="/assets/logo.png"
              alt="Owlighting Logo"
              width={180}
              height={45}
              priority
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.title}
                    className={`relative px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-beam-400"
                        : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-beam-400 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => scrollToSection("reservation")}
                className="px-3 py-2 rounded-lg text-text-secondary hover:text-white transition-colors"
              >
                Kontak
              </button>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection("reservation")}
              title="Konsultasi Custom BILED Gratis"
            >
              Konsultasi Gratis
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 z-50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 md:hidden bg-bg-base/98 backdrop-blur-xl"
          >
            <div className="container-x pt-24 pb-12 h-full flex flex-col">
              <ul className="flex flex-col gap-1 mb-8">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        title={link.title}
                        className={`block py-4 text-3xl font-bold border-b border-white/5 transition-colors ${
                          isActive
                            ? "text-beam-400"
                            : "text-white hover:text-beam-200"
                        }`}
                      >
                        <span className="text-text-tertiary text-base font-mono mr-3">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + NAV_LINKS.length * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection("reservation")}
                    className="block w-full text-left py-4 text-3xl font-bold border-b border-white/5 text-white hover:text-beam-200 transition-colors"
                  >
                    <span className="text-text-tertiary text-base font-mono mr-3">
                      0{NAV_LINKS.length + 1}
                    </span>
                    Kontak
                  </button>
                </motion.li>
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => scrollToSection("reservation")}
                >
                  Konsultasi Custom BILED Gratis
                </Button>
                <p className="text-center text-xs text-text-tertiary mt-4 tracking-[0.3em] uppercase">
                  #MENOLAKGELAP
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
