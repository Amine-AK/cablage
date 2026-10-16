"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OfferPackage } from "@/types";
import { MARKETING_HOOK } from "@/data/offers";
import OrderModal from "@/components/OrderModal";
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  MessageCircle,
  Phone,
  Volume2,
  Package,
  Wrench,
  Clock,
  Sparkles,
  ChevronDown,
  MapPin,
  Share2,
} from "lucide-react";
import {
  DISPLAY_PHONE,
  generateWhatsAppOrderUrl,
  generateGeneralInquiryUrl,
  OWNER_NAME,
  BRAND_NAME,
} from "@/lib/whatsapp";

interface Props {
  offer: OfferPackage;
}

export default function ProductDetailClient({ offer }: Props) {
  const [activeImage, setActiveImage] = useState(offer.mainImage);
  const [withInstall, setWithInstall] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const displayPrice = withInstall
    ? offer.price.withInstallation
    : offer.price.hardwareOnly;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: offer.title,
        text: `${offer.title} - ${displayPrice} DH (${MARKETING_HOOK.ar})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien du produit copié dans le presse-papiers !");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 sm:pb-16 selection:bg-cyan-500 selection:text-white">
      
      {/* 1. Top Marketing Hook Banner (Arabic First) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white py-2 px-3 sm:px-4 text-center border-b border-emerald-700/60 sticky top-0 z-40 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span dir="rtl" className="text-amber-300 font-extrabold text-sm sm:text-base">
              {MARKETING_HOOK.ar}
            </span>
          </div>

          <a
            href={generateGeneralInquiryUrl(offer.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span dir="rtl">استشارة عبر واتساب</span>
          </a>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-10 sm:top-10 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/#offres"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les offres</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
              aria-label="Partager ce produit"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
              className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:text-white transition"
              aria-label="Appeler directement"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Product Container (Mobile First Optimized) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Gallery & Badges */}
        <section className="space-y-3">
          <div className="relative w-full aspect-square sm:aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-3 flex items-center justify-center shadow-2xl">
            {offer.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider shadow-lg">
                {offer.badge}
              </div>
            )}
            {offer.hasAudio && (
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/90 border border-purple-700 text-purple-300 flex items-center gap-1 shadow-lg">
                <Volume2 className="w-3.5 h-3.5" /> Audio Micro
              </div>
            )}

            <Image
              src={activeImage}
              alt={offer.title}
              fill
              className="object-contain p-4 transition-transform duration-300"
              priority
            />
          </div>

          {/* Thumbnails Swiper */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {offer.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                aria-label={`Photo ${idx + 1}`}
                className={`relative w-16 h-16 rounded-xl shrink-0 overflow-hidden bg-slate-900 border transition ${
                  activeImage === img
                    ? "border-cyan-400 ring-2 ring-cyan-500/40"
                    : "border-slate-800 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Title, Arabic title & Ratings */}
        <section className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {offer.resolution}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {offer.cameraCount} Caméras
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Matériel Garanti 1 An
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {offer.title}
          </h1>

          {offer.arabicTitle && (
            <h2 dir="rtl" className="text-lg sm:text-xl font-bold text-cyan-400">
              {offer.arabicTitle}
            </h2>
          )}

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {offer.tagline}
          </p>
        </section>

        {/* Pricing & Install Toggle Card */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Prix Total :</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {displayPrice}
                </span>
                <span className="text-lg font-bold text-cyan-400">{offer.price.currency}</span>
                {offer.price.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {offer.price.originalPrice} {offer.price.currency}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                Paiement après installation
              </span>
            </div>
          </div>

          {/* Toggle with/without installation */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setWithInstall(true)}
              className={`py-2.5 px-3 rounded-lg font-bold transition flex flex-col items-center ${
                withInstall
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Avec Installation</span>
              <span className="text-[11px] opacity-90">{offer.price.withInstallation} {offer.price.currency}</span>
            </button>

            <button
              type="button"
              onClick={() => setWithInstall(false)}
              className={`py-2.5 px-3 rounded-lg font-bold transition flex flex-col items-center ${
                !withInstall
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Matériel Seul</span>
              <span className="text-[11px] opacity-90">{offer.price.hardwareOnly} {offer.price.currency}</span>
            </button>
          </div>

          <div className="text-xs text-slate-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Intervention à domicile disponible : <strong>Ain Aouda • Rabat • Témara • Salé</strong>
            </span>
          </div>

          {/* Quick Order Button inside the card for desktop/tablet */}
          <div className="hidden sm:grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Commander via WhatsApp</span>
            </button>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
              className="py-3 px-4 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Appeler {DISPLAY_PHONE}</span>
            </a>
          </div>
        </section>

        {/* Features Bullet List */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Points forts de cette offre</span>
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {offer.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Real Included Items with Individual Photos */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Matériel réel inclus dans le pack ({offer.itemsIncluded.length} éléments)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {offer.itemsIncluded.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3"
              >
                {item.image && (
                  <div className="relative w-14 h-14 rounded-lg bg-slate-950 border border-slate-800 shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 shrink-0">
                      {item.quantity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What is included in Home Installation */}
        {offer.installationIncluded && (
          <section className="bg-slate-900/80 border border-cyan-900/50 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-cyan-400">
              <Wrench className="w-4 h-4" />
              <span>Ce qui est inclus dans notre installation à domicile</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {offer.installationIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technical Specs Table */}
        {offer.specs && (
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Fiche Technique Détaillée
            </h3>
            <div className="divide-y divide-slate-800 text-xs sm:text-sm">
              {offer.specs.map((sp, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <span className="text-slate-400 font-medium">{sp.label}</span>
                  <span className="text-white font-semibold text-right">{sp.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Accordion */}
        {offer.faqs && (
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Questions Fréquentes
            </h3>
            <div className="space-y-2">
              {offer.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-slate-200 flex items-center justify-between gap-2"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        openFaqIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-900">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technician Guarantee Footer Box */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">
              Installation réalisée par {OWNER_NAME} ({BRAND_NAME})
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Matériel neuf avec garantie écrite. Vous ne payez qu'après installation et vérification sur votre propre téléphone.
            </p>
          </div>
        </section>

      </main>

      {/* 4. Mobile First Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-3 px-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <span className="text-[10px] text-slate-400 block leading-tight">Total</span>
            <div className="text-xl font-black text-cyan-400 leading-tight">
              {displayPrice} <span className="text-xs text-slate-300">{offer.price.currency}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Commander (WhatsApp)</span>
          </button>

          <a
            href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
            aria-label="Appel téléphonique"
            className="p-3 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 shrink-0"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        pack={offer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
