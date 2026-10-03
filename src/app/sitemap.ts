import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wealthnestpro.in";

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-03",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Calculators
    {
      url: `${baseUrl}/calculators`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/emi`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/loan-prepayment`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/loan-balance-transfer`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/loan-against-property`,
      lastModified: "2026-10-03",
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Legal pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2026-10-03",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: "2026-10-03",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-10-03",
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}