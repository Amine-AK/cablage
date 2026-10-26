import React from "react";
import { MessageCircle } from "lucide-react";
import { generateGeneralInquiryUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={generateGeneralInquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-colors hover:bg-whatsapp-dark sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      <span className="sr-only">Nous écrire sur WhatsApp</span>
    </a>
  );
}
