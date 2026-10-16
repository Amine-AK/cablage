import React from "react";
import { MessageSquare, MapPin, Wrench, Smartphone } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Contact & Conseil",
      description: "Vous nous contactez par WhatsApp ou appel. Vous choisissez un pack ou décrivez votre besoin (caméras, Wi-Fi, dépannage).",
    },
    {
      number: "02",
      title: "Étude & Rendez-vous",
      description: "Nous convenons d'une date d'intervention rapide à Ain Aouda, Rabat, Témara ou Salé selon votre convenance.",
    },
    {
      number: "03",
      title: "Installation Soignée",
      description: "Pose des caméras, tirage de câbles discret, raccordement sécurisé de l'enregistreur et de l'alimentation régulée.",
    },
    {
      number: "04",
      title: "Mise en Ligne & Formation",
      description: "Connexion de l'enregistreur à votre box Internet, paramétrage de l'application sur vos téléphones et remise de la garantie.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 uppercase tracking-wider inline-block mb-3">
            Déroulement Simple
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Comment se Déroule <span className="gradient-text">Votre Intervention</span> ?
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            De votre premier message à la mise en service sur votre smartphone, profitez d'une prise en charge fluide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-cyan-500/30 mb-4 block font-mono">
                  {st.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
