import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Recent Projects | Crystal Plumbing Auckland",
  description: "Explore recent bathroom, kitchen, hot water and plumbing work completed by Crystal Plumbing across Auckland.",
};

const projects = [
  ["/images/shower.jpg", "Bathroom fit-out", "Brass detail shower", "A modern shower installation with clean tile work and carefully aligned brass fittings."],
  ["/images/kitchen.jpg", "Kitchen plumbing", "Full renovation fit-out", "Complete kitchen plumbing prepared and finished as part of a bright residential renovation."],
  ["/images/hot-water.jpg", "Hot water", "Efficient system upgrade", "A modern, efficient hot-water system installed with tidy pipework and easy service access."],
  ["/images/bathroom.jpg", "Bathroom renovation", "Clean modern finish", "A compact bathroom transformed with crisp fixtures, warm timber and a thoughtful layout."],
  ["/images/basin.jpg", "Bathroom plumbing", "Wall-mounted brassware", "A refined basin installation with concealed plumbing and carefully positioned brass fittings."],
  ["/images/van.jpg", "Auckland-wide", "Ready for the next job", "Residential and light-commercial plumbing and gas fitting across the Auckland region."],
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Recent work" title="Good work speaks for itself." description="A selection of plumbing, bathroom, kitchen and hot-water projects completed with care across Auckland." image="/images/kitchen.jpg" imageAlt="A completed modern kitchen fit-out" />
      <section className="section project-page-section">
        <div className="section-heading compact-heading"><div><p className="eyebrow">Project gallery</p><h2>Practical work. Polished finish.</h2></div><p>Every project is different, but the standard stays the same: clear planning, tidy work and careful finishing.</p></div>
        <div className="project-page-grid">{projects.map(([image, type, title, description], index) => <article key={title} className={index === 0 || index === 3 ? "project-page-card featured" : "project-page-card"}><div><Image src={image} fill sizes="(max-width: 700px) 100vw, 50vw" alt={title} /></div><span>{type}</span><h2>{title}</h2><p>{description}</p></article>)}</div>
        <div className="projects-cta"><p>Have something similar in mind?</p><Link className="button primary" href="/contact">Discuss your project <b aria-hidden="true">→</b></Link></div>
      </section>
    </>
  );
}
