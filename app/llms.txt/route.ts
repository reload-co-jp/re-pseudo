import { getClaims } from "lib/claims"
import { renderLlmsTxt } from "lib/ai"

export const dynamic = "force-static"

export const GET = () =>
  new Response(renderLlmsTxt(getClaims()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
