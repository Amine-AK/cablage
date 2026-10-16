import React from "react";
import { ShieldCheck, Eye, Smartphone, Clock, Sparkles, Award } from "lucide-react";
import { OWNER_NAME } from "@/lib/whatsapp";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      title: "Câblage Propre & Invisible",
      description: "Nous portons une attention méticuleuse à l'esthétique de votre intérieur : goulottes discrètes, passages dans les combles ou faux-plafonds, aucune gaine apparente négligée.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Matériel 100% Neuf & Garanti",
      description: "Nous installons exclusivement des caméras et composants de marques leaders (Dahua, Uniview, disques durs Western Digital 24/7, câbles KX7 cuivre pur).",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-400" />,
      title: "Configuration Mobile Immédiate",
      description: "Avant de partir, nous installons l'application sur vos téléphones (iOS & Android) et nous vous apprenons à visionner en direct, écouter l'audio et revoir les enregistrements.",
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "Réactivité & Disponibilité 7j/7",
      description: "Disponibles en semaine et le week-end pour s'adapter à votre emploi du temps et intervenir en cas d'urgence sur vos pannes de caméras ou de Wi-Fi.",
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-400" />,
      title: "Écoute & Devis Gratuit",
      description: "Chaque maison est unique : nous vous conseillons sur les angles morts, le choix des focales (grand angle, vision nocturne, micro) sans surcoût inutile.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      title: "Interlocuteur Unique Dédié",
      description: `Vous échangez directement avec ${OWNER_NAME}, technicien qualifié qui réalise lui-même l'intervention et assure le suivi après-vente.`,
    },
  ];

  return (
    <section id="pourquoi-nous" className="py-20 lg:py-28 bg-slate-900/40 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 uppercase tracking-wider inline-block mb-3">
            Engagement Qualité
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Pourquoi Choisir <span className="gradient-text">Nos Services</span> ?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Une prestation technique sérieuse ne se limite pas à fixer des caméras au mur : découvrez pourquoi nos clients de Rabat, Salé, Témara et Ain Aouda nous font confiance.
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-3xl p-7 hover:border-slate-700 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700/80">
                {adv.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
