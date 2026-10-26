"use client";

import React, { useState } from "react";
import { OfferPackage } from "@/types";
import PackCard from "./PackCard";
import OrderModal from "./OrderModal";

interface Props {
  offers: OfferPackage[];
  headingLevel?: "h2" | "h3";
}

export default function PackGrid({ offers, headingLevel }: Props) {
  const [selected, setSelected] = useState<OfferPackage | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {offers.map((offer, i) => (
          <li key={offer.id} className="flex">
            <PackCard
              offer={offer}
              headingLevel={headingLevel}
              priority={i < 2}
              onOrder={(o) => {
                setSelected(o);
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
      <OrderModal pack={selected} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
