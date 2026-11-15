"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { pl, sections, num, sectionById } from "@/content/pl";

// Parallax depth per label, same formula as the reference: .5 + ((i*37) % 10) / 10
const depth = (i: number) => 0.5 + ((i * 37) % 10) / 10;

export default function Landing({ open }: { open: boolean }) {
  const photo = useRef<HTMLImageElement>(null);
  const labs = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  // Cursor parallax: eased rAF loop that only runs while the pointer target and
  // the current value differ, and never under reduced motion or while covered.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const nodes = Array.from(labs.current?.children ?? []) as HTMLElement[];
    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      for (const a of nodes) {
        const d = +(a.dataset.depth ?? 1);
        a.style.translate = `${(-cx * 30 * d).toFixed(2)}px ${(-cy * 22 * d).toFixed(2)}px`;
      }
      if (photo.current)
        photo.current.style.objectPosition = `calc(var(--ox) + ${(cx * -1.2).toFixed(2)}%) calc(50% + ${(cy * -1.5).toFixed(2)}%)`;
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

  const about = sectionById("about");
  const contact = sectionById("contact");

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
          />
        </div>
      </div>

      <div className="over tiny" inert={open}>
        <nav className="top" aria-label={pl.nav.main}>
          <Link href="/" scroll={false}>
            <span className="sl" aria-hidden>/</span>
            {pl.shortName}
          </Link>
          <Link href={"/" + about.slug} scroll={false} className="dimmer">
            <span className="sl" aria-hidden>/</span>
            {about.label}
          </Link>
          <Link href={"/" + contact.slug} scroll={false} className="dimmer">
            <span className="sl" aria-hidden>/</span>
            {contact.label}
          </Link>
        </nav>

        <div className="name">
          <h1>{pl.name}</h1>
          <p>{pl.tagline}</p>
        </div>

        <nav className="labs" ref={labs} aria-label={pl.nav.sections}>
          {sections.map((s, i) =>
            s.pos ? (
              <Link
                key={s.id}
                href={"/" + s.slug}
                scroll={false}
                className="lab"
                data-depth={depth(i).toFixed(2)}
                style={
                  {
                    "--d": `${-i * 1.1}s`,
                    "--x": `${s.pos[0]}%`,
                    "--y": `${s.pos[1]}%`,
                    "--mx": `${s.mpos![0]}%`,
                    "--my": `${s.mpos![1]}%`,
                  } as React.CSSProperties
                }
              >
                <span className="w">
                  <span className="sl" aria-hidden>/</span>
                  <span className="l">{s.label}</span>
                  <span className="n" aria-hidden>{num(s.id)}</span>
                </span>
                <span className="t">{s.teaser}</span>
              </Link>
            ) : null,
          )}
        </nav>
      </div>
    </>
  );
}
