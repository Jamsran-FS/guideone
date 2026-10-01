"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * [data-reveal] элементүүдийг дэлгэцэнд орох үед .is-visible болгоно.
 * Хуудас солигдох бүрт (pathname) болон DOM-д шинэ элемент нэмэгдэхэд дахин ажиллана —
 * ингэснээр client navigation-ий дараа контент нуугдаж үлдэхгүй.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      return;
    }

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

    const scan = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        // Дэлгэцэнд байгаа эсвэл дээр нь өнгөрсөн элементийг шууд харуулна
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-visible");
        else io.observe(el);
      });
    };

    scan();
    root.classList.add("reveal-ready");

    // Хуудас шилжилтийн дараа/хойно нэмэгдсэн элементүүд
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
