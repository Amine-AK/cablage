import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PackCatalog from "@/components/PackCatalog";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { OFFERS } from "@/data/offers";
import { formatPrice } from "@/lib/format";
import { lowestHardwarePrice } from "@/lib/catalog";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Packs caméras de surveillance 2MP et 5MP",
  description: `Comparez nos ${OFFERS.length} packs de vidéosurveillance (4 ou 8 caméras, 2MP ou 5MP, avec ou sans audio), en matériel seul dès ${formatPrice(lowestHardwarePrice())} ou installés à Rabat, Salé, Témara et Ain Aouda.`,
  alternates: { canonical: "/packs" },
};

export default function PacksPage() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <div className="container-page py-6 sm:py-10">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Packs caméras", href: "/packs" },
            ]}
          />
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Packs caméras de surveillance</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Chaque pack comprend les caméras, un enregistreur XVR, un disque dur, l&apos;alimentation 12V et la
            connectique. Vous choisissez ensuite le matériel seul ou l&apos;installation à domicile.
          </p>

          <div className="mt-6">
            <PackCatalog offers={OFFERS} />
          </div>

          <p className="mt-8 text-sm text-slate-600">
            Vous ne trouvez pas la bonne configuration ?{" "}
            <a
              href={generateGeneralInquiryUrl("Un pack caméras sur mesure")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 underline"
            >
              Demandez un devis sur mesure sur WhatsApp
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
