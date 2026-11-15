"use client";

import { useEffect } from "react";

/**
 * Scroll effects for the Reżyseria photo grid, driven by the curtain's scroll container (#view):
 * each frame's photo settles from 110% to 100% as it enters, and left-column items drift
 * slightly faster than right-column ones. Off under reduced motion and on narrow screens.
 */
export default function ScrollReveal({ selector }: { selector: string }) {
  useEffect(() => {
    const scroller = document.getElementById("view");
    if (!scroller || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const wide = matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = scroller.clientHeight;
      const top0 = scroller.getBoundingClientRect().top;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const top = r.top - top0;
        // 0 when the item's top reaches the bottom edge, 1 once it is 70% up the view
        const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.7)));
        el.style.setProperty("--reveal", p.toFixed(3));
        const drift = wide.matches && el.dataset.col === "l" ? ((top + r.height / 2 - vh / 2) * -0.08).toFixed(1) : "0";
        el.style.setProperty("--drift", `${drift}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [selector]);
  return null;
}
