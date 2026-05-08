"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import { contactInfo, services } from "@/data";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaArrowRight,
} from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { FormField, fieldClasses } from "../components/ui/FormField";
import { StatusDot } from "../components/ui/StatusDot";
import { useToast } from "../components/ui/Toast";
import { useFormState } from "../hooks/useFormState";
import { buildReservationMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { getOpenStatus } from "@/lib/operating-hours";
import { createReservation } from "@/lib/api";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useEffect, useState } from "react";

type ReservationFields = {
  name: string;
  phone: string;
  vehicle: string;
  vehicleModel: string;
  service: string;
  date: string;
};

const initialValues: ReservationFields = {
  name: "",
  phone: "",
  vehicle: "Mobil",
  vehicleModel: "",
  service: "BILED Retrofit",
  date: "",
};

function validate(values: ReservationFields) {
  const errors: Partial<Record<keyof ReservationFields, string>> = {};
  if (values.name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter";
  }
  if (values.phone && !/^(\+?62|0)[0-9]{8,12}$/.test(values.phone.replace(/\s|-/g, ""))) {
    errors.phone = "Format nomor tidak valid (contoh: 0812xxxxxxxx)";
  }
  if (!values.date) {
    errors.date = "Pilih rencana tanggal kunjungan";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(values.date) < today) {
      errors.date = "Tanggal tidak boleh di masa lalu";
    }
  }
  return errors;
}

