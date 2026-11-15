/** Entry in the light-page style shared by O mnie and Czarne Szmaty: small label, title, grey description. */
export default function AbEntry({ e }: { e: { label?: string; title: string; description?: string } }) {
  return (
    <div className="ab-entry">
      {e.label ? <p className="ab-label">{e.label}</p> : null}
      <h3 className="ab-title">{e.title}</h3>
      {e.description ? <p className="ab-desc">{e.description}</p> : null}
    </div>
  );
}
