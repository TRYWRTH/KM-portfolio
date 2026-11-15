import ProductionCard from "@/components/ProductionCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { productions } from "@/content/pl";

/**
 * Reżyseria: productions newest first in an uneven grid (a repeating rhythm of five sizes and offsets).
 * Each card is a photo with a glass-curtain description and a two-line caption (see ProductionCard).
 */
export default function DirectingSection() {
  return (
    <article className="rz">
      <SectionHeader id="work" />
      <ol className="rz-grid">
        {productions.map((p, i) => {
          const slot = i % 5;
          const right = slot === 1 || slot === 3;
          const small = slot === 1 || slot === 2;
          return (
            <li key={`${p.year}-${p.title}`} className={`rz-item rz-slot-${slot}`} data-drift={right ? "1" : undefined}>
              <ProductionCard
                p={p}
                side={right ? "r" : "l"}
                small={small}
                sizes={small ? "(max-width: 767px) 100vw, 34vw" : "(max-width: 767px) 100vw, 60vw"}
              />
            </li>
          );
        })}
      </ol>
      <ScrollReveal selector=".rz-item" />
    </article>
  );
}
