import PhotoGrid from "@/components/PhotoGrid";
import { pl, productions, sectionById } from "@/content/pl";

/** Reżyseria: productions newest first in the shared photo grid. */
export default function DirectingSection() {
  return (
    <article className="rz">
      {/* no visible headline: the first photo opens the page, centred; the heading stays for screen readers */}
      <h1 className="sr-only">{sectionById("work").label}</h1>
      <PhotoGrid
        items={productions.map((p) => ({
          title: p.title,
          lines: [`${p.role} — ${pl.name}`, `${p.theatre} · ${p.year}`],
          paragraphs: p.paragraphs,
          image: p.image,
          wide: p.wide,
        }))}
      />
    </article>
  );
}
