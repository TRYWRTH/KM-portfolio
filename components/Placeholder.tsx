import SectionHeader from "@/components/SectionHeader";
import { pl, type SectionId } from "@/content/pl";

/** Temporary subpage body. Replace a section's component to drop in the real design. */
export default function Placeholder({ id }: { id: SectionId }) {
  return (
    <article className="ph">
      <SectionHeader id={id} />
      <p className="p">{pl.placeholder}</p>
    </article>
  );
}
