import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mic, Video } from "lucide-react";
import { OfferPackage } from "@/types";
import PackPrice from "./PackPrice";

interface Props {
  offer: OfferPackage;
  onOrder?: (offer: OfferPackage) => void;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}

export default function PackCard({ offer, onOrder, headingLevel: Heading = "h3", priority = false }: Props) {
  const href = `/packs/${offer.id}`;
  return (
    <article className="card group flex w-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-square bg-slate-50">
        <Image
          src={offer.mainImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-2"
          priority={priority}
        />
        {offer.popular && (
          <span className="absolute left-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
            {offer.badge ?? "Populaire"}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Caractéristiques">
          <li className="tag">
            <Video className="h-3.5 w-3.5" aria-hidden="true" />
            {offer.cameraCount} caméras
          </li>
          <li className="tag">{offer.resolution}</li>
          {offer.hasAudio && (
            <li className="tag">
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
              Audio
            </li>
          )}
        </ul>

        <Heading className="mt-3 text-base font-semibold leading-snug text-slate-900">
          <Link href={href} className="hover:text-brand-700 hover:underline">
            {offer.title}
          </Link>
        </Heading>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{offer.tagline}</p>

        <div className="mt-4">
          <PackPrice offer={offer} />
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link href={href} className="btn btn-secondary flex-1 px-3">
            Voir le pack
          </Link>
          {onOrder && (
            <button type="button" onClick={() => onOrder(offer)} className="btn btn-primary flex-1 px-3">
              Commander
              <span className="sr-only"> : {offer.title}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
