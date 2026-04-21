import type { MetadataRoute } from "next"

export const dynamic = "force-static"
import { getClaims } from "lib/claims"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const claims = getClaims()

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/claims/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
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
