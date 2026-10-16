import { OrderData } from "@/types";

export const WHATSAPP_PHONE = "212658869574";
export const DISPLAY_PHONE = "+212 658 869 574";
export const CONTACT_EMAIL = "1Gb.resaux@gmail.com";
export const OWNER_NAME = "AMINE AIT YAHYA";
export const BRAND_NAME = "1Gb Réseaux & Sécurité";

export function generateWhatsAppOrderUrl(data: OrderData): string {
  const installationText = data.includeInstallation
    ? "Avec installation & configuration à domicile"
    : "Matériel seul (sans installation)";

  const lines = [
    `👋 Bonjour ${OWNER_NAME} (${BRAND_NAME}),`,
    "",
    "Je souhaite commander l'offre suivante :",
    `📦 *Offre :* ${data.packTitle}`,
    `🔧 *Option :* ${installationText}`,
    `👤 *Nom :* ${data.clientName}`,
    `📱 *Téléphone :* ${data.phone}`,
    `📍 *Ville :* ${data.city}${data.address ? ` (${data.address})` : ""}`,
    data.notes ? `📝 *Remarque :* ${data.notes}` : "",
    "",
    "Pouvez-vous me contacter pour planifier la livraison / l'installation ? Merci !",
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralInquiryUrl(serviceName?: string): string {
  const text = serviceName
    ? `👋 Bonjour ${OWNER_NAME}, je suis intéressé par votre service : *${serviceName}*. Pouvez-vous me donner plus de détails et vos disponibilités d'intervention ?`
    : `👋 Bonjour ${OWNER_NAME} (${BRAND_NAME}), je souhaite un devis gratuit pour une installation de caméras / réseau Wi-Fi / réparation à domicile.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
