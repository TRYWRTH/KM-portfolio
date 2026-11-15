import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("about").label };

export default function Page() {
  return <AboutSection />;
}
