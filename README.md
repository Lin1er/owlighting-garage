# Owlighting Website

Website custom pencahayaan kendaraan dengan teknologi CNC & 3D Printing.

## Fitur

✨ **Animasi Premium**

- Parallax scrolling pada hero section
- Animated light beams dengan gradien
- Animation on scroll (AOS) untuk semua section
- 3D tilt effect pada service cards
- Before/After slider interaktif untuk gallery
- Smooth transitions dan hover effects
- **Scroll progress indicator** di top
- **Floating CTA button** yang muncul saat scroll

🎨 **Design**

- Dark theme dengan aksen Electric Blue (#00C2FF) dan Amber (#FFB800)
- Glassmorphism navbar (sticky) dengan mobile hamburger menu
- Glow effects untuk elemen penting
- Responsive design (mobile + desktop)

� **Multi-page Website**

- **Homepage** (`/`) - Hero, USP, Services, Gallery, Reservation
- **About** (`/about`) - Company story, Why choose us, Facilities showcase
- **Portfolio** (`/portfolio`) - Filtered gallery (Mobil/Motor/Custom), Testimonials

�🚀 **Teknologi**

- Next.js 16 + TypeScript + App Router
- Tailwind CSS v4
- Framer Motion (animasi & page transitions)
- React Parallax Tilt (3D cards)
- React Compare Image (before/after slider)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Struktur Komponen

**Pages:**

- `app/page.tsx` - Homepage
- `app/about/page.tsx` - About page
- `app/portfolio/page.tsx` - Portfolio page with filter

**Components:**

- `Navbar` - Navigation bar dengan glassmorphism & mobile menu
- `Hero` - Hero section dengan parallax dan animated beams
- `TechSection` - USP section (CNC & 3D Printer)
- `ServicesSection` - Service cards dengan 3D tilt
- `GallerySection` - Before/after slider + stats
- `ReservationSection` - Form reservasi → WhatsApp
- `Footer` - Footer dengan quick links
- `ScrollProgress` - Progress bar saat scroll
- `FloatingCTA` - Floating chat button
- `AnimatedSection` - Wrapper untuk AOS animation
- `ServiceCard` - 3D tilt card component

## Customization

### Ganti nomor WhatsApp

Edit `app/components/ReservationSection.tsx` line 19:

```typescript
const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
  message
)}`;
```

### Ganti warna tema

Edit `app/globals.css`:

```css
:root {
  --primary: #00c2ff; /* Electric Blue */
  --accent: #ffb800; /* Warm Amber */
}
```

### Ganti gambar

Semua gambar saat ini dari Unsplash (placeholder).
Untuk ganti:

1. Upload gambar ke `public/images/`
2. Update path di komponen (contoh: `src="/images/hero.jpg"`)

**File yang perlu diganti:**

- Hero background: `app/components/Hero.tsx` (line ~31)
- CNC image: `app/components/TechSection.tsx` (line ~24)
- 3D Printer image: `app/components/TechSection.tsx` (line ~104)
- Gallery images: `app/components/GallerySection.tsx` (line ~36, ~50)

### Ganti konten teks

Edit masing-masing komponen di `app/components/`:

- Tagline hero: `Hero.tsx`
- Deskripsi layanan: `ServicesSection.tsx`
- Info kontak: `ReservationSection.tsx` & `Footer.tsx`

## Deploy

Build untuk production:

```bash
npm run build
npm start
```

Deploy ke Vercel (recommended):

```bash
npx vercel
```

## Notes

- Form reservasi akan membuka WhatsApp dengan template pesan
- Before/after slider bisa di-drag atau hover
- Semua animasi otomatis trigger saat scroll
- Images dari Unsplash mungkin perlu diganti dengan foto asli workshop/hasil kerja

---

Built with [Next.js](https://nextjs.org)
