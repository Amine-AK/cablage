import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { MARKETING_HOOK } from "@/data/offers";
import { formatPrice } from "@/lib/format";
import { lowestHardwarePrice, lowestInstalledPrice } from "@/lib/catalog";
import { INSTALL_CITIES } from "@/lib/site";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function Hero() {
  const facts = [
    { label: "Installation à domicile", value: `dès ${formatPrice(lowestInstalledPrice())}` },
    { label: "Matériel seul", value: `dès ${formatPrice(lowestHardwarePrice())}` },
    { label: "Garantie matériel", value: "1 an" },
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="eyebrow">Vidéosurveillance · Réseau · Dépannage</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Caméras de surveillance et réseau, vendus et installés chez vous
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Packs complets — caméras, enregistreur, disque dur, alimentation et connectique — en matériel seul ou
            installés à domicile à {INSTALL_CITIES.slice(0, -1).join(", ")} et {INSTALL_CITIES.at(-1)}. Câblage réseau,
            Wi-Fi et dépannage sur place.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/packs" className="btn btn-primary px-5 text-base">
              Découvrir les packs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={generateGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary px-5 text-base"
            >
              <MessageCircle className="h-5 w-5 text-whatsapp" aria-hidden="true" />
              Besoin d&apos;un conseil ?
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-slate-500">{fact.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900 sm:text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p lang="ar" dir="rtl" className="mt-6 text-sm text-slate-600">
            {MARKETING_HOOK.ar}
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md sm:aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white lg:max-w-none">
          <Image
            src="/images/kit-cameras-enregistreur.webp"
            alt="Kit de vidéosurveillance : quatre caméras tube et un enregistreur"
            fill
            sizes="(min-width: 1024px) 50vw, 28rem"
            className="object-contain p-4"
            priority
          />
        </div>
      </div>
    </section>
  );
}
