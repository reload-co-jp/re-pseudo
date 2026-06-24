import { getClaims } from "lib/claims"
import { renderLlmsFullTxt } from "lib/ai"

export const dynamic = "force-static"

export const GET = () =>
  new Response(renderLlmsFullTxt(getClaims()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
