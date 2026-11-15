"use client";

import { useState } from "react";
import { contact } from "@/content/pl";

const rev = (s: string) => Array.from(s).reverse().join("");
const email = () => `${rev(contact.email.user)}@${rev(contact.email.domain)}`;
const phoneDigits = () => rev(contact.phone.digits);
const phoneText = () => phoneDigits().replace(/(\d{3})(?=\d)/g, "$1 "); // 606 290 300

/**
 * Kontakt: nothing is on display by default and nothing is in the HTML.
 * "Napisz e-mail" opens a new message (with a copy button); "Zadzwoń" reveals the number (a tel: link).
 */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [phoneShown, setPhoneShown] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available: open the e-mail instead
      location.href = `mailto:${email()}`;
    }
  };

  return (
    <div className="ab ct">
      <div className="ab-left">
        <h1 className="ab-h1">{contact.title}</h1>
      </div>
      <ul className="ab-right ct-list">
        <li>
          <p className="ab-label">{contact.email.label}</p>
          <div className="ct-row">
            <a
              className="ct-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                location.href = `mailto:${email()}`;
              }}
            >
              {contact.email.action}
            </a>
            <button type="button" className="ct-copy" onClick={copy}>
              {copied ? contact.email.copied : contact.email.copy}
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? contact.email.copied : ""}
          </span>
        </li>
        <li>
          <p className="ab-label">{contact.phone.label}</p>
          <div aria-live="polite">
            {phoneShown ? (
              <a className="ct-link" href={`tel:${contact.phone.country}${phoneDigits()}`}>
                {phoneText()}
              </a>
            ) : (
              <button
                type="button"
                className="ct-link ct-reveal"
                onClick={() => setPhoneShown(true)} // only shows the number; the visitor decides to call, text or copy
              >
                {contact.phone.action}
              </button>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
