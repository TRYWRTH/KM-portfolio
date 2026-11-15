import FeatureRow from "@/components/FeatureRow";
import SectionHeader from "@/components/SectionHeader";
import { collective } from "@/content/pl";

/** Kolektyw Czarne Szmaty: text, list of actions, photos, link to Facebook. */
export default function CzarneSzmatySection() {
  return (
    <article className="works collective">
      <SectionHeader id="czsz" />
      <div className="bio">
        {collective.paragraphs.map((para) => (
          <p className="p" key={para.slice(0, 24)}>
            {para}
          </p>
        ))}
      </div>

      <section aria-labelledby="actions-title">
        <h2 id="actions-title" className="k tiny sub-k">
          {collective.actionsTitle}
        </h2>
        <ul className="actions">
          {collective.actions.map((a) => (
            <li key={a.title}>
              <span className="work-title">„{a.title}”</span>
              {a.with ? <span className="action-with">{a.with}</span> : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="photos-title">
        <h2 id="photos-title" className="k tiny sub-k">
          {collective.photosTitle}
        </h2>
        <ul className="features">
          {collective.photos.map((ph) => (
            <li key={ph.src}>
              <FeatureRow
                image={{ src: ph.src, alt: ph.alt }}
                kicker={`${ph.place}, ${ph.year}`}
                title={`„${ph.title}”`}
                description={ph.with}
                credit={ph.photo}
              />
            </li>
          ))}
        </ul>
      </section>

      <p className="p more">
        {collective.more.before}
        <a href={collective.more.href} target="_blank" rel="noopener noreferrer">
          {collective.more.linkText}
        </a>
        .
      </p>
    </article>
  );
}
