import { num, sectionById, type SectionId } from "@/content/pl";

/** Kicker ("02 — Reżyseria") + section title, shared by every subpage. */
export default function SectionHeader({ id }: { id: SectionId }) {
  const s = sectionById(id);
  return (
    <header className="sh">
      <p className="k tiny">
        {num(id)} — {s.label}
      </p>
      <h1 className="h2">{s.label}</h1>
    </header>
  );
}
