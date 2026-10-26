"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, MessageCircle, X } from "lucide-react";
import { OfferPackage } from "@/types";
import { formatPrice } from "@/lib/format";
import { FORM_CITIES, absoluteUrl } from "@/lib/site";
import { isBlank, isValidMoroccanPhone } from "@/lib/validation";
import { OWNER_NAME, generateWhatsAppOrderUrl } from "@/lib/whatsapp";

interface OrderModalProps {
  pack: OfferPackage | null;
  isOpen: boolean;
  onClose: () => void;
  initialInstall?: boolean;
}

type Errors = Partial<Record<"name" | "phone", string>>;

export default function OrderModal({ pack, isOpen, onClose, initialInstall = true }: OrderModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const [includeInstallation, setIncludeInstallation] = useState(initialInstall);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<string>(FORM_CITIES[0]);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      setIncludeInstallation(initialInstall);
      setErrors({});
      setSentUrl(null);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, initialInstall]);

  // Fired for Escape, the close button and programmatic close alike.
  const handleDialogClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  if (!pack) return <dialog ref={dialogRef} onClose={handleDialogClose} />;

  const currentPrice = includeInstallation ? pack.price.withInstallation : pack.price.hardwareOnly;
  const priceLabel = formatPrice(currentPrice, pack.price.currency);

  const validate = (): Errors => {
    const next: Errors = {};
    if (isBlank(clientName)) next.name = "Indiquez votre nom.";
    if (isBlank(phone)) next.phone = "Indiquez votre numéro de téléphone.";
    else if (!isValidMoroccanPhone(phone)) next.phone = "Numéro non reconnu. Exemple : 06 12 34 56 78 ou +212 6 12 34 56 78.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const found = validate();
    setErrors(found);
    if (found.name) return nameRef.current?.focus();
    if (found.phone) return phoneRef.current?.focus();

    setIsSubmitting(true);
    const orderData = {
      packId: pack.id,
      packTitle: pack.title,
      clientName: clientName.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      includeInstallation,
      notes: notes.trim(),
      priceLabel,
      pageUrl: absoluteUrl(`/packs/${pack.id}`),
    };

    const waUrl = generateWhatsAppOrderUrl(orderData);
    // Must run synchronously in the click handler or popup blockers interfere.
    const win = window.open(waUrl, "_blank");
    if (win) win.opener = null;

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "ORDER", ...orderData }),
      keepalive: true,
    }).catch(() => {});

    setSentUrl(waUrl);
    setIsSubmitting(false);
  };

  const titleId = `${uid}-title`;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100%-1.5rem)] max-w-lg rounded-xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-900/60"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
        <div>
          <p className="eyebrow">{sentUrl ? "Dernière étape" : "Commander"}</p>
          <h2 id={titleId} className="mt-1 text-lg font-bold">
            {pack.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="btn-icon -mr-2 -mt-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Fermer</span>
        </button>
      </div>

      {sentUrl ? (
        <div className="space-y-4 p-5" role="status">
          <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              Votre commande est pré-remplie dans WhatsApp. <strong>Appuyez sur « Envoyer » dans WhatsApp</strong> pour la
              transmettre. {OWNER_NAME} vous recontactera pour la confirmer.
            </p>
          </div>
          <p className="text-sm text-slate-600">WhatsApp ne s&apos;est pas ouvert ?</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ouvrir WhatsApp
            </a>
            <button type="button" className="btn btn-secondary flex-1" onClick={() => dialogRef.current?.close()}>
              Fermer
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5">
          <fieldset>
            <legend className="label">Formule</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: true, label: "Avec installation", price: pack.price.withInstallation },
                { value: false, label: "Matériel seul", price: pack.price.hardwareOnly },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className={`flex cursor-pointer flex-col rounded-lg border p-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600 ${
                    includeInstallation === opt.value
                      ? "border-brand-700 bg-brand-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${uid}-formule`}
                    className="sr-only"
                    checked={includeInstallation === opt.value}
                    onChange={() => setIncludeInstallation(opt.value)}
                  />
                  <span className="font-medium text-slate-800">{opt.label}</span>
                  <span className="mt-1 font-bold">{formatPrice(opt.price, pack.price.currency)}</span>
                </label>
              ))}
            </div>
          </fieldset>

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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
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

          <div className="grid gap-4 sm:grid-cols-2">
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
            <div>
              <label htmlFor={`${uid}-city`} className="label">
                Ville <span aria-hidden="true">*</span>
              </label>
              <select id={`${uid}-city`} value={city} onChange={(e) => setCity(e.target.value)} className="input">
                {FORM_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={`${uid}-address`} className="label">
              Quartier / adresse <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id={`${uid}-address`}
              type="text"
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label htmlFor={`${uid}-notes`} className="label">
              Remarques <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <textarea
              id={`${uid}-notes`}
              rows={2}
              placeholder="Ex : maison à étage, disponible samedi matin…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input resize-y"
            />
          </div>

          <div className="rounded-lg bg-slate-50 p-4 text-sm">
            <p className="font-medium text-slate-800">Récapitulatif</p>
            <p className="mt-1 text-slate-600">
              {pack.title} — {includeInstallation ? "avec installation" : "matériel seul"}
            </p>
            <p className="mt-1 text-lg font-bold">{priceLabel}</p>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="btn btn-whatsapp w-full text-base">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Envoyer la commande sur WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-slate-500">
              Un message pré-rempli s&apos;ouvre dans WhatsApp. Rien n&apos;est envoyé tant que vous n&apos;appuyez pas sur
              « Envoyer ».
            </p>
          </div>
        </form>
      )}
    </dialog>
  );
}
