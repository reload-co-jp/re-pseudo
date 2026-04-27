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
    { label: "新着更新", value: latest[0]?.created_at ?? "—" },
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
            "linear-gradient(180deg, rgba(61,43,52,.92) 0%, rgba(55,38,48,.96) 58%, rgba(42,29,36,1) 100%)",
          border: "1px solid #5a3d48",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
            <Badge color="#f6ad55" label="根拠・出典・流布状況を整理" />
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                Re pseudo
              </h1>
              <p
                style={{
                  color: "#f7fafc",
                  fontSize: "clamp(1rem, 2vw, 1.125rem)",
                  lineHeight: 1.85,
                  maxWidth: "42rem",
                }}
              >
                似非科学・陰謀論・誤情報の主張を、判定だけで終わらせず、
                どんな根拠が使われ、どう広まり、どの論法で信じられやすいのかまでたどる検証カタログです。
              </p>
              <p
                style={{
                  color: "#cbd5e0",
                  fontSize: ".9375rem",
                  lineHeight: 1.8,
                  maxWidth: "42rem",
                }}
              >
                特定の立場を先に決めるのではなく、再現性、検証可能性、公的情報、
                研究レビューを手がかりに、判断材料を見つけやすく整理しています。
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
                border: "1px solid #f6ad55",
                borderRadius: "4px",
                color: "#22161c",
                fontSize: ".875rem",
                fontWeight: 700,
                padding: ".75rem 1rem",
                textDecoration: "none",
              }}
            >
              主張一覧を見る
            </Link>
            <Link
              href="/criteria/"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #7f5b69",
                borderRadius: "4px",
                color: "#e2e8f0",
                fontSize: ".875rem",
                fontWeight: 600,
                padding: ".75rem 1rem",
                textDecoration: "none",
              }}
            >
              判断基準を読む
            </Link>
            <Link
              href="/fallacies/"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #7f5b69",
                borderRadius: "4px",
                color: "#e2e8f0",
                fontSize: ".875rem",
                fontWeight: 600,
                padding: ".75rem 1rem",
                textDecoration: "none",
              }}
            >
              よくある誤謬へ
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gap: ".75rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            {heroStats.map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "#2d1f28",
                  border: "1px solid #5a3d48",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".35rem",
                  minHeight: "88px",
                  padding: "1rem",
                }}
              >
                <span style={{ color: "#a0aec0", fontSize: ".75rem" }}>{item.label}</span>
                <strong
                  style={{
                    color: "#f7fafc",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {item.value}
                </strong>
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
                  borderRadius: "4px",
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
