"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Landing from "@/components/Landing";
import NavLabel from "@/components/NavLabel";
import { pl, sectionByPath, sections, type Side } from "@/content/pl";

const HIDE: Record<Side, string> = { l: "inset(0 100% 0 0)", r: "inset(0 0 0 100%)" };
const SWAP_MS = 1100; // ink + page wipe (.9s, page layer +.14s) when switching sections
// Intro: the name sweeps in from 300ms (1.15s), the roles from 1.5s (.9s); then the photo comes in
// and, 2s later, the name and roles fade away (see .name in globals.css).
const INTRO_LETTERS_MS = 2600;
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

  // Switching sections while open: the old page stays underneath ("ghost") while the ink layer
  // and the new page wipe in over it, exactly like opening a section from the home page.
  // the section page shown in the last committed render (updated only after commit, never during render)
  const lastContent = useRef<React.ReactNode>(section ? children : null);
  const content = section ? children : lastContent.current; // keep the old page while the curtain closes
  // the "ghost" is a visual copy of the current page, taken when a section link is clicked
  const ghostEl = useRef<HTMLDivElement>(null);
  const livePage = useRef<HTMLDivElement>(null);
  const ghostTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const snapGhost = useCallback(() => {
    const g = ghostEl.current, live = livePage.current;
    if (!g || !live || !openRef.current) return;
    const copy = live.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
    g.replaceChildren(...Array.from(copy.childNodes));
    const from = live.querySelector<HTMLElement>(".view"), to = g.querySelector<HTMLElement>(".view");
    if (from && to) to.scrollTop = from.scrollTop;
    g.hidden = false;
  }, []);
  const clearGhost = () => {
    const g = ghostEl.current;
    if (g) {
      g.hidden = true;
      g.replaceChildren();
    }
  };

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
      } else if (sectionByPath(prev) && prev !== pathname) {
        // Section to section: wipe the new page in over the old one, from the side we are heading to.
        const order = (p: string) => sections.findIndex((s) => "/" + s.slug === p);
        const from: Side = order(pathname) > order(prev) ? "r" : "l";
        if (ghostEl.current?.hidden) {
          // no snapshot (browser back/forward): just switch
          setShownPath(pathname);
          page.current?.scrollTo(0, 0);
          el.style.setProperty("--hide", HIDE[section.side]);
          return;
        }
        el.setAttribute("data-swap", "");
        el.style.setProperty("--hide", HIDE[from]);
        void el.offsetWidth;
        setShownPath(pathname);
        page.current?.scrollTo(0, 0);
        requestAnimationFrame(() => requestAnimationFrame(() => el.removeAttribute("data-swap")));
        clearTimeout(ghostTimer.current);
        ghostTimer.current = setTimeout(() => {
          clearGhost();
          el.style.setProperty("--hide", HIDE[section.side]); // closing goes back out on this item's side
        }, SWAP_MS);
      } else {
        // Already open (direct load): close back out on this item's side.
        el.style.setProperty("--hide", HIDE[section.side]);
      }
    } else if (openRef.current) {
      setOpen(false);
      enteredFromHome.current = false;
    }
  }, [pathname]);

  useIsoLayoutEffect(() => {
    if (section) lastContent.current = children;
  });

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

  function renderPage(content: React.ReactNode, path: string) {
    const isCurrent = (slug: string) => ("/" + slug === path ? ("page" as const) : undefined);
    const glassSrc = (sectionByPath(path) ?? sections[0]).bg;
    return (
      <>
        {/* tinted glass: the section's photo, heavily blurred, under a palette tint */}
        <div className="glass" aria-hidden>
          <Image key={glassSrc} src={glassSrc} alt="" fill sizes="480px" quality={40} />
        </div>
        {/* same chrome as the home page: wordmark + Kontakt on top, the other sections at the bottom */}
        <header className="bar">
          <a
            href="/"
            className="navlink wordmark"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <span className="sl" aria-hidden>/</span>
            {pl.shortName}
          </a>
          <nav className="top-nav" aria-label={pl.nav.main}>
            {sections
              .filter((s) => !s.topBar)
              .map((s) => (
                <Link key={s.id} href={"/" + s.slug} replace scroll={false} className="navlink dim" aria-current={isCurrent(s.slug)} onClick={() => !isCurrent(s.slug) && snapGhost()}>
                  <NavLabel label={s.label} mobileHide={s.mobileHide} />
                </Link>
              ))}
          </nav>
          {sections
            .filter((s) => s.topBar)
            .map((s) => (
              <Link key={s.id} href={"/" + s.slug} replace scroll={false} className="navlink dim" aria-current={isCurrent(s.slug)} onClick={() => !isCurrent(s.slug) && snapGhost()}>
                {s.label}
              </Link>
            ))}
        </header>
        <main id="view" className="view" ref={page} tabIndex={-1}>
          {content}
        </main>
      </>
    );
  }

  return (
    <div className={"stage" + (open ? " open" : "") + (intro ? " intro" : "")}>
      <Landing open={open} onPhotoLoad={onPhotoLoad} />

      <div id="curtain" ref={curtain} data-nt={ready ? undefined : ""} inert={!open} aria-hidden={!open}>
        <div className="c c2 c-ghost" ref={ghostEl} aria-hidden inert hidden />
        <div className="c c1" />
        <div className="c c2" ref={livePage}>{renderPage(content, shownPath)}</div>
      </div>
    </div>
  );
}
