"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle, User } from "lucide-react";
import { DISPLAY_PHONE, WHATSAPP_PHONE, CONTACT_EMAIL, OWNER_NAME, BRAND_NAME } from "@/lib/whatsapp";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Ain Aouda");
  const [service, setService] = useState("Pack 4 Caméras 5MP Ultra HD");
  const [message, setMessage] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Veuillez remplir votre nom et votre numéro de téléphone.");
      return;
    }

    const waText = [
      `👋 Bonjour ${OWNER_NAME} (${BRAND_NAME}),`,
      "",
      "Je vous contacte depuis le site web pour une demande d'intervention / devis :",
      `👤 *Nom :* ${name}`,
      `📱 *Téléphone :* ${phone}`,
      `📍 *Ville :* ${city}`,
      `🛠️ *Besoin :* ${service}`,
      message ? `📝 *Détails :* ${message}` : "",
      "",
      "Merci de me recontacter dès que possible !",
    ].filter(Boolean).join("\n");

    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`, "_blank");

    // Also trigger email endpoint in background
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "INQUIRY",
        clientName: name,
        phone,
        city,
        service,
        notes: message,
      }),
    }).catch(() => {});

    setSubmittedStatus("Votre demande a été transmise avec succès ! Nous vous répondons sur WhatsApp.");
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-950 relative scroll-mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 uppercase tracking-wider inline-block mb-3">
            Contact Direct
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Demandez Votre Devis <span className="gradient-text">Gratuit</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Remplissez ce formulaire rapide pour être recontacté directement par WhatsApp, ou appelez-nous directement pour une prise en charge immédiate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">{OWNER_NAME}</h3>
                <p className="text-xs text-cyan-400 font-semibold tracking-wide uppercase mt-0.5">
                  {BRAND_NAME}
                </p>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Technicien indépendant spécialisé en vidéosurveillance, courants faibles, réseaux informatiques et électronique à domicile.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition group text-slate-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Téléphone direct</span>
                    <strong className="text-white text-sm">{DISPLAY_PHONE}</strong>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 transition group text-slate-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-900/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 block">WhatsApp direct</span>
                    <strong className="text-white text-sm">{DISPLAY_PHONE}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition group text-slate-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 group-hover:scale-110 transition shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Email professionnel</span>
                    <strong className="text-white text-sm break-all">{CONTACT_EMAIL}</strong>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Zone d'intervention</span>
                    <strong className="text-white text-sm">Ain Aouda • Rabat • Témara • Salé</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Devis 100% gratuit & Réponse rapide sous 1 heure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Formulaire de Demande Rapide</h3>
              <p className="text-xs text-slate-400 mb-6">
                Remplissez les champs ci-dessous. Le message sera transmis immédiatement via WhatsApp et e-mail.
              </p>

              {submittedStatus && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{submittedStatus}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Votre Nom complet *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Amine Tazi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Votre Ville *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Ain Aouda">Ain Aouda</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Témara">Témara</option>
                      <option value="Salé">Salé</option>
                      <option value="Autre région">Autre région</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service / Offre souhaitée *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Pack 4 Caméras 2MP Full HD">Pack 4 Caméras 2MP Full HD</option>
                      <option value="Pack 4 Caméras 5MP Ultra HD">Pack 4 Caméras 5MP Ultra HD</option>
                      <option value="Pack 4 Caméras 5MP Audio Micro">Pack 4 Caméras 5MP Audio Micro</option>
                      <option value="Pack Pro 8 Caméras 5MP (8 Canaux)">Pack Pro 8 Caméras 5MP (8 Canaux)</option>
                      <option value="Extension & Partage Wi-Fi">Extension & Partage Wi-Fi</option>
                      <option value="Dépannage & Réparation Électronique">Dépannage & Réparation Électronique</option>
                      <option value="Autre projet sur mesure">Autre projet sur mesure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Précisions ou adresse (facultatif)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez votre besoin (villa, appartement, nombre de niveaux, problème de signal Wi-Fi...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma Demande via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
