import type { MetadataRoute } from "next"

export const dynamic = "force-static"
import { getClaims } from "lib/claims"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const claims = getClaims()
  const latestUpdatedAt = claims
    .map((claim) => claim.updated_at)
    .sort((a, b) => b.localeCompare(a))[0]
  const latestModified = latestUpdatedAt ? new Date(latestUpdatedAt) : new Date()

  return [
    {
      url: BASE_URL,
      lastModified: latestModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/claims/`,
      lastModified: latestModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fallacies/`,
      lastModified: latestModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/diet/`,
      lastModified: latestModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/anti-government-conspiracy/`,
      lastModified: latestModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/criteria/`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/conspiracy/`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    ...claims.map((c) => ({
      url: `${BASE_URL}/claims/${c.id}/`,
      lastModified: new Date(c.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
