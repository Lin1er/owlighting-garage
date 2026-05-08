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

export default function Home() {
  return (
    <main className="relative">
      <StructuredData />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ProofBar />
      <TechSection />
      <StatsSection />
      <ServicesSection />
      <BeforeAfterSection />
      <SafetySection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
      <SEOContentSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
