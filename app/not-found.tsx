import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <div className="container-page py-20 text-center">
          <p className="eyebrow">Erreur 404</p>
          <h1 className="section-title mt-2">Cette page n&apos;existe pas ou plus</h1>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Le lien est peut-être incorrect, ou le produit a été retiré. Consultez nos packs ou écrivez-nous.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/packs" className="btn btn-primary">
              Voir les packs
            </Link>
            <a href={generateGeneralInquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Nous contacter
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
