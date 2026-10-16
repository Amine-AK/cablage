"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, Menu, X, Shield, Cpu, Wifi } from "lucide-react";
import { DISPLAY_PHONE, generateGeneralInquiryUrl, BRAND_NAME, OWNER_NAME } from "@/lib/whatsapp";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      {/* Top marketing announcement banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 text-xs py-2 px-3 sm:px-4 text-white border-b border-emerald-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span dir="rtl" className="text-amber-300 font-extrabold text-xs sm:text-sm">
              تركيب كمرات مراقبة إبتداء من 1699درهم فقط تواصل للحصول على استشارة تقنية
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs">
            <span className="text-emerald-200 hidden md:inline">
              📍 Ain Aouda • Rabat • Témara • Salé
            </span>
            <a
              href={generateGeneralInquiryUrl("Offre Promo 1699 DH")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition"
            >
              <MessageCircle className="w-3 h-3" />
              <span>استشارة واتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                <span>{OWNER_NAME}</span>
                <span className="text-cyan-400 text-xs px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800">PRO</span>
              </div>
              <div className="text-xs text-slate-400 font-medium tracking-wide">
                {BRAND_NAME} • Caméras, Wi-Fi & Électronique
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#offres" className="hover:text-cyan-400 transition">
              Nos 4 Offres
            </a>
            <a href="#services" className="hover:text-cyan-400 transition">
              Services à Domicile
            </a>
            <a href="#pourquoi-nous" className="hover:text-cyan-400 transition">
              Pourquoi Nous
            </a>
            <a href="#zones" className="hover:text-cyan-400 transition">
              Zones d'Intervention
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition">
              Contact & Devis
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Appeler</span>
            </a>

            <a
              href={generateGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Devis WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={generateGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600 text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-5 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
            <a
              href="#offres"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-800"
            >
              Nos 4 Offres Caméras
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-800"
            >
              Services à Domicile (CCTV, Wi-Fi, Électronique)
            </a>
            <a
              href="#pourquoi-nous"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-800"
            >
              Nos Garanties
            </a>
            <a
              href="#zones"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-800"
            >
              Zones (Ain Aouda, Rabat, Témara, Salé)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-800"
            >
              Demander un Devis
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-white font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Appeler {DISPLAY_PHONE}</span>
            </a>
            <a
              href={generateGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
