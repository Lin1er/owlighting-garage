# Data Centralization - Owlighting Website

Semua data yang ditampilkan di website telah dipindahkan ke folder `data/` untuk memudahkan maintenance dan update.

## Struktur Folder Data

```
data/
├── index.ts          # Barrel export untuk semua data
├── company.ts        # Data perusahaan, kontak, story, USP, facilities
├── services.ts       # Data layanan yang ditawarkan
└── portfolio.ts      # Data portfolio, gallery, testimonials, stats
```

## File Details

### 1. `data/company.ts`

**Exports:**

- `contactInfo` - Informasi kontak (phone, email, address, hours, whatsapp, social media)
- `companyInfo` - Info perusahaan (name, tagline, description, established, location)
- `companyStory` - Array cerita perusahaan (3 paragraphs)
- `whyChooseUs` - Array alasan memilih Owlighting (6 items)
- `facilities` - Array fasilitas workshop (4 items dengan images)

**Digunakan di:**

- `app/components/Footer.tsx` - contactInfo, companyInfo
- `app/components/ReservationSection.tsx` - contactInfo
- `app/about/page.tsx` - companyInfo, companyStory, whyChooseUs, facilities

### 2. `data/services.ts`

**Exports:**

- `services` - Array layanan (BILED Retrofit, D2 Laser, Custom CNC)

**Digunakan di:**

- `app/components/ServicesSection.tsx`

### 3. `data/portfolio.ts`

**Exports:**

- `galleryImages` - Array gambar before/after untuk comparison slider (2 items)
- `portfolioProjects` - Array project portfolio (8 items dengan kategori)
- `testimonials` - Array testimonial pelanggan (3 items)
- `stats` - Array statistik untuk homepage (4 items)

**Digunakan di:**

- `app/components/GallerySection.tsx` - galleryImages, stats
- `app/portfolio/page.tsx` - portfolioProjects, testimonials

### 4. `data/index.ts`

Barrel export yang meng-export semua data dari file lain. Memudahkan import:

```typescript
// Sebelum
import { contactInfo } from "@/data/company";
import { services } from "@/data/services";

// Sesudah (lebih clean)
import { contactInfo, services } from "@/data";
```

## Cara Update Data

### Update Kontak

Edit `data/company.ts`, bagian `contactInfo`:

```typescript
export const contactInfo = {
  phone: "+62 812-3456-7890", // Update nomor disini
  email: "hello@owlighting.com", // Update email disini
  // ...
};
```

### Tambah Service Baru

Edit `data/services.ts`, tambah object baru ke array:

```typescript
export const services = [
  // ... existing services
  {
    id: "new-service",
    title: "Service Baru",
    description: "Deskripsi service",
    icon: "🔥",
    features: ["Feature 1", "Feature 2"],
  },
];
```

### Update Gallery Images

Edit `data/portfolio.ts`, bagian `galleryImages`:

```typescript
export const galleryImages = [
  {
    id: "unique-id",
    title: "Judul Gambar",
    category: "mobil", // mobil | motor | custom
    beforeImage: "URL_BEFORE",
    afterImage: "URL_AFTER",
    sliderColor: "#00C2FF", // primary or #FFB800 (accent)
  },
  // ...
];
```

### Tambah Portfolio Project

Edit `data/portfolio.ts`, bagian `portfolioProjects`:

```typescript
export const portfolioProjects = [
  // ... existing projects
  {
    id: "project-id",
    category: "mobil", // mobil | motor | custom
    title: "Judul Project",
    image: "URL_GAMBAR",
    description: "Deskripsi singkat",
  },
];
```

### Tambah Testimonial

Edit `data/portfolio.ts`, bagian `testimonials`:

```typescript
export const testimonials = [
  // ... existing testimonials
  {
    id: "testi-4",
    name: "Nama Customer",
    vehicle: "Jenis Kendaraan",
    text: "Testimonial text disini...",
    rating: 5, // 1-5
  },
];
```

## Keuntungan Centralization

✅ **Single Source of Truth** - Semua data di satu tempat
✅ **Easy to Update** - Cukup edit file data, tidak perlu cari di component
✅ **Type Safety** - TypeScript memastikan struktur data konsisten
✅ **Reusable** - Data bisa dipakai di multiple components
✅ **Maintainable** - Lebih mudah maintain dan debug

## Import Examples

```typescript
// Import specific items
import { contactInfo, services } from "@/data";

// Import specific file
import { galleryImages } from "@/data/portfolio";

// Import all from one file
import * as CompanyData from "@/data/company";
```
