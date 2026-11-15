/** Section label for the navigation; words in `mobileHide` are dropped below 768px. */
export default function NavLabel({ label, mobileHide }: { label: string; mobileHide?: string }) {
  if (!mobileHide || !label.startsWith(mobileHide)) return <>{label}</>;
  return (
    <>
      <span className="wide-only">{mobileHide} </span>
      {label.slice(mobileHide.length).trim()}
    </>
  );
}
