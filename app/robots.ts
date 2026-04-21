import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
