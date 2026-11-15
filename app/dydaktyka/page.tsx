import type { Metadata } from "next";
import TeachingSection from "@/components/sections/TeachingSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("teach").label };

export default function Page() {
  return <TeachingSection />;
}
