import { contactInfo } from "@/data/company";

export type WhatsAppParams = {
  /** Pre-filled message body. Real newlines are encoded automatically. */
  message?: string;
  /** Custom recipient (defaults to company WA number). */
  to?: string;
};

/**
 * Build a wa.me URL for chat-redirect from a CTA or form submit.
 *
 * Why: every CTA today repeats the same `wa.me/${num}?text=encode(...)` pattern;
 * centralising it prevents drift and lets us add UTM-style tracking later.
 */
export function buildWhatsAppLink({ message = "", to }: WhatsAppParams = {}): string {
  const recipient = (to ?? contactInfo.whatsappNumber).replace(/\D/g, "");
  const url = new URL(`https://wa.me/${recipient}`);
  if (message.trim().length > 0) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}

/** Format a service-inquiry message with consistent header/branding. */
export function buildServiceInquiry(serviceTitle: string): string {
  return [
    `Halo Owlighting,`,
    ``,
    `Saya tertarik dengan layanan: *${serviceTitle}*.`,
    `Mohon info lebih lanjut untuk konsultasi & estimasi harga.`,
    ``,
    `Terima kasih.`,
  ].join("\n");
}

/** Format a reservation message — used by the reservation form. */
export function buildReservationMessage(data: {
  name: string;
  phone?: string;
  vehicle: string;
  vehicleModel?: string;
  service: string;
  date: string;
}): string {
  const lines = [
    `*Reservasi Owlighting*`,
    ``,
    `Nama: ${data.name}`,
  ];
  if (data.phone) lines.push(`No. HP: ${data.phone}`);
  lines.push(`Jenis Kendaraan: ${data.vehicle}`);
  if (data.vehicleModel) lines.push(`Tipe & Tahun: ${data.vehicleModel}`);
  lines.push(`Layanan: ${data.service}`);
  lines.push(`Rencana Tanggal: ${data.date}`);
  return lines.join("\n");
}
