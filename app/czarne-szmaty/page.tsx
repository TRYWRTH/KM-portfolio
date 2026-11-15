import type { Metadata } from "next";
import CzarneSzmatySection from "@/components/sections/CzarneSzmatySection";
import { sectionById } from "@/content/pl";

export const metadata: Metadata = { title: sectionById("czsz").label };

export default function Page() {
  return <CzarneSzmatySection />;
}
