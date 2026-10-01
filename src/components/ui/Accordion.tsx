"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

export type AccordionItem = { q: string; a: string };

/** Нэг зэрэг нэг нээгддэг, гөлгөр (grid-rows) шилжилттэй accordion */
export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold text-foreground transition-colors hover:text-accent sm:text-lg"
              >
                {item.q}
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border transition duration-300 ${
                    isOpen ? "rotate-45 border-primary bg-primary text-white" : "border-border text-primary"
                  }`}
                  aria-hidden
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
