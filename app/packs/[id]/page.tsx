import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PackCard from "@/components/PackCard";
import PackGallery from "./PackGallery";
import PackPurchase from "./PackPurchase";
import { OFFERS } from "@/data/offers";
import { getOfferById } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { INSTALL_CITIES, absoluteUrl } from "@/lib/site";
import { BRAND_NAME, OWNER_NAME } from "@/lib/whatsapp";

interface Props {
  params: {
    id: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return OFFERS.map((offer) => ({ id: offer.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const offer = getOfferById(params.id);
  if (!offer) return { title: "Pack introuvable" };

  const path = `/packs/${offer.id}`;
  const description = `${offer.tagline}. ${formatPrice(offer.price.hardwareOnly)} en matériel seul, ${formatPrice(
    offer.price.withInstallation
  )} avec installation à ${INSTALL_CITIES.join(", ")}.`;

  return {
    title: `${offer.title} – dès ${formatPrice(offer.price.hardwareOnly)}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: offer.title,
      description,
      url: path,
      images: [offer.mainImage],
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-200 py-8">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function PackDetailPage({ params }: Props) {
  const offer = getOfferById(params.id);
  if (!offer) notFound();

  const pageUrl = absoluteUrl(`/packs/${offer.id}`);
  const others = OFFERS.filter((o) => o.id !== offer.id);

  return (
    <>
      <Header />
      <main id="contenu" className="flex-1 pb-24 lg:pb-0">
        <div className="container-page py-6 sm:py-8">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Packs caméras", href: "/packs" },
              { label: offer.title, href: `/packs/${offer.id}` },
            ]}
          />

          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <PackGallery images={offer.gallery.length ? offer.gallery : [offer.mainImage]} title={offer.title} />

            <div>
              <ul className="flex flex-wrap gap-1.5" aria-label="Caractéristiques">
                <li className="tag">{offer.cameraCount} caméras</li>
                <li className="tag">{offer.resolution}</li>
                {offer.hasAudio && (
                  <li className="tag">
                    <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                    Audio
                  </li>
                )}
              </ul>
              <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{offer.title}</h1>
              {offer.arabicTitle && (
                <p lang="ar" dir="rtl" className="mt-2 text-base text-slate-600">
                  {offer.arabicTitle}
                </p>
              )}
              <p className="mt-3 text-slate-700">{offer.tagline}</p>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Idéal pour :</span> {offer.idealFor}
              </p>

              <div className="mt-6">
                <PackPurchase offer={offer} pageUrl={pageUrl} />
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Installation à domicile à {INSTALL_CITIES.join(", ")}. Autres villes sur demande.
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <div>
              <Section title="Points forts">
                <ul className="grid gap-2 text-slate-700 sm:grid-cols-2">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={`Contenu du pack (${offer.itemsIncluded.length} éléments)`}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {offer.itemsIncluded.map((item) => (
                    <li key={item.name} className="card flex gap-3 p-3">
                      {item.image && (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-50">
                          <Image src={item.image} alt="" fill sizes="64px" className="object-contain p-1" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="mt-0.5 text-xs font-medium text-brand-700">{item.quantity}</p>
                        <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>

              {offer.specs && offer.specs.length > 0 && (
                <Section title="Fiche technique">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">Caractéristiques techniques – {offer.title}</caption>
                    <tbody className="divide-y divide-slate-200">
                      {offer.specs.map((spec) => (
                        <tr key={spec.label} className="align-top">
                          <th scope="row" className="w-2/5 py-2.5 pr-4 font-medium text-slate-600">
                            {spec.label}
                          </th>
                          <td className="py-2.5 text-slate-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Section>
              )}

              {offer.installationIncluded && offer.installationIncluded.length > 0 && (
                <Section title="Inclus dans la formule installation">
                  <ul className="space-y-2 text-sm text-slate-700">
                    {offer.installationIncluded.map((step) => (
                      <li key={step} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                        {step}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-600">
                    Installation réalisée par {OWNER_NAME} ({BRAND_NAME}).
                  </p>
                </Section>
              )}

              {offer.faqs && offer.faqs.length > 0 && (
                <Section title="Questions fréquentes">
                  <FaqList items={offer.faqs} />
                </Section>
              )}
            </div>
          </div>

          {others.length > 0 && (
            <section className="border-t border-slate-200 py-8">
              <h2 className="text-xl font-bold tracking-tight">Autres packs</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <li key={o.id} className="flex">
                    <PackCard offer={o} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: offer.title,
          description: offer.tagline,
          image: offer.gallery.map((img) => absoluteUrl(encodeURI(img))),
          sku: offer.id,
          url: pageUrl,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "MAD",
            lowPrice: offer.price.hardwareOnly,
            highPrice: offer.price.withInstallation,
            offerCount: 2,
          },
        }}
      />
    </>
  );
}
