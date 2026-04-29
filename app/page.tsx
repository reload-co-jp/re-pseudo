import Link from "next/link"
import { FC } from "react"
import { Badge, Card } from "components/elements/layout"
import { formatDate, getCategoryCount, getFeaturedClaims, getLatestClaims } from "lib/claims"
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Re pseudo — 似非科学・陰謀論の主張検証",
    description: DESCRIPTION,
  },
}

const Page: FC = () => {
  const featured = getFeaturedClaims()
  const latest = getLatestClaims()
  const categoryCount = getCategoryCount()
  const totalClaims = Object.values(categoryCount).reduce((sum, count) => sum + count, 0)
  const heroStats = [
    { label: "掲載主張", value: `${totalClaims}件` },
    { label: "カテゴリ", value: `${Object.keys(categoryCount).length}分類` },
    { label: "新着更新", value: latest[0] ? formatDate(latest[0].created_at) : "—" },
  ]
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
      <section
        style={{
          background:
            "linear-gradient(160deg, rgba(80,48,64,1) 0%, rgba(55,32,46,1) 40%, rgba(30,18,24,1) 100%)",
          border: "1px solid #7a4d62",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Badge color="#f6ad55" label="根拠・出典・流布状況を整理" style={{ backgroundColor: "transparent", border: "none" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                  lineHeight: 1.1,
                }}
              >
                <span style={{ color: "#f6ad55" }}>Re</span>
                {" "}
                <span style={{ color: "#f7fafc" }}>pseudo</span>
              </h1>
              <p
                style={{
                  color: "#f0e6ec",
                  fontSize: "clamp(.9rem, 2vw, 1rem)",
                  lineHeight: 1.85,
                  maxWidth: "38rem",
                }}
              >
                似非科学・陰謀論・誤情報の主張を、判定だけで終わらせず、
                どんな根拠が使われ、どう広まり、どの論法で信じられやすいのかまでたどる検証カタログ。
              </p>
              <p
                style={{
                  borderLeft: "2px solid #7a4d62",
                  color: "#b8a0ae",
                  fontSize: ".9375rem",
                  lineHeight: 1.8,
                  maxWidth: "38rem",
                  paddingLeft: ".875rem",
                }}
              >
                特定の立場を先に決めるのではなく、再現性・検証可能性・公的情報・
                研究レビューを手がかりに判断材料を整理。
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".75rem",
            }}
          >
            <Link
              href="/claims/"
              style={{
                backgroundColor: "#f6ad55",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0 2px 12px rgba(246,173,85,.35)",
                color: "#1a0f14",
                fontSize: ".9rem",
                fontWeight: 800,
                padding: ".8rem 1.4rem",
                textDecoration: "none",
              }}
            >
              主張一覧を見る →
            </Link>
            <Link
              href="/criteria/"
              style={{
                backgroundColor: "rgba(255,255,255,.06)",
                border: "1px solid #7a4d62",
                borderRadius: "5px",
                color: "#e2d4da",
                fontSize: ".9rem",
                fontWeight: 600,
                padding: ".8rem 1.4rem",
                textDecoration: "none",
              }}
            >
              判断基準を読む
            </Link>
            <Link
              href="/fallacies/"
              style={{
                backgroundColor: "rgba(255,255,255,.06)",
                border: "1px solid #7a4d62",
                borderRadius: "5px",
                color: "#e2d4da",
                fontSize: ".9rem",
                fontWeight: 600,
                padding: ".8rem 1.4rem",
                textDecoration: "none",
              }}
            >
              よくある誤謬へ
            </Link>
          </div>

          <div
            style={{
              borderTop: "1px solid #5a3048",
              display: "grid",
              gap: "0",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              paddingTop: "1.5rem",
            }}
          >
            {heroStats.map((item, i) => (
              <div
                key={item.label}
                style={{
                  borderLeft: i > 0 ? "1px solid #5a3048" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".25rem",
                  padding: ".5rem 1rem",
                }}
              >
                <strong
                  style={{
                    color: "#f6ad55",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-.01em",
                  }}
                >
                  {item.value}
                </strong>
                <span style={{ color: "#9a7a88", fontSize: ".6875rem", letterSpacing: ".04em" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
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
                {formatDate(c.created_at)}
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
        <div style={{ display: "grid", gap: ".75rem", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {(Object.entries(categoryCount) as [keyof typeof CATEGORY_LABEL, number][]).map(
            ([cat, count]) => (
              <Link
                href={`/claims/?category=${cat}`}
                key={cat}
                style={{
                  backgroundColor: "#2d1f28",
                  border: "1px solid #5a3d48",
                  borderRadius: "6px",
                  color: "#e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                }}
              >
                <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: ".9375rem", fontWeight: 700 }}>
                    {CATEGORY_LABEL[cat]}
                  </span>
                  <span style={{ backgroundColor: "#3d2535", borderRadius: "3px", color: "#f6ad55", fontSize: ".75rem", fontWeight: 700, padding: "1px 7px" }}>
                    {count}
                  </span>
                </div>
                <p style={{ color: "#9a8090", fontSize: ".8125rem", lineHeight: 1.65, margin: 0 }}>
                  {CATEGORY_DESCRIPTION[cat]}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

export default Page
