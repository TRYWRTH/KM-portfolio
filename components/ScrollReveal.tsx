"use client";

import { useEffect } from "react";

/**
 * Scroll effects for the Reżyseria grid, driven by the curtain's scroll container (#view):
 * the photo inside each frame lags behind the frame (inner parallax, --par), and items marked
 * data-drift move slightly faster than the rest (--drift). Off under reduced motion; the drift is
 * also off on narrow screens.
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
        const frame = el.querySelector<HTMLElement>(".rz-frame") ?? el;
        const r = frame.getBoundingClientRect();
        if (r.bottom < top0 - vh || r.top > top0 + 2 * vh) continue; // far off screen
        const offset = r.top - top0 + r.height / 2 - vh / 2; // >0 below the middle of the view
        const max = r.height * 0.1; // the photo overhangs its frame by 10% top and bottom
        const par = Math.max(-max, Math.min(max, -offset * 0.14));
        el.style.setProperty("--par", `${par.toFixed(1)}px`);
        const drift = wide.matches && el.dataset.drift ? (offset * -0.07).toFixed(1) : "0";
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
