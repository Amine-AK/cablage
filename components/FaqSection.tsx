import React from "react";
import { GENERAL_FAQS } from "@/data/faq";
import FaqList from "./FaqList";

export default function FaqSection() {
  return (
    <section id="faq" className="section border-t border-slate-200">
      <div className="container-page grid gap-8 lg:grid-cols-3">
        <div>
          <p className="eyebrow">Questions fréquentes</p>
          <h2 className="section-title mt-2">Bien choisir son matériel</h2>
          <p className="section-lead">Les réponses aux questions que l&apos;on nous pose le plus souvent.</p>
        </div>
        <div className="lg:col-span-2">
          <FaqList items={GENERAL_FAQS} />
        </div>
      </div>
    </section>
  );
}
