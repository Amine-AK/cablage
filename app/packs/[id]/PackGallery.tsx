"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export default function PackGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        {current ? (
          <Image
            src={current}
            alt={`${title} – image ${active + 1} sur ${images.length}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-3"
            priority
          />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-slate-500">Image indisponible</p>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Choisir une image">
          {images.map((img, i) => (
            <li key={img} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`relative block h-16 w-16 overflow-hidden rounded-lg border-2 bg-white sm:h-20 sm:w-20 ${
                  i === active ? "border-brand-700" : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-contain p-1" />
                <span className="sr-only">Afficher l&apos;image {i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
