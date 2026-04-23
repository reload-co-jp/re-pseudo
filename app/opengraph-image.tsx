import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const alt = "Re pseudo — 似非科学・陰謀論の主張検証"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
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
            background: "#3d2b34",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "60px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#f6ad55",
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Re pseudo
          </div>
          <div
            style={{
              color: "#f7fafc",
              display: "flex",
              fontSize: "52px",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Pseudoscience & Conspiracy Fact-Check Catalog
          </div>
          <div
            style={{
              color: "#a0aec0",
              display: "flex",
              fontSize: "28px",
              lineHeight: 1.6,
            }}
          >
            似非科学・陰謀論・誤情報の主張検証
          </div>
        </div>
        <div
          style={{
            color: "#718096",
            display: "flex",
            fontSize: "22px",
            marginTop: "32px",
          }}
        >
          re-pseudo.reload.co.jp
        </div>
      </div>
    ),
    { ...size },
  )
}
