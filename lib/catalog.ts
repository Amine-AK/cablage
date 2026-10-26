import { OFFERS } from "@/data/offers";
import { OfferPackage } from "@/types";

export function getOfferById(id: string): OfferPackage | undefined {
  return OFFERS.find((offer) => offer.id === id);
}

export function lowestInstalledPrice(): number {
  return Math.min(...OFFERS.map((o) => o.price.withInstallation));
}

export function lowestHardwarePrice(): number {
  return Math.min(...OFFERS.map((o) => o.price.hardwareOnly));
}

// "2MP Full HD (1080p)" -> "2MP". Used for filters only.
export function resolutionKey(offer: OfferPackage): string {
  return offer.resolution.match(/\d+\s?MP/i)?.[0].replace(/\s/g, "").toUpperCase() ?? offer.resolution;
}
