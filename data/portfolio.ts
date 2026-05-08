// Gallery before/after images
// NOTE: replace Unsplash placeholders with workshop-shot photos when assets are ready.
// The CMS-managed copy in `gallery_images` table will override these once populated.
export const galleryImages = [
  {
    id: "biled-retrofit-avanza",
    title: "BILED Retrofit",
    vehicle: "Toyota Avanza 2018",
    description: "Halogen kuning 3.200 lx → BILED putih tajam 6000 K dengan cut-off RHD presisi.",
    category: "mobil",
    serviceTag: "BILED Retrofit",
    beforeImage:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200&auto=format&fit=crop",
    sliderColor: "#00C2FF",
    luxBefore: 3200,
    luxAfter: 18500,
    durationDays: 1,
  },
  {
    id: "d2-laser-jazz",
    title: "D2 Laser Foglamp",
    vehicle: "Honda Jazz 2020",
    description: "Foglamp standar redup → cahaya kristal dual-color, IP67, tembus kabut.",
    category: "mobil",
    serviceTag: "D2 Laser",
    beforeImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    sliderColor: "#FFB800",
    luxBefore: 1800,
    luxAfter: 12000,
    durationDays: 1,
  },
];

// Portfolio projects
export const portfolioProjects = [
  {
    id: "alphard-led",
    category: "mobil",
    title: "Toyota Alphard - Full LED Retrofit",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop",
    description: "BILED Projector + DRL Sequential",
  },
  {
    id: "civic-laser",
    category: "mobil",
    title: "Honda Civic Type R - Laser Foglamp",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?w=800&auto=format&fit=crop",
    description: "D2 Laser 6000K + Angel Eyes",
  },
  {
    id: "r15-custom",
    category: "motor",
    title: "Yamaha R15 - Custom Headlight",
    image:
      "https://images.unsplash.com/photo-1558981033-6f4b0b2eecc0?w=800&auto=format&fit=crop",
    description: "Mini Projector BILED + Devil Eyes",
  },
  {
    id: "mercedes-matrix",
    category: "mobil",
    title: "Mercedes E-Class - Matrix LED",
    image:
      "https://images.unsplash.com/photo-1617531653520-bd466356b3ff?w=800&auto=format&fit=crop",
    description: "Full matrix LED dengan auto leveling",
  },
  {
    id: "custom-drl",
    category: "custom",
    title: "Custom DRL Strip - 3D Printed Shroud",
    image:
      "https://images.unsplash.com/photo-1606557761934-e7058d9c2481?w=800&auto=format&fit=crop",
    description: "Desain unik dengan bracket CNC",
  },
  {
    id: "bmw-adaptive",
    category: "mobil",
    title: "BMW M3 - Adaptive Headlight",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop",
    description: "Retrofit bi-xenon dengan auto aim",
  },
  {
    id: "ninja-led",
    category: "motor",
    title: "Kawasaki Ninja - LED Conversion",
    image:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop",
    description: "Full LED setup dengan custom bracket",
  },
  {
    id: "lazy-eyes",
    category: "custom",
    title: "Lazy Eyes Project - Show Car",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop",
    description: "Lazy eyes mekanik + RGB underglow",
  },
];

// Testimonials
export const testimonials = [
  {
    id: "testi-1",
    name: "Budi S.",
    vehicle: "Toyota Alphard",
    text: "Hasil retrofit BILED-nya sempurna! Fokus cahaya tajam, cut-off rapi. Malam hari jadi lebih aman berkendara.",
    rating: 5,
  },
  {
    id: "testi-2",
    name: "Andi P.",
    vehicle: "Honda Civic",
    text: "Custom DRL pakai 3D print, hasilnya gila! Detail banget dan rapi. Timnya profesional, konsultasinya detail.",
    rating: 5,
  },
  {
    id: "testi-3",
    name: "Reza M.",
    vehicle: "Yamaha R15",
    text: "Dari halogen kuning langsung ke BILED putih. Beda banget! Workshop-nya bersih, garansi juga jelas.",
    rating: 5,
  },
];

// Stats untuk homepage
export const stats = [
  {
    id: "vehicles",
    value: "500+",
    label: "Kendaraan",
  },
  {
    id: "satisfaction",
    value: "99%",
    label: "Kepuasan",
  },
  {
    id: "experience",
    value: "5+",
    label: "Tahun Pengalaman",
  },
  {
    id: "precision",
    value: "100%",
    label: "Presisi",
  },
];
