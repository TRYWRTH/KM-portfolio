import Image from "next/image";

/** Big picture with a short description beside it (below it on phones). */
export default function FeatureRow({
  image,
  kicker,
  title,
  subtitle,
  description,
  credit,
  headingLevel = 3,
}: {
  image: { src: string; alt: string };
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  credit?: string;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <figure className="feature">
      <div className="feature-img">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, 56vw" />
      </div>
      <figcaption className="feature-text">
        {kicker ? <p className="feature-kicker tiny">{kicker}</p> : null}
        <H className="feature-title">{title}</H>
        {subtitle ? <p className="work-venue tiny">{subtitle}</p> : null}
        {description ? <p className="feature-desc">{description}</p> : null}
        {credit ? <p className="feature-credit">{credit}</p> : null}
      </figcaption>
    </figure>
  );
}
