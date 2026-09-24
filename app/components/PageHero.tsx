import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-hero-image">
        <Image src={image} fill priority sizes="(max-width: 800px) 100vw, 45vw" alt={imageAlt} />
      </div>
    </section>
  );
}
