import React from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/types";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-slate-900 sm:text-base">
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
