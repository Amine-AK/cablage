"use client";

import React, { useState } from "react";
import { OFFERS } from "@/data/offers";
import { OfferPackage } from "@/types";
import OfferCard from "./OfferCard";
import OrderModal from "./OrderModal";
import { Shield, Sparkles, PhoneCall } from "lucide-react";
import { DISPLAY_PHONE } from "@/lib/whatsapp";

export default function OffersGrid() {
  const [selectedPack, setSelectedPack] = useState<OfferPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (pack: OfferPackage) => {
    setSelectedPack(pack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="offres" className="py-20 lg:py-28 bg-slate-950 relative scroll-mt-20">
      {/* Background decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nos 4 Packs de Surveillance Clés en Main</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Choisissez Votre Pack <span className="gradient-text">Idéal</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Des kits complets comprenant caméras haute définition, enregistreur XVR, disque dur dédié Western Digital, câbles et fiches de qualité professionnelle. Disponibles avec installation soignée et configuration mobile à domicile.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {OFFERS.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onOpenOrderModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Custom request notice */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Besoin d'un nombre de caméras personnalisé (ex: 2, 6, 12 ou 16 caméras) ?
              </h4>
              <p className="text-xs text-slate-400">
                Nous réalisons des devis sur mesure avec étude gratuite de votre emplacement à Ain Aouda, Rabat, Témara ou Salé.
              </p>
            </div>
          </div>

          <a
            href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shrink-0 border border-slate-700 transition"
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>Étude sur Mesure : {DISPLAY_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Modal */}
      <OrderModal
        pack={selectedPack}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
