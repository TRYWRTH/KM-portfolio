"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import NavLabel from "@/components/NavLabel";
import { pl, sections } from "@/content/pl";


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
          <nav className="hero-nav" aria-label={pl.nav.main}>
            {sections.filter((s) => !s.topBar).map((s) => (
              <Link key={s.id} href={"/" + s.slug} scroll={false} className="navlink dim">
                <NavLabel label={s.label} mobileHide={s.mobileHide} />
              </Link>
            ))}
          </nav>
          {sections
            .filter((s) => s.topBar)
            .map((s) => (
              <Link key={s.id} href={"/" + s.slug} scroll={false} className="navlink dim">
                {s.label}
              </Link>
            ))}
        </header>

        <div className="name">
          <h1 className="editorial-sweep" aria-label={pl.name}>
            {pl.name.split(" ").map((word, w) => (
              <Fragment key={w}>
                {w > 0 ? " " : null}
                <span className="word" aria-hidden>
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="name-roles">
            {pl.roles.map((r, i) => (
              <Fragment key={r}>
                {i > 0 ? <span className="name-sep"> | </span> : null}
                {r}
              </Fragment>
            ))}
          </p>
        </div>

      </div>
    </>
  );
}
