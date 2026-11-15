import { about, type AboutEntry } from "@/content/pl";

function Entry({ e }: { e: AboutEntry }) {
  return (
    <div className="ab-entry">
      {e.label ? <p className="ab-label">{e.label}</p> : null}
      <h3 className="ab-title">{e.title}</h3>
      {e.description ? <p className="ab-desc">{e.description}</p> : null}
    </div>
  );
}

/** O mnie: left column = title + collapsible sections (closed by default), right column = bio + selected awards. */
export default function AboutSection() {
  return (
    <div className="ab">
      <div className="ab-left">
        <p className="ab-eyebrow">{about.eyebrow}</p>
        <h1 className="ab-h1">{about.title}</h1>
        <div className="ab-sections">
          {about.sections.map((sec) => (
            <details key={sec.title} className="ab-acc">
              <summary>
                <h2 className="ab-acc-title">
                  <span>{sec.title}</span>
                  <span className="ab-icon" aria-hidden />
                </h2>
              </summary>
              <div className="ab-acc-body">
                {sec.entries.map((e) => (
                  <Entry key={e.title} e={e} />
                ))}
                {"courses" in sec && sec.courses ? (
                  <>
                    <p className="ab-label ab-sublabel">{sec.coursesLabel}</p>
                    <div className="ab-courses">
                      {sec.courses.map((c) => (
                        <Entry key={c.title} e={c} />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="ab-right">
        <p className="ab-lead">{about.lead}</p>
        {about.paragraphs.map((p) => (
          <p className="ab-p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
        <p className="ab-p ab-awards-intro">{about.awardsIntro}</p>
        <ul className="ab-awards">
          {about.awards.map((a) => (
            <li key={a.rest}>
              <strong>{a.lead}</strong> {a.rest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
