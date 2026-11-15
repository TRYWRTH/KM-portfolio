"use client";

import { useEffect } from "react";

/**
 * Scroll effect for the Reżyseria grid, driven by the curtain's scroll container (#view):
 * the photo inside each frame lags slightly behind the frame (inner parallax, --par).
 * Off under reduced motion.
 */
export default function ScrollReveal({ selector }: { selector: string }) {
  useEffect(() => {
    const scroller = document.getElementById("view");
    if (!scroller || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));
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
