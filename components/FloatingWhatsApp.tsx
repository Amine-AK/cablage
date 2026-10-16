"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { generateGeneralInquiryUrl, DISPLAY_PHONE, OWNER_NAME } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="relative bg-slate-900 border border-slate-700/80 shadow-2xl rounded-2xl p-3 max-w-[260px] animate-bounce-subtle text-slate-100 hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fermer"
            className="absolute top-1.5 right-1.5 p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
              {OWNER_NAME} en ligne
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Besoin d'un devis rapide ou d'un conseil pour votre maison ? Discutons sur WhatsApp !
          </p>
        </div>
      )}

      {/* Button */}
      <a
        href={generateGeneralInquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactez Amine Ait Yahya sur WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/60 transition-transform transform hover:scale-110 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
