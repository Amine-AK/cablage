import React from "react";
import { notFound } from "next/navigation";
import { OFFERS, MARKETING_HOOK } from "@/data/offers";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return OFFERS.map((offer) => ({
    id: offer.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const offer = OFFERS.find((o) => o.id === params.id);
  if (!offer) {
    return {
      title: "Offre non trouvée | AMINE AIT YAHYA",
    };
  }

  return {
    title: `${offer.title} (${offer.price.withInstallation} DH) | AMINE AIT YAHYA`,
    description: `${offer.tagline}. Installation à domicile à Ain Aouda, Rabat, Témara, Salé. ${MARKETING_HOOK.ar}`,
    openGraph: {
      title: `${offer.title} - ${offer.price.withInstallation} DH`,
      description: offer.tagline,
      images: [offer.mainImage],
    },
  };
}

export default function PackDetailPage({ params }: Props) {
  const offer = OFFERS.find((o) => o.id === params.id);

  if (!offer) {
    notFound();
  }

  return <ProductDetailClient offer={offer} />;
}
