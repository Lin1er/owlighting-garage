import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ProofBar from "./sections/ProofBar";
import TechSection from "./sections/TechSection";
import StatsSection from "./sections/StatsSection";
import ServicesSection from "./sections/ServicesSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import SafetySection from "./sections/SafetySection";
import GallerySection from "./sections/GallerySection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ReservationSection from "./sections/ReservationSection";
import SEOContentSection from "./sections/SEOContentSection";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppWidget from "./components/WhatsAppWidget";
import StructuredData from "./components/StructuredData";
import {
  getHomepageStats,
  getServices,
  getPortfolioProjects,
  getTestimonials,
  getGalleryImages,
} from "@/lib/api";

// All fetches degrade gracefully to bundled static data when Supabase env vars
// are missing — see lib/api.ts. Page stays statically renderable in that case.
export default async function Home() {
  const [stats, services, projects, testimonials, gallery] = await Promise.all([
    getHomepageStats(),
    getServices(),
    getPortfolioProjects(),
    getTestimonials(),
    getGalleryImages(),
  ]);

  return (
    <main className="relative">
      <StructuredData />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ProofBar />
      <TechSection />
      <StatsSection stats={stats} />
      <ServicesSection services={services} />
      <BeforeAfterSection comparisons={gallery} />
      <SafetySection />
      <GallerySection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <ReservationSection />
      <SEOContentSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
