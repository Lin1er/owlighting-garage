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
  getWhyChooseUs,
} from "@/lib/api";

/**
 * Homepage. All sections receive their data via props from this server-side
 * fetch — no static fallbacks. If Supabase isn't reachable the relevant
 * section degrades to its empty state.
 */
export default async function Home() {
  const [stats, services, projects, testimonials, gallery, whyChooseUs] =
    await Promise.all([
      getHomepageStats(),
      getServices(),
      getPortfolioProjects(),
      getTestimonials(),
      getGalleryImages(),
      getWhyChooseUs(),
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
      <ReservationSection services={services} />
      <SEOContentSection services={services} whyChooseUs={whyChooseUs} />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
