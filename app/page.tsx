import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OffersGrid from "@/components/OffersGrid";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import CoverageSection from "@/components/CoverageSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <Hero />
      <OffersGrid />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <CoverageSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
