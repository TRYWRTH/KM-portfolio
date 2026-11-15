import SectionHeader from "@/components/SectionHeader";
import { about } from "@/content/pl";

/** O mnie: bio, then the timeline (education, Kalendarium, teaching at the Akademia). */
export default function AboutSection() {
  return (
    <article className="works about">
      <SectionHeader id="about" />
      <div className="bio">
        <p className="lead">{about.lead}</p>
        {about.bio.map((para) => (
          <p className="p" key={para.slice(0, 24)}>
            {para}
          </p>
        ))}
      </div>

      <section aria-labelledby="exp-title">
        <h2 id="exp-title" className="k tiny sub-k">
          {about.experienceTitle}
        </h2>
        <ol className="work-list timeline">
          {about.experience.map((e) => (
            <li key={e.years + e.title} className="work new-year">
              <span className="work-year tiny">{e.years}</span>
              <div className="work-body">
                <h3 className="work-title">{e.title}</h3>
                <p className="work-desc">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
