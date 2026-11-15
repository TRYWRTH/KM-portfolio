import Entry from "@/components/AbEntry";
import { about, awards, awardsTitle } from "@/content/pl";

/** O mnie: left column = title + collapsible sections (closed by default, Nagrody last), right column = bio. */
export default function AboutSection() {
  return (
    <div className="ab">
      <div className="ab-left">
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
          <details className="ab-acc">
            <summary>
              <h2 className="ab-acc-title">
                <span>{awardsTitle}</span>
                <span className="ab-icon" aria-hidden />
              </h2>
            </summary>
            <div className="ab-acc-body">
              {awards.map((a) => (
                <Entry
                  key={a.title + (a.festival ?? "")}
                  e={{ label: a.year ? String(a.year) : undefined, title: a.title, description: a.festival, more: [a.description], list: a.list }}
                />
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className="ab-right">
        <p className="ab-lead">{about.lead}</p>
        {about.paragraphs.map((p) => (
          <p className="ab-p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
