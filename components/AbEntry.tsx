/** Entry in the style shared by O mnie and Czarne Szmaty: small label, title, grey description lines, optional bullet list. */
export default function AbEntry({
  e,
}: {
  e: { label?: string; title: string; description?: string; more?: (string | undefined)[]; list?: string[] };
}) {
  return (
    <div className="ab-entry">
      {e.label ? <p className="ab-label">{e.label}</p> : null}
      <h3 className="ab-title">{e.title}</h3>
      {e.description ? <p className="ab-desc">{e.description}</p> : null}
      {e.more?.filter(Boolean).map((t) => (
        <p className="ab-desc" key={t}>
          {t}
        </p>
      ))}
      {e.list ? (
        <ul className="ab-list">
          {e.list.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
