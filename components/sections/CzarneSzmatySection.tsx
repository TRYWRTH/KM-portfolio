import Image from "next/image";
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
        <ul className="gallery">
          {collective.photos.map((ph) => (
            <li key={ph.src}>
              <figure>
                <div className="gallery-img">
                  <Image src={ph.src} alt={ph.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 400px" />
                </div>
                <figcaption>
                  <span className="gallery-title">„{ph.title}”</span>
                  <span className="gallery-credit">{ph.credit}</span>
                </figcaption>
              </figure>
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
