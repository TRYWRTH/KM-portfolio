import { contact } from "@/content/pl";

/** Kontakt: headline and the two ways to get in touch, in the same style as O mnie. */
export default function ContactSection() {
  return (
    <div className="ab ct">
      <div className="ab-left">
        <h1 className="ab-h1">{contact.title}</h1>
      </div>
      <ul className="ab-right ct-list">
        {contact.items.map((c) => (
          <li key={c.href}>
            <p className="ab-label">{c.label}</p>
            <a className="ct-link" href={c.href}>
              {c.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
