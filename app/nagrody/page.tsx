import type { Metadata } from "next";
import AwardsSection from "@/components/sections/AwardsSection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("awards").label };

export default function Page() {
  return <AwardsSection />;
}
