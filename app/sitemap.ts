import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";

// Update SITE_URL to match your production domain, or set NEXT_PUBLIC_SITE_URL
// in your deployment environment variables.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yahiahammad.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries = Object.keys(CASE_STUDIES).map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudyEntries,
  ];
}
