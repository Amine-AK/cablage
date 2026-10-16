import React from "react";
import Image from "next/image";
import { ShieldCheck, Wifi, Wrench, Eye, ArrowDown, MessageCircle, Phone, CheckCircle } from "lucide-react";
import { generateGeneralInquiryUrl, DISPLAY_PHONE, OWNER_NAME, BRAND_NAME } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location pill & Marketing Offer Banner */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/80 text-cyan-300 text-xs font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Intervention à Domicile : Ain Aouda • Rabat • Témara • Salé</span>
              </div>

              <div dir="rtl" className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border border-emerald-600/60 shadow-lg flex items-center justify-center lg:justify-start gap-2.5 text-amber-300 font-black text-sm sm:text-base">
                <span className="text-xl">🔥</span>
                <span>تركيب كمرات مراقبة إبتداء من 1699درهم فقط تواصل للحصول على استشارة تقنية</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Vente & Installation de{" "}
              <span className="gradient-text">Caméras de Surveillance</span>,{" "}
              Réseaux Wi-Fi & Dépannage à Domicile
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Confiez la sécurité et la connectivité de votre maison, villa ou commerce à un expert certifié : <strong>{OWNER_NAME}</strong> ({BRAND_NAME}). Packs caméras 2MP/5MP avec enregistrement et micro, extension de signal Wi-Fi partout chez vous, et réparation électronique sur place.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Caméras Haute Résolution & Application Smartphone</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Wifi className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Partage Wi-Fi Puissant sans coupures</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Wrench className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Dépannage & Réparation Express sur place</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#offres"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition transform hover:-translate-y-0.5"
              >
                <span>Découvrir les 4 Packs Promo</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={generateGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Devis Express WhatsApp</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>

            {/* Trust banner */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Installation Propre & Câblage Invisible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Garantie Matériel Neuf</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Support & SAV 7j/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Highlight Card */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-slate-700/80 overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-4 py-1.5 rounded-bl-xl shadow-md uppercase tracking-wider">
                  Offre Vedette
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">Pack 4 Caméras 5MP Ultra HD</h3>
                    <p className="text-xs text-slate-400">Kit complet prêt à l'emploi avec XVR & Disque Dur</p>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-2 group">
                  <Image
                    src="/images/offers/5mp/pack_4_cameras_5mp_offre.png"
                    alt="Pack 4 Caméras 5MP Ultra HD Dahua"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition duration-500"
                    priority
                  />
                </div>

                {/* Quick specs grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 block">Résolution :</span>
                    <strong className="text-white text-sm">5MP Ultra HD 2K+</strong>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 block">Accès :</span>
                    <strong className="text-white text-sm">Direct Smartphone</strong>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">À partir de :</div>
                    <div className="text-2xl font-black text-cyan-400">1 990 DH</div>
                  </div>
                  <a
                    href="#offres"
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition"
                  >
                    Voir les 4 Packs &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
