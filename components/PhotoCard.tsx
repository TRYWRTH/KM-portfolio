"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Photo card used on Reżyseria and Czarne Szmaty: photo with a small title in the middle and a glass
 * "curtain" (two small lines + description) that materialises over it.
 * Click / tap (or Enter / Space) toggles the curtain; it closes on its own when the pointer leaves the photo,
 * when focus moves away, on Esc, or when the photo scrolls mostly out of view (touch screens).
 */
export interface PhotoCardData {
  title: string;
  /** two small lines at the top of the curtain, e.g. role — name / theatre · year */
  lines: [string, string];
  paragraphs: string[];
  image?: { src: string; alt: string };
  wide?: boolean;
}

export default function PhotoCard({ p, sizes }: { p: PhotoCardData; sizes: string }) {
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
      role="button"
      aria-label={p.title}
      aria-expanded={open}
      aria-controls={cvId}
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
              <p className="pc-line pc-role">{p.lines[0]}</p>
              <p className="pc-line pc-place">{p.lines[1]}</p>
            </div>
            <div className="cv-desc">
              {p.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
