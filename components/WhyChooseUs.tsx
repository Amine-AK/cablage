import React from "react";
import { BadgeCheck, CreditCard, Smartphone, UserRound } from "lucide-react";
import { OWNER_NAME } from "@/lib/whatsapp";

// Only practices stated elsewhere in the site data (pack specs, installation
// checklists, payment terms). Do not add claims that cannot be backed up.
const ADVANTAGES = [
  {
    icon: UserRound,
    title: "Un seul interlocuteur",
    description: `Vous échangez directement avec ${OWNER_NAME}, qui réalise l'installation et assure le suivi.`,
  },
  {
    icon: BadgeCheck,
    title: "Matériel neuf, garanti 1 an",
    description: "Caméras, enregistreur et disque dur neufs, avec une garantie matériel d'un an indiquée sur chaque pack.",
  },
  {
    icon: CreditCard,
    title: "Paiement après installation",
    description: "Pour les packs installés, vous payez une fois le système posé et vérifié sur votre téléphone.",
  },
  {
    icon: Smartphone,
    title: "Configuré sur votre téléphone",
    description: "Nous installons l'application et vous montrons comment voir le direct et revoir les enregistrements.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="pourquoi-nous" className="section">
      <div className="container-page">
        <p className="eyebrow">Pourquoi nous choisir</p>
        <h2 className="section-title mt-2">Un service simple et transparent</h2>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Icon className="h-6 w-6 text-brand-700" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
