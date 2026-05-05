import { FC } from "react"
import Breadcrumbs from "components/Breadcrumbs"
import ClaimCard from "components/ClaimCard"
import { Badge, Card } from "components/elements/layout"
import { getAntiGovernmentConspiracyClaims } from "lib/claims"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "政府・国際機関・軍・NASA・公的科学への不信を軸に広がる反政府的陰謀論を集めた検証一覧。"

export const metadata = {
  title: "反政府的陰謀論の主張一覧",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/anti-government-conspiracy/`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/anti-government-conspiracy/`,
    title: "反政府的陰謀論の主張一覧 — Re pseudo",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "反政府的陰謀論の主張一覧 — Re pseudo",
    description: DESCRIPTION,
  },
}

const bodyStyle: React.CSSProperties = {
  color: "#a0aec0",
  fontSize: ".9375rem",
  lineHeight: 1.85,
  margin: 0,
}

const AntiGovernmentConspiracyPage: FC = () => {
  const claims = getAntiGovernmentConspiracyClaims()
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "反政府的陰謀論の主張一覧",
    description: DESCRIPTION,
    url: `${BASE_URL}/anti-government-conspiracy/`,
    inLanguage: "ja",
    numberOfItems: claims.length,
    itemListElement: claims.map((claim, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/claims/${claim.id}/`,
      name: claim.title,
    })),
  }
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "反政府的陰謀論",
        item: `${BASE_URL}/anti-government-conspiracy/`,
      },
    ],
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />

      <header
        style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}
      >
        <Breadcrumbs
          items={[{ href: "/", label: "ホーム" }, { label: "反政府的陰謀論" }]}
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
        >
          <div>
            <Badge color="#f6ad55" label={`${claims.length}件`} />
          </div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
            反政府的陰謀論の主張一覧
          </h1>
          <p style={bodyStyle}>
            政府、国際機関、軍、NASA、公的科学が真実を隠しているという構図で広がる主張を集約。
            正当な制度批判と、証拠なしに巨大な秘密計画へ飛躍する語りを分けて確認できる。
          </p>
        </div>
      </header>

      <Card
        style={{
          borderLeft: "3px solid #f6ad55",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        <p style={bodyStyle}>
          対象:
          監視、人口削減、世界政府、ディープステート、気象・地震操作、NASA隠蔽、フリーエネルギー隠蔽などの主張。
        </p>
      </Card>

      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {claims.map((claim) => (
          <ClaimCard claim={claim} key={claim.id} />
        ))}
      </section>
    </div>
  )
}

export default AntiGovernmentConspiracyPage
