import type { Metadata } from "next";
import DirectingSection from "@/components/sections/DirectingSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("work").label };

export default function Page() {
  return <DirectingSection />;
}
