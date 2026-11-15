"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { pl, type Production } from "@/content/pl";

/**
 * One production on Reżyseria: photo with a small title in the middle and a glass "curtain"
 * (role, theatre · year, description) that materialises over it.
 * Click (or Enter / Space) toggles the curtain; it closes on its own when the pointer leaves the photo,
 * when focus moves away, on Esc, or when the photo scrolls mostly out of view (touch screens).
 * Touch screens also get a visible info button that toggles it.
 */
export default function ProductionCard({ p, sizes }: { p: Production; sizes: string }) {
  const [open, setOpen] = useState(false);
  const cvId = useId();
  const ref = useRef<HTMLElement>(null);

  // close once the photo is mostly scrolled out of view
  useEffect(() => {
    if (!open || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.intersectionRatio < 0.25 && setOpen(false), { threshold: [0, 0.25] });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [open]);

  return (
    <figure
      ref={ref}
      className={`pc${open ? " is-open" : ""}${p.wide ? "" : " pc-sm"}`}
      tabIndex={0}
      aria-describedby={cvId}
      onClick={() => setOpen((o) => !o)}
      onPointerLeave={(e) => {
        // only a real mouse "moves away"; touch screens fire this right after a tap
        if (e.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        } else if (e.key === "Escape" && open) {
          e.stopPropagation(); // close the photo, not the whole page
          setOpen(false);
        }
      }}
    >
      <div className="rz-frame">
        {p.image ? (
          <div className="rz-img">
            <Image src={p.image.src} alt={p.image.alt} fill sizes={sizes} />
          </div>
        ) : null}
        <h2 className="pc-name">{p.title}</h2>
        <div className="cv" id={cvId}>
          {p.image ? (
            <div className="cv-blur" aria-hidden>
              {/* same sizes as the photo above, so the browser reuses the file it already has */}
              <Image src={p.image.src} alt="" fill sizes={sizes} />
            </div>
          ) : null}
          <div className="cv-scrim" aria-hidden />
          <div className="cv-grain" aria-hidden />
          <div className="cv-sheen" aria-hidden />
          <div className="cv-rim" aria-hidden />
          <div className="cv-text">
            <div className="cv-meta">
              <p className="pc-line pc-role">
                {p.role} — {pl.name}
              </p>
              <p className="pc-line pc-place">
                {p.theatre} · {p.year}
              </p>
            </div>
            <div className="cv-desc">
              {p.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="pc-info"
          aria-expanded={open}
          aria-controls={cvId}
          aria-label={open ? "Zamknij informacje o spektaklu" : "Pokaż informacje o spektaklu"}
          onClick={(e) => {
            e.stopPropagation(); // the figure's own click would toggle it straight back
            setOpen((o) => !o);
          }}
        >
          <span className="pc-info-dot">{open ? <span className="pc-x" aria-hidden /> : <i aria-hidden>i</i>}</span>
        </button>
      </div>
    </figure>
  );
}
