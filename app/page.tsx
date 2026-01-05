import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import TechSection from "./sections/TechSection";
import ServicesSection from "./sections/ServicesSection";
import SafetySection from "./sections/SafetySection";
import GallerySection from "./sections/GallerySection";
import ReservationSection from "./sections/ReservationSection";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingCTA from "./components/FloatingCTA";
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
      <SafetySection />
      <GallerySection />
      <ReservationSection />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
