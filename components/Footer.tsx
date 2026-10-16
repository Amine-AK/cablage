import React from "react";
import { Shield, Phone, Mail, MapPin, Heart } from "lucide-react";
import { DISPLAY_PHONE, CONTACT_EMAIL, OWNER_NAME, BRAND_NAME, generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">
                {OWNER_NAME}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {BRAND_NAME}. Vente, installation de caméras de surveillance, tirage de câble, optimisation Wi-Fi et dépannage électronique à domicile.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold">
              ● Déplacement rapide : Ain Aouda • Rabat • Témara • Salé
            </div>
          </div>

          {/* Nos Offres */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Nos Packs Caméras
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#offres" className="hover:text-cyan-400 transition">
                  Pack 4 Caméras 2MP Full HD
                </a>
              </li>
              <li>
                <a href="#offres" className="hover:text-cyan-400 transition">
                  Pack 4 Caméras 5MP Ultra HD
                </a>
              </li>
              <li>
                <a href="#offres" className="hover:text-cyan-400 transition">
                  Pack 4 Caméras 5MP Audio Micro
                </a>
              </li>
              <li>
                <a href="#offres" className="hover:text-cyan-400 transition">
                  Pack Pro 8 Caméras 5MP (8CH)
                </a>
              </li>
            </ul>
          </div>

          {/* Services à Domicile */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Services à Domicile
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition">
                  Installation Caméras CCTV & IP
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition">
                  Extension & Partage Réseau Wi-Fi Mesh
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition">
                  Câblage Informatique RJ45 Cat6
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition">
                  Réparation Électronique & Alimentations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Contact Direct
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{DISPLAY_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={generateGeneralInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition text-emerald-400"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>WhatsApp : {DISPLAY_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 hover:text-white transition break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Ain Aouda / Rabat / Témara / Salé</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {currentYear} {OWNER_NAME} — {BRAND_NAME}. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span>Service professionnel de proximité au Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
