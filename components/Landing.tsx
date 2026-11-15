"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import NavLabel from "@/components/NavLabel";
import { pl, sections } from "@/content/pl";

// Intro: letters rise into place left to right, 35ms apart.
const revealDelay = (i: number) => i * 35;

export default function Landing({ open, onPhotoLoad }: { open: boolean; onPhotoLoad?: () => void }) {
  const photo = useRef<HTMLImageElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  // Cursor parallax: eased rAF loop that only runs while the pointer target and
  // the current value differ, and never under reduced motion or while covered.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      if (photo.current)
        photo.current.style.objectPosition = `calc(var(--ox) + ${(cx * -1.2).toFixed(2)}%) 0%`; // stays pinned to the top
      raf = Math.abs(mx - cx) + Math.abs(my - cy) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || openRef.current) return;
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="bg" aria-hidden={open}>
        <div className="drift">
          <Image
            ref={photo}
            src="/karolina.jpg"
            alt={pl.photoAlt}
            fill
            priority
            fetchPriority="high"
            quality={72}
            sizes="(max-aspect-ratio: 3/2) 156vh, 104vw"
            draggable={false}
            onLoad={onPhotoLoad}
          />
        </div>
      </div>

      <div className="over tiny" inert={open}>
        <header className="top">
          <Link href="/" scroll={false} className="navlink wordmark">
            <span className="sl" aria-hidden>/</span>
            {pl.shortName}
          </Link>
          {sections
            .filter((s) => s.topBar)
            .map((s) => (
              <Link key={s.id} href={"/" + s.slug} scroll={false} className="navlink dim">
                {s.label}
              </Link>
            ))}
        </header>

        <div className="name">
          <h1 aria-label={pl.name}>
            {pl.name.split(" ").map((word, w, words) => (
              <Fragment key={w}>
              {w > 0 ? " " : null}
              <span className="word" aria-hidden>
                {Array.from(word).map((ch, c) => {
                  const i = words.slice(0, w).join("").length + c; // letter index across the name
                  return (
                    <span className="ch" key={c} style={{ "--cd": `${revealDelay(i)}ms` } as React.CSSProperties}>
                      {ch}
                    </span>
                  );
                })}
              </span>
              </Fragment>
            ))}
          </h1>
        </div>

        <nav className="hero-nav" aria-label={pl.nav.main}>
          {sections.filter((s) => !s.topBar).map((s) => (
            <Link key={s.id} href={"/" + s.slug} scroll={false} className="navlink dim">
              <NavLabel label={s.label} mobileHide={s.mobileHide} />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
