import React from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import { OFFERS } from "@/data/offers";
import { INSTALL_CITIES, NAV_LINKS } from "@/lib/site";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  DISPLAY_PHONE,
  OWNER_NAME,
  TEL_HREF,
  generateGeneralInquiryUrl,
} from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-sm text-slate-300">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo inverted />
          <p className="leading-relaxed text-slate-400">
            Vente et installation de caméras de surveillance, câblage réseau, Wi-Fi et dépannage électronique à domicile.
          </p>
          <p className="text-slate-400">
            Paiement après installation pour les packs installés à domicile.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Packs caméras</h2>
          <ul className="mt-3 space-y-2">
            {OFFERS.map((offer) => (
              <li key={offer.id}>
                <Link href={`/packs/${offer.id}`} className="hover:text-white hover:underline">
                  {offer.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/packs" className="font-medium text-white hover:underline">
                Tous les packs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Informations</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.filter((l) => l.href !== "/packs").map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href={TEL_HREF} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {DISPLAY_PHONE}
              </a>
            </li>
            <li>
              <a
                href={generateGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2 text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {INSTALL_CITIES.join(" · ")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="container-page py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {OWNER_NAME} — {BRAND_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
