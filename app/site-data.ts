export type Service = {
  slug: "plumbing" | "gas-fitting";
  title: string;
  eyebrow: string;
  short: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
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
    image: "/images/shower.jpg",
    imageAlt: "Modern brass shower installed by Crystal Plumbing",
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
    image: "/images/hot-water.jpg",
    imageAlt: "Efficient hot water system installed by Crystal Plumbing",
    residential: [
      "Gas hot water installation and upgrades",
      "Switching from electric to gas, including LPG",
      "Oven, cooktop, heater and fireplace installation",
      "Gas leak detection and repairs",
      "Gas line installation and extensions",
      "Safety inspections and compliance certificates",
    ],
    commercial: [
      "Gas lines for commercial kitchens and fit-outs",
      "Cooktop, oven, fryer and heater installation",
      "Commercial hot water systems",
      "Gas safety checks and certification",
      "Urgent gas leak detection and repairs",
      "Extensions to existing commercial gas systems",
    ],
  },
];

export const processSteps = [
  ["Request a quote", "Tell us what you need and we’ll provide a clear starting estimate."],
  ["Site visit & scope", "James checks the job in person and plans the right solution."],
  ["Approve the quote", "Review a straightforward scope and price before work begins."],
  ["Lock in a date", "Choose a suitable time and we’ll arrive ready to get it sorted."],
] as const;