export default function ReservationSection() {
  const form = useFormState<ReservationFields>(initialValues);
  const toast = useToast();
  const [openStatus, setOpenStatus] = useState(() => getOpenStatus(contactInfo.workingHours));

  useEffect(() => {
    // Refresh status every minute (cheap; no re-render storm because state only
    // updates when the boolean or label actually changes)
    const id = setInterval(() => {
      setOpenStatus((prev) => {
        const next = getOpenStatus(contactInfo.workingHours);
        return prev.open === next.open && prev.nextChange === next.nextChange ? prev : next;
      });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(form.values);
    if (Object.keys(errors).length > 0) {
      form.setErrors(errors);
      toast.push("Periksa kembali form Anda", "error");
      return;
    }

    form.setStatus("loading");
    const link = buildWhatsAppLink({
      message: buildReservationMessage(form.values),
    });

    // Best-effort: log the lead to Supabase so the admin dashboard sees it
    // even if the customer never replies on WhatsApp. We don't block the
    // redirect on this — the WA hand-off remains the source of truth.
    if (isSupabaseConfigured) {
      void createReservation({
        name: form.values.name,
        phone: form.values.phone || null,
        vehicle: form.values.vehicle,
        vehicle_model: form.values.vehicleModel || null,
        service: form.values.service,
        preferred_date: form.values.date || null,
        notes: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      }).catch(() => {
        /* swallow — UX must not depend on Supabase */
      });
    }

    // Tiny artificial delay so the user sees the loading→success arc instead of
    // a single jarring window-open. Logic preserved: still redirects to wa.me.
    setTimeout(() => {
      form.setStatus("success");
      toast.push("Mengarahkan ke WhatsApp...", "success");
      window.open(link, "_blank", "noopener,noreferrer");
      setTimeout(() => form.setStatus("idle"), 1200);
    }, 600);
  };

  return (
    <section id="reservation" className="relative section-y">
      {/* Subtle background image */}
      <div aria-hidden className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1920&auto=format&fit=crop)",
          }}
        />
      </div>

      <div className="section-divider mb-16 md:mb-20" />

      <div className="container-x relative z-10">
        <SectionHeader
          index="07"
          eyebrow="Konsultasi Gratis"
          title="Tanya dulu,"
          accent="tidak harus jadi."
          accentTone="italic"
          description={
            <>
              Hubungi Owlighting untuk konsultasi gratis, survey headlamp, dan estimasi harga
              terbaik. Kami pastikan dulu setup yang cocok sebelum minta deposit.
            </>
          }
        />

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Reservation Form first on mobile (conversion-driven) */}
          <AnimatedSection delay={0.2} className="md:order-2">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-strong gradient-border-card rounded-2xl p-6 md:p-8 space-y-5 border border-white/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Kirim Pesan via WhatsApp</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                  <StatusDot open={openStatus.open} />
                  {openStatus.open ? "Buka" : "Tutup"}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                Isi form di bawah, Anda akan diarahkan ke WhatsApp kami.
              </p>

              <FormField label="Nama Lengkap" required error={form.errors.name}>
                <input
                  type="text"
                  value={form.values.name}
                  onChange={(e) => form.setField("name", e.target.value)}
                  className={form.errors.name ? fieldClasses.inputError : fieldClasses.input}
                  placeholder="Nama Anda"
                />
              </FormField>

              <FormField
                label="No. HP / WhatsApp"
                hint="Opsional — kami balas via WA Anda"
                error={form.errors.phone}
              >
                <input
                  type="tel"
                  value={form.values.phone}
                  onChange={(e) => form.setField("phone", e.target.value)}
                  className={form.errors.phone ? fieldClasses.inputError : fieldClasses.input}
                  placeholder="08xxxxxxxxxx"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Jenis Kendaraan">
                  <select
                    value={form.values.vehicle}
                    onChange={(e) => form.setField("vehicle", e.target.value)}
                    className={fieldClasses.input}
                  >
                    {["Mobil", "Motor", "Truk", "Lainnya"].map((opt) => (
                      <option key={opt} className="bg-bg-card text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Rencana Tanggal" required error={form.errors.date}>
                  <input
                    type="date"
                    value={form.values.date}
                    onChange={(e) => form.setField("date", e.target.value)}
                    className={form.errors.date ? fieldClasses.inputError : fieldClasses.input}
                  />
                </FormField>
              </div>

              <FormField
                label="Tipe & Tahun Kendaraan"
                hint="Contoh: Avanza 2018, Honda PCX 2022"
              >
                <input
                  type="text"
                  value={form.values.vehicleModel}
                  onChange={(e) => form.setField("vehicleModel", e.target.value)}
                  className={fieldClasses.input}
                  placeholder="Tipe & tahun kendaraan"
                />
              </FormField>

              <FormField label="Layanan yang Diinginkan">
                <select
                  value={form.values.service}
                  onChange={(e) => form.setField("service", e.target.value)}
                  className={fieldClasses.input}
                >
                  {services.map((svc) => (
                    <option key={svc.id} className="bg-bg-card text-white">
                      {svc.title}
                    </option>
                  ))}
                  <option className="bg-bg-card text-white">Konsultasi</option>
                </select>
              </FormField>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={form.status === "loading"}
                rightIcon={<FaArrowRight size={14} />}
              >
                {form.status === "loading"
                  ? "Mengirim..."
                  : form.status === "success"
                    ? "Berhasil!"
                    : "Kirim via WhatsApp"}
              </Button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.1} className="md:order-1">
            <div className="space-y-4">
              <motion.a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-beam-400/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-beam-400/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt size={20} className="text-beam-400" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">Alamat Workshop</h3>
                  <p className="text-text-secondary text-sm">{contactInfo.address}</p>
                  <p className="text-xs text-beam-400/80 mt-2 inline-flex items-center gap-1.5">
                    <StatusDot open={openStatus.open} />
                    {contactInfo.workingHours}
                    {openStatus.nextChange && (
                      <span className="text-text-tertiary">· {openStatus.nextChange}</span>
                    )}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`https://wa.me/${contactInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-beam-400/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-beam-400/10 flex items-center justify-center shrink-0">
                  <FaPhone size={18} className="text-beam-400" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">WhatsApp</h3>
                  <p className="text-text-secondary text-sm">{contactInfo.phone}</p>
                  <p className="text-xs text-beam-400/80 mt-2">
                    Response avg &lt; 5 menit jam kerja
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${contactInfo.email}`}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-beam-400/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-beam-400/10 flex items-center justify-center shrink-0">
                  <FaEnvelope size={18} className="text-beam-400" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">Email</h3>
                  <p className="text-text-secondary text-sm">{contactInfo.email}</p>
                  <p className="text-xs text-beam-400/80 mt-2">
                    Untuk pertanyaan detail & penawaran
                  </p>
                </div>
              </motion.a>

              {/* Social Media */}
              <div className="glass-strong rounded-xl p-5 border border-white/5">
                <h3 className="font-bold mb-3 text-white">Follow Kami</h3>
                <div className="flex gap-3">
                  {[
                    { href: contactInfo.socialMedia.instagram, Icon: FaInstagram, label: "Instagram" },
                    { href: contactInfo.socialMedia.facebook, Icon: FaFacebook, label: "Facebook" },
                    { href: contactInfo.socialMedia.tiktok, Icon: FaTiktok, label: "TikTok" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-beam-400/15 transition-all border border-white/5 hover:border-beam-400/30"
                    >
                      <Icon size={20} className="text-white/70" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/5 h-56">
                <iframe
                  title="Lokasi Owlighting Garage"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.4828234435536!2d105.69069977576999!3d-5.18651375232907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e408b56d808543d%3A0xfe041c69b4ae9a81!2sOWLighting%20Garage!5e0!3m2!1sen!2sus!4v1773880081745!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
