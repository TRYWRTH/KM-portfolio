import type { Metadata } from "next";
import CzarneSzmatySection from "@/components/sections/CzarneSzmatySection";
import { collective } from "@/content/pl";

// the menu calls this section "Performance"; the page (and the tab title) is about Czarne Szmaty
export const metadata: Metadata = { title: collective.title };

export default function Page() {
  return <CzarneSzmatySection />;
}
