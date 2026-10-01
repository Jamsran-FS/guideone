"use client";

import { useEffect } from "react";

/**
 * [data-reveal] элементүүдийг дэлгэцэнд орох үед .is-visible болгоно.
 * Нэг удаа mount хийнэ (layout дотор) — бусад хэсгүүд Server Component хэвээр.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    // Дэлгэцэнд аль хэдийн байгаа элементүүдийг шууд харуулна (анивчихгүй)
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-visible");
      else io.observe(el);
    }
    root.classList.add("reveal-ready");

    return () => io.disconnect();
  }, []);

  return null;
}
