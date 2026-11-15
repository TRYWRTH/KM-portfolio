"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Landing from "@/components/Landing";
import { num, pl, sectionByPath, sections, type Side } from "@/content/pl";

const HIDE: Record<Side, string> = { l: "inset(0 100% 0 0)", r: "inset(0 0 0 100%)" };
const SWAP_MS = 220;
// Intro: letters start at 450ms, the outermost ones ~1.1s later, each settling for 1.4s.
const INTRO_LETTERS_MS = 3000;
const INTRO_MAX_MS = 6000; // reveal anyway if the photo is slow
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Persistent shell: the landing page always sits underneath, and every section
 * route is shown inside a two-layer curtain (ink, then white page) driven by
 * the current pathname. Route pages only provide the curtain's content.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const section = sectionByPath(pathname);

  const [open, setOpen] = useState(!!section); // open on first paint for direct loads
  const [ready, setReady] = useState(false); // no transitions until hydrated
  const [shownPath, setShownPath] = useState(pathname);
  // White intro with the name clearing out of the fog; only on a fresh load of "/".
  const [intro, setIntro] = useState(pathname === "/");
  const photoLoaded = useRef(false);
  const lettersDone = useRef(false);
  const endIntro = useCallback(() => {
    if (photoLoaded.current && lettersDone.current) setIntro(false);
  }, []);
  const onPhotoLoad = useCallback(() => {
    photoLoaded.current = true;
    endIntro();
  }, [endIntro]);

  const curtain = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLElement>(null);
  const openRef = useRef(open);
  openRef.current = open;
  const pathRef = useRef(pathname);
  const prevPath = useRef(pathname);
  const enteredFromHome = useRef(false); // true when "/" sits right below us in history

  // Tab switch while open: keep showing the old content until it has faded out.
  const swapping = open && !!section && shownPath !== pathname && !!sectionByPath(shownPath);
  const snapshot = useRef<React.ReactNode>(children);
  const glassSrc = (sectionByPath(shownPath) ?? sections[0]).bg;
  if (section && !swapping) snapshot.current = children;

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!intro) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setIntro(false);
    if (document.querySelector<HTMLImageElement>("#bg img")?.complete) photoLoaded.current = true;
    const a = setTimeout(() => {
      lettersDone.current = true;
      endIntro();
    }, INTRO_LETTERS_MS);
    const b = setTimeout(() => setIntro(false), INTRO_MAX_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useIsoLayoutEffect(() => {
    pathRef.current = pathname;
    const prev = prevPath.current;
    prevPath.current = pathname;
    const el = curtain.current!;

    if (section) {
      if (prev === "/" && pathname !== prev) enteredFromHome.current = true;
      if (!openRef.current) {
        // Snap the hidden curtain to the side we open from, then animate in.
        el.setAttribute("data-snap", "");
        el.style.setProperty("--hide", HIDE[section.side]);
        void el.offsetWidth;
        el.removeAttribute("data-snap");
        setShownPath(pathname);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (sectionByPath(pathRef.current)) setOpen(true);
          }),
        );
      } else {
        // Already open (direct load or tab switch): close back out on this item's side.
        el.style.setProperty("--hide", HIDE[section.side]);
      }
    } else if (openRef.current) {
      setOpen(false);
      enteredFromHome.current = false;
    }
  }, [pathname]);

  // Finish the cross-fade between sections.
  useEffect(() => {
    if (!swapping) return;
    const t = setTimeout(() => {
      setShownPath(pathname);
      page.current?.scrollTo(0, 0);
    }, SWAP_MS);
    return () => clearTimeout(t);
  }, [swapping, pathname]);

  // Focus: into the page when it opens, back to the trigger when it closes.
  const lastSlug = useRef<string | null>(null);
  useEffect(() => {
    if (!ready) return;
    if (open) {
      lastSlug.current = pathRef.current;
      page.current?.focus({ preventScroll: true });
    } else if (lastSlug.current) {
      const back = document.querySelector<HTMLElement>(`.over a[href="${lastSlug.current}"]`);
      back?.focus({ preventScroll: true });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = useCallback(() => {
    if (!sectionByPath(pathRef.current)) return;
    if (enteredFromHome.current) router.back();
    else router.push("/", { scroll: false });
  }, [router]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className={"stage" + (open ? " open" : "") + (intro ? " intro" : "")}>
      <Landing open={open} onPhotoLoad={onPhotoLoad} />

      <div id="curtain" ref={curtain} data-nt={ready ? undefined : ""} inert={!open} aria-hidden={!open}>
        <div className="c c1" />
        <div className="c c2">
          {/* tinted glass: the section's photo, heavily blurred, under a palette tint */}
          <div className="glass" aria-hidden>
            <Image key={glassSrc} src={glassSrc} alt="" fill sizes="480px" quality={40} />
          </div>
          <header className="bar tiny">
            <a
              href="/"
              className="home"
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              / {pl.shortName}
            </a>
            <nav className="tabs" aria-label={pl.nav.sections}>
              {sections.map((s) => {
                const current = ("/" + s.slug === (swapping ? pathname : shownPath)) || undefined;
                return (
                  <Link key={s.id} href={"/" + s.slug} replace scroll={false} aria-current={current && "page"}>
                    {num(s.id)} {s.label}
                  </Link>
                );
              })}
            </nav>
            <button type="button" className="close" onClick={close} aria-label={pl.nav.closeLabel}>
              {pl.nav.close}
            </button>
          </header>
          <main
            id="view"
            ref={page}
            tabIndex={-1}
            style={{ opacity: swapping ? 0 : undefined }}
          >
            {snapshot.current}
          </main>
        </div>
      </div>
    </div>
  );
}
