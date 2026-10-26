import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PackGrid from "@/components/PackGrid";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import CoverageSection from "@/components/CoverageSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { OFFERS } from "@/data/offers";
import { INSTALL_CITIES, ON_REQUEST_AREAS, SITE_URL, absoluteUrl } from "@/lib/site";
import { BRAND_NAME, CONTACT_EMAIL, DISPLAY_PHONE, OWNER_NAME } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <Hero />

        <section id="offres" className="section">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Packs vidéosurveillance</p>
                <h2 className="section-title mt-2">Kits complets, prêts à installer</h2>
                <p className="section-lead">
                  Caméras, enregistreur XVR, disque dur, alimentation 12V et connectique. Chaque pack existe en matériel
                  seul ou avec installation à domicile.
                </p>
              </div>
              <Link href="/packs" className="btn btn-secondary shrink-0">
                Comparer les packs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8">
              <PackGrid offers={OFFERS} />
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Besoin d&apos;un autre nombre de caméras (2, 6, 12, 16…) ?{" "}
              <a href="#contact" className="font-semibold text-brand-700 underline">
                Demandez un devis sur mesure
              </a>
              .
            </p>
          </div>
        </section>

        <ServicesSection />
        <WhyChooseUs />
        <ProcessSection />
        <CoverageSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: `${OWNER_NAME} – ${BRAND_NAME}`,
          url: SITE_URL,
          telephone: DISPLAY_PHONE.replace(/\s/g, ""),
          email: CONTACT_EMAIL,
          image: absoluteUrl("/images/kit-cameras-enregistreur.webp"),
          description:
            "Vente et installation de caméras de surveillance, câblage réseau, Wi-Fi et dépannage électronique à domicile.",
          areaServed: [...INSTALL_CITIES, ...ON_REQUEST_AREAS].map((name) => ({ "@type": "City", name })),
        }}
      />
    </>
  );
}
