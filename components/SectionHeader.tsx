import { sectionById, type SectionId } from "@/content/pl";

/** Section title, shared by every subpage. */
export default function SectionHeader({ id }: { id: SectionId }) {
  return (
    <header className="sh">
      <h1 className="h2">{sectionById(id).label}</h1>
    </header>
  );
}
