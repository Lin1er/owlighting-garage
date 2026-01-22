import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import TechSection from "./sections/TechSection";
import ServicesSection from "./sections/ServicesSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import SafetySection from "./sections/SafetySection";
import GallerySection from "./sections/GallerySection";
import ReservationSection from "./sections/ReservationSection";
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
      <TechSection />
      <ServicesSection />
      <BeforeAfterSection />
      <SafetySection />
      <GallerySection />
      <ReservationSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
