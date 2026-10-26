import { OrderData } from "@/types";

export const WHATSAPP_PHONE = "212658869574";
export const DISPLAY_PHONE = "+212 658 869 574";
export const TEL_HREF = `tel:+${WHATSAPP_PHONE}`;
export const CONTACT_EMAIL = "1Gb.resaux@gmail.com";
export const OWNER_NAME = "AMINE AIT YAHYA";
export const BRAND_NAME = "1Gb Réseaux & Sécurité";

function waUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppOrderUrl(data: OrderData): string {
  const installationText = data.includeInstallation
    ? "Avec installation & configuration à domicile"
    : "Matériel seul (sans installation)";

  const lines: (string | null)[] = [
    `Bonjour ${OWNER_NAME} (${BRAND_NAME}),`,
    "",
    "Je souhaite commander l'offre suivante :",
    `📦 *Offre :* ${data.packTitle}`,
    `🔧 *Option :* ${installationText}`,
    data.priceLabel ? `💰 *Prix affiché :* ${data.priceLabel}` : null,
    `👤 *Nom :* ${data.clientName}`,
    `📱 *Téléphone :* ${data.phone}`,
    `📍 *Ville :* ${data.city}${data.address ? ` (${data.address})` : ""}`,
    data.notes ? `📝 *Remarque :* ${data.notes}` : null,
    data.pageUrl ? `🔗 ${data.pageUrl}` : null,
    "",
    "Pouvez-vous me contacter pour confirmer la commande et planifier la livraison / l'installation ? Merci !",
  ].filter((line): line is string => line !== null);

  return waUrl(lines.join("\n"));
}

export function generateProductInquiryUrl(productName: string, productUrl: string): string {
  return waUrl(
    `Bonjour, je souhaite obtenir des informations sur ce produit : ${productName}. Lien : ${productUrl}`
  );
}

export function generateGeneralInquiryUrl(serviceName?: string): string {
  const text = serviceName
    ? `Bonjour ${OWNER_NAME}, je suis intéressé(e) par : ${serviceName}. Pouvez-vous me donner plus de détails ?`
    : `Bonjour ${OWNER_NAME} (${BRAND_NAME}), j'ai besoin d'un conseil pour une installation de caméras / réseau.`;
  return waUrl(text);
}
