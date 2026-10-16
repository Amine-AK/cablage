import React from "react";
import { SERVICE_AREAS } from "@/data/services";
import { MapPin, Navigation, Clock, ShieldCheck, Check } from "lucide-react";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function CoverageSection() {
  return (
    <section id="zones" className="py-20 lg:py-28 bg-slate-950 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Zone de Couverture Régionale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Intervention Rapide à <span className="gradient-text">Votre Domicile</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Nous nous déplaçons rapidement dans toute la préfecture de Skhirate-Témara, Rabat et Salé pour vos installations de caméras, câblage et dépannage réseau.
          </p>
        </div>

        {/* Areas Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {area.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2">{area.city}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{area.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Rendez-vous sous 24h</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fast dispatch highlight box */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Vous habitez dans une autre commune voisine ?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Nous intervenons également pour des projets et villas à Mers El Kheir, Sidi Yahya Zaer, Bouznika, Skhirat et Kénitra sur demande.
            </p>
          </div>

          <a
            href={generateGeneralInquiryUrl("Demande d'intervention dans ma commune")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition"
          >
            Vérifier ma zone sur WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
