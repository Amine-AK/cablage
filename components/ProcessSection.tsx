import React from "react";

const STEPS = [
  {
    title: "Contact et conseil",
    description: "Vous nous écrivez sur WhatsApp ou par téléphone. Vous choisissez un pack ou décrivez votre besoin.",
  },
  {
    title: "Rendez-vous",
    description: "Nous fixons ensemble une date d'intervention dans votre ville.",
  },
  {
    title: "Installation",
    description: "Pose des caméras, passage discret des câbles, raccordement de l'enregistreur et de l'alimentation.",
  },
  {
    title: "Mise en service",
    description: "Connexion à votre box Internet, configuration de l'application sur vos téléphones, puis paiement.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section border-t border-slate-200">
      <div className="container-page">
        <p className="eyebrow">Comment ça se passe</p>
        <h2 className="section-title mt-2">De votre message à la mise en service</h2>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-l-2 border-brand-700 pl-4">
              <span className="text-sm font-semibold text-brand-700">Étape {i + 1}</span>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
