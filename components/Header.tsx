"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { ANNOUNCEMENT, NAV_LINKS } from "@/lib/site";
import { DISPLAY_PHONE, TEL_HREF, generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
      >
        Aller au contenu
      </a>

      {ANNOUNCEMENT.enabled && (
        <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-100 sm:text-sm">
          <span className="hidden sm:inline">{ANNOUNCEMENT.text}</span>
          <span className="sm:hidden">{ANNOUNCEMENT.shortText}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm font-medium text-slate-700">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={TEL_HREF} className="btn btn-secondary hidden md:inline-flex">
              <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
              <span>{DISPLAY_PHONE}</span>
            </a>
            <a
              href={generateGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-3 sm:px-4"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">WhatsApp</span>
            </a>
            <button
              type="button"
              className="btn-icon text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              <span className="sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            </button>
          </div>
        </div>

        <div id="menu-mobile" hidden={!menuOpen} className="border-t border-slate-200 bg-white lg:hidden">
          <nav aria-label="Navigation mobile" className="container-page py-3">
            <ul className="divide-y divide-slate-100">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center text-base font-medium text-slate-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={TEL_HREF} className="btn btn-secondary mt-3 w-full">
              <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
              <span>Appeler le {DISPLAY_PHONE}</span>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
