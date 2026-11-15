import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("contact").label };

export default function Page() {
  return <ContactSection />;
}
