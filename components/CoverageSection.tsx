import React from "react";
import { Check, MapPin, MessageCircle } from "lucide-react";
import { SERVICE_AREAS } from "@/data/services";
import { ON_REQUEST_AREAS } from "@/lib/site";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

const SERVICES_IN_ZONE = ["Installation de caméras à domicile", "Câblage réseau et Wi-Fi", "Dépannage sur place"];

export default function CoverageSection() {
  return (
    <section id="zones" className="section border-t border-slate-200 bg-slate-50">
      <div className="container-page">
        <p className="eyebrow">Zones d&apos;intervention</p>
        <h2 className="section-title mt-2">Rabat, Salé, Témara, Ain Aouda et environs</h2>
        <p className="section-lead">
          Le conseil par téléphone ou WhatsApp est disponible partout. Les interventions à domicile se font dans les
          villes ci-dessous.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_AREAS.map((area) => (
            <li key={area.city} className="card p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-brand-700" aria-hidden="true" />
                {area.city}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{area.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <h3 className="text-base font-semibold">Dans ces villes</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {SERVICES_IN_ZONE.map((s) => (
                <li key={s} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="text-base font-semibold">Ailleurs, sur demande</h3>
            <p className="mt-2 text-sm text-slate-600">
              {ON_REQUEST_AREAS.join(", ")} : intervention possible selon le projet. Pour l&apos;achat de matériel seul,
              demandez-nous les modalités de remise ou de livraison dans votre ville.
            </p>
            <a
              href={generateGeneralInquiryUrl("Intervention ou livraison dans ma ville")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-4"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" aria-hidden="true" />
              Vérifier ma ville
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
