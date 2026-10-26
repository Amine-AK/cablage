import type { MetadataRoute } from "next";
import { OFFERS } from "@/data/offers";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/packs"), changeFrequency: "weekly", priority: 0.9 },
    ...OFFERS.map((offer) => ({
      url: absoluteUrl(`/packs/${offer.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
