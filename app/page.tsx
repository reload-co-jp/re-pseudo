import Link from "next/link"
import { FC } from "react"
import { Badge, Card } from "components/elements/layout"
import {
  formatDate,
  getCategoryCount,
  getFeaturedClaims,
  getLatestClaims,
} from "lib/claims"
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
  "疑似科学・似非科学・陰謀論・誤情報の主張を、根拠・出典・流布状況・よく使われる論法とともに整理する検証カタログ。"

export const metadata = {
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Re pseudo — 疑似科学・似非科学・陰謀論の主張検証",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Re pseudo — 疑似科学・似非科学・陰謀論の主張検証",
    description: DESCRIPTION,
  },
}

const Page: FC = () => {
  const featured = getFeaturedClaims()
  const latest = getLatestClaims()
  const categoryCount = getCategoryCount()
  const totalClaims = Object.values(categoryCount).reduce(
    (sum, count) => sum + count,
    0
  )
  const heroStats = [
    { label: "掲載主張", value: `${totalClaims}件` },
    { label: "カテゴリ", value: `${Object.keys(categoryCount).length}分類` },
    {
      label: "新着更新",
      value: latest[0] ? formatDate(latest[0].created_at) : "—",
    },
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
            "radial-gradient(circle at 82% 18%, rgba(216,181,109,.18), transparent 20rem), linear-gradient(145deg, rgba(16,13,17,.88), rgba(16,13,17,.68)), url('/images/bg.png') center / cover",
          border: "1px solid var(--border-strong)",
          borderRadius: "8px",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            padding: "1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <Badge
              color="var(--accent-soft)"
              label="根拠・出典・流布状況を整理"
              style={{ backgroundColor: "transparent", border: "none" }}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h1
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                <span style={{ color: "var(--accent-soft)" }}>Re</span>
                &nbsp;
                <span style={{ color: "var(--ink)" }}>pseudo</span>
              </h1>
              <p
                style={{
                  color: "#e8ded3",
                  fontSize: "clamp(.9rem, 2vw, 1rem)",
                  lineHeight: 1.85,
                  maxWidth: "38rem",
                }}
              >
                疑似科学・似非科学・陰謀論・誤情報の主張を、判定だけで終わらせず、
                どんな根拠が使われ、どう広まり、どの論法で信じられやすいのかまでたどる検証カタログ。
              </p>
              <p
                style={{
                  borderLeft: "2px solid var(--accent)",
                  color: "var(--muted)",
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
                backgroundColor: "var(--accent)",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0 10px 26px rgba(216,181,109,.24)",
                color: "#15100c",
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
                backgroundColor: "rgba(255,255,255,.045)",
                border: "1px solid var(--border-strong)",
                borderRadius: "5px",
                color: "#e8ded3",
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
                backgroundColor: "rgba(255,255,255,.045)",
                border: "1px solid var(--border-strong)",
                borderRadius: "5px",
                color: "#e8ded3",
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
              borderTop: "1px solid var(--border)",
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
                  borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".25rem",
                  padding: ".5rem 1rem",
                }}
              >
                <strong
                  style={{
                    color: "var(--accent-soft)",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </strong>
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: ".6875rem",
                    letterSpacing: ".04em",
                  }}
                >
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
            borderBottom: "1px solid var(--border)",
            color: "var(--ink)",
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
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}
              >
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
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {c.title}
              </Link>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  lineHeight: 1.6,
                }}
              >
                {c.summary}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            borderBottom: "1px solid var(--border)",
            color: "var(--ink)",
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
              <span
                style={{
                  color: "#7d736a",
                  fontSize: ".75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {formatDate(c.created_at)}
              </span>
              <Badge
                color={VERDICT_COLOR[c.verdict]}
                label={VERDICT_LABEL[c.verdict]}
              />
              <Link
                href={`/claims/${c.id}/`}
                style={{
                  color: "var(--ink)",
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
            borderBottom: "1px solid var(--border)",
            color: "var(--ink)",
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            paddingBottom: ".5rem",
          }}
        >
          カテゴリ
        </h2>
        <div
          style={{
            display: "grid",
            gap: ".75rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {(
            Object.entries(categoryCount) as [
              keyof typeof CATEGORY_LABEL,
              number,
            ][]
          ).map(([cat, count]) => (
            <Link
              href={`/claims/?category=${cat}`}
              key={cat}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.012)), var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 10px 26px rgba(0,0,0,.16)",
                color: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                padding: "1rem 1.25rem",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: ".9375rem", fontWeight: 700 }}>
                  {CATEGORY_LABEL[cat]}
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(216,181,109,.1)",
                    border: "1px solid var(--border)",
                    borderRadius: "999px",
                    color: "var(--accent-soft)",
                    fontSize: ".75rem",
                    fontWeight: 700,
                    padding: "1px 7px",
                  }}
                >
                  {count}
                </span>
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".8125rem",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {CATEGORY_DESCRIPTION[cat]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Page
