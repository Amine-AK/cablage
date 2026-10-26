"use client";

import React, { useId, useRef, useState } from "react";
import { Info, Mail, MessageCircle, Phone } from "lucide-react";
import { OFFERS } from "@/data/offers";
import { HOME_SERVICES } from "@/data/services";
import { FORM_CITIES } from "@/lib/site";
import { isBlank, isValidMoroccanPhone } from "@/lib/validation";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  DISPLAY_PHONE,
  OWNER_NAME,
  TEL_HREF,
  WHATSAPP_PHONE,
  generateGeneralInquiryUrl,
} from "@/lib/whatsapp";

const NEEDS = [...OFFERS.map((o) => o.title), ...HOME_SERVICES.map((s) => s.title), "Autre projet"];

type Errors = Partial<Record<"name" | "phone", string>>;

export default function ContactSection() {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<string>(FORM_CITIES[0]);
  const [need, setNeed] = useState(NEEDS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [openedUrl, setOpenedUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {};
    if (isBlank(name)) found.name = "Indiquez votre nom.";
    if (isBlank(phone)) found.phone = "Indiquez votre numéro de téléphone.";
    else if (!isValidMoroccanPhone(phone)) found.phone = "Numéro non reconnu. Exemple : 06 12 34 56 78.";
    setErrors(found);
    if (found.name) return nameRef.current?.focus();
    if (found.phone) return phoneRef.current?.focus();

    const text = [
      `Bonjour ${OWNER_NAME} (${BRAND_NAME}),`,
      "",
      "Je vous contacte depuis le site web :",
      `👤 *Nom :* ${name.trim()}`,
      `📱 *Téléphone :* ${phone.trim()}`,
      `📍 *Ville :* ${city}`,
      `🛠️ *Besoin :* ${need}`,
      message.trim() ? `📝 *Détails :* ${message.trim()}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

    const win = window.open(url, "_blank");
    if (win) win.opener = null;

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "INQUIRY", clientName: name.trim(), phone: phone.trim(), city, service: need, notes: message.trim() }),
      keepalive: true,
    }).catch(() => {});

    setOpenedUrl(url);
  };

  return (
    <section id="contact" className="section border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title mt-2">Une question avant de commander ?</h2>
          <p className="section-lead">
            Décrivez votre besoin : nous vous aidons à choisir le bon matériel et vous donnons un devis.
          </p>

          <ul className="mt-6 space-y-3">
            <li>
              <a
                href={generateGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex min-h-[56px] items-center gap-3 p-3 hover:border-slate-300"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-whatsapp" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-slate-500">WhatsApp</span>
                  <span className="font-semibold">{DISPLAY_PHONE}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={TEL_HREF} className="card flex min-h-[56px] items-center gap-3 p-3 hover:border-slate-300">
                <Phone className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-slate-500">Téléphone</span>
                  <span className="font-semibold">{DISPLAY_PHONE}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="card flex min-h-[56px] items-center gap-3 p-3 hover:border-slate-300"
              >
                <Mail className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">E-mail</span>
                  <span className="block break-all font-semibold">{CONTACT_EMAIL}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="card p-5 sm:p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold">Demande de devis</h3>
          <p className="mt-1 text-sm text-slate-600">
            Le formulaire prépare un message WhatsApp avec vos informations. Vous l&apos;envoyez vous-même.
          </p>

          {openedUrl && (
            <div role="status" className="mt-4 flex gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm text-brand-950">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>
                Votre message est prêt dans WhatsApp : appuyez sur « Envoyer » pour nous le transmettre. WhatsApp ne
                s&apos;est pas ouvert ?{" "}
                <a href={openedUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  Ouvrir WhatsApp
                </a>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="label">
                  Nom complet <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={nameRef}
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                  className="input"
                />
                {errors.name && (
                  <p id={`${uid}-name-err`} className="field-error">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="label">
                  Téléphone / WhatsApp <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={phoneRef}
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                  className="input"
                />
                {errors.phone && (
                  <p id={`${uid}-phone-err`} className="field-error">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-city`} className="label">
                  Ville
                </label>
                <select id={`${uid}-city`} value={city} onChange={(e) => setCity(e.target.value)} className="input">
                  {FORM_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-need`} className="label">
                  Votre besoin
                </label>
                <select id={`${uid}-need`} value={need} onChange={(e) => setNeed(e.target.value)} className="input">
                  {NEEDS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-message`} className="label">
                Détails <span className="font-normal text-slate-500">(facultatif)</span>
              </label>
              <textarea
                id={`${uid}-message`}
                rows={3}
                placeholder="Type de logement, nombre de caméras, problème rencontré…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input resize-y"
              />
            </div>

            <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Préparer mon message WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
