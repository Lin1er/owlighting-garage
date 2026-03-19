"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/services", label: "Layanan" },
    { href: "/portfolio", label: "Karya" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="OWLIGHTING Logo"
            width={200}
            height={50}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`cursor-pointer transition-colors relative group ${
                  pathname === link.href ? "text-primary" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
                {/* Active indicator line */}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li
            className="cursor-pointer hover:text-white transition-colors text-muted"
            onClick={() => scrollToSection("contact")}
          >
            Kontak
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-white block"
          />
        </button>

        <button
          onClick={() => scrollToSection("reservation")}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold rounded-xl glow-primary hover:scale-105 transition-all text-sm"
        >
          Reservasi Sekarang
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-primary/10"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 transition-colors rounded-lg px-3 ${
                    pathname === link.href
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2.5 text-muted hover:text-white transition-colors px-3 rounded-lg hover:bg-white/5"
              >
                Kontak
              </button>
              <button
                onClick={() => scrollToSection("reservation")}
                className="w-full px-5 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold rounded-xl glow-primary mt-3"
              >
                Reservasi Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
