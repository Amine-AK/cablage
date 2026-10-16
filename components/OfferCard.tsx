"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OfferPackage } from "@/types";
import { Check, ShieldCheck, ChevronRight, Package, Volume2, HardDrive, Cpu, ShoppingCart, MessageCircle } from "lucide-react";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";

interface OfferCardProps {
  offer: OfferPackage;
  onOpenOrderModal: (offer: OfferPackage) => void;
}

export default function OfferCard({ offer, onOpenOrderModal }: OfferCardProps) {
  const [activeImage, setActiveImage] = useState(offer.mainImage);
  const [showItems, setShowItems] = useState(false);
  const [withInstall, setWithInstall] = useState(true);

  const displayPrice = withInstall
    ? offer.price.withInstallation
    : offer.price.hardwareOnly;

  return (
    <div
      className={`relative rounded-3xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        offer.popular
          ? "border-cyan-500 shadow-2xl shadow-cyan-950/40 ring-1 ring-cyan-500/50"
          : "border-slate-800 hover:border-slate-700 shadow-xl"
      }`}
    >
      {/* Top Badge */}
      {offer.badge && (
        <div
          className={`absolute top-0 right-0 text-xs font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider z-20 ${
            offer.popular
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
              : "bg-cyan-950 text-cyan-300 border-l border-b border-cyan-800"
          }`}
        >
          {offer.badge}
        </div>
      )}

      {/* Card Header & Images */}
      <div>
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
              {offer.resolution}
            </span>
            {offer.hasAudio && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800 flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Audio Micro
              </span>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-white">{offer.title}</h3>
          <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{offer.tagline}</p>
        </div>

        {/* Product Gallery View */}
        <div className="px-6 py-2">
          <div className="relative w-full h-56 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 flex items-center justify-center group">
            <Image
              src={activeImage}
              alt={offer.title}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnails */}
          {offer.gallery && offer.gallery.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1.5 scrollbar-thin">
              {offer.gallery.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`Voir photo ${idx + 1}`}
                  className={`relative w-12 h-12 rounded-lg shrink-0 overflow-hidden bg-slate-950 border transition ${
                    activeImage === img
                      ? "border-cyan-400 ring-2 ring-cyan-500/40"
                      : "border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Toggle */}
        <div className="px-6 py-3">
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Tarif Promo :</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white">{displayPrice}</span>
                  <span className="text-sm font-bold text-cyan-400">{offer.price.currency}</span>
                </div>
              </div>

              {/* Install toggle switch */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setWithInstall(true)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    withInstall
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Avec Pose
                </button>
                <button
                  type="button"
                  onClick={() => setWithInstall(false)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    !withInstall
                      ? "bg-slate-700 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sans Pose
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {withInstall
                ? "Pose à domicile + Câblage + Config smartphone incluses"
                : "Matériel complet neuf garanti avec assistance au démarrage"}
            </p>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="px-6 py-3 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Avantages inclus :
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {offer.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Collapsible Included Products List */}
        <div className="px-6 py-2">
          <button
            type="button"
            onClick={() => setShowItems(!showItems)}
            className="w-full py-2 px-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center justify-between transition"
          >
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-cyan-400" />
              <span>Contenu complet du kit ({offer.itemsIncluded.length} éléments)</span>
            </span>
            <ChevronRight
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                showItems ? "rotate-90" : ""
              }`}
            />
          </button>

          {showItems && (
            <div className="mt-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-2.5 animate-fade-in">
              {offer.itemsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-slate-900 pb-2 last:border-0 last:pb-0">
                  <div>
                    <span className="font-semibold text-white block">{item.name}</span>
                    <span className="text-[11px] text-slate-400">{item.description}</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 shrink-0 ml-2">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-3 space-y-2">
        <Link
          href={`/packs/${offer.id}`}
          className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-center block bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition"
        >
          🔍 Voir détails complets & fiche technique &rarr;
        </Link>

        <button
          type="button"
          onClick={() => onOpenOrderModal(offer)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg ${
            offer.popular
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950/50"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Commander ce Pack ({displayPrice} {offer.price.currency})</span>
        </button>

        <a
          href={generateWhatsAppOrderUrl({
            packId: offer.id,
            packTitle: offer.title,
            clientName: "Client Intéressé",
            phone: "",
            city: "Ain Aouda / Rabat / Témara / Salé",
            includeInstallation: withInstall,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2 transition"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Discussion rapide WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
