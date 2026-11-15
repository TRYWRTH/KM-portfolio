import SectionHeader from "@/components/SectionHeader";
import { about, awards, awardsTitle } from "@/content/pl";

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

      <section aria-labelledby="awards-title">
        <h2 id="awards-title" className="k tiny sub-k">
          {awardsTitle}
        </h2>
        <ol className="work-list timeline awards">
          {awards.map((a, i) => {
            const firstOfYear = a.year !== undefined && (i === 0 || awards[i - 1].year !== a.year);
            return (
              <li key={a.title + (a.festival ?? "")} className={firstOfYear ? "work new-year" : "work"}>
                <span className="work-year tiny">{firstOfYear ? a.year : ""}</span>
                <div className="work-body">
                  <h3 className="work-title">{a.title}</h3>
                  {a.festival ? <p className="work-venue tiny">{a.festival}</p> : null}
                  {a.description ? <p className="work-desc">{a.description}</p> : null}
                  {a.list ? (
                    <ul className="award-list">
                      {a.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </article>
  );
}
