import ProductionCard from "@/components/ProductionCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { productions } from "@/content/pl";

/**
 * Reżyseria: productions newest first; photos pair up side by side, "wide" ones take the full width.
 * A small title sits in the middle of each photo; details live in the glass curtain (see ProductionCard).
 */
export default function DirectingSection() {
  return (
    <article className="rz">
      <SectionHeader id="work" />
      <ol className="rz-grid">
        {productions.map((p) => (
          <li key={`${p.year}-${p.title}`} className={`rz-item${p.wide ? " rz-wide" : ""}`}>
            <ProductionCard p={p} sizes={p.wide ? "(max-width: 767px) 100vw, 96vw" : "(max-width: 767px) 100vw, 48vw"} />
          </li>
        ))}
      </ol>
      <ScrollReveal selector=".rz-item" />
    </article>
  );
}
