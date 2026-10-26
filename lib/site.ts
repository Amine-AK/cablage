import { formatPrice } from "@/lib/format";
import { lowestInstalledPrice } from "@/lib/catalog";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cablage.ma").replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Cities where home installation and repair are offered (from data/services.ts).
export const INSTALL_CITIES = ["Rabat", "Salé", "Témara", "Ain Aouda"] as const;

// Nearby areas served on request only, as stated in the original coverage copy.
export const ON_REQUEST_AREAS = ["Kénitra", "Skhirat", "Bouznika", "Mers El Kheir", "Sidi Yahya Zaer"] as const;

// Choices offered in order/contact forms.
export const FORM_CITIES = [...INSTALL_CITIES, "Kénitra", "Autre ville"] as const;

// Single, short announcement. Set `enabled: false` to hide it site-wide.
export const ANNOUNCEMENT = {
  enabled: true,
  text: `Installation de caméras à domicile à partir de ${formatPrice(lowestInstalledPrice())} · ${INSTALL_CITIES.join(", ")}`,
  shortText: `Caméras installées dès ${formatPrice(lowestInstalledPrice())}`,
};

export const NAV_LINKS = [
  { href: "/packs", label: "Packs caméras" },
  { href: "/#services", label: "Services" },
  { href: "/#zones", label: "Zones" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
