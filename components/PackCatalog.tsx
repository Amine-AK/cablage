"use client";

import React, { useId, useMemo, useState } from "react";
import { OfferPackage } from "@/types";
import { resolutionKey } from "@/lib/catalog";
import PackCard from "./PackCard";
import OrderModal from "./OrderModal";

type Sort = "recommended" | "price-asc" | "price-desc";

const ALL = "all";

export default function PackCatalog({ offers }: { offers: OfferPackage[] }) {
  const uid = useId();
  const [cameras, setCameras] = useState(ALL);
  const [resolution, setResolution] = useState(ALL);
  const [audioOnly, setAudioOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("recommended");
  const [selected, setSelected] = useState<OfferPackage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Options come from the data so a filter can never yield an impossible choice.
  const cameraOptions = useMemo(() => Array.from(new Set(offers.map((o) => o.cameraCount))).sort((a, b) => a - b), [offers]);
  const resolutionOptions = useMemo(() => Array.from(new Set(offers.map(resolutionKey))).sort(), [offers]);

  const results = useMemo(() => {
    const filtered = offers.filter(
      (o) =>
        (cameras === ALL || o.cameraCount === Number(cameras)) &&
        (resolution === ALL || resolutionKey(o) === resolution) &&
        (!audioOnly || o.hasAudio)
    );
    if (sort === "recommended") return filtered;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...filtered].sort((a, b) => dir * (a.price.withInstallation - b.price.withInstallation));
  }, [offers, cameras, resolution, audioOnly, sort]);

  const hasFilters = cameras !== ALL || resolution !== ALL || audioOnly;
  const reset = () => {
    setCameras(ALL);
    setResolution(ALL);
    setAudioOnly(false);
  };

  return (
    <>
      <form
        role="search"
        aria-label="Filtrer les packs"
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-4 md:items-end"
      >
        <div>
          <label htmlFor={`${uid}-cam`} className="label">
            Caméras
          </label>
          <select id={`${uid}-cam`} className="input" value={cameras} onChange={(e) => setCameras(e.target.value)}>
            <option value={ALL}>Toutes</option>
            {cameraOptions.map((n) => (
              <option key={n} value={n}>
                {n} caméras
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-res`} className="label">
            Résolution
          </label>
          <select id={`${uid}-res`} className="input" value={resolution} onChange={(e) => setResolution(e.target.value)}>
            <option value={ALL}>Toutes</option>
            {resolutionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-sort`} className="label">
            Trier par
          </label>
          <select id={`${uid}-sort`} className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="recommended">Recommandé</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-slate-800">
          <input
            type="checkbox"
            checked={audioOnly}
            onChange={(e) => setAudioOnly(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 accent-brand-700"
          />
          Avec micro (audio)
        </label>
      </form>

      <div className="mt-4 flex min-h-[44px] flex-wrap items-center justify-between gap-2">
        <p aria-live="polite" className="text-sm text-slate-600">
          {results.length} pack{results.length > 1 ? "s" : ""} sur {offers.length}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="btn px-2 text-brand-700 underline hover:text-brand-900">
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {results.map((offer, i) => (
            <li key={offer.id} className="flex">
              <PackCard
                offer={offer}
                headingLevel="h2"
                priority={i < 2}
                onOrder={(o) => {
                  setSelected(o);
                  setModalOpen(true);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="font-medium text-slate-900">Aucun pack ne correspond à ces critères.</p>
          <p className="mt-1 text-sm text-slate-600">Modifiez les filtres ou demandez-nous un devis sur mesure.</p>
          <button type="button" onClick={reset} className="btn btn-secondary mt-4">
            Voir tous les packs
          </button>
        </div>
      )}

      <OrderModal pack={selected} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
