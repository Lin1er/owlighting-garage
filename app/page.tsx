import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechSection from "./components/TechSection";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import ReservationSection from "./components/ReservationSection";
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
      <GallerySection />
      <ReservationSection />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
