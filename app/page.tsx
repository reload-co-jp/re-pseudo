import Link from "next/link"
import { FC } from "react"
import { Badge, Card } from "components/elements/layout"
import { getCategoryCount, getFeaturedClaims, getLatestClaims } from "lib/claims"
import {
  CATEGORY_DESCRIPTION,
  CATEGORY_LABEL,
  RISK_COLOR,
  RISK_LABEL,
  VERDICT_COLOR,
  VERDICT_LABEL,
} from "lib/labels"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "似非科学・陰謀論・誤情報の主張を、根拠・出典・流布状況・よく使われる論法とともに整理する検証カタログ。"

export const metadata = {
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Re pseudo — 似非科学・陰謀論の主張検証",
    description: DESCRIPTION,
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "Re pseudo — 似非科学・陰謀論の主張検証",
    description: DESCRIPTION,
    images: ["/logo.svg"],
  },
}

const Page: FC = () => {
  const featured = getFeaturedClaims()
  const latest = getLatestClaims()
  const categoryCount = getCategoryCount()
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Re pseudo",
    url: BASE_URL,
    description: DESCRIPTION,
    inLanguage: "ja",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/claims/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        type="application/ld+json"
      />
      <section>
        <p style={{ color: "#a0aec0", fontSize: ".9375rem", lineHeight: 1.9, marginBottom: ".75rem" }}>
          陰謀論や疑似科学的な情報を、科学的な再現性・検証可能性の観点から見直し、事実に基づいた理解を広めることを目的としたサイトです。
        </p>
        <p style={{ color: "#718096", fontSize: ".875rem", lineHeight: 1.8 }}>
          特定の主張を否定すること自体を目的とするのではなく、「どのように検証されているのか」「何が事実として確認されているのか」を整理することで、より健全な情報環境に貢献します。
        </p>
      </section>

      <section>
        <h2
          style={{
            borderBottom: "1px solid #5a3d48",
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            paddingBottom: ".5rem",
          }}
        >
          注目記事
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {featured.map((c) => (
            <Card
              key={c.id}
              style={{
                borderLeft: `3px solid ${VERDICT_COLOR[c.verdict]}`,
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
                <Badge
                  color={VERDICT_COLOR[c.verdict]}
                  label={VERDICT_LABEL[c.verdict]}
                />
                <Badge
                  color={RISK_COLOR[c.risk_level]}
                  label={RISK_LABEL[c.risk_level]}
                />
              </div>
              <Link
                href={`/claims/${c.id}/`}
                style={{
                  color: "#e2e8f0",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {c.title}
              </Link>
              <p style={{ color: "#a0aec0", fontSize: ".875rem", lineHeight: 1.6 }}>
                {c.summary}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            borderBottom: "1px solid #5a3d48",
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            paddingBottom: ".5rem",
          }}
        >
          新着
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {latest.map((c) => (
            <div
              key={c.id}
              style={{
                alignItems: "center",
                display: "flex",
                gap: "1rem",
                padding: ".5rem 0",
              }}
            >
              <span style={{ color: "#718096", fontSize: ".75rem", whiteSpace: "nowrap" }}>
                {c.created_at}
              </span>
              <Badge
                color={VERDICT_COLOR[c.verdict]}
                label={VERDICT_LABEL[c.verdict]}
              />
              <Link
                href={`/claims/${c.id}/`}
                style={{
                  color: "#e2e8f0",
                  fontSize: ".875rem",
                  overflow: "hidden",
                  textDecoration: "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.title}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            borderBottom: "1px solid #5a3d48",
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            paddingBottom: ".5rem",
          }}
        >
          カテゴリ
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
          {(Object.entries(categoryCount) as [keyof typeof CATEGORY_LABEL, number][]).map(
            ([cat, count]) => (
              <Link
                href={`/claims/?category=${cat}`}
                key={cat}
                style={{
                  backgroundColor: "#372630",
                  border: "1px solid #5a3d48",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".4rem",
                  maxWidth: "260px",
                  padding: ".75rem 1rem",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: ".875rem", fontWeight: 600 }}>
                  {CATEGORY_LABEL[cat]}
                </div>
                <p style={{ color: "#a0aec0", fontSize: ".75rem", lineHeight: 1.6 }}>
                  {CATEGORY_DESCRIPTION[cat]}
                </p>
                <div style={{ color: "#718096", fontSize: ".75rem" }}>
                  {count}件
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

export default Page
