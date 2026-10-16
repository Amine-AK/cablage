import React from "react";
import { HOME_SERVICES } from "@/data/services";
import { ShieldCheck, Wifi, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-cyan-400" />;
      case "Wifi":
        return <Wifi className="w-8 h-8 text-emerald-400" />;
      case "Wrench":
        return <Wrench className="w-8 h-8 text-amber-400" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-900/60 relative scroll-mt-20 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 uppercase tracking-wider inline-block mb-3">
            Intervention 100% à Domicile
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nos Prestations & Services <span className="gradient-text">Techniques</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Plus besoin de transporter votre matériel ou de passer des heures à chercher des solutions : nous venons directement chez vous à Ain Aouda, Rabat, Témara ou Salé avec tout l'outillage et les pièces de rechange nécessaires.
          </p>
        </div>

        {/* 3 Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOME_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between border border-slate-800"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{srv.title}</h3>
                <h4 className="text-xs font-semibold text-cyan-400 mt-1 mb-3">{srv.subtitle}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Features points */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Ce que nous assurons :
                  </div>
                  {srv.features.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/60">
                <a
                  href={generateGeneralInquiryUrl(srv.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-600 text-white border border-slate-700 hover:border-cyan-500 transition-colors"
                >
                  <span>Demander une intervention</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
