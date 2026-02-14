import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import HeroSection from '@/components/HeroSection';
import ServicePillars from '@/components/ServicePillars';
import PortfolioGrid from '@/components/PortfolioGrid';
import TechConstellation from '@/components/TechConstellation';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const lenisRef = useSmoothScroll();

  // Add lenis class to html element for proper styling
  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Divider */}
      <div className="section-divider" />
      
      {/* Service Pillars */}
      <ServicePillars />
      
      {/* Divider */}
      <div className="section-divider" />
      
      {/* Portfolio Grid */}
      <PortfolioGrid />
      
      {/* Divider */}
      <div className="section-divider" />
      
      {/* Tech Constellation */}
      <TechConstellation />
      
      {/* Divider */}
      <div className="section-divider" />
      
      {/* Contact Section */}
      <ContactSection />
    </main>
  );
};

export default Index;
