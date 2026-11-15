import PhotoCard, { type PhotoCardData } from "@/components/PhotoCard";
import ScrollReveal from "@/components/ScrollReveal";

/** Pairs side by side, "wide" photos full width; shared by Reżyseria and Czarne Szmaty. */
export default function PhotoGrid({ items }: { items: PhotoCardData[] }) {
  return (
    <>
      <ol className="rz-grid">
        {items.map((p) => (
          <li key={p.title} className={`rz-item${p.wide ? " rz-wide" : ""}`}>
            <PhotoCard p={p} sizes={p.wide ? "(max-width: 767px) 100vw, 96vw" : "(max-width: 767px) 100vw, 48vw"} />
          </li>
        ))}
      </ol>
      <ScrollReveal selector=".rz-item" />
    </>
  );
}
