import React from "react";
import { OfferPackage } from "@/types";
import { formatPrice } from "@/lib/format";

interface Props {
  offer: OfferPackage;
  size?: "md" | "lg";
}

// Shows both real prices of a pack. The struck-through reference price from
// the data is paired with the installed price only.
export default function PackPrice({ offer, size = "md" }: Props) {
  const { price } = offer;
  const main = size === "lg" ? "text-3xl" : "text-xl";
  return (
    <dl className="space-y-1">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <dt className="w-full text-xs font-medium text-slate-500">Avec installation</dt>
        <dd className={`${main} font-bold text-slate-900`}>{formatPrice(price.withInstallation, price.currency)}</dd>
        {price.originalPrice && price.originalPrice > price.withInstallation && (
          <dd className="text-sm text-slate-500">
            <span className="sr-only">Prix habituel : </span>
            <s>{formatPrice(price.originalPrice, price.currency)}</s>
          </dd>
        )}
      </div>
      <div className="flex items-baseline gap-2 text-sm">
        <dt className="text-slate-500">Matériel seul :</dt>
        <dd className="font-semibold text-slate-800">{formatPrice(price.hardwareOnly, price.currency)}</dd>
      </div>
    </dl>
  );
}
