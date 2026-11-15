import FeatureRow from "@/components/FeatureRow";
import SectionHeader from "@/components/SectionHeader";
import { productions } from "@/content/pl";

/** Reżyseria: a single readable list, newest first; the year is shown once per year. */
export default function DirectingSection() {
  return (
    <article className="works">
      <SectionHeader id="work" />
      <ol className="work-list">
        {productions.map((p, i) => {
          const firstOfYear = i === 0 || productions[i - 1].year !== p.year;
          return (
            <li key={`${p.year}-${p.title}`} className={firstOfYear ? "work new-year" : "work"}>
              <span className="work-year tiny" aria-hidden={!firstOfYear}>
                {firstOfYear ? p.year : ""}
              </span>
              {p.image ? (
                <FeatureRow
                  image={p.image}
                  headingLevel={2}
                  title={
                    <>
                      <span className="sr-only">{p.year}: </span>„{p.title}”
                      {p.author ? <span className="work-author"> {p.author}</span> : null}
                    </>
                  }
                  subtitle={p.venue}
                  description={p.description}
                />
              ) : (
              <div className="work-body">
                <h2 className="work-title">
                  <span className="sr-only">{p.year}: </span>„{p.title}”
                  {p.author ? <span className="work-author"> {p.author}</span> : null}
                </h2>
                <p className="work-venue tiny">{p.venue}</p>
                {p.description ? <p className="work-desc">{p.description}</p> : null}
              </div>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}
