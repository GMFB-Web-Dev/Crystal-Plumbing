export type Service = {
  slug: "plumbing" | "gas-fitting";
  title: string;
  eyebrow: string;
  short: string;
  description: string;
  href: string;
  homeImage: string;
  overviewImage: string;
  heroImage: string;
  featureImage: string;
  imageAlt: string;
  featureImageAlt: string;
  residential: string[];
  commercial: string[];
};

export const services: Service[] = [
  {
    slug: "plumbing",
    title: "Plumbing",
    eyebrow: "From small repairs to full fit-outs",
    short: "Leaks, renovations, hot water and new installations—handled clearly and built to last.",
    description:
      "Reliable, straightforward plumbing for Auckland homes and small businesses. From a leaking tap to a full renovation, every job comes with a clear plan, careful workmanship and no surprises.",
    href: "/services/plumbing",
    homeImage: "/images/home/plumbing.png",
    overviewImage: "/images/services/plumbing.png",
    heroImage: "/images/plumbing/hero.png",
    featureImage: "/images/plumbing/quality-finish.png",
    imageAlt: "Modern brass shower installed by Crystal Plumbing",
    featureImageAlt: "Completed bathroom plumbing project with a freestanding bath",
    residential: [
      "Kitchen, bathroom and laundry plumbing",
      "Hot water cylinder installation and upgrades",
      "Leaking taps, toilets and burst-pipe repairs",
      "Blocked drains and drain maintenance",
      "Water-pressure fixes and filtration systems",
      "Fixture and pipe installation or replacement",
    ],
    commercial: [
      "Office, kitchen, bathroom and retail fit-outs",
      "Leak detection and urgent repairs",
      "Fixture, pipe and water-main installation",
      "Hot water systems and ongoing maintenance",
      "Plumbing for hospitality and food service",
      "Water-pressure and filtration solutions",
      "Drain cleaning and ongoing maintenance",
    ],
  },
  {
    slug: "gas-fitting",
    title: "Gas fitting",
    eyebrow: "Safe, certified gas work",
    short: "Hot water, appliances, LPG, leak detection and compliant installations across Auckland.",
    description:
      "Certified gas fitting for homes, cafés, shops and small businesses. We handle installations, upgrades, repairs and safety checks with clear communication at every step.",
    href: "/services/gas-fitting",
    homeImage: "/images/home/gas-fitting.png",
    overviewImage: "/images/services/gas-fitting.png",
    heroImage: "/images/gas-fitting/hero.png",
    featureImage: "/images/gas-fitting/quality-finish.png",
    imageAlt: "Efficient hot water system installed by Crystal Plumbing",
    featureImageAlt: "Quality hot water cylinder installation with tidy pipework",
    residential: [
      "Gas hot water installation and upgrades",
      "Switching from electric to gas, including LPG",
      "Oven, cooktop, heater and fireplace installation",
      "Gas leak detection and repairs",
      "Gas line installation and extensions",
      "Outdoor gas setups for barbecues, patio heaters and spa pools",
      "Safety inspections and compliance certificates",
    ],
    commercial: [
      "Gas lines for commercial kitchens and fit-outs",
      "Cooktop, oven, fryer and heater installation",
      "Commercial hot water systems",
      "Gas safety checks and certification",
      "Urgent gas leak detection and repairs",
      "Extensions to existing commercial gas systems",
      "Outdoor gas setups for cafés, restaurants and event spaces",
    ],
  },
];

export const processSteps = [
  ["Request a quote", "Tell us what you need and we’ll provide a clear starting estimate."],
  ["Site visit & scope", "James checks the job in person and plans the right solution."],
  ["Approve the quote", "Review a straightforward scope and price before work begins."],
  ["Lock in a date", "Choose a suitable time and we’ll arrive ready to get it sorted."],
] as const;
