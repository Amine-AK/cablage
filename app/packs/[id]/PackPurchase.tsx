"use client";

import React, { useId, useState } from "react";
import { MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { OfferPackage } from "@/types";
import OrderModal from "@/components/OrderModal";
import { formatPrice } from "@/lib/format";
import { DISPLAY_PHONE, TEL_HREF, generateProductInquiryUrl } from "@/lib/whatsapp";

interface Props {
  offer: OfferPackage;
  pageUrl: string;
}

export default function PackPurchase({ offer, pageUrl }: Props) {
  const uid = useId();
  const [withInstall, setWithInstall] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { price } = offer;
  const current = withInstall ? price.withInstallation : price.hardwareOnly;

  const options = [
    {
      value: true,
      label: "Avec installation",
      price: price.withInstallation,
      note: "Pose, câblage et configuration sur vos téléphones",
    },
    { value: false, label: "Matériel seul", price: price.hardwareOnly, note: "Le kit complet, sans pose" },
  ];

  return (
    <>
      <fieldset>
        <legend className="label">Choisissez votre formule</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((opt) => (
            <label
              key={opt.label}
              className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600 ${
                withInstall === opt.value ? "border-brand-700 bg-brand-50" : "border-slate-300 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name={`${uid}-formule`}
                className="sr-only"
                checked={withInstall === opt.value}
                onChange={() => setWithInstall(opt.value)}
              />
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-slate-800">{opt.label}</span>
                <span className="font-bold text-slate-900">{formatPrice(opt.price, price.currency)}</span>
              </span>
              <span className="mt-1 text-xs text-slate-600">{opt.note}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
        <span className="text-3xl font-bold text-slate-900">{formatPrice(current, price.currency)}</span>
        {withInstall && price.originalPrice && price.originalPrice > current && (
          <span className="text-slate-500">
            <span className="sr-only">Prix habituel : </span>
            <s>{formatPrice(price.originalPrice, price.currency)}</s>
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-600">
        {withInstall
          ? "Installation à domicile comprise. Paiement après installation et vérification."
          : "Matériel neuf. Modalités de remise ou de livraison confirmées avec la commande."}
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary text-base sm:col-span-2">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          Commander
        </button>
        <a
          href={generateProductInquiryUrl(offer.title, pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <MessageCircle className="h-4 w-4 text-whatsapp" aria-hidden="true" />
          Poser une question
        </a>
        <a href={TEL_HREF} className="btn btn-secondary">
          <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
          {DISPLAY_PHONE}
        </a>
      </div>

      {/* Mobile: keep the order action reachable without covering content (page has bottom padding). */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-page items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-slate-500">{withInstall ? "Avec installation" : "Matériel seul"}</p>
            <p className="text-lg font-bold leading-tight">{formatPrice(current, price.currency)}</p>
          </div>
          <button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary shrink-0 px-6">
            Commander
          </button>
        </div>
      </div>

      <OrderModal pack={offer} isOpen={modalOpen} onClose={() => setModalOpen(false)} initialInstall={withInstall} />
    </>
  );
}
