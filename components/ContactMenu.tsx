"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contact } from "@/content/pl";

const rev = (s: string) => Array.from(s).reverse().join("");

/**
 * "Kontakt" in the menus: a button that opens two plain links, "Mail" and "Telefon".
 * The address and number are filled in only after the page has loaded in the browser,
 * so they never appear in the HTML. `up` opens the list above the button (bottom rail).
 */
export default function ContactMenu({ className = "", up = false }: { className?: string; up?: boolean }) {
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<{ mail: string; tel: string; email: string; phone: string } | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const email = `${rev(contact.email.user)}@${rev(contact.email.domain)}`;
    const digits = rev(contact.phone.digits);
    setLinks({ mail: `mailto:${email}`, tel: `tel:${contact.phone.country}${digits}`, email, phone: digits.replace(/(\d{3})(?=\d)/g, "$1 ") });
  }, []);

  // close on a click elsewhere
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    addEventListener("pointerdown", onDown);
    return () => removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`cm${up ? " cm-up" : ""}${open ? " is-open" : ""} ${className}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation(); // close this menu, not the page
          setOpen(false);
        }
      }}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setOpen(false)}
    >
      <button type="button" className="navlink cm-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {contact.title}
      </button>
      <ul className="cm-list" id={id} hidden={!open}>
        <li>
          <a className="navlink" href={links?.mail} title={links?.email}>
            {contact.email.label}
          </a>
        </li>
        <li>
          <a className="navlink" href={links?.tel} title={links?.phone}>
            {contact.phone.label}
          </a>
        </li>
      </ul>
    </div>
  );
}
