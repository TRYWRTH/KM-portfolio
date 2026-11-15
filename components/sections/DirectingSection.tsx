import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { productions } from "@/content/pl";

/**
 * Reżyseria: productions newest first in two staggered columns (right column set lower),
 * big photo with a short caption underneath. Productions without a photo show the caption only.
 */
export default function DirectingSection() {
  return (
    <article className="rz">
      <SectionHeader id="work" />
      <ol className="rz-grid">
        {productions.map((p, i) => (
          <li key={`${p.year}-${p.title}`} className="rz-item" data-col={i % 2 === 0 ? "l" : "r"}>
            <figure>
              {p.image ? (
                <div className="rz-frame">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 767px) 100vw, 44vw" />
                </div>
              ) : null}
              <figcaption className="rz-cap">
                <p className="rz-year tiny">{p.year}</p>
                <h2 className="rz-title">
                  „{p.title}”{p.author ? <span className="rz-author"> {p.author}</span> : null}
                </h2>
                <p className="rz-venue tiny">{p.venue}</p>
                {p.description ? <p className="rz-desc">{p.description}</p> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <ScrollReveal selector=".rz-item" />
    </article>
  );
}
