import { FC } from "react"
import Breadcrumbs from "components/Breadcrumbs"
import ClaimCard from "components/ClaimCard"
import { Badge, Card } from "components/elements/layout"
import { getDietClaims } from "lib/claims"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "ダイエット・減量・糖質制限・断食・脂肪燃焼をめぐる誤情報や過大広告を集めた検証一覧。"

export const metadata = {
  title: "ダイエット関連の主張一覧",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/diet/`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/diet/`,
    title: "ダイエット関連の主張一覧 — Re pseudo",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ダイエット関連の主張一覧 — Re pseudo",
    description: DESCRIPTION,
  },
}

const bodyStyle: React.CSSProperties = {
  color: "#a0aec0",
  fontSize: ".9375rem",
  lineHeight: 1.85,
  margin: 0,
}

const DietPage: FC = () => {
  const claims = getDietClaims()
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ダイエット関連の主張一覧",
    description: DESCRIPTION,
    url: `${BASE_URL}/diet/`,
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
        name: "ダイエット関連",
        item: `${BASE_URL}/diet/`,
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
          items={[{ href: "/", label: "ホーム" }, { label: "ダイエット関連" }]}
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
        >
          <div>
            <Badge color="#f6ad55" label={`${claims.length}件`} />
          </div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
            ダイエット関連の主張一覧
          </h1>
          <p style={bodyStyle}>
            「糖質ゼロ」「脂肪燃焼」「断食で若返り」など、減量や体重管理の文脈で広がりやすい主張を集約。
            効果の有無だけでなく、広告で省かれやすい条件・リスク・根拠の飛躍も確認できる。
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
          ダイエット、減量、糖質制限、低糖質、断食、ファスティング、脂肪燃焼、クレンズ、カロリー、体重管理に関わる主張。
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

export default DietPage
