/**
 * Configuration / SEO metadata.
 *
 * Anything in this file is *not* CMS-managed — it's either:
 *   • Driven by environment variables (contactInfo)
 *   • Used in <head> metadata where Supabase fetches don't fit (companyInfo)
 *
 * Editorial content (story paragraphs, why-choose-us, facilities, services,
 * portfolio, testimonials, gallery, FAQs, etc.) all live in Supabase and are
 * fetched via lib/api.ts. Do NOT add content arrays here.
 */

export const contactInfo = {
  phone: process.env.NEXT_PUBLIC_PHONE || "+62 856-5864-8413",
  email: process.env.NEXT_PUBLIC_EMAIL || "owlightinggarage@gmail.com",
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
    "Jl. Danau Km.1, Sumberjo, Way Jepara, Kabupaten Lampung Timur, Lampung 34396",
  workingHours:
    process.env.NEXT_PUBLIC_WORKING_HOURS || "Senin - Sabtu: 09.00 - 18.00",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285658648413", // tanpa + dan -
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    "https://maps.app.goo.gl/MvXVMty2vPcaZEB28",
  socialMedia: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/owlighting.garage/",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://web.facebook.com/el.sianakreggae?locale=id_ID",
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL ||
      "https://www.tiktok.com/@owlighting_garage",
  },
};

// Used in <Footer> copyright and metadata builders. Not user-editable.
export const companyInfo = {
  name: "Owlighting",
  tagline: "Custom Pencahayaan Kendaraan Presisi - BILED Lampung Timur",
  description:
    "Spesialis custom pencahayaan kendaraan dengan teknologi CNC & 3D Printing. Presisi tanpa kompromi. #MenolakGelap",
  established: "2019",
  location: "Lampung Timur, Indonesia",
};
