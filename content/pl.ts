// All Polish copy for the site lives here. To add English later, create
// content/en.ts with the same shape (`Content`) and pick one by locale.

export type SectionId =
  | "about"
  | "exp"
  | "work"
  | "czsz"
  | "awards"
  | "teach"
  | "contact";

export type Side = "l" | "r";

export interface Section {
  id: SectionId;
  /** URL path, without the leading slash */
  slug: string;
  label: string;
  /** one-line teaser shown on hover of the floating label */
  teaser: string;
  /** side the link lives on = side the curtain wipes in from */
  side: Side;
}

export const pl = {
  lang: "pl",
  name: "Karolina Maciejaszek",
  shortName: "K. Maciejaszek",
  tagline: "reżyserka · performerka · wykładowczyni",
  photoAlt: "Karolina Maciejaszek",
  meta: {
    title: "Karolina Maciejaszek — reżyserka, performerka, wykładowczyni",
    description:
      "Karolina Maciejaszek — reżyserka teatralna, performerka i wykładowczyni. Teatr formy łączący elementy teatru dramatycznego i plastycznego.",
  },
  nav: {
    main: "Główna nawigacja",
    sections: "Sekcje",
    close: "Zamknij ×",
    closeLabel: "Zamknij i wróć na stronę główną",
  },
  placeholder: "W przygotowaniu.",
  // Bottom navigation row on the hero, in display order.
  // O mnie = bio + timeline (education, Kalendarium) + teaching at the Akademia.
  heroNav: [
    { id: "about", label: "O mnie" },
    { id: "work", label: "Reżyseria" },
    { id: "czsz", label: "Kolektyw Czarne Szmaty" },
    { id: "contact", label: "Kontakt" },
  ] satisfies { id: SectionId; label: string }[],
  // Order defines the 01–07 numbering used on labels, tabs and kickers.
  sections: [
    { id: "about", slug: "o-mnie", label: "O mnie", teaser: "reżyserka · performerka · wykładowczyni", side: "l" },
    { id: "exp", slug: "doswiadczenie", label: "Doświadczenie", teaser: "2002 → dziś", side: "l" },
    { id: "work", slug: "rezyseria", label: "Reżyseria", teaser: "17 realizacji · 2007–2025", side: "l" },
    { id: "czsz", slug: "czarne-szmaty", label: "Czarne Szmaty", teaser: "kolektyw akcjonistyczny · od 2016", side: "l" },
    { id: "awards", slug: "nagrody", label: "Nagrody", teaser: "2 × Grand Prix · 2 × Złota Maska", side: "r" },
    { id: "teach", slug: "dydaktyka", label: "Dydaktyka", teaser: "ASTA Wrocław · od 2020", side: "r" },
    { id: "contact", slug: "kontakt", label: "Kontakt", teaser: "współpraca · zaproszenia", side: "r" },
  ] satisfies Section[],
};

export type Content = typeof pl;

export const sections: Section[] = pl.sections;

export const num = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;

export const sectionByPath = (path: string | null) =>
  sections.find((s) => "/" + s.slug === path?.replace(/\/$/, "")) ?? null;
