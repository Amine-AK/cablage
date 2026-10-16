"use client";

import React, { useState } from "react";
import { OfferPackage } from "@/types";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { X, CheckCircle2, ShieldCheck, Phone, MapPin, User, MessageSquare, Send } from "lucide-react";

interface OrderModalProps {
  pack: OfferPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ pack, isOpen, onClose }: OrderModalProps) {
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Ain Aouda");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pack) return null;

  const currentPrice = includeInstallation
    ? pack.price.withInstallation
    : pack.price.hardwareOnly;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) {
      alert("Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      packId: pack.id,
      packTitle: pack.title,
      clientName,
      phone,
      city,
      address,
      includeInstallation,
      notes,
    };

    // Optionally notify API in background (fire-and-forget)
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ORDER",
          ...orderData,
        }),
      }).catch(() => {});
    } catch {
      // Ignore background error
    }

    // Generate WhatsApp link and open
    const waUrl = generateWhatsAppOrderUrl(orderData);
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-2">
            Commande & Devis Express
          </span>
          <h3 className="text-xl font-bold text-white">{pack.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{pack.tagline}</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Price & Installation Option */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Choisissez votre formule :
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIncludeInstallation(true)}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  includeInstallation
                    ? "border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500 text-white"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1 text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Recommandé
                  </div>
                  <div className="text-xs font-medium mt-1">Avec Pose à domicile</div>
                </div>
                <div className="text-base font-extrabold mt-2 text-white">
                  {pack.price.withInstallation} {pack.price.currency}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeInstallation(false)}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  !includeInstallation
                    ? "border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500 text-white"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-slate-400">Matériel Seul</div>
                  <div className="text-xs text-slate-400 mt-1">Sans installation</div>
                </div>
                <div className="text-base font-extrabold mt-2 text-slate-200">
                  {pack.price.hardwareOnly} {pack.price.currency}
                </div>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {includeInstallation
                  ? "Installation propre, câblage sécurisé et configuration mobile incluses"
                  : "Matériel neuf garanti avec assistance téléphonique pour la mise en route"}
              </span>
            </div>
          </div>

          {/* Customer Inputs */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nom complet *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Mohamed Amrani"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Numéro WhatsApp / Tél *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="06 XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ville d'intervention *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                  >
                    <option value="Ain Aouda">Ain Aouda</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Témara">Témara</option>
                    <option value="Salé">Salé</option>
                    <option value="Autre région">Autre région</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Quartier / Adresse (facultatif)
              </label>
              <input
                type="text"
                placeholder="Ex: Harhoura, Agdal, Hay Riad, Bettana..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Remarques particulières (facultatif)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  placeholder="Ex: Maison à étage, besoin aussi d'étendre le wifi, disponible samedi matin..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5" />
              <span>Commander via WhatsApp ({currentPrice} {pack.price.currency})</span>
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Un message prérempli s'ouvrira sur WhatsApp pour confirmation immédiate avec <strong>Amine Ait Yahya</strong>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
