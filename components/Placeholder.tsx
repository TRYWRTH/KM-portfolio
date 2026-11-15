import { num, pl, sectionById, type SectionId } from "@/content/pl";

/** Temporary subpage body. Replace a section's component to drop in the real design. */
export default function Placeholder({ id }: { id: SectionId }) {
  const s = sectionById(id);
  return (
    <article className="ph">
      <p className="k tiny">
        {num(id)} — {s.label}
      </p>
      <h1 className="h2">{s.label}</h1>
      <p className="p">{pl.placeholder}</p>
    </article>
  );
}
