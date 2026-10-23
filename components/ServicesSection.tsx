import React from "react";
import { Check, ShieldCheck, Wifi, Wrench } from "lucide-react";
import { HOME_SERVICES } from "@/data/services";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

const ICONS: Record<string, React.ElementType> = { ShieldCheck, Wifi, Wrench };

export default function ServicesSection() {
  return (
    <section id="services" className="section border-t border-slate-200 bg-slate-50">
      <div className="container-page">
        <p className="eyebrow">Services à domicile</p>
        <h2 className="section-title mt-2">Installation, réseau et dépannage</h2>
        <p className="section-lead">
          Au-delà des packs, nous intervenons chez vous pour poser des caméras, améliorer votre réseau ou réparer une
          installation existante.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {HOME_SERVICES.map((srv) => {
            const Icon = ICONS[srv.iconName] ?? ShieldCheck;
            return (
              <li key={srv.id} className="card flex flex-col p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{srv.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{srv.subtitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {srv.features.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <a
                    href={generateGeneralInquiryUrl(srv.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full"
                  >
                    Demander un devis
                    <span className="sr-only"> : {srv.title}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
