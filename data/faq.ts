import { FaqItem } from "@/types";
import { CONTACT_EMAIL, DISPLAY_PHONE } from "@/lib/whatsapp";

// General questions shown on the home page. Business answers come from the
// existing pack data; anything not yet defined by the business (delivery fees,
// returns) points the customer to a direct contact instead of guessing.
export const GENERAL_FAQS: FaqItem[] = [
  {
    question: "Comment choisir entre un pack 2MP et un pack 5MP ?",
    answer:
      "Le 2MP (Full HD 1080p) suffit pour surveiller une entrée ou une petite pièce. Le 5MP offre nettement plus de détails : on peut zoomer sur un enregistrement et mieux distinguer un visage ou une plaque d'immatriculation. Pour une villa ou un commerce, le 5MP est généralement préférable.",
  },
  {
    question: "Quelle est la différence entre un DVR, un XVR et un NVR ?",
    answer:
      "Un DVR enregistre des caméras analogiques reliées en câble coaxial. Un NVR enregistre des caméras IP reliées en câble réseau (RJ45, souvent en PoE). Un XVR est un enregistreur hybride : il accepte les caméras analogiques HD et, selon le modèle, quelques caméras IP. Nos packs utilisent un XVR avec des caméras sur câble coaxial.",
  },
  {
    question: "Quel câble Ethernet choisir pour mon réseau ?",
    answer:
      "Pour une nouvelle installation, le Cat6 est le bon choix : il transporte 1 Gb/s jusqu'à 100 m et laisse de la marge pour l'avenir. Le Cat5e convient encore pour des besoins simples. Pour les caméras IP alimentées en PoE, préférez un câble en cuivre pur plutôt qu'en aluminium cuivré (CCA).",
  },
  {
    question: "Comment savoir si un équipement est compatible avec mon installation ?",
    answer:
      "Envoyez-nous sur WhatsApp la référence ou une photo de votre enregistreur et de vos caméras actuels. Nous vérifions la compatibilité (type de signal, résolution, nombre de canaux, alimentation) avant toute commande.",
  },
  {
    question: "Puis-je regarder les caméras depuis mon téléphone ?",
    answer:
      "Oui. L'application mobile gratuite permet de voir le direct et les enregistrements à distance, en 4G ou en Wi-Fi. Avec la formule installation, nous la configurons sur vos téléphones.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "Pour les packs avec installation, vous payez après la pose et la vérification du système sur votre téléphone. Pour l'achat de matériel seul, les modalités de paiement vous sont confirmées avec la commande.",
  },
  {
    question: "Quels sont les délais et les frais de livraison ?",
    answer:
      "Ils dépendent de votre ville et de la formule choisie. Contactez-nous sur WhatsApp ou par téléphone : nous vous confirmons le délai et les éventuels frais avant de valider la commande.",
  },
  {
    question: "Comment vous contacter ?",
    answer:
      `Par WhatsApp ou téléphone au ${DISPLAY_PHONE}, ou par e-mail à ${CONTACT_EMAIL}. Vous pouvez aussi utiliser le formulaire en bas de cette page.`,
  },
];
