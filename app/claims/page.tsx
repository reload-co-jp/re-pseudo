import { FC, Suspense } from "react"
import ClaimsClient from "components/ClaimsClient"
import { getClaims } from "lib/claims"

export const metadata = {
  title: "一覧 — Re pseudo",
  description: "似非科学・陰謀論・誤情報の主張一覧。カテゴリ・判定・危険度でフィルタリングできます。",
  alternates: {
    canonical: "https://re-pseudo.reload.co.jp/claims/",
  },
  openGraph: {
    type: "website",
    url: "https://re-pseudo.reload.co.jp/claims/",
    title: "主張一覧 — Re pseudo",
    description: "似非科学・陰謀論・誤情報の主張一覧。カテゴリ・判定・危険度でフィルタリングできます。",
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "主張一覧 — Re pseudo",
    description: "似非科学・陰謀論・誤情報の主張一覧。カテゴリ・判定・危険度でフィルタリングできます。",
    images: ["/logo.svg"],
  },
}

const ClaimsPage: FC = () => {
  const claims = getClaims()

  return (
    <div>
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
