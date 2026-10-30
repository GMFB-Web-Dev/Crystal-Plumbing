import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  actions?: Array<{ label: string; href: string }>;
};

export default function PageHero({ eyebrow, title, description, image, imageAlt, actions = [] }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions.length > 0 && (
          <div className="page-hero-actions">
            {actions.map((action) => (
              <Link className="button primary" href={action.href} key={action.href}>
                {action.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="page-hero-image">
        <Image src={image} fill preload sizes="(max-width: 800px) 100vw, 45vw" alt={imageAlt} />
      </div>
    </section>
  );
}
