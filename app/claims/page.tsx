import { FC, Suspense } from "react"
import ClaimsClient from "components/ClaimsClient"
import { getClaims } from "lib/claims"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "似非科学・陰謀論・誤情報の主張一覧。カテゴリ・判定・危険度でフィルタリングできます。"

export const metadata = {
  title: "一覧 — Re pseudo",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/claims/`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/claims/`,
    title: "主張一覧 — Re pseudo",
    description: DESCRIPTION,
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "主張一覧 — Re pseudo",
    description: DESCRIPTION,
    images: ["/logo.svg"],
  },
}

const ClaimsPage: FC = () => {
  const claims = getClaims()
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Re pseudo 主張一覧",
    description: DESCRIPTION,
    url: `${BASE_URL}/claims/`,
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
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "主張一覧",
        item: `${BASE_URL}/claims/`,
      },
    ],
  }

  return (
    <div>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        主張一覧
      </h1>
      <Suspense>
        <ClaimsClient claims={claims} />
      </Suspense>
    </div>
  )
}

export default ClaimsPage
