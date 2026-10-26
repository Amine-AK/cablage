import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { BRAND_NAME, OWNER_NAME } from "@/lib/whatsapp";

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${OWNER_NAME} – ${BRAND_NAME}, accueil`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white">
        <Shield className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block truncate text-sm font-extrabold tracking-tight sm:text-base ${inverted ? "text-white" : "text-slate-900"}`}>
          {OWNER_NAME}
        </span>
        <span className={`block truncate text-xs ${inverted ? "text-slate-400" : "text-slate-500"}`}>{BRAND_NAME}</span>
      </span>
    </Link>
  );
}
