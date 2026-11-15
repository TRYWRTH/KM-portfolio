# Karolina Maciejaszek — portfolio

Next.js (App Router) + TypeScript, plain CSS. No UI kit, no animation library.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Screenshots (landing + curtain mid-transition from each side, at 1440×900 and 390×844):

```bash
npm run build && npm start   # in one terminal
npm run screenshots          # in another; writes ./screenshots
```

The script uses Playwright (`npm i -D playwright` if it is not installed globally).

## Where things live

| What | Where |
| --- | --- |
| All copy (Polish), section list, label positions, teasers, curtain side | `content/pl.ts` |
| Landing page (photo, veil, name, floating labels, parallax) | `components/Landing.tsx` |
| Curtain + section page chrome (top bar, tabs, Esc, history) | `components/Shell.tsx` |
| Styles (ported 1:1 from the reference) | `app/globals.css` |
| One component per section (placeholders for now) | `components/sections/*.tsx` |
| Routes (`/o-mnie`, `/doswiadczenie`, `/rezyseria`, `/czarne-szmaty`, `/nagrody`, `/dydaktyka`, `/kontakt`) | `app/<slug>/page.tsx` |
| Original visual reference | `reference/v2.html` |

To design a section, replace the body of its file in `components/sections/`. The curtain logic doesn't need to change.

To add English later, create `content/en.ts` with the same shape as `pl` and choose one per locale.

## Swapping the photo

Replace `public/karolina.jpg` with the new image (landscape, about 2400px wide). Then adjust the focal point in `app/globals.css` with `--ox`: `71%` on desktop, `74%` in the `max-width: 820px` block. Next.js generates the responsive AVIF/WebP sizes automatically.

## How the curtain works

`Shell` is a client component in the root layout, so the landing page stays mounted under every route. When the pathname becomes a section, the ink layer and then the white page layer (+140 ms) wipe in with `clip-path` from the side that section's link lives on (`side` in `content/pl.ts`). Going back to `/` (Zamknij, Esc, the home link or the browser back button) reverses the wipe on the same side. Closing uses `history.back()` when you came from `/`, so it doesn't stack history entries. Tabs inside the page use `replace` and only cross-fade the content (220 ms). Direct loads of a section render it already open, with no animation.

## Intro

On a fresh load of `/`, the page starts white and the name clears out of the mist from the middle outwards (letters settle down as they sharpen, the tracking tightens and a soft haze swells and dissolves behind it) (`.stage.intro` in `app/globals.css`, letter delays in `components/Landing.tsx`). Once the letters have finished and the photo has loaded, `Shell` removes the `intro` class: the photo fades in from 105% scale, the name turns white, and the nav and labels follow. If the photo is slow, the page is revealed after 6s anyway. Visitors with reduced motion get no intro. Section URLs opened directly skip it too.
