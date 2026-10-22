import type { MetadataRoute } from "next";
import { services } from "./site-data";

const baseUrl = "https://crystalplumbing.co.nz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/projects", "/contact", "/privacy-policy"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : path === "/privacy-policy" ? 0.2 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}${service.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.9,
    })),
  ];
}
