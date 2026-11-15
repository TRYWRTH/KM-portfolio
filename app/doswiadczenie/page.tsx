import type { Metadata } from "next";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("exp").label };

export default function Page() {
  return <ExperienceSection />;
}
