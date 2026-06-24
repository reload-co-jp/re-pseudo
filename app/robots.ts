import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "anthropic-ai",
          "Applebot",
          "CCBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "ClaudeBot",
          "Google-Extended",
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
