import { ImageResponse } from "next/og"
import { getClaims, getClaimById } from "lib/claims"
import { VERDICT_COLOR, VERDICT_LABEL } from "lib/labels"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export const generateStaticParams = () =>
  getClaims().map((c) => ({ id: c.id }))

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const claim = getClaimById(id)

  if (!claim) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#261b22",
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        />
      ),
      { ...size },
    )
  }

  const verdictColor = VERDICT_COLOR[claim.verdict] ?? "#718096"
  const verdictLabel = VERDICT_LABEL[claim.verdict] ?? claim.verdict

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#261b22",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div
          style={{
            borderLeft: `8px solid ${verdictColor}`,
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            paddingLeft: "40px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: verdictColor,
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            {verdictLabel}
          </div>
          <div
            style={{
              color: "#f7fafc",
              display: "flex",
              fontSize: "46px",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {claim.title}
          </div>
          <div
            style={{
              color: "#a0aec0",
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.6,
            }}
          >
            {claim.summary.length > 80 ? claim.summary.slice(0, 80) + "…" : claim.summary}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            bottom: "60px",
            color: "#718096",
            display: "flex",
            fontSize: "22px",
            position: "absolute",
            right: "80px",
          }}
        >
          Re pseudo — re-pseudo.reload.co.jp
        </div>
      </div>
    ),
    { ...size },
  )
}
