import Entry from "@/components/AbEntry";
import PhotoGrid from "@/components/PhotoGrid";
import { collective } from "@/content/pl";

/**
 * Kolektyw Czarne Szmaty, in the same light two-column style as O mnie:
 * left = title, collapsible list of actions; right = lead, paragraphs, Facebook link;
 * below = selected actions in the same photo grid as Reżyseria.
 */
export default function CzarneSzmatySection() {
  const [lead, ...rest] = collective.paragraphs;
  return (
    <div className="ab-page">
      <div className="ab">
        <div className="ab-left">
          <h1 className="ab-h1">{collective.title}</h1>
          <div className="ab-sections">
            <details className="ab-acc">
              <summary>
                <h2 className="ab-acc-title">
                  <span>{collective.actionsTitle}</span>
                  <span className="ab-icon" aria-hidden />
                </h2>
              </summary>
              <div className="ab-acc-body">
                {collective.actions.map((a) => (
                  <Entry key={a.title} e={{ title: `„${a.title}”`, description: a.with }} />
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="ab-right">
          <p className="ab-lead">{lead}</p>
          {rest.map((p) => (
            <p className="ab-p" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          <p className="ab-p ab-more">
            {collective.more.before}
            <a href={collective.more.href} target="_blank" rel="noopener noreferrer">
              {collective.more.linkText}
            </a>
            .
          </p>
        </div>
      </div>

      <section className="ab-works" aria-labelledby="works-title">
        <h2 id="works-title" className="ab-eyebrow">
          {collective.photosTitle}
        </h2>
        <PhotoGrid
          items={collective.photos.map((ph) => ({
            title: ph.title,
            lines: [ph.with, `${ph.place} · ${ph.year}`],
            paragraphs: [ph.photo],
            image: { src: ph.src, alt: ph.alt },
            wide: ph.wide,
          }))}
        />
      </section>
    </div>
  );
}
