// All Polish copy for the site lives here. To add English later, create
// content/en.ts with the same shape (`Content`) and pick one by locale.

export type SectionId = "about" | "work" | "czsz" | "contact";

export type Side = "l" | "r";

export interface Section {
  id: SectionId;
  /** URL path, without the leading slash */
  slug: string;
  label: string;
  /** shown in the top-right corner of the hero instead of the bottom row */
  topBar?: true;
  /** words dropped from the label on narrow screens (< 768px), e.g. "Kolektyw" */
  mobileHide?: string;
  /** photo shown blurred, behind tinted glass, as the page background */
  bg: string;
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
  // The four sections, in order. Order = the hero navigation (Kontakt sits top right),
  // the tabs inside an open page, and the 01–04 numbering on the kickers.
  sections: [
    // bio + timeline (education, Kalendarium) + teaching at the Akademia
    { id: "about", slug: "o-mnie", label: "O mnie", bg: "/karolina.jpg", side: "l" },
    // her main work
    { id: "work", slug: "rezyseria", label: "Reżyseria", bg: "/photos/orlice.jpg", side: "l" },
    { id: "czsz", slug: "czarne-szmaty", label: "Kolektyw Czarne Szmaty", mobileHide: "Kolektyw", bg: "/photos/granica-pogardy.jpg", side: "l" },
    { id: "contact", slug: "kontakt", label: "Kontakt", bg: "/photos/ulanskie-fantazje.jpg", side: "r", topBar: true },
  ] satisfies Section[],
};

export type Content = typeof pl;

export const sections: Section[] = pl.sections;

export const num = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;

export const sectionByPath = (path: string | null) =>
  sections.find((s) => "/" + s.slug === path?.replace(/\/$/, "")) ?? null;
