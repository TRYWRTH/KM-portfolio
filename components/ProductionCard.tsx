"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { pl, type Production } from "@/content/pl";

/**
 * One production on Reżyseria: photo with a small title in the middle and a glass "curtain"
 * (role, theatre · year, description) that materialises over it.
 * Desktop: the curtain opens on hover or keyboard focus of the card.
 * Touch / narrow screens: only the info button opens it.
 */
export default function ProductionCard({ p, sizes }: { p: Production; sizes: string }) {
  const [open, setOpen] = useState(false);
  const cvId = useId();
  return (
    <figure className={`pc${open ? " is-open" : ""}${p.wide ? "" : " pc-sm"}`} tabIndex={0} aria-describedby={cvId}>
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
          onClick={() => setOpen((o) => !o)}
        >
          <span className="pc-info-dot">{open ? <span className="pc-x" aria-hidden /> : <i aria-hidden>i</i>}</span>
        </button>
      </div>
    </figure>
  );
}
